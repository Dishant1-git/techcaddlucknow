// Student projects page content, reshaped from the localised content file.
import data from "./data/projects.json";
import { mapHref } from "./routes";

type Section = (typeof data.sections)[number];
const section = (heading: string) => data.sections.find((s) => s.heading === heading) as Section;
type Item = { title: string; text?: string; meta?: string; link?: string };

export const projectsHero = data.hero;

export const projectStats = [
  ...data.stats,
  { value: String(section("Inspect What techcadd Students Build").items.length), label: "Featured capstones" },
];

export const pillars = section("Pillars").items.map((i) => {
  const item = i as Item;
  return { title: item.title, text: item.text ?? "" };
});

const capstones = section("Inspect What techcadd Students Build");

export const capstoneIntro = {
  eyebrow: capstones.eyebrow as string,
  text: capstones.text as string,
};

export type Capstone = {
  number: string;
  category: string;
  title: string;
  meta: string;
  text: string;
  metric: string;
  tags: string[];
  deliverables: string[];
};

export const capstoneList: Capstone[] = capstones.items.map((i) => {
  const p = i as Capstone;
  return {
    number: p.number,
    category: p.category,
    title: p.title,
    meta: p.meta,
    text: p.text,
    metric: p.metric,
    tags: p.tags,
    deliverables: p.deliverables,
  };
});

/** Filter options in the order the source lists them. */
export const capstoneFilters = data.filters;

const build = section("Ready to Engineer a Resume-Defining Project?");
export const buildCta = {
  eyebrow: build.eyebrow as string,
  text: build.text as string,
  href: mapHref("/industrial-training-in-lucknow"),
};

export const projectsNext = section("Where to go next").items.map((i) => {
  const item = i as Item;
  return { title: item.title, text: item.text ?? "", cta: item.meta, href: mapHref(item.link) };
});
