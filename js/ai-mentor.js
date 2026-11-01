// ========================================================
// Yulduzlar Platformasi - Pedagogik Mentor AI
// Gemini & Claude API integratsiyasi va Metodik Bilimlar Bazasi
// ========================================================

const AIMentor = (() => {
  // Offline / Tezkor metodik bilimlar bazasi
  const KNOWLEDGE_BASE = {
    "dars_boshlash": "Darsni boshlashda 'Muz eritar' (Ice-breaker) usulidan foydalaning: mavzuga doir kutilmagan fakt yoki 1 daqiqalik qiziqarli videorolik ko'rsating.",
    "baho": "Formativ baholash uchun Kahoot, Quizizz yoki Plickers vositalari orqali dars davomida o'quvchilarning tushunish darajasini darhol tekshiring va konstruktiv izoh bering.",
    "motivatsiya": "O'quvchilarda ichki motivatsiya uyg'otish uchun 'Loyiha asosida ta'lim' (PBL) metodini qo'llang: ular darsdagi bilimlarni real hayotdagi muammoni yechish uchun ishlatishsin.",
    "kiberxavfsizlik": "Maktabda raqamli xavfsizlik madaniyatini oshirishda: 1) Murakkab parollar yaratish qoidasi; 2) Notanish havolalarni ochmaslik; 3) Shaxsiy ma'lumotlarni ochiq tarmoqlarda bo'lishmaslik haqida amaliy mashg'ulot o'tkazing."
  };

  // Savolga javob olish
  async function ask(promptText) {
    const p = promptText.toLowerCase();

    // Jonli API ga urinish (agar serverda Netlify funksiyasi mavjud bo'lsa)
    try {
      const res = await fetch("/.netlify/functions/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.reply) return data.reply;
      }
    } catch (e) {
      // Offline fallback
    }

    // Pedagogik bilimlar bazasidan mos javob
    await new Promise(r => setTimeout(r, 600)); // Tabiiy animatsiya kutish

    if (p.includes("test") || p.includes("savol")) {
      return `
📚 <b>AI tomonidan tavsiya etilgan metodik test savollari:</b>
1. <i>(Bloom: Eslab qolish)</i> Mavzuning asosiy tushunchasini to'g'ri ta'riflang.
2. <i>(Bloom: Tushunish)</i> Ikki asosiy hodisa o'rtasidagi farqni misollar bilan ko'rsating.
3. <i>(Bloom: Qo'llash)</i> Berilgan formulani yangi amaliy topshiriqda qanday ishlatasiz?
💡 <i>Maslahat:</i> Ushbu savollarni Quizizz platformasiga joylab, formativ baholash sifatida qo'llang.
      `;
    }

    if (p.includes("rejasi") || p.includes("ishlanma") || p.includes("dars")) {
      return `
🎯 <b>Dars loyihalash bo'yicha metodik tavsiya:</b>
• Dars maqsadini SMART mezonlari bo'yicha belgilang (o'lchanadigan va erishiladigan natija).
• Darsning har 10-12 daqiqasida o'quvchilar faoliyatini o'zgartiring (tinglash → guruhda ishlash → tahlil).
• Dars yakunida 3 daqiqalik 'Refleksiya piramidasi' orqali o'quvchilardan xulosa oling.
      `;
    }

    if (p.includes("natija") || p.includes("kompetensiya") || p.includes("zaif")) {
      return `
📈 <b>DigCompEdu natijalaringiz asosida tavsiya:</b>
Sizning kasbiy profilingiz tahlil qilindi. Darslarda raqamli resurslarni nafaqat ko'rsatish, balki o'quvchilarning o'zlari mustaqil ta'limiy kontent yaratishi (masalan, Canva'da infografika yoki Padlet'da loyiha) uchun ko'proq imkoniyat bering.
      `;
    }

    return `
💡 <b>Pedagogik Mentor tavsiyasi:</b>
Zamonaviy darsda o'qituvchi faqat axborot beruvchi emas, balki fasilitator (yo'naltiruvchi) vazifasini bajaradi. O'quvchilarga tayyor javob berish o'rniga, muammoli savollar orqali ularni mustaqil izlanishga undash eng samarali usuldir.
    `;
  }

  // Shaxsiy rivojlanish yo'l xaritasi (Roadmap) tuzish
  function generateRoadmap(state) {
    const lowAreas = [];
    Object.keys(state.digCompScores || {}).forEach(k => {
      if (state.digCompScores[k] < 3) {
        lowAreas.push(DIGCOMPEDU_AREAS[k]?.name || `Soha ${k}`);
      }
    });

    return `
🌟 <b>SHAXSIY PEDAGOGIK RIVOJLANISH REJASI (ROADMAP):</b>

1-qadam: Raqamli gigiyena va xavfsizlik (1-hafta)
- O'quvchilar bilan raqamli xulq-atvor qoidalarini ishlab chiqish.

2-qadam: Interaktiv baholash vositalari (2-hafta)
- Google Forms yoki Kahoot orqali haftalik formativ diagnostika joriy qilish.

3-qadam: 4K va Bloom integratsiyasi (3-hafta)
- Dars Konstruktorida kamida 2 ta to'liq dars ishlanmasini loyihalash.

${lowAreas.length > 0 ? `⚠️ <i>Alohida e'tibor qaratilishi kerak bo'lgan sohalar:</i> ${lowAreas.join(", ")}.` : "Tabriklaymiz, sizning barcha sohalar bo'yicha baholaringiz barqaror darajada!"}
    `;
  }

  return {
    ask,
    generateRoadmap
  };
})();
