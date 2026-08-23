"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Zap, 
  Bot, 
  BrainCircuit, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  Cpu,
  Building2,
  FileCheck,
  Search,
  Check,
  FileText
} from "lucide-react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is ZenScout AI and how does it work with ZenResume?",
      a: "ZenScout AI is the autonomous job hunting intelligence platform built by Aneevarp Solutions alongside ZenResume. While ZenResume helps you build ATS-optimized resumes, ZenScout AI scans live job postings, scores your resume compatibility from 0-100%, drafts tailored cover letters, and coaches you through interviews."
    },
    {
      q: "How does the Zero-Backend Architecture protect my privacy?",
      a: "Unlike traditional platforms that store your resume, phone number, and employment history in cloud databases, ZenScout AI operates 100% in your browser's local memory. Your resume is base64 encoded client-side, sent statelessly to Google Gemini AI for processing, and never saved on our servers."
    },
    {
      q: "How does Agent Filter calculate my resume match score?",
      a: "Agent Filter uses advanced Gemini 2.5 Flash semantic embeddings to compare your past project achievements, technical competencies, and domain experience against the specific requirements in the job description. It generates an objective 0-100 score and highlights qualification strengths."
    },
    {
      q: "Can the AI write customized cover letters that pass ATS screening?",
      a: "Yes. Agent Factory analyzes both the job posting and your resume to generate a focused, professional 3-paragraph cover letter mapping your verifiable accomplishments to the company's core challenges. It avoids generic AI fluff and adheres to industry-standard formatting."
    },
    {
      q: "How does the AI Interview Coach work?",
      a: "Agent Coach simulates a live technical and behavioral hiring manager. It asks role-specific questions one at a time, evaluates your answers, and provides immediate constructive feedback to help you refine your verbal delivery before real interviews."
    },
    {
      q: "Is ZenScout AI completely free to use?",
      a: "Yes! ZenScout AI is a free, open career technology initiative engineered by Aneevarp Solutions. You don't need a credit card, subscription, or account to automate your job search."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="flex flex-col w-full text-center px-2 md:px-4">
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO SECTION WITH ANIMATED SCANNER */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] py-12 md:py-20 relative">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="bg-white border border-[#E2E8F0] shadow-soft px-5 py-2 rounded-full mb-8 inline-flex items-center gap-2 hover:shadow-md transition-all">
          <Sparkles className="w-4 h-4 text-orange-500 animate-spin duration-3000" />
          <span className="text-xs md:text-sm font-semibold text-[#171D1C]">
            Part of the <strong className="text-[#00685F]">ZenResume & Aneevarp Solutions</strong> Career Suite
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-[#171D1C] leading-[1.15]">
          Automate your <br className="hidden md:block" />
          <span className="text-gradient">Job Hunt</span> with ZenScout AI
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-[#545F73] max-w-2xl mb-10 leading-relaxed">
          Upload your resume and let 4 autonomous AI agents discover live opportunities, score skill compatibility, write tailored cover letters, and coach you through interviews.
        </p>

        {/* Tactile Call-To-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 z-10">
          <Link 
            href="/profile" 
            className="bg-[#00685F] hover:bg-[#005049] text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 btn-tactile"
          >
            Setup Free Profile <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#171D1C] px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center transition-all shadow-soft hover:shadow-md hover:-translate-y-0.5 active:scale-95 btn-tactile"
          >
            Launch Dashboard
          </Link>
        </div>

        {/* INTERACTIVE ANIMATED JOB SCANNER VISUAL */}
        <div className="w-full max-w-4xl mx-auto my-6 relative">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 md:p-8 text-left relative overflow-hidden">
            {/* Animated Laser Scanning Beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00685F] to-transparent opacity-80 animate-scan pointer-events-none shadow-[0_0_15px_#00685F]"></div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#00685F] flex items-center justify-center">
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#171D1C]">ZenScout AI Pipeline Active</h3>
                  <p className="text-xs text-[#545F73]">Streaming live career intelligence & scoring</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Live Scanner
                </span>
              </div>
            </div>

            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3 transition-all hover:bg-white hover:shadow-sm">
                <div className="p-2 rounded-xl bg-teal-100 text-[#00685F] mt-0.5">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#00685F]">Agent Scout</span>
                  <p className="text-xs font-bold text-[#171D1C] mt-0.5">18 Live Postings Found</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Google Jobs API verified</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3 transition-all hover:bg-white hover:shadow-sm">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 mt-0.5">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Agent Filter</span>
                  <p className="text-xs font-bold text-[#171D1C] mt-0.5">98% Match Score</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">ATS semantic keyword fit</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3 transition-all hover:bg-white hover:shadow-sm">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Agent Factory</span>
                  <p className="text-xs font-bold text-[#171D1C] mt-0.5">Tailored Letter Ready</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">3-paragraph impact pitch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Aesthetic Badges */}
          <div className="hidden lg:flex items-center gap-2 bg-white border border-[#E2E8F0] shadow-soft-hover px-4 py-2.5 rounded-2xl absolute -bottom-4 -left-6 animate-float">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-[#171D1C]">Zero-Backend Privacy (No DB)</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-white border border-[#E2E8F0] shadow-soft-hover px-4 py-2.5 rounded-2xl absolute -top-4 -right-6 animate-float-delayed">
            <Bot className="w-4 h-4 text-[#00685F]" />
            <span className="text-xs font-bold text-[#171D1C]">Gemini 2.5 Flash Mock Coach</span>
          </div>
        </div>
      </section>

      {/* 4 AGENTS PIPELINE SECTION */}
      <section className="py-20 flex flex-col items-center">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-widest text-[#00685F] font-bold mb-2 block">Autonomous Architecture</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#171D1C]">4 Specialized AI Agents Working for You</h2>
          <p className="text-[#545F73] max-w-2xl mx-auto text-base">
            Our multi-agent pipeline coordinates discovery, scoring, application materials, and verbal coaching seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {[
            { icon: Target, title: "1. Agent Scout", badge: "Discovery", desc: "Monitors live Google Jobs data to uncover high-relevancy job postings matching your title and location." },
            { icon: BrainCircuit, title: "2. Agent Filter", badge: "Analysis", desc: "Compares your PDF resume directly with job descriptions, scoring skill matches from 0 to 100." },
            { icon: Zap, title: "3. Agent Factory", badge: "Synthesis", desc: "Generates tailored, 3-paragraph executive cover letters highlighting your quantifiable impact." },
            { icon: Bot, title: "4. Agent Coach", badge: "Preparation", desc: "Simulates interactive behavioral and technical hiring manager interviews with real-time feedback." }
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 text-left border border-[#E2E8F0] shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-teal-50 text-[#00685F] w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#EAEFED] text-[#3D4947]">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#171D1C] mb-3">{feature.title}</h3>
              <p className="text-[#545F73] leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ZERO-BACKEND PRIVACY GUARANTEE */}
      <section className="py-16 w-full max-w-5xl mx-auto text-left">
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-[#E2E8F0] shadow-soft flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="flex-1">
            <span className="text-xs uppercase tracking-widest text-[#00685F] font-bold mb-2 block">Privacy First</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#171D1C]">
              100% Data Privacy.<br />Zero Database Storage.
            </h2>
            <p className="text-[#545F73] text-base mb-8 leading-relaxed">
              At <strong>Aneevarp Solutions</strong>, we believe your resume and career history belong exclusively to you. When you upload a PDF resume, it is encoded locally in your browser and processed statelessly without ever being stored in a central database.
            </p>
            <ul className="space-y-4">
              {[
                "No cloud database storing your resume or contact details.",
                "Your career profile lives exclusively in your browser storage.",
                "Direct, stateless encrypted streaming with Google Gemini AI.",
                "Instantly and permanently wiped whenever you clear your cache."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#171D1C] text-sm font-medium">
                  <div className="p-1 rounded-full bg-teal-50 text-[#00685F]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
             <div className="w-64 h-64 bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl flex flex-col items-center justify-center border border-[#E2E8F0] shadow-soft p-6 text-center">
                <ShieldCheck className="w-16 h-16 text-[#00685F] mb-3" />
                <span className="font-bold text-[#171D1C] text-base">Client-Side Vault</span>
                <span className="text-xs text-[#545F73] mt-1">Zero-Backend Security by Aneevarp Solutions</span>
             </div>
          </div>
        </div>
      </section>

      {/* GOOGLE PROMOTION & FAQ SECTION */}
      <section className="py-16 w-full max-w-4xl mx-auto text-left">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] shadow-soft px-4 py-1.5 rounded-full text-xs text-[#00685F] font-semibold mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#171D1C] mb-3">Everything You Need to Know</h2>
          <p className="text-[#545F73] max-w-xl mx-auto text-sm">
            Answers to common questions about automated job searching, AI ATS matching, and privacy.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-soft overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-[#F8FAFC] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#171D1C] text-base md:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#00685F] transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#545F73] leading-relaxed border-t border-[#E2E8F0] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 flex flex-col items-center">
        <div className="bg-[#00685F] p-10 md:p-16 rounded-3xl max-w-4xl w-full text-center relative overflow-hidden shadow-xl text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Accelerate Your Job Hunt with ZenScout AI</h2>
          <p className="text-teal-100 mb-10 max-w-xl mx-auto text-base">
            Stop wasting hours on manual job applications. Let Aneevarp Solutions' autonomous ZenScout agent suite do the heavy lifting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/profile" 
              className="bg-white hover:bg-teal-50 text-[#00685F] px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 btn-tactile"
            >
              <Target className="w-5 h-5" /> Start Automated Search
            </Link>
            <Link 
              href="/blog" 
              className="bg-[#005049] hover:bg-[#00403a] text-white border border-teal-400/30 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 btn-tactile"
            >
              Read Career Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
