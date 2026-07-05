export const DEFAULT_MAX_TOKENS = 10;

export const DEFAULT_REFILL_RATE = 1;

export const HTTP_STATUS = {
  OK: 200,
  TOO_MANY_REQUESTS: 429,
};

export const RATE_LIMIT_HEADERS = {
  LIMIT: "X-RateLimit-Limit",
  REMAINING: "X-RateLimit-Remaining",
  RETRY_AFTER: "Retry-After",
};
