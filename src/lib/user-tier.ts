"use client";

export type UserPlan = "free" | "pro";
export type BillingCycle = "monthly" | "quarterly" | "annual";

export interface UserUsageQuota {
  scoutRunsToday: number;
  lastScoutDate: string; // YYYY-MM-DD
  coverLettersGeneratedToday: number;
  lastLetterDate: string;
  interviewMessagesSent: number;
  lastInterviewDate: string;
}

export interface UserTierState {
  plan: UserPlan;
  currency: "INR" | "USD";
  billingCycle: BillingCycle;
  expiresAt?: string;
  vipBadge: boolean;
  prioritySpeed: boolean;
  deepAtsGaps: boolean;
  salaryIntel: boolean;
}

// Apple & Samsung Value Ladder Quota Limits
export const TIER_LIMITS = {
  free: {
    maxScoutsPerDay: 5,
    maxCoverLettersPerDay: 2,
    maxInterviewRounds: 3,
    isUnlimited: false,
    label: "Free Tier",
  },
  monthly: {
    maxScoutsPerDay: 25,
    maxCoverLettersPerDay: 10,
    maxInterviewRounds: 15,
    isUnlimited: false,
    label: "1-Month Starter Pro",
  },
  quarterly: {
    maxScoutsPerDay: 99999,
    maxCoverLettersPerDay: 99999,
    maxInterviewRounds: 99999,
    isUnlimited: true,
    label: "3-Month Career Pass",
  },
  annual: {
    maxScoutsPerDay: 99999,
    maxCoverLettersPerDay: 99999,
    maxInterviewRounds: 99999,
    isUnlimited: true,
    label: "Annual Pro VIP",
  }
};

export function getUserTierState(): UserTierState {
  if (typeof window === "undefined") {
    return {
      plan: "free",
      currency: "INR",
      billingCycle: "monthly",
      vipBadge: false,
      prioritySpeed: false,
      deepAtsGaps: false,
      salaryIntel: false
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
        deepAtsGaps: false,
        salaryIntel: false
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
      deepAtsGaps: false,
      salaryIntel: false
    };
  }
}

export function getUserPlan(): UserPlan {
  return getUserTierState().plan || "free";
}

export function isProSubscriber(): boolean {
  return getUserPlan() === "pro";
}

export function getCurrentTierLimits() {
  const tier = getUserTierState();
  if (tier.plan === "free") return TIER_LIMITS.free;
  if (tier.billingCycle === "quarterly") return TIER_LIMITS.quarterly;
  if (tier.billingCycle === "annual") return TIER_LIMITS.annual;
  return TIER_LIMITS.monthly;
}

export function setUserPlan(plan: UserPlan, billingCycle: BillingCycle = "monthly") {
  if (typeof window === "undefined") return;
  const isIndia = Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Calcutta") ||
                  Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Kolkata") ||
                  Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Asia/Kolkata");
  
  const currency = isIndia ? "INR" : "USD";
  
  let daysValid = 30;
  if (billingCycle === "quarterly") daysValid = 90;
  if (billingCycle === "annual") daysValid = 365;

  const state: UserTierState = {
    plan,
    currency,
    billingCycle,
    expiresAt: new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000).toISOString(),
    vipBadge: billingCycle === "annual",
    prioritySpeed: billingCycle === "quarterly" || billingCycle === "annual",
    deepAtsGaps: billingCycle === "quarterly" || billingCycle === "annual",
    salaryIntel: billingCycle === "quarterly" || billingCycle === "annual"
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
      lastInterviewDate: getTodayDateString()
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
        lastInterviewDate: today
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
    if (quota.lastInterviewDate !== today) {
      quota.interviewMessagesSent = 0;
      quota.lastInterviewDate = today;
    }
    return quota;
  } catch (e) {
    return {
      scoutRunsToday: 0,
      lastScoutDate: getTodayDateString(),
      coverLettersGeneratedToday: 0,
      lastLetterDate: getTodayDateString(),
      interviewMessagesSent: 0,
      lastInterviewDate: getTodayDateString()
    };
  }
}

export function recordScoutRun(): { allowed: boolean; remaining: number; max: number; isUnlimited: boolean } {
  const limits = getCurrentTierLimits();
  if (limits.isUnlimited) return { allowed: true, remaining: 99999, max: 99999, isUnlimited: true };
  
  const quota = getUsageQuota();
  if (quota.scoutRunsToday >= limits.maxScoutsPerDay) {
    return { allowed: false, remaining: 0, max: limits.maxScoutsPerDay, isUnlimited: false };
  }
  quota.scoutRunsToday += 1;
  quota.lastScoutDate = getTodayDateString();
  localStorage.setItem("user_usage_quota", JSON.stringify(quota));
  return { 
    allowed: true, 
    remaining: limits.maxScoutsPerDay - quota.scoutRunsToday, 
    max: limits.maxScoutsPerDay,
    isUnlimited: false 
  };
}

export function recordCoverLetterRun(): { allowed: boolean; remaining: number; max: number; isUnlimited: boolean } {
  const limits = getCurrentTierLimits();
  if (limits.isUnlimited) return { allowed: true, remaining: 99999, max: 99999, isUnlimited: true };
  
  const quota = getUsageQuota();
  if (quota.coverLettersGeneratedToday >= limits.maxCoverLettersPerDay) {
    return { allowed: false, remaining: 0, max: limits.maxCoverLettersPerDay, isUnlimited: false };
  }
  quota.coverLettersGeneratedToday += 1;
  quota.lastLetterDate = getTodayDateString();
  localStorage.setItem("user_usage_quota", JSON.stringify(quota));
  return { 
    allowed: true, 
    remaining: limits.maxCoverLettersPerDay - quota.coverLettersGeneratedToday, 
    max: limits.maxCoverLettersPerDay,
    isUnlimited: false 
  };
}

export function recordInterviewMessage(): { allowed: boolean; remaining: number; max: number; isUnlimited: boolean } {
  const limits = getCurrentTierLimits();
  if (limits.isUnlimited) return { allowed: true, remaining: 99999, max: 99999, isUnlimited: true };
  
  const quota = getUsageQuota();
  if (quota.interviewMessagesSent >= limits.maxInterviewRounds) {
    return { allowed: false, remaining: 0, max: limits.maxInterviewRounds, isUnlimited: false };
  }
  quota.interviewMessagesSent += 1;
  quota.lastInterviewDate = getTodayDateString();
  localStorage.setItem("user_usage_quota", JSON.stringify(quota));
  return { 
    allowed: true, 
    remaining: limits.maxInterviewRounds - quota.interviewMessagesSent, 
    max: limits.maxInterviewRounds,
    isUnlimited: false 
  };
}
