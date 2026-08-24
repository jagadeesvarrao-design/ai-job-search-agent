import { Target, Users, Zap, ShieldCheck, Building2, Award, Scale, Lock, FileCheck } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ZenScout AI by Aneevarp Solutions",
  description: "Learn about ZenScout AI, engineered by Aneevarp Solutions alongside ZenResume to provide autonomous, privacy-first career acceleration with zero-backend security.",
  alternates: {
    canonical: "/about",
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-2 md:px-4">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-white dark:bg-[#141B20] border border-[#E2E8F0] dark:border-[#232D36] shadow-soft px-4 py-1.5 rounded-full text-xs text-[#00685F] dark:text-[#2DD4BF] font-semibold mb-4">
          <Building2 className="w-4 h-4" />
          <span>A Product of Aneevarp Solutions</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#171D1C] dark:text-white tracking-tight">About ZenScout AI</h1>
        <p className="text-base md:text-lg text-[#545F73] dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
          We are on a mission to level the playing field for job seekers by providing autonomous, AI-driven recruitment intelligence with 100% data sovereignty and zero compromise.
        </p>
      </div>

      {/* 3 Value Pillars */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white dark:bg-[#141B20] p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft text-center">
          <div className="w-14 h-14 bg-teal-50 dark:bg-teal-950/40 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#00685F] dark:text-[#2DD4BF]">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#171D1C] dark:text-white">Our Mission</h2>
          <p className="text-[#545F73] dark:text-slate-300 text-sm leading-relaxed">
            Eliminate the soul-crushing manual repetition of job hunting so candidates can focus on interview mastery, skill development, and career growth.
          </p>
        </div>

        <div className="bg-white dark:bg-[#141B20] p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft text-center">
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-400">
            <Zap className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#171D1C] dark:text-white">Zen Ecosystem</h2>
          <p className="text-[#545F73] dark:text-slate-300 text-sm leading-relaxed">
            Engineered alongside <strong>ZenResume</strong> to form an end-to-end career suite: build ATS-friendly resumes with ZenResume, then discover and apply with ZenScout AI.
          </p>
        </div>

        <div className="bg-white dark:bg-[#141B20] p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft text-center">
          <div className="w-14 h-14 bg-purple-50 dark:bg-purple-950/40 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#171D1C] dark:text-white">Zero-Backend Privacy</h2>
          <p className="text-[#545F73] dark:text-slate-300 text-sm leading-relaxed">
            Engineered with zero centralized database storage. Your resume lives strictly in your browser memory and is never permanently stored on our servers.
          </p>
        </div>
      </div>
      
      {/* PARENT COMPANY & STATUTORY SPOTLIGHT */}
      <div className="bg-white dark:bg-[#141B20] p-8 md:p-12 rounded-3xl mb-14 border border-[#E2E8F0] dark:border-[#232D36] shadow-soft">
        <div className="flex items-center gap-2 mb-4 text-[#00685F] dark:text-[#2DD4BF]">
          <Award className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest font-bold">Parent Company & Corporate Disclosures</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#171D1C] dark:text-white">About Aneevarp Solutions</h2>
        <p className="text-[#3D4947] dark:text-slate-200 leading-relaxed mb-4 text-base">
          <strong>Aneevarp Solutions</strong> is an Indian technology and software engineering company committed to building accessible, high-performance web applications, generative AI workflows, and privacy-first digital tools.
        </p>
        <p className="text-[#545F73] dark:text-slate-300 leading-relaxed mb-6 text-sm">
          Following the launch of <strong>ZenResume</strong>, our team developed <strong>ZenScout AI</strong> to empower candidates with multi-agent automation: scouting live positions, scoring resume compatibility, crafting tailored cover letters, and simulating hiring manager interviews.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-[#E2E8F0] dark:border-[#232D36]">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#545F73] dark:text-slate-400">Legal Entity</span>
            <span className="text-sm font-bold text-[#171D1C] dark:text-white">Aneevarp Solutions</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#545F73] dark:text-slate-400">Corporate Headquarters</span>
            <span className="text-sm font-bold text-[#171D1C] dark:text-white">Hyderabad, Telangana, India</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#545F73] dark:text-slate-400">Statutory Contact Desk</span>
            <a href="mailto:aneevarpsolutions@gmail.com" className="text-sm font-bold text-[#00685F] dark:text-[#2DD4BF] hover:underline">
              aneevarpsolutions@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#171D1C] dark:text-white">Ready to automate your search?</h2>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 btn-tactile"
        >
          Launch ZenScout AI Now
        </Link>
      </div>
    </div>
  );
}
