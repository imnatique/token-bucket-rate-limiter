import { consume } from "../services/redisTokenBucket.js";
import {
  incrementAllowedRequests,
  incrementBlockedRequests,
} from "../services/monitoringService.js";
import {
  DEFAULT_MAX_TOKENS,
  DEFAULT_REFILL_RATE,
} from "../config/constants.js";

export function rateLimit({
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

      res.set("X-RateLimit-Limit", String(maxTokens));
      res.set("X-RateLimit-Remaining", String(Math.floor(tokensRemaining)));

      if (!allowed) {
        await incrementBlockedRequests();

        res.set("Retry-After", "1");

        return res.status(429).json({
          success: false,
          message: "Rate limit exceeded. Please try again later.",
          retryAfter: 1,
        });
      }

      await incrementAllowedRequests();

      next();
    } catch (error) {
      next(error);
    }
  };
}
