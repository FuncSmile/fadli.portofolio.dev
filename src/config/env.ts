import { z } from "zod";

const envSchema = z.object({
  GITHUB_USERNAME: z.string().min(1, "GITHUB_USERNAME is required"),
  GITHUB_TOKEN: z.string().optional()
});

const env = envSchema.safeParse({
  GITHUB_USERNAME: process.env.GITHUB_USERNAME,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN
});

if (!env.success) {
  console.warn("⚠️ Environment variables are missing or invalid:", env.error.flatten().fieldErrors);
}

export const envConfig = env.success
  ? env.data
  : {
      GITHUB_USERNAME: process.env.GITHUB_USERNAME ?? "",
      GITHUB_TOKEN: process.env.GITHUB_TOKEN
    };
