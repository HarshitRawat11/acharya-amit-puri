/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      // ───────────────────────────────────────────────────────────────────
      //  BRAND PALETTE — "Temple Tank & Brass Lamp"
      //  Deep stepwell teal + brass-diya gold on warm aged paper.
      //  Every value is WCAG-checked (see src/styles/global.css for ratios).
      //  ⚠️ GOLD is decoration / large-text only — never body copy under 24px.
      //  To re-theme the whole site, change the hex values here.
      // ───────────────────────────────────────────────────────────────────
      colors: {
        paper: "#F7F3EC", // page background (warm aged paper)
        surface: "#FDFBF6", // cards / raised surfaces (warm white)
        "surface-alt": "#F1EBE0", // alternating section bands
        ink: "#1C2B2A", // body text (13.3:1 on paper)
        muted: "#4C5B56", // secondary text (6.7:1 on paper)
        teal: {
          DEFAULT: "#0E5A52", // primary brand
          dark: "#0B4A43", // hover / pressed
        },
        gold: {
          DEFAULT: "#A67C2E", // metallic accent (large-text/decoration only)
          soft: "#E7D4A8", // warm gold tint for bands
        },
        hair: "#C9BCA0", // hairline borders
        onteal: "#FBF7EF", // text/icons on teal fills
      },
      fontFamily: {
        // Marcellus = inscriptional headings; Inter = clean body.
        serif: ['"Marcellus"', "Georgia", "Cambria", "serif"],
        sans: [
          '"Inter Variable"',
          '"Inter"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        // Soft, low-opacity, teal-tinted — luxury from light, not heaviness.
        soft: "0 2px 16px rgba(28, 43, 42, 0.06)",
        lift: "0 10px 30px rgba(28, 43, 42, 0.10)",
      },
      borderRadius: {
        card: "12px",
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      maxWidth: {
        prose2: "68ch",
      },
    },
  },
  plugins: [],
};
