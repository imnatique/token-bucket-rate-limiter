import express from "express";
import { stats, buckets, health } from "../controllers/monitorController.js";

export const monitorRoutes = express.Router();

monitorRoutes.get("/stats", stats);

monitorRoutes.get("/buckets", buckets);

monitorRoutes.get("/health", health);
