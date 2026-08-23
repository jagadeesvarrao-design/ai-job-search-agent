import { blogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, UserCheck, ChevronRight } from "lucide-react";
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
          <h3 key={idx} className="text-xl md:text-2xl font-bold text-[#171D1C] mt-8 mb-3 tracking-tight">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      let formatted = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#171D1C] font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-[#00685F] italic">$1</em>');

      if (paragraph.trim().startsWith('- ')) {
        const listItems = paragraph.split('\n').map(item => item.replace('- ', ''));
        return (
          <ul key={idx} className="list-disc pl-6 mb-6 space-y-2 text-[#3D4947] text-base leading-relaxed">
            {listItems.map((li, i) => (
              <li 
                key={i} 
                dangerouslySetInnerHTML={{ 
                  __html: li
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#171D1C] font-semibold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="text-[#00685F] italic">$1</em>') 
                }} 
              />
            ))}
          </ul>
        );
      }

      return (
        <p 
          key={idx} 
          className="text-[#3D4947] leading-relaxed mb-6 text-base md:text-lg" 
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
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#545F73] mb-6 overflow-x-auto">
        <Link href="/" className="hover:text-[#00685F] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/blog" className="hover:text-[#00685F] transition-colors">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#00685F] font-semibold truncate max-w-[220px] md:max-w-md">{post.title}</span>
      </nav>

      {/* HEADER SECTION */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-[#00685F] border border-teal-100">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#545F73]">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#545F73]">
            <Calendar className="w-3.5 h-3.5" />
            Updated {post.lastUpdated}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-[#171D1C] mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-[#545F73] leading-relaxed mb-6 font-light">
          {post.excerpt}
        </p>

        {/* E-E-A-T AUTHOR & REVIEWER BYLINE */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-soft flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D5E0F8] text-[#00685F] flex items-center justify-center font-bold text-sm">
              {post.author.avatar}
            </div>
            <div>
              <div className="text-sm font-bold text-[#171D1C] flex items-center gap-2">
                {post.author.name}
                <span className="text-[10px] bg-teal-50 text-[#00685F] px-2 py-0.5 rounded-full font-semibold border border-teal-100">
                  Verified Author
                </span>
              </div>
              <p className="text-xs text-[#545F73]">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#545F73] bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-slate-200">
            <UserCheck className="w-4 h-4 text-[#00685F]" />
            <span>Fact Checked by {post.reviewedBy}</span>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E2E8F0] shadow-soft">
        {renderContent(post.content)}

        {/* AD PLACEMENT */}
        <aside 
          aria-label="Advertisement" 
          className="my-8 p-6 rounded-2xl bg-[#F8FAFC] border border-dashed border-[#E2E8F0] text-center text-xs text-[#545F73]"
        >
          <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400 block mb-1">Sponsored Advertisement</span>
          <p className="text-slate-500">Contextual AdSense units will render here automatically after approval.</p>
        </aside>
      </div>

      {/* E-E-A-T AUTHOR BIO BOX */}
      <section aria-label="About the Author" className="mt-10 bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#D5E0F8] text-[#00685F] flex items-center justify-center font-bold text-xl flex-shrink-0">
            {post.author.avatar}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="text-lg font-bold text-[#171D1C]">{post.author.name}</h4>
              <span className="text-xs text-[#00685F] font-semibold">({post.author.experience})</span>
            </div>
            <p className="text-xs text-[#545F73] mb-2">{post.author.role}</p>
            <p className="text-sm text-[#3D4947] leading-relaxed">{post.author.bio}</p>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="mt-12 pt-8 border-t border-[#E2E8F0]">
        <h3 className="text-2xl font-bold text-[#171D1C] mb-6">Related Career Guides</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {otherPosts.map((other) => (
            <Link 
              key={other.slug} 
              href={`/blog/${other.slug}`}
              className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all block group"
            >
              <span className="text-[11px] font-bold text-[#00685F] block mb-2">{other.category}</span>
              <h4 className="text-lg font-bold text-[#171D1C] group-hover:text-[#00685F] transition-colors mb-2 leading-snug">
                {other.title}
              </h4>
              <p className="text-xs text-[#545F73] line-clamp-2">{other.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
