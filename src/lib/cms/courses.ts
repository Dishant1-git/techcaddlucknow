// Courses from the CMS, rendered through the same page as the bundled ones.
//
// A CMS course whose slug matches a bundled course is laid over it: whatever
// the editor filled in replaces the bundled copy, and anything left blank
// keeps it. A CMS course with a new slug gets a page of its own, built by the
// same generator the bundled courses use, so it has a generated overview and
// FAQs until the editor writes them.
//
// Fields the bundled content has no slot for (hero buttons, comparison table,
// plans, section media, custom blocks, layout) travel in `course.cms`; each
// component falls back to its generated copy when the editor left one empty.
import "server-only";
import { build, courseSlugList, getCourse, type Course, type RawCourse } from "../courses";
import { reviews as bundledReviews } from "../resources/reviews";
import { courseCatalogue, courseHref, site } from "../site";
import { cmsAsset, cmsGet } from "./client";
import { cleanHtml, stripTags, toParagraphs } from "./html";
import type {
  CmsCategory,
  CmsCourse,
  CmsFaqCategory,
  CmsList,
  CmsMedia,
  CmsReview,
  CourseCms,
  CourseReviewView,
  MediaView,
} from "./types";

const cap = (s?: string) => (s ? s[0].toUpperCase() + s.slice(1) : "");

async function allCmsCourses(): Promise<CmsCourse[]> {
  return (await cmsGet<CmsList<CmsCourse>>("/courses?limit=1000"))?.items ?? [];
}

async function cmsCourses(): Promise<CmsCourse[]> {
  return (await allCmsCourses()).filter((c) => c.segment === "courses");
}

export function mediaView(m: CmsMedia | null | undefined, fallbackAlt = ""): MediaView | undefined {
  const src = cmsAsset(m?.url);
  return src ? { src, alt: m?.alt || fallbackAlt, width: m?.width, height: m?.height } : undefined;
}

/**
 * "99" + "%" → "99%", "99" + "k+" → "99k+", "99" + "Hours" → "99 Hours".
 * A short symbol suffix attaches to the number; a word gets a space.
 */
export const withSuffix = (value: string, suffix?: string) =>
  !suffix ? value : /^[^A-Za-z]|^[A-Za-z]{1}\+?$/.test(suffix) && suffix.length <= 2 ? `${value}${suffix}` : `${value} ${suffix}`;

function toRaw(c: CmsCourse): RawCourse {
  const facts = [
    ["Duration", c.duration],
    ["Level", cap(c.level)],
    ["Mode", c.mode === "offline" ? "Classroom" : cap(c.mode)],
    ...c.facts.map((f) => [f.label, withSuffix(f.value, f.suffix)]),
    ["Eligibility", c.eligibility],
    ["Certification", c.certification],
  ].filter((f): f is string[] => !!f[0] && !!f[1]);

  const groups = new Map<string, { name: string; text: string }[]>();
  for (const t of c.toolItems) {
    const key = t.category || "Tools";
    groups.set(key, [...(groups.get(key) ?? []), { name: t.name, text: t.body ?? "" }]);
  }

  return {
    summary: c.intro || c.tagline || c.shortDescription,
    facts,
    // The editor's overview (one paragraph per line) wins over the long description.
    overview: c.overview?.trim() ? c.overview.split(/\n+/).map((p) => p.trim()).filter(Boolean) : toParagraphs(c.description),
    syllabusIntro: c.syllabusIntro ?? "",
    modules: c.syllabus.map((m) => ({
      title: m.title,
      text: m.body,
      points: [...m.topics, ...(m.outcomes ?? []).map((o) => `Outcome: ${o}`)],
      after: m.project ? `Project: ${m.project}` : undefined,
    })),
    tools: [...new Set([...c.tools, ...c.toolItems.map((t) => t.name)])],
    toolGroups: groups.size ? [...groups].map(([title, tools]) => ({ title, tools })) : undefined,
    projects: c.projects.map((p) => ({
      title: p.title,
      text: stripTags(p.body),
      tags: p.tags,
      demoUrl: p.demoUrl,
      repoUrl: p.repoUrl,
      videoUrl: p.videoUrl,
    })),
    role: c.careerRoles[0] ? { title: c.careerRoles[0].role, text: c.careerRoles[0].body ?? "" } : null,
    hiredBy: [],
  };
}

