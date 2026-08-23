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
  TrendingUp,
  Award,
  Clock,
  ExternalLink
} from "lucide-react";
import { setUserPlan, getUserPlan } from "@/lib/user-tier";

export default function PricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly" | "annual">("monthly");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

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
    setIsUpgrading(true);
    setTimeout(() => {
      setUserPlan("pro", planKey);
      setIsUpgrading(false);
      setUpgradeSuccess(true);
    }, 1000);
  };

  const isINR = currency === "INR";

  return (
    <div className="max-w-5xl mx-auto py-8 px-2 md:px-4 text-center">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#00685F]/10 dark:bg-teal-900/30 text-[#00685F] dark:text-[#2DD4BF] text-xs font-black px-4 py-1.5 rounded-full mb-3">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>ZENScout PRO CAREER ACCELERATOR</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white tracking-tight mb-3">
          Invest in Your Dream Career
        </h1>
        <p className="text-base md:text-lg text-[#0F172A] dark:text-[#CBD5E1] font-medium max-w-2xl mx-auto">
          One callback from a top company changes everything. Unlock unlimited AI autonomy & an ad-free workspace.
        </p>
      </div>

      {/* ELITE GROWTH MARKETING CONVERSION ENGINE */}
      <div className="my-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-2xl border border-teal-500/30 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md flex-shrink-0">
              <Flame className="w-7 h-7 animate-pulse text-slate-950" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-teal-400 block">
                The Cost of Inaction (ROI Calculation)
              </span>
              <h2 className="text-lg md:text-2xl font-black text-white leading-tight">
                Stop Leaving {isINR ? "₹5,00,000+ to ₹15,00,000" : "$20,000 to $45,000"} on the Table
              </h2>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-black self-start md:self-auto">
            <TrendingUp className="w-4 h-4" />
            <span>1,670x Estimated Return</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-5 text-xs relative z-10">
          {/* The Daily Routine Trap */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1">
              <span>❌ The Status Quo (Lost Momentum)</span>
            </span>
            <p className="text-slate-300 leading-relaxed font-normal text-xs md:text-sm">
              Spending {isINR ? "₹299 on a single Swiggy dinner or movie ticket" : "$9.99 on two cups of coffee"} is gone in 20 minutes. Spending 4 hours manually tailoring resumes by hand leads to burn-out and missed deadlines.
            </p>
          </div>

          {/* The Pro Transformation */}
          <div className="bg-teal-950/40 p-4 rounded-2xl border border-teal-500/30 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-300 flex items-center gap-1">
              <span>⚡ The 30-Day Pro Advantage</span>
            </span>
            <p className="text-teal-100 leading-relaxed font-normal text-xs md:text-sm">
              For that exact {isINR ? "₹299" : "$9.99"}, your 4 AI agents work <strong>24/7 scouting live openings, beating ATS parsers, drafting tailored letters, and coaching mock interviews</strong>. 
              Just <strong>one</strong> offer upgrade easily yields {isINR ? "₹5,00,000+ LPA" : "$20,000+/yr"} in career upside.
            </p>
          </div>
        </div>
      </div>

      {/* Currency Switcher */}
      <div className="flex justify-center items-center gap-3 my-6">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Select Currency:</span>
        <div className="inline-flex bg-white dark:bg-[#1A2228] p-1 rounded-xl border border-[#E2E8F0] dark:border-[#232D36] shadow-sm">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currency === "INR" 
                ? "bg-[#00685F] text-white shadow-sm" 
                : "text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            ₹ INR (India)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currency === "USD" 
                ? "bg-[#00685F] text-white shadow-sm" 
                : "text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            $ USD (Global)
          </button>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* 1. MONTHLY PLAN */}
        <div className="p-8 rounded-3xl border-2 border-[#E2E8F0] dark:border-[#232D36] bg-white dark:bg-[#141B20] shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">1-Month Starter</h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full font-bold">
                Quick Boost
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹299" : "$9.99"}
              </span>
              <span className="text-xs text-slate-500 font-semibold"> / month</span>
            </div>

            <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              Perfect to test the waters and land quick interview calls this month.
            </p>

            <ul className="space-y-3 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>100% Ad-Free Workspace</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span>Unlimited Automated Job Scouting</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span>Unlimited 1-Click PDF Cover Letters</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span>Voice AI Mock Interview Simulation</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("monthly")}
            disabled={isUpgrading}
            className="mt-8 w-full bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-black py-4 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
          >
            <span>Get 1-Month Pro Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. 3-MONTH CAREER PASS (MOST POPULAR) */}
        <div className="p-8 rounded-3xl border-2 border-amber-500 dark:border-amber-400 bg-amber-50/20 dark:bg-amber-950/20 shadow-xl relative flex flex-col justify-between md:-translate-y-2">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
            ⭐ Most Popular (Full Job Hunt)
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 mt-1">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">3-Month Pass</h3>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-full font-bold">
                Save 25%
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹699" : "$24.99"}
              </span>
              <span className="text-xs text-slate-500 font-semibold"> / 3 months ({isINR ? "₹233/mo" : "$8.33/mo"})</span>
            </div>

            <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              Matches the typical 60–90 day hiring lifecycle until offer letter signing.
            </p>

            <ul className="space-y-3 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>100% Ad-Free for Full 90 Days</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Unlimited AI Agent Operations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Priority Server Processing Speed</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Dedicated Technical Support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("quarterly")}
            disabled={isUpgrading}
            className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
          >
            <span>Get 3-Month Pass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. ANNUAL PRO PLAN */}
        <div className="p-8 rounded-3xl border-2 border-[#E2E8F0] dark:border-[#232D36] bg-white dark:bg-[#141B20] shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">Annual Pro</h3>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-full font-bold">
                Best Long-term
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-black dark:text-white">
                {isINR ? "₹1,999" : "$69.99"}
              </span>
              <span className="text-xs text-slate-500 font-semibold"> / year</span>
            </div>

            <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              Continuous career growth, salary negotiation, and future opportunity alerts.
            </p>

            <ul className="space-y-3 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span><strong>100% Ad-Free 365 Days</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span>All Future Multi-Agent Upgrades</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                <span>VIP Badge & Early Features Access</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("annual")}
            disabled={isUpgrading}
            className="mt-8 w-full bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-black py-4 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
          >
            <span>Get 1-Year Pass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {upgradeSuccess && (
        <div className="my-6 p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 text-emerald-800 dark:text-emerald-200 rounded-2xl text-sm font-bold text-center animate-in fade-in">
          🎉 Upgrade Successful! You are now a ZenScout PRO member. All ads have been permanently disabled.
        </div>
      )}

      {/* Trust & Guarantee */}
      <div className="mt-12 pt-6 border-t border-[#E2E8F0] dark:border-[#232D36] flex flex-wrap items-center justify-between text-xs text-[#545F73] dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Zero-Backend Security • Cancel Anytime • 100% Ad-Free Guarantee</span>
        </div>
        <span>A Product of Aneevarp Solutions</span>
      </div>
    </div>
  );
}
