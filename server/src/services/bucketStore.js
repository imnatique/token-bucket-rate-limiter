import TokenBucket from "./tokenBucket.js";

// In-memory store: identifier -> TokenBucket instance
const buckets = new Map();

function getBucket(identifier, maxTokens, refillRate) {
  if (!buckets.has(identifier)) {
    buckets.set(
      identifier,
      new TokenBucket(maxTokens, refillRate)
    );
  }

  return buckets.get(identifier);
}

function getAllBuckets() {
  return buckets;
}

export { getBucket, getAllBuckets };