import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero, PageShell } from "@/components/PageShell";
import { NextSteps, type NextLink } from "@/components/resources/Kit";
import { CallbackStrip } from "@/components/resources/CallbackStrip";
import { LightSection, SectionHeading } from "@/components/ui";
import { CategoriesBar } from "@/components/resources/ResourceCategories";
import { getGallery } from "@/lib/cms/content";
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

export default async function GalleryPage() {
  // Photos from CMS albums (filterable by album title), then the bundled ones.
  const { photos: gallery, tags, albums } = await getGallery();
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
      <CategoriesBar current="gallery" />
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
        {albums.length > 0 && (
          // CMS albums, each addressable as #<slug> (the CMS links to them that way).
          <ul className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((a) => (
              <li key={a.slug} id={a.slug} className="scroll-mt-28 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5">
                <p className="font-display text-lg font-bold text-navy">{a.title}</p>
                {a.description && <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.description}</p>}
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  {a.count} {a.count === 1 ? "photo" : "photos"}
                </p>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-12">
          <Gallery photos={gallery} tags={tags} />
        </div>
      </LightSection>
      <NextSteps items={next} />
      <CallbackStrip />
    </PageShell>
  );
}
