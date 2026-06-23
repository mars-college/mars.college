# Mars College website (v2) — Handoff

You are taking over the **new Mars College website**, a from-scratch rebuild. Read `/Users/gene/Mars/AGENTS.md` first (repo rules: don't crawl `media/`/`discord/`, keep edits scoped). Then read this whole doc before touching anything.

## What this is

A performance-first rebuild of mars.college recruiting the **2027 cohort (Season 8)**. Built fresh in **Astro + Tailwind v4** (static, near-zero JS) — deliberately NOT the old Next.js app.

- **New site (your project):** `/Users/gene/Mars/web/mars-v2`  ← work here
- **Old Next.js site (reference only, do not break):** `/Users/gene/Mars/web/mars.college` — this is the currently-deployed repo (`github.com/genekogan/mars.college`). The new Astro site is not yet wired to deployment.
- **Nothing is committed.** All of mars-v2 is uncommitted working state. Don't commit/push without Gene's go-ahead, and check diffs for secrets first.

## Run it locally

```sh
cd /Users/gene/Mars/web/mars-v2
pnpm install            # node_modules already present; run only if missing
pnpm dev --port 4321    # http://localhost:4321
pnpm build              # static output -> ./dist
pnpm preview            # serve ./dist locally
```
Node 22, pnpm 10. Default dev port is 4321.

## Restore the Cloudflare preview

Quick tunnels are **ephemeral** — every run prints a NEW random `*.trycloudflare.com` URL. There is no persistent named tunnel.

```sh
# 1) make sure the dev server is running (see above), then:
cloudflared tunnel --url http://localhost:4321
# 2) copy the printed https://<random>.trycloudflare.com URL and send it to Gene
# 3) verify: curl -sI https://<random>.trycloudflare.com | head -1   # expect 200
```

IMPORTANT: Astro/Vite blocks unknown hosts (returns 403 over a tunnel). This is already handled — `astro.config.mjs` sets `vite.server.allowedHosts: true`. If you change the config, keep that or the tunnel will 403.

The tunnel only works while BOTH the dev server and `cloudflared` stay running on Gene's laptop. (Current live URL at handoff: `https://minister-settings-applies-chart.trycloudflare.com` — but assume it may be dead and make a fresh one. NOTE: don't `pkill -f cloudflared` to clean up — it kills the live tunnel; target the specific PID instead.)

Optional, if Gene wants a stable URL: set up a *named* Cloudflare tunnel (`cloudflared tunnel create` + DNS route) — not done here.

## Content source (single source of truth for copy)

All site copy comes from the planning space: **`/Users/gene/Mars/planning/2027/`** — `README.md` (index), `timeline.md`, `ai-program.md`, `dpw.md`, `economics.md`, `services.md`, `admissions.md`, `architecture.md`, `website-content.md`, `organization.md`, `agent-olympics.md`, `medical.md`, `open-items.md`. Don't invent program facts; pull from there.

Key facts already on the site: timeline (AI cohort **Aug 24** · Build **Nov–Dec** · Mars begins **Jan 4** · Mars Electronica **Mar 26–28**); applications are **rolling**; all Apply CTAs → `https://marscollege.substack.com/` (no real form yet — "form coming soon").

## Project structure

```
src/
  pages/        index.astro, build.astro, learn.astro, thrive.astro
  components/    Hero.astro, SiteHeader.astro, SiteFooter.astro, PageHeader.astro,
                 Eyebrow.astro, BuildInquiryForm.astro, RiderField.astro (retired, unused)
  layouts/       BaseLayout.astro  (fonts loaded here via Google Fonts <link>)
  data/          site.ts  (APPLY_URL, PILLARS, TIMELINE_MINI, nav, etc.)
  styles/        global.css  (the token system — single source of truth)
  assets/        photos/** and brand/**  (imported, optimized via astro:assets)
public/
  video/         mars-aerial.mp4 (1080p), mars-aerial-720.mp4 (mobile), mars-aerial-poster.jpg
```

## Design system (keep the bar — Gene reviewed and approved this direction)

Editorial desert-minimalism, **but big and bold (Y Combinator–scale type)**. Tokens live in `src/styles/global.css` (`@theme` block + `:root`). Consume tokens, never raw values.

- **Fonts** (loaded in `BaseLayout.astro` via one Google Fonts stylesheet):
  - Display: **Bricolage Grotesque** (weights 600/700/800) — headings, weight 800.
  - Body: **Hanken Grotesk** (400/500/700), base **1.25rem** / line-height ~1.58.
  - Mono: **Spline Sans Mono** — TINY accent only (timeline dates, a few numerals). Do NOT spread mono onto buttons/links/labels.
  - **No serif.** (Fraunces was removed — Gene rejected it.)
