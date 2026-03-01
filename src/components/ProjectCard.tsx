"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ProjectCard3DBackground from "./ProjectCard3DBackground";
import type { Project } from "@/lib/schema";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    const techStacks = project.tech_stack ? project.tech_stack.split(/[,+]/).map((t) => t.trim()).filter(Boolean) : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="h-full relative group"
        >
            <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                <ProjectCard3DBackground techStack={project.tech_stack} />
            </div>

            <Card className="h-full flex flex-col bg-background/70 backdrop-blur-md border-white/10 dark:border-white/5 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_var(--color-primary)] relative z-10 overflow-hidden">
                <div className="relative w-full h-56 overflow-hidden">
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-80" />
                </div>
                <CardHeader className="relative -mt-16 bg-gradient-to-t from-transparent via-background/60 to-background/5 pb-2">
                    <CardTitle className="text-xl md:text-2xl font-bold tracking-tight line-clamp-1">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {techStacks.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-secondary/70 backdrop-blur-md shadow-sm">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="flex-grow pt-2">
                    <CardDescription className="line-clamp-3 text-foreground/80 text-base leading-relaxed">
                        {project.description}
                    </CardDescription>
                </CardContent>
                {project.deploy_url && (
                    <CardFooter className="pt-0 flex gap-4">
                        <Button asChild variant="default" size="sm" className="gap-2 w-fit">
                            <a href={project.deploy_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                                Visit Project
                            </a>
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </motion.div>
    );
}
