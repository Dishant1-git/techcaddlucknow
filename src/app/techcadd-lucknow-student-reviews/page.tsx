import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { HeroIntro } from "@/components/resources/Kit";
import { CallbackStrip, HeroActions, NextSteps, StatBand } from "@/components/resources/Kit";
import { ReviewsByCourse, ReviewsList } from "@/components/resources/ReviewsPage";
import { resourceRoutes } from "@/lib/resources/routes";
import { reviewLinks, reviewStats } from "@/lib/resources/reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Student Reviews — Google Ratings & Testimonials | ${site.name} ${site.city}`,
  description: `Read Google reviews from ${site.name} students across the network — feedback on course trainers, practical lab training, live projects and placement support.`,
};

export default function StudentReviewsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Student reviews" title="Student reviews" crumbs={[{ label: "Student Reviews" }]}>
        <HeroIntro
          eyebrow="Student reviews"
          title={
            <>
              In their words, <span className="text-shine">not ours.</span>
            </>
          }
          text={`Unedited Google reviews from ${site.name} students on the trainers, the labs, the live projects and the placement support.`}
        >
          <HeroActions secondary={{ label: "See placement support", href: resourceRoutes.placements }} />
        </HeroIntro>
      </PageHero>
      <StatBand items={reviewStats} />
      <ReviewsList />
      <ReviewsByCourse />
      <NextSteps items={reviewLinks} />
      <CallbackStrip />
    </PageShell>
  );
}
