"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";

const experience = [
  {
    role: { en: "FullStack Web", id: "Fullstack Web" },
    company: {
      en: "PT Rahmah Group International",
      id: "PT Rahmah Grup Internasional",
    },
    period: "2024 — 2025",
    summary: {
      en: "Developed and maintained internal tools and client websites using modern web technologies.",
      id: "Mengembangkan dan memelihara alat internal serta situs web klien menggunakan teknologi web modern.",
    },
  },
  {
    role: { en: "Web Developer", id: "Web Developer" },
    company: {
      en: "PT Mastah Digital Teknologi",
      id: "PT Mastah Digital Teknologi",
    },
    period: "2025 — 2026",
    summary: {
      en: "Developed Web Apps CBT, and LMS platforms focusing on performance and accessibility.",
      id: "Mengembangkan platform Web Apps CBT dan LMS dengan fokus pada kinerja dan aksesibilitas.",
    },
  },
  {
    role: { en: "programmer", id: "programmer" },
    company: {
      en: "My Team (Centrova)",
      id: "Tim Saya (Centrova)",
    },
    period: "2024 — 2026",
    summary: {
      en: "Developed Web Apps platform, helping digitize SMEs/mid-sized companies.",
      id: "Mengembangkan platform Web Apps, Membantu mendigitalkan UKM/perusahaan menengah.",
    },
  },
];

export function Experience() {
  const { t, lang } = useLanguage();
  return (
    <section id="experience" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-neon">
          {t("experience.tag")}
        </p>
        <h2 className="font-display text-3xl font-semibold text-white">
          {t("experience.title")}
        </h2>
        <div className="mt-8 space-y-6 border-l border-white/10 pl-6">
          {experience.map((item, idx) => (
            <motion.div
              key={item.role.en}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="absolute -left-[30px] top-2 h-3 w-3 rounded-full bg-accent shadow-glow" />
              <p className="text-sm text-white/60">{item.period}</p>
              <h3 className="text-xl font-semibold text-white">
                {item.role[lang]} — {item.company[lang]}
              </h3>
              <p className="mt-2 text-white/70">{item.summary[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
