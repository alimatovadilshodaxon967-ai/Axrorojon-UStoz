import LessonPlan from "../models/LessonPlan.js";
import User from "../models/User.js";

// @desc    Get all lesson plans
// @route   GET /api/lesson-plans
export const getLessonPlans = async (req, res) => {
  try {
    let query = {};
    if (req.user && req.user.role === "student") {
      query = { userEmail: req.user.email };
    }

    const plans = await LessonPlan.find(query).sort({ createdAt: -1 });
    res.json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create new lesson plan
// @route   POST /api/lesson-plans
export const createLessonPlan = async (req, res) => {
  try {
    const { fan, mavzu, maqsad, bloomLevel, method, duration, stages } = req.body;

    const plan = await LessonPlan.create({
      userId: req.user?._id,
      userEmail: req.user?.email || "talaba@yulduzlar.uz",
      authorName: req.user?.name || "Bo'lajak pedagog",
      fan,
      mavzu,
      maqsad,
      bloomLevel: bloomLevel || 3,
      method: method || "Klaster metodi",
      duration: duration || 45,
      stages: stages || []
    });

    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { xp: 60 },
        $addToSet: { stars: "mashgulot", badges: "plan_creator" }
      });
    }

    res.status(201).json({ success: true, plan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
