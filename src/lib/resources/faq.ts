// FAQ page content: the localised question bank, deduplicated and tidied.
import data from "./data/faq.json";
import { site } from "@/lib/site";

export type FaqItem = { q: string; a: string; category: string };

export const faqHero = data.hero;

/** Category order as the content file lists it, with a slug for each. */
export const faqCategories = (data.sections[0].items as { title: string; meta: string }[]).map((c) => ({
  label: c.title,
  slug: c.meta,
}));

const where = `Classes run at our ${site.city} centre — ${site.address}. Students join from across the city, including Gomti Nagar, Aliganj, Indira Nagar and Jankipuram.`;

/**
 * Answers (and a question) whose automated localisation kept the original
 * branch's geography (sectors, phases, nearby towns, its address). They are
 * rewritten here from facts the site already states, without adding new ones.
 */
const overrides: Record<string, { q?: string; a: string }> = {
  "where is techcadd's social media marketing training center located in lucknow?": { a: where },
  "where is the agentic ai course in lucknow taught?": { a: where },
  "where is techcadd's machine learning training centre located?": { a: where },
  "where is techcadd's deep learning training centre located?": { a: where },
  "where is techcadd's web development course center located in lucknow?": { a: where },
  "where is the techcadd cyber security training centre located?": { a: where },
  "where is the techcadd cloud computing training centre located?": { a: where },
  "where is techcadd's python training center located in lucknow?": { a: where },
  "where is the techcadd power bi training centre located in lucknow?": {
    a: "The training centre is located in Lucknow, easily accessible for students commuting from Gomti Nagar, Aliganj, Indira Nagar and Jankipuram.",
  },
  "are weekend and evening sessions available in lucknow?": {
    a: "Yes. techcadd Lucknow runs weekday, evening, and weekend sessions in parallel so working professionals and college students can attend without disrupting their schedule. 1-on-1 training is also available.",
  },
  "are session timings flexible for working professionals in lucknow?": {
    a: "Yes. techcadd offers flexible morning, evening and weekend sessions for this WordPress training in Lucknow, making it accessible for students, working professionals and busy entrepreneurs.",
  },
  "is php full stack training useful for students in lucknow?": {
    a: "Yes. Students from across Lucknow can consider PHP full stack training to develop practical web development skills and prepare for entry-level IT opportunities.",
  },
  "is this kotlin course only useful for students living in lucknow?": {
    a: "No. While the course is based in Lucknow, students regularly join from across the city and from nearby towns.",
  },
  "what is the expected starting salary after this shopify course?": {
    a: "Starting salaries for certified Shopify Developers typically range from ₹4–7 LPA, depending on the role and company, with senior roles reaching ₹18–25+ LPA over time.",
  },
  "does techcadd provide placement assistance after the autocad course?": {
    a: "Yes, techcadd offers 100% placement assistance, with connections to architecture firms and construction and design companies across Lucknow.",
  },
  "is autocad a good skill to learn for someone in lucknow specifically?": {
    a: "Yes. Lucknow's growing IT, industrial, and construction sectors create consistent local demand for skilled CAD drafters and design professionals.",
  },
  "why should i choose a local java course in lucknow instead of an online course?": {
    a: "Learning locally in Lucknow connects you with trainers, mentors and a student community aligned with the actual regional job market, giving you a practical, real-world advantage over generic online-only courses.",
  },
  // The original also quoted another branch's address and figures that differ
  // from the ones used across this site, so only the qualitative part is kept.
  "why is techcadd recognized as the best it training institute in lucknow?": {
    a: "techcadd Lucknow stands out through ISO 9001:2015 certification, practicing industry mentors, live enterprise capstone projects, modern AI-integrated syllabi (Agentic AI, Full Stack MERN, Cloud Solutions, Cyber Security), and year-round campus recruitment drives with hiring partners across Lucknow and Pan-India.",
  },
  "how do i reach the techcadd lucknow campus from lucknow, or gomti nagar?": {
    q: "How do I reach the techcadd Lucknow campus?",
    a: `techcadd Lucknow is at ${site.address}. Call ${site.phone} for directions before your first visit.`,
  },
};

/** Phrase-level fixes for the automated localisation ("Lucknow–Lucknow" and so on). */
const fixes: [RegExp, string][] = [
  [/TechC(?:add|ADD)/g, site.name],
  [/across Lucknow — Lucknow and nearby cities —/g, "across Lucknow and nearby cities,"],
  [/across the Lucknow–Lucknow and/g, "across Lucknow and"],
  [/Lucknow\s*[–—/-]\s*Lucknow/g, "Lucknow"],
  [/across Lucknow, and Lucknow/g, "across Lucknow"],
  [/in Lucknow and the wider Lucknow region/g, "in Lucknow and the wider region"],
  [/across Lucknow and the Lucknow region/g, "across Lucknow and the surrounding region"],
  [/in Lucknow and the greater Lucknow region/g, "in Lucknow and the surrounding region"],
  [/(?:Lucknow, )?Gomti Nagar,? and Gomti Nagar/g, "Gomti Nagar"],
  [/Gomti Nagar, Gomti Nagar/g, "Gomti Nagar"],
  [/students from Lucknow, Gomti Nagar\b/g, "students from across Lucknow, including Gomti Nagar"],
  [/Jankipuram (eliminating|removing)/g, "Jankipuram, $1"],
  [/Lucknow's IT hubs/g, "Lucknow"],
  [/sessiones/g, "sessions"],
];

const tidy = (s: string) => fixes.reduce((t, [re, to]) => t.replace(re, to), s).trim();

/** Anything still naming the other branch's surroundings is left out rather than shown wrong. */
const foreign = /Phase \d|Sector \d|Quark|Bestech|Bassi|Landran|Aerocity|tri-?city|IT City|IT Park|ISBT|F-547|160055/i;

/** Every question once (the source repeats some across categories), first answer kept. */
export const faqItems: FaqItem[] = (() => {
  const seen = new Set<string>();
  const out: FaqItem[] = [];
  for (const item of data.qa) {
    const key = item.q.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const o = overrides[key];
    const q = tidy(o?.q ?? item.q);
    const a = tidy(o?.a ?? item.a);
    if (foreign.test(q) || foreign.test(a)) continue;
    out.push({ q, a, category: item.category });
  }
  return out;
})();
