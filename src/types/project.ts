export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  category: "web" | "networking" | "open-source";
};
