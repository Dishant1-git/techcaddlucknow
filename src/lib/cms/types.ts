// Shapes of the CMS public API (cms-techcadd/backend/src/modules/public), limited
// to the fields this site reads.

export type CmsList<T> = { items: T[]; total: number };

export type CmsMedia = { id: string; url?: string; alt?: string; width?: number; height?: number };

export type CmsSeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: CmsMedia | null;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  inSitemap?: boolean;
  faqSchema?: boolean;
};

export type CmsBlog = {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  coverImage?: CmsMedia | null;
  excerpt: string;
  body: string;
  publishDate?: string;
  seo?: CmsSeo;
  createdAt: string;
};

export type CmsEvent = {
  id: string;
  title: string;
  slug: string;
  eventType: string;
  mode: "in-person" | "online" | "hybrid";
  summary: string;
  body: string;
  coverImage?: CmsMedia | null;
  startsOn: string;
  endsOn?: string;
  startTime?: string;
  endTime?: string;
  venueName?: string;
  venueAddress?: string;
  city?: string;
  mapUrl?: string;
  hostName?: string;
  registrationUrl?: string;
  seats?: number | null;
  fee?: string;
  tags: string[];
  highlights: { text: string }[];
  agenda: { timeLabel?: string; title: string; detail?: string }[];
  speakers: { name: string; role?: string; org?: string; bio?: string; photo?: CmsMedia | null }[];
  images: { media: CmsMedia; caption?: string }[];
  seo?: CmsSeo;
};

export type CmsGalleryAlbum = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  cover?: CmsMedia | null;
  images: { media: CmsMedia; caption?: string; linkUrl?: string }[];
  updatedAt?: string;
};

export type CmsReview = {
  id: string;
  authorName: string;
  rating: number;
  quote: string;
  reviewedOn?: string;
  courseName?: string;
  source: "google" | "website" | "walk-in";
  googleUrl?: string;
};

export type CmsTestimonial = {
  id: string;
  studentName: string;
  photo?: CmsMedia | null;
  courseId?: string;
  batch?: string;
  videoUrl?: string;
  googleReviewUrl?: string;
  rating: number;
  quote: string;
  featured: boolean;
};

export type CmsFaqCategory = {
  id: string;
  name: string;
  slug: string;
  faqs: { id: string; question: string; answer: string; featured: boolean }[];
};

export type CmsCategory = {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  icon?: string;
  accentColor?: string;
  order: number;
};

export type CmsPageSummary = { slug: string; title: string; navLabel?: string; summary?: string; updatedAt?: string };

export type CmsPageSection = {
  type: "rich-text" | "image" | "video" | "cta" | "blogs";
  title?: string;
  body?: string;
  media?: CmsMedia | null;
  linkUrl?: string;
  linkLabel?: string;
  linkTarget?: "same" | "new";
  visible: boolean;
};

export type CmsPage = {
  title: string;
  slug: string;
  template?: string;
  content: string;
  updatedAt?: string;
  sections: CmsPageSection[];
  seo?: CmsSeo;
};

export type CmsNavPage = { slug: string; label: string; placement: "header" | "main" | "footer" | string };

export type CmsSite = {
  siteName: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  stats: { value: string; label: string }[];
  social: Record<string, string>;
  robotsTxt?: string;
  logo?: { url: string; alt?: string };
  favicon?: { url: string };
};

export type CmsCta = { text: string; type: "enquiry" | "contact" | "internal" | "external"; url?: string };

/** A block an editor placed on a course page, before or after one of its sections. */
export type CmsCourseBlock = CmsPageSection & { anchor: string; placement: "before" | "after" };

