# CONTENT — Your Fill-In Guide

This is your **one place** to understand and fill in everything editable on the
website. You do not need to be a developer to use it.

Everything personal/contact-related is a **placeholder** written like
`{{THIS}}`. The website already works with the placeholders in place — they
simply show as obvious tokens until you replace them with real values.

> **The Acharya's name (`Acharya Amit Puri`) and the six services are final and
> already filled in.** Everything else below is for you to provide.

---

## 1. The only file you usually edit

> **`src/data/site.ts`**

Open that file, find the value inside quotes, and replace it. Change it once and
it updates **everywhere** on the site — header, footer, contact page, SEO tags,
WhatsApp button, all of it.

How to edit safely:

- Only change the text **inside the quotation marks** `"..."`.
- Keep the quotation marks and the comma at the end of the line.
- Save the file. (When the site is running, it refreshes automatically.)

A couple of values live elsewhere — they're noted in the checklist below.

---

## 2. Fill-in checklist

Tick these off as you go. "Example" shows the format expected — not a real value.

### Contact details — _required_

| Placeholder         | What it is                                   | Example                          | Done |
| ------------------- | -------------------------------------------- | -------------------------------- | :--: |
| `{{PHONE}}`         | Phone number for display + tap-to-call       | `+91 98765 43210`                |  ☐   |
| `{{WHATSAPP}}`      | WhatsApp number, **digits only, no + or spaces**, with country code | `919876543210`                   |  ☐   |
| `{{EMAIL}}`         | Email for tap-to-email + form submissions    | `amit@example.com`               |  ☐   |
| `{{LOCATION}}`      | City, State, Country                         | `Pune, Maharashtra, India`       |  ☐   |

### About / Meet the Acharya — _required_

| Placeholder            | What it is                                              | Example                | Done |
| ---------------------- | ------------------------------------------------------- | ---------------------- | :--: |
| `{{ABOUT_BIO}}`        | A few paragraphs on background, experience, philosophy. Separate paragraphs with a blank line. **Stay authentic — no overstated claims.** | _2–3 short paragraphs_ |  ☐   |
| `{{YEARS_EXPERIENCE}}` | Years of practice (number/text)                         | `15+`                  |  ☐   |
| `{{CLIENTS_SERVED}}`   | People guided (number/text)                             | `2,000+`               |  ☐   |

### Social links — _optional (any left as a placeholder is hidden automatically)_

| Placeholder       | What it is                | Example                          | Done |
| ----------------- | ------------------------- | -------------------------------- | :--: |
| `{{INSTAGRAM}}`   | Full Instagram URL        | `https://instagram.com/handle`   |  ☐   |
| `{{FACEBOOK}}`    | Full Facebook URL         | `https://facebook.com/page`      |  ☐   |
| `{{YOUTUBE}}`     | Full YouTube URL          | `https://youtube.com/@channel`   |  ☐   |

### Testimonials — _optional (leave as placeholders to hide the section)_

> **Only add real quotes from real people who have agreed to be quoted.** Never
> invent testimonials.

| Placeholder              | What it is             | Done |
| ------------------------ | ---------------------- | :--: |
| `{{TESTIMONIAL_1}}`      | First quote            |  ☐   |
| `{{TESTIMONIAL_1_NAME}}` | First person's name    |  ☐   |
| `{{TESTIMONIAL_2}}`      | Second quote           |  ☐   |
| `{{TESTIMONIAL_2_NAME}}` | Second person's name   |  ☐   |
| `{{TESTIMONIAL_3}}`      | Third quote            |  ☐   |
| `{{TESTIMONIAL_3_NAME}}` | Third person's name    |  ☐   |

### Contact form & website address — _needed before the form works / before launch_

