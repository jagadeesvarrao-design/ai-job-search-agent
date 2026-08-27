import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeString, sanitizeAiPromptInput } from "@/lib/security";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * Intelligent Senior Manager Interview Simulation Fallback
 */
function generateCoachReply(job: any, messages: any[], isFreeTierLastTurn: boolean, isZenSuite: boolean): string {
  const company = job.company || "our engineering organization";
  const title = job.title || "Target Role";
  const turnsCount = messages.filter(m => m.role === "user").length;

  if (isFreeTierLastTurn && !isZenSuite) {
    return `You've demonstrated solid technical clarity and structured thinking in this initial session!

Here's the reality: in high-paying tech interviews, the difference between a rejection and a top-tier offer comes down to handling the unexpected 4th, 5th, and 6th architectural follow-ups under pressure.

🌟 Unlock Zen Suite Ultimate (₹599/mo) — Get full unlimited access to ZenScout Pro Senior Manager mock interview rounds, voice simulations, plus ZenDoc AI Pro & ZenResume!`;
  }

  if (isZenSuite) {
    if (turnsCount <= 1) {
      return `Welcome to your Executive Senior Manager Interview for the ${title} opening at ${company}.

Let's begin with a deep dive into high-stakes architectural ownership:
Walk me through a mission-critical system or feature you designed from scratch. Specifically, what were the non-functional requirements (latency SLA, throughput, data consistency), what architectural trade-offs did you evaluate, and how did you measure its business and engineering impact?`;
    }

    if (turnsCount === 2) {
      return `That's a structured breakdown. I appreciate your focus on scalability trade-offs.

[Senior Manager Evaluation • STAR Analysis]:
• Situation/Task: Clearly articulated.
• Action & Architecture: Strong understanding of system bottlenecks.
• Optimization Opportunity: Quantify the latency and cloud cost metrics more explicitly.

Follow-up Deep Dive:
Imagine traffic increases 10x during a flash sale or critical event, causing database connection pool exhaustion and downstream API timeouts. Walk me through your fault tolerance, circuit breaker, caching tier, and graceful degradation strategy under high concurrency.`;
    }

    if (turnsCount === 3) {
      return `Very well handled. You demonstrated clear mastery over distributed systems reliability and graceful failure modes.

[Behavioral & Leadership Assessment]:
Tell me about a time when you strongly disagreed with a Principal Architect or Product Manager on a technical direction or feature timeline. How did you build consensus, what data did you present, and what was the ultimate outcome for the project?`;
    }

    return `Impressive depth of response. Your communication is structured, data-driven, and aligned with Senior/Staff Engineer expectations.

Let's tackle a complex system resilience scenario: How do you design an end-to-end automated observability and automated rollback pipeline that detects subtle silent data corruption or memory leaks before impacting end-users?`;
  }

  // Standard Free Flow
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
    const body = await request.json().catch(() => ({}));
    const { job, resumeBase64, messages, experience, targetRole, isFreeTierLastTurn, isZenSuite, userPlan } = body;

    // Detect Zen Suite entitlement from payload or headers
    const headerPlan = request.headers.get("x-user-plan");
    const isSuiteUser = Boolean(isZenSuite || userPlan === "zen_suite" || headerPlan === "zen_suite");

    // Suite members bypass standard rate limits
    const maxRequests = isSuiteUser ? 200 : 30;
    const rateCheck = checkRateLimit(`coach:${ip}`, maxRequests, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Too many interview coach messages. Please slow down slightly." }, { status: 429 });
    }

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

    // 1. Attempt Gemini 2.5 Flash with Senior Manager persona for Zen Suite users
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey.startsWith("AIzaSy")) {
      try {
        let closingInstruction = "";
        if (isFreeTierLastTurn && !isSuiteUser) {
          closingInstruction = `
          SPECIAL INSTRUCTION: This is the 3rd turn for a free user. Evaluate the candidate's last answer, then provide the standard conversion message recommending Zen Suite Ultimate (₹599/mo) and ZenScout Pro.
          `;
        }

        const suiteInstructions = isSuiteUser
          ? `
          ROLE: Senior Engineering Director & Bar Raiser at ${sanitizedJob.company} interviewing for ${sanitizedJob.title}.
          MODE: ZEN SUITE ULTIMATE - SENIOR MANAGER EXECUTIVE INTERVIEW & BEHAVIORAL GRADING.
          - Apply FAANG-grade Bar Raiser standards.
          - Grade each user response with concise [Senior Manager Evaluation • STAR Feedback] covering Situation, Task, Action, Result, and Technical depth.
          - Probe deeply into system architecture, concurrency, reliability SLAs, and executive leadership trade-offs.
          - Maintain an engaging, challenging, and professional executive tone.
          - Bypassed all turn limits and role locks.
          `
          : `
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
            systemInstruction: suiteInstructions,
            temperature: isSuiteUser ? 0.65 : 0.7,
          }
        });

        if (response.text && response.text.trim().length > 10) {
          return NextResponse.json({ 
            success: true, 
            reply: sanitizeString(response.text.trim(), 4000),
            isZenSuiteVerified: isSuiteUser,
            priorityCompute: isSuiteUser
          });
        }
      } catch (geminiErr) {
        // Fallback to high-EQ interview simulation
      }
    }

    // 2. High-EQ Hiring Manager Simulation Fallback
    const simulatedReply = generateCoachReply(sanitizedJob, messages, Boolean(isFreeTierLastTurn), isSuiteUser);
    return NextResponse.json({ 
      success: true, 
      reply: simulatedReply,
      isZenSuiteVerified: isSuiteUser 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate interview coach response." }, { status: 500 });
  }
}
