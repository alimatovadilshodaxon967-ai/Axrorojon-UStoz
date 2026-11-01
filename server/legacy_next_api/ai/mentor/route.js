import { NextResponse } from "next/server";
import { getCurrentUserFromCookies } from "@/lib/auth";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { prompt, type } = await req.json();
    const session = await getCurrentUserFromCookies();

    // Pedagogik bilimlar bazasi va sun'iy intellekt tahlili
    let reply = "";
    const p = (prompt || "").toLowerCase();

    if (type === "roadmap") {
      reply = `
🌟 **SHAXSIY PEDAGOGIK RIVOJLANISH REJASI (ROADMAP):**

1-qadam: Raqamli gigiyena va xavfsizlik (1-hafta)
- O'quvchilar bilan axborotni tekshirish (faktcheking) va raqamli xulq-atvor qoidalarini ishlab chiqish.

2-qadam: Interaktiv baholash vositalari (2-hafta)
- Har bir dars oxirida formativ baholash uchun Kahoot/Quizizz platformalarida 3 savolli diagnostika o'tkazish.

3-qadam: Bloom taksonomiyasi va 4K integratsiyasi (3-hafta)
- Bloom'ning 'Tahlil' va 'Yaratish' darajalari bo'yicha mustaqil loyiha topshiriqlari tayyorlash.
      `;
    } else if (p.includes("test") || p.includes("savol")) {
      reply = `
📚 **AI tomonidan tavsiya etilgan formativ test savollari:**
1. *(Bloom: Eslab qolish)* Mavzuning asosiy tushunchasini to'g'ri ta'riflang.
2. *(Bloom: Tushunish)* Ikki asosiy hodisa o'rtasidagi farqni misollar bilan ko'rsating.
3. *(Bloom: Qo'llash)* Ushbu qoidani yangi vaziyatda qanday qo'llash mumkin?
💡 *Maslahat:* Ushbu savollarni interaktiv so'rovnomada qo'llang.
      `;
    } else if (p.includes("dars") || p.includes("ishlanma") || p.includes("rejasi")) {
      reply = `
🎯 **Dars loyihalash bo'yicha AI Mentor xulosasi:**
• Dars maqsadini aniq va o'lchanadigan natijalar bilan belgilang.
• Har 10-12 daqiqada faoliyat turini o'zgartiring (tinglash → guruhda ishlash → tahlil).
• Dars yakunida '3-2-1' refleksiya usuli orqali o'quvchilardan xulosa oling.
      `;
    } else {
      reply = `
💡 **Pedagogik Mentor tavsiyasi:**
Zamonaviy darsda o'qituvchi faqat axborot beruvchi emas, balki fasilitator (yo'naltiruvchi) hisoblanadi. O'quvchilarga tayyor yechim berishdan ko'ra, muammoli savollar orqali ularni mustaqil fikrlashga undash ancha samaralidir.
      `;
    }

    if (session?.userId) {
      await connectToDatabase();
      await User.findByIdAndUpdate(session.userId, {
        $inc: { xp: 20 },
        $addToSet: { stars: "ai", badges: "ai_partner" }
      });
    }

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
