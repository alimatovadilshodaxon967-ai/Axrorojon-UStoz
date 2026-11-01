"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Sparkles,
  Compass,
  ClipboardCheck,
  Bot,
  BrainCircuit,
  Globe2,
  HelpCircle,
  Award,
  Settings,
  Layers
} from "lucide-react";

export default function Topbar({ onToggleMenu, onOpenLogout }) {
  const pathname = usePathname();
  const [user, setUser] = useState({
    name: "Aziza Karimova",
    role: "student"
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => {
        if (d.authenticated && d.user) setUser(d.user);
      })
      .catch(() => {});
  }, []);

  const handleLogoutClick = () => {
    if (onOpenLogout) {
      onOpenLogout();
    } else {
      window.dispatchEvent(new CustomEvent("open-logout-modal"));
    }
  };

  const getPageInfo = () => {
    switch (pathname) {
      case "/": return { icon: Sparkles, title: "Boş sahifa" };
      case "/mashgulot": return { icon: Compass, title: "Dars İşlanmasi Konstruktori" };
      case "/amaliyot": return { icon: ClipboardCheck, title: "Raqamli Amaliyot Kundaligi" };
      case "/ai": return { icon: Bot, title: "Pedagogik Mentor (AI)" };
      case "/metodik": return { icon: BrainCircuit, title: "Pedagogik Keyslar Bazasi" };
      case "/xalqaro": return { icon: Globe2, title: "DigCompEdu Mezonlari" };
      case "/interaktiv": return { icon: HelpCircle, title: "Interaktiv Testlar" };
      case "/portfolio": return { icon: Award, title: "Portfolio va Yutuqlar" };
      case "/profil": return { icon: Settings, title: "Profil va Sozlamalar" };
      default: return { icon: Layers, title: "Pedagogik Platforma" };
    }
  };

  const page = getPageInfo();
  const PageIcon = page.icon;
  const isMentor = user.role === "mentor";
  const avatarSrc = isMentor ? "/avatars/ustoz-avatar-round.png" : "/avatars/aziza-avatar-round.png";

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        {/* MOBIL MENYU TUGMASI */}
        <button
          onClick={onToggleMenu}
          className="topbar-menu-toggle"
          title="Menyuni oçiş"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* TOZA BREADCRUMB SARLAVHA */}
        <div className="topbar-breadcrumb">
          <span className="topbar-crumb-root">Platforma</span>
          <span className="topbar-crumb-sep">/</span>
          <div className="topbar-crumb-current-wrap">
            <PageIcon size={17} className="text-primary" strokeWidth={2.2} />
            <span className="topbar-crumb-current">{page.title}</span>
          </div>
        </div>
      </div>

      <div className="topbar-actions">
        {user ? (
          <div className="topbar-user-widget">
            {/* FOYDALANUVCHI 3D AVATARI VA QORA PILL */}
            <Link href="/profil" className="topbar-user-badge-link" title="Profil sozlamalariga o'tish">
              <div className="topbar-avatar-3d-wrap">
                <img
                  src={avatarSrc}
                  alt={user.name}
                  className="topbar-avatar-3d-img"
                />
              </div>
              <div className="topbar-dark-name-pill">
                {user.name}
              </div>
            </Link>

            {/* CHIQISH TUGMASI (Endi go'zal markaziy modal ochadi) */}
            <button
              onClick={handleLogoutClick}
              className="topbar-logout-btn"
              title="Tizimdan çiqiş"
              type="button"
            >
              <LogOut size={16} strokeWidth={2.2} />
              <span className="topbar-logout-text">Çiqiş</span>
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link href="/auth/login" className="btn alt" style={{ padding: "7px 16px", fontSize: "0.85rem" }}>
              Kiriş
            </Link>
            <Link href="/auth/register" className="btn" style={{ padding: "7px 16px", fontSize: "0.85rem" }}>
              Röyxatdan ötış
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
