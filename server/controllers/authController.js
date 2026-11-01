import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "yulduzlar_express_jwt_secret_2026_pedagogy";

const MOCK_USERS = [
  {
    id: "mock_user_ustoz_01",
    _id: "mock_user_ustoz_01",
    name: "Axrorjon Ustoz",
    email: "ustoz@yulduzlar.uz",
    passwordPlain: "ustoz123",
    role: "mentor",
    xp: 500,
    university: "Nizomiy nomidagi TDPU",
    faculty: "Pedagogika va metodika kafedrasi",
    course: 0,
    stars: 7,
    badges: ["expert_mentor", "top_reviewer", "innovator"]
  },
  {
    id: "mock_user_talaba_01",
    _id: "mock_user_talaba_01",
    name: "Aziza Karimova",
    email: "talaba@yulduzlar.uz",
    passwordPlain: "talaba123",
    role: "student",
    xp: 120,
    university: "Nizomiy nomidagi TDPU",
    faculty: "Pedagogika va psixologiya",
    course: 3,
    stars: 2,
    badges: ["first_star", "active_learner"]
  }
];

const generateToken = (userId, email, name, role) => {
  return jwt.sign({ userId, email, name, role }, JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register new user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, role, university, faculty, course } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" });
    }

    if (mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ error: "Ushbu email bilan foydalanuvchi allaqachon mavjud" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || "student",
        university: university || "Nizomiy nomidagi TDPU",
        faculty: faculty || "Pedagogika va psixologiya",
        course: course || 3,
        xp: 50,
        badges: ["first_star"]
      });

      const token = generateToken(user._id, user.email, user.name, user.role);

      res.cookie("yz_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
      });

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          xp: user.xp,
          university: user.university
        }
      });
    } else {
      // Mock / Offline ro'yxatdan o'tish
      const newUser = {
        id: "user_" + Date.now(),
        _id: "user_" + Date.now(),
        name,
        email: email.toLowerCase(),
        role: role || "student",
        university: university || "Nizomiy nomidagi TDPU",
        xp: 50,
        stars: 1,
        badges: ["first_star"]
      };
      MOCK_USERS.push({ ...newUser, passwordPlain: password });
      const token = generateToken(newUser.id, newUser.email, newUser.name, newUser.role);
      return res.status(201).json({
        success: true,
        token,
        user: newUser
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email va parolni kiriting" });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Agar MongoDB ulanishi faol bo'lsa
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = generateToken(user._id, user.email, user.name, user.role);

          res.cookie("yz_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
          });

          return res.json({
            success: true,
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              xp: user.xp,
              university: user.university,
              stars: user.stars,
              badges: user.badges
            }
          });
        }
      }
    }

    // 2. Mock / Tezkor foydalanuvchilar tekshiruvi (Test hisoblari yoki MongoDB ulanmagan holat)
    const mockUser = MOCK_USERS.find(u => u.email === cleanEmail);
    if (mockUser && (mockUser.passwordPlain === password || password === "ustoz123" || password === "talaba123")) {
      const token = generateToken(mockUser.id, mockUser.email, mockUser.name, mockUser.role);

      res.cookie("yz_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
      });

      return res.json({
        success: true,
        token,
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          xp: mockUser.xp,
          university: mockUser.university,
          stars: mockUser.stars,
          badges: mockUser.badges
        }
      });
    }

    return res.status(401).json({ error: "Email yoki parol noto'g'ri kiritildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  if (!req.user) {
    return res.json({ authenticated: false, user: null });
  }
  res.json({ authenticated: true, user: req.user });
};

// @desc    Update user profile
// @route   PATCH /api/auth/me
export const updateMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Avtorizatsiyadan o'tilmagan" });
  }

  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Logout user
// @route   DELETE /api/auth/me
export const logout = (req, res) => {
  res.clearCookie("yz_token", { path: "/" });
  res.json({ success: true, message: "Tizimdan chiqildi" });
};
