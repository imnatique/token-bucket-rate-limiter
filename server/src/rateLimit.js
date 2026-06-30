const { getBucket } = require('./bucketStore');

function rateLimit({ maxTokens = 10, refillRate = 1, keyGenerator } = {}) {
  return (req, res, next) => {
    const key = keyGenerator ? keyGenerator(req) : req.ip;
    const bucket = getBucket(key, maxTokens, refillRate);

    const { allowed, tokensRemaining } = bucket.tryConsume(1);

    res.set('X-RateLimit-Limit', maxTokens);
    res.set('X-RateLimit-Remaining', Math.floor(tokensRemaining));

    if (!allowed) {
      return res.status(429).json({ error: 'Too many requests, slow down.' });
    }
    next();
  };
}

module.exports = rateLimit;
