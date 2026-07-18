import { redis } from "../config/redis.js";

export async function incrementAllowedRequests() {
  await redis.incr("stats:allowed");
}

export async function incrementBlockedRequests() {
  await redis.incr("stats:blocked");
}

const trafficHistory = [];
const MAX_HISTORY = 20;

export async function getStats() {
  const [allowed, blocked, bucketKeys] = await Promise.all([
    redis.get("stats:allowed"),
    redis.get("stats:blocked"),
    redis.keys("ratelimit:*"),
  ]);

  const allowedRequests = Number(allowed || 0);
  const blockedRequests = Number(blocked || 0);
  const activeBuckets = bucketKeys.length;

  const totalRequests = allowedRequests + blockedRequests;

  const successRate =
    totalRequests === 0
      ? 100
      : Number(((allowedRequests / totalRequests) * 100).toFixed(2));

  // Only add a new point if the counters changed
  const lastEntry = trafficHistory[trafficHistory.length - 1];

  if (
    !lastEntry ||
    lastEntry.allowed !== allowedRequests ||
    lastEntry.blocked !== blockedRequests
  ) {
    trafficHistory.push({
      timestamp: Date.now(),
      allowed: allowedRequests,
      blocked: blockedRequests,
    });

    if (trafficHistory.length > MAX_HISTORY) {
      trafficHistory.shift();
    }
  }

  return {
    allowedRequests,
    blockedRequests,
    activeBuckets,
    successRate,
    redisStatus: redis.status,
    history: [...trafficHistory],
  };
}

export async function getBuckets() {
  const keys = await redis.keys("ratelimit:*");

  const buckets = await Promise.all(
    keys.map(async (key) => {
      const bucket = await redis.hgetall(key);
      const ttl = await redis.ttl(key);

      return {
        key,
        tokens: Number(bucket.tokens),
        lastRefill: Number(bucket.lastRefill),
        ttl,
      };
    }),
  );

  return buckets;
}
