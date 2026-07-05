import express from "express";
import morgan from "morgan";
// import dotenv from "dotenv";
import cors from "cors";

import { rateLimit } from "./middleware/rateLimit.js";

import { authRoutes } from "./routes/authRoutes.js";
import { searchRoutes } from "./routes/searchRoutes.js";
import { orderRoutes } from "./routes/orderRoutes.js";
import { monitorRoutes } from "./routes/monitorRoutes.js";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.use(
  "/api/auth",
  rateLimit({
    maxTokens: 3,
    refillRate: 0.5,
  }),
  authRoutes,
);

app.use(
  "/api/search",
  rateLimit({
    maxTokens: 20,
    refillRate: 5,
  }),
  searchRoutes,
);

app.use(
  "/api/orders",
  rateLimit({
    maxTokens: 10,
    refillRate: 2,
  }),
  orderRoutes,
);

app.use("/api/monitor", monitorRoutes);

app.get("/", (req, res) => {
  res.send("Token Bucket Rate Limiter - Redis Integration");
});
