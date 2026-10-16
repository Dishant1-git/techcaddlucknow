// URLs of the Resources pages. Link to them through this map so a renamed
// route only changes here.
export const resourceRoutes = {
  tools: "/tools",
  interviewPrep: "/tools/ai-interview-prep",
  cgpa: "/tools/cgpa-to-percentage-calculator",
  coldEmail: "/tools/ai-cold-email-generator",
  careerTrack: "/tools/career-track",
  trainingMatcher: "/tools/training-matcher",
  salary: "/tools/salary-estimator",
  studyMaterial: "/free-study-material-and-resources",
  interviewQa: "/tech-interview-questions-and-answers",
  projects: "/student-projects-portfolio",
  verifyCertificate: "/verify-certificate",
  blog: "/tech-blog-of-lucknow",
  events: "/techcadd-lucknow-seminars",
  reviews: "/techcadd-lucknow-student-reviews",
  faq: "/frequently-asked-questions-techcadd-lucknow",
  partnerships: "/techcadd-lucknow-college-partnerships",
  placements: "/techcadd-lucknow-placements",
  gallery: "/techcadd-lucknow-classroom-gallery-images",
  pages: "/pages",
} as const;

export const blogPostHref = (slug: string) => `${resourceRoutes.blog}/${slug}`;

/**
 * Maps a link from the Mohali site's content (already localised, so "mohali"
 * reads "lucknow") to the matching page here. Unknown links fall back to the
 * course catalogue.
 */
export function mapHref(href: string | undefined | null): string {
  if (!href) return "/courses";
  if (/^(https?:|mailto:|tel:)/.test(href) && !href.includes("techcadd")) return href;
  const path = href.replace(/^https?:\/\/[^/]+/, "").split("?")[0];
  const direct = Object.values(resourceRoutes).find((r) => r === path);
  if (direct) return direct;
  const rules: [RegExp, string][] = [
    [/^\/tools/, resourceRoutes.tools],
    [/blog/, resourceRoutes.blog],
    [/seminar|event/, resourceRoutes.events],
    [/review/, resourceRoutes.reviews],
    [/placement/, resourceRoutes.placements],
    [/partnership/, resourceRoutes.partnerships],
    [/frequently|faq/, resourceRoutes.faq],
    [/interview/, resourceRoutes.interviewQa],
    [/study-material/, resourceRoutes.studyMaterial],
    [/project/, resourceRoutes.projects],
    [/verify/, resourceRoutes.verifyCertificate],
    [/6-months|six-month/, "/internship-training-in-lucknow/6-months"],
    [/45-days|6-weeks/, "/internship-training-in-lucknow/45-days"],
    [/industrial-training|internship/, "/internship-training-in-lucknow"],
    [/contact/, "/contact"],
    [/gallery/, resourceRoutes.gallery],
    [/^\/pages/, resourceRoutes.pages],
    [/about/, "/about"],
    [/after-12th/, "/after-12th-courses"],
  ];
  return rules.find(([re]) => re.test(path))?.[1] ?? "/courses";
}
