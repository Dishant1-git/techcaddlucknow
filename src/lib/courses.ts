// Detail pages for courses (/courses/<slug>), After 12th programmes
// (/after-12th-courses/<slug>) and Internship & Training programmes
// (/internship-training-in-lucknow/<slug>). Import this from Server Components only: it
// pulls in the whole of every content file.
import programmeContent from "./after12thContent.json";
import programmeGuideContent from "./after12thGuides.json";
import guideContent from "./courseGuides.json";
import content from "./courseContent.json";
import trainingContent from "./trainingContent.json";
import {
  after12thCatalogue,
  after12thHref,
  aiMenu,
  certificatePrograms,
  courseCatalogue,
  courseSlugs,
  internshipHref,
  site,
  trainingHref,
} from "./site";

/** A titled block of copy: a paragraph, a list, or both; `after` follows the list. */
export type GuideItem = { title: string; text?: string; points?: string[]; after?: string };
type GuideSection = { intro: string; items: GuideItem[]; close: GuideItem | null };

/**
 * Long-form page copy from the course content briefs (courseGuides.json): who
 * the course suits, why the programme and why techcadd, what it teaches and
 * the course's own FAQs.
 */
export type CourseGuide = {
  summary: string;
  overview: string[];
  audience: { intro: string; items: GuideItem[]; note: GuideItem | null };
  why: GuideSection;
  whyUs: GuideSection;
  learn: {
    intro: string;
    modules: GuideItem[];
    /** Rows of the brief's "tool / what you practise" table, if it has one. */
    tools: GuideItem[];
    outcomes: GuideItem[];
    /** Caveat printed under that table. */
    toolNote: string | null;
  };
  faqs: { q: string; a: string }[];
  /**
   * The brief's student reviews. The briefs mark them as illustrative samples,
   * so the page labels them as such until real, consented reviews replace them.
   */
  reviews: { note: string | null; items: { name: string; role: string; quote: string; rating?: number }[] } | null;
  /** The brief's enquiry section: its heading, intro and "Why enquire?" points. */
  enquiry: { title: string; text: string[]; points: string[] } | null;
};

// The beginner AI courses teach AI assistants inside the Office apps, so their
// tool list says so; every other course keeps its own curated list.
const officeAiCourses = new Set(["generative-ai", "prompt-engineering", "rag-development", "ai-powered-courses"]);
const officeAiTools = [
  "ChatGPT",
  "Gemini",
  "Claude",
  "Microsoft Copilot",
  "Microsoft Word",
  "Microsoft Excel",
  "Microsoft PowerPoint",
  "Microsoft Outlook",
];

type RawCourse = {
  summary: string;
  /** Label / value pairs shown under the hero; the first is the duration. */
  facts: string[][];
  overview: string[];
  syllabusIntro: string;
  modules: { title: string; text?: string; points: string[]; after?: string }[];
  tools: string[];
  /** The tools again, grouped and each with a line on what it is used for. */
  toolGroups?: { title: string; tools: { name: string; text: string }[] }[];
  projects: { title: string; text: string; tags: string[] }[];
  role: { title: string; text: string } | null;
  hiredBy: string[];
};

type Link = { label: string; href: string };

export type Course = RawCourse & {
  slug: string;
  /** Short name, as listed in the catalogue and the enquiry form. */
  label: string;
  /** Page heading, without the city. */
  title: string;
  /** Breadcrumb parent, e.g. Courses. */
  parent: Link;
  /** The catalogue section this belongs to; `href` jumps to it. */
  category: Link;
  badge?: "Hot" | "New" | "Trending";
  duration?: string;
  faqs: { q: string; a: string }[];
  related: Link[];
  /** What each syllabus card is called: "Week" for timed courses, "Module" otherwise. */
  unit: "Week" | "Month" | "Module";
  /** Page style: the AI courses and After 12th programmes each have their own. */
  theme: "course" | "ai" | "after12th";
  guide?: CourseGuide;
};

// The copy uses "{city}" wherever the branch is named.
const localise = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value).replaceAll("{city}", site.city));

const list = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : (items[0] ?? "");

