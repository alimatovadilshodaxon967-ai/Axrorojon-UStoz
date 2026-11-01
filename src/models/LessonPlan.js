import mongoose from "mongoose";

const LessonPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    userEmail: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      default: "Bo'lajak pedagog"
    },
    fan: {
      type: String,
      required: true
    },
    mavzu: {
      type: String,
      required: true
    },
    maqsad: {
      type: String,
      default: ""
    },
    bloomLevel: {
      type: Number,
      default: 3
    },
    method: {
      type: String,
      default: "Klaster metodi"
    },
    duration: {
      type: Number,
      default: 45
    },
    stages: [
      {
        stage: String,
        time: Number,
        method: String,
        desc: String,
        skill: String
      }
    ],
    aiFeedback: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.LessonPlan || mongoose.model("LessonPlan", LessonPlanSchema);
