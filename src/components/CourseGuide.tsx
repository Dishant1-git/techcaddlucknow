// Sections for courses that have a content brief (src/lib/courseGuides.json).
// Each renders nothing for courses without one.
import { Check, CircleCheck, Lightbulb, ListChecks } from "lucide-react";
import type { Course, GuideItem } from "@/lib/courses";
import { site } from "@/lib/site";
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

/** What learners can do by the end, plus the brief's tool table when it has one. */
export function CourseTakeaways({ course }: { course: Course }) {
  const learn = course.guide?.learn;
  if (!learn || (!learn.outcomes.length && !learn.tools.length)) return null;
  return (
    <LightSection id="takeaways">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Outcomes</Eyebrow>
        <Heading className="mt-5">
          What you will be able <span className="text-gradient">to do</span>
        </Heading>
      </div>

      {learn.outcomes.length > 0 && (
        <div data-stagger className="mt-14 grid gap-5 lg:grid-cols-2">
          {learn.outcomes.map((o) => (
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

export function CourseWhyUs({ course }: { course: Course }) {
  const us = course.guide?.whyUs;
  if (!us) return null;
  return (
    <section id="why-techcadd" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Why {site.name}</Eyebrow>
            <Heading className="mt-5">
              Learning {course.label} <span className="text-gradient">with {site.name}</span>
            </Heading>
            {us.intro && (
              <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
                {us.intro}
              </p>
            )}
            {us.close && (
              <div data-reveal className="mt-8 rounded-3xl bg-hero-950 p-7 text-white">
                <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-sun">
                  <Lightbulb className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{us.close.title}</h3>
                {us.close.text && (
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{us.close.text}</p>
                )}
              </div>
            )}
          </div>

          <div data-stagger className="grid gap-5 sm:grid-cols-2">
            {us.items.map((item, i) => (
              <UsCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
