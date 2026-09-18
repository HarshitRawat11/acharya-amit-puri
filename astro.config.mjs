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
    // The sitemap carried only bare <loc> entries.
    //
    // `lastmod` is the one Google genuinely acts on — it tells a crawler
    // whether a page is worth re-fetching. `priority` and `changefreq` are
    // weak-to-ignored signals these days; priority is set because it costs
    // nothing and still guides some crawlers, and changefreq is left at a
    // single site-wide value rather than varied per page, which would buy
    // nothing and needs the sitemap package's own enum type to satisfy
    // `astro check`.
    sitemap({
      lastmod: new Date(),
      changefreq: "monthly",
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === "/") item.priority = 1.0;
        else if (path.startsWith("/services/") && path !== "/services/") item.priority = 0.9;
        else if (path === "/services/" || path === "/contact/") item.priority = 0.8;
        else if (path === "/about/") item.priority = 0.7;
        else if (path === "/articles/") item.priority = 0.6;
        else if (path === "/privacy/") item.priority = 0.2;
        return item;
      },
    }),
  ],
});
