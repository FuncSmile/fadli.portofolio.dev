import { getProjects } from "@/services/project.service";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { featured } = await getProjects();
  const project = featured.find((item) => item.slug === slug);
  if (!project) {
    return notFound();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="font-display text-4xl font-bold text-white">{project.title}</h1>
      <p className="text-white/70">{project.description}</p>
      <div className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-glow">
        <div className="mb-2 text-lg font-semibold text-white">Tech Stack</div>
        <div className="flex flex-wrap gap-2 text-sm text-white/70">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-white/10 px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
