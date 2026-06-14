// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// ─────────────────────────────────────────────────────────────────────────────
//  ⚠️  SET YOUR DOMAIN HERE  ({{DOMAIN}})
//  This single value powers canonical links + the auto-generated sitemap.
//  It MUST be a full, valid URL. Until you have a real domain, this placeholder
//  keeps everything building cleanly — just replace it when you're ready.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = "https://www.acharyaamitpuri.com";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    // Tailwind v3 via the official Astro integration (as specified).
    // applyBaseStyles:false → we control the base layer ourselves in
    // src/styles/global.css so the design system stays in one place.
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
});
