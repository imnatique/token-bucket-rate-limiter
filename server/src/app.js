import express from "express";
import rateLimit from "./middleware/rateLimit.js";
import demoRoutes from "./routes/demoRoutes.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Tight bucket so it's easy to trigger 429s while testing manually

app.use(
    "/api",
    rateLimit({
        maxTokens: 5,
        refillRate: 1,
    }),
    demoRoutes
);

app.get("/", (req, res) => {
  res.send("Token Bucket Rate Limiter - Phase 1 (In-Memory)");
});

export default app;