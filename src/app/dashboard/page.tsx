"use client";
import { useState, useEffect } from "react";
import { 
  Briefcase, 
  MoreHorizontal, 
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
  RefreshCw
} from "lucide-react";

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

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [scouting, setScouting] = useState(false);
  const [filtering, setFiltering] = useState(false);
  
  // Job Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "cover_letter" | "coach">("details");
  const [coverLetter, setCoverLetter] = useState("");
  const [factoryLoading, setFactoryLoading] = useState(false);

  // Agent Coach State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [coachLoading, setCoachLoading] = useState(false);

  // Fetch jobs from localStorage on mount
  const fetchJobs = () => {
    try {
      const savedJobs = localStorage.getItem("jobs");
      if (savedJobs) {
        const parsedJobs: Job[] = JSON.parse(savedJobs);
        parsedJobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        setJobs(parsedJobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleRunScout = async () => {
    setScouting(true);
    try {
      const savedProfile = localStorage.getItem("my_profile");
      if (!savedProfile) {
        alert("Please set up your profile in the Profile page first!");
        setScouting(false);
        return;
      }

      const profileDoc = JSON.parse(savedProfile);
      const { role, location } = profileDoc;
      if (!role || !location) {
        alert("Please set your Desired Role and Location in your profile.");
        setScouting(false);
        return;
      }

      const response = await fetch("/api/agents/scout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, location })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to search jobs");
      }

      const result = await response.json();
      
      const savedJobsString = localStorage.getItem("jobs");
      let currentJobs: Job[] = savedJobsString ? JSON.parse(savedJobsString) : [];
      
      // Filter out previous New Matches
      currentJobs = currentJobs.filter(j => j.status !== "New Matches");
      
      const combined = [...result.jobs, ...currentJobs];
      localStorage.setItem("jobs", JSON.stringify(combined));
      setJobs(combined);
      alert(`Scout Agent discovered ${result.jobs.length} new opportunities!`);
    } catch (error: any) {
      console.error("Scout Error:", error);
      alert(error.message || "Failed to scout jobs.");
    } finally {
      setScouting(false);
    }
  };

  const handleRunFilter = async () => {
    setFiltering(true);
    try {
      const savedProfile = localStorage.getItem("my_profile");
      if (!savedProfile) {
        alert("Please set up your profile and upload your resume first!");
        setFiltering(false);
        return;
      }

      const profileDoc = JSON.parse(savedProfile);
      const { resumeBase64 } = profileDoc;
      if (!resumeBase64) {
        alert("Please upload your PDF resume in your Profile to run Agent Filter.");
        setFiltering(false);
        return;
      }

      const targetJobs = jobs.filter(j => j.status === "New Matches" && (!j.matchScore || j.matchScore === 0));
      if (targetJobs.length === 0) {
        alert("All current matches have already been scored!");
        setFiltering(false);
        return;
      }

      // Chunking sequentially for serverless limit resilience
      const CHUNK_SIZE = 3;
      let scoredJobs: any[] = [];

      for (let i = 0; i < targetJobs.length; i += CHUNK_SIZE) {
        const chunk = targetJobs.slice(i, i + CHUNK_SIZE);
        const response = await fetch("/api/agents/filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobs: chunk, resumeBase64 })
        });

        if (!response.ok) {
          throw new Error("Agent Filter failed on a batch.");
        }

        const data = await response.json();
        if (data.jobs) {
          scoredJobs = [...scoredJobs, ...data.jobs];
        }
      }

      const updatedAll = jobs.map(j => {
        const found = scoredJobs.find(sj => sj.id === j.id);
        return found ? { ...j, matchScore: found.matchScore } : j;
      });

      updatedAll.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      localStorage.setItem("jobs", JSON.stringify(updatedAll));
      setJobs(updatedAll);
      alert(`Agent Filter successfully scored ${scoredJobs.length} jobs against your resume!`);
    } catch (error: any) {
      console.error("Filter Error:", error);
      alert(error.message || "Failed to filter jobs.");
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
    } catch (error: any) {
      console.error(error);
      alert("Failed to generate cover letter.");
    } finally {
      setFactoryLoading(false);
    }
  };

  const handleSendCoachMessage = async () => {
    if (!chatInput.trim() || !selectedJob) return;
    const userMsg: ChatMessage = { role: "user", content: chatInput.trim() };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setChatInput("");
    setCoachLoading(true);

    try {
      const savedProfile = localStorage.getItem("my_profile");
      const resumeBase64 = savedProfile ? JSON.parse(savedProfile).resumeBase64 : "";

      const response = await fetch("/api/agents/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job: selectedJob, resumeBase64, messages: newMessages })
      });

      if (!response.ok) throw new Error("Coach agent error");
      const data = await response.json();
      setChatMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error: any) {
      console.error(error);
      alert("Failed to get interview feedback.");
    } finally {
      setCoachLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header & Actions Matching Stitch */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2 pb-2">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#171D1C] tracking-tight">Job Dashboard</h1>
          <p className="text-base text-[#545F73]">Agent Scout is actively searching for verified jobs matching your profile.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRunFilter}
            disabled={filtering}
            className="bg-white border border-[#E2E8F0] hover:bg-[#F0F5F2] text-[#171D1C] font-semibold text-sm py-2.5 px-5 rounded-xl transition-all shadow-soft hover:shadow-soft-hover flex items-center gap-2 btn-tactile disabled:opacity-50"
          >
            {filtering ? <Loader2 className="w-4 h-4 animate-spin text-[#00685F]" /> : <Filter className="w-4 h-4 text-[#00685F]" />}
            <span>Run Filter Agent</span>
          </button>

          <button
            onClick={handleRunScout}
            disabled={scouting}
            className="bg-[#00685F] hover:bg-[#005049] text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 btn-tactile disabled:opacity-50"
          >
            {scouting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Run Scout Agent</span>
          </button>
        </div>
      </section>

      {/* Stitch 6-Status Category Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLUMNS.map(({ status, icon: Icon, color, bg, border }) => {
          const columnJobs = jobs.filter(j => j.status === status);
          
          return (
            <div 
              key={status} 
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-soft p-6 flex flex-col min-h-[320px] transition-all hover:shadow-soft-hover"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center w-full mb-4 pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${bg} ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-sm text-[#171D1C] uppercase tracking-wider">{status}</h2>
                </div>
                <span className="bg-[#EAEFED] text-[#3D4947] font-semibold text-xs px-2.5 py-0.5 rounded-full">
                  {columnJobs.length}
                </span>
              </div>

              {/* Jobs List inside status card */}
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[480px]">
                {columnJobs.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#545F73]">
                    <Icon className={`w-8 h-8 ${color} opacity-30 mb-2`} />
                    <p className="text-sm font-medium">No jobs yet</p>
                    <span className="text-xs text-slate-400 mt-0.5">Jobs in this category will appear here</span>
                  </div>
                ) : (
                  columnJobs.map(job => (
                    <div 
                      key={job.id}
                      onClick={() => { setSelectedJob(job); setActiveTab("details"); }}
                      className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#00685F]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col gap-2 relative"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-sm text-[#171D1C] group-hover:text-[#00685F] transition-colors line-clamp-1">
                          {job.title}
                        </h3>
                        {job.matchScore > 0 && (
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                            job.matchScore >= 80 ? "bg-emerald-100 text-emerald-800" :
                            job.matchScore >= 60 ? "bg-amber-100 text-amber-800" :
                            "bg-slate-200 text-slate-700"
                          }`}>
                            {job.matchScore}% Match
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#545F73]">
                        <span className="flex items-center gap-1 font-medium"><Building2 className="w-3.5 h-3.5" /> {job.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 mt-1">
                        <span className="text-[10px] text-slate-400">{job.postedAt || "Recently active"}</span>
                        <span className="text-xs font-semibold text-[#00685F] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
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

      {/* JOB DETAIL & MULTI-AGENT MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-start bg-[#F8FAFC]">
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <h2 className="text-2xl font-bold text-[#171D1C]">{selectedJob.title}</h2>
                  {selectedJob.matchScore > 0 && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {selectedJob.matchScore}% Match Score
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#545F73]">
                  <span className="flex items-center gap-1"><Building2 className="w-4 h-4 text-[#00685F]" /> {selectedJob.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#00685F]" /> {selectedJob.location}</span>
                  {selectedJob.salary && <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4 text-[#00685F]" /> {selectedJob.salary}</span>}
                </div>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-[#E2E8F0] px-6 bg-white">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-3.5 px-4 font-semibold text-sm border-b-2 transition-all ${
                  activeTab === "details" ? "border-[#00685F] text-[#00685F]" : "border-transparent text-[#545F73] hover:text-[#171D1C]"
                }`}
              >
                Job Description
              </button>
              <button
                onClick={() => {
                  setActiveTab("cover_letter");
                  if (!coverLetter) handleGenerateCoverLetter(selectedJob);
                }}
                className={`py-3.5 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === "cover_letter" ? "border-[#00685F] text-[#00685F]" : "border-transparent text-[#545F73] hover:text-[#171D1C]"
                }`}
              >
                <FileText className="w-4 h-4" />
                Cover Letter Factory
              </button>
              <button
                onClick={() => setActiveTab("coach")}
                className={`py-3.5 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === "coach" ? "border-[#00685F] text-[#00685F]" : "border-transparent text-[#545F73] hover:text-[#171D1C]"
                }`}
              >
                <Bot className="w-4 h-4" />
                AI Interview Coach
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 text-sm text-[#171D1C]">
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#545F73] mb-2">Move Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {COLUMNS.map(col => (
                        <button
                          key={col.status}
                          onClick={() => updateJobStatus(selectedJob.id, col.status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            selectedJob.status === col.status
                              ? "bg-[#00685F] text-white shadow-sm"
                              : "bg-[#F0F5F2] hover:bg-[#E4E9E7] text-[#171D1C]"
                          }`}
                        >
                          {col.status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#545F73] mb-2">Role Overview & Responsibilities</h4>
                    <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] whitespace-pre-wrap leading-relaxed text-[#3D4947]">
                      {selectedJob.description || "No full job description available."}
                    </div>
                  </div>

                  {selectedJob.applyLink && (
                    <div className="pt-2">
                      <a
                        href={selectedJob.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#00685F] hover:bg-[#005049] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95"
                      >
                        Apply Directly on Official Portal <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "cover_letter" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#545F73]">Generated with Gemini 2.5 Flash mapping your experience to this job.</p>
                    <button
                      onClick={() => handleGenerateCoverLetter(selectedJob)}
                      disabled={factoryLoading}
                      className="text-xs text-[#00685F] hover:underline font-semibold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                    </button>
                  </div>

                  {factoryLoading ? (
                    <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-[#00685F]" />
                      <p className="font-semibold text-sm text-[#171D1C]">Agent Factory is drafting your tailored cover letter...</p>
                    </div>
                  ) : (
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={12}
                      className="w-full p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#171D1C] leading-relaxed font-sans text-sm focus:outline-none focus:border-[#00685F]"
                    />
                  )}
                </div>
              )}

              {activeTab === "coach" && (
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] mb-4">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-12 text-[#545F73]">
                        <Bot className="w-10 h-10 mx-auto mb-2 text-[#00685F]" />
                        <p className="font-semibold text-sm">Start your mock interview with the Hiring Manager</p>
                        <p className="text-xs text-slate-400 mt-1">Type "Hello, I am ready" below to start!</p>
                      </div>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-[#00685F] text-white rounded-br-none"
                              : "bg-white border border-[#E2E8F0] text-[#171D1C] rounded-bl-none shadow-sm"
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    {coachLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-[#E2E8F0] p-3 rounded-2xl rounded-bl-none text-xs flex items-center gap-2 text-slate-500">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00685F]" />
                          <span>Hiring Manager is evaluating your answer...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendCoachMessage()}
                      placeholder="Type your interview response..."
                      className="flex-1 p-3 rounded-xl border border-[#E2E8F0] bg-white text-sm focus:outline-none focus:border-[#00685F]"
                    />
                    <button
                      onClick={handleSendCoachMessage}
                      disabled={coachLoading || !chatInput.trim()}
                      className="bg-[#00685F] hover:bg-[#005049] text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 btn-tactile"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
