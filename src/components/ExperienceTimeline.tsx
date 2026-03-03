"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/lib/schema";

function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "Present";
    const [year, month] = dateStr.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIdx = parseInt(month, 10) - 1;
    return `${monthNames[monthIdx] || month} ${year}`;
}

function parseDescription(desc: string | null | undefined): string[] {
    if (!desc) return [];
    try {
        const parsed = JSON.parse(desc);
        return Array.isArray(parsed) ? parsed.filter((s: string) => s.trim() !== "") : [];
    } catch {
        return desc.split("\n").filter(s => s.trim() !== "");
    }
}

function parseSkills(skills: string | null | undefined): string[] {
    if (!skills) return [];
    return skills.split(",").map(s => s.trim()).filter(s => s !== "");
}

interface ExperienceTimelineProps {
    experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
    return (
        <div className="relative">
            {/* Vertical Timeline Line */}
            <motion.div
                className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ transformOrigin: "top" }}
            />

            <div className="space-y-12">
                {experiences.map((item, idx) => {
                    const isEven = idx % 2 === 0;
                    const descriptions = parseDescription(item.description);
                    const skills = parseSkills(item.skills);
                    const period = `${formatDate(item.start_date)} — ${formatDate(item.end_date)}`;

                    return (
                        <motion.div
                            key={item.id ?? idx}
                            className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${isEven ? "md:flex-row-reverse" : ""}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.12, duration: 0.6 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 top-0 md:top-6 -translate-x-1/2 flex items-center justify-center">
                                <motion.div
                                    className="w-8 h-8 rounded-full bg-background border border-white/20 flex items-center justify-center z-10"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: [0, 1.2, 1] }}
                                    transition={{ delay: idx * 0.12 + 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                                </motion.div>
                            </div>

                            {/* Period Mobile */}
                            <motion.div
                                className="md:hidden pt-1 pl-10 font-mono text-sm text-sky-400 font-semibold tracking-widest"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.12 + 0.1, duration: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {period}
                            </motion.div>

                            {/* Content Box */}
                            <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isEven ? "md:text-left" : "md:text-right"}`}>
                                <div className={`bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-card/60 hover:border-white/10 transition-all duration-300 shadow-xl relative group ${isEven ? "md:ml-12" : "md:mr-12"}`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Period Desktop */}
                                    <motion.div
                                        className={`hidden md:block absolute top-8 font-mono text-sm tracking-widest text-white/50 ${isEven ? "-left-64 text-right" : "-right-64 text-left"}`}
                                        initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.12 + 0.15, duration: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        {period}
                                    </motion.div>

                                    {/* Role & Company */}
                                    <h3 className="text-2xl font-bold text-white mb-1 relative z-10">{item.role}</h3>
                                    <h4 className="text-lg text-sky-400/90 font-medium mb-1 relative z-10">{item.company}</h4>

                                    {/* Location & Type badges */}
                                    <div className={`flex flex-wrap gap-2 mb-4 relative z-10 ${isEven ? "" : "md:justify-end"}`}>
                                        {item.location && (
                                            <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                                                📍 {item.location}
                                            </span>
                                        )}
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">
                                            {item.type}
                                        </span>
                                    </div>

                                    {/* Description bullets */}
                                    {descriptions.length > 0 && (
                                        <ul className={`space-y-2 mb-4 relative z-10 ${isEven ? "text-left" : "md:text-left"}`}>
                                            {descriptions.map((desc, dIdx) => (
                                                <motion.li
                                                    key={dIdx}
                                                    className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2"
                                                    initial={{ opacity: 0, x: -8 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.12 + 0.3 + dIdx * 0.05, duration: 0.3 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <span className="text-sky-400/60 mt-1.5 shrink-0">▹</span>
                                                    <span>{desc}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Skills */}
                                    {skills.length > 0 && (
                                        <div className={`flex flex-wrap gap-2 relative z-10 ${isEven ? "" : "md:justify-end"}`}>
                                            {skills.map((skill, sIdx) => (
                                                <motion.span
                                                    key={sIdx}
                                                    className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.12 + 0.4 + sIdx * 0.05, duration: 0.3 }}
                                                    viewport={{ once: true }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
