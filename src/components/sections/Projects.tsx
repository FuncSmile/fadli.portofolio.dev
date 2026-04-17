"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import type { GithubRepo } from "@/types/github";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/schema";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";

type Props = {
  featured: Project[];
  github: GithubRepo[];
};

export function Projects({ featured, github }: Props) {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
        <SectionHeader
          tag={t("projects.tag")}
          title="Featured"
          highlight="Works"
          description="A curated selection of my finest work, spanning web applications, infrastructure tools, and experimental projects."
        />

        {featured && featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {featured.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-card rounded-3xl mb-32">
            <p className="text-muted-foreground">No featured projects found yet.</p>
          </div>
        )}

        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h3 className="text-3xl font-black text-white mb-2">Open Source</h3>
              <p className="text-muted-foreground">Latest repositories and experiments on GitHub.</p>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-accent hover:underline">
              View All Repositories <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {github && github.slice(0, 6).map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all hover:-translate-y-1 flex flex-col h-full relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-3 h-3" /> {repo.forks_count}</span>
                  </div>
                </div>

                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-lg font-bold text-white group-hover:text-accent transition-colors mb-2 line-clamp-1">
                  {repo.name}
                </a>
                
                <p className="text-sm text-muted-foreground line-clamp-2 flex-grow mb-6">
                  {repo.description ?? "No description provided."}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  {repo.language && (
                    <span className="px-2 py-1 rounded text-[10px] font-bold bg-white/5 text-accent uppercase tracking-wider">{repo.language}</span>
                  )}
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-accent/5 blur-2xl rounded-full group-hover:bg-accent/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
