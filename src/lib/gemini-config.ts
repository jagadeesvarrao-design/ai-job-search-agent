/**
 * Enterprise Gemini API Key Resolver
 * Ensures genuine Google Gemini API keys from process.env are resolved cleanly
 * without runtime filesystem scanning that impacts serverless cold-starts or traces unintended files.
 */
export function getGeminiApiKey(): string {
  const envKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();
  let key = envKey;
  
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }

  // Ensure invalid overrides (e.g. accidental OpenAI sk- keys) are rejected
  if (key && !key.startsWith("sk-")) {
    return key;
  }

  return "";
}
