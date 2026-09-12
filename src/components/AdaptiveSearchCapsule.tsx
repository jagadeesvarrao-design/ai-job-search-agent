"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight, Sparkles, Globe } from "lucide-react";

interface AdaptiveSearchCapsuleProps {
  initialRole?: string;
  initialLocation?: string;
  className?: string;
}

const QUICK_LOCATIONS = [
  "Remote / Global",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Gurgaon / NCR",
  "United States"
];

export default function AdaptiveSearchCapsule({
  initialRole = "Full-Stack Engineer, React, Node.js",
  initialLocation = "Remote / Global",
  className = ""
}: AdaptiveSearchCapsuleProps) {
  const router = useRouter();
  const [role, setRole] = useState(initialRole);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = role.trim() || "Software Engineer";
    const loc = location.trim() || "";
    router.push(`/dashboard?q=${encodeURIComponent(query)}&location=${encodeURIComponent(loc)}`);
  };

  const handleQuickLocation = (loc: string) => {
    setLocation(loc);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <form 
        onSubmit={handleSubmit}
        className="bg-[#FAF9F6] dark:bg-[#0D1714] p-2.5 sm:p-3 md:p-2.5 rounded-3xl md:rounded-full border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.25)] shadow-[0_8px_30px_rgba(26,31,31,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-stretch md:items-center gap-2 transition-all hover:border-[#476550] dark:hover:border-[#2DD4BF]"
      >
        {/* Target Role Field */}
        <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 w-full md:flex-1 bg-white dark:bg-[#121E1A] md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none border border-[#D8E2DA]/60 dark:border-transparent md:border-none">
          <Search className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D8787] dark:text-[#94A3B8] block md:hidden">
              Target Role
            </span>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Target Role (e.g. React, Full-Stack, AI)"
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#1A1F1F] dark:text-[#F8FAFC] placeholder:text-[#7D8787] focus:outline-none min-h-[36px] md:min-h-[40px]"
            />
          </div>
        </div>

        {/* Vertical Divider for Desktop */}
        <div className="hidden md:block w-px h-8 bg-[rgba(162,188,168,0.35)] dark:bg-[rgba(45,212,191,0.2)] flex-shrink-0"></div>

        {/* Location Field */}
        <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 w-full md:w-56 lg:w-64 bg-white dark:bg-[#121E1A] md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none border border-[#D8E2DA]/60 dark:border-transparent md:border-none">
          <MapPin className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D8787] dark:text-[#94A3B8] block md:hidden">
              Location / Mode
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or Remote (e.g. Remote, Bengaluru)"
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#1A1F1F] dark:text-[#F8FAFC] placeholder:text-[#7D8787] focus:outline-none min-h-[36px] md:min-h-[40px]"
            />
          </div>
        </div>

        {/* Primary CTA Search Button */}
        <button
          type="submit"
          className="stitch-hero-cta btn-tactile w-full md:w-auto px-7 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md font-extrabold whitespace-nowrap flex-shrink-0 min-h-[44px]"
        >
          <span>⚡ Scout Jobs</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>

      {/* Mobile-Friendly Fast-Tap Location Chips */}
      <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth touch-pan-x md:justify-center px-2">
        <span className="text-[11px] font-bold text-[#7D8787] dark:text-[#94A3B8] whitespace-nowrap flex items-center gap-1 flex-shrink-0">
          <Globe className="w-3.5 h-3.5 text-[#476550] dark:text-[#2DD4BF]" />
          <span>Quick:</span>
        </span>
        {QUICK_LOCATIONS.map((loc) => {
          const isSelected = location.toLowerCase() === loc.toLowerCase();
          return (
            <button
              key={loc}
              type="button"
              onClick={() => handleQuickLocation(loc)}
              className={`text-[11px] sm:text-xs font-bold px-3 py-1.5 min-h-[32px] sm:min-h-[34px] rounded-full whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                isSelected
                  ? "bg-[#476550] dark:bg-[#2DD4BF] text-white dark:text-[#061B18] shadow-xs"
                  : "bg-[#FAF9F6] dark:bg-[#13221C] text-[#475569] dark:text-[#CBD5E1] border border-[#D8E2DA] dark:border-[#1F352C] hover:border-[#476550] dark:hover:border-[#2DD4BF]"
              }`}
            >
              {loc}
            </button>
          );
        })}
      </div>
    </div>
  );
}
