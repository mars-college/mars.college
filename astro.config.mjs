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
      // keep draft / archival / noindex pages out of the sitemap:
      // - build*/learn* variants and agentlab/thrive are drafts (also noindex)
      // - plain /build and /learn are outdated and slated for deletion
      // - /apply is noindex (hidden Tally-form page)
      filter: (page) =>
        !/\/(build\d?|learn\d?|agentlab\d?|thrive|apply|mit-court)\/?$/.test(page),
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
