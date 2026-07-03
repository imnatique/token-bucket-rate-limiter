import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import redis from "../config/redis.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read Lua script only once when server starts
const luaScript = fs.readFileSync(
  path.join(__dirname, "rateLimiter.lua"),
  "utf8"
);

export async function consume(
  bucketKey,
  {
    maxTokens,
    refillRate,
    requestedTokens = 1,
  }
) {
  const now = Date.now();

  const result = await redis.eval(
    luaScript,
    1,
    bucketKey,
    maxTokens,
    refillRate,
    requestedTokens,
    now
  );

  return {
    allowed: result[0] === 1,
    tokensRemaining: Number(result[1]),
  };
}