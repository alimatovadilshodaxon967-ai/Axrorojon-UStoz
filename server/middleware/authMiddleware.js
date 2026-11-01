import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Authorization: Bearer <token> yoki Cookie orqali
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(";").reduce((res, c) => {
      const [key, val] = c.trim().split("=");
      res[key] = val;
      return res;
    }, {});
    token = cookies["yz_token"];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "yulduzlar_express_jwt_secret_2026_pedagogy");
    if (mongoose.connection.readyState === 1) {
      req.user = await User.findById(decoded.userId).select("-password");
    } else {
      req.user = {
        _id: decoded.userId,
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role || "student",
        xp: 120,
        stars: 2,
        university: "Nizomiy nomidagi TDPU",
        badges: ["first_star"]
      };
    }
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Avtorizatsiyadan o'tilmagan" });
  }
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Sizda ushbu amalni bajarish uchun ruxsat yo'q" });
    }
    next();
  };
};
