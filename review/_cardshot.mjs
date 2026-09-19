// Capture the service-card grid so the Decision 3 change can be seen.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import sharp from "sharp";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9347;
const OUT = "C:/Users/harshit.rawat/Documents/Projects/Amit/.claude/worktrees/strange-yalow-a89535/review/service-cards.jpg";
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-card",
  "--no-first-run", "--hide-scrollbars", "--force-device-scale-factor=2", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function findWs() { for (let i = 0; i < 80; i++) { try { const l = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json(); const p = l.find((t) => t.type === "page"); if (p) return p.webSocketDebuggerUrl; } catch {} await sleep(250); } throw new Error("no target"); }
const ws = new WebSocket(await findWs());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); let events = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } else if (m.method) events.push(m); };
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const waitLoad = async () => { const t = Date.now(); while (Date.now() - t < 20000) { if (events.some((e) => e.method === "Page.loadEventFired")) return; await sleep(40); } };

await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 1000, deviceScaleFactor: 2, mobile: false });
await send("Page.navigate", { url: "http://localhost:4323/services/" });
await waitLoad();
await send("Runtime.evaluate", {
  expression: `(async()=>{const w=(m)=>new Promise(r=>setTimeout(r,m));const H=document.documentElement.scrollHeight;
   for(let y=0;y<=H;y+=400){scrollTo(0,y);await w(220);} scrollTo(0,0);await w(900);})()`,
  awaitPromise: true, timeout: 40000,
});
const rect = (await send("Runtime.evaluate", {
  expression: `(() => { const c = document.querySelectorAll('a[href^="/services/"]');
    const cards = [...c].filter(e => e.querySelector("h3"));
    if (!cards.length) return null;
    const r0 = cards[0].getBoundingClientRect(), r1 = cards[Math.min(2, cards.length-1)].getBoundingClientRect();
    return { x: Math.round(r0.left) - 16, y: Math.round(r0.top + window.scrollY) - 16,
             w: Math.round(r1.right - r0.left) + 32, h: Math.round(r0.height) + 32 }; })()`,
  returnByValue: true,
})).result.value;
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
ws.close(); chrome.kill();

const buf = Buffer.from(shot.data, "base64");
if (rect) {
  await sharp(buf)
    .extract({ left: rect.x * 2, top: rect.y * 2, width: rect.w * 2, height: rect.h * 2 })
    .resize(1100)
    .jpeg({ quality: 90 })
    .toFile(OUT);
  console.log("cropped to the card row: " + JSON.stringify(rect));
} else {
  writeFileSync(OUT.replace(".jpg", ".png"), buf);
  console.log("no card rect found; wrote full page");
}
console.log("written: " + OUT);
