import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"]
      },
      colors: {
        background: "#05060a",
        surface: "#0c0f1a",
        accent: "#7c3aed",
        neon: "#22d3ee"
      },
      boxShadow: {
        glow: "0 10px 40px rgba(124, 58, 237, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
