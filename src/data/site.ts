// Single source of structured copy for the Mars College 2027 site.
// Facts only from /Users/gene/Mars/planning/2027/. Microcopy authored tight.

export const APPLY_URL = "https://marscollege.substack.com/";
export const EMAIL = "info@mars.college";

// Open Mars Zine, Issue 2026 — Heyzine flipbook.
export const ZINE_URL = "https://heyzine.com/flip-book/a5cdbbe377.html";

// Tally form ids — embed via https://tally.so/embed/<id>?…
// Leave any blank until the form is published; pages fall back to a "coming soon" panel.
export const TALLY_APPLY_FORM_ID = "ZjWDVv"; // matches mars.college/apply
// MIT has its own application (https://tally.so/r/EkeWKr) — /mit uses this one.
export const TALLY_MIT_FORM_ID = "EkeWKr";
// Build/DPW inquiry form at https://tally.so/forms/xXgvOk/edit
export const TALLY_BUILD_FORM_ID = "xXgvOk";
// Off-Grid AI online cohort signup. Currently pointed at the Mars College 2027
// Application form (same as apply). Swap to a dedicated form id when one ships.
export const TALLY_OFFGRID_FORM_ID = "ZjWDVv";

// Substack post URL for the build deep-dive (TBD — published)
export const BUILD_SUBSTACK_URL = "https://marscollege.substack.com/";

export const SOCIAL = {
  substack: "https://marscollege.substack.com/",
  instagram: "https://www.instagram.com/mars.college",
  x: "https://x.com/mars_college",
  github: "https://github.com/mars-college",
  youtube: "https://www.youtube.com/@MarsCollege-k7t",
};

export const NAV = [
  // DPW is getting its own site (page TBD); the old /build page stays around
  // for reference but nothing links to it.
  { label: "Build", href: "https://dpw.mars.college" },
  { label: "MIT", href: "/mit" },
  { label: "Apply", href: "/#apply" },
];

// The minified public timeline shown on the home page.
export const TIMELINE_MINI = [
  { date: "Nov – Dec", label: "Build Mars" },
  { date: "Jan 11", label: "Mars College begins" },
  { date: "Mar 26 – 28", label: "Mars Electronica" },
];

// Five ways into Mars College — each camp has its own application.
// Cards: big acronym, expansion as intermediary subtext, description below,
// standardized "Apply to <acronym>" CTA.
export const PILLARS = [
  {
    title: "DPW",
    ev: "camp-dpw",
    sub: "Department of Public Works",
    blurb:
      "Build the village. Run its physical systems. Raise the campus from bare lake bed with the DPW crew from November through spring.",
    href: "https://dpw.mars.college",
    cta: "Apply to DPW",
  },
  {
    title: "MIT",
    ev: "camp-mit",
    sub: "Mars Institute of Technology",
    blurb:
      "Take classes, make art, and learn off-grid AI: how to engage the digital world while sustaining an off-grid life.",
    href: "/mit",
    cta: "Apply to MIT",
  },
  {
    title: "DEC",
    ev: "camp-dec",
    sub: "Department of Emergent Civilization",
    blurb:
      "Mars's makerspace and shared workshop: saws, drills, 3D printers, kilns, tools, and desks for people building things with their hands.",
    href: "https://dec.mars.college",
    cta: "Apply to DEC",
  },
  {
    title: "Co Lab",
    ev: "camp-colab",
    sub: "The coherent community camp",
    blurb:
      "A three-month immersion in coherent community: sociocratic governance, relational practice, and daily ritual.",
    href: "https://colab.mars.college",
    cta: "Apply to Co Lab",
  },
  {
    title: "MMA",
    ev: "camp-mma",
    sub: "Martian Music Academy",
    blurb:
      "Twelve weeks of making songs and building a scene, performing on a stepped pyramid of pallet racks raised for the season.",
    href: "https://music.mars.college",
    cta: "Apply to MMA",
  },
];

