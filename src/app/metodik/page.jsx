"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileEdit,
  Leaf,
  CheckCircle2,
  Star,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  Send,
  Lock
} from "lucide-react";

function MetodikContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "tarbiya" ? "tarbiya" : "metodik";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [starClaimed, setStarClaimed] = useState(false);
  const [solutions, setSolutions] = useState({
    1: "",
    2: "",
    3: ""
  });
  const [submittedTasks, setSubmittedTasks] = useState({});

  const tasks = [
    {
      id: 1,
      title: "1-Topshiriq: Dars maqsadini SMART va Bloom bo'yicha belgilash",
      desc: "Tanlagan faningiz bo'yicha bitta mavzuni oling. O'quv maqsadini SMART mezonlari va Bloom taksonomiyasining 'Qo'llash' hamda 'Tahlil' bosqichlariga mos fe'llar bilan ifodalang.",
      placeholder: "Masalan: Dars yakunida o'quvchilar berilgan matndan asosiy g'oyani ajrata oladilar va uni 3 ta dalil bilan taqqoslab tahlil qiladilar..."
    },
    {
      id: 2,
      title: "2-Topshiriq: 'Teskari sinf' (Flipped Classroom) ssenariysi",
      desc: "Darsgacha bo'lgan bosqich (o'quvchilar uyda ko'radigan 5 daqiqalik video/material) va sinfdagi amaliy hamkorlik mashg'ulotini rejalashtiring.",
      placeholder: "Uyda: O'quvchilar tayyorlangan qisqa rolikni ko'rib, 3 ta savolga javob yozishadi. Sinfda: 4 kishilik guruhlarda loyiha himoyasi..."
    },
    {
      id: 3,
      title: "3-Topshiriq: Baholash rubrikasi va formativ vositani tanlash",
      desc: "Guruhli ishni baholash uchun 3 ta mezon (Hamkorlik, Mazmun, Taqdimot) va har biri uchun 3 darajali rubrika tavsifini yozing.",
      placeholder: "1. Hamkorlik (A'lo: barcha faol qatnashdi, Qoniqarli: 1-2 kishi ishladi)..."
    }
  ];

  const articles = [
    {
      id: 1,
      title: "O'quvchilarda axborot xurujlariga qarshi immunitetni shakllantirish",
      tag: "Raqamli gigiyena",
      date: "Bugun, 09:30",
      desc: "Bugungi kunda o'quvchilarni feyk (soxta) axborotlardan himoyalash va ularda fakt-cheking (manbani tekshirish) ko'nikmalarini tarbiyalash muhim vazifadir.",
      readTime: "4 daqiqa"
    },
    {
      id: 2,
      title: "Sinfda ijobiy va xavfsiz psixologik muhit yaratish metodikasi",
      tag: "Tarbiya & Etika",
      date: "Kecha, 14:15",
      desc: "Har bir o'quvchi o'z fikrini erkin bildira oladigan, xato qilishdan qo'rqmaydigan xavfsiz ta'limiy muhitni shakllantirish bo'yicha amaliy tavsiyalar.",
      readTime: "6 daqiqa"
    },
    {
      id: 3,
      title: "Netiket: O'quvchilar bilan onlayn muloqot va tarbiya madaniyati",
      tag: "Kiber-tarbiya",
      date: "30-oktabr",
      desc: "Telegram guruhlari, onlayn darslar va elektron xatlarda muloqot odobi qoidalari. O'qituvchining shaxsiy namunasi va me'yorlar.",
      readTime: "5 daqiqa"
    }
  ];

  const handleSubmitTask = (id) => {
    if (!solutions[id]?.trim()) return;
    setSubmittedTasks(prev => ({ ...prev, [id]: true }));
  };

  const allSubmitted = Object.keys(submittedTasks).length >= 2;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. HEADER */}
      <div className="dashboard-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="saas-badge-pill" style={{ background: "#EEF2FF", color: "#4F46E5", fontWeight: 700 }}>
              Metodik Ustaxona
            </span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Pedagogik Dizayn & Tarbiya</span>
          </div>
          <h1 className="dashboard-title">✍️ Metodik Topşiriqlar & Tarbiya</h1>
          <p className="dashboard-subtitle">
            Dars maqsadlarini loyihalash, pedagogik keyslar, dars ssenariylari va tarbiyaviy yangiliklar
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
            <span>{starClaimed ? "⭐ Metodik Yulduz Olingan" : "Yulduz Olish (+20 XP)"}</span>
          </button>
        </div>
      </div>

      {/* 2. TABS ROW */}
      <div className="boshqaruv-tabs-row">
        <button
          className={`boshqaruv-tab-btn ${activeTab === "metodik" ? "active" : ""}`}
          onClick={() => setActiveTab("metodik")}
        >
          <FileEdit size={16} />
          <span>Metodik Topşiriqlar ({Object.keys(submittedTasks).length}/3)</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeTab === "tarbiya" ? "active" : ""}`}
          onClick={() => setActiveTab("tarbiya")}
        >
          <Leaf size={16} />
          <span>Tarbiyaga oid yangiliklar ({articles.length})</span>
        </button>
      </div>

      {/* TAB 1: METODIK TOPSHIRIQLAR */}
      {activeTab === "metodik" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {tasks.map(task => {
            const isDone = !!submittedTasks[task.id];
            return (
              <div key={task.id} className="card" style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 4px" }}>
                      {task.title}
                    </h3>
                    <p style={{ color: "#64748B", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
                      {task.desc}
                    </p>
                  </div>
                  {isDone && (
                    <span className="saas-badge-pill" style={{ background: "#ECFDF5", color: "#059669", fontWeight: 700 }}>
                      ✓ Bajarildi
                    </span>
                  )}
                </div>

                <textarea
                  rows={4}
                  disabled={isDone}
                  value={solutions[task.id] || ""}
                  onChange={e => setSolutions({ ...solutions, [task.id]: e.target.value })}
                  placeholder={task.placeholder}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "1px solid #CBD5E1",
                    fontSize: "0.9rem",
                    outline: "none",
                    background: isDone ? "#F8FAFC" : "#FFFFFF",
                    marginBottom: "12px"
                  }}
                />

                {!isDone && (
                  <button
                    onClick={() => handleSubmitTask(task.id)}
                    disabled={!solutions[task.id]?.trim()}
                    className="saas-btn-secondary"
                    style={{ background: "#4F46E5", color: "#FFFFFF", border: "none" }}
                  >
                    <Send size={14} />
                    <span>Topshiriqni topshirish</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: TARBIYAGA OID YANGILIKLAR */}
      {activeTab === "tarbiya" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {articles.map(art => (
            <div key={art.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="saas-badge-pill" style={{ background: "#ECFDF5", color: "#059669", fontWeight: 700 }}>
                  {art.tag}
                </span>
                <span style={{ fontSize: "0.78rem", color: "#64748B" }}>⏱ {art.readTime}</span>
              </div>

              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "4px 0", lineHeight: "1.4" }}>
                {art.title}
              </h3>

              <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.5", flex: 1 }}>
                {art.desc}
              </p>

              <div style={{ paddingTop: "12px", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>{art.date}</span>
                <button
                  className="saas-btn-secondary"
                  style={{ fontSize: "0.8rem", padding: "4px 10px" }}
                  onClick={() => alert(`"${art.title}" maqolasi to'liq o'qildi deb belgilandi!`)}
                >
                  <span>Toʻliq oʻqish</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MetodikPage() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>Yuklanmoqda...</div>}>
      <MetodikContent />
    </Suspense>
  );
}