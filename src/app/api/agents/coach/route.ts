import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit } from "@/lib/rate-limit";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    if (!checkRateLimit(ip, 10, 60000)) {
      return NextResponse.json({ success: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: "AI Service is not configured." }, { status: 500 });
    }

    const { job, resumeBase64, messages } = await request.json();

    // Payload size validation (preventing prompt injection / DDoS via massive payloads)
    if (resumeBase64 && resumeBase64.length > 5 * 1024 * 1024) { // 5MB limit for base64
      return NextResponse.json({ success: false, error: "Resume file is too large." }, { status: 413 });
    }
    if (JSON.stringify(messages).length > 200000) {
      return NextResponse.json({ success: false, error: "Conversation history too large." }, { status: 413 });
    }

    if (!job || !messages) {
      return NextResponse.json({ success: false, error: "Job details and messages are required." }, { status: 400 });
    }

    let resumeText = "No resume provided.";
    if (resumeBase64 && resumeBase64.length > 100) {
      resumeText = resumeBase64;
    }

    // Prepare system instruction
    const systemInstruction = `
      You are the Hiring Manager at ${job.company} conducting a technical/behavioral interview for the position of "${job.title}".
      I am the candidate.
      
      Job Description:
      ${job.description || "Not provided"}

      Rules for the Interview:
      1. Stay strictly in character as the hiring manager. NEVER break character.
      2. If this is the very first message in the conversation, start by warmly greeting the candidate, introducing yourself, and asking the FIRST interview question based on their resume or the job description.
      3. Ask ONLY ONE question at a time. Wait for my response.
      4. When I answer, give brief, realistic feedback (e.g., "Great point", or "I'd love more detail on X") and then ask the next question.
      5. Make the interview conversational, professional, and slightly challenging.
      6. Keep your responses concise (1-2 short paragraphs max). Do not write essays.
      7. Base your questions on both the Job Description requirements and the candidate's resume.
    `;

    // Map conversation history
    const contents: any[] = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    // If there's a resume and it's the very first user message, inject the PDF data
    if (resumeText !== "No resume provided." && contents.length === 1 && contents[0].role === "user") {
      contents[0].parts.unshift({
        inlineData: {
          data: resumeText,
          mimeType: "application/pdf"
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const reply = response.text;
    if (!reply) {
       throw new Error("Empty response from Gemini");
    }

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error("Agent Coach Error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate coach response." }, { status: 500 });
  }
}
