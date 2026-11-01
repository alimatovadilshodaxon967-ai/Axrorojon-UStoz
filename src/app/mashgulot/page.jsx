"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ClipboardList,
  Boxes,
  Plus,
  CheckCircle2,
  Star,
  Printer,
  Sparkles,
  ExternalLink,
  Clock,
  Layers,
  ArrowRight,
  BookOpen
} from "lucide-react";

function LessonPlannerContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "vositalar" ? "vositalar" : "konstruktor";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [starClaimed, setStarClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([
    {
      _id: "plan-1",
      fan: "Informatika va AT",
      mavzu: "Axborot xavfsizligi va kiber-gigiyena",
      maqsad: "O'quvchilarga feyk xabarlarni aniqlash va xavfsiz parol tuzishni o'rgatish",
      bloomLevel: "Qo'llash va Tahlil",
      duration: 45,
      createdAt: "Bugun"
    }
  ]);

  const [form, setForm] = useState({
    fan: "",
    mavzu: "",
    maqsad: "",
    bloomLevel: "Qo'llash",
    method: "Aqliy hujum & Klaster",
    duration: 45
  });

  // 10 TA ENG MASHHUR RAQAMLI TA'LIM VOSITALARI
  const digitalTools = [
    {
      name: "Kahoot!",
      category: "Interaktiv viktorina",
      desc: "Dars boshida yoki yakunida tezkor o'yin tarzida formativ baholash va bilimlarni tekshirish vositasi.",
      scenario: "Mavzu bo'yicha 5 ta test savoli tuzib, butun sinf bilan jonli raqobat tarzida o'tkaziladi.",
      link: "https://kahoot.com"
    },
    {
      name: "Padlet",
      category: "Hamkorlik doskasi",
      desc: "O'quvchilar real vaqt rejimida o'z fikrlarini stikerlar, rasmlar va havolalar bilan yopishtiruvchi onlayn devor.",
      scenario: "Refleksiya paytida 'Bugun darsda nimani o'rgandim?' mavzusida umumiy fikrlar xaritasi yig'iladi.",
      link: "https://padlet.com"
    },
    {
      name: "Canva Education",
      category: "Vizual dizayn",
      desc: "Pedagoglar uchun dars taqdimotlari, infografikalar, metodik varaqalar va diplomlar tayyorlash platformasi.",
      scenario: "O'quvchilarga mavzu yuzasidan bitta infografika yoki plakat yaratish topshirig'i beriladi.",
      link: "https://canva.com"
    },
    {
      name: "Miro",
      category: "Aqliy xarita & Loyiha",
      desc: "Katta cheksiz oq doska: guruhli loyihalar, Venn diagrammasi, 'Fishbone' (baliq skeleti) metodlarini bajarish uchun.",
      scenario: "Guruhlarga muammo beriladi va ular sabab-oqibat zanjirini Miro doskasida birgalikda tuzishadi.",
      link: "https://miro.com"
    },
    {
      name: "Quizizz",
      category: "Adaptiv testlash",
      desc: "O'quvchi o'z tezligida ishlaydigan mustaqil test va uy vazifalarini avtomatik tahlil qiluvchi tizim.",
      scenario: "O'quvchilar uydan turib test topshirishadi, o'qituvchiga har bir savol bo'yicha tahliliy hisobot keladi.",
      link: "https://quizizz.com"
    },
    {
      name: "Mentimeter",
      category: "So'rovnoma & So'z buluti",
      desc: "Darsda bir zumda o'quvchilar fikrini 'So'zlar buluti' (Word Cloud) ko'rinishida yig'ish vositasi.",
      scenario: "Dars boshida: 'Ushbu atamani eshitganda xayolingizga nima keladi?' so'rovi o'tkaziladi.",
      link: "https://mentimeter.com"
    },
    {
      name: "Wordwall",
      category: "Didaktik o'yinlar",
      desc: "Aylanuvchi g'ildirak (Spin wheel), labirint, kartalar ochish kabi 18 xil o'yinli shablonlar.",
      scenario: "Yangi so'zlarni yodlash yoki darsda tasodifiy o'quvchini tanlash uchun g'ildirak aylantiriladi.",
      link: "https://wordwall.net"
    },
    {
      name: "Edpuzzle",
      category: "Interaktiv video",
      desc: "YouTube yoki shaxsiy videoga dars davomida savollar qo'shish va ko'rish jarayonini nazorat qilish.",
      scenario: "Teskari sinf (Flipped Classroom) uchun video beriladi, o'quvchi savolga javob bermaguncha video davom etmaydi.",
      link: "https://edpuzzle.com"
    },
    {
      name: "GeoGebra",
      category: "Matematika & Geometriya",
      desc: "Funksiyalar grafigi, 3D geometrik figuralar va dinamik simulyatsiyalar laboratoriyasi.",
      scenario: "O'quvchilar parametrlarni o'zgartirib, egri chiziq qanday o'zgarishini o'z ko'zlari bilan ko'radi.",
      link: "https://geogebra.org"
    },
    {
      name: "Google Classroom",
      category: "Ta'limiy boshqaruv (LMS)",
      desc: "Topshiriqlarni tarqatish, muddatlarni belgilash, baholash va barcha o'quvchilar bilan yagona muloqot tizimi.",
      scenario: "Barcha dars materiallari va baholash mezonlari bitta sinf xonasiga yuklab boriladi.",
      link: "https://classroom.google.com"
    }
  ];

  const handleCreatePlan = () => {
    if (!form.mavzu.trim() || !form.fan.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const newPlan = {
        _id: `plan-${Date.now()}`,
        fan: form.fan,
        mavzu: form.mavzu,
        maqsad: form.maqsad || "Dars maqsadlari SMART bo'yicha belgilandi",
        bloomLevel: form.bloomLevel,
        duration: form.duration,
        createdAt: "Hozirgina"
      };
      setPlans([newPlan, ...plans]);
      setForm({ fan: "", mavzu: "", maqsad: "", bloomLevel: "Qo'llash", method: "Aqliy hujum & Klaster", duration: 45 });
      setLoading(false);
      setStarClaimed(true);
    }, 600);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. HEADER */}
      <div className="dashboard-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="saas-badge-pill" style={{ background: "#FEF3C7", color: "#B45309", fontWeight: 700 }}>
              Konstruktor & Vositalar
            </span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>4K & Bloom Taksonomiyasi</span>
          </div>
          <h1 className="dashboard-title">📋 Maşğulot İşlanmalari & Raqamli Vositalar</h1>
          <p className="dashboard-subtitle">
            Zamonaviy dars rejasini loyihalash, bosqichlarga taqsimlash va pedagogik raqamli vositalar kartotekasi
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            onClick={() => setStarClaimed(true)}
            className="dh-go"
            style={{
              background: starClaimed ? "#059669" : "#F59E0B",
              color: "#FFFFFF",
              fontSize: "0.88rem",
              padding: "10px 18px"
            }}
          >
            <Star size={16} className="fill-white" />
            <span>{starClaimed ? "⭐ Ishlanma Yulduzi Olingan" : "Yulduz Olish (+20 XP)"}</span>
          </button>
        </div>
      </div>

      {/* 2. TABS ROW */}
      <div className="boshqaruv-tabs-row">
        <button
          className={`boshqaruv-tab-btn ${activeTab === "konstruktor" ? "active" : ""}`}
          onClick={() => setActiveTab("konstruktor")}
        >
          <ClipboardList size={16} />
          <span>Dars İşlanmasi Konstruktori ({plans.length})</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeTab === "vositalar" ? "active" : ""}`}
          onClick={() => setActiveTab("vositalar")}
        >
          <Boxes size={16} />
          <span>10 ta Raqamli Vosita Kartotekasi</span>
        </button>
      </div>

      {/* TAB 1: DARSLAR KONSTRUKTORI */}
      {activeTab === "konstruktor" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          {/* Yangi dars yaratish formasi */}
          <div className="card" style={{ padding: "24px" }}>
            <h2 className="t" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} className="text-indigo-600" />
              <span>Yangi Zamonaviy Dars Rejasini Loyihalaş</span>
            </h2>
            <p className="note" style={{ color: "#64748B", margin: "4px 0 20px" }}>
              Fan, mavzu va maqsadni kiriting. Tizim darsni 5 ta meʼyoriy bosqichga taqsimlab beradi.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
                  Fan nomi:
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Ona tili, Matematika, Informatika..."
                  value={form.fan}
                  onChange={e => setForm({ ...form, fan: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
                  Dars mavzusi:
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Axborot xavfsizligi asoslari..."
                  value={form.mavzu}
                  onChange={e => setForm({ ...form, mavzu: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
                  Bloom taksonomiyasi darajasi:
                </label>
                <select
                  value={form.bloomLevel}
                  onChange={e => setForm({ ...form, bloomLevel: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", outline: "none", background: "#FFFFFF" }}
                >
                  <option value="Bilish & Tushunish">1-2. Bilish & Tushunish (Boshlang'ich)</option>
                  <option value="Qo'llash">3. Qo'llash (Amaliy masalalar)</option>
                  <option value="Tahlil & Baholash">4-5. Tahlil & Baholash (Yuqori daraja)</option>
                  <option value="Yaratish (Kreativlik)">6. Yaratish (Ijodiy loyiha)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
                  Asosiy interaktiv metod:
                </label>
                <select
                  value={form.method}
                  onChange={e => setForm({ ...form, method: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", outline: "none", background: "#FFFFFF" }}
                >
                  <option value="Aqliy hujum & Klaster">Aqliy hujum & Klaster</option>
                  <option value="Flipped Classroom (Teskari sinf)">Flipped Classroom (Teskari sinf)</option>
                  <option value="Venn diagrammasi & Bahs">Venn diagrammasi & Bahs</option>
                  <option value="Juftlikda ishlash (Think-Pair-Share)">Juftlikda ishlash (Think-Pair-Share)</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
                Dars maqsadi (SMART):
              </label>
              <textarea
                rows={2}
                placeholder="Dars so'ngida o'quvchilar nimalarni bilishi va bajara olishi kerak..."
                value={form.maqsad}
                onChange={e => setForm({ ...form, maqsad: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", outline: "none" }}
              />
            </div>

            <button
              onClick={handleCreatePlan}
              disabled={loading || !form.fan.trim() || !form.mavzu.trim()}
              className="dh-go"
              style={{ background: "#4F46E5", color: "#FFFFFF", marginTop: "16px" }}
            >
              {loading ? "Reja tuzilmoqda..." : "✨ Dars Ishlanmasini Generatsiya Qilish"}
            </button>
          </div>

          {/* Saqlangan ishlanmalar ro'yxati */}
          <div>
            <h2 className="t" style={{ marginBottom: "14px" }}>Saqlangan Dars İşlanmalari</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "14px" }}>
              {plans.map(p => (
                <div key={p._id} className="card" style={{ padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span className="saas-badge-pill" style={{ background: "#EEF2FF", color: "#4F46E5", fontWeight: 700 }}>
                      {p.fan}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748B" }}>⏱ {p.duration} daqiqa</span>
                  </div>

                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "4px 0 6px" }}>
                    {p.mavzu}
                  </h3>

                  <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: "1.5", margin: "0 0 14px" }}>
                    {p.maqsad}
                  </p>

                  <div style={{ paddingTop: "12px", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>Bloom: {p.bloomLevel}</span>
                    <button
                      className="saas-btn-secondary"
                      onClick={() => window.print()}
                      style={{ fontSize: "0.8rem", padding: "4px 10px" }}
                    >
                      <Printer size={13} />
                      <span>Chop etish / PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 10 TA RAQAMLI VOSITALAR KARTOTEKASI */}
      {activeTab === "vositalar" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {digitalTools.map((tool, idx) => (
            <div key={tool.name} className="card" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="saas-badge-pill" style={{ background: "#F1F5F9", color: "#334155", fontWeight: 700 }}>
                  #{idx + 1} {tool.category}
                </span>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4F46E5", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}
                >
                  <span>Saytga oʻtish</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", margin: "4px 0" }}>
                {tool.name}
              </h3>

              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: "1.5", margin: 0 }}>
                {tool.desc}
              </p>

              <div style={{ background: "#F8FAFC", borderRadius: "8px", padding: "10px 12px", border: "1px solid #E2E8F0", marginTop: "auto" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: "4px" }}>
                  💡 Darsda qoʻllash ssenariysi:
                </div>
                <div style={{ fontSize: "0.84rem", color: "#0F172A", lineHeight: "1.4" }}>
                  {tool.scenario}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LessonPlannerPage() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>Yuklanmoqda...</div>}>
      <LessonPlannerContent />
    </Suspense>
  );
}