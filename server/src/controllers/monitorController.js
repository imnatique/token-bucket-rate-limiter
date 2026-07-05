import { getStats, getBuckets } from "../services/monitoringService.js";

export async function stats(req, res, next) {
  try {
    const data = await getStats();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function buckets(req, res, next) {
  try {
    const data = await getBuckets();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export function health(req, res) {
  res.json({
    success: true,
    status: "OK",
    redis: "connected",
    uptime: Math.floor(process.uptime()),
  });
}
