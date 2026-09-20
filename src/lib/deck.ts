/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  DESIGN DECK — pulling the five directions into the site at build time
 * ─────────────────────────────────────────────────────────────────────────────
 *  design-options/home-designs.html is a complete standalone document produced
 *  by design-options/build.mjs. This lifts the five option panes and their
 *  stylesheet out of it so they can be shown as a real page of the website
 *  instead of a link to a loose HTML file.
 *
 *  Its CSS cannot simply be dropped onto the page. It is written for a
 *  document it owns entirely, so it carries `body { background: #14120f }` —
 *  which would black out the whole site — and a `.faq` rule that collides
 *  head-on with the site's own FAQ accordions. Every selector is therefore
 *  rewritten to sit under a single scope class, and the body/html rules are
 *  discarded; each pane already paints its own background.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import fs from "node:fs";
import path from "node:path";

const SOURCE = path.join(process.cwd(), "design-options", "home-designs.html");
const INTENT = path.join(process.cwd(), "design-options", "intent-directions.html");

export interface DesignOption {
  /** "opt1" … "opt5" — the anchor this page gives the option. */
  id: string;
  /** "Temple Tank", "Ivory & Marigold", … */
  name: string;
  /** One-line description of the direction. */
  blurb: string;
  /** The pane's own markup, ready to inject. */
  html: string;
}

/**
 * Rewrite every selector to sit under `scope`, so nothing escapes onto the
 * rest of the site. Brace-matched rather than regex-replaced, because @media
 * blocks nest and a regex would mangle them.
 */
export function scopeCss(css: string, scope: string): string {
  const out: string[] = [];
  let i = 0;

  while (i < css.length) {
    const open = css.indexOf("{", i);
    if (open === -1) break;

    const prelude = css.slice(i, open).trim();

    // Walk to the matching close brace.
    let depth = 1;
    let j = open + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") depth--;
      j++;
    }
    const body = css.slice(open + 1, j - 1);

    if (/^@(media|supports)/i.test(prelude)) {
      // Conditional group: recurse so the selectors inside get scoped too.
      out.push(`${prelude}{${scopeCss(body, scope)}}`);
    } else if (prelude.startsWith("@")) {
      // @keyframes, @font-face and friends have no selectors to scope.
      out.push(`${prelude}{${body}}`);
    } else {
      const selectors = prelude
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        // The deck owns its document; the site's does not belong to it.
        .filter((s) => s !== "body" && s !== "html")
        .map((s) => s.replace(/^(?:body|html)\s+/, ""))
        .map((s) => `${scope} ${s}`);

      if (selectors.length) out.push(`${selectors.join(",")}{${body}}`);
    }

    i = j;
  }

  return out.join("");
}

/**
 * Index just past the `</div>` that closes the `<div>` starting at `open`,
 * counting nested opens so the right one is found.
 */
function findCloseOfDiv(html: string, open: number): number {
  const tag = /<\/?div\b/gi;
  tag.lastIndex = open;
  let depth = 0;

  for (let m = tag.exec(html); m; m = tag.exec(html)) {
    depth += m[0][1] === "/" ? -1 : 1;
    if (depth === 0) return html.indexOf(">", m.index) + 1;
  }
  throw new Error("Unbalanced <div> while reading a design pane");
}

let cache: { css: string; options: DesignOption[] } | null = null;

/** Read the deck once per build and return its stylesheet and five panes. */
export function loadDesignDeck(): { css: string; options: DesignOption[] } {
  if (cache) return cache;

  const raw = fs.readFileSync(SOURCE, "utf8");

  const styleMatch = raw.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleMatch) throw new Error(`No <style> block found in ${SOURCE}`);
  const css = scopeCss(styleMatch[1], ".deck");

  // Each direction is a <div class="pane vN frame">. It cannot be lifted with
  // a lazy regex: a pane holds nine nested <section> elements and several
  // nested <div>s, so the first closing tag encountered is never its own.
  // Depth-match instead.
  const panes: string[] = [];
  for (let n = 1; n <= 5; n++) {
    const open = raw.indexOf(`<div class="pane v${n} frame">`);
    if (open === -1) throw new Error(`Pane v${n} not found in ${SOURCE}`);
    panes.push(raw.slice(open, findCloseOfDiv(raw, open)));
  }

  // The labels that sit above each pane carry the name and description.
  const labels = [...raw.matchAll(/<section class="optlabel"[\s\S]*?<\/section>/g)].map((m) => {
    const text = (re: RegExp) => (m[0].match(re)?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
    return {
      name: text(/<h2[^>]*>([\s\S]*?)<\/h2>/),
      blurb: text(/<p[^>]*>([\s\S]*?)<\/p>/).replace(/\s+/g, " "),
    };
  });

  const options: DesignOption[] = panes.map((html, idx) => ({
    id: `opt${idx + 1}`,
    name: labels[idx]?.name ?? `Option ${idx + 1}`,
    blurb: labels[idx]?.blurb ?? "",
    html,
  }));

  cache = { css, options };
  return cache;
}

/* ───────────────────────────────────────────────────────────────────────────
 *  INTENT DIRECTIONS — the four hero treatments behind the adjectives
 *
 *  A different kind of deck from the five above. Each pane is one hero, built
 *  inside the locked palette and the Marcellus/Inter pairing, differing only
 *  in type scale, weight, spacing, motif density and copy register. They exist
 *  to answer "which of these should the site feel like", not "which layout".
 *
 *  Produced by design-options/build-intent.mjs. Styling is entirely inline, so
 *  unlike home-designs.html there is no stylesheet to scope — nothing here can
 *  reach the rest of the page.
 * ─────────────────────────────────────────────────────────────────────────── */

export interface IntentOption {
  id: string;
  name: string;
  blurb: string;
  /** True for the direction the Acharya's site was actually built on. */
  chosen: boolean;
  html: string;
}

let intentCache: IntentOption[] | null = null;

export function loadIntentDeck(): IntentOption[] {
  if (intentCache) return intentCache;

  const raw = fs.readFileSync(INTENT, "utf8");
  const out: IntentOption[] = [];

  let from = 0;
  for (;;) {
    const open = raw.indexOf('<div class="ipane"', from);
    if (open === -1) break;
    const head = raw.slice(open, raw.indexOf(">", open) + 1);
    const attr = (n: string) => head.match(new RegExp(n + '="([^"]*)"'))?.[1] ?? "";
    const close = findCloseOfDiv(raw, open);
    out.push({
      id: `intent${out.length + 1}`,
      name: attr("data-name").replace(/&amp;/g, "&").replace(/&quot;/g, '"'),
      blurb: attr("data-blurb").replace(/&amp;/g, "&").replace(/&quot;/g, '"'),
      chosen: attr("data-chosen") === "true",
      // the wrapper itself is ours; hand back only what is inside it
      html: raw.slice(head.length + open, close - "</div>".length),
    });
    from = close;
  }

  if (out.length !== 4) {
    throw new Error(`Expected 4 intent directions in ${INTENT}, found ${out.length}`);
  }
  intentCache = out;
  return out;
}