/** The CMS-only parts of the page; see CourseCms. */
function toView(c: CmsCourse): CourseCms {
  const media = (image?: CmsMedia | null, videoUrl?: string, extraImage?: CmsMedia | null) => {
    const view = { image: mediaView(image, c.title), extraImage: mediaView(extraImage, c.title), videoUrl: videoUrl || undefined };
    return view.image || view.extraImage || view.videoUrl ? view : undefined;
  };
  const cta = (x: CmsCourse["ctaPrimary"]) => (x?.text?.trim() ? x : undefined);
  return {
    eyebrow: c.eyebrow || undefined,
    h1: c.h1 || undefined,
    ctaPrimary: cta(c.ctaPrimary),
    ctaSecondary: cta(c.ctaSecondary),
    highlights: c.highlights.filter(Boolean),
    tagline: c.tagline || undefined,
    demand: c.demand || undefined,
    thumbnail: mediaView(c.thumbnail, c.title),
    overview: c.overview?.trim() ? c.overview.split(/\n+/).map((p) => p.trim()).filter(Boolean) : undefined,
    // Only needed when the overview replaced it; otherwise it already is the overview.
    descriptionHtml: c.overview?.trim() && stripTags(c.description) ? cleanHtml(c.description) : undefined,
    videoUrl: c.videoUrl || undefined,
    videoTitle: c.videoTitle || undefined,
    benefits: c.benefits.filter((b) => b.placement !== "hero"),
    heroBenefits: c.benefits.filter((b) => b.placement === "hero"),
    audienceIntro: c.audienceIntro || undefined,
    audience: c.audience.map((a) => ({ title: a.title, text: a.body })),
    toolItems: c.toolItems.map((t) => ({ name: t.name, category: t.category, url: t.url, text: t.body })),
    careerRoles: c.careerRoles,
    careers: c.careers.filter(Boolean),
    salary: c.salary || undefined,
    workflow: c.workflow,
    whyIntro: c.whyIntro || undefined,
    whyPoints: c.whyPoints,
    comparison: { intro: c.comparisonIntro, others: c.comparisonOthers, note: c.comparisonNote, rows: c.comparisonRows },
    plans: c.plans,
    syllabusNote: c.syllabusNote || undefined,
    media: {
      overview: media(c.highlightsImage, c.highlightsVideoUrl),
      "why-this-program": media(c.whyImage, c.whyVideoUrl),
      "what-you-will-learn": media(c.syllabusImage, c.syllabusVideoUrl),
      learning: media(c.learningImage, c.learningVideoUrl),
      projects: media(c.caseImage, c.caseVideoUrl),
      outcomes: media(c.careerImage, c.careerVideoUrl),
      certificate: media(c.certImage, c.certVideoUrl, c.certProjectImage),
      reviews: media(c.reviewsImage, c.reviewsVideoUrl),
    },
    blocks: c.sections.filter((b) => b.visible !== false),
    sectionOrder: c.sectionOrder,
    hiddenSections: c.hiddenSections,
    seo: c.seo,
  };
}

const badgeOf = (b?: string): Course["badge"] =>
  b === "Hot" || b === "New" || b === "Trending" ? b : undefined;

/** The page's FAQs: the ones the editor attached, else the generated ones. */
async function attachedFaqs(c: CmsCourse) {
  if (!c.faqIds.length) return [];
  const groups = (await cmsGet<CmsList<CmsFaqCategory>>("/faq-categories"))?.items ?? [];
  const all = groups.flatMap((g) => g.faqs);
  return c.faqIds.flatMap((id) => {
    const f = all.find((x) => x.id === id);
    return f ? [{ q: f.question, a: stripTags(f.answer) }] : [];
  });
}

