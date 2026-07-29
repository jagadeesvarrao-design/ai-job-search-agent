import { blogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Very basic markdown parsing for our specific blog format
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.trim().startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
      }
      
      // Parse strong and em basic
      let formatted = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      if (paragraph.trim().startsWith('- ')) {
        const listItems = paragraph.split('\n').map(item => item.replace('- ', ''));
        return (
          <ul key={idx} className="list-disc pl-6 mb-4 space-y-2 text-slate-300">
            {listItems.map((li, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: li.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
            ))}
          </ul>
        );
      }

      return <p key={idx} className="text-slate-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <Link href="/blog" className="text-teal-400 hover:text-teal-300 flex items-center gap-2 mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
      
      <p className="text-teal-400 font-medium mb-4">{post.date}</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>
      
      <div className="glass p-8 md:p-12 rounded-3xl mt-10">
        {renderContent(post.content)}
      </div>
    </div>
  );
}
