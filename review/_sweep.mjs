// Overflow sweep across every route and width, using the browser pane's own
// origin is not available here — this drives headless Chrome directly.
import { spawn } from "node:child_process";

const BASE = "http://localhost:4323";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9400 + Math.floor(Math.random() * 300);
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-sweep-" + Date.now(),
  "--no-first-run", "--no-default-browser-check", "--disable-extensions",
  "--hide-scrollbars", "--force-device-scale-factor=1", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function findWs() {
  for (let i = 0; i < 100; i++) {
    try { const l = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json();
      const p = l.find((t) => t.type === "page"); if (p) return p.webSocketDebuggerUrl; } catch {}
    await sleep(300);
  }
  throw new Error("chrome exposed no target on port " + PORT);
}
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
for (const w of [320, 375, 768, 1024, 1280, 1440]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 });
  for (const r of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + r });
    await waitLoad(); await sleep(400);
    const v = (await send("Runtime.evaluate", {
      expression: `(() => { const d = document.documentElement;
        return { over: d.scrollWidth - d.clientWidth, vw: d.clientWidth,
                 zoom: (document.querySelector(".deckinner") || {}).style ? (document.querySelector(".deckinner").style.zoom || "1") : null }; })()`,
      returnByValue: true })).result.value;
    if (v.over > 1) over.push(r + " @" + w + " (+" + v.over + "px)");
    events.filter((e) => e.method === "Log.entryAdded" && e.params.entry.level === "error")
      .forEach((e) => errs.push(r + " @" + w + ": " + e.params.entry.text.slice(0, 70)));
    if (r === "/design-options/") process.stdout.write("[" + w + ":z" + (v.zoom || "?") + "]");
    else process.stdout.write(".");
  }
}
ws.close(); chrome.kill();
console.log("");
console.log("");
console.log("=== 14 routes x 6 widths = 84 checks ===");
console.log("  overflowing : " + over.length);
over.slice(0, 10).forEach((x) => console.log("     " + x));
console.log("  console errors : " + errs.length);
errs.slice(0, 5).forEach((x) => console.log("     " + x));
console.log("");
console.log(over.length === 0 && errs.length === 0 ? "  ALL CLEAR" : "  NEEDS ATTENTION");
