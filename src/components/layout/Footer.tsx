"use client";

import { socials } from "@/constants/socials";
import { ROUTES } from "@/constants/routes";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpCircle, MessageSquare } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const iconMap: Record<string, any> = {
    GitHub: Github,
    LinkedIn: Linkedin,
    Email: Mail,
    WhatsApp: MessageSquare
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-background/80 backdrop-blur-xl">
      {/* Decorative top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-black tracking-tighter text-white">
                FADLI<span className="text-neon">.</span>
              </h3>
              <p className="text-xs font-mono text-neon/60 tracking-widest uppercase">
                Fullstack Developer & Linux Enthusiast
              </p>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              5th-semester Informatics Engineering student at Universitas Bina Sarana Informatika.
              Built with precision and modern technology stacks.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: t("nav.about"), href: ROUTES.about },
                { label: t("nav.projects"), href: ROUTES.projects },
                { label: t("nav.experience"), href: ROUTES.experience },
                { label: t("nav.contact"), href: ROUTES.contact },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-neon transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-px bg-white/20 group-hover:w-3 group-hover:bg-neon transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connect */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">Connect</h4>
            <div className="flex flex-col gap-4">
              {socials.map((social) => {
                const Icon = iconMap[social.label] || Mail;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-all group"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:border-neon/30 group-hover:bg-neon/10 transition-all">
                      <Icon size={16} className="text-white/40 group-hover:text-neon" />
                    </div>
                    <span>{social.handle || social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-mono text-white/30 tracking-widest uppercase text-center md:text-left">
            © {currentYear} Fadli | All rights reserved
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 hover:text-neon transition-all group"
          >
            <span>Back to top</span>
            <ArrowUpCircle size={18} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
