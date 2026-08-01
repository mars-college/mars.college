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

## Remaining wiring (needs BaseLayout / deploy access — not done to avoid
## conflicting with the active site agent)

1. **Verify nothing blocks AI crawlers on deploy (highest priority).**
   - Vercel: confirm the "AI Bot managed ruleset" is OFF and no
     Firewall/Bot-Protection challenge rules hit verified AI bots.
   - If Cloudflare DNS ever fronts the domain (orange cloud): disable "Block AI
     bots" / managed robots.txt in AI Crawl Control, or it silently overrides
     our robots.txt. (Cloudflare blocks AI crawlers by default since July 2025.)
   - Datapoint: theguardian.com blocks Anthropic's crawler and is invisible to
     Claude's web tools — that's what being blocked looks like.
2. **JSON-LD in `BaseLayout.astro`** (site-wide) — ready to paste:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "EducationalOrganization",
     "name": "Mars College",
     "url": "https://mars.college",
     "email": "info@mars.college",
     "foundingDate": "2020",
     "founder": [{"@type": "Person", "name": "Gene Kogan"},
                  {"@type": "Person", "name": "Freeman"}],
     "description": "An annual pop-up, off-grid college town built every winter in the California desert near Bombay Beach on the Salton Sea. No tuition. Classes, art, and off-grid AI engineering, January through March.",
     "location": {"@type": "Place", "name": "Bombay Beach, California",
       "address": {"@type": "PostalAddress", "addressLocality": "Bombay Beach",
         "addressRegion": "CA", "addressCountry": "US"}},
     "sameAs": ["https://marscollege.substack.com",
       "https://www.instagram.com/mars.college",
       "https://x.com/mars_college",
       "https://github.com/mars-college",
       "https://www.youtube.com/@MarsCollege-k7t"]
   }
   </script>
   ```
   Plus `FAQPage` schema on the homepage FAQ section, and an `Event` for
   Mars Electronica (Mar 26–28, 2027) on /mit or the homepage. (/mit and
   /learn already carry Course JSON-LD — dedupe: /learn's competes with /mit's.)
3. **`<link rel="alternate" type="text/markdown" href="/<page>.md">`** in
   BaseLayout for pages that have .md twins (optional, cheap).
4. **Search Console + Bing Webmaster Tools** — register the domain in both once
   the Astro site deploys (ChatGPT search is substantially Bing-backed).
   Optional: wire an IndexNow ping into the Vercel deploy hook.
5. **Sitemap** — already via @astrojs/sitemap; consider adding lastmod.
6. **Off-site (the biggest lever, not a website task):** consistent one-line
   description everywhere (Substack about, IG bio, X bio, GitHub org);
   a Wikipedia article if notability supports it (the Guardian feature +
   Supernuclear case study + Campfire podcast are citable sources); keep press
   links alive on links.md.
