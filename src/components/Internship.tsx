// Sections for the Internship & Training pages (/internship-training-in-lucknow
// and one page per programme).
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Box,
  Briefcase,
  ChartColumn,
  Check,
  ChevronRight,
  Cloud,
  Code,
  FileText,
  Layers,
  Megaphone,
  Monitor,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import {
  certificatePrograms,
  courseHref,
  courseSlugs,
  included,
  internshipHref,
  programmes,
  site,
  steps,
  trainingHref,
} from "@/lib/site";
import { domainHref, internshipDomains } from "@/lib/internshipDomains";
import { BookDemoButton } from "./Enquiry";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "./ui";

export type Programme = (typeof programmes)[number];

/** Icons for the `icon` names in `certificatePrograms`. */
export const programIcons: Record<string, LucideIcon> = {
  cloud: Cloud,
  code: Code,
  sparkles: Sparkles,
  rocket: Rocket,
  megaphone: Megaphone,
  chart: ChartColumn,
  layers: Layers,
  shield: Shield,
  smartphone: Smartphone,
  terminal: Terminal,
  monitor: Monitor,
  target: Target,
  box: Box,
};

// "45 Days" → big "45" and small "Days".
const split = (duration: string) => {
  const [n, ...rest] = duration.split(" ");
  return { n, unit: rest.join(" ") };
};

function Crumbs({ current }: { current?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="rise text-sm text-slate-400">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
        </li>
        <ChevronRight aria-hidden className="size-3.5" />
        {current ? (
          <>
            <li>
              <Link href={internshipHref()} className="hover:text-white">
                Internship & Training
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li aria-current="page" className="text-white">
              {current}
            </li>
          </>
        ) : (
          <li aria-current="page" className="text-white">
            Internship & Training
          </li>
        )}
      </ol>
    </nav>
  );
}

