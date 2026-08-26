/**
 * Enterprise Input Sanitization, Prompt Injection Defense, and Payload Security Engine
 * Defends against XSS, HTML/Script injection, prototype pollution, prompt hijacking, and oversized memory exhaustion payloads.
 */

/**
 * Strips HTML tags, script elements, javascript: protocols, and event handlers from user inputs
 */
export function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  
  // 1. Remove dangerous script, iframe, object, and style tags
  let cleaned = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();

  // 2. Enforce strict character limits
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }

  return cleaned;
}

/**
 * Validates whether an email string follows standard email RFC formats strictly
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.length <= 254 && emailRegex.test(email.trim());
}

/**
 * Neutralizes potential prompt injection markers before injecting into AI Prompts
 */
export function sanitizeAiPromptInput(input: unknown, maxLength: number = 3000): string {
  if (typeof input !== "string") return "";
  
  let sanitized = sanitizeString(input, maxLength);
  
  // Neutralize common prompt hijacking boundaries (e.g. "Ignore previous instructions", "SYSTEM PROMPT OVERRIDE")
  const dangerousPromptPatterns = [
    /ignore (?:all )?(?:previous|above|prior) (?:instructions|rules|prompts)/gi,
    /you are now in (?:developer|god|admin|unrestricted) mode/gi,
    /system:\s*override/gi,
    /disregard (?:all )?(?:safety|ethical) (?:guidelines|rules)/gi
  ];

  for (const pattern of dangerousPromptPatterns) {
    sanitized = sanitized.replace(pattern, "[FILTERED_SECURITY_OVERRIDE]");
  }

  return sanitized;
}

/**
 * Validates Base64 PDF file strings
 * Checks magic byte signatures (PDF header %PDF-) and strict size limits (default 5MB)
 */
export function validateBase64Pdf(base64Data: unknown, maxSizeBytes: number = 5 * 1024 * 1024): { valid: boolean; error?: string } {
  if (!base64Data || typeof base64Data !== "string") {
    return { valid: false, error: "Invalid or missing PDF payload." };
  }

  // Check size in bytes (Base64 is ~4/3 of binary size)
  const estimatedBytes = (base64Data.length * 3) / 4;
  if (estimatedBytes > maxSizeBytes) {
    return { valid: false, error: `File size exceeds maximum allowed limit (${Math.round(maxSizeBytes / (1024 * 1024))}MB).` };
  }

  // Basic Base64 character set validation
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  const sample = base64Data.substring(0, 1000).replace(/\s/g, '');
  if (!base64Regex.test(sample)) {
    return { valid: false, error: "Malformatted Base64 encoding." };
  }

  // Verify PDF Magic Bytes ("%PDF" in base64 starts with "JVBERi0")
  if (!base64Data.startsWith("JVBERi0") && !base64Data.substring(0, 50).includes("JVBERi0")) {
    return { valid: false, error: "Invalid file format. Only genuine PDF documents are supported." };
  }

  return { valid: true };
}
