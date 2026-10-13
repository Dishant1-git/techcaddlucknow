import { NavLink } from "./NavLink";
import Link from "next/link";
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
  Plus,
} from "lucide-react";
import type { Course } from "@/lib/courses";
import { included, site, stats } from "@/lib/site";
import { isLight, techLogos } from "@/lib/techLogos";
import { BookDemoButton } from "./Enquiry";
import { DarkSection, Eyebrow, Heading, LightSection } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

const heroPoints = [
  "Live projects",
  "Practitioner trainers",
  "Placement support",
  "Certificate + internship",
];

export function CourseHero({ course }: { course: Course }) {
  return (
    <section id="top" className="relative isolate overflow-clip bg-hero-950 text-white">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div className="orb absolute -left-40 -top-40 -z-10 size-[36rem] animate-aurora [--orb:rgba(28,83,209,0.5)]" />
      <div className="orb absolute -bottom-52 -right-20 -z-10 size-[34rem] animate-aurora [--orb:rgba(0,212,255,0.18)] [animation-delay:-8s]" />

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

        <div className="rise mt-8 flex flex-wrap items-center gap-3 [--d:.05s]">
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

export function CourseSyllabus({ course }: { course: Course }) {
  const count = course.modules.length;
  return (
    <section id="syllabus" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Syllabus</Eyebrow>
          <Heading className="mt-5">
            What you will
            <br />
            <span className="text-gradient">actually build</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            {course.syllabusIntro ||
              `${count} modules, each ending with something you can demonstrate. The final work becomes part of your portfolio.`}
          </p>
          <p data-reveal className="mt-6 text-sm font-semibold text-slate-500">
            {count} modules{course.duration ? ` · ${course.duration}` : ""}
          </p>
        </div>

        <div className="space-y-3">
          {course.modules.map((m, i) => (
            <details
              key={`${i}-${m.title}`}
              open={i === 0}
              className="group rounded-2xl border border-slate-200 bg-white transition-colors open:border-brand/30"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-sm font-extrabold text-brand">{pad(i + 1)}</span>
                <span className="flex-1 font-display text-[17px] font-bold text-navy">
                  {m.title}
                </span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <ul className="space-y-2.5 px-5 pb-6 pl-14 text-slate-600 sm:px-6 sm:pl-[3.75rem]">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
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
  return (
    <LightSection id="who-can-join">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Eligibility</Eyebrow>
        <Heading className="mt-5">
          Who can do <span className="text-gradient">this course</span>
        </Heading>
        <p data-reveal className="mt-6 text-lg text-slate-600">
          The {course.label} batch is deliberately mixed. What matters more than
          your background is turning up and finishing what each module asks you
          to build.
        </p>
      </div>
      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((a, i) => (
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
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
