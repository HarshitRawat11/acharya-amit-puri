// Full gate re-verification against PRODUCTION.
//
// Stage 1 was signed on 2026-09-20 from measurements taken before the last
// round of changes: the design-options restoration, the deck scaling and the
// header nav-gap fix. That fix touched the header on every page at every
// width, and only three pages were spot-checked at 768px afterwards. This
// re-runs everything that can be measured without a human.
import { spawn } from "node:child_process";

const BASE = process.env.TARGET || "https://acharya-amit-puri.pages.dev";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9600 + Math.floor(Math.random() * 200);

const ROUTES = [
  ["home", "/"], ["about", "/about/"], ["services", "/services/"],
  ["vastu", "/services/vastu-report/"], ["astro", "/services/astro-advice/"],
  ["numero", "/services/numero-advice/"], ["prakriti", "/services/prakriti-advice/"],
  ["design", "/services/design-advice/"], ["palmistry", "/services/palmistry-advice/"],
  ["contact", "/contact/"], ["articles", "/articles/"], ["privacy", "/privacy/"],
  ["404", "/404.html"], ["design-options", "/design-options/"],
];
const WIDTHS = [320, 375, 768, 1024, 1280, 1440];

const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + (process.env.TEMP || "C:/Windows/Temp") + "/cdp-rv-" + Date.now(),
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
const waitLoad = async () => { const t = Date.now(); while (Date.now() - t < 30000) { if (events.some((e) => e.method === "Page.loadEventFired")) return; await sleep(50); } };
await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable");

const SETTLE = `(async()=>{const w=m=>new Promise(r=>setTimeout(r,m));const H=document.documentElement.scrollHeight;
 for(let y=0;y<=H;y+=Math.round(innerHeight*0.6)){scrollTo(0,y);await w(170);}
 const e=[...document.querySelectorAll("[data-reveal]")];const t=Date.now();
 while(Date.now()-t<6000){if(!e.filter(x=>parseFloat(getComputedStyle(x).opacity)<0.99&&x.offsetParent!==null).length)break;await w(160);}
 scrollTo(0,0);await w(600);})()`;

