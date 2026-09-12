"use client";
import { useState, useEffect, useRef } from "react";
import { 
  Save, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  UploadCloud, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  AlertTriangle, 
  Flame, 
  Zap, 
  RefreshCw, 
  Loader2, 
  Check, 
  Crown, 
  Copy, 
  Edit3 
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
  matchedCoreSkills?: string[];
  missingCoreSkills?: string[];
  strengths: string[];
  improvements: string[];
  keyMissingSkills: string[];
  summary: string;
  candidateProfile?: {
    name?: string;
    targetRole?: string;
    location?: string;
    experienceLevel?: string;
  };
}

/**
 * Animated SVG Radial Score Gauge
 */
function AtsRadialGauge({ score, tier }: { score: number; tier: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;
  
  // Color palette matching design system
  const strokeColor = score >= 85 ? "#10B981" : score >= 70 ? "#2DD4BF" : score >= 45 ? "#F59E0B" : "#EF4444";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-slate-200 dark:text-[#1E293B]"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-black text-[#1A1F1F] dark:text-[#F8FAFC] leading-none">
            {score}
          </span>
          <span className="text-[10px] font-bold text-[#7D8787] dark:text-[#94A3B8] mt-0.5">
            /100
          </span>
        </div>
      </div>
      <span
        className="mt-2 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
        style={{ color: strokeColor, backgroundColor: `${strokeColor}18` }}
      >
        {tier}
      </span>
    </div>
  );
}

/**
 * Smart Keyword Highlighting Component
 */
function HighlightedAtsText({
  text,
  missingKeywords = [],
  matchedKeywords = [],
  variant = "neutral"
}: {
  text: string;
  missingKeywords?: string[];
  matchedKeywords?: string[];
  variant?: "missing" | "strength" | "neutral";
}) {
  if (!text) return null;

  const defaultTechKeywords = [
    "React", "Next.js", "NextJS", "TypeScript", "JavaScript", "Node.js", "NodeJS", "Express.js", "Express",
    "Python", "FastAPI", "Flask", "Django", "PostgreSQL", "Postgres", "MongoDB", "MySQL", "SQLite", "Redis",
    "Docker", "Kubernetes", "AWS/GCP", "AWS", "GCP", "Azure", "CI/CD", "Git", "GitHub", "Prisma", "Prisma ORM",
    "Tailwind CSS", "Tailwind", "HTML", "CSS", "HTML/CSS", "HTML5", "CSS3", "REST APIs", "REST API", "REST",
    "WebSockets", "WebSocket", "GraphQL", "Jest", "Cypress", "PyTest", "ChromaDB", "LLM", "LLMs", "LangChain",
    "LlamaIndex", "Machine Learning", "Deep Learning", "Computer Vision", "NLP", "STAR", "JARVIS", "PROMPT LABS",
    "OmniGraph", "System Design", "Microservices", "Serverless", "Linux"
  ];

  const allKeywords = Array.from(
    new Set([...missingKeywords, ...matchedKeywords, ...defaultTechKeywords])
  ).filter(k => Boolean(k && k.trim().length > 1));

  if (allKeywords.length === 0) {
    return <span>{text}</span>;
  }

  const escaped = allKeywords
    .sort((a, b) => b.length - a.length)
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const regex = new RegExp(`(\\b(?:${escaped.join("|")})\\b)`, "gi");
  const parts = text.split(regex);

  const missingLower = new Set(missingKeywords.map(k => k.toLowerCase().trim()));
  const matchedLower = new Set(matchedKeywords.map(k => k.toLowerCase().trim()));

  return (
    <span>
      {parts.map((part, idx) => {
        if (!part) return null;
        const lower = part.toLowerCase().trim();
        const isMissing = missingLower.has(lower);
        const isMatched = matchedLower.has(lower);
        const isKnownTech = defaultTechKeywords.some(k => k.toLowerCase() === lower);

        if (variant === "missing" && (isMissing || isKnownTech)) {
          return (
            <span
              key={idx}
              className="inline-block font-black text-amber-950 dark:text-amber-200 bg-amber-200/90 dark:bg-amber-950/90 px-1.5 py-0.5 mx-0.5 rounded-md border border-amber-400/80 dark:border-amber-700/80 shadow-xs"
            >
              {part}
            </span>
          );
        }

        if (variant === "strength" && (isMatched || isKnownTech)) {
          return (
            <span
              key={idx}
              className="inline-block font-black text-emerald-950 dark:text-emerald-200 bg-emerald-200/90 dark:bg-emerald-950/90 px-1.5 py-0.5 mx-0.5 rounded-md border border-emerald-400/80 dark:border-emerald-700/80 shadow-xs"
            >
              {part}
            </span>
          );
        }

        if (isMissing) {
          return (
            <span
              key={idx}
              className="inline-block font-black text-amber-950 dark:text-amber-200 bg-amber-200/90 dark:bg-amber-950/90 px-1.5 py-0.5 mx-0.5 rounded-md border border-amber-400/80 dark:border-amber-700/80 shadow-xs"
            >
              {part}
            </span>
          );
        }

        if (isMatched) {
          return (
            <span
              key={idx}
              className="inline-block font-black text-emerald-950 dark:text-emerald-200 bg-emerald-200/90 dark:bg-emerald-950/90 px-1.5 py-0.5 mx-0.5 rounded-md border border-emerald-400/80 dark:border-emerald-700/80 shadow-xs"
            >
              {part}
            </span>
          );
        }

        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
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
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [atsError, setAtsError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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
      try {
        const parsed = JSON.parse(savedProfile);
        setFormData(parsed);
        if (parsed.atsAnalysis) {
          setAtsAnalysis(parsed.atsAnalysis);
        }
      } catch (err) {
        console.error("Failed to parse saved profile:", err);
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
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem("my_profile", JSON.stringify({ ...updated, atsAnalysis }));
      return updated;
    });
  };

  // Run ATS audit using Gemini 2.5 Flash
  const runAtsAudit = async (resumeData: string, roleTitle: string) => {
    if (!resumeData) {
      showToast("warning", "No Resume Attached", "Please drop your PDF resume into the upload vault first.");
      return;
    }

    // Check ATS Audit Quota for current tier
    const auditCheck = recordAtsAuditRun();
    if (!auditCheck.allowed) {
      setPricingModalOpen(true);
      return;
    }
    setUsageQuota(getUsageQuota());

    setAtsError(null);
    setAnalyzingAts(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    const activeRole = (roleTitle || formData.role || "Software Engineer").trim();

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          role: activeRole,
          resumeBase64: resumeData
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not calculate ATS score");
      }

      if (data.analysis) {
        setAtsAnalysis(data.analysis);
        const candProf = data.analysis.candidateProfile;

        // Auto-fill extracted values while keeping role fully editable
        setFormData(prev => {
          const updated = {
            ...prev,
            atsScore: data.analysis.score,
            role: prev.role || candProf?.targetRole || activeRole,
            location: prev.location || candProf?.location || "",
            experience: prev.experience !== "Fresher" ? prev.experience : (candProf?.experienceLevel || prev.experience)
          };
          localStorage.setItem("my_profile", JSON.stringify({ ...updated, atsAnalysis: data.analysis }));
          return updated;
        });

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);

        if (candProf?.targetRole && !formData.role) {
          showToast(
            "success", 
            "Profile Auto-Filled!", 
            `Target Role detected as "${candProf.targetRole}". You can edit this role at any time below.`
          );
        } else if (!data.analysis.isNonResume && data.analysis.score > 0) {
          showToast(
            "success", 
            "ATS Audit Complete!", 
            `Score: ${data.analysis.score}/100 for "${activeRole}". Click "Go to Dashboard" to scout matching jobs.`
          );
        }
      }
    } catch (err: any) {
      console.error("ATS Analysis error:", err);
      setAtsError(err.message || "Could not complete ATS analysis. Please upload a standard 1-2 page PDF resume.");
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
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

  const handleCopyKeywords = (keywords: string[]) => {
    if (!keywords || keywords.length === 0) return;
    navigator.clipboard.writeText(keywords.join(", "));
    setCopiedKeywords(true);
    showToast("info", "Keywords Copied", "Missing keywords copied to clipboard!");
    setTimeout(() => setCopiedKeywords(false), 2500);
  };

  const isPro = mounted && (tierState.plan === "pro" || isProSubscriber());
  const limits = getCurrentTierLimits();

  const missingKeywordsList = Array.from(
    new Set([...(atsAnalysis?.missingCoreSkills || []), ...(atsAnalysis?.keyMissingSkills || [])])
  );

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 px-3 sm:px-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#D8E2DA] dark:border-[#1A2E26]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1F1F] dark:text-[#F8FAFC] tracking-tight">
            Target Role & ATS Audit
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8787] dark:text-[#94A3B8] mt-1">
            Drop your resume to auto-detect your profile, audit ATS compliance, and scout matching high-yield jobs.
          </p>
        </div>

        {/* Tier Status Indicator */}
        <button
          onClick={() => setPricingModalOpen(true)}
          className={isPro ? "btn-pro self-start sm:self-auto" : "btn-secondary text-xs self-start sm:self-auto py-1.5 px-3.5"}
        >
          {isPro ? <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> : <Zap className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF]" />}
          <span>
            {isPro 
              ? (tierState.billingCycle === "annual" ? "Annual VIP Active" : tierState.billingCycle === "quarterly" ? "3-Month Pass Active" : "1-Month Starter") 
              : `Free Tier (${usageQuota.atsAuditsToday}/3 Audits)`}
          </span>
        </button>
      </div>

      {/* SECTION 1: HERO RESUME DROPZONE (FIRST THING USER SEES) */}
      <div className="bg-[#FAF9F6] dark:bg-[#0D1714] rounded-3xl border border-[#D8E2DA] dark:border-[#1A2E26] p-5 sm:p-7 shadow-sm transition-all hover:border-[#476550]/40 dark:hover:border-[#2DD4BF]/40">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E8F0EB] dark:bg-[#2DD4BF]/15 text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1A1F1F] dark:text-[#F8FAFC]">
                Upload Master Resume
              </h2>
              <p className="text-xs text-[#7D8787] dark:text-[#94A3B8]">
                Multimodal AI auto-fills your profile while keeping every field completely editable.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#7D8787] dark:text-[#94A3B8]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Encrypted in Browser Vault</span>
          </div>
        </div>

        {/* Dropzone Container */}
        <div className="border-2 border-dashed border-[#D8E2DA] dark:border-[#1A2E26] hover:border-[#476550] dark:hover:border-[#2DD4BF] rounded-2xl p-6 sm:p-8 text-center bg-[#FFFFFF] dark:bg-[#121E1A] transition-all relative group cursor-pointer">
          <input
            id="resume-file-input"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center justify-center gap-2.5">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F0EB] dark:bg-[#2DD4BF]/15 text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base text-[#1A1F1F] dark:text-[#F8FAFC]">
                Click or Drag & Drop Your PDF Resume Here
              </p>
              <p className="text-xs text-[#7D8787] dark:text-[#94A3B8] mt-0.5">
                Standard 1–2 page PDF (Max 5MB) • Instant ATS keyword scan
              </p>
            </div>

            {formData.resumeBase64 && !analyzingAts && (
              <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 bg-[#E8F0EB] dark:bg-emerald-950/40 border border-[#A2BCA8]/40 dark:border-emerald-800 px-4 py-2 rounded-xl animate-in fade-in">
                <div className="inline-flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Vault Document:</span>
                  <span className="font-extrabold text-[#476550] dark:text-[#2DD4BF] bg-[#FFFFFF] dark:bg-[#0D1714] px-2 py-0.5 rounded-md border border-[#A2BCA8]/40 dark:border-emerald-800 max-w-[220px] truncate">
                    {formData.resumeFileName || "Candidate_Resume.pdf"}
                  </span>
                </div>
                <span className="text-[11px] text-[#7D8787] dark:text-[#94A3B8]">
                  (Click to replace)
                </span>
              </div>
            )}

            {analyzingAts && (
              <div className="inline-flex items-center gap-2 bg-[#E8F0EB] dark:bg-[#2DD4BF]/15 text-[#476550] dark:text-[#2DD4BF] text-xs font-bold px-4 py-2 rounded-full border border-[#A2BCA8]/40 dark:border-[#2DD4BF]/30 mt-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing {formData.resumeFileName ? `"${formData.resumeFileName}"` : "Resume"} with Gemini 2.5 Flash...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: CANDIDATE CAREER PROFILE FORM (FULLY EDITABLE: ROLE, LOCATION, EXPERIENCE, SALARY) */}
      <div className="bg-[#FAF9F6] dark:bg-[#0D1714] rounded-3xl border border-[#D8E2DA] dark:border-[#1A2E26] p-5 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#E8F0EB] dark:bg-[#2DD4BF]/15 text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1A1F1F] dark:text-[#F8FAFC]">
              Target Job Parameters & Preferences
            </h2>
            <p className="text-xs text-[#7D8787] dark:text-[#94A3B8]">
              You have full control. Edit any field below at any time to re-target your search or re-run the ATS audit.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Target Role & Location Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#7D8787] dark:text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" /> Target Job Title
                </label>
                <span className="text-[10px] text-[#476550] dark:text-[#2DD4BF] font-semibold flex items-center gap-1">
                  <Edit3 className="w-3 h-3" /> Fully Editable
                </span>
              </div>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer, React Engineer, AI Engineer"
                className="w-full px-4 py-3 bg-[#FFFFFF] dark:bg-[#121E1A] border border-[#D8E2DA] dark:border-[#1A2E26] rounded-xl text-sm font-semibold text-[#1A1F1F] dark:text-[#F8FAFC] focus:outline-none focus:border-[#476550] dark:focus:border-[#2DD4BF] transition-all"
              />
              <p className="text-[11px] text-[#7D8787] dark:text-[#94A3B8] mt-1">
                You can change this role anytime to check your score for different career paths.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7D8787] dark:text-[#94A3B8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" /> Preferred Location / City
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore, Hyderabad, Remote, San Francisco"
                className="w-full px-4 py-3 bg-[#FFFFFF] dark:bg-[#121E1A] border border-[#D8E2DA] dark:border-[#1A2E26] rounded-xl text-sm font-semibold text-[#1A1F1F] dark:text-[#F8FAFC] focus:outline-none focus:border-[#476550] dark:focus:border-[#2DD4BF] transition-all"
              />
              <p className="text-[11px] text-[#7D8787] dark:text-[#94A3B8] mt-1">
                Used to filter relevant geographic openings on the scout dashboard.
              </p>
            </div>
          </div>

          {/* Experience Level & Target Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#7D8787] dark:text-[#94A3B8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" /> Experience Level
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FFFFFF] dark:bg-[#121E1A] border border-[#D8E2DA] dark:border-[#1A2E26] rounded-xl text-sm font-semibold text-[#1A1F1F] dark:text-[#F8FAFC] focus:outline-none focus:border-[#476550] dark:focus:border-[#2DD4BF] transition-all"
              >
                <option value="Fresher">Fresher / 0 Years (College Graduate / Career Switcher)</option>
                <option value="1-3 Years">Junior (1 - 3 Years)</option>
                <option value="3-5 Years">Mid-Level (3 - 5 Years)</option>
                <option value="5+ Years">Senior / Lead (5+ Years)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7D8787] dark:text-[#94A3B8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" /> Expected Compensation (Optional)
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. ₹8,00,000 - ₹15,00,000 LPA"
                className="w-full px-4 py-3 bg-[#FFFFFF] dark:bg-[#121E1A] border border-[#D8E2DA] dark:border-[#1A2E26] rounded-xl text-sm font-semibold text-[#1A1F1F] dark:text-[#F8FAFC] focus:outline-none focus:border-[#476550] dark:focus:border-[#2DD4BF] transition-all"
              />
            </div>
          </div>

          {/* Action Buttons Cluster */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#D8E2DA] dark:border-[#1A2E26]">
            <div className="flex items-center gap-2 text-xs text-[#7D8787] dark:text-[#94A3B8]">
              <ShieldCheck className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" />
              <span>Zero-Backend Privacy Guarantee</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Dynamic Re-Audit for Updated Role */}
              <button
                type="button"
                onClick={() => runAtsAudit(formData.resumeBase64, formData.role)}
                disabled={analyzingAts || !formData.resumeBase64}
                className="btn-secondary text-xs sm:text-sm disabled:opacity-50"
                title="Re-run ATS audit for current job title"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${analyzingAts ? "animate-spin" : ""}`} />
                <span>{analyzingAts ? "Auditing..." : "⚡ Re-Audit ATS for This Role"}</span>
              </button>

              <button
                type="submit"
                disabled={loading || analyzingAts}
                className="btn-secondary text-xs sm:text-sm disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF]" />
                <span>Save Profile</span>
              </button>

              <Link
                href="/dashboard"
                className="btn-primary text-xs sm:text-sm"
                title="Launch Autonomous Job Scouting on Dashboard"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </form>
      </div>

      {/* SECTION 3: ATS SCREENING RESULTS & DIAGNOSTICS (LOCATED BELOW ROLE SELECTION & SALARY) */}
      <div ref={resultsRef} className="space-y-6 scroll-mt-20">
        {/* EXPLICIT ATS ERROR BANNER */}
        {atsError && (
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-[#1A1F1F] dark:text-[#F8FAFC] flex items-start gap-3 animate-in fade-in">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-rose-800 dark:text-rose-300">ATS Audit Notice</h4>
              <p className="text-xs text-[#596060] dark:text-[#CBD5E1] leading-relaxed">
                {atsError}
              </p>
            </div>
          </div>
        )}

        {/* LOADING INDICATOR WHILE AUDITING */}
        {analyzingAts && (
          <div className="bg-[#FAF9F6] dark:bg-[#0D1714] rounded-3xl border border-[#D8E2DA] dark:border-[#1A2E26] p-6 sm:p-8 text-center space-y-3 animate-in fade-in shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E8F0EB] dark:bg-[#2DD4BF]/15 text-[#476550] dark:text-[#2DD4BF]">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h3 className="font-extrabold text-base text-[#1A1F1F] dark:text-white">
              Auditing ATS Compatibility for &ldquo;{formData.role || "Target Role"}&rdquo;...
            </h3>
            <p className="text-xs text-[#7D8787] dark:text-[#94A3B8] max-w-md mx-auto">
              Extracting candidate skills, evaluating keyword densities against recruiter algorithms, and calculating your ATS match score.
            </p>
          </div>
        )}

        {/* ATS ANALYSIS RESULTS */}
        {atsAnalysis && (
          (atsAnalysis.isNonResume || atsAnalysis.score === 0) ? (
            /* Non-Resume Notice */
            <div className="bg-[#FAF9F6] dark:bg-[#0D1714] rounded-3xl border border-amber-300 dark:border-amber-800/60 p-5 sm:p-7 space-y-4 animate-in fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-200 dark:border-amber-900/40">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <span className="badge-warning-chip">
                      <AlertTriangle className="w-3.5 h-3.5" /> Non-Resume Document Detected
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1F1F] dark:text-[#F8FAFC]">
                    No Candidate Work History Found
                  </h2>
                  <p className="text-xs text-[#7D8787] dark:text-[#94A3B8] mt-1">
                    File uploaded: <strong>{formData.resumeFileName || "Uploaded_Document.pdf"}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-[#FFFFFF] dark:bg-[#121E1A] p-3 rounded-2xl border border-amber-300 dark:border-amber-800 self-start md:self-auto">
                  <div className="text-center px-4 py-1">
                    <div className="text-3xl font-black text-amber-600 dark:text-amber-400">0/100</div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#7D8787] dark:text-[#94A3B8]">
                      Invalid Format
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                Modern corporate ATS filters reject non-standard document formats within 3 seconds. Please upload your official candidate resume (PDF) to view verified matching keywords and score.
              </p>

              <button
                type="button"
                onClick={() => document.getElementById("resume-file-input")?.click()}
                className="btn-primary text-xs sm:text-sm"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Official Resume PDF</span>
              </button>
            </div>
          ) : (
            /* STANDARD ATS ANALYSIS CARD */
            <div className="bg-[#FAF9F6] dark:bg-[#0D1714] rounded-3xl border border-emerald-300/80 dark:border-[#2DD4BF]/40 p-5 sm:p-7 space-y-5 shadow-soft animate-in fade-in">
              {/* Score & Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-[#D8E2DA] dark:border-[#1A2E26]">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-[#E8F0EB] dark:bg-[#2DD4BF]/15 text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-emerald-800 dark:text-[#2DD4BF] text-xs font-bold">
                      <Flame className="w-3.5 h-3.5 text-emerald-600 dark:text-[#2DD4BF]" />
                      <span>Real-Time ATS Screening Score & Diagnostics</span>
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1F1F] dark:text-[#F8FAFC]">
                    Resume Match for &ldquo;{formData.role || "Target Role"}&rdquo;
                  </h2>
                  <p className="text-xs text-[#7D8787] dark:text-[#94A3B8]">
                    Scored against current enterprise recruiter algorithms and required technical skills.
                  </p>
                </div>

                {/* Animated SVG Radial Gauge */}
                <div className="self-center md:self-auto bg-[#FFFFFF] dark:bg-[#121E1A] p-4 rounded-2xl border border-[#D8E2DA] dark:border-[#1A2E26] shadow-xs">
                  <AtsRadialGauge score={atsAnalysis.score} tier={atsAnalysis.tier} />
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-[#FFFFFF] dark:bg-[#121E1A] p-4 sm:p-5 rounded-2xl border border-[#D8E2DA] dark:border-[#1A2E26]">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#476550] dark:text-[#2DD4BF] block mb-1">
                  Executive ATS Diagnostic Summary
                </span>
                <p className="text-xs sm:text-sm text-[#1A1F1F] dark:text-[#CBD5E1] leading-relaxed">
                  <HighlightedAtsText 
                    text={atsAnalysis.summary} 
                    missingKeywords={atsAnalysis.missingCoreSkills || atsAnalysis.keyMissingSkills || []}
                    matchedKeywords={atsAnalysis.matchedCoreSkills || []}
                    variant="neutral"
                  />
                </p>
              </div>

              {/* Strengths & Missing Elements Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths Column */}
                <div className="bg-[#FFFFFF] dark:bg-[#121E1A] p-4 sm:p-5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Detected Strengths & Matched Skills
                    </h3>

                    {/* Verified Skills Pill Cloud */}
                    {(atsAnalysis.matchedCoreSkills && atsAnalysis.matchedCoreSkills.length > 0) && (
                      <div className="mb-3 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1.5">
                          ✓ Verified Matching Keywords:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {atsAnalysis.matchedCoreSkills.map((skill, i) => (
                            <span key={i} className="badge-success-chip text-[11px]">
                              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <ul className="space-y-2 text-xs text-[#475569] dark:text-[#CBD5E1]">
                      {atsAnalysis.strengths.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>
                            <HighlightedAtsText 
                              text={item} 
                              matchedKeywords={atsAnalysis.matchedCoreSkills || []} 
                              variant="strength" 
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Missing Keywords Column */}
                <div className="bg-[#FFFFFF] dark:bg-[#121E1A] p-4 sm:p-5 rounded-2xl border border-amber-300/80 dark:border-amber-800/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Critical Filter Risks & Gaps
                      </h3>

                      {missingKeywordsList.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleCopyKeywords(missingKeywordsList)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-100 bg-amber-100/80 dark:bg-amber-950/60 px-2 py-1 rounded-md border border-amber-300 dark:border-amber-700/60 cursor-pointer transition-all"
                          title="Copy missing keywords to clipboard"
                        >
                          {copiedKeywords ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKeywords ? "Copied!" : "Copy Keywords"}</span>
                        </button>
                      )}
                    </div>

                    {missingKeywordsList.length > 0 && (
                      <div className="mb-3 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 block mb-1.5">
                          ⚠️ High-Priority Missing Keywords for {formData.role || "Target Role"}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {missingKeywordsList.map((skill, i) => (
                            <span key={i} className="badge-warning-chip text-[11px]">
                              <span>+</span>
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <ul className="space-y-2 text-xs text-[#475569] dark:text-[#CBD5E1]">
                      {atsAnalysis.improvements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-amber-950 dark:text-amber-200 leading-relaxed">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                          <span>
                            <HighlightedAtsText 
                              text={item} 
                              missingKeywords={missingKeywordsList} 
                              variant="missing" 
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ZenResume Sister App Deep Link */}
                  <a
                    href={`https://zenresume.online/?target_role=${encodeURIComponent(formData.role || "Software Engineer")}&utm_source=zenscout_ai&utm_medium=ats_audit_gaps`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/80 font-bold text-xs py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>⚡ Auto-Inject Missing Keywords on ZenResume Free</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Direct Dashboard Scout CTA */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-white">
                    ATS Verified. Ready to scout live openings?
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Launch autonomous crawler bots to match high-compatibility roles on your Dashboard.
                  </p>
                </div>
                <Link href="/dashboard" className="btn-primary text-xs sm:text-sm whitespace-nowrap">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )
        )}
      </div>

      {/* MARKETING SISTER APP BANNER (ZenResume) */}
      <div className="bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1A2E26] rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#476550] dark:text-[#2DD4BF]">
              Aneevarp Solutions Career Suite
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#1A1F1F] dark:text-[#F8FAFC]">
              Need an ATS-Certified Resume That Guarantees 95+?
            </h3>
            <p className="text-[#7D8787] dark:text-[#94A3B8] text-xs leading-relaxed">
              Build a single-column, bot-compliant resume specifically tuned to your target role using <strong>ZenResume</strong>.
            </p>
          </div>

          <a
            href="https://zenresume.online/?utm_source=zenscout_ai&utm_medium=profile_banner"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs sm:text-sm whitespace-nowrap"
          >
            <span>Build on ZenResume Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
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

