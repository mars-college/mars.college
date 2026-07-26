// ============================================================
// AGENT LAB — Fall 2026 online cohort
// Single source of truth for /agentlab and the /agentlab1–4 candidates.
//
// "Agent Lab" is the program name (deliberately generic, good for
// cross-posting to outside communities). "Off-Grid AI" is the moniker /
// tagline — the Mars-native lineage this program comes out of. The two
// terms will be calibrated over time; keep them as separate fields here.
//
// This is the AI cohort spun off from the "Off-Grid AI" column on /learn.
// Edit copy, dates, and pricing HERE — every candidate page reads from it.
// ============================================================

import type { ImageMetadata } from "astro";

// Hero + section imagery (centralized so all candidates stay in sync).
import heroImg from "../assets/photos/learn/004_2026_p1012535_96a9e.JPG";
import imgArt from "../assets/photos/learn/supp_marscollege_marzipan-aiart.jpeg";
import imgResearch from "../assets/photos/learn/supp_marscollege_research-and-learn.jpg";
import imgDesert from "../assets/photos/night-glow.jpg";

// "Off-Grid AI" lineage strip (same provenance as /learn's AI history).
import lin2019 from "../assets/photos/learn/ai-history/2019-bbgan.png";
import lin2021 from "../assets/photos/learn/ai-history/2021-abraham.png";
import lin2022 from "../assets/photos/learn/ai-history/2022-mars-bots.jpg";
import lin2023 from "../assets/photos/learn/ai-history/2023-performance.jpg";
import lin2024 from "../assets/photos/learn/ai-history/2024-film-festival.jpg";
import lin2025 from "../assets/photos/learn/supp_marscollege_research-and-learn.jpg";
import lin2026 from "../assets/photos/learn/ai-history/2026-finals-presentation.jpg";

export const HERO_IMG: ImageMetadata = heroImg;
export const IMG_ART: ImageMetadata = imgArt;
export const IMG_RESEARCH: ImageMetadata = imgResearch;
export const IMG_DESERT: ImageMetadata = imgDesert;

// ─────────────────────────────────────────────────────────────
// Identity
// ─────────────────────────────────────────────────────────────
export const AGENTLAB = {
  name: "Agent Lab",
  tagline: "Off-Grid AI",
  season: "Fall 2026",
  // Plain-English one-liners reused across hero / meta / share cards.
  blurb:
    "A 12-week online cohort on building personal AI agents — for research, art, commerce, and a sovereign, off-grid life.",
  lede:
    "Build a personal agent that works for you. Twelve Tuesdays online, every week, this fall — from your first agent to a fully off-grid, self-hosted stack you own.",
  cadence: "Tuesdays · Sep 8 – Nov 24, 2026",
  time: "9:00 AM Pacific · 12:00 PM Eastern",
  where: "Online over Discord · no location required",
} as const;

// ─────────────────────────────────────────────────────────────
// The three topics (verbatim intent from Gene's brief)
// ─────────────────────────────────────────────────────────────
export const AGENTLAB_TOPICS = [
  {
    n: "01",
    title: "Personal agents",
    body: "Build agents that help you research, organize, and amplify your work — a second brain that knows you and answers only to you.",
  },
  {
    n: "02",
    title: "Agents that earn",
    body: "Agents that make art, make commerce, and do knowledge work — tools that help you make a living and support your lifestyle.",
  },
  {
    n: "03",
    title: "Sovereign & off-grid",
    body: "Run AI on your own terms. Calibrate raw intelligence against privacy and sovereignty — all the way to off-grid: completely local, self-hosted AI.",
  },
] as const;

// Three-arc framing for the curriculum (maps onto the schedule below).
export const AGENTLAB_ARCS = [
  { n: "01", title: "Personal agents", blurb: "Research, organize, amplify." },
  { n: "02", title: "Agents that earn", blurb: "Art, commerce, knowledge work." },
  { n: "03", title: "Sovereign & off-grid", blurb: "Privacy, ownership, fully local AI." },
] as const;

