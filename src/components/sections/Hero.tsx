"use client";

import { ROUTES } from "@/constants/routes";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";

function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 200]);
  const parallaxOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      style={{ opacity: parallaxOpacity }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-accent/20"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-purple-500/10"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 opacity-[0.15]" 
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[12px] font-medium tracking-wider uppercase text-accent-foreground flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {t("hero.tag")}
          </span>
        </motion.div>

        <motion.div
          style={{ y: parallaxY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
            <span className="block text-white">
              {t("hero.greeting")}
            </span>
            <span className="block text-gradient mt-2">
              {t("hero.role")}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-12"
        >
          {t("hero.body")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <MagneticWrap>
            <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold accent-gradient hover:scale-105 transition-transform" asChild>
              <Link href={ROUTES.projects} className="flex items-center gap-2">
                {t("hero.cta.projects")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </MagneticWrap>
          <MagneticWrap>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold border-white/10 hover:bg-white/5 transition-all" asChild>
              <Link href={ROUTES.contact}>
                {t("hero.cta.contact")}
              </Link>
            </Button>
          </MagneticWrap>
        </motion.div>
      </div>

      <div className="absolute left-8 bottom-12 hidden xl:flex flex-col gap-6 items-center">
        <motion.div 
          initial={{ height: 0 }} animate={{ height: 80 }} transition={{ delay: 0.8 }}
          className="w-px bg-gradient-to-t from-accent to-transparent" 
        />
        <Link href="#" className="text-muted-foreground hover:text-accent transition-colors"><Github className="w-5 h-5" /></Link>
        <Link href="#" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
