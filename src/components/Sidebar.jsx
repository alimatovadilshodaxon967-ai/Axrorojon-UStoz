"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Target,
  Globe2,
  Compass,
  GraduationCap,
  Sparkles,
  FileEdit,
  Leaf,
  Wrench,
  Boxes,
  ClipboardList,
  Bot,
  Landmark,
  MapPin,
  FileCheck,
  FolderKanban,
  FolderCheck,
  Briefcase,
  MessageSquareText,
  Settings,
  ChevronDown,
  ChevronRight,
  X
} from "lucide-react";

export default function Sidebar({ mobileOpen = false, onClose }) {
  const pathname = usePathname();

  const [user, setUser] = useState({
    name: "Axrorjon Ustoz",
    role: "mentor",
    email: "axrorjon@yulduzlar.uz",
    stars: ["interaktiv", "mashgulot"]
  });

  // Har bir guruhning ochilgan/yopilgan holati (barchasi boshida ochiq)
  const [openGroups, setOpenGroups] = useState({
    yol: true,
    organish: true,
    yaratish: true,
    amaliyot: true,
    natija: true
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated && d.user) setUser(d.user);
      })
      .catch(() => {});
  }, []);

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const isMentor = user.role === "mentor" || user.name.includes("Ustoz");
  const avatarSrc = isMentor ? "/avatars/ustoz-avatar-round.png" : "/avatars/aziza-avatar-round.png";
  const stars = Array.isArray(user.stars) ? user.stars : [];

  // MONOXROM, PROFESSIONAL SAAS TUZILMASI (Rang-barang stikerlarsiz)
  const groups = [
    {
      id: "yol",
      title: "Mening yoʻlim",
      Icon: Target,
      progress: `${stars.includes("xalqaro") ? 1 : 0}/2`,
      items: [
        {
          href: "/xalqaro",
          label: "Xalqaro baholaş mezonlari",
          Icon: Globe2
        },
        {
          href: "/ai?tab=tavsiya",
          label: "Individual tavsiyalar",
          Icon: Compass
        }
      ]
    },
    {
      id: "organish",
      title: "Oʻrganiş",
      Icon: GraduationCap,
      progress: `${stars.includes("interaktiv") ? 1 : 0}/3`,
      items: [
        {
          href: "/interaktiv",
          label: "Interaktiv topşiriqlar",
          Icon: Sparkles
        },
        {
          href: "/metodik",
          label: "Metodik topşiriqlar",
          Icon: FileEdit
        },
        {
          href: "/metodik?tab=tarbiya",
          label: "Tarbiyaga oid yangiliklar",
          Icon: Leaf
        }
      ]
    },
    {
      id: "yaratish",
      title: "Yaratiş",
      Icon: Wrench,
      progress: `${stars.includes("mashgulot") ? 1 : 0}/3`,
      items: [
        {
          href: "/mashgulot?tab=vositalar",
          label: "Raqamli vositalar",
          Icon: Boxes
        },
        {
          href: "/mashgulot",
          label: "Maşğulot işlanmalari",
          Icon: ClipboardList
        },
        {
          href: "/ai?tab=mentor",
          label: "AI tavsiyalar",
          Icon: Bot
        }
      ]
    },
    {
      id: "amaliyot",
      title: "Amaliyot",
      Icon: Landmark,
      progress: `${stars.includes("amaliyot") ? 1 : 0}/2`,
      items: [
        {
          href: "/amaliyot",
          label: "Amaliyotim",
          Icon: MapPin
        },
        {
          href: "/amaliyot?tab=hisobot",
          label: "Amaliyot hisoboti",
          Icon: FileCheck
        }
      ]
    },
    {
      id: "natija",
      title: "Natijalarim",
      Icon: FolderKanban,
      progress: `${stars.includes("portfolio") ? 1 : 0}/3`,
      items: [
        {
          href: "/portfolio",
          label: "Portfolio",
          Icon: FolderCheck
        },
        {
          href: "/portfolio?tab=karyera",
          label: "Karyera profili",
          Icon: Briefcase
        },
        {
          href: "/portfolio?tab=aloqa",
          label: "Qayta aloqa",
          Icon: MessageSquareText
        }
      ]
    }
  ];

  return (
    <aside className={`app-sidebar saas-clean-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      {/* 1. BRAND LOGO */}
      <div className="sidebar-header saas-clean-header">
        <Link href="/" className="sidebar-logo" onClick={onClose}>
          <div className="sidebar-logo-icon-wrap" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}>
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
              <polygon fill="#FFFFFF" points="12,1.5 14.9,8.6 22.5,9.2 16.7,14.2 18.5,21.6 12,17.6 5.5,21.6 7.3,14.2 1.5,9.2 9.1,8.6" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="sidebar-logo-text" style={{ color: "#0F172A", fontSize: "1.25rem", fontWeight: 700 }}>
              Yulduzlar
            </span>
            <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 500, marginTop: "1px" }}>
              Pedagogik Platforma
            </span>
          </div>
        </Link>
        {mobileOpen && (
          <button onClick={onClose} className="sidebar-close-btn" title="Yopiş" style={{ color: "#64748B" }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* 2. NAVIGATION LINKS (Monoxrom, Toza, Professional) */}
      <nav className="saas-nav-container">
        
        {/* BOŞ SAHİFA */}
        <Link
          href="/"
          className={`saas-nav-link root-home ${pathname === "/" ? "active" : ""}`}
          onClick={onClose}
        >
          <Home size={18} className="saas-nav-icon" />
          <span className="saas-nav-label">Boş sahifa</span>
        </Link>

        {/* BO'LIMLAR RO'YXATI */}
        <div className="saas-groups-list">
          {groups.map((group) => {
            const isOpen = openGroups[group.id];
            const hasActiveChild = group.items.some((it) => pathname === it.href.split("?")[0].split("#")[0]);

            return (
              <div key={group.id} className="saas-group-wrapper">
                {/* Guruh Sarlavhasi (Akkordeon tugmasi) */}
                <button
                  type="button"
                  className={`saas-group-header ${hasActiveChild ? "has-active" : ""}`}
                  onClick={() => toggleGroup(group.id)}
                >
                  <div className="saas-group-title-box">
                    <group.Icon size={17} className="saas-group-icon" />
                    <span className="saas-group-title">{group.title}</span>
                  </div>

                  <div className="saas-group-meta-box">
                    <span className="saas-progress-badge">{group.progress}</span>
                    <span className="saas-chevron">
                      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                  </div>
                </button>

                {/* Ichki bo'limlar */}
                {isOpen && (
                  <div className="saas-children-box">
                    <div className="saas-branch-line" />
                    <div className="saas-children-list">
                      {group.items.map((item) => {
                        const itemBase = item.href.split("?")[0].split("#")[0];
                        const isActive = pathname === itemBase;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            className={`saas-child-link ${isActive ? "active" : ""}`}
                            onClick={onClose}
                          >
                            <item.Icon size={16} className="saas-child-icon" />
                            <span className="saas-child-label">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOŞQARUV PANELİ */}
        <div className="saas-nav-bottom-section">
          <Link
            href="/boshqaruv"
            className={`saas-nav-link ${pathname === "/boshqaruv" ? "active" : ""}`}
            onClick={onClose}
          >
            <Settings size={18} className="saas-nav-icon" />
            <span className="saas-nav-label">Boşqaruv paneli</span>
          </Link>
        </div>

      </nav>

      {/* 3. FOYDALANUVCHİ KARTASİ */}
      <div className="saas-footer-box">
        <Link href="/profil" className="saas-user-card" onClick={onClose} title="Profilni sozlash">
          <div className="sidebar-avatar-3d-wrap" style={{ border: "2px solid #E2E8F0" }}>
            <img
              src={avatarSrc}
              alt={user.name}
              className="sidebar-avatar-3d-img"
            />
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name" style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.9rem" }}>
              {user.name}
            </div>
            <div className="sidebar-user-role-text" style={{ color: "#64748B", fontWeight: 500, fontSize: "0.75rem" }}>
              {isMentor ? "Metodist Ustoz" : "Talaba (3-kurs)"}
            </div>
          </div>
          <ChevronRight size={16} style={{ color: "#94A3B8", marginLeft: "auto" }} />
        </Link>
      </div>
    </aside>
  );
}