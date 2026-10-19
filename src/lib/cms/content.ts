// Website content, with the CMS as the first source.
//
// Each loader returns the same shape the site's components already take, so a
// section reads identically whether an item came from the CMS or from the
// content bundled with the site. CMS items come first; a bundled item with the
// same slug is replaced by the CMS one, and the rest of the bundled content
// stays until it is moved into the CMS. With the CMS unreachable, each loader
// returns exactly what the site showed before the CMS existed.
import "server-only";
import { gallery as builtInGallery, type Photo } from "../gallery";
import { blogPostHref, resourceRoutes } from "../resources/routes";
import { posts as builtInPosts, type Post } from "../resources/blog";
import { events as builtInEvents, type SeminarEvent } from "../resources/seminars";
import { reviews as builtInReviews, type Review } from "../resources/reviews";
import { faqCategories as builtInFaqCategories, faqItems as builtInFaqItems, type FaqItem } from "../resources/faq";
import { faqs as builtInHomeFaqs, site, testimonials as builtInTestimonials } from "../site";
import { cacheLife, cacheTag } from "next/cache";
import { cmsAsset, cmsGet, CMS_TAG } from "./client";
import { cleanHtml, formatDate, readTime, stripTags, toParagraphs } from "./html";
import type { CmsBlog, CmsCategory, CmsEvent, CmsFaqCategory, CmsGalleryAlbum, CmsList, CmsNavPage, CmsPage, CmsPageSummary, CmsReview, CmsTestimonial } from "./types";

const items = <T>(list: CmsList<T> | null) => list?.items ?? [];

/** CMS first, then bundled items whose key the CMS does not already use. */
function merge<T>(cms: T[], builtIn: T[], key: (item: T) => string) {
  const taken = new Set(cms.map(key));
  return [...cms, ...builtIn.filter((item) => !taken.has(key(item)))];
}

/* ------------------------------------------------------------------ blog */

const DEFAULT_COVER = "students-coding";

function toPost(b: CmsBlog): Post {
  const date = formatDate(b.publishDate || b.createdAt);
  const html = cleanHtml(b.body);
  return {
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt || stripTags(b.body).slice(0, 180),
    category: b.tags[0] ?? "Articles",
    date: date.short,
    dateLong: date.long,
    author: `${site.name} ${site.city}`,
    readTime: readTime(b.body),
    tags: b.tags,
    href: blogPostHref(b.slug),
    cover: DEFAULT_COVER,
    coverUrl: cmsAsset(b.coverImage?.url),
    coverAlt: b.coverImage?.alt || undefined,
    seo: b.seo,
    body: [],
    html,
    toc: [],
    metaTitle: b.seo?.metaTitle,
    metaDescription: b.seo?.metaDescription,
  };
}

export async function getPosts(): Promise<Post[]> {
  const cms = items(await cmsGet<CmsList<CmsBlog>>("/blogs?limit=500"));
  return merge(cms.map(toPost), builtInPosts, (p) => p.slug);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const cms = await cmsGet<CmsBlog>(`/blogs/${encodeURIComponent(slug)}`);
  return cms ? toPost(cms) : builtInPosts.find((p) => p.slug === slug);
}

