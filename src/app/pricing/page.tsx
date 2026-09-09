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
import { setUserPlan, getUserTierState, PRICING_DATA, detectDefaultCurrency } from "@/lib/user-tier";
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
    setCurrency(detectDefaultCurrency());
  }, []);

  const handleCurrencyChange = (newCurrency: "INR" | "USD") => {
    setCurrency(newCurrency);
    try {
      localStorage.setItem("preferred_currency", newCurrency);
    } catch (e) {}
  };

  const handleCheckout = (planKey: "monthly" | "quarterly" | "annual" | "zen_suite") => {
    setIsUpgrading(true);
    setTimeout(() => {
      if (planKey === "zen_suite") {
        setUserPlan("pro", "annual", true);
      } else {
        setUserPlan("pro", planKey, false);
      }
      setIsUpgrading(false);
      setUpgradeSuccess(true);
    }, 500);
  };

  const isINR = currency === "INR";

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-2 sm:px-4 text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-[rgba(71,101,80,0.08)] dark:bg-[rgba(45,212,191,0.12)] text-[#476550] dark:text-[#2DD4BF] text-xs font-black px-4 py-1.5 rounded-full mb-3">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>ZENScout PRO & ZEN SUITE ACCELERATION</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white tracking-tight mb-3">
          Choose Your Career Acceleration Plan
        </h1>
        <p className="text-sm md:text-base text-[#1A1F1F] dark:text-[#CBD5E1] font-medium max-w-2xl mx-auto">
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
              <p className="text-xs text-[#1A1F1F] dark:text-[#CBD5E1] font-medium">
                Please log in with Google or Email so we can bind your Pro membership and sync your applications across all your devices.
              </p>
            </div>
          </div>

          <button
            onClick={() => setAuthModalOpen(true)}
            className="bg-[#476550] hover:bg-[#3A5342] dark:bg-[#237A57] dark:hover:bg-[#10B981] text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center cursor-pointer"
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
      <div className="my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#00846D] via-[#476550] to-[#2DD4BF] dark:from-[#06110D] dark:via-[#0D1714] dark:to-[#06110D] border-2 border-[rgba(45,212,191,0.35)] shadow-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-[rgba(45,212,191,0.1)] rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 dark:bg-[rgba(45,212,191,0.15)] text-teal-100 dark:text-[#2DD4BF] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20 dark:border-[rgba(45,212,191,0.3)] shadow-md">
            <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>ANEEVARP ZEN SUITE ULTIMATE • ALL 3 APPS UNLOCKED</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex flex-wrap items-center gap-3">
            <span>Zen Suite Ultimate Cross-Pass</span>
            <span className="text-sm sm:text-base font-bold text-[#FCFAF5] dark:text-[#2DD4BF] bg-black/30 dark:bg-[#121E1A] px-3.5 py-1 rounded-full border border-white/20 dark:border-[rgba(45,212,191,0.3)]">
              {isINR ? "₹599/month" : "$29/month"}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-100 dark:text-[#CBD5E1] leading-relaxed">
            One unified master subscription unlocking <strong>ZenScout AI</strong> (Unlimited Pro Scouting & AI Voice Coach), <strong>ZenDoc AI</strong> (Unlimited Document AI & Multi-File OCR), and <strong>ZenResume</strong> (Unlimited ATS Templates) seamlessly across all devices using your single Google/Email login for 1 full month.
          </p>
        </div>

        <button
          onClick={() => handleCheckout("zen_suite")}
          disabled={isUpgrading}
          className="w-full md:w-auto bg-[#FCFAF5] dark:bg-[#2DD4BF] hover:bg-white text-[#476550] dark:text-[#061B18] font-black py-4 px-8 rounded-full text-sm shadow-xl active:scale-95 btn-tactile flex items-center justify-center gap-2 flex-shrink-0 relative z-10 cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Get Zen Suite Ultimate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Standalone Plans Subheading */}
      <div className="text-left my-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#476550] dark:text-[#2DD4BF] block">Standalone Plans</span>
        <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white">ZenScout AI Dedicated Access</h2>
      </div>

      {/* 3. VALUE LADDER CARDS (3-Column Desktop, Stacked Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left my-6">
        
        {/* PLAN 1: 1-MONTH STARTER */}
        <div className="card-surface p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">1-Month Starter</h3>
              <span className="text-[10px] bg-slate-100 dark:bg-[#121E1A] text-slate-700 dark:text-[#CBD5E1] px-3 py-1 rounded-full font-bold">
                Light Hunt
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹299" : "$19"}
              </span>
              <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold"> / {isINR ? "month" : "mo"}</span>
            </div>

            <p className="text-xs text-[#596060] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-slate-200/70 dark:border-[#1A2E26]">
              Essential AI tools for single-role targeted applications.
            </p>

            <ul className="space-y-3 text-xs text-[#1A1F1F] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>100% Ad-Free & Zero-Backend Data Privacy</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>25 Live Job Scout Runs / day</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>10 Tailored PDF Cover Letters / day</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>1 Full Text-Based Mock Interview Session / day</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>Core ATS Keyword Gap Diagnostics (5 Deep Audits / day • 150/mo)</strong></span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("monthly")}
            disabled={isUpgrading}
            className="mt-8 w-full bg-[#E8F0EB] hover:bg-[#476550] hover:text-white dark:bg-[#121E1A] dark:hover:bg-[#2DD4BF] dark:hover:text-[#061B18] text-[#476550] dark:text-[#2DD4BF] font-black py-3.5 px-4 rounded-full text-xs transition-all border border-[rgba(162,188,168,0.5)] dark:border-[rgba(45,212,191,0.25)] active:scale-95 btn-tactile flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Unlock 1-Month Starter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PLAN 2: 3-MONTH PASS (RECOMMENDED / DEFAULT) */}
        <div className="card-surface p-6 sm:p-8 border-2 border-[#476550] dark:border-[#2DD4BF] bg-emerald-50/20 dark:bg-[rgba(45,212,191,0.06)] shadow-xl relative flex flex-col justify-between lg:scale-105 z-10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00846D] to-[#476550] dark:from-[#2DD4BF] dark:to-[#00846D] text-white dark:text-[#061B18] text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
            🔥 MOST POPULAR • COVERS FULL 60–90 DAY HIRING CYCLE
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 mt-1">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">3-Month Pass</h3>
              <span className="text-[10px] bg-emerald-100 dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] px-2.5 py-1 rounded-full font-bold">
                Save 21%
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹699" : "$45"}
              </span>
              <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold"> / {isINR ? "3 months (₹233/mo)" : "3 mos ($15/mo)"}</span>
            </div>

            <p className="text-xs text-[#596060] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-slate-200/70 dark:border-[#1A2E26]">
              Everything you need from initial resume submission to signed offer letter.
            </p>

            <ul className="space-y-3 text-xs text-[#1A1F1F] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>⚡ UNLIMITED Live Google Jobs Scouting</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>⚡ UNLIMITED 1-Click ATS-Tailored Cover Letters</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>⚡ UNLIMITED Interactive Voice AI Mock Interviews (Audio Playback)</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>🎯 Full Deep ATS Keyword Gap Analyzer (Unlimited)</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>⚡ Priority Server Speed (Gemini 2.5 Flash low-latency)</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>📄 1-Click Sync with ZenResume Ecosystem</strong></span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("quarterly")}
            disabled={isUpgrading}
            className="mt-8 w-full stitch-hero-cta btn-tactile py-4 px-4 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Get 3-Month Full Pass (Recommended)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PLAN 3: ANNUAL PRO VIP */}
        <div className="card-surface p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">Annual Pro VIP</h3>
              <span className="text-[10px] bg-emerald-100 dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] px-2.5 py-1 rounded-full font-bold">
                Save 56%
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹1,999" : "$99"}
              </span>
              <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold"> / {isINR ? "year (₹166/mo)" : "yr ($8.25/mo)"}</span>
            </div>

            <p className="text-xs text-[#596060] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-slate-200/70 dark:border-[#1A2E26]">
              For continuous career growth, promotions, and lateral career switches.
            </p>

            <ul className="space-y-3 text-xs text-[#1A1F1F] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>✓ Everything in 3-Month Pass for 365 Days</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>✓ Recruiter Direct Cold-Outreach & DM Templates</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>✓ Offer Evaluation & Salary Negotiation Playbooks</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>✓ Priority Access to All Future Autonomous Agent Releases</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>👑 VIP Lifetime Member Badge in App</strong></span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("annual")}
            disabled={isUpgrading}
            className="mt-8 w-full bg-[#476550] hover:bg-[#3A5342] dark:bg-[#2DD4BF] dark:hover:bg-[#5EEAD4] text-white dark:text-[#061B18] font-black py-3.5 px-4 rounded-full text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Get Annual VIP Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {upgradeSuccess && (
        <div className="my-6 p-4 bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] border border-emerald-300 dark:border-[rgba(45,212,191,0.3)] text-emerald-900 dark:text-[#2DD4BF] text-sm font-bold rounded-2xl text-center animate-in fade-in max-w-2xl mx-auto">
          🎉 Subscription Activated! Welcome to Pro. <Link href="/dashboard" className="underline ml-1">Launch Dashboard &rarr;</Link>
        </div>
      )}

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <div className="mt-14 text-left max-w-3xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-black dark:text-white text-center mb-6">Frequently Asked Questions</h3>
        
        <div className="card-surface p-5 shadow-peaceful">
          <h4 className="font-bold text-sm text-black dark:text-white mb-1">How does Zen Suite Ultimate work across ZenDoc AI, ZenScout, and ZenResume?</h4>
          <p className="text-xs text-[#596060] dark:text-[#CBD5E1] leading-relaxed">
            When you subscribe to Zen Suite Ultimate ({isINR ? "₹599/mo" : "$29/mo"}), your single Google or Email account automatically unlocks all premium features across all 3 platforms without needing separate subscriptions.
          </p>
        </div>

        <div className="card-surface p-5 shadow-peaceful">
          <h4 className="font-bold text-sm text-black dark:text-white mb-1">Is my resume data stored on your cloud servers?</h4>
          <p className="text-xs text-[#596060] dark:text-[#CBD5E1] leading-relaxed">
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
