import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeString, validateBase64Pdf } from "@/lib/security";
import { extractTextFromBase64PdfAsync } from "@/lib/pdf-parser";
import { evaluateResumeAts, resolveRoleSkillMatrix } from "@/lib/ats-engine";
import { getGeminiApiKey } from "@/lib/gemini-config";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // Rate limit: 25 ATS analyses per minute per IP
    const rateCheck = checkRateLimit(`ats:${ip}`, 25, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ 
        success: false, 
        error: "Too many ATS analysis requests. Please wait a moment before trying again." 
      }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { role, resumeBase64 } = body;

    // Validate Base64 PDF file (Max 5MB)
    const pdfValidation = validateBase64Pdf(resumeBase64, 5 * 1024 * 1024);
    if (!pdfValidation.valid) {
      return NextResponse.json({ 
        success: false, 
        error: pdfValidation.error || "Valid PDF resume file is required." 
      }, { status: 400 });
    }

    const targetRole = sanitizeString(role || "Software Engineer", 100).trim();
    const extractedDoc = await extractTextFromBase64PdfAsync(resumeBase64);
    const resumeText = extractedDoc.text.trim();
    const cleanBase64 = resumeBase64.replace(/^data:application\/pdf;base64,/, "").trim();

    // Baseline deterministic analysis as ground truth
    const deterministicAnalysis = evaluateResumeAts(resumeText, targetRole, extractedDoc.numPages);

    const apiKey = getGeminiApiKey();
    const roleMatrix = resolveRoleSkillMatrix(targetRole);

    // Attempt Gemini 2.5 Flash Multimodal Vision for deep semantic evaluation
    if (apiKey) {
      try {
        const prompt = `
You are an expert Enterprise Applicant Tracking System (ATS) screening algorithm and Senior Technical Recruiter.
Analyze the candidate's resume (inspecting both the attached PDF document visually and any extracted text) against the Target Role: "${targetRole}".

=== TARGET ROLE BENCHMARK ===
- Domain: ${roleMatrix.domain}
- Primary Core Required Skills: ${roleMatrix.coreSkills.join(", ")}
- Supporting Libraries & Frameworks: ${roleMatrix.supportingSkills.join(", ")}
- Production, DevOps & Cloud Standards: ${roleMatrix.productionSkills.join(", ")}

=== SCORING METHODOLOGY (Total: 0 to 100) ===
Evaluate across these 5 strict dimensions:
1. Core Domain Technical Skills (0–40 pts): Mandatory foundational requirements matched.
2. Experience & Project Alignment (0–20 pts): Practical depth, project relevance, and title matching.
3. Supporting Frameworks & Tooling (0–15 pts): Secondary libraries, state management, databases.
4. Production, Cloud, CI/CD & Testing (0–15 pts): Docker, AWS/GCP, automated testing, version control.
5. Quantified Impact & Parsability (0–10 pts): Metrics (%, $, latency, scale, user count) and clean structure.

=== SCORING CALIBRATION BENCHMARKS ===
- 88 - 98: High match. Resume demonstrates comprehensive mastery of core domain requirements, production deployment, and measurable project impact.
- 75 - 87: Strong match. Solid core domain proficiency with minor gaps in secondary tools or production testing.
- 55 - 74: Moderate match. Junior profile or missing significant core technologies required for ${targetRole}.
- 35 - 54: Low match. Significant technology stack misalignment or lack of relevant domain experience.
- 15 - 34: Severe domain mismatch (e.g., Non-tech background applying for software/AI role or vice versa).
- 0: Non-resume document (policy paper, textbook, invoice, blank text).

=== EXTRACTED TEXT HINT (${extractedDoc.numPages} Page(s)) ===
${resumeText || "(Scanned / Rasterized PDF - visually read the attached PDF pages directly)"}

=== REQUIRED JSON OUTPUT FORMAT ===
Return ONLY valid JSON matching this schema:
{
  "score": <number between 0 and 100>,
  "tier": "<Excellent (Top 5% Match) | Strong / Highly Competitive | Moderate / Needs Optimization | Below Benchmark / Gaps Detected | Severe Domain Mismatch | Invalid Document / Non-Resume>",
  "isNonResume": false,
  "matchedCoreSkills": ["<string: exact skills from resume matching target role>"],
  "missingCoreSkills": ["<string: exact critical skills missing for target role>"],
  "strengths": [
    "<string: specific strength citing technologies/achievements present in resume>",
    "<string: specific strength citing impact or credentials present in resume>"
  ],
  "improvements": [
    "<string: actionable improvement targeting specific missing keywords for ${targetRole}>",
    "<string: actionable improvement regarding metrics or production capabilities>"
  ],
  "keyMissingSkills": ["<string: top 3-4 missing keywords>"],
  "summary": "<string: comprehensive 2-3 sentence overview of ATS compatibility and recommendations>",
  "candidateProfile": {
    "name": "<string: candidate full name or null>",
    "targetRole": "<string: best matching professional title extracted directly from resume, e.g. Full Stack Developer, Frontend Engineer, Data Scientist, etc.>",
    "location": "<string: city / state / country or Remote or null>",
    "experienceLevel": "<Fresher | 1-3 Years | 3-5 Years | 5+ Years>"
  }
}
`;

        const parts: any[] = [];
        if (cleanBase64) {
          parts.push({
            inlineData: {
              mimeType: "application/pdf",
              data: cleanBase64
            }
          });
        }
        parts.push({ text: prompt });

        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
        const response = await fetch(url, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: parts
              }
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
            const analysis = JSON.parse(cleanJson);

            // Validate structure & score bounds
            if (typeof analysis.score === "number" && !isNaN(analysis.score)) {
              const validatedScore = Math.min(100, Math.max(0, Math.round(analysis.score)));
              const rawProf = analysis.candidateProfile || {};
              const detProf = deterministicAnalysis.candidateProfile || {};

              return NextResponse.json({
                success: true,
                analysis: {
                  score: validatedScore,
                  tier: sanitizeString(analysis.tier || deterministicAnalysis.tier, 60),
                  isNonResume: Boolean(analysis.isNonResume),
                  matchedCoreSkills: Array.isArray(analysis.matchedCoreSkills) && analysis.matchedCoreSkills.length > 0 
                    ? analysis.matchedCoreSkills.slice(0, 10).map((s: string) => sanitizeString(s, 50)) 
                    : deterministicAnalysis.matchedCoreSkills,
                  missingCoreSkills: Array.isArray(analysis.missingCoreSkills) && analysis.missingCoreSkills.length > 0 
                    ? analysis.missingCoreSkills.slice(0, 8).map((s: string) => sanitizeString(s, 50)) 
                    : deterministicAnalysis.missingCoreSkills,
                  strengths: Array.isArray(analysis.strengths) && analysis.strengths.length > 0 
                    ? analysis.strengths.slice(0, 5).map((s: string) => sanitizeString(s, 300)) 
                    : deterministicAnalysis.strengths,
                  improvements: Array.isArray(analysis.improvements) && analysis.improvements.length > 0 
                    ? analysis.improvements.slice(0, 5).map((s: string) => sanitizeString(s, 300)) 
                    : deterministicAnalysis.improvements,
                  keyMissingSkills: Array.isArray(analysis.keyMissingSkills) && analysis.keyMissingSkills.length > 0 
                    ? analysis.keyMissingSkills.slice(0, 6).map((s: string) => sanitizeString(s, 50)) 
                    : deterministicAnalysis.keyMissingSkills,
                  summary: sanitizeString(analysis.summary || deterministicAnalysis.summary, 600),
                  candidateProfile: {
                    name: rawProf.name ? sanitizeString(rawProf.name, 60) : detProf.name || undefined,
                    targetRole: rawProf.targetRole ? sanitizeString(rawProf.targetRole, 60) : (detProf.targetRole || targetRole),
                    location: rawProf.location ? sanitizeString(rawProf.location, 60) : undefined,
                    experienceLevel: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"].includes(rawProf.experienceLevel)
                      ? rawProf.experienceLevel
                      : (detProf.experienceLevel || "1-3 Years")
                  }
                }
              });
            }
          }
        } else {
          const errText = await response.text();
          console.error("Gemini API non-ok status:", response.status, errText);
        }
      } catch (geminiErr: any) {
        console.error("Gemini cloud API call failed:", geminiErr);
      }
    } else {
      console.warn("No GEMINI_API_KEY present in environment.");
    }

    // High-Precision Deterministic ATS Engine Fallback
    return NextResponse.json({ success: true, analysis: deterministicAnalysis });
  } catch (error: any) {
    console.error("ATS Analyzer Route Error:", error);
    const fallback = evaluateResumeAts("", "Software Engineer", 1);
    return NextResponse.json({ success: true, analysis: fallback });
  }
}
