// The 45-day training page for each domain (src/lib/training45.ts), at
// /internship-training-in-lucknow/45-days/<domain>.
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronRight,
  CircleHelp,
  Clock,
  FileText,
  GraduationCap,
  Info,
  Plus,
  Wallet,
} from "lucide-react";
import type { DomainPage } from "@/lib/internshipDomains";
import { shared, type Training45 } from "@/lib/training45";
import { internshipHref, site } from "@/lib/site";
import { domainHref } from "@/lib/internshipDomains";
import { BookDemoButton } from "./Enquiry";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "./ui";
import { Hl } from "./Hl";

type Props = { domain: DomainPage; plan: Training45 };

const pad = (n: number) => String(n).padStart(2, "0");

// Day ranges for each phase, e.g. "Days 1–7".
const ranges = (plan: Training45) => {
  let start = 1;
  return plan.phases.map((ph) => {
    const from = start;
    start += ph.days.length;
    return { ...ph, from, to: start - 1 };
  });
};

// Audiences that are not the usual college IT students keep their own list.
const ownAudience = new Set(["autocad-solidworks", "basic-computer-office", "digital-marketing"]);

export function T45Hero({ domain: d, plan }: Props) {
  return (
    <section id="top" className="relative isolate overflow-clip bg-hero-950 text-white">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div className="orb absolute -right-40 -top-40 -z-10 size-[40rem] animate-aurora [--orb:rgba(28,83,209,0.5)]" />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-44">
        <nav aria-label="Breadcrumb" className="rise text-sm text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li>
              <Link href={internshipHref()} className="hover:text-white">Internship & Training</Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li>
              <Link href={internshipHref(d.programme.slug)} className="hover:text-white">{d.programme.duration}</Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li aria-current="page" className="text-white">{d.label}</li>
          </ol>
        </nav>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0">
            <div className="rise [--d:.05s]">
              <Eyebrow dark>45-day summer & winter training</Eyebrow>
            </div>
            <h1 className="rise mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight [--d:.1s] sm:text-5xl lg:text-6xl">
              45 Days {plan.heading} in <span className="text-gradient">{site.city}</span>
            </h1>
            <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.2s] lg:text-lg">
              A short, project-led programme for college students: <Hl>{plan.tools}</Hl>, practised day by day and finished with a documented mini
              project.
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3 [--d:.3s]">
              <BookDemoButton
                course={d.course}
                className="group inline-flex items-center gap-3 rounded-full bg-cyan py-2 pl-7 pr-2 text-sm font-bold text-hero-950 transition hover:brightness-105"
              >
                Request the 45-day syllabus
                <span className="grid size-8 place-items-center rounded-full bg-hero-950 text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </BookDemoButton>
              <a
                href="#syllabus"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold transition hover:border-white/40"
              >
                See the day-by-day plan
              </a>
            </div>
            <p className="rise mt-6 flex max-w-xl items-start gap-2 text-sm text-slate-400 [--d:.4s]">
              <Info className="mt-0.5 size-4 shrink-0" />
              <Hl>{shared.trust}</Hl>
            </p>
          </div>

          {/* 45 days at a glance */}
          <ol className="rise space-y-2 [--d:.3s]">
            {ranges(plan).map((ph, i) => (
              <li
                key={ph.title}
                className={`flex items-center gap-4 rounded-2xl border px-4 py-3 ${
                  i === plan.phases.length - 1
                    ? "border-transparent bg-gradient-to-r from-sun via-cyan to-sky text-hero-950"
                    : "border-white/10 bg-white/[0.05] backdrop-blur"
                }`}
              >
                <span
                  className={`w-24 shrink-0 text-[11px] font-extrabold uppercase tracking-[0.14em] ${
                    i === plan.phases.length - 1 ? "text-hero-950/70" : "text-cyan"
                  }`}
                >
                  Days {ph.from}–{ph.to}
                </span>
                <span className="font-semibold leading-snug">{ph.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function T45Overview({ domain: d, plan }: Props) {
  const o = shared.overview(plan.name);
  const audience = ownAudience.has(d.slug) ? d.audience : shared.audience;
  return (
    <LightSection id="overview">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>Overview</Eyebrow>
          <Heading className="mt-5">{o.title}</Heading>
          {o.text.map((t) => (
            <p key={t} data-reveal className="mt-6 leading-relaxed text-slate-600 first-of-type:text-lg">
              <Hl>{t}</Hl>
            </p>
          ))}
          <p data-reveal className="mt-6 rounded-2xl bg-slate-50 p-5 leading-relaxed text-navy"><Hl>{plan.contrast}</Hl></p>
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-navy">Who can apply?</h3>
          <div data-stagger className="mt-5 space-y-3">
            {audience.map((a) => (
              <article key={a.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <GraduationCap className="size-5" />
                </span>
                <span>
                  <span className="block font-display font-bold text-navy">{a.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-slate-600"><Hl>{a.text}</Hl></span>
                </span>
              </article>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" />
            <span>
              <span className="font-bold text-navy">Before day 1: </span>
              <Hl>{plan.prerequisite}</Hl>
            </span>
          </p>
        </div>
      </div>
    </LightSection>
  );
}

export function T45Why({ plan }: Props) {
  const w = shared.why(plan.name);
  return (
    <DarkSection id="why">
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow dark>Why 45 days</Eyebrow>
          <Heading dark className="mt-5">{w.title}</Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-400"><Hl>{w.text}</Hl></p>
        </div>
        <ul data-stagger className="grid gap-3 sm:grid-cols-2">
          {w.items.map((it) => (
            <li key={it.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <Check className="mt-0.5 size-5 shrink-0 text-cyan" strokeWidth={3} />
              <span>
                <span className="block font-display font-bold">{it.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-400"><Hl>{it.text}</Hl></span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <SectionHeading dark eyebrow="Training, not an internship" title="Know what you are joining" />
        <div data-stagger className="mt-12 grid gap-4 lg:grid-cols-3">
          {shared.kinds.map((k, i) => (
            <article
              key={k.title}
              className={`rounded-3xl p-6 ${i === 0 ? "bg-gradient-to-br from-cyan to-sky text-hero-950" : "border border-white/10 bg-white/[0.04]"}`}
            >
              <h3 className="font-display text-lg font-bold">{k.title}</h3>
              <p className={`mt-2 text-[15px] leading-relaxed ${i === 0 ? "text-hero-950/80" : "text-slate-400"}`}><Hl>{k.text}</Hl></p>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}

export function T45Syllabus({ plan }: Props) {
  return (
    <section id="syllabus" className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="45-day syllabus"
          title="What you will learn, day by day"
          text="The exact pace depends on your entry-level assessment and the batch. Ask for the current session plan before paying any fee."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ranges(plan).map((ph, i) => (
            <article key={ph.title} data-reveal className="flex flex-col rounded-3xl bg-white p-6 shadow-xl shadow-hero-950/5 sm:p-7">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand">
                Phase {i + 1} · Days {ph.from}–{ph.to}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-navy">{ph.title}</h3>
              <p className="mt-1 text-sm text-slate-500"><Hl>{ph.text}</Hl></p>
              <ol className="mt-5 space-y-1.5 border-t border-slate-100 pt-4">
                {ph.days.map((day, j) => (
                  <li key={day} className="flex gap-3 text-[15px] leading-snug text-slate-700">
                    <span className="w-7 shrink-0 font-display text-sm font-extrabold text-sky">{pad(ph.from + j)}</span>
                    {day}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-extrabold tracking-tight text-navy">How every session runs</h3>
          <ol data-stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {shared.session.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-slate-200/70 bg-white p-5">
                <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan to-sky font-display font-extrabold text-hero-950">
                  {i + 1}
                </span>
                <h4 className="mt-4 font-display font-bold text-navy">{s.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600"><Hl>{s.text}</Hl></p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function T45Projects({ plan }: Props) {
  return (
    <DarkSection id="projects">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow dark>Projects & portfolio</Eyebrow>
          <Heading dark className="mt-5">
            Mini project <span className="text-gradient">ideas</span>
          </Heading>
          <p data-reveal className="mt-6 leading-relaxed text-slate-400"><Hl>{shared.projectNote}</Hl></p>
        </div>
        <div data-stagger className="grid gap-3 sm:grid-cols-2">
          {plan.projects.map((p) => (
            <article key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <h3 className="font-display font-bold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400"><Hl>{p.text}</Hl></p>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}

export function T45Process() {
  return (
    <LightSection id="process">
      <SectionHeading eyebrow="Admission & training process" title="From enquiry to final feedback" />
      <ol data-stagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {shared.process.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <span className="font-display text-3xl font-extrabold text-slate-200">{pad(i + 1)}</span>
            <h3 className="mt-2 font-display font-bold text-navy">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600"><Hl>{s.text}</Hl></p>
          </li>
        ))}
      </ol>
    </LightSection>
  );
}

export function T45Practical({ domain: d }: Props) {
  return (
    <section id="documents" className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        <article data-reveal className="rounded-[2rem] bg-white p-8 shadow-xl shadow-hero-950/5">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand text-white">
            <FileText className="size-6" />
          </span>
          <h2 className="mt-6 font-display text-xl font-extrabold tracking-tight text-navy">College and university requirements</h2>
          <ul className="mt-5 space-y-2">
            {shared.documents.map((doc) => (
              <li key={doc} className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-navy">
                <Check className="size-4 shrink-0 text-brand" strokeWidth={3} />
                {doc}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-slate-600"><Hl>{shared.documentsNote}</Hl></p>
        </article>

        <article data-reveal className="rounded-[2rem] bg-white p-8 shadow-xl shadow-hero-950/5">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand text-white">
            <Clock className="size-6" />
          </span>
          <h2 className="mt-6 font-display text-xl font-extrabold tracking-tight text-navy">Duration, batches and study plan</h2>
          <ul className="mt-5 space-y-3">
            {shared.batches.map((b) => (
              <li key={b.title}>
                <span className="block font-semibold text-navy">{b.title}</span>
                <span className="block text-sm leading-relaxed text-slate-600"><Hl>{b.text}</Hl></span>
              </li>
            ))}
          </ul>
        </article>

        <article data-reveal className="rounded-[2rem] bg-hero-950 p-8 text-white">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-sky text-hero-950">
            <Wallet className="size-6" />
          </span>
          <h2 className="mt-6 font-display text-xl font-extrabold tracking-tight">Fees, eligibility and what is included</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">Ask for a written quote and confirm each of these:</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {shared.feesAsk.map((f) => (
              <li key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{f}</li>
            ))}
          </ul>
          <BookDemoButton
            course={d.course}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-bold text-hero-950 transition hover:brightness-105"
          >
            Ask for a written fee quote <ArrowRight className="size-4" />
          </BookDemoButton>
        </article>
      </div>
    </section>
  );
}

export function T45Outcomes({ domain: d }: Props) {
  return (
    <LightSection id="careers">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Career next steps</Eyebrow>
          <Heading className="mt-5">After 45 days of {d.label}</Heading>
          <p data-reveal className="mt-6 text-lg text-slate-600"><Hl>{shared.careers.text}</Hl></p>
          <div data-stagger className="mt-6 grid gap-3 sm:grid-cols-2">
            {shared.careers.steps.map((s) => (
              <article key={s.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <Briefcase className="size-5 text-brand" />
                <h3 className="mt-3 font-display font-bold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600"><Hl>{s.text}</Hl></p>
              </article>
            ))}
          </div>
          <Link
            href={domainHref("6-months", d.slug)}
            className="group mt-6 inline-flex items-center gap-2 font-bold text-brand hover:text-navy"
          >
            See the six-month {d.label} track
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div>
          <Eyebrow>Certificates & deliverables</Eyebrow>
          <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">What you leave with — and what to check</h2>
          <div data-stagger className="mt-6 space-y-3">
            {shared.certificates.map((c) => (
              <article key={c.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-display font-bold text-navy">{c.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-600"><Hl>{c.text}</Hl></p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </LightSection>
  );
}

export function T45Faq({ domain: d, plan }: Props) {
  const faqs = [...plan.faqs, ...shared.faqs(plan.name)];
  return (
    <DarkSection id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow dark>FAQs</Eyebrow>
          <Heading dark className="mt-5">
            45-day {plan.name} training in <span className="text-gradient">{site.city}</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg text-slate-400"><Hl>{shared.cta(plan.name)}</Hl></p>
          <BookDemoButton
            course={d.course}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-bold text-hero-950 transition hover:brightness-105"
          >
            <CircleHelp className="size-4" /> Speak with a counsellor
          </BookDemoButton>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] transition-colors open:border-cyan/40 open:bg-white/[0.07]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-cyan transition-transform group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-slate-300"><Hl>{f.a}</Hl></p>
            </details>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
