import Link from "next/link";
import { ArrowRight, Sparkles, Target, Zap, Bot, BrainCircuit, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full text-center px-4">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] py-20">
        <div className="glass px-6 py-2 rounded-full mb-8 inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-slate-200">Your AI-Powered Job Search Co-pilot</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl leading-tight">
          Automate your <br className="hidden md:block" />
          <span className="text-gradient">Job Hunt</span> end-to-end
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Upload your resume and let our autonomous AI agents discover, filter, and write personalized cover letters for the best opportunities. Never manually search again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link 
            href="/profile" 
            className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
          >
            Setup Profile <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/dashboard" 
            className="glass glass-hover text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 flex flex-col items-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">4 Autonomous AI Agents</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Our multi-agent architecture handles the heavy lifting of your job search, operating entirely in your browser.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {[
            { icon: Target, title: "1. Agent Scout", desc: "Scours the web using Google Jobs API to find live, highly-relevant job postings in your city." },
            { icon: BrainCircuit, title: "2. Agent Filter", desc: "Reads your resume and scores every job out of 100 based on exact skill overlap and requirements." },
            { icon: Zap, title: "3. Agent Factory", desc: "Instantly writes a hyper-personalized, 3-paragraph cover letter mapping your experience to the job." },
            { icon: Bot, title: "4. Agent Coach", desc: "Simulates a live technical or behavioral interview, grading your answers in real-time." }
          ].map((feature, i) => (
            <div key={i} className="glass p-8 rounded-2xl text-left hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
              <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <feature.icon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ZERO-BACKEND PRIVACY SECTION */}
      <section className="py-20 w-full max-w-5xl mx-auto text-left">
        <div className="glass p-10 md:p-16 rounded-3xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute -left-32 -top-32 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
          
          <div className="flex-1 z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">100% Data Privacy.<br/>Zero Server Storage.</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              We built this platform using a revolutionary "Zero-Backend" architecture. When you upload your PDF resume, it is encoded directly in your browser. 
              We never save your resume to a database, and we never store your personal data on our servers.
            </p>
            <ul className="space-y-4">
              {[
                "No databases, no cloud storage.",
                "Your resume stays in your browser's local storage.",
                "Direct, stateless connection to the Gemini AI API.",
                "Instantly wiped when you clear your cache."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 z-10 flex justify-center">
             <div className="w-64 h-64 bg-gradient-to-br from-teal-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_100px_rgba(20,184,166,0.2)]">
                <ShieldCheck className="w-24 h-24 text-teal-400/80" />
             </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6">Ready to land your dream job?</h2>
        <p className="text-slate-400 mb-10 max-w-xl">Stop scrolling through endless job boards. Let our AI agents do the heavy lifting so you can focus on acing the interview.</p>
        <Link 
          href="/dashboard" 
          className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 text-white px-10 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
        >
          <Target className="w-6 h-6" /> Start Your Automated Search
        </Link>
      </section>
    </div>
  );
}
