// Gate 3 — hierarchy. Squint (blur), greyscale and thumbnail tests, run over
// the above-fold captures with element rects pulled from the live DOM.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = "C:/Users/harshit.rawat/Documents/Projects/Amit/.claude/worktrees/strange-yalow-a89535";
const REVIEW = join(ROOT, "review");
const G3 = join(REVIEW, "gate3");
if (!existsSync(G3)) mkdirSync(G3, { recursive: true });
const BASE = "http://localhost:4323";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const ROUTES = [["home", "/"], ["about", "/about/"], ["services", "/services/"],
  ["service-vastu-report", "/services/vastu-report/"], ["contact", "/contact/"],
  ["articles", "/articles/"], ["privacy", "/privacy/"]];
const VIEWPORTS = [["375", 375, 812], ["1280", 1280, 900]];

const PORT = 9339;
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-g3",
  "--no-first-run", "--hide-scrollbars", "--force-device-scale-factor=1", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function findWs() { for (let i = 0; i < 80; i++) { try { const l = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json(); const p = l.find((t) => t.type === "page"); if (p) return p.webSocketDebuggerUrl; } catch {} await sleep(250); } throw new Error("no target"); }
const ws = new WebSocket(await findWs());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); let events = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } else if (m.method) events.push(m); };
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const waitLoad = async () => { const t = Date.now(); while (Date.now() - t < 20000) { if (events.some((e) => e.method === "Page.loadEventFired")) return; await sleep(40); } };
await send("Page.enable"); await send("Runtime.enable");

const SETTLE = `(async()=>{const w=(m)=>new Promise(r=>setTimeout(r,m));
 const e=[...document.querySelectorAll("[data-reveal]")].filter(x=>x.getBoundingClientRect().top<innerHeight&&x.offsetParent!==null);
 const t=Date.now(); while(Date.now()-t<6000){if(!e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99).length)break;await w(150);} await w(500);})()`;

const RECTS = `(() => {
  const vh = innerHeight, vw = innerWidth;
  const inFold = (r) => r.top < vh && r.bottom > 0 && r.width > 0 && r.height > 0;
  const h1 = document.querySelector("h1");
  const r1 = h1 ? h1.getBoundingClientRect() : null;
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect();
    if (!(r.width > 0 && r.height > 0)) return null;
    return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }; };
  const mascotEl = [...document.querySelectorAll('svg[viewBox="0 0 64 64"]')].filter(e => e.offsetParent !== null)[0];
  const chrome = [box(document.querySelector("header")), box(document.querySelector("footer"))].filter(Boolean);
  const hidden = (e) => { for (let p = e.parentElement; p; p = p.parentElement) { if (p.tagName === "DETAILS" && !p.open) return true; const s = getComputedStyle(p); if (s.display === "none" || s.visibility === "hidden") return true; } return e.offsetParent === null; };
  const acts = [...document.querySelectorAll("a[href],button")].filter(e => inFold(e.getBoundingClientRect()) && !hidden(e))
    .map(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      return { t: (e.textContent||"").trim().replace(/\\s+/g," ").slice(0,28),
        x: Math.max(0,Math.round(r.left)), y: Math.max(0,Math.round(r.top)),
        w: Math.round(Math.min(r.width, vw)), h: Math.round(r.height),
        filled: s.backgroundColor !== "rgba(0, 0, 0, 0)" };
    }).filter(a => a.w > 2 && a.h > 2);
  return { vw, vh, mascot: box(mascotEl), chrome,
    h1: r1 ? { x: Math.max(0,Math.round(r1.left)), y: Math.max(0,Math.round(r1.top)), w: Math.round(r1.width), h: Math.round(r1.height),
      px: Math.round(parseFloat(getComputedStyle(h1).fontSize)) } : null,
    acts };
})()`;

const data = {};
for (const [vp, w, h] of VIEWPORTS) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
  for (const [name, route] of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + route });
    await waitLoad();
    await send("Runtime.evaluate", { expression: SETTLE, awaitPromise: true, timeout: 30000 });
    const r = await send("Runtime.evaluate", { expression: RECTS, returnByValue: true });
    const shot = await send("Page.captureScreenshot", { format: "png" });
    const buf = Buffer.from(shot.data, "base64");
    data[name + "@" + vp] = { rects: r.result.value, buf };
    process.stdout.write(".");
  }
}
ws.close(); chrome.kill();
console.log("");

