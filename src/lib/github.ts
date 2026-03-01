import { envConfig } from "@/config/env";
import type { GithubRepo } from "@/types/github";

const GITHUB_API = "https://api.github.com";

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(envConfig.GITHUB_TOKEN ? { Authorization: `Bearer ${envConfig.GITHUB_TOKEN}` } : {})
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  if (process.env.GITHUB_FETCH_DISABLED === "1") {
    clearTimeout(timeout);
    return [];
  }

  if (!envConfig.GITHUB_USERNAME) {
    console.error("❌ GITHUB_USERNAME is not defined in envConfig");
    clearTimeout(timeout);
    return [];
  }

  try {
    console.info(`📡 Fetching GitHub repos for user: ${envConfig.GITHUB_USERNAME}...`);
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
