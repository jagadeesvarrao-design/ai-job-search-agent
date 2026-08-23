import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Aneevarp Solutions & AI Job Search Agent",
  description: "Read our comprehensive privacy policy covering our Zero-Backend architecture, Google AdSense cookies, Google Consent Mode v2, and user data rights.",
  alternates: {
    canonical: "/privacy",
  }
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">Privacy Policy</h1>
      
      <div className="prose prose-invert prose-teal max-w-none space-y-8 text-slate-300 text-base leading-relaxed">
        <p className="text-sm text-teal-400 font-medium">Last Updated: August 23, 2026 | Effective Date: July 29, 2026</p>

        <section className="glass p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Introduction & Operating Entity</h2>
          <p>
            This Privacy Policy applies to the <strong>AI Job Search Agent</strong> platform operated by <strong>Aneevarp Solutions</strong> ("we", "us", or "our"). We are committed to maintaining the highest standards of data privacy, user autonomy, and technical transparency.
          </p>
        </section>

        <section className="glass p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Our Zero-Backend Architecture (How We Protect You)</h2>
          <p>
            Unlike traditional recruitment tools that store your resume, telephone numbers, and employment history in cloud databases, this application operates under a strict <strong>Zero-Backend Architecture</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No Database Storage:</strong> We do not store or persist your resume or personal profile data in any centralized database.</li>
            <li><strong>Local Browser Memory:</strong> Your uploaded PDF resume is converted to an encoded text string directly in your browser's local storage and memory.</li>
            <li><strong>Stateless AI Streaming:</strong> When generating cover letters or scoring matches, your resume data is transmitted over encrypted TLS connections to Google Gemini AI API endpoints statelessly and is discarded immediately after generation.</li>
          </ul>
        </section>

        <section className="glass p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Google AdSense, DoubleClick Cookies & Consent Mode v2</h2>
          <p>
            This website partners with <strong>Google AdSense</strong>, a web advertising service provided by Google LLC, to display contextual and interest-based advertisements.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google and its third-party ad technology partners use cookies, web beacons, and unique device identifiers to serve advertisements based on your visits to this website and other websites across the internet.</li>
            <li>Google's use of the <strong>DoubleClick cookie</strong> enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
            <li><strong>Google Consent Mode v2:</strong> In compliance with EEA, UK, and Swiss regulations, our platform implements Google Consent Mode v2. Non-essential cookies and ad personalization tags remain inactive until you explicitly grant consent through our cookie preferences banner.</li>
            <li>You can opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Google Ads Settings</a> or through the <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Network Advertising Initiative</a>.</li>
            <li>For comprehensive details on how Google uses data from partner sites, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Google’s Privacy & Terms</a>.</li>
          </ul>
        </section>

        <section className="glass p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Third-Party Job Data (Google Jobs & SerpApi)</h2>
          <p>
            Job search queries are processed using real-time search engine APIs (including SerpApi and Google Jobs). These requests transmit your search parameters (job title and desired location) over encrypted connections to return public job postings. No personal resume data is shared with search providers.
          </p>
        </section>

        <section className="glass p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Your Data Protection Rights (GDPR & CCPA)</h2>
          <p>
            Depending on your jurisdiction, you hold the right to access, rectify, or erase your personal information. Because our platform does not maintain a server-side user database, you have complete autonomous control: clearing your browser cache and local storage instantly and permanently deletes all resume data from your device.
          </p>
        </section>

        <section className="glass p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Contact & Data Controller Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or the data handling practices of <strong>Aneevarp Solutions</strong>, please contact our privacy team at:
          </p>
          <div className="mt-2 text-sm text-teal-400">
            <strong>Email:</strong> <a href="mailto:support.zenresume@gmail.com" className="hover:underline">support.zenresume@gmail.com</a>
          </div>
        </section>
      </div>
    </div>
  );
}
