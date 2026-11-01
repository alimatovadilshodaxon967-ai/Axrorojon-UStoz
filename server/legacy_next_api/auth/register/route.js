import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, email, password, role, university, faculty, course } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Barcha maydonlarni to'ldiring" }, { status: 400 });
    }

    await connectToDatabase();

    // Foydalanuvchi mavjudligini tekshirish
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "Ushbu email bilan foydalanuvchi allaqachon mavjud" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "student",
      university: university || "Nizomiy nomidagi TDPU",
      faculty: faculty || "Pedagogika va psixologiya",
      course: course || 3,
      xp: 50, // Boshlang'ich bonus
      badges: ["first_star"]
    });

    const token = signToken({
      userId: newUser._id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        xp: newUser.xp,
        university: newUser.university
      }
    });

    res.cookies.set("yz_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 kun
      path: "/"
    });

    return res;
  } catch (error) {
    console.error("Register xatosi:", error);
    return NextResponse.json({ error: "Server xatosi: " + error.message }, { status: 500 });
  }
}
