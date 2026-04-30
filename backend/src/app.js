import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";

export const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your production domain later
    credentials: true, // Essential for sending cookies (like your refresh token!)
  }),
);

//apis
app.use("/api/auth", authRoutes);
