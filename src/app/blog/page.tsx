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
        <div className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] shadow-soft px-4 py-1.5 rounded-full text-xs text-[#00685F] font-semibold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Aneevarp Solutions Career Research Lab</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#171D1C] tracking-tight">Career & AI Insights</h1>
        <p className="text-[#545F73] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          In-depth, data-backed guides to navigating the modern job market, optimizing your resume for AI parsers, and mastering executive interviews.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-[#00685F] border border-teal-100">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#545F73]">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#171D1C] mb-3 group-hover:text-[#00685F] transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-[#545F73] text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#D5E0F8] text-[#00685F] flex items-center justify-center text-xs font-bold">
                  {post.author.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#171D1C]">{post.author.name}</span>
                  <span className="text-[11px] text-[#545F73]">{post.date}</span>
                </div>
              </div>

              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00685F] group-hover:translate-x-1 transition-transform"
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
        className="mt-16 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-soft text-center text-xs text-[#545F73]"
      >
        <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400 block mb-1">Advertisements & Career Resources</span>
        <p className="text-slate-500">AdSense auto-ads or relevant career partner resources will appear here non-intrusively.</p>
      </aside>
    </div>
  );
}
