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

Key facts already on the site: timeline (AI cohort **Aug 24** · Build **Nov–Dec** · Mars begins **Jan 4** · Mars Electronica **Mar 26–28**); applications are **rolling**; **the real application form is live** as an embedded Tally form on the hidden `/apply` page — see the "Tally forms" section below. Site-header/footer Apply CTAs currently still point to `APPLY_URL` (the Substack placeholder) in `src/data/site.ts`; flip them to `/apply` when ready.

## Project structure

```
src/
  pages/        index.astro, build.astro, learn.astro, thrive.astro,
                mit.astro (Mars Institute of Technology), mff.astro (AI Film Festival),
                apply.astro (hidden — Tally form embed; noindex),
                build1.astro–build4.astro (variant scratch)
  components/    Hero.astro, SiteHeader.astro, SiteFooter.astro, PageHeader.astro,
                 Eyebrow.astro, BuildInquiryForm.astro, RiderField.astro (retired, unused)
  layouts/       BaseLayout.astro  (system fonts — no external font requests)
  data/          site.ts  (APPLY_URL, PILLARS, TIMELINE_MINI, nav, TALLY_APPLY_FORM_ID, etc.)
  styles/        global.css  (the token system — single source of truth)
  assets/        photos/** and brand/**  (imported, optimized via astro:assets)
public/
  video/         mars-aerial.mp4 (1080p), mars-aerial-720.mp4 (mobile), mars-aerial-poster.jpg
```

## Design system (keep the bar — Gene reviewed and approved this direction)

Editorial desert-minimalism, **but big and bold (Y Combinator–scale type)**. Tokens live in `src/styles/global.css` (`@theme` block + `:root`). Consume tokens, never raw values.