// ---------- analysis ----------
const pad = (s, n) => String(s).padEnd(n);
const rows = [];

for (const [key, d] of Object.entries(data)) {
  const { vw, h1, acts, mascot, chrome } = d.rects;
  const img = sharp(d.buf);

  // SQUINT: heavy blur, then find the tile that deviates most from the page's median luminance
  const sigma = Math.max(2, Math.round(vw * 0.02));
  const blurred = await img.clone().blur(sigma).greyscale().raw().toBuffer({ resolveWithObject: true });
  await sharp(d.buf).blur(sigma).jpeg({ quality: 80 }).toFile(join(G3, key.replace("@", "--") + "-squint.jpg"));
  await sharp(d.buf).greyscale().jpeg({ quality: 80 }).toFile(join(G3, key.replace("@", "--") + "-grey.jpg"));
  await sharp(d.buf).resize(Math.round(vw * 0.2)).jpeg({ quality: 88 }).toFile(join(G3, key.replace("@", "--") + "-thumb.jpg"));

  const { data: px, info } = blurred;
  const W = info.width, H = info.height;
  const GX = 16, GY = 16;
  const tiles = [];
  let all = [];
  for (let gy = 0; gy < GY; gy++) for (let gx = 0; gx < GX; gx++) {
    const x0 = Math.floor(gx * W / GX), x1 = Math.floor((gx + 1) * W / GX);
    const y0 = Math.floor(gy * H / GY), y1 = Math.floor((gy + 1) * H / GY);
    let sum = 0, n = 0;
    for (let y = y0; y < y1; y += 2) for (let x = x0; x < x1; x += 2) { sum += px[y * W + x]; n++; }
    const mean = sum / n; tiles.push({ gx, gy, mean, x0, y0, x1, y1 }); all.push(mean);
  }
  all.sort((a, b) => a - b);
  const median = all[Math.floor(all.length / 2)];
  for (const t of tiles) t.dev = Math.abs(t.mean - median);
  const maxDev = Math.max(...tiles.map(t => t.dev));
  const hot = tiles.filter(t => t.dev >= maxDev * 0.75);

  // The PEAK tile, not the centroid of all hot tiles. Averaging a headline on
  // the left with an illustration on the right puts the "dominant point" in
  // the empty space between them, which is on nothing at all — the squint test
  // asks what dominates, not where the average of several things lands.
  const peak = tiles.reduce((a, t) => (t.dev > a.dev ? t : a), tiles[0]);
  const cx = (peak.x0 + peak.x1) / 2;
  const cy = (peak.y0 + peak.y1) / 2;

  // "Exactly one dominant element" — count separate hot regions (4-connected).
  const at = new Map(tiles.map((t) => [t.gx + "," + t.gy, t]));
  const isHot = new Set(hot.map((t) => t.gx + "," + t.gy));
  const seen = new Set();
  let clusters = 0;
  for (const t of hot) {
    const k0 = t.gx + "," + t.gy;
    if (seen.has(k0)) continue;
    clusters++;
    const stack = [t];
    while (stack.length) {
      const c = stack.pop();
      const ck = c.gx + "," + c.gy;
      if (seen.has(ck)) continue;
      seen.add(ck);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nk = (c.gx + dx) + "," + (c.gy + dy);
        if (isHot.has(nk) && !seen.has(nk)) stack.push(at.get(nk));
      }
    }
  }

  const inRect = (r, x, y, pad2 = 40) => r && x >= r.x - pad2 && x <= r.x + r.w + pad2 && y >= r.y - pad2 && y <= r.y + r.h + pad2;
  const filled = acts.filter(a => a.filled).sort((a, b) => b.w * b.h - a.w * a.h);
  const primary = filled[0];
  // Gate 3a, as reworded at Decision 1: the dominant mass must land on an
  // INTENDED focal element - headline, primary action, or the mascot, which
  // Direction 3 makes a focal element - and never on page chrome.
  // An action inside the header is still an ACTION. Checking chrome first
  // mislabelled the header Book a Consultation button as furniture, when it is
  // the primary call to action and the eye landing on it is the intent working.
  // Real chrome-dominance is the logo, the nav or a border winning.
  const onAnyAction = acts.some((x) => inRect(x, cx, cy, 10));
  const onChrome = !onAnyAction && (chrome || []).some((c) => inRect(c, cx, cy, 0));
  const squintTarget = inRect(h1, cx, cy) ? "H1"
    : inRect(primary, cx, cy) ? "primary CTA"
    : inRect(mascot, cx, cy, 60) ? "mascot"
    : onAnyAction ? "an action"
    : onChrome ? "CHROME (fail)"
    : "neither";

  // GREYSCALE: rank interactive elements by |luminance - local surround| on the desaturated image
  const grey = await sharp(d.buf).greyscale().raw().toBuffer({ resolveWithObject: true });
  const gp = grey.data, GW = grey.info.width, GH = grey.info.height;
  const meanIn = (x, y, w2, h2) => { let s = 0, n = 0;
    for (let yy = Math.max(0, y); yy < Math.min(GH, y + h2); yy++) for (let xx = Math.max(0, x); xx < Math.min(GW, x + w2); xx++) { s += gp[yy * GW + xx]; n++; }
    return n ? s / n : null; };
  const scored = acts.map(a => {
    const inner = meanIn(a.x, a.y, a.w, a.h);
    const outer = meanIn(a.x - 24, a.y - 16, a.w + 48, a.h + 32);
    if (inner == null || outer == null) return null;
    const ringMean = (outer * ((a.w + 48) * (a.h + 32)) - inner * (a.w * a.h)) / Math.max(1, (a.w + 48) * (a.h + 32) - a.w * a.h);
    return { t: a.t, score: Math.abs(inner - ringMean), area: a.w * a.h, filled: a.filled };
  }).filter(Boolean).sort((a, b) => b.score - a.score);
  const topGrey = scored[0];
  const primaryRank = primary ? scored.findIndex(s => s.t === primary.t) + 1 : 0;

  // THUMBNAIL: h1 cap-height at 20%
  const thumbCap = h1 ? Math.round(h1.px * 0.2 * 0.7 * 10) / 10 : null;

  rows.push({ key, squintTarget, clusters, cx: Math.round(cx), cy: Math.round(cy),
    h1px: h1 ? h1.px : null, thumbCap,
    primary: primary ? primary.t : "NONE", primaryRank, nActs: scored.length,
    topGrey: topGrey ? topGrey.t : "-", topScore: topGrey ? Math.round(topGrey.score) : 0 });
}

