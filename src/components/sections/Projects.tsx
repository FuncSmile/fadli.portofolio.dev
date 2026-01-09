"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import type { GithubRepo } from "@/types/github";
import type { Project } from "@/types/project";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";

type Props = {
  featured: Project[];
  github: GithubRepo[];
};

export function Projects({ featured, github }: Props) {
  const { t } = useLanguage();
  return (
    <section id="projects" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neon">{t("projects.tag")}</p>
            <h2 className="font-display text-3xl font-semibold text-white">{t("projects.title")}</h2>
          </div>
          <Link href="/projects" className="text-sm text-neon hover:underline">
            {t("projects.seeAll")}
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featured.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card title={project.title} description={project.description}>
                <div className="mb-3 flex flex-wrap gap-2 text-xs text-white/60">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full bg-white/10 px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm text-neon">
                  {project.repoUrl ? (
                    <a href={project.repoUrl} className="hover:underline" target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a href={project.liveUrl} className="hover:underline" target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-white">Latest GitHub Repos</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {github.slice(0, 6).map((repo, idx) => (
              <motion.div
                key={repo.id}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.35 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between">
                  <a href={repo.html_url} className="font-semibold text-white hover:underline" target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                  <span className="text-xs uppercase text-white/50">{repo.language ?? "N/A"}</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{repo.description ?? "No description provided."}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
            {github.length === 0 ? <p className="text-white/60">No repositories found. Check API config.</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
