import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of strictly protected patterns / forbidden probe paths
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
  "/server-status"
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();

  // 1. Block common bot / attacker reconnaissance scanning
  for (const forbidden of FORBIDDEN_PATHS) {
    if (pathname.startsWith(forbidden) || pathname.includes(forbidden)) {
      return new NextResponse("Forbidden: Access Denied", { status: 403 });
    }
  }

  // 2. Block suspicious query parameter attacks (Path Traversal, LFI, SQLi patterns)
  const searchParams = request.nextUrl.search.toLowerCase();
  if (
    searchParams.includes("../") ||
    searchParams.includes("..\\") ||
    searchParams.includes("<script") ||
    searchParams.includes("union+select") ||
    searchParams.includes("exec(")
  ) {
    return new NextResponse("Bad Request: Malicious Pattern Detected", { status: 400 });
  }

  return NextResponse.next();
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
