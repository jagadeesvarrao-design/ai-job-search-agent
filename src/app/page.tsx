import Link from "next/link";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="glass px-6 py-2 rounded-full mb-8 inline-flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-medium text-slate-200">Your AI-Powered Job Search Co-pilot</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
        Automate your <br className="hidden md:block" />
        <span className="text-gradient">Job Hunt</span> end-to-end
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
        Upload your profile and let our multi-agent pipeline discover, filter, and apply to the best opportunities for you. Prepare with tailored mock interviews.
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          { icon: Target, title: "Smart Discovery", desc: "Agent Scout finds top jobs matching your unique profile and preferences." },
          { icon: Zap, title: "Automated Tailoring", desc: "Agent Factory generates perfectly tailored resumes and cover letters in seconds." },
          { icon: Sparkles, title: "Mock Interviews", desc: "Agent Coach runs interactive interviews based on the specific job description." }
        ].map((feature, i) => (
          <div key={i} className="glass p-8 rounded-2xl text-left hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <feature.icon className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
