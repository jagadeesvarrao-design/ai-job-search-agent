import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeString, validateBase64Pdf } from "@/lib/security";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // Rate limit: 10 requests per minute per IP
    const rateCheck = checkRateLimit(`filter:${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Too many AI scoring requests. Please wait a moment before trying again." }, { status: 429 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: "AI matching service is temporarily unavailable." }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    const { jobs, resumeBase64, experience } = body;

    // Validate Resume PDF Payload
    const pdfValidation = validateBase64Pdf(resumeBase64, 5 * 1024 * 1024);
    if (!pdfValidation.valid) {
      return NextResponse.json({ success: false, error: pdfValidation.error || "Valid PDF resume is required." }, { status: 400 });
    }

    // Limit batch size to protect memory and prevent DoS
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return NextResponse.json({ success: true, jobs: [] });
    }
    if (jobs.length > 25) {
      return NextResponse.json({ success: false, error: "Maximum 25 jobs can be scored per batch." }, { status: 413 });
    }

    // Sanitize job descriptions and user metadata
    const jobsList = jobs.slice(0, 25).map((j: any) => ({
      id: sanitizeString(j.id, 100),
      title: sanitizeString(j.title, 200),
      company: sanitizeString(j.company, 150),
      description: sanitizeString(j.description || "No description provided.", 3000)
    }));

    const userExperience = sanitizeString(experience || "Fresher", 50);

    // Ask Gemini to score them with strict experience calibration
    const prompt = `
      You are an expert technical recruiter and AI job matcher.
      The candidate has an official experience level of: "${userExperience}".
      
      I have attached the candidate's resume as a PDF document.
      I will provide a list of job postings in JSON format.
      
      CRITICAL MATCHING RULES:
      1. If the candidate has 0 years / "Fresher" / Entry Level experience:
         - Any job posting requiring 2+, 3+, 5+ years of industry experience or Senior/Lead in the title MUST receive a matchScore under 40%.
         - Genuine Entry-Level, Graduate, Junior (0-1 yrs), or Internship postings matching skills should receive high scores (70-98%).
      2. If candidate skills match the requirements, calculate a realistic score between 0 and 100.
      
      Jobs to evaluate:
      ${JSON.stringify(jobsList, null, 2)}
      
      Respond with ONLY a JSON array of objects with keys "id" (string) and "matchScore" (integer 0-100).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: resumeBase64,
                mimeType: "application/pdf"
              }
            },
            { text: prompt }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "List of job scores",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              matchScore: { type: Type.INTEGER }
            },
            required: ["id", "matchScore"]
          }
        }
      }
    });

    const scoresText = response.text;
    if (!scoresText) {
      throw new Error("Empty response from AI engine");
    }

    const scores = JSON.parse(scoresText);

    // Update the original jobs array with the calibrated scores
    const updatedJobs = jobs.map((job: any) => {
      const scoredJob = scores.find((s: any) => s.id === job.id);
      return {
        ...job,
        matchScore: scoredJob ? Math.min(100, Math.max(0, Number(scoredJob.matchScore) || 0)) : job.matchScore
      };
    });

    return NextResponse.json({ success: true, jobs: updatedJobs });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: "Failed to score job compatibility. Please try again shortly." 
    }, { status: 500 });
  }
}
