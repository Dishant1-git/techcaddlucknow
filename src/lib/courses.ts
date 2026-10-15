// Detail pages for courses (/courses/<slug>) and After 12th programmes
// (/after-12th-courses/<slug>). Import this from Server Components only: it
// pulls in the whole of both content files.
import programmeContent from "./after12thContent.json";
import guideContent from "./courseGuides.json";
import content from "./courseContent.json";
import { after12thCatalogue, after12thHref, aiMenu, courseCatalogue, courseSlugs, site } from "./site";

/** A titled block of copy: a paragraph, a list, or both. */
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
  unit: "Week" | "Module";
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
      a: `The ${name} at ${site.name} ${site.city} runs ${duration}. Weekday, evening and weekend batches cover the same syllabus, so you can pick the schedule that fits around college or work.`,
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
        `The ${name} at ${site.name} ${site.city} is a hands-on programme${duration ? ` that runs ${duration}` : ""}, built for students, graduates and working professionals. The syllabus moves through ${list(c.modules.slice(0, 4).map((m) => m.title))}, and every module ends with something you have built rather than a set of notes.`,
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

/** Lays the course's content brief over the generated page: its copy replaces ours. */
function withGuide(course: Course): Course {
  const guide = guides[course.slug] && localise(guides[course.slug]);
  if (!guide) return course;
  return {
    ...course,
    guide,
    summary: guide.summary,
    overview: guide.overview,
    syllabusIntro: guide.learn.intro,
    modules: guide.learn.modules.map((m) => ({ ...m, points: m.points ?? [] })),
    tools: officeAiCourses.has(course.slug) ? officeAiTools : course.tools,
    // The briefs make no project, job-title or employer claims, so neither do these pages.
    projects: [],
    role: null,
    hiredBy: [],
    faqs: guide.faqs,
    unit: "Module",
  };
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
  return { ...programme, theme: "after12th" };
}
