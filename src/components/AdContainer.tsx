"use client";

import { useState, useEffect } from "react";
import { getUserPlan } from "@/lib/user-tier";

interface AdContainerProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

export default function AdContainer({ slotId = "1234567890", format = "auto", className = "" }: AdContainerProps) {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const checkTier = () => {
      setIsPro(getUserPlan() === "pro");
    };

    checkTier();
    window.addEventListener("user-tier-updated", checkTier);
    return () => window.removeEventListener("user-tier-updated", checkTier);
  }, []);

  // 100% Ad-Free Rule: If user is Pro subscriber, DO NOT render ads
  if (isPro) {
    return null;
  }

  return (
    <aside
      aria-label="Sponsored advertisement"
      className={`my-6 p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#222828] border border-[#D8E2DA] dark:border-[#2D3636] text-center transition-all ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold mb-2 pb-1 border-b border-slate-200 dark:border-slate-800">
        <span>Sponsored Career Resource</span>
        <span>AdSense</span>
      </div>

      {/* Google AdSense Unit Container */}
      <div className="min-h-[100px] flex flex-col items-center justify-center text-xs text-slate-500 dark:text-slate-400 py-3">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1993051486567311"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <p className="text-[11px] font-medium text-slate-400 mt-1">Contextual career & recruitment opportunities</p>
      </div>
    </aside>
  );
}
