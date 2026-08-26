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
    // Rate limit: 20 coaching messages per minute per IP
    const rateCheck = checkRateLimit(`coach:${ip}`, 20, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Too many interview coach messages. Please slow down slightly." }, { status: 429 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: "Interview Coach service is temporarily unavailable." }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    const { job, resumeBase64, messages, experience, targetRole } = body;

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
      location: sanitizeString(job.location || "Remote", 100),
      description: sanitizeAiPromptInput(job.description || "Not provided", 3500)
    };

    const sanitizedExperience = sanitizeString(experience || "Fresher", 50);
    const sanitizedTargetRole = sanitizeString(targetRole || sanitizedJob.title, 100);

    let resumeText = "No resume provided.";
    if (resumeBase64 && resumeBase64.length > 100) {
      resumeText = resumeBase64;
    }

    // Prepare elite, highly experienced Hiring Manager prompt
    const systemInstruction = `
      You are a Principal Engineering Leader and Veteran Hiring Manager at ${sanitizedJob.company} with 15+ years of experience interviewing and evaluating engineering talent. You are conducting a live, realistic technical and behavioral hiring interview with a candidate for the position of "${sanitizedJob.title}".

      === TARGET ROLE & JOB DESCRIPTION ===
      Company: ${sanitizedJob.company}
      Role: ${sanitizedJob.title}
      Location: ${sanitizedJob.location}
      Job Description & Requirements:
      ${sanitizedJob.description}

      === CANDIDATE PROFILE ===
      Declared Experience Level: ${sanitizedExperience}
      Target Career Focus: ${sanitizedTargetRole}

      === INTERVIEW CALIBRATION GUIDELINES BY EXPERIENCE LEVEL ===
      You MUST strictly tailor the depth, nuance, and complexity of your questions to the candidate's declared experience level (${sanitizedExperience}):

      1. IF FRESHER / 0 YEARS (College Graduate / Career Switcher):
         - Focus on foundational computer science principles, core languages/frameworks listed in the JD, and logical problem-solving.
         - Ask about capstone projects, academic challenges, debugging processes, GitHub repositories, and their capacity to learn rapidly.
         - Look for intellectual curiosity, foundational clarity, and structured thinking.

      2. IF JUNIOR (1–2 YEARS):
         - Focus on real-world production code execution, writing maintainable modules, unit testing, and consuming REST/GraphQL APIs.
         - Ask how they handled tricky bugs, managed git merge conflicts in team settings, and followed agile sprints.
         - Probe for practical competency and decreasing reliance on supervision.

      3. IF MID-LEVEL (3–5 YEARS):
         - Focus on system design, database indexing/schema choices, state management patterns, caching strategies (Redis), and performance bottlenecks.
         - Ask how they designed end-to-end features, resolved production incidents, and balanced feature velocity with tech debt.
         - Probe for architectural reasoning, cross-functional collaboration, and code review standards.

      4. IF SENIOR / LEAD (5+ YEARS):
         - Focus on high-scale distributed systems, high availability, fault tolerance, microservices vs modular monoliths, observability, and scalability limits.
         - Ask about mentoring junior engineers, handling high-stakes stakeholder disagreements, and making difficult technical trade-offs.
         - Probe for engineering leadership, business impact alignment, and long-term maintainability.

      === BEHAVIORAL & CONVERSATIONAL RULES ===
      1. STAY STRICTLY IN CHARACTER as the Senior Hiring Manager. Never break character, never reveal you are an AI assistant.
      2. IF FIRST TURN: Start with a warm, professional executive greeting (e.g. "Thanks for joining today. I've been looking forward to speaking with you about the ${sanitizedJob.title} role at ${sanitizedJob.company}."), introduce the interview context briefly, and ask your FIRST tailored question based on the JD and their background.
      3. ASK ONLY ONE QUESTION AT A TIME. Never fire multiple questions in one turn.
      4. EVALUATE CANDIDATE RESPONSES:
         - Acknowledge their previous response with authentic hiring manager critique (e.g., pointing out a strong point or probing deeper if their answer lacked specificity or metrics).
         - Use the STAR Method (Situation, Task, Action, Result) to assess completeness.
         - If an answer is vague or overly generic, ask a sharp, relevant follow-up question to test their real-world experience before moving to a new topic.
      5. KEEP RESPONSES CRISP AND ENGAGING: Limit each turn to 1–2 focused, well-written paragraphs (max 100–150 words). This ensures natural voice and audio synthesis.
      6. BALANCE: Blend technical domain questions (from the JD requirements) with behavioral and cultural fit questions.
    `;

    // Map and sanitize conversation history (last 20 messages for context)
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
    console.error("AI Coach API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate coach response. Please try again shortly." }, { status: 500 });
  }
}