async function fromCms(c: CmsCourse, all: CmsCourse[]): Promise<Course> {
  const raw = toRaw(c);
  const base = getCourse(c.slug);
  const faqs = await attachedFaqs(c);
  const related = c.relatedIds
    .flatMap((id) => all.find((x) => x.id === id) ?? [])
    .map((x) => ({ label: x.title, href: courseUrl(x) }));
  const cms = toView(c);

  if (base) {
    // Laid over a bundled course: only what the editor actually filled in.
    return {
      ...base,
      title: c.title || base.title,
      summary: c.intro || c.tagline || base.summary,
      facts: raw.facts.length ? raw.facts : base.facts,
      overview: cms.overview ?? (raw.overview.length ? raw.overview : base.overview),
      syllabusIntro: raw.syllabusIntro || base.syllabusIntro,
      modules: raw.modules.length ? raw.modules : base.modules,
      tools: raw.tools.length ? raw.tools : base.tools,
      toolGroups: raw.toolGroups ?? base.toolGroups,
      projects: raw.projects.length ? raw.projects : base.projects,
      role: raw.role ?? base.role,
      badge: badgeOf(c.badge) ?? base.badge,
      duration: c.duration || base.duration,
      faqs: faqs.length ? faqs : base.faqs,
      related: related.length ? related : base.related,
      cms,
      badgeText: c.badge || undefined,
    };
  }

  const categoryTitle = c.categoryName || "Courses";
  const section = courseCatalogue.find((s) => s.title === categoryTitle);
  const course = build(
    raw,
    {
      slug: c.slug,
      label: c.title,
      title: c.title,
      parent: { label: "Courses", href: "/courses" },
      category: {
        label: categoryTitle,
        href: c.categorySlug ? categoryHref(c.categorySlug) : section ? `/courses#${section.id}` : "/courses",
      },
      badge: badgeOf(c.badge),
      related,
    },
    `${c.title} course`,
  );
  return {
    ...course,
    unit: "Module",
    duration: c.duration || course.duration,
    faqs: faqs.length ? faqs : course.faqs,
    cms,
    badgeText: c.badge || undefined,
  };
}

export const categoryHref = (slug: string) => `/courses/category/${slug}`;

const segmentBase = { courses: "/courses", "internship-training": "/internship-training-in-lucknow", "after-12th-courses": "/after-12th-courses" } as const;
export const courseUrl = (c: Pick<CmsCourse, "slug" | "segment">) => `${segmentBase[c.segment] ?? "/courses"}/${c.slug}`;

/** A course page, from the CMS when it has one, else the bundled course. */
export async function getCoursePage(slug: string): Promise<Course | undefined> {
  const all = await allCmsCourses();
  const cms = all.find((c) => c.slug === slug && c.segment === "courses");
  return cms ? fromCms(cms, all) : getCourse(slug);
}

/** The CMS record behind a course page, for its metadata. */
export async function getCmsCourse(slug: string): Promise<CmsCourse | undefined> {
  return (await cmsCourses()).find((c) => c.slug === slug);
}

/** Every course slug with a page: bundled ones and the CMS's own. */
export async function getCourseSlugs() {
  return [...new Set([...courseSlugList, ...(await cmsCourses()).map((c) => c.slug)])];
}

/* ------------------------------------------------------------- reviews */

const reviewView = (r: CmsReview): CourseReviewView => ({
  key: `cms-${r.id}`,
  name: r.authorName,
  quote: r.quote,
  rating: r.rating,
  course: r.courseName,
  reviewedOn: r.reviewedOn,
  link: r.googleUrl,
});

/**
 * The reviews a course page shows: the ones the editor picked for it, else the
 * site's published reviews (CMS first, then the bundled Google reviews).
 */
export async function getCourseReviews(slug: string, limit = 9): Promise<CourseReviewView[]> {
  const cmsReviews = (await cmsGet<CmsList<CmsReview>>("/reviews?limit=500"))?.items ?? [];
  const course = await getCmsCourse(slug);
  const picked = course?.reviewIds.flatMap((id) => cmsReviews.find((r) => r.id === id) ?? []) ?? [];
  if (picked.length) return picked.map(reviewView);
  const all: CourseReviewView[] = [
    ...cmsReviews.map(reviewView),
    ...bundledReviews.map((r, i) => ({ key: `site-${i}`, name: r.name, quote: r.text, rating: r.rating, course: r.course, link: r.link })),
  ];
  return all.slice(0, limit);
}

/* ----------------------------------------------------------- catalogue */

export type CatalogueCourse = { label: string; href: string; badge?: Course["badge"]; logo?: string };
export type CatalogueSectionData = { id: string; title: string; text: string; courses: CatalogueCourse[] };

