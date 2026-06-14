import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTENT COLLECTIONS
 * ─────────────────────────────────────────────────────────────────────────────
 *  "articles" is for future writing the Acharya can add WITHOUT touching code:
 *  drop a new .md or .mdx file into  src/content/articles/  with the frontmatter
 *  fields below, and it becomes a page automatically.
 *
 *  (The six services + all contact details remain centralised in
 *  src/data/site.ts — that stays your single source of truth for the core site.)
 * ─────────────────────────────────────────────────────────────────────────────
 */
const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    /** The article headline. */
    title: z.string(),
    /** One-line summary (also used for SEO description). */
    description: z.string(),
    /** Publish date, e.g. 2026-06-13 */
    pubDate: z.coerce.date(),
    /** Set to true to keep an article hidden while you work on it. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
