"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Experience as ExperienceType } from "@/lib/schema";

const currentYear = new Date().getFullYear();

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
        <ul className="list-disc list-outside ml-4 space-y-1 mt-2">
          {parsed.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      );
    }
  } catch (e) {
    // Ignore JSON parse errors and return as normal string
  }
  return <>{desc}</>;
}

type Props = {
  experiences: ExperienceType[];
};

export function Experience({ experiences = [] }: Props) {
  const { t, lang } = useLanguage();
  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-4xl relative z-10">
        <SectionHeader
          tag="Trajectory"
          tagNumber="05"
          title="My"
          highlight="Experience"
          description="A history of building impact, leading the shift, and delivering scale."
        />

        <div className="relative">
          {/* Vertical Timeline Line */}
          {experiences.length > 0 && (
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2" />
          )}

          <div className="space-y-12">
            {experiences.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id || idx}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 top-0 md:top-6 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-background border border-white/20 flex items-center justify-center z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-neon shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                    </div>
                  </div>

                  {/* Period Mobile */}
                  <div className="md:hidden pt-1 pl-12 font-mono text-sm text-neon font-semibold tracking-widest">
                    {formatPeriod(item.start_date, item.end_date)}
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:text-left`}>
                    <div className={`bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:bg-card/60 hover:border-white/10 hover:-translate-y-1 hover:shadow-glow transition-all duration-300 shadow-xl relative group ${isEven ? 'md:ml-12' : 'md:mr-12'}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Period Desktop */}
                      <div className={`hidden md:block absolute top-8 font-mono text-sm tracking-widest text-white/50 ${isEven ? '-left-56 text-right' : '-right-56 text-left'}`}>
                        {formatPeriod(item.start_date, item.end_date)}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">{item.role}</h3>
                      <h4 className="text-lg text-neon/90 font-medium mb-4">{item.company} • {item.type}</h4>
                      <div className="text-muted-foreground leading-relaxed">
                        {renderDescription(item.description)}
                      </div>
                      {item.skills && (
                        <div className={`mt-4 flex flex-wrap gap-2 justify-start`}>
                          {item.skills.split(',').map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/70">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {experiences.length === 0 && (
              <div className="text-center text-muted-foreground mt-10">
                No experience data provided.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
