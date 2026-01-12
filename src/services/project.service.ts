import { fetchGithubRepos } from "@/lib/github";
import type { Project } from "@/types/project";

const featuredProjects: Project[] = [
  {
    slug: "network-monitor",
    title: "Network Monitor Dashboard",
    description: "Real-time monitoring with alerting and traffic visualization for on-prem routers.",
    tech: ["Next.js", "TypeScript", "Tailwind", "WebSocket"],
    category: "networking",
    repoUrl: "https://github.com/",
    liveUrl: "#"
  },
  {
    slug: "portfolio-3d",
    title: "3D Portfolio Experience",
    description: "Immersive hero scene built with React Three Fiber and motion design.",
    tech: ["Next.js", "R3F", "Framer Motion"],
    category: "web",
    repoUrl: "https://github.com/",
    liveUrl: "#"
  }
];

export async function getProjects() {
  const githubRepos = await fetchGithubRepos().catch(() => []);
  const githubFallback =
    githubRepos.length === 0
      ? [
          {
            id: 0,
            name: "GitHub API unavailable",
            description: "Check GITHUB_USERNAME/TOKEN or rate limits.",
            html_url: "https://github.com",
            homepage: null,
            stargazers_count: 0,
            forks_count: 0,
            topics: [],
            updated_at: new Date().toISOString(),
            language: "N/A"
          }
        ]
      : githubRepos;
  return {
    featured: featuredProjects,
    github: githubFallback
  };
}
