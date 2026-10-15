import { NavLink } from "./NavLink";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  Check,
  ChevronRight,
  FileText,
  FolderGit2,
  GraduationCap,
  Plus,
  Sparkles,
} from "lucide-react";
import type { Course } from "@/lib/courses";
import { included, site, stats } from "@/lib/site";
import { toolCatalogue, toolGroupOrder } from "@/lib/toolCatalogue";
import { isLight, techLogos } from "@/lib/techLogos";
import { BookDemoButton } from "./Enquiry";
import { ToolMarquee } from "./ToolMarquee";
import { type OrbitTool, ToolOrbit } from "./ToolOrbit";
import { DarkSection, Eyebrow, Heading, LightSection } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

const heroPoints = [
  "Live projects",
  "Practitioner trainers",
  "Placement support",
  "Certificate + internship",
];

/** AI pages: a chat-style card that lays out the course as a learning path. */
function AiConsole({ course }: { course: Course }) {
  return (
    <div className="rise border-glow relative rounded-3xl bg-white/[0.05] backdrop-blur [--d:.35s]">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-slate-400">{site.name}-ai · learning path</span>
      </div>
      <div className="space-y-4 p-5">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm font-medium">
          Teach me {course.label}
        </p>
        <div className="flex gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-cyan">
            <Sparkles className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-slate-300">Here is your path, one module at a time:</p>
            <ol className="mt-3 space-y-2">
              {course.modules.slice(0, 4).map((m, i) => (
                <li
                  key={m.title}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-hero-900/70 px-3 py-2 text-sm"
                >
                  <span className="font-mono text-xs text-cyan">{pad(i + 1)}</span>
                  <span className="truncate">{m.title}</span>
                </li>
              ))}
            </ol>
            {course.modules.length > 4 && (
              <p className="mt-2 text-xs text-slate-400">+ {course.modules.length - 4} more modules</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-5 py-4">
        {course.tools.slice(0, 5).map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-200">
            {t}
          </span>
        ))}
        <span aria-hidden className="ai-caret ml-1 h-4 w-px self-center bg-cyan" />
      </div>
    </div>
  );
}

// "Month 1 — Web Fundamentals" → ["Month 1", "Web Fundamentals"]; titles
// without that prefix are numbered by position.
function splitModule(title: string, i: number) {
  const cut = title.indexOf(" — ");
  return cut > 0 ? [title.slice(0, cut), title.slice(cut + 3)] : [`Stage ${i + 1}`, title];
}

// Where the tool logos float round the admission pass, and their bob offset.
const passLogoSpots = [
  "-left-7 top-16 [animation-delay:-1s]",
  "-right-6 top-1/3 [animation-delay:-3s]",
  "-bottom-6 left-14 [animation-delay:-4.5s]",
  "-right-4 -top-5 [animation-delay:-2s]",
];

/**
 * After 12th pages: a light card, framed in the dark hero colour so the
 * transparent header above it stays readable. Beside the pitch sits an
 * "admission pass" ticket: the programme's length, its month-by-month plan
 * and a tear-off stub with the practical details, with tool logos floating
 * round it.
 */
