import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Briefcase, ShieldCheck, Heart } from "lucide-react";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0f172a",
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
        "featureList": [
          "Agent Scout: Real-time job discovery via Google Jobs API",
          "Agent Filter: PDF resume semantic compatibility scoring",
          "Agent Factory: Hyper-personalized cover letter generation",
          "Agent Coach: Interactive technical and behavioral interview simulation",
          "Zero-Backend Architecture: 100% client-side privacy without database storage"
        ],
        "creator": {
          "@id": "https://ai-job-search-agent-chi.vercel.app/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-white">
        <header className="glass sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group" aria-label="AI Job Search Agent Home">
            <div className="bg-gradient-to-br from-teal-500 to-orange-500 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md shadow-teal-500/20">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-lg tracking-tight text-white leading-tight">Job Agent</span>
              <span className="text-[10px] text-teal-400 font-medium tracking-wider uppercase">by Aneevarp Solutions</span>
            </div>
          </Link>
          <nav className="flex gap-6 items-center" aria-label="Main Navigation">
            <Link href="/blog" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Blog</Link>
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">About</Link>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Dashboard</Link>
            <Link href="/profile" className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm">
              My Profile
            </Link>
          </nav>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8">
          {children}
        </main>
        
        <footer className="w-full border-t border-white/10 mt-20 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-400" />
                <span className="font-bold text-lg text-white">AI Job Agent</span>
              </div>
              <p className="text-xs text-slate-400 text-center md:text-left max-w-sm">
                Autonomous multi-agent recruitment suite engineered by <strong className="text-slate-200">Aneevarp Solutions</strong>. Privacy-first Zero-Backend architecture.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog & Guides</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>

            <div className="flex flex-col items-center md:items-end text-xs text-slate-400 gap-1">
              <span>&copy; {new Date().getFullYear()} AI Job Agent.</span>
              <span className="text-slate-400 font-medium">A Product of Aneevarp Solutions</span>
            </div>
          </div>
        </footer>

        {/* Google Consent Mode v2 Cookie Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}
