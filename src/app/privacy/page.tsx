import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, UserCheck, RefreshCw, Mail, Building2, Scale, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ZenScout AI by Aneevarp Solutions",
  description: "Comprehensive Privacy Policy for ZenScout AI by Aneevarp Solutions, compliant with Digital Personal Data Protection Act 2023 (DPDP Act), IT Act 2000, GDPR, and Google AdSense policies.",
  alternates: {
    canonical: "/privacy",
  }
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-2 md:px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#00685F]/10 dark:bg-teal-900/30 text-[#00685F] dark:text-[#2DD4BF] text-xs font-black px-3.5 py-1.5 rounded-full mb-3">
          <ShieldCheck className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" />
          <span>STATUTORY DATA PROTECTION NOTICE</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#171D1C] dark:text-white tracking-tight mb-2">
          Privacy Policy & DPDP Act Notice
        </h1>
        <p className="text-xs text-[#545F73] dark:text-slate-400 font-bold">
          Last Updated & Effective Date: August 24, 2026 | Version 2.4 (Statutory Indian & Global Compliance Edition)
        </p>
      </div>
      
      <div className="space-y-6 text-[#3D4947] dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
        
        {/* 1. Operating Entity & Statutory Identifiers */}
        <section className="bg-white dark:bg-[#141B20] p-6 md:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#00685F] dark:text-[#2DD4BF] font-bold text-lg">
            <Building2 className="w-5 h-5" />
            <h2>1. Operating Entity & Statutory Corporate Details</h2>
          </div>
          <p>
            This Privacy Policy and Statutory Notice is published pursuant to <strong>Section 43A of the Information Technology Act, 2000</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules)</strong>, and <strong>Sections 5 & 6 of the Digital Personal Data Protection Act, 2023 (DPDP Act, 2023)</strong>.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-[#1A2228] rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 font-medium">
            <div><strong>Operating Legal Entity:</strong> Aneevarp Solutions</div>
            <div><strong>Registered Jurisdiction:</strong> Hyderabad / Telangana, India (Ministry of Corporate Affairs / Govt of India Framework)</div>
            <div><strong>Product Suite:</strong> ZenScout AI (Autonomous Career Assistant) & ZenResume (ATS Resume Builder)</div>
            <div><strong>Official Corporate Email:</strong> <a href="mailto:aneevarpsolutions@gmail.com" className="text-[#00685F] dark:text-[#2DD4BF] underline">aneevarpsolutions@gmail.com</a></div>
            <div><strong>Country of Origin:</strong> India (Global Operations)</div>
          </div>
        </section>

        {/* 2. Zero-Backend Architecture & Data Sovereignty */}
        <section className="bg-white dark:bg-[#141B20] p-6 md:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#00685F] dark:text-[#2DD4BF] font-bold text-lg">
            <Lock className="w-5 h-5" />
            <h2>2. Zero-Backend Privacy Architecture (How We Protect You)</h2>
          </div>
          <p>
            Unlike traditional recruitment portals that monetize candidate profiles or aggregate personal information in persistent cloud databases, ZenScout AI is engineered with a strict <strong>Zero-Backend Privacy Architecture</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No Persistent Database Storage:</strong> We do not store or persist your resume, contact number, employment history, or work projects in any centralized database.</li>
            <li><strong>Local Browser Memory:</strong> Your uploaded PDF resume, target roles, and application records exist strictly in your browser's private local storage.</li>
            <li><strong>Stateless AI Ingestion:</strong> When evaluating ATS match compatibility, drafting cover letters, or conducting voice mock interviews, data is encrypted via TLS 1.3 to Google Gemini 2.5 Flash API endpoints, processed statelessly in memory, and immediately discarded.</li>
          </ul>
        </section>

        {/* 3. DPDP Act 2023 Itemized Notice & Consent */}
        <section className="bg-white dark:bg-[#141B20] p-6 md:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#00685F] dark:text-[#2DD4BF] font-bold text-lg">
            <FileText className="w-5 h-5" />
            <h2>3. Itemized Notice & Consent Architecture (DPDP Act, 2023 - Sections 5 & 6)</h2>
          </div>
          <p>
            In compliance with Section 5 of the DPDP Act 2023, we provide notice of the categories of digital personal data processed and their specific, limited purposes:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-black dark:text-white">
                  <th className="p-2.5 border border-slate-200 dark:border-slate-800">Data Category</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-800">Specific Purpose</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-800">Storage Location & Retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Resume PDF & Work Profile</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">Calculating ATS score, custom letterhead generation, and mock interview context</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">Client-Side LocalStorage only. Erased on cache clear.</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Job Search Query & Location</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">Fetching live job listings from Google Jobs / SerpApi</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">Ephemeral API request. Never linked to identity.</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Contact Inbound Inquiries</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">Customer assistance, feedback ticketing, and technical support</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">Encrypted Email dispatch to aneevarpsolutions@gmail.com.</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">Authentication Profile</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">Single Sign-On (SSO) and binding Pro subscription tier</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">Encrypted Firebase Auth session token.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Data Principal Statutory Rights Portal */}
        <section className="bg-white dark:bg-[#141B20] p-6 md:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#00685F] dark:text-[#2DD4BF] font-bold text-lg">
            <UserCheck className="w-5 h-5" />
            <h2>4. Data Principal Rights (DPDP Act 2023 - Sections 11, 12, 13 & GDPR)</h2>
          </div>
          <p>
            As a Data Principal under Indian law and international privacy frameworks, you possess complete autonomous statutory rights:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-[#1A2228] rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>1. Right to Access & Summary:</strong> You can review all cached resume data and active parameters directly inside your Profile page.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#1A2228] rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>2. Right to Correction / Updating:</strong> You may edit, replace, or overwrite your resume and personal details at any time in 1-click.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#1A2228] rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>3. Right to Erasure ("Right to be Forgotten"):</strong> Click "Delete All Local Workspace Data" in the Account drawer to immediately purge 100% of stored data.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#1A2228] rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>4. Right to Withdraw Consent:</strong> You can withdraw cookie or processing consent at any time via our Cookie Preferences modal.
            </div>
          </div>
        </section>

        {/* 5. Google AdSense & Cookies */}
        <section className="bg-white dark:bg-[#141B20] p-6 md:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#00685F] dark:text-[#2DD4BF] font-bold text-lg">
            <RefreshCw className="w-5 h-5" />
            <h2>5. Google AdSense, DoubleClick Cookies & 100% Ad-Free Guarantee</h2>
          </div>
          <p>
            For free tier users, this website partners with <strong>Google AdSense</strong> (Google LLC) to display contextual advertisements.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs">
            <li>Google and its certified ad vendors use cookies, web beacons, and device identifiers to serve ads based on prior website visits.</li>
            <li><strong>100% Ad-Free Guarantee for Pro Users:</strong> Upon activating any ZenScout Pro subscription, our platform automatically unmounts all Google AdSense scripts and completely suppresses all display advertising.</li>
            <li>You can manage personalized ad preferences via <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#00685F] dark:text-[#2DD4BF] underline font-bold">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-[#00685F] dark:text-[#2DD4BF] underline font-bold">AboutAds</a>.</li>
          </ul>
        </section>

        {/* 6. Statutory Grievance Redressal Officer (IT Rules 2021 & DPDP Act 2023) */}
        <section className="bg-emerald-50/40 dark:bg-emerald-950/20 p-6 md:p-8 rounded-3xl border-2 border-[#00685F]/30 dark:border-[#2DD4BF]/30 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#00685F] dark:text-[#2DD4BF] font-extrabold text-lg">
            <Scale className="w-5 h-5" />
            <h2>6. Statutory Grievance Redressal Officer (IT Rules 2021 / 2023 & DPDP Act)</h2>
          </div>
          <p className="text-xs">
            In compliance with <strong>Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong> and <strong>Section 13 of the DPDP Act, 2023</strong>, the details of the designated Grievance Officer and Data Protection Officer (DPO) are published below:
          </p>
          
          <div className="p-5 bg-white dark:bg-[#141B20] rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <div><strong>Designated Grievance & Data Protection Officer:</strong> P. JAGADEESWARA RAO</div>
            <div><strong>Official Designation:</strong> Head of Compliance & Technical Operations</div>
            <div><strong>Corporate Entity:</strong> Aneevarp Solutions</div>
            <div><strong>Physical Office Address:</strong> Hyderabad, Telangana - 500081, India</div>
            <div><strong>Direct Grievance Email:</strong> <a href="mailto:aneevarpsolutions@gmail.com" className="text-[#00685F] dark:text-[#2DD4BF] font-bold underline">aneevarpsolutions@gmail.com</a></div>
            <div><strong>Statutory Acknowledgment Timeline:</strong> Within 24 hours of ticket receipt</div>
            <div><strong>Statutory Redressal Timeline:</strong> Within 15 calendar days from the date of receipt</div>
          </div>
        </section>

        {/* 7. CERT-In Cyber Security Vulnerability Disclosure */}
        <section className="bg-white dark:bg-[#141B20] p-6 md:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#00685F] dark:text-[#2DD4BF] font-bold text-lg">
            <AlertCircle className="w-5 h-5" />
            <h2>7. CERT-In Cyber Security & Vulnerability Reporting Desk</h2>
          </div>
          <p className="text-xs">
            Pursuant to the <strong>CERT-In Cyber Security Directions (2022)</strong> issued by the Indian Computer Emergency Response Team (Ministry of Electronics and Information Technology, MeitY), we maintain a dedicated Vulnerability Reporting Desk for security researchers.
          </p>
          <p className="text-xs">
            If you discover any security anomaly, rate-limit flaw, or vulnerability, please report it immediately to our security response desk at <a href="mailto:aneevarpsolutions@gmail.com" className="text-[#00685F] dark:text-[#2DD4BF] font-bold underline">aneevarpsolutions@gmail.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
