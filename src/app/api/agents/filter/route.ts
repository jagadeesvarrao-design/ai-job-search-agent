import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
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

    const { jobs, resumeBase64 } = await request.json();

    if (resumeBase64 && resumeBase64.length > 5 * 1024 * 1024) { 
      return NextResponse.json({ success: false, error: "Resume file is too large." }, { status: 413 });
    }
    if (jobs && jobs.length > 100) {
      return NextResponse.json({ success: false, error: "Too many jobs submitted for filtering." }, { status: 413 });
    }

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ success: true, jobs: [] });
    }

    if (!resumeBase64) {
      return NextResponse.json({ success: false, error: "Resume URL is required to filter jobs." }, { status: 400 });
    }

    // 1. Read the local PDF file
    let resumeText = "No resume provided.";
    // The frontend now passes the base64 string directly in resumeBase64
    if (resumeBase64 && resumeBase64.length > 100) {
      resumeText = resumeBase64;
    }

    // 2. Format the jobs for the prompt
    const jobsList = jobs.map((j: any) => ({
      id: j.id,
      title: j.title,
      company: j.company,
      description: j.description || "No description provided."
    }));

    // 3. Ask Gemini to score them
    const prompt = `
      You are an expert technical recruiter and AI job matcher.
      I have attached my resume as a PDF document.
      I will provide a list of job postings in JSON format.
      For EACH job, calculate a "matchScore" from 0 to 100 representing how well my resume fits the job requirements.
      Be realistic and critical. If I have no experience in a required technology, lower the score significantly.
      
      Here are the jobs to evaluate:
      ${JSON.stringify(jobsList, null, 2)}
      
      Respond with ONLY a JSON array of objects. Each object must have the job "id" and the calculated "matchScore" (a number).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: resumeText,
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
          type: Type.ARRAY,
          description: "List of job scores",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              matchScore: { type: Type.INTEGER }
            },
            required: ["id", "matchScore"]
          }
        }
      }
    });

    const scoresText = response.text;
    if (!scoresText) {
       throw new Error("Empty response from Gemini");
    }

    const scores = JSON.parse(scoresText);

    // 4. Update the original jobs array with the new scores
    const updatedJobs = jobs.map((job: any) => {
      const scoredJob = scores.find((s: any) => s.id === job.id);
      return {
        ...job,
        matchScore: scoredJob ? scoredJob.matchScore : job.matchScore
      };
    });

    return NextResponse.json({ success: true, jobs: updatedJobs });
  } catch (error) {
    console.error("Agent Filter Error:", error);
    return NextResponse.json({ success: false, error: "Failed to filter jobs." }, { status: 500 });
  }
}
