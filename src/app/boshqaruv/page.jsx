"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Users,
  MapPin,
  FolderOpen,
  Star,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  Trash2,
  Lock,
  Unlock,
  UserPlus,
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  FileText,
  Sparkles,
  ChevronRight,
  ClipboardList,
  Mail,
  KeyRound,
  Shield
} from "lucide-react";

export default function BoshqaruvPage() {
  // Asosiy Tablar: 'users' (Foydalanuvchilar) | 'amaliyot' (Amaliyot nazorati) | 'malumotnoma' (Ma'lumotnoma)
  const [activeTab, setActiveTab] = useState("users");

  // 1. Foydalanuvchilar ro'yxati (Boshqaruv foydalanuvchilari)
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "farhodjonolimov@gmail.com",
      role: "Admin",
      status: "Faol",
      stars: "0/10"
    },
    {
      id: 2,
      email: "axrorjonustoz@gmail.com",
      role: "Metodist",
      status: "Faol",
      stars: "8/10"
    },
    {
      id: 3,
      email: "aziza.karimova@gmail.com",
      role: "Talaba",
      status: "Faol",
      stars: "4/10"
    },
    {
      id: 4,
      email: "jasur.rahimov@gmail.com",
      role: "Talaba",
      status: "Kutilmoqda",
      stars: "2/10"
    }
  ]);

  // Yangi foydalanuvchi hisobi yaratish formasi
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("Talaba");
  const [formError, setFormError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Hisob-kitoblar (Foydalanuvchilar: X. Kutilmoqda: Y. Faol: Z. Bloklangan: W.)
  const totalUsers = users.length;
  const pendingCount = users.filter(u => u.status === "Kutilmoqda").length;
  const activeCount = users.filter(u => u.status === "Faol").length;
  const blockedCount = users.filter(u => u.status === "Bloklangan").length;

  // Yangi foydalanuvchi yaratish
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes("@")) {
      setFormError("Iltimos, to'g'ri Gmail / Email manzilini kiriting!");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setFormError("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    const newUser = {
      id: Date.now(),
      email: newEmail.trim(),
      role: newRole,
      status: "Faol",
      stars: "0/10"
    };

    setUsers(prev => [...prev, newUser]);
    setNewEmail("");
    setNewPassword("");
    setNewRole("Talaba");
    setFormError("");
    setToastMessage(`"${newUser.email}" uchun login va parol muvaffaqiyatli berildi! ✨`);
    setTimeout(() => setToastMessage(""), 4500);
  };

  // Foydalanuvchini bloklash / faollashtirish
  const handleToggleBlock = (id) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === id) {
          const nextStatus = u.status === "Faol" ? "Bloklangan" : "Faol";
          setToastMessage(`"${u.email}" holati "${nextStatus}"ga o'zgartirildi.`);
          setTimeout(() => setToastMessage(""), 3500);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  // Foydalanuvchini o'chirish
  const handleDeleteUser = (id, email) => {
    if (confirm(`Rostdan ham ${email} hisobini o'chirmoqchimisiz?`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
      setToastMessage(`"${email}" tizimdan o'chirildi.`);
      setTimeout(() => setToastMessage(""), 3500);
    }
  };

  // 2. Amaliyot nazorati: Talabalar va topshiriqlar
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aziza Karimova",
      group: "Ped-301",
      school: "187-maktab (Toshkent)",
      mentor: "Axrorjon Ustoz",
      gpsTime: "Bugun, 08:14 (GPS tasdiqlangan)",
      stars: 4,
      score: "4.5",
      submittedPlans: 3,
      status: "Faol amaliyotda"
    },
    {
      id: 2,
      name: "Jasur Rahimov",
      group: "Ped-301",
      school: "42-maktab (Chilonzor)",
      mentor: "Axrorjon Ustoz",
      gpsTime: "Bugun, 08:25 (GPS tasdiqlangan)",
      stars: 2,
      score: "3.8",
      submittedPlans: 1,
      status: "Kutilmoqda"
    },
    {
      id: 3,
      name: "Malika Aliyeva",
      group: "Ped-302",
      school: "Ixtisoslashtirilgan maktab",
      mentor: "Nodira Zokirova",
      gpsTime: "Bugun, 08:05 (GPS tasdiqlangan)",
      stars: 6,
      score: "4.8",
      submittedPlans: 5,
      status: "Aʼlo natija"
    }
  ]);

  const [pendingTasks, setPendingTasks] = useState([
    {
      id: 101,
      studentName: "Jasur Rahimov",
      title: "Informatika: Axborot xavfsizligi va netiket qoidalari",
      type: "Dars ishlanmasi (4K va Bloom)",
      date: "Bugun, 10:45",
      status: "pending"
    },
    {
      id: 102,
      studentName: "Dildora Qosimova",
      title: "1-haftalik amaliyot kundaligi va maktab dars tahlili",
      type: "Amaliyot hisoboti",
      date: "Kecha, 16:20",
      status: "pending"
    }
  ]);

  const handleApprove = (id, studentName) => {
    setPendingTasks(prev => prev.filter(t => t.id !== id));
    setToastMessage(`${studentName}ning topshirig'i tasdiqlandi (+1 ⭐ berildi)!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleReject = (id, studentName) => {
    setPendingTasks(prev => prev.filter(t => t.id !== id));
    setToastMessage(`${studentName}ga topshiriq qayta ishlashga yuborildi.`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className="boshqaruv-page">
      {/* 1. SAHIFA SARLAVHASI (⚙ Boshqaruv paneli) */}
      <div className="boshqaruv-header-clean">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Settings size={28} className="text-slate-700" />
          <h1 className="boshqaruv-main-heading">Boshqaruv paneli</h1>
        </div>
      </div>

      {/* Xabarnoma tosti */}
      {toastMessage && (
        <div className="saas-alert-banner">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. TABLAR (Foydalanuvchilar | Amaliyot nazorati | Ma'lumotnoma) */}
      <div className="admin-nav-tabs">
        <button
          className={`admin-tab-pill ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <Users size={16} />
          <span>Foydalanuvchilar</span>
        </button>

        <button
          className={`admin-tab-pill ${activeTab === "amaliyot" ? "active" : ""}`}
          onClick={() => setActiveTab("amaliyot")}
        >
          <MapPin size={16} />
          <span>Amaliyot nazorati</span>
          {pendingTasks.length > 0 && (
            <span className="admin-tab-counter">{pendingTasks.length}</span>
          )}
        </button>

        <button
          className={`admin-tab-pill ${activeTab === "malumotnoma" ? "active" : ""}`}
          onClick={() => setActiveTab("malumotnoma")}
        >
          <FolderOpen size={16} />
          <span>Ma'lumotnoma</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: FOYDALANUVCHILAR (Screenshottagi qism)
          ======================================================== */}
      {activeTab === "users" && (
        <div className="admin-users-view">
          {/* Statistika qatori */}
          <div className="admin-counter-summary">
            Foydalanuvchilar: <b>{totalUsers}</b>. Kutilmoqda: <b>{pendingCount}</b>. Faol: <b>{activeCount}</b>. Bloklangan: <b>{blockedCount}</b>.
          </div>

          {/* Foydalanuvchilar jadvali */}
          <div className="card admin-table-container">
            <div className="table-responsive">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Gmail</th>
                    <th>Rol</th>
                    <th>Holat</th>
                    <th>Yulduz</th>
                    <th style={{ textAlign: "right" }}>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span className="user-email-text">{u.email}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`admin-role-badge ${u.role.toLowerCase()}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`admin-status-pill ${
                            u.status === "Faol"
                              ? "status-active"
                              : u.status === "Bloklangan"
                              ? "status-blocked"
                              : "status-pending"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <span className="admin-star-score">{u.stars}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {u.role === "Admin" ? (
                          <span style={{ color: "#94A3B8", fontSize: "0.88rem" }}>—</span>
                        ) : (
                          <div style={{ display: "inline-flex", gap: "8px", justifyContent: "flex-end" }}>
                            <button
                              onClick={() => handleToggleBlock(u.id)}
                              className={`action-btn-pill ${u.status === "Faol" ? "btn-block" : "btn-unblock"}`}
                              title={u.status === "Faol" ? "Bloklash" : "Faollashtirish"}
                            >
                              {u.status === "Faol" ? <Lock size={13} /> : <Unlock size={13} />}
                              <span>{u.status === "Faol" ? "Bloklash" : "Faol"}</span>
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id, u.email)}
                              className="action-btn-pill btn-delete"
                              title="O'chirish"
                            >
                              <Trash2 size={13} />
                              <span>O'chirish</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Yangi foydalanuvchiga login va parol berish formasi */}
          <div className="card admin-create-user-card">
            <div className="create-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <UserPlus size={18} className="text-teal-600" />
                <h2 className="create-card-title">Yangi foydalanuvchiga login va parol berish</h2>
              </div>
            </div>

            {formError && (
              <div className="form-error-alert">
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="create-user-form">
              <div className="form-group-field">
                <label className="field-label">Gmail</label>
                <div className="field-input-wrapper">
                  <Mail size={16} className="field-icon" />
                  <input
                    type="email"
                    required
                    placeholder="masalan: farhodjonolimov@gmail.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="admin-field-input"
                  />
                </div>
              </div>

              <div className="form-group-field">
                <label className="field-label">Parol (kamida 6 belgi)</label>
                <div className="field-input-wrapper">
                  <KeyRound size={16} className="field-icon" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="admin-field-input"
                  />
                </div>
              </div>

              <div className="form-group-field">
                <label className="field-label">Foydalanuvchi roli</label>
                <div className="field-input-wrapper">
                  <Shield size={16} className="field-icon" />
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="admin-field-select"
                  >
                    <option value="Talaba">Talaba</option>
                    <option value="Metodist">Metodist</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <button type="submit" className="btn-create-account">
                  <UserPlus size={16} />
                  <span>Hisob yaratish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: AMALIYOT NAZORATI (GPS & Topshiriqlar tekshiruvi)
          ======================================================== */}
      {activeTab === "amaliyot" && (
        <div className="admin-amaliyot-view">
          {/* 4 ta metrika kartochkasi */}
          <div className="boshqaruv-stats-grid">
            <div className="card boshqaruv-stat-card">
              <div className="stat-card-top">
                <span className="stat-card-label">Amaliyotdagi Talabalar</span>
                <div className="stat-card-icon-box" style={{ background: "#ECFDF5", color: "#059669" }}>
                  <MapPin size={18} />
                </div>
              </div>
              <div className="stat-card-val">94 nafar</div>
              <div className="stat-card-trend text-emerald-600">
                <CheckCircle2 size={14} />
                <span>GPS geolokatsiya faol</span>
              </div>
            </div>

            <div className="card boshqaruv-stat-card">
              <div className="stat-card-top">
                <span className="stat-card-label">Topshirilgan darslar</span>
                <div className="stat-card-icon-box" style={{ background: "#FEF3C7", color: "#D97706" }}>
                  <ClipboardList size={18} />
                </div>
              </div>
              <div className="stat-card-val">312 ta</div>
              <div className="stat-card-trend text-slate-500">
                <span>88% ijobiy baholangan</span>
              </div>
            </div>

            <div className="card boshqaruv-stat-card">
              <div className="stat-card-top">
                <span className="stat-card-label">Tekshiruv navbatida</span>
                <div className="stat-card-icon-box" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
                  <Clock size={18} />
                </div>
              </div>
              <div className="stat-card-val">{pendingTasks.length} ta</div>
              <div className="stat-card-trend text-amber-600">
                <span>Metodist ko'rigida</span>
              </div>
            </div>

            <div className="card boshqaruv-stat-card">
              <div className="stat-card-top">
                <span className="stat-card-label">O'rtacha kompetensiya</span>
                <div className="stat-card-icon-box" style={{ background: "#F0FDFA", color: "#0D9488" }}>
                  <BrainCircuit size={18} />
                </div>
              </div>
              <div className="stat-card-val">4.2 / 5.0</div>
              <div className="stat-card-trend text-indigo-600">
                <span>B2 - Mutaxassis daraja</span>
              </div>
            </div>
          </div>

          {/* Tekshirish navbati */}
          <div className="card" style={{ marginTop: "16px" }}>
            <h2 className="t" style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "14px" }}>
              Metodist tekshiruv navbati (Dars ishlanmalari va Amaliyot kundaliklari)
            </h2>

            {pendingTasks.length === 0 ? (
              <div className="empty-state-box" style={{ padding: "30px", textAlign: "center" }}>
                <CheckCircle2 size={40} className="text-emerald-500" style={{ margin: "0 auto 8px" }} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0F172A" }}>Barcha topshiriqlar tekshirildi!</h3>
                <p style={{ color: "#64748B", fontSize: "0.9rem" }}>Hozirda yangi tekshirilmagan hisobotlar mavjud emas.</p>
              </div>
            ) : (
              <div className="pending-tasks-list">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="pending-task-card">
                    <div className="pending-task-main">
                      <div className="task-type-badge">{task.type}</div>
                      <h3 className="task-title-text">{task.title}</h3>
                      <div className="task-meta-row">
                        <span>👤 Talaba: <b>{task.studentName}</b></span>
                        <span>⏱ {task.date}</span>
                      </div>
                    </div>

                    <div className="pending-task-actions">
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(task.id, task.studentName)}
                      >
                        <CheckCircle2 size={16} />
                        <span>Tasdiqlash (+1 ⭐)</span>
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(task.id, task.studentName)}
                      >
                        <span>Qaytarish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Talabalar amaliyot jadvali */}
          <div className="card" style={{ marginTop: "16px" }}>
            <h2 className="t" style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "14px" }}>
              Maktab amaliyotchilari va GPS tashriflar monitoringi
            </h2>

            <div className="table-responsive">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Talaba</th>
                    <th>Guruhi</th>
                    <th>Amaliyot maktabi</th>
                    <th>Metodist ustoz</th>
                    <th>GPS tasdiqi</th>
                    <th>Yulduzlar</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td><b>{s.name}</b></td>
                      <td><span className="admin-role-badge">{s.group}</span></td>
                      <td>{s.school}</td>
                      <td>{s.mentor}</td>
                      <td>
                        <span style={{ fontSize: "0.82rem", color: "#059669", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <CheckCircle2 size={13} />
                          <span>{s.gpsTime}</span>
                        </span>
                      </td>
                      <td>
                        <span className="admin-star-score">{s.stars} / 8 ⭐</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: MA'LUMOTNOMA (DigCompEdu & Pedagogik Mezonlar)
          ======================================================== */}
      {activeTab === "malumotnoma" && (
        <div className="admin-malumotnoma-view">
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <h2 className="t" style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>
                  Pedagogik Mezonlar va DigCompEdu 2.2 Yo'riqnomasi
                </h2>
                <p style={{ color: "#64748B", fontSize: "0.88rem", margin: "4px 0 0" }}>
                  Bo'lajak pedagoglarning raqamli savodxonligi va maktab amaliyoti baholash standartlari
                </p>
              </div>

              <button
                className="saas-btn-secondary"
                onClick={() => {
                  setToastMessage("Ma'lumotnoma rasmiy hujjati yuklab olindi (PDF).");
                  setTimeout(() => setToastMessage(""), 3500);
                }}
              >
                <Download size={15} />
                <span>Nizomni yuklab olish (PDF)</span>
              </button>
            </div>

            <div className="competence-bars-list" style={{ marginTop: "16px" }}>
              {[
                { name: "1. Kasbiy muhit (Professional Engagement)", desc: "Metodistlar bilan muloqot, doimiy o'z ustida ishlash va tajriba almashish", score: 4.4, color: "#4F46E5" },
                { name: "2. Raqamli ta'lim resurslari (Digital Resources)", desc: "Interaktiv ta'lim platformalari, taqdimotlar va elektron resurslardan foydalanish", score: 4.2, color: "#0D9488" },
                { name: "3. O'qitish va o'rganish (Teaching & Learning)", desc: "Bloom va 4K modeli asosida zamonaviy dars ishlanmalarini loyihalash", score: 4.6, color: "#2563EB" },
                { name: "4. Baholash va tahlil (Assessment)", desc: "Formatif va summativ raqamli testlar orqali o'quvchilar bilimini baholash", score: 3.9, color: "#D97706" },
                { name: "5. O'quvchilar imkoniyatlarini kengaytirish", desc: "Differentsial ta'lim va maxsus ehtiyojli o'quvchilarga moslashtirilgan darslar", score: 4.1, color: "#059669" },
                { name: "6. O'quvchilarning raqamli ko'nikmalarini rivojlantirish", desc: "Bolalarda axborot xavfsizligi, netiket va media savodxonlikni shakllantirish", score: 4.0, color: "#7C3AED" }
              ].map((comp) => (
                <div key={comp.name} className="competence-bar-item" style={{ padding: "14px", background: "#F8FAFC", borderRadius: "10px", marginBottom: "12px", border: "1px solid #E2E8F0" }}>
                  <div className="comp-bar-header" style={{ marginBottom: "6px" }}>
                    <div>
                      <b style={{ color: "#0F172A", fontSize: "0.95rem" }}>{comp.name}</b>
                      <p style={{ margin: "2px 0 0", color: "#64748B", fontSize: "0.82rem" }}>{comp.desc}</p>
                    </div>
                    <span className="comp-bar-score" style={{ color: comp.color, fontWeight: 700, fontSize: "0.95rem" }}>
                      {comp.score} / 5.0
                    </span>
                  </div>
                  <div className="comp-progress-bg">
                    <div
                      className="comp-progress-fill"
                      style={{ width: `${(comp.score / 5) * 100}%`, background: comp.color }}
                    />
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
