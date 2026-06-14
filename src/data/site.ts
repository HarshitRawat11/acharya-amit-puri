/**
 * ════════════════════════════════════════════════════════════════════════════
 *  SITE CONTENT — SINGLE SOURCE OF TRUTH
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  👉 THIS IS THE ONE FILE TO EDIT for all contact details, bio, statistics,
 *     testimonials, and SEO defaults. Change a value here and it updates
 *     everywhere across the whole website automatically.
 *
 *  Anything wrapped in {{DOUBLE_BRACES}} is a PLACEHOLDER waiting for a real
 *  value. To find every placeholder in the project, search for the text:  {{
 *
 *  See CONTENT.md (in the project root) for a friendly fill-in checklist that
 *  explains every single placeholder.
 *
 *  NOTE: The Acharya's name ("Acharya Amit Puri") and the six services are
 *  FINAL and are intentionally NOT placeholders. Everything personal/contact
 *  related is a placeholder until you provide the real value.
 * ════════════════════════════════════════════════════════════════════════════
 */

/** A single offering shown on the Services page and given its own detail page. */
export interface Service {
  /** URL slug, e.g. /services/vastu-report  — do not change once published. */
  slug: string;
  /** Short service name (the part before the dash). */
  name: string;
  /** Descriptive subtitle (the part after the dash). */
  tagline: string;
  /** One- or two-sentence summary shown on the service card (Home + overview). */
  summary: string;
  /** Opening paragraph on the service's own detail page. */
  intro: string;
  /** "What it is" — plain explanation of the practice. */
  whatItIs: string;
  /** "Who it's for" — helps the visitor self-select. */
  whoItsFor: string;
  /** "What you receive" — concrete deliverables, shown as a bullet list. */
  whatYouReceive: string[];
  /** Optional gentle disclaimer shown at the foot of the detail page. */
  note?: string;
}

/** A single step in the "How a consultation works" section. */
export interface ProcessStep {
  title: string;
  description: string;
}

/** A single testimonial. Leave as placeholders until you have real, consented quotes. */
export interface Testimonial {
  quote: string;
  name: string;
  /** Optional: where the person is from, e.g. "Pune". Hidden if empty. */
  location?: string;
}

