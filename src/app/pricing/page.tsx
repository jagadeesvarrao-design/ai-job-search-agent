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

  const handleCheckout = (planKey: "monthly" | "quarterly" | "annual") => {
    if (!user) {
      setShowAuthWarning(true);
      return;
    }

    setShowAuthWarning(false);
    setIsUpgrading(true);
    setTimeout(() => {
      setUserPlan("pro", planKey);
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
          <span>ZENScout PRO CAREER ACCELERATION</span>
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
            className="bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Create Account</span>
          </button>
        </div>
      )}

      {/* 2. COMPACT STREAMLINED VALUE PROPOSITION BANNER (Mobile-First) */}
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-md border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
        <div>
          <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-400 mb-1">
            <Zap className="w-3 h-3 fill-amber-400" />
            <span>ACCELERATE YOUR SEARCH</span>
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-black text-white leading-tight">
            Cut Your Job Hunt from 4 Months to 3 Weeks
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5 max-w-2xl leading-relaxed">
            Automate tedious applications, bypass ATS filters, and practice live AI voice mock interviews tailored to your exact target role.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="inline-flex bg-white/10 p-1 rounded-xl border border-white/10 flex-shrink-0 self-start sm:self-center">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currency === "INR" 
                ? "bg-[#00685F] text-white shadow-sm" 
                : "text-slate-300 hover:text-white"
            }`}
          >
            ₹ INR (India)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currency === "USD" 
                ? "bg-[#00685F] text-white shadow-sm" 
                : "text-slate-300 hover:text-white"
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
                <span><strong>1 Full Voice Mock Interview Session / day</strong></span>
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
            className="mt-8 w-full bg-slate-100 hover:bg-[#00685F] hover:text-white dark:bg-[#1A2228] dark:hover:bg-[#14B8A6] dark:hover:text-slate-950 text-[#00685F] dark:text-[#2DD4BF] font-black py-3.5 px-4 rounded-xl text-xs transition-all border border-[#00685F]/30 active:scale-95 flex items-center justify-center gap-1.5"
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
                <span><strong>⚡ UNLIMITED Interactive Voice AI Mock Interviews</strong></span>
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
            className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
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
            className="mt-8 w-full bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-black py-4 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
          >
            <span>Get Annual VIP Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {upgradeSuccess && (
        <div className="my-6 p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 text-emerald-800 dark:text-emerald-200 rounded-2xl text-sm font-bold text-center animate-in fade-in">
          🎉 Upgrade Successful! You are now a ZenScout Pro member. All ads have been permanently disabled and your tier capabilities are active.
        </div>
      )}

      {/* 4. TRUST & PAYMENT SECURITY FOOTER STRIP */}
      <div className="mt-12 pt-6 border-t border-[#E2E8F0] dark:border-[#232D36] space-y-2 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span><strong>🔒 256-Bit Encrypted Checkout</strong> • Instant UPI, Card & NetBanking Access • 1-Click Instant Cancellation</span>
          </div>
          <div className="text-xs text-slate-400">
            Operating under Aneevarp Solutions
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center">
          🛡️ 100% Zero-Database Privacy — Your career data lives exclusively in your browser memory.
        </p>
      </div>

      {/* Auth Modal Triggered on Standalone Page */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => {
          setAuthModalOpen(false);
          setShowAuthWarning(false);
        }} 
      />
    </div>
  );
}
