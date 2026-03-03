"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";

const highlights = [
  "Hands-on with routing, firewalling, and secure network design.",
  "Frontend-focused with experience in SPA/SSR and performance tuning.",
  "Comfortable with DevOps basics: CI/CD, containerization, observability."
];

const highlightsId = [
  "Berpengalaman routing, firewall, dan desain jaringan aman.",
  "Fokus frontend dengan pengalaman SPA/SSR dan optimasi performa.",
  "Nyaman dengan dasar DevOps: CI/CD, containerization, observability."
];

export function About() {
  const { t, lang } = useLanguage();
  const items = lang === "id" ? highlightsId : highlights;

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Grid background */}

      {/* Glow blobs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Header & Text */}
          <div className="lg:w-1/2">
            <div className="mb-10">
              <h2
                className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Who{" "}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-neon to-neon/50">
                  Am I?
                </span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("about.body")}
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="lg:w-1/2 grid gap-6">
            {items.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col gap-6 rounded-2xl pb-6 bg-card/40 backdrop-blur-md border border-white/5 p-6 hover:bg-card/60 transition-all duration-300 hover:border-white/10 hover:-translate-y-1 hover:shadow-glow group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-neon to-accent rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-white/80 leading-relaxed pl-4">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