- **Fonts** — **system stack** (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) for both display and body; system mono for the tiny mono accents. **No external font requests** — Google Fonts + Bricolage/Hanken/Spline were removed at Gene's request ("standard/readable"). Do not re-introduce webfonts without asking.
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
- **/mit** — **Mars Institute of Technology (MIT)**, the AI school, rebranded from the "AI camp". Emblem-led header (seal at `src/assets/brand/mit-emblem.png`); sections: What MIT is (pillars) → **Eight years of AI studies** (2019–2027 full-bleed justified-masonry gallery, each image opens a lightbox) → Upcoming programs (give/get + "The semester") → **Off-Grid AI Engineering** course (topics, doom quotes, "year is 2033", Takeoff video) → **The gallery** (carousel) → **The Film Festival** (full-bleed banner → /mff) → off-season cohort. The homepage AI section + CTA now point here (was /learn). Derived from /learn but diverged; edit independently.
- **/mff** — **Mars AI Film Festival**. Embeds all four annual festival reels (2023–2026) from the [Mars College YouTube channel](https://www.youtube.com/@MarsCollege-k7t/videos) via `youtube-nocookie`, plus a gallery of past screenings (assets in `src/assets/photos/mff/`). Linked from the Film Festival banner on /mit.
- **/thrive**: desert nomad economics (cost breakdown), micro-businesses/grants, shared amenities.
- **/apply** (hidden): Tally application form embed. `noindex,nofollow`; not in the nav. Reached by direct URL only until Gene decides to promote it. See "Tally forms" below.

> **Nav caveat:** the site header/footer still link **"Learn" → /learn**, not /mit. /mit and /mff are reachable by direct URL and the on-page CTAs only. Wire them into the nav when Gene decides /mit supersedes /learn.

The **"Outsmart AGI"** copy (founder-approved) lives on the home Sovereign-AI section and atop /learn:
> It's a strange time to be human — the whole world is busy announcing our replacement. Mars takes the other side of the bet. We run AI locally, on our own power, by our own hand: local-first, renewable, DIY, self-sovereign. We don't work for the machine — we make it work for us, in service of a human-first life.

## Tally forms (applications & inquiries)

The **2027 application form** is a [Tally.so](https://tally.so) form embedded on the hidden `/apply` page. Edits to the form happen in the Tally dashboard — no code change or redeploy needed for question changes. Submissions collect in Tally's Submissions tab.

### Application form (LIVE)

- **Slug:** `ZjWDVv`
- **Public URL:** https://tally.so/r/ZjWDVv
- **Site page:** `src/pages/apply.astro` — hidden (`noindex,nofollow`, not linked from nav; access by direct URL only)
- **Edit:** https://tally.so/forms/ZjWDVv/edit
- **Submissions / Insights / Integrations / Settings:** https://tally.so/forms/ZjWDVv (tabs at top)
- **Tally account:** `Mars` workspace, created and owned by Gene. Anyone editing needs to be signed in as Gene or added as a member.

**Where the slug lives in code (keep both in sync):**
- `src/pages/apply.astro` — frontmatter constant `TALLY_FORM_ID = "ZjWDVv"`
- `src/data/site.ts` — `export const TALLY_APPLY_FORM_ID = "ZjWDVv"` (mirror; useful if header/footer CTAs get flipped from `APPLY_URL` to `/apply`)

**Embed technique:**
- Tally serves an iframe at `https://tally.so/embed/<slug>?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1` plus a small `https://tally.so/widgets/embed.js` script that expands the iframe height dynamically. Both are in `apply.astro`.
- The `dynamicHeight=1` param + `embed.js` script are what let the iframe grow to fit the form content without a scrollbar. Don't remove them.
- Because it's a third-party iframe, the form's theme lives in the Tally dashboard (Customize panel), not in this repo's CSS.

**Form structure** (as built, June 2026):
- **Page 1** About you: name, email, location, portfolio link (optional).
- **Page 2** Connection to Mars: `Have you been to Mars College before?` (Yes/No) — branches to either (a) which seasons + camp/affiliation or (b) how did you hear.
- **Page 3** Arrival track: `AI-track (Jan 5)` / `Build-track (late Dec)` / `Either` — shown only if returning = No.
- **Page 4** What you're bringing: open text + areas-of-practice multi-select + optional class offering.
- **Page 5** Cinema: favorite movie + willingness to host a screening (see `planning/2027/admissions.md` for the rationale).
- **Page 6** Participation: academic-intent linear scale 1–5 + volunteer preferences multi-select.
- **Page 7** AI program interest: which of the 5 core topics + interest in the online Sep–Dec cohort.
- **Page 8** Anything else → thank-you screen with "Back to mars.college" button.
- Conditional logic: 4 rules (returning=No → how-you-heard, returning=Yes → seasons+camp, returning=No → arrival track, vehicle=Yes → what kind).
- **Theme:** Inter, Light background, accent `#b6442a` (matches `--color-clay`).
- **Known quirk:** the Tally AI put "Are you bringing a vehicle?" on Page 3 (Arrival) rather than Page 6 (Participation) as originally scoped. Leave or move — Gene hasn't decided.

### Build inquiry form (DRAFT — not published)

- **Slug (draft):** `xXgvOk` — see the `TALLY_BUILD_FORM_ID` comment block in `src/data/site.ts`.
- **Edit:** https://tally.so/forms/xXgvOk/edit
- **Status:** needs cleanup + publish. Until then, `TALLY_BUILD_FORM_ID = ""` in `site.ts` and the `/build` page falls back to a "coming soon" panel.
- To go live: publish in Tally → paste the slug into `TALLY_BUILD_FORM_ID` → the `/build` fallback flips to the real embed.

### Common tasks

- **Change a question, add a page, tweak logic** → edit at Tally, save. Embed pulls the live version — no redeploy.
- **Point `/apply` at a different form** → update `TALLY_FORM_ID` in `src/pages/apply.astro` AND `TALLY_APPLY_FORM_ID` in `src/data/site.ts`.
- **See who applied** → Submissions tab at tally.so/forms/ZjWDVv/submissions. Insights tab shows counts and completion funnels.
- **Send email notifications / Slack pings / Google Sheets rows** → Integrations tab.
- **Custom subdomain `forms.mars.college`** → Tally offers this on the Share tab; requires a DNS CNAME. Not set up yet.
- **Delete a form or move to trash** → careful — Tally-side edits are permanent from Gene's account. Do not delete without asking.

## Open / next steps

- Decide **deployment**: this Astro build isn't wired to anything yet; the live domain still serves the old Next repo. Cutover plan is: copy `mars-v2/` contents into `github.com/genekogan/mars.college` repo, commit on a branch, push, redeploy.
- Publish the **Build inquiry form** (Tally slug `xXgvOk`) and populate `TALLY_BUILD_FORM_ID`.
- Flip site-header/footer Apply CTAs from `APPLY_URL` (Substack) → `/apply` when the form is ready to be public.
- **Unicyclists**: retired from the hero (RiderField.astro kept on disk, unused). Gene may want them represented in Activities.
- Old Next site also has additive scratch sections (`components/mars-2027.tsx`, `components/m27/`, `app/2027/`) from earlier iterations — ignore unless asked; this Astro build supersedes them.

## How to work with Gene

He reviews via the live tunnel URL (often on his phone) and iterates fast with short, specific feedback. When you finish a pass: run the dev server, **screenshot every page** (`playwright screenshot --full-page --viewport-size=1440,900 <url> <out.png>` is installed globally), verify no broken images, then send him the (fresh) tunnel URL. He communicates over Discord. Don't leave orphan dev servers/tunnels around — stop ones you start.
