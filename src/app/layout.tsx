import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Briefcase } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Job Agent",
  description: "Your personal automated job search assistant",
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
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Dashboard</Link>
            <Link href="/profile" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Profile</Link>
          </nav>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
