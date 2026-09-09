import fs from "fs";
import path from "path";

/**
 * Enterprise Gemini API Key Resolver
 * Ensures genuine Google Gemini API keys (starting with AIzaSy or AQ.) from .env.local / .env
 * are prioritized over accidental OS system environment overrides (e.g. sk- OpenAI tokens).
 */
export function getGeminiApiKey(): string {
  try {
    const cwd = process.cwd();
    const envFiles = [".env.local", ".env"];
    for (const file of envFiles) {
      const fullPath = path.join(cwd, file);
      if (fs.existsSync(fullPath)) {
        const text = fs.readFileSync(fullPath, "utf-8");
        const lines = text.split("\n");
        for (const line of lines) {
          const match = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.*)$/);
          if (match && match[1]) {
            let key = match[1].trim();
            if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
              key = key.slice(1, -1).trim();
            }
            if (key && !key.startsWith("sk-")) {
              return key;
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn("Failed to parse .env file for Gemini Key:", err);
  }

  const envKey = (process.env.GEMINI_API_KEY || "").trim();
  return envKey;
}
