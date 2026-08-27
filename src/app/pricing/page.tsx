"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Zap, 
  Flame, 
  ArrowRight, 
  Crown, 
  Star, 
  LogIn, 
  AlertCircle,
  Clock,
  Send,
  Building2,
  FileCheck
} from "lucide-react";
import { setUserPlan, getUserTierState, PRICING_DATA } from "@/lib/user-tier";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "@/components/AuthModal";

export default function PricingPage() {
  const { user } = useAuth();
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("Asia/Kolkata") || tz.includes("Asia/Colombo")) {
        setCurrency("INR");
      } else {
        setCurrency("USD");
      }
    } catch (e) {
      setCurrency("INR");
    }
  }, []);

  const handleCheckout = (planKey: "monthly" | "quarterly" | "annual" | "zen_suite") => {
    if (!user) {
      setShowAuthWarning(true);
      return;
    }

    setShowAuthWarning(false);
    setIsUpgrading(true);
    setTimeout(() => {
      if (planKey === "zen_suite") {
        setUserPlan("pro", "annual", true);
      } else {
        setUserPlan("pro", planKey, false);
      }
      setIsUpgrading(false);
      setUpgradeSuccess(true);
    }, 800);
  };

  const isINR = currency === "INR";

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-2 sm:px-4 text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-[#00685F]/10 dark:bg-teal-900/30 text-[#00685F] dark:text-[#2DD4BF] text-xs font-black px-4 py-1.5 rounded-full mb-3">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>ZENScout PRO & ZEN SUITE ACCELERATION</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white tracking-tight mb-3">
          Choose Your Career Acceleration Plan
        </h1>
        <p className="text-sm md:text-base text-[#0F172A] dark:text-[#CBD5E1] font-medium max-w-2xl mx-auto">
          One callback from a top company changes everything. Unlock autonomous AI scouting, deep ATS audits, and an ad-free workspace.
        </p>
      </div>

      {/* AUTHENTICATION REQUIRED PROMPT BANNER */}
      {showAuthWarning && (
        <div className="my-5 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 dark:border-amber-400/30 text-black dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left animate-in slide-in-from-top-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-sm text-black dark:text-white">Sign In Required to Activate Subscription</h4>
              <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                Please log in with Google or Email so we can bind your Pro membership and sync your applications across all your devices.
              </p>
            </div>
          </div>

          <button
            onClick={() => setAuthModalOpen(true)}
            className="bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Create Account</span>
          </button>
        </div>
      )}

      {/* ACTIVE ZEN SUITE PLAN BANNER */}
      {getUserTierState().isZenSuite && (
        <div className="my-5 p-5 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 border-2 border-amber-400/60 text-white flex items-center gap-4 text-left animate-in fade-in shadow-xl">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 flex-shrink-0">
            <Crown className="w-6 h-6 fill-amber-300" />
          </div>
          <div>
            <h3 className="font-black text-base text-amber-300">✅ Your Zen Suite Ultimate plan is active!</h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
              All senior manager mock interview rounds, voice simulations, and code evaluations are unlocked across ZenScout AI, ZenDoc AI, and ZenResume.
            </p>
          </div>
        </div>
      )}

      {/* 🌟 ZEN SUITE ULTIMATE ALL-IN-ONE CROSS-APP BUNDLE */}
      <div className="my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 border-2 border-teal-400/60 shadow-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
            <Crown className="w-3.5 h-3.5 fill-white" />
            <span>ANEEVARP ZEN SUITE ULTIMATE • ALL 3 APPS UNLOCKED</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex flex-wrap items-center gap-3">
            <span>Zen Suite Ultimate Cross-Pass</span>
            <span className="text-sm sm:text-base font-bold text-[#2DD4BF] bg-teal-950/80 px-3 py-1 rounded-xl border border-teal-500/40">
              {isINR ? "₹599/month" : "$15.99/mo"}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            One unified master subscription unlocking <strong>ZenScout AI</strong> (Unlimited Pro Scouting & AI Voice Coach), <strong>ZenDoc AI</strong> (Unlimited Document AI & Multi-File OCR), and <strong>ZenResume</strong> (Unlimited ATS Templates) seamlessly across all devices using your single Google/Email login.
          </p>
        </div>

        <button
          onClick={() => handleCheckout("zen_suite")}
          disabled={isUpgrading}
          className="w-full md:w-auto bg-gradient-to-r from-[#00685F] to-[#2DD4BF] hover:from-[#005049] hover:to-[#14B8A6] text-slate-950 font-black py-4 px-8 rounded-2xl text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0 relative z-10 cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
          <span>Get Zen Suite Ultimate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Currency Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 my-6 p-4 rounded-2xl bg-white dark:bg-[#141B20] border border-[#E2E8F0] dark:border-[#232D36] text-left shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Standalone Plans</span>
          <p className="text-xs text-black dark:text-white font-medium">Looking for ZenScout AI standalone access only?</p>
        </div>

        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currency === "INR" 
                ? "bg-[#00685F] text-white shadow-sm" 
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            ₹ INR (India)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currency === "USD" 
                ? "bg-[#00685F] text-white shadow-sm" 
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            $ USD (Global)
          </button>
        </div>
      </div>

      {/* 3. VALUE LADDER CARDS (3-Column Desktop, Stacked Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left my-6">
        
        {/* PLAN 1: 1-MONTH STARTER */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] bg-white dark:bg-[#141B20] shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">1-Month Starter</h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full font-bold">
                Light Hunt
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹299" : "$9"}
              </span>
              <span className="text-xs text-slate-500 font-semibold"> / {isINR ? "month" : "mo"}</span>
            </div>

            <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              Essential AI tools for single-role targeted applications.
            </p>

            <ul className="space-y-3 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>100% Ad-Free & Zero-Backend Data Privacy</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>25 Live Job Scout Runs / day</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>10 Tailored PDF Cover Letters / day</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>1 Full Text-Based Mock Interview Session / day</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>Core ATS Keyword Gap Diagnostics (3 Deep Audits / day)</strong></span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("monthly")}
            disabled={isUpgrading}
            className="mt-8 w-full bg-slate-100 hover:bg-[#00685F] hover:text-white dark:bg-[#1A2228] dark:hover:bg-[#14B8A6] dark:hover:text-slate-950 text-[#00685F] dark:text-[#2DD4BF] font-black py-3.5 px-4 rounded-xl text-xs transition-all border border-[#00685F]/30 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Unlock 1-Month Starter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PLAN 2: 3-MONTH PASS (RECOMMENDED / DEFAULT) */}
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-amber-500 dark:border-amber-400 bg-amber-50/20 dark:bg-amber-950/20 shadow-xl relative flex flex-col justify-between lg:scale-105 z-10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
            🔥 MOST POPULAR • COVERS FULL 60–90 DAY HIRING CYCLE
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 mt-1">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">3-Month Pass</h3>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 px-2.5 py-1 rounded-full font-bold">
                Save 25%
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹699" : "$19"}
              </span>
              <span className="text-xs text-slate-500 font-semibold"> / {isINR ? "3 months (₹233/mo)" : "3 mos ($6.33/mo)"}</span>
            </div>

            <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-amber-200 dark:border-amber-900/40">
              Everything you need from initial resume submission to signed offer letter.
            </p>

            <ul className="space-y-3 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>⚡ UNLIMITED Live Google Jobs Scouting</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>⚡ UNLIMITED 1-Click ATS-Tailored Cover Letters</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>⚡ UNLIMITED Interactive Voice AI Mock Interviews (Audio Playback)</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>🎯 Full Deep ATS Keyword Gap Analyzer (Unlimited)</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>⚡ Priority Server Speed (Gemini 2.5 Flash low-latency)</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>📄 1-Click Sync with ZenResume Ecosystem</strong></span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("quarterly")}
            disabled={isUpgrading}
            className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Get 3-Month Full Pass (Recommended)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PLAN 3: ANNUAL PRO VIP */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] bg-white dark:bg-[#141B20] shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">Annual Pro VIP</h3>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-full font-bold">
                Save 60%
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹1,999" : "$49"}
              </span>
              <span className="text-xs text-slate-500 font-semibold"> / {isINR ? "year (₹166/mo)" : "yr ($4.08/mo)"}</span>
            </div>

            <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              For continuous career growth, promotions, and lateral career switches.
            </p>

            <ul className="space-y-3 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>✓ Everything in 3-Month Pass for 365 Days</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>✓ Recruiter Direct Cold-Outreach & DM Templates</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>✓ Offer Evaluation & Salary Negotiation Playbooks</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>✓ Priority Access to All Future Autonomous Agent Releases</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>👑 VIP Lifetime Member Badge in App</strong></span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("annual")}
            disabled={isUpgrading}
            className="mt-8 w-full bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-black py-3.5 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Get Annual VIP Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {upgradeSuccess && (
        <div className="my-6 p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-bold rounded-2xl text-center animate-in fade-in">
          🎉 Subscription Activated! Welcome to Pro. <Link href="/dashboard" className="underline ml-1">Launch Dashboard &rarr;</Link>
        </div>
      )}

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <div className="mt-14 text-left max-w-3xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-black dark:text-white text-center mb-6">Frequently Asked Questions</h3>
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#141B20] border border-[#E2E8F0] dark:border-[#232D36]">
          <h4 className="font-bold text-sm text-black dark:text-white mb-1">How does Zen Suite Ultimate work across ZenDoc AI, ZenScout, and ZenResume?</h4>
          <p className="text-xs text-[#545F73] dark:text-slate-300 leading-relaxed">
            When you subscribe to Zen Suite Ultimate (₹599/mo / $15.99/mo), your single Google or Email account automatically unlocks all premium features across all 3 platforms without needing separate subscriptions.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#141B20] border border-[#E2E8F0] dark:border-[#232D36]">
          <h4 className="font-bold text-sm text-black dark:text-white mb-1">Is my resume data stored on your cloud servers?</h4>
          <p className="text-xs text-[#545F73] dark:text-slate-300 leading-relaxed">
            No. ZenScout AI operates under strict Zero-Backend privacy architecture. Your resume is parsed statelessly in your local browser and sent directly to Google Gemini AI over encrypted TLS without database storage.
          </p>
        </div>
      </div>

      {/* Auth Modal Trigger */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
}
