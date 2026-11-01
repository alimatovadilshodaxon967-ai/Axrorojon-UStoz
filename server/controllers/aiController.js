import User from "../models/User.js";

// @desc    AI Mentor maslahat va roadmap (Powered by Google Gemini API)
// @route   POST /api/ai/mentor
export const getAiAdvice = async (req, res) => {
  try {
    const { prompt, type } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    let reply = "";

    const systemInstruction = `Siz "Yulduzlar" platformasining Pedagogik AI Mentorisiz. Vazifangiz: bo'lajak pedagog talabalarga va ustozlarga dars loyihalash, Bloom taksonomiyasi, 4K ko'nikmalar (tanqidiy fikrlash, kreativlik, kommunikatsiya, kollaboratsiya), interaktiv metodlar va zamonaviy raqamli vositalar bo'yicha professional, amaliy va ilhomlantiruvchi o'zbek tilida maslahat berish. Javobingizni aniq, tuzilmali (punktlar bilan) va pedagogik jihatdan chuqur yozing.`;

    if (apiKey) {
      try {
        const fullPrompt = type === "roadmap"
          ? `${systemInstruction}\n\nTalaba uchun 4 haftalik shaxsiy pedagogik rivojlanish rejasi (Individual Roadmap) tuzib bering. Har bir haftaga aniq maqsad, amaliy vazifa va tavsiya etiladigan raqamli ta'lim vositalarini ko'rsating.`
          : `${systemInstruction}\n\nTalabaning savoli/topshirig'i:\n${prompt}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullPrompt }] }]
            })
          }
        );

        const geminiData = await geminiRes.json();
        if (geminiData.candidates && geminiData.candidates[0]?.content?.parts?.[0]?.text) {
          reply = geminiData.candidates[0].content.parts[0].text;
        }
      } catch (apiErr) {
        console.error("Gemini API call failed, using fallback:", apiErr.message);
      }
    }

    // Fallback if API was unavailable
    if (!reply) {
      const p = (prompt || "").toLowerCase();
      if (type === "roadmap") {
        reply = `🌟 **SHAXSIY PEDAGOGIK RIVOJLANISH REJASI (ROADMAP):**\n\n1-qadam: Raqamli gigiyena va xavfsizlik (1-hafta)\n- O'quvchilar bilan axborotni tekshirish (faktcheking) va raqamli xulq-atvor qoidalarini ishlab chiqish.\n\n2-qadam: Interaktiv baholash vositalari (2-hafta)\n- Har bir dars oxirida formativ baholash uchun Kahoot/Quizizz platformalarida 3 savolli diagnostika o'tkazish.\n\n3-qadam: Bloom taksonomiyasi va 4K integratsiyasi (3-hafta)\n- Bloom'ning 'Tahlil' va 'Yaratish' darajalari bo'yicha mustaqil loyiha topshiriqlari tayyorlash.`;
      } else if (p.includes("test") || p.includes("savol")) {
        reply = `📚 **AI tomonidan tavsiya etilgan formativ test savollari:**\n1. *(Bloom: Eslab qolish)* Mavzuning asosiy tushunchasini to'g'ri ta'riflang.\n2. *(Bloom: Tushunish)* Ikki asosiy hodisa o'rtasidagi farqni misollar bilan ko'rsating.\n3. *(Bloom: Qo'llash)* Ushbu qoidani yangi vaziyatda qanday qo'llash mumkin?\n💡 *Maslahat:* Ushbu savollarni interaktiv so'rovnomada qo'llang.`;
      } else if (p.includes("dars") || p.includes("ishlanma") || p.includes("rejasi")) {
        reply = `🎯 **Dars loyihalash bo'yicha Express AI Mentor xulosasi:**\n• Dars maqsadini aniq va o'lchanadigan natijalar bilan belgilang.\n• Har 10-12 daqiqada faoliyat turini o'zgartiring (tinglash → guruhda ishlash → tahlil).\n• Dars yakunida '3-2-1' refleksiya usuli orqali o'quvchilardan xulosa oling.`;
      } else {
        reply = `💡 **Pedagogik Mentor tavsiyasi:**\nZamonaviy darsda o'qituvchi faqat axborot beruvchi emas, balki fasilitator (yo'naltiruvchi) hisoblanadi. O'quvchilarga tayyor yechim berishdan ko'ra, muammoli savollar orqali ularni mustaqil fikrlashga undash ancha samaralidir.`;
      }
    }

    if (req.user) {
      try {
        await User.findByIdAndUpdate(req.user._id, {
          $inc: { xp: 20 },
          $addToSet: { stars: "ai", badges: "ai_partner" }
        });
      } catch (e) {}
    }

    res.json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
