import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    if (!checkRateLimit(ip, 10, 60000)) {
      return NextResponse.json({ success: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    const { role, location, experience } = await request.json();

    if (role && role.length > 500) {
      return NextResponse.json({ success: false, error: "Role too long." }, { status: 413 });
    }
    if (location && location.length > 500) {
      return NextResponse.json({ success: false, error: "Location too long." }, { status: 413 });
    }

    if (!role || !location) {
      return NextResponse.json({ success: false, error: "Role and location are required." }, { status: 400 });
    }

    const apiKey = process.env.SERP_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "SerpApi Key is missing." }, { status: 500 });
    }

    // Build specialized search query based on experience level
    let specializedRole = role.trim();
    const exp = (experience || "").toLowerCase();

    const isFresher = exp === "fresher" || exp === "0" || exp === "0-1" || exp === "entry level" || exp === "internship";

    if (isFresher) {
      // For 0 years / freshers, append entry-level modifiers to avoid senior/lead posts
      if (!specializedRole.toLowerCase().includes("entry level") && 
          !specializedRole.toLowerCase().includes("fresher") && 
          !specializedRole.toLowerCase().includes("graduate") &&
          !specializedRole.toLowerCase().includes("junior") &&
          !specializedRole.toLowerCase().includes("intern")) {
        specializedRole = `Entry Level ${specializedRole} fresher graduate`;
      }
    }

    const query = `${specializedRole} in ${location}`;
    const url = `https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(query)}&api_key=${apiKey}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    const response = await fetch(url, { 
      cache: "no-store",
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`SerpApi responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.jobs_results) {
      return NextResponse.json({ success: true, jobs: [] });
    }

    // Map SerpApi results and apply rigorous experience filtering
    const mappedJobs = data.jobs_results.map((job: any) => ({
      id: job.job_id,
      title: job.title,
      company: job.company_name,
      location: job.location,
      salary: job.detected_extensions?.salary || undefined,
      postedAt: job.detected_extensions?.posted_at || "Recently",
      description: job.description || "",
      matchScore: 0,
      status: "New Matches",
      applyLink: job.related_links?.[0]?.link || "",
      source: job.via || "Unknown Source"
    }));

    // If candidate has 0 years / is a fresher, filter out jobs strictly demanding 2+, 3+, 5+ years or senior/lead titles
    let filteredJobs = mappedJobs;
    if (isFresher) {
      filteredJobs = mappedJobs.filter((job: any) => {
        const titleLower = job.title.toLowerCase();
        const descLower = job.description.toLowerCase();

        // 1. Exclude senior/lead/staff/principal/manager titles for 0-year candidates
        const seniorTitles = ["senior", "sr.", "sr ", "lead", "principal", "staff", "architect", "engineering manager", "director", "head of"];
        if (seniorTitles.some(st => titleLower.includes(st))) {
          return false;
        }

        // 2. Scan text for explicit high year requirements (e.g. "3+ years", "5-7 years", "minimum 3 years", "at least 4 years")
        const highExperiencePatterns = [
          /\b([2-9]|\d{2})\+?\s*(?:to|-)\s*\d+\s*(?:years?|yrs?)/i, // "3 to 5 years", "2-4 yrs"
          /\b([2-9]|\d{2})\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:relevant|hands-on|industry|work)?\s*experience/i, // "3+ years of experience"
          /(?:minimum|at\s*least|requires?)\s*([2-9]|\d{2})\+?\s*(?:years?|yrs?)/i // "minimum 3 years"
        ];

        for (const pattern of highExperiencePatterns) {
          const match = descLower.match(pattern);
          if (match) {
            return false; // Exclude job requiring 2+ or more years of experience
          }
        }

        return true;
      });

      // Fallback: If strict filtering eliminated too many, return whatever entry-level posts remained
      if (filteredJobs.length === 0 && mappedJobs.length > 0) {
        filteredJobs = mappedJobs.filter((job: any) => {
          const titleLower = job.title.toLowerCase();
          return !["senior", "sr.", "lead", "principal", "staff", "director"].some(st => titleLower.includes(st));
        });
      }
    }

    return NextResponse.json({ success: true, jobs: filteredJobs });
  } catch (error) {
    console.error("Agent Scout Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch jobs." }, { status: 500 });
  }
}
