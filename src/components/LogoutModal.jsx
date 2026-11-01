"use client";

import { LogOut, X } from "lucide-react";

export default function LogoutModal({ isOpen, onClose, onConfirm, loading }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-blur" onClick={onClose}>
      <div
        className="modal-card-center"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="modal-close-icon-btn"
          onClick={onClose}
          title="Yopiş"
          type="button"
        >
          <X size={18} />
        </button>

        <div className="modal-icon-badge-wrap">
          <div className="modal-icon-badge danger">
            <LogOut size={26} strokeWidth={2.2} />
          </div>
        </div>

        <h3 className="modal-title">Tizimdan çiqiş</h3>
        <p className="modal-desc">
          Rostdan ham platformadagi seansingizni yakunlab, hisobingizdan çiqmoqçimisiz? Qayta kiriş uçun login va parolingiz talab etiladi.
        </p>

        <div className="modal-actions-row">
          <button
            type="button"
            className="btn alt modal-action-btn"
            onClick={onClose}
            disabled={loading}
          >
            Bekor qiliş
          </button>
          <button
            type="button"
            className="btn danger modal-action-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            <LogOut size={16} />
            <span>{loading ? "Çiqilmoqda..." : "Ha, tizimdan çiqiş"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