export type CmsCourse = {
  id: string;
  title: string;
  slug: string;
  segment: "courses" | "internship-training" | "after-12th-courses";
  categoryId?: string;
  categoryName?: string;
  categorySlug?: string;
  shortDescription: string;
  description: string;
  tagline?: string;
  demand?: string;
  eyebrow?: string;
  badge?: string;
  h1?: string;
  intro?: string;
  ctaPrimary?: CmsCta;
  ctaSecondary?: CmsCta;
  duration?: string;
  level?: string;
  mode?: string;
  eligibility?: string;
  certification?: string;
  salary?: string;
  thumbnail?: CmsMedia | null;
  overview?: string;
  videoUrl?: string;
  videoTitle?: string;
  facts: { label: string; value: string; suffix?: string }[];
  highlights: string[];
  benefits: { placement?: "hero" | "what-you-get"; title: string; body?: string }[];
  audienceIntro?: string;
  audience: { title: string; body: string }[];
  syllabusIntro?: string;
  syllabusNote?: string;
  syllabus: { title: string; topics: string[]; body?: string; project?: string; outcomes?: string[]; tools?: string[]; hours?: number }[];
  tools: string[];
  toolItems: { name: string; category?: string; body?: string; url?: string }[];
  projects: { title: string; body: string; tags: string[]; difficulty?: string; demoUrl?: string; repoUrl?: string; videoUrl?: string }[];
  careerRoles: { role: string; body?: string; salaryStart?: string; salarySenior?: string; market?: string; salaryNote?: string }[];
  careers: string[];
  workflow: { title: string; body?: string }[];
  whyIntro?: string;
  whyPoints: { title: string; body?: string }[];
  comparisonIntro?: string;
  comparisonOthers?: string;
  comparisonNote?: string;
  comparisonRows: { feature: string; ours: string; theirs: string }[];
  plans: { label: string; months?: number; duration?: string; summary?: string; rangeLabel?: string; badge?: string; popular?: boolean }[];
  faqIds: string[];
  reviewIds: string[];
  relatedIds: string[];
  hiddenSections: string[];
  sectionOrder: string[];
  sections: CmsCourseBlock[];
  featured: boolean;
  seo?: CmsSeo;
  whyImage?: CmsMedia | null;
  whyVideoUrl?: string;
  syllabusImage?: CmsMedia | null;
  syllabusVideoUrl?: string;
  learningImage?: CmsMedia | null;
  learningVideoUrl?: string;
  highlightsImage?: CmsMedia | null;
  highlightsVideoUrl?: string;
  caseImage?: CmsMedia | null;
  caseVideoUrl?: string;
  certImage?: CmsMedia | null;
  certProjectImage?: CmsMedia | null;
  certVideoUrl?: string;
  careerImage?: CmsMedia | null;
  careerVideoUrl?: string;
  reviewsImage?: CmsMedia | null;
  reviewsVideoUrl?: string;
  updatedAt?: string;
};

/* ------------------------------------------------------------------ */
/* The course page's view of a CMS course                               */
/* ------------------------------------------------------------------ */

export type MediaView = { src: string; alt: string; width?: number; height?: number };

/** An image and/or a video shown with one section of the course page. */
export type SectionMediaView = { image?: MediaView; extraImage?: MediaView; videoUrl?: string };

export type CourseReviewView = {
  key: string;
  name: string;
  quote: string;
  rating: number;
  course?: string;
  reviewedOn?: string;
  link?: string;
};

/**
 * Everything a CMS course adds to the bundled course page. Each field is set
 * only when the editor filled it in, so a component can fall back to its
 * generated copy whenever one is missing.
 */
export type CourseCms = {
  eyebrow?: string;
  h1?: string;
  ctaPrimary?: CmsCta;
  ctaSecondary?: CmsCta;
  highlights: string[];
  tagline?: string;
  demand?: string;
  thumbnail?: MediaView;
  overview?: string[];
  /** The long description, as editor HTML; shown below `overview` when both are set. */
  descriptionHtml?: string;
  videoUrl?: string;
  videoTitle?: string;
  benefits: { title: string; body?: string }[];
  heroBenefits: { title: string; body?: string }[];
  audienceIntro?: string;
  audience: { title: string; text: string }[];
  toolItems: { name: string; category?: string; url?: string; text?: string }[];
  careerRoles: CmsCourse["careerRoles"];
  careers: string[];
  salary?: string;
  workflow: { title: string; body?: string }[];
  whyIntro?: string;
  whyPoints: { title: string; body?: string }[];
  comparison: { intro?: string; others?: string; note?: string; rows: CmsCourse["comparisonRows"] };
  plans: CmsCourse["plans"];
  syllabusNote?: string;
  media: Partial<Record<string, SectionMediaView>>;
  blocks: CmsCourseBlock[];
  sectionOrder: string[];
  hiddenSections: string[];
  seo?: CmsSeo;
};
