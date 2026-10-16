// Placements page (/techcadd-lucknow-placements), reshaped from placements.json.
//
// TODO: every figure, percentage and placement record here is carried over from
// the techcadd Mohali site and must be confirmed (or replaced) for the Lucknow
// centre before going live. Company names and regions are kept as in the
// source; the student names are samples the source uses for privacy.
import data from "./data/placements.json";
import { mapHref, resourceRoutes } from "./routes";

type Item = { title?: string; text?: string; meta?: string; link?: string };

type RawRecord = {
  name: string;
  course: string;
  company: string;
  role: string;
  package: string;
  region: string;
};

type RawStory = { text: string; name: string; role: string; company: string; rating?: number };

type Showcase = {
  heading: string;
  text: string;
  stats: { value: string; label: string }[];
  filters: { label: string; count: number }[];
  footer: { heading: string; eyebrow: string; text: string; links: string[]; disclaimer: string };
};

const [services, readiness, sectors, showcase, stories, next] = data.sections;
const show = showcase as unknown as Showcase;

export const placementStats = data.stats;

export const placementServices = {
  eyebrow: services.eyebrow!,
  heading: services.heading,
  text: services.text!,
  items: (services.items as Item[]).map((i) => ({ title: i.title!, text: i.text! })),
};

export const placementReadiness = {
  eyebrow: readiness.eyebrow!,
  heading: readiness.heading,
  // The source credits these to "the Mohali centre"; they are not Lucknow figures.
  text: "Measured across the 6-month and 9-month tracks for the last four completed sessions.",
  items: (readiness.items as Item[]).map((i) => ({ label: i.title!, value: Number.parseInt(i.meta!, 10) })),
};

export const placementSectors = {
  eyebrow: sectors.eyebrow!,
  heading: "Sectors that hire techcadd students",
  text: "The partner network covers IT services, product companies and agencies, and extends to product teams in Bengaluru, Pune and Gurugram.",
  tags: (sectors as unknown as { tags: string[] }).tags,
  disclaimer: (sectors as unknown as { disclaimer: string }).disclaimer,
};

export type PlacementRecord = RawRecord & { id: string };

export const placementRecords: PlacementRecord[] = (showcase.items as RawRecord[]).map((r, i) => ({
  ...r,
  id: `${r.name}-${i}`,
}));

export const placementRegions = show.filters
  .filter((f) => f.label !== "All")
  .map((f) => ({ label: f.label, count: placementRecords.filter((r) => r.region === f.label).length }));

export const placementShowcase = {
  eyebrow: showcase.eyebrow!,
  heading: showcase.heading,
  text: "Roles and packages from placement records across the techcadd network — Mohali & Chandigarh, Delhi NCR, Bengaluru and remote teams.",
  stats: show.stats,
  disclaimer: show.footer.disclaimer,
  capstone: {
    eyebrow: show.footer.eyebrow,
    heading: show.footer.heading,
    text: show.footer.text,
    links: [
      { label: show.footer.links[0], href: resourceRoutes.projects },
      { label: show.footer.links[1], href: "/courses" },
    ],
  },
};

export const placementStories = {
  eyebrow: stories.eyebrow!,
  heading: "What students say about the trainers and the project work",
  text: stories.text!,
  items: (stories.items as RawStory[]).map((s) => ({
    text: s.text,
    name: s.name,
    role: s.role,
    where: s.company,
    rating: s.rating,
  })),
};

export const placementLinks = (next.items as Item[]).map((l) =>
  // The "best IT training" page does not exist here, so that card points at About.
  /best-it-training/.test(l.link ?? "")
    ? {
        title: "About techcadd",
        text: "Who we are, who we teach and what makes the training different.",
        cta: "About us",
        href: mapHref("/about"),
      }
    : { title: l.title!, text: l.text!, cta: l.meta, href: mapHref(l.link) },
);
