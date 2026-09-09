"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Briefcase, 
  FileText, 
  Crown, 
  Zap, 
  User, 
  Sun, 
  Moon 
} from "lucide-react";

interface MobileNavCapsuleProps {
  isPro?: boolean;
  isZenSuite?: boolean;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  user?: any;
}

export default function MobileNavCapsule({
  isPro = false,
  isZenSuite = false,
  onOpenPricing,
  onOpenAuth,
  isDark,
  onToggleTheme,
  user
}: MobileNavCapsuleProps) {
  const pathname = usePathname();

  const isJobsActive = pathname === "/dashboard";
  const isAtsActive = pathname === "/profile";

  return (
    <nav 
      aria-label="Mobile Bottom Navigation Dock"
      className="lg:hidden fixed bottom-3 inset-x-3 z-40 max-w-lg mx-auto bg-[#FAF9F6]/95 dark:bg-[#0D1714]/95 backdrop-blur-2xl border border-[#D8E2DA] dark:border-[rgba(45,212,191,0.25)] rounded-full shadow-[0_12px_40px_rgba(26,31,31,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.85)] p-1.5 flex items-center justify-around animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      {/* 1. Jobs Link */}
      <Link
        href="/dashboard"
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full active:scale-95 transition-all flex-1 min-h-[44px] ${
          isJobsActive
            ? "bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.18)] text-[#476550] dark:text-[#2DD4BF] font-black"
            : "text-[#475569] dark:text-[#CBD5E1] hover:text-[#1A1F1F] dark:hover:text-white"
        }`}
      >
        <Briefcase className={`w-4 h-4 ${isJobsActive ? "stroke-[2.5]" : ""}`} />
        <span className="text-[10px] font-bold mt-0.5 tracking-tight">Jobs</span>
      </Link>

      {/* 2. ATS Audit Link */}
      <Link
        href="/profile"
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full active:scale-95 transition-all flex-1 min-h-[44px] ${
          isAtsActive
            ? "bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.18)] text-[#476550] dark:text-[#2DD4BF] font-black"
            : "text-[#475569] dark:text-[#CBD5E1] hover:text-[#1A1F1F] dark:hover:text-white"
        }`}
      >
        <FileText className={`w-4 h-4 ${isAtsActive ? "stroke-[2.5]" : ""}`} />
        <span className="text-[10px] font-bold mt-0.5 tracking-tight">ATS Audit</span>
      </Link>

      {/* 3. Upgrade / Tier Status Button */}
      <button
        type="button"
        onClick={onOpenPricing}
        className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full hover:bg-[#E8F0EB] dark:hover:bg-[#13221C] text-[#476550] dark:text-[#2DD4BF] active:scale-95 transition-all flex-1 min-h-[44px] cursor-pointer"
      >
        {isZenSuite ? (
          <Crown className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
        ) : isPro ? (
          <Crown className="w-4 h-4 text-[#2DD4BF] fill-[#2DD4BF]" />
        ) : (
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
        )}
        <span className="text-[10px] font-black mt-0.5 tracking-tight">
          {isZenSuite ? "SUITE" : isPro ? "PRO" : "Upgrade"}
        </span>
      </button>

      {/* 4. Vault / Auth Button */}
      <button
        type="button"
        onClick={onOpenAuth}
        className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-[#13221C] text-[#475569] dark:text-[#CBD5E1] active:scale-95 transition-all flex-1 min-h-[44px] cursor-pointer"
      >
        {user?.photoURL ? (
          <img 
            src={user.photoURL} 
            alt={user.displayName || "User"} 
            className="w-4 h-4 rounded-full object-cover border border-[#476550] dark:border-[#2DD4BF]" 
          />
        ) : (
          <User className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF]" />
        )}
        <span className="text-[10px] font-bold mt-0.5 tracking-tight">
          {user ? "Vault" : "Sign In"}
        </span>
      </button>

      {/* 5. Theme Toggle */}
      <button
        type="button"
        onClick={onToggleTheme}
        className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-[#13221C] text-black dark:text-[#2DD4BF] active:scale-95 transition-all flex-1 min-h-[44px] cursor-pointer"
        aria-label="Toggle Light and Dark Mode"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
        )}
        <span className="text-[10px] font-bold mt-0.5 tracking-tight">
          {isDark ? "Light" : "Dark"}
        </span>
      </button>
    </nav>
  );
}
