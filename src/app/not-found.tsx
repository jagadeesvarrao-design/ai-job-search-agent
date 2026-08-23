import Link from "next/link";
import { ArrowLeft, Home, Search, BookOpen, Briefcase } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page Not Found | AI Job Search Agent",
  description: "The page you are looking for does not exist or has been moved. Explore our job search dashboard or career insights.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 border border-teal-500/20">
        <Search className="w-8 h-8" />
      </div>

      <span className="text-sm uppercase tracking-widest text-teal-400 font-bold mb-2">404 Error</span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Page Not Found</h1>
      <p className="text-slate-400 max-w-md mb-8 text-base leading-relaxed">
        The page you are looking for might have been moved or removed. Use the links below to find what you need.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-teal-500/20"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 glass glass-hover text-white font-semibold px-6 py-3 rounded-xl transition-all"
        >
          <BookOpen className="w-4 h-4" /> Browse Career Guides
        </Link>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 glass glass-hover text-white font-semibold px-6 py-3 rounded-xl transition-all"
        >
          <Briefcase className="w-4 h-4" /> Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
