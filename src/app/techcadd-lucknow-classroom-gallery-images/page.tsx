import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero, PageShell } from "@/components/PageShell";
import { CallbackStrip, NextSteps, type NextLink } from "@/components/resources/Kit";
import { LightSection, SectionHeading } from "@/components/ui";
import { gallery } from "@/lib/gallery";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";

// Layout and copy follow techcaddmohali.com's classroom gallery page; the
// photographs are this site's own (public/images/gallery).
export const metadata: Metadata = {
  title: `Classroom Gallery | ${site.name} ${site.city} Labs, Workshops & Events`,
  description: `Photographs from ${site.name}'s classrooms, labs, workshops, robotics demos and ceremonies. Open any photo full size.`,
};

const next: NextLink[] = [
  {
    title: "Events & workshops",
    text: "Seminars and hands-on sessions at our centres and at partner colleges — most of them free, all taught by our own trainers.",
    cta: "See what is on",
    href: resourceRoutes.events,
  },
  {
    title: "Student reviews",
    text: `Google reviews from ${site.name} students on the trainers, the live projects and the placement support, across every track.`,
    cta: "Read the reviews",
    href: resourceRoutes.reviews,
  },
  {
    title: `About ${site.name}`,
    text: "Fifteen years of training, working-engineer trainers, live projects and a placement cell behind them.",
    cta: "Read the story",
    href: "/about",
  },
];

export default function GalleryPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Classroom gallery"
        crumbs={[{ label: "Gallery" }]}
        title={
          <>
            Inside the classrooms, <span className="text-shine">labs and live projects.</span>
          </>
        }
        text={`${gallery.length} photographs from ${site.name}'s classrooms, labs, workshops and ceremonies. Filter by album and tap any photo to see it full size.`}
      />
      <LightSection>
        <SectionHeading
          eyebrow={`Life at ${site.name}`}
          title={
            <>
              Our classroom <span className="text-gradient">gallery</span>
            </>
          }
          text="Classrooms, labs, workshops, robotics demos and ceremonies."
        />
        <div className="mt-12">
          <Gallery />
        </div>
      </LightSection>
      <NextSteps items={next} />
      <CallbackStrip />
    </PageShell>
  );
}
