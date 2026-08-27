"use client";
import { useState, useEffect } from "react";
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Sparkles, 
  Bookmark, 
  Send, 
  MessageSquare, 
  Award, 
  Ban, 
  Filter, 
  Search, 
  Loader2, 
  X, 
  ChevronRight, 
  FileText, 
  Bot, 
  CheckCircle2, 
  ExternalLink,
  RefreshCw,
  Download,
  Copy,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  TrendingUp,
  Flame,
  Check,
  Globe,
  SlidersHorizontal,
  FileCheck,
  Crown,
  Zap,
  Lock,
  LayoutGrid,
  List
} from "lucide-react";
import Link from "next/link";
import { 
  getUserTierState, 
  isProSubscriber, 
  hasVoiceAudioAccess,
  recordScoutRun, 
  recordCoverLetterRun, 
  recordInterviewMessage, 
  getUsageQuota
} from "@/lib/user-tier";
import PricingModal from "@/components/PricingModal";
import { NotificationToast, ToastMessage, ToastType } from "@/components/NotificationToast";

// Types for our job board
type JobStatus = "New Matches" | "Saved" | "Applied" | "Interviewing" | "Offers" | "Rejected";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  salary?: string;
  postedAt: string;
  matchScore: number;
  status: JobStatus;
  applyLink?: string;
  source?: string;
}

const COLUMNS: { status: JobStatus; icon: any; color: string; bg: string; border: string }[] = [
  { status: "New Matches", icon: Sparkles, color: "text-[#00685F]", bg: "bg-teal-50", border: "border-teal-200" },
  { status: "Saved", icon: Bookmark, color: "text-[#545F73]", bg: "bg-slate-50", border: "border-slate-200" },
  { status: "Applied", icon: Send, color: "text-[#0284C7]", bg: "bg-sky-50", border: "border-sky-200" },
  { status: "Interviewing", icon: MessageSquare, color: "text-[#3B82F6]", bg: "bg-blue-50", border: "border-blue-200" },
  { status: "Offers", icon: Award, color: "text-[#22C55E]", bg: "bg-emerald-50", border: "border-emerald-200" },
  { status: "Rejected", icon: Ban, color: "text-[#EF4444]", bg: "bg-rose-50", border: "border-rose-200" },
];

type ChatMessage = { role: "user" | "assistant", content: string };

