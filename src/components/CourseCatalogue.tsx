"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, stats } from "@/lib/site";
import { courseLogos, isLight } from "@/lib/techLogos";
import { BookDemoButton } from "./Enquiry";
import { Eyebrow } from "./ui";

export type CatalogueSection = {
  id: string;
  title: string;
  text: string;
  courses: {
    label: string;
    href: string;
    badge?: "Hot" | "New" | "Trending";
    /** Key into courseLogos, when it differs from the label. */
    logo?: string;
  }[];
};

type Item = CatalogueSection["courses"][number];

const pad = (n: number) => String(n).padStart(2, "0");

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const badgeColors = {
  Hot: "bg-sun text-hero-950",
  New: "bg-brand/10 text-brand",
  Trending: "bg-cyan/25 text-navy",
};

const badgeColorsDark = {
  Hot: "bg-sun text-hero-950",
  New: "bg-white/15 text-white",
  Trending: "bg-cyan text-hero-950",
};

/** Counts up from zero once, when the page loads. */
function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = still ? 1 : Math.min((now - start) / 1600, 1);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{n.toLocaleString("en-IN")}</>;
}

/** True once the element has scrolled into view; it never switches back. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, seen] as const;
}

/**
 * Runs scroll-linked tweens for as long as the component is mounted, and only
 * for visitors who have not asked for reduced motion.
 */
function useScrollMotion(setup: () => void) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", setup);
    return () => mm.revert();
    // The tweens are built once, from refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function initials(label: string) {
  const words = label.split(/[^A-Za-z0-9]+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : label.slice(0, 2)).toUpperCase();
}

function LogoTile({ item, dark = false }: { item: Item; dark?: boolean }) {
  const logo = courseLogos[item.logo ?? item.label];
  const shape =
    "grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110";
  if (!logo) {
    return (
      <span
        aria-hidden
        className={`${shape} font-display text-xs font-bold tracking-tight ${
          dark ? "bg-white/10 text-cyan" : "bg-brand/10 text-brand"
        }`}
      >
        {initials(item.label)}
      </span>
    );
  }
  // Light logos need a dark tile; on dark sections everything else sits on white.
  const light = isLight(logo.hex);
  return (
    <span
      aria-hidden
      className={`${shape} ${light ? "bg-hero-800" : dark ? "bg-white" : ""}`}
      style={light || dark ? undefined : { backgroundColor: `#${logo.hex}1a` }}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill={`#${logo.hex}`}>
        <path d={logo.path} />
      </svg>
    </span>
  );
}

// Two rings of logos circling the hub. Radius is a percentage of the stage.
const rings = [
  { count: 6, radius: 27, duration: 60 },
  { count: 10, radius: 46, duration: 95 },
];

