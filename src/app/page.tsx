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
      color: "text-[#00685F]",
      bg: "bg-teal-50",
      border: "border-teal-200"
    },
    {
      agent: "Agent Filter",
      badge: "Semantic ATS Analysis",
      title: "Scoring Resume vs Job Description",
      sub: "Extracting skills, vector embeddings, and calculating a 98% match.",
      icon: FileCheck,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      agent: "Agent Factory",
      badge: "Targeted Pitch",
      title: "Synthesizing Custom Cover Letter",
      sub: "Mapping quantified achievements to the hiring manager's key requirements.",
      icon: Zap,
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      agent: "Agent Coach",
      badge: "Interview Simulation",
      title: "Simulating Live Hiring Manager Mock Round",
      sub: "Evaluating answers in real-time with actionable STAR feedback.",
      icon: Bot,
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-200"
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

      {/* HERO SECTION WITH ANIMATED SCANNER & LIVE PIPELINE */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] py-10 md:py-16 relative">
        {/* Ambient Decorative Blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

        {/* Ecosystem Pill */}
        <div className="bg-white border border-[#E2E8F0] shadow-soft px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 inline-flex items-center gap-2 hover:shadow-md transition-all hover:scale-105 max-w-[95vw]">
          <Sparkles className="w-4 h-4 text-orange-500 animate-spin duration-3000 flex-shrink-0" />
          <span className="text-[11px] sm:text-xs md:text-sm font-bold text-[#171D1C] truncate">
            Part of the <strong className="text-[#00685F]">ZenResume & Aneevarp Solutions</strong> Career Suite
          </span>
        </div>
        
        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 max-w-4xl text-[#171D1C] leading-[1.15] px-2">
          Automate your <br className="hidden sm:block" />
          <span className="text-gradient">Job Hunt</span> with ZenScout AI
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#545F73] max-w-2xl mb-8 sm:mb-10 leading-relaxed font-normal px-2">
          Upload your resume and let 4 autonomous AI agents discover live opportunities, score skill compatibility, write tailored cover letters, and coach you through interviews.
        </p>

        {/* Tactile Call-To-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16 z-10 w-full sm:w-auto px-3 sm:px-0 max-w-md sm:max-w-none">
          <Link 
            href="/profile" 
            className="bg-[#00685F] hover:bg-[#005049] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 btn-tactile group w-full sm:w-auto"
          >
            <span>Audit Resume & Target Jobs</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#171D1C] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center transition-all shadow-soft hover:shadow-md hover:-translate-y-0.5 active:scale-95 btn-tactile w-full sm:w-auto"
          >
            Launch Dashboard
          </Link>
        </div>

        {/* INTERACTIVE ANIMATED JOB SCANNER WORKSPACE */}
        <div className="w-full max-w-4xl mx-auto my-4 relative">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 md:p-8 text-left relative overflow-hidden">
            {/* Animated Laser Scanning Beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00685F] to-transparent opacity-80 animate-scan pointer-events-none shadow-[0_0_15px_#00685F]"></div>

            {/* Top Interactive Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#00685F] flex items-center justify-center shadow-sm">
                  <Cpu className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#171D1C] flex items-center gap-2">
                    <span>Autonomous Multi-Agent Pipeline</span>
                    <span className="text-[10px] bg-teal-50 text-[#00685F] px-2 py-0.5 rounded-full font-bold">LIVE</span>
                  </h3>
                  <p className="text-xs text-[#545F73]">Streaming live candidate matching & interview simulation</p>
                </div>
              </div>

              {/* Dynamic Step Tabs */}
              <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
                {pipelineSteps.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeStep === idx 
                        ? "bg-[#00685F] text-white shadow-sm scale-105" 
                        : "text-[#545F73] hover:text-[#171D1C]"
                    }`}
                  >
                    {idx + 1}. {s.agent.split(" ")[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Stage Animated Card Showcase */}
            <div className="pt-6">
              {pipelineSteps.map((step, idx) => {
                const isCurrent = activeStep === idx;
                if (!isCurrent) return null;
                const Icon = step.icon;

                return (
                  <div key={idx} className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl border border-[#E2E8F0] p-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${step.bg} ${step.color}`}>
                          <Icon className="w-6 h-6 animate-bounce" />
                        </div>
                        <div>
                          <span className={`text-[11px] font-black uppercase tracking-wider ${step.color}`}>
                            {step.agent} • {step.badge}
                          </span>
                          <h4 className="text-base sm:text-lg font-extrabold text-[#171D1C] mt-0.5">
                            {step.title}
                          </h4>
                        </div>
                      </div>

                      {/* Live Counter / Match Badge */}
                      <div className="bg-white px-4 py-2 rounded-xl border border-[#E2E8F0] shadow-sm self-start sm:self-auto">
                        <span className="text-xs text-[#545F73] font-medium block text-right">ATS Compatibility</span>
                        <div className="text-xl font-black text-[#00685F] text-right">
                          {simulatedMatch}% Match
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#545F73] leading-relaxed mb-4">
                      {step.sub}
                    </p>

                    {/* Progress Bar Animation */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#00685F] to-emerald-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${simulatedMatch}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3 Pipeline Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3 hover:bg-white hover:shadow-sm transition-all">
                <div className="p-2 rounded-lg bg-teal-100 text-[#00685F]">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#00685F]">Scout</span>
                  <p className="text-xs font-bold text-[#171D1C]">18 Live Jobs</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3 hover:bg-white hover:shadow-sm transition-all">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700">Filter</span>
                  <p className="text-xs font-bold text-[#171D1C]">98% Fit Score</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3 hover:bg-white hover:shadow-sm transition-all">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700">Factory</span>
                  <p className="text-xs font-bold text-[#171D1C]">Letter Ready</p>
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

      {/* HOW IT WORKS SECTION (Step-By-Step Interactive Visual) */}
      <section className="py-16 md:py-20 flex flex-col items-center">
        <div className="mb-14">
          <span className="text-xs uppercase tracking-widest text-[#00685F] font-extrabold mb-2 block">Seamless Workflow</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-[#171D1C]">How ZenScout AI Works</h2>
          <p className="text-[#545F73] max-w-xl mx-auto text-base">
            From raw resume to confirmed job interviews in 3 automated steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
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
            <div key={i} className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-soft hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00685F] flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-teal-200 transition-colors">
                    {item.step}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#00685F] uppercase tracking-wider block mb-1">{item.tag}</span>
                <h3 className="text-xl font-bold text-[#171D1C] mb-3">{item.title}</h3>
                <p className="text-[#545F73] text-sm leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#00685F] group-hover:translate-x-1 transition-transform">
                <span>Explore Step {item.step} &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 SPECIALIZED AI AGENTS GRID */}
      <section className="py-16 md:py-20 flex flex-col items-center">
        <div className="mb-14">
          <span className="text-xs uppercase tracking-widest text-[#00685F] font-extrabold mb-2 block">Autonomous Architecture</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-[#171D1C]">4 Specialized AI Agents</h2>
          <p className="text-[#545F73] max-w-2xl mx-auto text-base">
            Each agent handles a specific bottleneck in the traditional job application process.
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

      {/* ZENRESUME CROSS-PROMOTION BANNER SECTION */}
      <section className="py-12 w-full max-w-5xl mx-auto text-left">
        <div className="bg-gradient-to-r from-[#00685F] via-[#0D9488] to-[#0284C7] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-white/20 text-teal-100 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                <span>ZenResume & Aneevarp Solutions Sister Tool</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Need a High-Scoring ATS Resume?
              </h3>
              <p className="text-teal-100 text-sm md:text-base leading-relaxed">
                Before applying with ZenScout AI, ensure your resume passes all corporate parser filters. Build an ATS-certified single-column resume free on <strong>ZenResume</strong>.
              </p>
            </div>

            <a
              href="https://zenresume.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-teal-50 text-[#00685F] font-black text-sm px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 flex-shrink-0 btn-tactile"
            >
              <span>Build on ZenResume Free</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
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
