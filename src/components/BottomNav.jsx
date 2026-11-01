"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  ClipboardCheck,
  Bot,
  Award
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Asosiy", icon: LayoutDashboard },
    { href: "/mashgulot", label: "Darslar", icon: Compass },
    { href: "/amaliyot", label: "Amaliyot", icon: ClipboardCheck },
    { href: "/ai", label: "AI Mentor", icon: Bot },
    { href: "/portfolio", label: "Portfolio", icon: Award }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">
              <Icon size={20} strokeWidth={2} />
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
