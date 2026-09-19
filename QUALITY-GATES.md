# QUALITY GATES — v1

**Approved:** 2026-09-20 · **Fix loop completed:** 2026-09-20 · **Thresholds: final**
**Intent:** `INTENT-BRIEF.md` · **Scope:** `FINISH-LINE.md`, amendment authorised by `UNFREEZE FOR QUALITY`
**Quality status:** **PROVISIONAL — Stage 1 incomplete.** Two gates still fail and one is partial; all three need a decision from the reviewer before Stage 1 can be signed. See *Stage 1* at the foot of this document.

Every CURRENT value below was measured on 2026-09-20 against the production
build in `dist/`, served locally, at 320 / 375 / 768 / 1024 / 1280 / 1440px.
Evidence: `review/` (78 page captures), `review/gate3/` (squint, greyscale and
thumbnail derivatives), and the reproducible harnesses `review/_gates-probe.mjs`,
`review/_gate3.mjs`, `review/_verify2.mjs`, `review/_final.mjs`.

> **Intent, restated, because every gate serves it:** urban Indian professionals
> facing a decision that will not settle. **Warm · Grounded · Approachable.**
> Never **intimidating · corporate · esoteric**.

---

## Scorecard

| Gate | Area | Before fixes | After fixes | Status |
| --- | --- | --- | --- | --- |
| 1 | Intent alignment | above-fold action on 1 of 7 mobile pages; hero addressed homeowners | action on **13 of 13**; hero addresses the decision | ✅ **PASS** |
| 2 | Visual system coherence | 13 sizes / 22 combinations | **8 sizes / 13 combinations** (caps 8 / 14) | ✅ **PASS** |
| 3 | Hierarchy | squint on target 6 of 14 | squint on target **9 of 14** (threshold 90%) | ❌ **FAIL** |
| 4 | Distinctiveness | mascot on 2 of 13 pages | mascot on **12 of 13**, mobile parity | ⚠️ **PARTIAL** |
| 5 | Imagery | 0 `<img>`, one SVG style | unchanged | ✅ **PASS** |
| 6 | Motion | 32 controls without hover; panels snapped | **1** documented exception; panels animate at 0.3s | ✅ **PASS** |
| 7 | Typography craft | 14px body, 11 orphans | 16px+ body, **0 orphans**; measure band still missed | ❌ **FAIL** |
| 8 | 5-second test | — | — | ⏳ **NOT MEASURED** |
| 9 | Behavioural | — | — | ⏳ **NOT MEASURED** |
| 10 | Accessibility floor | 0 failures | **1,622 elements, 0 failures** | ✅ **PASS** |

**5 passing · 2 failing · 1 partial · 0 waived · 2 not measurable yet.**

---

## Gate 1 — Intent alignment ✅

- **1a — Hero communicates the core message.** The home hero now reads *"People come to me when a decision will not settle — a job offer, a marriage, the right time to move. We talk it through, with your chart as a starting point, not a verdict."* `/about/` no longer repeats it: distinct `<h1>` ("Meet Acharya Amit Puri") and its own subtitle. VERIFIED. **PASS.**
- **1b — Primary action above the fold on every viewport.** `PageHero` now carries a primary action, so all 13 pages offer one at 375 / 768 / 1280. Previously 1 of 7 at 375px. VERIFIED. **PASS.**
- **1c — No element evokes an anti-adjective.**

| Anti-adjective | Element most at risk | Verdict |
| --- | --- | --- |
| **Corporate** | body copy was 14px on all 13 pages; now **≥16px everywhere** | **PASS** |
| **Intimidating** | the bare-name `<h1>` and third-person copy; hero now speaks in the first person and invites | **PASS** |
| **Esoteric** | Sanskrit service names carry plain-language subtitles | **PASS** |

---

## Gate 2 — Visual system coherence ✅

- **2a — Colour.** DEFERS TO **D1**. 11 tokens, every rendered colour maps to one. **PASS.**
- **2b — Typefaces.** ≤2 families. Marcellus + Inter Variable. **PASS.**
- **2c — Type scale.** THRESHOLD: ≤8 rendered sizes, each on ≥2 pages; ≤14 size/weight/line-height combinations.
  CURRENT: **8 sizes — 12, 14, 16, 18, 24, 30, 36, 48px** — none used on fewer than two pages, and **13 combinations**. Down from 13 sizes and 22 combinations. All four arbitrary type utilities (`text-[10px]`, `text-[11px]`, `text-[2.7rem]`, `leading-[1.08]`) are gone, and every heading now takes exactly one line-height per size. VERIFIED. **PASS.**
- **2d — Spacing and radius.** 3 radii, spacing from the Tailwind scale. **PASS.**

---

## Gate 3 — Hierarchy ❌

