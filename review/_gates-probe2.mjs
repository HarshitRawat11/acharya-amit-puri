// Targeted re-measurement: FAQ accordion, menu transition, mascot VISIBILITY.
import { spawn } from "node:child_process";

const BASE = "http://localhost:4323";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9338;
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-gates2",
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


const FAQ = `(() => {
  const d = document.querySelector("details.faq");
  if (!d) return { present: false };
  const sum = d.querySelector("summary");
  const chev = d.querySelector(".faq-chevron");
  const g = (e) => e ? { dur: getComputedStyle(e).transitionDuration, prop: getComputedStyle(e).transitionProperty, ease: getComputedStyle(e).transitionTimingFunction, tf: getComputedStyle(e).transform } : null;
  const before = g(chev);
  d.open = true;
  const rect = sum.getBoundingClientRect();
  return { present: true, count: document.querySelectorAll("details.faq").length,
    chevronClosed: before, summaryH: Math.round(rect.height), summaryW: Math.round(rect.width),
    panelAnimates: getComputedStyle(d).transitionDuration };
})()`;

const AFTER = `(() => { const c = document.querySelector("details.faq .faq-chevron");
  return { transform: getComputedStyle(c).transform }; })()`;

const MASCOT = `(() => {
  const vis = (els) => els.filter(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden" && e.offsetParent !== null; });
  const all = [...document.querySelectorAll('svg[viewBox="0 0 64 64"]')];
  const mand = [...document.querySelectorAll('svg[viewBox="0 0 32 32"], svg[viewBox="0 0 200 200"]')];
  return { mascotDom: all.length, mascotVisible: vis(all).length, mandalaVisible: vis(mand).length };
})()`;

const ROUTES = [["home", "/"], ["about", "/about/"], ["services", "/services/"], ["contact", "/contact/"], ["privacy", "/privacy/"]];

console.log("=== FAQ accordion (1280, home) ===");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
events = [];
await send("Page.navigate", { url: BASE + "/" });
await waitLoad(); await sleep(900);
let r = await send("Runtime.evaluate", { expression: FAQ, returnByValue: true });
console.log(JSON.stringify(r.result.value, null, 2));
await sleep(700);
r = await send("Runtime.evaluate", { expression: AFTER, returnByValue: true });
console.log("  chevron transform after opening (settled): " + r.result.value.transform);

console.log("");
console.log("=== mascot + mandala VISIBILITY (not DOM presence) ===");
console.log("  " + "page".padEnd(12) + "375: dom/vis".padEnd(16) + "1280: dom/vis".padEnd(16) + "mandala vis 375 / 1280");
for (const [name, route] of ROUTES) {
  const row = {};
  for (const [vp, w, h] of [["375", 375, 812], ["1280", 1280, 900]]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
    events = [];
    await send("Page.navigate", { url: BASE + route });
    await waitLoad(); await sleep(600);
    const res = await send("Runtime.evaluate", { expression: MASCOT, returnByValue: true });
    row[vp] = res.result.value;
  }
  console.log("  " + name.padEnd(12) + (row["375"].mascotDom + "/" + row["375"].mascotVisible).padEnd(16) +
    (row["1280"].mascotDom + "/" + row["1280"].mascotVisible).padEnd(16) + row["375"].mandalaVisible + " / " + row["1280"].mandalaVisible);
}
ws.close(); chrome.kill();
