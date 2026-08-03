// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://mars.college",
  integrations: [
    sitemap({
      // keep orphaned / noindex pages out of the sitemap:
      // - /build is superseded by dpw.mars.college but kept for reference
      // - /apply is noindex (hidden Tally-form page)
      // - /mit-court is the experimental page served at mit.mars.college
      filter: (page) => !/\/(build|apply|mit-court)\/?$/.test(page),
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // allow Cloudflare quick-tunnel preview hosts
      allowedHosts: true,
    },
  },
});
