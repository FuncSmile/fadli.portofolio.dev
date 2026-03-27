import { Projects } from "@/components/sections/Projects";
import { getProjects as getDbProjects } from "@/app/actions";
import { fetchGithubRepos } from "@/lib/github";
import type { Project } from "@/lib/schema";

export default async function ProjectsPage() {
  const rawProjects = await getDbProjects();
  const dbProjects = rawProjects as unknown as Project[];
  const githubRepos = await fetchGithubRepos().catch(() => []);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="pt-20">
        <Projects featured={dbProjects} github={githubRepos} />
      </div>
    </div>
  );
}
