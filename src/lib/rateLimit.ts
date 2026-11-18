interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

const buckets = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5000;

/**
 * Best-effort, in-memory sliding-window rate limiter.
 * On serverless platforms each instance keeps its own memory, so this deters casual spam
 * rather than guaranteeing a global limit. Swap for a shared store (e.g. Upstash Redis)
 * if abuse becomes significant.
 */
export function isRateLimited(key: string, { limit, windowMs }: RateLimitOptions): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    return true;
  }

  recent.push(now);
  buckets.set(key, recent);

  // Prevent unbounded memory growth from many distinct keys.
  if (buckets.size > MAX_TRACKED_KEYS) {
    const oldestKey = buckets.keys().next().value;
    if (oldestKey !== undefined) buckets.delete(oldestKey);
  }

  return false;
}
