import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Play, Quote } from "lucide-react";
import {
  chapters,
  founder,
  founderRoles,
  founderStats,
  instagramProfile,
  reels,
  stagePhotos,
} from "@/lib/about";
import { site } from "@/lib/site";
import { FounderTestimonials } from "./FounderTestimonials";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "./ui";

const external = { target: "_blank", rel: "noopener noreferrer" };

/** Two-column content for the page banner: introduction left, portrait right. */
export function FounderIntro() {
  return (
    <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="rise flex flex-wrap items-center gap-x-3 gap-y-1 [--d:.1s]">
          <span className="font-display text-lg font-bold">{founder.name}</span>
          <span className="h-4 w-px bg-white/25" />
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">
            {founder.role}
          </span>
        </p>
        <h1 className="rise mt-6 font-display text-[2.25rem] font-extrabold leading-[1.04] tracking-tight [--d:.2s] sm:text-5xl lg:text-6xl">
          Inspiring Careers,
          <br />
          Building Skills,
          <br />
          <span className="text-shine">Creating Futures.</span>
        </h1>
        <p className="rise mt-6 max-w-xl text-base leading-relaxed text-slate-300 [--d:.3s] sm:text-lg">
          Empowering students with practical skills, industry exposure, and the
          confidence to build successful careers in technology.
        </p>
        <ul className="rise mt-8 flex flex-wrap gap-2.5 [--d:.4s]">
          {founder.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="rise relative mx-auto w-full max-w-md [--d:.3s] lg:max-w-none">
        <div
          aria-hidden
          className="absolute -inset-3 rounded-[2.25rem] border border-cyan/30 [transform:rotate(3deg)]"
        />
        <div className="border-glow relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-hero-900 shadow-2xl shadow-hero-950/60">
          <Image
            src={founder.portrait}
            alt={`${founder.name}, founder of ${site.name}, speaking to students with a microphone`}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero-950 via-hero-950/70 to-transparent p-6 pt-20">
            <p className="font-display text-xl font-bold">{founder.name}</p>
            <p className="text-sm text-slate-300">Builder · Educator · Mentor</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MeetFounder() {
  return (
    <LightSection id="about">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal="left" className="relative">
          <div
            data-speed="0.25"
            className="absolute -left-3 -top-3 hidden h-full w-full rounded-[2rem] border border-brand/30 sm:block"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-hero-950/20">
            <Image
              src={founder.about}
              alt={`${founder.name}, founder of ${site.name}, smiling in a white shirt`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div>
          <Eyebrow>About</Eyebrow>
          <Heading className="mt-5">
            Meet <span className="text-gradient">{founder.name}</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg font-medium leading-relaxed text-navy">
            Every successful journey begins with a dream, but only a few are built
            through relentless hard work, courage and the determination to never
            give up.
          </p>
          <p data-reveal className="mt-4 leading-relaxed text-slate-600">
            {founder.name} is an entrepreneur, mentor and career coach whose life
            journey is a powerful example of resilience, self-belief and the
            transformative power of education. From facing financial challenges and
            driving an auto to complete his engineering education, to building an
            organization from the ground up, his story reflects a simple yet
            powerful belief: your circumstances may shape your beginning, but your
            determination shapes your future.
          </p>
          <p data-reveal className="mt-4 leading-relaxed text-slate-600">
            Today, he is recognized for his entrepreneurial vision, commitment to
            skill-based education and passion for helping students and aspiring
            professionals discover their potential.
          </p>

          <blockquote
            data-reveal
            className="relative mt-8 rounded-2xl border border-slate-100 bg-white p-6 pl-16 shadow-xl shadow-hero-950/5"
          >
            <Quote className="absolute left-5 top-6 size-7 fill-brand/10 text-brand" />
            <p className="font-display text-lg font-semibold leading-relaxed text-navy">
              A certificate proves attendance. A portfolio proves capability. We
              build the second one.
            </p>
          </blockquote>

          <div data-reveal className="mt-8">
            <a
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
            >
              Explore the courses <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <dl
        data-reveal="scale"
        className="mt-16 grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-hero-950/10 lg:grid-cols-4"
      >
        {founderStats.map((s) => (
          <div
            key={s.label}
            className="border-b border-r border-slate-100 p-6 last:border-r-0 sm:p-8 lg:border-b-0"
          >
            <dd className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-[2.6rem]">
              {s.value}
            </dd>
            <dt className="mt-1 text-sm text-slate-600 sm:text-base">{s.label}</dt>
          </div>
        ))}
      </dl>
    </LightSection>
  );
}

/** Looping strip of stage photos; pauses under the pointer. */
export function StageReel() {
  return (
    <section aria-label={`${founder.name} on stage`} className="overflow-hidden bg-white pb-20 lg:pb-28">
      <div className="mask-x flex overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 pr-5 hover:[animation-play-state:paused]">
          {[...stagePhotos, ...stagePhotos, ...stagePhotos, ...stagePhotos].map((p, i) => (
            <div
              key={i}
              className="relative aspect-[3/2] w-[min(30rem,78vw)] shrink-0 overflow-hidden rounded-3xl bg-slate-200"
            >
              <Image
                src={p.src}
                // Only the first set is announced; the repeats are decorative.
                alt={i < stagePhotos.length ? p.alt : ""}
                fill
                sizes="(min-width: 640px) 30rem, 78vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Roles() {
  return (
    <DarkSection>
      <SectionHeading
        dark
        eyebrow="The founder"
        title={
          <>
            Four roles, <span className="text-gradient">one purpose</span>
          </>
        }
      />
      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {founderRoles.map((r, i) => (
          <article
            key={r.title}
            data-spot
            className="border-glow relative rounded-3xl bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-1.5 hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan to-brand font-display font-bold">
                {i + 1}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">
                {r.label}
              </span>
            </div>
            <h3 className="mt-6 font-display text-xl font-bold">{r.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{r.text}</p>
          </article>
        ))}
      </div>
    </DarkSection>
  );
}

export function Story() {
  return (
    <LightSection id="journey">
      <SectionHeading
        eyebrow={`The journey behind ${site.name}`}
        title={
          <>
            From driving an auto to{" "}
            <span className="text-gradient">building {site.name}</span>
          </>
        }
        text="Scroll through the story, one chapter at a time."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
        {/* Chapter rail: stays in view while the chapters scroll past */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <nav aria-label="Chapters">
            <ol className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-slate-200 lg:px-0">
              {chapters.map((c) => (
                <li key={c.id} className="shrink-0">
                  <a
                    href={`#chapter-${c.id}`}
                    className="group flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand hover:text-brand lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:bg-transparent lg:py-3 lg:pl-5 lg:font-display lg:text-lg lg:hover:border-brand"
                  >
                    {c.marker}
                    <ArrowRight className="hidden size-4 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <p className="mt-8 hidden font-display text-xl font-bold leading-snug text-navy lg:block">
            Where you begin does not define{" "}
            <span className="text-gradient">where you can go.</span>
          </p>
        </aside>

        <div className="space-y-8">
          {chapters.map((c, i) => (
            <article
              key={c.id}
              id={`chapter-${c.id}`}
              data-reveal
              className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-hero-950/5"
            >
              <div className="relative aspect-[16/9] bg-slate-200 sm:aspect-[21/9]">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55rem, 100vw"
                  className="object-cover object-[50%_25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hero-950/85 via-hero-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    <span className="text-cyan">{c.label}</span>
                    <span className="mx-2 opacity-50">·</span>
                    {founder.name}
                  </p>
                  <p className="font-display text-4xl font-extrabold leading-none tracking-tight sm:text-6xl">
                    {i === 0 ? "Start" : c.marker}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-10">
                {i === 0 && (
                  <p className="mb-3 text-sm font-semibold text-brand">
                    Before {site.name} · Driving an auto through engineering
                  </p>
                )}
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                  {c.title}
                </h3>
                <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
                  {c.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {c.list && (
                  <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {c.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[15px] font-medium text-slate-700"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {c.principles && (
                  <ol className="mt-6 space-y-3">
                    {c.principles.map((p, n) => (
                      <li
                        key={p.title}
                        className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-navy font-display text-sm font-bold text-white">
                          {n + 1}
                        </span>
                        <div>
                          <p className="font-display font-bold text-navy">{p.title}</p>
                          <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                            {p.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {c.quote && (
                  <blockquote className="relative isolate mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-hero-900 p-7 text-white">
                    <div className="bg-grid-dark absolute inset-0 -z-10" />
                    <Quote className="size-7 fill-white/15 text-cyan" />
                    <p className="mt-3 font-display text-xl font-bold leading-snug">
                      “{c.quote}”
                    </p>
                  </blockquote>
                )}

                {c.after && (
                  <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
                    {c.after.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </LightSection>
  );
}

export function Leadership() {
  return (
    <DarkSection className="text-center">
      <h2
        data-split
        className="mx-auto max-w-4xl font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
      >
        A Leader Who Inspires <span className="text-gradient">Beyond the Workplace</span>
      </h2>
      <p data-reveal className="mx-auto mt-8 max-w-3xl leading-relaxed text-slate-300">
        From his early struggles while completing engineering education to building{" "}
        {site.name} through hands-on effort, {founder.name}&apos;s journey continues
        to inspire the people associated with him.
      </p>
      <p data-reveal className="mx-auto mt-4 max-w-3xl leading-relaxed text-slate-300">
        These words of appreciation reflect the values he strives to bring to his
        professional relationships: trust, mentorship, perseverance, innovation and
        the belief that every individual has the potential to achieve more.
      </p>
      <blockquote
        data-reveal="scale"
        className="border-glow relative mx-auto mt-12 max-w-4xl rounded-[2rem] bg-white/[0.05] px-6 py-10 sm:px-12 sm:py-14"
      >
        <Quote className="mx-auto size-9 fill-cyan/15 text-cyan" />
        <p
          data-scrub-text
          className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight sm:text-4xl"
        >
          “True leadership is not just about building an organization; it is about
          building people who believe they can achieve extraordinary things.”
        </p>
      </blockquote>
    </DarkSection>
  );
}

export function Appreciation() {
  return (
    <section className="overflow-clip bg-slate-50 py-20 lg:py-32">
      <div className="px-5">
        <SectionHeading
          eyebrow="Testimonials & Words of Appreciation"
          title={
            <>
              What People Say About <span className="text-gradient">{founder.name}</span>
            </>
          }
          text="A leader’s true impact is reflected not only in the organization they build, but also in the people they inspire, guide and empower."
        />
        <p data-reveal className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-slate-600">
          {founder.name}&apos;s journey as an entrepreneur, mentor and career coach has
          touched the lives of colleagues, franchise partners and professionals who
          have worked alongside him. Here are a few words of appreciation from people
          associated with his professional journey.
        </p>
      </div>
      <div data-reveal className="mt-14">
        <FounderTestimonials />
      </div>
    </section>
  );
}

export function Reels() {
  return (
    <DarkSection>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow dark>On Instagram</Eyebrow>
          <Heading dark className="mt-5">
            Life at {site.name}, <span className="text-gradient">reel by reel</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg text-slate-300">
            Classroom sessions, student projects and placement days — drag to browse,
            tap a reel to play it.
          </p>
        </div>
        <a
          href={instagramProfile}
          {...external}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold transition-colors hover:border-cyan"
        >
          See more <ArrowUpRight className="size-4" />
        </a>
      </div>

      <ul
        data-stagger
        className="no-scrollbar -mx-5 mt-12 flex snap-x gap-5 overflow-x-auto px-5 pb-2 lg:-mx-8 lg:px-8"
      >
        {reels.map((url, i) => (
          <li key={url} className="shrink-0 snap-start">
            <a
              href={url}
              {...external}
              aria-label={`Play reel ${i + 1} of ${reels.length} on Instagram`}
              className="group relative isolate flex aspect-[9/16] w-52 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-hero-800 via-brand to-hero-900 p-5 transition duration-500 hover:-translate-y-1.5 hover:border-cyan/60"
            >
              <div className="bg-grid-dark absolute inset-0 -z-10" />
              <div
                className="orb absolute -bottom-16 -right-16 -z-10 size-56 [--orb:rgba(0,212,255,0.35)]"
                style={{ opacity: 0.4 + (i % 3) * 0.3 }}
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
                Reel {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-white/15 backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brand">
                <Play className="size-6 translate-x-0.5 fill-current" />
              </span>
              <span className="flex items-center justify-between text-sm font-semibold">
                Watch on Instagram
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </DarkSection>
  );
}

export function Connect() {
  return (
    <LightSection className="text-center">
      <Eyebrow>Stay in touch</Eyebrow>
      <Heading className="mx-auto mt-5 max-w-3xl">
        Connect with <span className="text-gradient">{founder.name}</span>
      </Heading>
      <p data-reveal className="mx-auto mt-6 max-w-2xl text-lg font-medium text-navy">
        Looking for career guidance, mentorship or inspiration to take the next step
        in your professional journey?
      </p>
      <p data-reveal className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
        Follow {founder.name} for insights on career development, entrepreneurship,
        skill-based education, personal growth and the mindset required to turn
        challenges into opportunities.
      </p>
      <p
        data-reveal
        className="mt-10 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-5xl"
      >
        Learn. Grow. Believe. <span className="text-gradient">Achieve.</span>
      </p>
      <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={founder.instagram}
          {...external}
          data-magnetic
          className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand"
        >
          Follow on Instagram <ArrowUpRight className="size-4" />
        </a>
        <a
          href={founder.linkedin}
          {...external}
          data-magnetic
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
        >
          Connect on LinkedIn <ArrowUpRight className="size-4" />
        </a>
      </div>
      <p data-reveal className="mt-10 text-sm text-slate-500">
        {founder.name} — Inspiring careers. Empowering dreams. Building futures.
      </p>
    </LightSection>
  );
}
