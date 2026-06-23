// Single source of structured copy for the Mars College 2027 site.
// Facts only from /Users/gene/Mars/planning/2027/. Microcopy authored tight.

export const APPLY_URL = "https://marscollege.substack.com/";
export const EMAIL = "info@mars.college";

// Tally form ids — embed via https://tally.so/embed/<id>?…
// Leave any blank until the form is published; pages fall back to a "coming soon" panel.
export const TALLY_APPLY_FORM_ID = "ZjWDVv"; // matches mars.college/apply
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
};

export const NAV = [
  { label: "Build", href: "/build" },
  { label: "Learn", href: "/learn" },
  { label: "Thrive", href: "/thrive" },
];

// The minified public timeline shown on the home page.
export const TIMELINE_MINI = [
  { date: "Aug 24", label: "AI cohort begins" },
  { date: "Nov – Dec", label: "Build the village" },
  { date: "Jan 4", label: "Mars College begins" },
  { date: "Mar 26 – 28", label: "Mars Electronica" },
];

// Three pillars.
export const PILLARS = [
  {
    index: "01",
    title: "Build",
    href: "/build",
    cta: "Help build the next Mars",
    blurb:
      "From pallet racks to solar power and internet, Mars campus is built over November and December.",
  },
  {
    index: "02",
    title: "Learn",
    href: "/learn",
    cta: "Explore the program",
    blurb:
      "Martians self-organize a three-month semester on off-grid technology, self-preservation, and future technology.",
  },
  {
    index: "03",
    title: "Thrive",
    href: "/thrive",
    cta: "See how Martians live",
    blurb:
      "A deep community, daily rituals, and Mars Electronica: the end-semester exhibition and festival.",
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

// ---- /thrive ----
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

export const EARN_BACK = [
  {
    title: "Micro-businesses",
    body: "Run building, water, solar, food, transport, repair. Get paid by Treasury, camps, or people.",
    action: "Apply to sell",
  },
  {
    title: "Grants",
    body: "For village gifts: bakeries, galleries, kilns, tool libraries, large-scale art.",
    action: "Apply for grant",
  },
];

export const SHARED_AMENITIES = [
  "Toilets",
  "Internet",
  "Trash & dump runs",
  "Purified water service",
];

export const RETURNING_SERVICES = [
  "Mimo's Brazilian Café",
  "Lota's Bakery",
  "Pseudo's Library",
  "Sam's Solar Shade",
  "Bodywork Dojo",
];
