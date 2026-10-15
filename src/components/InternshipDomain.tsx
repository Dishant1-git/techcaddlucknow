// Internship domain pages (src/lib/internshipDomains.ts), one per domain and
// duration, plus the domain picker on each duration page. The sections every
// domain shares — process, paperwork, location — come from SixMonthInternship.tsx.
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronRight,
  CircleHelp,
  GraduationCap,
  Info,
  Plus,
  Target,
} from "lucide-react";
import { sixMonths } from "@/lib/internship6m";
import { domainHref, internshipDomains, type DomainPage } from "@/lib/internshipDomains";
import { certificatePrograms, internshipHref, site } from "@/lib/site";
import { programIcons } from "./Internship";
import { BookDemoButton } from "./Enquiry";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "./ui";
import { Hl } from "./Hl";

type Props = { domain: DomainPage };

const pad = (n: number) => String(n).padStart(2, "0");

export function DomainHero({ domain: d }: Props) {
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

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <div className="rise [--d:.05s]">
              <Eyebrow dark>{d.programme.duration} internship domain</Eyebrow>
            </div>
            <h1 className="rise mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight [--d:.1s] sm:text-5xl lg:text-6xl">
              {d.programme.duration} {d.heading} in <span className="text-gradient">{site.city}</span>
            </h1>
            <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.2s] lg:text-lg"><Hl>{d.hero.text}</Hl></p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3 [--d:.3s]">
              <BookDemoButton
                course={d.course}
                className="group inline-flex items-center gap-3 rounded-full bg-cyan py-2 pl-7 pr-2 text-sm font-bold text-hero-950 transition hover:brightness-105"
              >
                Request the {d.label} syllabus
                <span className="grid size-8 place-items-center rounded-full bg-hero-950 text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </BookDemoButton>
              <a
                href="#roadmap"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold transition hover:border-white/40"
              >
                See the learning roadmap
              </a>
            </div>
            <p className="rise mt-6 flex max-w-xl items-start gap-2 text-sm text-slate-400 [--d:.4s]">
              <Info className="mt-0.5 size-4 shrink-0" />
              <Hl>{sixMonths.hero.trust}</Hl>
            </p>
          </div>

          <div className="rise rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur [--d:.3s] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">What the {d.programme.duration.toLowerCase()} cover</p>
            <ul className="mt-5 space-y-3">
              {d.hero.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan to-sky text-hero-950">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-semibold">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DomainOverview({ domain: d }: Props) {
  return (
    <LightSection id="overview">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow>Overview</Eyebrow>
          <Heading className="mt-5">{d.overview.title}</Heading>
          {d.overview.text.map((t) => (
            <p key={t} data-reveal className="mt-6 leading-relaxed text-slate-600 first-of-type:text-lg">
              <Hl>{t}</Hl>
            </p>
          ))}
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-navy">Who can apply?</h3>
          <div data-stagger className="mt-5 space-y-3">
            {d.audience.map((a) => (
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
        </div>
      </div>
    </LightSection>
  );
}

export function DomainWhy({ domain: d }: Props) {
  return (
    <DarkSection id="why">
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow dark>Why {d.programme.duration.toLowerCase()}</Eyebrow>
          <Heading dark className="mt-5">{d.why.title}</Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-400"><Hl>{d.why.text}</Hl></p>
        </div>
        <ul data-stagger className="grid gap-3 sm:grid-cols-2">
          {d.why.items.map((it) => (
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
        <SectionHeading dark eyebrow="Specialisations" title={`${d.label} specialisations`} text={d.specialisations.intro} />
        <div data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.specialisations.items.map((s, i) => (
            <article key={s.title} data-spot className="border-glow relative rounded-3xl bg-white/[0.04] p-6">
              <span className="font-display text-sm font-extrabold text-cyan">{pad(i + 1)}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-400"><Hl>{s.text}</Hl></p>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}

export function DomainTopics({ domain: d }: Props) {
  return (
    <section id="syllabus" className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Syllabus"
          title="What you will learn, topic by topic"
          text="Each topic ends with something you should be able to show. It makes the commitment measurable rather than vague — and gives you material for your report and portfolio."
        />
        <ol data-stagger className="mt-14 grid gap-4 md:grid-cols-2">
          {d.topics.map((t, i) => (
            <li key={t.title} className="flex flex-col rounded-3xl bg-white p-6 shadow-xl shadow-hero-950/5 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sky to-brand font-display font-extrabold text-white">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">{t.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600"><Hl>{t.text}</Hl></p>
                </div>
              </div>
              <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-navy">
                <Target className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  <span className="font-bold">Checkpoint: </span>
                  <Hl>{t.checkpoint}</Hl>
                </span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DomainRoadmap({ domain: d }: Props) {
  return (
    <LightSection id="roadmap">
      <SectionHeading
        eyebrow="Learning roadmap"
        title={`${d.programme.duration} learning roadmap`}
        text="The sequence is illustrative — confirm it against the active batch syllabus. Each stage ends with a documented milestone, feedback and a note of what to revise."
      />
      <ol className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {d.stages.map((m) => (
          <li key={m.label} data-reveal className="relative rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5">
            <span className="absolute -top-4 left-7 rounded-full bg-gradient-to-r from-sky to-brand px-4 py-1.5 font-display text-sm font-extrabold text-white shadow-lg shadow-sky/30">
              {m.label}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold text-navy">{m.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600"><Hl>{m.text}</Hl></p>
          </li>
        ))}
      </ol>
    </LightSection>
  );
}

export function DomainProjects({ domain: d }: Props) {
  return (
    <DarkSection id="projects">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow dark>Practical projects</Eyebrow>
          <Heading dark className="mt-5">
            {d.label} <span className="text-gradient">projects</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-400"><Hl>{d.projects.intro}</Hl></p>
          <p data-reveal className="mt-4 text-sm text-slate-500">
            Example project types. <Hl>{d.projectNote}</Hl> Your actual project is agreed with your mentor and must respect data privacy and
            licensing.
          </p>
        </div>
        <div data-stagger className="grid gap-4 sm:grid-cols-2">
          {d.projects.items.map((p) => (
            <article key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <h3 className="font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-400"><Hl>{p.text}</Hl></p>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}

export function DomainCareers({ domain: d }: Props) {
  return (
    <LightSection id="careers">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Career scope</Eyebrow>
          <Heading className="mt-5">After {d.label} training</Heading>
          <ul data-stagger className="mt-8 flex flex-wrap gap-2">
            {d.careers.roles.map((r) => (
              <li key={r} className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-navy">
                <Briefcase className="size-4 text-brand" />
                {r}
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-6 text-sm leading-relaxed text-slate-500"><Hl>{d.careers.text}</Hl></p>

          <h3 className="mt-12 font-display text-xl font-bold text-navy">Certificates and deliverables</h3>
          <div data-stagger className="mt-5 space-y-3">
            {sixMonths.deliverables.items.map((it) => (
              <article key={it.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h4 className="font-display font-bold text-navy">{it.title}</h4>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-600"><Hl>{it.text}</Hl></p>
              </article>
            ))}
          </div>
        </div>

        <aside data-reveal className="self-start rounded-[2rem] bg-hero-950 p-8 text-white sm:p-10 lg:sticky lg:top-32">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-sky text-hero-950">
            <CircleHelp className="size-6" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight">Student decision checklist</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Ask the programme team for written answers, and compare them with the rules issued by your college or university.
          </p>
          <ul className="mt-6 space-y-2.5">
            {d.checklist.map((q) => (
              <li key={q} className="flex items-start gap-3 text-[15px] leading-snug">
                <Check className="mt-0.5 size-4 shrink-0 text-cyan" strokeWidth={3} />
                {q}
              </li>
            ))}
          </ul>
          <BookDemoButton
            course={d.course}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-bold text-hero-950 transition hover:brightness-105"
          >
            Ask these questions <ArrowRight className="size-4" />
          </BookDemoButton>
        </aside>
      </div>
    </LightSection>
  );
}

export function DomainFaq({ domain: d }: Props) {
  return (
    <DarkSection id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow dark>FAQs</Eyebrow>
          <Heading dark className="mt-5">
            {d.label} internship in <span className="text-gradient">{site.city}</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg text-slate-400">
            Planning {d.programme.duration.toLowerCase()} of {d.label} training? Share your degree, semester and goals to request the current syllabus and discuss
            eligibility, batches and fees with {site.name}.
          </p>
          <BookDemoButton
            course={d.course}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-bold text-hero-950 transition hover:brightness-105"
          >
            Speak with a counsellor <ArrowRight className="size-4" />
          </BookDemoButton>
        </div>
        <div className="space-y-3">
          {d.faqs.map((f, i) => (
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

/** Links to a duration's domain pages, as numbered cards. */
function DomainCards({ duration, exclude }: { duration: string; exclude?: string }) {
  const list = internshipDomains.filter((o) => o.slug !== exclude);
  return (
    <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((o) => {
        // Same icon and badge as on the Internship & Training course list.
        const program = certificatePrograms.find((c) => c.label === o.label);
        const Icon = programIcons[program?.icon ?? "monitor"];
        return (
        <li key={o.slug}>
          <Link
            href={domainHref(duration, o.slug)}
            className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-sky/50"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:-rotate-6">
                <Icon className="size-5" />
              </span>
              {program?.badge ? (
                <span className="rounded-full bg-sun px-2 py-0.5 text-[10px] font-extrabold uppercase text-hero-950">{program.badge}</span>
              ) : (
                <ArrowUpRight className="size-5 text-brand transition-transform group-hover:rotate-45" />
              )}
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-navy">{o.label}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{o.hero.points.slice(0, 3).join(" · ")}</p>
            <span className="mt-5 text-sm font-bold text-brand">View domain</span>
          </Link>
        </li>
        );
      })}
    </ul>
  );
}

export function OtherDomains({ domain: d }: Props) {
  return (
    <LightSection id="other-domains">
      <SectionHeading eyebrow="Other domains" title={`Compare ${d.programme.duration} internship domains`} />
      <DomainCards duration={d.programme.slug} exclude={d.slug} />
    </LightSection>
  );
}

/** Step two on a duration page: choose the domain to train in. */
export function DomainPicker({
  duration,
  label,
  title,
  text = "Pick the technology you want to train in to see its syllabus, roadmap, projects and FAQs for this duration. A counsellor can help if you are unsure.",
}: {
  duration: string;
  label: string;
  title?: string;
  text?: string;
}) {
  return (
    <LightSection id="domains">
      <SectionHeading
        eyebrow="Step 2 · Choose a domain"
        title={
          title ?? (
            <>
              Your {label} internship, <span className="text-gradient">in which domain?</span>
            </>
          )
        }
        text={text}
      />
      <DomainCards duration={duration} />
    </LightSection>
  );
}