// `name` is how the copy refers to it mid-sentence, e.g. "Python Programming course".
function buildFaqs(name: string, c: RawCourse, duration?: string) {
  const fact = (name: string) => c.facts.find(([k]) => k === name)?.[1];
  const eligibility = fact("Eligibility");
  return [
    duration && {
      q: `How long is the ${name}?`,
      a: `The ${name} at ${site.name} ${site.city} runs ${duration.toLowerCase()}. Weekday, evening and weekend batches cover the same syllabus, so you can pick the schedule that fits around college or work.`,
    },
    {
      q: `Who can join the ${name}?`,
      a: `${eligibility ? `Eligibility: ${eligibility}. ` : ""}Students, graduates, working professionals and career-changers all join. It starts from the fundamentals, and a counsellor will suggest a starting point based on your background.`,
    },
    c.tools.length > 0 && {
      q: "Which tools and software will I learn?",
      a: `You will work hands-on with ${list(c.tools.slice(0, 8))}. Everything is practised in the lab, not just demonstrated.`,
    },
    {
      q: "Will I work on real projects?",
      a: c.projects.length
        ? `Yes. Projects include ${list(c.projects.slice(0, 3).map((p) => p.title))}, each reviewed by your trainer and added to your portfolio.`
        : "Yes. Every module ends with something you have built, and the programme closes with a project that is reviewed by your trainer and added to your portfolio.",
    },
    c.role && {
      q: `What jobs can I apply for after the ${name}?`,
      a: `Graduates typically move into ${c.role.title} and related roles. The placement cell helps with your resume, mock interviews and introductions to hiring partners.`,
    },
    {
      q: "What do I receive when I finish?",
      a: "A course certificate, a project report and, on the longer programmes, an internship letter — along with the portfolio you built during training.",
    },
    {
      q: "Are classes available online as well as offline?",
      a: `Yes. You can attend at the ${site.city} campus, join live online, or mix both. Every session is recorded so you can revise or catch up.`,
    },
    {
      q: `What is the fee for the ${name}?`,
      a: "Fees depend on the course and duration, and instalment plans are available on most programmes. Book a free counselling call for an exact quote.",
    },
  ].filter((f) => !!f);
}

function build(
  rawCourse: RawCourse,
  page: Pick<Course, "slug" | "label" | "title" | "parent" | "category" | "badge" | "related">,
  name: string,
): Course {
  const c = localise(rawCourse);
  const duration = c.facts.find(([k]) => k === "Duration")?.[1];
  const summary =
    c.summary ||
    `A practical, project-based ${name} at ${site.name} ${site.city}, taught by working professionals.`;

  // Pages without a written overview get one assembled from their syllabus.
  const overview = c.overview.length
    ? c.overview
    : [
        `The ${name} at ${site.name} ${site.city} is a hands-on programme${duration ? ` that runs ${duration.toLowerCase()}` : ""}, built for students, graduates and working professionals. The syllabus moves through ${list(c.modules.slice(0, 4).map((m) => m.title))}, and every module ends with something you have built rather than a set of notes.`,
        `${c.tools.length ? `You practise on ${list(c.tools.slice(0, 6))}. ` : ""}Trainers review your work as you go, so by the end you have a portfolio you can explain in an interview, plus resume and mock-interview support from the placement cell.`,
      ];

  return {
    ...c,
    ...page,
    summary,
    overview,
    duration,
    faqs: buildFaqs(name, c, duration),
    unit: "Week",
    theme: "course",
  };
}

const guides = guideContent as Record<string, CourseGuide>;

/**
 * Lays the course's content brief over the generated page: its copy replaces
 * ours. The syllabus stays the module plan from courseContent.json (the same as
 * techcaddjalandhar.com); the brief's own "what you will learn" topics appear
 * in the skills and outcomes section instead.
 */
function withGuide(course: Course): Course {
  const guide = guides[course.slug] && localise(guides[course.slug]);
  if (!guide) return course;
  return {
    ...course,
    guide,
    summary: guide.summary,
    overview: guide.overview,
    tools: officeAiCourses.has(course.slug) ? officeAiTools : course.tools,
    // The briefs make no project, job-title or employer claims, so neither do these pages.
    projects: [],
    role: null,
    hiredBy: [],
    faqs: guide.faqs,
  };
}

