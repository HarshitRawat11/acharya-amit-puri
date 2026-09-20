# Design options — home page directions

Five complete home-page design directions for **Acharya Amit Puri** to choose
between. The wording, the six services, and the page structure are identical in
all five — only the visual design changes (palette, typography, layout, motifs).

1. Temple Tank
2. Ivory & Marigold
3. Midnight Jyotish
4. Sacred Minimal
5. Earthen Heritage

## Where it lives

| File | Purpose |
| --- | --- |
| `design-options/build.mjs` | The generator. Source of truth — edit this. |
| `public/design-options.html` | The generated deck, **published with the site**. |

`public/` is copied to the deployed site untouched, so the deck is reachable at:

```
https://<your-site>/design-options.html
```

## Regenerating

After editing `build.mjs`:

```bash
node design-options/build.mjs
```

Then copy its output over `public/design-options.html`, commit, and push.

## Notes

- The page is **self-contained** — no scripts, no images, no web fonts, no
  external requests. It works offline and needs no build step to view; just
  open the HTML file in a browser.
- It carries `<meta name="robots" content="noindex, nofollow">`, so search
  engines will not list it, and it is **not** in the sitemap. It **is** linked
  from the main navigation as "Design Options" while a direction is being
  chosen — remove that entry in `src/components/Header.astro` before handover.
  It is not password-protected, so treat the URL as unlisted, not private.
- Testimonials, the portrait, and the statistics appear as clearly-labelled
  placeholders. No quotes have been invented.

## Once a direction is chosen

The live site currently uses the **Temple Tank** palette (see the comment at the
top of `src/styles/global.css`). If a different direction is picked, that choice
drives `tailwind.config.mjs` and `src/styles/global.css`; the page structure and
copy in `src/` stay as they are.
