import type { ReactNode } from "react";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import {
  after12thMenu,
  courseHref,
  courseSlugs,
  coursesMenu,
  googleReviews,
  promoVideoUrl,
  resourcesMenu,
  site,
  type MenuColumn,
} from "@/lib/site";
import { BookDemoButton } from "./Enquiry";

const badgeColors = {
  Hot: "bg-sun text-hero-950",
  New: "bg-brand/10 text-brand",
  Trending: "bg-cyan/25 text-navy",
};

/**
 * Full-width dropdown of numbered link columns with a footer strip. Positioned
 * against the header bar like the other mega menus.
 *
 * Everything inside is sized in em and the base font size follows the viewport
 * height, so the whole panel shrinks to fit short screens instead of scrolling.
 */
function ColumnsMega({
  columns,
  href,
  gridClass,
  footer,
  cta,
  ctaHref = href,
  aside,
}: {
  columns: MenuColumn[];
  href: string;
  gridClass: string;
  footer: ReactNode;
  cta: string;
  ctaHref?: string;
  /** Extra cell rendered after the link columns. */
  aside?: ReactNode;
}) {
  return (
    <div className="invisible absolute inset-x-0 top-[calc(100%-1.25rem)] z-[10000] translate-y-2 pt-8 opacity-0 transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div
        style={{ fontSize: "clamp(10.5px, 1.9vh, 15px)" }}
        className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 text-navy shadow-2xl shadow-hero-950/25"
      >
        <div className={`grid gap-x-[2.5em] px-8 py-[1.6em] ${gridClass}`}>
          {columns.map((col, i) => (
            <div key={col.title}>
              <p className="text-[0.8em] font-medium text-slate-400">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-[0.35em] font-display text-[1.35em] font-bold tracking-tight">{col.title}</p>
              <p className="mt-[0.35em] border-b border-slate-200 pb-[0.9em] text-[0.87em] text-slate-500">
                {col.text}
              </p>
              <ul className="mt-[0.6em]">
                {col.courses.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href ?? (courseSlugs[c.label] ? courseHref(c.label) : href)}
                      className="group/link flex items-center gap-2 py-[0.28em] leading-normal text-slate-600 transition-colors hover:text-brand"
                    >
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        {c.label}
                      </span>
                      {c.badge && (
                        <span
                          className={`shrink-0 rounded-full px-[0.8em] py-[0.15em] text-[0.68em] font-extrabold ${badgeColors[c.badge]}`}
                        >
                          {c.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {aside}
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-slate-200 bg-white px-8 py-[0.9em]">
          <p className="text-slate-600">{footer}</p>
          <a
            href={ctaHref}
            className="group/cta inline-flex shrink-0 items-center gap-2 font-semibold text-brand transition-colors hover:text-navy"
          >
            {cta}
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function CoursesMega() {
  return (
    <ColumnsMega
      columns={coursesMenu}
      href="/courses"
      gridClass="grid-cols-4"
      cta="Browse all courses"
      footer={
        <span className="italic text-slate-500">
          <span className="mr-1 text-slate-300">“</span>
          Everybody should learn to program a computer, because it teaches you
          how to think.{" "}
          <span className="font-semibold not-italic text-navy">— Steve Jobs</span>
        </span>
      }
    />
  );
}

export function After12thMega() {
  return (
    <ColumnsMega
      columns={after12thMenu}
      href="/after-12th-courses"
      gridClass="grid-cols-3"
      cta="Browse After 12th courses"
      footer="Not sure where to start? A counsellor maps your stream and marks to a track in ten minutes."
    />
  );
}

export function ResourcesMega() {
  return (
    <ColumnsMega
      columns={resourcesMenu}
      href="/#contact"
      gridClass="grid-cols-[1fr_1fr_1.3fr]"
      cta="Ask us a question"
      footer="Not sure where to start? Tell us your background and we will point you at the right track."
      aside={
        <div className="space-y-[1em]">
          {/* Video card — links out until a real embed is added */}
          <a
            href={promoVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/video relative isolate flex h-[12.5em] flex-col justify-between overflow-hidden rounded-3xl bg-hero-950 p-[1.2em] text-white"
          >
            <div className="bg-grid-dark absolute inset-0 -z-10" />
            <div className="glow-dark absolute inset-0 -z-10" />
            <span className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-brand font-display text-[9px] font-extrabold">
                {site.name}
              </span>
              <span className="leading-tight">
                <span className="block font-display text-[0.95em] font-bold">
                  {site.name} — Your Technology Partner
                </span>
                <span className="block text-xs text-slate-400">{site.name}</span>
              </span>
            </span>
            <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 backdrop-blur transition duration-300 group-hover/video:scale-110 group-hover/video:bg-cyan group-hover/video:text-hero-950">
              <Play className="size-6 fill-current" />
            </span>
            <span className="font-display text-[1.1em] font-bold leading-snug">
              When the world says ‘impossible,’ {site.name} says ‘watch this.’ 🔥
            </span>
          </a>

          {/* Mentorship card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-[1.2em] shadow-lg shadow-hero-950/5">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-brand">
                <Sparkles className="size-3.5" /> 1:1 Free career mentorship
              </p>
              <span className="rounded-full bg-sun/30 px-2.5 py-0.5 text-[11px] font-bold text-navy">
                Popular
              </span>
            </div>
            <p className="mt-[0.5em] font-display text-[1.05em] font-bold tracking-tight">
              Confused which tech course or tool fits your career?
            </p>
            <p className="mt-[0.4em] text-[0.87em] leading-relaxed text-slate-500">
              Get a personalized 90-day learning roadmap from a senior engineer
              at {site.name} {site.city}.
            </p>
            <div className="mt-[0.9em] flex items-center justify-between gap-3 border-t border-slate-100 pt-[0.9em]">
              <p className="flex items-center gap-2 text-xs font-bold text-navy">
                <span className="flex gap-0.5 text-sun">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                {googleReviews.rating}/5 Rating
              </p>
              <BookDemoButton className="group/cta inline-flex items-center gap-2 rounded-full bg-hero-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand">
                Book Free Call
                <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-1" />
              </BookDemoButton>
            </div>
          </div>
        </div>
      }
    />
  );
}
