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
  - `mars-2027.md` — Season 8 timeline, four camps, costs, grants
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

The .md corpus is hand-written, not generated. When program facts change
(dates, costs, camps), update the affected .md file(s), then regenerate the
concatenation:

```sh
cd public && {
  echo "# Mars College — Complete Guide for AI Systems"; echo
  echo "> This file concatenates the machine-readable documentation of Mars College (https://mars.college), assembled August 2026. Index: https://mars.college/llms.txt"; echo
  for f in about.md faq.md how-mars-works.md history.md traditions.md mars-2027.md ai.md links.md; do
    echo "---"; echo; cat "$f"; echo
  done
} > llms-full.txt
```

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
- **Sitemap** filter tightened: only the 5 public pages (/, /mit, /mff,
  /toolcamp, /colab); /apply (noindex), /build, /learn (slated for deletion)
  and all drafts excluded.
- **404 page** added (`src/pages/404.astro`, on-brand, noindex).
- Facts corrected on /mit: fifth annual film festival in 2027; first festival
  2023.

## Remaining / external

1. **Verify nothing blocks AI crawlers on deploy (highest priority).**
   - Vercel: confirm the "AI Bot managed ruleset" is OFF and no
     Firewall/Bot-Protection challenge rules hit verified AI bots.
   - If Cloudflare DNS ever fronts the domain (orange cloud): disable "Block AI
     bots" / managed robots.txt in AI Crawl Control, or it silently overrides
     our robots.txt. (Cloudflare blocks AI crawlers by default since July 2025.)
   - Datapoint: theguardian.com blocks Anthropic's crawler and is invisible to
     Claude's web tools — that's what being blocked looks like.
2. **Domain cutover (DNS to Vercel):** add both `mars.college` and
   `www.mars.college` in Vercel Domains with www → apex redirect. All
   canonicals/OG URLs already point at https://mars.college.
3. **Search Console + Bing Webmaster Tools** — register the domain in both once
   the site is live on mars.college (ChatGPT search is substantially
   Bing-backed). Optional: wire an IndexNow ping into the Vercel deploy hook.
4. **`<link rel="alternate" type="text/markdown" href="/<page>.md">`** in
   BaseLayout for pages with .md twins (optional, cheap).
5. **Off-site (the biggest lever, not a website task):** consistent one-line
   description everywhere (Substack about, IG bio, X bio, GitHub org);
   a Wikipedia article if notability supports it (the Guardian feature +
   Supernuclear case study + Campfire podcast are citable sources); keep press
   links alive on links.md.
