import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Briefcase } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Job Search Agent | Automate Your Job Hunt",
  description: "Stop manually searching for jobs. Our autonomous AI agents discover, filter, and apply to top opportunities based on your exact resume and preferences.",
  keywords: ["AI job search", "automated job applications", "resume scanner", "AI cover letter generator", "mock interview AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-teal-500 to-orange-500 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Job Agent</span>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/blog" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Blog</Link>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Dashboard</Link>
            <Link href="/profile" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Profile</Link>
          </nav>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8">
          {children}
        </main>
        
        <footer className="w-full border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-teal-400" />
              <span className="font-bold text-lg">AI Job Agent</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <div className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} AI Job Agent. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
