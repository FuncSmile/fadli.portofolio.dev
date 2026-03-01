import { getExperiences } from "@/app/actions";
import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "@/lib/schema";

export default async function ExperienceSection() {
    const rawExperiences = await getExperiences();
    const experiences = rawExperiences as unknown as Experience[];

    return (
        <section id="experience" className="py-32 relative overflow-hidden bg-background">
            {/* Grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, hsl(var(--border)/0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--border)/0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Glow blobs */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-4xl relative z-10">
                {/* Header */}
                <div className="mb-20 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                        <span className="text-xs font-semibold tracking-widest text-sky-300 uppercase">
                            05 / Trajectory
                        </span>
                    </div>
                    <h2
                        className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        My{" "}
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                            Experience
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                        A history of building impact, leading the shift, and delivering scale.
                    </p>
                </div>

                {/* Timeline Content */}
                {experiences.length > 0 ? (
                    <ExperienceTimeline experiences={experiences} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-4 border border-white/10 rounded-2xl bg-black/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-20 h-20 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner relative z-10">
                            <svg className="w-10 h-10 text-sky-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white relative z-10">No experiences found</h3>
                        <p className="text-muted-foreground text-center max-w-sm relative z-10">
                            Experiences will appear here once they are added via the admin dashboard.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
