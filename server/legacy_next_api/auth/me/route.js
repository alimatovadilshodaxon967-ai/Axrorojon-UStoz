import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUserFromCookies } from "@/lib/auth";

export async function GET() {
  try {
    const sessionUser = await getCurrentUserFromCookies();
    if (!sessionUser) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    await connectToDatabase();
    const user = await User.findById(sessionUser.userId).select("-password");

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({ authenticated: true, user });
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
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      sessionUser.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Tizimdan chiqildi" });
  res.cookies.set("yz_token", "", { maxAge: 0, path: "/" });
  return res;
}
