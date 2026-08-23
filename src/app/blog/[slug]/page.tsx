import { blogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, ShieldCheck, UserCheck, Share2, BookOpen, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | AI Job Search Agent`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://ai-job-search-agent-chi.vercel.app/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastUpdated,
      authors: [post.author.name],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    }
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Schema.org Article / BlogPosting & BreadcrumbList JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://ai-job-search-agent-chi.vercel.app/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "dateModified": post.lastUpdated,
        "mainEntityOfPage": `https://ai-job-search-agent-chi.vercel.app/blog/${post.slug}`,
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "jobTitle": post.author.role,
          "description": post.author.bio
        },
        "publisher": {
          "@type": "Organization",
          "name": "Aneevarp Solutions",
          "url": "https://ai-job-search-agent-chi.vercel.app",
          "logo": {
            "@type": "ImageObject",
            "url": "https://ai-job-search-agent-chi.vercel.app/icon.png"
          }
        },
        "articleSection": post.category,
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://ai-job-search-agent-chi.vercel.app/blog/${post.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ai-job-search-agent-chi.vercel.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://ai-job-search-agent-chi.vercel.app/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://ai-job-search-agent-chi.vercel.app/blog/${post.slug}`
          }
        ]
      }
    ]
  };

  // Structured Markdown Parser
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.trim().startsWith('### ')) {
        return (
          <h3 key={idx} className="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      let formatted = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-teal-300 italic">$1</em>');

      if (paragraph.trim().startsWith('- ')) {
        const listItems = paragraph.split('\n').map(item => item.replace('- ', ''));
        return (
          <ul key={idx} className="list-disc pl-6 mb-6 space-y-2 text-slate-300 text-base leading-relaxed">
            {listItems.map((li, i) => (
              <li 
                key={i} 
                dangerouslySetInnerHTML={{ 
                  __html: li
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="text-teal-300 italic">$1</em>') 
                }} 
              />
            ))}
          </ul>
        );
      }

      return (
        <p 
          key={idx} 
          className="text-slate-300 leading-relaxed mb-6 text-base md:text-lg" 
          dangerouslySetInnerHTML={{ __html: formatted }} 
        />
      );
    });
  };

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
      {/* Schema.org Article & Breadcrumbs Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-teal-400 font-medium truncate max-w-[200px] md:max-w-md">{post.title}</span>
      </nav>

      {/* HEADER SECTION */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {post.readTime}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Updated {post.lastUpdated}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 font-light">
          {post.excerpt}
        </p>

        {/* E-E-A-T AUTHOR & REVIEWER BYLINE */}
        <div className="glass p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
              {post.author.avatar}
            </div>
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                {post.author.name}
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-normal border border-teal-500/30">
                  Verified Author
                </span>
              </div>
              <p className="text-xs text-slate-400">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
            <UserCheck className="w-4 h-4 text-teal-400" />
            <span>Fact Checked by {post.reviewedBy}</span>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
        {renderContent(post.content)}

        {/* AD PLACEMENT PLACEHOLDER (Google AdSense in-article container) */}
        <aside 
          aria-label="Advertisement" 
          className="my-10 p-6 rounded-2xl bg-slate-900/50 border border-dashed border-white/15 text-center text-xs text-slate-400"
        >
          <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400 block mb-1">Sponsored Advertisement</span>
          <p className="text-slate-400">Contextual AdSense units will render here automatically after approval.</p>
        </aside>
      </div>

      {/* E-E-A-T AUTHOR BIO BOX */}
      <section aria-label="About the Author" className="mt-12 glass p-8 rounded-3xl border border-teal-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center font-bold text-xl text-white flex-shrink-0 shadow-lg shadow-teal-500/20">
            {post.author.avatar}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="text-lg font-bold text-white">{post.author.name}</h4>
              <span className="text-xs text-teal-400 font-medium">({post.author.experience})</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">{post.author.role}</p>
            <p className="text-sm text-slate-300 leading-relaxed">{post.author.bio}</p>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="mt-16 pt-10 border-t border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6">Related Career Guides</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {otherPosts.map((other) => (
            <Link 
              key={other.slug} 
              href={`/blog/${other.slug}`}
              className="glass p-6 rounded-2xl block hover:-translate-y-1 transition-transform border border-white/10 group"
            >
              <span className="text-[11px] font-semibold text-teal-400 block mb-2">{other.category}</span>
              <h4 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors mb-2 leading-snug">
                {other.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">{other.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
