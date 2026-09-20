// Pre-presentation verification, run against PRODUCTION rather than a local build.
import { spawn } from "node:child_process";

const BASE = "https://acharya-amit-puri.pages.dev";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9351;
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-live",
  "--no-first-run", "--hide-scrollbars", "--force-device-scale-factor=1", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function findWs() { for (let i = 0; i < 80; i++) { try { const l = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json(); const p = l.find((t) => t.type === "page"); if (p) return p.webSocketDebuggerUrl; } catch {} await sleep(250); } throw new Error("no target"); }
const ws = new WebSocket(await findWs());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); let events = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } else if (m.method) events.push(m); };
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const waitLoad = async () => { const t = Date.now(); while (Date.now() - t < 25000) { if (events.some((e) => e.method === "Page.loadEventFired")) return; await sleep(50); } };
await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable"); await send("Network.enable");

const ROUTES = ["/", "/about/", "/services/", "/services/vastu-report/", "/services/astro-advice/",
  "/services/numero-advice/", "/services/prakriti-advice/", "/services/design-advice/",
  "/services/palmistry-advice/", "/contact/", "/articles/", "/privacy/", "/404.html"];

const SETTLE = `(async()=>{const w=(m)=>new Promise(r=>setTimeout(r,m));const H=document.documentElement.scrollHeight;
 for(let y=0;y<=H;y+=Math.round(innerHeight*0.5)){scrollTo(0,y);await w(200);}
 const e=[...document.querySelectorAll("[data-reveal]")];const t=Date.now();
 while(Date.now()-t<6000){if(!e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99).length)break;await w(150);}
 scrollTo(0,0);await w(600);})()`;

const CHECK = String.raw`(() => {
  const parse = (c) => { const p = (String(c).match(/[0-9.]+/g) || []).map(Number); return p.length < 3 ? null : { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const blend = (x, y) => ({ r: x.r*x.a + y.r*(1-x.a), g: x.g*x.a + y.g*(1-x.a), b: x.b*x.a + y.b*(1-x.a), a: 1 });
  const lum = (c) => { const ch = [c.r,c.g,c.b].map(v => { v/=255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }); return 0.2126*ch[0]+0.7152*ch[1]+0.0722*ch[2]; };
  const ratio = (a,b) => { const l1=lum(a), l2=lum(b); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); };
  const SKIP = { SCRIPT:1, STYLE:1, NOSCRIPT:1, TEMPLATE:1 };
  const fails = []; let n = 0;
  for (const el of document.body.querySelectorAll("*")) {
    if (SKIP[el.tagName]) continue;
    const txt = [...el.childNodes].filter(x => x.nodeType === 3).map(x => x.textContent).join("").trim();
    if (!txt) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) continue;
    const rc = el.getBoundingClientRect();
    if (rc.width < 4 || rc.height < 4) continue;
    let hid = false;
    for (let p = el.parentElement; p; p = p.parentElement) { const s = getComputedStyle(p); if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) { hid = true; break; } }
    if (hid) continue;
    let bg = null;
    for (let p = el; p; p = p.parentElement) { const c = parse(getComputedStyle(p).backgroundColor); if (c && c.a > 0) { bg = c.a < 1 ? blend(c, {r:255,g:255,b:255,a:1}) : c; break; } }
    if (!bg) bg = { r:255, g:255, b:255, a:1 };
    let fg = parse(cs.color); if (!fg) continue;
    if (fg.a < 1) fg = blend(fg, bg);
    n++;
    const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight, 10) || 400;
    const need = (size >= 24 || (size >= 18.66 && weight >= 700)) ? 3 : 4.5;
    const got = ratio(fg, bg);
    if (got < need) fails.push(el.tagName.toLowerCase() + " " + Math.round(size) + "px " + (Math.round(got*100)/100));
  }
  const de = document.documentElement;
  const acts = [...document.querySelectorAll("a[href],button")].filter(e => {
    const r = e.getBoundingClientRect();
    if (!(r.top < innerHeight && r.bottom > 0 && r.width > 0 && r.height > 0)) return false;
    for (let p = e.parentElement; p; p = p.parentElement) if (p.tagName === "DETAILS" && !p.open) return false;
    return e.offsetParent !== null;
  }).length;
  const thirdParty = [...document.querySelectorAll("script[src],link[href],img[src]")]
    .map(e => e.getAttribute("src") || e.getAttribute("href"))
    .filter(u => u && /^https?:\/\//.test(u) && !u.includes(location.host));
  return { contrastChecked: n, contrastFails: fails.length, fails: fails.slice(0,4),
    overflow: de.scrollWidth - de.clientWidth, aboveFoldActions: acts, thirdParty };
})()`;

let cChecked = 0, cFails = [], overflow = [], noAction = [], thirdParty = new Set(), consoleErrors = [];
for (const vp of [[375, 812], [1280, 900]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: vp[0], height: vp[1], deviceScaleFactor: 1, mobile: vp[0] < 768 });
  for (const r of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + r });
    await waitLoad();
    await send("Runtime.evaluate", { expression: SETTLE, awaitPromise: true, timeout: 40000 });
    const v = (await send("Runtime.evaluate", { expression: CHECK, returnByValue: true })).result.value;
    cChecked += v.contrastChecked;
    v.fails.forEach((f) => cFails.push(r + " @" + vp[0] + " " + f));
    if (v.overflow > 1) overflow.push(r + " @" + vp[0] + " +" + v.overflow + "px");
    if (v.aboveFoldActions === 0) noAction.push(r + " @" + vp[0]);
    v.thirdParty.forEach((u) => thirdParty.add(new URL(u).origin));
    events.filter((e) => e.method === "Log.entryAdded" && e.params.entry.level === "error")
      .forEach((e) => consoleErrors.push(r + " @" + vp[0] + ": " + e.params.entry.text.slice(0, 90)));
    process.stdout.write(".");
  }
}
ws.close(); chrome.kill();
const line = (label, ok, detail) => console.log("  " + (ok ? "PASS  " : "FAIL  ") + label.padEnd(46) + detail);
console.log("");
console.log("=== LIVE VERIFICATION — " + BASE + " ===");
console.log("");
line("WCAG AA contrast", cFails.length === 0, cChecked + " text elements, " + cFails.length + " failures");
cFails.slice(0, 5).forEach((x) => console.log("          " + x));
line("No horizontal overflow", overflow.length === 0, 26 + " page loads, " + overflow.length + " overflowing");
overflow.slice(0, 5).forEach((x) => console.log("          " + x));
line("Action above the fold on every page", noAction.length === 0, noAction.length ? noAction.join(", ") : "all 13 pages, both viewports");
line("No third-party requests (O3 / O4)", thirdParty.size === 0, thirdParty.size ? [...thirdParty].join(", ") : "0 external origins");
line("No console errors", consoleErrors.length === 0, consoleErrors.length + " errors");
consoleErrors.slice(0, 5).forEach((x) => console.log("          " + x));