// ---- homepage FAQ ----
export const HOME_FAQ = [
  {
    q: "Can I maintain my full-time remote job while I'm at Mars?",
    a: "Yes, absolutely. Part of Mars College's raison d'être is to enable the dream life of remote workers. Mars's open calendar makes it easy to plan around your schedule, and our wifi is better than San Francisco's. In practice, remote workers make up a good share of every cohort: they keep their hours and live the rest of the day on Mars.",
  },
  {
    q: "How much does this cost?",
    a: "The base cost is about $1,500 for three months on the ground — roughly $500 in Treasury fees (toilets, internet, shared water, aid) plus about $900 in camp dues (mostly food) plus $100–$600 for a place to sleep if you don't have a van. Building crew (DPW), grant recipients, and micro-business operators earn most or all of it back.",
  },
  {
    q: "What do I have to do?",
    a: "Contribute in a real way. There are a multitude of ways to participate in the Mars economy: cook, teach, build, repair, run a concession, offer a service, or take a role in DPW, Treasury, or a camp. Every year we ask each person to leave something behind: a presentation, a performance, an installation, a class, a ritual, a service.",
  },
  {
    q: "Why are you doing this?",
    a: "Because we love the scene Mars cultivates and we think more people should live like this. Mars is an experiment in what a small, self-organized, deeply strange community can build together. We want to keep making it, and we want to share it with the people who'd be at home here.",
  },
];

// ---- /learn ----
export const AI_TOPICS = [
  {
    n: "01",
    title: "Personal AI entity",
    body: "A coach, chief of staff, second brain: an AI that knows you and works for you.",
  },
  {
    n: "02",
    title: "Automating workflows",
    body: "Always-on agents that watch, prepare, organize, and learn while you sleep.",
  },
  {
    n: "03",
    title: "Supercharging computer use",
    body: "Use AI to do computer work faster. Build software for an audience of one: yourself.",
  },
  {
    n: "04",
    title: "Art with AI",
    body: "Film, music, performance, live code. AI as an instrument, not a style.",
  },
  {
    n: "05",
    title: "Making money with AI",
    body: "How people using AI are making money now, and how you might.",
  },
];

export const LEARN_EXTRAS = [
  {
    title: "Remote work",
    body: "Keep the income that funds off-grid life. Make the desert a viable office.",
  },
  {
    title: "Vanlife skills",
    body: "Power, water, heat, shelter: the craft of living outside the grid.",
  },
];

// Curriculum is unlocked until ~October on purpose.
export const LEARN_NOTE =
  "Curriculum locks in around October. Agents move too fast to freeze it in June.";

export const SCHOLARSHIPS = [
  { title: "Utility Agents", body: "Run Mars: admissions, aid, kitchen, water, power, Home Assistant." },
  { title: "Art School", body: "Show at Mars Electronica. Fill the gallery. Make desert-scale work." },
  { title: "Teacher Training", body: "Teach people to use AI well." },
  { title: "Research", body: "Vision, rovers, embodiment, personal assistants, the Arena." },
];

// ---- /build ----
export const DPW_CATALOG = [
  {
    title: "Structure",
    items: ["Pallet racks", "Plywood & lumber", "Mattresses & couches", "Housing pods"],
  },
  {
    title: "Power",
    items: ["Solar panels", "Batteries", "Charge controllers & inverters", "Wiring"],
  },
  {
    title: "Water",
    items: ["IBC tanks", "Pumps", "Grey-water tanks", "Jugs & standing sinks"],
  },
  {
    title: "Camp gear",
    items: ["Trash cans", "Utility wagons", "Camp stoves", "Propane tanks"],
  },
];

export const BUILD_SCHEDULE = [
  { date: "Aug 1", label: "Pallet rack orders must be placed" },
  { date: "Sep 1", label: "Solar orders must be placed" },
  { date: "Oct 1", label: "DPW crew application deadline" },
  { date: "Nov 1", label: "Placement deadline for camps & structures" },
  { date: "Nov 2", label: "Build begins. Civic infrastructure first." },
  { date: "Jan 1", label: "Public infrastructure finished" },
  { date: "Apr 5", label: "DPW begins breakdown" },
  { date: "May 1", label: "Breakdown complete. Desert returns." },
];

