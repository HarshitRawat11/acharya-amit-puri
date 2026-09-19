// Confirm Gate 2c (type scale) and Gate 6d (panel animation) after the fixes.
import { spawn } from "node:child_process";

const BASE = "http://localhost:4323";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9341;
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-v2",
  "--no-first-run", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
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
 for(let y=0;y<=H;y+=Math.round(innerHeight*0.5)){scrollTo(0,y);await w(200);} scrollTo(0,0);await w(700);})()`;

const TYPE = `(() => { const s = {}, c = {};
 const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1, TITLE: 1 };
 for (const el of document.body.querySelectorAll("*")) {
   if (SKIP[el.tagName]) continue;
   const t = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join("").trim();
   if (!t) continue;
   const rc = el.getBoundingClientRect();
   if (rc.width < 4 || rc.height < 4) continue;          // sr-only / clipped
   if (el.offsetParent === null && getComputedStyle(el).position !== "fixed") continue;
   const g = getComputedStyle(el);
   const px = Math.round(parseFloat(g.fontSize));
   const fam = g.fontFamily.split(",")[0].replace(/["']/g, "").trim();
   const lh = Math.round(parseFloat(g.lineHeight) / parseFloat(g.fontSize) * 100) / 100 || "n";
   s[px] = (s[px] || 0) + 1;
   c[px + "/" + g.fontWeight + "/lh" + lh + "/" + fam] = 1;
 }
 return { sizes: Object.keys(s).map(Number).sort((a,b)=>a-b), combos: Object.keys(c) }; })()`;

const ROUTES = ["/", "/about/", "/services/", "/services/vastu-report/", "/services/astro-advice/",
  "/services/numero-advice/", "/services/prakriti-advice/", "/services/design-advice/",
  "/services/palmistry-advice/", "/contact/", "/articles/", "/privacy/", "/404.html"];

const allSizes = new Map(), allCombos = new Set();
for (const vp of [[375, 812], [1280, 900]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: vp[0], height: vp[1], deviceScaleFactor: 1, mobile: vp[0] < 768 });
  for (const r of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + r });
    await waitLoad();
    await send("Runtime.evaluate", { expression: SETTLE, awaitPromise: true, timeout: 40000 });
    const res = (await send("Runtime.evaluate", { expression: TYPE, returnByValue: true })).result.value;
    for (const s of res.sizes) allSizes.set(s, (allSizes.get(s) || new Set()).add(r));
    res.combos.forEach((x) => allCombos.add(x));
    process.stdout.write(".");
  }
}
console.log("");
console.log("=== GATE 2c — TYPE SCALE (cap: 8 sizes each on >=2 pages, 14 combinations) ===");
const sizes = [...allSizes.keys()].sort((a, b) => a - b);
console.log("  distinct rendered sizes: " + sizes.length + "  ->  " + sizes.join(", ") + "px");
for (const [px, pages] of [...allSizes.entries()].sort((a, b) => a[0] - b[0]))
  if (pages.size < 2) console.log("     " + px + "px used on only " + pages.size + " page: " + [...pages].join(" "));
console.log("  distinct size/weight/line-height/family combinations: " + allCombos.size);
[...allCombos].sort().forEach((c) => console.log("     " + c));

console.log("");
console.log("=== GATE 6d — PANEL ANIMATION ===");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
events = [];
await send("Page.navigate", { url: BASE + "/" });
await waitLoad(); await sleep(800);
const PANEL = `(() => {
  const supported = CSS.supports("interpolate-size", "allow-keywords");
  const faq = document.querySelector("details.faq");
  const menu = document.querySelector("details.menu");
  const read = (el) => { if (!el) return null;
    try { const cs = getComputedStyle(el, "::details-content");
      return { dur: cs.transitionDuration, prop: cs.transitionProperty, size: cs.blockSize }; } catch (e) { return "unreadable"; } };
  return { supported, faqClosed: read(faq), menuClosed: read(menu) };
})()`;
let p = (await send("Runtime.evaluate", { expression: PANEL, returnByValue: true })).result.value;
console.log("  interpolate-size supported: " + p.supported);
console.log("  FAQ  ::details-content closed -> " + JSON.stringify(p.faqClosed));
console.log("  menu ::details-content closed -> " + JSON.stringify(p.menuClosed));
await send("Runtime.evaluate", { expression: `document.querySelector("details.faq").open = true;` });
await sleep(500);
p = (await send("Runtime.evaluate", { expression: PANEL, returnByValue: true })).result.value;
console.log("  FAQ  ::details-content open   -> " + JSON.stringify(p.faqClosed));
ws.close(); chrome.kill();
