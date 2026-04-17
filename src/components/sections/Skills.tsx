"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Code2, ServerCog, Sparkles, Database, Layout, Cpu, Globe, Rocket } from "lucide-react";

type LangKey = "en" | "id";

const bentoItems = [
  {
    title: { en: "Frontend Mastery", id: "Penguasaan Frontend" },
    icon: Layout,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    className: "lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-500/10 to-indigo-500/5",
    accent: "text-blue-400"
  },
  {
    title: { en: "Backend & DB", id: "Backend & Database" },
    icon: Database,
    items: ["Node.js", "Turso", "PostgreSQL", "Laravel"],
    className: "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-purple-500/10 to-pink-500/5",
    accent: "text-purple-400"
  },
  {
    title: { en: "AI Tools", id: "Alat AI" },
    icon: Sparkles,
    items: ["Cursor", "GPT-4", "Claude", "Gemini"],
    className: "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-amber-500/10 to-orange-500/5",
    accent: "text-amber-400"
  },
  {
    title: { en: "Infrastructure", id: "Infrastruktur" },
    icon: ServerCog,
    items: ["Mikrotik", "Linux", "Docker", "Nginx"],
    className: "lg:col-span-1 lg:row-span-2 bg-gradient-to-br from-emerald-500/10 to-teal-500/5",
    accent: "text-emerald-400"
  },
  {
    title: { en: "Core Ops", id: "Operasi Inti" },
    icon: Cpu,
    items: ["Security", "Networking", "Optimization"],
    className: "lg:col-span-2 lg:row-span-1 bg-gradient-to-br from-rose-500/10 to-red-500/5",
    accent: "text-rose-400"
  }
];

export function Skills() {
  const { t, lang } = useLanguage();
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">

        <SectionHeader
          tag="Expertise"
          title="Technical"
          highlight="Stack"
          description="A comprehensive overview of my technical abilities across the full development lifecycle."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[180px]">
          {bentoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className={`relative p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500 group overflow-hidden ${item.className}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Icon className="w-32 h-32 rotate-12" />
                </div>

                <div className="relative h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-white/5 ${item.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title[lang as LangKey]}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.items.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-white/60 group-hover:text-white/90 group-hover:border-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            className="relative p-8 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all lg:col-span-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-10 h-10 text-muted-foreground mb-4 group-hover:animate-bounce" />
            <p className="text-sm font-medium text-muted-foreground">Always exploring new horizons...</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
