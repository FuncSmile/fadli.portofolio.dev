import { Card } from "@/components/ui/Card";
import { getProjects } from "@/services/project.service";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default async function ProjectDetailPage({ params }: Props) {
  const { featured } = await getProjects();
  const project = featured.find((item) => item.slug === params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="font-display text-4xl font-bold text-white">{project.title}</h1>
      <p className="text-white/70">{project.description}</p>
      <Card title="Tech Stack">
        <div className="flex flex-wrap gap-2 text-sm text-white/70">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-white/10 px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
