import { blogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, UserCheck, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import AdContainer from "@/components/AdContainer";

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

  // Schema.org Article & Breadcrumbs JSON-LD
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

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.trim().startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl md:text-2xl font-bold text-[#1A1F1F] mt-8 mb-3 tracking-tight">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      let formatted = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1A1F1F] font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-[#476550] italic">$1</em>');

      if (paragraph.trim().startsWith('- ')) {
        const listItems = paragraph.split('\n').map(item => item.replace('- ', ''));
        return (
          <ul key={idx} className="list-disc pl-6 mb-6 space-y-2 text-[#596060] text-base leading-relaxed">
            {listItems.map((li, i) => (
              <li 
                key={i} 
                dangerouslySetInnerHTML={{ 
                  __html: li
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1A1F1F] font-semibold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="text-[#476550] italic">$1</em>') 
                }} 
              />
            ))}
          </ul>
        );
      }

      return (
        <p 
          key={idx} 
          className="text-[#596060] leading-relaxed mb-6 text-base md:text-lg" 
          dangerouslySetInnerHTML={{ __html: formatted }} 
        />
      );
    });
  };

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto py-8 px-2 md:px-4">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#596060] mb-6 overflow-x-auto">
        <Link href="/" className="hover:text-[#476550] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/blog" className="hover:text-[#476550] transition-colors">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#476550] font-semibold truncate max-w-[220px] md:max-w-md">{post.title}</span>
      </nav>

      {/* HEADER SECTION */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#E8F0EB] text-[#476550] border border-teal-100">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#596060]">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#596060]">
            <Calendar className="w-3.5 h-3.5" />
            Updated {post.lastUpdated}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A1F1F] mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-[#596060] leading-relaxed mb-6 font-light">
          {post.excerpt}
        </p>

        {/* E-E-A-T AUTHOR & REVIEWER BYLINE */}
        <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#D8E2DA] shadow-soft flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D5E0F8] text-[#476550] flex items-center justify-center font-bold text-sm">
              {post.author.avatar}
            </div>
            <div>
              <div className="text-sm font-bold text-[#1A1F1F] flex items-center gap-2">
                {post.author.name}
                <span className="text-[10px] bg-[#E8F0EB] text-[#476550] px-2 py-0.5 rounded-full font-semibold border border-teal-100">
                  Verified Author
                </span>
              </div>
              <p className="text-xs text-[#596060]">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#596060] bg-[#F4F4F0] px-3 py-1.5 rounded-xl border border-slate-200">
            <UserCheck className="w-4 h-4 text-[#476550]" />
            <span>Fact Checked by {post.reviewedBy}</span>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-3xl border border-[#D8E2DA] shadow-soft">
        {renderContent(post.content)}

        {/* AD PLACEMENT (Auto-Hidden for Pro Subscribers) */}
        <AdContainer slotId="8472910384" format="auto" />
      </div>

      {/* E-E-A-T AUTHOR BIO BOX */}
      <section aria-label="About the Author" className="mt-10 bg-[#FAF9F6] p-8 rounded-3xl border border-[#D8E2DA] shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#D5E0F8] text-[#476550] flex items-center justify-center font-bold text-xl flex-shrink-0">
            {post.author.avatar}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="text-lg font-bold text-[#1A1F1F]">{post.author.name}</h4>
              <span className="text-xs text-[#476550] font-semibold">({post.author.experience})</span>
            </div>
            <p className="text-xs text-[#596060] mb-2">{post.author.role}</p>
            <p className="text-sm text-[#596060] leading-relaxed">{post.author.bio}</p>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="mt-12 pt-8 border-t border-[#D8E2DA]">
        <h3 className="text-2xl font-bold text-[#1A1F1F] mb-6">Related Career Guides</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {otherPosts.map((other) => (
            <Link 
              key={other.slug} 
              href={`/blog/${other.slug}`}
              className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#D8E2DA] shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all block group"
            >
              <span className="text-[11px] font-bold text-[#476550] block mb-2">{other.category}</span>
              <h4 className="text-lg font-bold text-[#1A1F1F] group-hover:text-[#476550] transition-colors mb-2 leading-snug">
                {other.title}
              </h4>
              <p className="text-xs text-[#596060] line-clamp-2">{other.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
