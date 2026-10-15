import { NavLink } from "./NavLink";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Box,
  Briefcase,
  Check,
  Code,
  GraduationCap,
  Megaphone,
  MoveRight,
  Phone,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Terminal,
  Users,
} from "lucide-react";
import {
  aiTracks,
  courseTracks,
  fields,
  googleReviews,
  included,
  programmes,
  site,
  steps,
  testimonials,
  totalCourses,
  whyUs,
} from "@/lib/site";
import { BookDemoButton, EnquiryForm } from "./Enquiry";
import { DarkSection, Eyebrow, GoogleG, Heading, LightSection, SectionHeading } from "./ui";

const fieldIcons = {
  sparkles: Sparkles,
  code: Code,
  shield: Shield,
  megaphone: Megaphone,
  box: Box,
  terminal: Terminal,
};

const stepIcons = [Users, Code, Rocket, Briefcase];

const pad = (n: number) => String(n).padStart(2, "0");

export function AiSection() {
  return (
    // Pulled up so the stats card straddles the hero and this section.
    <DarkSection id="ai" className="-mt-44 pt-36">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow dark>
            AI at {site.name} {site.city}
          </Eyebrow>
          <Heading dark className="mt-5">
            The skills every job description <span className="text-gradient">now asks for</span>
          </Heading>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Artificial intelligence stopped being a specialisation — it is
            becoming baseline literacy. Our AI tracks are rebuilt every quarter
            so what you learn matches what is shipping right now.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <NavLink
              href="/#courses"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-7 py-3.5 font-bold text-hero-950 shadow-[0_0_40px_-10px] shadow-cyan transition hover:brightness-110"
            >
              Explore AI courses
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
            <BookDemoButton className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold transition hover:border-white/40">
              Talk to a counsellor
            </BookDemoButton>
          </div>
        </div>

        <div className="relative">
          <span className="absolute bottom-10 left-[2.15rem] top-10 w-px bg-gradient-to-b from-cyan via-sky to-transparent" />
          <div data-stagger className="space-y-4">
            {aiTracks.map((t, i) => (
              <div
                key={t.title}
                data-spot
                className="group flex gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-cyan/40 sm:p-7"
              >
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-cyan/40 bg-hero-900 font-display text-sm font-extrabold text-cyan transition-colors group-hover:bg-cyan group-hover:text-hero-950">
                  {pad(i + 1)}
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sun">
                    {t.audience}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">{t.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">{t.text}</p>
                </div>
                <ArrowUpRight className="ml-auto size-5 shrink-0 text-white/20 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DarkSection>
  );
}

/** Large statement whose words light up as it scrolls through the viewport. */
export function Manifesto() {
  return (
    <section className="relative bg-white px-5 pb-24 lg:px-8 lg:pb-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Our method</p>
        <p
          data-scrub-text
          className="mt-6 font-display text-[2rem] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[4.2rem]"
        >
          We don&apos;t teach a syllabus. We build engineers — one live project,
          one mentor and one offer letter at a time.
        </p>
      </div>
    </section>
  );
}

const bandWords = [
  "Artificial Intelligence",
  "Full Stack",
  "Data Science",
  "Cyber Security",
  "Cloud & DevOps",
  "Digital Marketing",
  "CAD / CAM",
];

/** Two oversized rows of course names that slide in opposite directions on scroll. */
export function ScrollBand() {
  const row = [...bandWords, ...bandWords];
  return (
    <div
      aria-hidden
      className="overflow-clip bg-hero-950 pt-16 font-display text-[13vw] font-extrabold uppercase leading-[0.95] tracking-tighter text-white lg:pt-24 lg:text-[7.5vw]"
    >
      <div data-scroll-x="1" className="flex w-max items-center gap-[0.4em] whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-[0.4em]">
            {w} <span className="hex inline-block size-[0.35em] bg-cyan" />
          </span>
        ))}
      </div>
      <div
        data-scroll-x="-1"
        className="text-outline flex w-max items-center gap-[0.4em] whitespace-nowrap"
      >
        {[...row].reverse().map((w, i) => (
          <span key={i} className="flex items-center gap-[0.4em]">
            {w} <span className="hex inline-block size-[0.35em] bg-sun" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Programmes() {
  return (
    <DarkSection id="programmes">
      <SectionHeading
        dark
        eyebrow="Training programmes"
        title={
          <>
            Pick the length that <span className="text-gradient">fits your year</span>
          </>
        }
        text="Summer training, a university requirement, or a full career switch — the same trainers and the same live-project method, scaled to your time."
      />
      <div data-stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {programmes.map((p, i) => (
          <div key={p.duration} className={p.popular ? "lg:-mt-6" : ""}>
            <div
              data-tilt
              data-spot
              className={`relative flex h-full flex-col rounded-3xl p-7 [--spot:rgba(255,255,255,0.14)] ${
                p.popular
                  ? "bg-gradient-to-b from-sky to-brand shadow-[0_30px_80px_-20px] shadow-sky/70"
                  : "border-glow bg-white/[0.05]"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-sun px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-hero-950">
                  Most popular
                </span>
              )}
              <span className="font-display text-xs font-bold text-white/40">{pad(i + 1)}</span>
              <p
                className={`mt-3 font-display text-[2.6rem] font-extrabold leading-none tracking-tight ${
                  p.popular ? "text-white" : "text-gradient"
                }`}
              >
                {p.duration}
              </p>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.text}</p>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-white/10 pt-5 text-sm text-slate-200">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-cyan" /> {pt}
                  </li>
                ))}
              </ul>
              <BookDemoButton
                className={`group mt-7 inline-flex items-center justify-between rounded-full border px-5 py-3 text-sm font-bold transition-colors ${
                  p.popular
                    ? "border-white/30 bg-white text-brand"
                    : "border-white/15 text-white hover:border-cyan hover:text-cyan"
                }`}
              >
                Programme details
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </BookDemoButton>
            </div>
          </div>
        ))}
      </div>
    </DarkSection>
  );
}

export function Process() {
  return (
    <LightSection id="process">
      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            From first phone call
            <br />
            to <span className="text-gradient">first offer letter</span>
          </>
        }
        text="A deliberately simple path. No hidden steps, no upsells halfway through — you always know what the next four weeks look like."
      />
      <div className="relative mt-20">
        <span className="absolute inset-x-[12%] top-8 hidden h-px bg-slate-200 lg:block" />
        <span
          data-draw-x
          className="absolute inset-x-[12%] top-8 hidden h-0.5 bg-gradient-to-r from-cyan via-violet-500 to-emerald-400 lg:block"
        />
        <div data-stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={s.title} className="group relative">
                <span
                  className={`relative mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br ${s.color} font-display text-xl font-extrabold text-white shadow-lg ring-8 ring-white transition-transform duration-500 group-hover:scale-110`}
                >
                  {pad(i + 1)}
                </span>
                <div className="relative mt-8 overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5 transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  <span
                    className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${s.color} transition-transform duration-500 group-hover:scale-x-100`}
                  />
                  <span
                    className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                    {s.when}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LightSection>
  );
}

/** Pinned on desktop: the card row scrolls sideways as the page scrolls down. */
export function Fields() {
  return (
    <section id="fields" className="relative isolate overflow-clip bg-hero-950 text-white">
      <div className="bg-grid-dark absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div data-hscroll className="flex flex-col justify-center py-20 lg:h-screen lg:pb-6 lg:pt-24">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-5 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow dark>What you can learn</Eyebrow>
            <Heading dark className="mt-4 lg:text-[2.4rem]">
              Six fields, one campus in <span className="text-gradient">{site.city}</span>
            </Heading>
          </div>
          <p className="hidden items-center gap-3 text-sm font-semibold text-slate-400 lg:flex">
            Keep scrolling <MoveRight className="size-5 text-cyan" />
          </p>
        </div>

        <div className="no-scrollbar mt-8 overflow-x-auto lg:overflow-visible">
          <div
            data-hscroll-track
            className="flex w-max gap-6 px-5 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {fields.map((f, i) => {
              const Icon = fieldIcons[f.icon];
              return (
                <NavLink
                  key={f.title}
                  href="/#courses"
                  data-hscroll-item
                  data-spot
                  className="border-glow group relative flex h-[21rem] w-[18.5rem] shrink-0 flex-col overflow-hidden rounded-[2rem] bg-white/[0.05] p-8 sm:w-[25rem] lg:h-[max(18.5rem,min(23rem,44vh))]"
                >
                  <span className="absolute -right-2 -top-6 font-display text-[9rem] font-extrabold leading-none text-white/[0.05] transition-colors duration-500 group-hover:text-cyan/15">
                    {pad(i + 1)}
                  </span>
                  <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-brand text-white shadow-lg shadow-cyan/30 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-auto font-display text-2xl font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan">
                    Explore track
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
                  </span>
                </NavLink>
              );
            })}
            <NavLink
              href="/courses"
              data-hscroll-item
              className="group flex h-[21rem] w-[18.5rem] shrink-0 flex-col justify-between rounded-[2rem] bg-gradient-to-br from-cyan to-brand p-8 sm:w-[25rem] lg:h-[max(18.5rem,min(23rem,44vh))]"
            >
              <span className="font-display text-6xl font-extrabold">{totalCourses}</span>
              <span>
                <span className="block font-display text-2xl font-bold">Browse all courses</span>
                <span className="mt-4 grid size-12 place-items-center rounded-full bg-white text-brand transition-transform group-hover:translate-x-2">
                  <ArrowRight className="size-5" />
                </span>
              </span>
            </NavLink>
          </div>
        </div>

        <div className="mx-auto mt-8 hidden w-full max-w-7xl px-8 lg:block">
          <div className="h-px bg-white/10">
            <div data-hscroll-bar className="h-px origin-left bg-gradient-to-r from-cyan to-sky" />
          </div>
        </div>
      </div>
    </section>
  );
}

const badgeColors: Record<string, string> = {
  Hot: "bg-sun text-hero-950",
  Trending: "bg-cyan text-hero-950",
  New: "bg-white text-brand ring-1 ring-brand/20",
};

// Asymmetric bento layout: wide cards are the dark, featured ones.
const bentoSpans = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function CourseTracks() {
  return (
    <LightSection id="courses">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Course categories</Eyebrow>
          <Heading className="mt-5">
            Find your perfect
            <br />
            <span className="text-gradient">course track</span>
          </Heading>
        </div>
        <p data-reveal className="max-w-md text-lg text-slate-600">
          Six fields, {totalCourses} courses between them. Pick the work you
          want to be doing and we will map the route.
        </p>
      </div>

      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {courseTracks.map((t, i) => {
          const featured = bentoSpans[i] === "lg:col-span-4";
          return (
            <div
              key={t.title}
              data-spot
              className={`group relative flex flex-col overflow-hidden rounded-[2rem] p-7 transition duration-500 hover:-translate-y-1.5 sm:p-8 ${bentoSpans[i]} ${
                featured
                  ? "bg-hero-950 text-white shadow-2xl shadow-hero-950/30"
                  : "border border-slate-100 bg-gradient-to-br from-white to-sky/10 shadow-xl shadow-hero-950/5 [--spot:rgba(47,125,255,0.12)] hover:shadow-2xl"
              }`}
            >
              {featured && (
                <>
                  <div className="bg-grid-dark absolute inset-0" />
                  <div className="glow-dark absolute inset-0" />
                </>
              )}
              <span
                className={`pointer-events-none absolute -top-4 right-4 font-display text-[6.5rem] font-extrabold leading-none transition-transform duration-700 group-hover:-translate-x-3 ${
                  featured ? "text-white/[0.06]" : "text-navy/[0.05]"
                }`}
              >
                {t.ghost}
              </span>
              <div className="relative flex items-center gap-3">
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
                    featured ? "text-cyan" : "text-slate-500"
                  }`}
                >
                  {t.tag}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${badgeColors[t.badge]}`}
                >
                  {t.badge}
                </span>
              </div>
              <h3
                className={`relative mt-8 font-display text-2xl font-bold ${
                  featured ? "sm:text-3xl" : "text-navy"
                }`}
              >
                {t.title}
              </h3>
              <p
                className={`relative mt-2 max-w-md text-sm leading-relaxed ${
                  featured ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {t.text}
              </p>
              <ul className="relative mt-5 flex flex-1 flex-wrap content-start gap-2">
                {t.courses.map((c) => (
                  <li
                    key={c}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      featured
                        ? "border border-white/10 bg-white/5 text-slate-200"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="relative mt-7 flex items-end justify-between">
                <p className="font-display text-sm font-bold">
                  <span className={`text-3xl ${featured ? "text-white" : "text-navy"}`}>
                    {t.count}
                  </span>{" "}
                  <span className={featured ? "text-slate-400" : "text-slate-500"}>courses</span>
                </p>
                <BookDemoButton
                  className={`grid size-12 place-items-center rounded-full transition duration-500 group-hover:rotate-45 ${
                    featured
                      ? "bg-gradient-to-br from-cyan to-sky text-hero-950"
                      : "bg-navy text-white group-hover:bg-brand"
                  }`}
                >
                  <ArrowUpRight className="size-5" />
                  <span className="sr-only">Enquire about {t.title}</span>
                </BookDemoButton>
              </div>
            </div>
          );
        })}
      </div>
    </LightSection>
  );
}

/** Sticky heading on the left; cards stack and recede on the right. */
export function WhyUs() {
  return (
    <DarkSection id="why">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow dark>Why {site.name}</Eyebrow>
          <Heading dark className="mt-5">
            Four things that <span className="text-gradient">change the outcome</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
            Any training centre can list a syllabus. These are the parts that
            decide whether you actually land a job.
          </p>
          <div data-reveal className="mt-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Included with every course
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium"
                >
                  <Check className="size-4 text-cyan" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-stack className="space-y-6">
          {whyUs.map((w, i) => (
            <div
              key={w.title}
              style={{ top: `calc(7.5rem + ${i * 1.1}rem)` }}
              className="border-glow sticky origin-top overflow-hidden rounded-[2rem] bg-hero-900 p-8 shadow-2xl shadow-black/50 sm:p-10"
            >
              <div className="orb absolute -right-24 -top-24 size-72 [--orb:rgba(47,125,255,0.35)]" />
              <div className="relative flex items-start justify-between gap-6">
                <p className="text-shine font-display text-6xl font-extrabold tracking-tight sm:text-7xl">
                  {w.stat}
                </p>
                <span className="font-display text-sm font-bold text-white/30">
                  {pad(i + 1)} / {pad(whyUs.length)}
                </span>
              </div>
              <p className="relative mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
                {w.statLabel}
              </p>
              <h3 className="relative mt-8 font-display text-2xl font-bold">{w.title}</h3>
              <p className="relative mt-3 max-w-xl leading-relaxed text-slate-300">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}

function ReviewCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="w-[22rem] shrink-0 rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 text-sun">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-1 pl-1.5 pr-2.5 text-[11px] font-bold text-slate-700">
          <GoogleG className="size-4" />
          Verified
          <BadgeCheck className="size-3.5 fill-sky text-white" />
        </span>
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-700">{t.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-sky to-brand text-white">
          <GraduationCap className="size-5" />
        </span>
        <span>
          <span className="block font-bold text-navy">{t.name}</span>
          <span className="block text-xs text-slate-500">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rows = [testimonials.slice(0, 3), testimonials.slice(3)];
  return (
    <section id="reviews" className="relative overflow-clip bg-slate-50 py-20 lg:py-32">
      <div className="px-5">
        <SectionHeading
          eyebrow="Student stories"
          title={
            <>
              What our <span className="text-gradient">students say</span>
            </>
          }
          text="Placements happen because of project work, not because of promises."
        />
        <div data-reveal="scale" className="mt-8 flex justify-center">
          <NavLink
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-3xl border border-slate-200 bg-white py-3 pl-4 pr-3 shadow-xl shadow-hero-950/5 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-2xl sm:rounded-full"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-slate-50">
                <GoogleG className="size-6" />
              </span>
              <span className="text-left leading-tight">
                <span className="flex items-center gap-1.5 font-display font-bold text-navy">
                  Google Verified
                  <BadgeCheck className="size-4 fill-sky text-white" />
                </span>
                <span className="block text-xs text-slate-500">
                  {site.name} {site.city}
                </span>
              </span>
            </span>
            <span className="hidden h-9 w-px bg-slate-200 sm:block" />
            <span className="flex items-center gap-2.5">
              <span className="font-display text-2xl font-extrabold text-navy">
                {googleReviews.rating.toFixed(1)}
              </span>
              <span className="text-left leading-tight">
                <span className="flex gap-0.5 text-sun">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                <span className="block text-xs text-slate-500">
                  from {googleReviews.count}+ reviews
                </span>
              </span>
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-navy text-white transition duration-300 group-hover:rotate-45 group-hover:bg-brand">
              <ArrowUpRight className="size-4" />
              <span className="sr-only">Read our reviews on Google</span>
            </span>
          </NavLink>
        </div>
      </div>
      <div data-reveal className="mask-x mt-14 space-y-6">
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden py-2">
            <div
              className={`flex w-max animate-marquee gap-6 pr-6 hover:[animation-play-state:paused] ${
                r === 1 ? "[animation-direction:reverse]" : ""
              }`}
            >
              {[...row, ...row, ...row, ...row].map((t, i) => (
                <ReviewCard key={i} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Closing enquiry block; on a course page, pass the course to preselect it. */
export function Cta({ course }: { course?: string }) {
  return (
    <section id="contact" className="bg-slate-50 px-3 pb-6 pt-4 sm:px-5">
      <div className="relative isolate mx-auto max-w-[90rem] overflow-clip rounded-[2.5rem] bg-hero-950 px-5 py-16 text-white sm:px-10 lg:px-16 lg:py-24">
        <div className="bg-grid-dark absolute inset-0 -z-10" />
        <div className="orb absolute -left-40 -top-40 -z-10 size-[40rem] animate-aurora [--orb:rgba(28,83,209,0.55)]" />
        <div className="orb absolute -bottom-52 right-0 -z-10 size-[40rem] animate-aurora [--orb:rgba(0,212,255,0.22)] [animation-delay:-8s]" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow dark>Ready to get started?</Eyebrow>
            <Heading dark className="mt-6 lg:text-[3.5rem]">
              Start building
              <br />
              your <span className="text-gradient">career today.</span>
            </Heading>
            <ul data-stagger className="mt-8 space-y-3 text-slate-200">
              {["Free career counselling", "No registration fee", "Placement support included"].map(
                (b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full bg-cyan text-hero-950">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ),
              )}
            </ul>
            <NavLink
              href={site.phoneHref}
              data-magnetic
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-bold backdrop-blur transition-colors hover:border-cyan"
            >
              <span className="grid size-8 place-items-center rounded-full bg-cyan text-hero-950">
                <Phone className="size-4" />
              </span>
              Call now · {site.phone}
            </NavLink>
          </div>

          <div
            data-reveal="scale"
            className="border-glow relative rounded-3xl bg-gradient-to-br from-brand to-sky p-8 shadow-[0_40px_100px_-30px] shadow-sky sm:p-10"
          >
            <h3 className="font-display text-2xl font-bold tracking-tight">Book your free demo</h3>
            <p className="mt-2 text-sm text-white/85">
              Leave your number and a counsellor will call you back.
            </p>
            {/* Keyed so moving to another course page resets the selection. */}
            <EnquiryForm key={course} defaultCourse={course} className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