- **Color:** warm bone paper `--color-paper`, warm ink, a single rust/clay accent `--color-clay`. Dark sections invert via `.is-night`.
- Hairline 1px rules over shadows; radius ~0–2px; motion fast (<200ms) and respects `prefers-reduced-motion`; visible focus rings; AA contrast.

### Founder feedback already applied (don't regress these)
1. Type must be **big and bold** — minimalist ≠ tiny. YC is the scale/boldness reference (not their orange).
2. **No serif** display font.
3. **Less "typewritery"** — minimal monospace.
4. Hero is an **aerial Mars video** (not the unicyclists).

## The hero video (how to reproduce/replace)

`src/components/Hero.astro` renders a full-bleed muted autoplay loop with a poster for instant LCP and reduced-motion fallback (poster only). Files in `public/video/`.

Source clip: `/Users/gene/Mars/media/drone/2021/flythrough_2.16.2021-74D4C.mp4` (golden-hour flythrough over the giant "MARS" letters). It was cut/optimized with ffmpeg:
```sh
V="/Users/gene/Mars/media/drone/2021/flythrough_2.16.2021-74D4C.mp4"
ffmpeg -y -ss 5 -t 17 -i "$V" -an -vf "scale=1920:-2,format=yuv420p" -c:v libx264 -profile:v high -crf 30 -preset slow -movflags +faststart public/video/mars-aerial.mp4
ffmpeg -y -ss 5 -t 17 -i "$V" -an -vf "scale=1280:-2,format=yuv420p" -c:v libx264 -profile:v high -crf 31 -preset slow -movflags +faststart public/video/mars-aerial-720.mp4
ffmpeg -y -ss 5 -i "$V" -frames:v 1 -vf "scale=1920:-2" -q:v 4 public/video/mars-aerial-poster.jpg
```
To swap footage: find a better aerial via the media tools (`cd /Users/gene/Mars; python3 tools/media/build_media_index.py search "..." --type video`), re-run the ffmpeg cuts, keep filenames.

## Images

In `src/assets/photos/**` (and `brand/**`), copied from the old repo's curated set `Mars/web/mars.college/public/images/alt-2027/**` (biased 2024–26). To add more: pull from the media archive with `tools/media/build_media_index.py search`/`contact-sheet`, optimize with `sips -s format jpeg -Z 2000`, drop into `src/assets/photos/`, import in the page.

## Pages

- **/** home: aerial hero + timeline strip → "What is Mars College" intro → Build/Learn/Thrive pillars → **Outsmart AGI** (Sovereign AI) → Activities mosaic → Mars 2027 apply.
- **/build**: DPW (rents all materials: Structure/Power/Water/Camp gear), concessions, build schedule, crew perks, build photos, **inquiry form** (`BuildInquiryForm.astro` — client-side, opens prefilled `mailto:info@mars.college`; no backend).
- **/learn**: headed by **"Outsmart AGI"**, the 5 core AI topics, remote-work/vanlife, AI Department.
- **/thrive**: desert nomad economics (cost breakdown), micro-businesses/grants, shared amenities.

The **"Outsmart AGI"** copy (founder-approved) lives on the home Sovereign-AI section and atop /learn:
> It's a strange time to be human — the whole world is busy announcing our replacement. Mars takes the other side of the bet. We run AI locally, on our own power, by our own hand: local-first, renewable, DIY, self-sovereign. We don't work for the machine — we make it work for us, in service of a human-first life.

## Open / next steps

- **Preload the Bricolage 800 woff2** (`<link rel="preload" as="font" crossorigin>`) so the LCP hero headline paints in-brand on first frame (currently swaps from fallback). Biggest remaining polish.
- Real **2027 application form** (CTAs are placeholder → Substack).
- Decide **deployment**: this Astro build isn't wired to anything yet; the live domain still serves the old Next repo.
- **Unicyclists**: retired from the hero (RiderField.astro kept on disk, unused). Gene may want them represented in Activities.
- Old Next site also has additive scratch sections (`components/mars-2027.tsx`, `components/m27/`, `app/2027/`) from earlier iterations — ignore unless asked; this Astro build supersedes them.

## How to work with Gene

He reviews via the live tunnel URL (often on his phone) and iterates fast with short, specific feedback. When you finish a pass: run the dev server, **screenshot every page** (`playwright screenshot --full-page --viewport-size=1440,900 <url> <out.png>` is installed globally), verify no broken images, then send him the (fresh) tunnel URL. He communicates over Discord. Don't leave orphan dev servers/tunnels around — stop ones you start.
