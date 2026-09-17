/**
 * ════════════════════════════════════════════════════════════════════════════
 *  BUILD THE HOME PAGE DESIGN OPTIONS  →  home-designs.html
 * ════════════════════════════════════════════════════════════════════════════
 *  Run:  node design-options/build.mjs
 *
 *  WHY THIS EXISTS
 *  The output must be readable in iOS's attachment preview (Quick Look), which
 *  renders HTML + CSS but silently BLOCKS JavaScript. So the deliverable ships
 *  with zero <script> — every one of the five designs is written out as static
 *  markup, and navigation is plain #anchor links. It also means the page works
 *  in Safari, Chrome, Gmail's viewer, WhatsApp's viewer, and offline.
 *
 *  This generator only touches design-options/. Nothing in src/ is involved.
 * ════════════════════════════════════════════════════════════════════════════
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));

/* ─────────────────────────────────────────────────────────────────────────────
   CONTENT — identical in all five options, taken from src/data/site.ts.
   Only the design changes between options.
   ───────────────────────────────────────────────────────────────────────────── */
const C = {
  name: "Acharya Amit Puri",
  role: "Vastu · Vedic Astrology · Numerology · Prakriti · Palmistry",
  value:
    "Calm, considered guidance to bring your home, your choices, and your nature into greater harmony.",
  cta: "Book a Consultation",
  stats: [
    { v: "15+", l: "Years of Practice" },
    { v: "2,000+", l: "People Guided" },
    { v: "6", l: "Areas of Guidance" },
  ],
  services: [
    {
      name: "Vastu Report",
      tag: "Space &amp; Energy Analysis",
      sum: "A considered study of how your home or workplace is arranged — and how its layout, light, and flow can be brought into greater harmony.",
    },
    {
      name: "Astro Advice",
      tag: "Vedic Birth Chart Reading",
      sum: "A thoughtful reading of your Vedic birth chart, offering perspective on your strengths, timing, and the seasons of your life.",
    },
    {
      name: "Numero Advice",
      tag: "Name &amp; Number Alignment",
      sum: "An exploration of the numbers woven through your name and birth date — and how they might be brought into easier alignment.",
    },
    {
      name: "Prakriti Advice",
      tag: "Know Your Natural Energy",
      sum: "A gentle assessment of your natural constitution, to help you live and choose in tune with your own rhythm.",
    },
    {
      name: "Design Advice",
      tag: "Horoscope-Based Home Design",
      sum: "Guidance that brings together your horoscope and the principles of Vastu to shape a home that feels truly yours.",
    },
    {
      name: "Palmistry Advice",
      tag: "Palm &amp; Astrology Guidance",
      sum: "A reflective reading of the lines and form of your hand, considered alongside astrological insight.",
    },
  ],
  process: [
    {
      t: "Reach out",
      d: "Share a little about what you&rsquo;re seeking — by WhatsApp, phone, or the contact form. There&rsquo;s no pressure, and your details stay private.",
    },
    {
      t: "Share your details",
      d: "Provide what your chosen service needs — such as your birth date, time, and place, or photographs of your space.",
    },
    {
      t: "The study",
      d: "Acharya Amit Puri reviews everything with care and prepares your reading or report personally.",
    },
    {
      t: "Your consultation",
      d: "Receive your findings in a calm, unhurried conversation, with space for all your questions.",
    },
    {
      t: "Ongoing guidance",
      d: "Carry forward clear, practical suggestions — applied at whatever pace feels right for you.",
    },
  ],
  faqs: [
    {
      q: "How do consultations take place — online or in person?",
      a: "Most consultations are arranged remotely, so you can take part comfortably from wherever you are. Reach out by WhatsApp, phone, or the contact form and we&rsquo;ll find a time that suits you.",
    },
    {
      q: "What details will I need to provide?",
      a: "It depends on the service. A Vedic birth-chart reading needs your date, time, and place of birth; a Vastu report is helped by photographs or a simple floor plan of your space.",
    },
    {
      q: "Is this a substitute for medical, legal, or financial advice?",
      a: "No. This guidance is offered for reflection and wellbeing, and is not a substitute for professional medical, legal, or financial advice. You remain free in every decision you make.",
    },
    {
      q: "I&rsquo;m completely new to this — is that okay?",
      a: "Absolutely. Many people come with little or no prior knowledge. There&rsquo;s no pressure and no judgement — only a calm, respectful conversation about what you&rsquo;re seeking.",
    },
  ],
  nav: ["Home", "Services", "About", "Articles", "Contact"],
};

/* ── Stroke icons, one per service ───────────────────────────────────────── */
const ICONS = [
  '<path d="M12 3.2 20.8 12 12 20.8 3.2 12z"/><circle cx="12" cy="12" r="10.2"/>',
  '<circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="10.5" ry="4.6" transform="rotate(-24 12 12)"/>',
  '<path d="M12 3.6 21 19.4H3z"/><circle cx="12" cy="3.6" r="1.7"/><circle cx="21" cy="19.4" r="1.7"/><circle cx="3" cy="19.4" r="1.7"/>',
  '<path d="M20.5 3.5C10 4.6 4.2 9.6 4.2 16.4c0 2 1 3.1 2.9 3.1 6.9 0 12-6 13.4-16z"/><path d="M7 20.5c2.9-5 6.8-8.1 10.9-10"/>',
  '<path d="M3.6 11 12 4.4 20.4 11v9.1H3.6z"/><path d="M9.6 20.1v-6h4.8v6"/>',
  '<path d="M8.4 20.8c-2.1-1.2-3.4-3.3-3.4-6.1V9.3a1.6 1.6 0 0 1 3.2 0v2.4V5.2a1.6 1.6 0 0 1 3.2 0v6V4.1a1.6 1.6 0 0 1 3.2 0v7.1V7.6a1.6 1.6 0 0 1 3.2 0v7.1c0 3.4-2.2 6.1-5.3 6.1z"/>',
];
const icon = (i) =>
  `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[i % 6]}</svg>`;

