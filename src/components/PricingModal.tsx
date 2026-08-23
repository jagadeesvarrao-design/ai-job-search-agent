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
  HeartHandshake,
  TrendingUp,
  LogIn,
  AlertCircle
} from "lucide-react";
import { setUserPlan, getUserTierState } from "@/lib/user-tier";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "@/components/AuthModal";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const { user } = useAuth();
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

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
    // Authentication Check: If user is not logged in, prompt alert & open login modal
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
      setTimeout(() => {
        setUpgradeSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  const isINR = currency === "INR";

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-white dark:bg-[#141B20] rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95 duration-200">
          
          {/* Compact Modal Header */}
          <div className="px-6 py-4 border-b border-[#E2E8F0] dark:border-[#232D36] bg-gradient-to-r from-teal-50/40 via-white to-blue-50/40 dark:from-[#141B20] dark:via-[#1A2228] dark:to-[#141B20] flex justify-between items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#00685F]/10 dark:bg-teal-900/30 text-[#00685F] dark:text-[#2DD4BF] text-[11px] font-extrabold px-3 py-0.5 rounded-full mb-1">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>ZENScout PRO CAREER SUITE</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-black dark:text-white tracking-tight">
                Choose Your Career Acceleration Plan
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-5 md:p-6 overflow-y-auto flex-1 space-y-5">
            
            {/* AUTHENTICATION REQUIRED PROMPT BANNER */}
            {showAuthWarning && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 dark:border-amber-400/30 text-black dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in slide-in-from-top-3">
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

            {/* ELITE GROWTH MARKETING CONVERSION ENGINE */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl border border-teal-500/30 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md flex-shrink-0">
                    <Flame className="w-5 h-5 animate-pulse text-slate-950" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 block">
                      The Cost of Inaction (ROI Calculation)
                    </span>
                    <h3 className="text-sm md:text-base font-black text-white leading-tight">
                      Stop Leaving {isINR ? "₹5,00,000+ to ₹15,00,000" : "$20,000 to $45,000"} on the Table
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-emerald-300 text-xs font-black self-start sm:self-auto">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>1,670x Estimated Return</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 pt-3.5 text-xs relative z-10">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1">
                    <span>❌ The Status Quo (Lost Momentum)</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed font-normal text-[11px] sm:text-xs">
                    Spending {isINR ? "₹299 on a single Swiggy meal or movie ticket" : "$9.99 on coffee"} is gone in 20 minutes. Spending 4 hours manually editing resumes by hand leads to burn-out and missed deadlines.
                  </p>
                </div>

                <div className="bg-teal-950/40 p-3 rounded-2xl border border-teal-500/30 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-300 flex items-center gap-1">
                    <span>⚡ The Pro Multi-Agent Advantage</span>
                  </span>
                  <p className="text-teal-100 leading-relaxed font-normal text-[11px] sm:text-xs">
                    Your 4 AI agents work <strong>24/7 scouting live openings, beating ATS parsers, and coaching mock interviews</strong>. 
                    Just <strong>one</strong> offer upgrade yields {isINR ? "₹5,00,000+ LPA" : "$20,000+/yr"} in upside.
                  </p>
                </div>
              </div>
            </div>

            {/* Currency Switcher */}
            <div className="flex justify-center items-center gap-3">
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

            {/* APPLE & SAMSUNG TIERED VALUE LADDER CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              
              {/* 1. 1-MONTH STARTER */}
              <div className="p-5 rounded-3xl border-2 border-[#E2E8F0] dark:border-[#232D36] bg-white dark:bg-[#141B20] hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">1-Month Starter</h4>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                      Light Hunt
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹299" : "$9.99"}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold"> / month</span>
                  </div>

                  <p className="text-[11px] text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    5x boost over free tier. Ideal for rapid single-role applications.
                  </p>

                  <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>100% Ad-Free Experience</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>25 Scout Runs / day</strong> (vs 5 on Free)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>10 PDF Cover Letters / day</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>15 Voice Coach Exchanges / day</strong></span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                      <span className="text-[11px]">Deep ATS Keyword Gap Analyzer</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("monthly")}
                  disabled={isUpgrading}
                  className="mt-5 w-full bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
                >
                  <span>Get 1-Month Starter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2. 3-MONTH CAREER PASS */}
              <div className="p-5 rounded-3xl border-2 border-amber-500 dark:border-amber-400 bg-amber-50/20 dark:bg-amber-950/20 shadow-xl flex flex-col justify-between relative scale-[1.02]">
                <div>
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
                    <Star className="w-3 h-3 fill-white" />
                    <span>⭐ BEST VALUE • FULL HIRING CYCLE</span>
                  </div>

                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">3-Month Pass</h4>
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                      Save 25%
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹699" : "$24.99"}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold"> / 3 mos ({isINR ? "₹233/mo" : "$8.33/mo"})</span>
                  </div>

                  <p className="text-[11px] text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    Matches the typical 60–90 day hiring lifecycle from scouting to offer letter.
                  </p>

                  <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>100% Ad-Free for Full 90 Days</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED Job Scouting</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED 1-Click PDF Letters</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED Voice AI Coach</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>🎯 Deep ATS Keyword Gap Analyzer</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>⚡ Priority 2x Server Speed</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>📄 1-Click ZenResume Ecosystem Sync</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("quarterly")}
                  disabled={isUpgrading}
                  className="mt-5 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
                >
                  <span>Get 3-Month Pass (Recommended)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3. ANNUAL PRO VIP */}
              <div className="p-5 rounded-3xl border-2 border-[#E2E8F0] dark:border-[#232D36] bg-white dark:bg-[#141B20] hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">Annual Pro VIP</h4>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      Ultimate Savings
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹1,999" : "$69.99"}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold"> / yr ({isINR ? "₹166/mo" : "$5.83/mo"})</span>
                  </div>

                  <p className="text-[11px] text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    Continuous career growth, active recruiter scouting, & future AI releases.
                  </p>

                  <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>100% Ad-Free 365 Days</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>Everything in 3-Month Pass</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>👑 VIP Member Badge in App</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>📊 Salary Insights & Recruiter Intel</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>🚀 Lifetime Access to New Agents</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("annual")}
                  disabled={isUpgrading}
                  className="mt-5 w-full bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5"
                >
                  <span>Get Annual VIP Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {upgradeSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-bold text-center animate-in fade-in">
                🎉 Upgrade Successful! You are now a ZenScout PRO member. All ads have been disabled.
              </div>
            )}

            {/* Footer Security Assurance */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero-Backend Security • Cancel Anytime • 100% Ad-Free Guarantee</span>
              </div>
              <span>Operating under Aneevarp Solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Auth Modal Triggered When Non-Logged-In User Tries To Subscribe */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => {
          setAuthModalOpen(false);
          setShowAuthWarning(false);
        }} 
      />
    </>
  );
}
