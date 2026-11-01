"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Star,
  Award,
  Layers,
  HelpCircle,
  ArrowRight,
  Shuffle,
  ListOrdered,
  Image as ImageIcon
} from "lucide-react";

export default function InteraktivTopshiriqlarPage() {
  const [activeMode, setActiveMode] = useState("test"); // test | moslash | tartib | keys
  const [quizScore, setQuizScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [starClaimed, setStarClaimed] = useState(false);

  // 1. TEST SAVOLLARI
  const questions = [
    {
      q: "Oʻquvchilar fikrini dars davomida tezkor aniqlash va formativ baholash uchun qaysi raqamli vosita eng samarali hisoblanadi?",
      options: [
        "Interaktiv onlayn soʻrovnoma (Mentimeter / Kahoot)",
        "Dars oxirida bosma jurnaldan konspekt tekshirish",
        "Faqat ogʻzaki frontal savol-javob oʻtkazish"
      ],
      correct: 0,
      expl: "Mentimeter va Kahoot kabi vositalar anonim yoki tezkor vizual diagramma orqali butun sinfning tushunish darajasini soniyalar ichida ko'rsatadi."
    },
    {
      q: "Internetdan dars uchun olingan elektron materiallardan foydalanishda birinchi navbatda nima qilinadi?",
      options: [
        "Materialni oʻzgartirmasdan darhol nusxalab tarqatish",
        "Manbaning ishonchliligi va mualliflik huquqini (OER / Creative Commons) tekshirish",
        "Faqat rasmlarini olib, matnini o'chirib tashlash"
      ],
      correct: 1,
      expl: "Raqamli savodxonlikning asosiy qoidasi — manba ishonchliligi (fact-checking) va mualliflik huquqiga rioya qilishdir."
    },
    {
      q: "Bloom taksonomiyasining eng yuqori darajasidagi oʻquv maqsadi qaysi?",
      options: [
        "Yodlash va eslab qolish (Remembering)",
        "Tushunish va qayta aytib berish (Understanding)",
        "Yaratish va loyihalash (Creating)"
      ],
      correct: 2,
      expl: "Bloom taksonomiyasida 'Yaratish' (Creating) eng yuqori bilish darajasi bo'lib, o'quvchining o'z g'oyasi asosida yangi mahsulot yoki yechim loyihalashini anglatadi."
    }
  ];

  // 2. MOSLASHTIRISH (MATCHING)
  const [matchedPairs, setMatchedPairs] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const matchItems = [
    { id: 1, left: "Formativ baholash", right: "O'rganish jarayonida tezkor qayta aloqa berish" },
    { id: 2, left: "Summativ baholash", right: "Bo'lim yoki chorak yakunida natijani rasmiy qayd etish" },
    { id: 3, left: "Flipped Classroom", right: "Nazariya uyda o'rganilib, sinfda amaliy mashg'ulot bajarilishi" },
    { id: 4, left: "Rubrika", right: "Baholash mezonlari va darajalari aks etgan aniq jadval" }
  ];

  // 3. TARTIBLASH (ORDERING)
  const initialOrder = [
    { id: 3, text: "Yangi mavzuni tushuntirish va interaktiv muhokama" },
    { id: 1, text: "Dars maqsadi va motivatsiya (Muz eritar)" },
    { id: 5, text: "Refleksiya va o'zini o'zi baholash (3-2-1 metodi)" },
    { id: 2, text: "O'quvchilar bilimini diagnostika qilish" },
    { id: 4, text: "Mustahkamlash: Kichik guruhlarda amaliy loyiha" }
  ];
  const [orderedItems, setOrderedItems] = useState(initialOrder);
  const [orderChecked, setOrderChecked] = useState(false);

  const handleSelectOption = (idx) => {
    setSelectedOpt(idx);
    const isCorrect = idx === questions[currentQ].correct;
    if (isCorrect) setQuizScore(s => s + 1);

    setTimeout(() => {
      setSelectedOpt(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(c => c + 1);
      } else {
        setQuizFinished(true);
      }
    }, 700);
  };

  const handleMatchLeft = (id) => {
    setSelectedLeft(id);
  };

  const handleMatchRight = (id) => {
    if (selectedLeft === id) {
      setMatchedPairs(prev => ({ ...prev, [id]: true }));
      setSelectedLeft(null);
    } else {
      setSelectedLeft(null);
    }
  };

  const moveOrder = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= orderedItems.length) return;
    const copy = [...orderedItems];
    const [moved] = copy.splice(fromIdx, 1);
    copy.splice(toIdx, 0, moved);
    setOrderedItems(copy);
    setOrderChecked(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. SAHIFA SARLAVHASI */}
      <div className="dashboard-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="saas-badge-pill" style={{ background: "#FEF3C7", color: "#B45309", fontWeight: 700 }}>
              Pedagogik Laboratoriya
            </span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Interaktiv mashqlar va Challenge</span>
          </div>
          <h1 className="dashboard-title">⭐ Interaktiv Topşiriqlar Laboratoriyasi</h1>
          <p className="dashboard-subtitle">
            Pedagogik testlar, tushunchalarni moslashtirish, dars bosqichlarini tartiblash va situatsion keyslar
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
            <span>{starClaimed ? "⭐ Yulduz Olingan (1/1)" : "Yulduz Olish (+20 XP)"}</span>
          </button>
        </div>
      </div>

      {/* 2. REJIMLAR TABS ROW */}
      <div className="boshqaruv-tabs-row">
        <button
          className={`boshqaruv-tab-btn ${activeMode === "test" ? "active" : ""}`}
          onClick={() => setActiveMode("test")}
        >
          <HelpCircle size={16} />
          <span>1. Pedagogik Testlar</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeMode === "moslash" ? "active" : ""}`}
          onClick={() => setActiveMode("moslash")}
        >
          <Shuffle size={16} />
          <span>2. Moslashtirish (Matching)</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeMode === "tartib" ? "active" : ""}`}
          onClick={() => setActiveMode("tartib")}
        >
          <ListOrdered size={16} />
          <span>3. Darsni Tartiblash (Ordering)</span>
        </button>

        <button
          className={`boshqaruv-tab-btn ${activeMode === "keys" ? "active" : ""}`}
          onClick={() => setActiveMode("keys")}
        >
          <Layers size={16} />
          <span>4. Situatsion Keyslar</span>
        </button>
      </div>

      {/* REJIM 1: TESTLAR */}
      {activeMode === "test" && (
        <div className="card" style={{ padding: "24px" }}>
          {quizFinished ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#ECFDF5", color: "#059669", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
                <CheckCircle2 size={36} />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", margin: "0 0 8px" }}>
                {quizScore >= 2 ? "Ajoyib natija! Test yakunlandi." : "Yaxshi urinish!"}
              </h2>
              <p style={{ color: "#64748B", fontSize: "0.95rem", margin: "0 0 20px" }}>
                Siz {questions.length} ta savoldan {quizScore} tasiga toʻgʻri javob berdingiz (+{quizScore * 20} XP).
              </p>
              <button
                className="saas-btn-secondary"
                onClick={() => {
                  setCurrentQ(0);
                  setQuizScore(0);
                  setQuizFinished(false);
                }}
              >
                <RotateCcw size={15} />
                <span>Qayta urinish</span>
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className="saas-badge-pill" style={{ background: "#EEF2FF", color: "#4F46E5", fontWeight: 700 }}>
                  Savol {currentQ + 1} / {questions.length}
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#059669" }}>
                  Toʻgʻri javoblar: {quizScore}
                </span>
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", margin: "0 0 18px", lineHeight: "1.5" }}>
                {questions[currentQ].q}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {questions[currentQ].options.map((opt, i) => {
                  let optStyle = {
                    padding: "12px 18px",
                    borderRadius: "10px",
                    border: "1.5px solid #E2E8F0",
                    background: "#FFFFFF",
                    color: "#334155",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease"
                  };

                  if (selectedOpt !== null) {
                    if (i === questions[currentQ].correct) {
                      optStyle.background = "#ECFDF5";
                      optStyle.border = "1.5px solid #059669";
                      optStyle.color = "#065F46";
                    } else if (i === selectedOpt) {
                      optStyle.background = "#FEF2F2";
                      optStyle.border = "1.5px solid #EF4444";
                      optStyle.color = "#991B1B";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={selectedOpt !== null}
                      onClick={() => handleSelectOption(i)}
                      style={optStyle}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* REJIM 2: MOSLASHTIRISH */}
      {activeMode === "moslash" && (
        <div className="card" style={{ padding: "24px" }}>
          <h2 className="t">Pedagogik tushunchalarni taʼriflar bilan moslashtiring</h2>
          <p className="note" style={{ color: "#64748B", margin: "4px 0 20px" }}>
            Chap tomondagi atamani bosing, soʻngra oʻng tomondagi unga mos toʻgʻri taʼrifni tanlang.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Chap tomon */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748B" }}>ATAMALAR:</div>
              {matchItems.map(item => {
                const isMatched = !!matchedPairs[item.id];
                const isSelected = selectedLeft === item.id;
                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleMatchLeft(item.id)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: isSelected ? "2px solid #4F46E5" : isMatched ? "1.5px solid #059669" : "1.5px solid #E2E8F0",
                      background: isMatched ? "#ECFDF5" : isSelected ? "#EEF2FF" : "#FFFFFF",
                      color: isMatched ? "#065F46" : isSelected ? "#4F46E5" : "#0F172A",
                      fontWeight: 700,
                      textAlign: "left",
                      cursor: isMatched ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <span>{item.left}</span>
                    {isMatched && <CheckCircle2 size={16} className="text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* O'ng tomon */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748B" }}>TAʼRIFLAR:</div>
              {matchItems.map(item => {
                const isMatched = !!matchedPairs[item.id];
                return (
                  <button
                    key={item.id}
                    disabled={isMatched || selectedLeft === null}
                    onClick={() => handleMatchRight(item.id)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: isMatched ? "1.5px solid #059669" : "1.5px solid #E2E8F0",
                      background: isMatched ? "#ECFDF5" : "#FFFFFF",
                      color: isMatched ? "#065F46" : "#334155",
                      fontWeight: 500,
                      fontSize: "0.88rem",
                      textAlign: "left",
                      cursor: isMatched ? "default" : "pointer"
                    }}
                  >
                    {item.right}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* REJIM 3: TARTIBLASH */}
      {activeMode === "tartib" && (
        <div className="card" style={{ padding: "24px" }}>
          <h2 className="t">Dars bosqichlarini toʻgʻri ketma-ketlikda tartiblang</h2>
          <p className="note" style={{ color: "#64748B", margin: "4px 0 20px" }}>
            Tugmalar orqali bosqichlarni yuqoriga yoki pastga siljitib, darsning toʻgʻri ketma-ketligini tuzing.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "600px" }}>
            {orderedItems.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1.5px solid #E2E8F0",
                  background: "#F8FAFC"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#EEF2FF", color: "#4F46E5", fontWeight: 700, fontSize: "0.82rem", display: "grid", placeItems: "center" }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0F172A" }}>
                    {item.text}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => moveOrder(idx, idx - 1)}
                    disabled={idx === 0}
                    style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #CBD5E1", background: "#FFFFFF", cursor: "pointer" }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveOrder(idx, idx + 1)}
                    disabled={idx === orderedItems.length - 1}
                    style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #CBD5E1", background: "#FFFFFF", cursor: "pointer" }}
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setOrderChecked(true)}
              className="dh-go"
              style={{ background: "#4F46E5", color: "#FFFFFF", alignSelf: "flex-start", marginTop: "12px" }}
            >
              Ketma-ketlikni tekshirish
            </button>

            {orderChecked && (
              <div style={{ padding: "12px", borderRadius: "8px", background: "#ECFDF5", color: "#065F46", fontSize: "0.9rem", fontWeight: 600, marginTop: "8px" }}>
                ✅ Toʻgʻri ketma-ketlik: Motivatsiya → Diagnostika → Yangi mavzu → Mustahkamlash → Refleksiya. Siz dars strukturasini toʻgʻri belgiladingiz!
              </div>
            )}
          </div>
        </div>
      )}

      {/* REJIM 4: SITUATSION KEYSLAR */}
      {activeMode === "keys" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          <div className="card">
            <span className="saas-badge-pill" style={{ background: "#FEF3C7", color: "#D97706", fontWeight: 700, marginBottom: "8px" }}>
              Keys #1: Faollik pasayishi
            </span>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "6px 0", color: "#0F172A" }}>
              Sinfda diqqat tarqoqligi va passivlik
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.5" }}>
              Vaziyat: Oʻqituvchi 20 daqiqa davomida faqat maʼruza oʻqidi, oʻquvchilar chalgʻiy boshladi.
            </p>
            <div style={{ background: "#F8FAFC", borderRadius: "8px", padding: "10px", marginTop: "10px", fontSize: "0.85rem", color: "#334155" }}>
              <b>💡 Tavsiya etilgan pedagogik yechim:</b> Darhol darsni «Think-Pair-Share» (Oʻyla-Juftlash-Ulash) metodi yoki tezkor Mentimeter soʻrovi bilan jonlantirish.
            </div>
          </div>

          <div className="card">
            <span className="saas-badge-pill" style={{ background: "#EEF2FF", color: "#4F46E5", fontWeight: 700, marginBottom: "8px" }}>
              Keys #2: Differensial taʼlim
            </span>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "6px 0", color: "#0F172A" }}>
              Qobiliyati turlicha oʻquvchilar
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.5" }}>
              Vaziyat: 3 nafar oʻquvchi topshiriqni 5 daqiqada bajarib boʻlib, boshqalarga xalaqit bermoqda.
            </p>
            <div style={{ background: "#F8FAFC", borderRadius: "8px", padding: "10px", marginTop: "10px", fontSize: "0.85rem", color: "#334155" }}>
              <b>💡 Tavsiya etilgan pedagogik yechim:</b> Ularga Bloomning yuqori bosqichiga oid ijodiy topshiriq (masalan, boshqalar uchun test savoli tuzish) berish.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}