import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Internship from "@/models/Internship";
import User from "@/models/User";
import { getCurrentUserFromCookies } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getCurrentUserFromCookies();
    await connectToDatabase();

    let query = {};
    if (session && session.role === "student") {
      query = { userEmail: session.email };
    }

    const notes = await Internship.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, notes });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getCurrentUserFromCookies();
    const body = await req.json();

    if (!body.activity) {
      return NextResponse.json({ error: "Bajarilgan ish mazmunini kiriting" }, { status: 400 });
    }

    await connectToDatabase();

    const note = await Internship.create({
      userId: session?.userId,
      userEmail: session?.email || "talaba@yulduzlar.uz",
      studentName: session?.name || "Talaba",
      school: body.school || "Muassasa ko'rsatilmagan",
      date: body.date || new Date().toISOString().split("T")[0],
      activity: body.activity,
      status: "pending"
    });

    if (session?.userId) {
      await User.findByIdAndUpdate(session.userId, {
        $inc: { xp: 30 }
      });
    }

    return NextResponse.json({ success: true, note });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getCurrentUserFromCookies();
    const { id, status, mentorComment } = await req.json();

    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Faqat Ustoz / Mentor tasdiqlashi mumkin" }, { status: 403 });
    }

    await connectToDatabase();

    const updated = await Internship.findByIdAndUpdate(
      id,
      {
        status: status || "approved",
        mentorComment: mentorComment || "Amaliyot rahbari tomonidan tasdiqlangan.",
        mentorName: session.name
      },
      { new: true }
    );

    return NextResponse.json({ success: true, note: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
