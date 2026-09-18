/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTENT HELPERS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Small utilities that read src/data/site.ts and decide what to SHOW.
 *  Anything still left as a {{PLACEHOLDER}} (or blank) is treated as "not filled
 *  in yet" and is hidden automatically — so the site never displays raw tokens
 *  like {{PHONE}} to a visitor.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { site } from "../data/site";

/** True when a value has a real value (not blank and not a {{PLACEHOLDER}}). */
export function isFilled(value: string | undefined | null): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    !value.includes("{{")
  );
}

/** Returns the trimmed value if filled, otherwise undefined (handy in templates). */
export function filled(value: string | undefined | null): string | undefined {
  return isFilled(value) ? value.trim() : undefined;
}

export interface SocialLink {
  key: string;
  label: string;
  href: string;
}

/** Social links that have real URLs. Placeholders are hidden automatically. */
export function activeSocials(): SocialLink[] {
  const s = site.social;
  const all: SocialLink[] = [
    { key: "instagram", label: "Instagram", href: s.instagram },
    { key: "facebook", label: "Facebook", href: s.facebook },
    { key: "youtube", label: "YouTube", href: s.youtube },
  ];
  return all.filter((item) => isFilled(item.href));
}

/**
 * Stats worth putting on screen.
 *
 * Only one of the three has a real value at the moment — "6 Areas of
 * Guidance" is hard-coded, while years of practice and people guided are
 * still placeholders. A lone counter sitting where three were designed reads
 * as though the other two failed to load, drawing the eye straight to what is
 * missing. So the row is withheld until at least two are real, and appears by
 * itself once the values arrive.
 */
export function activeStats() {
  const filled = site.stats.filter((s) => isFilled(s.value));
  return filled.length >= 2 ? filled : [];
}

/** Testimonials that have BOTH a real quote and a real name. */
export function activeTestimonials() {
  return site.testimonials.filter(
    (t) => isFilled(t.quote) && isFilled(t.name),
  );
}

/** A wa.me chat link, only if the WhatsApp number is filled in. */
export function whatsappLink(message?: string): string | undefined {
  if (!isFilled(site.contact.whatsapp)) return undefined;
  const digits = site.contact.whatsapp.replace(/[^0-9]/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** A tap-to-call link, only if the phone number is filled in. */
export function phoneLink(): string | undefined {
  if (!isFilled(site.contact.phone)) return undefined;
  return `tel:${site.contact.phone.replace(/\s+/g, "")}`;
}

/** A tap-to-email link, only if the email is filled in. */
export function emailLink(): string | undefined {
  if (!isFilled(site.contact.email)) return undefined;
  return `mailto:${site.contact.email}`;
}
