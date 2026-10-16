// College partnerships page content, reshaped from the localised content file.
import data from "./data/partnerships.json";
import { mapHref } from "./routes";

type Section = (typeof data.sections)[number];
const section = (eyebrow: string) => data.sections.find((s) => s.eyebrow === eyebrow) as Section;
type Item = { title: string; text?: string; meta?: string; link?: string };

export const partnershipsHero = data.hero;
export const partnershipStats = data.stats;

// The content file's "Institutional Network" list (13 colleges) belongs to the
// Mohali branch's partners in Punjab, so it is not shown on this page.
// TODO: replace with Lucknow branch partner institutions

const formats = section("What we run");
export const partnershipFormats = formats.items.map((i) => {
  const item = i as Item;
  return { title: item.title, text: item.text ?? "" };
});

const how = section("How it works");
export const partnershipSteps = how.items.map((i) => {
  const item = i as Item;
  return { step: item.meta ?? "", title: item.title, text: item.text ?? "" };
});

const partner = section("Partner with us");
export const partnerCta = {
  eyebrow: partner.eyebrow as string,
  heading: partner.heading,
  text: partner.text as string,
};

export const partnershipsNext = section("Keep exploring").items.map((i) => {
  const item = i as Item;
  return { title: item.title, text: item.text ?? "", cta: item.meta, href: mapHref(item.link) };
});
