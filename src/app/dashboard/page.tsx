"use client";
import { useState, useEffect } from "react";
import { Briefcase, MoreHorizontal, Building2, MapPin, IndianRupee, Clock } from "lucide-react";

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

const COLUMNS: JobStatus[] = ["New Matches", "Saved", "Applied", "Interviewing", "Offers", "Rejected"];

type ChatMessage = { role: "user" | "assistant", content: string };

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [scouting, setScouting] = useState(false);
  const [filtering, setFiltering] = useState(false);
  
  // Job Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [factoryLoading, setFactoryLoading] = useState(false);

  // Agent E State
  const [interviewMode, setInterviewMode] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [coachLoading, setCoachLoading] = useState(false);

  // Fetch jobs from localStorage on mount
  const fetchJobs = () => {
    try {
      const savedJobs = localStorage.getItem("jobs");
      if (savedJobs) {
        const parsedJobs: Job[] = JSON.parse(savedJobs);
        // Sort by matchScore descending
        parsedJobs.sort((a, b) => b.matchScore - a.matchScore);
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
      // 1. Fetch user profile from localStorage
      const savedProfile = localStorage.getItem("my_profile");
      if (!savedProfile) {
        alert("Please set up your profile first!");
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

      // 2. Call Scout Agent API
      const response = await fetch("/api/agents/scout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, location })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // 3. Save new jobs to localStorage
      const savedJobsString = localStorage.getItem("jobs");
      let currentJobs: Job[] = savedJobsString ? JSON.parse(savedJobsString) : [];
      
      // Remove previous 'New Matches' as requested by user
      currentJobs = currentJobs.filter(j => j.status !== "New Matches");
      
      for (const newJob of result.jobs) {
        // Prevent duplicates across all columns
        if (!currentJobs.find(j => j.id === newJob.id)) {
          currentJobs.push(newJob);
        }
      }

      localStorage.setItem("jobs", JSON.stringify(currentJobs));

      alert(`Agent Scout found ${result.jobs.length} new jobs!`);
      
      // 4. Refresh board
      fetchJobs();
      
    } catch (error) {
      console.error("Agent Scout Failed:", error);
      alert("Agent Scout encountered an error. Please check the console.");
    } finally {
      setScouting(false);
    }
  };

  const handleRunFilter = async () => {
    setFiltering(true);
    try {
      const savedProfile = localStorage.getItem("my_profile");
      if (!savedProfile) {
        alert("Please set up your profile first!");
        return;
      }

      const profileDoc = JSON.parse(savedProfile);
      if (!profileDoc.resumeBase64) {
        alert("Please upload your PDF resume in your profile first.");
        return;
      }

      // Get jobs that need scoring (all New Matches)
      const jobsToScore = jobs.filter(j => j.status === "New Matches" && j.matchScore === 0);
      if (jobsToScore.length === 0) {
        alert("No unscored jobs in 'New Matches' to filter!");
        return;
      }

      // Call Filter Agent
      const response = await fetch("/api/agents/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs: jobsToScore, resumeBase64: profileDoc.resumeBase64 })
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      // Update local storage with new scores
      const savedJobsString = localStorage.getItem("jobs");
      let currentJobs: Job[] = savedJobsString ? JSON.parse(savedJobsString) : [];
      
      for (const scoredJob of result.jobs) {
        const index = currentJobs.findIndex(j => j.id === scoredJob.id);
        if (index !== -1) {
          currentJobs[index].matchScore = scoredJob.matchScore;
        }
      }

      localStorage.setItem("jobs", JSON.stringify(currentJobs));
      alert(`Agent Filter successfully analyzed ${result.jobs.length} jobs against your resume!`);
      fetchJobs();

    } catch (error) {
      console.error("Agent Filter Failed:", error);
      alert("Agent Filter encountered an error. Please check the console.");
    } finally {
      setFiltering(false);
    }
  };

  const handleRunFactory = async () => {
    if (!selectedJob) return;
    setFactoryLoading(true);
    setCoverLetter("");
    
    try {
      const savedProfile = localStorage.getItem("my_profile");
      if (!savedProfile) return;
      const profileDoc = JSON.parse(savedProfile);
      
      const response = await fetch("/api/agents/factory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job: selectedJob, resumeBase64: profileDoc.resumeBase64 })
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      setCoverLetter(result.coverLetter);
    } catch (error) {
      console.error("Agent Factory Failed:", error);
      alert("Failed to generate cover letter.");
    } finally {
      setFactoryLoading(false);
    }
  };

  const handleSaveJob = (jobToSave: Job) => {
    const savedJobsString = localStorage.getItem("jobs");
    let currentJobs: Job[] = savedJobsString ? JSON.parse(savedJobsString) : [];
    
    const index = currentJobs.findIndex(j => j.id === jobToSave.id);
    if (index !== -1) {
      currentJobs[index].status = "Saved";
    }
    
    localStorage.setItem("jobs", JSON.stringify(currentJobs));
    fetchJobs();
    setSelectedJob(null);
  };

  const handleApply = (jobToApply: Job) => {
    // 1. Move to Applied
    const savedJobsString = localStorage.getItem("jobs");
    let currentJobs: Job[] = savedJobsString ? JSON.parse(savedJobsString) : [];
    
    const index = currentJobs.findIndex(j => j.id === jobToApply.id);
    if (index !== -1) {
      currentJobs[index].status = "Applied";
    }
    
    localStorage.setItem("jobs", JSON.stringify(currentJobs));
    fetchJobs();

    // 2. Copy Cover Letter to Clipboard if generated
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      alert("Cover Letter copied to clipboard! Job moved to 'Applied' column.");
    } else {
      alert("Job moved to 'Applied' column.");
    }

    // 3. Open the apply link (or fallback to Google if none)
    const url = jobToApply.applyLink || `https://www.google.com/search?q=${encodeURIComponent(jobToApply.company + " " + jobToApply.title + " careers apply")}`;
    window.open(url, "_blank");
    
    setSelectedJob(null);
  };

  const startInterview = async () => {
    if (!selectedJob) return;
    setInterviewMode(true);
    setChatMessages([]);
    setCoachLoading(true);
    
    try {
      const savedProfile = localStorage.getItem("my_profile");
      const profileDoc = savedProfile ? JSON.parse(savedProfile) : {};
      
      const initialMessage: ChatMessage = { role: "user", content: "Hi, I am ready to begin the interview." };
      setChatMessages([initialMessage]);

      const response = await fetch("/api/agents/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          job: selectedJob, 
          resumeBase64: profileDoc.resumeBase64,
          messages: [initialMessage] 
        })
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      setChatMessages([initialMessage, { role: "assistant", content: result.reply }]);
    } catch (error) {
      console.error(error);
      alert("Failed to start interview.");
      setInterviewMode(false);
    } finally {
      setCoachLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !selectedJob) return;
    
    const newMessages: ChatMessage[] = [...chatMessages, { role: "user", content: chatInput }];
    setChatMessages(newMessages);
    setChatInput("");
    setCoachLoading(true);

    try {
      const savedProfile = localStorage.getItem("my_profile");
      const profileDoc = savedProfile ? JSON.parse(savedProfile) : {};

      const response = await fetch("/api/agents/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          job: selectedJob, 
          resumeBase64: profileDoc.resumeBase64,
          messages: newMessages 
        })
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      setChatMessages([...newMessages, { role: "assistant", content: result.reply }]);
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    } finally {
      setCoachLoading(false);
    }
  };

  const getJobsByStatus = (status: JobStatus) => {
    return jobs.filter(job => job.status === status);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-teal-400 bg-teal-400/10 border-teal-400/20";
    if (score >= 80) return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    return "text-slate-400 bg-slate-400/10 border-slate-400/20";
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Job Dashboard</h1>
          <p className="text-slate-400 mt-1">Agent Scout is actively searching for jobs matching your profile.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleRunScout}
            disabled={scouting}
            className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg shadow-teal-500/25 flex items-center gap-2"
          >
            {scouting ? "Scouting..." : "Run Scout Agent"}
          </button>
          <button 
            onClick={handleRunFilter}
            disabled={filtering}
            className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2"
          >
            {filtering ? "Filtering..." : "Run Filter Agent"}
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
        {COLUMNS.map((column) => (
          <div key={column} className="flex-shrink-0 w-80 flex flex-col gap-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{column}</h2>
              <span className="bg-black/40 text-slate-400 text-xs py-1 px-2.5 rounded-full font-medium">
                {getJobsByStatus(column).length}
              </span>
            </div>

            {/* Column Body */}
            <div className="flex-1 flex flex-col gap-4 min-h-[500px]">
              {getJobsByStatus(column).map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job)}
                  className="glass p-5 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getScoreColor(job.matchScore)}`}>
                      {job.matchScore > 0 ? `${job.matchScore}% Match` : "Unscored"}
                    </div>
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="font-bold text-white text-lg mb-1 group-hover:text-teal-400 transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Building2 className="w-4 h-4 text-slate-500" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <IndianRupee className="w-4 h-4 text-slate-500" />
                        <span>{job.salary}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>{job.postedAt}</span>
                      </div>
                      {job.source && (
                        <div className="text-xs font-medium px-2 py-0.5 rounded bg-white/5 text-slate-300">
                          {job.source.replace(/^via\s+/i, '')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {getJobsByStatus(column).length === 0 && (
                <div className="border-2 border-dashed border-white/5 rounded-2xl h-32 flex items-center justify-center">
                  <span className="text-sm text-slate-500">No jobs yet</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass w-full max-w-3xl max-h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedJob.title}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <span className="flex items-center gap-1"><Building2 className="w-4 h-4"/> {selectedJob.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {selectedJob.location}</span>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedJob(null); setInterviewMode(false); }}
                className="text-slate-400 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
              {!interviewMode ? (
                <>
                  <div className="flex flex-wrap gap-3 items-center bg-black/20 p-4 rounded-xl border border-white/5">
                    <div className="flex-1 min-w-[120px]">
                      <div className="text-sm text-slate-400 mb-1">Match Score</div>
                      <div className={`text-xl font-bold ${getScoreColor(selectedJob.matchScore).split(' ')[0]}`}>
                        {selectedJob.matchScore > 0 ? `${selectedJob.matchScore}%` : "Not Scored Yet"}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedJob.status === "New Matches" && (
                        <button 
                          onClick={() => handleSaveJob(selectedJob)}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
                        >
                          Save Job
                        </button>
                      )}
                      <button 
                        onClick={startInterview}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2"
                      >
                        Practice Interview
                      </button>
                      <button 
                        onClick={handleRunFactory}
                        disabled={factoryLoading}
                        className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
                      >
                        {factoryLoading ? "Agent Generating..." : "Generate Letter"}
                      </button>
                      <button 
                        onClick={() => handleApply(selectedJob)}
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-green-500/25 flex items-center gap-2"
                      >
                        {coverLetter ? "Copy & Apply" : "Apply Now"}
                      </button>
                    </div>
                  </div>

                  {coverLetter && (
                    <div className="space-y-3 animate-in slide-in-from-top-4 duration-500">
                      <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                        ✨ Tailored Cover Letter
                      </h3>
                      <div className="bg-black/40 p-6 rounded-xl border border-white/5 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-serif">
                        {coverLetter}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/5 pb-2">Job Description</h3>
                    <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedJob.description}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col h-[500px]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                      🎙️ Mock Interview
                    </h3>
                    <button 
                      onClick={() => setInterviewMode(false)}
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      Exit Interview
                    </button>
                  </div>
                  
                  <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-4 overflow-y-auto mb-4 space-y-4 custom-scrollbar">
                    {chatMessages.length === 0 && !coachLoading && (
                      <div className="text-center text-slate-500 mt-10">Starting interview...</div>
                    )}
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${
                          msg.role === 'user' 
                            ? 'bg-amber-600 text-white rounded-br-sm' 
                            : 'bg-white/10 text-slate-200 rounded-bl-sm border border-white/5'
                        }`}>
                          <div className="text-xs opacity-70 mb-1 font-medium">
                            {msg.role === 'user' ? 'You' : 'Hiring Manager (Agent E)'}
                          </div>
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                        </div>
                      </div>
                    ))}
                    {coachLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/5 text-slate-400 rounded-2xl p-4 rounded-bl-sm border border-white/5 flex items-center gap-2">
                          <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <textarea 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your answer here... (Press Enter to send)"
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none h-12 custom-scrollbar"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || coachLoading}
                      className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-6 rounded-xl font-medium transition-all"
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
