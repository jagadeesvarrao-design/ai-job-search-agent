import { Target, Users, Zap, ShieldCheck, Building2, Award, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Aneevarp Solutions & AI Job Search Agent",
  description: "Learn about Aneevarp Solutions, the creators of the AI Job Search Agent, our mission to democratize recruitment tools, and our privacy-first Zero-Backend architecture.",
  alternates: {
    canonical: "/about",
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs text-teal-300 mb-4 border border-teal-500/30">
          <Building2 className="w-4 h-4" />
          <span>A Product of Aneevarp Solutions</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">About AI Job Search Agent</h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
          We are on a mission to level the playing field for job seekers by providing autonomous, AI-driven recruitment intelligence with 100% privacy and zero compromise.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="glass p-8 rounded-3xl text-center border border-white/10">
          <div className="w-14 h-14 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-400">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-white">Our Mission</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Eliminate the soul-crushing manual repetition of job hunting so candidates can focus on interview mastery, skill development, and career growth.
          </p>
        </div>

        <div className="glass p-8 rounded-3xl text-center border border-white/10">
          <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-400">
            <Zap className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-white">Multi-Agent AI</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Powered by Google Gemini 2.5 Flash, our 4 specialized agents (Scout, Filter, Factory, Coach) orchestrate live job discovery, ATS scoring, and mock coaching.
          </p>
        </div>

        <div className="glass p-8 rounded-3xl text-center border border-white/10">
          <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-white">Zero-Backend Privacy</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Engineered with zero centralized database storage. Your resume lives strictly in your browser memory and is never permanently stored on our servers.
          </p>
        </div>
      </div>
      
      {/* PARENT COMPANY SPOTLIGHT */}
      <div className="glass p-10 md:p-14 rounded-3xl mb-16 border border-teal-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-teal-400" />
          <span className="text-xs uppercase tracking-widest font-bold text-teal-400">Parent Company & Origins</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">About Aneevarp Solutions</h2>
        <p className="text-slate-300 leading-relaxed mb-6 text-base md:text-lg">
          <strong>Aneevarp Solutions</strong> is a technology and software engineering enterprise dedicated to building accessible, high-performance web applications, generative AI workflows, and privacy-first digital tools.
        </p>
        <p className="text-slate-300 leading-relaxed mb-6 text-base">
          Our engineers recognized that while enterprise recruiters were adopting machine learning screening filters to automatically discard applicants, everyday job seekers had no intelligent tools to fight back. We created the AI Job Search Agent as an open, accessible solution to equalize hiring dynamics.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Operating Organization</span>
            <span className="text-sm font-semibold text-white">Aneevarp Solutions</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Support & Inquiries</span>
            <span className="text-sm font-semibold text-teal-400">support.zenresume@gmail.com</span>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-white">Ready to automate your search?</h2>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-teal-500/25"
        >
          Launch Job Search Agent Now
        </Link>
      </div>
    </div>
  );
}
