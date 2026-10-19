// /sitemap.xml: the site's own pages plus everything published in the CMS.
// A CMS record whose SEO settings say "leave out of the sitemap" (inSitemap
// false) or "don't index" (robotsIndex false) is left out.
import type { MetadataRoute } from "next";
import { cmsGet } from "@/lib/cms/client";
import { getCmsPage, getCmsPages, getEvents, getPosts } from "@/lib/cms/content";
import { categoryHref, courseUrl, getCategories } from "@/lib/cms/courses";
import { absoluteUrl } from "@/lib/cms/seo";
import type { CmsBlog, CmsCourse, CmsGalleryAlbum, CmsList, CmsSeo } from "@/lib/cms/types";
import { directory } from "@/lib/resources/directory";
import { resourceRoutes } from "@/lib/resources/routes";

const listed = (seo?: CmsSeo) => seo?.inSitemap !== false && seo?.robotsIndex !== false;
const date = (value?: string) => (value ? new Date(value.replace(" ", "T") + (/[zZ+]/.test(value) ? "" : "Z")) : undefined);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, blogs, pageList, events, albums, categories, posts] = await Promise.all([
    cmsGet<CmsList<CmsCourse>>("/courses?limit=1000"),
    cmsGet<CmsList<CmsBlog & { updatedAt?: string }>>("/blogs?limit=1000"),
    getCmsPages(),
    getEvents(),
    cmsGet<CmsList<CmsGalleryAlbum>>("/gallery?limit=500"),
    getCategories(),
    getPosts(),
  ]);
  // The page list leaves out SEO fields, so each page is read for its own.
  const pages = await Promise.all(pageList.map(async (p) => ({ summary: p, page: await getCmsPage(p.slug) })));

  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const add = (path: string, lastModified?: Date, priority = 0.6) => {
    const url = absoluteUrl(path);
    if (!entries.has(url)) entries.set(url, { url, lastModified, priority });
  };

  add("/", undefined, 1);
  for (const c of courses?.items ?? []) if (listed(c.seo)) add(courseUrl(c), date(c.updatedAt), 0.9);
  for (const b of blogs?.items ?? []) if (listed(b.seo)) add(`${resourceRoutes.blog}/${b.slug}`, date(b.updatedAt ?? b.createdAt), 0.7);
  for (const { summary, page } of pages) if (page && listed(page.seo)) add(`/${summary.slug}`, date(summary.updatedAt), 0.6);
  for (const e of events) if (e.href) add(e.href, undefined, 0.6);
  for (const c of categories) add(categoryHref(c.slug), undefined, 0.7);
  // Albums share the gallery page; it changes whenever any album does.
  const albumDates = (albums?.items ?? []).map((a) => date(a.updatedAt)).filter((d): d is Date => !!d);
  add(resourceRoutes.gallery, albumDates.length ? new Date(Math.max(...albumDates.map(Number))) : undefined, 0.5);

  // The site's own pages (courses, programmes, resources, bundled articles).
  const cmsSlugs = new Set((blogs?.items ?? []).map((b) => b.slug));
  for (const p of posts) if (!cmsSlugs.has(p.slug)) add(p.href, undefined, 0.6);
  for (const e of directory) if (e.href.startsWith("/") && !e.href.includes("#")) add(e.href);

  return [...entries.values()];
}
