"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Code2, ServerCog, Sparkles } from "lucide-react";

type LangKey = "en" | "id";

const skillGroups = [
  {
    title: { en: "Fullstack Development", id: "Pengembangan Fullstack" },
    icon: Code2,
    items: [
      { name: "TypeScript / JavaScript", level: 90 },
      { name: "React & Next.js", level: 85 },
      { name: "Vue.js", level: 75 },
      { name: "Node.js", level: 80 },
      { name: "PHP & Laravel", level: 70 }
    ]
  },
  {
    title: { en: "Infrastructure & Tools", id: "Infrastruktur & Alat" },
    icon: ServerCog,
    items: [
      { name: "Routing & Security", level: 85 },
      { name: "Mikrotik Tunneling", level: 85 },
      { name: "Linux Server", level: 80 },
      { name: "Python", level: 75 }
    ]
  },
  {
    title: { en: "AI Pair Programming", id: "Pemrograman Bersama AI" },
    icon: Sparkles,
    items: [
      { name: "Chat GPT", level: 95 },
      { name: "Gemini 3.1 Pro", level: 90 },
      { name: "claude code", level: 85 }
    ]
  }
];

export function Skills() {
  const { t, lang } = useLanguage();
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl relative z-10">

        <SectionHeader
          tag="Abilities"
          tagNumber="02"
          title="Core"
          highlight="Skills"
          description="Technologies and concepts I specialize in across frontend, infrastructure, and operations."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
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

                <div className="relative h-full bg-card/40 backdrop-blur-md rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6 border border-white/5 transition-all group-hover:border-white/10 group-hover:bg-card/60 group-hover:-translate-y-1 group-hover:shadow-glow">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-neon/10 transition-colors shrink-0">
                      <Icon className="w-6 h-6 text-neon" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white/90">
                      {group.title[lang as LangKey]}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col gap-5 mt-2">
                    {group.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between text-sm font-medium text-white/80 mb-2">
                          <span>{skill.name}</span>
                          <span className="font-mono text-neon/90 text-xs">{skill.level}%</span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
