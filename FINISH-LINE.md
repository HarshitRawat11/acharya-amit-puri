# FINISH LINE — v1

**Version:** 1.0 · **Locked:** 2026-09-19 · **Status:** LOCKED
**Project:** Acharya Amit Puri — website
**Completion authority:** client work. The client is **Acharya Amit Puri**.
**Acceptance status:** **PROVISIONAL — awaiting client acceptance.**
**Live at:** https://acharya-amit-puri.pages.dev

> This document is the only source of truth for what v1 is. A criterion that is
> not written here does not exist. Every criterion is written to be checkable by
> someone with no context, in under a minute, with a yes/no answer.
>
> Scope reopens only on the explicit word **UNFREEZE**. Until then the line holds.
> See `CLAUDE.md` for the routing rule and `BACKLOG.md` for everything parked.

**Box key** — `[x]` verified at lock, with the method named. `[ ]` not yet met or
not yet verified; every unticked box appears in §5, and §5 contains nothing else.

---

## 1. Definition of Done

### 1.1 Content

#### Pages that must exist and respond 200

A page not on this list is out of scope.

| # | Route | Must contain |
| --- | --- | --- |
| 1 | `/` | Hero with the Acharya's name; the six services; about preview; "How a consultation works"; FAQ; contact call-to-action |
| 2 | `/about/` | "Meet the Acharya" section; the three principles (Respect, Authenticity, Practicality) |
| 3 | `/services/` | All six services listed, each linking to its own page |
| 4 | `/services/vastu-report/` | Intro, "What it is", "Who it's for", "What you receive", three FAQs |
| 5 | `/services/astro-advice/` | Same five elements |
| 6 | `/services/numero-advice/` | Same five elements |
| 7 | `/services/prakriti-advice/` | Same five elements |
| 8 | `/services/design-advice/` | Same five elements |
| 9 | `/services/palmistry-advice/` | Same five elements |
| 10 | `/contact/` | Enquiry route (form when the key exists, a calm stand-in when it does not); "Other ways to reach me" panel |
| 11 | `/articles/` | Published articles, or an empty state when there are none |
| 12 | `/privacy/` | What is collected, why, who else handles it, retention, rights, contact |
| 13 | `/404` | Custom not-found page returning HTTP 404 |

Plus two generated files: `/robots.txt` and `/sitemap-index.xml`.

**Criteria**

- [x] **C1** — All 13 routes return HTTP 200 on the live site. `/nonexistent` returns 404.
      *Verified 2026-09-19 by requesting all 15 URLs plus a nonexistent path.*
- [x] **C2** — No `{{PLACEHOLDER}}` token appears in any built HTML file.
      *Verified 2026-09-19 by scanning all 14 built HTML files. Zero occurrences.*
- [x] **C3** — No developer-facing instruction appears in visitor-facing copy (no "see CONTENT.md", no "src/data/site.ts").
      *Verified 2026-09-19 by scanning all 14 built HTML files for six such strings. Zero occurrences.*
- [x] **C4** — Zero broken internal links and zero dangling in-page anchors across all built pages.
      *Verified by crawl during the audit at commit `29fceb6`.*
- [x] **C5** — An article placed in a sub-folder of `src/content/articles/` still builds.
      *Verified: the route is `[...slug].astro`, a rest parameter, which matches nested paths.*

#### Owed content register

These are **assigned to the client**. Per the agreed rule, a placeholder that is
documented here and assigned to the client counts as **DONE for v1** — the site
is finished; the client owes the content. A placeholder found in the project and
**not** listed here is a defect.

