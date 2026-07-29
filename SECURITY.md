# AI Job Search Agent - Architecture & Security Report

## Overview
The **AI Job Search Agent** is a cutting-edge, AI-powered platform designed to automate and enhance the job application process. By leveraging advanced generative AI, the platform acts as a personal career assistant, helping users find relevant jobs, tailor their resumes, generate cover letters, and prepare for interviews.

## Core Features
1. **Scout Agent:** Intelligently searches the web for live job postings tailored to the user's role and location preferences.
2. **Filter Agent:** Analyzes the user's resume against job descriptions to score compatibility and filter out irrelevant positions.
3. **Factory Agent:** Automatically generates highly personalized cover letters and optimizes resume bullet points for specific job applications.
4. **Coach Agent:** Simulates real-world, interactive technical and behavioral interviews with a virtual hiring manager.

## "Zero-Backend" Privacy Architecture
We believe user data should belong exclusively to the user. To guarantee complete data sovereignty, the application is built using a **Zero-Backend Architecture**.

- **No Databases:** We do not maintain any user databases.
- **Local Storage Only:** All personal information, job preferences, and resume data are stored exclusively on the user's local device (within their browser).
- **Ephemeral AI Processing:** When generating a cover letter or conducting an interview, data is sent securely to our AI providers over encrypted channels, processed in real-time, and immediately discarded.

---

## Security Measures & Hardening

To protect both our users and our infrastructure, the platform has undergone rigorous security auditing based on industry standards. The following protections are actively enforced:

### 1. Secret Leak Prevention
All third-party credentials (such as AI provider API keys) are strictly isolated to the server environment. No sensitive keys or tokens are ever exposed to the client-side browser, preventing credential theft.

### 2. Strict Input & Payload Validation
To protect against malicious Prompt Injections and Denial-of-Service (DoS) attacks via massive data payloads, the application enforces strict size limits on all user inputs:
- Document uploads are capped at 5 Megabytes.
- Text inputs (roles, locations, job descriptions) are strictly truncated to prevent buffer overflows or logic manipulation.

### 3. API Abuse Protection (Rate Limiting)
All AI-generation routes are protected by a custom, in-memory IP Rate Limiter. 
- Traffic is actively monitored, and requests are strictly capped to **10 requests per minute per user IP**. 
- This prevents automated bots from spamming the system, draining API billing quotas, or degrading the experience for legitimate users.

### 4. HTTP Security Headers
To defend against common browser-based attacks, the application serves strict HTTP security headers with every response:
- **Strict-Transport-Security (HSTS):** Forces all connections to use secure HTTPS.
- **X-Frame-Options (DENY):** Prevents Clickjacking by disallowing the site from being embedded in malicious iframes.
- **X-Content-Type-Options (nosniff):** Prevents MIME-sniffing attacks by forcing the browser to respect declared content types.
- **Referrer-Policy:** Protects user privacy by stripping cross-origin referrer information.

### 5. Cross-Site Scripting (XSS) Protection
The platform's frontend framework automatically sanitizes all dynamic user data before rendering it to the screen. This guarantees that malicious JavaScript cannot be injected into the application via resume text or AI responses.

## Conclusion
By combining a privacy-first "Zero-Backend" architecture with aggressive server-side rate limiting and strict payload validation, the AI Job Search Agent provides a secure, private, and highly resilient environment for modern job seekers.