/* ── Decorative motifs ──────────────────────────────────────────────────── */
function mandala() {
  let petals = "";
  for (let i = 0; i < 16; i++) {
    petals += `<ellipse cx="100" cy="100" rx="18" ry="62" transform="rotate(${i * 11.25} 100 100)"/>`;
  }
  return `<svg class="motif" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="0.8" aria-hidden="true"><circle cx="100" cy="100" r="94"/><circle cx="100" cy="100" r="72"/><circle cx="100" cy="100" r="34"/><circle cx="100" cy="100" r="14"/>${petals}</svg>`;
}
const lotusRule = () =>
  '<svg class="lotus" viewBox="0 0 120 24" width="120" height="24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M0 12h38M82 12h38"/><path d="M60 4c5 4 7 6 7 8s-3 4-7 4-7-2-7-4 2-4 7-8z"/><path d="M60 16c-6 0-10-2-13-4 3 4 8 6 13 6s10-2 13-6c-3 2-7 4-13 4z"/></svg>';

function starChart() {
  const stars = [
    [40, 60], [120, 30], [200, 90], [95, 130], [250, 45], [175, 175],
    [60, 190], [280, 150], [230, 235], [120, 250], [35, 130], [300, 80],
  ];
  let s = '<svg class="chartmotif" viewBox="0 0 340 300" fill="none" aria-hidden="true">';
  s += '<g stroke="#8fa7d8" stroke-width="0.7" opacity="0.5"><path d="M40 60 120 30 200 90 95 130z"/><path d="M200 90 250 45 300 80"/><path d="M95 130 175 175 230 235 120 250 60 190 35 130z"/></g>';
  // the classic North-Indian birth chart, drawn faintly
  s += '<g stroke="#e3c07a" stroke-width="0.8" opacity="0.45"><rect x="70" y="40" width="200" height="200"/><path d="M70 40 270 240M270 40 70 240M170 40 70 140 170 240 270 140z"/></g>';
  stars.forEach(([x, y], i) => {
    s += `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 3 : 1.8}" fill="#f4efe2" opacity="${i % 3 === 0 ? 0.95 : 0.6}"/>`;
  });
  return s + "</svg>";
}
const blockPrint = () =>
  '<svg class="motif" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M50 6 62 30 88 34 69 52 74 78 50 66 26 78 31 52 12 34 38 30z"/><circle cx="50" cy="50" r="10"/></svg>';
const minimalMark = () =>
  '<svg class="motif" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="50" cy="50" r="46"/><path d="M50 4v92M4 50h92"/></svg>';
const sigil = () =>
  '<svg class="sig" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><circle cx="20" cy="20" r="18"/><path d="M20 4.5 35.5 20 20 35.5 4.5 20z"/><circle cx="20" cy="20" r="5"/></svg>';

