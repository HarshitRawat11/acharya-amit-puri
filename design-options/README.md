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
| `public/design-options/index.html` | The generated deck, **published with the site**. |

`public/` is copied to the deployed site untouched, so the deck is reachable at:

```
https://<your-site>/design-options/
```

## Regenerating

After editing `build.mjs`:

```bash
node design-options/build.mjs
```

Then copy its output over `public/design-options/index.html`, commit, and push.

## Notes

- The page is **self-contained** — no scripts, no images, no web fonts, no
  external requests. It works offline and needs no build step to view; just
  open the HTML file in a browser.
- It carries `<meta name="robots" content="noindex, nofollow">`, so search
  engines will not list it. It is **not** linked from the site's navigation and
  is **not** in the sitemap — but it is not password-protected either, so treat
  the URL as unlisted rather than private.
- Testimonials, the portrait, and the statistics appear as clearly-labelled
  placeholders. No quotes have been invented.

## Once a direction is chosen

The live site currently uses the **Temple Tank** palette (see the comment at the
top of `src/styles/global.css`). If a different direction is picked, that choice
drives `tailwind.config.mjs` and `src/styles/global.css`; the page structure and
copy in `src/` stay as they are.
