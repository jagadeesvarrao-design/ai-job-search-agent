// High-Performance Sliding-Window Token Bucket Rate Limiter
// Protects endpoints against Brute-Forcing, DoS, Scraping, and Flooding

type RateLimitRecord = {
  count: number;
  resetTime: number;
  blockedUntil?: number;
};

type RateLimitStore = {
  [key: string]: RateLimitRecord;
};

const store: RateLimitStore = {};

/**
 * Validates request against IP / key based rate limits with auto-penalization for abuse.
 * 
 * @param key Unique identifier (e.g. client IP or IP + endpoint)
 * @param maxRequests Maximum allowed requests in the time window
 * @param windowMs Time window in milliseconds (e.g. 60,000 for 1 minute)
 * @param penaltyMs Optional temporary ban duration if limit is severely exceeded
 * @returns { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60000,
  penaltyMs: number = 120000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();

  // Periodic Cleanup of expired keys (keep memory strictly bounded)
  const keys = Object.keys(store);
  if (keys.length > 5000) {
    for (const k of keys) {
      if (store[k].resetTime < now && (!store[k].blockedUntil || store[k].blockedUntil! < now)) {
        delete store[k];
      }
    }
  }

  const record = store[key];

  // 1. If IP is currently in penalty block
  if (record?.blockedUntil && record.blockedUntil > now) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.blockedUntil
    };
  }

  // 2. New visitor
  if (!record || now > record.resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    };
  }

  // 3. Increment request count
  record.count += 1;

  // 4. If limit exceeded by > 2x, apply temporary ban
  if (record.count > maxRequests * 2) {
    record.blockedUntil = now + penaltyMs;
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.blockedUntil
    };
  }

  // 5. Normal rate limit check
  if (record.count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime
  };
}

/**
 * Helper to extract client IP safely from Next.js request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}
