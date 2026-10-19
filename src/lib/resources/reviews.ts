// Student reviews page (/techcadd-lucknow-student-reviews), reshaped from reviews.json.
//
// TODO: replace with Lucknow reviews. These are Google reviews left for the
// techcadd Mohali branch; the page presents them as reviews from techcadd
// students across the network. The review text is the reviewer's own words,
// kept verbatim (place names included).
import data from "./data/reviews.json";
import { mapHref } from "./routes";

type RawReview = {
  name: string;
  text: string;
  rating: number;
  course: string;
  link?: string;
};

export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  course: string;
  link?: string;
  /** Month precision, as the CMS stores it ("March 2026"). */
  reviewedOn?: string;
  /** Where it was left; bundled reviews are all from Google. */
  source?: "google" | "website" | "walk-in";
};

// Left out on purpose:
// - "Vimol Kalia": a complaint about a delayed certificate, mis-tagged as five stars.
// - "Shivani Chauhan": describes training at a different institute (MAAC).
// - "Harman Kaur": about the city's institutes in general, not about techcadd.
const dropped = new Set(["Vimol Kalia", "Shivani Chauhan", "Harman Kaur"]);

// Course tags as they read in the source, tidied for the filter chips.
const courseLabel: Record<string, string> = {
  Devops: "DevOps",
  "Data Analysis": "Data Analytics",
  "MERN Full Stack Development": "MERN Full Stack",
  "UI/UX": "UI/UX Design",
};

const rawReviews = data.sections[0].items as RawReview[];

export const reviews: Review[] = rawReviews
  .filter((r) => !dropped.has(r.name))
  .map((r, i) => ({
    id: `${r.name}-${i}`,
    name: r.name.trim(),
    text: r.text.trim(),
    rating: r.rating,
    course: courseLabel[r.course] ?? r.course,
    link: r.link,
  }));

/** Courses with at least one review, most-reviewed first. */
export const reviewCourses = (() => {
  const tally = new Map<string, number>();
  for (const r of reviews) tally.set(r.course, (tally.get(r.course) ?? 0) + 1);
  return [...tally.entries()]
    .map(([course, count]) => ({ course, count }))
    .sort((a, b) => b.count - a.count || a.course.localeCompare(b.course));
})();

// Figures from the techcadd Google listing the reviews come from (Mohali).
// TODO: swap for the Lucknow listing's figures.
export const reviewStats = [
  ...data.stats.map((s) => ({ value: s.value, label: s.label.replace(/^reviews$/, "Google reviews") })),
  { value: String(reviews.length), label: "Reviews on this page" },
];

type RawLink = { title: string; text: string; meta?: string; link?: string };

export const reviewLinks = (data.sections[1].items as RawLink[]).map((l) =>
  // The "best IT training" page does not exist here, so that card points at About.
  /best-it-training/.test(l.link ?? "")
    ? {
        title: "About techcadd",
        text: "Who we are, who we teach and what makes the training different, and how a decade of teaching shaped it.",
        cta: "About us",
        href: mapHref("/about"),
      }
    : { title: l.title, text: l.text, cta: l.meta, href: mapHref(l.link) },
);
