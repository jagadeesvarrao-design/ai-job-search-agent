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
  Building2
} from "lucide-react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the AI Job Search Agent find matching jobs?",
      a: "Our Scout Agent queries real-time employment data via Google Jobs API. It filters listings strictly according to your target role, preferred location, and seniority, presenting verified live opportunities within seconds."
    },
    {
      q: "How does the Zero-Backend Architecture protect my privacy?",
      a: "Unlike traditional platforms that store your resume, phone number, and employment history in cloud databases, our platform operates 100% in your browser's local memory. Your resume is base64 encoded client-side, sent statelessly to Google Gemini AI for processing, and never saved on our servers."
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
      q: "Is the AI Job Search Agent completely free to use?",
      a: "Yes! AI Job Search Agent is a free, open technology initiative engineered by Aneevarp Solutions. You don't need a credit card, subscription, or account to automate your job search."
    }
  ];

  // FAQ Schema.org JSON-LD for Google Rich Results
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
    <div className="flex flex-col w-full text-center px-4">
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center min-h-[75vh] py-16">
        <div className="glass px-6 py-2 rounded-full mb-8 inline-flex items-center gap-2 border border-teal-500/30">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-slate-200">
            Autonomous Career Automation by <strong className="text-teal-400">Aneevarp Solutions</strong>
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl leading-tight">
          Automate your <br className="hidden md:block" />
          <span className="text-gradient">Job Hunt</span> with AI Agents
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Upload your resume and let 4 autonomous AI agents discover live opportunities, score skill compatibility, write bespoke cover letters, and coach you through interviews.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link 
            href="/profile" 
            className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5"
          >
            Setup Free Profile <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/dashboard" 
            className="glass glass-hover text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all hover:-translate-y-0.5"
          >
            Launch Dashboard
          </Link>
        </div>

        {/* TRUST BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Zero-Backend Privacy (No Database)</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-lg">
            <Cpu className="w-4 h-4 text-orange-400" />
            <span>Powered by Google Gemini 2.5 Flash</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-lg">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>Engineered by Aneevarp Solutions</span>
          </div>
        </div>
      </section>

      {/* 4 AGENTS PIPELINE SECTION */}
      <section className="py-20 flex flex-col items-center">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-widest text-teal-400 font-bold mb-2 block">Autonomous Architecture</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">4 Specialized AI Agents Working for You</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
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
            <div key={i} className="glass p-8 rounded-2xl text-left hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group border border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-teal-400" />
                </div>
                <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ZERO-BACKEND PRIVACY GUARANTEE */}
      <section className="py-20 w-full max-w-5xl mx-auto text-left">
        <div className="glass p-10 md:p-16 rounded-3xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden border border-teal-500/20">
          <div className="absolute -left-32 -top-32 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
          
          <div className="flex-1 z-10">
            <span className="text-xs uppercase tracking-widest text-teal-400 font-bold mb-2 block">Privacy Architecture</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              100% Data Privacy.<br />Zero Database Storage.
            </h2>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              At <strong>Aneevarp Solutions</strong>, we believe your resume and career history belong exclusively to you. When you upload a PDF resume, it is encoded locally in your browser and processed statelessly without ever being stored in a central database.
            </p>
            <ul className="space-y-4">
              {[
                "No cloud database storing your resume or phone number.",
                "Your career profile lives exclusively in your browser storage.",
                "Direct, stateless encrypted streaming with Google Gemini AI.",
                "Instantly and permanently wiped whenever you clear your cache."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 z-10 flex justify-center">
             <div className="w-60 h-60 bg-gradient-to-br from-teal-500/20 to-orange-500/20 rounded-3xl flex flex-col items-center justify-center border border-white/10 shadow-[0_0_80px_rgba(20,184,166,0.15)] p-6 text-center">
                <ShieldCheck className="w-16 h-16 text-teal-400 mb-3" />
                <span className="font-bold text-white text-base">Client-Side Vault</span>
                <span className="text-xs text-slate-400 mt-1">Zero-Backend Technology by Aneevarp Solutions</span>
             </div>
          </div>
        </div>
      </section>

      {/* GOOGLE PROMOTION & FAQ SECTION */}
      <section className="py-20 w-full max-w-4xl mx-auto text-left">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs text-teal-300 mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Know</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Answers to common questions about automated job searching, AI ATS matching, and privacy.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="glass rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white text-base md:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-teal-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 flex flex-col items-center">
        <div className="glass p-12 md:p-16 rounded-3xl max-w-4xl w-full border border-teal-500/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Accelerate Your Job Hunt Today</h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-base">
            Stop wasting hours on manual job applications. Let Aneevarp Solutions' autonomous agent suite do the heavy lifting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/profile" 
              className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
            >
              <Target className="w-5 h-5" /> Start Automated Search
            </Link>
            <Link 
              href="/blog" 
              className="glass glass-hover text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              Read Career Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
