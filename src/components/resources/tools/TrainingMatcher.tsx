import { NavLink } from "../../NavLink";
import { CheckCircle2, ClipboardCheck, FileDown, FileText, NotebookPen, Phone, Rocket } from "lucide-react";
import { compliance, counsellorCard, projectTracks } from "@/lib/resources/tools/trainingMatcher";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";
import { BookDemoButton } from "../../Enquiry";
import { LightSection, SectionHeading } from "../../ui";

const complianceIcons = [ClipboardCheck, NotebookPen, FileText, Rocket];

export function ProjectTracks() {
  return (
    <LightSection id="project-tracks" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Live project tracks"
        title={
          <>
            Six tracks, <span className="text-gradient">one real project each</span>
          </>
        }
        text="The same tracks are open to every branch and semester. Pick the one closest to the job you want; a counsellor can confirm the fit."
      />
      <div data-stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projectTracks.map((t) => (
          <article
            key={t.title}
            className="flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1 hover:border-brand/30"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-sun/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-navy">
                {t.tag}
              </span>
              <span className="text-[13px] font-semibold text-slate-500">{t.weeks}</span>
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-navy">{t.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{t.blurb}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Tech stack &amp; tools</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {t.stack.map((s) => (
                <li key={s} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Includes</p>
            <ul className="mt-2 flex-1 space-y-1.5">
              {t.includes.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {s}
                </li>
              ))}
            </ul>
            <BookDemoButton
              course={t.course}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-brand"
            >
              <FileDown className="size-4" /> Request syllabus &amp; timings
            </BookDemoButton>
          </article>
        ))}
      </div>
    </LightSection>
  );
}

export function Compliance() {
  return (
    <section className="overflow-clip bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Documents you leave with"
          title={
            <>
              University compliance &amp; <span className="text-gradient">project deliverables</span>
            </>
          }
          text={compliance.text}
        />
        <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {compliance.items.map((c, i) => {
            const Icon = complianceIcons[i % complianceIcons.length];
            return (
              <article key={c.title} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{c.body}</p>
              </article>
            );
          })}
        </div>

        <div
          data-reveal
          className="mx-auto mt-14 flex max-w-5xl flex-col items-start gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-hero-950/5 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy">{counsellorCard.heading}</h3>
            <p className="mt-2 max-w-xl text-slate-600">{counsellorCard.text}</p>
            <p className="mt-3 text-sm text-slate-500">
              Choosing a field for the first time?{" "}
              <NavLink href={resourceRoutes.careerTrack} className="font-semibold text-brand hover:underline">
                Take the Career Track quiz
              </NavLink>{" "}
              before matching a session.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <NavLink
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-navy transition hover:border-brand hover:text-brand"
            >
              <Phone className="size-4" /> Call {site.phone}
            </NavLink>
            <BookDemoButton className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-bold text-white transition hover:bg-brand">
              Request free callback
            </BookDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
