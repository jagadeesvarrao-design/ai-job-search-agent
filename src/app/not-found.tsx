import Link from "next/link";
import { Home, Search, BookOpen, Briefcase } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page Not Found | ZenScout AI",
  description: "The page you are looking for does not exist or has been moved. Explore our job search dashboard or career insights.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#00685F] flex items-center justify-center mb-6 border border-teal-100">
        <Search className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-widest text-[#00685F] font-bold mb-2">404 Error</span>
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#171D1C] mb-4">Page Not Found</h1>
      <p className="text-[#545F73] max-w-md mb-8 text-base leading-relaxed">
        The page you are looking for might have been moved or removed. Use the links below to find what you need.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[#00685F] hover:bg-[#005049] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 btn-tactile"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#171D1C] font-semibold px-6 py-3 rounded-xl transition-all shadow-soft active:scale-95 btn-tactile"
        >
          <BookOpen className="w-4 h-4" /> Browse Career Guides
        </Link>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#171D1C] font-semibold px-6 py-3 rounded-xl transition-all shadow-soft active:scale-95 btn-tactile"
        >
          <Briefcase className="w-4 h-4" /> Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
