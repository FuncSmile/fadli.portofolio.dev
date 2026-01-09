# Portfolio (Next.js + 3D)

Modern portfolio with 3D hero, GitHub integration, and dark aesthetic per `techsepc.md`.

## Getting Started

```bash
npm install
npm run dev
```

## Environment

Create `.env.local`:

```
GITHUB_USERNAME=your_username
# Optional to avoid rate limiting:
GITHUB_TOKEN=ghp_xxx
```

## Structure

- `src/app` — App Router pages, API routes (`/api/github`, `/api/contact`)
- `src/components` — UI, layout, sections, 3D canvas
- `src/services` — data layer (GitHub projects, contact)
- `src/lib` — shared utilities (GitHub fetcher)
- `src/config` — env + site metadata
- `src/constants` — routes/social links

## Notes

- 3D scene uses React Three Fiber (`HeroCanvas`) with lazy Canvas.
- Contact API currently logs payload; plug in mail provider as needed.
- Styling uses Tailwind with neon accent + glassmorphism background.
