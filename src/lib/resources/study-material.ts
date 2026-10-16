// Study-material page content, reshaped from the localised content file.
import data from "./data/study-material.json";
import { mapHref, resourceRoutes } from "./routes";

type RawItem = { title: string; text?: string; cta?: string; href?: string };
type RawResource = Omit<StudyResource, "category">;
type RawSection = {
  heading: string;
  eyebrow?: string;
  text?: string;
  items?: RawItem[];
  categories?: { heading: string; slug: string; text: string; items: RawResource[] }[];
};

const sections = data.sections as RawSection[];
const section = (heading: string) => sections.find((s) => s.heading === heading) ?? { heading, items: [] };

export const studyHero = {
  eyebrow: data.hero.eyebrow,
  // The source repeats the heading as its intro, so the intro is taken from the
  // first "quick link", which was really the hero's supporting line.
  text: section("Quick links").items?.[0]?.title ?? "",
};

/**
 * The four value points. In the content file each point's title and text are
 * shifted by one item, so they are paired up again here. The syllabus line
 * named universities from the original branch's region, so it is kept general.
 */
export const studyValues = [
  {
    title: "100% University Aligned",
    text: "Strictly follows AICTE and university course syllabus guidelines.",
  },
  {
    title: "Written by Practicing Engineers",
    text: "Authored by active tech leads with genuine real-world production experience.",
  },
  {
    title: "Viva & Project Ready",
    text: "Ideal for college viva presentations, capstone defenses, and technical interview reviews.",
  },
  {
    title: "Free Forever Access",
    text: "Curated by senior engineering mentors — 100% free with no paywall.",
  },
];

const library = section("Download, Bookmark & Study Anytime");

export const studyLibrary = {
  eyebrow: library.eyebrow ?? "",
  heading: library.heading,
  text: "Organised by discipline — open a card's cheat sheet to read key syntax and viva notes, or follow “Full course” to explore the complete syllabus and curriculum.",
};

export type CheatSheet = { summary: string; codeTitle: string; code: string; keyTakeaways: string[] };

export type StudyResource = {
  id: string;
  title: string;
  type: string;
  tag: string;
  text: string;
  highlights: string[];
  href: string;
  courseName: string;
  category: string;
  cheatSheet: CheatSheet;
};

export const studyCategories = (library.categories ?? []).map((c) => ({
  slug: c.slug,
  heading: c.heading,
  text: c.text,
}));

export const studyResources: StudyResource[] = (library.categories ?? []).flatMap((c) =>
  c.items.map((r) => ({ ...r, category: c.slug, href: mapHref(r.href) })),
);

const transition = section("Turn Theory into Production-Ready Engineering");

export const studyTransition = {
  eyebrow: transition.eyebrow ?? "",
  heading: transition.heading,
  text: transition.text ?? "",
  items: (transition.items ?? []).map((item) => {
    const isTool = (item.href ?? "").startsWith("/tools");
    return {
      title: item.title,
      // The calculator blurb named the original region's universities.
      text:
        item.href === "/tools/cgpa-to-percentage-calculator"
          ? "Accurate formulas for CBSE and autonomous university grading schemes, ready for placement drives."
          : (item.text ?? ""),
      href: mapHref(item.href),
      cta: isTool ? "Open the tool" : "Explore the curriculum",
    };
  }),
};

const next = section("Where to go next");

export const studyNext = (next.items ?? []).map((item) => {
  return { title: item.title, text: item.text ?? "", cta: item.cta, href: mapHref(item.href) };
});

export const toolsHref = resourceRoutes.tools;
