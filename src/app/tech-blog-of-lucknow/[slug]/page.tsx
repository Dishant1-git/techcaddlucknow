import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, PageShell } from "@/components/PageShell";
import { ArticleBody, ArticleCover, ArticleHeader, RelatedPosts } from "@/components/resources/BlogPage";
import { CallbackStrip } from "@/components/resources/Kit";
import { getPost, posts, relatedPosts } from "@/lib/resources/blog";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";

// Every article is built ahead of time, so an unknown slug waits for the full
// render and gets a real 404 instead of a streamed "not found".
export const ensureStatic = "navigation";
// The slug is read outside <Suspense> on purpose (that is what makes the 404
// possible), so the dev-only "instant navigation" check is switched off here.
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${site.name} ${site.city}`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [`/images/gallery/${post.cover}.webp`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
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
      <RelatedPosts posts={relatedPosts(post)} />
      <CallbackStrip />
    </PageShell>
  );
}
