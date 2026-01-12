import { fetchGithubRepos } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repos = await fetchGithubRepos().catch(() => []);
    return NextResponse.json({ success: true, data: repos });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to fetch GitHub repos" }, { status: 500 });
  }
}
