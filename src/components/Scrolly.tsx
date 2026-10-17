import { NavLink } from "./NavLink";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, Check, Code } from "lucide-react";
import { domainHref, internshipDomains } from "@/lib/internshipDomains";
import { programmePanels, site } from "@/lib/site";
import { BookDemoButton } from "./Enquiry";
import { Eyebrow } from "./ui";

// The scroll-driven "story" sections of the homepage. Each one is a tall
// wrapper around a sticky full-screen stage; Motion.tsx scrubs a timeline
// across the wrapper. The extra height is applied only when motion is allowed,
// so reduced-motion visitors get ordinary, static sections.

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const pad = (n: number) => String(n).padStart(2, "0");

/** Track links shown on a programme panel before "+N more" (three on phones). */
const TRACKS_SHOWN = 6;

function ScrollCue({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] ${className}`}
    >
      <span className="grid size-9 animate-float place-items-center rounded-full border border-current/30">
        <ArrowDown className="size-4" />
      </span>
      Keep scrolling
    </p>
  );
}

/** Decorative shapes that drift at different speeds as the stage scrolls. */
function Shape({
  kind,
  className,
  ...rest
}: {
  kind: "hex" | "ring" | "pill" | "dot" | "plus";
  className: string;
} & Record<`data-${string}`, string>) {
  const look = {
    hex: "hex bg-gradient-to-br from-cyan to-brand",
    ring: "rounded-full border-[6px] border-sun",
    pill: "rounded-full bg-gradient-to-r from-sun to-orange-400",
    dot: "rounded-full bg-cyan",
    plus: "rounded-md bg-sky [clip-path:polygon(35%_0,65%_0,65%_35%,100%_35%,100%_65%,65%_65%,65%_100%,35%_100%,35%_65%,0_65%,0_35%,35%_35%)]",
  }[kind];
  return (
    <span aria-hidden {...rest} className={`pointer-events-none absolute ${className}`}>
      <span className={`block size-full animate-float ${look}`} />
    </span>
  );
}

export function HeroZoom() {
  return (
    <section
      id="top"
      data-zoom-hero
      className="relative bg-hero-950 text-white motion-safe:h-[260vh]"
    >
      <div className="sticky top-0 isolate flex h-svh min-h-[34rem] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28 text-center lg:pt-36">
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
        <div className="glow-dark absolute inset-0 -z-10" />
        <div className="orb absolute -left-40 top-10 -z-10 size-[38rem] animate-aurora [--orb:rgba(47,125,255,0.3)]" />
        <div className="orb absolute -right-48 bottom-0 -z-10 size-[42rem] animate-aurora [--orb:rgba(0,212,255,0.2)] [animation-delay:-8s]" />

        <Shape kind="hex" data-hz-float="1" className="left-[7%] top-[24%] size-16 lg:size-24" />
        <Shape kind="ring" data-hz-float="0.5" className="right-[9%] top-[22%] size-14 lg:size-20" />
        <Shape kind="pill" data-hz-float="0.8" className="bottom-[20%] left-[12%] h-6 w-20 -rotate-12 lg:h-8 lg:w-28" />
        <Shape kind="plus" data-hz-float="1.3" className="bottom-[26%] right-[13%] size-10 lg:size-14" />
        <Shape kind="dot" data-hz-float="0.3" className="left-[46%] top-[17%] size-3" />

        <div data-hz-fade>
          <p
            style={delay(0.05)}
            className="rise mx-auto inline-flex flex-wrap items-center justify-center gap-x-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300 backdrop-blur"
          >
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 animate-pulse-ring rounded-full bg-sun" />
              <span className="size-2 rounded-full bg-sun" />
            </span>
            Admissions open · {site.city} · @{site.copyrightYear}
          </p>
        </div>

        <h1 className="mt-6 font-display text-[clamp(2.1rem,min(5.4vw,11.5vh),4.6rem)] font-normal leading-[1.06] tracking-[-0.025em]">
          <span data-hz-left className="block">
            <span style={delay(0.15)} className="rise inline-block">
              Learn <span className="text-shine font-semibold">AI</span>{" "}
              <span className="hex inline-grid size-[0.78em] translate-y-[0.06em] place-items-center bg-gradient-to-br from-cyan to-brand align-baseline">
                <Code className="size-[0.4em] text-hero-950" strokeWidth={3} />
              </span>
            </span>
          </span>
          <span data-hz-right className="block">
            <span style={delay(0.3)} className="rise inline-block">
              Build <span className="font-semibold">software</span>
            </span>
          </span>
        </h1>

        <div data-hz-fade>
          <p
            style={delay(0.45)}
            className="rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {site.city}&apos;s technology partner for AI, software and career-ready
            skills — live projects, real mentors, placement support.
          </p>
          <div
            style={delay(0.6)}
            className="rise mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <BookDemoButton
              data-magnetic
              className="group inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 font-bold text-hero-950 shadow-[0_0_40px_-8px] shadow-sun/60 transition-[filter] hover:brightness-105"
            >
              Book a free demo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </BookDemoButton>
            <NavLink
              href="/#courses"
              className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-semibold text-white/85 backdrop-blur transition hover:border-cyan/60 hover:text-white"
            >
              Explore courses
            </NavLink>
          </div>
        </div>

        <div data-hz-fade className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 motion-safe:block">
          <ScrollCue className="text-slate-400" />
        </div>

        {/* Portal: grows from the centre of the hero until it fills the screen */}
        <div
          data-hz-portal
          className="absolute inset-0 z-10 hidden place-items-center bg-gradient-to-br from-brand via-sky to-cyan px-5 [clip-path:circle(0%_at_50%_55%)] motion-safe:grid"
        >
          <div data-hz-next className="w-full max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/80">
              Our promise
            </p>
            <p className="mt-5 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em]">
              Truly hands-on, career-ready tech training.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
              No slide decks. No passive lectures. You learn by building what
              companies actually ship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Doors() {
  const leaf =
    "absolute inset-y-0 z-10 flex w-1/2 items-center overflow-hidden bg-hero-950 motion-reduce:hidden";
  return (
    <section data-doors className="relative bg-white motion-safe:h-[240vh]">
      <div className="sticky top-0 isolate h-svh min-h-[34rem] overflow-hidden">
        <div className="bg-grid-light absolute inset-0 -z-10" />
        <div className="glow-light absolute inset-0 -z-10" />

        <Shape kind="hex" data-door-float="1" className="left-[8%] top-[22%] size-20 lg:size-28" />
        <Shape kind="ring" data-door-float="0.6" className="right-[10%] top-[18%] size-16 lg:size-24" />
        <Shape kind="pill" data-door-float="1.4" className="bottom-[16%] right-[14%] h-7 w-24 rotate-12 lg:h-9 lg:w-32" />
        <Shape kind="plus" data-door-float="0.8" className="bottom-[20%] left-[13%] size-12 lg:size-16" />
        <Shape kind="dot" data-door-float="1.8" className="right-[30%] top-[14%] size-4" />

        <div
          data-door-room
          className="flex h-full flex-col items-center justify-center px-5 pt-20 text-center"
        >
          <Eyebrow>Hello</Eyebrow>
          <p className="mt-6 max-w-5xl font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] text-navy">
            We are {site.name}, from <span className="text-gradient">{site.city}</span>.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            We design and deliver hands-on training that keeps two things in
            focus: the student in the room, and the job at the end of it.
          </p>
          <ScrollCue className="mt-10 hidden text-slate-400 motion-safe:flex" />
        </div>

        <div data-door="left" className={`${leaf} left-0 justify-end border-r border-white/10`}>
          <div className="bg-grid-dark absolute inset-0" />
          <span className="text-outline relative font-display text-[11vw] font-extrabold uppercase leading-none tracking-tighter">
            tech
          </span>
          <span className="absolute right-6 top-1/2 h-20 w-1.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-cyan to-sky" />
        </div>
        <div data-door="right" className={`${leaf} right-0 justify-start border-l border-white/10`}>
          <div className="bg-grid-dark absolute inset-0" />
          <span className="relative font-display text-[11vw] font-extrabold uppercase leading-none tracking-tighter text-white">
            cadd
          </span>
          <span className="absolute left-6 top-1/2 h-20 w-1.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-cyan to-sky" />
        </div>
      </div>
    </section>
  );
}

// One bold colour per programme, in the spirit of the pinned service panels.
const panelLooks = [
  { bg: "bg-hero-900 text-white", soft: "text-slate-300", ghost: "text-white/[0.06]", chip: "border-white/15", cta: "bg-white text-hero-950" },
  { bg: "bg-brand text-white", soft: "text-white/85", ghost: "text-white/10", chip: "border-white/25", cta: "bg-white text-brand" },
  { bg: "bg-sun text-hero-950", soft: "text-hero-950/75", ghost: "text-hero-950/10", chip: "border-hero-950/20", cta: "bg-hero-950 text-white" },
  { bg: "bg-cyan text-hero-950", soft: "text-hero-950/75", ghost: "text-hero-950/10", chip: "border-hero-950/20", cta: "bg-hero-950 text-white" },
];

export function ProgrammePanels() {
  return (
    <section
      id="programmes"
      data-panels
      style={{ "--panels": programmePanels.length } as CSSProperties}
      className="relative motion-safe:h-[calc(var(--panels)*100vh+50vh)]"
    >
      <div className="top-0 overflow-hidden motion-safe:sticky motion-safe:h-svh motion-safe:min-h-[36rem]">
        {programmePanels.map((p, i) => {
          const look = panelLooks[i % panelLooks.length];
          // Training programmes link to their domain pages; certificate programmes to each track.
          const tracks =
            p.tracks ??
            (p.slug ? internshipDomains.map((d) => ({ label: d.label, href: domainHref(p.slug!, d.slug) })) : []);
          const ctaClass = `group mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-bold transition-transform hover:scale-105 ${look.cta}`;
          const cta = (
            <>
              Programme details
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          );
          return (
            <article
              key={p.title}
              data-panel
              className={`flex items-center overflow-hidden px-5 py-20 motion-safe:absolute motion-safe:inset-0 motion-safe:py-0 lg:px-24 ${look.bg}`}
            >
              <div
                data-panel-inner
                className="relative mx-auto grid w-full max-w-7xl items-center gap-8 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -top-10 right-0 font-display text-[30vw] font-extrabold leading-none tracking-tighter lg:-top-16 lg:text-[16rem] ${look.ghost}`}
                >
                  {pad(i + 1)}
                </span>
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.24em]">
                    Training programmes · {pad(i + 1)} / {pad(programmePanels.length)}
                    {p.popular && (
                      <span className="ml-3 rounded-full bg-hero-950 px-3 py-1 text-[10px] tracking-wider text-sun">
                        Most popular
                      </span>
                    )}
                  </p>
                  <h2 className="mt-4 font-display text-[clamp(2.5rem,min(6.5vw,13vh),4.75rem)] font-bold leading-[1] tracking-[-0.025em]">
                    {p.duration}
                  </h2>
                  <p className="mt-5 font-display text-xl font-bold tracking-tight sm:text-2xl">
                    {p.title}
                  </p>
                </div>
                <div className="relative">
                  <p className={`text-lg leading-relaxed sm:text-xl ${look.soft}`}>{p.text}</p>
                  <ul className="mt-6 space-y-3">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className={`flex items-center gap-3 border-b pb-3 font-semibold ${look.chip}`}
                      >
                        <Check className="size-5 shrink-0" strokeWidth={3} /> {pt}
                      </li>
                    ))}
                  </ul>
                  {tracks.length > 0 && (
                    <nav aria-label={`${p.duration} ${p.title} tracks`} className="mt-5">
                      <ul className="flex flex-wrap gap-2">
                        {tracks.slice(0, TRACKS_SHOWN).map((t, n) => (
                          <li key={t.href} className={n >= 3 ? "max-sm:hidden" : ""}>
                            <NavLink
                              href={t.href}
                              className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold transition hover:bg-white/15 ${look.chip}`}
                            >
                              {t.label}
                            </NavLink>
                          </li>
                        ))}
                        {tracks.length > TRACKS_SHOWN && p.href && (
                          <li>
                            <NavLink
                              href={p.href}
                              className="inline-block px-1 py-1 text-xs font-bold underline-offset-4 hover:underline"
                            >
                              +{tracks.length - TRACKS_SHOWN} more
                            </NavLink>
                          </li>
                        )}
                      </ul>
                    </nav>
                  )}
                  {p.href ? (
                    <NavLink href={p.href} className={ctaClass}>
                      {cta}
                    </NavLink>
                  ) : (
                    <BookDemoButton className={ctaClass}>{cta}</BookDemoButton>
                  )}
                </div>
              </div>
            </article>
          );
        })}
        <div className="absolute inset-x-0 bottom-0 z-10 hidden h-1.5 bg-black/15 motion-safe:block">
          <div data-panels-bar className="h-full origin-left bg-white mix-blend-difference" />
        </div>
      </div>
    </section>
  );
}

const keywordRows = [
  ["Python", "React", "Next.js", "Node.js", "MongoDB", "Flutter", "Java", "TypeScript"],
  ["Generative AI", "Agents", "RAG", "Prompting", "LLMs", "PyTorch", "TensorFlow", "Vectors"],
  ["Ethical Hacking", "AWS", "Docker", "Kubernetes", "Linux", "DevOps", "Azure", "SOC"],
  ["SEO", "Google Ads", "UI / UX", "AutoCAD", "SolidWorks", "Power BI", "Tableau", "Figma"],
];

const rowLooks = [
  "text-white",
  "text-outline",
  "text-gradient",
  "text-outline",
];

/** Four oversized ticker rows that slide against each other as the page scrolls. */
export function KeywordRows() {
  return (
    <section
      aria-label="Technologies we teach"
      className="overflow-clip bg-hero-950 py-16 font-display text-[8vw] font-extrabold uppercase leading-[1.08] tracking-tight lg:py-20 lg:text-[4.2vw]"
    >
      {keywordRows.map((row, r) => (
        <div
          key={r}
          data-scroll-x={r % 2 === 0 ? "1" : "-1"}
          className={`flex w-max items-center gap-[0.35em] whitespace-nowrap ${rowLooks[r]}`}
        >
          {[...row, ...row, ...row].map((w, i) => (
            <span key={i} aria-hidden={i >= row.length} className="flex items-center gap-[0.35em]">
              {w}
              <span
                className={`inline-block size-[0.28em] ${r % 2 ? "rounded-full bg-sun" : "hex bg-cyan"}`}
              />
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}

const sentence: { word: string; look?: string }[] = [
  { word: "Projects" },
  { word: "get" },
  { word: "you" },
  { word: "hired", look: "rounded-[0.18em] bg-hero-950 px-[0.18em] text-sun" },
  { word: "faster" },
  { word: "than" },
  { word: "certificates", look: "font-normal italic" },
  { word: "do." },
];

/** A sentence that lands one word at a time while the stage stays pinned. */
export function WordSequence() {
  return (
    <section data-words className="relative bg-sun text-hero-950 motion-safe:h-[340vh]">
      <div className="sticky top-0 flex h-svh min-h-[32rem] flex-col items-center justify-center overflow-hidden px-5 pt-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em]">Why we teach this way</p>
        <p className="mt-6 flex max-w-6xl flex-wrap justify-center gap-x-[0.28em] gap-y-[0.06em] font-display text-[clamp(1.75rem,min(5.2vw,9.5vh),4.25rem)] font-bold leading-[1.05] tracking-[-0.025em]">
          {sentence.map((s) => (
            <span key={s.word} data-word className={`inline-block ${s.look ?? ""}`}>
              {s.word}
            </span>
          ))}
        </p>
        <p data-words-after className="mt-8 max-w-xl text-lg font-medium sm:text-xl">
          That is why every {site.name} course ends in a live project, a
          portfolio and interview practice — not just a piece of paper.
        </p>
      </div>
    </section>
  );
}

/** Closing call: a sun rises behind an oversized headline, leading into the form. */
export function Finale() {
  return (
    <section className="relative isolate overflow-clip bg-slate-50 px-5 pb-10 pt-24 text-center lg:pt-36">
      <div
        data-grow="0.3"
        aria-hidden
        className="absolute left-1/2 top-[8%] -z-10 aspect-square w-[min(70rem,120vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-sun via-orange-300 to-transparent opacity-70"
      />
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
        One conversation is enough to start
      </p>
      <h2
        data-split
        className="mx-auto mt-6 max-w-6xl font-display text-[clamp(2rem,5.6vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.025em] text-navy"
      >
        Let&apos;s build your career
      </h2>
      <p data-reveal className="mx-auto mt-8 max-w-xl text-lg text-slate-600">
        Student, graduate or working professional — tell us where you are and
        we will map the shortest route to the job you want.
      </p>
    </section>
  );
}
