import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Briefcase, User, Sparkles } from "lucide-react";
import CookieConsent from "@/components/CookieConsent";
import HeaderNav from "@/components/HeaderNav";
import { AuthProvider } from "@/lib/auth-context";

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
    default: "ZenScout AI | Autonomous Career Automation by Aneevarp Solutions",
    template: "%s | ZenScout AI"
  },
  description: "Automate your entire job hunt with ZenScout AI. Discover verified job postings, score resume compatibility, generate personalized cover letters, and prepare with interactive AI mock interviews. Built by Aneevarp Solutions alongside ZenResume.",
  keywords: [
    "ZenScout AI",
    "ZenScout",
    "ZenResume ecosystem",
    "autonomous job hunter",
    "resume ATS scanner",
    "AI cover letter generator",
    "AI mock interview coach",
    "zero backend career tools",
    "Aneevarp Solutions career suite"
  ],
  authors: [{ name: "Aneevarp Solutions", url: "https://ai-job-search-agent-chi.vercel.app/about" }],
  creator: "Aneevarp Solutions",
  publisher: "Aneevarp Solutions",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZenScout AI | Autonomous Job Hunting by Aneevarp Solutions",
    description: "Discover live jobs, score your resume match, generate bespoke cover letters, and practice with AI interview coaching. 100% privacy-first zero-backend architecture.",
    url: "https://ai-job-search-agent-chi.vercel.app",
    siteName: "ZenScout AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenScout AI | Automate Your Job Hunt",
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
        "description": "Parent technology organization engineering ZenResume, ZenScout AI, and privacy-first career tools.",
        "sameAs": [
          "https://github.com/jagadeesvarrao-design/ai-job-search-agent",
          "https://twitter.com/AneevarpSolutions"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "aneevarpsolutions@gmail.com",
          "contactType": "customer support"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://ai-job-search-agent-chi.vercel.app/#website",
        "url": "https://ai-job-search-agent-chi.vercel.app",
        "name": "ZenScout AI",
        "description": "Autonomous multi-agent pipeline for discovery, resume scoring, cover letters, and interview coaching.",
        "publisher": {
          "@id": "https://ai-job-search-agent-chi.vercel.app/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebApplication",
        "@id": "https://ai-job-search-agent-chi.vercel.app/#webapp",
        "name": "ZenScout AI",
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
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F5FAF8] text-[#09090B] font-sans antialiased selection:bg-[#00685F] selection:text-white">
        {/* Authentication Context Provider */}
        <AuthProvider>
          {/* Top Header & Ecosystem Navigation */}
          <HeaderNav />

          {/* Main Workspace */}
          <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8">
            {children}
          </main>
        </AuthProvider>
        
        {/* Footer */}
        <footer className="w-full bg-white border-t border-[#E2E8F0] mt-auto">
          <div className="w-full py-8 px-4 md:px-8 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
              <div className="flex items-center gap-2 font-black text-base text-black">
                <div className="bg-[#00685F] text-white p-1.5 rounded-lg">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span>ZenScout AI</span>
              </div>
              <span className="text-xs text-[#1E293B] font-medium md:border-l md:border-[#E2E8F0] md:pl-3">
                © {new Date().getFullYear()} ZenScout AI. Part of the <strong className="text-black">Aneevarp Solutions</strong> career suite.
              </span>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#0F172A]" aria-label="Footer Navigation">
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
