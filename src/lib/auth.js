// ========================================================
// Yulduzlar Fullstack - JWT & Authentication Utility
// ========================================================

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "yulduzlar_super_secret_jwt_key_2026_pedagogy_platform";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

export async function getCurrentUserFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get("yz_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}
