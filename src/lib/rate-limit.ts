// In-memory store for rate limiting (suitable for serverless if not scaled horizontally massively, 
// perfect for Vercel Hobby/Pro tiers without external Redis).
type RateLimitStore = {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
};

const store: RateLimitStore = {};

export function checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  
  // Clean up old entries (garbage collection)
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });

  const record = store[ip];

  if (!record) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return true; // Allowed
  }

  if (now > record.resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return true; // Allowed
  }

  if (record.count >= maxRequests) {
    return false; // Rate limited
  }

  record.count += 1;
  return true; // Allowed
}
