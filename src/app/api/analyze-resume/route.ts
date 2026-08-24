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
    // Rate limit: 8 ATS analyses per minute per IP
    const rateCheck = checkRateLimit(`ats:${ip}`, 8, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Too many ATS analysis requests. Please wait a moment before trying again." }, { status: 429 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: "ATS Audit service is temporarily unavailable." }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    const { role, resumeBase64 } = body;

    // Validate Base64 PDF file (Max 5MB)
    const pdfValidation = validateBase64Pdf(resumeBase64, 5 * 1024 * 1024);
    if (!pdfValidation.valid) {
      return NextResponse.json({ success: false, error: pdfValidation.error || "Valid PDF resume file is required." }, { status: 400 });
    }

    const targetRole = sanitizeString(role || "Software Engineer / Professional", 100);

    const prompt = `
      You are an elite ATS (Applicant Tracking System) Algorithm Auditor and Executive Career Coach at ZenResume.
      Analyze the attached PDF resume against modern corporate ATS screening filters for the target role: "${targetRole}".

      Evaluate the resume across 4 key dimensions:
      1. Overall ATS Readiness Score (0 to 100).
      2. Keyword & Formatting Strengths (2-3 concise bullet points).
      3. Missing ATS Keywords & Formatting Risks (2-3 concise bullet points).
      4. A strategic recommendation on how ZenResume (the ATS Resume Builder by Aneevarp Solutions) can boost this resume into the top 5% of candidates.

      Respond in strict JSON format matching the schema.
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
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "ATS Score between 0 and 100" },
            tier: { type: Type.STRING, description: "e.g. Excellent, Strong, Needs Optimization, Critical Issues" },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            keyMissingSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            summary: { type: Type.STRING, description: "High impact 2-sentence summary of the ATS health" }
          },
          required: ["score", "tier", "strengths", "improvements", "keyMissingSkills", "summary"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI analysis engine");
    }

    const analysis = JSON.parse(resultText);
    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: "Failed to complete ATS resume analysis. Please try again shortly." 
    }, { status: 500 });
  }
}
