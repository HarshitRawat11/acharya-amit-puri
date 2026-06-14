/*
 * Generates raster brand assets into /public:
 *   - og-image.png        (1200×630 social share card)
 *   - apple-touch-icon.png (180×180)
 *   - favicon-32.png       (32×32)
 *
 * Run it any time you tweak the palette/wordmark:
 *   node scripts/generate-assets.mjs
 *
 * To use your OWN share image instead, just replace public/og-image.png.
 */
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

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  ${mandala(1085, 315, 2.7, GOLD, 1.1)}
  <text x="92" y="246" fill="${GOLD}" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="7">VASTU · ASTROLOGY · NUMEROLOGY</text>
  <rect x="92" y="270" width="64" height="3" fill="${GOLD}"/>
  <text x="86" y="372" fill="${TEAL}" font-family="Georgia, 'Times New Roman', serif" font-size="98">Acharya Amit Puri</text>
  <text x="92" y="430" fill="${INK}" fill-opacity="0.82" font-family="Arial, Helvetica, sans-serif" font-size="30">Calm, considered guidance for your home, choices &amp; nature.</text>
  ${mandala(132, 545, 0.34, GOLD, 1.3, false)}
</svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${ICON_BG}"/>
  <g transform="translate(56 56) scale(1.6)">
    ${mandala(125, 125, 1.0, ICON_GOLD, 1.6)}
  </g>
</svg>`;

async function run() {
  await sharp(Buffer.from(ogSvg)).png().toFile("public/og-image.png");
  await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile("public/apple-touch-icon.png");
  await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toFile("public/favicon-32.png");
  console.log("✓ Generated og-image.png, apple-touch-icon.png, favicon-32.png in /public");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
