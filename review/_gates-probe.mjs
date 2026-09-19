// Phase D measurement: hover/focus coverage, heading orphans, line measure,
// motif recurrence, interaction transitions. Read-only against the built site.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:4323";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "C:/Users/harshit.rawat/Documents/Projects/Amit/.claude/worktrees/strange-yalow-a89535/review/_gates-raw.json";

const ROUTES = [["home", "/"], ["about", "/about/"], ["services", "/services/"],
  ["vastu", "/services/vastu-report/"], ["astro", "/services/astro-advice/"],
  ["numero", "/services/numero-advice/"], ["prakriti", "/services/prakriti-advice/"],
  ["design", "/services/design-advice/"], ["palmistry", "/services/palmistry-advice/"],
  ["contact", "/contact/"], ["articles", "/articles/"], ["privacy", "/privacy/"], ["404", "/404.html"]];
const VIEWPORTS = [["375", 375, 812], ["768", 768, 1024], ["1280", 1280, 900]];

const PORT = 9337;
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-gates",
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

const SETTLE = `(async()=>{const w=(m)=>new Promise(r=>setTimeout(r,m));const H=document.documentElement.scrollHeight;
 for(let y=0;y<=H;y+=Math.round(innerHeight*0.5)){scrollTo(0,y);await w(240);} scrollTo(0,H);await w(500);
 const e=[...document.querySelectorAll("[data-reveal]")];const t=Date.now();
 while(Date.now()-t<7000){if(!e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99).length)break;await w(180);}
 scrollTo(0,0);await w(700);})()`;

const PROBE = String.raw`(() => {
  // ---- stylesheet pseudo-class index ----
  const hoverSels = [], focusSels = []; let globalFocus = false;
  const walk = (rs) => { for (const r of rs) {
    if (r.selectorText) {
    for (const raw of r.selectorText.split(",")) {
      const t = raw.trim();
      if (t.includes(":hover")) { const b = t.replace(/:hover/g, "").trim(); if (b) hoverSels.push(b); }
      if (t.includes(":focus-visible")) { const b = t.replace(/:focus-visible/g, "").trim(); if (b) focusSels.push(b); else globalFocus = true; }
      else if (t.includes(":focus")) { const b = t.replace(/:focus/g, "").trim(); if (b) focusSels.push(b); else globalFocus = true; }
    } }
    if (r.cssRules && r.cssRules.length) walk(r.cssRules);
  }};
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch (e) {} }
  const anyMatch = (el, sels) => { for (const s of sels) { try { if (el.matches(s)) return true; } catch (e) {} } return false; };

  // ---- interactive elements: hover + focus coverage ----
  const inter = [...document.querySelectorAll("a[href],button,summary,input,textarea,select")]
    .filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
  const noHover = [], noFocus = [], smallTarget = [];
  for (const el of inter) {
    const label = el.tagName.toLowerCase() + ":" + (el.textContent || el.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 26);
    if (!anyMatch(el, hoverSels)) noHover.push(label);
    if (!globalFocus && !anyMatch(el, focusSels)) noFocus.push(label);
    const r = el.getBoundingClientRect();
    if (Math.min(r.width, r.height) < 44) smallTarget.push(label + " [" + Math.round(r.width) + "x" + Math.round(r.height) + "]");
  }

  // ---- line boxes: measure + orphans ----
  const lineGroups = (el) => {
    const rng = document.createRange(); const words = [];
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      const t = n.textContent; let i = 0;
      while (i < t.length) {
        while (i < t.length && /\s/.test(t[i])) i++;
        const s = i;
        while (i < t.length && !/\s/.test(t[i])) i++;
        if (i > s) { rng.setStart(n, s); rng.setEnd(n, i); const rc = rng.getBoundingClientRect();
          if (rc.width || rc.height) words.push({ w: t.slice(s, i), top: Math.round(rc.top) }); }
      }
    }
    const g = [];
    for (const w of words) { const f = g.find(x => Math.abs(x.top - w.top) < 5);
      if (f) { f.words.push(w.w); } else g.push({ top: w.top, words: [w.w] }); }
    return g.map(x => ({ chars: x.words.join(" ").length, n: x.words.length, words: x.words }));
  };

  const headings = [], bodies = [];
  for (const h of document.querySelectorAll("h1,h2")) {
    const r = h.getBoundingClientRect(); if (!r.width) continue;
    const g = lineGroups(h); if (!g.length) continue;
    headings.push({ tag: h.tagName, text: (h.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
      lines: g.length, maxChars: Math.max(...g.map(x => x.chars)),
      orphan: g.length > 1 && g[g.length - 1].n === 1, lastWord: (g[g.length - 1].words || []) });
  }
  for (const p of document.querySelectorAll("p")) {
    if ((p.textContent || "").trim().length < 120) continue;
    const g = lineGroups(p); if (g.length < 2) continue;
    bodies.push({ maxChars: Math.max(...g.slice(0, -1).map(x => x.chars)), lines: g.length,
      px: Math.round(parseFloat(getComputedStyle(p).fontSize)),
      cls: (typeof p.className === "string" ? p.className.trim().split(/\s+/).slice(0, 6).join(" ") : ""),
      w: Math.round(p.getBoundingClientRect().width),
      head: (p.textContent || "").trim().replace(/\s+/g, " ").slice(0, 34) });
  }

  // ---- motifs by viewBox signature ----
  const vb = {};
  for (const s of document.querySelectorAll("svg")) { const v = s.getAttribute("viewBox") || "none"; vb[v] = (vb[v] || 0) + 1; }
  const petal = document.querySelectorAll(".hairline-gold").length;

  // ---- interaction transitions ----
  const faq = document.querySelector("details.faq-item, .faq details, details");
  const faqIcon = faq ? faq.querySelector("svg") : null;
  const menu = document.querySelector("details.menu");
  const cs = (e) => e ? getComputedStyle(e).transitionDuration : null;

  return { url: location.pathname, vw: innerWidth,
    interactive: inter.length, noHover, noFocus, globalFocus, smallTarget,
    headings, bodies, vb, petal,
    faqIconTransition: cs(faqIcon), menuPanelTransition: menu ? cs(menu.querySelector("div")) : null,
    hoverSelCount: hoverSels.length, focusSelCount: focusSels.length };
})()`;

