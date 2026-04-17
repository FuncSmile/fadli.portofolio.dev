"use client";

import { socials } from "@/constants/socials";
import { ROUTES } from "@/constants/routes";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpCircle, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";

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
    <footer className="relative mt-32 bg-zinc-950 border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-black text-white text-xl group-hover:rotate-12 transition-transform">
                F
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">
                Fadli<span className="text-accent">.</span>dev
              </span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-light">
              Crafting digital experiences that combine technical precision with elegant design. Specialized in full-stack development and robust infrastructure.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => {
                const Icon = iconMap[social.label] || Mail;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -4 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-accent/50 transition-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: t("nav.about"), href: ROUTES.about },
                { label: t("nav.projects"), href: ROUTES.projects },
                { label: t("nav.experience"), href: ROUTES.experience },
                { label: t("nav.certificates"), href: ROUTES.certificates },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-accent group-hover:w-4 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status/Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-8">Current Status</h4>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-bold text-white uppercase tracking-wider">Available for new projects</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have a project in mind? Let&apos;s build something extraordinary together.
              </p>
              <Link href={ROUTES.contact} className="block w-full py-3 rounded-xl bg-white text-black text-center text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
              © {currentYear} Fadli · Crafted with precision
            </p>
            <p className="flex items-center gap-1.5 text-[10px] text-white/20 uppercase tracking-widest font-bold">
              Built with Next.js & Framer Motion <Heart className="w-2.5 h-2.5 text-accent" />
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-accent transition-all"
          >
            <ArrowUpCircle size={24} className="group-hover:-translate-y-2 transition-transform duration-500" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
    </footer>
  );
}
