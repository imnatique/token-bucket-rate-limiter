/**
 * Token Bucket Algorithm
 *
 * maxTokens   -> Maximum bucket capacity
 * refillRate  -> Tokens added per second
 */

class TokenBucket {
  constructor(maxTokens, refillRate) {
    this.maxTokens = maxTokens;     // Bucket capacity
    this.refillRate = refillRate;   // Tokens added per second
    this.tokens = maxTokens;        // Bucket starts full
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefill) / 1000;
    const tokensToAdd = elapsedSeconds * this.refillRate;

    this.tokens = Math.min(
      this.maxTokens,
      this.tokens + tokensToAdd
    );

    this.lastRefill = now;
  }

  tryConsume(requestedTokens = 1) {
    this.refill();

    if (this.tokens >= requestedTokens) {
      this.tokens -= requestedTokens;

      return {
        allowed: true,
        tokensRemaining: this.tokens,
      };
    }

    return {
      allowed: false,
      tokensRemaining: this.tokens,
    };
  }
}

export default TokenBucket;