/** Other posts, same topic first, then the newest. */
export async function getRelatedPosts(post: Post, limit = 3) {
  return (await getPosts())
    .filter((p) => p.slug !== post.slug)
    .map((p, i) => ({
      p,
      score: (p.category === post.category ? 10 : 0) + p.tags.filter((t) => post.tags.includes(t)).length * 2 - i / 100,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/* ---------------------------------------------------------------- events */

const eventTypeLabel = (t: string) =>
  t === "workshop" || t === "bootcamp" || t === "hackathon" ? "Workshop" : "Seminar";

export const eventHref = (slug: string) => `${resourceRoutes.events}/${slug}`;

function toEvent(e: CmsEvent): SeminarEvent {
  const today = new Date().toISOString().slice(0, 10);
  const last = e.endsOn || e.startsOn;
  const venue = [e.venueName, e.city].filter(Boolean).join(", ") || (e.mode === "online" ? "Online" : site.city);
  return {
    id: e.slug,
    title: e.title,
    text: e.summary || stripTags(e.body).slice(0, 280),
    date: formatDate(e.startsOn).long,
    venue,
    speaker: e.speakers.map((s) => (s.role ? `${s.name} (${s.role})` : s.name)).join(", ") || undefined,
    type: eventTypeLabel(e.eventType),
    status: last >= today ? "upcoming" : "past",
    href: eventHref(e.slug),
    image: cmsAsset(e.coverImage?.url),
  };
}

export async function getEvents(): Promise<SeminarEvent[]> {
  // Cached because upcoming/past is decided against today's date.
  "use cache";
  cacheLife("minutes");
  cacheTag(CMS_TAG);
  const cms = items(await cmsGet<CmsList<CmsEvent>>("/events?limit=500"));
  // Upcoming CMS events first, soonest at the top; then the archive.
  const mapped = cms.map(toEvent);
  const upcoming = mapped.filter((e) => e.status === "upcoming").reverse();
  const past = mapped.filter((e) => e.status === "past");
  return merge([...upcoming, ...past], builtInEvents, (e) => e.id);
}

/** The full CMS record, for an event's own page. Bundled events have no page. */
export async function getEvent(slug: string): Promise<CmsEvent | null> {
  return cmsGet<CmsEvent>(`/events/${encodeURIComponent(slug)}`);
}

/* --------------------------------------------------------------- reviews */

export async function getReviews(): Promise<Review[]> {
  const cms = items(await cmsGet<CmsList<CmsReview>>("/reviews?limit=500")).map(
    (r): Review => ({
      id: `cms-${r.id}`,
      name: r.authorName,
      text: r.quote,
      rating: r.rating,
      course: r.courseName || "General",
      link: r.googleUrl,
      reviewedOn: r.reviewedOn,
      source: r.source,
    }),
  );
  return [...cms, ...builtInReviews];
}

/** Courses with at least one review, most-reviewed first. */
export function reviewCoursesOf(reviews: Review[]) {
  const tally = new Map<string, number>();
  for (const r of reviews) tally.set(r.course, (tally.get(r.course) ?? 0) + 1);
  return [...tally.entries()]
    .map(([course, count]) => ({ course, count }))
    .sort((a, b) => b.count - a.count || a.course.localeCompare(b.course));
}

/* ------------------------------------------------------------------ faqs */

export async function getFaqs(): Promise<{ items: FaqItem[]; categories: string[] }> {
  const groups = items(await cmsGet<CmsList<CmsFaqCategory>>("/faq-categories"));
  const cms: FaqItem[] = groups.flatMap((g) =>
    g.faqs.map((f) => ({ q: f.question, a: stripTags(f.answer), category: g.name })),
  );
  const all = merge(cms, builtInFaqItems, (f) => f.q.trim().toLowerCase());
  const categories = [...new Set([...groups.filter((g) => g.faqs.length).map((g) => g.name), ...builtInFaqCategories.map((c) => c.label)])];
  return { items: all, categories };
}

/** The homepage FAQ: questions marked "featured" in the CMS, then the bundled ones. */
export async function getHomeFaqs(): Promise<{ q: string; a: string }[]> {
  const groups = items(await cmsGet<CmsList<CmsFaqCategory>>("/faq-categories"));
  const featured = groups.flatMap((g) => g.faqs.filter((f) => f.featured).map((f) => ({ q: f.question, a: stripTags(f.answer) })));
  return merge(featured, builtInHomeFaqs, (f) => f.q.trim().toLowerCase());
}

/* --------------------------------------------------------------- gallery */

export type GalleryAlbum = { slug: string; title: string; description?: string; count: number };

export async function getGallery(): Promise<{ photos: Photo[]; tags: string[]; albums: GalleryAlbum[] }> {
  const albums = items(await cmsGet<CmsList<CmsGalleryAlbum>>("/gallery?limit=200"));
  const cms: Photo[] = albums.flatMap((a) =>
    a.images.flatMap((img) => {
      const src = cmsAsset(img.media?.url);
      if (!src) return [];
      return [
        {
          src,
          alt: img.media.alt || img.caption || a.title,
          caption: img.caption || a.title,
          tag: a.title,
          w: img.media.width || 1600,
          h: img.media.height || 1200,
          remote: true,
          link: img.linkUrl || undefined,
        },
      ];
    }),
  );
  const photos = [...cms, ...builtInGallery];
  return {
    photos,
    tags: ["All", ...new Set(photos.map((p) => p.tag))],
    albums: albums.map((a) => ({ slug: a.slug, title: a.title, description: a.description || undefined, count: a.images.length })),
  };
}

/* ---------------------------------------------------------- testimonials */

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  photo?: string;
  /** Whole stars, 1–5; the placeholders have none and show five. */
  rating?: number;
  /** The course the student took, by name. */
  course?: string;
  googleReviewUrl?: string;
  videoUrl?: string;
};

/**
 * Homepage student stories. The bundled ones are placeholders ("Student
 * Name"), so any published CMS testimonial replaces them outright. Featured
 * ones come first.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const cms = items(await cmsGet<CmsList<CmsTestimonial>>("/testimonials?limit=100"));
  if (!cms.length) return builtInTestimonials;
  const courses = items(await cmsGet<CmsList<{ id: string; title: string }>>("/courses?limit=1000"));
  const sorted = [...cms.filter((t) => t.featured), ...cms.filter((t) => !t.featured)];
  return sorted.map((t) => ({
    name: t.studentName,
    role: t.batch || "techcadd student",
    text: t.quote,
    photo: cmsAsset(t.photo?.url),
    rating: t.rating,
    course: courses.find((c) => c.id === t.courseId)?.title,
    googleReviewUrl: t.googleReviewUrl || undefined,
    videoUrl: t.videoUrl || undefined,
  }));
}

/* ----------------------------------------------------------------- pages */

export async function getCmsPages(): Promise<CmsPageSummary[]> {
  return items(await cmsGet<CmsList<CmsPageSummary>>("/pages"));
}

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  return cmsGet<CmsPage>(`/pages/${encodeURIComponent(slug)}`);
}

export async function getNavPages(): Promise<CmsNavPage[]> {
  return (await cmsGet<{ items: CmsNavPage[] }>("/nav-pages"))?.items ?? [];
}

/* ------------------------------------------------------------ categories */

export async function getCategories(): Promise<CmsCategory[]> {
  return items(await cmsGet<CmsList<CmsCategory>>("/categories")).sort((a, b) => a.order - b.order);
}

export { toParagraphs };
