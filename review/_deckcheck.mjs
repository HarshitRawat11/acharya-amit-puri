// Does the restored design-options page break anything? Overflow across all 14
// routes, plus the tab switcher actually working.
import { spawn } from "node:child_process";

const BASE = "http://localhost:4323";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9372;
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-deck-1928439786",
  "--no-first-run", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function findWs() { for (let i = 0; i < 80; i++) { try { const l = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json(); const p = l.find((t) => t.type === "page"); if (p) return p.webSocketDebuggerUrl; } catch {} await sleep(250); } throw new Error("no target"); }
const ws = new WebSocket(await findWs());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); let events = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } else if (m.method) events.push(m); };
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const waitLoad = async () => { const t = Date.now(); while (Date.now() - t < 25000) { if (events.some((e) => e.method === "Page.loadEventFired")) return; await sleep(50); } };
await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable");

const ROUTES = ["/", "/about/", "/services/", "/services/vastu-report/", "/services/astro-advice/",
  "/services/numero-advice/", "/services/prakriti-advice/", "/services/design-advice/",
  "/services/palmistry-advice/", "/contact/", "/articles/", "/privacy/", "/404.html", "/design-options/"];

const over = [], errs = [];
for (const w of [375, 768, 1280]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 });
  for (const r of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + r });
    await waitLoad(); await sleep(250);
    const v = (await send("Runtime.evaluate", {
      expression: `(() => { const d = document.documentElement; return d.scrollWidth - d.clientWidth; })()`,
      returnByValue: true })).result.value;
    if (v > 1) over.push(r + " @" + w + " +" + v + "px");
    events.filter((e) => e.method === "Log.entryAdded" && e.params.entry.level === "error")
      .forEach((e) => errs.push(r + " @" + w + ": " + e.params.entry.text.slice(0, 80)));
    process.stdout.write(".");
  }
}

// the tab switcher
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
events = [];
await send("Page.navigate", { url: BASE + "/design-options/" });
await waitLoad(); await sleep(700);
const tabs = (await send("Runtime.evaluate", {
  expression: `(() => {
    const L = document.getElementById("panel-layouts"), I = document.getElementById("panel-intent");
    const btns = [...document.querySelectorAll(".tab")];
    const start = { layoutsHidden: L.hidden, intentHidden: I.hidden, buttons: btns.length };
    btns.find(b => b.dataset.tab === "intent").click();
    const after = { layoutsHidden: L.hidden, intentHidden: I.hidden };
    btns.find(b => b.dataset.tab === "layouts").click();
    const back = { layoutsHidden: L.hidden, intentHidden: I.hidden };
    return { start, after, back,
      layoutPanes: document.querySelectorAll(".deck").length,
      intentPanes: document.querySelectorAll(".iframe-wrap").length };
  })()`, returnByValue: true })).result.value;

ws.close(); chrome.kill();
console.log("");
console.log("=== overflow, 14 routes x 3 widths ===");
console.log("  checks: 42   overflowing: " + over.length);
over.slice(0, 8).forEach((x) => console.log("     " + x));
console.log("");
console.log("=== console errors: " + errs.length);
errs.slice(0, 5).forEach((x) => console.log("     " + x));
console.log("");
console.log("=== tab switcher ===");
console.log("  buttons: " + tabs.start.buttons + "   layout panes: " + tabs.layoutPanes + "   intent panes: " + tabs.intentPanes);
console.log("  on load      -> layouts hidden=" + tabs.start.layoutsHidden + "  intent hidden=" + tabs.start.intentHidden);
console.log("  click intent -> layouts hidden=" + tabs.after.layoutsHidden + "  intent hidden=" + tabs.after.intentHidden);
console.log("  click back   -> layouts hidden=" + tabs.back.layoutsHidden + "  intent hidden=" + tabs.back.intentHidden);
const good = tabs.start.layoutsHidden === false && tabs.start.intentHidden === true
  && tabs.after.layoutsHidden === true && tabs.after.intentHidden === false
  && tabs.back.layoutsHidden === false && tabs.back.intentHidden === true;
console.log("  " + (good ? "PASS â€” tabs switch correctly both ways" : "FAIL â€” tab state wrong"));

