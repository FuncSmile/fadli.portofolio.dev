"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";

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
    <section id="about" className="py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 lg:flex-row">
        <div className="lg:w-1/3">
          <p className="text-sm uppercase tracking-[0.3em] text-neon">{t("about.tag")}</p>
          <h2 className="font-display text-3xl font-semibold text-white">{t("about.title")}</h2>
          <p className="mt-4 text-white/70">{t("about.body")}</p>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card title="">
                <p className="text-white/80">{item}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
