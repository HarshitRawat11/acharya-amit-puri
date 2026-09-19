# CLAUDE.md — Acharya Amit Puri website

Astro 5 static site, Tailwind CSS 3, deployed to Cloudflare Pages from `main`.
All site content lives in one file: `src/data/site.ts`.

---

## POST-FREEZE OPERATING RULE

This project has a locked finish line in FINISH-LINE.md. On every new request, before doing anything, classify it into exactly one of two buckets:

  DEFECT — the request describes a failure of a criterion that is WRITTEN in FINISH-LINE.md. This is in scope. Fix it.

  EXTRA — anything else. This includes every improvement, addition, redesign, optimization beyond the locked thresholds, new page, new feature, and any suggestion from the user, from Claude, or from the client. Route it as follows:
    (a) Name it explicitly: "This is EXTRA — it is not a criterion in FINISH-LINE.md."
    (b) Append one line to BACKLOG.md: date, one-sentence description, source (user / Claude / client). Nothing more — no estimates, no client formatting.
    (c) Ask whether to proceed. Do not implement until told to.

There is no third bucket. If a request seems to fall between the two, it is EXTRA — the document is the only source of truth for what is in scope.

Reopening scope is a deliberate act, not a drift. It requires the explicit word UNFREEZE from the user, after which a new version of FINISH-LINE.md (v1.1, v2.0) is negotiated through Phases C–E again. Until then, the line holds.

---

## Where things are

- **All copy, contact details and service content** — `src/data/site.ts`. Nothing
  else should hold visitor-facing text.
- **Placeholder guard** — `isFilled()` in `src/lib/content.ts` returns false for
  `{{TOKEN}}` values, so an unfilled placeholder hides its own section rather
  than printing braces on the page. Never remove a section to hide a placeholder.
- **Design tokens** — `tailwind.config.mjs` and `src/styles/global.css`. The
  palette is fixed by FINISH-LINE.md §1.2; do not introduce a colour outside it.
- **Outstanding work** — FINISH-LINE.md §5. That list is exhaustive.
- **Parked ideas** — BACKLOG.md.

## Commands

```bash
npm run dev      # local dev server
npm run check    # astro check — must report 0 errors
npm run build    # production build — must exit 0
```
