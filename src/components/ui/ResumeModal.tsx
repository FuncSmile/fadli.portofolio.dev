"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

const resumes = [
  { label: "English", href: "/CV_Muhamad_fadli_EN.pdf" },
  { label: "Bahasa Indonesia", href: "/CV_Muhamad_fadli_ID.pdf" }
];

export function ResumeModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose} role="presentation">
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-black/80 p-6 shadow-2xl shadow-cyan-500/10"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          aria-label="Close resume selection"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full bg-white/5 px-2 py-1 text-xs text-white hover:bg-white/10"
        >
          Esc
        </button>
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-neon">Resume</p>
          <h3 className="text-lg font-semibold text-white">Pilih versi yang ingin diunduh</h3>
          <div className="flex flex-col gap-3">
            {resumes.map((resume) => (
              <a
                key={resume.href}
                href={resume.href}
                download
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/10"
                onClick={onClose}
              >
                {resume.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
