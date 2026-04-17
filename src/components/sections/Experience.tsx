"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Experience as ExperienceType } from "@/lib/schema";
import { Briefcase, Calendar } from "lucide-react";

function formatPeriod(startYearStr: string, endYearStr?: string | null): string {
  const startYear = new Date(startYearStr).getFullYear();
  if (!endYearStr) return `${startYear} — Present`;
  const endYear = new Date(endYearStr).getFullYear();
  return `${startYear} — ${endYear}`;
}

function renderDescription(desc?: string) {
  if (!desc || desc === "[]") return null;
  try {
    const parsed = JSON.parse(desc);
    if (Array.isArray(parsed)) {
      return (
        <ul className="space-y-3 mt-4">
          {parsed.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      );
    }
  } catch (e) {}
  return <p className="text-sm text-muted-foreground leading-relaxed mt-4">{desc}</p>;
}

type Props = {
  experiences: ExperienceType[];
};

export function Experience({ experiences = [] }: Props) {
  const { t } = useLanguage();
  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12 w-full max-w-5xl relative z-10">
        <SectionHeader
          tag="Career"
          title="Professional"
          highlight="Path"
          description="A chronological journey through my professional milestones and growth."
        />

        <div className="relative mt-20">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent hidden md:block" />

          <div className="space-y-16">
            {experiences.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative md:pl-20 group"
              >
                <div className="absolute left-0 top-0 md:left-4 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/30 transition-all z-10">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>

                <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-white">{item.role}</h3>
                      <p className="text-accent font-bold tracking-wide uppercase text-xs mt-1">
                        {item.company} • {item.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono font-bold text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatPeriod(item.start_date, item.end_date)}
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    {renderDescription(item.description)}
                  </div>

                  {item.skills && (
                    <div className="mt-8 flex flex-wrap gap-2">
                      {item.skills.split(',').map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 uppercase tracking-wider">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-accent/10 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