- **3a — Squint test.** THRESHOLD: dominant region lands on the `<h1>` or the primary action on ≥90% of views.
  CURRENT: **9 of 14 (64%)**, up from 6. At 375px, **6 of 7** now land on the primary action. At 1280px the dominant mass has moved out of the header's corner button and into the hero, but on 4 of 7 pages it settles *between* the headline and the mascot rather than on either.
  **STATUS: FAIL** — and see *Decision 1*: the mascot added for Gate 4 is part of what pulls the centroid off the headline. These two gates are in tension.
- **3b — Greyscale test.** With "primary action" defined as the largest filled control in the fold, it ranks 1st on **10 of 14** views. In all four exceptions the top-ranked control is itself an enquiry action ("Book a Consultation" or "Start your enquiry") — **no decorative or secondary element out-ranks a call to action on any view.** VERIFIED.
- **3c — Thumbnail test.** `<h1>` cap-height at 20%: **5.0px at 375, 6.7px at 1280**, floor 5px. **PASS**, marginal on mobile.

---

## Gate 4 — Distinctiveness ⚠️

- **4a — Signature motif on every page.** Mandala visible on **13/13**. **PASS.**
- **4b — The mascot.** THRESHOLD: renders at 375 wherever it renders at 1280; appears on ≥6 of 13 pages.
  CURRENT: **12 of 13 pages** (all but `/404`), with **mobile parity** — the `hidden lg:block` is gone from the hero and `PageHero` carries the `mark` variant. Was 2 of 13. VERIFIED. **PASS.**
- **4c — Logo-cover test.** Mandala, Marcellus-on-cream, petal divider, and now the mascot on nearly every page. **PASS.**
- **4d — Template-likeness.** The three-across bordered service cards with icon and "Explore →" still read as a generic Tailwind marketing grid. The palette, Marcellus and the mascot are what distinguish it. **PARTIAL** — see *Decision 3*.
- **4e — Benchmark distance.** One thing this site does that each benchmark does not — restrained non-figurative sacred motifs (vs wizardzines), a six-service taxonomy with per-service icons (vs jessicahische), a stated five-step consultation process (vs oliverburkeman). **PASS.**

---

## Gate 5 — Imagery ✅

Policy: illustration only for v1. **0 `<img>` elements**; 231 SVGs in one monoline style, all `currentColor`; largest raster is `og-image.png` at 83 KB, social-share only, never rendered. Weight defers to **O1** (77 KB). Unchanged by the fix loop. **PASS.**

---

## Gate 6 — Motion ✅

- **6a — Scroll reveals.** All `[data-reveal]` elements reveal; `.js`-gated so content shows without JavaScript. **PASS.**
- **6b — Hover states.** Was 32 distinct controls without a hover rule; now **1**.
  **Intentional exception, recorded:** the skip link. It is a 1×1 clipped element that only becomes visible on focus, so a hover state would never be seen. **PASS.**
- **6c — Focus states.** Global `:focus-visible` — universal coverage. **PASS.**
- **6d — State transitions.** Both the FAQ panels and the mobile menu now animate: `::details-content` transitions `block-size` over **0.3s** under `@supports (interpolate-size: allow-keywords)`, measured 0px closed → 98px open. Where the feature is unsupported the panels snap exactly as before, so this cannot break the disclosure. The chevron continues to rotate 0.3s to `matrix(-1,0,0,-1,0,0)`. **PASS.**
- **6e — Quality bounds.** Durations 0.15 / 0.2 / 0.3s micro and 0.7s reveals; no `linear`; reduced motion respected (**D5**); CLS defers to **O6**. **PASS.**

---

## Gate 7 — Typography craft ❌

- **7a — Body ≥16px on mobile.** Was 14px on all 13 pages, and 14px-only on `/services/`. Now **≥16px on every page**. VERIFIED. **PASS.**
- **7b — Line measure: body 45–80 characters; no heading line over 40.**
  Headings: max **26 / 34 / 34** characters at 375 / 768 / 1280 — **PASS**.
  Body: **26–50** at 375px and **25–93** at 1280px — **FAIL at both bounds.** See *Decision 2*; the lower bound cannot be satisfied at 375px by arithmetic.
- **7c — Orphans.** Was 11 at 375px; now **0 at all three viewports**, via `text-wrap: balance` on headings plus two copy changes. VERIFIED. **PASS.**
- **7d — Line-height.** Body 1.63. **PASS.**
- **7e — Contrast.** DEFERS TO **O12**. **PASS.**

---

## Gate 8 — Perceptual proxy: the 5-second test ⏳

**You run this.** Show `review/home--fold-375.jpg` and `review/home--fold-1280.jpg` to 3 people unfamiliar with the project, 5 seconds each: *What is this site? Who is it for? What would you click?* PASS if ≥2 of 3 answer all three correctly. Record the answers here.

*Note: unlike at the last audit, every page now has something to click above the fold, so question three has a correct answer on any page you test.*

**CURRENT: NOT MEASURED.**

---

## Gate 9 — Behavioural metrics ⏳

Cloudflare Web Analytics, approved in Phase B, **not yet installed**. Thresholds (provisional — no baseline traffic exists for this site or sector): median time on page ≥45s · ≥40% of home sessions reach 50% scroll depth · ≥15% returning visitors after 30 days · bounce ≤70%.

