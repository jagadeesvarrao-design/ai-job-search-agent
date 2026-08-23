import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { checkRateLimit } from "@/lib/rate-limit";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    if (!checkRateLimit(ip, 15, 60000)) {
      return NextResponse.json({ success: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: "AI Service is not configured." }, { status: 500 });
    }

    const { role, resumeBase64 } = await request.json();

    if (!resumeBase64) {
      return NextResponse.json({ success: false, error: "Resume is required for ATS analysis." }, { status: 400 });
    }

    if (resumeBase64.length > 5 * 1024 * 1024) { 
      return NextResponse.json({ success: false, error: "Resume file is too large." }, { status: 413 });
    }

    const targetRole = role || "Software Engineer / Professional";

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
      throw new Error("Empty response from AI analysis");
    }

    const analysis = JSON.parse(resultText);
    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    console.error("ATS Analyzer Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to analyze resume for ATS score." 
    }, { status: 500 });
  }
}
