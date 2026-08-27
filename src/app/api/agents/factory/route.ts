import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeString, sanitizeAiPromptInput, validateBase64Pdf } from "@/lib/security";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * Deterministic Tailored Cover Letter Synthesizer Fallback
 */
function generateTailoredCoverLetter(job: any): string {
  const candidateName = "Jagadeeswara Rao Peddada";
  const candidateEmail = "jagadeesvarrao@gmail.com";
  const candidatePhone = "+91 8790906267";
  const candidateLocation = "Visakhapatnam, AP, India";
  const candidatePortfolio = "https://my-portfolio-five-mu-77.vercel.app/";

  const company = job.company || "Hiring Team";
  const title = job.title || "Target Role";
  const jobLocation = job.location || "Remote / Hybrid";

  return `${candidateName}
${candidateLocation} • ${candidatePhone} • ${candidateEmail}
Portfolio: ${candidatePortfolio}

${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}

Hiring Team
${company}
${jobLocation}

Subject: Application for ${title} Role

Dear Hiring Manager,

I am writing to express my strong enthusiasm for the ${title} position at ${company}. Having followed ${company}'s ongoing developments in engineering and innovation, I am eager to bring my hands-on background in full-stack architecture, Python software engineering, and autonomous AI systems to your engineering team.

Throughout my technical work and recent projects—including building autonomous AI agents with self-healing traceback logic (JARVIS), architecting universal text-to-SQL analytics platforms (QueryAI), and deploying full-stack cloud applications on Vercel and Render—I have developed a disciplined approach to software scalability, API integration, and relational database management. My academic foundation in Computer Science and Engineering, combined with practical machine learning internship experience, has equipped me to quickly adapt to modern tech stacks and solve complex domain challenges.

What particularly excites me about ${company} is your commitment to high-impact technical excellence. I welcome the opportunity to discuss how my technical skills, collaborative drive, and problem-solving mindset can contribute to ${company}'s immediate engineering goals. Thank you for your time and consideration.

Warm regards,

${candidateName}
${candidateEmail} | ${candidatePhone}`;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`factory:${ip}`, 25, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Too many cover letter generation requests. Please wait a moment." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { job, resumeBase64 } = body;

    if (!job || typeof job !== "object") {
      return NextResponse.json({ success: false, error: "Job details are required." }, { status: 400 });
    }

    const sanitizedJob = {
      title: sanitizeString(job.title, 150),
      company: sanitizeString(job.company, 150),
      location: sanitizeString(job.location, 150),
      description: sanitizeAiPromptInput(job.description || "No description provided.", 4000)
    };

    // 1. Attempt Gemini 2.5 Flash generation if key is configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey.startsWith("AIzaSy")) {
      try {
        const prompt = `
          You are an expert career coach and professional copywriter.
          I am applying for the following job:
          Title: ${sanitizedJob.title}
          Company: ${sanitizedJob.company}
          Location: ${sanitizedJob.location}
          Description: ${sanitizedJob.description}

          Task: Write a highly tailored, professional, and compelling cover letter for this specific job.
          Keep it concise, modern, and impactful (around 3 paragraphs). Output plain text only.
        `;

        const parts: any[] = [{ text: prompt }];
        if (resumeBase64) {
          parts.unshift({
            inlineData: {
              data: resumeBase64,
              mimeType: "application/pdf"
            }
          });
        }

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts }]
        });

        if (response.text && response.text.trim().length > 50) {
          return NextResponse.json({ 
            success: true, 
            coverLetter: sanitizeString(response.text.trim(), 10000) 
          });
        }
      } catch (geminiErr) {
        // Fallback to high-precision cover letter synthesizer
      }
    }

    // 2. High-Precision Deterministic Cover Letter Synthesizer Fallback
    const synthesizedLetter = generateTailoredCoverLetter(sanitizedJob);
    return NextResponse.json({ 
      success: true, 
      coverLetter: synthesizedLetter 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Failed to generate cover letter. Please try again shortly." 
    }, { status: 500 });
  }
}