// Pages without a brief of their own (After 12th programmes, internship
// domains, courses like "LLM Development") borrow the closest course's brief
// for its "why techcadd" points and student reviews. Most specific first.
const related: [RegExp, string][] = [
  [/Agentic|\bAgents?\b/i, "agentic-ai"],
  [/Generative AI|\bLLM\b/i, "generative-ai"],
  [/ChatGPT/i, "chatgpt-ai-tools"],
  [/Prompt/i, "prompt-engineering"],
  [/\bRAG\b/i, "rag-development"],
  [/AI for Managers/i, "ai-for-managers"],
  [/AI-Powered Marketing/i, "ai-powered-marketing"],
  [/Deep Learning|Computer Vision|Speech/i, "deep-learning"],
  [/Machine Learning|\bML\b/i, "machine-learning"],
  [/Data Science/i, "data-science"],
  [/Data Analytics|\bSQL\b|Pandas|Data Cleaning/i, "data-analytics"],
  [/Power BI/i, "power-bi"],
  [/Tableau/i, "tableau"],
  [/Artificial Intelligence|\bNLP\b|Robotics|\bAI\b/i, "artificial-intelligence"],
  [/MERN/i, "mern-stack"],
  [/MEAN/i, "mean-stack"],
  [/PHP/i, "php-full-stack"],
  [/Full Stack/i, "full-stack-development"],
  [/Flutter/i, "flutter"],
  [/Kotlin/i, "kotlin"],
  [/DevOps/i, "devops-engineering"],
  [/Docker|Kubernetes/i, "docker-kubernetes"],
  [/AWS/i, "aws-cloud"],
  [/Azure/i, "microsoft-azure"],
  [/Cloud/i, "cloud-computing"],
  [/Linux/i, "linux-administration"],
  [/Ethical Hacking/i, "ethical-hacking"],
  [/Penetration/i, "penetration-testing"],
  [/\bSOC\b/i, "soc-analyst"],
  [/Forensics/i, "cyber-forensics"],
  [/Network Security|CCNA/i, "network-security-ccna"],
  [/Cyber|OSINT|Web Security/i, "cyber-security"],
  [/Google Ads|Meta Ads/i, "google-ads"],
  [/\bSEO\b/i, "seo"],
  [/Social Media|Instagram|Influencer|WhatsApp/i, "social-media-marketing"],
  [/Digital Marketing|Content Marketing|Email Marketing|Marketing Automation/i, "digital-marketing"],
  [/WordPress|WooCommerce/i, "wordpress"],
  [/Shopify/i, "shopify"],
  [/Dropshipping|E-?Commerce/i, "dropshipping-ecommerce"],
  [/UI\/UX/i, "ui-ux-design"],
  [/Graphic/i, "graphic-designing"],
  [/Web Design/i, "web-designing"],
  [/Web Development/i, "web-development"],
  [/Python/i, "python"],
  [/Java\b/i, "java"],
  [/\bC\+\+|\bC &|\bC Programming/i, "c-cpp"],
];

/** The closest course with a brief, by name — with that course's label. */
export function relatedGuide(name: string): { label: string; guide: CourseGuide } | undefined {
  const slug = related.find(([re]) => re.test(name))?.[1];
  if (!slug || !guides[slug]) return undefined;
  const label = Object.keys(courseSlugs).find((l) => courseSlugs[l] === slug) ?? name;
  return { label, guide: localise(guides[slug]) };
}

export type ReviewItem = NonNullable<CourseGuide["reviews"]>["items"][number] & { course?: string };

/** One review from each of several courses, for pages that span many domains. */
export function mixedReviews(
  slugs = ["python", "data-analytics", "web-designing", "cyber-security", "digital-marketing", "cloud-computing", "artificial-intelligence", "mern-stack", "graphic-designing"],
): ReviewItem[] {
  return slugs.flatMap((slug) => {
    const r = guides[slug]?.reviews?.items[0];
    const label = Object.keys(courseSlugs).find((l) => courseSlugs[l] === slug) ?? slug;
    return r ? [{ ...localise(r), course: label }] : [];
  });
}

