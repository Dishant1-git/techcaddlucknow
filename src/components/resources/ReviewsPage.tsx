// Sections of the Student Reviews page (/techcadd-lucknow-student-reviews).
import { ArrowUpRight, Star } from "lucide-react";
import { reviewCourses, reviews } from "@/lib/resources/reviews";
import { googleReviews, site } from "@/lib/site";
import { DarkSection, Eyebrow, GoogleG, Heading, LightSection, SectionHeading } from "../ui";
import { Note } from "./Kit";
import { ReviewsFilter } from "./ReviewsFilter";

export function ReviewsList() {
  return (
    <LightSection id="reviews" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Recent reviews"
        title={
          <>
            What {site.name} students <span className="text-gradient">say on Google</span>
          </>
        }
        text="Reviews from students across the techcadd network, in their own words — on the trainers, the practical labs, live projects and placement support. Filter by the course they took."
      />
      <Note>
        These reviews were left on Google for another techcadd centre, so some mention that city by name. They are
        shown unedited, and the rating and review count above are that listing&apos;s. Reviews from the {site.city}{" "}
        centre will be added as they come in.
      </Note>
      <ReviewsFilter reviews={reviews} courses={reviewCourses} />
    </LightSection>
  );
}

/** How the reviews on this page split by course. */
export function ReviewsByCourse() {
  const max = Math.max(...reviewCourses.map((c) => c.count));
  const average = reviews.reduce((n, r) => n + r.rating, 0) / reviews.length;
  return (
    <DarkSection>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow dark>At a glance</Eyebrow>
          <Heading dark className="mt-5">
            Reviews from <span className="text-gradient">every track</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
            Cloud and AI students, designers, marketers and developers — the reviews on this page cover{" "}
            {reviewCourses.length} courses.
          </p>
          <div
            data-reveal
            data-spot
            className="mt-8 flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.05] p-6"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white">
              <GoogleG className="size-8" />
            </span>
            <div>
              <p className="flex items-center gap-2 font-display text-3xl font-extrabold">
                {average.toFixed(1)}
                <span className="flex gap-0.5 text-sun">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
              </p>
              <p className="mt-1 text-sm text-slate-300">Average rating of the {reviews.length} reviews shown here</p>
            </div>
          </div>
          <a
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-bold text-cyan hover:text-white"
          >
            See all reviews on Google <ArrowUpRight className="size-4" />
          </a>
        </div>

        <ul data-stagger className="space-y-3">
          {reviewCourses.map((c) => (
            <li key={c.course} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="font-semibold text-white">{c.course}</span>
                <span className="font-display font-bold text-cyan">
                  {c.count} {c.count === 1 ? "review" : "reviews"}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan to-sky"
                  style={{ width: `${(c.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DarkSection>
  );
}
