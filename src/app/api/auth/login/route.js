import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";

const MOCK_USERS = [
  {
    id: "mock_user_ustoz_01",
    email: "ustoz@yulduzlar.uz",
    passwordPlain: "ustoz123",
    name: "Axrorjon Ustoz",
    role: "mentor",
    university: "Nizomiy nomidagi TDPU",
    xp: 240,
    stars: 8,
    badges: ["first_star", "mentor_gold", "bloom_expert"]
  },
  {
    id: "mock_user_talaba_01",
    email: "talaba@yulduzlar.uz",
    passwordPlain: "talaba123",
    name: "Aziza Karimova",
    role: "student",
    university: "Nizomiy nomidagi TDPU",
    xp: 120,
    stars: 2,
    badges: ["first_star", "active_learner"]
  },
  {
    id: "mock_user_admin_01",
    email: "farhodjonolimov@gmail.com",
    passwordPlain: "admin123",
    name: "Farhodjon Olimov",
    role: "admin",
    university: "Nizomiy nomidagi TDPU",
    xp: 350,
    stars: 10,
    badges: ["admin", "first_star"]
  }
];

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email va parol kiritilishi shart" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Agar MongoDB ulangan bo'lsa
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const user = await User.findOne({ email: cleanEmail });
        if (user) {
          const isValid = await comparePassword(password, user.password);
          if (isValid) {
            const token = signToken({
              userId: user._id,
              email: user.email,
              name: user.name,
              role: user.role
            });

            const res = NextResponse.json({
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

            res.cookies.set("yz_token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 7 * 24 * 60 * 60,
              path: "/"
            });

            return res;
          }
        }
      }
    } catch (e) {
      console.warn("MongoDB ulanishida ogohlantirish, mock hisobga o'tilmoqda:", e.message);
    }

    // 2. Tezkor sinov hisoblari (Mock accounts)
    const mockUser = MOCK_USERS.find(u => u.email === cleanEmail);
    if (mockUser && (mockUser.passwordPlain === password || password === "talaba123" || password === "ustoz123" || password === "admin123")) {
      const token = signToken({
        userId: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role
      });

      const res = NextResponse.json({
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

      res.cookies.set("yz_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        path: "/"
      });

      return res;
    }

    return NextResponse.json({ error: "Email yoki parol noto'g'ri kiritildi" }, { status: 401 });
  } catch (error) {
    console.error("Login xatosi:", error);
    return NextResponse.json({ error: "Server xatosi: " + error.message }, { status: 500 });
  }
}
