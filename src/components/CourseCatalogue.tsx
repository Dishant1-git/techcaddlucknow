"use client";

import { NavLink } from "./NavLink";
import { createContext, useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, stats } from "@/lib/site";
import { isLight, type Logo } from "@/lib/logo";
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

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const badgeColors = {
  Hot: "bg-sun text-hero-950",
  New: "bg-brand/10 text-brand",
  Trending: "bg-cyan/25 text-navy",
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

// The catalogue's logos, keyed like courseLogos.
const Logos = createContext<Record<string, Logo>>({});

function LogoTile({ item }: { item: Item }) {
  const logo = useContext(Logos)[item.logo ?? item.label];
  const shape =
    "grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110";
  if (!logo) {
    return (
      <span
        aria-hidden
        className={`${shape} bg-brand/10 font-display text-xs font-bold tracking-tight text-brand`}
      >
        {initials(item.label)}
      </span>
    );
  }
  // Light logos (JavaScript yellow, etc.) need a dark tile to stay visible.
  const light = isLight(logo.hex);
  return (
    <span
      aria-hidden
      className={`${shape} ${light ? "bg-hero-800" : ""}`}
      style={light ? undefined : { backgroundColor: `#${logo.hex}1a` }}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill={`#${logo.hex}`}>
        <path d={logo.path} />
      </svg>
    </span>
  );
}

// Where each floating card sits in the hero, how far it leans and when its
// bobbing starts. Later cards overlap earlier ones.
const floatSpots = [
  { place: "right-0 top-0 w-[49%] rotate-6", wait: "0s" },
  { place: "left-0 top-[4.5rem] z-10 w-[49%] -rotate-6", wait: "-1.5s" },
  { place: "right-0 top-[15.5rem] z-20 w-[49%] rotate-3", wait: "-3s" },
  { place: "left-0 top-[19.5rem] z-30 w-[49%] -rotate-3", wait: "-4.5s" },
];

/** Hero visual: a few real courses as cards, fanned out and gently bobbing. */
function FloatingCards({ cards }: { cards: { item: Item; group: string }[] }) {
  return (
    <div data-speed="0.5" className="relative mx-auto h-[32.5rem] w-full max-w-[31.5rem]">
      <div className="orb absolute inset-[4%] [--orb:rgba(28,83,209,0.45)]" />
      {cards.map(({ item, group }, i) => (
        // Three layers so the lean, the bobbing and the hover never fight over
        // the same transform.
        <div
          key={item.href}
          className={`absolute transition duration-500 hover:z-40 hover:rotate-0 ${floatSpots[i].place}`}
        >
          <div className="animate-float" style={{ animationDelay: floatSpots[i].wait }}>
            <Link
              href={item.href}
              className="group block rounded-3xl border border-white/60 bg-white p-5 text-navy shadow-2xl shadow-black/40 transition duration-500 hover:scale-105"
            >
              <span className="flex items-start justify-between gap-3">
                <LogoTile item={item} />
                {item.badge && (
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${badgeColors[item.badge]}`}
                  >
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="mt-4 block truncate text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {group}
              </span>
              <span className="mt-1 block truncate font-display text-lg font-bold tracking-tight">
                {item.label}
              </span>
              <span className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                {site.city} · Live projects
                <span className="grid size-7 place-items-center rounded-full bg-brand/10 text-brand transition duration-500 group-hover:rotate-45 group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// How many cards the grid opens with, and how many "Load more" adds.
const pageSize = 12;

/** One course in the grid. `order` staggers its entrance. */
function CourseCard({ item, group, order }: { item: Item; group: string; order: number }) {
  return (
    // The wrapper animates in; the card inside keeps its own hover motion.
    <div style={delay(order * 0.04)} className="rise min-w-0">
      <Link
        href={item.href}
        data-spot
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-hero-950/[0.03] transition duration-500 [--spot:rgba(47,125,255,0.12)] hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl hover:shadow-hero-950/10"
      >
        <span className="flex items-start justify-between gap-3">
          <LogoTile item={item} />
          {item.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${badgeColors[item.badge]}`}
            >
              {item.badge}
            </span>
          )}
        </span>
        <span className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
          {group}
        </span>
        <span className="mt-1.5 flex-1 font-display text-lg font-bold leading-snug tracking-tight text-navy">
          {item.label}
        </span>
        <span className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
          {site.city} · Live projects
          <span className="grid size-8 place-items-center rounded-full bg-brand/10 text-brand transition duration-500 group-hover:rotate-45 group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </span>
        {/* Accent line that draws across the bottom on hover */}
        <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-cyan to-sky transition-transform duration-500 group-hover:scale-x-100" />
      </Link>
    </div>
  );
}

/**
 * A full catalogue page: hero with floating course cards, then a single grid of
 * everything, narrowed by the search box and the section filter chips.
 */
export function CourseCatalogue({
  eyebrow,
  title,
  text,
  sections,
  noun = "courses",
  logos,
}: {
  eyebrow: string;
  /** Hero heading, without the city. */
  title: string;
  text: string;
  sections: CatalogueSection[];
  /** What is being listed, e.g. "courses" or "programmes". */
  noun?: string;
  /** The courses' logos, picked on the server (pickLogos). */
  logos: Record<string, Logo>;
}) {
  const [query, setQuery] = useState("");
  // "all", or the id of the one section being shown.
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(pageSize);
  const listRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const q = query.trim().toLowerCase();

  // Tied to the scrollbar: the hero sinks back and dims as the list rises over it.
  useScrollMotion(() => {
    gsap.to(heroRef.current, {
      y: 140,
      scale: 0.94,
      autoAlpha: 0.15,
      ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.4 },
    });
  });

  const all = sections.flatMap((s) => s.courses);
  // One course from each of the first few sections for the hero: its badged
  // course if it has one, otherwise a different pick per section so the cards
  // do not all show the same subject.
  const featured = sections
    .map((s, k) => {
      const withLogo = s.courses.filter((c) => logos[c.logo ?? c.label]);
      const item = withLogo.find((c) => c.badge) ?? withLogo[k % (withLogo.length || 1)];
      return item && { item, group: s.title };
    })
    .filter((c) => !!c)
    .slice(0, floatSpots.length);

  const results = sections.flatMap((s) =>
    filter === "all" || filter === s.id
      ? s.courses
          .filter((c) => !q || `${c.label} ${s.title}`.toLowerCase().includes(q))
          .map((c) => ({ item: c, group: s.title }))
      : [],
  );
  const shown = results.slice(0, limit);
  const filterTitle = sections.find((s) => s.id === filter)?.title;

  const pick = (id: string) => {
    setFilter(id);
    setLimit(pageSize);
  };

  const heroStats = [
    { value: all.length, suffix: "", label: noun[0].toUpperCase() + noun.slice(1) },
    { value: sections.length, suffix: "", label: "Tracks" },
    ...stats.slice(0, 2),
  ];

  // The grid changing height moves everything below it, so the scroll
  // animations re-measure.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [q, filter, limit]);

  // Links such as /courses#programming open with that section selected and
  // the grid in view. The scroll waits a moment: on first load the scroll
  // animations are still measuring the page and would put it back at the top.
  useEffect(() => {
    let timer = 0;
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (!sections.some((s) => s.id === id)) return;
      setFilter(id);
      setLimit(pageSize);
      timer = window.setTimeout(() => {
        const top = listRef.current?.getBoundingClientRect().top ?? 0;
        window.scrollTo({ top: window.scrollY + top - 96 });
      }, 700);
    };
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [sections]);

  return (
    <Logos value={logos}>
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
              <NavLink
                href="#courses"
                data-magnetic
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan to-sky py-2 pl-7 pr-2 text-sm font-bold text-hero-950 shadow-[0_0_40px_-10px] shadow-cyan transition hover:brightness-110"
              >
                Browse {all.length} {noun}
                <span className="grid size-8 place-items-center rounded-full bg-hero-950 text-white transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown className="size-4" />
                </span>
              </NavLink>
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
            <FloatingCards cards={featured} />
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

      <section id="courses" ref={listRef} className="relative isolate scroll-mt-24 bg-white text-navy">
        <div className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
        <div className="glow-light absolute inset-0 -z-10" />

        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Catalogue</Eyebrow>
              <h2 className="mt-5 font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Find your <span className="text-gradient">{noun.replace(/s$/, "")}</span>
              </h2>
            </div>
            <div className="relative w-full sm:w-96">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLimit(pageSize);
                }}
                placeholder={`Search ${all.length} ${noun}`}
                aria-label={`Search ${noun}`}
                className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-base text-navy shadow-lg shadow-hero-950/[0.04] outline-none transition placeholder:text-slate-400 focus-visible:border-brand/50 focus-visible:ring-4 focus-visible:ring-brand/10 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter chips: everything, or one section at a time */}
          <div
            role="group"
            aria-label="Filter by section"
            className="no-scrollbar -mx-5 mt-9 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0"
          >
            {[{ id: "all", title: "All", count: all.length }, ...sections.map((s) => ({ id: s.id, title: s.title, count: s.courses.length }))].map(
              (chip) => (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={filter === chip.id}
                  onClick={() => pick(chip.id)}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    filter === chip.id
                      ? "border-navy bg-navy text-white shadow-lg shadow-navy/25"
                      : "border-slate-200 bg-white text-slate-600 hover:border-brand/30 hover:text-brand"
                  }`}
                >
                  {chip.title}
                  <span
                    className={`text-xs font-medium ${filter === chip.id ? "text-cyan" : "text-slate-400"}`}
                  >
                    {chip.count}
                  </span>
                </button>
              ),
            )}
          </div>

          <p aria-live="polite" className="mt-7 text-sm text-slate-500">
            Showing {shown.length} of {results.length}
            {filterTitle ? ` in ${filterTitle}` : ` ${noun}`}
            {q ? ` matching “${query.trim()}”` : ""}
          </p>

          {/* Keyed by filter so the cards replay their entrance when it changes */}
          <div key={filter} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
            {shown.map(({ item, group }, i) => (
              <CourseCard key={item.href} item={item} group={group} order={i % pageSize} />
            ))}
          </div>

          {results.length > shown.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setLimit(limit + pageSize)}
                className="group inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-bold text-white shadow-lg shadow-navy/25 transition-colors duration-300 hover:bg-brand"
              >
                Load more {noun}
                <span className="text-cyan">{results.length - shown.length} left</span>
                <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>
          )}

          {results.length === 0 && (
            <div className="mx-auto max-w-xl py-16 text-center">
              <h3 className="font-display text-3xl font-extrabold tracking-tight">
                Nothing matches “{query.trim()}”
              </h3>
              <p className="mt-3 text-slate-500">
                Try a different keyword, or tell a counsellor what you want to
                learn and they will point you at the right track.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    pick("all");
                  }}
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold transition-colors hover:border-brand/30 hover:text-brand"
                >
                  Clear search
                </button>
                <BookDemoButton className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600">
                  Talk to a counsellor
                </BookDemoButton>
              </div>
            </div>
          )}
        </div>
      </section>

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
    </Logos>
  );
}
