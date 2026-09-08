"use client";

import { useState, useEffect } from "react";
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
  FileText,
  Play,
  Award,
  Layers,
  Send,
  MessageSquare,
  TrendingUp,
  Flame,
  ExternalLink
} from "lucide-react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [simulatedMatch, setSimulatedMatch] = useState<number>(0);

  // Interactive Live Scanner Loop animation
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2800);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    let start = 45;
    const matchTimer = setInterval(() => {
      start = (start + 1) > 98 ? 98 : start + 3;
      setSimulatedMatch(start);
      if (start >= 98) clearInterval(matchTimer);
    }, 50);

    return () => clearInterval(matchTimer);
  }, [activeStep]);

  const pipelineSteps = [
    {
      agent: "Agent Scout",
      badge: "Real-Time Discovery",
      title: "Scanning Live Google Jobs Network",
      sub: "Querying 10,000+ verified tech postings tailored to your seniority & city.",
      icon: Search,
      color: "text-[#476550] dark:text-[#2DD4BF]",
      bg: "bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)]",
      border: "border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)]"
    },
    {
      agent: "Agent Filter",
      badge: "Semantic ATS Analysis",
      title: "Scoring Resume vs Job Description",
      sub: "Extracting skills, vector embeddings, and calculating a 98% match score.",
      icon: FileCheck,
      color: "text-emerald-700 dark:text-[#2DD4BF]",
      bg: "bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)]",
      border: "border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)]"
    },
    {
      agent: "Agent Factory",
      badge: "Targeted Pitch",
      title: "Synthesizing Custom Cover Letter",
      sub: "Mapping quantified achievements to the hiring manager's core challenges.",
      icon: Zap,
      color: "text-[#476550] dark:text-[#2DD4BF]",
      bg: "bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)]",
      border: "border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)]"
    },
    {
      agent: "Agent Coach",
      badge: "Interview Simulation",
      title: "Simulating Live Hiring Manager Mock Round",
      sub: "Evaluating candidate responses with structured STAR scorecard feedback.",
      icon: Bot,
      color: "text-amber-700 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800/60"
    }
  ];

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
      q: "Is ZenScout AI free to use?",
      a: "Yes! ZenScout AI provides a generous Free Tier (5 daily scouts, 2 cover letters, and 3 interview rounds) without requiring a credit card."
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
    <div className="flex flex-col w-full text-center px-2 sm:px-4 text-black dark:text-white">
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO SECTION WITH ANIMATED SCANNER & LIVE PIPELINE */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] py-8 sm:py-12 md:py-16 relative">
        {/* Ambient Decorative Blurs */}
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#476550]/15 dark:bg-[#2DD4BF]/15 rounded-full blur-3xl pointer-events-none animate-ambient-pulse"></div>
        <div className="absolute top-20 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#00846D]/15 dark:bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse"></div>

        {/* Ecosystem Pill */}
        <div className="bg-[#FAF9F6] dark:bg-[#141B20] border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.2)] shadow-peaceful px-4 sm:px-6 py-2 rounded-full mb-6 sm:mb-8 inline-flex items-center gap-2.5 hover:shadow-md transition-all hover:scale-105 max-w-[95vw]">
          <span className="w-2 h-2 rounded-full bg-[#476550] dark:bg-[#2DD4BF] animate-live-dot"></span>
          <span className="text-[11px] sm:text-xs md:text-sm font-bold text-[#1A1F1F] dark:text-[#CBD5E1] truncate">
            Part of the <strong className="text-[#476550] dark:text-[#2DD4BF]">ZenResume & Aneevarp Solutions</strong> Career Suite
          </span>
        </div>
        
        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-6 max-w-4xl text-[#1A1F1F] dark:text-white leading-[1.15] px-2">
          Automate your <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#476550] via-[#00846D] to-[#2DD4BF] dark:from-[#2DD4BF] dark:via-[#5EEAD4] dark:to-white bg-clip-text text-transparent">
            Job Hunt
          </span> with ZenScout AI
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#596060] dark:text-[#CBD5E1] max-w-2xl mb-8 sm:mb-10 leading-relaxed font-normal px-2">
          Upload your resume and let 4 autonomous AI agents discover live opportunities, score skill compatibility, write tailored cover letters, and coach you through interviews.
        </p>

        {/* Tactile Call-To-Action Buttons (ZenResume Style Pill CTA) */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16 z-10 w-full sm:w-auto px-3 sm:px-0 max-w-md sm:max-w-none">
          <Link 
            href="/profile" 
            className="stitch-hero-cta btn-tactile animate-shimmer px-8 py-4 text-sm sm:text-base flex items-center justify-center gap-2 group w-full sm:w-auto min-h-[50px] shadow-[0_10px_28px_rgba(71,101,80,0.3)] dark:shadow-[0_12px_32px_rgba(45,212,191,0.35)]"
          >
            <span>Audit Resume & Target Jobs</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-[#FCFAF5] dark:bg-[#141B20] border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.25)] hover:bg-[#F4F4F0] dark:hover:bg-[#1A2228] text-[#1A1F1F] dark:text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center transition-all shadow-peaceful hover:shadow-soft-hover active:scale-95 btn-tactile w-full sm:w-auto min-h-[50px]"
          >
            Launch Dashboard
          </Link>
        </div>

        {/* INTERACTIVE ANIMATED JOB SCANNER WORKSPACE */}
        <div className="w-full max-w-4xl mx-auto my-4 relative">
          <div className="bg-[#FAF9F6] dark:bg-[#141B20] rounded-3xl border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.18)] shadow-2xl p-5 sm:p-7 md:p-8 text-left relative overflow-hidden">
            {/* Animated Laser Scanning Beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#476550] dark:via-[#2DD4BF] to-transparent opacity-80 animate-scan pointer-events-none shadow-[0_0_15px_#476550] dark:shadow-[0_0_15px_#2DD4BF]"></div>

            {/* Top Interactive Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-5 border-b border-slate-200/70 dark:border-[#232D36]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)] text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center shadow-sm flex-shrink-0">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#1A1F1F] dark:text-white flex items-center gap-2">
                    <span>Autonomous Multi-Agent Pipeline</span>
                    <span className="text-[10px] bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.3)] px-2.5 py-0.5 rounded-full font-bold">LIVE</span>
                  </h3>
                  <p className="text-xs text-[#596060] dark:text-[#94A3B8]">Streaming live candidate matching & interview simulation</p>
                </div>
              </div>

              {/* Dynamic Step Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-[#F4F4F0] dark:bg-[#1A2228] p-1.5 rounded-2xl border border-[#D8E2DA] dark:border-[#232D36]">
                {pipelineSteps.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeStep === idx 
                        ? "bg-[#476550] dark:bg-[#2DD4BF] text-white dark:text-[#061B18] shadow-md scale-105" 
                        : "text-[#596060] dark:text-[#94A3B8] hover:text-[#1A1F1F] dark:hover:text-white"
                    }`}
                  >
                    {idx + 1}. {s.agent.split(" ")[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Stage Animated Card Showcase */}
            <div className="pt-5">
              {pipelineSteps.map((step, idx) => {
                const isCurrent = activeStep === idx;
                if (!isCurrent) return null;
                const Icon = step.icon;

                return (
                  <div key={idx} className="bg-gradient-to-br from-[#FCFAF5] to-white dark:from-[#1A2228] dark:to-[#141B20] rounded-2xl border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.2)] p-5 sm:p-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${step.bg} ${step.color}`}>
                          <Icon className="w-6 h-6 animate-bounce" />
                        </div>
                        <div>
                          <span className={`text-[11px] font-black uppercase tracking-wider ${step.color}`}>
                            {step.agent} • {step.badge}
                          </span>
                          <h4 className="text-base sm:text-lg font-extrabold text-[#1A1F1F] dark:text-white mt-0.5">
                            {step.title}
                          </h4>
                        </div>
                      </div>

                      {/* Live Counter / Match Badge */}
                      <div className="bg-[#FAF9F6] dark:bg-[#141B20] px-4 py-2 rounded-2xl border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.25)] shadow-sm self-start sm:self-auto">
                        <span className="text-xs text-[#596060] dark:text-[#94A3B8] font-medium block text-right">ATS Compatibility</span>
                        <div className="text-xl font-black text-[#476550] dark:text-[#2DD4BF] text-right">
                          {simulatedMatch}% Match
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#596060] dark:text-[#CBD5E1] leading-relaxed mb-4">
                      {step.sub}
                    </p>

                    {/* Progress Bar Animation */}
                    <div className="w-full bg-slate-200/60 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#476550] via-[#00846D] to-[#2DD4BF] h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${simulatedMatch}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3 Pipeline Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
              <div className="p-3.5 rounded-2xl bg-[#F4F4F0] dark:bg-[#1A2228] border border-[#D8E2DA] dark:border-[#232D36] flex items-center gap-3 hover:shadow-sm transition-all">
                <div className="p-2 rounded-xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF]">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#476550] dark:text-[#2DD4BF]">Scout</span>
                  <p className="text-xs font-bold text-[#1A1F1F] dark:text-white">18 Live Jobs</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4F4F0] dark:bg-[#1A2228] border border-[#D8E2DA] dark:border-[#232D36] flex items-center gap-3 hover:shadow-sm transition-all">
                <div className="p-2 rounded-xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF]">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#476550] dark:text-[#2DD4BF]">Filter</span>
                  <p className="text-xs font-bold text-[#1A1F1F] dark:text-white">98% Fit Score</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4F4F0] dark:bg-[#1A2228] border border-[#D8E2DA] dark:border-[#232D36] flex items-center gap-3 hover:shadow-sm transition-all">
                <div className="p-2 rounded-xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#476550] dark:text-[#2DD4BF]">Factory</span>
                  <p className="text-xs font-bold text-[#1A1F1F] dark:text-white">Letter Ready</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Aesthetic Badges */}
          <div className="hidden lg:flex items-center gap-2 bg-[#FAF9F6] dark:bg-[#141B20] border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.2)] shadow-peaceful px-4 py-2.5 rounded-full absolute -bottom-4 -left-6 animate-subtle-float">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#2DD4BF]" />
            <span className="text-xs font-bold text-[#1A1F1F] dark:text-[#CBD5E1]">Zero-Backend Privacy (No DB)</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-[#FAF9F6] dark:bg-[#141B20] border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.2)] shadow-peaceful px-4 py-2.5 rounded-full absolute -top-4 -right-6 animate-subtle-float">
            <Bot className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" />
            <span className="text-xs font-bold text-[#1A1F1F] dark:text-[#CBD5E1]">Gemini 2.5 Flash Mock Coach</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-12 sm:py-16 md:py-20 flex flex-col items-center">
        <div className="mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#476550] dark:text-[#2DD4BF] font-extrabold mb-2 block">Seamless Workflow</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 text-[#1A1F1F] dark:text-white">How ZenScout AI Works</h2>
          <p className="text-[#596060] dark:text-[#CBD5E1] max-w-xl mx-auto text-sm sm:text-base">
            From raw resume to confirmed job interviews in 3 automated steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl text-left">
          {[
            {
              step: "01",
              title: "Upload & Audit Resume",
              desc: "Upload your master PDF. Our instant scanner audits your ATS compatibility score and identifies keyword gaps.",
              icon: FileText,
              tag: "Instant ATS Check"
            },
            {
              step: "02",
              title: "Agent Scout & Filter",
              desc: "Our autonomous agents crawl live Google Jobs, scoring each opportunity from 0 to 100% against your skills.",
              icon: BrainCircuit,
              tag: "Real-Time Matching"
            },
            {
              step: "03",
              title: "Tailor & Interview Prep",
              desc: "Generate bespoke 3-paragraph cover letters with Agent Factory and practice with the interactive Agent Coach.",
              icon: Bot,
              tag: "Mock Hiring Round"
            }
          ].map((item, i) => (
            <div key={i} className="card-surface p-6 sm:p-8 flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)] text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 dark:text-slate-700 group-hover:text-[#476550] dark:group-hover:text-[#2DD4BF] transition-colors">
                    {item.step}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#476550] dark:text-[#2DD4BF] uppercase tracking-wider block mb-1">{item.tag}</span>
                <h3 className="text-xl font-bold text-[#1A1F1F] dark:text-white mb-3">{item.title}</h3>
                <p className="text-[#596060] dark:text-[#CBD5E1] text-sm leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-[#232D36] flex items-center text-xs font-bold text-[#476550] dark:text-[#2DD4BF] group-hover:translate-x-1 transition-transform">
                <span>Explore Step {item.step} &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 SPECIALIZED AI AGENTS GRID */}
      <section className="py-12 sm:py-16 md:py-20 flex flex-col items-center">
        <div className="mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#476550] dark:text-[#2DD4BF] font-extrabold mb-2 block">Autonomous Architecture</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 text-[#1A1F1F] dark:text-white">4 Specialized AI Agents</h2>
          <p className="text-[#596060] dark:text-[#CBD5E1] max-w-2xl mx-auto text-sm sm:text-base">
            Each agent handles a specific bottleneck in the traditional job application process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full max-w-6xl">
          {[
            { icon: Target, title: "1. Agent Scout", badge: "Discovery", desc: "Monitors live Google Jobs data to uncover high-relevancy job postings matching your title and location." },
            { icon: BrainCircuit, title: "2. Agent Filter", badge: "Analysis", desc: "Compares your PDF resume directly with job descriptions, scoring skill matches from 0 to 100." },
            { icon: Zap, title: "3. Agent Factory", badge: "Synthesis", desc: "Generates tailored, 3-paragraph executive cover letters highlighting your quantifiable impact." },
            { icon: Bot, title: "4. Agent Coach", badge: "Preparation", desc: "Simulates interactive behavioral and technical hiring manager interviews with real-time feedback." }
          ].map((feature, i) => (
            <div key={i} className="card-surface p-6 sm:p-8 text-left group">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)] text-[#476550] dark:text-[#2DD4BF] w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#EAEFED] dark:bg-[#1A2228] text-[#596060] dark:text-[#CBD5E1] border border-transparent dark:border-[rgba(45,212,191,0.15)]">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1F1F] dark:text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-[#596060] dark:text-[#CBD5E1] leading-relaxed text-xs sm:text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ZENRESUME CROSS-PROMOTION BANNER SECTION */}
      <section className="py-10 sm:py-12 w-full max-w-5xl mx-auto text-left">
        <div className="bg-gradient-to-r from-[#00846D] via-[#476550] to-[#2DD4BF] dark:from-[#0B0F12] dark:via-[#141B20] dark:to-[#0B0F12] dark:border-2 dark:border-[rgba(45,212,191,0.35)] rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 relative z-10">
            <div className="space-y-2 sm:space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-white/20 dark:bg-[rgba(45,212,191,0.15)] text-teal-100 dark:text-[#2DD4BF] text-xs font-bold px-3.5 py-1 rounded-full border border-white/20 dark:border-[rgba(45,212,191,0.3)]">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>ZenResume & Aneevarp Solutions Sister Tool</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight leading-tight">
                Need a High-Scoring ATS Resume?
              </h3>
              <p className="text-teal-100 dark:text-[#CBD5E1] text-xs sm:text-sm md:text-base leading-relaxed">
                Before applying with ZenScout AI, ensure your resume passes all corporate parser filters. Build an ATS-certified single-column resume free on <strong>ZenResume</strong>.
              </p>
            </div>

            <a
              href="https://zenresume.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FCFAF5] dark:bg-[#2DD4BF] hover:bg-white text-[#476550] dark:text-[#061B18] font-black text-xs sm:text-sm px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 btn-tactile w-full md:w-auto min-h-[48px]"
            >
              <span>Build on ZenResume Free</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ZERO-BACKEND PRIVACY GUARANTEE & FOUNDER TRUST COMMITMENT */}
      <section className="py-12 sm:py-16 w-full max-w-5xl mx-auto text-left">
        <div className="card-surface p-6 sm:p-8 md:p-12 shadow-peaceful flex flex-col md:flex-row items-center gap-8 sm:gap-10 relative overflow-hidden">
          <div className="flex-1">
            <span className="text-xs uppercase tracking-widest text-[#476550] dark:text-[#2DD4BF] font-bold mb-2 block">Privacy First Guarantee</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-5 text-[#1A1F1F] dark:text-white">
              100% Data Privacy.<br />Zero Database Storage.
            </h2>
            <p className="text-[#596060] dark:text-[#CBD5E1] text-sm sm:text-base mb-6 leading-relaxed">
              At <strong>Aneevarp Solutions</strong>, we believe your resume and career history belong exclusively to you. When you upload a PDF resume, it is encoded locally in your browser and processed statelessly without ever being stored in a central database.
            </p>
            <ul className="space-y-3">
              {[
                "No cloud database storing your resume, phone number, or contact info.",
                "Your career profile lives exclusively in your local browser vault.",
                "Direct, stateless encrypted streaming with Google Gemini AI.",
                "Instantly and permanently wiped whenever you clear your browser cache."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#1A1F1F] dark:text-[#CBD5E1] text-xs sm:text-sm font-medium">
                  <div className="p-1 rounded-full bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* High-Trust Founder Commitment Card */}
          <div className="w-full md:w-88 flex-shrink-0">
            <div className="bg-gradient-to-br from-[#FCFAF5] to-[#E8F0EB] dark:from-[#1A2228] dark:to-[#141B20] rounded-3xl p-6 border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.25)] shadow-lg text-center space-y-3.5 relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-2 border-[#476550] dark:border-[#2DD4BF] shadow-md relative group">
                <img 
                  src="/founder.jpg" 
                  alt="Jagadeeswara Rao Peddada - Founder of Aneevarp Solutions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] px-3.5 py-1 rounded-full border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.3)] inline-block">
                  Founder's Privacy Pledge
                </span>
                <h4 className="font-black text-base text-[#1A1F1F] dark:text-white pt-1">
                  Jagadeeswara Rao Peddada
                </h4>
                <p className="text-xs text-[#596060] dark:text-[#CBD5E1] font-medium">
                  Founder & Lead Architect @ Aneevarp Solutions
                </p>
              </div>

              <p className="text-xs text-slate-700 dark:text-[#CBD5E1] italic leading-relaxed pt-1">
                "We engineered ZenScout AI with strict Zero-Backend cryptography. Your career data never touches a database."
              </p>

              <div className="pt-2.5 border-t border-slate-200/70 dark:border-[#232D36] flex items-center justify-center gap-3 text-xs">
                <Link href="/about" className="font-bold text-[#476550] dark:text-[#2DD4BF] hover:underline inline-flex items-center gap-1">
                  <span>Read Full Origin Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 sm:py-16 w-full max-w-4xl mx-auto text-left">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FAF9F6] dark:bg-[#141B20] border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.2)] shadow-peaceful px-4 py-1.5 rounded-full text-xs text-[#476550] dark:text-[#2DD4BF] font-semibold mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1F1F] dark:text-white mb-2 sm:mb-3">Everything You Need to Know</h2>
          <p className="text-[#596060] dark:text-[#CBD5E1] max-w-xl mx-auto text-xs sm:text-sm">
            Answers to common questions about automated job searching, AI ATS matching, and privacy.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-[#FAF9F6] dark:bg-[#141B20] rounded-2xl border border-[#D8E2DA] dark:border-[#232D36] shadow-peaceful overflow-hidden transition-all hover:border-[rgba(45,212,191,0.3)]"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-6 text-left flex justify-between items-center gap-4 hover:bg-[#F4F4F0] dark:hover:bg-[#1A2228] transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#1A1F1F] dark:text-white text-sm sm:text-base md:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#476550] dark:text-[#2DD4BF] transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-[#596060] dark:text-[#CBD5E1] leading-relaxed border-t border-[#D8E2DA] dark:border-[#232D36] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-14 sm:py-20 flex flex-col items-center">
        <div className="bg-gradient-to-br from-[#00846D] to-[#476550] dark:from-[#141B20] dark:to-[#1A2228] dark:border-2 dark:border-[rgba(45,212,191,0.3)] p-8 sm:p-12 md:p-16 rounded-3xl max-w-4xl w-full text-center relative overflow-hidden shadow-2xl text-white">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6">Accelerate Your Job Hunt with ZenScout AI</h2>
          <p className="text-teal-100 dark:text-[#CBD5E1] mb-8 sm:mb-10 max-w-xl mx-auto text-xs sm:text-sm md:text-base">
            Stop wasting hours on manual job applications. Let Aneevarp Solutions' autonomous ZenScout agent suite do the heavy lifting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/profile" 
              className="bg-[#FCFAF5] dark:bg-[#2DD4BF] hover:bg-white text-[#476550] dark:text-[#061B18] px-8 py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 btn-tactile min-h-[48px]"
            >
              <Target className="w-5 h-5" /> Start Automated Search
            </Link>
            <Link 
              href="/blog" 
              className="bg-white/10 dark:bg-[#0B0F12] hover:bg-white/20 text-white border border-white/20 dark:border-[rgba(45,212,191,0.3)] px-8 py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 btn-tactile min-h-[48px]"
            >
              Read Career Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
