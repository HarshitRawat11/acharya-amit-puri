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
  pages/                ← the pages (home, about, services, contact, robots.txt)
    services/[slug].astro  ← one detail page per service (auto-generated)
  components/           ← reusable UI (header, footer, cards, motifs…)
  layouts/BaseLayout    ← shared shell + SEO/structured data
  content/articles/     ← optional: add Markdown articles here later
  styles/global.css     ← design tokens / base styles
public/                 ← favicon, icons, og-image (+ your future photos)
astro.config.mjs        ← SET YOUR DOMAIN here (SITE_URL)
```

---

## 🚀 Deploying free on the internet (Cloudflare Pages)

**Recommended host: [Cloudflare Pages](https://pages.cloudflare.com).** It's
**permanently free** (not a 12-month trial), needs **no credit card**, gives you
**automatic HTTPS** and a **global CDN**, and redeploys automatically every time
you push to GitHub. (Netlify and Vercel are equally good free alternatives — same
steps, noted at the bottom. AWS is skipped on purpose: it needs a card, is more
complex, and its free tier expires after 12 months.)

### Step 1 — Put the code on GitHub

A local git repo with your first commit is **already created** for you. You just
need to send it to GitHub:

1. Create a new **empty** repository at <https://github.com/new>
   (name it e.g. `acharya-amit-puri`; do **not** add a README/.gitignore there).
2. Copy the URL it shows you, then run (replace the URL with yours):

```bash
git remote add origin https://github.com/YOUR-USERNAME/acharya-amit-puri.git
git push -u origin main
```

> Later, whenever you change content: `git add -A && git commit -m "Update content" && git push`
> — Cloudflare rebuilds and redeploys within ~1 minute.

### Step 2 — Connect the repo to Cloudflare Pages

1. Sign up / log in at <https://dash.cloudflare.com> → **Workers & Pages** →
   **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub and pick your `acharya-amit-puri` repository.
3. On the build settings screen, set:

   | Setting | Value |
   | --- | --- |
   | **Framework preset** | `Astro` |
   | **Build command** | `npm run build` |
   | **Build output directory** | `dist` |

4. Add an **Environment variable** (Settings → Environment variables):
   `NODE_VERSION` = `20`  *(ensures a modern Node on the build server)*.

### Step 3 — Deploy

Click **Save and Deploy**. In ~1–2 minutes your site is live at a free
`https://acharya-amit-puri.pages.dev` address, with HTTPS already on. 🎉

### Step 4 — Connect your custom domain (when you have one)

Once you own a domain (`{{DOMAIN}}`):

1. **Tell the site its address:** open `astro.config.mjs`, set
   `SITE_URL` to your domain (e.g. `https://www.acharyaamitpuri.com`), then
   commit & push. This keeps canonical links, the sitemap, robots.txt and share
   image correct.
2. In Cloudflare Pages → your project → **Custom domains** → **Set up a domain**,
   enter your domain and follow the prompts.

   - **Easiest path:** if your domain's **nameservers point to Cloudflare**
     (free — add the domain under Cloudflare → *Websites* and update nameservers
     at your registrar), Cloudflare creates the correct DNS records automatically.
   - **Keeping DNS at your current registrar:** add a **`CNAME`** record —
     name `www`, target `acharya-amit-puri.pages.dev`. For the bare/apex domain
     (`example.com` with no `www`), use your registrar's `ALIAS`/`ANAME`/“CNAME
     flattening” to the same target, or set up a redirect to `www`.

3. **HTTPS** is provisioned automatically (free SSL certificate) within a few
   minutes — no action needed.

### Alternative free hosts (same idea)

- **Netlify** — New site → import from GitHub → build `npm run build`, publish `dist`.
- **Vercel** — Add New Project → import repo → Framework preset **Astro** (build/output auto-detected).

---

## ✅ Pre-launch checklist

- [ ] Fill in the placeholders in `src/data/site.ts` (see **CONTENT.md**)
- [ ] Add your **Web3Forms** key so the contact form works (CONTENT.md → §2)
- [ ] Set your domain in `astro.config.mjs` (`SITE_URL`)
- [ ] (Optional) Add the Acharya's photo and ask to wire it in
- [ ] (Optional) Re-run `node scripts/generate-assets.mjs` if you changed colours
- [ ] `npm run build` passes, then push to GitHub