const PROBE = String.raw`(() => {
  const d = document.documentElement, vw = d.clientWidth;
  const SKIP = { SCRIPT:1, STYLE:1, NOSCRIPT:1, TEMPLATE:1 };
  const parse = (c) => { const p = (String(c).match(/[0-9.]+/g)||[]).map(Number); return p.length<3?null:{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const blend = (x,y) => ({r:x.r*x.a+y.r*(1-x.a),g:x.g*x.a+y.g*(1-x.a),b:x.b*x.a+y.b*(1-x.a),a:1});
  const lum = (c) => { const ch=[c.r,c.g,c.b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*ch[0]+0.7152*ch[1]+0.0722*ch[2]; };
  const ratio = (a,b) => { const l1=lum(a),l2=lum(b); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); };

  const sizes = {}, combos = {}, contrast = [], orphans = [];
  let text = 0, wideBody = 0, smallBody = 0;

  const lineChars = (el) => {
    const rng = document.createRange(); const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n, words = [];
    while ((n = tw.nextNode())) { const t = n.textContent; let i = 0;
      while (i < t.length) { while (i < t.length && /\s/.test(t[i])) i++; const s = i;
        while (i < t.length && !/\s/.test(t[i])) i++;
        if (i > s) { rng.setStart(n,s); rng.setEnd(n,i); const r = rng.getBoundingClientRect();
          if (r.width||r.height) words.push({w:t.slice(s,i), top:Math.round(r.top)}); } } }
    const g = [];
    for (const x of words) { const f = g.find(y=>Math.abs(y.top-x.top)<5); if (f) f.words.push(x.w); else g.push({top:x.top, words:[x.w]}); }
    return g.map(x=>({chars:x.words.join(" ").length, n:x.words.length}));
  };

  for (const el of document.body.querySelectorAll("*")) {
    if (SKIP[el.tagName] || el.closest(".deckinner")) continue;
    const t = [...el.childNodes].filter(x=>x.nodeType===3).map(x=>x.textContent).join("").trim();
    if (!t) continue;
    const cs = getComputedStyle(el);
    if (cs.display==="none"||cs.visibility==="hidden"||+cs.opacity===0) continue;
    const rc = el.getBoundingClientRect();
    if (rc.width<4||rc.height<4) continue;
    let hid=false; for (let p=el.parentElement;p;p=p.parentElement){const s=getComputedStyle(p); if(s.display==="none"||s.visibility==="hidden"||+s.opacity===0){hid=true;break;}}
    if (hid) continue;

    const px = Math.round(parseFloat(cs.fontSize));
    const fam = cs.fontFamily.split(",")[0].replace(/["']/g,"").trim();
    const lh = Math.round(parseFloat(cs.lineHeight)/parseFloat(cs.fontSize)*100)/100 || "n";
    sizes[px] = 1; combos[px+"/"+cs.fontWeight+"/lh"+lh+"/"+fam] = 1;

    let bg=null; for (let p=el;p;p=p.parentElement){const c=parse(getComputedStyle(p).backgroundColor); if(c&&c.a>0){bg=c.a<1?blend(c,{r:255,g:255,b:255,a:1}):c;break;}}
    if (!bg) bg={r:255,g:255,b:255,a:1};
    let fg=parse(cs.color); if(!fg) continue;
    if (fg.a<1) fg=blend(fg,bg);
    text++;
    const weight = parseInt(cs.fontWeight,10)||400;
    const need = (px>=24||(px>=18.66&&weight>=700))?3:4.5;
    const got = ratio(fg,bg);
    if (got<need) contrast.push(el.tagName.toLowerCase()+" "+px+"px "+(Math.round(got*100)/100));
  }

  for (const h of document.querySelectorAll("h1,h2")) {
    if (h.closest(".deckinner")) continue;
    const r = h.getBoundingClientRect(); if (!r.width) continue;
    const g = lineChars(h); if (g.length<2) continue;
    if (g[g.length-1].n === 1) orphans.push((h.textContent||"").trim().slice(0,30));
  }
  for (const p of document.querySelectorAll("p")) {
    if (p.closest(".deckinner")) continue;
    if ((p.textContent||"").trim().length < 120) continue;
    const g = lineChars(p); if (g.length<2) continue;
    const mx = Math.max(...g.slice(0,-1).map(x=>x.chars));
    if (mx > 80) wideBody++;
    if (Math.round(parseFloat(getComputedStyle(p).fontSize)) < 16) smallBody++;
  }

  const inter = [...document.querySelectorAll("a[href],button,summary")].filter(e=>{
    const r=e.getBoundingClientRect(); if(!(r.width>0&&r.height>0)) return false;
    for(let p=e.parentElement;p;p=p.parentElement) if(p.tagName==="DETAILS"&&!p.open) return false;
    return e.offsetParent!==null; });
  const foldActions = inter.filter(e=>{const r=e.getBoundingClientRect(); return r.top<innerHeight&&r.bottom>0;}).length;

  // Only things the browser actually FETCHES. rel=canonical and og:url are
  // absolute by necessity and are metadata, not requests — counting them
  // reported the site's own production URL as a third-party origin whenever
  // the probe ran against localhost.
  const thirdParty = [...document.querySelectorAll("script[src],img[src],link[rel=stylesheet],link[rel=preload],link[rel=preconnect]")]
    .map(e=>e.getAttribute("src")||e.getAttribute("href"))
    .filter(u=>u&&/^https?:\/\//.test(u)&&!u.includes(location.host));

  return { vw, overflow: d.scrollWidth - d.clientWidth, text,
    sizes: Object.keys(sizes).map(Number), combos: Object.keys(combos),
    contrast, orphans, wideBody, smallBody, foldActions, thirdParty };
})()`;

const all = { overflow: [], contrast: [], orphans: [], wideBody: [], smallBody: [],
  noFoldAction: [], thirdParty: new Set(), errs: [], sizes: new Set(), combos: new Set(), text: 0 };

