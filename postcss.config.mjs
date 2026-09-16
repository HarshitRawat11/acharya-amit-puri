/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  POSTCSS — vendor prefixes only
 * ─────────────────────────────────────────────────────────────────────────────
 *  Tailwind itself is applied by the @astrojs/tailwind integration in
 *  astro.config.mjs, so it is deliberately NOT listed here — adding it would
 *  process the stylesheet twice.
 *
 *  Autoprefixer adds the vendor prefixes some browsers still need. The one that
 *  matters for this site is `-webkit-backdrop-filter`: without it the frosted
 *  sticky header does not blur in Safari 17 and earlier (a large share of
 *  iPhones). The browser targets are set by `browserslist` in package.json.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default {
  plugins: {
    autoprefixer: {},
  },
};
