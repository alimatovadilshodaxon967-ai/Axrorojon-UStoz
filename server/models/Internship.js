import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
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
    studentName: {
      type: String,
      default: "Talaba"
    },
    school: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    activity: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    mentorComment: {
      type: String,
      default: ""
    },
    mentorName: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Internship || mongoose.model("Internship", InternshipSchema);
