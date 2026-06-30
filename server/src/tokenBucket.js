class TokenBucket {
  constructor(maxTokens, refillRate) {
    this.maxTokens = maxTokens;     // bucket capacity
    this.refillRate = refillRate;   // tokens added per second
    this.tokens = maxTokens;        // bucket starts full
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefill) / 1000;
    const tokensToAdd = elapsedSeconds * this.refillRate;

    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  tryConsume(requested = 1) {
    this.refill();

    if (this.tokens >= requested) {
      this.tokens -= requested;
      return { allowed: true, tokensRemaining: this.tokens };
    }
    return { allowed: false, tokensRemaining: this.tokens };
  }
}

module.exports = TokenBucket;
