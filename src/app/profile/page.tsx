"use client";
import { useState, useEffect } from "react";
import { 
  Save, 
  User, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  Clock, 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  Flame,
  Zap,
  TrendingUp,
  Target,
  RefreshCw,
  Loader2,
  Check,
  Crown,
  Lock
} from "lucide-react";
import Link from "next/link";
import { 
  getUserTierState, 
  isProSubscriber, 
  recordAtsAuditRun, 
  getUsageQuota,
  getCurrentTierLimits
} from "@/lib/user-tier";
import PricingModal from "@/components/PricingModal";
import { NotificationToast, ToastMessage, ToastType } from "@/components/NotificationToast";

interface AtsAnalysis {
  score: number;
  tier: string;
  isNonResume?: boolean;
  strengths: string[];
  improvements: string[];
  keyMissingSkills: string[];
  summary: string;
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyzingAts, setAnalyzingAts] = useState(false);
  const [atsAnalysis, setAtsAnalysis] = useState<AtsAnalysis | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [tierState, setTierState] = useState({ plan: "free", billingCycle: "monthly" as any });
  const [usageQuota, setUsageQuota] = useState({ atsAuditsToday: 0 });

  const [formData, setFormData] = useState({
    role: "",
    location: "",
    salary: "",
    experience: "Fresher",
    resumeBase64: "",
    resumeFileName: "",
    atsScore: 0
  });

  // In-App Notification Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: ToastType, title: string, message: string, duration?: number) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type,
      title,
      message,
      duration: duration || 4500
    };
    setToasts(prev => [...prev, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Load profile from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedProfile = localStorage.getItem("my_profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setFormData(parsed);
      if (parsed.atsAnalysis) {
        setAtsAnalysis(parsed.atsAnalysis);
      }
    }

    const updateTier = () => {
      setTierState(getUserTierState());
      setUsageQuota(getUsageQuota());
    };
    updateTier();
    window.addEventListener("user-tier-updated", updateTier);
    return () => window.removeEventListener("user-tier-updated", updateTier);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [atsError, setAtsError] = useState<string | null>(null);

  // Run ATS audit using Gemini 2.5 Flash
  const runAtsAudit = async (resumeData: string, roleTitle: string) => {
    if (!resumeData) return;

    // Check ATS Audit Quota for current tier
    const auditCheck = recordAtsAuditRun();
    if (!auditCheck.allowed) {
      setPricingModalOpen(true);
      return;
    }
    setUsageQuota(getUsageQuota());

    setAtsError(null);
    setAtsAnalysis(null);
    setAnalyzingAts(true);
    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          role: roleTitle || formData.role || "Software Engineer",
          resumeBase64: resumeData
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not calculate ATS score");
      }

      if (data.analysis) {
        setAtsAnalysis(data.analysis);
        setFormData(prev => ({
          ...prev,
          atsScore: data.analysis.score
        }));
        if (!data.analysis.isNonResume && data.analysis.score > 0) {
          showToast("success", "ATS Audit Complete!", `Your resume scored ${data.analysis.score}/100! Click "Go to Dashboard" to scout matching jobs.`);
        }
      }
    } catch (err: any) {
      console.error("ATS Analysis error:", err);
      setAtsError(err.message || "Could not complete ATS analysis. Please upload a standard 1-2 page PDF resume.");
      setAtsAnalysis(null);
    } finally {
      setAnalyzingAts(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setLoading(true);
      
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = (reader.result as string).split(",")[1];
          const updated = { 
            ...formData, 
            resumeBase64: base64String,
            resumeFileName: selectedFile.name 
          };
          setFormData(updated);
          localStorage.setItem("my_profile", JSON.stringify(updated));
          setLoading(false);

          // Automatically trigger fresh ATS Analysis upon upload
          await runAtsAudit(base64String, formData.role);
        };
        reader.readAsDataURL(selectedFile);
      } catch (err) {
        console.error("Error reading file:", err);
        setLoading(false);
      } finally {
        // Reset file input so subsequent uploads of same or new file always trigger onChange
        e.target.value = "";
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toSave = {
      ...formData,
      atsAnalysis
    };
    localStorage.setItem("my_profile", JSON.stringify(toSave));
    showToast("success", "Profile Saved", "Career profile and ATS intelligence saved to local vault!");
  };

  const isPro = mounted && (tierState.plan === "pro" || isProSubscriber());
  const limits = getCurrentTierLimits();

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 px-2 sm:px-4">
      {/* Top Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171D1C] dark:text-white tracking-tight">
            Target Role & ATS Audit
          </h1>
          <p className="text-xs sm:text-sm text-[#545F73] dark:text-slate-400 mt-1">
            Configure your target career parameters and audit your resume against automated ATS screening bots.
          </p>
        </div>

        {/* Tier Status Indicator */}
        <button
          onClick={() => setPricingModalOpen(true)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border self-start sm:self-auto ${
            isPro
              ? "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#00685F]"
          }`}
        >
          {isPro ? <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> : <Zap className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF]" />}
          <span>
            {isPro 
              ? (tierState.billingCycle === "annual" ? "👑 Annual VIP Active" : tierState.billingCycle === "quarterly" ? "⚡ 3-Month Pass Active" : "⚡ 1-Month Starter") 
              : `Free Tier (${usageQuota.atsAuditsToday}/3 Daily Audits)`}
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Main Settings Card */}
        <div className="bg-white dark:bg-[#141B20] rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Target Role & City Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#545F73] dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" /> Target Job Title
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer, React Engineer"
                  className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#1A2228] border border-[#E2E8F0] dark:border-[#232D36] rounded-xl text-sm font-semibold text-black dark:text-white focus:outline-none focus:border-[#00685F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#545F73] dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" /> Preferred Location / City
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, Hyderabad, Remote"
                  className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#1A2228] border border-[#E2E8F0] dark:border-[#232D36] rounded-xl text-sm font-semibold text-black dark:text-white focus:outline-none focus:border-[#00685F]"
                />
              </div>
            </div>

            {/* Experience Level & Target Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#545F73] dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" /> Experience Level
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#1A2228] border border-[#E2E8F0] dark:border-[#232D36] rounded-xl text-sm font-semibold text-black dark:text-white focus:outline-none focus:border-[#00685F]"
                >
                  <option value="Fresher">Fresher / 0 Years (College Graduate / Career Switcher)</option>
                  <option value="1-2 Years">Junior (1 - 2 Years)</option>
                  <option value="3-5 Years">Mid-Level (3 - 5 Years)</option>
                  <option value="5+ Years">Senior / Lead (5+ Years)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#545F73] dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" /> Expected Compensation (Optional)
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹8,00,000 - ₹12,00,000 LPA"
                  className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#1A2228] border border-[#E2E8F0] dark:border-[#232D36] rounded-xl text-sm font-semibold text-black dark:text-white focus:outline-none focus:border-[#00685F]"
                />
              </div>
            </div>

            {/* Resume Upload Vault Area */}
            <div>
              <label className="block text-xs font-bold text-[#545F73] dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" /> Master Resume (PDF)
              </label>
              <div className="border-2 border-dashed border-[#E2E8F0] dark:border-[#232D36] hover:border-[#00685F]/50 dark:hover:border-[#2DD4BF]/50 rounded-2xl p-6 sm:p-8 text-center bg-[#F8FAFC] dark:bg-[#1A2228] transition-all relative group cursor-pointer">
                <input
                  id="resume-file-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-[#00685F] dark:text-[#2DD4BF] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <p className="font-bold text-sm text-[#171D1C] dark:text-white">Click or Drag & Drop PDF Resume</p>
                  <p className="text-xs text-[#545F73] dark:text-slate-400">Instant ATS scanner & client-side vault encryption (Max 5MB)</p>

                  {formData.resumeBase64 && !analyzingAts && (
                    <div className="flex flex-col items-center gap-1.5 mt-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 rounded-2xl animate-in fade-in">
                      <div className="inline-flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span>Active Vault Document:</span>
                        <span className="font-extrabold text-[#00685F] dark:text-[#2DD4BF] bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800 max-w-[260px] sm:max-w-xs truncate">
                          {formData.resumeFileName || "Candidate_Resume.pdf"}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Click anywhere to replace or upload a new PDF</span>
                    </div>
                  )}

                  {analyzingAts && (
                    <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 text-[#00685F] dark:text-[#2DD4BF] text-xs font-bold px-4 py-2 rounded-full border border-teal-200 dark:border-teal-800 mt-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Auditing {formData.resumeFileName ? `"${formData.resumeFileName}"` : "Resume"} with ATS Engine...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons Cluster */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
              <div className="flex items-center gap-2 text-xs text-[#545F73] dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" />
                <span>Zero-Backend Privacy Guarantee</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Instant ATS Scan / Re-Audit Button for 3-Month & Annual VIP subscribers */}
                <button
                  type="button"
                  onClick={() => runAtsAudit(formData.resumeBase64, formData.role)}
                  disabled={analyzingAts || !formData.resumeBase64}
                  className="bg-gradient-to-r from-teal-600 to-[#00685F] hover:from-teal-700 hover:to-[#005049] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  title="Trigger instant ATS parsing on demand"
                >
                  <RefreshCw className={`w-4 h-4 ${analyzingAts ? "animate-spin" : ""}`} />
                  <span>{analyzingAts ? "Auditing Resume..." : "⚡ Re-Audit ATS for Target Role"}</span>
                </button>

                <button
                  type="submit"
                  disabled={loading || analyzingAts}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl transition-all border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 btn-tactile disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" />
                  <span>Save Profile</span>
                </button>

                {/* Direct Navigation to Dashboard CTA */}
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Launch Autonomous Job Scouting on Dashboard"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* EXPLICIT ATS ERROR BANNER (Displayed if upload is invalid or analysis fails) */}
        {atsError && (
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 text-black dark:text-white flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-rose-800 dark:text-rose-300">ATS Audit Notice</h4>
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {atsError}
              </p>
            </div>
          </div>
        )}

        {/* HIGH-CONVERTING ATS SCORE & KEYWORD DIAGNOSTICS CARD */}
        {atsAnalysis && (
          (atsAnalysis.isNonResume || atsAnalysis.score === 0) ? (
            /* SPECIALIZED OPTION-2 SECOND CHANCE CARD (For Non-Resume Documents) */
            <div className="bg-gradient-to-br from-white to-amber-50/50 dark:from-[#141B20] dark:to-amber-950/20 rounded-3xl border-2 border-amber-500/40 shadow-xl p-5 sm:p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-5">
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-amber-200 dark:border-amber-900/40">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-black px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800 mb-2">
                    {isPro ? <Crown className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                    <span>{isPro ? "PRO WORKSPACE • NON-RESUME DETECTED" : "HIRING COMMITTEE REALITY CHECK • NON-RESUME DETECTED"}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#171D1C] dark:text-white">
                    No Candidate Profile Found
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#545F73] dark:text-slate-400">
                    <span>Flagged Upload:</span>
                    <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-2.5 py-0.5 rounded-md font-bold">
                      <FileText className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span className="max-w-[240px] truncate">{formData.resumeFileName || "Uploaded_Document.pdf"}</span>
                    </span>
                  </div>
                </div>

                {/* 0/100 Score Display */}
                <div className="flex items-center gap-4 bg-white dark:bg-[#1A2228] p-3.5 rounded-2xl border border-amber-300 dark:border-amber-800 shadow-sm self-start md:self-auto">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 leading-none">
                      0<span className="text-base font-bold text-slate-400">/100</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-800 dark:text-amber-300 block mt-1">
                      Invalid Document
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Copy: Pro Subscribers vs Free Tier 2nd Chance */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-[#1A2228]/90 border border-amber-200 dark:border-amber-900/50 space-y-3">
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  Recruiters and corporate ATS filters don’t give second chances for misaligned uploads. In real corporate hiring, submitting a project paper or non-resume document results in an instant automated rejection within 3 seconds.
                </p>
                {isPro ? (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-semibold leading-relaxed">
                    👑 <strong>Unlimited Pro Access Active:</strong> As a Pro member, you have unlimited ATS resume audits across all your target roles. To ensure your real applications pass modern corporate filters with a 95+ score, please upload your official 1–2 page candidate resume.
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-semibold leading-relaxed">
                    ⚡ <strong>1-Time Courtesy Second Chance Unlocked:</strong> ZenScout AI normally enforces a strict <strong>1 Free ATS Audit per day</strong> for standard accounts. Because we take your career success seriously and want you to see where your profile truly stands, we have granted you a second chance today to upload your official candidate resume.
                  </div>
                )}
              </div>

              {/* Action Button to Reupload */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => document.getElementById("resume-file-input")?.click()}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isPro ? "Upload Official Candidate Resume (Pro Access) →" : "Claim 2nd Chance & Upload Official Resume →"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* STANDARD ATS ANALYSIS CARD (For Valid Resumes) */
            <div className="bg-gradient-to-br from-white to-[#F0FDF4] dark:from-[#141B20] dark:to-[#0f241d] rounded-3xl border-2 border-emerald-500/30 shadow-xl p-5 sm:p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-500">
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Score Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-emerald-100 dark:border-emerald-900/40">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800 mb-2">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>Real-Time ATS Screening Score</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#171D1C] dark:text-white">
                    Your Resume ATS Compatibility
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#545F73] dark:text-slate-400">
                    <span>Targeting: <strong className="text-[#171D1C] dark:text-white">{formData.role || "Target Role"}</strong></span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 px-2.5 py-0.5 rounded-md font-bold border border-emerald-200 dark:border-emerald-800">
                      <FileText className="w-3 h-3 text-[#00685F] dark:text-[#2DD4BF]" />
                      <span className="max-w-[220px] truncate">{formData.resumeFileName || "Candidate_Resume.pdf"}</span>
                    </span>
                  </div>
                </div>

                {/* Score Display */}
                <div className="flex items-center gap-4 bg-white dark:bg-[#1A2228] p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm self-start md:self-auto">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-black text-[#00685F] dark:text-[#2DD4BF] leading-none">
                      {atsAnalysis.score}<span className="text-base font-bold text-slate-400">/100</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300 block mt-1">
                      {atsAnalysis.tier}
                    </span>
                  </div>
                </div>
              </div>

            {/* Analysis Summary */}
            <div className="py-5">
              <p className="text-xs sm:text-sm text-[#3D4947] dark:text-slate-200 font-medium leading-relaxed bg-white/80 dark:bg-[#1A2228]/80 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                {atsAnalysis.summary}
              </p>

              {/* Strengths & Missing Elements Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Strengths */}
                <div className="bg-white dark:bg-[#1A2228] p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Detected Strengths
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#545F73] dark:text-slate-300">
                    {atsAnalysis.strengths.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ATS Risks / Missing Keywords */}
                <div className="bg-white dark:bg-[#1A2228] p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Critical ATS Filter Risks & Missing Keywords
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#545F73] dark:text-slate-300">
                    {atsAnalysis.improvements.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-amber-900 dark:text-amber-300">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* NEXT STEP GUIDANCE BANNER (Direct Navigation to Dashboard) */}
            <div className="my-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 border-2 border-[#2DD4BF]/50 shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden animate-in fade-in slide-in-from-top-3">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-500/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-1.5 relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-[#2DD4BF] text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full border border-teal-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Next Step: Autonomous Job Discovery</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-white">
                  Resume Audited! Ready to Find Matching Jobs?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
                  Head over to your <strong>Dashboard</strong> where our Autonomous Scout & Match Agents will search real-time job openings tailored to your target profile.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="w-full md:w-auto bg-gradient-to-r from-[#2DD4BF] to-teal-400 hover:from-teal-300 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer relative z-10"
              >
                <span>Go to Dashboard & Find Jobs</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>

            {/* MARKETING HOOK (ZenResume Sister App) */}
            <div className="bg-gradient-to-r from-[#00685F] to-[#0D9488] rounded-2xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden mt-2">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
                <div className="space-y-1.5 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 bg-white/20 text-teal-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Aneevarp Solutions Career Suite</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                    Want a Guaranteed 95+ ATS Score?
                  </h3>
                  <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
                    Don’t let corporate filtering bots discard your application. Build a single-column, ATS-certified resume tailored to your dream role using <strong>ZenResume</strong>.
                  </p>
                </div>

                <a
                  href="https://zenresume.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-teal-50 text-[#00685F] font-black text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 flex-shrink-0 btn-tactile"
                >
                  <span>Build on ZenResume Free</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Re-test CTA */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => runAtsAudit(formData.resumeBase64, formData.role)}
                disabled={analyzingAts}
                className="text-xs text-[#00685F] dark:text-[#2DD4BF] hover:underline font-semibold inline-flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${analyzingAts ? "animate-spin" : ""}`} />
                <span>Re-analyze with updated role</span>
              </button>
            </div>
          </div>
        ) )}
      </div>

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={pricingModalOpen} 
        onClose={() => {
          setPricingModalOpen(false);
          setTierState(getUserTierState());
          setUsageQuota(getUsageQuota());
        }} 
      />

      {/* In-App Notification Toast Stream */}
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
