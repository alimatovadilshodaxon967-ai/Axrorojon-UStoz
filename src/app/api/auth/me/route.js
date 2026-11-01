import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUserFromCookies } from "@/lib/auth";

const MOCK_USERS = [
  {
    id: "mock_user_ustoz_01",
    email: "ustoz@yulduzlar.uz",
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
    name: "Farhodjon Olimov",
    role: "admin",
    university: "Nizomiy nomidagi TDPU",
    xp: 350,
    stars: 10,
    badges: ["admin", "first_star"]
  }
];

export async function GET() {
  try {
    const sessionUser = await getCurrentUserFromCookies();
    if (!sessionUser) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const user = await User.findById(sessionUser.userId).select("-password");
        if (user) {
          return NextResponse.json({ authenticated: true, user });
        }
      }
    } catch (e) {
      // offline fallback
    }

    const mock = MOCK_USERS.find(u => u.id === sessionUser.userId || u.email === sessionUser.email);
    if (mock) {
      return NextResponse.json({ authenticated: true, user: mock });
    }

    return NextResponse.json({ authenticated: true, user: sessionUser });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const sessionUser = await getCurrentUserFromCookies();
    if (!sessionUser) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const updates = await req.json();
    try {
      await connectToDatabase();
      const updatedUser = await User.findByIdAndUpdate(
        sessionUser.userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-password");
      if (updatedUser) {
        return NextResponse.json({ success: true, user: updatedUser });
      }
    } catch (e) {}

    return NextResponse.json({ success: true, user: { ...sessionUser, ...updates } });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Tizimdan chiqildi" });
  res.cookies.set("yz_token", "", { maxAge: 0, path: "/" });
  return res;
}
