import { consume } from "../services/redisTokenBucket.js";
import {
  DEFAULT_MAX_TOKENS,
  DEFAULT_REFILL_RATE,
} from "../config/constants.js";

function rateLimit({
  maxTokens = DEFAULT_MAX_TOKENS,
  refillRate = DEFAULT_REFILL_RATE,
  keyGenerator,
} = {}) {
  return async (req, res, next) => {
    try {
      const identifier = keyGenerator ? keyGenerator(req) : req.ip;

      const bucketKey = `ratelimit:${req.baseUrl}${req.path}:${identifier}`;

      const { allowed, tokensRemaining } = await consume(bucketKey, {
        maxTokens,
        refillRate,
      });

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
    } catch (error) {
      next(error);
    }
  };
}

export default rateLimit;