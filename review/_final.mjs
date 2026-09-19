// Final verification: responsive overflow (D3) and WCAG AA contrast (O12/G10)
// across every page, after the Phase G fixes.
import { spawn } from "node:child_process";

const BASE = "http://localhost:4323";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9343;
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-final",
  "--no-first-run", "--hide-scrollbars", "--force-device-scale-factor=1", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function findWs() { for (let i = 0; i < 80; i++) { try { const l = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json(); const p = l.find((t) => t.type === "page"); if (p) return p.webSocketDebuggerUrl; } catch {} await sleep(250); } throw new Error("no target"); }
const ws = new WebSocket(await findWs());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); let events = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } else if (m.method) events.push(m); };
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const waitLoad = async () => { const t = Date.now(); while (Date.now() - t < 20000) { if (events.some((e) => e.method === "Page.loadEventFired")) return; await sleep(40); } };
await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable");

const ROUTES = ["/", "/about/", "/services/", "/services/vastu-report/", "/services/astro-advice/",
  "/services/numero-advice/", "/services/prakriti-advice/", "/services/design-advice/",
  "/services/palmistry-advice/", "/contact/", "/articles/", "/privacy/", "/404.html"];

const OVERFLOW = `(() => { const de = document.documentElement;
  return { over: de.scrollWidth - de.clientWidth, sw: de.scrollWidth, cw: de.clientWidth }; })()`;

const CONTRAST = String.raw`(() => {
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
    if (got < need) fails.push(el.tagName.toLowerCase() + " " + Math.round(size) + "px ratio " + (Math.round(got*100)/100) + " need " + need + " :: " + txt.slice(0, 36));
  }
  return { n, fails };
})()`;

let overflowFails = [], overflowChecks = 0;
for (const w of [320, 768, 1024, 1440]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: 800, deviceScaleFactor: 1, mobile: w < 768 });
  for (const r of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + r });
    await waitLoad(); await sleep(120);
    overflowChecks++;
    const o = (await send("Runtime.evaluate", { expression: OVERFLOW, returnByValue: true })).result.value;
    if (o.over > 1) overflowFails.push(r + " @" + w + " (+" + o.over + "px)");
  }
  process.stdout.write("o");
}

let cFails = [], cChecked = 0, consoleErrors = 0;
for (const w of [375, 1280]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: w < 768 ? 812 : 900, deviceScaleFactor: 1, mobile: w < 768 });
  for (const r of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + r });
    await waitLoad();
    await send("Runtime.evaluate", { expression: `(async()=>{const w=(m)=>new Promise(r=>setTimeout(r,m));const H=document.documentElement.scrollHeight;for(let y=0;y<=H;y+=Math.round(innerHeight*0.5)){scrollTo(0,y);await w(200);}scrollTo(0,0);await w(600);})()`, awaitPromise: true, timeout: 40000 });
    const c = (await send("Runtime.evaluate", { expression: CONTRAST, returnByValue: true })).result.value;
    cChecked += c.n;
    c.fails.forEach((x) => cFails.push(r + " @" + w + "  " + x));
    consoleErrors += events.filter((e) => e.method === "Log.entryAdded" && e.params.entry.level === "error").length;
    process.stdout.write("c");
  }
}
ws.close(); chrome.kill();
console.log("");
console.log("=== D3 — responsive overflow (320 / 768 / 1024 / 1440) ===");
console.log("  checks: " + overflowChecks + "   overflows: " + overflowFails.length);
overflowFails.slice(0, 10).forEach((x) => console.log("     " + x));
console.log("");
console.log("=== O12 / Gate 10 — WCAG AA contrast (375 + 1280) ===");
console.log("  text elements measured: " + cChecked + "   failures: " + cFails.length);
cFails.slice(0, 12).forEach((x) => console.log("     " + x));
console.log("");
console.log("=== O5 — console errors: " + consoleErrors);
