import { getBucket } from "../services/bucketStore.js";
import {
  DEFAULT_MAX_TOKENS,
  DEFAULT_REFILL_RATE,
} from "../config/constants.js";

function rateLimit({ maxTokens = DEFAULT_MAX_TOKENS, refillRate = DEFAULT_REFILL_RATE, keyGenerator } = {}) {
  return (req, res, next) => {
    const identifier = keyGenerator ? keyGenerator(req) : req.ip;

    const bucket = getBucket(identifier, maxTokens, refillRate);

    const { allowed, tokensRemaining } = bucket.tryConsume(1);

    res.set("X-RateLimit-Limit", maxTokens);
    res.set("X-RateLimit-Remaining", Math.floor(tokensRemaining));

    if (!allowed) {
      res.set("Retry-After", "1");

      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
        retryAfter: 1,
      });
    }

    next();
  };
}

export default rateLimit;
