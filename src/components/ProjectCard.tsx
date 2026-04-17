"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/schema";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    const techStacks = project.tech_stack ? project.tech_stack.split(/[,+]/).map((t) => t.trim()).filter(Boolean) : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group h-full"
        >
            <div className="relative h-full flex flex-col glass-card rounded-3xl overflow-hidden group-hover:-translate-y-2 transition-all duration-500">
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Floating Tech Badges on Image */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {techStacks.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                        {project.description}
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                        {project.deploy_url && (
                            <Button size="sm" className="rounded-full px-5 bg-white text-black hover:bg-white/90 font-bold" asChild>
                                <a href={project.deploy_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    Live View
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </Button>
                        )}
                        <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                            </a>
                        </Button>
                    </div>
                </div>
                
                {/* Decorative border glow */}
                <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-accent/30 transition-colors pointer-events-none" />
            </div>
        </motion.div>
    );
}
