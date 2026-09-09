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
import { setUserPlan, getUserTierState, PRICING_DATA, detectDefaultCurrency } from "@/lib/user-tier";
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

  // Auto-detect or retrieve preferred currency
  useEffect(() => {
    setCurrency(detectDefaultCurrency());
  }, []);

  const handleCurrencyChange = (newCurrency: "INR" | "USD") => {
    setCurrency(newCurrency);
    try {
      localStorage.setItem("preferred_currency", newCurrency);
    } catch (e) {}
  };

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
      <div className="fixed inset-0 bg-[#0B0F12]/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-[#FAF9F6] dark:bg-[#0D1714] rounded-3xl border border-[#D8E2DA] dark:border-[#1A2E26] shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95 duration-200">
          
          {/* Header Bar */}
          <div className="px-5 sm:px-6 py-3.5 border-b border-[#D8E2DA] dark:border-[#1A2E26] bg-gradient-to-r from-teal-50/50 via-white to-amber-50/50 dark:from-[#0D1714] dark:via-[#13221C] dark:to-[#0D1714] flex justify-between items-center flex-shrink-0">
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
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#121E1A] transition-colors cursor-pointer"
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
                    <p className="text-[11px] text-[#1A1F1F] dark:text-[#CBD5E1] font-medium">
                      Please log in with Google or Email so we can bind your Pro membership and sync your application workspace across devices.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-[#476550] hover:bg-[#3A5342] dark:bg-[#237A57] dark:hover:bg-[#10B981] text-white text-xs font-black py-2 px-3.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center"
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
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#00846D] via-[#476550] to-[#2DD4BF] dark:from-[#0B0F12] dark:via-[#0D1714] dark:to-[#0B0F12] border-2 border-[rgba(45,212,191,0.35)] shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 dark:bg-[rgba(45,212,191,0.1)] rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-1.5 max-w-xl relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-white/20 dark:bg-[rgba(45,212,191,0.15)] text-teal-100 dark:text-[#2DD4BF] text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full border border-white/20 dark:border-[rgba(45,212,191,0.3)] shadow-sm">
                  <Crown className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>ANEEVARP ZEN SUITE ULTIMATE • ALL 3 APPS UNLOCKED</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white flex flex-wrap items-center gap-2">
                  <span>Zen Suite Ultimate Cross-Pass</span>
                  <span className="text-sm font-bold text-[#FCFAF5] dark:text-[#2DD4BF] bg-black/30 dark:bg-[#121E1A] px-2.5 py-0.5 rounded-full border border-white/20 dark:border-[rgba(45,212,191,0.3)]">
                    {isINR ? "₹599/mo" : "$29/mo"}
                  </span>
                </h3>
                <p className="text-xs text-slate-100 dark:text-[#CBD5E1] leading-relaxed">
                  One unified subscription unlocking <strong>ZenScout AI</strong> (Unlimited Pro), <strong>ZenDoc AI</strong> (Unlimited Document AI), and <strong>ZenResume</strong> (Unlimited ATS Templates) seamlessly across all devices for 1 full month.
                </p>
              </div>

              <button
                onClick={() => handleCheckout("zen_suite")}
                disabled={isUpgrading}
                className="w-full md:w-auto bg-[#FCFAF5] dark:bg-[#2DD4BF] hover:bg-white text-[#476550] dark:text-[#061B18] font-black py-3 px-6 rounded-full text-xs shadow-lg active:scale-95 btn-tactile flex items-center justify-center gap-2 flex-shrink-0 relative z-10 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Get Zen Suite Ultimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Standalone Plans Subheading */}
            <div className="text-left px-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#476550] dark:text-[#2DD4BF] block">Standalone Plans</span>
            </div>

            {/* 3. VALUE LADDER CARDS (3-Column Desktop, Stacked Mobile) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-left pt-1">
              
              {/* PLAN 1: 1-MONTH STARTER */}
              <div className="card-surface p-4 sm:p-5 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">1-Month Starter</h4>
                    <span className="text-[10px] bg-slate-100 dark:bg-[#121E1A] text-slate-700 dark:text-[#CBD5E1] px-2.5 py-0.5 rounded-full font-bold">
                      Light Hunt
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹299" : "$19"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold"> / {isINR ? "month" : "mo"}</span>
                  </div>

                  <p className="text-[11px] text-[#596060] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-slate-200/70 dark:border-[#1A2E26]">
                    Essential AI tools for single-role targeted applications.
                  </p>

                  <ul className="space-y-2 text-xs text-[#1A1F1F] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>100% Ad-Free & Zero-Backend Data Privacy</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>25 Live Job Scout Runs / day</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>10 Tailored PDF Cover Letters / day</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>1 Full Text-Based Mock Interview Session / day</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>Core ATS Keyword Gap Diagnostics (5 Deep Audits / day • 150/mo)</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("monthly")}
                  disabled={isUpgrading}
                  className="mt-5 w-full bg-[#E8F0EB] hover:bg-[#476550] hover:text-white dark:bg-[#121E1A] dark:hover:bg-[#2DD4BF] dark:hover:text-[#061B18] text-[#476550] dark:text-[#2DD4BF] font-black py-2.5 px-4 rounded-full text-xs transition-all border border-[rgba(162,188,168,0.5)] dark:border-[rgba(45,212,191,0.25)] active:scale-95 btn-tactile flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Unlock 1-Month Starter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* PLAN 2: 3-MONTH PASS (RECOMMENDED / DEFAULT) */}
              <div className="card-surface p-4 sm:p-5 border-2 border-[#476550] dark:border-[#2DD4BF] bg-emerald-50/20 dark:bg-[rgba(45,212,191,0.06)] shadow-xl flex flex-col justify-between relative scale-[1.01] lg:scale-[1.03] z-10">
                <div>
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#00846D] to-[#476550] dark:from-[#2DD4BF] dark:to-[#00846D] text-white dark:text-[#061B18] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 shadow-sm">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>MOST POPULAR • FULL 60–90 DAY HIRING CYCLE</span>
                  </div>

                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">3-Month Pass</h4>
                    <span className="text-[10px] bg-emerald-100 dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] px-2 py-0.5 rounded-full font-bold">
                      Save 21%
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹699" : "$45"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold"> / {isINR ? "3 months (₹233/mo)" : "3 mos ($15/mo)"}</span>
                  </div>

                  <p className="text-[11px] text-[#596060] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-slate-200/70 dark:border-[#1A2E26]">
                    Everything you need from initial resume submission to signed offer letter.
                  </p>

                  <ul className="space-y-2 text-xs text-[#1A1F1F] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED Live Google Jobs Scouting</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED 1-Click ATS-Tailored Cover Letters</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>⚡ UNLIMITED Interactive Voice AI Mock Interviews (Audio Playback)</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>🎯 Full Deep ATS Keyword Gap Analyzer (Unlimited)</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>⚡ Priority Server Speed (Gemini 2.5 Flash low-latency)</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>📄 1-Click Sync with ZenResume Ecosystem</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("quarterly")}
                  disabled={isUpgrading}
                  className="mt-5 w-full stitch-hero-cta btn-tactile py-3 px-4 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get 3-Month Full Pass (Recommended)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* PLAN 3: ANNUAL PRO VIP */}
              <div className="card-surface p-4 sm:p-5 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">Annual Pro VIP</h4>
                    <span className="text-[10px] bg-emerald-100 dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] px-2 py-0.5 rounded-full font-bold">
                      Save 56%
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-black text-black dark:text-white">
                      {isINR ? "₹1,999" : "$99"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold"> / {isINR ? "year (₹166/mo)" : "yr ($8.25/mo)"}</span>
                  </div>

                  <p className="text-[11px] text-[#596060] dark:text-[#CBD5E1] font-medium mb-3 pb-3 border-b border-slate-200/70 dark:border-[#1A2E26]">
                    For continuous career growth, promotions, and lateral career switches.
                  </p>

                  <ul className="space-y-2 text-xs text-[#1A1F1F] dark:text-[#CBD5E1] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>✓ Everything in 3-Month Pass for 365 Days</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>✓ Recruiter Direct Cold-Outreach & DM Templates</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>✓ Offer Evaluation & Salary Negotiation Playbooks</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>✓ Priority Access to All Future Autonomous Agent Releases</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
                      <span><strong>👑 VIP Lifetime Member Badge in App</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout("annual")}
                  disabled={isUpgrading}
                  className="mt-5 w-full bg-[#476550] hover:bg-[#3A5342] dark:bg-[#2DD4BF] dark:hover:bg-[#5EEAD4] text-white dark:text-[#061B18] font-black py-2.5 px-4 rounded-full text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get Annual VIP Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {upgradeSuccess && (
              <div className="p-3 bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] border border-emerald-300 dark:border-[rgba(45,212,191,0.3)] text-emerald-900 dark:text-[#2DD4BF] text-xs font-bold rounded-2xl text-center animate-in fade-in">
                🎉 Subscription Activated! Welcome to Pro.
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 border-t border-[#D8E2DA] dark:border-[#1A2E26] bg-[#F4F4F0] dark:bg-[#0D1714] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-[#94A3B8]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" />
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
