"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import BottomNav from "@/components/BottomNav";
import LogoutModal from "@/components/LogoutModal";

export default function AppLayoutWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register";

  useEffect(() => {
    const handleOpenLogout = () => setShowLogoutModal(true);
    window.addEventListener("open-logout-modal", handleOpenLogout);
    return () => window.removeEventListener("open-logout-modal", handleOpenLogout);
  }, []);

  const handleLogoutConfirm = async () => {
    setLogoutLoading(true);
    try {
      await fetch("/api/auth/me", { method: "DELETE" });
      setShowLogoutModal(false);
      router.push("/auth/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  // Agar login yoki register sahifasida bo'lsa, to'liq markaziy ko'rinish
  if (isAuthPage) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        {children}
      </div>
    );
  }

  return (
    <div className="app-shell">
      {mobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenLogout={() => setShowLogoutModal(true)}
      />
      <div className="app-workspace">
        <Topbar
          onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenLogout={() => setShowLogoutModal(true)}
        />
        <main className="app-content">{children}</main>
      </div>
      <BottomNav />

      {/* CHIROYLI MARKAZIY MODAL KARTA (Tizimdan chiqish) */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        loading={logoutLoading}
      />
    </div>
  );
}
