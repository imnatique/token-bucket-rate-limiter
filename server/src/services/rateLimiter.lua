-- KEYS[1] = Redis bucket key
-- ARGV[1] = maxTokens
-- ARGV[2] = refillRate (tokens per second)
-- ARGV[3] = requestedTokens
-- ARGV[4] = currentTimestamp (milliseconds)

local key = KEYS[1]

local maxTokens = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local requested = tonumber(ARGV[3])
local now = tonumber(ARGV[4])

-- Fetch bucket data
local bucket = redis.call("HMGET", key, "tokens", "lastRefill")

local tokens = tonumber(bucket[1])
local lastRefill = tonumber(bucket[2])

-- Initialize bucket if it doesn't exist
if tokens == nil then
    tokens = maxTokens
    lastRefill = now
end

-- Calculate elapsed time
local elapsed = math.max(0, now - lastRefill)

-- Calculate how many tokens to add
local refill = (elapsed / 1000) * refillRate

tokens = math.min(maxTokens, tokens + refill)

local allowed = 0

if tokens >= requested then
    tokens = tokens - requested
    allowed = 1
end

redis.call(
    "HMSET",
    key,
    "tokens",
    tokens,
    "lastRefill",
    now
)

redis.call(
    "EXPIRE",
    key,
    math.ceil(maxTokens / refillRate) * 2
)

return {
    allowed,
    tokens
}