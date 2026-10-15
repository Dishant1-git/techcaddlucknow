// Sections for courses that have a content brief (src/lib/courseGuides.json).
// Each renders nothing for courses without one.
import { Check, CircleCheck, Info, Lightbulb, ListChecks, Quote, Star } from "lucide-react";
import { mixedReviews, relatedGuide, type Course, type CourseGuide, type GuideItem, type ReviewItem } from "@/lib/courses";
import { site, whyUs } from "@/lib/site";
import { BookDemoButton } from "./Enquiry";
import { DarkSection, Eyebrow, Heading, LightSection } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

function Points({ points, dark = false }: { points?: string[]; dark?: boolean }) {
  if (!points?.length) return null;
  return (
    <ul className="mt-4 space-y-2">
      {points.map((p) => (
        <li key={p} className={`flex gap-2.5 text-sm ${dark ? "text-slate-200" : "text-slate-700"}`}>
          <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-cyan" : "text-brand"}`} />
          {p}
        </li>
      ))}
    </ul>
  );
}

/** "Before you enrol" / "Basic requirements" panel under the audience cards. */
export function CourseAudienceNote({ course }: { course: Course }) {
  const note = course.guide?.audience.note;
  if (!note) return null;
  return (
    <section className="bg-white px-5 pb-20 lg:px-8 lg:pb-28">
      <div
        data-reveal
        className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[2rem] border border-brand/15 bg-brand/[0.04] p-7 sm:flex-row sm:p-9"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white">
          <ListChecks className="size-6" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-navy">{note.title}</h3>
          {note.text && <p className="mt-2 leading-relaxed text-slate-600">{note.text}</p>}
          <Points points={note.points} />
          {note.after && <p className="mt-3 leading-relaxed text-slate-600">{note.after}</p>}
        </div>
      </div>
    </section>
  );
}

export function CourseWhyProgramme({ course }: { course: Course }) {
  const why = course.guide?.why;
  if (!why) return null;
  return (
    <DarkSection id="why-this-programme">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow dark>Why this programme</Eyebrow>
        <Heading dark className="mt-5">
          Why choose the <span className="text-gradient">{course.label} course</span>
        </Heading>
        {why.intro && (
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
            {why.intro}
          </p>
        )}
      </div>

      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {why.items.map((w, i) => (
          <article
            key={w.title}
            data-spot
            className="border-glow relative rounded-3xl bg-white/[0.04] p-7"
          >
            <span className="font-display text-sm font-bold text-cyan">{pad(i + 1)}</span>
            <h3 className="mt-4 font-display text-lg font-bold leading-snug">{w.title}</h3>
            {w.text && <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{w.text}</p>}
            <Points points={w.points} dark />
            {w.after && <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{w.after}</p>}
          </article>
        ))}
      </div>

      {why.close && (
        <div
          data-reveal
          className="mx-auto mt-10 flex max-w-4xl flex-col items-start gap-5 rounded-3xl bg-gradient-to-br from-brand to-hero-800 p-7 sm:flex-row sm:items-center sm:p-9"
        >
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold">{why.close.title}</h3>
            {why.close.text && <p className="mt-2 leading-relaxed text-slate-100">{why.close.text}</p>}
          </div>
          <BookDemoButton
            course={course.label}
            className="shrink-0 rounded-full bg-sun px-7 py-3.5 text-sm font-bold text-hero-950 transition hover:brightness-105"
          >
            Book a free demo
          </BookDemoButton>
        </div>
      )}
    </DarkSection>
  );
}

/**
 * The brief's "what you will learn" topics and outcomes, plus its tool table
 * when it has one. (The syllabus section above shows the module plan.)
 */
export function CourseTakeaways({ course }: { course: Course }) {
  const learn = course.guide?.learn;
  if (!learn) return null;
  const cards = [...learn.modules, ...learn.outcomes];
  if (!cards.length && !learn.tools.length) return null;
  return (
    <LightSection id="takeaways">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Skills & outcomes</Eyebrow>
        <Heading className="mt-5">
          Skills, tools and <span className="text-gradient">what you will be able to do</span>
        </Heading>
        {learn.intro && (
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            {learn.intro}
          </p>
        )}
      </div>

      {cards.length > 0 && (
        <div data-stagger className="mt-14 grid gap-5 lg:grid-cols-2">
          {cards.map((o) => (
            <article
              key={o.title}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 sm:p-8"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <CircleCheck className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{o.title}</h3>
              {o.text && <p className="mt-2 leading-relaxed text-slate-600">{o.text}</p>}
              <Points points={o.points} />
              {o.after && <p className="mt-3 leading-relaxed text-slate-600">{o.after}</p>}
            </article>
          ))}
        </div>
      )}

      {learn.tools.length > 0 && (
        <div
          data-reveal
          className="mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-hero-950/5"
        >
          <p className="border-b border-slate-100 px-7 py-5 font-display text-lg font-bold text-navy">
            Tools and what you practise in them
          </p>
          <dl className="divide-y divide-slate-100">
            {learn.tools.map((t) => (
              <div key={t.title} className="grid gap-1 px-7 py-4 sm:grid-cols-[16rem_1fr] sm:gap-6">
                <dt className="font-semibold text-navy">{t.title}</dt>
                <dd className="text-slate-600">{t.text}</dd>
              </div>
            ))}
          </dl>
          {learn.toolNote && (
            <p className="border-t border-slate-100 px-7 py-4 text-sm text-slate-500">{learn.toolNote}</p>
          )}
        </div>
      )}
    </LightSection>
  );
}