/** Hero visual: course logos in slow orbit around the total. */
function Orbit({ items, total, noun }: { items: Item[]; total: number; noun: string }) {
  return (
    <div
      aria-hidden
      data-speed="0.5"
      className="relative mx-auto aspect-square w-full max-w-[32rem] text-[3rem]"
    >
      <div className="orb absolute inset-[6%] [--orb:rgba(28,83,209,0.45)]" />

      <div className="absolute left-1/2 top-1/2 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan/20" />
        <span className="hex grid size-full place-items-center bg-gradient-to-br from-cyan to-brand p-[2px]">
          <span className="hex grid size-full place-items-center bg-hero-900 text-center">
            <span>
              <span className="block font-display text-[0.62em] font-extrabold leading-none text-white">
                {total}
              </span>
              <span className="mt-1 block text-[0.2em] font-bold uppercase tracking-[0.18em] text-cyan">
                {noun}
              </span>
            </span>
          </span>
        </span>
      </div>

      {rings.map((ring, r) => {
        const from = rings.slice(0, r).reduce((n, x) => n + x.count, 0);
        const ringItems = items.slice(from, from + ring.count);
        return (
          <div key={r} className="absolute inset-0">
            <span
              style={{ inset: `${50 - ring.radius}%` }}
              className="absolute rounded-full border border-dashed border-white/10"
            />
            <div
              style={{ "--dur": `${ring.duration}s` } as CSSProperties}
              className={`orbit-spin absolute inset-0 ${r % 2 ? "orbit-rev" : ""}`}
            >
              {ringItems.map((item, i) => {
                const angle = (i / ringItems.length) * Math.PI * 2 - Math.PI / 2;
                const logo = courseLogos[item.logo ?? item.label];
                return (
                  <div
                    key={item.label}
                    style={{
                      left: `${(50 + ring.radius * Math.cos(angle)).toFixed(3)}%`,
                      top: `${(50 + ring.radius * Math.sin(angle)).toFixed(3)}%`,
                    }}
                    className="absolute size-[1em] -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Counter-rotates so the logo stays upright */}
                    <div
                      style={{ "--dur": `${ring.duration}s` } as CSSProperties}
                      className={`orbit-spin grid size-full place-items-center rounded-2xl shadow-lg shadow-black/40 ring-1 ring-white/15 ${
                        r % 2 ? "" : "orbit-rev"
                      } ${isLight(logo.hex) ? "bg-hero-800" : "bg-white"}`}
                    >
                      <svg viewBox="0 0 24 24" className="size-[48%]" fill={`#${logo.hex}`}>
                        <path d={logo.path} />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Section backgrounds cycle light → dark → tinted down the page.
const themes = ["light", "dark", "tint"] as const;

function CategorySection({
  section,
  index,
  total,
  noun,
  instant,
}: {
  section: CatalogueSection;
  index: number;
  total: number;
  noun: string;
  /** Skip the scroll-in animation (search results should just appear). */
  instant: boolean;
}) {
  const [ref, seen] = useSeen<HTMLElement>();
  const ghostRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const shown = seen || instant;

  // Tied to the scrollbar: the section opens out from a rounded card as it
  // arrives, its oversized name drifts sideways and the count floats past.
  useScrollMotion(() => {
    const section = ref.current;
    gsap.fromTo(
      section,
      { clipPath: "inset(0% 5% 0% 5% round 3rem)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0rem)",
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "top 30%", scrub: 0.4 },
      },
    );
    gsap.fromTo(
      ghostRef.current,
      { xPercent: 8 },
      {
        xPercent: -24,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.6 },
      },
    );
    gsap.fromTo(
      countRef.current,
      { y: 36 },
      {
        y: -36,
        ease: "none",
        scrollTrigger: { trigger: countRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      },
    );
  });
  const theme = themes[index % themes.length];
  const dark = theme === "dark";
  const count = section.courses.length;

  // Each piece waits its turn, then settles into place.
  const enter = (hidden: string) =>
    `transition duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${shown ? "" : `motion-safe:opacity-0 ${hidden}`}`;

  return (
    <section
      ref={ref}
      id={section.id}
      data-category
      className={`relative isolate -scroll-mt-[6.5rem] overflow-clip pb-20 pt-36 lg:pb-28 lg:pt-40 ${
        dark ? "bg-hero-950 text-white" : theme === "tint" ? "bg-slate-50 text-navy" : "bg-white text-navy"
      }`}
    >
      {dark ? (
        <>
          <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
          <div className="glow-dark absolute inset-0 -z-10" />
          <div
            data-speed="0.6"
            className="orb absolute -right-40 top-1/4 -z-10 size-[34rem] [--orb:rgba(0,212,255,0.14)]"
          />
        </>
      ) : (
        theme === "light" && (
          <>
            <div className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
            <div className="glow-light absolute inset-0 -z-10" />
          </>
        )
      )}

      {/* Oversized section name that fades in, then drifts sideways with the scroll */}
      <p
        aria-hidden
        className={`pointer-events-none absolute top-16 left-0 -z-10 select-none whitespace-nowrap font-display text-[19vw] font-extrabold uppercase leading-none tracking-tighter transition-opacity duration-[1600ms] ease-out lg:text-[11rem] ${
          dark ? "text-white/[0.04]" : "text-navy/[0.04]"
        } ${shown ? "" : "motion-safe:opacity-0"}`}
      >
        <span ref={ghostRef} className="inline-block">
          {section.title} · {section.title}
        </span>
      </p>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <p
              className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] ${
                dark ? "text-cyan" : "text-brand"
              } ${enter("motion-safe:-translate-x-6")}`}
            >
              {pad(index + 1)} <span className="opacity-40">/ {pad(total)}</span>
              <span
                className={`h-px w-16 origin-left bg-current transition-transform delay-300 duration-1000 ${
                  shown ? "" : "motion-safe:scale-x-0"
                }`}
              />
            </p>
            <h2
              style={{ transitionDelay: "80ms" }}
              className={`mt-5 font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${enter(
                "motion-safe:translate-y-10 motion-safe:blur-sm",
              )}`}
            >
              {section.title}
            </h2>
            <p
              style={{ transitionDelay: "160ms" }}
              className={`mt-4 max-w-xl text-lg ${dark ? "text-slate-300" : "text-slate-600"} ${enter(
                "motion-safe:translate-y-8",
              )}`}
            >
              {section.text}
            </p>
          </div>
          <p
            style={{ transitionDelay: "240ms" }}
            className={`font-display text-sm font-bold ${enter("motion-safe:translate-y-8")}`}
          >
            <span ref={countRef} className="inline-block">
              <span className="text-gradient text-5xl font-extrabold lg:text-6xl">{pad(count)}</span>{" "}
              <span className={dark ? "text-slate-400" : "text-slate-500"}>
                {count === 1 ? noun.replace(/s$/, "") : noun}
              </span>
            </span>
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {section.courses.map((c, i) => (
            // The wrapper animates in; the card inside keeps its own hover motion.
            <div
              key={c.label}
              style={{ transitionDelay: `${240 + Math.min(i, 11) * 70}ms` }}
              className={`min-w-0 ${enter("motion-safe:translate-y-12 motion-safe:scale-95 motion-safe:blur-sm")}`}
            >
              <Link
                href={c.href}
                data-spot
                className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-3xl border p-5 transition duration-500 hover:-translate-y-1.5 ${
                  dark
                    ? "border-white/10 bg-white/[0.04] backdrop-blur hover:border-cyan/40 hover:bg-white/[0.07]"
                    : "border-slate-200 bg-white shadow-lg shadow-hero-950/[0.03] [--spot:rgba(47,125,255,0.12)] hover:border-brand/30 hover:shadow-2xl hover:shadow-hero-950/10"
                }`}
              >
                <LogoTile item={c} dark={dark} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-display text-base font-bold tracking-tight">
                      {c.label}
                    </span>
                    {c.badge && (
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                          (dark ? badgeColorsDark : badgeColors)[c.badge]
                        }`}
                      >
                        {c.badge}
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-1 block truncate text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {site.city} · Live projects
                  </span>
                </span>
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full transition duration-500 group-hover:rotate-45 ${
                    dark
                      ? "bg-white/10 text-cyan group-hover:bg-cyan group-hover:text-hero-950"
                      : "bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white"
                  }`}
                >
                  <ArrowUpRight className="size-4" />
                </span>
                {/* Accent line that draws across the bottom on hover */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-cyan to-sky transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * A full catalogue page: hero with the logo orbit, a sticky bar holding the
 * search box and section links, then one animated card grid per section.
 */
export function CourseCatalogue({
  eyebrow,
  title,
  text,
  sections,
  noun = "courses",
}: {
  eyebrow: string;
  /** Hero heading, without the city. */
  title: string;
  text: string;
  sections: CatalogueSection[];
  /** What is being listed, e.g. "courses" or "programmes". */
  noun?: string;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(sections[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const q = query.trim().toLowerCase();

  // Tied to the scrollbar: the hero sinks back and dims as the list rises over
  // it, and a line under the sticky bar fills as you work down the list.
  useScrollMotion(() => {
    gsap.to(heroRef.current, {
      y: 140,
      scale: 0.94,
      autoAlpha: 0.15,
      ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.4 },
    });
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: listRef.current, start: "top 20%", end: "bottom bottom", scrub: 0.3 },
      },
    );
  });

  const all = sections.flatMap((s) => s.courses);
  const withLogo = all.filter(
    (c, i) =>
      courseLogos[c.logo ?? c.label] &&
      all.findIndex((x) => (x.logo ?? x.label) === (c.logo ?? c.label)) === i,
  );

  const visible = sections
    .map((s) => ({
      ...s,
      courses: q
        ? s.courses.filter((c) => `${c.label} ${s.title}`.toLowerCase().includes(q))
        : s.courses,
    }))
    .filter((s) => s.courses.length > 0);
  const matches = visible.reduce((n, s) => n + s.courses.length, 0);

  const heroStats = [
    { value: all.length, suffix: "", label: noun[0].toUpperCase() + noun.slice(1) },
    { value: sections.length, suffix: "", label: "Tracks" },
    ...stats.slice(0, 2),
  ];

  // Filtering changes the page height, so the scroll animations re-measure, and
  // the results are brought back into view if they collapsed above the fold.
  useEffect(() => {
    ScrollTrigger.refresh();
    const top = listRef.current?.getBoundingClientRect().top ?? 0;
    if (q && top < 0) window.scrollTo({ top: window.scrollY + top });
  }, [q]);

  // Highlight whichever section is crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    listRef.current?.querySelectorAll("[data-category]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [q]);

  // Keep the highlighted link visible when the bar scrolls sideways on phones.
  useEffect(() => {
    const rail = railRef.current;
    const link = rail?.querySelector<HTMLElement>(`[data-rail="${active}"]`);
    if (!rail || !link) return;
    rail.scrollTo({
      left: link.offsetLeft - (rail.clientWidth - link.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <>
      <section id="top" className="relative isolate overflow-clip bg-hero-950 text-white">
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
        <div className="glow-dark absolute inset-0 -z-10" />
        <div className="orb absolute -left-40 -top-40 -z-10 size-[36rem] animate-aurora [--orb:rgba(28,83,209,0.5)]" />
        <div className="orb absolute -bottom-52 -right-20 -z-10 size-[34rem] animate-aurora [--orb:rgba(0,212,255,0.18)] [animation-delay:-8s]" />

        <div
          ref={heroRef}
          className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-44"
        >
          <div>
            <div className="rise">
              <Eyebrow dark>{eyebrow}</Eyebrow>
            </div>
            <h1
              style={delay(0.1)}
              className="rise mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {title} in <span className="text-shine">{site.city}</span>
            </h1>
            <p
              style={delay(0.2)}
              className="rise mt-6 max-w-xl text-base leading-relaxed text-slate-300 lg:text-lg"
            >
              {text}
            </p>
            <div style={delay(0.3)} className="rise mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#courses"
                data-magnetic
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan to-sky py-2 pl-7 pr-2 text-sm font-bold text-hero-950 shadow-[0_0_40px_-10px] shadow-cyan transition hover:brightness-110"
              >
                Browse {all.length} {noun}
                <span className="grid size-8 place-items-center rounded-full bg-hero-950 text-white transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown className="size-4" />
                </span>
              </a>
              <BookDemoButton className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold backdrop-blur transition hover:border-white/40">
                Book a free demo class
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </BookDemoButton>
            </div>

            <dl
              style={delay(0.45)}
              className="rise mt-12 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-4"
            >
              {heroStats.map((s) => (
                <div key={s.label} className="bg-hero-950/80 p-4 backdrop-blur sm:p-5">
                  <dd className="font-display text-2xl font-extrabold sm:text-3xl">
                    <CountUp value={s.value} />
                    <span className="text-cyan">{s.suffix}</span>
                  </dd>
                  <dt className="mt-1 text-xs text-slate-400">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div style={delay(0.35)} className="rise hidden lg:block">
            <Orbit items={withLogo} total={all.length} noun={noun} />
          </div>
        </div>

        {/* Every name in the catalogue, drifting past */}
        <div
          aria-hidden
          className="mask-x border-t border-white/10 py-5 font-display text-sm font-bold uppercase tracking-[0.16em] text-white/40"
        >
          <div className="flex w-max animate-marquee items-center [animation-duration:90s]">
            {[...all, ...all].map((c, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                <span className="px-5">{c.label}</span>
                <span className="hex size-2 bg-cyan" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <div id="courses" ref={listRef} className="relative bg-white">
        {/* Search box and section links, pinned under the header while you browse */}
        <div className="sticky top-[4.75rem] z-30 -mb-[4.25rem] px-2 pt-3 lg:px-4">
          <div className="relative mx-auto flex max-w-7xl items-center gap-2 rounded-full border border-slate-200 bg-white/85 p-1.5 shadow-xl shadow-hero-950/10 backdrop-blur-xl">
            {/* How far down the list you are */}
            <span
              ref={barRef}
              aria-hidden
              style={{ transform: "scaleX(0)" }}
              className={`absolute inset-x-8 -bottom-px h-0.5 origin-left rounded-full bg-gradient-to-r from-cyan via-sky to-brand ${
                q ? "opacity-0" : ""
              }`}
            />
            {/* On phones the box is just its icon until it is focused or filled */}
            <div
              className={`relative shrink-0 transition-[width] duration-300 focus-within:w-48 sm:w-64 sm:focus-within:w-64 ${
                query ? "w-48" : "w-11"
              }`}
            >
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${all.length} ${noun}`}
                aria-label={`Search ${noun}`}
                className="w-full rounded-full bg-slate-100 py-2.5 pl-10 pr-9 text-base text-navy outline-none transition placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-brand/40 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-1.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-navy"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {q ? (
              <p aria-live="polite" className="truncate px-3 text-sm font-semibold text-slate-600">
                {matches} {matches === 1 ? "result" : "results"} for “{query.trim()}”
              </p>
            ) : (
              <nav
                ref={railRef}
                aria-label="Sections"
                className="no-scrollbar relative flex min-w-0 flex-1 items-center gap-1 overflow-x-auto"
              >
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    data-rail={s.id}
                    aria-current={active === s.id ? "true" : undefined}
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                      active === s.id
                        ? "bg-navy text-white shadow-lg shadow-navy/30"
                        : "text-slate-600 hover:bg-brand/5 hover:text-brand"
                    }`}
                  >
                    {s.title}
                    <span
                      className={`text-xs font-medium ${active === s.id ? "text-cyan" : "text-slate-400"}`}
                    >
                      {s.courses.length}
                    </span>
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>

        {visible.map((s, i) => (
          <CategorySection
            key={s.id}
            section={s}
            index={i}
            total={visible.length}
            noun={noun}
            instant={!!q}
          />
        ))}

        {visible.length === 0 && (
          <section className="px-5 pb-24 pt-40 text-center text-navy">
            <div className="mx-auto max-w-xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                Nothing matches “{query.trim()}”
              </h2>
              <p className="mt-3 text-slate-500">
                Try a different keyword, or tell a counsellor what you want to
                learn and they will point you at the right track.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold transition-colors hover:border-brand/30 hover:text-brand"
                >
                  Clear search
                </button>
                <BookDemoButton className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600">
                  Talk to a counsellor
                </BookDemoButton>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Closing line whose words light up as it scrolls through the screen */}
      <section className="bg-white px-5 py-24 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
            However you choose
          </p>
          <p
            data-scrub-text
            className="mt-6 font-display text-[2rem] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[4.2rem]"
          >
            {all.length} {noun}, {sections.length} tracks, one method. Learn it,
            build it, and ship it with a mentor beside you.
          </p>
        </div>
      </section>
    </>
  );
}
