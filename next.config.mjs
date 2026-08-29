/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure power header is disabled to prevent framework fingerprinting
  poweredByHeader: false,
  // Compress assets using gzip/brotli
  compress: true,
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent Clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME-type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Prevent referrer leakage
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restrict browser features & sensors (Zero unauthorized device access)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=(), interest-cohort=(), payment=(), usb=(), accelerometer=(), gyroscope=()",
          },
          // Enforce HTTPS across all subdomains for 1 year with HSTS Preload
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Prevent XSS filter disablement in legacy browsers
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Cross-Origin-Opener-Policy (Prevents window.opener exploitation)
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          // Cross-Origin-Resource-Policy (Protects server assets from hotlinking)
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
          // Content Security Policy (Strict Whitelist)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://*.firebaseapp.com https://pagead2.googlesyndication.com https://*.google.com https://*.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https: https://lh3.googleusercontent.com",
              "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.serpapi.com https://api.twilio.com https://ai-job-search-agent-chi.vercel.app https://zenresume.vercel.app https://zenresume.online",
              "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://googleads.g.doubleclick.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          // Cache-Busting for HTML Documents (Ensures instant updates across all client devices)
          {
            key: "Cache-Control",
            value: "no-cache, no-store, max-age=0, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
