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
  /** Questions specific to this service. Shown on its detail page and used
   *  for FAQ rich-results. Keep them practical and honest — these describe
   *  how the practice works, never what it promises. */
  faqs?: FaqItem[];
  /** Optional <title> for search results. Use when the name + tagline would
   *  run past ~60 characters, or when people search for this by another word
   *  (e.g. "kundli", "palm reading"). Falls back to name — tagline | site. */
  seoTitle?: string;
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

/** A frequently-asked question and its answer. */
export interface FaqItem {
  q: string;
  a: string;
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
      seoTitle: "Vastu Report & Consultation | Acharya Amit Puri",
      summary:
        "A considered study of how your home or workplace is arranged — and how its layout, light, and flow can be brought into greater harmony.",
      intro:
        "Vastu Shastra is the traditional Indian understanding of space and orientation. Working as your Vastu consultant, Acharya Amit Puri looks closely at how your space is arranged and offers grounded, practical ways to invite more balance and ease into it.",
      whatItIs:
        "A room-by-room Vastu review of the direction, proportion, and placement of the elements in your home or workplace, interpreted through the principles of Vastu Shastra.",
      whoItsFor:
        "Anyone seeking Vastu for home or office — whether planning, building, renovating, or simply wishing to feel more settled in the space they already have. Homeowners, families and business owners alike.",
      whatYouReceive: [
        "A clear, written report covering each key area of your space",
        "Practical, non-intrusive suggestions you can apply at your own pace",
        "The reasoning behind each recommendation, in plain language",
      ],
      faqs: [
        {
          q: "Will I have to make structural changes to my home?",
          a: "Almost never. Most of what is suggested concerns placement, light, colour, and which room is used for what — things you can change in an afternoon. Where something structural would genuinely help, it is offered as one option among several, never as a requirement.",
        },
        {
          q: "What do you need from me for a Vastu report?",
          a: "Photographs of each main room, or a simple floor plan, with the directions marked. A compass reading taken from the centre of the home is helpful. It also helps to know which rooms are used for sleeping, cooking, working and study.",
        },
        {
          q: "Can Vastu be applied to a rented flat or a workplace?",
          a: "Yes. Renting simply means the suggestions lean towards what is reversible — arrangement, storage, lighting, colour — rather than anything built in. The same principles apply to an office, a shop or a studio.",
        },
      ],
    },
    {
      slug: "astro-advice",
      name: "Astro Advice",
      tagline: "Vedic Birth Chart Reading",
      seoTitle: "Kundli Reading & Vedic Astrology | Acharya Amit Puri",
      summary:
        "A thoughtful reading of your Vedic birth chart, offering perspective on your strengths, timing, and the seasons of your life.",
      intro:
        "Drawing on Vedic astrology (Jyotish), this reading interprets your kundli — the birth chart formed by the positions of the planets at the moment you were born. It is offered as a lens for reflection and self-understanding, not as a fixed prediction.",
      whatItIs:
        "A personalised kundli analysis by an experienced Vedic astrologer, considering the placements that shape your tendencies, opportunities, and the timing of life's chapters.",
      whoItsFor:
        "Anyone seeking clarity about their natural tendencies, life direction, or the timing of an important decision.",
      whatYouReceive: [
        "A personalised reading of your birth chart",
        "A calm, unhurried conversation about what it reflects",
        "Gentle, practical guidance you can carry forward",
      ],
      faqs: [
        {
          q: "Do I need my exact birth time?",
          a: "As precise as you can manage. Some placements shift within a few minutes, so a time from a birth certificate or hospital record is ideal. If your time of birth is genuinely unknown, say so — the reading then concentrates on what does not depend on it, and you will be told plainly which parts cannot be spoken to.",
        },
        {
          q: "What exactly is a kundli?",
          a: "Your kundli, or birth chart, is a map of where the planets stood at the moment and place you were born. Vedic astrology reads that map for the tendencies and timings it suggests. It is a lens for reflection, not a fixed account of your life.",
        },
        {
          q: "Will you tell me what is going to happen to me?",
          a: "No. This reading is offered for perspective and self-understanding rather than prediction, and you will not be told that anything is fated or unavoidable. You remain free in every choice you make.",
        },
      ],
      note: "Offered for reflection and perspective. You remain free in every choice you make.",
    },
    {
      slug: "numero-advice",
      name: "Numero Advice",
      tagline: "Name & Number Alignment",
      seoTitle: "Numerology & Name Correction | Acharya Amit Puri",
      summary:
        "An exploration of the numbers woven through your name and birth date — and how they might be brought into easier alignment.",
      intro:
        "Numerology studies the patterns and meanings associated with the numbers in your name and date of birth. As a numerologist, Acharya Amit Puri looks at those patterns and, where helpful, suggests subtle and entirely optional adjustments to invite greater harmony.",
      whatItIs:
        "A reading of your core numbers — drawn from your name and date of birth — and what they may suggest about your nature and rhythm.",
      whoItsFor:
        "Those curious about the numbers in their life, weighing a name correction or a change of spelling, or naming a child or a new venture.",
      whatYouReceive: [
        "A written summary of your core numbers and what they suggest",
        "Any considered, optional adjustments — the choice always remains yours",
        "Clear reasoning, free of pressure or alarm",
      ],
      faqs: [
        {
          q: "Do I have to change my name?",
          a: "No. Nothing is ever required of you. Where an adjustment to spelling might bring things into easier alignment it is offered as a possibility with the reasoning explained, and many people simply take the reading and change nothing at all.",
        },
        {
          q: "What do you need from me?",
          a: "Your full name as it is written, and as you are actually called day to day — the two often differ, and both matter — along with your date of birth.",
        },
        {
          q: "Can you help with naming a child or a new business?",
          a: "Yes. For a child, the date and place of birth are considered alongside the names you have in mind. For a business, the founding date and the shortlist. You are given the reasoning for each, and the decision stays entirely yours.",
        },
      ],
    },
    {
      slug: "prakriti-advice",
      name: "Prakriti Advice",
      tagline: "Know Your Natural Energy",
      seoTitle: "Prakriti & Ayurvedic Constitution | Acharya Amit Puri",
      summary:
        "A gentle assessment of your natural constitution, to help you live and choose in tune with your own rhythm.",
      intro:
        "Rooted in Ayurveda, Prakriti refers to your innate constitution — the natural balance of doshas that shapes how you feel, rest, and respond. This advice helps you recognise and work with your own nature rather than against it.",
      whatItIs:
        "A reflective assessment of your natural disposition and the qualities that tend to bring it into balance.",
      whoItsFor:
        "Anyone wishing to understand their natural disposition and make daily choices — around routine, food, and rest — that feel more in keeping with it.",
      whatYouReceive: [
        "A description of your Prakriti and what it reflects",
        "Simple, livable suggestions for daily wellbeing",
        "Guidance on what tends to keep you in balance",
      ],
      faqs: [
        {
          q: "Is this medical advice?",
          a: "No, and it should not be treated as such. Prakriti guidance concerns routine and general wellbeing in the traditional sense. It is not a diagnosis, it does not replace a doctor, and nothing here should be used in place of professional healthcare or prescribed treatment.",
        },
        {
          q: "What are the doshas?",
          a: "Ayurveda describes three qualities — vata, pitta and kapha — that combine differently in every person. Your particular balance is your Prakriti, your natural constitution. Knowing it makes it easier to see why certain routines, foods and climates suit you while others leave you out of sorts.",
        },
        {
          q: "Will I have to change my diet completely?",
          a: "No. The suggestions are small and livable — when you eat rather than only what, how you begin the day, what tends to settle you. Changes that cannot be sustained are of no use to anyone, so they are not recommended.",
        },
      ],
      note: "Traditional guidance for general wellbeing. It is not medical advice and is not a substitute for professional healthcare.",
    },
    {
      slug: "design-advice",
      name: "Design Advice",
      tagline: "Horoscope-Based Home Design",
      seoTitle: "Horoscope-Based Home Design | Acharya Amit Puri",
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
      faqs: [
        {
          q: "How is this different from a Vastu Report?",
          a: "A Vastu Report studies a space that already exists and suggests how to bring it into better balance. Design Advice works the other way round: it helps shape a space still being planned, and brings your horoscope into that planning alongside Vastu principles.",
        },
        {
          q: "Can you work alongside my architect or interior designer?",
          a: "Yes, and it usually works best that way. The guidance is written as clear, practical notes on orientation, layout, colour and materials that you can hand straight to them, rather than as anything needing knowledge of Vastu to interpret.",
        },
        {
          q: "At what stage should I come to you?",
          a: "Ideally before the plan is finalised, while orientation and room placement can still be influenced at no cost. That said, useful guidance can be offered at any stage — including for a home already built, where the focus shifts to finishes, arrangement and light.",
        },
      ],
    },
    {
      slug: "palmistry-advice",
      name: "Palmistry Advice",
      tagline: "Palm & Astrology Guidance",
      seoTitle: "Palm Reading & Palmistry | Acharya Amit Puri",
      summary:
        "A reflective palm reading of the lines and form of your hand, considered alongside astrological insight.",
      intro:
        "Palmistry, or palm reading, interprets the lines, mounts and shape of the hand as a reflection of character and tendency. Offered together with astrological perspective, it is intended as a mirror for self-reflection rather than a fixed forecast.",
      whatItIs:
        "An attentive reading of your hand, brought together with relevant astrological context for a fuller picture.",
      whoItsFor:
        "Anyone drawn to a personal, reflective reading and a deeper conversation about their nature and inclinations.",
      whatYouReceive: [
        "An attentive reading of the lines and form of your hand",
        "Relevant astrological context to round out the picture",
        "A grounded conversation about what it may reflect",
      ],
      faqs: [
        {
          q: "What do you need from me for a palm reading?",
          a: "Clear photographs of both palms taken in natural daylight, fingers spread and the whole hand in frame, plus a side view of each hand. If any lines come out faint you will simply be asked for another photograph.",
        },
        {
          q: "Why both hands?",
          a: "By long convention the non-dominant hand is read for what is innate, and the dominant hand for what has been shaped by living. Read together they say considerably more than either does alone.",
        },
        {
          q: "Does palmistry predict the future?",
          a: "No. It is offered as a mirror for self-reflection, read alongside astrological context, and never as a fixed forecast. Nothing in a reading is presented as inevitable.",
        },
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
  //  FREQUENTLY ASKED QUESTIONS  (editable — refine the wording freely)
  //  Calm, honest answers. Also powers FAQ structured data (SEO) on the home page.
  // ──────────────────────────────────────────────────────────────────────────
  faqs: [
    {
      q: "How do consultations take place — online or in person?",
      a: "Most consultations are arranged remotely, so you can take part comfortably from wherever you are. Reach out by WhatsApp, phone, or the contact form and we'll find a time that suits you.",
    },
    {
      q: "What details will I need to provide?",
      a: "It depends on the service. A Vedic birth-chart reading needs your date, time, and place of birth; a Vastu report is helped by photographs or a simple floor plan of your space. I'll let you know exactly what's useful when you get in touch.",
    },
    {
      q: "How long does it take, and when will I receive my report?",
      a: "A consultation conversation usually takes around an hour, and written reports are typically prepared within a few days. Timings vary with the depth of the work — I'll always give you a clear estimate up front.",
    },
    {
      q: "Is this a substitute for medical, legal, or financial advice?",
      a: "No. This guidance is offered for reflection and wellbeing, and is not a substitute for professional medical, legal, or financial advice. You remain free in every decision you make.",
    },
    {
      q: "Will my information be kept private?",
      a: "Yes. Anything you share is treated as confidential and used only to prepare your consultation.",
    },
    {
      q: "I'm completely new to this — is that okay?",
      a: "Absolutely. Many people come with little or no prior knowledge. There's no pressure and no judgement — only a calm, respectful conversation about what you're seeking.",
    },
  ] satisfies FaqItem[],

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
    defaultTitle: "Acharya Amit Puri — Vastu Consultant & Vedic Astrologer",
    defaultDescription:
      "Vastu, Vedic astrology and numerology with Acharya Amit Puri. Kundli reading, name correction, Prakriti and palmistry — consultations online across India.",
    /** Social share image, placed in /public. Swap the file to change it. */
    ogImage: "/og-image.png",
  },
} as const;

export type Site = typeof site;
