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

    const { jobs, resumeBase64, experience } = await request.json();

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

    let resumeText = "No resume provided.";
    if (resumeBase64 && resumeBase64.length > 100) {
      resumeText = resumeBase64;
    }

    const jobsList = jobs.map((j: any) => ({
      id: j.id,
      title: j.title,
      company: j.company,
      description: j.description || "No description provided."
    }));

    const userExperience = experience || "Fresher";

    // 3. Ask Gemini to score them with strict experience calibration
    const prompt = `
      You are an expert technical recruiter and AI job matcher for candidates.
      The candidate has an official experience level of: "${userExperience}".
      
      I have attached the candidate's resume as a PDF document.
      I will provide a list of job postings in JSON format.
      
      CRITICAL EXPERIENCE MATCHING RULES:
      1. If the candidate has 0 years / "Fresher" / Entry Level experience:
         - Any job posting that requires 2+, 3+, 5+ years of industry experience or has Senior/Lead in the title MUST receive a very low matchScore (under 40%).
         - Genuine Entry-Level, Graduate, Junior (0-1 yrs), or Internship postings matching the candidate's skills should receive high scores (70-98%).
      2. If the candidate's skills match the entry-level requirements, reward them with a strong matchScore.
      
      Here are the jobs to evaluate:
      ${JSON.stringify(jobsList, null, 2)}
      
      Respond with ONLY a JSON array of objects. Each object must have the job "id" and the calculated "matchScore" (an integer from 0 to 100).
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

    // 4. Update the original jobs array with the calibrated scores
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
