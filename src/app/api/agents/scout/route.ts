import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeString } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // Rate limit: 12 requests per minute per IP to prevent scraping / API quota exhaustion
    const rateCheck = checkRateLimit(`scout:${ip}`, 12, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many job search requests. Please slow down and try again in a moment." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const rawRole = body.role;
    const rawLocation = body.location;
    const rawExperience = body.experience;

    // Sanitize user inputs
    const role = sanitizeString(rawRole, 150);
    const location = sanitizeString(rawLocation, 150);
    const experience = sanitizeString(rawExperience, 50);

    if (!role || !location) {
      return NextResponse.json({ success: false, error: "Role and location are required parameters." }, { status: 400 });
    }

    const apiKey = process.env.SERP_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Search service is currently unavailable." }, { status: 503 });
    }

    // Build specialized search query based on experience level
    let specializedRole = role;
    const exp = (experience || "").toLowerCase();

    const isFresher = exp === "fresher" || exp === "0" || exp === "0-1" || exp === "entry level" || exp === "internship";

    if (isFresher) {
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
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    const response = await fetch(url, { 
      cache: "no-store",
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Search provider returned status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.jobs_results || !Array.isArray(data.jobs_results)) {
      return NextResponse.json({ success: true, jobs: [] });
    }

    // Map SerpApi results and apply rigorous experience filtering
    const mappedJobs = data.jobs_results.map((job: any) => ({
      id: String(job.job_id || Math.random().toString(36).substring(7)),
      title: sanitizeString(job.title || "Job Title", 200),
      company: sanitizeString(job.company_name || "Company", 150),
      location: sanitizeString(job.location || location, 150),
      salary: job.detected_extensions?.salary ? sanitizeString(job.detected_extensions.salary, 100) : undefined,
      postedAt: job.detected_extensions?.posted_at ? sanitizeString(job.detected_extensions.posted_at, 50) : "Recently",
      description: sanitizeString(job.description || "", 8000),
      matchScore: 0,
      status: "New Matches",
      applyLink: typeof job.related_links?.[0]?.link === "string" ? job.related_links[0].link : "",
      source: sanitizeString(job.via || "Direct Employer", 100)
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

        // 2. Scan text for explicit high year requirements
        const highExperiencePatterns = [
          /\b([2-9]|\d{2})\+?\s*(?:to|-)\s*\d+\s*(?:years?|yrs?)/i,
          /\b([2-9]|\d{2})\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:relevant|hands-on|industry|work)?\s*experience/i,
          /(?:minimum|at\s*least|requires?)\s*([2-9]|\d{2})\+?\s*(?:years?|yrs?)/i
        ];

        for (const pattern of highExperiencePatterns) {
          if (pattern.test(descLower)) {
            return false;
          }
        }

        return true;
      });

      // Fallback if strict filter eliminated all
      if (filteredJobs.length === 0 && mappedJobs.length > 0) {
        filteredJobs = mappedJobs.filter((job: any) => {
          const titleLower = job.title.toLowerCase();
          return !["senior", "sr.", "lead", "principal", "staff", "director"].some(st => titleLower.includes(st));
        });
      }
    }

    return NextResponse.json({ success: true, jobs: filteredJobs });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: "Failed to retrieve job opportunities. Please try again shortly." 
    }, { status: 500 });
  }
}
