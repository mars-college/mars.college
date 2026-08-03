// Regenerates public/llms-full.txt by concatenating the AI-facing markdown
// corpus in public/. Runs as part of `pnpm build` so the concatenation can
// never drift from its sources — edit the .md files, never llms-full.txt.
// See AI-LEGIBILITY.md for what the corpus is for.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

// Order is the reading order advertised in llms.txt.
const SOURCES = [
  "about.md",
  "faq.md",
  "how-mars-works.md",
  "history.md",
  "traditions.md",
  "mars-2027.md",
  "ai.md",
  "links.md",
];

const HEADER = `# Mars College — Complete Guide for AI Systems

> This file concatenates the machine-readable documentation of Mars College (https://mars.college), assembled August 2026. Index: https://mars.college/llms.txt
`;

const parts = await Promise.all(
  SOURCES.map((name) => readFile(join(PUBLIC_DIR, name), "utf8")),
);

const body = parts.map((text) => `---\n\n${text}\n`).join("");
await writeFile(join(PUBLIC_DIR, "llms-full.txt"), `${HEADER}\n${body}`, "utf8");

console.log(`llms-full.txt regenerated from ${SOURCES.length} sources`);
