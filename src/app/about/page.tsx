import { Target, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          We built this platform to level the playing field for job seekers by giving everyone access to autonomous, AI-driven career tools.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="glass p-8 rounded-2xl text-center">
          <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-teal-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Our Mission</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            To eliminate the tedious, repetitive tasks of job hunting so candidates can focus on what actually matters: preparing for the interview and landing the offer.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl text-center">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">The Technology</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Powered by Google Gemini 2.5 Flash, our 4 autonomous agents (Scout, Filter, Factory, and Coach) run entirely in your browser using a Zero-Backend architecture.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Privacy First</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            We never store your resume or personal data on our servers. Everything happens locally, ensuring you retain 100% control over your career data.
          </p>
        </div>
      </div>
      
      <div className="glass p-10 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Who is behind this?</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          This platform was created by a team of software engineers and career strategists who experienced the burnout of modern job searching firsthand. We realized that while recruiters were using AI to filter out candidates, candidates didn't have AI tools to fight back.
        </p>
        <p className="text-slate-300 leading-relaxed">
          The AI Job Search Agent is our solution. We hope it helps you find your next great opportunity.
        </p>
      </div>
    </div>
  );
}
