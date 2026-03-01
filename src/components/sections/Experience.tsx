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
  {
    role: { en: "IT Support", id: "IT Support" },
    company: {
      en: "PT. Alfatih Cyber Solution",
      id: "PT. Alfatih Cyber Solution",
    },
    period: "2022 — 2023",
    summary: {
      en: "Provide technical support for hardware, software, and network issues.",
      id: "Memberikan dukungan teknis untuk masalah perangkat keras, perangkat lunak, dan jaringan.",
    },
  },
];

export function Experience() {
  const { t, lang } = useLanguage();
  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-background">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)/0.3) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)/0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-4xl relative z-10">

        {/* Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-sky-300 uppercase">
              05 / Trajectory
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            My{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              Experience
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            A history of building impact, leading the shift, and delivering scale.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.role.en}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-6 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-background border border-white/20 flex items-center justify-center z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                    </div>
                  </div>

                  {/* Period Mobile */}
                  <div className="md:hidden pt-1 pl-10 font-mono text-sm text-sky-400 font-semibold tracking-widest">
                    {item.period}
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-card/60 hover:border-white/10 transition-all duration-300 shadow-xl relative group ${isEven ? 'md:ml-12' : 'md:mr-12'}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Period Desktop */}
                      <div className={`hidden md:block absolute top-8 font-mono text-sm tracking-widest text-white/50 ${isEven ? '-left-52 text-right' : '-right-52 text-left'}`}>
                        {item.period}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">{item.role[lang]}</h3>
                      <h4 className="text-lg text-sky-400/90 font-medium mb-4">{item.company[lang]}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.summary[lang]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section >
  );
}
