import Internship from "../models/Internship.js";
import User from "../models/User.js";

// @desc    Get internship notes
// @route   GET /api/internship
export const getInternshipNotes = async (req, res) => {
  try {
    let query = {};
    if (req.user && req.user.role === "student") {
      query = { userEmail: req.user.email };
    }

    const notes = await Internship.find(query).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create new internship note
// @route   POST /api/internship
export const createInternshipNote = async (req, res) => {
  try {
    const { school, date, activity } = req.body;

    if (!activity) {
      return res.status(400).json({ error: "Bajarilgan ish mazmunini kiriting" });
    }

    const note = await Internship.create({
      userId: req.user?._id,
      userEmail: req.user?.email || "talaba@yulduzlar.uz",
      studentName: req.user?.name || "Talaba",
      school: school || "Muassasa ko'rsatilmagan",
      date: date || new Date().toISOString().split("T")[0],
      activity,
      status: "pending"
    });

    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { xp: 30 }
      });
    }

    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Approve internship note by Mentor/Admin
// @route   PATCH /api/internship
export const approveInternshipNote = async (req, res) => {
  try {
    const { id, status, mentorComment } = req.body;

    if (!req.user || (req.user.role !== "mentor" && req.user.role !== "admin")) {
      return res.status(403).json({ error: "Faqat Ustoz / Mentor tasdiqlashi mumkin" });
    }

    const updated = await Internship.findByIdAndUpdate(
      id,
      {
        status: status || "approved",
        mentorComment: mentorComment || "Axrorjon Ustoz tomonidan tasdiqlandi ✓",
        mentorName: req.user.name
      },
      { new: true }
    );

    res.json({ success: true, note: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
