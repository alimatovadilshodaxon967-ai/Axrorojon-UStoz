import express from "express";
import { getLessonPlans, createLessonPlan } from "../controllers/lessonPlanController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getLessonPlans)
  .post(protect, createLessonPlan);

export default router;