const out = {};
for (const [vp, w, h] of VIEWPORTS) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
  for (const [name, route] of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + route });
    await waitLoad();
    await send("Runtime.evaluate", { expression: SETTLE, awaitPromise: true, timeout: 60000 });
    const r = await send("Runtime.evaluate", { expression: PROBE, returnByValue: true });
    out[name + "@" + vp] = r.result.value;
    process.stdout.write(".");
  }
}
ws.close(); chrome.kill();
writeFileSync(OUT, JSON.stringify(out, null, 1), "utf8");
console.log("");

const k = (vp) => Object.keys(out).filter(x => x.endsWith("@" + vp));
const pad = (s, n) => String(s).padEnd(n);

console.log("=== GATE 6: hover / focus / target size ===");
let totalInter = 0, totalNoHover = 0, allSmall = new Set();
for (const key of Object.keys(out)) { const d = out[key]; totalInter += d.interactive; totalNoHover += d.noHover.length; if (key.endsWith("@375")) d.smallTarget.forEach(s => allSmall.add(s)); }
console.log("  interactive elements measured: " + totalInter);
console.log("  without a matching :hover rule: " + totalNoHover);
console.log("  global :focus-visible rule present: " + out["home@1280"].globalFocus + "  (so focus coverage is universal)");
const noHoverEx = [...new Set(Object.values(out).flatMap(d => d.noHover))];
console.log("  distinct elements lacking hover: " + noHoverEx.length);
noHoverEx.slice(0, 12).forEach(x => console.log("      " + x));
console.log("  distinct targets under 44px (min dimension): " + allSmall.size);
[...allSmall].slice(0, 12).forEach(x => console.log("      " + x));
console.log("  FAQ chevron transition: " + out["home@1280"].faqIconTransition + "   mobile menu panel: " + out["home@375"].menuPanelTransition);

console.log("");
console.log("=== GATE 7: heading orphans + line measure ===");
for (const vp of ["375", "768", "1280"]) {
  const orph = [];
  let maxH = 0, maxB = 0, minB = 999;
  for (const key of k(vp)) { const d = out[key];
    d.headings.forEach(h => { if (h.orphan) orph.push(key.replace("@" + vp, "") + " " + h.tag + " " + JSON.stringify(h.text) + " -> last line: " + JSON.stringify(h.lastWord.join(" "))); maxH = Math.max(maxH, h.maxChars); });
    d.bodies.forEach(b => { maxB = Math.max(maxB, b.maxChars); minB = Math.min(minB, b.maxChars); });
  }
  console.log("  " + vp + "px  orphaned headings: " + orph.length + "   longest heading line: " + maxH + " chars   body measure range: " + minB + "-" + maxB + " chars");
  orph.slice(0, 8).forEach(x => console.log("        " + x));
}
console.log("");
console.log("  body font sizes by page (375px):");
for (const key of k("375")) { const d = out[key]; const szs = [...new Set(d.bodies.map(b => b.px))].sort((a, b) => a - b);
  console.log("    " + pad(key.replace("@375", ""), 12) + szs.join(", ") + "px" + (szs.some(s => s < 16) ? "   <-- BELOW 16px" : "")); }

console.log("");
console.log("=== GATE 4: motif recurrence (1280) ===");
console.log("  " + pad("page", 12) + pad("mandala", 10) + pad("mascot", 9) + pad("svcIcon", 9) + pad("petal", 8) + "all svg");
for (const key of k("1280")) { const d = out[key];
  const man = (d.vb["0 0 32 32"] || 0) + (d.vb["0 0 200 200"] || 0);
  const mas = d.vb["0 0 64 64"] || 0, svc = d.vb["0 0 40 40"] || 0;
  const tot = Object.values(d.vb).reduce((a, b) => a + b, 0);
  console.log("  " + pad(key.replace("@1280", ""), 12) + pad(man, 10) + pad(mas, 9) + pad(svc, 9) + pad(d.petal, 8) + tot); }
console.log("");
console.log("  mascot at 375px:");
for (const key of k("375")) console.log("    " + pad(key.replace("@375", ""), 12) + (out[key].vb["0 0 64 64"] || 0));
