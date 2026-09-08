"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Search, 
  Crown, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Zap, 
  User, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Brain,
  Building,
  Layers,
  ChevronDown,
  LogIn
} from "lucide-react";
import { isProSubscriber, getUserTierState } from "@/lib/user-tier";
import { useAuth } from "@/lib/auth-context";
import PricingModal from "@/components/PricingModal";
import AuthModal from "@/components/AuthModal";

export default function HeaderNav() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [suiteMenuOpen, setSuiteMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isZenSuite, setIsZenSuite] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Initialize theme and Pro subscription status
  useEffect(() => {
    const checkTier = () => {
      const tier = getUserTierState();
      setIsPro(tier.plan === "pro");
      setIsZenSuite(tier.isZenSuite === true);
    };

    checkTier();
    window.addEventListener("user-tier-updated", checkTier);

    // Initialize theme based on documentElement or storage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || document.documentElement.classList.contains("dark")) {
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
      <header className="sticky top-0 z-40 bg-[#FCFAF5]/90 dark:bg-[#0B0F12]/90 backdrop-blur-xl border-b border-[#D8E2DA] dark:border-[rgba(45,212,191,0.15)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#E8F0EB] dark:bg-[#141B20] border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)] rounded-2xl group-hover:scale-105 transition-all shadow-sm flex items-center justify-center p-1.5 flex-shrink-0">
              <img src="/icon.svg" alt="ZenScout AI Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left truncate">
              <span className="font-extrabold text-sm sm:text-base md:text-lg text-black dark:text-white leading-none tracking-tight">ZenScout AI</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-[#476550] dark:text-[#2DD4BF] font-bold tracking-wider uppercase truncate">by Aneevarp Solutions</span>
            </div>
          </Link>

          {/* Center: Live Status Indicator badge & Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <nav className="flex items-center gap-4 lg:gap-6 text-xs sm:text-sm font-bold text-[#1A1F1F] dark:text-[#CBD5E1]" aria-label="Main Navigation">
              <Link href="/dashboard" className="hover:text-[#476550] dark:hover:text-[#2DD4BF] transition-colors py-1">Dashboard</Link>
              <Link href="/profile" className="hover:text-[#476550] dark:hover:text-[#2DD4BF] transition-colors py-1">ATS Audit</Link>
              <Link href="/pricing" className="hover:text-[#476550] dark:hover:text-[#2DD4BF] transition-colors py-1">Pricing</Link>
            </nav>

            {/* Center Live Agent Status Indicator */}
            <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)] border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)] text-[11px] font-extrabold text-[#476550] dark:text-[#2DD4BF] shadow-sm cursor-default">
              <span className="live-status-dot"></span>
              <span>Agent Status: 24/7 Crawler Active</span>
            </div>
          </div>

          {/* Right: Actions Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Quick-Switch to ZenResume */}
            <a
              href="https://zenresume.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.25)] bg-[#FAF9F6] dark:bg-[#141B20] text-[#1A1F1F] dark:text-[#F8FAFC] hover:border-[#476550] dark:hover:border-[#2DD4BF] hover:text-[#476550] dark:hover:text-[#2DD4BF] transition-all btn-tactile shadow-sm"
              title="Switch to ZenResume ATS Resume Builder"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Back to ZenResume</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* Pro Upgrade / Member Badge */}
            <div className="hidden sm:inline-flex">
              {isZenSuite ? (
                <button
                  onClick={() => setPricingModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-800 via-teal-700 to-[#2DD4BF] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all border border-[rgba(45,212,191,0.4)] cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>Zen Suite VIP</span>
                </button>
              ) : isPro ? (
                <button
                  onClick={() => setPricingModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#00846D] to-[#476550] dark:from-[#2DD4BF] dark:to-[#00846D] text-white dark:text-[#061B18] text-xs font-black px-3.5 py-1.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 fill-current" />
                  <span>PRO ACTIVE</span>
                </button>
              ) : (
                <button
                  onClick={() => setPricingModalOpen(true)}
                  className="btn-tactile inline-flex items-center gap-1.5 bg-[#476550] hover:bg-[#3A5342] dark:bg-[#2DD4BF] dark:hover:bg-[#5EEAD4] text-white dark:text-[#061B18] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-[0_4px_14px_rgba(71,101,80,0.25)] dark:shadow-[0_4px_14px_rgba(45,212,191,0.3)] cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 fill-current" />
                  <span>Upgrade Pro</span>
                </button>
              )}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full border border-[#D8E2DA] dark:border-white/[0.15] bg-[#FAF9F6] dark:bg-white/[0.08] hover:bg-[#E8F0EB] dark:hover:bg-white/[0.14] transition-all flex items-center justify-center text-black dark:text-[#2DD4BF] focus:outline-none active:scale-95 cursor-pointer shadow-sm btn-tactile"
              aria-label="Toggle Light and Dark Mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Live User Profile / Avatar Chip */}
            {user ? (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-9 h-9 rounded-full bg-[#E8F0EB] dark:bg-[#1A2228] border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.3)] text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center transition-all active:scale-95 shadow-sm overflow-hidden cursor-pointer"
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
                className="inline-flex items-center gap-1.5 bg-[#E8F0EB] dark:bg-white/[0.08] hover:bg-[#D4E4DA] dark:hover:bg-white/[0.14] text-[#476550] dark:text-white border border-[rgba(162,188,168,0.5)] dark:border-white/[0.18] text-xs font-bold py-1.5 px-3.5 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer btn-tactile"
              >
                <LogIn className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl text-black dark:text-white hover:bg-slate-100 dark:hover:bg-[#141B20] transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F6] dark:bg-[#141B20] border-b border-[#D8E2DA] dark:border-[rgba(45,212,191,0.15)] px-4 sm:px-6 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2.5 font-bold text-sm text-black dark:text-white">
              
              {/* Mobile Pro Upgrade Banner */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPricingModalOpen(true);
                }}
                className={`w-full text-white font-black p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-sm mb-1 ${
                  isZenSuite 
                    ? "bg-gradient-to-r from-emerald-800 via-teal-700 to-[#2DD4BF] border border-[rgba(45,212,191,0.4)]"
                    : isPro 
                      ? "bg-gradient-to-r from-[#00846D] to-[#476550]" 
                      : "bg-[#476550] dark:bg-[#2DD4BF] text-white dark:text-[#061B18]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Crown className="w-4 h-4 fill-current" />
                  <span>{isZenSuite ? "👑 Zen Suite Ultimate Active" : isPro ? "ZenScout Pro Active" : "Upgrade to Pro (Ad-Free & Turbo Speed)"}</span>
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile Auth Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="w-full bg-slate-100 dark:bg-[#1A2228] text-black dark:text-white font-bold p-3 rounded-xl flex items-center justify-between text-xs mb-1"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" />
                  <span className="truncate max-w-[200px]">{user ? `Account: ${user.displayName || user.email}` : "Sign In / Create Account"}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link 
                href="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#1A2228] text-[#476550] dark:text-[#2DD4BF] flex items-center justify-between"
              >
                <span>Job Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#1A2228] flex items-center justify-between"
              >
                <span>Profile & ATS Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#1A2228] flex items-center justify-between"
              >
                <span>Career Guides & Blog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#1A2228] flex items-center justify-between"
              >
                <span>Pro Pricing Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#1A2228] flex items-center justify-between"
              >
                <span>About Aneevarp Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Cross-App Navigation Links */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#232D36] flex flex-col gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 dark:text-[#94A3B8] px-1">Zen Suite Apps</span>
                
                <a
                  href="https://zenresume.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E8F0EB] dark:bg-[#1A2228] border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)] text-[#476550] dark:text-[#2DD4BF] font-black p-2.5 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500 dark:text-[#2DD4BF]" />
                    ZenResume ATS Builder
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://pdf-analizing-and-answering-bot.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 font-bold p-2.5 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    ZenDoc AI (Document Intelligence)
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://aneevarpsolutions.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-100 dark:bg-[#1A2228] text-slate-800 dark:text-[#CBD5E1] font-bold p-2.5 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-teal-500 dark:text-[#2DD4BF]" />
                    Aneevarp Solutions Portal
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE & FOLDABLE FLOATING BOTTOM NAVIGATION DOCK */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-3 inset-x-3 z-40 max-w-lg mx-auto bg-[#FAF9F6]/95 dark:bg-[#141B20]/95 backdrop-blur-xl border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.2)] rounded-full shadow-2xl p-1.5 flex items-center justify-around animate-in fade-in slide-in-from-bottom-3"
      >
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-[#1A2228] text-[#1A1F1F] dark:text-[#CBD5E1] active:scale-95 transition-all flex-1"
        >
          <Briefcase className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" />
          <span className="text-[10px] font-bold mt-0.5">Jobs</span>
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-[#1A2228] text-[#1A1F1F] dark:text-[#CBD5E1] active:scale-95 transition-all flex-1"
        >
          <FileText className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" />
          <span className="text-[10px] font-bold mt-0.5">ATS Audit</span>
        </Link>

        <button
          onClick={() => setPricingModalOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full hover:bg-[#E8F0EB] dark:hover:bg-[#1A2228] text-[#476550] dark:text-[#2DD4BF] active:scale-95 transition-all flex-1"
        >
          {isZenSuite ? (
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
          ) : isPro ? (
            <Crown className="w-4 h-4 text-[#2DD4BF] fill-[#2DD4BF]" />
          ) : (
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          )}
          <span className="text-[10px] font-black mt-0.5">{isZenSuite ? "SUITE" : isPro ? "PRO" : "Upgrade"}</span>
        </button>

        <button
          onClick={() => setAuthModalOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-[#1A2228] text-[#1A1F1F] dark:text-[#CBD5E1] active:scale-95 transition-all flex-1"
        >
          <User className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" />
          <span className="text-[10px] font-bold mt-0.5">{user ? "Vault" : "Sign In"}</span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-[#1A2228] text-black dark:text-[#2DD4BF] active:scale-95 transition-all flex-1"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
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