const sectionId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * The /courses catalogue: the bundled sections, with CMS-only courses filed
 * under the section whose title matches their CMS category, and a new section
 * for any category the site does not have yet.
 */
export async function getCourseCatalogue(): Promise<CatalogueSectionData[]> {
  const sections: CatalogueSectionData[] = courseCatalogue.map((cat) => ({
    ...cat,
    courses: cat.courses.map((c) => ({ ...c, href: courseHref(c.label) })),
  }));
  const known = new Set(courseSlugList);
  for (const c of await cmsCourses()) {
    if (known.has(c.slug)) continue;
    const title = c.categoryName || "More courses";
    let section = sections.find((s) => s.title === title);
    if (!section) {
      section = { id: c.categorySlug || sectionId(title), title, text: "New courses at techcadd", courses: [] };
      sections.push(section);
    }
    section.courses.push({ label: c.title, href: `/courses/${c.slug}`, badge: badgeOf(c.badge) });
  }
  return sections;
}

/** CMS-only courses, by category, for the Courses menu in the header. */
export async function getMenuCourses(): Promise<{ category: string; label: string; href: string }[]> {
  const known = new Set(courseSlugList);
  return (await cmsCourses())
    .filter((c) => !known.has(c.slug))
    .map((c) => ({ category: c.categoryName || "More courses", label: c.title, href: `/courses/${c.slug}` }));
}

/* ------------------------------------------------- cards and categories */

export type CourseCard = {
  title: string;
  href: string;
  text: string;
  image?: MediaView;
  badge?: string;
  duration?: string;
  category?: string;
};

const cardOf = (c: CmsCourse): CourseCard => ({
  title: c.title,
  href: courseUrl(c),
  text: c.shortDescription || c.tagline || "",
  image: mediaView(c.thumbnail, c.title),
  badge: c.badge || undefined,
  duration: c.duration || undefined,
  category: c.categoryName,
});

/** Courses marked "featured" in the CMS, for the homepage. */
export async function getFeaturedCourses(): Promise<CourseCard[]> {
  return (await allCmsCourses()).filter((c) => c.featured).map(cardOf);
}

export async function getCategories(): Promise<CmsCategory[]> {
  return ((await cmsGet<CmsList<CmsCategory>>("/categories?limit=200"))?.items ?? []).sort((a, b) => a.order - b.order);
}

/** A category and its courses, for /courses/category/<slug>. */
export async function getCategoryPage(slug: string) {
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) return undefined;
  const courses = (await allCmsCourses()).filter((c) => c.categoryId === category.id).map(cardOf);
  // A category named like a bundled catalogue section lists that section's courses too.
  const section = courseCatalogue.find((s) => s.title.toLowerCase() === category.name.toLowerCase());
  const bundled: CourseCard[] =
    section?.courses
      .filter((c) => !courses.some((x) => x.title === c.label))
      .map((c) => ({ title: c.label, href: courseHref(c.label), text: `${c.label} training at ${site.name} ${site.city}.`, badge: c.badge })) ?? [];
  return { category, courses: [...courses, ...bundled] };
}

/* ------------------------------------------------------------- preview */

/**
 * A course page for an unsaved CMS draft (the CMS's CoursePreviewDraft), built
 * by the same mapping as a published course. The draft carries no ids, so
 * picked FAQs, reviews and related courses fall back to the generated ones —
 * as the CMS tells its editors.
 */
export async function courseFromDraft(draft: Partial<CmsCourse>): Promise<Course> {
  const c: CmsCourse = {
    id: "preview",
    title: draft.title || "Untitled course",
    slug: draft.slug || "preview",
    segment: draft.segment ?? "courses",
    shortDescription: draft.shortDescription ?? "",
    description: draft.description ?? "",
    facts: [],
    highlights: [],
    benefits: [],
    audience: [],
    syllabus: [],
    tools: [],
    toolItems: [],
    projects: [],
    careerRoles: [],
    careers: [],
    workflow: [],
    whyPoints: [],
    comparisonRows: [],
    plans: [],
    hiddenSections: [],
    sectionOrder: [],
    sections: [],
    featured: false,
    ...draft,
    faqIds: [],
    reviewIds: [],
    relatedIds: [],
  };
  return fromCms(c, []);
}
