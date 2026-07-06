import axios from "axios";

export const api = axios.create({
  baseURL: "https://token-bucket-rate-limiter-ml4c.onrender.com/api",
});