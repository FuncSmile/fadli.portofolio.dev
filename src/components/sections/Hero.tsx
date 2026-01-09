"use client";

import dynamic from "next/dynamic";
import { ROUTES } from "@/constants/routes";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

const HeroCanvas = dynamic(() => import("../three/HeroCanvas").then((mod) => mod.HeroCanvas), { ssr: false });

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-neon">{t("hero.tag")}</p>
          <motion.h1
            className="font-display text-4xl font-bold leading-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("hero.greeting")}
            <span className="block text-neon">{t("hero.role")}</span>
          </motion.h1>
          <motion.p
            className="max-w-xl text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {t("hero.body")}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Button href={ROUTES.projects}>{t("hero.cta.projects")}</Button>
            <Button variant="ghost" href={ROUTES.contact}>
              {t("hero.cta.contact")}
            </Button>
          </motion.div>
          <motion.div
            className="flex gap-6 text-sm text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div>
              <p className="text-2xl font-semibold text-white">5+</p>
              <p>{t("hero.stat.network")}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">15+</p>
              <p>{t("hero.stat.projects")}</p>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          whileHover={{ rotate: -1.5, scale: 1.02 }}
        >
          <HeroCanvas />
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/10 via-transparent to-neon/10" />
        </motion.div>
      </div>
    </section>
  );
}
