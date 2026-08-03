# mars.college

The website for [Mars College](https://mars.college) — an annual pop-up, off-grid
college town built each winter in the California desert near Bombay Beach.

Astro + Tailwind v4, static output, deployed on Vercel.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output -> ./dist
```

`pnpm build` regenerates `public/llms-full.txt` from the markdown corpus in
`public/` before building — edit those `.md` files, not the concatenation.

Working on this site? Start with **[AGENTS.md](AGENTS.md)** — project structure,
design system, content sources, and the application forms — and
**[AI-LEGIBILITY.md](AI-LEGIBILITY.md)** for the AI-facing corpus and the camp
subdomains.
