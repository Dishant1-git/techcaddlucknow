/**
 * Where each kind of content ends up on the public website.
 *
 * An editor filling in a form cannot tell, from the form alone, whether they
 * are writing something that appears on the homepage, on a page of its own, or
 * nowhere at all until a developer wires it up. That gap is where "I saved it
 * and nothing happened" comes from, so it is answered here in one place and
 * shown on every form.
 *
 * Keeping it as data rather than prose in each form means a module that is not
 * yet connected has to say so explicitly, instead of quietly omitting the note.
 */

/** The public site. Set VITE_SITE_URL when it is not on the usual dev port. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'http://localhost:3000'
).replace(/\/$/, '')

export interface Placement {
  /** Where this content shows up, in a sentence an editor can act on. */
  where: string
  /**
   * The public URL of one record, when it has a page of its own.
   *
   * Undefined means the content appears inside other pages rather than at its
   * own address — a testimonial has no URL, a blog post does.
   */
  url?: (record: Record<string, unknown>) => string | undefined
  /**
   * Set when nothing on the website reads this yet.
   *
   * The honest alternative to leaving the module out of this map, which would
   * read as "no note needed" rather than "this goes nowhere".
   */
  notLive?: string
}

/**
 * The public site's host, for hints that show an address without linking it.
 *
 * Derived from SITE_URL rather than written into each form: the forms used to
 * say "techcadd.com/blog/…", a domain and a path this site does not serve.
 */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '')

/**
 * Course segments whose public path differs from the segment name. The Lucknow
 * site nests internship training under a city-named section.
 */
const SECTION_PATHS: Record<string, string> = {
  'internship-training': 'internship-training-in-lucknow',
}

/**
 * The part of a record's public path that comes before its slug.
 *
 * The one place the website's URL shapes are written down. Slug hints, search
 * previews, sitemap rows and "view on site" links all build on it, so a path
 * the website changes is changed here once instead of in every form.
 *
 * Gallery albums have no page of their own; the gallery page anchors each
 * album by its slug. Categories point at the category page the website is
 * adding, even though SITE_MAP below does not link it yet.
 */
const SLUG_PREFIXES: Record<string, (record: Record<string, unknown>) => string> = {
  blogs: () => '/tech-blog-of-lucknow/',
  events: () => '/techcadd-lucknow-seminars/',
  gallery: () => '/techcadd-lucknow-classroom-gallery-images#',
  categories: () => '/courses/category/',
  pages: () => '/',
  courses: ({ segment }) => {
    const section = typeof segment === 'string' && segment ? segment : 'courses'
    return `/${SECTION_PATHS[section] ?? section}/`
  },
}

/**
 * The public path of one record, e.g. "/tech-blog-of-lucknow/my-post".
 *
 * Undefined while the slug is empty or for modules without slugged pages.
 */
export function publicPathFor(module: string, record: object | undefined): string | undefined {
  const prefix = SLUG_PREFIXES[module]
  if (!prefix || !record) return undefined
  // Callers pass their own entity types; only `slug` and `segment` are read,
  // and both are checked, so the index-signature cast is safe.
  const fields = record as Record<string, unknown>
  const slug = fields.slug
  return typeof slug === 'string' && slug ? `${prefix(fields)}${slug}` : undefined
}

/**
 * What a slug field shows in front of the slug, e.g.
 * "localhost:3000/tech-blog-of-lucknow/". Takes the record because a course's
 * section decides its path.
 */
export function slugHintFor(module: string, record: object = {}): string {
  return `${SITE_HOST}${SLUG_PREFIXES[module]?.(record as Record<string, unknown>) ?? '/'}`
}

/** A search-preview address for a record, with a stand-in until it has a slug. */
export function previewAddressFor(module: string, record: object = {}): string {
  const slug = (record as Record<string, unknown>).slug
  return `${slugHintFor(module, record)}${typeof slug === 'string' && slug ? slug : 'your-slug'}`
}

const slugUrl = (module: string) => (record: Record<string, unknown>) => {
  const path = publicPathFor(module, record)
  return path ? `${SITE_URL}${path}` : undefined
}

export const SITE_MAP: Record<string, Placement> = {
  blogs: {
    where: 'The blog index at /tech-blog-of-lucknow, and a page of its own.',
    url: slugUrl('blogs'),
  },
  courses: {
    where:
      'Its own course page, the listing for its section, the course dropdown in the menus and the sitemap. The category you choose is the heading it is filed under.',
    url: slugUrl('courses'),
  },
  categories: {
    where: 'The category cards on the homepage. The slug decides which course page the card opens.',
  },
  pages: {
    where: 'A page of its own at the address below.',
    url: slugUrl('pages'),
  },
  faqs: {
    where:
      'The /frequently-asked-questions-techcadd-lucknow page, grouped under the category you enter. Featured questions also appear in the homepage FAQ section.',
  },
  reviews: {
    where:
      'The /techcadd-lucknow-student-reviews page. Only reviews with source "Google" are shown there, because the card carries the Google mark.',
  },
  testimonials: {
    where: 'The testimonials carousel on the homepage. Featured ones are shown first.',
  },
  events: {
    where:
      'The seminars & events listing at /techcadd-lucknow-seminars, reached from Resources in the main menu. Upcoming events are shown first; once the end date has passed it moves to the archive below them.',
    url: slugUrl('events'),
  },
  gallery: {
    where: 'The /techcadd-lucknow-classroom-gallery-images page, as a photo wall grouped by album.',
  },
  settings: {
    where:
      'Site-wide. The headline figures appear on the about page; the rest is used for contact details and metadata.',
  },
  redirects: {
    where: 'Applied to every visitor request, so an old address sends people to the new one.',
  },
  enquiries: {
    where: 'Received from the website forms. Nothing here is published back to it.',
  },
  media: {
    where: 'Used by whatever content references it — a cover photo, a blog image, a gallery photograph.',
  },
  seo: {
    where: 'Meta titles and descriptions are used on the pages they belong to.',
  },
  'ai-knowledge': {
    where:
      'Nowhere directly. These notes are handed to Gini, the assistant on the website, as facts it is allowed to state — so a published entry changes what Gini answers rather than what any page shows.',
  },
}

/**
 * The public address of one record, or undefined when it has none.
 *
 * Wraps the per-module `url` above so a caller does not have to know which
 * modules have their own page — a list page can offer "View on site" wherever
 * this returns something and omit it everywhere else, without carrying its own
 * copy of the site's URL shapes.
 */
export function publicUrlFor(module: string, record: object | undefined): string | undefined {
  if (!record) return undefined
  // Callers pass their own entity types (Course, Blog, Page); the map's own
  // url() reads a couple of named fields off it and checks them, so an
  // index-signature cast here is safe and saves every caller a cast.
  return SITE_MAP[module]?.url?.(record as Record<string, unknown>)
}
