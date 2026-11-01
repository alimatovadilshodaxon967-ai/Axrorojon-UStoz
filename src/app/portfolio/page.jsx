"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FolderCheck,
  Briefcase,
  MessageSquareText,
  Star,
  Download,
  Printer,
  CheckCircle2,
  Award,
  BookOpen,
  Send,
  User,
  GraduationCap,
  Sparkles,
  FileBadge
} from "lucide-react";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "portfolio";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [starClaimed, setStarClaimed] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const user = {
    name: "Axrorjon Ustoz",
    role: "mentor",
    university: "Nizomiy nomidagi TDPU",
    faculty: "Informatika va matematika",
    course: "Bitiruvchi (Metodist)",
    stars: 8,
    score: "4.8"
  };

  const starsSystem = [
    { id: "xalqaro", title: "Xalqaro baholash yulduzi", desc: "DigCompEdu mezonlarida baholash", earned: true },
    { id: "interaktiv", title: "Interaktiv topshiriqlar", desc: "Pedagogik challenge va testlar", earned: true },
    { id: "metodik", title: "Metodik topshiriqlar", desc: "Design studio va dars ssenariysi", earned: true },
    { id: "mashgulot", title: "Dars ishlanmasi", desc: "4K va Bloom asosida dars loyihalash", earned: true },
    { id: "ai", title: "AI tavsiyalar", desc: "Pedagogik AI mentor bilan ishlash", earned: true },
    { id: "amaliyot", title: "Amaliyot kundaligi", desc: "Maktabdagi dars tahlili va GPS", earned: true },
    { id: "tarbiya", title: "Tarbiya yangiliklari", desc: "Raqamli gigiyena va xavfsizlik", earned: true },
    { id: "aloqa", title: "Qayta aloqa yulduzi", desc: "Platforma bo'yicha ekspert fikri", earned: true }
  ];

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setStarClaimed(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. HEADER */}
      <div className="dashboard-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="saas-badge-pill" style={{ background: "#FEF3C7", color: "#B45309", fontWeight: 700 }}>
              Kasbiy Natijalar
            </span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Portfolio & Rezyume</span>
          </div>
          <h1 className="dashboard-title">📁 Portfolio, Karyera & Qayta Aloqa</h1>
          <p className="dashboard-subtitle">
            8 ta yulduz kolleksiyasi, professional pedagogik rezyume va platforma takliflari
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button className="saas-btn-secondary" onClick={() => window.print()}>
            <Printer size={15} />
            <span>Portfolioni PDF Yuklab Olish</span>
          </button>
        </div>
      </div>

      {/* 2. TABS ROW */}
      <div className="boshqaruv-tabs-row">
        <button
          className={`boshqaruv-tab-btn ${activeTab === "portfolio" ? "active" : ""}`}
          onClick={() => setActiveTab("portfolio")}
        >
          <FolderCheck size={16} />
          <span>Elektron Portfolio (8 ⭐)</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeTab === "karyera" ? "active" : ""}`}
          onClick={() => setActiveTab("karyera")}
        >
          <Briefcase size={16} />
          <span>Karyera Profili (CV)</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeTab === "aloqa" ? "active" : ""}`}
          onClick={() => setActiveTab("aloqa")}
        >
          <MessageSquareText size={16} />
          <span>Qayta Aloqa</span>
        </button>
      </div>

      {/* TAB 1: PORTFOLIO */}
      {activeTab === "portfolio" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* User Hero Summary */}
          <div className="card" style={{ background: "linear-gradient(135deg, #F8FAFC, #FFFFFF)", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "#EEF2FF", border: "3px solid #4F46E5", overflow: "hidden" }}>
                <img src="/avatars/ustoz-avatar-round.png" alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>
                  {user.name}
                </h2>
                <div style={{ fontSize: "0.88rem", color: "#64748B" }}>
                  {user.university} · {user.faculty}
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <span className="saas-badge-pill" style={{ background: "#FEF3C7", color: "#B45309", fontWeight: 700 }}>
                    ⭐ 8 / 8 Yulduz Toʻplangan
                  </span>
                  <span className="saas-badge-pill" style={{ background: "#ECFDF5", color: "#059669", fontWeight: 700 }}>
                    🏆 C1 - Lider Pedagog
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 8 Yulduzlar Kolleksiyasi */}
          <div className="card">
            <h2 className="t">8 Ta Pedagogik Yulduz Kolleksiyasi</h2>
            <p className="note" style={{ color: "#64748B", margin: "4px 0 18px" }}>
              Platformaning barcha sohalari boʻyicha erishilgan yutuqlar
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
              {starsSystem.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #E2E8F0",
                    background: "#F8FAFC"
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#FEF3C7", color: "#D97706", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Star size={18} className="fill-amber-500" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>{s.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748B" }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KARYERA PROFILI (CV) */}
      {activeTab === "karyera" && (
        <div className="card" style={{ padding: "28px", maxWidth: "800px" }}>
          <div style={{ borderBottom: "2px solid #0F172A", paddingBottom: "16px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>
              {user.name}
            </h2>
            <div style={{ fontSize: "0.95rem", color: "#475569", fontWeight: 600 }}>
              Zamonaviy Pedagog & Taʼlimiy Texnologiyalar Mutaxassisi
            </div>
            <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "4px" }}>
              axrorjon@yulduzlar.uz | Toshkent shahri | +998 (90) 123-45-67
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>
                🎓 Taʼlim
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#334155", margin: 0 }}>
                <b>Nizomiy nomidagi Toshkent Davlat Pedagogika Universiteti</b> (2023–2027)
              </p>
              <p style={{ fontSize: "0.85rem", color: "#64748B", margin: "2px 0 0" }}>
                Yoʻnalish: Informatika va pedagogika | GPA: 4.8 / 5.0
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>
                🧠 Raqamli Pedagogik Kompetensiyalar (DigCompEdu)
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: "1.5", margin: 0 }}>
                • <b>4K va Bloom taksonomiyasi:</b> Interaktiv dars rejalarini loyihalash va formativ baholash rubrikalarini tuzish.<br />
                • <b>Raqamli vositalar:</b> Kahoot, Canva, Miro, Padlet, Mentimeter, GeoGebra, Google Classroom.<br />
                • <b>Sunʼiy intellekt taʼlimda:</b> Prompt injiniring, adaptiv testlar yaratish va AI mentorlik.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>
                🏫 Maktab Amaliyoti Tajribasi
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#334155", margin: 0 }}>
                <b>187-sonli umumtaʼlim maktabi</b> — Amaliyotchi oʻqituvchi (2026-yil, 8 hafta)
              </p>
              <p style={{ fontSize: "0.85rem", color: "#64748B", margin: "2px 0 0" }}>
                7- va 8-sinflarda 24 soatdan ortiq ochiq darslar oʻtkazildi, oʻquvchilar bilan interaktiv viktorinalar tashkil etildi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: QAYTA ALOQA */}
      {activeTab === "aloqa" && (
        <div className="card" style={{ padding: "24px", maxWidth: "680px" }}>
          <h2 className="t">💬 Platforma Haqida Fikr Va Takliflaringiz</h2>
          <p className="note" style={{ color: "#64748B", margin: "4px 0 18px" }}>
            Fikringiz platformani yanada mukammallashtirishga yordam beradi va sizga «Qayta aloqa» yulduzini beradi.
          </p>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
              Platformaga beradigan bahoingiz:
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => setFeedbackRating(num)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: feedbackRating === num ? "2px solid #F59E0B" : "1px solid #E2E8F0",
                    background: feedbackRating === num ? "#FEF3C7" : "#FFFFFF",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <Star size={15} className={num <= feedbackRating ? "fill-amber-500 text-amber-500" : "text-slate-300"} />
                  <span>{num} ball</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px" }}>
              Sizning mulohazangiz va takliflaringiz:
            </label>
            <textarea
              rows={4}
              placeholder="Platformadagi dars konstruktori va interaktiv topshiriqlar bo'yicha takliflaringiz..."
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
                fontSize: "0.92rem",
                outline: "none"
              }}
            />
          </div>

          <button
            onClick={handleSendFeedback}
            disabled={feedbackSent || !feedbackText.trim()}
            className="dh-go"
            style={{ background: "#4F46E5", color: "#FFFFFF" }}
          >
            <Send size={15} />
            <span>{feedbackSent ? "✓ Fikringiz qabul qilindi!" : "Fikrni yuborish (+20 XP)"}</span>
          </button>

          {feedbackSent && (
            <div style={{ marginTop: "14px", padding: "12px", borderRadius: "8px", background: "#ECFDF5", color: "#065F46", fontWeight: 600, fontSize: "0.9rem" }}>
              ⭐ Rahmat! Fikringiz saqlandi va profilingizga «Qayta aloqa» yulduzi qoʻshildi!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>Yuklanmoqda...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}