// Shared structured copy for the four /learn candidate pages.
// Facts sourced from docs/substack and docs/discord/themes.

export const LEARN_HERO_LEDE =
  "An off-grid term in the desert, an online AI cohort the rest of the year, and an open calendar anyone can teach into.";

// ─────────────────────────────────────────────────────────────
// The five-point AI program pitch (existing, kept stable).
// ─────────────────────────────────────────────────────────────
export const AI_PROGRAM_TOPICS = [
  {
    n: "01",
    title: "Personal AI",
    body: "A coach, chief of staff, second brain. An agent that knows you and answers only to you.",
  },
  {
    n: "02",
    title: "Automated workflows",
    body: "Always-on agents that watch, prepare, organize, and learn while you sleep.",
  },
  {
    n: "03",
    title: "Computer use",
    body: "Use AI to do computer work faster. Build software for an audience of one: yourself.",
  },
  {
    n: "04",
    title: "Art with AI",
    body: "Film, music, performance, live code. AI as an instrument, not a style.",
  },
  {
    n: "05",
    title: "Earning a living",
    body: "How people using AI are making money now, and how you might.",
  },
];

export const AI_PROGRAM_LOCK_NOTE =
  "Curriculum locks in around October. Agents move too fast to freeze in June.";

export const AI_PROGRAM_REQUIREMENTS = [
  "A lightning talk during Ideas Week.",
  "Work in at least two of three Moon shows, plus Mars Electronica.",
  "Host one workshop, screening, or study group of your own.",
  "Basic chores in shared spaces.",
];

export const AI_PROGRAM_BENEFITS = [
  "Compute grant on Eden.art.",
  "Access to Chiba space — screens, projection, materials budget.",
  "Limited housing inside the AI camp pallet-rack quarters.",
  "Eligibility for the AI Camp Living Co-Op.",
];

// ─────────────────────────────────────────────────────────────
// Tracks across the years — what we've actually taught.
// Each "since" is an approximate first formal year as a track.
// ─────────────────────────────────────────────────────────────
export const TRACKS = [
  {
    name: "Creative AI",
    since: "2022",
    body:
      "The spine of the program. Image, video, agents, custom LoRAs, agentic coding, world models, an annual film festival.",
  },
  {
    name: "Writers' Workshop",
    since: "2026",
    body:
      "Fiction, poetry, screenplay, creative nonfiction. Daily practice, weekly feedback, a finished work by the end of term.",
  },
  {
    name: "Future Music",
    since: "2022",
    body:
      "Live coding (Tidal, Hydra, FoxDot), synth labs, music theory, algoraves under the moon.",
  },
  {
    name: "AI Film Academy",
    since: "2023",
    body:
      "Storyboarding, generative video, voice and likeness, scoring. Culminates in the AI Film Festival at Electronica.",
  },
  {
    name: "Physical Art",
    since: "2022",
    body:
      "Hand-painted murals, projection mapping, sculpture, ritual artifacts that come apart with the camp.",
  },
  {
    name: "Ceramics & Clay",
    since: "2021",
    body:
      "Wheel, hand-built, the rocket kiln. Local desert clay fired into tableware, shrines, and 3D-printed bowls.",
  },
  {
    name: "Bodywork & Movement",
    since: "2021",
    body:
      "Marsbod every morning, the Dojo for Thai bodywork and embodiment, acroyoga at sunset, contact improv.",
  },
  {
    name: "Culinary Institute",
    since: "2024",
    body:
      "Wood-fired bread, fermentation, the noodle bar, a communal kitchen run on solar and propane.",
  },
  {
    name: "Math, Shapes & Games",
    since: "2026",
    body:
      "Geometry workshops that end up as polyhedral ritual objects. Chess, logic, design puzzles.",
  },
  {
    name: "Off-Grid Skills",
    since: "2020",
    body:
      "Solar, batteries, water, plywood carpentry. The literacy of an off-grid life.",
  },
  {
    name: "Performance & Ritual",
    since: "2021",
    body:
      "Mahashivaratri all-nighters, Holi at sunset, the season-end burn of a wooden polyhedron.",
  },
  {
    name: "Desert Ecology",
    since: "2024",
    body:
      "The Salton Sea, native plants, what's edible (and what isn't), foraging, the local lake bed.",
  },
];

// Short list version used as a single inline sentence.
export const TRACKS_INLINE = TRACKS.map((t) => t.name).join(" · ");

// ─────────────────────────────────────────────────────────────
// A typical week at Mars — load-bearing rhythms.
// ─────────────────────────────────────────────────────────────
export const WEEK = [
  {
    day: "Mon",
    morning: "Marsbod — yoga on the upper deck",
    midday: "Creative AI lab",
    evening: "Open calendar — film, study group, writing",
  },
  {
    day: "Tue",
    morning: "Coffee, kitchen, slow start",
    midday: "Workshops — anything on the calendar",
    evening: "The Outer Membrane review board",
  },
  {
    day: "Wed",
    morning: "Marsbod",
    midday: "AI program cohort meeting",
    evening: "Thunder Talks — 7 min each, anyone can sign up",
  },
  {
    day: "Thu",
    morning: "Marsbod",
    midday: "Ceramics, writing, music — whatever's running",
    evening: "Screenings, demos, open studio",
  },
  {
    day: "Fri",
    morning: "Marsbod",
    midday: "Workshops, project sprints",
    evening: "Friday-night livecoding — code on the wall",
  },
  {
    day: "Sat",
    morning: "Long breakfast",
    midday: "Field trips, hot springs, Slab City",
    evening: "Algorave (every other week) or moon rave",
  },
  {
    day: "Sun",
    morning: "Quiet",
    midday: "Communal meal prep",
    evening: "Dinner at Chatsubo · Reset week",
  },
];

