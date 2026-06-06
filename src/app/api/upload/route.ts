import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/resumes so it's accessible via URL in our app
    const filename = `my_resume_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const uploadDir = path.join(process.cwd(), "public", "resumes");
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    // Return the URL path
    const url = `/resumes/${filename}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
