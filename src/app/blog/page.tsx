import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { Clock, Tag, BookOpen, ShieldCheck, ArrowRight, UserCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career & AI Insights | Expert Hiring Guides by Aneevarp Solutions",
  description: "Read expert guides on beating Applicant Tracking Systems, mastering behavioral interviews with STAR, and leveraging autonomous AI for job searching.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Career & AI Insights | Aneevarp Solutions",
    description: "Expert guides on ATS optimization, behavioral interviews, and AI job automation.",
    url: "https://ai-job-search-agent-chi.vercel.app/blog",
    type: "website",
  }
};

export default function BlogIndex() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs text-teal-300 mb-4 border border-teal-500/30">
          <BookOpen className="w-4 h-4" />
          <span>Aneevarp Solutions Career Research Lab</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Career & AI Insights</h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          In-depth, data-backed guides to navigating the modern job market, optimizing your resume for AI parsers, and mastering executive interviews.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.slug} 
            className="glass p-8 rounded-3xl block group hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                  {post.author.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-200">{post.author.name}</span>
                  <span className="text-[10px] text-slate-400">{post.date}</span>
                </div>
              </div>

              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-transform"
                aria-label={`Read ${post.title}`}
              >
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* AdSense Placement Section (Compliant display container) */}
      <aside 
        aria-label="Sponsored Content" 
        className="mt-16 p-6 rounded-2xl glass border border-white/10 text-center text-xs text-slate-400"
      >
        <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400 block mb-2">Advertisements & Career Resources</span>
        <p className="text-slate-400">AdSense auto-ads or relevant career partner resources will appear here non-intrusively.</p>
      </aside>
    </div>
  );
}