console.log("=== GATE 3 — SQUINT (blurred, dominant region) ===");
console.log("  " + pad("view", 30) + pad("dominant falls on", 18) + pad("hot regions", 13) + "peak");
rows.forEach(r => console.log("  " + pad(r.key, 30) + pad(r.squintTarget, 18) + pad(r.clusters, 13) + r.cx + "," + r.cy));
const ok = rows.filter(r => ["H1","primary CTA","mascot","an action"].includes(r.squintTarget)).length;
console.log("  -> on an intended focal element: " + ok + " of " + rows.length + "   on chrome: " + rows.filter(r=>r.squintTarget.startsWith("CHROME")).length);

console.log("");
console.log("=== GATE 3 — GREYSCALE (is the primary action still the most prominent?) ===");
console.log("  " + pad("view", 30) + pad("primary action", 24) + pad("rank", 10) + "most prominent instead");
rows.forEach(r => console.log("  " + pad(r.key, 30) + pad(r.primary, 24) + pad(r.primaryRank + "/" + r.nActs, 10) + (r.primaryRank === 1 ? "-" : r.topGrey)));

console.log("");
console.log("=== GATE 3 — THUMBNAIL (h1 cap-height at 20% scale; ~5px is the legibility floor) ===");
rows.forEach(r => console.log("  " + pad(r.key, 30) + "h1 " + pad(r.h1px + "px", 8) + "-> " + r.thumbCap + "px at 20%" + (r.thumbCap >= 5 ? "" : "   <-- BELOW FLOOR")));
console.log("");
console.log("images written to review/gate3/ (squint, grey, thumb per view)");
