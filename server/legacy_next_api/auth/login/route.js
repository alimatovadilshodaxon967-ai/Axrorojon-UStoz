import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email va parol kiritilishi shart" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "Email yoki parol noto'g'ri" }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Email yoki parol noto'g'ri" }, { status: 401 });
    }

    const token = signToken({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    const res = NextResponse.json({
      success: true,
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
  } catch (error) {
    console.error("Login xatosi:", error);
    return NextResponse.json({ error: "Server xatosi: " + error.message }, { status: 500 });
  }
}
