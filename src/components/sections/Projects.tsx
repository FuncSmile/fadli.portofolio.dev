"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import type { GithubRepo } from "@/types/github";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/schema";

type Props = {
  featured: Project[];
  github: GithubRepo[];
};

export function Projects({ featured, github }: Props) {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-6xl">
        <SectionHeader
          tag={t("projects.tag")}
          tagNumber="03"
          title="Featured"
          highlight="Works"
          description="A showcase of applications and tools I've built, featuring different tech stacks and responsive designs."
        />

        {/* PROJECT GRID */}
        {featured && featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
            {featured.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 border border-white/5 rounded-2xl bg-card/40 backdrop-blur-md shadow-lg relative overflow-hidden group mb-20 hover:border-white/10 transition-all">
            <div className="w-20 h-20 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner relative z-10">
              <span className="text-neon/70 text-3xl">📭</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white relative z-10">No projects found</h3>
            <p className="text-muted-foreground text-center max-w-sm relative z-10">
              Projects will appear here once they are added to the database. Check back soon!
            </p>
          </div>
        )}

        {/* GITHUB REPOS */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 inline-block">Latest GitHub Repos</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {github && github.slice(0, 6).map((repo, idx) => (
              <motion.div
                key={repo.id}
                className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-white/10 hover:shadow-glow flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-3">
                  <a href={repo.html_url} className="font-semibold text-lg text-white hover:text-neon transition-colors line-clamp-1" target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-grow">{repo.description ?? "No description provided."}</p>
                <div className="mt-6 flex items-center gap-4 text-xs font-mono text-white/50">
                  <span className="flex items-center gap-1">⭐ {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1">🍴 {repo.forks_count}</span>
                  {repo.language && (
                    <span className="px-2 py-0.5 rounded-sm bg-white/5 ml-auto text-neon/70">{repo.language}</span>
                  )}
                </div>
              </motion.div>
            ))}
            {(!github || github.length === 0) && (
              <p className="text-muted-foreground italic col-span-full">No repositories found. Check API config.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
