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
  Flame, 
  ArrowRight, 
  Lock, 
  Star, 
  Crown,
  TrendingUp,
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
      setTimeout(() => {
        setUpgradeSuccess(false);
        onClose();
      }, 1200);
    }, 500);
  };

  const isINR = currency === "INR";

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-white dark:bg-[#222828] rounded-3xl border border-[#D8E2DA] dark:border-[#2D3636] shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95 duration-200">
          
          {/* Header Bar */}
          <div className="px-5 sm:px-6 py-3.5 border-b border-[#D8E2DA] dark:border-[#2D3636] bg-gradient-to-r from-teal-50/50 via-white to-amber-50/50 dark:from-[#222828] dark:via-[#1F2525] dark:to-[#222828] flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-1.5 rounded-xl shadow-sm">
                <Crown className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-black dark:text-white tracking-tight">
                ZenScout Pro & Zen Suite Acceleration
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            
            {/* AUTHENTICATION REQUIRED PROMPT BANNER */}
            {showAuthWarning && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 dark:border-amber-400/30 text-black dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in slide-in-from-top-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-black dark:text-white">Sign In Required to Activate Subscription</h4>
                    <p className="text-[11px] text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                      Please log in with Google or Email so we can bind your Pro membership and sync your application workspace across devices.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-[#476550] hover:bg-[#3A5342] dark:bg-[#6B9077] dark:hover:bg-[#55735E] text-white text-xs font-black py-2 px-3.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In / Create Account</span>
                </button>
              </div>
            )}

            {/* ACTIVE ZEN SUITE PLAN BANNER */}
            {getUserTierState().isZenSuite && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 border-2 border-amber-400/60 text-white flex items-center gap-3 animate-in fade-in shadow-lg">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 flex-shrink-0">
                  <Crown className="w-5 h-5 fill-amber-300" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-amber-300 flex items-center gap-1.5">
                    <span>✅ Your Zen Suite Ultimate plan is active!</span>
                  </h4>
                  <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                    All senior manager mock interview rounds, voice simulations, and code evaluations are unlocked across ZenScout AI, ZenDoc AI, and ZenResume.
                  </p>
                </div>
              </div>
            )}

            {/* 🌟 ZEN SUITE ULTIMATE ALL-IN-ONE CROSS-APP BUNDLE */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 border-2 border-teal-400/60 shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-1.5 max-w-xl relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  <Crown className="w-3 h-3 fill-white" />
                  <span>ANEEVARP ZEN SUITE ULTIMATE • ALL 3 APPS UNLOCKED</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white flex flex-wrap items-center gap-2">
                  <span>Zen Suite Ultimate Cross-Pass</span>
                  <span className="text-sm font-bold text-[#A2BCA8] bg-teal-950/80 px-2.5 py-0.5 rounded-lg border border-teal-500/40">
                    {isINR ? "₹599/mo" : "$15.99/mo"}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  One unified subscription unlocking <strong>ZenScout AI</strong> (Unlimited Pro), <strong>ZenDoc AI</strong> (Unlimited Document AI), and <strong>ZenResume</strong> (Unlimited ATS Templates) seamlessly across all devices.
                </p>
              </div>

              <button
                onClick={() => handleCheckout("zen_suite")}
                disabled={isUpgrading}
                className="w-full md:w-auto bg-gradient-to-r from-[#476550] to-[#A2BCA8] hover:from-[#3A5342] hover:to-[#6B9077] text-slate-950 font-black py-3 px-6 rounded-2xl text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0 relative z-10 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Get Zen Suite Ultimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Currency Switcher Bar */}
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-bold text-[#596060] dark:text-slate-400">ZenScout Standalone Plans:</span>
              <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setCurrency("INR")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    currency === "INR" 
                      ? "bg-[#476550] text-white shadow-sm" 
                      : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  ₹ INR (India)
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    currency === "USD" 
                      ? "bg-[#476550] text-white shadow-sm" 
                      : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  $ USD (Global)
                </button>
              </div>
            </div>

            {/* 3. VALUE LADDER CARDS (3-Column Desktop, Stacked Mobile) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-left pt-1">
              
              {/* PLAN 1: 1-MONTH STARTER */}
              <div className="p-4 sm:p-5 rounded-3xl border border-[#D8E2DA] dark:border-[#2D3636] bg-white dark:bg-[#222828] hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">1-Month Starter</h4>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                      Light Hunt
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹299" : "$9"}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold"> / {isINR ? "month" : "mo"}</span>
                  </div>

                  <p className="text-[11px] text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    Essential AI tools for single-role targeted applications.
                  </p>

                  <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>100% Ad-Free & Zero-Backend Data Privacy</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>25 Live Job Scout Runs / day</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>10 Tailored PDF Cover Letters / day</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>1 Full Text-Based Mock Interview Session / day</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>Core ATS Keyword Gap Diagnostics (5 Deep Audits / day • 150/mo)</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("monthly")}
                  disabled={isUpgrading}
                  className="mt-5 w-full bg-slate-100 hover:bg-[#476550] hover:text-white dark:bg-[#1F2525] dark:hover:bg-[#6B9077] dark:hover:text-slate-950 text-[#476550] dark:text-[#A2BCA8] font-black py-2.5 px-4 rounded-xl text-xs transition-all border border-[#476550]/30 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Unlock 1-Month Starter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* PLAN 2: 3-MONTH PASS (RECOMMENDED / DEFAULT) */}
              <div className="p-4 sm:p-5 rounded-3xl border-2 border-amber-500 dark:border-amber-400 bg-amber-50/20 dark:bg-amber-950/20 shadow-xl flex flex-col justify-between relative scale-[1.01] lg:scale-[1.03] z-10">
                <div>
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 shadow-sm">
                    <Flame className="w-3 h-3 fill-white" />
                    <span>MOST POPULAR • FULL 60–90 DAY HIRING CYCLE</span>
                  </div>

                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">3-Month Pass</h4>
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                      Save 25%
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹699" : "$19"}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold"> / {isINR ? "3 months (₹233/mo)" : "3 mos ($6.33/mo)"}</span>
                  </div>

                  <p className="text-[11px] text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-amber-200 dark:border-amber-900/40">
                    Everything you need from initial resume submission to signed offer letter.
                  </p>

                  <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED Live Google Jobs Scouting</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED 1-Click ATS-Tailored Cover Letters</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED Interactive Voice AI Mock Interviews (Audio Playback)</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>🎯 Full Deep ATS Keyword Gap Analyzer (Unlimited)</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>⚡ Priority Server Speed (Gemini 2.5 Flash low-latency)</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>📄 1-Click Sync with ZenResume Ecosystem</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("quarterly")}
                  disabled={isUpgrading}
                  className="mt-5 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get 3-Month Full Pass (Recommended)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* PLAN 3: ANNUAL PRO VIP */}
              <div className="p-4 sm:p-5 rounded-3xl border border-[#D8E2DA] dark:border-[#2D3636] bg-white dark:bg-[#222828] hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">Annual Pro VIP</h4>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      Save 60%
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹1,999" : "$49"}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold"> / {isINR ? "year (₹166/mo)" : "yr ($4.08/mo)"}</span>
                  </div>

                  <p className="text-[11px] text-[#0F172A] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    For continuous career growth, promotions, and lateral career switches.
                  </p>

                  <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>✓ Everything in 3-Month Pass for 365 Days</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>✓ Recruiter Direct Cold-Outreach & DM Templates</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>✓ Offer Evaluation & Salary Negotiation Playbooks</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>✓ Priority Access to All Future Autonomous Agent Releases</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#A2BCA8] flex-shrink-0" />
                      <span><strong>👑 VIP Lifetime Member Badge in App</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("annual")}
                  disabled={isUpgrading}
                  className="mt-5 w-full bg-[#476550] hover:bg-[#3A5342] dark:bg-[#6B9077] dark:hover:bg-[#55735E] text-white font-black py-2.5 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get Annual VIP Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {upgradeSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-xl text-center animate-in fade-in">
                🎉 Subscription Activated! Welcome to Pro.
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 border-t border-[#D8E2DA] dark:border-[#2D3636] bg-slate-50 dark:bg-[#222828] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#476550] dark:text-[#A2BCA8]" />
              <span>100% Zero-Backend Privacy • Cancel Anytime • Aneevarp Solutions</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <span>Instant Cross-App Entitlement Sync</span>
            </div>
          </div>

        </div>
      </div>

      {/* Auth Modal Trigger */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
}
