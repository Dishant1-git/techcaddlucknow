// Course page sections that exist only when an editor fills them in the CMS:
// the workflow steps, the comparison table, the plans table and the course's
// own reviews. Each renders nothing when its data is empty.
import { ArrowUpRight, Check, Minus, Quote } from "lucide-react";
import type { Course } from "@/lib/courses";
import type { CourseReviewView } from "@/lib/cms/types";
import { site } from "@/lib/site";
import { BookDemoButton } from "../Enquiry";
import { GoogleG } from "../ui";
import { DarkSection, Eyebrow, Heading, LightSection } from "../ui";
import { StarRating } from "../StarRating";

const pad = (n: number) => String(n).padStart(2, "0");

/** "How the work runs": the editor's workflow steps. */
export function CourseWorkflow({ course }: { course: Course }) {
  const steps = course.cms?.workflow ?? [];
  if (!steps.length) return null;
  return (
    <LightSection id="how-the-work-runs">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>How it works</Eyebrow>
        <Heading className="mt-5">
          How the work <span className="text-gradient">runs</span>
        </Heading>
      </div>
      <ol data-stagger className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={`${i}-${s.title}`} className="relative rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5">
            <span className="grid size-10 place-items-center rounded-full bg-brand font-display text-sm font-bold text-white">{pad(i + 1)}</span>
            <h3 className="mt-5 font-display text-lg font-bold text-navy">{s.title}</h3>
            {s.body && <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>}
          </li>
        ))}
      </ol>
    </LightSection>
  );
}

/** techcadd against the alternatives, row by row. */
export function CourseComparison({ course }: { course: Course }) {
  const c = course.cms?.comparison;
  if (!c?.rows.length) return null;
  return (
    <section id="comparison" className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Compare</Eyebrow>
          <Heading className="mt-5">
            {site.name} vs <span className="text-gradient">{c.others || "the alternatives"}</span>
          </Heading>
          {c.intro && (
            <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
              {c.intro}
            </p>
          )}
        </div>
        <div className="mt-12 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl shadow-hero-950/5">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="px-6 py-4 font-display font-bold">What matters</th>
                <th scope="col" className="px-6 py-4 font-display font-bold">At {site.name}</th>
                <th scope="col" className="px-6 py-4 font-display font-bold text-slate-300">{c.others || "Elsewhere"}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r, i) => (
                <tr key={`${i}-${r.feature}`} className="border-t border-slate-100 even:bg-slate-50/60">
                  <th scope="row" className="px-6 py-4 align-top font-semibold text-navy">{r.feature}</th>
                  <td className="px-6 py-4 align-top text-slate-700">
                    <span className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />
                      {r.ours}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-top text-slate-500">
                    <span className="flex gap-2">
                      <Minus className="mt-0.5 size-4 shrink-0 text-slate-400" />
                      {r.theirs}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {c.note && <p className="mt-5 text-center text-sm text-slate-500">{c.note}</p>}
      </div>
    </section>
  );
}

/** The plans and durations a course comes in. Uses the CMS section id "modules". */
export function CoursePlans({ course }: { course: Course }) {
  const plans = course.cms?.plans ?? [];
  if (!plans.length) return null;
  return (
    <DarkSection id="modules">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow dark>Plans & duration</Eyebrow>
        <Heading dark className="mt-5">
          Pick the length that <span className="text-gradient">fits you</span>
        </Heading>
      </div>
      <div data-stagger className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, i) => {
          const length = p.duration || (p.months ? `${p.months} ${p.months === 1 ? "month" : "months"}` : p.rangeLabel);
          return (
            <article
              key={`${i}-${p.label}`}
              data-spot
              className={`relative flex flex-col rounded-3xl p-7 ${p.popular ? "border-2 border-cyan bg-white/[0.08]" : "border border-white/10 bg-white/[0.04]"}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                {p.badge && <span className="rounded-full bg-sun px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-hero-950">{p.badge}</span>}
                {p.popular && <span className="rounded-full bg-cyan/15 px-3 py-1 text-[11px] font-bold text-cyan">Most popular</span>}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{p.label}</h3>
              {length && <p className="mt-1 font-display text-3xl font-extrabold text-cyan">{length}</p>}
              {p.summary && <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">{p.summary}</p>}
              <BookDemoButton
                course={course.label}
                className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition hover:bg-cyan"
              >
                Ask about this plan
              </BookDemoButton>
            </article>
          );
        })}
      </div>
    </DarkSection>
  );
}

/**
 * The course's reviews: the ones picked for it in the CMS, else the site's
 * published reviews. Real reviews only — no illustrative samples.
 */
export function CourseReviewList({ course, reviews }: { course: Course; reviews: CourseReviewView[] }) {
  if (!reviews.length) return null;
  return (
    <section id="reviews" className="scroll-mt-24 bg-white px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Student reviews</Eyebrow>
          <Heading className="mt-5">
            What learners say about <span className="text-gradient">{course.label}</span>
          </Heading>
        </div>
        <ul data-stagger className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {reviews.map((r) => (
            <li key={r.key} className="mb-5 break-inside-avoid rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5">
              <div className="flex items-center justify-between gap-3">
                {r.course ? (
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">{r.course}</span>
                ) : (
                  <Quote className="size-7 text-sky/40" />
                )}
                <StarRating rating={r.rating} />
              </div>
              <blockquote className="mt-4 whitespace-pre-line leading-relaxed text-slate-700">{r.quote}</blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-sky font-display text-sm font-bold text-white">
                  {r.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display font-bold text-navy">{r.name}</span>
                  {r.reviewedOn && <span className="block text-sm text-slate-500">Reviewed {r.reviewedOn}</span>}
                </span>
                {r.link && (
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand hover:underline">
                    <GoogleG className="size-3.5" /> Google <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
