"use client";

import { ROUTES } from "@/constants/routes";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/70" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-neon">{t("hero.tag")}</p>
        <motion.h1
          className="font-display text-4xl font-bold leading-tight text-white md:text-5xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("hero.greeting")}
          <span className="block text-neon">{t("hero.role")}</span>
        </motion.h1>
        <motion.p
          className="max-w-2xl text-lg text-white/70"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {t("hero.body")}
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 14 }}
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
          initial={{ opacity: 0, y: 14 }}
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
    </section>
  );
}