| Placeholder    | What it is                                                                 | Where        | Done |
| -------------- | -------------------------------------------------------------------------- | ------------ | :--: |
| `{{FORM_KEY}}` | Free access key from [web3forms.com](https://web3forms.com) so the contact form can email you | `src/data/site.ts` |  ☐   |
| `SITE_URL`     | The site address (used for SEO links). Currently the free Cloudflare Pages address `https://acharya-amit-puri.pages.dev`. Change it once a real domain is bought | `astro.config.mjs` |  ☑   |

### Activating the contact form (Web3Forms — free, no server needed)

1. Go to [web3forms.com](https://web3forms.com) and enter **the email address where you want enquiries delivered** (use your real `{{EMAIL}}`). They email you an **Access Key** instantly.
2. Open `src/data/site.ts`, find `form: { accessKey: "{{FORM_KEY}}" }`, and paste the key between the quotes.
3. That's it — submissions now arrive at the email you registered. The form appears on the Contact page automatically once the key is in place.

> **Until the key is added, the form is not shown at all.** A form without a key
> would accept a message and silently throw it away, so a short, calm note
> stands in its place instead. Nothing looks broken to a visitor.

> Note: the form delivers to the email tied to your Web3Forms key (step 1), **not** to the `{{EMAIL}}` shown on the page. Use the same address for both so everything is consistent.

---

## 3. Editable wording (refine any time)

These are **already written** for you in a calm, respectful tone. They are not
placeholders, but you are free to polish the wording. All of it lives in
`src/data/site.ts`:

- **Hero line** (`heroValueLine`) and role line (`role`)
- **The six service descriptions** — each has a short summary, "what it is",
  "who it's for", and "what you receive". _(Names & taglines are final.)_
- **"How a consultation works"** steps (`process`)
- **Frequently asked questions** (`faqs`) — shown on the Home page and used for
  FAQ rich-results in Google. Refine the wording or add/remove questions freely.
- **SEO title & description** (`seo`)

### Publishing articles (optional)

The site has a blog-style **Articles** section (linked in the footer, at
`/articles`). To publish a piece **without touching code**, add a Markdown file
to `src/content/articles/` — copy `welcome.md` as a template, fill in the
`title`, `description`, and `pubDate`, set `draft: false`, and write your text
below the dashes. It appears on the Articles page automatically. (A hidden draft
sample is included to show the format.)

---

## 4. The six services (final)

1. **Vastu Report** — Space & Energy Analysis
2. **Astro Advice** — Vedic Birth Chart Reading
3. **Numero Advice** — Name & Number Alignment
4. **Prakriti Advice** — Know Your Natural Energy
5. **Design Advice** — Horoscope-Based Home Design
6. **Palmistry Advice** — Palm & Astrology Guidance

---

## 5. Pages (all built ✓)

| Page             | Route                  | Notes                                            |
| ---------------- | ---------------------- | ------------------------------------------------ |
| Home             | `/`                    | Hero, services, about preview, process, contact  |
| About            | `/about`               | "Meet the Acharya" — uses `{{ABOUT_BIO}}`        |
| Services         | `/services`            | Overview of all six                              |
| Service detail   | `/services/<slug>`     | One page per service (6 in total)                |
| Contact          | `/contact`             | Form + WhatsApp + tap-to-call/email              |
| Not found        | `/404`                 | Shown automatically for any unknown address      |
| Articles         | `/articles`            | Blog-style list (footer link); add Markdown files |
| Article          | `/articles/<slug>`     | One page per published Markdown article          |

Service detail routes:
`/services/vastu-report`, `/services/astro-advice`, `/services/numero-advice`,
`/services/prakriti-advice`, `/services/design-advice`, `/services/palmistry-advice`

---

## 6. Images to swap later

| File (in `/public`)    | What it is                       | How to swap                     |
| ---------------------- | -------------------------------- | ------------------------------- |
| `favicon.svg`          | Browser tab icon (mandala mark)  | Replace the file, keep the name |
| `favicon-32.png`       | PNG fallback tab icon            | Replace the file, keep the name |
| `apple-touch-icon.png` | Home-screen icon (iOS)           | Replace the file, keep the name |
| `og-image.png`         | Social-share preview (1200×630)  | Replace the file, keep the name |
| _(portrait)_           | Photo of the Acharya             | See note below                  |

The mandala icons + share image are generated from the brand palette by a small
script. After changing colours or the wordmark, regenerate them with:

```
node scripts/generate-assets.mjs
```

**Adding the Acharya's photo (optional):** drop a portrait image into `/public`
(e.g. `public/acharya.jpg`) and tell me — I'll wire it into the About and Home
sections with automatic WebP conversion and correct sizing. Until then a tasteful
placeholder is shown.

---

## 7. Ground rules (please keep)

- **Never fabricate** testimonials, credentials, years of experience, or
  guarantees. Keep them as placeholders until you have real, accurate values.
- Keep the tone **respectful, calm, and authentic** — no fear-based or
  sensational claims.
- To find every remaining placeholder at a glance, search the project for: `{{`

---

## 8. Quick reference

- **Edit text/contact:** `src/data/site.ts`
- **This checklist:** `CONTENT.md`
- **Find all unfilled placeholders:** search the project for `{{`
