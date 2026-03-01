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
    <section id="skills" className="py-32 relative overflow-hidden">
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
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-neon/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl relative z-10">

        {/* Header */}
        <div className="mb-20">
          <h2
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Core{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/50">
              Skills
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            Technologies and concepts I specialize in across frontend, infrastructure, and operations.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title.en}
              className="relative p-[1px] rounded-3xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-accent/40 group-hover:to-neon/40 transition-colors duration-500" />

              <div className="relative h-full bg-card/60 backdrop-blur-xl rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6">
                <h3 className="text-2xl font-bold tracking-tight text-white/90">{group.title[lang]}</h3>
                <div className="space-y-6">
                  {group.items.map((skill) => (
                    <div key={skill.name.en}>
                      <div className="flex items-center justify-between text-sm font-medium text-white/70 mb-2">
                        <span>{skill.name[lang]}</span>
                        <span className="font-mono text-neon">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-neon shadow-[0_0_10px_hsl(var(--neon)/0.5)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
