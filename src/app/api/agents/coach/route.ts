import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeString, sanitizeAiPromptInput } from "@/lib/security";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * Intelligent Hiring Manager Interview Simulation Fallback
 */
function generateCoachReply(job: any, messages: any[], isFreeTierLastTurn: boolean): string {
  const company = job.company || "our engineering organization";
  const title = job.title || "Target Role";
  const turnsCount = messages.filter(m => m.role === "user").length;

  if (isFreeTierLastTurn) {
    return `You've demonstrated solid technical clarity and structured thinking in this session!

Here's the reality: in high-paying tech interviews, the difference between a rejection and a top-tier offer comes down to handling the unexpected 4th, 5th, and 6th architectural follow-ups under pressure.

Don't leave your dream offer to chance. Build bulletproof interview muscle memory, unlock live voice sparring, and practice unlimited full-length rounds across all your target companies on ZenScout Pro!`;
  }

  if (turnsCount <= 1) {
    return `Thanks for taking the time to speak with me today! We are looking for high-ownership engineers for our ${title} opening at ${company}. 

To kick off our technical discussion: Could you walk me through a complex project you built recently—specifically highlighting your architectural choices, how you structured your API/database layer, and a tricky bug you resolved?`;
  }

  if (turnsCount === 2) {
    return `That's a very solid breakdown. I appreciate how you approached the system architecture and debugging process.

As a follow-up: How do you handle scalability bottlenecks and ensure high reliability when your system experiences sudden traffic surges or unexpected API latency? Walk me through your caching, monitoring, or error-handling strategy.`;
  }

  return `Excellent insights. You clearly understand the operational nuances of building production-grade applications.

One final question for this round: When collaborating in an agile team, how do you prioritize competing deadlines between delivering new feature velocity versus paying down technical debt?`;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`coach:${ip}`, 30, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Too many interview coach messages. Please slow down slightly." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { job, resumeBase64, messages, experience, targetRole, isFreeTierLastTurn } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: "Messages array is required." }, { status: 400 });
    }

    const sanitizedJob = {
      title: sanitizeString(job?.title || "Engineer", 150),
      company: sanitizeString(job?.company || "Hiring Company", 150),
      location: sanitizeString(job?.location || "Remote", 100),
      description: sanitizeAiPromptInput(job?.description || "Not provided", 3500)
    };

    const sanitizedExperience = sanitizeString(experience || "Fresher", 50);

    // 1. Attempt Gemini 2.5 Flash if API key is active
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey.startsWith("AIzaSy")) {
      try {
        let closingInstruction = "";
        if (isFreeTierLastTurn) {
          closingInstruction = `
          SPECIAL INSTRUCTION: This is the 3rd turn. Evaluate the candidate's last answer, then provide the standard conversion message to upgrade.
          `;
        }

        const systemInstruction = `
          You are a Senior Engineering Hiring Manager at ${sanitizedJob.company} interviewing for ${sanitizedJob.title}.
          Experience Level: ${sanitizedExperience}.
          Ask ONE focused, realistic question at a time. Evaluate previous answers with constructive feedback.
          Keep responses concise (100-150 words).
          ${closingInstruction}
        `;

        const recentMessages = messages.slice(-15);
        const contents: any[] = recentMessages.map((m: any) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: sanitizeAiPromptInput(m.content || "", 2000) }]
        }));

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
          }
        });

        if (response.text && response.text.trim().length > 10) {
          return NextResponse.json({ success: true, reply: sanitizeString(response.text.trim(), 4000) });
        }
      } catch (geminiErr) {
        // Fallback to high-EQ interview simulation
      }
    }

    // 2. High-EQ Hiring Manager Simulation Fallback
    const simulatedReply = generateCoachReply(sanitizedJob, messages, Boolean(isFreeTierLastTurn));
    return NextResponse.json({ success: true, reply: simulatedReply });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate interview coach response." }, { status: 500 });
  }
}
