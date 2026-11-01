"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  FileCheck,
  CheckCircle2,
  Star,
  Printer,
  Sparkles,
  School,
  UserCheck,
  Clock,
  Calendar,
  Send,
  Navigation
} from "lucide-react";

function InternshipContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "hisobot" ? "hisobot" : "amaliyotim";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [starClaimed, setStarClaimed] = useState(false);
  const [gpsVerified, setGpsVerified] = useState(false);
  const [verifyingGps, setVerifyingGps] = useState(false);

  const [diaryNote, setDiaryNote] = useState("");
  const [aiGeneratedReport, setAiGeneratedReport] = useState("");
  const [notes, setNotes] = useState([
    {
      id: 1,
      date: "Bugun, 08:30 - 13:00",
      school: "187-umumtaʼlim maktabi",
      class: "7-A sinf",
      subject: "Informatika",
      topic: "Axborot xavfsizligi asoslari",
      mentor: "Axrorjon Ustoz",
      status: "approved"
    },
    {
      id: 2,
      date: "Kecha, 09:00 - 12:30",
      school: "187-umumtaʼlim maktabi",
      class: "8-B sinf",
      subject: "Informatika",
      topic: "Algoritmlar va tarmoqlanuvchi tuzilmalar",
      mentor: "Axrorjon Ustoz",
      status: "approved"
    }
  ]);

  const handleGpsCheckIn = () => {
    setVerifyingGps(true);
    setTimeout(() => {
      setVerifyingGps(false);
      setGpsVerified(true);
      setStarClaimed(true);
    }, 1200);
  };

  const handleGenerateAiReport = () => {
    if (!diaryNote.trim()) return;
    setAiGeneratedReport(
      `Bugungi amaliyot davomida 187-maktab 7-A sinfida "Axborot xavfsizligi" mavzusida 45 daqiqalik ochiq dars kuzatildi va tahlil qilindi. O'quvchilar bilan interaktiv "Aqliy hujum" hamda Kahoot viktorinasi o'tkazildi. Dars maqsadlariga to'liq erishildi, formativ baholash vositalari orqali o'quvchilar bilimi nazorat qilindi. Rahbar ustoz Axrorjon Ustoz tomonidan metodik ko'rsatmalar olindi.`
    );
  };

  const handleAddDiaryEntry = () => {
    if (!aiGeneratedReport && !diaryNote) return;
    const newEntry = {
      id: Date.now(),
      date: "Bugun, 14:00",
      school: "187-umumtaʼlim maktabi",
      class: "7-A sinf",
      subject: "Informatika",
      topic: diaryNote.slice(0, 40) + "...",
      mentor: "Axrorjon Ustoz",
      status: "pending"
    };
    setNotes([newEntry, ...notes]);
    setDiaryNote("");
    setAiGeneratedReport("");
    alert("Amaliyot kundaligi saqlandi va metodist tekshiruviga yuborildi!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. HEADER */}
      <div className="dashboard-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="saas-badge-pill" style={{ background: "#ECFDF5", color: "#059669", fontWeight: 700 }}>
              Pedagogik Amaliyot
            </span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Maktab nazorati & Rasmiy hisobot</span>
          </div>
          <h1 className="dashboard-title">🏛️ Pedagogik Amaliyotim & Hisobot</h1>
          <p className="dashboard-subtitle">
            GPS orqali maktabga tashrifni qayd etish, kunlik kundalik va universitet rasmiy amaliyot hisoboti
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
            <span>{starClaimed ? "⭐ Amaliyot Yulduzi Olingan" : "Yulduz Olish (+20 XP)"}</span>
          </button>
        </div>
      </div>

      {/* 2. TABS ROW */}
      <div className="boshqaruv-tabs-row">
        <button
          className={`boshqaruv-tab-btn ${activeTab === "amaliyotim" ? "active" : ""}`}
          onClick={() => setActiveTab("amaliyotim")}
        >
          <MapPin size={16} />
          <span>Amaliyotim & GPS Check-in</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeTab === "hisobot" ? "active" : ""}`}
          onClick={() => setActiveTab("hisobot")}
        >
          <FileCheck size={16} />
          <span>Amaliyot Hisoboti & Kundalik ({notes.length})</span>
        </button>
      </div>

      {/* TAB 1: AMALIYOTIM & GPS CHECK-IN */}
      {activeTab === "amaliyotim" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          {/* GPS Check-in Banner */}
          <div className="card" style={{ background: "linear-gradient(135deg, #F0FDF4, #FFFFFF)", border: "1.5px solid #86EFAC", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="saas-badge-pill" style={{ background: "#DCFCE7", color: "#15803D", fontWeight: 700, marginBottom: "8px" }}>
                  📍 Geolokatsiya Tasdiqi
                </span>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", margin: "4px 0" }}>
                  Amaliyot Joyiga Yetib Keldingizmi?
                </h2>
                <p style={{ color: "#475569", margin: "4px 0 0", fontSize: "0.9rem" }}>
                  Toshkent shahar, 187-sonli umumtaʼlim maktabi hududida ekanligingizni tasdiqlang.
                </p>
              </div>

              <div>
                {gpsVerified ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "10px", background: "#059669", color: "#FFFFFF", fontWeight: 700 }}>
                    <CheckCircle2 size={18} />
                    <span>✓ Tashrif GPS orqali tasdiqlandi</span>
                  </div>
                ) : (
                  <button
                    onClick={handleGpsCheckIn}
                    disabled={verifyingGps}
                    className="dh-go"
                    style={{ background: "#059669", color: "#FFFFFF", padding: "12px 24px", fontSize: "0.95rem" }}
                  >
                    <Navigation size={18} />
                    <span>{verifyingGps ? "GPS aniqlanmoqda..." : "📍 Tashrifni Tasdiqlash"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Maktab va biriktirilgan rahbar ma'lumotlari */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#EEF2FF", color: "#4F46E5", display: "grid", placeItems: "center" }}>
                  <School size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "#0F172A" }}>Amaliyot Maktabi</h3>
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Biriktirilgan ta'lim muassasasi</span>
                </div>
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A" }}>187-umumtaʼlim maktabi</div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "2px" }}>Toshkent shahri, Mirzo Ulug'bek tumani</div>
              <div style={{ fontSize: "0.82rem", color: "#475569", marginTop: "6px" }}>Sinf: <b>7-A, 8-B</b> (Jami 56 nafar o'quvchi)</div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#ECFDF5", color: "#059669", display: "grid", placeItems: "center" }}>
                  <UserCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "#0F172A" }}>Metodist Rahbar</h3>
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Universitet va maktab ustozlari</span>
                </div>
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A" }}>Axrorjon Ustoz</div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "2px" }}>Oliy toifali metodist o'qituvchi</div>
              <div style={{ fontSize: "0.82rem", color: "#059669", fontWeight: 600, marginTop: "6px" }}>✓ Aloqa mavjud (Telegram / Platforma)</div>
            </div>

            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#FEF3C7", color: "#D97706", display: "grid", placeItems: "center" }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "#0F172A" }}>Amaliyot Davri</h3>
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Semestr jadvali</span>
                </div>
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A" }}>1-oktabr – 30-noyabr</div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "2px" }}>8 haftalik pedagogik amaliyot</div>
              <div style={{ fontSize: "0.82rem", color: "#4F46E5", fontWeight: 600, marginTop: "6px" }}>Joriy hafta: 5-hafta (Faol)</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HISOBOT & KUNDALIK */}
      {activeTab === "hisobot" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* AI Yordamida Tezkor Kundalik Yozish */}
          <div className="card" style={{ padding: "24px" }}>
            <h2 className="t" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} className="text-amber-500" />
              <span>Bugungi Amaliyot Kundaligi (AI Assistent bilan)</span>
            </h2>
            <p className="note" style={{ color: "#64748B", margin: "4px 0 16px" }}>
              5–10 ta soʻz bilan bugun nima qilganingizni yozing. Sunʼiy intellekt uni universitet talabiga mos rasmiy hisobotga aylantiradi.
            </p>

            <input
              type="text"
              placeholder="Masalan: 7-A sinfda axborot xavfsizligi darsi o'tdim, Kahoot test qildik..."
              value={diaryNote}
              onChange={e => setDiaryNote(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
                fontSize: "0.92rem",
                outline: "none",
                marginBottom: "12px"
              }}
            />

            <button
              onClick={handleGenerateAiReport}
              disabled={!diaryNote.trim()}
              className="saas-btn-secondary"
              style={{ background: "#4F46E5", color: "#FFFFFF", border: "none", padding: "10px 18px" }}
            >
              <Sparkles size={15} />
              <span>AI orqali hisobot matnini generatsiya qilish</span>
            </button>

            {aiGeneratedReport && (
              <div style={{ marginTop: "16px", padding: "16px", borderRadius: "10px", background: "#F8FAFC", border: "1.5px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4F46E5", textTransform: "uppercase", marginBottom: "6px" }}>
                  Rasmiy Kundalik Matni:
                </div>
                <p style={{ fontSize: "0.92rem", color: "#1E293B", lineHeight: "1.6", margin: "0 0 14px" }}>
                  {aiGeneratedReport}
                </p>
                <button
                  onClick={handleAddDiaryEntry}
                  className="dh-go"
                  style={{ background: "#059669", color: "#FFFFFF", fontSize: "0.85rem", padding: "8px 16px" }}
                >
                  <Send size={14} />
                  <span>Kundalikka Saqlash va Ustozga Yuborish</span>
                </button>
              </div>
            )}
          </div>

          {/* Saqlangan kunlik amaliyot yozuvlari */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 className="t" style={{ margin: 0 }}>Rasmiy Amaliyot Qaydlari</h2>
              <button className="saas-btn-secondary" onClick={() => window.print()}>
                <Printer size={15} />
                <span>Hisobotni Chop Etish / PDF</span>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {notes.map(note => (
                <div key={note.id} className="card" style={{ padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>{note.date}</div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "4px 0" }}>
                        {note.subject}: {note.topic}
                      </h3>
                      <div style={{ fontSize: "0.85rem", color: "#475569" }}>
                        Maktab: <b>{note.school}</b> ({note.class}) · Rahbar: {note.mentor}
                      </div>
                    </div>

                    <span className="saas-badge-pill" style={{ background: note.status === "approved" ? "#ECFDF5" : "#FFFBEB", color: note.status === "approved" ? "#059669" : "#D97706", fontWeight: 700 }}>
                      {note.status === "approved" ? "✓ Ustoz Tasdiqlagan" : "Tekshiruvda"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InternshipPage() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>Yuklanmoqda...</div>}>
      <InternshipContent />
    </Suspense>
  );
}