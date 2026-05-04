import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import multer from "multer";

export const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your production domain later
    credentials: true, // Essential for sending cookies (like your refresh token!)
  }),
);
app.use(cookieParser()); // Ye line zaroor honi chahiye
app.use(multer());

//apis
app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
