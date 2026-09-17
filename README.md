# Acharya Amit Puri — Website

A fast, calm, accessible website for **Acharya Amit Puri** (Vastu · Vedic
Astrology · Numerology · Prakriti · Palmistry), built with **Astro** +
**Tailwind CSS**. Ships almost no JavaScript, scores **100/100/100/100** on
Lighthouse, and is edited from one simple config file.

---

## ✏️ Editing the website (no coding needed)

- **All text, contact details, services, and SEO** live in one file:
  **`src/data/site.ts`** — change a value, it updates everywhere.
- **[CONTENT.md](CONTENT.md)** is your friendly fill-in checklist for every
  placeholder (phone, email, bio, testimonials, form key, etc.).
- To find anything not yet filled in, search the project for `{{`.

---

## 🧑‍💻 Running it on your computer

### 1. Install Node.js (one time)

You need **Node.js 18 or newer** → <https://nodejs.org> (the "LTS" version).

> **Windows note:** if a command below says `node`/`npm` is *“not recognized”*,
> Node isn't on your PATH. Quickest fix — close and reopen your terminal after
> installing. If it still fails, run this once in **PowerShell** (adjust the path
> if Node is elsewhere):
> ```powershell
> $env:Path = "C:\Program Files\nodejs;" + $env:Path
> ```

### 2. Install the project's dependencies (one time)

```bash
npm install
```

### 3. Start the development server (live preview while editing)

```bash
npm run dev
```

Then open **http://localhost:4321** — the site reloads automatically as you edit.
Press `Ctrl + C` to stop it.

### 4. Build & preview the production site

```bash
npm run build      # outputs the finished site into  dist/
npm run preview    # serves the built site at http://localhost:4321
```

> On Windows, stop any running `npm run dev`/`preview` **before** `npm run build`
> (a running server can lock the `dist/` folder).

### Other useful commands

```bash
npm run check                      # type-check (should report 0 errors)
node scripts/generate-assets.mjs   # regenerate favicon + share image from the palette
```

---

## 📁 Project structure (quick map)

```
src/
  data/site.ts          ← EDIT THIS: all content, contacts, services, SEO
  pages/                ← the pages (home, about, services, contact, 404, robots.txt)
    services/[slug].astro  ← one detail page per service (auto-generated)
  components/           ← reusable UI (header, footer, cards, motifs…)
  layouts/BaseLayout    ← shared shell + SEO/structured data
  content/articles/     ← optional: add Markdown articles here later
  styles/global.css     ← design tokens / base styles
public/                 ← favicon, icons, og-image (+ your future photos)
  _headers              ← caching + security headers (Cloudflare & Netlify)
  design-options/       ← the five design directions, published unlisted
astro.config.mjs        ← the site address (SITE_URL)
netlify.toml            ← Netlify build config (kept; ignored by Cloudflare)
design-options/         ← generator + notes for the five design directions
```

---
## 🚀 Deploying on the internet (Cloudflare Pages)

