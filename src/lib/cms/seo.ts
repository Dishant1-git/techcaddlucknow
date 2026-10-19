// Page metadata from a CMS record's SEO fields, with fallbacks for anything
// the editor left empty. Shared by courses, blog posts, pages and events.
import type { Metadata } from "next";
import { cmsAsset } from "./client";
import type { CmsSeo } from "./types";

/** The public site's own address, for canonical links and the sitemap. */
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const absoluteUrl = (path: string) => (/^https?:/.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);

export function seoMetadata({
  seo,
  title,
  description,
  path,
  image,
  type = "website",
}: {
  seo?: CmsSeo;
  /** Used when the editor set no meta title. */
  title: string;
  description?: string;
  /** The page's path on this site, for the canonical link. */
  path: string;
  /** A fallback share image (absolute or site-relative). */
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const metaTitle = seo?.metaTitle || title;
  const metaDescription = seo?.metaDescription || description;
  const ogImage = cmsAsset(seo?.ogImage?.url) ?? image;
  const images = ogImage ? [absoluteUrl(ogImage)] : undefined;
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.keywords?.length ? seo.keywords : undefined,
    alternates: { canonical: seo?.canonicalUrl || absoluteUrl(path) },
    openGraph: {
      type,
      title: seo?.ogTitle || metaTitle,
      description: seo?.ogDescription || metaDescription,
      url: absoluteUrl(path),
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: seo?.twitterTitle || seo?.ogTitle || metaTitle,
      description: seo?.twitterDescription || seo?.ogDescription || metaDescription,
      images,
    },
    ...(seo?.robotsIndex === false && { robots: { index: false, follow: true } }),
  };
}

/** FAQPage structured data for a list of questions. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Serialises JSON-LD for a <script> tag; "<" is escaped so content cannot close it. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
