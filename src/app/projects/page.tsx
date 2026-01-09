import { Projects } from "@/components/sections/Projects";
import { getProjects } from "@/services/project.service";

export default async function ProjectsPage() {
  const { featured, github } = await getProjects();

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="pt-20">
        <Projects featured={featured} github={github} />
      </div>
    </div>
  );
}
