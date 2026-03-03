"use client";

import { ROUTES } from "@/constants/routes";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Link } from "lucide-react";

/* ─── Floating particle ──────────────────────────────────────────────────── */
function Particle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-neon/20 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -24, 0], opacity: [0.15, 0.5, 0.15] }}
      transition={{ repeat: Infinity, duration: 4 + delay, delay, ease: "easeInOut" }}
    />
  );
}

/* ─── Scramble text hook ─────────────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
function useScramble(target: string, delay = 0) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    let frame = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(
          target
            .split("")
            .map((char, i) =>
              i < frame ? char : char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
            )
            .join("")
        );
        frame++;
        if (frame > target.length) clearInterval(interval);
      }, 40);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return display;
}

/* ─── Magnetic button wrapper ────────────────────────────────────────────── */
function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </motion.div>
  );
}

/* ─── Main Hero ──────────────────────────────────────────────────────────── */
export function Hero() {
  const { t } = useLanguage();
  const role = useScramble(t("hero.role"), 0.6);

  // Mouse parallax for decorative layers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotY = useTransform(mouseX, [-300, 300], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Deep background ── */}
      <div className="absolute inset-0 bg-[#050507]" />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial glow — neon */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 900,
          height: 900,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, hsl(var(--neon, 160 100% 55%) / 0.12) 0%, transparent 65%)",
          rotateX: rotX,
          rotateY: rotY,
        }}
      />

      {/* Particles */}
      {[
        { x: "12%", y: "22%", size: 5, delay: 0 },
        { x: "80%", y: "15%", size: 3, delay: 1.2 },
        { x: "65%", y: "70%", size: 6, delay: 0.6 },
        { x: "28%", y: "75%", size: 4, delay: 2 },
        { x: "90%", y: "52%", size: 3, delay: 0.3 },
        { x: "45%", y: "10%", size: 4, delay: 1.7 },
      ].map((p, i) => <Particle key={i} {...p} />)}

      {/* ── Decorative large index number ── */}
      <motion.div
        className="absolute right-0 bottom-0 select-none pointer-events-none font-black text-white/[0.025] leading-none"
        style={{ fontSize: "clamp(200px, 35vw, 520px)", lineHeight: 0.85, rotateX: rotX, rotateY: rotY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
      >
        01
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-12 py-32 lg:py-0 lg:min-h-screen flex flex-col justify-center">

        {/* Top label row */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.28em] text-neon uppercase">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            {t("hero.tag")}
          </span>
          <div className="h-px w-16 bg-gradient-to-r from-neon/60 to-transparent" />
          <span className="text-[11px] font-mono text-white/30 tracking-widest">EST. {new Date().getFullYear()}</span>
        </motion.div>

        {/* Main headline — asymmetric, editorial */}
        <div className="relative">
          {/* Stacked greeting */}
          <motion.p
            className="text-white/40 font-light text-lg md:text-xl tracking-[0.15em] uppercase mb-2"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("hero.greeting")}
          </motion.p>

          {/* Big name / role — scramble effect */}
          <motion.h1
            className="font-black leading-[0.9] tracking-tighter text-white"
            style={{
              fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif",
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-neon drop-shadow-[0_0_30px_hsl(var(--neon,160_100%_55%)/0.6)]">
              {role}
            </span>
          </motion.h1>

          {/* Underline accent */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-neon via-neon/60 to-transparent mt-4 mb-8"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Body + stats — two-column on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">

          {/* Left: description */}
          <motion.p
            className="max-w-md text-white/55 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {t("hero.body")}
          </motion.p>

          {/* Right: stats */}
          <motion.div
            className="flex gap-10 lg:ml-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            {[
              { value: "2+", label: t("hero.stat.network") },
              { value: "5+", label: t("hero.stat.projects") },
            ].map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p
                  className="font-black text-white leading-none mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    color: "hsl(var(--neon, 160 100% 55%))",
                    textShadow: "0 0 20px hsl(var(--neon, 160 100% 55%) / 0.5)",
                  }}
                >
                  {value}
                </p>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <MagneticWrap>
            <Button asChild>
              <Link href={ROUTES.projects}>
                {t("hero.cta.projects")}
              </Link>
            </Button>
          </MagneticWrap>
          <MagneticWrap>
            <Button asChild variant="ghost">
              <Link href={ROUTES.contact}>
                {t("hero.cta.contact")}
              </Link>
            </Button>
          </MagneticWrap>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-16 flex items-center gap-3 text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        </motion.div>
      </div>

      {/* ── Side vertical text ── */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 pointer-events-none select-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <p
          className="text-[10px] font-mono text-white/20 tracking-[0.25em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          PORTFOLIO · {new Date().getFullYear()}
        </p>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}