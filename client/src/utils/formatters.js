export function formatEndpoint(redisKey) {
  if (!redisKey) return "-";

  // Remove Redis prefix
  let endpoint = redisKey.replace("ratelimit:", "");

  // Remove IPv6 localhost (::1)
  endpoint = endpoint.replace(":::1", "");

  // Remove IPv4 localhost
  endpoint = endpoint.replace(":127.0.0.1", "");

  // Remove anything after the last colon (future-proof)
  endpoint = endpoint.replace(/:[^/]+$/, "");

  return endpoint;
}

export function formatTTL(ttl) {
  if (ttl < 0) return "∞";

  return `${ttl}s`;
}

export function formatTokens(tokens) {
  return Number(tokens).toFixed(2);
}
