import express from "express";
import { getAiAdvice } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mentor", protect, getAiAdvice);

export default router;