for (const w of WIDTHS) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 });
  for (const [name, route] of ROUTES) {
    events = [];
    await send("Page.navigate", { url: BASE + route });
    await waitLoad();
    await send("Runtime.evaluate", { expression: SETTLE, awaitPromise: true, timeout: 45000 });
    const v = (await send("Runtime.evaluate", { expression: PROBE, returnByValue: true })).result.value;
    if (v.overflow > 1) all.overflow.push(name + "@" + w + " +" + v.overflow + "px");
    v.contrast.forEach((c) => all.contrast.push(name + "@" + w + " " + c));
    if (w === 375 || w === 1280) {
      v.orphans.forEach((o) => all.orphans.push(name + "@" + w + " " + JSON.stringify(o)));
      if (v.wideBody) all.wideBody.push(name + "@" + w + " x" + v.wideBody);
      if (v.smallBody) all.smallBody.push(name + "@" + w + " x" + v.smallBody);
      if (!v.foldActions) all.noFoldAction.push(name + "@" + w);
      v.sizes.forEach((s) => all.sizes.add(s));
      v.combos.forEach((c) => all.combos.add(c));
      all.text += v.text;
    }
    v.thirdParty.forEach((u) => { try { all.thirdParty.add(new URL(u).origin); } catch {} });
    events.filter((e) => e.method === "Log.entryAdded" && e.params.entry.level === "error")
      .forEach((e) => all.errs.push(name + "@" + w + ": " + e.params.entry.text.slice(0, 70)));
    process.stdout.write(".");
  }
}
ws.close(); chrome.kill();

const line = (ok, label, detail) => console.log("  " + (ok ? "PASS  " : "FAIL  ") + label.padEnd(44) + detail);
console.log("");
console.log("");
console.log("=== RE-VERIFICATION â€” " + BASE);
console.log("=== " + ROUTES.length + " routes x " + WIDTHS.length + " widths = " + ROUTES.length * WIDTHS.length + " page loads");
console.log("");
line(all.overflow.length === 0, "D3  no horizontal overflow", all.overflow.length + " of " + ROUTES.length * WIDTHS.length);
all.overflow.slice(0, 6).forEach((x) => console.log("          " + x));
line(all.contrast.length === 0, "O12 WCAG AA contrast", all.text + " text elements, " + all.contrast.length + " failures");
all.contrast.slice(0, 6).forEach((x) => console.log("          " + x));
line(all.orphans.length === 0, "7c  no heading orphans", all.orphans.length + " found");
all.orphans.slice(0, 6).forEach((x) => console.log("          " + x));
line(all.wideBody.length === 0, "7b  no body line over 80 chars", all.wideBody.length + " paragraphs");
all.wideBody.slice(0, 6).forEach((x) => console.log("          " + x));
line(all.smallBody.length === 0, "7a  body >= 16px", all.smallBody.length + " paragraphs under");
all.smallBody.slice(0, 6).forEach((x) => console.log("          " + x));
line(all.noFoldAction.length === 0, "1b  action above the fold", all.noFoldAction.length + " pages without");
all.noFoldAction.slice(0, 6).forEach((x) => console.log("          " + x));
const sz = [...all.sizes].sort((a, b) => a - b);
line(sz.length <= 8, "2c  <= 8 font sizes", sz.length + " -> " + sz.join(", "));
line(all.combos.size <= 14, "2c  <= 14 type combinations", all.combos.size);
line(all.thirdParty.size === 0, "O3/O4 no third-party origins", all.thirdParty.size ? [...all.thirdParty].join(", ") : "0");
line(all.errs.length === 0, "O5  no console errors", all.errs.length);
all.errs.slice(0, 5).forEach((x) => console.log("          " + x));

const fails = [all.overflow, all.contrast, all.orphans, all.wideBody, all.smallBody, all.noFoldAction, all.errs]
  .reduce((a, x) => a + x.length, 0) + (sz.length > 8 ? 1 : 0) + (all.combos.size > 14 ? 1 : 0) + all.thirdParty.size;
console.log("");
console.log(fails === 0 ? "  ALL CLEAR â€” no regression since Stage 1 was signed" : "  " + fails + " ISSUE(S) â€” Stage 1 needs re-signing");

