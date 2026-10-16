// Interview Q&A page content, reshaped from the localised content file.
import data from "./data/interview-qa.json";
import { mapHref } from "./routes";

type Section = (typeof data.sections)[number];
const section = (heading: string) => data.sections.find((s) => s.heading === heading) as Section;
type Link = { title: string; text?: string; cta?: string; href: string };

export const interviewHero = {
  eyebrow: data.hero.eyebrow,
  // The localised intro read "across Lucknow IT City and Lucknow IT Park".
  text: "Vetted by senior engineering leads and recruiters from 450+ hiring partners across Lucknow. Curated across MERN, Python, AI, Data Science, Cyber Security, and HR rounds.",
  badges: section("Hero badges").items.map((i) => i.title),
};

const rules = section("Four rules to clear technical rounds in Lucknow IT drives");

export const recruiterRules = {
  eyebrow: rules.eyebrow as string,
  text: rules.text as string,
  items: rules.items.map((i) => {
    const item = i as { title: string; text: string };
    return { title: item.title.replace(/^\d+\.\s*/, ""), text: item.text };
  }),
};

/** One Q&A answer whose localisation claimed figures and districts for Lucknow it had no source for. */
const answerFixes: Record<string, string> = {
  "Why do you want to start your tech career with IT companies in Lucknow?":
    "Lucknow has a growing enterprise and startup software ecosystem of product companies, IT consultancies, and engineering firms. Starting here provides intensive hands-on ownership on real production systems, close mentorship under senior engineers, and accelerated technical career growth.",
};

export const interviewDomains = data.sections
  .filter((s) => s.eyebrow?.startsWith("Domain"))
  .map((s) => ({
    label: s.heading,
    meta: s.eyebrow as string,
    items: data.qa
      .filter((q) => q.category === s.heading)
      .map((q) => ({ tag: q.num, q: q.q, a: answerFixes[q.q] ?? q.a })),
  }));

export const questionCount = data.qa.length;

const sim = section("Ready to Test Your Answers in a Live AI Simulation?");
export const simulator = {
  eyebrow: sim.eyebrow as string,
  text: sim.text as string,
  links: sim.items.map((i) => {
    const item = i as Link;
    return { label: item.title, href: mapHref(item.href) };
  }),
};

const support = section("Want 1:1 Mock Technical Interviews & Resume Overhauls?");
export const placementSupport = {
  eyebrow: support.eyebrow as string,
  text: support.text as string,
  links: support.items.map((i) => {
    const item = i as Link;
    return { label: item.title, href: mapHref(item.href) };
  }),
};

export const interviewNext = section("Where to go next").items.map((i) => {
  const item = i as Link;
  return { title: item.title, text: item.text ?? "", cta: item.cta, href: mapHref(item.href) };
});
