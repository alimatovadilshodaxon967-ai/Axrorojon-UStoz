"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Globe2,
  CheckCircle2,
  Star,
  Award,
  ChevronRight,
  TrendingUp,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Compass,
  Layers,
  BookOpen,
  Share2
} from "lucide-react";

export default function XalqaroBaholashPage() {
  // Birinchi kirganda bo'sh / belgilanmagan holat
  const [scores, setScores] = useState({});
  const [starClaimed, setStarClaimed] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("digcompedu_scores");
      if (saved) {
        setScores(JSON.parse(saved));
      }
      const claimed = localStorage.getItem("digcompedu_star_claimed");
      if (claimed === "true") setStarClaimed(true);
    } catch (e) {}
  }, []);

  const areas = [
    {
      id: 1,
      title: "1. Kasbiy muhit (Professional Engagement)",
      desc: "Hamkasblar bilan raqamli muloqot, kasbiy hamkorlik, tajriba almashish va individual malaka oshirish.",
      question: "Siz ta'lim jarayonida raqamli texnologiyalardan hamkasblar bilan tajriba almashish va kasbiy rivojlanish uchun qay darajada foydalanasiz?",
      levels: [
        { val: 1, label: "A1 - Yangi boshlovchi: Raqamli muloqotdan deyarli foydalanmayman." },
        { val: 2, label: "A2 - Tadqiqotchi: Faqat shaxsiy elektron pochta va umumiy xabarlardan foydalanaman." },
        { val: 3, label: "B1 - Hamkasb: Metodik guruhlarda faolman va ta'limiy resurslarni ulashaman." },
        { val: 4, label: "B2 - Mutaxassis: Raqamli muhitda hamkasblar bilan birgalikda dars ishlanmalari yarataman." },
        { val: 5, label: "C1/C2 - Lider: Maktab va universitet miqyosida raqamli ta'lim tashabbuslariga rahbarlik qilaman." }
      ]
    },
    {
      id: 2,
      title: "2. Raqamli ta'lim resurslari (Digital Resources)",
      desc: "Ta'limiy materiallarni qidirish, mualliflik huquqiga rioya qilgan holda tanlash, o'zgartirish va boshqarish.",
      question: "Darslaringiz uchun elektron resurslarni tanlash va ularni o'quv maqsadlariga moslashtirish ko'nikmangiz qanday?",
      levels: [
        { val: 1, label: "A1: Faqat tayyor internetdagi rasmlar va matnlarni to'g'ridan-to'g'ri ko'chirib olaman." },
        { val: 2, label: "A2: Izlanish tizimlaridan foydalanib, mos videolarni topa olaman." },
        { val: 3, label: "B1: Topilgan resurslarni o'z sinfim ehtiyojiga qarab tahrir qilaman va saralayman." },
        { val: 4, label: "B2: Ochiq ta'lim resurslaridan (OER) erkin foydalanib, mualliflik huquqini ta'minlayman." },
        { val: 5, label: "C1/C2: O'zim mualliflik raqamli kontentlarini yaratib, boshqalarga tarqataman." }
      ]
    },
    {
      id: 3,
      title: "3. Oʻqitiş va oʻrganiş (Teaching & Learning)",
      desc: "Pedagogik faoliyatda interaktiv qurilmalar, aralash ta'lim (blended learning) va hamkorlikdagi loyihalarni boshqarish.",
      question: "Dars jarayonida raqamli vositalar orqali o'quvchilarning faolligini qanday oshirasiz?",
      levels: [
        { val: 1, label: "A1: Darsda faqat proyektor orqali slayd ko'rsatish bilan cheklanaman." },
        { val: 2, label: "A2: O'quvchilarga ma'lumot qidirish uchun mustaqil topshiriq beraman." },
        { val: 3, label: "B1: Interaktiv doska va viktorinalar (Kahoot, Quizizz) orqali guruhli faoliyat tashkil qilaman." },
        { val: 4, label: "B2: 'Flipped Classroom' (Teskari sinf) usulida dars loyihalayman va o'tkazaman." },
        { val: 5, label: "C1/C2: Butun o'quv kursini raqamli LMS platformalari asosida to'liq loyihalayman." }
      ]
    },
    {
      id: 4,
      title: "4. Baholaş va tahlil (Assessment)",
      desc: "Formativ va summativ baholashda raqamli tizimlardan foydalanish, ma'lumotlarni tahlil qilish va qayta aloqa berish.",
      question: "O'quvchilar bilimini baholash va ularga tezkor qayta aloqa berishda raqamli vositalardan qanday foydalanasiz?",
      levels: [
        { val: 1, label: "A1: Faqat qog'ozdagi test va yozma ishlardan foydalanaman." },
        { val: 2, label: "A2: Ba'zan Google Forms yoki onlayn testlar orqali so'rov o'tkazaman." },
        { val: 3, label: "B1: Dars davomida tezkor formativ so'rovnomalar (Mentimeter) orqali tushunish darajasini o'lchayman." },
        { val: 4, label: "B2: Avtomatik baholash va rubrikalar orqali o'quvchiga batafsil tahliliy fikr beraman." },
        { val: 5, label: "C1/C2: Talabalar o'zlashtirish tahlili (Learning Analytics) asosida ta'lim strategiyasini moslashtiraman." }
      ]
    },
    {
      id: 5,
      title: "5. Oʻquvçilar imkoniyatlarini kengaytiriş (Empowering Learners)",
      desc: "Inklyuzivlik, o'quvchilarning individual ehtiyojlariga moslashtirish va shaxsiy ta'lim traektoriyasini qo'llab-quvvatlash.",
      question: "Turli darajadagi o'quvchilarga mos individual raqamli topshiriqlar bera olasizmi?",
      levels: [
        { val: 1, label: "A1: Barcha o'quvchilarga bir xil umumiy topshiriq beraman." },
        { val: 2, label: "A2: Qobiliyatli o'quvchilarga qo'shimcha havolalar berib turaman." },
        { val: 3, label: "B1: O'quvchilar tezligiga qarab tabaqalashgan darajali onlayn mashqlar tayyorlayman." },
        { val: 4, label: "B2: Har bir o'quvchiga o'z qobiliyatiga mos ijodiy loyihalarni tanlash erkinligini beraman." },
        { val: 5, label: "C1/C2: Inklyuziv vositalar (ovozli o'qish, subtitrlar, adaptiv kontent)ni to'liq integratsiya qilaman." }
      ]
    },
    {
      id: 6,
      title: "6. Oʻquvçilarning raqamli koʻnikmalarini rivojlantiriş",
      desc: "O'quvchilarda axborot savodxonligi, kiberxavfsizlik, netiket va ijodiy kontent yaratish madaniyatini shakllantirish.",
      question: "O'quvchilaringizga internetdagi soxta ma'lumotlarni aniqlash va xavfsiz muloqot qilishni o'rgatasizmi?",
      levels: [
        { val: 1, label: "A1: Raqamli xavfsizlik mavzusiga darsda deyarli to'xtalmayman." },
        { val: 2, label: "A2: O'quvchilarga parollarni ehtiyot qilish haqida ogohlantiraman." },
        { val: 3, label: "B1: Darsda ishonchli manbani soxta (feyk) axborotdan farqlash usullarini mashq qildiraman." },
        { val: 4, label: "B2: O'quvchilarni raqamli axloq (netiket) va mualliflik huquqiga rioya qilishga o'rgataman." },
        { val: 5, label: "C1/C2: O'quvchilar o'rtasida kiber-gigiyena va raqamli fuqarolik bo'yicha loyihalarni boshqaraman." }
      ]
    }
  ];

  const handleScoreChange = (areaId, val) => {
    if (!val) return;
    const num = Number(val);
    setScores(prev => {
      const next = { ...prev, [areaId]: num };
      try {
        localStorage.setItem("digcompedu_scores", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const scoreValues = Object.values(scores);
  const isStarted = scoreValues.length > 0;
  const isComplete = scoreValues.length === areas.length;
  const avg = isStarted
    ? (scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length).toFixed(1)
    : "—";

  let currentLevel = "Baholanmagan";
  let levelColor = "#64748B";
  let levelDesc = "Quyidagi 6 ta pedagogik soha bo'yicha diagnostik savollarga javob berib, o'z raqamli darajangizni aniqlang.";

  if (isStarted) {
    const numAvg = Number(avg);
    if (numAvg >= 4.5) {
      currentLevel = "C1/C2 - Lider & Innovator";
      levelColor = "#059669";
      levelDesc = "Siz ilg'or metodist darajasidasiz, yangi texnologiyalarni darsga olib kirib, boshqalarga o'rnak bo'lasiz.";
    } else if (numAvg >= 3.8) {
      currentLevel = "B2 - Mutaxassis (Ekspert)";
      levelColor = "#4F46E5";
      levelDesc = "Siz raqamli pedagogikani chuqur tushunasiz va mustaqil ravishda sifatli dars loyihalay olasiz.";
    } else if (numAvg >= 2.5) {
      currentLevel = "B1 - Hamkasb (Integrator)";
      levelColor = "#2563EB";
      levelDesc = "Siz darslaringizda raqamli vositalardan muntazam foydalanasiz va ta'lim sifatini oshirishga intilasiz.";
    } else {
      currentLevel = "A1/A2 - Yangi boshlovchi & Tadqiqotchi";
      levelColor = "#D97706";
      levelDesc = "Sizda raqamli vositalarga qiziqish yuqori, keyingi qadam sifatida interaktiv vositalarni o'rganish tavsiya etiladi.";
    }
  }

  const handleSaveAndClaimStar = () => {
    if (Object.keys(scores).length < 6) {
      alert("Iltimos, «Yulduz olish»dan oldin barcha 6 ta soha bo'yicha o'zingizni baholang!");
      return;
    }
    setStarClaimed(true);
    setSavedSuccess(true);
    try {
      localStorage.setItem("digcompedu_star_claimed", "true");
    } catch (e) {}
    setTimeout(() => setSavedSuccess(false), 5000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. HEADER */}
      <div className="dashboard-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="saas-badge-pill" style={{ background: "#F0FDFA", color: "#0D9488", fontWeight: 700 }}>
              Yevropa Ittifoqi Standarti
            </span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>DigCompEdu 2.2 Framework</span>
          </div>
          <h1 className="dashboard-title">🌐 Xalqaro Baholaş Mezonlari</h1>
          <p className="dashboard-subtitle">
            6 ta asosiy pedagogik raqamli soha boʻyicha oʻzingizni xolis baholang va xalqaro reytingingizni aniqlang
          </p>
        </div>

        <div className="dashboard-header-actions">
          <Link href="/ai?tab=tavsiya" className="saas-btn-secondary">
            <Compass size={16} />
            <span>Individual tavsiyalar olish</span>
          </Link>
        </div>
      </div>

      {savedSuccess && (
        <div className="saas-alert-banner">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>Raqamli kompetensiyangiz muvaffaqiyatli baholandi va «Xalqaro baholash» yulduzi qoʻlga kiritildi! ⭐</span>
        </div>
      )}

      {/* 2. SUMMARY HERO CARD (CEFR daraja va o'rtacha ball) */}
      <div className="card" style={{ background: "linear-gradient(135deg, #F8FAFC, #FFFFFF)", border: "1px solid #E2E8F0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase" }}>
              Joriy Diagnostika Natijasi
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: levelColor, margin: "4px 0" }}>
              {currentLevel}
            </div>
            <p style={{ color: "#475569", margin: "4px 0 0", maxWidth: "600px", fontSize: "0.92rem", lineHeight: "1.5" }}>
              {levelDesc}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px 20px", background: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>OʻRTACHA BALL</div>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0F172A" }}>{avg} <span style={{ fontSize: "1rem", color: "#94A3B8" }}>/ 5.0</span></div>
            </div>

            <button
              onClick={handleSaveAndClaimStar}
              className="dh-go"
              style={{
                background: starClaimed ? "#059669" : "#F59E0B",
                color: "#FFFFFF",
                fontSize: "0.92rem",
                padding: "12px 22px"
              }}
            >
              <Star size={17} className={starClaimed ? "fill-white" : "fill-white"} />
              <span>
                {starClaimed
                  ? "⭐ Yulduz Olingan (1/1)"
                  : isComplete
                  ? "Yulduz Olish (+20 XP)"
                  : `${Object.keys(scores).length} / 6 Baholandi`}
              </span>
            </button>
          </div>
        </div>

        {/* 6 SOXA PROGRESS BARS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px", marginTop: "22px", paddingTop: "18px", borderTop: "1px solid #E2E8F0" }}>
          {areas.map(a => (
            <div key={a.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 600, color: "#475569" }}>
                <span>{a.title.split("(")[0]}</span>
                <span style={{ color: scores[a.id] ? "#0F172A" : "#94A3B8", fontWeight: 700 }}>
                  {scores[a.id] ? `${scores[a.id]} / 5` : "— / 5"}
                </span>
              </div>
              <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${scores[a.id] ? (scores[a.id] / 5) * 100 : 0}%`, background: scores[a.id] >= 4 ? "#059669" : "#4F46E5", borderRadius: "9999px", transition: "width 0.4s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DIAGNOSTIK SAVOLLAR RO'YXATI (6 ta soha) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {areas.map(area => (
          <div key={area.id} className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap", marginBottom: "12px" }}>
              <div>
                <span className="saas-badge-pill" style={{ background: "#EEF2FF", color: "#4F46E5", fontWeight: 700, marginBottom: "6px" }}>
                  Soha #{area.id}
                </span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", margin: "4px 0" }}>
                  {area.title}
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.88rem", margin: 0 }}>
                  {area.desc}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569" }}>Sizning bahoingiz:</span>
                <select
                  value={scores[area.id] || ""}
                  onChange={e => handleScoreChange(area.id, e.target.value)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #CBD5E1",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: scores[area.id] ? "#0F172A" : "#64748B",
                    background: "#FFFFFF",
                    cursor: "pointer"
                  }}
                >
                  <option value="" disabled>Baholang...</option>
                  <option value={1}>1 - Boshlang'ich (A1)</option>
                  <option value={2}>2 - Izlanuvchi (A2)</option>
                  <option value={3}>3 - Hamkasb (B1)</option>
                  <option value={4}>4 - Mutaxassis (B2)</option>
                  <option value={5}>5 - Lider / Innovator (C1/C2)</option>
                </select>
              </div>
            </div>

            {/* Diagnostik savol va daraja tavsifi */}
            <div style={{ background: "#F8FAFC", borderRadius: "10px", padding: "14px 16px", border: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 700, color: "#4F46E5", marginBottom: "4px" }}>
                <HelpCircle size={15} />
                <span>DIAGNOSTIK SAVOL:</span>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#1E293B", fontWeight: 600, margin: "0 0 10px" }}>
                {area.question}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {area.levels.map(lvl => {
                  const isCurrent = scores[area.id] === lvl.val;
                  return (
                    <div
                      key={lvl.val}
                      onClick={() => handleScoreChange(area.id, lvl.val)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: isCurrent ? "1.5px solid #4F46E5" : "1px solid #E2E8F0",
                        background: isCurrent ? "#EEF2FF" : "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: isCurrent ? "5px solid #4F46E5" : "2px solid #CBD5E1",
                          background: "#FFFFFF",
                          flexShrink: 0
                        }}
                      />
                      <span style={{ fontSize: "0.84rem", color: isCurrent ? "#1E1B4B" : "#475569", fontWeight: isCurrent ? 600 : 400 }}>
                        {lvl.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}