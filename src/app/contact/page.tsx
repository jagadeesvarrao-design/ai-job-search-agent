"use client";

import { useState } from "react";
import { Mail, MessageSquare, MessageCircle, Loader2, Building2, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Failed to send message.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-2 md:px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#171D1C] tracking-tight mb-3">Contact Us</h1>
        <p className="text-[#545F73] text-base md:text-lg">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-soft">
          <h2 className="text-2xl font-bold text-[#171D1C] mb-6">Send us a message</h2>
          
          {status === "success" ? (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center">
              <h3 className="text-[#00685F] font-bold text-lg mb-2">Message Sent!</h3>
              <p className="text-[#545F73] text-sm">We've received your message and will get back to you shortly.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-[#00685F] hover:underline text-xs font-semibold">Send another message</button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-[#545F73] uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 text-[#171D1C] text-sm focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20" 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#545F73] uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 text-[#171D1C] text-sm focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20" 
                  placeholder="your@email.com" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#545F73] uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 text-[#171D1C] text-sm focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20" 
                  placeholder="How can we help?"
                ></textarea>
              </div>
              
              {status === "error" && (
                <p className="text-red-600 text-xs font-medium">{errorMessage}</p>
              )}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="bg-[#00685F] hover:bg-[#005049] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 btn-tactile disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-soft flex items-start gap-4">
            <div className="p-3 bg-teal-50 text-[#00685F] rounded-2xl">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#171D1C] mb-1">Direct Support</h3>
              <p className="text-[#545F73] text-xs mb-2">For technical assistance or questions.</p>
              <a href="mailto:support.zenresume@gmail.com" className="text-[#00685F] text-sm font-semibold hover:underline">
                support.zenresume@gmail.com
              </a>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-soft flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#171D1C] mb-1">Parent Company</h3>
              <p className="text-[#545F73] text-xs mb-1">Operating Organization</p>
              <span className="text-sm font-bold text-[#171D1C]">Aneevarp Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
