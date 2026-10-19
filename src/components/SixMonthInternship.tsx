import { getSite } from "@/lib/cms/site";
// The 6 Months Internship & Industrial Training page, laid out from its content
// brief (src/lib/internship6m.ts).
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronRight,
  Clock,
  FileCheck2,
  FileText,
  GraduationCap,
  Info,
  MapPin,
  Plus,
} from "lucide-react";
import { sixMonths as c } from "@/lib/internship6m";
import { internshipHref, site } from "@/lib/site";
import { BookDemoButton } from "./Enquiry";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "./ui";
import { Hl } from "./Hl";

const pad = (n: number) => String(n).padStart(2, "0");

export function SixMonthHero() {
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
            <li aria-current="page" className="text-white">6 Months</li>
          </ol>
        </nav>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0">
            <div className="rise [--d:.05s]">
              <Eyebrow dark>For college & university students</Eyebrow>
            </div>
            <h1 className="rise mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight [--d:.1s] sm:text-5xl lg:text-6xl">
              6 Months Internship & Industrial Training in{" "}
              <span className="text-gradient">{site.city}</span>
            </h1>
            <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.2s] lg:text-lg">
              <Hl>{c.hero.text}</Hl>
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3 [--d:.3s]">
              <a
                href="#domains"
                className="group inline-flex items-center gap-3 rounded-full bg-cyan py-2 pl-7 pr-2 text-sm font-bold text-hero-950 transition hover:brightness-105"
              >
                Explore internship domains
                <span className="grid size-8 place-items-center rounded-full bg-hero-950 text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </a>
              <BookDemoButton className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold transition hover:border-white/40">
                Request the 6-month syllabus
              </BookDemoButton>
            </div>
            <p className="rise mt-6 flex max-w-xl items-start gap-2 text-sm text-slate-400 [--d:.4s]">
              <Info className="mt-0.5 size-4 shrink-0" />
              <Hl>{c.hero.trust}</Hl>
            </p>
          </div>

          {/* Six months at a glance */}
          <ol className="rise grid grid-cols-3 gap-2 [--d:.3s]">
            {c.roadmap.months.map((m, i) => (
              <li
                key={m.month}
                className={`flex flex-col rounded-2xl border p-4 ${
                  i === 5
                    ? "border-transparent bg-gradient-to-br from-sun via-cyan to-sky text-hero-950"
                    : "border-white/10 bg-white/[0.05] backdrop-blur"
                }`}
              >
                <span className={`font-display text-3xl font-extrabold ${i === 5 ? "" : "text-cyan"}`}>{i + 1}</span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${i === 5 ? "text-hero-950/70" : "text-slate-400"}`}>
                  Month
                </span>
                <span className="mt-2 text-sm font-semibold leading-snug">{m.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function SixMonthOverview() {
  return (
    <LightSection id="overview">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow>Overview</Eyebrow>
          <Heading className="mt-5">{c.overview.title}</Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600"><Hl>{c.hero.intro}</Hl></p>
          <p data-reveal className="mt-4 leading-relaxed text-slate-600"><Hl>{c.overview.intro}</Hl></p>
        </div>
        <div data-stagger className="grid gap-4 sm:grid-cols-2">
          {c.overview.items.map((it, i) => (
            <article key={it.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5">
              <span className="font-display text-sm font-extrabold text-brand">{pad(i + 1)}</span>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600"><Hl>{it.text}</Hl></p>
            </article>
          ))}
        </div>
      </div>
    </LightSection>
  );
}

export function SixMonthWhoAndWhy() {
  return (
    <DarkSection id="who-can-apply">
      <SectionHeading dark eyebrow="Who can apply" title={c.whoCanApply.title} text={c.whoCanApply.intro} />
      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {c.whoCanApply.items.map((it) => (
          <article key={it.title} data-spot className="border-glow relative rounded-3xl bg-white/[0.04] p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-cyan to-sky text-hero-950">
              <GraduationCap className="size-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold">{it.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-400"><Hl>{it.text}</Hl></p>
          </article>
        ))}
      </div>

      <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Heading dark>
          {c.why.title.replace("six months of practical training", "")}
          <span className="text-gradient">six months of practical training</span>
        </Heading>
        <ul data-stagger className="grid gap-3 sm:grid-cols-2">
          {c.why.items.map((it) => (
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
    </DarkSection>
  );
}

export function SixMonthRoadmap() {
  return (
    <section id="roadmap" className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="What you will learn" title={c.roadmap.title} />
        <ol className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.roadmap.months.map((m, i) => (
            <li key={m.month} data-reveal className="relative rounded-3xl bg-white p-7 shadow-xl shadow-hero-950/5">
              <span className="absolute -top-4 left-7 rounded-full bg-gradient-to-r from-sky to-brand px-4 py-1.5 font-display text-sm font-extrabold text-white shadow-lg shadow-sky/30">
                {m.month}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-navy">{m.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600"><Hl>{m.text}</Hl></p>
              <span aria-hidden className="absolute right-6 top-4 font-display text-5xl font-extrabold leading-none text-slate-100">
                {i + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function SixMonthDifference() {
  return (
    <LightSection id="difference">
      <SectionHeading eyebrow="Know the difference" title={c.difference.title} />
      <div data-stagger className="mt-14 grid gap-5 lg:grid-cols-3">
        {c.difference.columns.map((col, i) => (
          <article
            key={col.title}
            className={`rounded-3xl p-7 ${
              i === 1
                ? "bg-gradient-to-br from-hero-900 to-hero-950 text-white shadow-2xl shadow-sky/20 ring-2 ring-sky"
                : "border border-slate-100 bg-white shadow-xl shadow-hero-950/5"
            }`}
          >
            <h3 className={`font-display text-2xl font-extrabold ${i === 1 ? "text-cyan" : "text-navy"}`}>{col.title}</h3>
            <p className={`mt-3 leading-relaxed ${i === 1 ? "text-slate-300" : "text-slate-600"}`}><Hl>{col.text}</Hl></p>
          </article>
        ))}
      </div>
      <p data-reveal className="mx-auto mt-8 flex max-w-4xl gap-3 rounded-2xl bg-slate-50 p-5 text-[15px] leading-relaxed text-navy">
        <Info className="mt-0.5 size-5 shrink-0 text-brand" />
        <Hl>{c.difference.note}</Hl>
      </p>
    </LightSection>
  );
}

export function SixMonthProjects() {
  return (
    <DarkSection id="projects">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow dark>Real-world projects</Eyebrow>
          <Heading dark className="mt-5">{c.projects.title}</Heading>
          <p data-reveal className="mt-6 text-lg text-slate-400">The strongest evidence of learning is small and specific:</p>
          <ul data-stagger className="mt-5 flex flex-wrap gap-2">
            {c.projects.evidence.map((e) => (
              <li key={e} className="rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan">
                {e}
              </li>
            ))}
          </ul>
        </div>
        <div data-stagger className="grid gap-4 sm:grid-cols-2">
          {c.projects.items.map((it) => (
            <article key={it.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <h3 className="font-display text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-400"><Hl>{it.text}</Hl></p>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}

export function SixMonthProcess({ title = c.process.title }: { title?: string }) {
  return (
    <LightSection id="process">
      <SectionHeading eyebrow="Internship process" title={title} />
      <ol className="relative mt-16 grid gap-8 lg:grid-cols-4">
        <span aria-hidden className="absolute inset-x-[12%] top-7 hidden h-1 rounded-full bg-gradient-to-r from-cyan via-sky to-brand lg:block" />
        {c.process.steps.map((s, i) => (
          <li key={s.title} data-reveal className="relative text-center">
            <span className="relative mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-sky font-display text-xl font-extrabold text-hero-950 shadow-lg shadow-sky/30 ring-8 ring-white">
              {i + 1}
            </span>
            <h3 className="mt-6 font-display text-xl font-bold text-navy">{s.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-600"><Hl>{s.text}</Hl></p>
          </li>
        ))}
      </ol>
    </LightSection>
  );
}

export function SixMonthPaperwork() {
  return (
    <section id="documents" className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        {/* Documents */}
        <article data-reveal className="rounded-[2rem] bg-white p-8 shadow-xl shadow-hero-950/5 sm:p-10">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand text-white">
            <FileCheck2 className="size-6" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-navy">{c.documents.title}</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {c.documents.items.map((d) => (
              <li key={d} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 font-semibold text-navy">
                <FileText className="size-4 shrink-0 text-brand" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-slate-600"><Hl>{c.documents.note}</Hl></p>
        </article>

        {/* Planning, fees */}
        <article data-reveal className="rounded-[2rem] bg-hero-950 p-8 text-white sm:p-10">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-sky text-hero-950">
            <Clock className="size-6" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight">{c.planning.title}</h2>
          <ul className="mt-6 space-y-3">
            {c.planning.schedule.map((s) => (
              <li key={s.title} className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
                <span className="block font-semibold">{s.title}</span>
                <span className="mt-0.5 block text-sm text-slate-400"><Hl>{s.text}</Hl></span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-slate-300"><Hl>{c.planning.feesIntro}</Hl></p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.planning.feesAsk.map((f) => (
              <li key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{f}</li>
            ))}
          </ul>
          <BookDemoButton className="mt-7 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-bold text-hero-950 transition hover:brightness-105">
            Ask for a written fee quote <ArrowRight className="size-4" />
          </BookDemoButton>
        </article>
      </div>
    </section>
  );
}

export function SixMonthOutcomes() {
  return (
    <LightSection id="careers">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Career opportunities</Eyebrow>
          <Heading className="mt-5">{c.careers.title}</Heading>
          <ul data-stagger className="mt-8 flex flex-wrap gap-2">
            {c.careers.roles.map((r) => (
              <li key={r} className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-navy">
                <Briefcase className="size-4 text-brand" />
                {r}
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-6 text-sm leading-relaxed text-slate-500"><Hl>{c.careers.note}</Hl></p>
        </div>
        <div>
          <Eyebrow>Certificates & deliverables</Eyebrow>
          <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{c.deliverables.title}</h2>
          <div data-stagger className="mt-6 space-y-3">
            {c.deliverables.items.map((d) => (
              <article key={d.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-display font-bold text-navy">{d.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-600"><Hl>{d.text}</Hl></p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </LightSection>
  );
}

export async function SixMonthVisit({ title = c.visit.title }: { title?: string }) {
  const site = await getSite(); // CMS Settings, over the built-in details
  return (
    <section className="bg-white px-5 pb-20 lg:px-8 lg:pb-28">
      <div
        data-reveal="scale"
        className="relative isolate mx-auto flex max-w-7xl flex-col gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-sun via-cyan to-sky p-8 text-hero-950 sm:p-12 lg:flex-row lg:items-center"
      >
        <div className="flex-1">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-hero-950/60">Internship location</p>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-hero-950/80"><Hl>{c.visit.text}</Hl></p>
          <a
            href={site.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex max-w-xl items-start gap-2 font-semibold underline-offset-4 hover:underline"
          >
            <MapPin className="mt-0.5 size-5 shrink-0" />
            {site.address}
          </a>
          <p className="mt-2 flex items-center gap-2 text-sm text-hero-950/70">
            <Clock className="size-4" /> {site.hours}
          </p>
        </div>
        <BookDemoButton className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-hero-950 py-2 pl-6 pr-2 text-sm font-bold text-white transition-colors hover:bg-hero-800 lg:self-center">
          Book a centre visit
          <span className="grid size-8 place-items-center rounded-full bg-cyan text-hero-950 transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="size-4" />
          </span>
        </BookDemoButton>
      </div>
    </section>
  );
}

export function SixMonthFaq() {
  return (
    <DarkSection id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow dark>FAQs</Eyebrow>
          <Heading dark className="mt-5">
            Six-month internships in <span className="text-gradient">{site.city}</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg text-slate-400"><Hl>{c.cta}</Hl></p>
          <BookDemoButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-bold text-hero-950 transition hover:brightness-105">
            Speak with an academic counsellor <ArrowRight className="size-4" />
          </BookDemoButton>
        </div>
        <div className="space-y-3">
          {c.faqs.map((f, i) => (
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
