"use client";

import { ROUTES } from "@/constants/routes";
import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LanguageToggle } from "../ui/LanguageToggle";
import { ResumeModal } from "../ui/ResumeModal";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { key: "nav.about", href: ROUTES.about },
  { key: "nav.skills", href: ROUTES.skills },
  { key: "nav.projects", href: ROUTES.projects },
  { key: "nav.certificates", href: ROUTES.certificates },
  { key: "nav.experience", href: ROUTES.experience },
];

export function Navbar() {
  const { t } = useLanguage();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-8 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-6">
      <header 
        className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
          scrolled 
          ? "border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl py-3" 
          : "border-white/5 bg-white/5 backdrop-blur-md py-4"
        }`}
      >
        <div className="flex w-full items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-black text-white text-lg group-hover:rotate-12 transition-transform">
              F
            </div>
            <span className="font-black text-xl tracking-tighter text-white">
              Fadli<span className="text-accent">.</span>dev
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors relative group"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setResumeOpen(true)}
              className="px-5 py-2 rounded-xl bg-accent text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all border border-accent/50"
            >
              {t("nav.resume")}
            </motion.button>
          </div>
        </div>
      </header>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