| Placeholder | File | Owner | Effect while unfilled |
| --- | --- | --- | --- |
| `{{PHONE}}` | `src/data/site.ts:90` | Client | No tap-to-call anywhere |
| `{{WHATSAPP}}` | `src/data/site.ts:93` | Client | No WhatsApp button anywhere |
| `{{EMAIL}}` | `src/data/site.ts:95` | Client | No tap-to-email; privacy page cannot take rights requests |
| `{{LOCATION}}` | `src/data/site.ts:97` | Client | No city shown; local search cannot function |
| `{{ABOUT_BIO}}` | `src/data/site.ts:116` | Client | About page shows a short stand-in |
| `{{FORM_KEY}}` | `src/data/site.ts:418` | Client | Enquiry form is not rendered at all |
| `{{YEARS_EXPERIENCE}}` | `src/data/site.ts:118,128` | Client | Stats row hidden |
| `{{CLIENTS_SERVED}}` | `src/data/site.ts:120,129` | Client | Stats row hidden |
| `{{INSTAGRAM}}` `{{FACEBOOK}}` `{{YOUTUBE}}` | `src/data/site.ts:104–106` | Client | Social icons hidden |
| `{{TESTIMONIAL_1..3}}` + 3 names | `src/data/site.ts:376–378` | Client | Testimonials section hidden entirely |
| `welcome.md` `draft: true` | `src/content/articles/` | Client | `/articles/` shows its empty state |

That is **17 placeholder tokens**. Two further bracketed strings exist in the
file — `{{DOUBLE_BRACES}}` at line 10 and `{{DOMAIN}}` at line 425 — and both
are **inside code comments** explaining the convention. They are not placeholders,
they render nothing, and C6 excludes them by wording.

> **Acknowledged consequence.** With the six README-"Required" placeholders
> unfilled, **v1 ships with no working contact route** — no phone, WhatsApp,
> email or enquiry form. The site is complete; it cannot yet generate an
> enquiry. This is a deliberate decision, recorded so it is not a surprise.

- [x] **C6** — Every placeholder token in `src/data/site.ts` that is **not inside a code comment** appears in the table above.
      *Verified 2026-09-19: 19 distinct tokens found, 2 in comments, 17 in the register, 0 unaccounted for.*
- [x] **C7** — No unfilled placeholder is visible to a visitor; each hides its own section.
      *Verified by C2 — no token reaches the built HTML — and by the `isFilled()` guard in `src/lib/content.ts`.*

#### Content exclusions

Not part of v1: a portrait photograph of the Acharya; any published article;
any testimonial; a services price list; online booking or payment; multi-language
content; a newsletter.

### 1.2 Design / Creativity

The visual system **as it exists now** is the v1 visual system. No page may
deviate from it.

**Palette** — `paper #F7F3EC`, `surface #FDFBF6`, `surface-alt #EBE1D0`,
`ink #1C2B2A`, `muted #4C5B56`, `teal #0E5A52` / `teal-dark #0B4A43`,
`gold #A67C2E` / `gold-soft #E7D4A8`, `hair #C9BCA0`, `onteal #FBF7EF`.

**Typography** — Marcellus for headings, Inter Variable for body. Both
self-hosted; no webfont is fetched from a third party.

**Layout** — `max-w-6xl` container; `12px` card radius; `68ch` prose measure;
alternating `paper` / `surface-alt` section bands with a single `teal` band.

**Motion** — reveal-on-scroll via IntersectionObserver, applied with
`data-reveal`; content is fully visible when JavaScript is unavailable.

**Motifs** — Mandala, PetalDivider, six ServiceIcons and the Mascot, all
monoline SVG coloured through `currentColor`.

**Criteria**

- [x] **D1** — No **authored** style introduces a colour outside the palette above, allowing any alpha variant of a palette colour, plus black, white and `transparent`.
      *Verified 2026-09-19 against the single built stylesheet. Every hex found is a palette colour or an alpha variant of one, with two exceptions, both from the Tailwind Preflight reset and neither authored here: `#e5e7eb` (the default `border-color` on `*`, overridden by an explicit palette colour wherever a border is drawn) and `#9ca3af` (the default `::placeholder` colour, which paints nothing while the enquiry form is unrendered). These two are named here so they are not rediscovered as a defect.*
- [x] **D2** — No page loads a webfont from a third-party origin.
      *Verified 2026-09-19 by scanning all built HTML and CSS for six third-party font and CDN origins. Zero references.*