// ─────────────────────────────────────────────────────────────
// Schedule — every Tuesday, Sep 8 → Nov 24, 2026 (12 sessions).
// Note: Gene said "Sep 5 → Thanksgiving"; Sep 5 is a Saturday, so the
// first Tuesday is Sep 8 and the last before Thanksgiving (Nov 26) is
// Nov 24, which is Demo Day. That's 12 Tuesdays (11 sessions + Demo Day).
// Trim weeks here if you want a tighter ~10-week run.
// ─────────────────────────────────────────────────────────────
export const AGENTLAB_SCHEDULE = [
  { week: 1, date: "Sep 8", arc: "Kickoff", title: "Meet your agent — setup, onboarding, and what an agent really is" },
  { week: 2, date: "Sep 15", arc: "Personal agents", title: "Research agents: read, search, synthesize" },
  { week: 3, date: "Sep 22", arc: "Personal agents", title: "Organize: memory, notes, and your second brain" },
  { week: 4, date: "Sep 29", arc: "Personal agents", title: "Amplify: always-on automations and workflows" },
  { week: 5, date: "Oct 6", arc: "Agents that earn", title: "Agents that make art" },
  { week: 6, date: "Oct 13", arc: "Agents that earn", title: "Agents that make commerce" },
  { week: 7, date: "Oct 20", arc: "Agents that earn", title: "Knowledge work: make a living with your agent" },
  { week: 8, date: "Oct 27", arc: "Sovereign & off-grid", title: "The sovereignty dial: intelligence vs. privacy" },
  { week: 9, date: "Nov 3", arc: "Sovereign & off-grid", title: "Own your data: local models and self-hosting" },
  { week: 10, date: "Nov 10", arc: "Sovereign & off-grid", title: "Fully off-grid: AI that runs without the cloud" },
  { week: 11, date: "Nov 17", arc: "Ship", title: "Open lab + demo prep" },
  { week: 12, date: "Nov 24", arc: "Demo Day", title: "Demo Day — do something cool with your agent" },
] as const;

// ─────────────────────────────────────────────────────────────
// Pricing — four cumulative tiers. Each builds on the one before.
// Grants/scholarships (below) sit on top of every paid tier.
//   $0    Fly on the wall — spectate, take the materials, don't show
//   $500  BYOA           — bring an agent into the sim, show in showcases
//   $1000 Learnmaxxing   — BYOA + weekly office hours with Gene
//   $1500 Full service   — Learnmaxxing + we run it for you, keep it at the end
// ─────────────────────────────────────────────────────────────
// Terse on purpose — this is the high-level summary. Each tier: a one-line
// tagline + 1–2 essence bullets, no paragraph. A blog post will carry detail.
export const AGENTLAB_TIERS = [
  {
    key: "fly",
    name: "Fly on the wall",
    price: "$0",
    unit: "free",
    free: true,
    tagline: "Spectate",
    features: [
      "Watch every class (no showing)",
      "All class materials",
    ],
    featured: false,
  },
  {
    key: "byoa",
    name: "BYOA",
    price: "$500",
    unit: "for the cohort",
    tagline: "Bring your own agent",
    features: [
      "Enter your agent in the class sim",
      "Show in the showcases",
    ],
    // The "make your own agent" OS guide — hopeful stub (see AGENTLAB_LINKS.osGuide).
    link: { label: "New here? See the OS guide", href: "#" },
    featured: false,
  },
  {
    key: "learnmax",
    name: "Learnmaxxing",
    price: "$1,000",
    unit: "for the cohort",
    tagline: "BYOA + office hours",
    features: [
      "Everything in BYOA",
      "Weekly office hours with Gene",
    ],
    featured: false,
  },
  {
    key: "full",
    name: "Full service",
    price: "$1,500",
    unit: "for the cohort",
    tagline: "We run it for you",
    features: [
      "Everything in Learnmaxxing",
      "Your agent — yours to keep",
    ],
    featured: false,
  },
] as const;

// ─────────────────────────────────────────────────────────────
// Grants — feature this prominently. Separate application.
// ─────────────────────────────────────────────────────────────
export const AGENTLAB_GRANTS = {
  badge: "Scholarships available",
  headline: "Generous artist & student scholarships",
  body: "Anyone can sit in for free. And if you want to fully take part but a tier is out of reach, generous need- and merit-based scholarships for artists and students bring any tier within reach — partial to full ride. If cost is the only thing in your way, apply.",
  cta: "Apply for a scholarship",
} as const;

// ─────────────────────────────────────────────────────────────
// Logistics — quick facts.
// ─────────────────────────────────────────────────────────────
export const AGENTLAB_FACTS = [
  { k: "When", v: "Tuesdays · Sep 8 – Nov 24, 2026" },
  { k: "Time", v: "9:00 AM Pacific · 12:00 PM Eastern" },
  { k: "Where", v: "Online over Discord · no location required" },
  { k: "Format", v: "Live weekly lab, recorded — plus static video lectures throughout" },
  { k: "Ends with", v: "Demo Day — build something cool with your agent" },
] as const;

