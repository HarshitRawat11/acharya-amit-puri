// Lift the four intent directions out of the Design-canvas artboards and write
// them as one plain-HTML deck the site can render.
//
// The artboards are `.dc.html` Design Components: a <helmet> block of page
// basics followed by one fixed-size root <div> of purely inline styles. Only
// the root div is wanted — the helmet sets `body` rules and pulls fonts from
// Google, and this site self-hosts Marcellus and Inter already.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SRC = "C:/Users/harshit.rawat/AppData/Local/Temp/claude/C--Users-harshit-rawat-Documents-Projects-Amit--claude-worktrees-strange-yalow-a89535/7052ec63-1139-4870-8227-12ad35802a65/scratchpad/intent-canvas/project";
const OUT = join(process.cwd(), "design-options", "intent-directions.html");

const BOARDS = [
  { file: "Main.dc.html", name: "Calm · Rooted · Trustworthy",
    blurb: "Never mystical, salesy or clinical. The most restrained of the four, and the closest to the site as it already stood.",
    chosen: false },
  { file: "Scholarly.dc.html", name: "Serene · Scholarly · Precise",
    blurb: "Never folksy, gimmicky or cold. The heading shrinks and the weight moves into structure — a ruled specification of how a reading is prepared.",
    chosen: false },
  { file: "Warm.dc.html", name: "Warm · Grounded · Approachable",
    blurb: "Never intimidating, corporate or esoteric. First person, larger body text, the mascot carrying the page, and three real questions in a client's own words.",
    chosen: true },
  { file: "Devotional.dc.html", name: "Timeless · Devotional · Dignified",
    blurb: "Never trendy, commercial or casual. Centred and ceremonial, with the mandala promoted to a full lotus and the steps set as roman numerals.",
    chosen: false },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const parts = [];

for (const b of BOARDS) {
  const p = join(SRC, b.file);
  if (!existsSync(p)) { console.error("  MISSING: " + p); process.exit(1); }
  const raw = readFileSync(p, "utf8");

  const open = raw.indexOf("<x-dc>");
  const close = raw.lastIndexOf("</x-dc>");
  if (open === -1 || close === -1) { console.error("  no <x-dc> in " + b.file); process.exit(1); }
  let body = raw.slice(open + "<x-dc>".length, close);

  // drop the helmet: its body{} rules and its Google Fonts link do not belong
  // inside another page
  body = body.replace(/<helmet>[\s\S]*?<\/helmet>/, "").trim();

  if (/\{\{/.test(body)) { console.error("  " + b.file + " still contains a {{hole}} — it needs a static value"); process.exit(1); }

  parts.push(
    `<div class="ipane" data-name="${esc(b.name)}" data-blurb="${esc(b.blurb)}" data-chosen="${b.chosen}">\n` +
    body + "\n</div>"
  );
  console.log("  lifted  " + b.file.padEnd(20) + Math.round(body.length / 1024) + " KB  " + b.name);
}

writeFileSync(OUT, parts.join("\n\n") + "\n", "utf8");
console.log("\nwrote " + OUT + "  (" + Math.round(parts.join("").length / 1024) + " KB, " + parts.length + " panes)");
