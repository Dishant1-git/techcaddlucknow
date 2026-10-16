import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { FeaturedPost, PostGrid } from "@/components/resources/BlogPage";
import { HeroIntro } from "@/components/resources/Kit";
import { CallbackStrip, HeroBadges } from "@/components/resources/Kit";
import { posts } from "@/lib/resources/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Tech Blog — Course Guides, Hiring Trends & Career Advice | ${site.name} ${site.city}`,
  description: `Course guides, skills roadmaps and career advice from the ${site.name} ${site.city} trainers and placement team — MERN, SQL, data science, AutoCAD, UI/UX and digital marketing.`,
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  const topics = [...new Set(posts.map((p) => p.category))];
  return (
    <PageShell>
      <PageHero eyebrow="Tech blog" title="Tech blog" crumbs={[{ label: "Blog" }]}>
        <HeroIntro
          eyebrow={`Tech blog · ${site.city}`}
          title={
            <>
              Notes from the classroom <span className="text-shine">and the codebase.</span>
            </>
          }
          text="Course guides, hiring trends and career advice, written by the trainers and placement team who see what employers actually ask for."
        >
          <HeroBadges items={topics} />
        </HeroIntro>
      </PageHero>
      {featured && <FeaturedPost post={featured} />}
      <PostGrid posts={rest} />
      <CallbackStrip />
    </PageShell>
  );
}
