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
astro.config.mjs        ← the site address (SITE_URL)
netlify.toml            ← how Netlify builds & serves it (no need to edit)
```

---
## 🚀 Deploying on the internet (Netlify)

**Host: [Netlify](https://www.netlify.com) — free tier.** Automatic HTTPS, a
global CDN, and a fresh deploy every time you push to GitHub. The build
settings are already committed in **`netlify.toml`**, so Netlify configures
itself — you never type a build command.

### Step 1 — Put the code on GitHub

1. Create a new **empty** repository at <https://github.com/new>
   (name it e.g. `acharya-amit-puri`; do **not** tick "Add a README").
2. Connect it and push:

```bash
git remote add origin git@github.com:YOUR-USERNAME/acharya-amit-puri.git
git push -u origin main
```

> Later, whenever you change content:
> `git add -A && git commit -m "Update content" && git push`
> — Netlify rebuilds and redeploys within about a minute.

### Step 2 — Connect the repo to Netlify

1. Log in at <https://app.netlify.com> → **Add new site** → **Import an
   existing project** → **GitHub**.
2. Authorise Netlify and pick your `acharya-amit-puri` repository.
3. The build settings are read from `netlify.toml` automatically:

   | Setting | Value | Where it comes from |
   | --- | --- | --- |
   | Build command | `npm run build` | `netlify.toml` |
   | Publish directory | `dist` | `netlify.toml` |
   | Node version | `22` | `netlify.toml` |

4. Click **Deploy**. In a minute or two the site is live with HTTPS already on.

### Step 3 — Set the site name

Netlify assigns a random address like `spontaneous-tanuki-4f2a1c.netlify.app`.
Change it under **Site configuration → Site details → Change site name** to:

```
acharya-amit-puri
```

giving you **`https://acharya-amit-puri.netlify.app`**.

> ⚠️ **This must match `SITE_URL` in `astro.config.mjs`.** If you pick a
> different site name, change that one line to match, then commit and push —
> otherwise the canonical links, sitemap and share image will point at the
> wrong address.

### Step 4 — Connect a custom domain (when you buy one)

1. **Tell the site its address:** open `astro.config.mjs` and set `SITE_URL`
   to the real domain (e.g. `https://www.acharyaamitpuri.com`), then commit
   and push. This keeps canonical links, the sitemap, robots.txt and the share
   image correct.
2. In Netlify → your site → **Domain management** → **Add a domain**, enter the
   domain and follow the prompts.

   - **Easiest path:** let Netlify handle DNS — point your registrar's
     nameservers at the ones Netlify shows you. Records are then created for you.
   - **Keeping DNS at your registrar:** add a **`CNAME`** record — name `www`,
     target `acharya-amit-puri.netlify.app`. For the bare/apex domain, use your
     registrar's `ALIAS`/`ANAME`/CNAME-flattening to the same target, or
     redirect the apex to `www`.

3. **HTTPS** is issued automatically (free Let's Encrypt certificate) within a
   few minutes — no action needed.

### What `netlify.toml` already handles for you

- **Build** — command, publish folder, and a pinned Node 22.
- **Caching** — hashed assets cached for a year; HTML always revalidated, so
  edits appear immediately.
- **Security headers** — CSP, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`.
- **404** — `src/pages/404.astro` builds to `dist/404.html`, which Netlify
  serves for unknown URLs automatically.
- **Deploy Previews** — every pull request gets its own preview URL.

### Alternative free hosts (same idea)

- **Cloudflare Pages** — Connect to Git → build `npm run build`, output `dist`.
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
