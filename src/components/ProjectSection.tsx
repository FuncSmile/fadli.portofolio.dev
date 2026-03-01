import { getProjects } from "@/app/actions";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/schema";

export default async function ProjectSection() {
    const rawProjects = await getProjects();
    const projects = rawProjects as unknown as Project[];

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* HEADINGS & TEXT */}
                <div className="text-center mb-16 flex flex-col items-center">

                    {/* Gradient Title */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 pb-2">
                        Featured Works
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A showcase of applications and tools I've built, featuring different tech stacks and responsive designs.
                    </p>
                </div>

                {/* PROJECT GRID */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-4 border border-white/10 rounded-2xl bg-black/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                        {/* EMPTY STATE - Glassmorphism */}
                        {/* Efek kilap saat di-hover pada empty state */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="w-20 h-20 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner relative z-10">
                            <svg className="w-10 h-10 text-cyan-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white relative z-10">No projects found</h3>
                        <p className="text-muted-foreground text-center max-w-sm relative z-10">
                            Projects will appear here once they are added to the database. Check back soon!
                        </p>
                    </div>
                )}
            </div>

            {/* BACKGROUND DECORATIONS (Disempurnakan agar cocok dengan Tema Gelap) */}
            <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </section>
    );
}