"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavDrawer({ isOpen, onClose }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Bosh sahifa", icon: "⌂" },
    { href: "/interaktiv", label: "Interaktiv topshiriqlar", icon: "✦" },
    { href: "/metodik", label: "Metodik keyslar", icon: "✎" },
    { href: "/mashgulot", label: "Dars ishlanmasi", icon: "▤" },
    { href: "/xalqaro", label: "DigCompEdu mezonlari", icon: "◎" },
    { href: "/amaliyot", label: "Amaliyot hisoboti", icon: "☰" },
    { href: "/ai", label: "Pedagogik Mentor (AI)", icon: "◈" },
    { href: "/portfolio", label: "Portfolio va Yutuqlar", icon: "▣" },
    { href: "/profil", label: "Profil va Sozlamalar", icon: "⚙️" }
  ];

  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <nav className={`main-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>⭐ Bo'limlar</h3>
          <p style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
            Next.js + Node.js + MongoDB
          </p>
        </div>
        <div className="nav-links">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-btn ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span>{link.icon}</span> {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
