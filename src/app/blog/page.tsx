import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function BlogIndex() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Career & AI Insights</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Expert advice on navigating the modern job market, optimizing your resume for AI, and mastering the interview process.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="glass p-8 rounded-2xl block group hover:-translate-y-1 transition-transform">
            <p className="text-teal-400 text-sm font-medium mb-3">{post.date}</p>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-teal-400 transition-colors">{post.title}</h2>
            <p className="text-slate-400 leading-relaxed">{post.excerpt}</p>
            <div className="mt-6 flex items-center gap-2 text-teal-400 font-medium">
              Read Article &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
