import express from "express";
import authRoutes from "./routes/auth.route.js";

export const app = express();

// Middlewares
app.use(express.json());

//apis
app.use("/api/auth", authRoutes);
