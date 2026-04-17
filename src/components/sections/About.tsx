"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Layers, Server, Network, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export function About() {
  const { t } = useLanguage();

  const highlights = [
    { text: t("about.highlight1"), icon: Layers, color: "from-blue-500 to-indigo-500" },
    { text: t("about.highlight2"), icon: Server, color: "from-purple-500 to-pink-500" },
    { text: t("about.highlight3"), icon: Network, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          <div className="lg:col-span-7">
            <SectionHeader
              tag={t("about.tag")}
              title={t("about.title")}
              highlight={t("about.titleHighlight")}
              description={t("about.body")}
              align="left"
            />

            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-white font-bold mb-2">Security Focused</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Implementing robust security measures and Mikrotik tunneling for secure data transmission.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-white font-bold mb-2">High Performance</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Optimizing web applications for maximum speed and efficient resource utilization.</p>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square w-full max-w-md mx-auto"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-purple-500/20 blur-3xl rounded-full opacity-50 animate-pulse" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 blur-2xl rounded-full" />

              <div className="relative h-full w-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl glass-card p-3">
                <div className="relative h-full w-full rounded-[30px] overflow-hidden">
                  <Image
                    src="/images/profile.jpg"
                    alt="Muhamad Fadli"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              <div className="absolute -right-8 top-1/4 space-y-4">
                {highlights.slice(0, 2).map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.2 }}
                    className="glass-card p-3 rounded-2xl flex items-center gap-3 border border-white/10 shadow-xl"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap">Available for Projects</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