export const DPW_CREW_PERKS = [
  "Housing for the season",
  "General fee waived",
  "DPW meal plan",
  "~6 hrs/day during build & unbuild",
];

// Three build phases — used on /build candidate pages
export const BUILD_PHASES = [
  {
    n: "01",
    title: "Build",
    when: "Nov 2 – Dec 31, 2026",
    hours: "6 hrs/day",
    body: "Pallet racks rise. Plywood walls go up. Solar gets mounted. Water plumbed. Kitchens, signage, the whole civic backbone. The town goes from nothing to ready.",
  },
  {
    n: "02",
    title: "Maintain",
    when: "Jan – Mar, 2027",
    hours: "Lighter, role-dependent",
    body: "Water deliveries, repairs, dump runs, power troubleshooting, general upkeep. Keep the village running while everybody else makes work.",
  },
  {
    n: "03",
    title: "Strike",
    when: "Mar 29 – May 1, 2027",
    hours: "6 hrs/day",
    body: "Take it apart. Inventory, store, pack. Leave the land as we found it. Center camp wifi comes down Apr 10. DPW breakdown finishes May 1.",
  },
];

// Short FAQ for the /build page — recurring questions a prospective builder asks
export const BUILD_FAQ = [
  {
    q: "Do I need construction experience?",
    a: "No. Most builders come without it. The work is real (pallet rack assembly, plywood walls, simple wiring, basic plumbing) and you'll be working alongside people who've done it five seasons. Bring your hands and your attention.",
  },
  {
    q: "Where do I live during the build?",
    a: "DPW crew gets housing for the season. Other builders sleep in their own van or camper, in a rented housing pod, or with a camp that's invited them. There's no hotel option. You're on site.",
  },
  {
    q: "How much does it cost?",
    a: "DPW crew: $0. The general fee is waived and meals are covered. Non-crew builders pay the standard ~$1,500 season cost ($500 Treasury + ~$900 camp dues + $100–$600 living space). Many builders earn that back through micro-businesses or grants.",
  },
  {
    q: "Can I come just for build, and not stay for the program?",
    a: "Yes. Build-only and strike-only are both valid commitments. Some people come for Nov–Dec, leave for the holidays, and come back for strike in April.",
  },
  {
    q: "What if I can only commit to part of the build window?",
    a: "Tell us in the inquiry. Partial weeks help. The crew is sized for the work, so even short stints during the heavy weeks (early Nov, mid-Dec) are valuable.",
  },
  {
    q: "What's the weather like in Nov-Dec?",
    a: "Cold nights (sometimes sub-freezing), warm days, low humidity, wind. December is the easiest month to work; daylight is short but conditions are mild. Bring layers, work gloves, eye protection, and a dust mask.",
  },
  {
    q: "What if my skill is something else (solar, plumbing, welding, cooking)?",
    a: "Tell us in the inquiry. DPW needs specialists too. Most people start on general construction the first week, then move to their specialty as the structures come up.",
  },
];

export const CONCESSIONS = [
  "Fridge & freezer rental",
  "Purified drinking water",
  "Water tank fill & service",
  "Solar rental & service",
  "Food co-op + cold storage",
  "Mail service",
  "Camper & pod housing",
  "Transport & storage",
  "EUC sales, service, rentals",
  "Bicycle sales & service",
  "Golf cart rentals",
];

// Season cost breakdown — used on /dec (and previously /thrive).
export const COSTS = [
  {
    amount: "~$500",
    title: "Treasury fee",
    body: "Toilets, internet, drinking water, shared spaces, aid, and grants.",
  },
  {
    amount: "~$900",
    title: "Camp dues",
    body: "Mostly food, plus camp infrastructure and camp offerings.",
  },
  {
    amount: "$100 – $600",
    title: "Living space",
    body: "If you arrive without a van or camper. Build it or rent through DPW.",
  },
];
