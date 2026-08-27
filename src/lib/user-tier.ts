"use client";

import { db } from "@/lib/firebase";

export type UserPlan = "free" | "pro";
export type BillingCycle = "monthly" | "quarterly" | "annual";

export interface UserUsageQuota {
  scoutRunsToday: number;
  lastScoutDate: string; // YYYY-MM-DD
  coverLettersGeneratedToday: number;
  lastLetterDate: string;
  interviewMessagesSent: number;
  lastInterviewDate: string;
  atsAuditsToday: number;
  lastAtsAuditDate: string;
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
  recruiterTemplates: boolean;
  voiceAudio: boolean;
  isZenSuite?: boolean;
  tierTitle?: string;
  sourceApp?: string;
}

// Industry-Standard Tier Quota Limits & Capabilities
export const TIER_LIMITS = {
  free: {
    maxScoutsPerDay: 5,
    maxCoverLettersPerDay: 2,
    maxInterviewRounds: 3,
    maxAtsAuditsPerDay: 1,
    isUnlimited: false,
    showAds: true,
    voiceAudio: false,
    label: "Free Tier",
  },
  monthly: {
    maxScoutsPerDay: 25,
    maxCoverLettersPerDay: 10,
    maxInterviewRounds: 15,
    maxAtsAuditsPerDay: 3,
    isUnlimited: false,
    showAds: false,
    voiceAudio: false,
    label: "1-Month Starter",
  },
  quarterly: {
    maxScoutsPerDay: 99999,
    maxCoverLettersPerDay: 99999,
    maxInterviewRounds: 99999,
    maxAtsAuditsPerDay: 99999,
    isUnlimited: true,
    showAds: false,
    voiceAudio: true,
    label: "3-Month Full Pass",
  },
  annual: {
    maxScoutsPerDay: 99999,
    maxCoverLettersPerDay: 99999,
    maxInterviewRounds: 99999,
    maxAtsAuditsPerDay: 99999,
    isUnlimited: true,
    showAds: false,
    voiceAudio: true,
    label: "Annual Pro VIP",
  },
  zen_suite: {
    maxScoutsPerDay: 99999,
    maxCoverLettersPerDay: 99999,
    maxInterviewRounds: 99999,
    maxAtsAuditsPerDay: 99999,
    isUnlimited: true,
    showAds: false,
    voiceAudio: true,
    label: "Zen Suite Ultimate",
  }
};

export const PRICING_DATA = {
  monthly: {
    inr: 299,
    inrPeriod: "month",
    inrMonthlyEquivalent: 299,
    usd: 9,
    usdPeriod: "mo",
    usdMonthlyEquivalent: 9,
    tag: "Light Hunt",
    subtext: "Essential AI tools for single-role targeted applications."
  },
  quarterly: {
    inr: 699,
    inrPeriod: "3 months",
    inrMonthlyEquivalent: 233,
    usd: 19,
    usdPeriod: "3 mos",
    usdMonthlyEquivalent: 6.33,
    tag: "Most Popular • Covers Full 60–90 Day Hiring Cycle",
    subtext: "Everything you need from initial resume submission to signed offer letter."
  },
  annual: {
    inr: 1999,
    inrPeriod: "year",
    inrMonthlyEquivalent: 166,
    usd: 49,
    usdPeriod: "yr",
    usdMonthlyEquivalent: 4.08,
    tag: "Best Long-Term Value (Save 60%)",
    subtext: "For continuous career growth, promotions, and lateral career switches."
  },
  zen_suite: {
    inr: 599,
    inrPeriod: "month",
    inrMonthlyEquivalent: 599,
    usd: 15.99,
    usdPeriod: "mo",
    usdMonthlyEquivalent: 15.99,
    tag: "🌟 ALL-IN-ONE ZEN SUITE CROSS-PASS",
    subtext: "Unlocks ZenScout AI + ZenDoc AI + ZenResume simultaneously under a single subscription."
  }
};

export function getUserTierState(): UserTierState {
  const defaultState: UserTierState = {
    plan: "free",
    currency: "INR",
    billingCycle: "monthly",
    vipBadge: false,
    prioritySpeed: false,
    deepAtsGaps: false,
    salaryIntel: false,
    recruiterTemplates: false,
    voiceAudio: false,
    isZenSuite: false,
    tierTitle: "Free Tier"
  };

  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const saved = localStorage.getItem("user_tier");
    if (!saved) {
      return defaultState;
    }
    const parsed: UserTierState = JSON.parse(saved);
    
    // Check if subscription has expired
    if (parsed.plan === "pro" && parsed.expiresAt) {
      if (new Date(parsed.expiresAt).getTime() < Date.now()) {
        // Expired -> Downgrade back to free
        parsed.plan = "free";
        parsed.vipBadge = false;
        parsed.prioritySpeed = false;
        parsed.deepAtsGaps = false;
        parsed.salaryIntel = false;
        parsed.recruiterTemplates = false;
        parsed.voiceAudio = false;
        parsed.isZenSuite = false;
        parsed.tierTitle = "Free Tier";
        localStorage.setItem("user_tier", JSON.stringify(parsed));
      }
    }
    
    parsed.voiceAudio = parsed.plan === "pro" && (parsed.billingCycle === "quarterly" || parsed.billingCycle === "annual" || parsed.isZenSuite === true);
    return parsed;
  } catch (e) {
    return defaultState;
  }
}