- [ ] **D3** — No horizontal scrolling at **320px, 768px, 1024px and 1440px** on any page.
      *Not yet verified across all 13 pages — see G6.*
- [x] **D4** — With JavaScript disabled, all page content is visible and the navigation opens and closes.
      *Verified by code inspection: the reveal rule is gated behind a `.js` class that only JavaScript adds, so nothing is hidden without it; the mobile menu is a native `<details>` element.*
- [x] **D5** — With `prefers-reduced-motion: reduce`, no element animates or moves — including hover states and the FAQ chevron.
      *Verified during the audit by measuring the chevron's computed transform with the transition disabled.*
- [x] **D6** — Every decorative SVG carries `aria-hidden`; every meaningful one carries an accessible name.
      *Verified 2026-09-19: 273 `<svg>` elements across the built pages, 0 without `aria-hidden` or an accessible name.*

**Design exclusions** — the five alternative directions in the design deck are
rejected for v1; Temple Tank is the chosen system. No dark mode. No page
transitions. No carousel or slider anywhere.

### 1.3 Optimization

Thresholds are set slightly above the measurements taken at lock, leaving room
for a portrait photograph without breaching the line.

| # | Criterion | Threshold | Measured at lock | Met? |
| --- | --- | --- | --- | --- |
| O1 | Total page weight, home page | ≤ 150 KB | **77 KB** | ✅ |
| O2 | HTTP requests, home page | ≤ 10 | **4** | ✅ |
| O3 | Scripts loaded from a third-party origin | **0** | **0** | ✅ |
| O4 | Requests to any third-party origin | **0** | **0** | ✅ |
| O5 | Console errors on load | **0** | **0** | ✅ |
| O6 | Cumulative Layout Shift, home page | ≤ 0.1 | **0.002** | ✅ |
| O7 | `npm run check` | 0 errors | **0 errors, 0 warnings, 0 hints across 42 files; exit 0** | ✅ |
| O8 | `npm run build` | exits 0 | **14 pages built in 9.07s; exit 0** | ✅ |
| O9 | Every page has a unique `<title>` ≤ 60 characters | all | **all 13 pass** | ✅ |
| O10 | Every page has a meta description ≤ 165 characters | all | **3 fail** (`/` 208, `/privacy/` 175, `/contact/` 166) | ❌ |
| O11 | Every page has a canonical URL and Open Graph tags | all | **all 13 pass** | ✅ |
| O12 | Body text meets WCAG AA contrast (4.5:1) | no failures | **0 failures** on the pages sampled | ⚠️ partial |
| O13 | Security headers present on every response (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) | all four | **all four** | ✅ |

**Lighthouse is deliberately excluded.** There is no Lighthouse tooling in this
environment, so a Lighthouse threshold would be a criterion nobody here can
check — the opposite of falsifiable. O1–O13 are the measurable proxies.

> ⚠️ **Note, not a criterion.** `README.md:5` claims the site *"scores
> 100/100/100/100 on Lighthouse"*. That claim is **unverified** — it predates
> this audit and no run is recorded. Resolving it is G5.

---

## 2. Deployment criterion

- [x] **P1** — The site responds **HTTP 200** at **https://acharya-amit-puri.pages.dev**.
      *Verified 2026-09-19.*
- [x] **P2** — A push to `main` rebuilds and redeploys without manual intervention.
      *Verified: the Cloudflare Pages project is Git-connected and has deployed from `main` unattended.*

A custom domain is **not** required for v1. Moving to one is an extra.

---

## 3. Completion authority

This is **client work**. The client is **Acharya Amit Puri**.

v1 is complete only when the client has accepted. This freeze is **PROVISIONAL**;
it becomes final when acceptance is recorded below with a date and how it was
given. The plain-language checklist to send is `ACCEPTANCE-CHECKLIST.md`.

**Acceptance recorded:** _not yet_
**Date:** _—_
**How it was given:** _—_

