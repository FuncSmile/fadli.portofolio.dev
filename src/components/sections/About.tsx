"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Layers, Server, Network } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  const highlights = [
    { text: t("about.highlight1"), icon: Layers },
    { text: t("about.highlight2"), icon: Server },
    { text: t("about.highlight3"), icon: Network },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Header & Text */}
          <div className="lg:pr-10">
            <SectionHeader
              tag={t("about.tag")}
              tagNumber="01"
              title={t("about.title")}
              highlight={t("about.titleHighlight")}
              description={t("about.body")}
              align="left"
            />
          </div>

          {/* Cards */}
          <div className="grid gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-center gap-6 rounded-2xl bg-card/40 backdrop-blur-md border border-white/5 p-6 hover:bg-card/60 transition-all duration-300 hover:border-white/10 hover:-translate-y-1 hover:shadow-glow group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-neon to-accent rounded-l-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-neon/10 transition-colors shrink-0">
                    <Icon className="w-6 h-6 text-neon" />
                  </div>
                  
                  <p className="text-white/80 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