/** A programme as a training "pass": duration, title and what it includes. */
function Ticket({ p, big = false }: { p: Programme; big?: boolean }) {
  const { n, unit } = split(p.duration);
  return (
    <div
      className={`relative flex overflow-hidden rounded-3xl bg-gradient-to-br from-sun via-cyan to-sky text-hero-950 shadow-2xl shadow-sky/30 ${
        big ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      <div className={`flex flex-col justify-between p-6 ${big ? "sm:w-48 sm:shrink-0" : ""}`}>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-hero-950/60">
          {site.name} pass
        </span>
        <span className="mt-4 font-display leading-none">
          <span className={`block font-extrabold tracking-tight ${big ? "text-7xl" : "text-6xl"}`}>{n}</span>
          <span className="mt-1 block text-lg font-bold">{unit}</span>
        </span>
      </div>
      {/* Perforation between the stub and the body */}
      <div
        aria-hidden
        className={`border-dashed border-hero-950/25 ${big ? "border-t-2 sm:border-l-2 sm:border-t-0" : "border-t-2"}`}
      />
      <div className="flex-1 bg-white/55 p-6 backdrop-blur-sm">
        <p className="font-display text-lg font-extrabold leading-snug">{p.title}</p>
        <ul className="mt-3 space-y-1.5">
          {p.points.map((pt) => (
            <li key={pt} className="flex items-center gap-2 text-sm font-semibold">
              <Check className="size-4 shrink-0" strokeWidth={3} />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function InternshipHero({ programme }: { programme?: Programme }) {
  return (
    <section id="top" className="relative isolate overflow-clip bg-hero-950 text-white">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div className="orb absolute -right-40 -top-40 -z-10 size-[40rem] animate-aurora [--orb:rgba(28,83,209,0.5)]" />
      <div className="orb absolute -bottom-52 -left-20 -z-10 size-[34rem] animate-aurora [--orb:rgba(0,212,255,0.18)] [animation-delay:-8s]" />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-44">
        <Crumbs current={programme?.duration} />

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <div className="rise [--d:.05s]">
              <Eyebrow dark>{programme ? "Internship & Training" : `Training in ${site.city}`}</Eyebrow>
            </div>
            <h1 className="rise mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight [--d:.1s] sm:text-5xl lg:text-6xl">
              {programme ? (
                <>
                  {programme.duration} {programme.title} in <span className="text-gradient">{site.city}</span>
                </>
              ) : (
                <>
                  Internship & Industrial Training in <span className="text-gradient">{site.city}</span>
                </>
              )}
            </h1>
            <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.2s] lg:text-lg">
              {programme
                ? `${programme.text} Best for: ${programme.bestFor.charAt(0).toLowerCase()}${programme.bestFor.slice(1)}`
                : "Pick a duration, pick a technology, and finish with a working project, a certificate and — on the longer tracks — an internship letter."}
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3 [--d:.3s]">
              <BookDemoButton className="group inline-flex items-center gap-3 rounded-full bg-cyan py-2 pl-7 pr-2 text-sm font-bold text-hero-950 transition hover:brightness-105">
                Book a free counselling call
                <span className="grid size-8 place-items-center rounded-full bg-hero-950 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </BookDemoButton>
              <a
                href={programme ? "#domains" : "#durations"}
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold transition hover:border-white/40"
              >
                {programme ? "Choose a domain" : "Choose a duration"}
              </a>
            </div>
          </div>

          <div className="rise min-w-0 [--d:.3s]">
            {programme ? (
              <Ticket p={programme} big />
            ) : (
              <ul className="grid grid-cols-2 gap-3">
                {programmes.map((p) => {
                  const { n, unit } = split(p.duration);
                  return (
                    <li key={p.slug}>
                      <Link
                        href={internshipHref(p.slug)}
                        className="group relative block rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan/60 hover:bg-white/[0.09]"
                      >
                        {p.popular && (
                          <span className="absolute right-4 top-4 rounded-full bg-cyan px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-hero-950">
                            Popular
                          </span>
                        )}
                        <span className="font-display leading-none">
                          <span className="text-5xl font-extrabold tracking-tight text-cyan">{n}</span>{" "}
                          <span className="text-sm font-bold text-slate-300">{unit}</span>
                        </span>
                        <span className="mt-3 block font-semibold leading-snug">{p.title}</span>
                        <ArrowUpRight className="mt-3 size-5 text-cyan transition-transform group-hover:rotate-45" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** The four durations side by side; on a programme page its own card is lit. */
export function CompareDurations({ current }: { current?: string }) {
  return (
    <LightSection id="durations">
      <SectionHeading
        eyebrow={current ? "Durations" : "Step 1 · Choose a duration"}
        title={
          <>
            {current ? "Compare with the " : "Choose the "}
            <span className="text-gradient">{current ? "other durations" : "right duration"}</span>
          </>
        }
        text="Every track uses the same lab, trainers and project reviews. The longer you stay, the more you build."
      />
      <ul data-stagger className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
        {programmes.map((p) => {
          const on = p.slug === current;
          const { n, unit } = split(p.duration);
          return (
            <li key={p.slug}>
              <Link
                href={internshipHref(p.slug)}
                aria-current={on ? "page" : undefined}
                className={`group flex h-full flex-col rounded-3xl p-7 transition duration-500 hover:-translate-y-1.5 ${
                  on
                    ? "bg-gradient-to-br from-hero-900 to-hero-950 text-white shadow-2xl shadow-sky/25 ring-2 ring-sky"
                    : "border border-slate-100 bg-white shadow-xl shadow-hero-950/5 hover:border-sky/40"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display leading-none">
                    <span className={`text-5xl font-extrabold tracking-tight ${on ? "text-cyan" : "text-brand"}`}>{n}</span>{" "}
                    <span className={`text-sm font-bold ${on ? "text-slate-300" : "text-slate-500"}`}>{unit}</span>
                  </span>
                  {(on || p.popular) && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                        on ? "bg-cyan text-hero-950" : "bg-sun text-hero-950"
                      }`}
                    >
                      {on ? "You are here" : "Popular"}
                    </span>
                  )}
                </span>
                <span className={`mt-5 font-display text-lg font-bold leading-snug ${on ? "" : "text-navy"}`}>{p.title}</span>
                <span className={`mt-2 text-sm leading-relaxed ${on ? "text-slate-300" : "text-slate-600"}`}>{p.text}</span>
                <ul className="mt-5 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className={`flex items-center gap-2 text-sm ${on ? "text-slate-200" : "text-slate-700"}`}>
                      <Check className={`size-4 shrink-0 ${on ? "text-cyan" : "text-brand"}`} strokeWidth={3} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className={`mt-auto flex items-center gap-2 pt-6 text-sm font-bold ${on ? "text-cyan" : "text-brand"}`}>
                  {on ? "This programme" : `View ${p.duration}`}
                  {!on && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </LightSection>
  );
}

/** The technologies a programme can be taken in. */
export function TrainingTracks({ duration }: { duration?: string }) {
  return (
    <DarkSection id="tracks">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow dark>Technologies</Eyebrow>
          <Heading dark className="mt-5">
            {duration ? `Your ${duration} in` : "Train in"}
            <br />
            <span className="text-gradient">the technology you want</span>
          </Heading>
        </div>
        <p data-reveal className="max-w-sm text-lg text-slate-400">
          Pick one track for your training. A counsellor helps you choose if you are unsure.
        </p>
      </div>
      <ul data-stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {certificatePrograms.map((c) => {
          const Icon = programIcons[c.icon];
          // Each course is an internship domain; the tiles open its six-month page.
          const domain = internshipDomains.find((d) => d.label === c.label);
          const href = domain
            ? domainHref("6-months", domain.slug)
            : c.slug
              ? trainingHref(c)
              : courseSlugs[c.label]
                ? courseHref(c.label)
                : undefined;
          const body = (
            <>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan to-sky text-hero-950 transition-transform duration-300 group-hover:-rotate-6">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1 font-semibold leading-snug">{c.label}</span>
              {c.badge && (
                <span className="shrink-0 rounded-full bg-sun px-2 py-0.5 text-[10px] font-extrabold uppercase text-hero-950">
                  {c.badge}
                </span>
              )}
            </>
          );
          const cls =
            "group flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300";
          return (
            <li key={c.label}>
              {href ? (
                <Link href={href} className={`${cls} hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-white/[0.08]`}>
                  {body}
                </Link>
              ) : (
                <BookDemoButton className={`${cls} w-full text-left hover:border-cyan/50`}>{body}</BookDemoButton>
              )}
            </li>
          );
        })}
      </ul>
    </DarkSection>
  );
}

/** How a training runs, as a numbered path. */
export function TrainingPath() {
  return (
    <LightSection>
      <SectionHeading
        eyebrow="How it runs"
        title={
          <>
            From first call to <span className="text-gradient">finished project</span>
          </>
        }
      />
      <ol className="relative mt-16 grid gap-8 lg:grid-cols-4">
        <span
          aria-hidden
          className="absolute inset-x-[12%] top-7 hidden h-1 rounded-full bg-gradient-to-r from-cyan via-sky to-brand lg:block"
        />
        {steps.map((s, i) => (
          <li key={s.title} data-reveal style={{ "--d": `${i * 0.1}s` } as CSSProperties} className="relative text-center">
            <span className="relative mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-sky font-display text-xl font-extrabold text-hero-950 shadow-lg shadow-sky/30 ring-8 ring-white">
              {i + 1}
            </span>
            <h3 className="mt-6 font-display text-xl font-bold text-navy">{s.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-600">{s.text}</p>
          </li>
        ))}
      </ol>
    </LightSection>
  );
}

const receiveIcons = [Star, Briefcase, FileText, Award, BadgeCheck, Layers];

/** What every trainee leaves with, laid out like a certificate. */
export function TrainingReceive() {
  return (
    <section className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>What you leave with</Eyebrow>
          <Heading className="mt-5">
            Proof you can <span className="text-gradient">show an employer</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            A certificate says you attended. The project you built, and the trainer
            who reviewed it, say you can do the work.
          </p>
        </div>
        <div
          data-reveal="scale"
          className="relative rounded-[2rem] border-[10px] border-double border-sky/40 bg-white p-8 shadow-2xl shadow-hero-950/10 sm:p-10"
        >
          <Award aria-hidden className="absolute -right-4 -top-4 size-16 rotate-12 text-sky" />
          <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.3em] text-brand">
            Included in every programme
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {included.map((item, i) => {
              const Icon = receiveIcons[i % receiveIcons.length];
              return (
                <li key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 font-semibold text-navy">
                  <Icon className="size-5 shrink-0 text-brand" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
