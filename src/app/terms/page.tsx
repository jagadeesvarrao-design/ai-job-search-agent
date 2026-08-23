import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ZenScout AI by Aneevarp Solutions",
  description: "Terms of Service and legal conditions for using the ZenScout AI platform provided by Aneevarp Solutions.",
  alternates: {
    canonical: "/terms",
  }
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-2 md:px-4">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-[#171D1C] tracking-tight">Terms of Service</h1>
      
      <div className="space-y-6 text-[#3D4947] text-sm md:text-base leading-relaxed">
        <p className="text-xs text-[#00685F] font-bold">Last Updated: August 23, 2026 | Effective Date: July 29, 2026</p>

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-[#171D1C]">1. Agreement to Terms</h2>
          <p>
            By accessing or utilizing the <strong>ZenScout AI</strong> platform operated by <strong>Aneevarp Solutions</strong> ("we", "us", or "our"), creators of <strong>ZenResume</strong>, you confirm that you have read, understood, and agreed to be legally bound by these Terms of Service. If you disagree with any part of these terms, you must discontinue use immediately.
          </p>
        </section>

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-[#171D1C]">2. Scope of Service & Intellectual Property</h2>
          <p>
            ZenScout AI is an automated career acceleration suite engineered to discover employment listings, score resume compatibility, generate tailored application materials, and simulate interview coaching.
          </p>
          <p>
            All application architecture, software code, visual styling, brand trademarks, and proprietary multi-agent workflows are the exclusive intellectual property of <strong>Aneevarp Solutions</strong>.
          </p>
        </section>

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-[#171D1C]">3. Third-Party Job Listings & Advertisements</h2>
          <p>
            The platform displays external job listings aggregated via search APIs and advertisements provided by Google AdSense. 
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not control third-party employer websites, application tracking portals, or advertiser landing pages.</li>
            <li>We make no guarantees regarding the current status, salary accuracy, hiring outcome, or legitimacy of external job postings.</li>
            <li>Users interact with external employers and advertisers entirely at their own discretion and risk.</li>
          </ul>
        </section>

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-[#171D1C]">4. User Responsibilities & Acceptable Use</h2>
          <p>
            You agree to use this platform solely for legitimate job search and career development purposes. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Attempt to reverse-engineer, decompile, or scrape the platform using automated crawlers without written consent.</li>
            <li>Transmit malicious payloads, oversized files, or prompt injection scripts intended to degrade or compromise our serverless infrastructure.</li>
            <li>Abuse or circumvent the platform's API rate limiting protections.</li>
          </ul>
        </section>

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-[#171D1C]">5. Disclaimer of Warranties & Limitation of Liability</h2>
          <p>
            This service is provided strictly on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind. <strong>Aneevarp Solutions</strong> does not warrant that the service will be uninterrupted, error-free, or guarantee specific employment callbacks or offers.
          </p>
        </section>

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-[#171D1C]">6. Governing Law & Contact</h2>
          <p>
            These Terms are governed by and construed in accordance with applicable laws without regard to conflict of law principles. For legal inquiries, please contact:
          </p>
          <div className="mt-2 text-sm text-[#00685F]">
            <strong>Operating Organization:</strong> Aneevarp Solutions<br />
            <strong>Legal Contact:</strong> <a href="mailto:support.zenresume@gmail.com" className="hover:underline font-medium">support.zenresume@gmail.com</a>
          </div>
        </section>
      </div>
    </div>
  );
}
