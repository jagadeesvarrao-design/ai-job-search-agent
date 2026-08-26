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
    // Rate limit: 15 coaching messages per minute per IP
    const rateCheck = checkRateLimit(`coach:${ip}`, 15, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Too many interview coach messages. Please slow down slightly." }, { status: 429 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: "Interview Coach service is temporarily unavailable." }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    const { job, resumeBase64, messages } = body;

    // Validate Base64 PDF file if provided (Max 5MB)
    if (resumeBase64) {
      const pdfValidation = validateBase64Pdf(resumeBase64, 5 * 1024 * 1024);
      if (!pdfValidation.valid) {
        return NextResponse.json({ success: false, error: pdfValidation.error || "Invalid PDF resume file." }, { status: 400 });
      }
    }

    // Limit conversation history to prevent prompt injection / memory bloat
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: "Messages array is required." }, { status: 400 });
    }
    if (messages.length > 50) {
      return NextResponse.json({ success: false, error: "Conversation history exceeds maximum turn limit." }, { status: 413 });
    }

    if (!job || typeof job !== "object") {
      return NextResponse.json({ success: false, error: "Job details are required." }, { status: 400 });
    }

    const sanitizedJob = {
      title: sanitizeString(job.title, 150),
      company: sanitizeString(job.company, 150),
      description: sanitizeAiPromptInput(job.description || "Not provided", 3000)
    };

    let resumeText = "No resume provided.";
    if (resumeBase64 && resumeBase64.length > 100) {
      resumeText = resumeBase64;
    }

    // Prepare system instruction
    const systemInstruction = `
      You are the Hiring Manager at ${sanitizedJob.company} conducting a technical/behavioral interview for the position of "${sanitizedJob.title}".
      I am the candidate.
      
      Job Description:
      ${sanitizedJob.description}

      Rules for the Interview:
      1. Stay strictly in character as the hiring manager. NEVER break character.
      2. If this is the very first message in the conversation, start by warmly greeting the candidate, introducing yourself, and asking the FIRST interview question based on their resume or the job description.
      3. Ask ONLY ONE question at a time. Wait for my response.
      4. When I answer, give brief, realistic feedback (e.g., "Great point", or "I'd love more detail on X") and then ask the next question.
      5. Make the interview conversational, professional, and slightly challenging.
      6. Keep your responses concise (1-2 short paragraphs max). Do not write essays.
      7. Base your questions on both the Job Description requirements and the candidate's resume.
    `;

    // Map and sanitize conversation history (last 20 messages max for context & performance)
    const recentMessages = messages.slice(-20);
    const contents: any[] = recentMessages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: sanitizeAiPromptInput(m.content || "", 2000) }]
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
      throw new Error("Empty response from AI Coach");
    }

    return NextResponse.json({ success: true, reply: sanitizeString(reply, 5000) });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate coach response. Please try again shortly." }, { status: 500 });
  }
}
