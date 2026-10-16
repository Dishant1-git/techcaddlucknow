import { NavLink } from "../../NavLink";
import { ArrowRight, CheckCircle2, CircleAlert, Sparkles } from "lucide-react";
import { advantage, bottlenecks, interviewTracks } from "@/lib/resources/tools/interviewPrep";
import { resourceRoutes } from "@/lib/resources/routes";
import { BookDemoButton } from "../../Enquiry";
import { Eyebrow, Heading, LightSection, SectionHeading } from "../../ui";

export function Bottlenecks() {
  return (
    <LightSection>
      <SectionHeading
        eyebrow={bottlenecks.eyebrow}
        title={
          <>
            The 3 biggest tech interview bottlenecks — <span className="text-gradient">and how to beat them</span>
          </>
        }
        text={bottlenecks.text}
      />
      <div data-stagger className="mt-14 grid gap-5 lg:grid-cols-3">
        {bottlenecks.cards.map((c) => (
          <article
            key={c.title}
            className="flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5"
          >
            <span className="self-start rounded-full bg-brand/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
              {c.tag}
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-navy">{c.title}</h3>
            <div className="mt-5 rounded-2xl bg-rose-50/70 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-rose-600">
                <CircleAlert className="size-3.5" /> The problem
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{c.problem}</p>
            </div>
            <div className="mt-3 flex-1 rounded-2xl bg-emerald-50/70 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                <Sparkles className="size-3.5" /> How this tool helps
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{c.solution}</p>
            </div>
            <a href="#interview-tool" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">
              Practise now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </article>
        ))}
      </div>
    </LightSection>
  );
}

export function InterviewTracks() {
  return (
    <section className="overflow-clip bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Interview tracks"
          title={
            <>
              Specialised <span className="text-gradient">practice tracks</span>
            </>
          }
          text="From freshers preparing for industrial internships to full-stack leads architecting scalable microservices."
        />
        <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interviewTracks.map((t) => (
            <article key={t.title} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5">
              <h3 className="font-display text-lg font-bold text-navy">{t.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{t.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InterviewAdvantage() {
  return (
    <LightSection>
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>{advantage.eyebrow}</Eyebrow>
          <Heading className="mt-5">
            1:1 mentorship, plus <span className="text-gradient">AI practice any time</span>
          </Heading>
          {advantage.paragraphs.map((p) => (
            <p key={p} data-reveal className="mt-5 text-lg leading-relaxed text-slate-600">
              {p}
            </p>
          ))}
          <ul data-stagger className="mt-8 space-y-3">
            {advantage.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                {b}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <a
              href="#interview-tool"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
            >
              Start practising <ArrowRight className="size-4" />
            </a>
            <NavLink
              href={resourceRoutes.placements}
              className="rounded-full border border-slate-200 bg-white px-7 py-3.5 font-semibold text-navy transition hover:border-brand hover:text-brand"
            >
              View placement support
            </NavLink>
          </div>
        </div>
        <div data-reveal="right" className="relative isolate overflow-hidden rounded-[2rem] bg-hero-950 p-8 text-white shadow-2xl shadow-hero-950/30 sm:p-10">
          <div className="bg-grid-dark absolute inset-0 -z-10" />
          <div className="glow-dark absolute inset-0 -z-10" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">Free to use</p>
          <p className="mt-4 font-display text-2xl font-extrabold tracking-tight">No card. No sign-up.</p>
          <p className="mt-3 leading-relaxed text-slate-300">
            Test your interview readiness today. When you&apos;re ready for a mock interview with a mentor, book a
            free counselling call.
          </p>
          <BookDemoButton className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-6 py-3 font-bold text-hero-950 transition hover:brightness-110">
            Book free counselling <ArrowRight className="size-4" />
          </BookDemoButton>
        </div>
      </div>
    </LightSection>
  );
}