---

## 4. Explicitly out of scope

Everything below was considered, suggested, or partially built and is **NOT**
part of v1. Any of it may be revisited only after the word UNFREEZE.

**Content** — portrait photograph · testimonials · published articles · price
list · online booking or payment · multi-language · newsletter · case studies.

**Design** — the five alternative design directions · dark mode · page
transitions · carousels · a redesign of any kind · further mascot revisions.

**Features** — a CMS · search · a client portal · analytics of any kind ·
cookie consent (nothing sets a cookie) · live chat · an appointment calendar.

**SEO and marketing** — Google Search Console submission · Google Business
Profile · backlink work · paid advertising · any keyword work beyond what ships.

**Infrastructure** — custom domain · email hosting · a staging environment ·
CI beyond the existing auto-deploy · automated tests · Lighthouse CI.

**Working documents to be removed before v1** — `/design-options` and
`/mascot-preview` (G1 and G2 below).

---

## 5. Gap to finish line

This is the **only** remaining work in scope. Every unticked box above appears
here, and nothing else does.

- [ ] **G1 — Remove the design-options page and its source entirely.**
  Delete `src/pages/design-options.astro`, `src/lib/deck.ts`,
  `design-options/` (deck, generator, README), and every reference in
  `README.md` and `Header.astro`'s comment. Confirmed live at 200 on
  2026-09-19, so it is currently reachable by anyone with the URL.
  **VERIFIED when:** `/design-options` returns 404 on the live site and
  `grep -ri "design-options"` finds nothing outside git history.
  *The deck remains recoverable from git history.*

- [ ] **G2 — Remove the mascot preview workbench.**
  Delete `src/pages/mascot-preview/`. It is already absent from production —
  `/mascot-preview/` returned 404 live on 2026-09-19, because its
  `getStaticPaths` returns `[]` outside dev — so this is source hygiene, not a
  live leak. **VERIFIED when:** the directory is gone and `npm run build` still
  produces every route in §1.1.

- [ ] **G3 — Bring three meta descriptions under 165 characters.**
  `/` (208), `/privacy/` (175), `/contact/` (166). **VERIFIED when:** every
  page measures ≤ 165 with HTML entities decoded. *(Criterion O10.)*

- [ ] **G4 — Confirm WCAG AA contrast across all 13 pages.**
  Measured on a sample only, with zero failures. **VERIFIED when:** every page
  is measured and reports zero failures. *(Criterion O12.)*

- [ ] **G5 — Resolve the README's unverified Lighthouse claim.**
  Verify it, soften it, or remove it. **VERIFIED when:** `README.md` makes no
  performance claim that is not backed by a recorded measurement.

- [ ] **G6 — Confirm no horizontal scrolling at the four responsive widths.**
  **VERIFIED when:** all 13 pages are loaded at 320, 768, 1024 and 1440px and
  none reports a document scroll width greater than its viewport width.
  *(Criterion D3.)*

Five of these six are removals, corrections or verification passes.
**No new features remain in scope.**

---

## 6. Recording mechanism

1. **`FINISH-LINE.md`** in the repo root — this document, the single source of truth.
2. **`BACKLOG.md`** in the repo root — one line per extra: date, description, source.
3. **`CLAUDE.md`** in the repo root — carries the post-freeze routing rule so every future session inherits the freeze without being told.
4. **Annotated git tag `v1.0`** on the freeze commit.

*Why:* the repo had no `CLAUDE.md`, so the routing rule would have been lost the
moment the audit session ended — that file is what makes the freeze survive. The
tag gives a permanent, unambiguous marker of the commit the line was drawn at,
which a document alone cannot provide.

**Note on the tag:** `v1.0` marks the **freeze commit** — where the line was
drawn — not a shipped release. v1 ships when §5 is empty and acceptance is
recorded in §3.

---

*Discovery for this document was carried out against commit `29fceb6`.
Measurements were taken from the live site and a clean local build.
Locked 2026-09-19.*
