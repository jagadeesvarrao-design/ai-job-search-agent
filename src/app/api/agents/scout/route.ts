import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { role, location } = await request.json();

    if (!role || !location) {
      return NextResponse.json({ success: false, error: "Role and location are required." }, { status: 400 });
    }

    const apiKey = process.env.SERP_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "SerpApi Key is missing." }, { status: 500 });
    }

    // Build the query
    const query = `${role} in ${location}`;
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

    console.log("Scout API called URL:", url);
    console.log("Scout API returned keys:", Object.keys(data));
    if (data.error) console.log("Scout API Error from SerpApi:", data.error);

    if (!data.jobs_results) {
      console.log("No jobs_results found in data!");
      return NextResponse.json({ success: true, jobs: [] });
    }

    // Map SerpApi results to our standard Job format
    const jobs = data.jobs_results.map((job: any) => ({
      id: job.job_id,
      title: job.title,
      company: job.company_name,
      location: job.location,
      salary: job.detected_extensions?.salary || undefined,
      postedAt: job.detected_extensions?.posted_at || "Recently",
      description: job.description,
      matchScore: 0, // Will be updated by Agent B later
      status: "New Matches",
      applyLink: job.related_links?.[0]?.link || "",
      source: job.via || "Unknown Source"
    }));

    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error("Agent Scout Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch jobs." }, { status: 500 });
  }
}