**Never blocks LOCK.** Recorded in `FINISH-LINE.md` §4 as post-launch verification.

> **Before launch:** the privacy page states *"No cookies, no analytics, no tracking."* That sentence becomes **false** the day analytics is installed. A privacy amendment ships with it.

---

## Gate 10 — Accessibility floor ✅ *(not adjustable)*

| Check | Current |
| --- | --- |
| WCAG AA contrast | **1,622 text elements across 13 pages × 2 viewports, 0 failures** |
| Visible focus | global `:focus-visible`, 2px teal, 2px offset |
| Keyboard navigable | all controls are real `<a>` / `<button>` / `<summary>` |
| Alt text | no `<img>` exists; 231 SVGs, 0 unlabelled |
| No flashing >3Hz | none exists |
| Target size | AA (24px) met; the menu toggle was raised 40→44px. 25 targets remain under the 44px comfort guideline at 375px, mostly menu-panel links at 40px |

**PASS.**

---

## Waivers

**None.** A gate may be waived only by the reviewer, in writing, with a one-line reason recorded here. A waived gate is listed separately and is not a passed gate.

---

## Stage 1 — Claude Code self-review: **NOT SIGNED**

Stage 1 passes only when every gate is PASS or WAIVED, Gate 9 exempt. **Gates 3 and 7 fail and Gate 4 is partial**, so I am not signing it. Three decisions are yours.

### Decision 1 — Gate 3a, squint (currently 9 of 14, threshold 90%)

The two things this gate wants are in genuine tension with Gate 4. Bringing the mascot onto every page gave the brand its distinctive figure back — and that figure now pulls the blurred centre of mass away from the headline on four desktop pages. Options:

- **Reduce the mascot on inner pages** — helps 3a, works against 4b.
- **Reword 3a** to "the centroid falls within the hero region" rather than exactly on the `<h1>` or CTA rectangle. Still falsifiable, and arguably what the squint test is actually for.
- **Waive 3a**, recording the reason.

### Decision 2 — Gate 7b, body measure (45–80 characters)

**The 45-character floor cannot be met at 375px.** A 343px column at 16px yields about 43 characters maximum, so every paragraph on every page fails by arithmetic, not by design — the same class of problem as the 40–70 headline band I reworded before you approved the gates. I did not move this one myself because it was already approved.

The 80-character ceiling is missed too: the widest lines are 93 characters, because the site's recorded **68ch** prose measure resolves to roughly 81–93 actual characters in Inter (`ch` is the width of "0", which is wider than the average letter). Options:

- **Scope the floor to ≥768px** and keep the 80 ceiling everywhere. Nothing else changes.
- **Narrow the prose token from 68ch to about 60ch** to meet the ceiling — but that edits a value recorded in `FINISH-LINE.md` §1.2, so it needs your say-so.
- **Widen the band** to something both achievable and meaningful.

### Decision 3 — Gate 4d, template-likeness

Still partial. The service-card grid reads as a stock Tailwind marketing layout; the palette and mascot carry the distinctiveness. Making the cards genuinely distinctive is a design change of real size — worth doing deliberately, not squeezed into a fix loop.

### Anti-adjective statement

Required by Stage 1, given here so it is on record even though the stage is unsigned:

- **Intimidating** — the site no longer opens with a bare name and third-person description. The hero speaks in the first person about an ordinary difficulty, and every page offers a low-commitment action.
- **Corporate** — the smallest body text was 14px and is now 16px minimum; the type scale is eight steps of a warm serif-and-sans pairing, not a dense UI scale; there is no stock photography and no third-party script.
- **Esoteric** — every Sanskrit term carries a plain-language subtitle, the consultation process is stated in five numbered steps, and the FAQ answers the practical questions a sceptical reader asks first.

---

## Measurement corrections made during this work

Recorded because several changed conclusions:

1. **Scroll-reveal capture** — a 90ms scroll step outran the IntersectionObserver; the first 39 screenshots had three blank bands. Re-captured with a settle poll.
2. **Stylesheet walker** — Chrome exposes `.cssRules` on `CSSStyleRule` for CSS nesting, so the walker recursed past every selector and reported **zero** hover rules site-wide. Corrected to 24.
3. **FAQ chevron** — first read as `0s` because `querySelector("details")` returned the mobile menu's hamburger. Correctly targeted, it always animated. The chevron was never the defect; the panel was.
4. **Closed-menu contamination** — the mobile menu's links keep a layout box while `<details>` is closed, so they counted as above-fold actions and polluted the greyscale ranking. Excluded. This correction is what exposed the real Gate 1b failure.
5. **Mascot counting** — DOM presence rather than visibility. Corrected; this produced the 4b finding.
6. **Type-scale counting** — text inside `<script>` tags and `.sr-only` elements was counted as rendered type, inflating the combination count by two phantom entries. Excluded.
