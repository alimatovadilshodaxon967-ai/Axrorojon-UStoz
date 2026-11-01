import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import LessonPlan from "@/models/LessonPlan";
import User from "@/models/User";
import { getCurrentUserFromCookies } from "@/lib/auth";

export async function GET(req) {
  try {
    const session = await getCurrentUserFromCookies();
    await connectToDatabase();

    // Agar mentor yoki admin bo'lsa barchasini, aks holda o'zinikini ko'radi
    let query = {};
    if (session && session.role === "student") {
      query = { userEmail: session.email };
    }

    const plans = await LessonPlan.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, plans });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getCurrentUserFromCookies();
    const body = await req.json();

    await connectToDatabase();

    const plan = await LessonPlan.create({
      userId: session?.userId,
      userEmail: session?.email || "talaba@yulduzlar.uz",
      authorName: session?.name || "Bo'lajak pedagog",
      fan: body.fan,
      mavzu: body.mavzu,
      maqsad: body.maqsad,
      bloomLevel: body.bloomLevel || 3,
      method: body.method || "Klaster metodi",
      duration: body.duration || 45,
      stages: body.stages || []
    });

    // Foydalanuvchiga XP berish
    if (session?.userId) {
      await User.findByIdAndUpdate(session.userId, {
        $inc: { xp: 60 },
        $addToSet: { stars: "mashgulot", badges: "plan_creator" }
      });
    }

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
