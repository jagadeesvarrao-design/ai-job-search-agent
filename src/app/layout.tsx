import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/HeaderNav";
import CookieConsent from "@/components/CookieConsent";
import { AuthProvider } from "@/lib/auth-context";
import Link from "next/link";
import { Briefcase, Building2, Scale, ShieldCheck } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#00685F",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-job-search-agent-chi.vercel.app"),
  title: {
    default: "ZenScout AI | Autonomous Job Search & Career Automation Suite",
    template: "%s | ZenScout AI by Aneevarp Solutions",
  },
  description:
    "Automate your entire job hunt with ZenScout AI. Scout real-time jobs, calculate ATS resume match scores, generate tailored cover letters, and master interviews with our AI Voice Coach. 100% Zero-Backend Privacy.",
  keywords: [
    "AI Job Search",
    "Autonomous Job Hunter",
    "ATS Resume Matcher",
    "AI Cover Letter Generator",
    "AI Interview Coach",
    "Job Scout AI",
    "Career Automation",
    "ZenScout AI",
    "ZenResume",
    "Aneevarp Solutions",
  ],
  authors: [{ name: "Aneevarp Solutions", url: "https://ai-job-search-agent-chi.vercel.app" }],
  creator: "Aneevarp Solutions",
  publisher: "Aneevarp Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-job-search-agent-chi.vercel.app",
    siteName: "ZenScout AI",
    title: "ZenScout AI | Autonomous Multi-Agent Job Search Pipeline",
    description:
      "Autonomous 4-Agent Career Pipeline: Scout live jobs, score ATS compatibility, auto-tailor cover letters, and practice with a real-time Voice AI Interview Coach. Built with Zero-Backend privacy.",
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
        "description": "Indian technology holding and software engineering organization operating ZenResume, ZenScout AI, and career utility platforms.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500081",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://github.com/jagadeesvarrao-design/ai-job-search-agent",
          "https://twitter.com/AneevarpSolutions"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "aneevarpsolutions@gmail.com",
          "contactType": "customer support",
          "areaServed": "IN, Worldwide"
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
          "priceCurrency": "INR"
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary (llms.txt)" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full LLM Knowledge Base (llms-full.txt)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F5FAF8] text-[#09090B] font-sans antialiased selection:bg-[#00685F] selection:text-white">
        
        {/* Web Accessibility: Skip to Main Content (RPwD Act 2016 / WCAG 2.1 AA) */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#00685F] focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Authentication Context Provider */}
        <AuthProvider>
          {/* Top Header & Ecosystem Navigation */}
          <HeaderNav />

          {/* Main Workspace */}
          <main id="main-content" className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8">
            {children}
          </main>
        </AuthProvider>
        
        {/* Statutory Enterprise Footer */}
        <footer className="w-full bg-white dark:bg-[#141B20] border-t border-[#E2E8F0] dark:border-[#232D36] mt-auto">
          <div className="w-full py-8 px-4 md:px-8 max-w-[1280px] mx-auto flex flex-col gap-6">
            
            {/* Top Footer Row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                <div className="flex items-center gap-2 font-black text-base text-black dark:text-white">
                  <div className="bg-[#00685F] text-white p-1.5 rounded-lg shadow-sm">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <span>ZenScout AI</span>
                </div>
                <span className="text-xs text-[#1E293B] dark:text-slate-300 font-medium md:border-l md:border-[#E2E8F0] dark:md:border-[#232D36] md:pl-3">
                  © {new Date().getFullYear()} ZenScout AI. Engineered by <strong className="text-black dark:text-white">Aneevarp Solutions</strong>.
                </span>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#0F172A] dark:text-slate-200" aria-label="Footer Navigation">
                <Link href="/about" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors">About</Link>
                <Link href="/contact" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors">Contact & Grievance</Link>
                <Link href="/blog" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors">Blog</Link>
                <Link href="/privacy" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors">Privacy Policy (DPDP)</Link>
                <Link href="/terms" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors">Terms of Service</Link>
              </nav>
            </div>

            {/* Bottom Statutory Disclosure Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-[#64748B] dark:text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
              <div>
                <span>Operating Entity: <strong>Aneevarp Solutions</strong> (Hyderabad, Telangana, India) • Country of Origin: <strong>India</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span>Grievance Desk: <a href="mailto:aneevarpsolutions@gmail.com" className="text-[#00685F] dark:text-[#2DD4BF] underline">aneevarpsolutions@gmail.com</a></span>
                <span>•</span>
                <span>DPDP Act 2023 Compliant</span>
              </div>
            </div>

          </div>
        </footer>

        {/* Cookie Consent */}
        <CookieConsent />
      </body>
    </html>
  );
}
