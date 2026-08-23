"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, User, Sparkles, Menu, X, ExternalLink, ArrowRight, ShieldCheck, Flame } from "lucide-react";

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Ecosystem Announcement Ribbon */}
      <div className="bg-gradient-to-r from-[#004D40] via-[#00685F] to-[#0D9488] text-white text-[11px] md:text-xs py-1.5 px-4 text-center font-bold flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>
          Aneevarp Career Suite: Build your 95+ score resume on{" "}
          <a
            href="https://zenresume.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-amber-200 hover:text-white font-extrabold ml-1 inline-flex items-center gap-1"
          >
            ZenResume <ExternalLink className="w-3 h-3" />
          </a>
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 shadow-sm transition-all">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1280px] mx-auto h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group focus:outline-none" aria-label="ZenScout AI by Aneevarp Solutions">
            <div className="bg-[#00685F] text-white p-2 rounded-xl group-hover:scale-105 group-active:scale-95 transition-all shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-lg text-black leading-none tracking-tight">ZenScout AI</span>
              <span className="text-[10px] text-[#00685F] font-bold tracking-wider uppercase">by Aneevarp Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-[#0F172A]" aria-label="Main Navigation">
            <Link href="/dashboard" className="hover:text-[#00685F] transition-colors py-1">Dashboard</Link>
            <Link href="/profile" className="hover:text-[#00685F] transition-colors py-1">Profile & ATS Audit</Link>
            <Link href="/blog" className="hover:text-[#00685F] transition-colors py-1">Career Guides</Link>
            <Link href="/about" className="hover:text-[#00685F] transition-colors py-1">About</Link>
            <a
              href="https://zenresume.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-[#00685F] border border-emerald-200 px-3 py-1 rounded-full text-xs font-black transition-all"
            >
              <Sparkles className="w-3 h-3 text-orange-500" />
              <span>ZenResume Builder</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
          </nav>

          {/* Right Action Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 bg-[#00685F] hover:bg-[#005049] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 btn-tactile"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Launch Dashboard
            </Link>
            <Link
              href="/profile"
              className="w-9 h-9 rounded-full bg-[#D5E0F8] hover:bg-[#C2D3F5] text-[#00685F] flex items-center justify-center transition-all active:scale-95 shadow-sm"
              aria-label="Profile Settings"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-black hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E2E8F0] px-6 py-5 shadow-lg animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-3 font-bold text-sm text-black">
              <Link 
                href="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] text-[#00685F] flex items-center justify-between"
              >
                <span>Job Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] flex items-center justify-between"
              >
                <span>Profile & ATS Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] flex items-center justify-between"
              >
                <span>Career Guides & Blog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] flex items-center justify-between"
              >
                <span>About Aneevarp Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] flex items-center justify-between"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="https://zenresume.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 border border-emerald-200 text-[#00685F] font-black p-3 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    ZenResume ATS Builder
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#00685F] text-white text-center font-bold py-3 rounded-xl text-xs shadow-sm mt-1"
                >
                  Launch Live Scanner
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
