import express from "express";
import { search } from "../controllers/searchController.js";

export const searchRoutes = express.Router();

searchRoutes.get("/", search);
