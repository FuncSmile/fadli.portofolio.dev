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
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/50 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-white">
          Fadli.dev
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {t(item.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setResumeOpen(true)}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {t("nav.resume")}
          </button>
        </div>
      </div>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </header>
  );
}
