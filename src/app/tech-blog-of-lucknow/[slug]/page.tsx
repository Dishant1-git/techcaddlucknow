import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, PageShell } from "@/components/PageShell";
import { ArticleBody, ArticleCover, ArticleHeader, RelatedPosts } from "@/components/resources/BlogPage";
import { CallbackStrip } from "@/components/resources/CallbackStrip";
import { getPost, getPosts, getRelatedPosts } from "@/lib/cms/content";
import { resourceRoutes } from "@/lib/resources/routes";
import { seoMetadata } from "@/lib/cms/seo";
import { site } from "@/lib/site";

// Every article is built ahead of time, so an unknown slug waits for the full
// render and gets a real 404 instead of a streamed "not found".
export const ensureStatic = "navigation";
// The slug is read outside <Suspense> on purpose (that is what makes the 404
// possible), so the dev-only "instant navigation" check is switched off here.
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

// Bundled articles and the ones published in the CMS.
export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const meta = seoMetadata({
    seo: post.seo,
    title: `${post.title} | ${site.name} ${site.city}`,
    description: post.excerpt,
    path: post.href,
    image: post.coverUrl ?? `/images/gallery/${post.cover}.webp`,
    type: "article",
  });
  return { ...meta, keywords: meta.keywords ?? (post.tags.length ? post.tags : undefined) };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <PageShell>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: "Blog", href: resourceRoutes.blog }, { label: post.title }]}
      >
        <ArticleHeader post={post} />
      </PageHero>
      <ArticleCover post={post} />
      <ArticleBody post={post} />
      <RelatedPosts posts={await getRelatedPosts(post)} />
      <CallbackStrip />
    </PageShell>
  );
}
