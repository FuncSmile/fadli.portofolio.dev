import { envConfig } from "@/config/env";
import type { GithubRepo } from "@/types/github";

const GITHUB_API = "https://api.github.com";

const headers: HeadersInit = envConfig.GITHUB_TOKEN
  ? { Authorization: `Bearer ${envConfig.GITHUB_TOKEN}` }
  : {};

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  if (!envConfig.GITHUB_USERNAME) {
    clearTimeout(timeout);
    return [];
  }

  try {
    const res = await fetch(`${GITHUB_API}/users/${envConfig.GITHUB_USERNAME}/repos?per_page=20&sort=updated`, {
      headers,
      next: { revalidate: 1800 },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      console.warn("GitHub fetch failed", res.status, text);
      return [];
    }

    const data = (await res.json()) as GithubRepo[];
    return data.filter((repo) => !repo.fork && !repo.private);
  } catch (err) {
    console.warn("GitHub fetch error", (err as Error).message);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
