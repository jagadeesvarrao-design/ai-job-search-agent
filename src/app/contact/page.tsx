"use client";

import { Mail, MessageSquare, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-slate-400 text-lg">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
              <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea rows={5} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" onClick={() => alert("Message sent! We'll get back to you soon.")} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-2">
              Send Message
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass p-8 rounded-2xl flex items-start gap-4">
            <Mail className="w-8 h-8 text-teal-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-1">Email Support</h3>
              <p className="text-slate-400 text-sm mb-2">For technical issues or general inquiries.</p>
              <a href="mailto:support@jobagent.com" className="text-teal-400 hover:underline">support@jobagent.com</a>
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
