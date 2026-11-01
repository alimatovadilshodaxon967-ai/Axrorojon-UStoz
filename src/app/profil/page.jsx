"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  GraduationCap,
  Save,
  LogOut,
  Zap,
  Star,
  Compass,
  ClipboardCheck,
  CheckCircle2,
  ChevronLeft,
  Mail,
  Phone,
  Building2,
  BookOpen
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "Aziza Karimova",
    email: "talaba@yulduzlar.uz",
    role: "student",
    university: "Nizomiy nomidagi TDPU",
    faculty: "Pedagogika va psixologiya",
    course: 3,
    phone: "+998 90 123 45 67",
    xp: 120,
    stars: ["interaktiv", "metodik"],
    badges: ["first_star"]
  });
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => {
        if (d.authenticated && d.user) {
          setUser(prev => ({ ...prev, ...d.user }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      const data = await res.json();
      if (data.success || res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (e) {
      alert("Saqlaşda xato yuz berdi: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    window.dispatchEvent(new CustomEvent("open-logout-modal"));
  };

  const isMentor = user.role === "mentor";
  const avatarSrc = isMentor ? "/avatars/ustoz-avatar-round.png" : "/avatars/aziza-avatar-round.png";

  return (
    <div className="profile-container">
      
      {/* 1. YUQORI NAVIGATION & BREADCRUMB */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <Link href="/" className="btn alt" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", fontSize: "0.88rem" }}>
          <ChevronLeft size={16} />
          <span>Boş sahifaga qaytiş</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--ink-muted)" }}>
          <span>MongoDB Atlas:</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--emerald)", fontWeight: 600 }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--emerald)" }} />
            Ulangan (Cluster0)
          </span>
        </div>
      </div>

      {/* 2. PROFIL HEADER HERO KARTASI - 3D AVATAR VA QORA PILL */}
      <div className="profile-hero-card">
        <div className="profile-hero-content">
          
          {/* FOYDALANUVCHI 3D AVATARI VA QORA PILL NOMI */}
          <div className="profile-hero-avatar-card">
            <div className="profile-avatar-3d-large-wrap">
              <img
                src={avatarSrc}
                alt={user.name}
                className="profile-avatar-3d-large-img"
              />
            </div>
            <div className="profile-hero-dark-pill">
              {user.name}
            </div>
          </div>

          <div className="profile-hero-details">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
              <h1 className="profile-hero-name">{user.name}</h1>
              <span className="tag" style={{
                background: isMentor ? "var(--primary-light)" : "var(--gold-light)",
                color: isMentor ? "var(--primary)" : "#B45309",
                fontSize: "0.82rem",
                padding: "4px 12px",
                borderRadius: "20px"
              }}>
                {isMentor ? "Metodist Ustoz" : "Talaba (Bölajak pedagog)"}
              </span>
              <span style={{ fontSize: "0.82rem", background: "#F1F5F9", color: "var(--ink-secondary)", padding: "3px 10px", borderRadius: "20px", fontWeight: 600 }}>
                {user.university || "Nizomiy nomidagi TDPU"}
              </span>
            </div>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.94rem", margin: 0, lineHeight: 1.5, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Mail size={15} className="text-primary" /> {user.email}
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <GraduationCap size={15} className="text-indigo-600" /> {isMentor ? "Pedagogika va metodika kafedrasi" : `${user.course || 3}-kurs talabasi`}
              </span>
            </p>
          </div>
        </div>

        {/* PROFIL STATİSTİKA MINI-KARTALARI - SIFATLI PROFESSIONAL ICONS */}
        <div className="profile-stats-grid">
          <div className="profile-mini-stat">
            <div className="profile-mini-icon-wrap" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
              <Zap size={20} className="fill-indigo-600 text-indigo-600" />
            </div>
            <div>
              <div className="profile-mini-val">{user.xp || 120} XP</div>
              <div className="profile-mini-lbl">Tajriba Balli</div>
            </div>
          </div>
          <div className="profile-mini-stat">
            <div className="profile-mini-icon-wrap" style={{ background: "#FEF3C7", color: "#D97706" }}>
              <Star size={20} className="fill-amber-500 text-amber-500" />
            </div>
            <div>
              <div className="profile-mini-val">{Array.isArray(user.stars) ? user.stars.length : 2} / 7</div>
              <div className="profile-mini-lbl">Yulduzlar</div>
            </div>
          </div>
          <div className="profile-mini-stat">
            <div className="profile-mini-icon-wrap" style={{ background: "#ECFDF5", color: "#059669" }}>
              <Compass size={20} />
            </div>
            <div>
              <div className="profile-mini-val">{isMentor ? "14 ta" : "1 ta"}</div>
              <div className="profile-mini-lbl">Dars Rejalari</div>
            </div>
          </div>
          <div className="profile-mini-stat">
            <div className="profile-mini-icon-wrap" style={{ background: "#F0FDFA", color: "#0D9488" }}>
              <ClipboardCheck size={20} />
            </div>
            <div>
              <div className="profile-mini-val">{isMentor ? "Barchasi" : "1 kun"}</div>
              <div className="profile-mini-lbl">Amaliyot Hisoboti</div>
            </div>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div style={{
          padding: "14px 20px",
          borderRadius: "12px",
          background: "var(--emerald-light)",
          color: "var(--emerald)",
          marginBottom: "24px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          border: "1px solid #A7F3D0"
        }}>
          <CheckCircle2 size={20} />
          <span>Profil ma'lumotlari MongoDB Atlas ma'lumotlar bazasida muvaffaqiyatli saqlandi!</span>
        </div>
      )}

      {/* 3. SOZLAMALAR FORMASI (2 COLUMN PRO-SAAS LAYOUT) */}
      <form onSubmit={handleSave}>
        <div className="profile-form-grid">
          
          {/* 1-KARTA: SHAXSIY MA'LUMOTLAR */}
          <div className="card" style={{ margin: 0 }}>
            <div className="profile-card-header">
              <div className="profile-card-icon" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
                <User size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)" }}>
                  Şaxsiy Ma'lumotlar
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: "0.84rem", color: "var(--ink-muted)" }}>
                  Asosiy identifikatsiya va aloqa ma'lumotlari
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
              <div>
                <label style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "0.88rem" }}>
                  To‘liq ism-şarif (F.İ.Ş)
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="Ismingizni kiriting"
                  required
                />
              </div>

              <div>
                <label style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "0.88rem" }}>
                  Elektron poçta (Email)
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    style={{ background: "#F8FAFC", color: "var(--ink-secondary)", cursor: "not-allowed" }}
                  />
                  <span style={{ position: "absolute", right: "12px", top: "11px", fontSize: "0.78rem", background: "var(--emerald-light)", color: "var(--emerald)", padding: "2px 8px", borderRadius: "10px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <CheckCircle2 size={12} />
                    <span>Tasdiqlangan</span>
                  </span>
                </div>
                <span style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginTop: "4px", display: "block" }}>
                  Email xavfsizlik maqsadida faqat administrator tomonidan o‘zgartiriladi
                </span>
              </div>

              <div>
                <label style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "0.88rem" }}>
                  Telefon raqami
                </label>
                <input
                  type="text"
                  value={user.phone || "+998 90 123 45 67"}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  placeholder="+998 __ ___ __ __"
                />
              </div>
            </div>
          </div>

          {/* 2-KARTA: TA'LIM VA METODIK FAOLIYAT */}
          <div className="card" style={{ margin: 0 }}>
            <div className="profile-card-header">
              <div className="profile-card-icon" style={{ background: "#FEF3C7", color: "#D97706" }}>
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)" }}>
                  Ta'lim va Pedagogik Faoliyat
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: "0.84rem", color: "var(--ink-muted)" }}>
                  OTM, fakultet va ta'lim bosqichi sozlamalari
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
              <div>
                <label style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "0.88rem" }}>
                  Oliy Ta'lim Muassasasi (OTM)
                </label>
                <input
                  type="text"
                  value={user.university}
                  onChange={(e) => setUser({ ...user, university: e.target.value })}
                  placeholder="Masalan: Nizomiy nomidagi TDPU"
                />
              </div>

              <div>
                <label style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "0.88rem" }}>
                  Fakultet yoki kafedra
                </label>
                <input
                  type="text"
                  value={user.faculty || "Pedagogika va metodika"}
                  onChange={(e) => setUser({ ...user, faculty: e.target.value })}
                  placeholder="Fakultet nomini kiriting"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "0.88rem" }}>
                    Tizimdagi rol
                  </label>
                  <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                  >
                    <option value="student">Talaba (Bölajak pedagog)</option>
                    <option value="mentor">Ustoz / Metodist</option>
                  </select>
                </div>
                <div>
                  <label style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "0.88rem" }}>
                    Kursi / Bosqiç
                  </label>
                  <select
                    value={user.course || 3}
                    onChange={(e) => setUser({ ...user, course: Number(e.target.value) })}
                    disabled={isMentor}
                  >
                    <option value={1}>1-kurs</option>
                    <option value={2}>2-kurs</option>
                    <option value={3}>3-kurs</option>
                    <option value={4}>4-kurs</option>
                    <option value={0}>Magistratura / Bitiruvchi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. PASTKI AMALLAR PANELI */}
        <div className="profile-actions-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="submit"
              className="btn"
              disabled={loading}
              style={{ padding: "12px 28px", fontSize: "0.95rem", fontWeight: 700, borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Save size={18} />
              <span>{loading ? "Saqlanmoqda..." : "O'zgarişlarni Saqlaş"}</span>
            </button>
            <Link href="/" className="btn alt" style={{ padding: "12px 20px", fontSize: "0.95rem" }}>
              Bekor qiliş
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="btn danger"
            style={{ padding: "12px 20px", fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <LogOut size={16} />
            <span>Tizimdan Çiqiş</span>
          </button>
        </div>
      </form>

    </div>
  );
}
