"use client";

import { useState } from "react";
import { Mail, MessageSquare, MessageCircle, Loader2 } from "lucide-react";

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
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-slate-400 text-lg">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          
          {status === "success" ? (
            <div className="bg-teal-500/10 border border-teal-500/50 rounded-xl p-6 text-center">
              <h3 className="text-teal-400 font-bold text-xl mb-2">Message Sent!</h3>
              <p className="text-slate-300">We've received your message and will get back to you shortly.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-teal-400 hover:underline text-sm">Send another message</button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500" 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500" 
                  placeholder="your@email.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea 
                  rows={5} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500" 
                  placeholder="How can we help?"
                ></textarea>
              </div>
              
              {status === "error" && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass p-8 rounded-2xl flex items-start gap-4">
            <Mail className="w-8 h-8 text-teal-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-1">Email Support</h3>
              <p className="text-slate-400 text-sm mb-2">For technical issues or general inquiries.</p>
              <a href="mailto:support.zenresume@gmail.com" className="text-teal-400 hover:underline">support.zenresume@gmail.com</a>
            </div>
          </div>
          
          <div className="glass p-8 rounded-2xl flex items-start gap-4">
            <MessageCircle className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-1">Socials</h3>
              <p className="text-slate-400 text-sm mb-2">Follow us for updates and tips.</p>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@AIJobAgent</a>
            </div>
          </div>

          <div className="glass p-8 rounded-2xl flex items-start gap-4">
            <MessageSquare className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-1">FAQ</h3>
              <p className="text-slate-400 text-sm">Most questions regarding the Zero-Backend architecture and API keys are answered on our About page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
