import express from "express";
import { getOrders } from "../controllers/orderController.js";

export const orderRoutes = express.Router();

orderRoutes.get("/", getOrders);
