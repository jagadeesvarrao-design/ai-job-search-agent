"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, X } from "lucide-react";

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
      <div className="glass p-6 rounded-2xl border border-teal-500/30 shadow-2xl backdrop-blur-xl bg-slate-900/90">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 bg-teal-500/20 rounded-xl text-teal-400">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              Privacy & Cookie Preferences
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              We and our trusted partners (including Google AdSense) use cookies to analyze site traffic, personalize content, and serve relevant advertising. Read our{" "}
              <Link href="/privacy" className="text-teal-400 hover:underline font-medium">
                Privacy Policy
              </Link>{" "}
              to learn more.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
          <button
            onClick={handleAccept}
            className="flex-1 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-teal-500/20"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all"
          >
            Decline Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
}
