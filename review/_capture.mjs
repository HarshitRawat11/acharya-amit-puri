// Regenerate the review screenshots against the CURRENT build.
//
// The previous set was captured before the temple-niche service cards, the nav
// gap fix and the design-options rework, so it showed a site that no longer
// exists. Stale evidence is worse than none: it gets cited.
//
// Two captures per page per width — the fold (first impression) and the full
// page — at phone and laptop. Reveals are settled before every shot.
import { spawn } from "node:child_process";
import { writeFileSync, readdirSync, unlinkSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "C:/Users/harshit.rawat/Documents/Projects/Amit/.claude/worktrees/strange-yalow-a89535";
const REVIEW = join(ROOT, "review");
const BASE = "http://localhost:4323";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const ROUTES = [
  ["home", "/"], ["about", "/about/"], ["services", "/services/"],
  ["service-vastu-report", "/services/vastu-report/"], ["service-astro-advice", "/services/astro-advice/"],
  ["service-numero-advice", "/services/numero-advice/"], ["service-prakriti-advice", "/services/prakriti-advice/"],
  ["service-design-advice", "/services/design-advice/"], ["service-palmistry-advice", "/services/palmistry-advice/"],
  ["contact", "/contact/"], ["articles", "/articles/"], ["privacy", "/privacy/"],
  ["404", "/404.html"], ["design-options", "/design-options/"],
];
const VIEWPORTS = [["375", 375, 812], ["1280", 1280, 900]];

if (!existsSync(REVIEW)) mkdirSync(REVIEW, { recursive: true });

// clear the stale set so nothing old survives to be quoted later
let cleared = 0;
for (const f of readdirSync(REVIEW)) {
  if (f.endsWith(".jpg")) { unlinkSync(join(REVIEW, f)); cleared++; }
}
const G3 = join(REVIEW, "gate3");
if (existsSync(G3)) for (const f of readdirSync(G3)) { if (f.endsWith(".jpg")) { unlinkSync(join(G3, f)); cleared++; } }
console.log("cleared " + cleared + " stale screenshots");

const PORT = 9520;
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-cap-" + Date.now(),
  "--no-first-run", "--no-default-browser-check", "--disable-extensions",
  "--hide-scrollbars", "--force-device-scale-factor=1", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function findWs() {
  for (let i = 0; i < 100; i++) {
    try { const l = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json();
      const p = l.find((t) => t.type === "page"); if (p) return p.webSocketDebuggerUrl; } catch {}
    await sleep(300);
  }
  throw new Error("chrome exposed no target");
}
const ws = new WebSocket(await findWs());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); let events = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } else if (m.method) events.push(m); };
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const waitLoad = async () => { const t = Date.now(); while (Date.now() - t < 25000) { if (events.some((e) => e.method === "Page.loadEventFired")) return; await sleep(50); } };
await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable");

const SETTLE_FOLD = `(async()=>{const w=m=>new Promise(r=>setTimeout(r,m));
 const e=[...document.querySelectorAll("[data-reveal]")].filter(x=>x.getBoundingClientRect().top<innerHeight&&x.offsetParent!==null);
 const t=Date.now(); while(Date.now()-t<6000){if(!e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99).length)break;await w(150);}
 await w(600); return e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99).length;})()`;

const SETTLE_FULL = `(async()=>{const w=m=>new Promise(r=>setTimeout(r,m));const H=document.documentElement.scrollHeight;
 for(let y=0;y<=H;y+=Math.round(innerHeight*0.5)){scrollTo(0,y);await w(260);} scrollTo(0,H);await w(500);
 const e=[...document.querySelectorAll("[data-reveal]")];const t=Date.now();
 while(Date.now()-t<8000){if(!e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99).length)break;await w(200);}
 scrollTo(0,0);await w(900);
 return e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99 && x.offsetParent!==null).length;})()`;

let shots = 0; const unsettled = [], errs = [];
for (const [vp, w, h] of VIEWPORTS) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
  for (const [name, route] of ROUTES) {
    // ---- above the fold
    events = [];
    await send("Page.navigate", { url: BASE + route });
    await waitLoad();
    await send("Runtime.evaluate", { expression: SETTLE_FOLD, awaitPromise: true, returnByValue: true, timeout: 30000 });
    let s = await send("Page.captureScreenshot", { format: "jpeg", quality: 88 });
    writeFileSync(join(REVIEW, name + "--fold-" + vp + ".jpg"), Buffer.from(s.data, "base64"));
    shots++;

    // ---- whole page
    const left = await send("Runtime.evaluate", { expression: SETTLE_FULL, awaitPromise: true, returnByValue: true, timeout: 60000 });
    if (left.result.value > 0) unsettled.push(name + "@" + vp + " (" + left.result.value + " unrevealed)");
    s = await send("Page.captureScreenshot", { format: "jpeg", quality: 85, captureBeyondViewport: true });
    writeFileSync(join(REVIEW, name + "--" + vp + ".jpg"), Buffer.from(s.data, "base64"));
    shots++;

    events.filter((e) => e.method === "Log.entryAdded" && e.params.entry.level === "error")
      .forEach((e) => errs.push(route + " @" + vp + ": " + e.params.entry.text.slice(0, 70)));
    process.stdout.write(".");
  }
}
ws.close(); chrome.kill();
console.log("");
console.log("captured " + shots + " screenshots (" + ROUTES.length + " routes x " + VIEWPORTS.length + " widths x fold+full)");
console.log("captures with content still unrevealed: " + unsettled.length);
unsettled.slice(0, 6).forEach((x) => console.log("   " + x));
console.log("console errors: " + errs.length);
errs.slice(0, 5).forEach((x) => console.log("   " + x));