function UsCard({ item, index }: { item: GuideItem; index: number }) {
  const checklist = !!item.points?.length;
  return (
    <article
      className={`rounded-3xl p-7 ${
        checklist
          ? "border border-brand/15 bg-brand/[0.04] sm:col-span-2"
          : "border border-slate-100 bg-white shadow-xl shadow-hero-950/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy font-display text-sm font-bold text-white">
          {checklist ? <ListChecks className="size-5" /> : pad(index + 1)}
        </span>
        <h3 className="font-display text-lg font-bold leading-snug text-navy">{item.title}</h3>
      </div>
      {item.text && <p className="mt-4 leading-relaxed text-slate-600">{item.text}</p>}
      {checklist && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {item.points!.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm text-slate-700">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              {p}
            </li>
          ))}
        </ul>
      )}
      {item.after && <p className="mt-4 leading-relaxed text-slate-600">{item.after}</p>}
    </article>
  );
}

type WhyUsContent = { intro: string; items: GuideItem[]; close: GuideItem | null };

// Pages without a brief of their own still say why techcadd. These avoid the
// placement claims the briefs ask pages not to make.
const fallbackWhyUs = (label: string): WhyUsContent => ({
  intro: `What learning ${label} at ${site.name} ${site.city} looks like in practice.`,
  items: [
    ...whyUs.filter((w) => !/placement/i.test(w.title)).map((w) => ({ title: w.title, text: w.text })),
    {
      title: "Clear answers before you enrol",
      text: "Ask for the syllabus, batch timings and fees in writing, and sit in a demo class at the centre before you decide.",
    },
  ],
  close: null,
});

/** "Why techcadd" for any page: a course brief's points, or the site-wide ones. */
export function WhyTechcadd({ label, us }: { label: string; us?: WhyUsContent | null }) {
  const content = us ?? fallbackWhyUs(label);
  return (
    <section id="why-techcadd" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Why {site.name}</Eyebrow>
            <Heading className="mt-5">
              Learning {label} <span className="text-gradient">with {site.name}</span>
            </Heading>
            {content.intro && (
              <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
                {content.intro}
              </p>
            )}
            {content.close && (
              <div data-reveal className="mt-8 rounded-3xl bg-hero-950 p-7 text-white">
                <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-sun">
                  <Lightbulb className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{content.close.title}</h3>
                {content.close.text && (
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{content.close.text}</p>
                )}
              </div>
            )}
          </div>

          <div data-stagger className="grid gap-5 sm:grid-cols-2">
            {content.items.map((item, i) => (
              <UsCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CourseWhyUs({ course }: { course: Course }) {
  return <WhyTechcadd label={course.label} us={course.guide?.whyUs ?? relatedGuide(course.label)?.guide.whyUs} />;
}

/**
 * Student reviews from a course brief. The briefs write them as illustrative
 * samples, so they are labelled that way here and carry no review markup.
 * `course` names the course they come from; mixed sets tag each card instead.
 */
export function Reviews({ items, course }: { items?: ReviewItem[] | null; course?: string }) {
  if (!items?.length) return null;
  return (
    <section id="reviews" className="scroll-mt-24 bg-white px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Student reviews</Eyebrow>
          <Heading className="mt-5">
            {course ? (
              <>
                What learners say about the <span className="text-gradient">{course} course</span>
              </>
            ) : (
              <>
                What learners say about <span className="text-gradient">{site.name} courses</span>
              </>
            )}
          </Heading>
          <p data-reveal className="mx-auto mt-6 inline-flex items-start gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-left text-sm text-slate-600">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" />
            Illustrative sample testimonials showing the kind of feedback learners share — not verified reviews.
          </p>
        </div>

        <ul data-stagger className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((r) => (
            <li
              key={r.name + r.quote.slice(0, 20)}
              className="mb-5 break-inside-avoid rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5"
            >
              <div className="flex items-center justify-between gap-3">
                {r.course ? (
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">{r.course}</span>
                ) : (
                  <Quote className="size-7 text-sky/40" />
                )}
                {r.rating && (
                  <span aria-label={`${r.rating} out of 5`} className="flex gap-0.5 text-sun">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`size-4 ${i < r.rating! ? "fill-current" : "text-slate-200"}`} />
                    ))}
                  </span>
                )}
              </div>
              <blockquote className="mt-4 leading-relaxed text-slate-700">{r.quote}</blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-sky font-display text-sm font-bold text-white">
                  {r.name
                    .split(/\s+/)
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span>
                  <span className="block font-display font-bold text-navy">{r.name}</span>
                  {r.role && <span className="block text-sm text-slate-500">{r.role}</span>}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A page's reviews: its own brief's, else the closest course's, else a mix. */
export function ReviewsFor({ name, own }: { name: string; own?: CourseGuide["reviews"] }) {
  if (own?.items.length) return <Reviews items={own.items} course={name} />;
  const rel = relatedGuide(name);
  if (rel?.guide.reviews?.items.length) return <Reviews items={rel.guide.reviews.items} course={rel.label} />;
  return <Reviews items={mixedReviews()} />;
}

export function CourseReviews({ course }: { course: Course }) {
  return <ReviewsFor name={course.label} own={course.guide?.reviews} />;
}
