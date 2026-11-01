import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, email, password, role, university, faculty, course } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Ism, email va parol kiritilishi shart" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const existing = await User.findOne({ email: cleanEmail });
        if (existing) {
          return NextResponse.json({ error: "Bu email bilan foydalanuvchi allaqachon mavjud" }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
          name,
          email: cleanEmail,
          password: hashedPassword,
          role: role || "student",
          university: university || "Nizomiy nomidagi TDPU",
          faculty: faculty || "Informatika va matematika",
          course: course || "3-kurs",
          xp: 50,
          stars: 1,
          badges: ["first_star"]
        });

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
            stars: user.stars
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
    } catch (e) {
      console.warn("MongoDB error, fallback:", e.message);
    }

    // Mock fallback
    const mockId = "mock_user_" + Date.now();
    const token = signToken({
      userId: mockId,
      email: cleanEmail,
      name,
      role: role || "student"
    });

    const res = NextResponse.json({
      success: true,
      token,
      user: {
        id: mockId,
        name,
        email: cleanEmail,
        role: role || "student",
        xp: 50,
        stars: 1
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
    return NextResponse.json({ error: "Server xatosi: " + error.message }, { status: 500 });
  }
}
