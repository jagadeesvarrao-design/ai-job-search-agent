"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  User, 
  Sparkles, 
  Menu, 
  X, 
  ExternalLink, 
  ArrowRight, 
  Flame,
  Sun,
  Moon,
  Crown,
  Zap
} from "lucide-react";
import { getUserTierState, isProSubscriber } from "@/lib/user-tier";
import PricingModal from "@/components/PricingModal";

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  // Initialize theme and Pro subscription status
  useEffect(() => {
    const checkTier = () => {
      setIsPro(isProSubscriber());
    };

    checkTier();
    window.addEventListener("user-tier-updated", checkTier);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }

    return () => window.removeEventListener("user-tier-updated", checkTier);
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Top Slim Ecosystem Announcement Ribbon */}
      <div className="bg-[#004D40] dark:bg-[#062420] text-slate-100 text-[11px] md:text-xs py-1 px-4 text-center font-medium border-b border-teal-900/30 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 text-amber-300 font-bold">
          <Flame className="w-3.5 h-3.5" />
          Aneevarp Career Suite:
        </span>
        <span>
          Build ATS resumes on{" "}
          <a
            href="https://zenresume.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white font-bold hover:text-amber-200 transition-colors inline-flex items-center gap-0.5"
          >
            ZenResume <ExternalLink className="w-2.5 h-2.5 opacity-80" />
          </a>
        </span>
      </div>

      {/* Main Clean Sticky Navbar */}
      <header className="bg-white dark:bg-[#141B20] border-b border-[#E2E8F0] dark:border-[#232D36] sticky top-0 z-40 shadow-sm transition-all">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1320px] mx-auto h-16">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group focus:outline-none flex-shrink-0" aria-label="ZenScout AI by Aneevarp Solutions">
            <div className="bg-[#00685F] text-white p-2 rounded-xl group-hover:scale-105 group-active:scale-95 transition-all shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base md:text-lg text-black dark:text-white leading-none tracking-tight">ZenScout AI</span>
              <span className="text-[9px] md:text-[10px] text-[#00685F] dark:text-[#2DD4BF] font-bold tracking-wider uppercase">by Aneevarp Solutions</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-bold text-[#0F172A] dark:text-[#CBD5E1]" aria-label="Main Navigation">
            <Link href="/dashboard" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">Dashboard</Link>
            <Link href="/profile" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">Profile & ATS Audit</Link>
            <Link href="/blog" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">Career Guides</Link>
            <Link href="/pricing" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">Pricing</Link>
            <Link href="/about" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">About</Link>
          </nav>

          {/* Right: Actions Cluster */}
          <div className="flex items-center gap-2 md:gap-2.5">
            {/* ZenResume Direct Link */}
            <a
              href="https://zenresume.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-[#00685F] dark:text-[#2DD4BF] border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>ZenResume</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>

            {/* Pro Upgrade / Member Badge */}
            {isPro ? (
              <button
                onClick={() => setPricingModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <Crown className="w-3.5 h-3.5 fill-white" />
                <span>PRO ACTIVE</span>
              </button>
            ) : (
              <button
                onClick={() => setPricingModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-500 hover:text-white text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95 group"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:text-white fill-amber-500" />
                <span>Upgrade Pro</span>
              </button>
            )}

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-[#E2E8F0] dark:border-[#232D36] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-black dark:text-amber-300 focus:outline-none active:scale-95"
              aria-label="Toggle Light and Dark Mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
            </button>

            {/* User Profile Avatar */}
            <Link
              href="/profile"
              className="w-9 h-9 rounded-xl bg-[#D5E0F8] dark:bg-slate-800 hover:bg-[#C2D3F5] dark:hover:bg-slate-700 text-[#00685F] dark:text-[#2DD4BF] flex items-center justify-center transition-all active:scale-95 shadow-sm"
              aria-label="Profile Settings"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#141B20] border-b border-[#E2E8F0] dark:border-[#232D36] px-6 py-5 shadow-lg animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-3 font-bold text-sm text-black dark:text-white">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPricingModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black p-3 rounded-xl flex items-center justify-between text-xs shadow-sm mb-1"
              >
                <span className="flex items-center gap-1.5">
                  <Crown className="w-4 h-4" />
                  {isPro ? "ZenScout Pro Active (Manage Plan)" : "Upgrade to Pro (Ad-Free & 2x Turbo Speed)"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link 
                href="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] dark:hover:bg-slate-800 text-[#00685F] dark:text-[#2DD4BF] flex items-center justify-between"
              >
                <span>Job Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Profile & ATS Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Career Guides & Blog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Pro Pricing Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>About Aneevarp Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <a
                  href="https://zenresume.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[#00685F] dark:text-[#2DD4BF] font-black p-3 rounded-xl flex items-center justify-between text-xs"
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

      {/* Pricing & Pro Upgrade Modal */}
      <PricingModal 
        isOpen={pricingModalOpen} 
        onClose={() => setPricingModalOpen(false)} 
      />
    </>
  );
}
