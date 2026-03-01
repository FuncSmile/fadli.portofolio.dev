"use client";

import { ROUTES } from "@/constants/routes";
import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import { useState } from "react";
import { LanguageToggle } from "../ui/LanguageToggle";
import { ResumeModal } from "../ui/ResumeModal";

const navItems = [
  { key: "nav.about", href: ROUTES.about },
  { key: "nav.skills", href: ROUTES.skills },
  { key: "nav.projects", href: ROUTES.projects },
  { key: "nav.certificates", href: ROUTES.certificates },
  { key: "nav.experience", href: ROUTES.experience },
  { key: "nav.contact", href: ROUTES.contact }
];

export function Navbar() {
  const { t } = useLanguage();
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <div className="fixed top-6 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 px-4 sm:px-6">
      <header className="rounded-full border border-white/10 bg-black/40 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-black/40 transition-all duration-300">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-3">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight text-white hover:text-neon transition-colors">
            Fadli.dev
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 sm:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {t(item.key)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="rounded-full bg-accent/90 px-4 py-1.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-accent/50"
            >
              {t("nav.resume")}
            </button>
          </div>
        </div>
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      </header>
    </div>
  );
}
