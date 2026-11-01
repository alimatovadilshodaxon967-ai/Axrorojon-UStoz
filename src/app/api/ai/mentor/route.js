import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, type } = await req.json();
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
      } catch (err) {
        console.error("Gemini route error:", err.message);
      }
    }

    if (!reply) {
      reply = `💡 **Pedagogik AI Maslahati:**\nDars jarayonida o'quvchilar faolligini oshirish uchun Bloom taksonomiyasi va 4K modeli (tanqidiy fikrlash, kreativlik, kollaboratsiya, kommunikatsiya) usullaridan foydalanish tavsiya etiladi.`;
    }

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