function renderFormattedDescription(desc?: string) {
  if (!desc) {
    return <p className="text-slate-500 dark:text-slate-400">No full job description available.</p>;
  }

  const lines = desc
    .replace(/\s*•\s*/g, "\n• ")
    .replace(/\s*-\s+/g, "\n- ")
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-[#171D1C] dark:text-slate-200 font-normal">
      {lines.map((line, idx) => {
        const isHeader = /^(Position:|What You Will Be Doing|What We're Looking For|Responsibilities|Requirements|Qualifications|Nice to Haves|Compensation And Benefits|Compensation & Benefits|About Us|About the Role|Key Duties)/i.test(line);
        const isBullet = line.startsWith("•") || line.startsWith("-");

        if (isHeader) {
          return (
            <h5 key={idx} className="font-extrabold text-xs sm:text-sm text-[#00685F] dark:text-[#2DD4BF] pt-3 pb-1 border-t border-slate-200 dark:border-slate-800 first:border-0 first:pt-0 uppercase tracking-wider block">
              {line}
            </h5>
          );
        }

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-[#00685F] dark:text-[#2DD4BF] font-black text-sm leading-tight flex-shrink-0 mt-0.5">•</span>
              <span className="flex-1">{line.replace(/^[•-]\s*/, "")}</span>
            </div>
          );
        }

        return <p key={idx} className="leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [scouting, setScouting] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  
  // Custom Live Search Bar State
  const [searchRole, setSearchRole] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Job Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "cover_letter" | "coach">("details");
  const [coverLetter, setCoverLetter] = useState("");
  const [factoryLoading, setFactoryLoading] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Agent Coach Voice & Speech State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [coachLoading, setCoachLoading] = useState(false);
  const [voiceAudioEnabled, setVoiceAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  // Subscription Tier & Quota States
  const [isPro, setIsPro] = useState(false);
  const [tierInfo, setTierInfo] = useState({ plan: "free", billingCycle: "monthly" as any, expiresAt: "" });
  const [usageQuota, setUsageQuota] = useState({ scoutRunsToday: 0, coverLettersGeneratedToday: 0, interviewMessagesSent: 0, atsAuditsToday: 0 });
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

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

  // Load jobs and initial search criteria from localStorage
  const fetchJobs = () => {
    try {
      setIsPro(isProSubscriber());
      setTierInfo(getUserTierState());
      setUsageQuota(getUsageQuota());

      const savedJobs = localStorage.getItem("jobs");
      if (savedJobs) {
        const parsedJobs: Job[] = JSON.parse(savedJobs);
        parsedJobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        setJobs(parsedJobs);
      }

      const savedProfile = localStorage.getItem("my_profile");
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.role && !searchRole) setSearchRole(parsed.role);
        if (parsed.location && !searchLocation) setSearchLocation(parsed.location);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Text-To-Speech function for AI coach
  const speakText = (text: string) => {
    if (!voiceAudioEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel(); // Stop ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Speech-To-Text function for candidate response
  const toggleSpeechRecognition = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser. Please type your response.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  // Run Scout Agent with live custom search bar or default profile
  const handleRunScout = async () => {
    // Free Tier Quota Check
    const scoutCheck = recordScoutRun();
    if (!scoutCheck.allowed) {
      setPricingModalOpen(true);
      return;
    }
    setUsageQuota(getUsageQuota());

    setScouting(true);
    try {
      const targetRole = searchRole.trim();
      let targetLocation = searchLocation.trim();
      if (remoteOnly) {
        targetLocation = targetLocation ? `${targetLocation} (Remote)` : "Remote";
      }

      if (!targetRole) {
        showToast("warning", "Search Input Required", "Please enter a target role or job title to scout opportunities.");
        setScouting(false);
        return;
      }

      const savedProfile = localStorage.getItem("my_profile");
      const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
      const userExperience = userProfile?.experience || "Fresher";

      const response = await fetch("/api/agents/scout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          role: targetRole, 
          location: targetLocation || "Remote",
          experience: userExperience
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to search jobs");
      }

      const result = await response.json();
      
      const savedJobsString = localStorage.getItem("jobs");
      let currentJobs: Job[] = savedJobsString ? JSON.parse(savedJobsString) : [];
      
      // Keep existing non-new-match jobs
      currentJobs = currentJobs.filter(j => j.status !== "New Matches");
      
      const combined = [...result.jobs, ...currentJobs];
      localStorage.setItem("jobs", JSON.stringify(combined));
      setJobs(combined);
      showToast("scout", "Live Scout Complete", `Scout Agent discovered ${result.jobs.length} new opportunities for "${targetRole}"!`);
    } catch (error: any) {
      console.error("Scout Error:", error);
      showToast("error", "Scout Agent Notice", error.message || "Failed to scout jobs.");
    } finally {
      setScouting(false);
    }
  };

  const handleRunFilter = async () => {
    setFiltering(true);
    try {
      const savedProfile = localStorage.getItem("my_profile");
      if (!savedProfile) {
        showToast("warning", "Resume Required", "Please set up your profile and upload your resume in the Profile page first!");
        setFiltering(false);
        return;
      }

      const profileDoc = JSON.parse(savedProfile);
      const { resumeBase64 } = profileDoc;
      if (!resumeBase64) {
        showToast("warning", "Resume Required", "Please upload your PDF resume in your Profile to run Agent Filter.");
        setFiltering(false);
        return;
      }

      const targetJobs = jobs.filter(j => j.status === "New Matches" && (!j.matchScore || j.matchScore === 0));
      if (targetJobs.length === 0) {
        showToast("info", "Filter Agent Status", "All current job opportunities have already been scored against your resume!");
        setFiltering(false);
        return;
      }

      // Chunking sequentially for serverless limit resilience
      const CHUNK_SIZE = 3;
      let scoredJobs: any[] = [];

      for (let i = 0; i < targetJobs.length; i += CHUNK_SIZE) {
        const chunk = targetJobs.slice(i, i + CHUNK_SIZE);
        try {
          const response = await fetch("/api/agents/filter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              jobs: chunk, 
              resumeBase64,
              experience: profileDoc.experience || "Fresher"
            })
          });

          if (response.ok) {
            const data = await response.json();
            if (data.jobs) {
              scoredJobs = [...scoredJobs, ...data.jobs];
            }
          }
        } catch (batchErr) {
          console.warn("Batch scoring warning:", batchErr);
        }
      }

      const updatedAll = jobs.map(j => {
        const found = scoredJobs.find(sj => sj.id === j.id);
        return found ? { ...j, matchScore: found.matchScore } : j;
      });

      updatedAll.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      localStorage.setItem("jobs", JSON.stringify(updatedAll));
      setJobs(updatedAll);
      showToast("filter", "Agent Filter Complete", `Agent Filter successfully scored ${scoredJobs.length} live jobs against your resume profile!`);
    } catch (error: any) {
      console.error("Filter Error:", error);
      showToast("error", "Agent Filter Notice", error.message || "Failed to filter jobs.");
    } finally {
      setFiltering(false);
    }
  };

  const updateJobStatus = (jobId: string, newStatus: JobStatus) => {
    const updated = jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j);
    localStorage.setItem("jobs", JSON.stringify(updated));
    setJobs(updated);
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob({ ...selectedJob, status: newStatus });
    }
  };

  const handleGenerateCoverLetter = async (job: Job) => {
    // Free Tier Quota Check for Cover Letters
    const letterCheck = recordCoverLetterRun();
    if (!letterCheck.allowed) {
      setPricingModalOpen(true);
      return;
    }
    setUsageQuota(getUsageQuota());

    setFactoryLoading(true);
    try {
      const savedProfile = localStorage.getItem("my_profile");
      const resumeBase64 = savedProfile ? JSON.parse(savedProfile).resumeBase64 : "";

      const response = await fetch("/api/agents/factory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job, resumeBase64 })
      });

      if (!response.ok) throw new Error("Failed to generate cover letter");
      const data = await response.json();
      setCoverLetter(data.coverLetter);
      showToast("factory", "Cover Letter Ready", `Tailored cover letter generated for ${job.company}!`);
    } catch (error: any) {
      console.error(error);
      showToast("error", "Factory Agent Notice", "Failed to generate customized cover letter.");
    } finally {
      setFactoryLoading(false);
    }
  };

  // 1-Click Formatted Print / PDF Download Helper
  const handlePrintCoverLetter = () => {
    if (!coverLetter || !selectedJob) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter - ${selectedJob.company}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px 50px; color: #111827; line-height: 1.6; }
            .header { border-bottom: 2px solid #00685F; padding-bottom: 15px; margin-bottom: 25px; }
            .date { color: #6B7280; font-size: 13px; margin-bottom: 20px; }
            .content { white-space: pre-wrap; font-size: 14px; }
            .footer { margin-top: 40px; font-size: 12px; color: #9CA3AF; text-align: center; border-top: 1px solid #E5E7EB; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2 style="margin: 0; color: #00685F;">Application for ${selectedJob.title}</h2>
            <p style="margin: 4px 0 0 0; color: #4B5563;">${selectedJob.company} • ${selectedJob.location}</p>
          </div>
          <div class="date">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          <div class="content">${coverLetter}</div>
          <div class="footer">Generated by ZenScout AI • Aneevarp Solutions Career Suite</div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCopyCoverLetter = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const handleSendCoachMessage = async () => {
    if (!chatInput.trim() || !selectedJob) return;

    const isFree = !isProSubscriber();
    const currentSent = usageQuota.interviewMessagesSent;
    const isFreeLastTurn = isFree && currentSent === 2;

    // Free Tier Quota Check for Interview Coach
    const interviewCheck = recordInterviewMessage();
    if (!interviewCheck.allowed) {
      setPricingModalOpen(true);
      return;
    }
    setUsageQuota(getUsageQuota());

    const userMsg: ChatMessage = { role: "user", content: chatInput.trim() };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setChatInput("");
    setCoachLoading(true);

    try {
      const savedProfile = localStorage.getItem("my_profile");
      const profileDoc = savedProfile ? JSON.parse(savedProfile) : {};
      const resumeBase64 = profileDoc.resumeBase64 || "";
      const userExperience = profileDoc.experience || "Fresher";
      const userTargetRole = profileDoc.role || "";

      const response = await fetch("/api/agents/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          job: selectedJob, 
          resumeBase64, 
          messages: newMessages,
          experience: userExperience,
          targetRole: userTargetRole,
          isFreeTierLastTurn: isFreeLastTurn
        })
      });

      if (!response.ok) throw new Error("Coach agent error");
      const data = await response.json();
      const assistantReply = data.reply;
      setChatMessages([...newMessages, { role: "assistant", content: assistantReply }]);

      // Speak assistant reply if voice enabled
      speakText(assistantReply);
    } catch (error: any) {
      console.error(error);
      showToast("error", "Coach Agent Notice", "Failed to receive interview feedback from AI Coach.");
    } finally {
      setCoachLoading(false);
    }
  };

  // Real-Time Analytics Calculations
  const totalScouted = jobs.length;
  const scoredJobs = jobs.filter(j => j.matchScore > 0);
  const avgMatch = scoredJobs.length > 0 
    ? Math.round(scoredJobs.reduce((acc, curr) => acc + curr.matchScore, 0) / scoredJobs.length)
    : 0;
  const appliedCount = jobs.filter(j => j.status === "Applied").length;
  const interviewsCount = jobs.filter(j => j.status === "Interviewing" || j.status === "Offers").length;

  return (
    <div className="flex flex-col gap-6">
      {/* 0. LIVE SUBSCRIPTION TIER & QUOTA METER */}
      <div className="bg-white dark:bg-[#141B20] p-4 md:p-5 rounded-2xl border border-[#E2E8F0] dark:border-[#232D36] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl flex items-center justify-center ${
            isPro 
              ? "bg-amber-500/20 text-amber-500" 
              : "bg-teal-50 dark:bg-teal-950/40 text-[#00685F] dark:text-[#2DD4BF]"
          }`}>
            {isPro ? <Crown className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-black dark:text-white">
                {isPro 
                  ? (tierInfo.billingCycle === "annual" 
                      ? "ZenScout ANNUAL PRO VIP" 
                      : tierInfo.billingCycle === "quarterly" 
                        ? "ZenScout 3-MONTH FULL PASS" 
                        : "ZenScout 1-MONTH STARTER")
                  : "Free Tier Workspace"}
              </span>
              {isPro ? (
                <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-2 py-0.5 rounded-full">
                  {tierInfo.billingCycle === "annual" ? "👑 VIP UNLIMITED" : tierInfo.billingCycle === "quarterly" ? "⚡ UNLIMITED AI" : "100% AD-FREE"}
                </span>
              ) : (
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-2 py-0.5 rounded-full">
                  Standard Limits (Ads Enabled)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isPro 
                ? (tierInfo.billingCycle === "monthly"
                    ? `1-Month Starter Plan: ${usageQuota.scoutRunsToday}/25 Daily Scouts • ${usageQuota.coverLettersGeneratedToday}/10 Letters • 100% Ad-Free`
                    : tierInfo.billingCycle === "quarterly"
                      ? `3-Month Pass: ⚡ Truly Unlimited AI Scouting, Letters & Coach • Priority 2x Server Speed • 100% Ad-Free`
                      : `Annual VIP Member: 👑 VIP Badge Active • Truly Unlimited AI • Recruiter Outreach & Salary Playbooks Active`)
                : `Daily Free Usage: ${usageQuota.scoutRunsToday}/5 Scouts • ${usageQuota.coverLettersGeneratedToday}/2 Letters • ${usageQuota.interviewMessagesSent}/3 Coach Exchanges`}
            </p>
          </div>
        </div>

        {!isPro ? (
          <button
            onClick={() => setPricingModalOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-sm active:scale-95 transition-all"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Upgrade to Pro (Compare Plans)</span>
          </button>
        ) : tierInfo.billingCycle === "monthly" ? (
          <button
            onClick={() => setPricingModalOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-500 hover:text-white text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Upgrade to 3-Month Unlimited</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-900">
            <CheckCircle2 className="w-4 h-4" />
            <span>{tierInfo.billingCycle === "annual" ? "👑 VIP Member Status Active" : "⚡ 3-Month Unlimited Active"}</span>
          </div>
        )}
      </div>

      {/* CONDITIONAL ADSENSE SPONSOR BANNER (Displayed ONLY on Free Tier) */}
      {!isPro && (
        <div className="bg-slate-50 dark:bg-[#1A2228] p-3.5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-black uppercase tracking-widest bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
              Ad / Sponsor
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Targeting tech jobs? Level up your profile with verified certifications & ZenResume ATS templates.
            </p>
          </div>
          <button
            onClick={() => setPricingModalOpen(true)}
            className="text-[11px] font-bold text-[#00685F] dark:text-[#2DD4BF] hover:underline whitespace-nowrap"
          >
            Remove ads with ZenScout Pro &rarr;
          </button>
        </div>
      )}

      {/* 1. TOP ANALYTICS & STATS BAR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-soft flex items-center gap-4">
          <div className="p-3 rounded-xl bg-teal-50 text-[#00685F]">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Total Scouted</span>
            <span className="text-2xl font-black text-black">{totalScouted}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-soft flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Avg Match Score</span>
            <span className="text-2xl font-black text-emerald-700">{avgMatch > 0 ? `${avgMatch}%` : "—"}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-soft flex items-center gap-4">
          <div className="p-3 rounded-xl bg-sky-50 text-[#0284C7]">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Applications Sent</span>
            <span className="text-2xl font-black text-[#0284C7]">{appliedCount}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-soft flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-700">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Interviews & Offers</span>
            <span className="text-2xl font-black text-purple-700">{interviewsCount}</span>
          </div>
        </div>
      </section>

      {/* 2. LIVE SEARCH & FILTER CONTROL BAR */}
      <section className="bg-white rounded-3xl border border-[#E2E8F0] shadow-soft p-5 md:p-6">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Target Role Input */}
          <div className="flex-1 w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              placeholder="Search Role (e.g. React Developer, Frontend Engineer, Data Scientist)"
              className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-bold text-black focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20"
            />
          </div>

          {/* Location Input */}
          <div className="w-full lg:w-64 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="City (e.g. Bangalore, Hyderabad)"
              className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-bold text-black focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20"
            />
          </div>

          {/* Remote Toggle */}
          <button
            type="button"
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={`px-4 py-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all w-full lg:w-auto justify-center ${
              remoteOnly 
                ? "bg-teal-50 border-[#00685F] text-[#00685F]" 
                : "bg-[#F8FAFC] border-[#E2E8F0] text-[#545F73] hover:text-black"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Remote Only</span>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              onClick={handleRunFilter}
              disabled={filtering}
              className="bg-white border border-[#E2E8F0] hover:bg-[#F0F5F2] text-black font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-soft flex items-center justify-center gap-1.5 btn-tactile disabled:opacity-50 flex-1 lg:flex-none"
            >
              {filtering ? <Loader2 className="w-4 h-4 animate-spin text-[#00685F]" /> : <Filter className="w-4 h-4 text-[#00685F]" />}
              <span>Score ATS</span>
            </button>

            <button
              onClick={handleRunScout}
              disabled={scouting}
              className="bg-[#00685F] hover:bg-[#005049] text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 btn-tactile disabled:opacity-50 flex-1 lg:flex-none"
            >
              {scouting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Search Live Jobs</span>
            </button>
          </div>
        </div>
      </section>

      {/* LIVE MULTI-STEP AGENT PIPELINE MONITOR */}
      {(scouting || filtering) && (
        <section className="bg-gradient-to-r from-teal-950/90 via-slate-900 to-teal-950/90 border-2 border-[#00685F]/60 rounded-3xl p-5 text-white shadow-xl animate-in fade-in slide-in-from-top-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-800/40 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00685F] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-[#2DD4BF]" />
              </div>
              <div>
                <h4 className="font-black text-sm sm:text-base text-white leading-tight">
                  {scouting ? "Scout Agent: Autonomous Web Crawler Active" : "Filter Agent: Deep ATS Scorer Active"}
                </h4>
                <p className="text-[11px] text-slate-300">
                  {scouting ? `Querying Google Jobs index & official portals for "${searchRole || "Target Roles"}"` : "Auditing job requirements against your verified candidate profile"}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-black bg-[#00685F]/50 border border-[#2DD4BF]/50 text-[#2DD4BF] px-3 py-1 rounded-full self-start sm:self-auto shadow-sm">
              Stage 2 of 3 • Neural Matching
            </span>
          </div>

          {/* 3-Step Progress Stage Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-teal-900/40 border border-teal-500/30">
              <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] flex-shrink-0" />
              <span className="font-semibold text-slate-200">1. Query Real-Time Jobs Index</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-teal-500/20 border border-teal-400 text-[#2DD4BF] animate-pulse font-extrabold shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
              <span>2. Match Candidate Profile</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-slate-400">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>3. Rank High-Fit Opportunities</span>
            </div>
          </div>
        </section>
      )}

      {/* 3. OPPORTUNITY PIPELINE HEADER & VIEW TOGGLE */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-black text-black dark:text-white tracking-tight">
            {viewMode === "board" ? "Pipeline Kanban Board" : "Opportunity Feed & Scoreboard"}
          </h2>
          <span className="text-xs font-black text-[#00685F] dark:text-[#2DD4BF] bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800/80 shadow-sm">
            {jobs.length} Active Opportunities
          </span>
        </div>

        {/* View Switcher Segmented Control */}
        <div className="inline-flex p-1 rounded-2xl bg-[#F0F5F2] dark:bg-[#1A2228] border border-[#E2E8F0] dark:border-[#232D36] shadow-inner self-start sm:self-auto">
          <button
            onClick={() => setViewMode("board")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              viewMode === "board"
                ? "bg-[#00685F] text-white shadow-sm"
                : "text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Board View</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              viewMode === "list"
                ? "bg-[#00685F] text-white shadow-sm"
                : "text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List / Feed View</span>
          </button>
        </div>
      </section>

      {/* VIEW 1: LIST / FEED VIEW (Optimized for Fast Scanning & High Screen Density) */}
      {viewMode === "list" && (
        <section className="space-y-3">
          {jobs.length === 0 ? (
            <div className="bg-white dark:bg-[#141B20] rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] p-12 text-center text-slate-500 shadow-soft">
              <Search className="w-10 h-10 mx-auto mb-3 text-slate-400 opacity-40" />
              <h3 className="text-base font-bold text-black dark:text-white">No Opportunities Scouted Yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your target role above and click "Search Live Jobs" to populate your feed!
              </p>
            </div>
          ) : (
            jobs
              .slice()
              .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
              .map(job => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-[#141B20] rounded-2xl border border-[#E2E8F0] dark:border-[#232D36] p-4 sm:p-5 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 
                        onClick={() => { setSelectedJob(job); setActiveTab("details"); }}
                        className="font-extrabold text-sm sm:text-base text-black dark:text-white group-hover:text-[#00685F] dark:group-hover:text-[#2DD4BF] transition-colors cursor-pointer"
                      >
                        {job.title}
                      </h3>
                      {job.matchScore > 0 && (
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                          job.matchScore >= 80 ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800" :
                          job.matchScore >= 60 ? "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800" :
                          "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
                        }`}>
                          {job.matchScore}% Match
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {job.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#0F172A] dark:text-slate-300 font-medium">
                      <span className="flex items-center gap-1 font-bold"><Building2 className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF]" /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                      {job.salary && <span className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400"><IndianRupee className="w-3.5 h-3.5" /> {job.salary}</span>}
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/80">
                    <select
                      value={job.status}
                      onChange={(e) => updateJobStatus(job.id, e.target.value as JobStatus)}
                      className="text-xs font-bold bg-[#F8FAFC] dark:bg-[#1A2228] border border-[#E2E8F0] dark:border-[#232D36] text-black dark:text-white px-3 py-2 rounded-xl focus:outline-none focus:border-[#00685F] cursor-pointer"
                    >
                      {COLUMNS.map(c => (
                        <option key={c.status} value={c.status}>{c.status}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => { setSelectedJob(job); setActiveTab("details"); }}
                      className="text-xs font-bold bg-[#00685F] hover:bg-[#005049] text-white px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => { setSelectedJob(job); setActiveTab("cover_letter"); handleGenerateCoverLetter(job); }}
                      className="text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-2 rounded-xl transition-all"
                      title="Draft tailored cover letter"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => { setSelectedJob(job); setActiveTab("coach"); }}
                      className="text-xs font-bold bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-[#00685F] dark:text-[#2DD4BF] border border-teal-200 dark:border-teal-800 px-3 py-2 rounded-xl transition-all"
                      title="Practice mock interview"
                    >
                      <Bot className="w-3.5 h-3.5" />
                    </button>

                    {job.applyLink && (
                      <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 p-2 rounded-xl transition-all"
                        title="Apply directly on portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))
          )}
        </section>
      )}

      {/* VIEW 2: KANBAN 6-STATUS CATEGORY GRID (Tactile Linear Style) */}
      {viewMode === "board" && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLUMNS.map(({ status, icon: Icon, color, bg, border }) => {
            const columnJobs = jobs.filter(j => j.status === status);
            
            return (
              <div 
                key={status} 
                className="bg-white dark:bg-[#141B20] rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft p-5 sm:p-6 flex flex-col min-h-[340px] transition-all hover:shadow-soft-hover"
              >
                {/* Card Header */}
                <div className="flex justify-between items-center w-full mb-4 pb-3 border-b border-[#E2E8F0] dark:border-[#232D36]">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl ${bg} ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="font-extrabold text-sm text-black dark:text-white tracking-tight">{status}</h2>
                  </div>
                  <span className="bg-[#EAEFED] dark:bg-slate-800 text-black dark:text-white font-extrabold text-xs px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    {columnJobs.length}
                  </span>
                </div>

                {/* Jobs List inside status card */}
                <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[480px]">
                  {columnJobs.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#545F73] dark:text-slate-400">
                      <Icon className={`w-8 h-8 ${color} opacity-30 mb-2`} />
                      <p className="text-sm font-bold text-black dark:text-white">No jobs in {status}</p>
                      <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Drag or move opportunities here</span>
                    </div>
                  ) : (
                    columnJobs.map(job => (
                      <div 
                        key={job.id}
                        onClick={() => { setSelectedJob(job); setActiveTab("details"); }}
                        className="p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#232D36] bg-[#F8FAFC] dark:bg-[#1A2228] hover:bg-white dark:hover:bg-[#1F2930] hover:border-[#00685F]/50 dark:hover:border-[#2DD4BF]/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col gap-2 relative"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-extrabold text-sm text-black dark:text-white group-hover:text-[#00685F] dark:group-hover:text-[#2DD4BF] transition-colors line-clamp-1">
                            {job.title}
                          </h3>
                          {job.matchScore > 0 && (
                            <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                              job.matchScore >= 80 ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800" :
                              job.matchScore >= 60 ? "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800" :
                              "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
                            }`}>
                              {job.matchScore}% Match
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[#0F172A] dark:text-slate-300 font-medium">
                          <span className="flex items-center gap-1 font-bold"><Building2 className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF]" /> {job.company}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/80 mt-1">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{job.postedAt || "Verified active"}</span>
                          <span className="text-xs font-bold text-[#00685F] dark:text-[#2DD4BF] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                            View details &rarr;
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* 4. JOB DETAIL, COVER LETTER PDF & AI COACH MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#141B20] rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#E2E8F0] dark:border-[#232D36] flex justify-between items-start bg-[#F8FAFC] dark:bg-[#1A2228] gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h2 className="text-lg sm:text-2xl font-black text-black dark:text-white leading-snug break-words">{selectedJob.title}</h2>
                  {selectedJob.matchScore > 0 && (
                    <span className="text-[11px] sm:text-xs font-black px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {selectedJob.matchScore}% Match
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold text-[#0F172A] dark:text-slate-300">
                  <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF]" /> {selectedJob.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF]" /> {selectedJob.location}</span>
                  {selectedJob.salary && <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5 text-[#00685F] dark:text-[#2DD4BF]" /> {selectedJob.salary}</span>}
                </div>
              </div>
              <button 
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
                  setSelectedJob(null);
                }}
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs (Scrollable on small screens) */}
            <div className="flex border-b border-[#E2E8F0] dark:border-[#232D36] px-3 sm:px-6 bg-white dark:bg-[#141B20] overflow-x-auto no-scrollbar gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${
                  activeTab === "details" ? "border-[#00685F] dark:border-[#2DD4BF] text-[#00685F] dark:text-[#2DD4BF]" : "border-transparent text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Job Description
              </button>
              <button
                onClick={() => {
                  setActiveTab("cover_letter");
                  if (!coverLetter) handleGenerateCoverLetter(selectedJob);
                }}
                className={`py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "cover_letter" ? "border-[#00685F] dark:border-[#2DD4BF] text-[#00685F] dark:text-[#2DD4BF]" : "border-transparent text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Cover Letter
              </button>
              <button
                onClick={() => setActiveTab("coach")}
                className={`py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === "coach" ? "border-[#00685F] dark:border-[#2DD4BF] text-[#00685F] dark:text-[#2DD4BF]" : "border-transparent text-[#545F73] dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <Bot className="w-4 h-4" />
                AI Interview Coach
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-sm text-[#171D1C] dark:text-slate-200">
              {/* TAB 1: DETAILS */}
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#545F73] dark:text-slate-400 mb-2.5">Move Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {COLUMNS.map(col => (
                        <button
                          key={col.status}
                          onClick={() => updateJobStatus(selectedJob.id, col.status)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                            selectedJob.status === col.status
                              ? "bg-[#00685F] text-white shadow-md font-black ring-2 ring-[#00685F]/30"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                          }`}
                        >
                          {col.status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#545F73] dark:text-slate-400 mb-2.5">Role Overview & Responsibilities</h4>
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#1A2228] border border-[#E2E8F0] dark:border-[#232D36] shadow-sm">
                      {renderFormattedDescription(selectedJob.description)}
                    </div>
                  </div>

                  {selectedJob.applyLink && (
                    <div className="pt-2">
                      <a
                        href={selectedJob.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#00685F] hover:bg-[#005049] text-white font-black px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 btn-tactile text-xs sm:text-sm"
                      >
                        Apply Directly on Official Portal <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: COVER LETTER WITH 1-CLICK PDF EXPORT */}
              {activeTab === "cover_letter" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC] dark:bg-[#1A2228] p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#232D36]">
                    <p className="text-xs text-[#0F172A] dark:text-slate-300 font-medium">Synthesized with Gemini 2.5 Flash mapping your experience.</p>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyCoverLetter}
                        disabled={factoryLoading || !coverLetter}
                        className="text-xs bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-black dark:text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                      >
                        {copiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLetter ? "Copied!" : "Copy"}</span>
                      </button>

                      <button
                        onClick={handlePrintCoverLetter}
                        disabled={factoryLoading || !coverLetter}
                        className="text-xs bg-[#00685F] hover:bg-[#005049] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>

                      <button
                        onClick={() => handleGenerateCoverLetter(selectedJob)}
                        disabled={factoryLoading}
                        className="text-xs text-[#00685F] dark:text-[#2DD4BF] hover:underline font-bold flex items-center gap-1 pl-1"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${factoryLoading ? "animate-spin" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {factoryLoading ? (
                    <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-[#00685F] dark:text-[#2DD4BF]" />
                      <p className="font-bold text-sm text-black dark:text-white">Agent Factory is drafting your tailored cover letter...</p>
                    </div>
                  ) : (
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={13}
                      className="w-full p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#232D36] bg-[#F8FAFC] dark:bg-[#1A2228] text-black dark:text-slate-100 leading-relaxed font-sans text-sm focus:outline-none focus:border-[#00685F]"
                    />
                  )}
                </div>
              )}

              {/* TAB 3: AI INTERVIEW COACH WITH VOICE & SPEECH */}
              {activeTab === "coach" && (
                <div className="flex flex-col h-[430px]">
                  {/* Coach Controls Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3 text-xs">
                    <span className="font-bold text-black dark:text-white flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-[#00685F] dark:text-[#2DD4BF]" /> Mock Interview Simulation
                    </span>
                    
                    {hasVoiceAudioAccess() ? (
                      <button
                        onClick={() => {
                          const next = !voiceAudioEnabled;
                          setVoiceAudioEnabled(next);
                          if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
                            window.speechSynthesis.cancel();
                          }
                        }}
                        className={`flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg border transition-all ${
                          voiceAudioEnabled 
                            ? "bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-800 text-[#00685F] dark:text-[#2DD4BF]" 
                            : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {voiceAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>{voiceAudioEnabled ? "Voice Enabled" : "Voice Muted"}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setPricingModalOpen(true)}
                        className="flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-lg border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-[11px] shadow-sm hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all"
                        title="Live AI Voice Audio playback is available on the 3-Month Pass and Annual VIP"
                      >
                        <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>Unlock Voice Audio (3-Month Pass)</span>
                      </button>
                    )}
                  </div>

                  {/* Chat Message Thread */}
                  <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-[#F8FAFC] dark:bg-[#1A2228] rounded-2xl border border-[#E2E8F0] dark:border-[#232D36] mb-3">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-10 text-[#545F73] dark:text-slate-400">
                        <Bot className="w-10 h-10 mx-auto mb-2 text-[#00685F] dark:text-[#2DD4BF]" />
                        <p className="font-bold text-sm text-black dark:text-white">Start your mock interview with the Hiring Manager</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Type "Hello, I am ready to begin" or tap the mic below!</p>
                      </div>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          {msg.role === "user" ? (
                            <div className="max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed bg-[#00685F] text-white rounded-br-none font-medium shadow-sm">
                              {msg.content}
                            </div>
                          ) : (
                            <div className="max-w-[85%] flex flex-col items-start gap-1.5">
                              {i > 0 && (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-[10px] font-black text-emerald-800 dark:text-emerald-300 shadow-sm">
                                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                  <span>Hiring Scorecard: STAR 9/10 • Technical Depth: High</span>
                                </div>
                              )}
                              <div className="p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed bg-white dark:bg-[#141B20] border border-[#E2E8F0] dark:border-slate-700 text-black dark:text-slate-100 rounded-bl-none shadow-sm font-normal">
                                {msg.content}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}

                    {/* IN-CHAT UPGRADE CARD (Triggered when 3 Free Turns are Completed) */}
                    {!isProSubscriber() && usageQuota.interviewMessagesSent >= 3 && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-500/40 text-black dark:text-white shadow-lg animate-in fade-in slide-in-from-bottom-2 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-black text-amber-800 dark:text-amber-300">
                          <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>FREE EVALUATION COMPLETE • UNLOCK FULL-LENGTH SESSIONS</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          Build bulletproof interview muscle memory, unlock live voice sparring, and practice unlimited full-length rounds across all your applications.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                          <button
                            onClick={() => setPricingModalOpen(true)}
                            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Zap className="w-3.5 h-3.5 fill-white" />
                            <span>Accelerate My Career & Unlock Full Practice &rarr;</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {coachLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-[#141B20] border border-[#E2E8F0] dark:border-slate-700 p-3 rounded-2xl rounded-bl-none text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold shadow-sm">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00685F] dark:text-[#2DD4BF]" />
                          <span>Hiring Manager is evaluating your answer...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input & Mic Tool */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={toggleSpeechRecognition}
                      disabled={!isProSubscriber() && usageQuota.interviewMessagesSent >= 3}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                        isRecording 
                          ? "bg-rose-500 text-white border-rose-600 animate-pulse" 
                          : "bg-white dark:bg-[#141B20] border-[#E2E8F0] dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                      }`}
                      title={isRecording ? "Listening..." : "Speak response"}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (!isProSubscriber() && usageQuota.interviewMessagesSent >= 3) {
                            setPricingModalOpen(true);
                          } else {
                            handleSendCoachMessage();
                          }
                        }
                      }}
                      placeholder={
                        !isProSubscriber() && usageQuota.interviewMessagesSent >= 3
                          ? "Daily free evaluation limit reached (3/3). Click here to upgrade →"
                          : isRecording 
                            ? "Listening to your voice..." 
                            : "Type or speak your answer..."
                      }
                      className="flex-1 p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-[#141B20] text-sm font-medium text-black dark:text-white focus:outline-none focus:border-[#00685F]"
                    />
                    <button
                      onClick={() => {
                        if (!isProSubscriber() && usageQuota.interviewMessagesSent >= 3) {
                          setPricingModalOpen(true);
                        } else {
                          handleSendCoachMessage();
                        }
                      }}
                      disabled={coachLoading || (!chatInput.trim() && isProSubscriber())}
                      className="bg-[#00685F] hover:bg-[#005049] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 btn-tactile flex items-center gap-1.5"
                    >
                      <span>{!isProSubscriber() && usageQuota.interviewMessagesSent >= 3 ? "Upgrade" : "Send"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Embedded Pricing & Upgrade Modal */}
      <PricingModal 
        isOpen={pricingModalOpen} 
        onClose={() => {
          setPricingModalOpen(false);
          fetchJobs();
        }} 
      />

      {/* In-App Notification Toast Stream */}
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
