// ========================================================
// Yulduzlar Platformasi - Express.js + Node.js + MongoDB Server
// ========================================================

import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { connectDB } from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import lessonPlanRoutes from "./routes/lessonPlanRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true, // Har qanday frontend domeniga (Netlify, localhost) ruxsat berish
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Baza bilan bog'lanish
connectDB();

// API Marshrutlar
app.use("/api/auth", authRoutes);
app.use("/api/lesson-plans", lessonPlanRoutes);
app.use("/api/internship", internshipRoutes);
app.use("/api/ai", aiRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Yulduzlar Express.js + Node.js + MongoDB API serveri faol",
    timestamp: new Date().toISOString()
  });
});

// Asosiy root
app.get("/", (req, res) => {
  res.send("<h1>Yulduzlar REST API Server (Express.js + MongoDB)</h1><p>API holati: <a href='/api/health'>/api/health</a></p>");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server xatosi:", err.stack);
  res.status(500).json({
    error: "Ichki server xatosi yuz berdi",
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Express.js backend server ishga tushdi: http://localhost:${PORT}`);
});

export default app;
