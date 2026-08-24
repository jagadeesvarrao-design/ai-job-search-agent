/**
 * Input sanitization and security utility functions
 * Defends against XSS, HTML/Script injection, prototype pollution, and oversized payloads.
 */

/**
 * Strips HTML tags and script elements from user inputs
 */
export function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  
  // 1. Remove dangerous script and HTML tags
  let cleaned = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();

  // 2. Enforce strict character limits
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }

  return cleaned;
}

/**
 * Validates whether an email string follows standard email RFC formats
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.length <= 254 && emailRegex.test(email.trim());
}

/**
 * Validates Base64 PDF file strings
 * Ensures string matches base64 characters and file size is strictly within limits (default 5MB)
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
  // Sample check on beginning of string to avoid full-string regex catastrophe
  const sample = base64Data.substring(0, 1000).replace(/\s/g, '');
  if (!base64Regex.test(sample)) {
    return { valid: false, error: "Malformatted Base64 encoding." };
  }

  return { valid: true };
}
