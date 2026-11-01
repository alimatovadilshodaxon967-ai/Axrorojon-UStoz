import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ism kiritilishi shart"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email kiritilishi shart"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Parol kiritilishi shart"],
      minlength: 6
    },
    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student"
    },
    university: {
      type: String,
      default: "Nizomiy nomidagi TDPU"
    },
    faculty: {
      type: String,
      default: "Pedagogika va psixologiya"
    },
    course: {
      type: Number,
      default: 3
    },
    xp: {
      type: Number,
      default: 0
    },
    levelIndex: {
      type: Number,
      default: 0
    },
    stars: {
      type: [String],
      default: []
    },
    badges: {
      type: [String],
      default: ["first_star"]
    },
    digCompScores: {
      type: Map,
      of: Number,
      default: {}
    },
    dailyChallengesDone: {
      type: [Number],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Model mavjud bo'lsa uni olamiz, aks holda yangi yaratamiz
export default mongoose.models.User || mongoose.model("User", UserSchema);