**Host: [Cloudflare Pages](https://pages.cloudflare.com).** Permanently free —
not a trial — with no credit system, no card required, automatic HTTPS, and a
global CDN. It rebuilds and redeploys every time you push to GitHub.

The site is a plain static build, so it is not tied to any one host. The
`public/_headers` file (caching + security headers) is read by Cloudflare Pages
and Netlify alike, and `netlify.toml` is kept in the repo so moving back to
Netlify needs no work.

### Step 1 — Put the code on GitHub

1. Create a new **empty** repository at <https://github.com/new>
   (do **not** tick "Add a README").
2. Connect it and push:

```bash
git remote add origin git@github.com:YOUR-USERNAME/acharya-amit-puri.git
git push -u origin main
```

> Later, whenever you change content:
> `git add -A && git commit -m "Update content" && git push`
> — the site rebuilds and redeploys within about a minute.

### Step 2 — Connect the repo to Cloudflare Pages

1. Log in at <https://dash.cloudflare.com> → **Compute (Workers & Pages)** →
   **Create** → **Pages** → **Connect to Git**.
2. Authorise GitHub and pick your `acharya-amit-puri` repository.
3. Set the build configuration:

   | Setting | Value |
   | --- | --- |
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

4. Under **Environment variables**, add `NODE_VERSION` = `22`.
   *(Cloudflare's default Node is older than Astro 5 needs.)*
5. Click **Save and Deploy**.

### Step 3 — Check the address matches

The project name decides the address. A project called `acharya-amit-puri`
is served at **`https://acharya-amit-puri.pages.dev`**, which is what
`SITE_URL` in `astro.config.mjs` is set to.

> ⚠️ **If you used a different project name**, change `SITE_URL` to match, then
> commit and push — otherwise the canonical links, sitemap and social share
> image will all point at the wrong address.

### Deploying straight from your computer (no GitHub needed)

The site is currently published this way. It uploads the built folder directly:

```bash
npm run build
npx wrangler pages deploy dist --project-name acharya-amit-puri --branch main
```

The first time on a new machine you will be asked to sign in with
`npx wrangler login`.

> ⚠️ **This does not auto-deploy.** Pushing to GitHub will *not* update the live
> site — you must run the command above after every change. To get automatic
> deploys instead, do Step 2 above (Connect to Git) once, and from then on a
> `git push` is all that is needed.

### Step 4 — Connect a custom domain (when you buy one)

1. **Tell the site its address:** set `SITE_URL` in `astro.config.mjs` to the
   real domain (e.g. `https://www.acharyaamitpuri.com`), commit and push.
2. In Cloudflare Pages → your project → **Custom domains** → **Set up a
   domain**.

   - **Easiest path:** if the domain's nameservers point to Cloudflare (free —
     add it under *Websites* and update the nameservers at your registrar),
     the DNS records are created for you.
   - **Keeping DNS at your registrar:** add a **`CNAME`** — name `www`, target
     `acharya-amit-puri.pages.dev`. For the bare domain use your registrar's
     `ALIAS`/`ANAME`/CNAME-flattening to the same target, or redirect it to
     `www`.

3. **HTTPS** is issued automatically within a few minutes.

### What ships with the repo

- **`public/_headers`** — caching (hashed assets for a year, HTML always
  revalidated) and security headers (CSP, `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`). Read by
  Cloudflare Pages *and* Netlify.
- **`netlify.toml`** — the same settings in Netlify's own format, plus its
  build configuration. Ignored by Cloudflare; harmless to keep.
- **404** — `src/pages/404.astro` builds to `dist/404.html`, which both hosts
  serve for unknown URLs automatically.
- **`/design-options/`** — the five home-page design directions, published with
  the site but `noindex` and unlinked. See `design-options/README.md`.

### Alternative free hosts (same idea)

- **Netlify** — Import from GitHub; `netlify.toml` configures everything.
  Note its free plan is credit-based and blocks deploys once the monthly
  credits run out.
- **Vercel** — Add New Project → import repo → framework preset **Astro**.

---

## ✅ Pre-launch checklist

Everything below is tracked in **CONTENT.md**. Items marked **required** must be
done before handing the site to the client.

**Required**

- [ ] `{{PHONE}}` — phone number (`src/data/site.ts`)
- [ ] `{{WHATSAPP}}` — WhatsApp number, digits only (`src/data/site.ts`)
- [ ] `{{EMAIL}}` — email address (`src/data/site.ts`)
- [ ] `{{LOCATION}}` — city, state, country (`src/data/site.ts`)
- [ ] `{{ABOUT_BIO}}` — the Acharya's biography (`src/data/site.ts`)
- [ ] `{{FORM_KEY}}` — free [Web3Forms](https://web3forms.com) key, or the
      contact form stays hidden (`src/data/site.ts`)

**Recommended**

- [ ] `{{YEARS_EXPERIENCE}}` and `{{CLIENTS_SERVED}}` — the stat counters stay
      hidden until filled
- [ ] A portrait photo of the Acharya (a mandala placeholder shows until then)
- [ ] Real, consented testimonials — **never invent these**
- [ ] Social links (`{{INSTAGRAM}}`, `{{FACEBOOK}}`, `{{YOUTUBE}}`)
- [ ] Set `SITE_URL` in `astro.config.mjs` once the real domain is bought

**Before every deploy**

- [ ] `npm run check` reports 0 errors
- [ ] `npm run build` passes
- [ ] `git push` — Netlify does the rest

> **Nothing half-finished is shown to visitors.** Any value still left as a
> `{{PLACEHOLDER}}` is detected and its section is hidden automatically, so the
> site always reads as complete.
