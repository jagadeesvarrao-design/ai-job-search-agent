import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { readFile } from "fs/promises";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { job, resumeUrl } = await request.json();

    if (!job) {
      return NextResponse.json({ success: false, error: "Job details are required." }, { status: 400 });
    }

    if (!resumeUrl) {
      return NextResponse.json({ success: false, error: "Resume URL is required." }, { status: 400 });
    }

    // 2. Ask Gemini to write a cover letter
    const prompt = `
      You are an expert career coach and professional copywriter.
      I have attached my resume as a PDF document.
      I am applying for the following job:
      Title: ${job.title}
      Company: ${job.company}
      Location: ${job.location}
      Description: ${job.description || "No description provided."}

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
                data: resumeUrl,
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
       throw new Error("Empty response from Gemini");
    }

    return NextResponse.json({ success: true, coverLetter });
  } catch (error) {
    console.error("Agent Factory Error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate cover letter." }, { status: 500 });
  }
}
