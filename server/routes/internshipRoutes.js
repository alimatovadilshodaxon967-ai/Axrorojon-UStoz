import express from "express";
import { getInternshipNotes, createInternshipNote, approveInternshipNote } from "../controllers/internshipController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getInternshipNotes)
  .post(protect, createInternshipNote)
  .patch(protect, approveInternshipNote);

export default router;
