import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { Clock, Tag, BookOpen, ArrowRight } from "lucide-react";
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
    <div className="max-w-5xl mx-auto py-8 px-2 md:px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1A2E26] shadow-soft px-4 py-1.5 rounded-full text-xs text-[#476550] dark:text-[#2DD4BF] font-semibold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Aneevarp Solutions Career Research Lab</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#1A1F1F] dark:text-white tracking-tight">Career & AI Insights</h1>
        <p className="text-[#596060] dark:text-[#CBD5E1] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          In-depth, data-backed guides to navigating the modern job market, optimizing your resume for AI parsers, and mastering executive interviews.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-[#FAF9F6] dark:bg-[#0D1714] p-8 rounded-3xl border border-[#D8E2DA] dark:border-[#1A2E26] shadow-soft hover:shadow-soft-hover hover:border-[#476550]/40 dark:hover:border-[#2DD4BF]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#E8F0EB] dark:bg-[#121E1A] text-[#476550] dark:text-[#2DD4BF] border border-teal-100 dark:border-[#2DD4BF]/20">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#596060] dark:text-[#94A3B8]">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#1A1F1F] dark:text-white mb-3 group-hover:text-[#476550] dark:group-hover:text-[#2DD4BF] transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-[#596060] dark:text-[#CBD5E1] text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#1A2E26] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#D5E0F8] dark:bg-[#121E1A] text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center text-xs font-bold border border-transparent dark:border-[#2DD4BF]/20">
                  {post.author.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1A1F1F] dark:text-white">{post.author.name}</span>
                  <span className="text-[11px] text-[#596060] dark:text-[#94A3B8]">{post.date}</span>
                </div>
              </div>

              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#476550] dark:text-[#2DD4BF] group-hover:translate-x-1 transition-transform"
                aria-label={`Read ${post.title}`}
              >
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* AdSense Placement Section */}
      <aside 
        aria-label="Sponsored Content" 
        className="mt-16 p-6 rounded-2xl bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1A2E26] shadow-soft text-center text-xs text-[#596060] dark:text-[#CBD5E1]"
      >
        <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400 dark:text-[#94A3B8] block mb-1">Advertisements & Career Resources</span>
        <p className="text-slate-500 dark:text-[#94A3B8]">AdSense auto-ads or relevant career partner resources will appear here non-intrusively.</p>
      </aside>
    </div>
  );
}
