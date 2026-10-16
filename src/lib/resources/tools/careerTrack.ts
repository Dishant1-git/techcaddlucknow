// Find My Career Track quiz: questions, categories, scoring and the course
// recommended for each category, from career-track.json.
import data from "../data/tools/career-track.json";
import { resourceRoutes } from "@/lib/resources/routes";
import type { NextLink } from "@/components/resources/Kit";
import { catalogueSection, courseLink } from "./shared";

export const careerHero = {
  eyebrow: "Free tool · 4 questions · Printable roadmap",
  text: "Four questions, then a 90-day plan you can actually follow: the course that fits, the job titles to apply for, and what to build first. Print it or save it as a PDF. No form, no email, no catch.",
  badges: ["100% free — always", "Results shown instantly", "No spam, ever"],
};

export type CategoryKey = "ai-data" | "development" | "cyber-cloud" | "digital-marketing" | "cad-design" | "programming";

/** Tie-break order: the first category with the highest count wins. */
export const categoryOrder: CategoryKey[] = [
  "ai-data",
  "development",
  "cyber-cloud",
  "digital-marketing",
  "cad-design",
  "programming",
];

export type Question = {
  label: string;
  question: string;
  sub: string;
  options: { title: string; desc: string; category: CategoryKey }[];
};

export const questions = data.data.questions as Question[];

export type Category = { key: CategoryKey; title: string; blurb: string; icon: string };

export const categories = data.data.categories as Category[];

export type RecommendedCourse = {
  title: string;
  blurb: string;
  duration?: string;
  roles: string[];
  href: string;
};

const rawCourses = data.data.courseByCategory as unknown as Record<
  CategoryKey,
  { slug: string; title: string; blurb: string; duration?: string; roles: string[] }
>;

export const courseByCategory = Object.fromEntries(
  categoryOrder.map((k) => {
    const c = rawCourses[k];
    return [k, { title: c.title, blurb: c.blurb, duration: c.duration, roles: c.roles, href: courseLink(c.slug) }];
  }),
) as Record<CategoryKey, RecommendedCourse>;

/** Count answers per category; ties go to the earlier category in categoryOrder. */
export function winner(answers: CategoryKey[]): CategoryKey {
  const counts = new Map<CategoryKey, number>();
  for (const a of answers) counts.set(a, (counts.get(a) ?? 0) + 1);
  let best = categoryOrder[0];
  let max = -1;
  for (const k of categoryOrder) {
    const n = counts.get(k) ?? 0;
    if (n > max) {
      best = k;
      max = n;
    }
  }
  return best;
}

export const matchingCoursesHref = (k: CategoryKey) => catalogueSection[k] ?? "/courses";

export const careerNext: NextLink[] = [
  {
    title: "All courses",
    text: "Job-oriented tracks in AI, full stack, data, cyber security, cloud, digital marketing and CAD, each with live projects and placement support.",
    cta: "Browse the catalogue",
    href: "/courses",
  },
  {
    title: "AI Interview Prep",
    text: "Practise technical and behavioural interview questions for your role, with model answers and what interviewers look for.",
    cta: "Prepare with AI",
    href: resourceRoutes.interviewPrep,
  },
  {
    title: "Salary estimator",
    text: "Indicative fresher and two-year salary ranges by role across Lucknow, Delhi NCR and remote work.",
    cta: "Check the ranges",
    href: resourceRoutes.salary,
  },
];