function blockBand(color) {
  const tile = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="26" viewBox="0 0 42 26" fill="none" stroke="${color}" stroke-width="1.1"><path d="M21 3 27 13l-6 10-6-10z"/><path d="M0 13h9M33 13h9"/><circle cx="21" cy="13" r="2"/></svg>`,
  );
  return `<div class="band" style="background-image:url('data:image/svg+xml,${tile}')"></div>`;
}

/* ── Shared page blocks ─────────────────────────────────────────────────── */
const nav = (t) => `<header class="nav"><div class="wrap">
  <span class="brandmark">${sigil()}<span><span class="nm">${C.name}</span><br><span class="rl">${t.navrole}</span></span></span>
  <div class="navright">
    <nav class="navlinks">${C.nav.map((n) => `<span class="nl">${n}</span>`).join("")}</nav>
    <span class="btn navcta">${C.cta}</span>
  </div>
</div></header>`;

const statsBlock = () =>
  `<dl class="stats">${C.stats
    .map((s) => `<div><dt class="v">${s.v}</dt><dd class="l">${s.l}</dd></div>`)
    .join("")}</dl>`;

const ctaRow = (extra = "") =>
  `<div class="cta-row"><span class="btn">${C.cta}</span><span class="btn ghost">Chat on WhatsApp</span>${extra}</div>`;

const servicesCards = () =>
  C.services
    .map(
      (s, i) => `<article class="card">
    <div class="icochip">${icon(i)}</div>
    <div class="tag">${s.tag}</div>
    <h3>${s.name}</h3>
    <p class="sum">${s.sum}</p>
    <span class="more">Read more &rarr;</span>
  </article>`,
    )
    .join("");

const servicesRows = () =>
  C.services
    .map(
      (s, i) => `<div class="row">
    <span class="num">0${i + 1}</span>
    <span><h3>${s.name}</h3><span class="tag">${s.tag}</span></span>
    <p>${s.sum}</p>
    <span class="arw">&rarr;</span>
  </div>`,
    )
    .join("");

const processGrid = () =>
  C.process
    .map(
      (p, i) =>
        `<div class="step"><div class="n">STEP 0${i + 1}</div><h4>${p.t}</h4><p>${p.d}</p></div>`,
    )
    .join("");

const processTimeline = () =>
  C.process
    .map(
      (p, i) =>
        `<div class="tstep"><div class="dot">0${i + 1}</div><div><h4>${p.t}</h4><p class="tsp">${p.d}</p></div></div>`,
    )
    .join("");

/* FAQ: <details> is native HTML, but Quick Look renders it collapsed and may not
   open on tap — so the answers are written out open and always visible. */
const faqBlock = () =>
  `<div class="faq">${C.faqs
    .map(
      (f) =>
        `<div class="qa"><div class="q">${f.q}</div><div class="ans">${f.a}</div></div>`,
    )
    .join("")}</div>`;

const voices = () =>
  `<div class="quotes">${[1, 2, 3]
    .map(
      () =>
        `<div class="quote"><p>&ldquo;A real, consented client quote will sit here — three across.&rdquo;</p><div class="who">Client name &middot; City</div></div>`,
    )
    .join("")}</div>
  <div class="ph-wrap"><span class="placeholder-tag">Placeholder — real testimonials only, once provided</span></div>`;

const ctaBlock = (centered) =>
  `<section class="sec cta${centered ? " center" : ""}"><div class="wrap">
    <p class="kicker">Begin when you are ready</p>
    <h2 class="h2">A calm, unhurried conversation<br>about what you are seeking.</h2>
    <p class="lede">Share a little about your question. There is no pressure, no obligation, and everything you share stays private.</p>
    ${ctaRow()}
  </div></section>`;

const footer = () => `<footer class="foot"><div class="wrap"><div class="cols">
  <div><h5>${C.name}</h5><p class="fmuted">${C.role}</p></div>
  <div><h5>Explore</h5>${C.nav.map((n) => `<span class="fl">${n}</span>`).join("")}</div>
  <div><h5>Get in touch</h5><span class="fl">WhatsApp</span><span class="fl">Phone</span><span class="fl">Email</span><span class="fl">Consultation enquiry</span></div>
</div>
<div class="fine">&copy; 2026 ${C.name}. Guidance offered for reflection and wellbeing — not a substitute for professional medical, legal, or financial advice.</div>
</div></footer>`;

const aboutBody = (voice) =>
  `<p class="bio">${voice}</p><p class="bio">Nothing is overstated. No guarantees are made. Every choice remains yours.</p>`;

/* ─────────────────────────────────────────────────────────────────────────────
   THE FIVE DESIGN DIRECTIONS
   ───────────────────────────────────────────────────────────────────────────── */
const THEMES = [
  {
    id: "v1",
    short: "Temple Tank",
    note: "Deep stepwell teal and brass gold on warm aged paper. Asymmetric hero with a mandala watermark, three-across service cards, classical serif headings. The most traditional-but-refined of the five, and closest in spirit to the current build.",
    navrole: "Vastu &middot; Jyotish &middot; Numerology",
    build: (t) => `${nav(t)}
<section class="hero">${mandala()}<div class="wrap">
  <p class="kicker">Guidance rooted in tradition</p>
  <h1>${C.name}<span class="ln2">Vastu &middot; Jyotish &middot; Numerology</span></h1>
  <p class="val">${C.value}</p>
  ${ctaRow('<span class="textlink">View all services &rarr;</span>')}
  ${statsBlock()}
</div></section>

<section class="sec alt"><div class="wrap">
  <p class="kicker">Areas of guidance</p><h2 class="h2">Six ways to bring things into balance</h2>
  <p class="lede">Each consultation is prepared personally, in plain language, with the reasoning always explained.</p>
  <div class="grid3">${servicesCards()}</div>
</div></section>

<section class="sec"><div class="wrap"><div class="split">
  <div class="portrait"><span>Portrait of Acharya Amit Puri</span></div>
  <div>
    <p class="kicker">Meet the Acharya</p><h2 class="h2">Tradition, offered gently</h2>
    ${aboutBody("A short introduction to Acharya Amit Puri&rsquo;s background, training, and the quiet philosophy behind the practice will sit here — two or three warm, unhurried paragraphs.")}
    <div class="cta-row"><span class="btn ghost">Read the full story</span></div>
  </div>
</div></div></section>

<section class="sec alt"><div class="wrap">
  <p class="kicker">How it works</p><h2 class="h2">From first message to lasting guidance</h2>
  <div class="steps">${processGrid()}</div>
</div></section>

<section class="sec"><div class="wrap"><p class="kicker">In their words</p><h2 class="h2">Voices of those guided</h2>${voices()}</div></section>

<section class="sec alt"><div class="wrap"><p class="kicker">Questions</p><h2 class="h2">Before you reach out</h2>${faqBlock()}</div></section>

${ctaBlock(false)}${footer()}`,
  },

  {
    id: "v2",
    short: "Ivory &amp; Marigold",
    note: "An editorial, symmetrical layout on ivory with deep maroon and saffron. High-contrast Didot-style headings, hairline rules, and a bordered six-tile service grid. Reads like a fine printed journal — the most premium-boutique of the five.",
    navrole: "Consultations by appointment",
    build: (t) => `${nav(t)}
<section class="hero center">${mandala()}<div class="wrap">
  <div class="rule"></div>
  <p class="kicker">Guidance rooted in tradition</p>
  <h1>${C.name}</h1>
  <p class="rolebar">${C.role}</p>
  <p class="val">${C.value}</p>
  ${ctaRow()}
  ${statsBlock()}
</div></section>

<section class="sec alt center"><div class="wrap">
  ${lotusRule()}
  <p class="kicker">Areas of guidance</p><h2 class="h2">Six considered offerings</h2>
  <p class="lede">Prepared personally, explained plainly, and offered without pressure.</p>
  <div class="grid3">${servicesCards()}</div>
</div></section>

<section class="sec"><div class="wrap"><div class="split narrowleft">
  <div class="portrait"><span>Portrait of Acharya Amit Puri</span></div>
  <div>
    <p class="kicker">Meet the Acharya</p><h2 class="h2">A practice built on listening</h2>
    ${aboutBody("A short introduction to Acharya Amit Puri&rsquo;s background, training, and philosophy will sit here — set in a comfortable reading measure, as an essay rather than a sales page.")}
    <div class="cta-row"><span class="btn ghost">Read the full story</span></div>
  </div>
</div></div></section>

<section class="sec alt center"><div class="wrap">
  <p class="kicker">How it works</p><h2 class="h2">Five unhurried steps</h2>
  <div class="steps">${processGrid()}</div>
</div></section>

<section class="sec center"><div class="wrap">${lotusRule()}<p class="kicker">In their words</p><h2 class="h2">Voices of those guided</h2>${voices()}</div></section>

<section class="sec alt"><div class="wrap narrow">
  <div class="center"><p class="kicker">Questions</p><h2 class="h2">Before you reach out</h2></div>
  ${faqBlock()}
</div></section>

${ctaBlock(true)}${footer()}`,
  },

  {
    id: "v3",
    short: "Midnight Jyotish",
    note: "A dark, luminous night-sky theme in deep indigo with antique gold and starlight. Split hero beside a North-Indian birth-chart motif, softly glowing glass cards, and a vertical timeline for the process. The most distinctive and premium-feeling.",
    navrole: "By appointment &middot; Online &amp; in person",
    build: (t) => `${nav(t)}
<section class="hero"><div class="wrap"><div class="split heroSplit">
  <div>
    <p class="kicker">Guidance rooted in tradition</p>
    <h1>${C.name}</h1>
    <p class="val">${C.value}</p>
    ${ctaRow()}
    ${statsBlock()}
  </div>
  <div class="chartwrap">${starChart()}</div>
</div></div></section>

<section class="sec alt"><div class="wrap">
  <p class="kicker">Areas of guidance</p><h2 class="h2">Six ways to read the pattern</h2>
  <p class="lede">Each consultation is prepared personally and explained in plain language — offered as a lens for reflection, never as a fixed verdict.</p>
  <div class="grid3">${servicesCards()}</div>
</div></section>

<section class="sec"><div class="wrap"><div class="split">
  <div>
    <p class="kicker">Meet the Acharya</p><h2 class="h2">Guidance held lightly</h2>
    ${aboutBody("A short introduction to Acharya Amit Puri&rsquo;s background, training, and the philosophy behind the practice will sit here.")}
    <div class="cta-row"><span class="btn ghost">Read the full story</span></div>
  </div>
  <div class="portrait"><span>Portrait of Acharya Amit Puri</span></div>
</div></div></section>

<section class="sec alt"><div class="wrap">
  <p class="kicker">How it works</p><h2 class="h2">From first message to lasting guidance</h2>
  <div class="tline">${processTimeline()}</div>
</div></section>

<section class="sec"><div class="wrap"><p class="kicker">In their words</p><h2 class="h2">Voices of those guided</h2>${voices()}</div></section>

<section class="sec alt"><div class="wrap"><p class="kicker">Questions</p><h2 class="h2">Before you reach out</h2>${faqBlock()}</div></section>

${ctaBlock(false)}${footer()}`,
  },

  {
    id: "v4",
    short: "Sacred Minimal",
    note: "Near-monochrome and Swiss-editorial: off-white and near-black with a single vermillion accent, oversized tight-tracked type, and the services set as a numbered index rather than cards. The most modern of the five, and the fastest to scan.",
    navrole: "Est. practice &middot; India",
    build: (t) => `${nav(t)}
<section class="hero">${minimalMark()}<div class="wrap">
  <p class="kicker">Vastu &middot; Jyotish &middot; Numerology</p>
  <h1>Bring your<br>home, choices<br>and nature<br>into balance.</h1>
  <div class="duo">
    <p class="dp">${C.value}</p>
    <p class="dp">Consultations with <strong>${C.name}</strong> in Vastu, Vedic astrology, numerology, Prakriti, and palmistry. Prepared personally. Explained plainly.</p>
  </div>
  ${ctaRow()}
  ${statsBlock()}
</div></section>

<section class="sec"><div class="wrap">
  <p class="kicker">Index of services</p><h2 class="h2">Six areas of guidance</h2>
  <div class="rows">${servicesRows()}</div>
</div></section>

<section class="sec alt"><div class="wrap"><div class="split wideleft">
  <div>
    <p class="kicker">About</p><h2 class="h2">A practice built on listening, not on promises.</h2>
    <p class="bio">A short introduction to Acharya Amit Puri&rsquo;s background, training, and philosophy will sit here — plainly written, with no overstated claims.</p>
    <div class="cta-row"><span class="textlink">Read the full story &rarr;</span></div>
  </div>
  <div class="portrait"><span>Portrait</span></div>
</div></div></section>

<section class="sec"><div class="wrap">
  <p class="kicker">Process</p><h2 class="h2">How a consultation works</h2>
  <div class="steps">${processGrid()}</div>
</div></section>

<section class="sec alt"><div class="wrap"><p class="kicker">Testimonials</p><h2 class="h2">In their words</h2>${voices()}</div></section>

<section class="sec"><div class="wrap"><p class="kicker">FAQ</p><h2 class="h2">Before you reach out</h2>${faqBlock()}</div></section>

${ctaBlock(false)}${footer()}`,
  },

  {
    id: "v5",
    short: "Earthen Heritage",
    note: "Terracotta, clay and olive with block-print bands and soft rounded shapes. A framed &lsquo;invitation card&rsquo; hero and warm, tactile service blocks. The friendliest and most approachable of the five — strong for a family audience.",
    navrole: "Warm, personal consultations",
    build: (t) => `${nav(t)}
${blockBand("%23a8452a")}
<section class="hero"><div class="wrap"><div class="heroframe">${blockPrint()}
  <p class="kicker">Guidance rooted in tradition</p>
  <h1>${C.name}</h1>
  <p class="rolebar">${C.role}</p>
  <p class="val">${C.value}</p>
  ${ctaRow()}
  ${statsBlock()}
</div></div></section>
${blockBand("%235c6b3f")}

<section class="sec"><div class="wrap">
  <p class="kicker">Areas of guidance</p><h2 class="h2">Six warm, practical offerings</h2>
  <p class="lede">Prepared personally, written in everyday language, and applied at whatever pace feels right for you.</p>
  <div class="grid3">${servicesCards()}</div>
</div></section>

<section class="sec alt"><div class="wrap"><div class="split">
  <div class="portrait"><span>Portrait of Acharya Amit Puri</span></div>
  <div>
    <p class="kicker">Meet the Acharya</p><h2 class="h2">Sit down, and let us begin</h2>
    ${aboutBody("A short introduction to Acharya Amit Puri&rsquo;s background, training, and philosophy will sit here — in a warm, conversational voice.")}
    <div class="cta-row"><span class="btn ghost">Read the full story</span></div>
  </div>
</div></div></section>

<section class="sec"><div class="wrap">
  <p class="kicker">How it works</p><h2 class="h2">Five simple steps</h2>
  <div class="steps">${processGrid()}</div>
</div></section>

<section class="sec alt"><div class="wrap"><p class="kicker">In their words</p><h2 class="h2">Voices of those guided</h2>${voices()}</div></section>

<section class="sec"><div class="wrap"><p class="kicker">Questions</p><h2 class="h2">Before you reach out</h2>${faqBlock()}</div></section>

${blockBand("%23a8452a")}
${ctaBlock(false)}${footer()}`,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES
   ───────────────────────────────────────────────────────────────────────────── */
const CSS = String.raw`
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:#14120f;font-family:"Segoe UI",-apple-system,BlinkMacSystemFont,system-ui,sans-serif}
svg{display:block}

/* ── Cover + index (the only "document chrome") ─────────────────────────── */
#cover{max-width:1180px;margin:0 auto;padding:40px 22px 26px;color:#efe9df}
#cover h1{font:400 clamp(22px,5vw,30px)/1.2 "Palatino Linotype",Palatino,"Iowan Old Style",Georgia,serif;margin:0 0 14px;letter-spacing:.01em}
#cover p{margin:0;max-width:60ch;color:#a09786;font-size:14.5px;line-height:1.6}
#cover .hint{margin-top:16px;color:#7e7566;font-size:13px}
#jump{position:sticky;top:0;z-index:90;background:rgba(20,18,15,.97);border-top:1px solid #2e2a24;border-bottom:1px solid #2e2a24}
#jump .inner{max-width:1180px;margin:0 auto;padding:11px 22px;display:flex;align-items:center;gap:10px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
#jump .inner::-webkit-scrollbar{display:none}
#jump .lbl{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:#7e7566;white-space:nowrap;flex:none}
#jump a{flex:none;text-decoration:none;font-size:13px;color:#cfc7b9;border:1px solid #35302a;border-radius:999px;padding:7px 14px;white-space:nowrap;-webkit-tap-highlight-color:rgba(217,184,119,.25)}
#jump a:hover,#jump a:focus{border-color:#d9b877;color:#fff}
#jump a:focus-visible{outline:2px solid #d9b877;outline-offset:2px}

.optlabel{scroll-margin-top:56px;max-width:1180px;margin:0 auto;padding:44px 22px 24px;color:#efe9df}
.optlabel .of{font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:#8a806f}
.optlabel h2{font:400 clamp(24px,5.4vw,34px)/1.2 "Palatino Linotype",Palatino,"Iowan Old Style",Georgia,serif;margin:10px 0 12px;color:#f3ecdd}
.optlabel p{margin:0;max-width:70ch;color:#a09786;font-size:14px;line-height:1.65}
.frame{border-top:1px solid #2e2a24;border-bottom:1px solid #2e2a24}
.totop{max-width:1180px;margin:0 auto;padding:16px 22px 30px}
.totop a{font-size:12.5px;color:#8a806f;text-decoration:none;border-bottom:1px solid #35302a;padding-bottom:2px}
#end{max-width:1180px;margin:0 auto;padding:36px 22px 60px;color:#7e7566;font-size:13px;line-height:1.65;border-top:1px solid #2e2a24}

/* ── Shared skeleton, themed entirely through custom properties ─────────── */
.pane{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
.pane h1,.pane h2,.pane h3,.pane h4{font-family:var(--fh);font-weight:var(--hw);letter-spacing:var(--ht);margin:0;line-height:1.15;color:var(--head)}
.pane p{margin:0}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}
.wrap.narrow{max-width:820px}
.sec{padding:var(--secpad) 0}
.alt{background:var(--alt)}
.center{text-align:center}
.kicker{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--muted);margin:0 0 18px;display:flex;align-items:center;gap:12px}
.kicker::before{content:"";width:26px;height:1px;background:var(--accent);flex:none}
.center .kicker{justify-content:center}
.center .kicker::after{content:"";width:26px;height:1px;background:var(--accent);flex:none}
.h2{font-size:clamp(1.7rem,3.2vw,2.6rem)}
.lede{color:var(--muted);max-width:60ch;margin-top:16px}
.center .lede{margin-left:auto;margin-right:auto}
.rolebar{font-family:var(--fh);font-size:1.1rem;color:var(--accent2);margin-top:16px;letter-spacing:.05em}
.lotus{color:var(--accent);margin:0 auto 22px}
.rule{width:1px;height:56px;background:var(--line2);margin:0 auto 30px}

.pane .btn{display:inline-block;font-family:var(--fb);font-size:14px;letter-spacing:var(--btnls,.02em);padding:13px 26px;border-radius:var(--btnr);background:var(--brand);color:var(--onbrand);border:1px solid var(--brand);text-transform:var(--btncase,none)}
.pane .btn.ghost{background:transparent;color:var(--brand);border-color:var(--line2)}
.cta-row{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:32px}
.center .cta-row{justify-content:center}
.pane .textlink{font-size:14px;color:var(--brand);border-bottom:1px solid var(--line2);padding-bottom:2px}

/* Nav */
.nav{border-bottom:1px solid var(--line)}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-top:20px;padding-bottom:20px}
.brandmark{display:flex;align-items:center;gap:12px}
.brandmark .sig{width:38px;height:38px;flex:none;color:var(--accent)}
.brandmark .nm{font-family:var(--fh);font-size:18px;letter-spacing:var(--ht);color:var(--head);line-height:1.1}
.brandmark .rl{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.navright{display:flex;align-items:center;gap:26px}
.navlinks{display:flex;gap:26px;align-items:center}
.navlinks .nl{font-size:14px;color:var(--muted)}
.navcta{padding:10px 20px;font-size:13px}

/* Hero */
.hero{position:relative;overflow:hidden;padding:var(--heropad) 0}
.hero h1{font-size:var(--h1size);color:var(--head)}
.hero .val{font-size:clamp(1.05rem,1.5vw,1.2rem);color:var(--muted);max-width:34em;margin-top:22px}
.center .val{margin-left:auto;margin-right:auto}
.motif{position:absolute;pointer-events:none}
.stats{display:flex;flex-wrap:wrap;gap:18px 48px;margin:52px 0 0}
.center .stats{justify-content:center}
.stats .v{font-family:var(--fh);font-size:30px;color:var(--brand);line-height:1;font-variant-numeric:tabular-nums}
.stats .l{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin:8px 0 0}

/* Services — cards */
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(268px,1fr));gap:var(--gap,24px);margin-top:46px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:30px 28px}
.ico{width:30px;height:30px;color:var(--accent)}
.icochip{width:56px;height:56px;border-radius:var(--chipr,50%);background:var(--chipbg);display:flex;align-items:center;justify-content:center;margin-bottom:20px}
.card h3{font-size:1.3rem;margin-top:16px}
.card .tag{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent2,var(--muted));margin-top:8px}
.card p.sum{color:var(--muted);font-size:14.5px;margin-top:14px}
.card .more{display:inline-block;margin-top:18px;font-size:13px;color:var(--brand)}

/* Services — numbered index */
.rows{margin-top:46px;border-top:1px solid var(--line)}
.row{display:grid;grid-template-columns:64px 1.05fr 1.35fr auto;gap:24px;align-items:baseline;padding:26px 0;border-bottom:1px solid var(--line)}
.row .num{font-family:var(--fh);font-size:13px;color:var(--accent);letter-spacing:.1em;font-variant-numeric:tabular-nums}
.row h3{font-size:1.45rem}
.row .tag{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:7px;display:block}
.row p{color:var(--muted);font-size:14.5px}
.row .arw{color:var(--brand);font-size:18px}

/* About */
.split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.split.narrowleft{grid-template-columns:.85fr 1.15fr}
.split.wideleft{grid-template-columns:1.25fr .75fr}
.split.heroSplit{grid-template-columns:1.05fr .95fr}
.portrait{aspect-ratio:4/5;min-height:300px;border-radius:var(--radius);background:var(--portrait);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;overflow:hidden}
.portrait span{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);text-align:center;padding:0 20px}
.bio{color:var(--muted);margin-top:18px!important}
.chartwrap{position:relative;min-height:320px;display:flex;align-items:flex-start;justify-content:flex-end}
.chartmotif{width:100%;max-width:420px}

/* Process */
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:30px;margin-top:50px}
.step .n{font-family:var(--fh);font-size:13px;letter-spacing:.18em;color:var(--accent);padding-bottom:14px;border-bottom:1px solid var(--line);margin-bottom:16px}
.step h4{font-size:1.12rem}
.step p{color:var(--muted);font-size:14px;margin-top:10px!important}
.tline{margin-top:50px;max-width:720px}
.tstep{display:grid;grid-template-columns:56px 1fr;gap:24px;padding-bottom:34px;position:relative}
.tstep:not(:last-child)::before{content:"";position:absolute;left:27px;top:46px;bottom:0;width:1px;background:var(--line2)}
.tstep .dot{width:54px;height:54px;border-radius:50%;border:1px solid var(--line2);display:flex;align-items:center;justify-content:center;font-family:var(--fh);color:var(--accent);background:var(--bg);font-size:15px}
.tstep h4{font-size:1.15rem}
.tsp{color:var(--muted);font-size:14.5px;margin-top:8px!important}

/* Voices */
.quotes{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-top:44px}
.quote{border:1px dashed var(--line2);border-radius:var(--radius);padding:26px;background:var(--surface)}
.quote p{font-family:var(--fh);font-size:1.05rem;color:var(--head);line-height:1.5}
.quote .who{margin-top:16px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.placeholder-tag{display:inline-block;margin-top:26px;font-size:12px;color:var(--muted);border:1px solid var(--line2);border-radius:999px;padding:5px 14px}
.center .ph-wrap{text-align:center}

/* FAQ — written out open, so it reads without any tapping */
.faq{max-width:780px;margin-top:40px}
.qa{border-bottom:1px solid var(--line);padding:20px 0}
.qa .q{font-family:var(--fh);font-size:1.08rem;color:var(--head);position:relative;padding-left:22px}
.qa .q::before{content:"—";position:absolute;left:0;color:var(--accent)}
.qa .ans{color:var(--muted);font-size:14.5px;margin-top:8px;padding-left:22px}

/* CTA + footer */
.cta{background:var(--ctabg);color:var(--ctatext)}
.cta h2,.cta .h2{color:var(--ctatext)}
.cta .lede{color:var(--ctamuted)}
.cta .kicker{color:var(--ctamuted)}
.cta .btn{background:var(--ctabtn);color:var(--ctabtntext);border-color:var(--ctabtn)}
.cta .btn.ghost{background:transparent;color:var(--ctatext);border-color:var(--ctamuted)}
.foot{border-top:1px solid var(--line);padding:46px 0 34px;font-size:13.5px;color:var(--muted)}
.foot .cols{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:40px}
.foot h5{font-family:var(--fh);font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--head);margin:0 0 14px;font-weight:var(--hw)}
.foot .fmuted{color:var(--muted);max-width:34ch}
.foot .fl{display:block;padding:3px 0}
.foot .fine{margin-top:34px;padding-top:20px;border-top:1px solid var(--line);font-size:12px}
.band{height:26px;background-repeat:repeat-x;background-size:42px 26px;opacity:.5}

/* ══ OPTION 1 — TEMPLE TANK ═════════════════════════════════════════════ */
.v1{--bg:#f7f3ec;--alt:#f1ebe0;--surface:#fdfbf6;--text:#1c2b2a;--head:#0e5a52;--muted:#4c5b56;
--brand:#0e5a52;--brand2:#0b4a43;--accent:#a67c2e;--accent2:#a67c2e;--line:#ded3bd;--line2:#c9bca0;
--onbrand:#fbf7ef;--chipbg:#eee6d5;--portrait:linear-gradient(160deg,#eee6d5,#dfd3bb);
--radius:12px;--btnr:8px;--fh:"Marcellus","Cormorant Garamond",Georgia,"Times New Roman",serif;
--fb:"Inter","Segoe UI",-apple-system,system-ui,sans-serif;--hw:400;--ht:.01em;--maxw:1160px;
--secpad:96px;--heropad:118px;--h1size:clamp(2.5rem,5.6vw,4rem);
--ctabg:#0e5a52;--ctatext:#fbf7ef;--ctamuted:#bcd4d0;--ctabtn:#e7d4a8;--ctabtntext:#16332f}
.v1 .hero .motif{right:-110px;top:-110px;width:470px;color:#a67c2e;opacity:.09}
.v1 .hero h1 .ln2{display:block;color:#a67c2e}

/* ══ OPTION 2 — IVORY & MARIGOLD ════════════════════════════════════════ */
.v2{--bg:#fcfaf5;--alt:#f6f0e4;--surface:#ffffff;--text:#2b1f1c;--head:#6d1f21;--muted:#6b5a54;
--brand:#6d1f21;--brand2:#55181a;--accent:#d38b1f;--accent2:#b4741a;--line:#e8ddca;--line2:#d8c8ac;
--onbrand:#fffaf2;--chipbg:transparent;--portrait:linear-gradient(160deg,#f7ecd8,#ecdcbe);
--radius:2px;--btnr:2px;--btnls:.14em;--btncase:uppercase;
--fh:"Didot","Bodoni MT","Playfair Display","Hoefler Text",Garamond,Georgia,serif;
--fb:"Segoe UI","Helvetica Neue",-apple-system,system-ui,sans-serif;--hw:400;--ht:.005em;--maxw:1080px;
--secpad:100px;--heropad:112px;--h1size:clamp(2.6rem,6vw,4.4rem);--gap:0;
--ctabg:#6d1f21;--ctatext:#fdf6ea;--ctamuted:#e2bfae;--ctabtn:#d38b1f;--ctabtntext:#2b1005}
.v2 .h2,.v2 .hero h1{line-height:1.08}
.v2 .hero .motif{left:50%;transform:translateX(-50%);top:26px;width:300px;color:#d38b1f;opacity:.16}
.v2 .card{border-radius:0;margin:-.5px;text-align:center;padding:40px 30px}
.v2 .icochip{margin:0 auto 22px;border:1px solid var(--line2)}
.v2 .grid3{margin-top:54px}
.v2 .quote{border-style:solid;text-align:center}
.v2 .step .n{border-bottom:none;border-top:2px solid var(--accent);padding:14px 0 0;margin-bottom:12px;display:inline-block}

/* ══ OPTION 3 — MIDNIGHT JYOTISH ════════════════════════════════════════ */
.v3{--bg:#0b1020;--alt:#0e1529;--surface:rgba(255,255,255,.035);--text:#dfe3f0;--head:#f4efe2;--muted:#9aa3bd;
--brand:#e3c07a;--brand2:#d0aa5e;--accent:#e3c07a;--accent2:#8fa7d8;
--line:rgba(255,255,255,.09);--line2:rgba(227,192,122,.32);--onbrand:#12172a;--chipbg:rgba(227,192,122,.12);
--portrait:radial-gradient(120% 90% at 30% 15%,#1d2748 0%,#131b33 45%,#0c1223 100%);
--radius:14px;--btnr:999px;--fh:"Optima","Palatino Linotype",Palatino,"Iowan Old Style",Georgia,serif;
--fb:"Inter","Segoe UI",-apple-system,system-ui,sans-serif;--hw:400;--ht:.045em;--maxw:1140px;
--secpad:100px;--heropad:120px;--h1size:clamp(2.4rem,5.4vw,3.9rem);
--ctabg:#16203c;--ctatext:#f4efe2;--ctamuted:#9aa3bd;--ctabtn:#e3c07a;--ctabtntext:#12172a}
.v3 .hero{background:radial-gradient(70% 60% at 78% 18%,rgba(143,167,216,.16),transparent 70%),radial-gradient(50% 50% at 12% 82%,rgba(227,192,122,.09),transparent 70%)}
.v3 .kicker{color:var(--accent2)}
.v3 .quote{background:rgba(255,255,255,.03)}
.v3 .btn.ghost{color:var(--head)}

/* ══ OPTION 4 — SACRED MINIMAL ══════════════════════════════════════════ */
.v4{--bg:#fbfaf8;--alt:#f2f0ec;--surface:#ffffff;--text:#14161a;--head:#14161a;--muted:#62666e;
--brand:#14161a;--brand2:#000;--accent:#cf3c22;--accent2:#cf3c22;--line:#e2e0da;--line2:#cfcdc6;
--onbrand:#fff;--chipbg:transparent;--portrait:linear-gradient(160deg,#eceae5,#dedbd4);
--radius:0px;--btnr:0px;--fh:"Helvetica Neue","Segoe UI",Inter,Arial,sans-serif;
--fb:"Helvetica Neue","Segoe UI",Inter,Arial,sans-serif;--hw:500;--ht:-.025em;--maxw:1240px;
--secpad:104px;--heropad:120px;--h1size:clamp(2.7rem,8vw,6rem);
--ctabg:#14161a;--ctatext:#fbfaf8;--ctamuted:#9a9ea6;--ctabtn:#cf3c22;--ctabtntext:#fff}
.v4 .kicker{letter-spacing:.3em;color:var(--accent)}
.v4 .kicker::before{background:var(--accent)}
.v4 .hero h1{letter-spacing:-.04em;line-height:.98}
.v4 .hero .motif{right:40px;bottom:-40px;width:260px;color:#cf3c22;opacity:.14}
.v4 .duo{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:820px;margin-top:44px;border-top:1px solid var(--line);padding-top:26px}
.v4 .duo .dp{color:var(--muted)}
.v4 .duo strong{color:var(--text);font-weight:600}
.v4 .step .n{color:var(--accent);font-size:12px}
.v4 .quote p{font-size:1rem;line-height:1.6}
.v4 .icochip{display:none}

/* ══ OPTION 5 — EARTHEN HERITAGE ════════════════════════════════════════ */
.v5{--bg:#fdf7f0;--alt:#f6ebdf;--surface:#fffcf8;--text:#33241c;--head:#7a3418;--muted:#6f5a4c;
--brand:#a8452a;--brand2:#8b3620;--accent:#5c6b3f;--accent2:#a8452a;--line:#ead9c6;--line2:#d8c0a6;
--onbrand:#fff6ee;--chipbg:#f4e3d2;--portrait:linear-gradient(160deg,#f0dcc6,#e0c3a4);
--radius:22px;--btnr:999px;--chipr:16px;
--fh:"Baskerville","Hoefler Text","Palatino Linotype",Garamond,Georgia,serif;
--fb:"Segoe UI","Helvetica Neue",-apple-system,system-ui,sans-serif;--hw:400;--ht:.005em;--maxw:1120px;
--secpad:90px;--heropad:88px;--h1size:clamp(2.2rem,5vw,3.6rem);
--ctabg:#7a3418;--ctatext:#fdf1e4;--ctamuted:#e2bda1;--ctabtn:#f0dcc6;--ctabtntext:#5c2410}
.v5 .hero{background:var(--alt)}
.v5 .heroframe{border:1px solid var(--line2);border-radius:28px;background:var(--bg);padding:62px 54px;position:relative}
.v5 .hero .motif{right:26px;top:26px;width:150px;color:#a8452a;opacity:.14}
.v5 .rolebar{font-family:var(--fb);font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.v5 .icochip{border-radius:16px}
.v5 .step{background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:24px 22px}
.v5 .step .n{border-bottom:none;padding:0;margin-bottom:10px;color:var(--brand)}

/* ══ TABLET ═════════════════════════════════════════════════════════════ */
@media (max-width:900px){
  .navlinks{display:none}
  .split,.split.narrowleft,.split.wideleft,.split.heroSplit{grid-template-columns:1fr;gap:40px}
  .foot .cols{grid-template-columns:1fr 1fr}
}

/* ══ PHONE — the main way this will be read ═════════════════════════════ */
@media (max-width:760px){
  .pane{--secpad:58px;--heropad:62px;--maxw:100%}
  .wrap{padding:0 20px}
  /* Nav: one tidy line — drop the role, shrink the mark, keep the CTA unwrapped */
  .nav .wrap{padding-top:14px;padding-bottom:14px;gap:12px}
  .brandmark{gap:9px}
  .brandmark .sig{width:30px;height:30px}
  .brandmark .nm{font-size:15px}
  .brandmark .rl{display:none}
  .navcta{white-space:nowrap;padding:9px 14px;font-size:12px}
  /* Headline sizes tuned per option so nothing crowds the screen edge */
  .v1{--h1size:2.2rem}
  .v2{--h1size:2.3rem}
  .v3{--h1size:2.05rem}
  .v4{--h1size:2.9rem}
  .v5{--h1size:2rem}
  .h2{font-size:clamp(1.5rem,6.4vw,2rem)}
  .hero .val{font-size:1.02rem;margin-top:18px}
  .lede{margin-top:14px}
  .kicker{margin-bottom:14px;letter-spacing:.2em}
  .cta-row{gap:10px;margin-top:24px}
  .pane .btn{padding:12px 20px;font-size:13.5px}
  .stats{gap:14px 30px;margin-top:34px}
  .stats .v{font-size:25px}
  .grid3{margin-top:30px;gap:16px}
  .card{padding:24px 20px}
  .v2 .card{padding:30px 22px;margin:0 0 -1px}
  .v2 .grid3{margin-top:32px}
  .icochip{width:48px;height:48px;margin-bottom:16px}
  .rows{margin-top:30px}
  .row{grid-template-columns:32px 1fr;gap:4px 16px;padding:20px 0}
  .row p{grid-column:2}
  .row .arw{display:none}
  .row h3{font-size:1.25rem}
  .steps{gap:20px;margin-top:32px}
  .tline{margin-top:32px}
  .tstep{grid-template-columns:42px 1fr;gap:16px;padding-bottom:26px}
  .tstep .dot{width:40px;height:40px;font-size:13px}
  .tstep:not(:last-child)::before{left:20px;top:34px}
  .quotes{margin-top:28px;gap:16px}
  .quote{padding:22px}
  .faq{margin-top:28px}
  .portrait{min-height:0;aspect-ratio:5/4}
  .split{gap:30px}
  .foot{padding:36px 0 28px}
  .foot .cols{grid-template-columns:1fr;gap:24px}
  .v4 .duo{grid-template-columns:1fr;gap:16px;margin-top:30px;padding-top:20px}
  .v5 .heroframe{padding:32px 22px;border-radius:20px}
  .v5 .hero .motif{width:62px;right:12px;top:12px;opacity:.1}
  .v1 .hero .motif{width:290px;right:-90px;top:-80px}
  .v4 .hero .motif{width:170px;right:6px;bottom:-24px}
  .v2 .hero .motif{width:220px;top:14px}
  .chartwrap{min-height:0;justify-content:center;margin-top:8px}
  .chartmotif{max-width:320px}
  #cover{padding:30px 20px 20px}
  .optlabel{padding:34px 20px 20px;scroll-margin-top:52px}
  #jump .inner{padding:10px 20px}
  #jump .lbl{display:none}
}

@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}

/* ══ PRINT / PDF — so this can also be printed or saved as a PDF ════════ */
@media print{
  body{background:#fff}
  #jump{display:none}
  #cover,.optlabel,#end,.totop{color:#111}
  #cover h1,.optlabel h2{color:#111}
  #cover p,.optlabel p,#end{color:#444}
  .pane{break-inside:avoid}
  .optlabel{break-before:page}
}
`;

/* ─────────────────────────────────────────────────────────────────────────────
   ASSEMBLE
   ───────────────────────────────────────────────────────────────────────────── */
const index = THEMES.map(
  (t, i) => `<a href="#opt${i + 1}">${i + 1} &middot; ${t.short}</a>`,
).join("");

const body = THEMES.map(
  (t, i) => `<section class="optlabel" id="opt${i + 1}">
  <div class="of">Option ${i + 1} of ${THEMES.length}</div>
  <h2>${t.short}</h2>
  <p>${t.note}</p>
</section>
<div class="pane ${t.id} frame">${t.build(t)}</div>
<div class="totop"><a href="#top">&uarr; Back to the list of options</a></div>`,
).join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#14120f">
<meta name="format-detection" content="telephone=no">
<title>Amit Puri Home Page Directions</title>
<style>${CSS}</style>
</head>
<body>

<div id="cover">
  <h1 id="top">Acharya Amit Puri &mdash; home page, five directions</h1>
  <p>The wording, the six services, and the page structure are identical in all five. Only the visual design changes &mdash; palette, typography, layout, and motifs. Scroll through them all, or tap an option below to jump straight to it.</p>
  <p class="hint">Each block below is one complete home page, top to bottom. Elements from different options can be combined.</p>
</div>

<nav id="jump"><div class="inner"><span class="lbl">Jump to</span>${index}</div></nav>

${body}

<div id="end">
  Testimonials, the portrait, and the statistics are shown as clearly-labelled placeholders &mdash; no quotes have been invented. Headings will use the site&rsquo;s proper typeface once a direction is chosen; this preview falls back to fonts already on your device so it works offline.
</div>

</body>
</html>
`;

const out = join(HERE, "home-designs.html");
writeFileSync(out, html, "utf8");
console.log(
  `Wrote ${out}  (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB, ${THEMES.length} options, 0 scripts)`,
);