// ─────────────────────────────────────────────────────────────
// The connection to Mars College's winter semester.
// ─────────────────────────────────────────────────────────────
export const AGENTLAB_WINTER = {
  eyebrow: "From the lab to the desert",
  headline: "Agent Lab is the on-ramp to Mars.",
  body: "Agent Lab is the front door to Mars College — the off-grid winter semester in the California desert (Jan – Mar). Build your agent online this fall, then bring it to Mars campus, where \"off-grid AI\" stops being a metaphor and starts running on solar power in the desert. Lab students get an inside track on winter admission.",
  cta: "See the winter semester",
} as const;

// ─────────────────────────────────────────────────────────────
// "Off-Grid AI" lineage — credibility strip (2019 → 2026).
// captionHtml renders via set:html so we can link source posts.
// ─────────────────────────────────────────────────────────────
export const AGENTLAB_LINEAGE = [
  {
    year: "2019",
    img: lin2019 as ImageMetadata,
    alt: "BBGAN — early generative AI video trained on Bombay Beach",
    captionHtml: `<a href="https://x.com/Mars_College/status/1440013890369187842" target="_blank" rel="noopener">BBGAN</a>. Early generative AI trained on Bombay Beach.`,
  },
  {
    year: "2021",
    img: lin2021 as ImageMetadata,
    alt: "Abraham — early Eden generative model output",
    captionHtml: `<a href="https://abraham.ai" target="_blank" rel="noopener">Abraham</a>. Early <a href="https://eden.art" target="_blank" rel="noopener">Eden</a> models trained on the cohort.`,
  },
  {
    year: "2022",
    img: lin2022 as ImageMetadata,
    alt: "Mars Bots and Mulabonding — 2022 AI art series",
    captionHtml: `<a href="https://marscollege.substack.com/p/the-fifth-element" target="_blank" rel="noopener">Mars Bots</a>. Four GPT-3 house bots and the cohort AI art they made.`,
  },
  {
    year: "2023",
    img: lin2023 as ImageMetadata,
    alt: "Creative AI major launched at Mars College 2023",
    captionHtml: `<a href="https://marscollege.substack.com/p/study-creative-ai-at-mars-college" target="_blank" rel="noopener">Creative AI major</a> launched.`,
  },
  {
    year: "2024",
    img: lin2024 as ImageMetadata,
    alt: "Outdoor projection of the first AI Film Festival at Bombay Beach",
    captionHtml: `The first <a href="https://marscollege.substack.com/p/creative-ai-at-mars-college-2026" target="_blank" rel="noopener">AI Film Festival</a>, projected outdoors at Bombay Beach.`,
  },
  {
    year: "2025",
    img: lin2025 as ImageMetadata,
    alt: "Mars Research cohort in the tiered Chiba seating, 2025",
    captionHtml: `<a href="https://marscollege.substack.com/p/ai-agents-class" target="_blank" rel="noopener">Personal agents</a> for every Martian. <a href="https://eden.art" target="_blank" rel="noopener">Eden</a> on Mars hardware.`,
  },
  {
    year: "2026",
    img: lin2026 as ImageMetadata,
    alt: "Mars 2026 finals — projected diagrams between pallet-rack columns",
    captionHtml: `<a href="https://marscollege.substack.com/p/creative-ai-at-mars-college-2026" target="_blank" rel="noopener">Creative AI major</a>. Agents, films, generative radio.`,
  },
] as const;

// ─────────────────────────────────────────────────────────────
// Links — hopeful stubs. Wire these up when the real targets exist.
// ─────────────────────────────────────────────────────────────
export const AGENTLAB_LINKS = {
  // Enrollment / checkout isn't built yet → scroll to the in-page signup.
  enroll: "#signup",
  // Scholarships for students & artists use their OWN separate application —
  // NOT the signup form. TODO: replace "#" with the real application URL.
  grant: "#",
  // The BYOA "OS guide" / "make your own agent" tutorial Gene will publish
  // (likely an unpublished YouTube video). Hopeful stub — leave as "#".
  // Also surfaced inline on the BYOA tier as tier.link.
  osGuide: "#",
  makeYourOwnAgent: "#",
  // Mars College winter semester.
  winter: "/mit",
} as const;
