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
  LogIn,
  ArrowUpRight
} from "lucide-react";
import { isProSubscriber, getUserTierState } from "@/lib/user-tier";
import { useAuth } from "@/lib/auth-context";
import PricingModal from "@/components/PricingModal";
import AuthModal from "@/components/AuthModal";
import MobileNavCapsule from "@/components/MobileNavCapsule";

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
      {/* Top Parent Company Enterprise Bar (Visible to All Users Across All Devices) */}
      <aside className="w-full bg-[#344A3B] dark:bg-[#07130E] border-b border-[#2C3E32] dark:border-[#132B20] text-white/90 text-[10.5px] sm:text-xs py-1.5 px-3 sm:px-6 transition-colors z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse flex-shrink-0"></span>
            <span className="truncate text-white/85">An Official Product of <strong>Aneevarp Solutions</strong> Autonomous Career Suite</span>
          </div>
          <a
            href="https://aneevarpsolutions.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 font-extrabold text-[#9EE8C7] hover:text-white dark:text-[#2DD4BF] dark:hover:text-white inline-flex items-center gap-1 transition-colors hover:underline tracking-tight text-[11px]"
            title="Visit Official Parent Company Website: Aneevarp Solutions"
          >
            <span>Parent Company Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </aside>

      <header className="sticky top-0 z-40 bg-[#F7F9F6]/85 dark:bg-[#07130E]/85 backdrop-blur-xl border-b border-[#D8E2DA] dark:border-[#1A2E26] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Identity (Green Squircle Logo with Z + Clickable Parent Link) */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <Link href="/" className="w-9 h-9 sm:w-10 sm:h-10 bg-[#3D5644] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-xs hover:scale-105 transition-all flex-shrink-0 tracking-tight" aria-label="ZenScout AI Home">
              Z
            </Link>
            <div className="flex flex-col text-left truncate">
              <Link href="/" className="font-extrabold text-sm sm:text-base md:text-lg text-[#1A1F1F] dark:text-white leading-tight tracking-tight hover:opacity-90">
                ZenScout AI
              </Link>
              <a
                href="https://aneevarpsolutions.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8px] sm:text-[9px] font-extrabold text-[#556055] dark:text-[#8FA796] hover:text-[#3D5644] dark:hover:text-[#2DD4BF] tracking-[0.16em] uppercase truncate transition-colors inline-flex items-center gap-0.5 group/parent"
                title="Aneevarp Solutions - Official Parent Company"
              >
                <span>by Aneevarp Solutions</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-60 group-hover/parent:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Center: Clean Uppercase Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8 flex-shrink-0">
            <nav className="flex items-center gap-5 lg:gap-7 text-xs font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#94A3B8]" aria-label="Main Navigation">
              <Link 
                href="/#category-blueprints" 
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link 
                href="/#pipeline" 
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <Link 
                href="/pricing" 
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link 
                href="/profile" 
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                ATS Audit
              </Link>

              {/* Direct Parent Company Link */}
              <a 
                href="https://aneevarpsolutions.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1 text-[#3D5644] dark:text-[#2DD4BF]"
                title="Visit Parent Company: Aneevarp Solutions"
              >
                <span>Aneevarp Solutions</span>
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              </a>

              {/* Zen Suite Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setSuiteMenuOpen(!suiteMenuOpen)}
                  onBlur={() => setTimeout(() => setSuiteMenuOpen(false), 200)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#D8E2DA] dark:border-[#1A2E26] bg-[#FAF9F6] dark:bg-[#0D1714] text-[11px] font-bold text-[#4B5563] dark:text-[#94A3B8] hover:text-black dark:hover:text-white transition-all cursor-pointer shadow-xs whitespace-nowrap uppercase tracking-wider"
                >
                  <Layers className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Zen Suite</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${suiteMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {suiteMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1A2E26] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 text-left normal-case">
                    <a
                      href="https://zenresume.online/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#E8F0EB] dark:hover:bg-[#13221C] text-left group transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-[rgba(45,212,191,0.15)] flex items-center justify-center text-emerald-700 dark:text-[#2DD4BF]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-black dark:text-white group-hover:text-[#476550] dark:group-hover:text-[#2DD4BF]">ZenResume</div>
                        <div className="text-[10px] text-[#7D8787] dark:text-[#94A3B8]">Single-Column ATS Builder</div>
                      </div>
                    </a>

                    <a
                      href="https://pdf-analizing-and-answering-bot.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#E8F0EB] dark:hover:bg-[#13221C] text-left group transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-purple-700 dark:text-purple-300">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-black dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300">ZenDoc AI</div>
                        <div className="text-[10px] text-[#7D8787] dark:text-[#94A3B8]">Document Intelligence OCR</div>
                      </div>
                    </a>

                    <a
                      href="https://aneevarpsolutions.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#E8F0EB] dark:hover:bg-[#13221C] text-left group transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-[#121E1A] flex items-center justify-center text-slate-700 dark:text-slate-300">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-black dark:text-white">Aneevarp Solutions</div>
                        <div className="text-[10px] text-[#7D8787] dark:text-[#94A3B8]">Corporate Innovation Portal</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Actions Cluster (Theme Toggle, Avatar with Online Dot, Launch App Button) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Dark / Light Theme Toggle (Squircle Button matching Screenshot 1 & 2) */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-xl border border-[#D5DDD6] dark:border-[#1E382B] bg-white/80 dark:bg-[#0E1F17] hover:bg-slate-50 dark:hover:bg-[#132B20] transition-all flex items-center justify-center focus:outline-none active:scale-95 cursor-pointer shadow-xs btn-tactile flex-shrink-0"
              aria-label="Toggle Light and Dark Mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/30" /> : <Moon className="w-4 h-4 text-[#2A342C]" />}
            </button>

            {/* Live User Profile / Avatar Chip (Blue squircle with green status dot) */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-9 h-9 rounded-xl bg-[#7CA7D9] dark:bg-[#4874AA] hover:opacity-90 relative flex items-center justify-center text-white shadow-xs cursor-pointer active:scale-95 transition-all flex-shrink-0"
              aria-label="User Account"
              title={user?.displayName || user?.email || "Sign In / Account"}
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
              {/* Active Online Green Dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-white dark:border-[#07130E]" />
            </button>

            {/* Primary Action: Solid Dark Sage Launch App Button */}
            <Link
              href="/dashboard"
              className="hidden sm:flex bg-[#3D5644] hover:bg-[#344A3B] dark:bg-[#3D5644] dark:hover:bg-[#476550] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs items-center gap-1.5 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-black dark:text-white hover:bg-slate-100 dark:hover:bg-[#0D1714] transition-colors focus:outline-none cursor-pointer flex-shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F6] dark:bg-[#0D1714] border-b border-[#D8E2DA] dark:border-[rgba(45,212,191,0.15)] px-4 sm:px-6 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
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
                      : "bg-[#476550] dark:bg-[#237A57] text-white"
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
                className="w-full bg-slate-100 dark:bg-[#13221C] text-black dark:text-white font-bold p-3 rounded-xl flex items-center justify-between text-xs mb-1"
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
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#13221C] text-[#476550] dark:text-[#2DD4BF] flex items-center justify-between"
              >
                <span>Job Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#13221C] flex items-center justify-between"
              >
                <span>Profile & ATS Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#13221C] flex items-center justify-between"
              >
                <span>Career Guides & Blog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#13221C] flex items-center justify-between"
              >
                <span>Pro Pricing Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FCFAF5] dark:hover:bg-[#13221C] flex items-center justify-between"
              >
                <span>About Aneevarp Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Cross-App Navigation Links */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#1F352C] flex flex-col gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 dark:text-[#94A3B8] px-1">Zen Suite Apps</span>
                
                <a
                  href="https://zenresume.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E8F0EB] dark:bg-[#13221C] border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)] text-[#476550] dark:text-[#2DD4BF] font-black p-2.5 rounded-xl flex items-center justify-between text-xs"
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
                  className="bg-slate-100 dark:bg-[#13221C] text-slate-800 dark:text-[#CBD5E1] font-bold p-2.5 rounded-xl flex items-center justify-between text-xs"
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

      {/* MOBILE & FOLDABLE FLOATING BOTTOM NAVIGATION CAPSULE */}
      <MobileNavCapsule
        isPro={isPro}
        isZenSuite={isZenSuite}
        onOpenPricing={() => setPricingModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleDarkMode}
        user={user}
      />

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