function After12thHero({ course }: { course: Course }) {
  const months = course.modules.map((m, i) => splitModule(m.title, i));
  const shownMonths = months.slice(0, 4);
  const details = course.facts.filter(([label]) => label !== "Duration").slice(0, 3);
  const logos = course.tools
    .map((name) => ({ name, logo: techLogos[name] }))
    .filter((t) => t.logo)
    .slice(0, passLogoSpots.length);

  return (
    <section id="top" className="relative isolate bg-hero-950 px-2 pb-2 pt-24 text-navy sm:px-3 sm:pb-3 lg:pt-32">
      <div className="bg-grid-dark absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />

      <div className="relative isolate mx-auto max-w-[90rem] overflow-clip rounded-[2rem] bg-white bg-gradient-to-b from-brand/8 via-white to-white sm:rounded-[2.5rem]">
        <div className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
        <div className="orb absolute -right-40 -top-40 -z-10 size-[38rem] animate-aurora [--orb:color-mix(in_srgb,var(--color-sky)_22%,transparent)]" />
        <div className="orb absolute -bottom-56 -left-40 -z-10 size-[30rem] animate-aurora [--orb:color-mix(in_srgb,var(--color-sun)_18%,transparent)] [animation-delay:-8s]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-14">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="rise text-sm text-slate-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-brand">
                    Home
                  </Link>
                </li>
                <ChevronRight aria-hidden className="size-3.5" />
                <li>
                  <Link href={course.parent.href} className="hover:text-brand">
                    {course.parent.label}
                  </Link>
                </li>
                <ChevronRight aria-hidden className="size-3.5" />
                <li aria-current="page" className="text-navy">
                  {course.label}
                </li>
              </ol>
            </nav>

            <div className="rise mt-8 flex flex-wrap items-center gap-3 [--d:.05s]">
              <Eyebrow>{course.category.label}</Eyebrow>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <GraduationCap className="size-3.5 text-cyan" />
                Any stream welcome
              </span>
            </div>
            <h1 className="rise mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight [--d:.1s] sm:text-5xl lg:text-6xl">
              {course.title} in <span className="text-gradient">{site.city}</span>
            </h1>
            <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-600 [--d:.2s] lg:text-lg">
              {course.summary}
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3 [--d:.3s]">
              <BookDemoButton
                course={course.label}
                className="group inline-flex items-center gap-3 rounded-full bg-brand py-2 pl-7 pr-2 text-sm font-bold text-white shadow-lg shadow-brand/30 transition-colors duration-300 hover:bg-brand-600"
              >
                Book a free counselling call
                <span className="grid size-8 place-items-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </BookDemoButton>
              <NavLink
                href="#syllabus"
                className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold transition hover:border-brand hover:text-brand"
              >
                View syllabus
              </NavLink>
            </div>

            <dl className="rise mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-7 [--d:.4s] sm:flex sm:gap-x-8">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-xl font-extrabold text-navy sm:text-2xl">
                    {s.value.toLocaleString("en-IN")}
                    <span className="text-brand">{s.suffix}</span>
                  </dd>
                  <dt className="text-xs text-slate-500 sm:text-sm">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Admission pass */}
          <div className="rise relative mx-auto w-full min-w-0 max-w-md [--d:.3s] lg:max-w-none">
            {logos.map((t, i) => (
              <span
                key={t.name}
                title={t.name}
                className={`absolute z-10 hidden size-14 animate-float place-items-center rounded-full border border-slate-100 shadow-xl shadow-hero-950/15 sm:grid ${
                  isLight(t.logo.hex) ? "bg-hero-800" : "bg-white"
                } ${passLogoSpots[i]}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-7" fill={`#${t.logo.hex}`}>
                  <path d={t.logo.path} />
                </svg>
              </span>
            ))}

            <div className="relative overflow-hidden rounded-[2rem] bg-navy text-white shadow-2xl shadow-hero-950/30 transition duration-500 lg:rotate-2 lg:hover:rotate-0">
              <div className="orb absolute -right-24 -top-24 size-64 [--orb:color-mix(in_srgb,var(--color-cyan)_30%,transparent)]" />
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan">Admission pass</span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-slate-300">
                    {course.parent.label}
                  </span>
                </div>
                <p className="mt-4 font-display text-xl font-bold leading-snug sm:text-2xl">{course.label}</p>
                {course.duration && (
                  <p className="text-gradient mt-1 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                    {course.duration}
                  </p>
                )}

                <ol className="relative mt-7 space-y-4">
                  <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-cyan via-white/20 to-transparent" />
                  {shownMonths.map(([label, title], i) => (
                    <li key={label + title} className="relative flex gap-4 pl-0">
                      <span
                        className={`relative mt-1.5 size-[11px] shrink-0 rounded-full ${
                          i === 0 ? "bg-cyan shadow-[0_0_0_4px] shadow-cyan/25" : "border-2 border-white/30 bg-navy"
                        }`}
                      />
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-cyan/90">
                          {label}
                        </span>
                        <span className="line-clamp-2 block text-sm font-medium text-slate-200">{title}</span>
                      </span>
                    </li>
                  ))}
                  {months.length > shownMonths.length && (
                    <li className="pl-[27px] text-sm font-semibold text-slate-400">
                      + {months.length - shownMonths.length} more in the syllabus
                    </li>
                  )}
                </ol>
              </div>

              {/* Tear line */}
              <div aria-hidden className="relative mx-6 border-t-2 border-dashed border-white/15">
                <span className="absolute -left-10 top-0 size-8 -translate-y-1/2 rounded-full bg-white" />
                <span className="absolute -right-10 top-0 size-8 -translate-y-1/2 rounded-full bg-white" />
              </div>

              <div className="relative p-6 sm:px-8">
                {details.length > 0 && (
                  <dl className="grid grid-cols-3 gap-3">
                    {details.map(([label, value]) => (
                      <div key={label} className="min-w-0">
                        <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</dt>
                        <dd className="mt-1 text-sm font-semibold leading-snug">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <BookDemoButton
                  course={course.label}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-sun py-3.5 text-sm font-extrabold text-hero-950 transition hover:brightness-105"
                >
                  Reserve your seat
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </BookDemoButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const certificateCorners = [
  "left-2 top-2 border-l-2 border-t-2",
  "right-2 top-2 border-r-2 border-t-2",
  "bottom-2 left-2 border-b-2 border-l-2",
  "bottom-2 right-2 border-b-2 border-r-2",
];

/**
 * A sample techcadd certificate for the course, shown in the Internship &
 * Training hero. It is clearly marked as a sample: the name, number and
 * signature are placeholders.
 */
function SampleCertificate({ course }: { course: Course }) {
  const initials = course.slug
    .split("-")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="rise relative mx-auto w-full max-w-xl [--d:.3s]">
      <span className="absolute -top-4 left-6 z-10 rounded-full bg-sun px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-hero-950 shadow-lg">
        Sample certificate
      </span>
      <span className="absolute -bottom-4 right-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-hero-900/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur">
        <Check className="size-3.5 text-cyan" strokeWidth={3} />
        Awarded on completion
      </span>

      <div className="group relative -rotate-2 rounded-2xl bg-[#fffdf6] p-2.5 shadow-2xl shadow-black/50 transition duration-500 hover:rotate-0 sm:p-3">
        {/* Sheen that sweeps across on hover */}
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-[left] duration-1000 group-hover:left-[150%]" />
        </span>

        <div className="rounded-xl border-2 border-sun/80 p-1">
          <div className="relative overflow-hidden rounded-lg border border-navy/15 px-5 py-6 text-center text-navy sm:px-8 sm:py-7">
            {/* Corner flourishes */}
            {certificateCorners.map((c) => (
              <span key={c} aria-hidden className={`absolute size-5 border-brand/40 ${c}`} />
            ))}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 grid -rotate-12 select-none place-items-center font-display text-7xl font-extrabold tracking-widest text-navy/[0.04] sm:text-8xl"
            >
              SAMPLE
            </span>

            <span
              role="img"
              aria-label={site.name}
              className="mx-auto block aspect-[952/262] h-8 bg-navy [mask:url(/images/tce.webp)_center/contain_no-repeat] sm:h-9"
            />
            <p className="mt-4 font-display text-xl font-extrabold uppercase tracking-[0.22em] sm:text-2xl">
              Certificate
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand">of completion</p>

            <p className="mt-4 text-xs text-slate-500">This is to certify that</p>
            <p className="mx-auto mt-1 w-4/5 border-b border-dashed border-navy/25 pb-1 font-serif text-2xl italic text-navy sm:text-3xl">
              Your Name
            </p>
            <p className="mt-3 text-xs text-slate-500">has successfully completed the</p>
            <p className="mt-1 text-balance font-display text-lg font-extrabold leading-snug text-brand sm:text-xl">
              {course.title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              at {site.name} {site.city}
              {course.duration ? ` · ${course.duration}` : ""}
            </p>

            <div className="mt-6 grid grid-cols-3 items-end gap-3 text-[10px] text-slate-500">
              <div className="text-left">
                <svg viewBox="0 0 120 32" aria-hidden className="h-7 w-24 text-navy/70">
                  <path
                    d="M4 22c8-14 14-16 16-8s-4 12 2 6 10-14 14-6-2 10 6 4 8-10 14-4 6 6 14 0 12-6 18-2 10 2 24-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="mt-1 border-t border-navy/20 pt-1 font-semibold uppercase tracking-wider">Director</p>
              </div>
              <div className="grid place-items-center">
                <span className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-sun to-amber-500 text-hero-950 shadow-lg shadow-amber-500/30 ring-4 ring-sun/30 sm:size-16">
                  <span className="absolute inset-1 rounded-full border border-dashed border-hero-950/30" />
                  <Award className="size-6 sm:size-7" />
                </span>
              </div>
              <div className="text-right">
                <p className="whitespace-nowrap font-mono text-[9px] font-semibold text-navy sm:text-[11px]">
                  TC-{site.city.slice(0, 3).toUpperCase()}-{initials}-0001
                </p>
                <p className="mt-1 whitespace-nowrap border-t border-navy/20 pt-1 font-semibold uppercase tracking-wider">
                  Certificate no.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The course page hero. AI courses show a console beside the pitch, and the
 * Internship & Training pages (`certificate`) a sample certificate.
 */
export function CourseHero({ course, certificate = false }: { course: Course; certificate?: boolean }) {
  if (course.theme === "after12th") return <After12thHero course={course} />;
  const ai = course.theme === "ai";
  return (
    <section id="top" className="relative isolate overflow-clip bg-hero-950 text-white">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div className="orb absolute -left-40 -top-40 -z-10 size-[36rem] animate-aurora [--orb:color-mix(in_srgb,var(--color-brand)_50%,transparent)]" />
      <div className="orb absolute -bottom-52 -right-20 -z-10 size-[34rem] animate-aurora [--orb:color-mix(in_srgb,var(--color-cyan)_18%,transparent)] [animation-delay:-8s]" />

      <div className="mx-auto max-w-7xl px-5 pb-14 pt-28 lg:px-8 lg:pb-20 lg:pt-44">
        <nav aria-label="Breadcrumb" className="rise text-sm text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li>
              <Link href={course.parent.href} className="hover:text-white">
                {course.parent.label}
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li aria-current="page" className="text-slate-200">
              {course.label}
            </li>
          </ol>
        </nav>

        <div className={ai || certificate ? "mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]" : "mt-8"}>
          <div className="min-w-0">
            <div className="rise flex flex-wrap items-center gap-3 [--d:.05s]">
              <Eyebrow dark>{course.category.label}</Eyebrow>
              {course.badge && (
                <span className="rounded-full bg-sun px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-hero-950">
                  {course.badge}
                </span>
              )}
            </div>
            <h1 className="rise mt-6 max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight [--d:.1s] sm:text-5xl lg:text-6xl">
              {course.title} in <span className="text-gradient">{site.city}</span>
            </h1>
            <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.2s] lg:text-lg">
              {course.summary}
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3 [--d:.3s]">
              <BookDemoButton
                course={course.label}
                className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-sm font-bold text-navy transition-colors duration-300 hover:bg-sky/15 hover:text-white"
              >
                Book a free demo class
                <span className="grid size-8 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </BookDemoButton>
              <NavLink
                href="#syllabus"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold transition hover:border-white/40"
              >
                View syllabus
              </NavLink>
            </div>

            <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300 [--d:.4s]">
              {heroPoints.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-cyan text-hero-950">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {ai && <AiConsole course={course} />}
          {certificate && !ai && <SampleCertificate course={course} />}
        </div>

        {course.facts.length > 0 && (
          <dl className="rise mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 [--d:.5s] sm:grid-cols-2 lg:grid-cols-4">
            {course.facts.map(([label, value]) => (
              <div key={label} className="bg-hero-950/80 p-5 backdrop-blur sm:p-6">
                <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan">
                  {label}
                </dt>
                <dd className="mt-2 font-display text-lg font-bold leading-snug">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export function CourseOverview({ course }: { course: Course }) {
  return (
    <LightSection id="overview">
      <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <Eyebrow>Overview</Eyebrow>
          <Heading className="mt-5">
            Course <span className="text-gradient">overview</span>
          </Heading>
          <div data-reveal className="mt-7 space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            {course.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <aside data-reveal="scale" className="lg:pt-16">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 sm:p-8">
            <p className="font-display text-xl font-bold text-navy">What you get</p>
            <ul className="mt-5 space-y-3.5 text-slate-700">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-2xl font-extrabold text-navy">
                    {s.value.toLocaleString("en-IN")}
                    {s.suffix}
                  </dd>
                  <dt className="mt-1 text-sm text-slate-500">{s.label}</dt>
                </div>
              ))}
            </dl>
            <BookDemoButton
              course={course.label}
              className="mt-7 w-full rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              Get started
            </BookDemoButton>
          </div>
        </aside>
      </div>
    </LightSection>
  );
}

// On desktop (with motion allowed) the syllabus is a pinned stage: Motion.tsx
// flies each week's card in from the right onto a growing stack. Everywhere
// else it is a plain list of cards.
export function CourseSyllabus({ course }: { course: Course }) {
  const count = course.modules.length;
  return (
    <section
      id="syllabus"
      data-syllabus
      style={{ "--weeks": count } as CSSProperties}
      className="relative scroll-mt-24 overflow-x-clip bg-slate-50 lg:motion-safe:h-[calc(var(--weeks)*55vh+100vh)]"
    >
      <div className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:min-h-[40rem] lg:motion-safe:items-center lg:motion-safe:pt-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8 lg:py-28 lg:motion-safe:grid-cols-[0.62fr_1.38fr] lg:motion-safe:gap-10 lg:motion-safe:py-0">
          <div className="lg:sticky lg:top-32 lg:self-start lg:motion-safe:static lg:motion-safe:self-center">
            <Eyebrow>Syllabus</Eyebrow>
            <Heading className="mt-5">
              What you will
              <br />
              <span className="text-gradient">learn</span>
            </Heading>
            <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
              {course.syllabusIntro ||
                `${count} modules, each ending with something you can demonstrate. The final work becomes part of your portfolio.`}
            </p>
            <p data-reveal className="mt-6 text-sm font-semibold text-slate-500">
              {count} modules{course.duration ? ` · ${course.duration}` : ""}
            </p>

            <div aria-hidden className="mt-10 hidden lg:motion-safe:block">
              <p className="flex items-baseline gap-3 font-display font-extrabold text-navy">
                <span className="text-xs uppercase tracking-[0.24em] text-brand">{course.unit}</span>
                <span className="block h-[1em] overflow-hidden text-6xl leading-none">
                  <span data-syllabus-count className="block">
                    {course.modules.map((_, i) => (
                      <span key={i} className="block h-[1em]">
                        {pad(i + 1)}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="text-xl text-slate-400">/ {pad(count)}</span>
              </p>
              <div className="mt-5 h-1 max-w-xs overflow-hidden rounded-full bg-slate-200">
                <div
                  data-syllabus-bar
                  className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-cyan"
                />
              </div>
            </div>
          </div>

          <ol className="space-y-4 lg:motion-safe:relative lg:motion-safe:mt-6 lg:motion-safe:h-[calc(100svh-9rem)] lg:motion-safe:max-h-[46rem] lg:motion-safe:space-y-0">
            {course.modules.map((m, i) => {
              const split = splitPeriod(m.title);
              return (
                <li
                  key={`${i}-${m.title}`}
                  data-syllabus-card
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.18)] will-change-transform lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:my-auto lg:motion-safe:h-fit lg:motion-safe:max-h-full"
                >
                  <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-4 sm:px-8">
                    <span className="rounded-full bg-brand/10 px-3 py-1 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
                      {split?.period ?? `${course.unit} ${pad(i + 1)}`}
                    </span>
                    <span className="ml-auto font-display text-sm font-bold text-slate-400">
                      {pad(i + 1)} / {pad(count)}
                    </span>
                  </div>
                  <SyllabusBody module={split ? { ...m, title: split.title } : m} />
                  <p
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent pb-3 pt-12 text-[11px] font-bold uppercase tracking-[0.2em] text-brand group-data-[more]:flex"
                  >
                    Scroll for more
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

// "Month 1 — Dart Basics" → { period: "Month 1", title: "Dart Basics" }, so the
// card's badge carries the period instead of repeating it in the heading.
function splitPeriod(title: string) {
  const m = /^((?:Months?|Weeks?|Modules?) \d+(?:\s*[–-]\s*\d+)?) — (.+)$/.exec(title);
  return m ? { period: m[1], title: m[2] } : null;
}

// Long syllabus points read "Topic (12 hrs) — details". Splitting them lets the
// topic stand out, and the text tightens as a module's content grows so the
// card fits on screen without scrolling.
function SyllabusBody({ module: m }: { module: Course["modules"][number] }) {
  const chars = m.points.join("").length + (m.text?.length ?? 0) + (m.after?.length ?? 0);
  const density = chars > 1400 ? "dense" : chars > 500 || m.points.length > 6 ? "medium" : "light";
  const look = {
    light: { title: "text-2xl", list: "text-base", cols: "" },
    medium: { title: "text-xl", list: "text-[15px]", cols: "xl:columns-2 [&>li]:break-inside-avoid" },
    dense: { title: "text-lg", list: "text-[13px] leading-snug", cols: "lg:columns-2" },
  }[density];
  return (
    <div data-lenis-prevent data-syllabus-body className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
      <h3 className={`font-display font-bold tracking-tight text-navy ${look.title}`}>{m.title}</h3>
      {m.text && <p className={`mt-3 leading-relaxed text-slate-600 ${look.list}`}>{m.text}</p>}
      <ul data-syllabus-list className={`mt-4 gap-x-8 text-slate-600 [&>li]:mb-2.5 empty:hidden ${look.list} ${look.cols}`}>
        {m.points.map((p) => {
          // Prefer the dash after "(12 hrs)", since topic names can contain one too.
          const hrs = p.indexOf(") — ");
          const cut = hrs > 0 && hrs < 120 ? hrs + 1 : p.indexOf(" — ");
          const head = cut > 0 && cut < 120 ? p.slice(0, cut) : null;
          return (
            <li key={p} className="flex gap-2.5">
              <Check className="mt-[0.2em] size-[1.1em] shrink-0 text-brand" />
              <span>
                {head ? (
                  <>
                    <span className="font-semibold text-navy">{head}</span>
                    <span className="mt-0.5 block">{p.slice(cut + 3)}</span>
                  </>
                ) : (
                  p
                )}
              </span>
            </li>
          );
        })}
      </ul>
      {m.after && <p className={`leading-relaxed text-slate-600 ${look.list}`}>{m.after}</p>}
    </div>
  );
}

function ToolChip({ name }: { name: string }) {
  const logo = techLogos[name];
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 font-semibold backdrop-blur">
      {logo ? (
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-lg ${isLight(logo.hex) ? "bg-hero-800" : "bg-white"}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill={`#${logo.hex}`}>
            <path d={logo.path} />
          </svg>
        </span>
      ) : (
        <span className="size-2 shrink-0 rounded-full bg-cyan" />
      )}
      {name}
    </li>
  );
}

export function CourseTools({ course }: { course: Course }) {
  if (course.tools.length === 0) return null;
  return (
    <DarkSection id="tools">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow dark>The toolchain</Eyebrow>
        <Heading dark className="mt-5">
          Tools you will <span className="text-gradient">actually work in</span>
        </Heading>
        <p data-reveal className="mt-6 text-lg text-slate-300">
          Everything below is installed on the lab machines and used in your
          project work — not shown once on a slide and forgotten.
        </p>
      </div>
      <ul data-stagger className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
        {course.tools.map((t) => (
          <ToolChip key={t} name={t} />
        ))}
      </ul>
    </DarkSection>
  );
}

// Short name for the orbit's centre: "Flutter App Development Program (3 Months)"
// → "Flutter", "MERN Stack Program" → "MERN Stack".
function hubLabel(label: string) {
  const name = label.replace(/\s*\(.*?\)/g, "").replace(/ (Program|Programme|Certificate Course)$/, "");
  return name.length <= 12 ? name : name.split(" ")[0];
}

// The course's tools, grouped by the content's own `toolGroups` when it has
// them and by the shared tool catalogue otherwise, with their logos.
function groupedTools(course: Course): OrbitTool[] {
  const groups =
    course.toolGroups ??
    [...toolGroupOrder, undefined]
      .map((group) => ({
        title: group ?? "Tools & Workflow",
        tools: course.tools
          .filter((name) => toolCatalogue[name]?.group === group)
          .map((name) => ({ name, text: toolCatalogue[name]?.text ?? "" })),
      }))
      .filter((g) => g.tools.length > 0);
  return groups.flatMap((g) =>
    g.tools.map((t) => {
      const logo = techLogos[t.name];
      return {
        ...t,
        text: t.text || "Installed on the lab machines and used in your project work.",
        group: g.title,
        logo: logo ? { path: logo.path, hex: logo.hex } : null,
        darkTile: !!logo && isLight(logo.hex),
      };
    }),
  );
}

/**
 * The toolchain on Internship & Training pages (tool logos orbiting the
 * course, see ToolOrbit) and After 12th pages (drifting rows of logos framed like
 * the After 12th hero, see ToolMarquee).
 */
export function Toolchain({ course }: { course: Course }) {
  if (course.tools.length === 0) return null;
  const tools = groupedTools(course);
  if (course.theme === "after12th") {
    return (
      <section id="tools" className="relative isolate scroll-mt-24 bg-hero-950 p-2 sm:p-3">
        <div className="bg-grid-dark absolute inset-0 -z-10" />
        <div className="glow-dark absolute inset-0 -z-10" />
        <div className="relative isolate mx-auto max-w-[90rem] overflow-clip rounded-[2rem] bg-white sm:rounded-[2.5rem]">
          <div className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
          <div className="orb absolute -bottom-48 -left-40 -z-10 size-[34rem] animate-aurora [--orb:color-mix(in_srgb,var(--color-sky)_16%,transparent)]" />
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <ToolMarquee
              tools={tools}
              heading={
                <>
                  <Eyebrow>Your toolkit</Eyebrow>
                  <Heading className="mt-4">
                    Tools you&apos;ll <span className="text-gradient">master</span>
                  </Heading>
                </>
              }
            />
          </div>
        </div>
      </section>
    );
  }
  return (
    // Same backdrop as the course hero: grid, glows and drifting colour orbs.
    <section id="tools" className="relative isolate scroll-mt-24 overflow-clip bg-hero-950 text-white">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div className="orb absolute -left-40 -top-40 -z-10 size-[36rem] animate-aurora [--orb:color-mix(in_srgb,var(--color-brand)_50%,transparent)]" />
      <div className="orb absolute -bottom-52 -right-20 -z-10 size-[34rem] animate-aurora [--orb:color-mix(in_srgb,var(--color-cyan)_18%,transparent)] [animation-delay:-8s]" />
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <ToolOrbit
          hub={hubLabel(course.label)}
          tools={tools}
          heading={
            <>
              <Eyebrow dark>Skills & stack</Eyebrow>
              <Heading dark className="mt-4">
                Core skills & <span className="text-gradient">technologies</span>
              </Heading>
            </>
          }
        />
      </div>
    </section>
  );
}

const audiences = [
  {
    title: "Students after 12th",
    text: "Join from any stream. You start from the fundamentals with no assumed knowledge, alongside college if you need to.",
  },
  {
    title: "Graduates and final-year students",
    text: "Walk into placement season with project work to show instead of a blank CV.",
  },
  {
    title: "Working professionals",
    text: "Evening and weekend batches let you add the skill, or switch careers, without leaving your current job.",
  },
  {
    title: "Business owners and freelancers",
    text: "Learn enough to do the work yourself — or to judge the people you hire to do it.",
  },
  {
    title: "Career restarters",
    text: "A gap on the CV counts for less than work you can point at. You finish with a portfolio and a certificate.",
  },
  {
    title: "Self-taught learners",
    text: "If free videos left you with notes but nothing built, a trainer reviewing your work each week changes that.",
  },
];

export function CourseAudience({ course }: { course: Course }) {
  // Courses with a content brief carry their own list.
  const items = course.guide?.audience.items ?? audiences;
  return (
    <LightSection id="who-can-join">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Eligibility</Eyebrow>
        <Heading className="mt-5">
          Who can do <span className="text-gradient">this course</span>
        </Heading>
        <p data-reveal className="mt-6 text-lg text-slate-600">
          {course.guide?.audience.intro ||
            `The ${course.label} batch is deliberately mixed. What matters more than your background is turning up and finishing what each module asks you to build.`}
        </p>
      </div>
      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <div
            key={a.title}
            className="rounded-[1.75rem] border border-slate-100 bg-gradient-to-br from-white to-sky/10 p-7 shadow-xl shadow-hero-950/5"
          >
            <span className="font-display text-sm font-extrabold text-brand">{pad(i + 1)}</span>
            <h3 className="mt-4 font-display text-xl font-bold text-navy">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.text}</p>
          </div>
        ))}
      </div>
    </LightSection>
  );
}

export function CourseProjects({ course }: { course: Course }) {
  if (course.projects.length === 0) return null;
  return (
    <DarkSection id="projects">
      <Eyebrow dark>Portfolio</Eyebrow>
      <Heading dark className="mt-5">
        Hands-on projects <span className="text-gradient">you will ship</span>
      </Heading>
      <div data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {course.projects.map((p, i) => (
          <article
            key={p.title}
            data-spot
            className="flex flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-sun">
              Project {pad(i + 1)}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{p.text}</p>
            {p.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </DarkSection>
  );
}

const certificateItems = [
  { icon: Award, title: "Course certificate", text: "Awarded when you complete the programme and its assessments." },
  { icon: FileText, title: "Internship letter", text: "Issued on the longer programmes, based on your project work." },
  { icon: FolderGit2, title: "Project portfolio", text: "Reviewed work you can open and explain in any interview." },
  { icon: Briefcase, title: "Placement support", text: "Resume rebuild, mock interviews and hiring-partner introductions." },
];

/** Certificate, plus the job role and employers when the course has them. */
export function CourseOutcomes({ course }: { course: Course }) {
  return (
    <section id="outcomes" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Certification & career</Eyebrow>
            <Heading className="mt-5">
              Where this course <span className="text-gradient">takes you</span>
            </Heading>
          </div>
          <p data-reveal className="max-w-md text-lg text-slate-600">
            Finish with proof of what you can do — and a placement cell that
            keeps working until you are hired.
          </p>
        </div>

        <div data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certificateItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        {course.role && (
          <div
            data-reveal
            className="relative isolate mt-5 grid gap-8 overflow-hidden rounded-[2rem] bg-hero-950 p-8 text-white sm:p-10 lg:grid-cols-2"
          >
            <div className="bg-grid-dark absolute inset-0 -z-10" />
            <div className="glow-dark absolute inset-0 -z-10" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan">
                Role this prepares you for
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                {course.role.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-slate-300">{course.role.text}</p>
            </div>
            {course.hiredBy.length > 0 && (
              <div>
                <p className="flex items-center gap-2 font-display font-bold">
                  <Building2 className="size-4 text-cyan" /> Where graduates get hired
                </p>
                <ul className="mt-4 space-y-3 text-slate-200">
                  {course.hiredBy.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-cyan text-hero-950">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function CourseFaq({ course }: { course: Course }) {
  return (
    <LightSection id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>FAQs</Eyebrow>
          <Heading className="mt-5">
            {course.label}:
            <br />
            <span className="text-gradient">common questions</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg text-slate-600">
            Still unsure? A ten-minute call with a counsellor usually settles it
            faster than any brochure.
          </p>
          <NavLink
            data-reveal
            href={site.phoneHref}
            className="mt-6 inline-block font-display text-lg font-bold text-brand hover:text-navy"
          >
            {site.phone}
          </NavLink>
        </div>
        <div className="space-y-3">
          {course.faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-2xl border border-slate-200 bg-white transition-colors open:border-brand/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-[17px] font-bold text-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </LightSection>
  );
}

export function RelatedCourses({ course }: { course: Course }) {
  if (course.related.length === 0) return null;
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy lg:text-3xl">
            More in {course.category.label}
          </h2>
          <Link
            href={course.category.href}
            className="group inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-navy"
          >
            Browse all
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          {course.related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-navy transition-all duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.5)]"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-base font-bold tracking-tight">
                  {r.label}
                </span>
                <span className="mt-1 block truncate text-xs text-slate-500">
                  {site.city} · Live projects
                </span>
              </span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
