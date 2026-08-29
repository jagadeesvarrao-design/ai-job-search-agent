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
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#1A1F1F]/90 backdrop-blur-md border-b border-[#D8E2DA] dark:border-[#2D3636] transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-2xl group-hover:scale-105 transition-transform shadow-soft flex items-center justify-center p-1 flex-shrink-0">
              <img src="/icon.svg" alt="ZenScout AI Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left truncate">
              <span className="font-extrabold text-sm sm:text-base md:text-lg text-black dark:text-white leading-none tracking-tight">ZenScout AI</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-[#476550] dark:text-[#A2BCA8] font-bold tracking-wider uppercase truncate">by Aneevarp Solutions</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs sm:text-sm font-bold text-[#0F172A] dark:text-[#CBD5E1]" aria-label="Main Navigation">
            <Link href="/dashboard" className="hover:text-[#476550] dark:hover:text-[#A2BCA8] transition-colors py-1">Dashboard</Link>
            <Link href="/profile" className="hover:text-[#476550] dark:hover:text-[#A2BCA8] transition-colors py-1">ATS Audit</Link>
            <Link href="/pricing" className="hover:text-[#476550] dark:hover:text-[#A2BCA8] transition-colors py-1">Pricing</Link>
            <Link href="/about" className="hover:text-[#476550] dark:hover:text-[#A2BCA8] transition-colors py-1">About</Link>

            {/* Zen Suite Cross-App Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSuiteMenuOpen(!suiteMenuOpen)}
                onBlur={() => setTimeout(() => setSuiteMenuOpen(false), 200)}
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-[#476550] dark:hover:text-[#A2BCA8] transition-colors py-1 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>Zen Suite</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {suiteMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-60 bg-white dark:bg-[#222828] rounded-2xl border border-[#D8E2DA] dark:border-[#2D3636] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 px-3 py-1 block">Aneevarp Zen Ecosystem</span>
                  
                  <a
                    href="https://zenresume.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <div className="flex flex-col">
                      <span>ZenResume</span>
                      <span className="text-[10px] text-slate-500 font-normal">ATS Resume Builder</span>
                    </div>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
                  </a>

                  <a
                    href="https://pdf-analizing-and-answering-bot.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Brain className="w-4 h-4 text-purple-500" />
                    <div className="flex flex-col">
                      <span>ZenDoc AI</span>
                      <span className="text-[10px] text-slate-500 font-normal">Document Intelligence</span>
                    </div>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
                  </a>

                  <a
                    href="https://aneevarpsolutions.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Building className="w-4 h-4 text-teal-500" />
                    <div className="flex flex-col">
                      <span>Aneevarp Solutions</span>
                      <span className="text-[10px] text-slate-500 font-normal">Official Portal</span>
                    </div>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Actions Cluster (Clean & Uncluttered) */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">

            {/* Pro Upgrade / Member Badge (Desktop/Tablet) */}
            <div className="hidden sm:inline-flex">
              {isZenSuite ? (
                <button
                  onClick={() => setPricingModalOpen(true)}
                  className="suite-badge inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-500 text-white text-xs font-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all border border-amber-300/40 cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>Zen Suite Ultimate</span>
                </button>
              ) : isPro ? (
                <button
                  onClick={() => setPricingModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 fill-white" />
                  <span>PRO ACTIVE</span>
                </button>
              ) : (
                <button
                  onClick={() => setPricingModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-500 hover:text-white text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs font-black px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shadow-sm active:scale-95 group cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:text-white fill-amber-500" />
                  <span>Upgrade Pro</span>
                </button>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl border border-[#D8E2DA] dark:border-[#2D3636] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-black dark:text-amber-300 focus:outline-none active:scale-95 cursor-pointer"
              aria-label="Toggle Light and Dark Mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
            </button>

            {/* User Account Button (Auth Trigger / Profile Avatar) */}
            {user ? (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-100 dark:bg-teal-900/40 hover:bg-teal-200 dark:hover:bg-teal-900/60 text-[#476550] dark:text-[#A2BCA8] flex items-center justify-center transition-all active:scale-95 shadow-sm overflow-hidden cursor-pointer"
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
                className="inline-flex items-center gap-1 bg-white dark:bg-[#1F2525] hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-white border border-[#D8E2DA] dark:border-[#2D3636] text-xs font-bold py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#222828] border-b border-[#D8E2DA] dark:border-[#2D3636] px-4 sm:px-6 py-5 shadow-lg animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2.5 font-bold text-sm text-black dark:text-white">
              
              {/* Mobile Pro Upgrade Banner */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPricingModalOpen(true);
                }}
                className={`w-full text-white font-black p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-sm mb-1 ${
                  isZenSuite 
                    ? "bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-500 border border-amber-300/40"
                    : isPro 
                      ? "bg-gradient-to-r from-amber-500 to-orange-500" 
                      : "bg-gradient-to-r from-amber-500 to-orange-500"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Crown className="w-4 h-4 fill-white" />
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
                className="w-full bg-slate-100 dark:bg-slate-800 text-black dark:text-white font-bold p-3 rounded-xl flex items-center justify-between text-xs mb-1"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#476550] dark:text-[#A2BCA8]" />
                  <span className="truncate max-w-[200px]">{user ? `Account: ${user.displayName || user.email}` : "Sign In / Create Account"}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link 
                href="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-slate-800 text-[#476550] dark:text-[#A2BCA8] flex items-center justify-between"
              >
                <span>Job Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Profile & ATS Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Career Guides & Blog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Pro Pricing Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>About Aneevarp Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Cross-App Navigation Links */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 px-1">Zen Suite Apps</span>
                
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
                  href="https://zenresume.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[#476550] dark:text-[#A2BCA8] font-black p-2.5 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    ZenResume ATS Builder
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://aneevarpsolutions.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold p-2.5 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-teal-500" />
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
        className="lg:hidden fixed bottom-3 inset-x-3 z-40 max-w-lg mx-auto bg-white/90 dark:bg-[#222828]/90 backdrop-blur-xl border border-[#D8E2DA] dark:border-[#2D3636] rounded-2xl shadow-2xl p-1.5 flex items-center justify-around animate-in fade-in slide-in-from-bottom-3"
      >
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-300 active:scale-95 transition-all flex-1"
        >
          <Briefcase className="w-4 h-4 text-[#476550] dark:text-[#A2BCA8]" />
          <span className="text-[10px] font-bold mt-0.5">Jobs</span>
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-300 active:scale-95 transition-all flex-1"
        >
          <FileText className="w-4 h-4 text-[#476550] dark:text-[#A2BCA8]" />
          <span className="text-[10px] font-bold mt-0.5">ATS Audit</span>
        </Link>

        <button
          onClick={() => setPricingModalOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-900 dark:text-amber-300 active:scale-95 transition-all flex-1"
        >
          {isZenSuite ? (
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
          ) : isPro ? (
            <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
          ) : (
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          )}
          <span className="text-[10px] font-black mt-0.5">{isZenSuite ? "SUITE" : isPro ? "PRO" : "Upgrade"}</span>
        </button>

        <button
          onClick={() => setAuthModalOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-300 active:scale-95 transition-all flex-1"
        >
          <User className="w-4 h-4 text-[#476550] dark:text-[#A2BCA8]" />
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
