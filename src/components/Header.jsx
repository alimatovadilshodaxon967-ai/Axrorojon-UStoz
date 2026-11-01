"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ onToggleDrawer }) {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("yz_theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Foydalanuvchini tekshirish
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => {
        if (d.authenticated) setUser(d.user);
      })
      .catch(() => {});
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("yz_theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <header>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          className="icon-btn"
          onClick={onToggleDrawer}
          aria-label="Menyuni ochish"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <Link href="/" className="logo-area">
          <svg className="logo-icon" viewBox="0 0 24 24">
            <polygon fill="#F59E0B" points="12,1.5 14.9,8.6 22.5,9.2 16.7,14.2 18.5,21.6 12,17.6 5.5,21.6 7.3,14.2 1.5,9.2 9.1,8.6"/>
          </svg>
          <span className="logo-text">Yulduzlar</span>
          <span className="logo-badge">Fullstack</span>
        </Link>
      </div>

      <div className="header-actions">
        <button className="icon-btn" onClick={toggleTheme} title="Mavzuni almashtirish">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {user ? (
          <Link href="/profil" className="user-badge" style={{ textDecoration: "none", color: "inherit" }}>
            <span>👤 {user.name}</span>
            <span className="role-tag">
              {user.role === "mentor" ? "Ustoz / Mentor" : user.role === "admin" ? "Admin" : "Talaba"}
            </span>
          </Link>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link href="/auth/login" className="btn alt" style={{ padding: "6px 12px", fontSize: "0.85rem" }}>
              Kirish
            </Link>
            <Link href="/auth/register" className="btn gold" style={{ padding: "6px 12px", fontSize: "0.85rem" }}>
              Ro'yxatdan o'tish
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
