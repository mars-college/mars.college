// Ping IndexNow (Bing, Yandex, Seznam, Naver) with every URL in the sitemap.
// No account or API key from any search engine is required: ownership is
// proven by hosting <key>.txt at the site root. Runs after `pnpm build`.
import { readFileSync, readdirSync } from "node:fs";

const HOST = "mars.college";
const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("indexnow: no key file in public/ — skipping");
  process.exit(0);
}
const key = keyFile.replace(/\.txt$/, "");

const xml = readFileSync("dist/sitemap-0.xml", "utf8");
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) {
  console.error("indexnow: sitemap had no URLs — skipping");
  process.exit(0);
}

const body = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${keyFile}`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
// 200 = accepted, 202 = accepted pending key validation. Both are success.
console.log(`indexnow: ${res.status} ${res.statusText} — submitted ${urlList.length} URLs`);
