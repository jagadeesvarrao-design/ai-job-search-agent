import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Strict reconnaissance & exploit probe patterns
const FORBIDDEN_PATHS = [
  "/.env",
  "/.git",
  "/wp-admin",
  "/wp-login.php",
  "/phpmyadmin",
  "/admin.php",
  "/.aws",
  "/.ssh",
  "/config.json",
  "/database.yml",
  "/server-status",
  "/xmlrpc.php",
  "/.well-known/security.txt.bak",
  "/debug/default/view",
  "/actuator",
  "/console"
];

// 2. Malicious user agents (Scrapers, SQLi tools, automated vulnerability scanners)
const SUSPICIOUS_AGENTS = [
  "sqlmap",
  "nikto",
  "dirbuster",
  "hydra",
  "w3af",
  "acunetix",
  "havij",
  "masscan",
  "zgrab",
  "nmap"
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  // A. Block malicious scanner User Agents
  if (SUSPICIOUS_AGENTS.some(tool => userAgent.includes(tool))) {
    return new NextResponse("Forbidden: Request Blocked by WAF", { status: 403 });
  }

  // B. Block known sensitive file probes & vulnerability discovery attempts
  for (const forbidden of FORBIDDEN_PATHS) {
    if (pathname === forbidden || pathname.startsWith(`${forbidden}/`) || pathname.includes(forbidden)) {
      return new NextResponse("Forbidden: Access Denied", { status: 403 });
    }
  }

  // C. Block suspicious URL query attacks (Path Traversal, LFI, SQLi, XSS, Command Injection)
  const rawSearch = request.nextUrl.search.toLowerCase();
  let decodedSearch = "";
  try {
    decodedSearch = decodeURIComponent(rawSearch).toLowerCase();
  } catch {
    return new NextResponse("Bad Request: Malformed URI Encoding", { status: 400 });
  }

  const combinedSearch = `${rawSearch} ${decodedSearch}`;
  if (
    combinedSearch.includes("../") ||
    combinedSearch.includes("..\\") ||
    combinedSearch.includes("%2e%2e") ||
    combinedSearch.includes("<script") ||
    combinedSearch.includes("%3cscript") ||
    combinedSearch.includes("union select") ||
    combinedSearch.includes("union+select") ||
    combinedSearch.includes("exec(") ||
    combinedSearch.includes("/bin/sh") ||
    combinedSearch.includes("/bin/bash")
  ) {
    return new NextResponse("Bad Request: Malicious Pattern Detected", { status: 400 });
  }

  // D. Enforce Safe Request Methods on API Routes
  if (pathname.startsWith("/api/")) {
    const allowedMethods = ["GET", "POST", "OPTIONS", "HEAD"];
    if (!allowedMethods.includes(request.method)) {
      return new NextResponse("Method Not Allowed", { 
        status: 405, 
        headers: { "Allow": "GET, POST, OPTIONS, HEAD" } 
      });
    }

    // CORS & Origin verification on Mutating State (POST requests)
    if (request.method === "POST") {
      const origin = request.headers.get("origin");
      const host = request.headers.get("host");

      // Verify Origin matches Host if present (CSRF prevention)
      if (origin && host) {
        try {
          const originUrl = new URL(origin);
          const originHost = originUrl.host.toLowerCase();
          const originHostname = originUrl.hostname.toLowerCase();
          const currentHost = host.toLowerCase();

          // Strictly pin authorized production domains and local development hostnames
          const isAllowedDomain = 
            originHost === currentHost || 
            originHostname === "ai-job-search-agent-chi.vercel.app" || 
            originHostname === "zenresume.online" ||
            originHostname === "www.zenresume.online" ||
            originHostname === "localhost" ||
            originHostname === "127.0.0.1";

          if (!isAllowedDomain) {
            return new NextResponse("Cross-Origin Request Blocked", { status: 403 });
          }
        } catch {
          return new NextResponse("Bad Request: Malformed Origin Header", { status: 400 });
        }
      } else if (request.headers.get("referer") && host) {
        // Fallback: If Origin is omitted by browser, validate Referer host
        try {
          const refUrl = new URL(request.headers.get("referer")!);
          const refHost = refUrl.host.toLowerCase();
          const refHostname = refUrl.hostname.toLowerCase();
          const currentHost = host.toLowerCase();

          const isAllowedRef = 
            refHost === currentHost ||
            refHostname === "ai-job-search-agent-chi.vercel.app" ||
            refHostname === "zenresume.online" ||
            refHostname === "www.zenresume.online" ||
            refHostname === "localhost" ||
            refHostname === "127.0.0.1";

          if (!isAllowedRef) {
            return new NextResponse("Cross-Origin Request Blocked", { status: 403 });
          }
        } catch {
          return new NextResponse("Bad Request: Malformed Referer Header", { status: 400 });
        }
      }
    }
  }

  // E. Injected Response Headers for Security
  const response = NextResponse.next();
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Download-Options", "noopen");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
