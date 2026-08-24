"use client";

import { useState } from "react";
import { Mail, MessageSquare, MessageCircle, Loader2, Building2, Send, Scale, ShieldCheck, CheckCircle2, Ticket } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [ticketId, setTicketId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setTicketId(data.ticketId || `ANV-${Date.now().toString(36).toUpperCase()}`);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Failed to send message.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-2 md:px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 bg-[#00685F]/10 dark:bg-teal-900/30 text-[#00685F] dark:text-[#2DD4BF] text-xs font-black px-3.5 py-1.5 rounded-full mb-3">
          <Scale className="w-4 h-4" />
          <span>STATUTORY GRIEVANCE & SUPPORT DESK</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#171D1C] dark:text-white tracking-tight mb-3">
          Contact & Grievance Redressal
        </h1>
        <p className="text-[#545F73] dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
          Need technical assistance or have a grievance? Our support and compliance team responds within 24 hours.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Left Column: Form (7 cols) */}
        <div className="md:col-span-7 bg-white dark:bg-[#141B20] p-6 md:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft">
          <h2 className="text-2xl font-bold text-[#171D1C] dark:text-white mb-2">Submit an Inquiry / Grievance</h2>
          <p className="text-xs text-[#545F73] dark:text-slate-400 mb-6">
            Every submission generates a unique statutory tracking ticket.
          </p>
          
          {status === "success" ? (
            <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 rounded-2xl p-6 text-center space-y-3 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/60 text-[#00685F] dark:text-[#2DD4BF] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-[#00685F] dark:text-[#2DD4BF] font-extrabold text-lg">Inquiry Logged Successfully!</h3>
              
              <div className="p-3 bg-white dark:bg-[#141B20] rounded-xl border border-teal-200 dark:border-teal-900 inline-block font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                Ticket Reference: <span className="text-[#00685F] dark:text-[#2DD4BF]">#{ticketId}</span>
              </div>

              <p className="text-[#545F73] dark:text-slate-300 text-xs leading-relaxed max-w-md mx-auto">
                Our support team and Grievance Officer have received your request. Pursuant to IT Rules 2021, ticket acknowledgment is immediate and full resolution occurs within 15 calendar days.
              </p>
              <button 
                onClick={() => setStatus("idle")} 
                className="mt-2 text-[#00685F] dark:text-[#2DD4BF] hover:underline text-xs font-bold"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-[#545F73] dark:text-slate-300 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#232D36] bg-[#F8FAFC] dark:bg-[#1A2228] text-[#171D1C] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00685F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#545F73] dark:text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#232D36] bg-[#F8FAFC] dark:bg-[#1A2228] text-[#171D1C] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00685F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#545F73] dark:text-slate-300 uppercase tracking-wider mb-2">Inquiry / Grievance Details</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today? Provide any relevant details or questions..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#232D36] bg-[#F8FAFC] dark:bg-[#1A2228] text-[#171D1C] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00685F]"
                />
              </div>

              {status === "error" && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#00685F] hover:bg-[#005049] dark:bg-[#14B8A6] dark:hover:bg-[#0D9488] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 btn-tactile disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Submit Inquiry</>}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Statutory Cards (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          
          {/* Direct Support Desk */}
          <div className="bg-white dark:bg-[#141B20] p-6 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft flex items-start gap-4">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 text-[#00685F] dark:text-[#2DD4BF] rounded-2xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#171D1C] dark:text-white mb-0.5">Corporate & Support Desk</h3>
              <p className="text-[#545F73] dark:text-slate-400 text-[11px] mb-1.5">For technical queries and product inquiries.</p>
              <a href="mailto:aneevarpsolutions@gmail.com" className="text-[#00685F] dark:text-[#2DD4BF] text-xs font-bold hover:underline">
                aneevarpsolutions@gmail.com
              </a>
            </div>
          </div>
          
          {/* Statutory Grievance Officer */}
          <div className="bg-white dark:bg-[#141B20] p-6 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-2xl">
              <Scale className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#171D1C] dark:text-white mb-0.5">Grievance & DPO Desk</h3>
              <p className="text-[#545F73] dark:text-slate-400 text-[11px]">
                <strong>Officer:</strong> P. JAGADEESWARA RAO<br />
                <strong>Designation:</strong> Head of Compliance & Operations<br />
                <strong>Jurisdiction:</strong> Hyderabad, Telangana - 500081, India
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                Statutory Timelines: Acknowledgment within 24h • Resolution within 15 days
              </p>
            </div>
          </div>

          {/* Parent Company & MCA Framework */}
          <div className="bg-white dark:bg-[#141B20] p-6 rounded-3xl border border-[#E2E8F0] dark:border-[#232D36] shadow-soft flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#171D1C] dark:text-white mb-0.5">Parent Entity</h3>
              <p className="text-[#545F73] dark:text-slate-400 text-[11px] mb-1">Operating Organization</p>
              <span className="text-xs font-bold text-[#171D1C] dark:text-white">Aneevarp Solutions</span>
              <p className="text-[10px] text-slate-400 mt-1">Country of Origin: India</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
