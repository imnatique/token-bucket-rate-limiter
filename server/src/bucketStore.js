const TokenBucket = require('./tokenBucket');

// In-memory store: identifier -> TokenBucket instance
const buckets = new Map();

function getBucket(key, maxTokens, refillRate) {
  if (!buckets.has(key)) {
    buckets.set(key, new TokenBucket(maxTokens, refillRate));
  }
  return buckets.get(key);
}

// Useful for tests/dashboard later
function getAllBuckets() {
  return buckets;
}

module.exports = { getBucket, getAllBuckets };
