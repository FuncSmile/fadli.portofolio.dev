export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  fork?: boolean;
  private?: boolean;
  topics?: string[];
  updated_at: string;
  language: string | null;
};
