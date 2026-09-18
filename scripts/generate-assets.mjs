/*
 * Generates raster brand assets into /public:
 *   - favicon.svg          (vector tab icon — the mascot mark)
 *   - og-image.png        (1200×630 social share card)
 *   - apple-touch-icon.png (180×180)
 *   - favicon-32.png       (32×32)
 *
 * Run it any time you tweak the palette/wordmark:
 *   node scripts/generate-assets.mjs
 *
 * To use your OWN share image instead, just replace public/og-image.png.
 */
import fs from "node:fs";
import sharp from "sharp";

const TEAL = "#0E5A52";
const GOLD = "#A67C2E";
const PAPER = "#F7F3EC";
const INK = "#1C2B2A";
const ICON_BG = "#163a37";
const ICON_GOLD = "#c9a14a";

const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const DOTS = [
  [100, 12], [162.2, 37.8], [188, 100], [162.2, 162.2],
  [100, 188], [37.8, 162.2], [12, 100], [37.8, 37.8],
];

/** Ashtadala mandala as an SVG <g>, centred at (cx,cy) for a given scale. */
function mandala(cx, cy, scale, stroke, strokeWidth, withDots = true) {
  const petals = ANGLES.map(
    (a) =>
      `<path transform="rotate(${a} 100 100)" d="M100 60 C86 46 86 34 100 20 C114 34 114 46 100 60 Z"/>`,
  ).join("");
  const dots = withDots
    ? DOTS.map(
        ([x, y]) =>
          `<circle cx="${x}" cy="${y}" r="2.6" fill="${stroke}" stroke="none"/>`,
      ).join("")
    : "";
  return `<g transform="translate(${cx - 100 * scale} ${cy - 100 * scale}) scale(${scale})"
    fill="none" stroke="${stroke}" stroke-width="${strokeWidth / scale}" stroke-linejoin="round">
    <circle cx="100" cy="100" r="94"/>
    <circle cx="100" cy="100" r="82"/>
    <circle cx="100" cy="100" r="34"/>
    ${petals}
    ${dots}
    <circle cx="100" cy="100" r="5" fill="${stroke}" stroke="none"/>
  </g>`;
}

/**
 * The mascot mark — the same drawing as `variant="mark"` in
 * src/components/motifs/Mascot.astro: bald head, tilak, long drooping
 * moustache, flat eyes, on a heavy stroke. Keep the two in step.
 *
 * Drawn on a 64x64 grid, placed at (cx,cy) for a given scale.
 */
function mascotMark(cx, cy, scale, stroke, strokeWidth) {
  return `<g transform="translate(${cx - 32 * scale} ${cy - 32 * scale}) scale(${scale})"
    fill="none" stroke="${stroke}" stroke-width="${strokeWidth / scale}"
    stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="32" cy="24" rx="11.8" ry="12.7"/>
    <ellipse cx="32" cy="15.8" rx="1.35" ry="3.1" fill="${stroke}" stroke="none"/>
    <path d="M26.4 24.8 H 29.6"/>
    <path d="M34.4 24.8 H 37.6"/>
    <path fill="${stroke}" stroke="none" d="M22.2 42.6 C 20.6 37.0 20.8 32.6 25.2 29.6 C 28.0 28.6 36.0 28.6 38.8 29.6 C 43.2 32.6 43.4 37.0 41.8 42.6 C 41.2 37.2 40.0 34.2 37.4 32.8 C 35.2 32.2 28.8 32.2 26.6 32.8 C 24.0 34.2 22.8 37.2 22.2 42.6 Z"/>
  </g>`;
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  ${mandala(1085, 315, 2.7, GOLD, 1.1)}
  <text x="92" y="246" fill="${GOLD}" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="7">VASTU · ASTROLOGY · NUMEROLOGY</text>
  <rect x="92" y="270" width="64" height="3" fill="${GOLD}"/>
  <text x="86" y="372" fill="${TEAL}" font-family="Georgia, 'Times New Roman', serif" font-size="98">Acharya Amit Puri</text>
  <text x="92" y="430" fill="${INK}" fill-opacity="0.82" font-family="Arial, Helvetica, sans-serif" font-size="30">Calm, considered guidance for your home, choices &amp; nature.</text>
  ${mandala(132, 545, 0.34, GOLD, 1.3, false)}
</svg>`;

// The icon carries the mascot, not the mandala. The mandala is generic —
// several of the motifs on the site use it — whereas the Acharya's face is
// the one mark nobody else has.
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${ICON_BG}"/>
  ${mascotMark(256, 262, 6.6, ICON_GOLD, 2.6)}
</svg>`;

// favicon.svg is written straight out rather than rasterised, so the crisp
// vector is what modern browsers use.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Acharya Amit Puri">
  <circle cx="32" cy="32" r="31" fill="${ICON_BG}"/>
  ${mascotMark(32, 33, 0.82, ICON_GOLD, 2.6)}
</svg>`;

async function run() {
  fs.writeFileSync("public/favicon.svg", faviconSvg);
  await sharp(Buffer.from(ogSvg)).png().toFile("public/og-image.png");
  await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile("public/apple-touch-icon.png");
  await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toFile("public/favicon-32.png");
  console.log("✓ Generated favicon.svg, og-image.png, apple-touch-icon.png, favicon-32.png in /public");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
