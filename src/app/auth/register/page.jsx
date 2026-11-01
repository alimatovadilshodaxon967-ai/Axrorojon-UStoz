"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    university: "Nizomiy nomidagi TDPU",
    faculty: "Pedagogika va psixologiya",
    course: 3
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("İltimos, barça maydonlarni töldiring");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Röyxatdan ötişda xatolik");
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
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "500px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <svg style={{ width: "38px", height: "38px" }} viewBox="0 0 24 24">
              <polygon fill="#F59E0B" points="12,1.5 14.9,8.6 22.5,9.2 16.7,14.2 18.5,21.6 12,17.6 5.5,21.6 7.3,14.2 1.5,9.2 9.1,8.6" />
            </svg>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.85rem", fontWeight: 700, color: "var(--ink)" }}>Yulduzlar</span>
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--ink)" }}>Röyxatdan Ötiş</h2>
          <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem" }}>
            Bölajak pedagoglar va ustozlar uçun yangi hisob yarating
          </p>
        </div>

        <div className="card" style={{ padding: "28px", boxShadow: "var(--shadow)" }}>
          {error && (
            <div style={{ padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--rose-light)", color: "var(--rose)", marginBottom: "18px", fontSize: "0.9rem", fontWeight: 600 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ marginTop: 0 }}>F.İ.Ş (Töliq ism-familiyangiz)</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Masalan: Aziza Karimova"
              required
            />

            <label>Elektron poçta (Email)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="talaba@yulduzlar.uz"
              required
            />

            <label>Parol (kamida 6 ta belgi)</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Maxfiy parol yarating"
              required
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label>Tizimdagi rolingiz</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="student">Talaba (Bölajak pedagog)</option>
                  <option value="mentor">Ustoz / Metodist</option>
                </select>
              </div>

              <div>
                <label>Kurs</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: parseInt(e.target.value, 10) })}
                >
                  <option value="1">1-kurs</option>
                  <option value="2">2-kurs</option>
                  <option value="3">3-kurs</option>
                  <option value="4">4-kurs</option>
                  <option value="5">Magistratura</option>
                </select>
              </div>
            </div>

            <label>Ta'lim muassasasi (OTM nomi)</label>
            <input
              value={form.university}
              onChange={(e) => setForm({ ...form, university: e.target.value })}
              placeholder="Nizomiy nomidagi TDPU"
            />

            <div style={{ marginTop: "22px" }}>
              <button
                type="submit"
                className="btn gold"
                style={{ width: "100%", padding: "12px", fontSize: "1rem" }}
                disabled={loading}
              >
                {loading ? "Röyxatdan ötkazilmoqda..." : "Hisob Yaratiş (+50 XP) →"}
              </button>
            </div>
          </form>

          <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
            Hisobingiz bormi?{" "}
            <Link href="/auth/login" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>
              Kiriş
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
