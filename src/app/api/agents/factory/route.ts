import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeString, sanitizeAiPromptInput, validateBase64Pdf } from "@/lib/security";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // Rate limit: 8 cover letters per minute per IP
    const rateCheck = checkRateLimit(`factory:${ip}`, 8, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Too many cover letter generation requests. Please wait a moment." }, { status: 429 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: "Cover Letter Generator is temporarily unavailable." }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    const { job, resumeBase64 } = body;

    // Validate Base64 PDF file (Max 5MB)
    const pdfValidation = validateBase64Pdf(resumeBase64, 5 * 1024 * 1024);
    if (!pdfValidation.valid) {
      return NextResponse.json({ success: false, error: pdfValidation.error || "Valid PDF resume is required." }, { status: 400 });
    }

    if (!job || typeof job !== "object") {
      return NextResponse.json({ success: false, error: "Job details are required." }, { status: 400 });
    }

    const sanitizedJob = {
      title: sanitizeString(job.title, 150),
      company: sanitizeString(job.company, 150),
      location: sanitizeString(job.location, 150),
      description: sanitizeAiPromptInput(job.description || "No description provided.", 4000)
    };

    // Ask Gemini to write a cover letter
    const prompt = `
      You are an expert career coach and professional copywriter.
      I have attached my resume as a PDF document.
      I am applying for the following job:
      Title: ${sanitizedJob.title}
      Company: ${sanitizedJob.company}
      Location: ${sanitizedJob.location}
      Description: ${sanitizedJob.description}

      Task: Write a highly tailored, professional, and compelling cover letter for this specific job.
      
      CRITICAL INSTRUCTIONS:
      1. DO NOT use placeholders like [Your Name] or [Your Phone Number]. You MUST extract my actual Name, Email, Phone Number, and other contact details directly from the attached PDF resume and use them to format a proper real-world letterhead and signature.
      2. Write in a highly authentic, natural, and human tone. DO NOT use robotic AI clichés like "delve into", "testament to", "I am thrilled to apply", or overly flowery jargon. Write exactly how a real professional would write an email to a hiring manager.
      3. Only highlight skills from my resume that strongly match the job description. Do NOT hallucinate or make up experiences I do not have.
      4. Keep it concise, modern, and impactful (around 3 paragraphs).
      5. Output plain text only (no markdown, no bolding, no HTML wrappers), just the raw text ready to be pasted into an email or application portal.
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
      ]
    });

    const coverLetter = response.text;
    if (!coverLetter) {
      throw new Error("Empty response from AI engine");
    }

    return NextResponse.json({ success: true, coverLetter: sanitizeString(coverLetter, 10000) });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate cover letter. Please try again shortly." }, { status: 500 });
  }
}