export const site = {
  // ──────────────────────────────────────────────────────────────────────────
  //  IDENTITY  (the name is real & final — do not replace)
  // ──────────────────────────────────────────────────────────────────────────
  name: "Acharya Amit Puri",
  /** Short role line shown under the name. Editable. */
  role: "Vastu · Vedic Astrology · Numerology · Prakriti · Palmistry",
  /** The hero headline value line. Editable. */
  heroValueLine:
    "Calm, considered guidance to bring your home, your choices, and your nature into greater harmony.",
  /** Primary call-to-action label used on buttons across the site. */
  primaryCta: "Book a Consultation",

  // ──────────────────────────────────────────────────────────────────────────
  //  CONTACT  (all placeholders — fill these in)
  // ──────────────────────────────────────────────────────────────────────────
  contact: {
    /** Display + tap-to-call. Example: "+91 98765 43210" */
    phone: "{{PHONE}}",
    /** Digits only, with country code, NO + or spaces — used in wa.me links.
     *  Example: "919876543210" */
    whatsapp: "{{WHATSAPP}}",
    /** Tap-to-email. Example: "amit@example.com" */
    email: "{{EMAIL}}",
    /** Shown in footer / contact / SEO. Example: "Pune, Maharashtra, India" */
    location: "{{LOCATION}}",
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  SOCIAL  (optional — any left as a placeholder will be hidden automatically)
  // ──────────────────────────────────────────────────────────────────────────
  social: {
    instagram: "{{INSTAGRAM}}", // full URL, e.g. https://instagram.com/handle
    facebook: "{{FACEBOOK}}", // full URL
    youtube: "{{YOUTUBE}}", // full URL
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  ABOUT / "MEET THE ACHARYA"
  // ──────────────────────────────────────────────────────────────────────────
  about: {
    /** A few paragraphs about background, experience, and philosophy.
     *  Separate paragraphs with a blank line (\n\n). Keep it authentic — do
     *  not overstate credentials or guarantees. */
    bio: "{{ABOUT_BIO}}",
    /** Example: "15+" */
    yearsExperience: "{{YEARS_EXPERIENCE}}",
    /** Example: "2,000+" */
    clientsServed: "{{CLIENTS_SERVED}}",
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  STATS  (the small counters shown near the hero / about)
  //  Edit the labels freely; the values pull from `about` above.
  // ──────────────────────────────────────────────────────────────────────────
  stats: [
    { value: "{{YEARS_EXPERIENCE}}", label: "Years of Practice" },
    { value: "{{CLIENTS_SERVED}}", label: "People Guided" },
    { value: "6", label: "Areas of Guidance" },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  //  SERVICES  (real & final — copy is editable; refine the wording freely)
  // ──────────────────────────────────────────────────────────────────────────
  services: [
    {
      slug: "vastu-report",
      name: "Vastu Report",
      tagline: "Space & Energy Analysis",
      summary:
        "A considered study of how your home or workplace is arranged — and how its layout, light, and flow can be brought into greater harmony.",
      intro:
        "Vastu Shastra is the traditional Indian understanding of space and orientation. A Vastu Report looks closely at how your space is arranged and offers grounded, practical ways to invite more balance and ease into it.",
      whatItIs:
        "A room-by-room review of the direction, proportion, and placement of the elements in your home or workplace, interpreted through Vastu principles.",
      whoItsFor:
        "Anyone planning, building, renovating, or simply wishing to feel more settled in their space — homeowners, families, and business owners alike.",
      whatYouReceive: [
        "A clear, written report covering each key area of your space",
        "Practical, non-intrusive suggestions you can apply at your own pace",
        "The reasoning behind each recommendation, in plain language",
      ],
    },
    {
      slug: "astro-advice",
      name: "Astro Advice",
      tagline: "Vedic Birth Chart Reading",
      summary:
        "A thoughtful reading of your Vedic birth chart, offering perspective on your strengths, timing, and the seasons of your life.",
      intro:
        "Drawing on Vedic astrology (Jyotish), this reading interprets the positions of the planets at the time of your birth. It is offered as a lens for reflection and self-understanding — not as a fixed prediction.",
      whatItIs:
        "A personalised study of your birth chart, considering the placements that shape your tendencies, opportunities, and the timing of life's chapters.",
      whoItsFor:
        "Anyone seeking clarity about their natural tendencies, life direction, or the timing of an important decision.",
      whatYouReceive: [
        "A personalised reading of your birth chart",
        "A calm, unhurried conversation about what it reflects",
        "Gentle, practical guidance you can carry forward",
      ],
      note: "Offered for reflection and perspective. You remain free in every choice you make.",
    },
    {
      slug: "numero-advice",
      name: "Numero Advice",
      tagline: "Name & Number Alignment",
      summary:
        "An exploration of the numbers woven through your name and birth date — and how they might be brought into easier alignment.",
      intro:
        "Numerology studies the patterns and meanings associated with the numbers in your name and date of birth. This advice looks at those patterns and, where helpful, suggests subtle, optional adjustments to invite greater harmony.",
      whatItIs:
        "A reading of your core numbers — drawn from your name and date of birth — and what they may suggest about your nature and rhythm.",
      whoItsFor:
        "Those curious about the numbers in their life, considering a name spelling, or naming a child or a new venture.",
      whatYouReceive: [
        "A written summary of your core numbers and what they suggest",
        "Any considered, optional adjustments — the choice always remains yours",
        "Clear reasoning, free of pressure or alarm",
      ],
    },
    {
      slug: "prakriti-advice",
      name: "Prakriti Advice",
      tagline: "Know Your Natural Energy",
      summary:
        "A gentle assessment of your natural constitution, to help you live and choose in tune with your own rhythm.",
      intro:
        "Rooted in Ayurvedic understanding, Prakriti refers to your innate constitution — the natural balance of energies that shapes how you feel, rest, and respond. This advice helps you recognise and work with your own nature.",
      whatItIs:
        "A reflective assessment of your natural disposition and the qualities that tend to bring it into balance.",
      whoItsFor:
        "Anyone wishing to understand their natural disposition and make daily choices — around routine, food, and rest — that feel more in keeping with it.",
      whatYouReceive: [
        "A description of your Prakriti and what it reflects",
        "Simple, livable suggestions for daily wellbeing",
        "Guidance on what tends to keep you in balance",
      ],
      note: "Traditional guidance for general wellbeing. It is not medical advice and is not a substitute for professional healthcare.",
    },
    {
      slug: "design-advice",
      name: "Design Advice",
      tagline: "Horoscope-Based Home Design",
      summary:
        "Guidance that brings together your horoscope and the principles of Vastu to shape a home that feels truly yours.",
      intro:
        "This service blends astrological insight with Vastu principles to inform the design and arrangement of your living space — considering orientation, colour, materials, and placement in the light of your chart.",
      whatItIs:
        "A tailored set of design directions that weave together your horoscope and Vastu guidance for your specific home.",
      whoItsFor:
        "Those designing, building, or refreshing a home who would like its character to reflect both timeless principles and their own chart.",
      whatYouReceive: [
        "Tailored direction on layout, colour, materials, and placement",
        "Clear, practical notes you can share with your architect or interior designer",
        "Suggestions you can carry out all at once or gradually",
      ],
    },
    {
      slug: "palmistry-advice",
      name: "Palmistry Advice",
      tagline: "Palm & Astrology Guidance",
      summary:
        "A reflective reading of the lines and form of your hand, considered alongside astrological insight.",
      intro:
        "Palmistry reads the lines, mounts, and shape of the hand as a reflection of character and tendency. Offered together with astrological perspective, it is intended as a mirror for self-reflection rather than a fixed forecast.",
      whatItIs:
        "An attentive reading of your hand, brought together with relevant astrological context for a fuller picture.",
      whoItsFor:
        "Anyone drawn to a personal, reflective reading and a deeper conversation about their nature and inclinations.",
      whatYouReceive: [
        "An attentive reading of the lines and form of your hand",
        "Relevant astrological context to round out the picture",
        "A grounded conversation about what it may reflect",
      ],
      note: "Offered for reflection and perspective, not as a fixed forecast.",
    },
  ] satisfies Service[],

  // ──────────────────────────────────────────────────────────────────────────
  //  HOW A CONSULTATION WORKS  (editable)
  // ──────────────────────────────────────────────────────────────────────────
  process: [
    {
      title: "Reach out",
      description:
        "Share a little about what you're seeking — by WhatsApp, phone, or the contact form. There's no pressure, and your details stay private.",
    },
    {
      title: "Share your details",
      description:
        "Provide what your chosen service needs — such as your birth date, time, and place, or photographs of your space.",
    },
    {
      title: "The study",
      description:
        "Acharya Amit Puri reviews everything with care and prepares your reading or report personally.",
    },
    {
      title: "Your consultation",
      description:
        "Receive your findings in a calm, unhurried conversation, with space for all your questions.",
    },
    {
      title: "Ongoing guidance",
      description:
        "Carry forward clear, practical suggestions — applied at whatever pace feels right for you.",
    },
  ] satisfies ProcessStep[],

  // ──────────────────────────────────────────────────────────────────────────
  //  TESTIMONIALS  (placeholders — DO NOT invent. Add only real, consented quotes.)
  //  Leave any as placeholders to hide the testimonials section until ready.
  // ──────────────────────────────────────────────────────────────────────────
  testimonials: [
    { quote: "{{TESTIMONIAL_1}}", name: "{{TESTIMONIAL_1_NAME}}", location: "" },
    { quote: "{{TESTIMONIAL_2}}", name: "{{TESTIMONIAL_2_NAME}}", location: "" },
    { quote: "{{TESTIMONIAL_3}}", name: "{{TESTIMONIAL_3_NAME}}", location: "" },
  ] satisfies Testimonial[],

  // ──────────────────────────────────────────────────────────────────────────
  //  CONTACT FORM
  //  Get a free access key at https://web3forms.com (no backend needed).
  //  Paste the key below; submissions are emailed to `contact.email` above.
  // ──────────────────────────────────────────────────────────────────────────
  form: {
    accessKey: "{{FORM_KEY}}",
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  SEO DEFAULTS
  // ──────────────────────────────────────────────────────────────────────────
  seo: {
    // The production URL ({{DOMAIN}}) — used for canonical links + the sitemap —
    // is set ONCE in astro.config.mjs as `site`, because Astro needs it at build
    // time. Pages read it via Astro.site, so it stays in a single place.
    /** Falls back on pages that don't set their own. */
    defaultTitle: "Acharya Amit Puri — Vastu, Astrology & Numerology Guidance",
    defaultDescription:
      "Calm, considered guidance in Vastu, Vedic astrology, numerology, Prakriti, and palmistry from Acharya Amit Puri. Book a respectful, personal consultation.",
    /** Social share image, placed in /public. Swap the file to change it. */
    ogImage: "/og-image.png",
  },
} as const;

export type Site = typeof site;
