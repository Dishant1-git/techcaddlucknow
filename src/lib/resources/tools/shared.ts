// Helpers shared by the free tools under /tools.
import { courseHref } from "@/lib/site";
import { mapHref } from "@/lib/resources/routes";

/**
 * Course slugs used by the Mohali site's tools, mapped to the course names in
 * our catalogue (src/lib/site.ts), so links land on our /courses pages and the
 * enquiry popup can preselect the course.
 */
const courseLabels: Record<string, string> = {
  "mern-full-stack": "MERN Full Stack",
  autocad: "AutoCAD",
  "digital-marketing": "Digital Marketing",
  "cyber-security": "Cyber Security",
  "artificial-intelligence": "Artificial Intelligence",
  "python-programming": "Python Programming",
  "data-analytics": "Data Analytics",
  "java-programming": "Java Programming",
  "machine-learning": "Machine Learning",
  "cloud-computing": "Cloud Computing",
  "web-designing": "Web Designing",
};

/** Our course name for a source slug (undefined when there is no single match). */
export const courseLabel = (slug: string): string | undefined => courseLabels[slug];

/** Link for a source course slug or path: a course page here, or a mapped route. */
export function courseLink(slugOrHref: string): string {
  const label = courseLabels[slugOrHref];
  if (label) return courseHref(label);
  // "/courses?category=development" — our catalogue selects a section by hash.
  if (slugOrHref.includes("category=development")) return "/courses#programming";
  return mapHref(slugOrHref);
}

/** Catalogue sections on /courses (see courseCatalogue in site.ts) for a tool category key. */
export const catalogueSection: Record<string, string> = {
  "ai-data": "/courses#ai-data",
  development: "/courses#programming",
  "cyber-cloud": "/courses#cyber-cloud",
  "digital-marketing": "/courses#marketing-design",
  "cad-design": "/courses#civil-mechanical",
  programming: "/courses#programming",
};

export type Faq = { q: string; a: string };
