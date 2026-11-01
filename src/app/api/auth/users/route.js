import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

const DEFAULT_USERS = [
  { id: "1", name: "Farhodjon Olimov", email: "farhodjonolimov@gmail.com", role: "Admin", status: "Faol", yulduz: "0/10" },
  { id: "2", name: "Axrorjon Ustoz", email: "axrorjonustoz@gmail.com", role: "Metodist", status: "Faol", yulduz: "8/10" },
  { id: "3", name: "Aziza Karimova", email: "aziza.karimova@gmail.com", role: "Talaba", status: "Faol", yulduz: "4/10" },
  { id: "4", name: "Jasur Rahimov", email: "jasur.rahimov@gmail.com", role: "Talaba", status: "Kutilmoqda", yulduz: "2/10" }
];

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbUsers = await User.find().select("-password");
      if (dbUsers && dbUsers.length > 0) {
        return NextResponse.json({ success: true, users: dbUsers });
      }
    }
  } catch (e) {}

  return NextResponse.json({ success: true, users: DEFAULT_USERS });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newUser = {
      id: String(Date.now()),
      name: body.name || body.email.split("@")[0],
      email: body.email,
      role: body.role || "Talaba",
      status: "Faol",
      yulduz: "0/10"
    };
    return NextResponse.json({ success: true, user: newUser });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
