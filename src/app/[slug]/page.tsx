// Pages written in the CMS (Pages module), served at /<slug>. Every route the
// site defines itself takes precedence, so a CMS page can never shadow one.
// The rendering, per template, is components/cms/PageView.tsx.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/cms/PageView";
import { getCmsPage, getCmsPages } from "@/lib/cms/content";
import { stripTags } from "@/lib/cms/html";
import { seoMetadata } from "@/lib/cms/seo";
import { getSite } from "@/lib/cms/site";

// Built ahead of time, so an unknown address gets a real 404.
export const ensureStatic = "navigation";
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

// Cache Components needs at least one param to validate the route, so an
// empty CMS yields a placeholder that 404s.
export async function generateStaticParams() {
  const pages = await getCmsPages();
  return pages.length ? pages.map((p) => ({ slug: p.slug })) : [{ slug: "__placeholder__" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getCmsPage((await params).slug);
  if (!page) return {};
  const site = await getSite();
  return seoMetadata({
    seo: page.seo,
    title: `${page.title} | ${site.name} ${site.city}`,
    description: stripTags(page.content).slice(0, 160) || undefined,
    path: `/${page.slug}`,
  });
}

export default async function CmsPageRoute({ params }: Props) {
  const page = await getCmsPage((await params).slug);
  if (!page) notFound();
  return <PageView page={page} />;
}
