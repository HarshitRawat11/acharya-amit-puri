// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// ─────────────────────────────────────────────────────────────────────────────
//  ⚠️  THE SITE'S PUBLIC ADDRESS
//  This single value powers canonical links, the auto-generated sitemap, the
//  robots.txt Sitemap line, and the absolute URL of the social share image.
//  It MUST be a full, valid URL with no trailing slash.
//
//  Currently set to the FREE Cloudflare Pages address. When the real domain is
//  bought (e.g. https://www.acharyaamitpuri.com), change this one line, commit
//  and push — the host rebuilds and every link corrects itself automatically.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = "https://acharya-amit-puri.pages.dev";

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