// The courses listed in the AI menu get the AI page style.
const aiSlugs = new Set(
  aiMenu
    .flatMap((col) => col.links.map((l) => l.href as string))
    .flatMap((h) => h.match(/^\/courses\/([^/#]+)$/)?.[1] ?? []),
);

const raw = content as Record<string, RawCourse>;

export const courseSlugList = Object.values(courseSlugs).filter((slug) => slug in raw);

export function getCourse(slug: string): Course | undefined {
  const label = Object.keys(courseSlugs).find((l) => courseSlugs[l] === slug);
  const category = courseCatalogue.find((cat) => cat.courses.some((c) => c.label === label));
  if (!label || !category || !raw[slug]) return undefined;

  const course = build(
    raw[slug],
    {
      slug,
      label,
      // "AI-Powered Courses" reads as "AI-Powered Course", not "… Courses Course".
      title: label.endsWith(" Courses") ? label.slice(0, -1) : `${label} Course`,
      parent: { label: "Courses", href: "/courses" },
      category: { label: category.title, href: `/courses#${category.id}` },
      badge: category.courses.find((x) => x.label === label)?.badge,
      related: category.courses
        .filter((x) => x.label !== label && courseSlugs[x.label])
        .slice(0, 6)
        .map((x) => ({ label: x.label, href: `/courses/${courseSlugs[x.label]}` })),
    },
    `${label} course`,
  );
  return withGuide({ ...course, theme: aiSlugs.has(slug) ? "ai" : "course" });
}

const rawProgrammes = programmeContent as Record<string, RawCourse>;

export const programmeSlugList = after12thCatalogue
  .flatMap((cat) => cat.courses.map((c) => c.slug))
  .filter((slug) => slug in rawProgrammes);

export function getProgramme(slug: string): Course | undefined {
  const category = after12thCatalogue.find((cat) => cat.courses.some((c) => c.slug === slug));
  const label = category?.courses.find((c) => c.slug === slug)?.label;
  if (!label || !category || !rawProgrammes[slug]) return undefined;

  // "Generative AI (1 Year)" reads as "Generative AI programme" in a sentence.
  const base = label.replace(/ \((1 Year|6 Months)\)$/, "");
  const isTrack = category.title.startsWith("After 12th");

  const programme = build(
    rawProgrammes[slug],
    {
      slug,
      label,
      title: isTrack ? `After 12th ${label}` : `${base} Certificate Programme After 12th`,
      parent: { label: "After 12th", href: "/after-12th-courses" },
      category: { label: category.title, href: `/after-12th-courses#${category.id}` },
      related: category.courses
        .filter((x) => x.slug !== slug)
        .slice(0, 6)
        .map((x) => ({ label: x.label, href: after12thHref(x.slug) })),
    },
    base === label ? label : `${base} programme`,
  );
  // Programmes are taught month by month ("Month 1 — ..."); the longer ones
  // group months ("Months 1 – 2 — ..."), so their stages are just numbered.
  const monthly = programme.modules.every((m) => /^Month \d/.test(m.title));
  return withProgrammeGuide({ ...programme, unit: monthly ? "Month" : "Module", theme: "after12th" });
}

// These briefs carry no reviews or enquiry text; the pages fall back to the
// closest course's reviews.
const programmeGuides = Object.fromEntries(
  Object.entries(programmeGuideContent).map(([slug, g]) => [slug, { reviews: null, enquiry: null, ...g } as CourseGuide]),
);

/**
 * Adds the programme's content brief (after12thGuides.json). Unlike the course
 * briefs it keeps our month-by-month syllabus, tools and projects: the brief
 * supplies the overview, the guide sections and the FAQs.
 */
function withProgrammeGuide(programme: Course): Course {
  const guide = programmeGuides[programme.slug] && localise(programmeGuides[programme.slug]);
  if (!guide) return programme;
  return {
    ...programme,
    guide,
    overview: guide.overview.length ? guide.overview : programme.overview,
    faqs: guide.faqs.length ? guide.faqs : programme.faqs,
  };
}

const rawTraining = trainingContent as Record<string, RawCourse>;

export const trainingSlugList = certificatePrograms
  .flatMap((p) => (p.slug ? [p.slug] : []))
  .filter((slug) => slug in rawTraining);

export function getTraining(slug: string): Course | undefined {
  const programme = certificatePrograms.find((p) => p.slug === slug);
  if (!programme || !rawTraining[slug]) return undefined;
  const section = { label: "Internship & Training", href: internshipHref() };

  return build(
    rawTraining[slug],
    {
      slug,
      label: programme.label,
      title: `${programme.label} Certificate Course`,
      parent: section,
      category: section,
      badge: programme.badge,
      related: certificatePrograms
        .filter((p) => p.slug !== slug && p.slug && p.slug in rawTraining)
        .slice(0, 6)
        .map((p) => ({ label: p.label, href: trainingHref(p) })),
    },
    `${programme.label} certificate course`,
  );
}
