"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Zap, 
  Bot, 
  FileText, 
  Volume2, 
  Flame, 
  ArrowRight, 
  Lock, 
  Star, 
  Crown,
  HeartHandshake
} from "lucide-react";
import { setUserPlan, getUserPlan } from "@/lib/user-tier";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly" | "annual">("monthly");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  // Auto-detect country/currency based on timezone
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

  if (!isOpen) return null;

  const handleCheckout = (planKey: "monthly" | "quarterly" | "annual") => {
    setIsUpgrading(true);
    setTimeout(() => {
      setUserPlan("pro", planKey);
      setIsUpgrading(false);
      setUpgradeSuccess(true);
      setTimeout(() => {
        setUpgradeSuccess(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  const isINR = currency === "INR";

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#141B20] rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-[#E2E8F0] dark:border-[#232D36] bg-gradient-to-r from-teal-50/50 via-white to-blue-50/50 dark:from-[#141B20] dark:via-[#1A2228] dark:to-[#141B20] flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#00685F]/10 dark:bg-teal-900/30 text-[#00685F] dark:text-[#2DD4BF] text-xs font-black px-3 py-1 rounded-full mb-3">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>ZENSCUOT PRO CAREER ACCELERATOR</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white tracking-tight">
              Invest in Your Dream Career
            </h2>
            <p className="text-xs md:text-sm text-[#0F172A] dark:text-[#CBD5E1] font-medium mt-1">
              One callback from a top company changes everything. Unlock unlimited AI autonomy & an ad-free workspace.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HIGH-CONVERTING MOTIVATIONAL PERSUASION BOX */}
        <div className="mx-6 md:mx-8 mt-6 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-blue-500/10 border-2 border-amber-500/30 dark:border-amber-400/20 text-left relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-sm text-black dark:text-white flex items-center gap-2">
                <span>Think About This for a Second...</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-extrabold">
                  Perspective Check
                </span>
              </h3>
              <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mt-1 leading-relaxed">
                You spend {isINR ? "₹299 on a single Swiggy dinner or movie popcorn" : "$9.99 on two cups of Starbucks coffee"}. 
                Yet for the exact same amount, <strong>ZenScout Pro</strong> gives you 30 full days of continuous automated job hunting, 1-click tailored cover letters, and live voice interview practice.
                <strong> Even just 1 extra interview callback can increase your salary by {isINR ? "₹5,00,000+ LPA" : "$20,000+ / year"}</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex justify-center items-center gap-3 my-4 px-6">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Select Currency:</span>
          <div className="inline-flex bg-[#F8FAFC] dark:bg-[#1A2228] p-1 rounded-xl border border-[#E2E8F0] dark:border-[#232D36]">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === "INR" 
                  ? "bg-[#00685F] text-white shadow-sm" 
                  : "text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              ₹ INR (India)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === "USD" 
                  ? "bg-[#00685F] text-white shadow-sm" 
                  : "text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              $ USD (Global)
            </button>
          </div>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="p-6 md:p-8 pt-0 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. MONTHLY PLAN (THE MOTIVATED STARTER) */}
            <div className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between relative ${
              selectedPlan === "monthly" 
                ? "border-[#00685F] dark:border-[#2DD4BF] bg-teal-50/20 dark:bg-teal-950/20 shadow-lg scale-[1.02]" 
                : "border-[#E2E8F0] dark:border-[#232D36] bg-white dark:bg-[#141B20] hover:border-slate-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">1-Month Starter</h4>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                    Quick Boost
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-black text-black dark:text-white">
                    {isINR ? "₹299" : "$9.99"}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold"> / month</span>
                </div>

                <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  Perfect to test the waters and land quick interview calls this month.
                </p>

                <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                    <span><strong>100% Ad-Free Experience</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                    <span>Unlimited Automated Job Scouting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                    <span>Unlimited 1-Click PDF Cover Letters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                    <span>Voice AI Interview Coach (Full Speech)</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleCheckout("monthly")}
                disabled={isUpgrading}
                className="mt-6 w-full bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
              >
                <span>Get 1-Month Pro Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. 3-MONTH CAREER PASS (MOST POPULAR) */}
            <div className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between relative ${
              selectedPlan === "quarterly" 
                ? "border-amber-500 dark:border-amber-400 bg-amber-50/20 dark:bg-amber-950/20 shadow-xl scale-[1.03]" 
                : "border-amber-500/50 dark:border-amber-500/30 bg-white dark:bg-[#141B20]"
            }`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
                ⭐ Most Popular (Full Job Hunt)
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 mt-1">
                  <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">3-Month Pass</h4>
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                    Save 25%
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-black text-black dark:text-white">
                    {isINR ? "₹699" : "$24.99"}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold"> / 3 months ({isINR ? "₹233/mo" : "$8.33/mo"})</span>
                </div>

                <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  Matches the typical 60–90 day hiring lifecycle until offer letter signing.
                </p>

                <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span><strong>100% Ad-Free for Full 90 Days</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Unlimited AI Agent Operations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Priority Server Processing Speed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Dedicated Technical Support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleCheckout("quarterly")}
                disabled={isUpgrading}
                className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
              >
                <span>Get 3-Month Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. ANNUAL PRO PLAN */}
            <div className="p-6 rounded-3xl border-2 border-[#E2E8F0] dark:border-[#232D36] bg-white dark:bg-[#141B20] transition-all flex flex-col justify-between hover:border-slate-300">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">Annual Pro</h4>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    Best Long-term
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-black text-black dark:text-white">
                    {isINR ? "₹1,999" : "$69.99"}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold"> / year</span>
                </div>

                <p className="text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  Continuous career growth, salary negotiation, and future opportunity alerts.
                </p>

                <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                    <span><strong>100% Ad-Free 365 Days</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                    <span>All Future Multi-Agent Upgrades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                    <span>VIP Badge & Early Features Access</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleCheckout("annual")}
                disabled={isUpgrading}
                className="mt-6 w-full bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
              >
                <span>Get 1-Year Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Success message */}
          {upgradeSuccess && (
            <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-bold text-center animate-in fade-in">
              🎉 Upgrade Successful! You are now a ZenScout PRO member. All ads have been disabled.
            </div>
          )}

          {/* Footer Security Assurance */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero-Backend Security • Cancel Anytime • 100% Ad-Free Guarantee</span>
            </div>
            <span>Operating under Aneevarp Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
