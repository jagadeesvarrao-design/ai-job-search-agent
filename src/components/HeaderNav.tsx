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
  Zap,
  LogIn,
  FileText
} from "lucide-react";
import { getUserTierState, isProSubscriber } from "@/lib/user-tier";
import { useAuth } from "@/lib/auth-context";
import PricingModal from "@/components/PricingModal";
import AuthModal from "@/components/AuthModal";

export default function HeaderNav() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [isZenSuite, setIsZenSuite] = useState(false);

  // Initialize theme and Pro subscription status
  useEffect(() => {
    const checkTier = () => {
      const tier = getUserTierState();
      setIsPro(tier.plan === "pro");
      setIsZenSuite(tier.isZenSuite === true);
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
      <div className="bg-[#004D40] dark:bg-[#062420] text-slate-100 text-[11px] sm:text-xs py-1 px-3 sm:px-4 text-center font-medium border-b border-teal-900/30 flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="inline-flex items-center gap-1 text-amber-300 font-bold whitespace-nowrap">
          <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          Aneevarp Career Suite:
        </span>
        <span className="truncate">
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
        <div className="flex justify-between items-center w-full px-3 sm:px-6 md:px-8 max-w-[1320px] mx-auto h-14 sm:h-16 gap-2">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none flex-shrink-0 min-w-0" aria-label="ZenScout AI by Aneevarp Solutions">
            <div className="bg-[#00685F] text-white p-1.5 sm:p-2 rounded-xl group-hover:scale-105 group-active:scale-95 transition-all shadow-sm flex-shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left truncate">
              <span className="font-extrabold text-sm sm:text-base md:text-lg text-black dark:text-white leading-none tracking-tight">ZenScout AI</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-[#00685F] dark:text-[#2DD4BF] font-bold tracking-wider uppercase truncate">by Aneevarp Solutions</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs xl:text-sm font-bold text-[#0F172A] dark:text-[#CBD5E1]" aria-label="Main Navigation">
            <Link href="/dashboard" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">Dashboard</Link>
            <Link href="/profile" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">Profile & ATS Audit</Link>
            <Link href="/blog" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">Career Guides</Link>
            <Link href="/pricing" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">Pricing</Link>
            <Link href="/about" className="hover:text-[#00685F] dark:hover:text-[#2DD4BF] transition-colors py-1">About</Link>
          </nav>

          {/* Right: Actions Cluster (Adaptive for Mobile & Desktop) */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 flex-shrink-0">
            
            {/* Desktop ZenResume Direct Link */}
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

            {/* Pro Upgrade / Member Badge (Desktop/Tablet) */}
            <div className="hidden sm:inline-flex">
              {isPro ? (
                <button
                  onClick={() => setPricingModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <Crown className="w-3.5 h-3.5 fill-white" />
                  <span>{isZenSuite ? "ZEN SUITE VIP" : "PRO ACTIVE"}</span>
                </button>
              ) : (
                <button
                  onClick={() => setPricingModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-500 hover:text-white text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs font-black px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shadow-sm active:scale-95 group"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:text-white fill-amber-500" />
                  <span>Upgrade Pro</span>
                </button>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl border border-[#E2E8F0] dark:border-[#232D36] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-black dark:text-amber-300 focus:outline-none active:scale-95"
              aria-label="Toggle Light and Dark Mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
            </button>

            {/* User Account Button (Auth Trigger / Profile Avatar) */}
            {user ? (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-100 dark:bg-teal-900/40 hover:bg-teal-200 dark:hover:bg-teal-900/60 text-[#00685F] dark:text-[#2DD4BF] flex items-center justify-center transition-all active:scale-95 shadow-sm overflow-hidden"
                aria-label="Account Settings"
                title={user.displayName || user.email || "Account"}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-xs">{user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}</span>
                )}
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="inline-flex items-center gap-1 bg-white dark:bg-[#1A2228] hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-white border border-[#E2E8F0] dark:border-[#232D36] text-xs font-bold py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-xl transition-all shadow-sm active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#141B20] border-b border-[#E2E8F0] dark:border-[#232D36] px-4 sm:px-6 py-5 shadow-lg animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2.5 font-bold text-sm text-black dark:text-white">
              
              {/* Mobile Pro Upgrade Banner */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPricingModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-sm mb-1"
              >
                <span className="flex items-center gap-2">
                  <Crown className="w-4 h-4 fill-white" />
                  <span>{isPro ? (isZenSuite ? "👑 Zen Suite Ultimate VIP Active" : "ZenScout Pro Active (Manage Plan)") : "Upgrade to Pro (Ad-Free & Turbo Speed)"}</span>
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile Auth Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="w-full bg-slate-100 dark:bg-slate-800 text-black dark:text-white font-bold p-3 rounded-xl flex items-center justify-between text-xs mb-1"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" />
                  <span className="truncate max-w-[200px]">{user ? `Account: ${user.displayName || user.email}` : "Sign In / Create Account"}</span>
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
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5FAF8] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Contact & Support Desk</span>
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

      {/* MOBILE & FOLDABLE FLOATING BOTTOM NAVIGATION DOCK */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-3 inset-x-3 z-40 max-w-lg mx-auto bg-white/90 dark:bg-[#141B20]/90 backdrop-blur-xl border border-[#E2E8F0] dark:border-[#232D36] rounded-2xl shadow-2xl p-1.5 flex items-center justify-around animate-in fade-in slide-in-from-bottom-3"
      >
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-300 active:scale-95 transition-all flex-1"
        >
          <Briefcase className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" />
          <span className="text-[10px] font-bold mt-0.5">Jobs</span>
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-300 active:scale-95 transition-all flex-1"
        >
          <FileText className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" />
          <span className="text-[10px] font-bold mt-0.5">ATS Audit</span>
        </Link>

        <button
          onClick={() => setPricingModalOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-900 dark:text-amber-300 active:scale-95 transition-all flex-1"
        >
          {isPro ? (
            <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
          ) : (
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          )}
          <span className="text-[10px] font-black mt-0.5">{isPro ? "PRO" : "Upgrade"}</span>
        </button>

        <button
          onClick={() => setAuthModalOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-300 active:scale-95 transition-all flex-1"
        >
          <User className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" />
          <span className="text-[10px] font-bold mt-0.5">{user ? "Vault" : "Sign In"}</span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-amber-300 active:scale-95 transition-all flex-1"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="text-[10px] font-bold mt-0.5">{isDark ? "Light" : "Dark"}</span>
        </button>
      </nav>

      {/* Pricing & Pro Upgrade Modal */}
      <PricingModal 
        isOpen={pricingModalOpen} 
        onClose={() => setPricingModalOpen(false)} 
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
}
