import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Briefcase, User, Sparkles } from "lucide-react";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const viewport: Viewport = {
  themeColor: "#00685f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-job-search-agent-chi.vercel.app"),
  title: {
    default: "AI Job Search Agent | Autonomous Career Automation by Aneevarp Solutions",
    template: "%s | AI Job Search Agent"
  },
  description: "Automate your entire job hunt with autonomous AI agents. Discover verified job postings, score resume compatibility, generate personalized cover letters, and prepare with interactive AI mock interviews. Built by Aneevarp Solutions.",
  keywords: [
    "AI job search agent",
    "autonomous job hunter",
    "resume ATS scanner",
    "AI cover letter generator",
    "AI mock interview coach",
    "zero backend resume tool",
    "automated job application",
    "Aneevarp Solutions career tools"
  ],
  authors: [{ name: "Aneevarp Solutions", url: "https://ai-job-search-agent-chi.vercel.app/about" }],
  creator: "Aneevarp Solutions",
  publisher: "Aneevarp Solutions",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Job Search Agent | Autonomous Job Hunting by Aneevarp Solutions",
    description: "Discover live jobs, score your resume match, generate bespoke cover letters, and practice with AI interview coaching. 100% privacy-first zero-backend architecture.",
    url: "https://ai-job-search-agent-chi.vercel.app",
    siteName: "AI Job Search Agent",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Job Search Agent | Automate Your Job Hunt",
    description: "Autonomous multi-agent pipeline for discovering jobs, filtering matches, creating cover letters, and coaching interviews.",
    creator: "@AneevarpSolutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Schema.org JSON-LD Structured Data
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ai-job-search-agent-chi.vercel.app/#organization",
        "name": "Aneevarp Solutions",
        "url": "https://ai-job-search-agent-chi.vercel.app",
        "logo": "https://ai-job-search-agent-chi.vercel.app/icon.png",
        "description": "Parent technology organization engineering autonomous AI agents, career automation suites, and privacy-first web software.",
        "sameAs": [
          "https://github.com/jagadeesvarrao-design/ai-job-search-agent",
          "https://twitter.com/AneevarpSolutions"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support.zenresume@gmail.com",
          "contactType": "customer support"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://ai-job-search-agent-chi.vercel.app/#website",
        "url": "https://ai-job-search-agent-chi.vercel.app",
        "name": "AI Job Search Agent",
        "description": "Autonomous multi-agent pipeline for discovery, resume scoring, cover letters, and interview coaching.",
        "publisher": {
          "@id": "https://ai-job-search-agent-chi.vercel.app/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebApplication",
        "@id": "https://ai-job-search-agent-chi.vercel.app/#webapp",
        "name": "AI Job Search Agent",
        "url": "https://ai-job-search-agent-chi.vercel.app",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All modern browsers (Chrome, Safari, Firefox, Edge)",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "2.0.0",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@id": "https://ai-job-search-agent-chi.vercel.app/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F5FAF8] text-[#171D1C] font-sans antialiased">
        {/* Stitch Style TopNavBar */}
        <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 shadow-sm transition-all">
          <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1280px] mx-auto h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group focus:outline-none" aria-label="CareerScout AI by Aneevarp Solutions">
              <div className="bg-[#00685F] text-white p-2 rounded-xl group-hover:scale-105 group-active:scale-95 transition-all shadow-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-lg text-[#171D1C] leading-none tracking-tight">CareerScout</span>
                <span className="text-[10px] text-[#00685F] font-semibold tracking-wider uppercase">by Aneevarp Solutions</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#545F73]" aria-label="Main Navigation">
              <Link href="/blog" className="hover:text-[#00685F] transition-colors py-1">Blog</Link>
              <Link href="/about" className="hover:text-[#00685F] transition-colors py-1">About</Link>
              <Link href="/dashboard" className="hover:text-[#00685F] transition-colors py-1">Dashboard</Link>
              <Link href="/profile" className="hover:text-[#00685F] transition-colors py-1">Profile</Link>
            </nav>

            {/* Quick Actions & Profile */}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#00685F] hover:bg-[#005049] text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all shadow-sm active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Launch Dashboard
              </Link>
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full bg-[#D5E0F8] hover:bg-[#C2D3F5] text-[#00685F] flex items-center justify-center transition-all active:scale-95"
                aria-label="Profile Settings"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8">
          {children}
        </main>
        
        {/* Stitch Style Footer */}
        <footer className="w-full bg-white border-t border-[#E2E8F0] mt-auto">
          <div className="w-full py-8 px-4 md:px-8 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
              <div className="flex items-center gap-2 font-bold text-base text-[#171D1C]">
                <div className="bg-[#00685F] text-white p-1.5 rounded-lg">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span>CareerScout AI</span>
              </div>
              <span className="text-xs text-[#545F73] md:border-l md:border-[#E2E8F0] md:pl-3">
                © {new Date().getFullYear()} CareerScout AI. A Product of <strong>Aneevarp Solutions</strong>.
              </span>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-xs font-medium text-[#545F73]" aria-label="Footer Navigation">
              <Link href="/about" className="hover:text-[#00685F] transition-colors">About</Link>
              <Link href="/contact" className="hover:text-[#00685F] transition-colors">Contact</Link>
              <Link href="/blog" className="hover:text-[#00685F] transition-colors">Blog</Link>
              <Link href="/privacy" className="hover:text-[#00685F] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#00685F] transition-colors">Terms of Service</Link>
            </nav>
          </div>
        </footer>

        {/* Cookie Consent */}
        <CookieConsent />
      </body>
    </html>
  );
}
