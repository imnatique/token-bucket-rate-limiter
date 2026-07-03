import express from "express";
import redis from "../config/redis.js";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({
    message: "pong",
    time: new Date().toISOString(),
  });
});

router.get("/redis-test", async (req, res) => {
  try {
    await redis.set("message", "Hello Redis!");

    const value = await redis.get("message");

    res.json({
      success: true,
      data: value,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/redis-hash", async (req, res) => {
  try {
    const bucketKey = "ratelimit:test-user";

    await redis.hset(bucketKey, {
      tokens: 5,
      lastRefill: Date.now(),
    });

    const bucket = await redis.hgetall(bucketKey);

    res.json({
      success: true,
      bucket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;