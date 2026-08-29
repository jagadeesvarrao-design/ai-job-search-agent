import { Target, Users, Zap, ShieldCheck, Building2, Award, Scale, Lock, FileCheck, ExternalLink, Sparkles, Code2, Layers, HeartHandshake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Leadership | ZenScout AI by Aneevarp Solutions",
  description: "Learn about ZenScout AI, engineered by Jagadeeswara Rao Peddada (Founder & Lead Architect at Aneevarp Solutions) alongside ZenResume and ZenDoc AI.",
  alternates: {
    canonical: "/about",
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-2 md:px-4">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-[#FAF9F6] dark:bg-[#222828] border border-[#D8E2DA] dark:border-[#2D3636] shadow-soft px-4 py-1.5 rounded-full text-xs text-[#476550] dark:text-[#A2BCA8] font-semibold mb-4">
          <Building2 className="w-4 h-4" />
          <span>A Product of Aneevarp Solutions</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#1A1F1F] dark:text-white tracking-tight">About ZenScout AI</h1>
        <p className="text-base md:text-lg text-[#596060] dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
          We are on a mission to level the playing field for job seekers by providing autonomous, AI-driven recruitment intelligence with 100% data sovereignty and zero compromise.
        </p>
      </div>

      {/* 3 Value Pillars */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="bg-[#FAF9F6] dark:bg-[#222828] p-8 rounded-3xl border border-[#D8E2DA] dark:border-[#2D3636] shadow-soft text-center">
          <div className="w-14 h-14 bg-[#E8F0EB] dark:bg-[#1A1F1F]/40 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#476550] dark:text-[#A2BCA8]">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#1A1F1F] dark:text-white">Our Mission</h2>
          <p className="text-[#596060] dark:text-slate-300 text-sm leading-relaxed">
            Eliminate the soul-crushing manual repetition of job hunting so candidates can focus on interview mastery, skill development, and career growth.
          </p>
        </div>

        <div className="bg-[#FAF9F6] dark:bg-[#222828] p-8 rounded-3xl border border-[#D8E2DA] dark:border-[#2D3636] shadow-soft text-center">
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-400">
            <Zap className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#1A1F1F] dark:text-white">Zen Ecosystem</h2>
          <p className="text-[#596060] dark:text-slate-300 text-sm leading-relaxed">
            Engineered alongside <strong>ZenResume</strong> and <strong>ZenDoc AI</strong> to form an end-to-end career & document productivity suite.
          </p>
        </div>

        <div className="bg-[#FAF9F6] dark:bg-[#222828] p-8 rounded-3xl border border-[#D8E2DA] dark:border-[#2D3636] shadow-soft text-center">
          <div className="w-14 h-14 bg-purple-50 dark:bg-purple-950/40 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#1A1F1F] dark:text-white">Zero-Backend Privacy</h2>
          <p className="text-[#596060] dark:text-slate-300 text-sm leading-relaxed">
            Engineered with zero centralized database storage. Your resume lives strictly in your browser memory and is never permanently stored on our servers.
          </p>
        </div>
      </div>

      {/* FOUNDER & LEAD ARCHITECT SPOTLIGHT */}
      <section className="bg-gradient-to-br from-white via-[#F8FAFC] to-teal-50/40 dark:from-[#222828] dark:via-[#1F2525] dark:to-teal-950/20 rounded-3xl p-6 sm:p-10 md:p-12 mb-14 border border-[#D8E2DA] dark:border-[#2D3636] shadow-soft relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8F0EB]0/10 dark:bg-[#E8F0EB]0/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 relative z-10">
          {/* Founder Portrait */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-2 border-[#476550]/30 dark:border-[#A2BCA8]/40 shadow-xl relative group">
              <img 
                src="/founder.jpg" 
                alt="Jagadeeswara Rao Peddada - Founder & Lead Architect at Aneevarp Solutions"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 inset-x-2 bg-[#1A1F1F]/80 backdrop-blur-md rounded-xl py-1 text-center text-[10px] font-black text-[#A2BCA8] border border-teal-500/30">
                VERIFIED FOUNDER
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://my-portfolio-five-mu-77.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#476550] dark:text-[#A2BCA8] hover:underline inline-flex items-center gap-1 bg-[#E8F0EB] dark:bg-[#1A1F1F]/60 px-3 py-1 rounded-full border border-[#A2BCA8]/40 dark:border-teal-800"
              >
                <span>Portfolio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/jagadeesvarrao-design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:underline inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Founder Bio & Leadership Context */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-[#476550] dark:text-[#A2BCA8] block">Leadership & System Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1F1F] dark:text-white">
                Jagadeeswara Rao Peddada
              </h2>
              <p className="text-sm font-bold text-[#596060] dark:text-slate-300">
                Founder & Lead Architect @ <strong>Aneevarp Solutions</strong>
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#596060] dark:text-slate-200 leading-relaxed font-normal">
              "I engineered the Zen product suite because the modern application process has become an asymmetric battle. Candidates spend hundreds of hours manually customizing resumes and hunting across fragmented job boards. Our goal at <strong>Aneevarp Solutions</strong> is to build autonomous, high-EQ AI software that works tirelessly for the candidate while protecting their personal data with strict client-side zero-backend cryptography."
            </p>

            {/* Created Ecosystem Tools */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
                Platforms Engineered by Jagadeeswara Rao:
              </span>
              <div className="grid sm:grid-cols-3 gap-2.5">
                <a
                  href="https://zenresume.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#FAF9F6] dark:bg-[#222828] border border-[#D8E2DA] dark:border-[#2D3636] hover:border-[#476550] dark:hover:border-[#A2BCA8] transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="text-left">
                    <span className="text-xs font-black text-black dark:text-white block group-hover:text-[#476550] dark:group-hover:text-[#A2BCA8] transition-colors">ZenResume</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">ATS Resume Builder</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#476550] dark:group-hover:text-[#A2BCA8]" />
                </a>

                <div className="p-3 rounded-2xl bg-[#FAF9F6] dark:bg-[#222828] border border-teal-300 dark:border-teal-800 shadow-sm text-left">
                  <span className="text-xs font-black text-[#476550] dark:text-[#A2BCA8] block">ZenScout AI</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Autonomous Job Scout</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF9F6] dark:bg-[#222828] border border-[#D8E2DA] dark:border-[#2D3636] text-left shadow-sm">
                  <span className="text-xs font-black text-black dark:text-white block">ZenDoc AI</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Document & Data AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* PARENT COMPANY & STATUTORY SPOTLIGHT */}
      <div className="bg-[#FAF9F6] dark:bg-[#222828] p-8 md:p-12 rounded-3xl mb-14 border border-[#D8E2DA] dark:border-[#2D3636] shadow-soft">
        <div className="flex items-center gap-2 mb-4 text-[#476550] dark:text-[#A2BCA8]">
          <Award className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest font-bold">Parent Company & Corporate Disclosures</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1F1F] dark:text-white">About Aneevarp Solutions</h2>
        <p className="text-[#596060] dark:text-slate-200 leading-relaxed mb-4 text-base">
          <strong>Aneevarp Solutions</strong> is an Indian technology and software engineering company committed to building accessible, high-performance web applications, generative AI workflows, and privacy-first digital tools.
        </p>
        <p className="text-[#596060] dark:text-slate-300 leading-relaxed mb-6 text-sm">
          Following the launch of <strong>ZenResume</strong>, our team developed <strong>ZenScout AI</strong> to empower candidates with multi-agent automation: scouting live positions, scoring resume compatibility, crafting tailored cover letters, and simulating hiring manager interviews.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-[#D8E2DA] dark:border-[#2D3636]">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#596060] dark:text-slate-400">Legal Entity</span>
            <span className="text-sm font-bold text-[#1A1F1F] dark:text-white">Aneevarp Solutions</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#596060] dark:text-slate-400">Corporate Headquarters</span>
            <span className="text-sm font-bold text-[#1A1F1F] dark:text-white">Hyderabad / Visakhapatnam, India</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#596060] dark:text-slate-400">Statutory Contact Desk</span>
            <a href="mailto:aneevarpsolutions@gmail.com" className="text-sm font-bold text-[#476550] dark:text-[#A2BCA8] hover:underline">
              aneevarpsolutions@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1A1F1F] dark:text-white">Ready to automate your search?</h2>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 bg-[#476550] hover:bg-[#3A5342] dark:bg-[#6B9077] dark:hover:bg-[#55735E] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 btn-tactile"
        >
          Launch ZenScout AI Now
        </Link>
      </div>
    </div>
  );
}
