// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://mars.college",
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // allow Cloudflare quick-tunnel preview hosts
      allowedHosts: true,
    },
  },
});
