"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Bot,
  Compass,
  Sparkles,
  Send,
  CheckCircle2,
  BrainCircuit,
  Star,
  Layers,
  ArrowRight,
  TrendingUp,
  BookOpen,
  FileCheck,
  RefreshCw,
  Lightbulb
} from "lucide-react";

function AIContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "tavsiya" ? "tavsiya" : "mentor";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Assalomu alaykum! Men sizning Pedagogik AI Mentoringizman. Dars rejasini tuzish, interaktiv metodlar tanlash, o'quvchilarni baholash yoki Bloom taksonomiyasi bo'yicha qanday savolingiz bor?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [starClaimed, setStarClaimed] = useState(false);

  // Dars tahlili holati
  const [lessonPlanText, setLessonPlanText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const quickPrompts = [
    { label: "🧊 Darsda 'Muz eritar' (Ice-breaker) usullar", text: "6-sinfda yangi mavzuni boshlash uchun o'quvchilarni faollashtiruvchi 3 ta noodatiy 'Muz eritar' (ice-breaker) usul taklif qil." },
    { label: "📊 Formativ baholash rubrikasi", text: "Guruhli ish uchun Bloom taksonomiyasiga asoslangan 4 darajali formativ baholash rubrikasi tuzib ber." },
    { label: "🔄 Teskari sinf (Flipped Classroom) ssenariysi", text: "Matematika fanidan 'Kasrlar' mavzusida Flipped Classroom usulida 45 daqiqalik dars ssenariysini loyihala." },
    { label: "🎯 4K ko'nikmalarini rivojlantirish", text: "Dars davomida o'quvchilarda tanqidiy fikrlash (Critical thinking) va kollaboratsiyani shakllantirish bo'yicha 2 ta topshiriq ber." }
  ];

  const handleSendMessage = async (textToSend) => {
    const q = textToSend || prompt;
    if (!q.trim() || loading) return;

    const newMsgs = [...messages, { role: "user", text: q }];
    setMessages(newMsgs);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMsgs, { role: "assistant", text: data.reply }]);
      } else {
        setMessages([
          ...newMsgs,
          {
            role: "assistant",
            text: "Kechirasiz, javob shakllantirishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
          }
        ]);
      }
    } catch {
      // Offline / Fallback sun'iy intellekt javobi
      setTimeout(() => {
        setMessages([
          ...newMsgs,
          {
            role: "assistant",
            text: `💡 **AI Pedagogik Tavsiya:**\n\nSiz kiritgan mavzu boʻyicha eng samarali yondashuv — oʻquvchilarni kichik guruhlarga ajratib, **«Aqliy hujum»** va **«Venn diagrammasi»** metodlarini integratsiya qilishdir.\n\n1. **Kirish (5 daqiqa):** Muammoli savol berish;\n2. **Amaliy qism (25 daqiqa):** Raqamli interaktiv vosita (Padlet yoki Miro doskasi) orqali guruhlar javoblarini taqqoslash;\n3. **Refleksiya (10 daqiqa):** «3-2-1» metodi orqali yakunlash.\n\nUshbu struktura orqali oʻquvchilarda 4K kompetensiyalari toʻliq rivojlanadi.`
          }
        ]);
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeLessonPlan = () => {
    if (!lessonPlanText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult({
        score: "92 / 100",
        strengths: [
          "Dars maqsadlari SMART mezonlariga toʻliq moslashtirilgan",
          "Interaktiv raqamli vositalardan (Kahoot va Canva) maqsadli foydalanilgan",
          "Oʻquvchilar mustaqil fikrlashi uchun yetarli vaqt ajratilgan"
        ],
        improvements: [
          "Darsning refleksiya qismida oʻquvchilar oʻzini oʻzi baholash rubrikasini kiritish tavsiya etiladi",
          "Tabaqalashgan (differensial) topshiriqlarni kengaytirish mumkin"
        ],
        bloomAlignment: "Yuqori (Tahlil va Yaratish darajalari qamrab olingan)"
      });
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. SAHIFA SARLAVHASI */}
      <div className="dashboard-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="saas-badge-pill" style={{ background: "#EEF2FF", color: "#4F46E5", fontWeight: 700 }}>
              Sunʼiy Intellekt
            </span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Pedagogik AI Assistenti</span>
          </div>
          <h1 className="dashboard-title">🤖 AI Pedagogik Mentor & Tavsiyalar</h1>
          <p className="dashboard-subtitle">
            Dars rejasini tahlil qilish, shaxsiy rivojlanish traektoriyasi va metodik promptlar generatori
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            onClick={() => {
              setStarClaimed(true);
            }}
            className="dh-go"
            style={{
              background: starClaimed ? "#059669" : "#F59E0B",
              color: "#FFFFFF",
              fontSize: "0.88rem",
              padding: "10px 18px"
            }}
          >
            <Star size={16} className="fill-white" />
            <span>{starClaimed ? "⭐ AI Yulduzi Olingan" : "Yulduz Olish (+20 XP)"}</span>
          </button>
        </div>
      </div>

      {/* 2. TABS NAVIGATSIYASI */}
      <div className="boshqaruv-tabs-row">
        <button
          className={`boshqaruv-tab-btn ${activeTab === "mentor" ? "active" : ""}`}
          onClick={() => setActiveTab("mentor")}
        >
          <Bot size={16} />
          <span>AI Pedagogik Suhbat</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeTab === "tavsiya" ? "active" : ""}`}
          onClick={() => setActiveTab("tavsiya")}
        >
          <Compass size={16} />
          <span>Individual Tavsiyalar (Roadmap)</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeTab === "tahlil" ? "active" : ""}`}
          onClick={() => setActiveTab("tahlil")}
        >
          <BrainCircuit size={16} />
          <span>Dars Rejasi Ekspertizasi</span>
        </button>
      </div>

      {/* TAB 1: AI MENTOR SUHBATI */}
      {activeTab === "mentor" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          {/* Tezkor Promptlar */}
          <div className="card" style={{ padding: "16px 20px" }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={14} className="text-amber-500" />
              <span>TEZKOR METODIK PROMPTLAR:</span>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  className="saas-btn-secondary"
                  style={{ fontSize: "0.82rem", padding: "6px 12px" }}
                  onClick={() => handleSendMessage(qp.text)}
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Suhbat oynasi */}
          <div className="card" style={{ display: "flex", flexDirection: "column", height: "520px", padding: "0", overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {messages.map((m, i) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: isUser ? "flex-end" : "flex-start",
                      gap: "10px"
                    }}
                  >
                    {!isUser && (
                      <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "#EEF2FF", color: "#4F46E5", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <Bot size={18} />
                      </div>
                    )}
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "12px 18px",
                        borderRadius: "14px",
                        background: isUser ? "#4F46E5" : "#F8FAFC",
                        color: isUser ? "#FFFFFF" : "#0F172A",
                        border: isUser ? "none" : "1px solid #E2E8F0",
                        fontSize: "0.92rem",
                        lineHeight: "1.6",
                        whiteSpace: "pre-wrap"
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748B", fontSize: "0.85rem", fontStyle: "italic" }}>
                  <RefreshCw size={14} className="animate-spin text-indigo-600" />
                  <span>AI javob tayyorlamoqda...</span>
                </div>
              )}
            </div>

            {/* Input qatori */}
            <div style={{ padding: "14px 18px", borderTop: "1px solid #E2E8F0", background: "#FFFFFF", display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Pedagogik savolingiz yoki dars mavzuingizni yozing..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "1px solid #CBD5E1",
                  fontSize: "0.92rem",
                  outline: "none"
                }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !prompt.trim()}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: "#4F46E5",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Send size={16} />
                <span>Yuborish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INDIVIDUAL TAVSIYALAR (ROADMAP) */}
      {activeTab === "tavsiya" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="card">
            <h2 className="t">🧭 Sizning Shaxsiy Rivojlanish Xaritangiz (Roadmap)</h2>
            <p className="note" style={{ color: "#64748B", margin: "4px 0 18px" }}>
              DigCompEdu xalqaro diagnostikangiz tahlili asosida tayyorlangan 4 haftalik individual reja
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                <span className="saas-badge-pill" style={{ background: "#EEF2FF", color: "#4F46E5", fontWeight: 700, marginBottom: "8px" }}>
                  1-Hafta: Boshlang'ich
                </span>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "6px 0", color: "#0F172A" }}>
                  Raqamli vositalar bilan tanishuv
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: "1.5" }}>
                  Kahoot va Padlet vositalarida roʻyxatdan oʻtib, sinf uchun 5 ta savoldan iborat birinchi viktorinani yarating.
                </p>
                <Link href="/mashgulot?tab=vositalar" style={{ fontSize: "0.82rem", color: "#4F46E5", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
                  <span>Vositalarni koʻrish</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                <span className="saas-badge-pill" style={{ background: "#ECFDF5", color: "#059669", fontWeight: 700, marginBottom: "8px" }}>
                  2-Hafta: Metodika
                </span>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "6px 0", color: "#0F172A" }}>
                  Bloom taksonomiyasi & SMART
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: "1.5" }}>
                  Dars ishlanmasi konstruktorida SMART mezonlariga mos 45 daqiqalik namunaviy dars rejasini loyihalang.
                </p>
                <Link href="/mashgulot" style={{ fontSize: "0.82rem", color: "#059669", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
                  <span>Dars loyihalash</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                <span className="saas-badge-pill" style={{ background: "#FEF3C7", color: "#D97706", fontWeight: 700, marginBottom: "8px" }}>
                  3-Hafta: Amaliyot
                </span>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "6px 0", color: "#0F172A" }}>
                  Maktab darsida sinovdan oʻtkazish
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: "1.5" }}>
                  Maktab amaliyotiga tashrif buyurib, tuzilgan interaktiv darsni oʻquvchilar bilan real sinfda oʻtkazing.
                </p>
                <Link href="/amaliyot" style={{ fontSize: "0.82rem", color: "#D97706", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
                  <span>Amaliyotga oʻtish</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                <span className="saas-badge-pill" style={{ background: "#FAF5FF", color: "#9333EA", fontWeight: 700, marginBottom: "8px" }}>
                  4-Hafta: Portfolio
                </span>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "6px 0", color: "#0F172A" }}>
                  Sertifikat & CV shakllantirish
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: "1.5" }}>
                  Yigʻilgan 8 ta yulduzni jamlab, universitet va ish beruvchi maktab uchun elektron pedagogik portfolio yarating.
                </p>
                <Link href="/portfolio" style={{ fontSize: "0.82rem", color: "#9333EA", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
                  <span>Portfolioni koʻrish</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DARS REJASI EKSPERTIZASI */}
      {activeTab === "tahlil" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="card">
            <h2 className="t">📋 Dars Ishlanmasini AI Metodist Ekspertizasidan Oʻtkazish</h2>
            <p className="note" style={{ color: "#64748B", margin: "4px 0 16px" }}>
              Yozgan dars rejangiz yoki mavzungizni kiriting. Sunʼiy intellekt uni 4K va Bloom mezonlari boʻyicha tahlil qilib xulosa beradi.
            </p>

            <textarea
              rows={5}
              placeholder="Masalan: Fan: Informatika. Mavzu: Axborot xavfsizligi. Maqsad: O'quvchilarga phishing va feyk xabarlarni aniqlashni o'rgatish. Dars rejasi: 1. Kirish..."
              value={lessonPlanText}
              onChange={e => setLessonPlanText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid #CBD5E1",
                fontSize: "0.92rem",
                outline: "none",
                marginBottom: "12px"
              }}
            />

            <button
              onClick={handleAnalyzeLessonPlan}
              disabled={analyzing || !lessonPlanText.trim()}
              className="dh-go"
              style={{ background: "#4F46E5", color: "#FFFFFF", padding: "10px 20px" }}
            >
              {analyzing ? "AI Tahlil qilmoqda..." : "🚀 Dars Rejasini Tahlil Qilish"}
            </button>
          </div>

          {analysisResult && (
            <div className="card" style={{ borderLeft: "4px solid #059669" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                  Ekspertiza Xulosasi
                </h3>
                <span className="saas-badge-pill" style={{ background: "#ECFDF5", color: "#059669", fontWeight: 800, fontSize: "0.9rem" }}>
                  Muvofiqlik: {analysisResult.score}
                </span>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#059669", marginBottom: "6px" }}>
                  ✅ KUCHLI JIHATLAR:
                </div>
                <ul style={{ paddingLeft: "20px", color: "#334155", fontSize: "0.9rem", lineHeight: "1.6" }}>
                  {analysisResult.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#D97706", marginBottom: "6px" }}>
                  ⚠️ TAVSIYA ETILADIGAN OʻZGARTIRISHLAR:
                </div>
                <ul style={{ paddingLeft: "20px", color: "#334155", fontSize: "0.9rem", lineHeight: "1.6" }}>
                  {analysisResult.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AIPage() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>Yuklanmoqda...</div>}>
      <AIContent />
    </Suspense>
  );
}