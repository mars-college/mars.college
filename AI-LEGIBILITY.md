# AI legibility initiative (August 2026)

Goal: make mars.college maximally legible to AI systems — training crawlers
(GPTBot, ClaudeBot, CCBot) and inference-time agents (ChatGPT search, Claude,
Perplexity) — so that AI answers about Mars College are accurate, rich, and
flattering. Research summary: as of Aug 2026, the evidence-backed levers are
(1) not being blocked, (2) plain dated facts in static HTML, (3) llms.txt +
markdown twins for agents (cheap, speculative upside), (4) schema.org JSON-LD,
(5) off-site mentions — which matter more than anything on the site itself.
Notably: llms.txt has weak consumption evidence (Ahrefs May 2026: 97% of files
get zero requests; Google says it won't use it) but agents like Claude Code DO
fetch .md and send `Accept: text/markdown`, and the cost here is near zero.

## What's in place (all additive, in `public/`)

- `public/llms.txt` — spec-format index (llmstxt.org): one-paragraph summary +
  links to the .md corpus and HTML pages.
- `public/llms-full.txt` — the whole corpus concatenated (~5k words).
- The .md corpus, served at the site root (e.g. https://mars.college/about.md):
  - `about.md` — what Mars is, quick facts, distinctives
  - `faq.md` — extractable Q&A (cost, dates, joining, remote work, weather…)
  - `how-mars-works.md` — camps, DPW, Treasury, governance, costs, norms
  - `history.md` — 2019–2026 season-by-season arc (public-safe)
  - `traditions.md` — glossary: Thunder Talks, Chiba, Mars Electronica…
  - `mars-2027.md` — Season 8 timeline, five camps, costs, grants
  - `ai.md` — MIT, Off-Grid AI Engineering, online cohort, Eden, film festival
  - `links.md` — socials, projects, press
- `public/robots.txt` — explicit AI welcome + Cloudflare Content Signals opt-in
  (`Content-Signal: search=yes, ai-input=yes, ai-train=yes`).

Content sources: `planning/2027/` (facts), `src/data/site.ts` + live page copy
(public voice), `docs/discord/themes/` (history, public-safe only),
`docs/substack/`. Nothing private: no roster/contact data, no internal treasury
figures, no non-public names (only Gene, Freeman, Vanessa Rosa — all publicly
associated).

## Maintenance

The eight .md files are hand-written; **`llms-full.txt` is generated** by
`scripts/gen-llms-full.mjs`, which runs as the first step of `pnpm build`. So:
edit the .md files, never `llms-full.txt` — the build regenerates it and any
manual edit is overwritten. (It silently drifted once before the generator
existed, which is why this is now wired into the build rather than documented
as a command to remember.)

Facts live in `planning/2027/`; when they change there, update the affected .md
file(s) and `src/data/site.ts` together, then build.

## SEO wiring completed Aug 1, 2026

- **JSON-LD**: site-wide `EducationalOrganization` in BaseLayout enriched with
  foundingDate, founders, email, address, logo (`/mars-logo.png`, 600px), and
  full `sameAs` (Substack/IG/X/GitHub/YouTube). `FAQPage` schema on the
  homepage (mirrors HOME_FAQ). `Course` schema already on /mit.
- **Embed cards**: new default OG image (golden-hour aerial with MARS letters,
  1200×630, cropped from the hero-video poster; old build-shot backed up in
  session scratchpad). Per-page cards: `/og-mit.jpg` (seal on paper),
  `/og-mff.jpg` (night screening). `og:image:alt`/`twitter:image:alt` added.
- **Homepage `<title>`** now leads with "Mars College".
- **Sitemap** filter: the public pages only — currently /, /mit, /mff, /dec,
  /colab. Excluded: /apply (noindex), /build, and /mit-court.
- **404 page** added (`src/pages/404.astro`, on-brand, noindex).
- Facts corrected on /mit: fifth annual film festival in 2027; first festival
  2023.

**Verified on the live site:** Vercel Firewall shows Bot Protection **off** and
AI Bots **Allow**, with no custom rules — checked Aug 1, 2026. Keep it that way.

## Subdomains (added Aug 1–2, 2026)

Each camp runs its own site; DNS for all of them is A → `76.76.21.21` (Vercel)
in DigitalOcean, with a one-file Vercel proxy project per host in `web/`:

| Host | Proxy project | Serves |
|---|---|---|
| `dpw.mars.college` | `web/dpw-proxy` | Freeman's site at `server.slablife.org/dpw.mars.college/` |
| `dec.mars.college` | `web/dec-proxy` | `thedec.lovable.app` |
| `colab.mars.college` | `web/colab-proxy` | `marscommunitylab.lovable.app` |
| `mit.mars.college` | `web/mit-proxy` | this build's `/mit-court` (experimental, noindex) |

The proxies exist because those origins can't serve TLS for a mars.college
hostname. They are **not in version control** (only `mars-v2` is a git repo) —
each is two files deployed with `vercel deploy --prod`.

Two AI-legibility caveats worth knowing:

- `mit.mars.college` serves the volleyball easter egg, **not** the MIT school
  page (that's `mars.college/mit`). It's `noindex`, so search engines won't
  confuse them, but an agent guessing the subdomain from the camp pattern will
  land on the wrong page.
- `mars.college/dec` and `mars.college/colab` still exist as indexable pages
  duplicating the camps' own subdomain sites, and are in the sitemap. The AI
  corpus points at the subdomains. See "Remaining" below.

## Remaining / external

0. **Decide the canonical home for DEC and Co Lab.** Right now each camp has two
   live pages: the in-repo `mars.college/dec` + `/colab` (in the sitemap, not
   linked from anywhere) and the camp's own subdomain (what the nav cards and
   the AI corpus point at). Pick one per camp, then either 301 the loser like
   `/toolcamp` already does, or drop it from the sitemap. Until then both
   compete for the same search/answer-engine result.
1. **Search Console + Bing Webmaster Tools** — register mars.college in both and
   submit the sitemap (ChatGPT search is substantially Bing-backed). Optional:
   wire an IndexNow ping into the Vercel deploy hook.
2. **`<link rel="alternate" type="text/markdown" href="/<page>.md">`** in
   BaseLayout for pages with .md twins (optional, cheap).
3. **If Cloudflare DNS is ever put in front of the domain** (it isn't today —
   DigitalOcean holds the zone, Vercel serves): disable "Block AI bots" /
   managed robots.txt in AI Crawl Control, or it silently overrides our
   robots.txt. Cloudflare has blocked AI crawlers by default since July 2025.
   Datapoint: theguardian.com blocks Anthropic's crawler and is invisible to
   Claude's web tools — that's what being blocked looks like.
4. **Off-site (the biggest lever, not a website task):** consistent one-line
   description everywhere (Substack about, IG bio, X bio, GitHub org);
   a Wikipedia article if notability supports it (the Guardian feature +
   Supernuclear case study + Campfire podcast are citable sources); keep press
   links alive on links.md.
