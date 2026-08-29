"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
    // Google Consent Mode v2 integration update
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowBanner(false);
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#FAF9F6] dark:bg-[#222828] p-6 rounded-3xl border-2 border-[#D8E2DA] dark:border-[#2D3636] shadow-2xl transition-colors">
        <div className="flex items-start gap-3.5 mb-3">
          <div className="p-2.5 bg-[#E8F0EB] dark:bg-[#1A1F1F]/50 rounded-2xl text-[#476550] dark:text-[#A2BCA8] flex-shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-extrabold text-black dark:text-white text-base tracking-tight">
              Privacy & Cookie Preferences
            </h3>
            <p className="text-xs text-[#1A1F1F] dark:text-[#CBD5E1] font-medium mt-1.5 leading-relaxed">
              We and our trusted partners (including Google AdSense) use cookies to analyze site traffic, personalize content, and serve relevant advertising. Read our{" "}
              <Link href="/privacy" className="text-[#476550] dark:text-[#A2BCA8] hover:underline font-bold">
                Privacy Policy
              </Link>{" "}
              to learn more.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#D8E2DA] dark:border-[#2D3636]">
          <button
            onClick={handleAccept}
            className="flex-1 bg-[#476550] hover:bg-[#3A5342] dark:bg-[#6B9077] dark:hover:bg-[#55735E] text-white text-xs font-black py-3 px-4 rounded-xl transition-all shadow-sm active:scale-95 btn-tactile"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 bg-[#F4F4F0] hover:bg-slate-200 dark:bg-[#1F2525] dark:hover:bg-[#2D3636] text-black dark:text-[#CBD5E1] border border-[#D8E2DA] dark:border-[#2D3636] text-xs font-bold py-3 px-4 rounded-xl transition-all active:scale-95"
          >
            Decline Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
}
