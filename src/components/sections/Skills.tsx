"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";

const skillGroups = [
  {
    title: { en: "Frontend", id: "Frontend" },
    items: [
      { name: { en: "Next.js / React", id: "Next.js / React" }, level: 90 },
      { name: { en: "TypeScript", id: "TypeScript" }, level: 85 },
      { name: { en: "Tailwind CSS", id: "Tailwind CSS" }, level: 88 }
    ]
  },
  {
    title: { en: "Networking", id: "Jaringan" },
    items: [
      { name: { en: "Routing & Switching", id: "Routing & Switching" }, level: 90 },
      { name: { en: "Firewall & Security", id: "Firewall & Security" }, level: 82 },
      { name: { en: "Linux Server", id: "Server Linux" }, level: 86 }
    ]
  },
  {
    title: { en: "DevOps", id: "DevOps" },
    items: [
      { name: { en: "CI/CD", id: "CI/CD" }, level: 75 },
      { name: { en: "Docker", id: "Docker" }, level: 78 },
      { name: { en: "Monitoring", id: "Monitoring" }, level: 70 }
    ]
  }
];

export function Skills() {
  const { t, lang } = useLanguage();
  return (
    <section id="skills" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neon">{t("skills.tag")}</p>
            <h2 className="font-display text-3xl font-semibold text-white">{t("skills.title")}</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title.en}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white">{group.title[lang]}</h3>
              <div className="mt-4 space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.name.en}>
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>{skill.name[lang]}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-accent to-neon"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
