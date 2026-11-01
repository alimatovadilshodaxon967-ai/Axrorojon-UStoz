"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("student");
  const [form, setForm] = useState({
    email: "talaba@yulduzlar.uz",
    password: "talaba123"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectQuickAccount = (role) => {
    setSelectedRole(role);
    setError("");
    if (role === "mentor") {
      setForm({
        email: "ustoz@yulduzlar.uz",
        password: "ustoz123"
      });
    } else {
      setForm({
        email: "talaba@yulduzlar.uz",
        password: "talaba123"
      });
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!form.email || !form.password) {
      setError("İltimos, email va parolni kiriting");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Email yoki parol notöğri kiritildi");
      }
      
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#F8FAFC",
      padding: "24px 16px"
    }}>
      <div style={{
        maxWidth: "480px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        
        {/* LOGO VA SARLAVHA */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <svg style={{ width: "36px", height: "36px" }} viewBox="0 0 24 24">
              <polygon fill="#F59E0B" points="12,1.5 14.9,8.6 22.5,9.2 16.7,14.2 18.5,21.6 12,17.6 5.5,21.6 7.3,14.2 1.5,9.2 9.1,8.6" />
            </svg>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em" }}>
              Yulduzlar
            </span>
          </div>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0F172A", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Tizimga Kiriş
          </h1>
          <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>
            Platformadan foydalaniş uçun emailingiz va parolingizni kiriting
          </p>
        </div>

        {/* ASOSIY OQ KARTA */}
        <div style={{
          width: "100%",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          padding: "32px 28px",
          boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)"
        }}>

          {/* TEZKOR SINOV HISOBLARI */}
          <div style={{
            background: "#F0F7FF",
            border: "1px solid #BAE6FD",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#D97706",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "0.04em",
              marginBottom: "12px"
            }}>
              <span>⚡</span>
              <span>TEZKOR SİNOV HİSOBLARİ (1 TA TUGMA BİLAN TANLANG):</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {/* USTOZ */}
              <button
                type="button"
                onClick={() => handleSelectQuickAccount("mentor")}
                style={{
                  background: selectedRole === "mentor" ? "#EEF2FF" : "#FFFFFF",
                  border: selectedRole === "mentor" ? "2px solid #4F46E5" : "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "12px 10px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px"
                }}
              >
                <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>👨‍🏫</span>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>
                    Axrorjon Ustoz
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#64748B", marginTop: "2px" }}>
                    Mentor (Tekşiruvçi)
                  </div>
                </div>
              </button>

              {/* TALABA */}
              <button
                type="button"
                onClick={() => handleSelectQuickAccount("student")}
                style={{
                  background: selectedRole === "student" ? "#EEF2FF" : "#FFFFFF",
                  border: selectedRole === "student" ? "2px solid #4F46E5" : "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "12px 10px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px"
                }}
              >
                <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>👩‍🎓</span>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>
                    Aziza Karimova
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#64748B", marginTop: "2px" }}>
                    Talaba (3-kurs)
                  </div>
                </div>
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: "#FEE2E2",
              color: "#DC2626",
              marginBottom: "20px",
              fontSize: "0.88rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* FORMA */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#0F172A", marginBottom: "6px" }}>
                Elektron poçta (Email)
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Masalan: talaba@yulduzlar.uz"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid #CBD5E1",
                  fontSize: "0.95rem",
                  color: "#0F172A",
                  outline: "none",
                  transition: "border-color 0.15s ease"
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "#0F172A", margin: 0 }}>
                  Parol
                </label>
                <span style={{ fontSize: "0.82rem", color: "#4F46E5", cursor: "pointer", fontWeight: 600 }}>
                  Parolni unutdingizmi?
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Parolingizni kiriting"
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 14px",
                    borderRadius: "8px",
                    border: "1px solid #CBD5E1",
                    fontSize: "0.95rem",
                    color: "#0F172A",
                    outline: "none"
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: 0,
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    opacity: 0.6
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: "#4F46E5",
                color: "#FFFFFF",
                border: 0,
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: loading ? "wait" : "pointer",
                boxShadow: "0 2px 8px rgba(79, 70, 229, 0.25)",
                transition: "background 0.15s ease"
              }}
            >
              {loading ? "Tekşirilmoqda..." : "Tizimga Kiriş →"}
            </button>
          </form>

          {/* RO'YXATDAN O'TISH HAVOLASI */}
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p style={{ color: "#64748B", fontSize: "0.92rem", margin: 0 }}>
              Yangi foydalanuvçimisiz?{" "}
              <Link href="/auth/register" style={{ color: "#4F46E5", fontWeight: 700, textDecoration: "none" }}>
                Ro‘yxatdan o‘tiş
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
