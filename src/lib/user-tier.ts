"use client";

export type UserPlan = "free" | "pro";

export interface UserTierState {
  plan: UserPlan;
  currency: "INR" | "USD";
  billingCycle: "monthly" | "quarterly" | "annual";
  expiresAt?: string;
}

export function getUserPlan(): UserPlan {
  if (typeof window === "undefined") return "free";
  try {
    const saved = localStorage.getItem("user_tier");
    if (!saved) return "free";
    const parsed: UserTierState = JSON.parse(saved);
    return parsed.plan || "free";
  } catch (e) {
    return "free";
  }
}

export function setUserPlan(plan: UserPlan, billingCycle: "monthly" | "quarterly" | "annual" = "monthly") {
  if (typeof window === "undefined") return;
  const isIndia = Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Calcutta") ||
                  Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Kolkata") ||
                  Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Asia/Kolkata");
  
  const currency = isIndia ? "INR" : "USD";
  const state: UserTierState = {
    plan,
    currency,
    billingCycle,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };
  localStorage.setItem("user_tier", JSON.stringify(state));
  window.dispatchEvent(new Event("user-tier-updated"));
}