export function getUserPlan(): UserPlan {
  return getUserTierState().plan || "free";
}

export function isProSubscriber(): boolean {
  return getUserPlan() === "pro";
}

export function hasVoiceAudioAccess(): boolean {
  const tier = getUserTierState();
  return tier.plan === "pro" && (tier.billingCycle === "quarterly" || tier.billingCycle === "annual" || tier.isZenSuite === true);
}

export function shouldShowAds(): boolean {
  return !isProSubscriber();
}

export function getCurrentTierLimits() {
  const tier = getUserTierState();
  if (tier.isZenSuite) return TIER_LIMITS.zen_suite;
  if (tier.plan === "free") return TIER_LIMITS.free;
  if (tier.billingCycle === "quarterly") return TIER_LIMITS.quarterly;
  if (tier.billingCycle === "annual") return TIER_LIMITS.annual;
  return TIER_LIMITS.monthly;
}

export function setUserPlan(plan: UserPlan, billingCycle: BillingCycle = "monthly", isZenSuite: boolean = false) {
  if (typeof window === "undefined") return;
  const isIndia = Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Calcutta") ||
                  Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Kolkata") ||
                  Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Asia/Kolkata");
  
  const currency = isIndia ? "INR" : "USD";
  
  let daysValid = 30;
  if (billingCycle === "quarterly") daysValid = 90;
  if (billingCycle === "annual" || isZenSuite) daysValid = 365;

  const state: UserTierState = {
    plan,
    currency,
    billingCycle,
    expiresAt: new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000).toISOString(),
    vipBadge: billingCycle === "annual" || isZenSuite,
    prioritySpeed: billingCycle === "quarterly" || billingCycle === "annual" || isZenSuite,
    deepAtsGaps: true,
    salaryIntel: billingCycle === "annual" || isZenSuite,
    recruiterTemplates: billingCycle === "annual" || isZenSuite,
    voiceAudio: billingCycle === "quarterly" || billingCycle === "annual" || isZenSuite,
    isZenSuite,
    tierTitle: isZenSuite ? "Zen Suite Ultimate" : (billingCycle === "annual" ? "ZenScout Annual VIP" : billingCycle === "quarterly" ? "ZenScout 3-Month Pass" : "ZenScout 1-Month Starter")
  };

  localStorage.setItem("user_tier", JSON.stringify(state));
  window.dispatchEvent(new Event("user-tier-updated"));
}

/**
 * Direct Zen Suite Entitlement resolver matching Aneevarp Ecosystem specification.
 */
export async function checkZenSuiteEntitlement(user: { uid: string; email?: string | null } | null) {
  if (!user) return { isSuiteMember: false, plan: "free" };
  
  try {
    const { doc, getDoc, collection, query, where, getDocs } = await import("firebase/firestore");
    if (!db || !db.type) return { isSuiteMember: false, plan: "free" };

    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    
    let sub: any = null;

    if (docSnap.exists()) {
      const data = docSnap.data();
      sub = data.subscription;
    } else if (user.email) {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        sub = querySnap.docs[0].data()?.subscription;
      }
    }
    
    if (sub && (sub.plan_id === "zen_suite" || sub.plan_id === "suite" || (sub.tier_title && sub.tier_title.toLowerCase().includes("suite"))) && sub.status === "active") {
      const expiresAt = new Date(sub.expires_at).getTime();
      if (isNaN(expiresAt) || Date.now() < expiresAt) {
        // Persist to session/localStorage for fast UI rendering
        if (typeof window !== "undefined") {
          localStorage.setItem("zenscout_active_plan", JSON.stringify({
            planId: "zen_suite",
            title: sub.tier_title || "Zen Suite Ultimate",
            isSuiteMember: true
          }));
        }
        return { isSuiteMember: true, plan: "zen_suite", details: sub };
      }
    }
  } catch (err) {
    console.warn("Could not resolve Zen Suite entitlement:", err);
  }
  
  return { isSuiteMember: false, plan: "free" };
}

