"use client";

export type UserPlan = "free" | "pro";
export type BillingCycle = "monthly" | "quarterly" | "annual";

export interface UserUsageQuota {
  scoutRunsToday: number;
  lastScoutDate: string; // YYYY-MM-DD
  coverLettersGeneratedToday: number;
  lastLetterDate: string;
  interviewMessagesSent: number;
}

export interface UserTierState {
  plan: UserPlan;
  currency: "INR" | "USD";
  billingCycle: BillingCycle;
  expiresAt?: string;
  vipBadge: boolean;
  prioritySpeed: boolean;
}

export const FREE_LIMITS = {
  maxScoutsPerDay: 5,
  maxCoverLettersPerDay: 2,
  maxInterviewRounds: 3,
};

export function getUserTierState(): UserTierState {
  if (typeof window === "undefined") {
    return {
      plan: "free",
      currency: "INR",
      billingCycle: "monthly",
      vipBadge: false,
      prioritySpeed: false,
    };
  }

  try {
    const saved = localStorage.getItem("user_tier");
    if (!saved) {
      return {
        plan: "free",
        currency: "INR",
        billingCycle: "monthly",
        vipBadge: false,
        prioritySpeed: false,
      };
    }
    return JSON.parse(saved);
  } catch (e) {
    return {
      plan: "free",
      currency: "INR",
      billingCycle: "monthly",
      vipBadge: false,
      prioritySpeed: false,
    };
  }
}

export function getUserPlan(): UserPlan {
  return getUserTierState().plan || "free";
}

export function isProSubscriber(): boolean {
  return getUserPlan() === "pro";
}

export function setUserPlan(plan: UserPlan, billingCycle: BillingCycle = "monthly") {
  if (typeof window === "undefined") return;
  const isIndia = Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Calcutta") ||
                  Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Kolkata") ||
                  Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Asia/Kolkata");
  
  const currency = isIndia ? "INR" : "USD";
  
  // Calculate expiration based on plan model
  let daysValid = 30;
  if (billingCycle === "quarterly") daysValid = 90;
  if (billingCycle === "annual") daysValid = 365;

  const state: UserTierState = {
    plan,
    currency,
    billingCycle,
    expiresAt: new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000).toISOString(),
    vipBadge: billingCycle === "annual",
    prioritySpeed: billingCycle === "quarterly" || billingCycle === "annual"
  };

  localStorage.setItem("user_tier", JSON.stringify(state));
  window.dispatchEvent(new Event("user-tier-updated"));
}

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export function getUsageQuota(): UserUsageQuota {
  if (typeof window === "undefined") {
    return {
      scoutRunsToday: 0,
      lastScoutDate: getTodayDateString(),
      coverLettersGeneratedToday: 0,
      lastLetterDate: getTodayDateString(),
      interviewMessagesSent: 0,
    };
  }

  try {
    const today = getTodayDateString();
    const saved = localStorage.getItem("user_usage_quota");
    if (!saved) {
      return {
        scoutRunsToday: 0,
        lastScoutDate: today,
        coverLettersGeneratedToday: 0,
        lastLetterDate: today,
        interviewMessagesSent: 0,
      };
    }
    const quota: UserUsageQuota = JSON.parse(saved);
    if (quota.lastScoutDate !== today) {
      quota.scoutRunsToday = 0;
      quota.lastScoutDate = today;
    }
    if (quota.lastLetterDate !== today) {
      quota.coverLettersGeneratedToday = 0;
      quota.lastLetterDate = today;
    }
    return quota;
  } catch (e) {
    return {
      scoutRunsToday: 0,
      lastScoutDate: getTodayDateString(),
      coverLettersGeneratedToday: 0,
      lastLetterDate: getTodayDateString(),
      interviewMessagesSent: 0,
    };
  }
}

export function recordScoutRun(): { allowed: boolean; remaining: number } {
  if (isProSubscriber()) return { allowed: true, remaining: 9999 };
  const quota = getUsageQuota();
  if (quota.scoutRunsToday >= FREE_LIMITS.maxScoutsPerDay) {
    return { allowed: false, remaining: 0 };
  }
  quota.scoutRunsToday += 1;
  quota.lastScoutDate = getTodayDateString();
  localStorage.setItem("user_usage_quota", JSON.stringify(quota));
  return { allowed: true, remaining: FREE_LIMITS.maxScoutsPerDay - quota.scoutRunsToday };
}

export function recordCoverLetterRun(): { allowed: boolean; remaining: number } {
  if (isProSubscriber()) return { allowed: true, remaining: 9999 };
  const quota = getUsageQuota();
  if (quota.coverLettersGeneratedToday >= FREE_LIMITS.maxCoverLettersPerDay) {
    return { allowed: false, remaining: 0 };
  }
  quota.coverLettersGeneratedToday += 1;
  quota.lastLetterDate = getTodayDateString();
  localStorage.setItem("user_usage_quota", JSON.stringify(quota));
  return { allowed: true, remaining: FREE_LIMITS.maxCoverLettersPerDay - quota.coverLettersGeneratedToday };
}

export function recordInterviewMessage(): { allowed: boolean; remaining: number } {
  if (isProSubscriber()) return { allowed: true, remaining: 9999 };
  const quota = getUsageQuota();
  if (quota.interviewMessagesSent >= FREE_LIMITS.maxInterviewRounds) {
    return { allowed: false, remaining: 0 };
  }
  quota.interviewMessagesSent += 1;
  localStorage.setItem("user_usage_quota", JSON.stringify(quota));
  return { allowed: true, remaining: FREE_LIMITS.maxInterviewRounds - quota.interviewMessagesSent };
}
