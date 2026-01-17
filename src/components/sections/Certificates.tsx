"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";

const certificates = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
    link: "https://aws.amazon.com/certification/"
  },
  {
    title: "Cisco CCNA",
    issuer: "Cisco",
    year: "2022",
    link: "https://www.cisco.com"
  },
  {
    title: "Google Professional Cloud Architect",
    issuer: "Google Cloud",
    year: "2023",
    link: "https://cloud.google.com/certification"
  },
  {
    title: "Scrum Master Certified",
    issuer: "Scrum Study",
    year: "2021",
    link: "https://www.scrumstudy.com"
  }
];

export function Certificates() {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neon">{t("certificates.tag")}</p>
            <h2 className="font-display text-3xl font-semibold text-white">{t("certificates.title")}</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {certificates.map((cert, idx) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="glass group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-accent/40 hover:bg-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                  <p className="text-sm text-white/60">{cert.issuer}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{cert.year}</span>
              </div>
              <p className="mt-3 text-sm text-accent opacity-0 transition group-hover:opacity-100">View credential</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