/**
 * Automatically queries Cloud Firestore for cross-suite subscription entitlement.
 * Matches unified schema: users/{uid} -> subscription: { plan_id: "zen_suite", status: "active", ... }
 */
export async function syncUserSubscriptionFromFirestore(user: { uid: string; email?: string | null }): Promise<UserTierState> {
  const defaultState = getUserTierState();
  if (!user?.uid) return defaultState;

  try {
    const { doc, getDoc, collection, query, where, getDocs } = await import("firebase/firestore");
    if (!db || !db.type) return defaultState;

    let subscriptionData: any = null;

    // 1. Try fetching doc by user.uid directly
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        subscriptionData = userSnap.data()?.subscription;
      }
    } catch (err) {
      console.warn("Direct uid subscription lookup:", err);
    }

    // 2. Fallback: Search by email if uid was not registered
    if (!subscriptionData && user.email) {
      try {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
          subscriptionData = querySnap.docs[0].data()?.subscription;
        }
      } catch (err) {
        console.warn("Email subscription lookup:", err);
      }
    }

    if (subscriptionData) {
      const { plan_id, tier_title, status, expires_at, source_app } = subscriptionData;
      const isActive = status === "active" || status === "trialing";
      const isNotExpired = !expires_at || new Date(expires_at).getTime() > Date.now();

      if (isActive && isNotExpired) {
        const isSuite = plan_id === "zen_suite" || 
                        plan_id === "suite" || 
                        (tier_title && tier_title.toLowerCase().includes("suite")) ||
                        (source_app && source_app.toLowerCase().includes("suite"));

        const isIndia = Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Calcutta") ||
                        Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Kolkata") ||
                        Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Asia/Kolkata");

        const newState: UserTierState = {
          plan: "pro",
          currency: isIndia ? "INR" : "USD",
          billingCycle: isSuite ? "annual" : (plan_id === "annual" ? "annual" : (plan_id === "quarterly" ? "quarterly" : "monthly")),
          expiresAt: expires_at,
          vipBadge: true,
          prioritySpeed: true,
          deepAtsGaps: true,
          salaryIntel: true,
          recruiterTemplates: true,
          voiceAudio: true,
          isZenSuite: isSuite,
          tierTitle: tier_title || (isSuite ? "Zen Suite Ultimate" : "ZenScout Pro"),
          sourceApp: source_app || "cloud_firestore"
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("user_tier", JSON.stringify(newState));
          if (isSuite) {
            localStorage.setItem("zenscout_active_plan", JSON.stringify({
              planId: "zen_suite",
              title: tier_title || "Zen Suite Ultimate",
              isSuiteMember: true
            }));
          }
          window.dispatchEvent(new Event("user-tier-updated"));
        }
        return newState;
      }
    }
    return defaultState;
  } catch (globalErr) {
    console.error("Failed to sync subscription entitlement from Firestore:", globalErr);
    return defaultState;
  }
}

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export function getUsageQuota(): UserUsageQuota {
  const today = getTodayDateString();
  const defaultQuota: UserUsageQuota = {
    scoutRunsToday: 0,
    lastScoutDate: today,
    coverLettersGeneratedToday: 0,
    lastLetterDate: today,
    interviewMessagesSent: 0,
    lastInterviewDate: today,
    atsAuditsToday: 0,
    lastAtsAuditDate: today
  };

  if (typeof window === "undefined") return defaultQuota;

  try {
    const saved = localStorage.getItem("user_usage_quota");
    if (!saved) return defaultQuota;
    
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
    if (quota.lastAtsAuditDate !== today) {
      quota.atsAuditsToday = 0;
      quota.lastAtsAuditDate = today;
    }
    return quota;
  } catch (e) {
    return defaultQuota;
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

export function recordAtsAuditRun(): { allowed: boolean; remaining: number; max: number; isUnlimited: boolean } {
  const limits = getCurrentTierLimits();
  if (limits.isUnlimited) return { allowed: true, remaining: 99999, max: 99999, isUnlimited: true };
  
  const quota = getUsageQuota();
  if (quota.atsAuditsToday >= limits.maxAtsAuditsPerDay) {
    return { allowed: false, remaining: 0, max: limits.maxAtsAuditsPerDay, isUnlimited: false };
  }
  quota.atsAuditsToday += 1;
  quota.lastAtsAuditDate = getTodayDateString();
  localStorage.setItem("user_usage_quota", JSON.stringify(quota));
  return { 
    allowed: true, 
    remaining: limits.maxAtsAuditsPerDay - quota.atsAuditsToday, 
    max: limits.maxAtsAuditsPerDay,
    isUnlimited: false 
  };
}
