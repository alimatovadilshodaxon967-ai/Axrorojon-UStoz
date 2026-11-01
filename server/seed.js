import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import LessonPlan from "./models/LessonPlan.js";
import Internship from "./models/Internship.js";

dotenv.config({ path: "./server/.env" });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: "./.env.local" });
}

const uri = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB ga ulandi, ma'lumotlar yuklanmoqda...");

    // Mavjud foydalanuvchilarni tekshirish
    const count = await User.countDocuments();
    if (count === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashMentor = await bcrypt.hash("ustoz123", salt);
      const hashStudent = await bcrypt.hash("talaba123", salt);

      // Axrorjon Ustoz (Mentor / Metodist)
      const mentor = await User.create({
        name: "Axrorjon Ustoz",
        email: "ustoz@yulduzlar.uz",
        password: hashMentor,
        role: "mentor",
        university: "Nizomiy nomidagi TDPU",
        faculty: "Pedagogika va metodika kafedrasi",
        course: 4,
        xp: 1500,
        stars: ["interaktiv", "metodik", "mashgulot", "xalqaro", "amaliyot", "ai", "portfolio"],
        badges: ["first_star", "quiz_master", "case_solver", "plan_creator", "intern_hero", "ai_partner"]
      });

      // Namunaviy Talaba
      const student = await User.create({
        name: "Aziza Karimova",
        email: "talaba@yulduzlar.uz",
        password: hashStudent,
        role: "student",
        university: "Nizomiy nomidagi TDPU",
        faculty: "Pedagogika va psixologiya",
        course: 3,
        xp: 120,
        stars: ["interaktiv"],
        badges: ["first_star"]
      });

      // Namunaviy dars ishlanmasi
      await LessonPlan.create({
        userId: student._id,
        userEmail: student.email,
        authorName: student.name,
        fan: "Informatika va axborot texnologiyalari",
        mavzu: "Sun'iy intellekt va raqamli xavfsizlik asoslari",
        maqsad: "O'quvchilarda axborot xavfsizligi va kibergigiyena ko'nikmalarini shakllantirish.",
        bloomLevel: 4,
        method: "Keys-stadi (Case study)",
        duration: 45,
        stages: [
          { stage: "1. Tashkiliy qism", time: 5, method: "Muz eritar", desc: "Kiberbulling bo'yicha qisqa videorolik namoyishi", skill: "Kommunikatsiya" },
          { stage: "2. Yangi mavzu", time: 12, method: "Taqdimot", desc: "Kuchli parollar va feyk xabarlarni tekshirish", skill: "Tanqidiy fikrlash" },
          { stage: "3. Amaliy topshiriq", time: 18, method: "Guruhlarda ishlash", desc: "Real kiberxuruj keysini tahlil qilish", skill: "Hamkorlik" },
          { stage: "4. Baholash", time: 6, method: "Quizizz testi", desc: "3 ta formativ test topshirig'i", skill: "Tahlil" },
          { stage: "5. Yakun", time: 4, method: "3-2-1 refleksiya", desc: "O'quvchilar xulosasi", skill: "O'zini baholash" }
        ]
      });

      // Namunaviy amaliyot qaydi
      await Internship.create({
        userId: student._id,
        userEmail: student.email,
        studentName: student.name,
        school: "Toshkent shahar 187-umumta'lim maktabi",
        date: "2026-10-30",
        activity: "8-sinfda 'Algoritmlar' mavzusida interaktiv so'rovnoma orqali dars o'tildi.",
        status: "approved",
        mentorComment: "Dars metodik talablarga to'liq mos ravishda o'tkazildi. Axrorjon Ustoz tasdiqladi ✓",
        mentorName: "Axrorjon Ustoz"
      });

      console.log("✓ Namunaviy ma'lumotlar MongoDB ga muvaffaqiyatli kiritildi!");
    } else {
      console.log("Bazada allaqachon foydalanuvchilar mavjud.");
    }

    process.exit(0);
  } catch (e) {
    console.error("Seed xatosi:", e);
    process.exit(1);
  }
}

seed();
