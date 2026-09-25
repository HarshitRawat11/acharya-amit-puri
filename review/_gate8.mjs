// Capture the Gate 8 five-second-test instrument.
//
// The everyday review screenshots show the temporary Design Options tab. Gate 8
// asks a stranger "what would you click?", so a sixth nav link that will not
// exist in the shipped site would corrupt the answer. These two shots are taken
// from a build with that entry removed and gap-8 restored — v1 as it will ship.
import { spawn } from "node:child_process";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "C:/Users/harshit.rawat/Documents/Projects/Amit/.claude/worktrees/strange-yalow-a89535";
const OUT = join(ROOT, "review", "gate8");
const BASE = "http://localhost:4324";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const VIEWPORTS = [["375", 375, 812, true], ["1280", 1280, 900, false]];

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const PORT = 9530;
const profile = (process.env.TEMP || "C:/Windows/Temp") + "/cdp-gate8-" + Date.now();
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + profile, "--no-first-run", "--no-default-browser-check",
  "--disable-extensions", "--hide-scrollbars", "--force-device-scale-factor=1",
  "about:blank"], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function findWs() {
  for (let i = 0; i < 100; i++) {
    try {
      const l = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json();
      const p = l.find((t) => t.type === "page");
      if (p) return p.webSocketDebuggerUrl;
    } catch {}
    await sleep(300);
  }
  throw new Error("chrome exposed no target");
}

const ws = new WebSocket(await findWs());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); let events = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id); pending.delete(m.id);
    m.error ? rej(new Error(m.error.message)) : res(m.result);
  } else if (m.method) events.push(m);
};
const send = (method, params = {}) => new Promise((res, rej) => {
  const i = ++id; pending.set(i, { res, rej });
  ws.send(JSON.stringify({ id: i, method, params }));
});
const waitLoad = async () => {
  const t = Date.now();
  while (Date.now() - t < 25000) {
    if (events.some((e) => e.method === "Page.loadEventFired")) return;
    await sleep(50);
  }
};
await send("Page.enable"); await send("Runtime.enable");

const SETTLE = `(async()=>{const w=m=>new Promise(r=>setTimeout(r,m));
 const e=[...document.querySelectorAll("[data-reveal]")].filter(x=>x.getBoundingClientRect().top<innerHeight&&x.offsetParent!==null);
 const t=Date.now(); while(Date.now()-t<6000){if(!e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99).length)break;await w(150);}
 await w(600); return e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99).length;})()`;

// Confirm the temporary tab really is absent from what we are about to shoot.
const NAVCHECK = `JSON.stringify([...document.querySelectorAll('nav[aria-label="Primary"] a')].map(a=>a.textContent.trim()))`;

for (const [vp, w, h, mobile] of VIEWPORTS) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
  events = [];
  await send("Page.navigate", { url: BASE + "/" });
  await waitLoad();
  const left = await send("Runtime.evaluate", { expression: SETTLE, awaitPromise: true, returnByValue: true, timeout: 30000 });
  const nav = await send("Runtime.evaluate", { expression: NAVCHECK, returnByValue: true });
  const labels = JSON.parse(nav.result.value || "[]");
  const dirty = labels.some((l) => /design options/i.test(l));
  const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 92 });
  writeFileSync(join(OUT, "home--fold-" + vp + ".jpg"), Buffer.from(s.data, "base64"));
  console.log(vp + "px  nav=[" + labels.join(", ") + "]  unrevealed=" + left.result.value +
    (dirty ? "  *** DESIGN OPTIONS STILL PRESENT ***" : "  clean"));
}

ws.close(); chrome.kill();
console.log("wrote review/gate8/home--fold-375.jpg and home--fold-1280.jpg");