// ─────────────────────────────────────────────────────────────
// The term arc.
// ─────────────────────────────────────────────────────────────
export const TERM = [
  {
    date: "Aug 24 – Dec",
    label: "AI cohort (online)",
    body:
      "The off-season program. Weekly workshops on Zoom. A hackathon at the midpoint. Demo day in December.",
    kind: "online",
  },
  {
    date: "Nov – Dec",
    label: "Build the village",
    body: "Pallet racks, solar, water, plywood. The campus rises from bare lake bed.",
    kind: "build",
  },
  {
    date: "Jan 4",
    label: "Mars begins · Orientation",
    body: "Move-in, build-crew rotations, first communal meals.",
    kind: "term",
  },
  {
    date: "Jan 11 – 17",
    label: "Ideas Week",
    body: "Everyone gives a lightning talk: who you are, what you'll make, what you'd teach.",
    kind: "term",
  },
  {
    date: "Jan / Feb / Mar",
    label: "Moons of Mars — three gallery shows",
    body: "Open openings, rolling installation, fresh work between each.",
    kind: "term",
  },
  {
    date: "Wed nights",
    label: "Thunder Talks — every week, all term",
    body: "Seven minutes per speaker. Anyone can sign up. Termite mounds. Eclipse geometry. Anything.",
    kind: "term",
  },
  {
    date: "Feb 13 – 15",
    label: "Declaration Days · Midterm",
    body: "Show what you've got, declare intentions for the second half. AI hackathon for the cohort.",
    kind: "term",
  },
  {
    date: "Mar 26 – 28",
    label: "Mars Electronica",
    body: "Gallery opening, AI Film Festival, algorave, performances. Public-facing finals — celebratory, not graded.",
    kind: "term",
  },
  {
    date: "April",
    label: "Unbuild",
    body: "Take it all down. The desert returns. Carry the method home.",
    kind: "build",
  },
];

// ─────────────────────────────────────────────────────────────
// Off-season online cohort (Aug-Dec).
// ─────────────────────────────────────────────────────────────
export const COHORT = {
  start: "Aug 24",
  end: "December",
  format: "Online · weekly workshops · hackathon at midpoint · demo day",
  blurb:
    "A four-month AI cohort that runs while the desert sleeps. Same content as the on-Mars program, online. People who finish the cohort and want to come to the desert in January get an inside track.",
  bullets: [
    {
      title: "Weekly live workshops",
      body: "Cohort meets on Zoom. Curriculum on personal AI, agents, generative media, agentic coding.",
    },
    {
      title: "Hackathon at the midpoint",
      body: "Cohort generates as much as they can in a long weekend. Project demos follow.",
    },
    {
      title: "Eden compute throughout",
      body: "Same Eden grant as the IRL term. Run real models, ship real projects.",
    },
    {
      title: "Optional in-person continuation",
      body: "Cohort participants can apply to continue the work at Mars from January to March.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Open-calendar / do-ocracy explainer.
// ─────────────────────────────────────────────────────────────
export const OPEN_CALENDAR = {
  title: "The open calendar — and do-ocracy",
  body:
    "There's no official distinction between teacher and student at Mars. If you want to teach something, add it to the calendar. If you want to attend, show up. Or don't. No grades, no attendance, no guarantee a thread runs the full term.",
  rules: [
    "If it won't inconvenience anyone, you can just do it.",
    "If you see a problem, fix it — don't file a complaint.",
    "The calendar is shared. So is the work.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Pull quotes (from past Substack posts, verbatim).
// ─────────────────────────────────────────────────────────────
export const QUOTES = [
  {
    text:
      "The AI program is not 'about AI' so much as it is about how to use AI to expand your understanding of the things you already know and care about.",
    source: "Welcome to the Creative AI Program, 2025",
  },
  {
    text:
      "There's no official distinction between teachers and students at Mars. If you want to teach a class, you add it to the google calendar. If you want to attend a class, you just show up. Or don't.",
    source: "A pop-up college in the desert, 2024",
  },
  {
    text:
      "AI is the secret superpower and enabler of the 21st-century vagabond — enabling intrepid individuals to acquire new skills and knowledge from even the most remote locations on Earth.",
    source: "Creative AI at Mars College 2026",
  },
  {
    text:
      "YOLO your way to augmented creativity in the embrace of industrial warehouse shelving in the scenic Sonoran desert.",
    source: "Creative AI Bootcamp, 2025",
  },
];

// ─────────────────────────────────────────────────────────────
// Scholarships (kept from current /learn).
// ─────────────────────────────────────────────────────────────
export const SCHOLARSHIPS = [
  { title: "Utility Agents", body: "Run Mars: admissions, aid, kitchen, water, power, Home Assistant." },
  { title: "Art School", body: "Show at Mars Electronica. Fill the gallery. Make desert-scale work." },
  { title: "Teacher Training", body: "Teach people to use AI well." },
  { title: "Research", body: "Vision, rovers, embodiment, personal assistants, the Arena." },
];
