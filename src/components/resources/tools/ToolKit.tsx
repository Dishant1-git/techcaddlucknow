// Server-safe building blocks shared by the free tools (/tools/*).
import type { ReactNode } from "react";
import { resourceRoutes } from "@/lib/resources/routes";
import { PageHero } from "../../PageShell";
import { Accordion } from "../Interactive";
import { HeroBadges, pad } from "../Kit";
import { DarkSection, Eyebrow, SectionHeading } from "../../ui";

/**
 * Hero for a tool page: breadcrumb Home › Free tools › <tool>, title, text and
 * badges. Leave extra room underneath when a <ToolPanel> follows.
 */
export function ToolHero({
  eyebrow,
  title,
  text,
  badges,
  crumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  badges?: string[];
  /** Current page in the breadcrumb; omit on the hub itself. */
  crumb?: string;
  children?: ReactNode;
}) {
  const crumbs = crumb
    ? [{ label: "Free tools", href: resourceRoutes.tools }, { label: crumb }]
    : [{ label: "Free tools" }];
  return (
    <PageHero eyebrow={eyebrow} title={title} crumbs={crumbs}>
      <div className="mt-8 max-w-4xl">
        <div className="rise [--d:.1s]">
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </div>
        <h1 className="rise mt-6 font-display text-[2rem] font-extrabold leading-[1.06] tracking-tight [--d:.2s] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {text && (
          <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.3s] sm:text-lg">
            {text}
          </p>
        )}
        {badges && <HeroBadges items={badges} />}
        {children}
      </div>
    </PageHero>
  );
}

/**
 * The tool itself: a prominent white card that straddles the bottom of the
 * hero, like StatBand. Put it straight after <PageHero>.
 */
export function ToolPanel({
  label,
  id,
  children,
  wide = false,
}: {
  label: string;
  id?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`relative z-10 mx-auto -mt-16 scroll-mt-28 px-4 sm:px-5 lg:-mt-20 lg:px-8 ${
        wide ? "max-w-7xl" : "max-w-6xl"
      }`}
    >
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl shadow-hero-950/10 sm:p-8 lg:p-10">
        {children}
      </div>
    </section>
  );
}

/** Small uppercase label used inside tool cards. */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-bold uppercase tracking-[0.18em] text-brand ${className}`}>{children}</p>
  );
}

/** FAQ block: centred heading and the shared accordion. */
export function ToolFaqs({
  eyebrow = "Frequently asked questions",
  title,
  text,
  items,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section className="overflow-clip bg-slate-50">
      <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeading eyebrow={eyebrow} title={title} text={text} />
        <div data-reveal className="mt-12">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}

/** Numbered steps on the dark band. */
export function ToolSteps({
  eyebrow,
  title,
  text,
  steps,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  steps: { title: string; text: string }[];
  children?: ReactNode;
}) {
  return (
    <DarkSection>
      <SectionHeading dark eyebrow={eyebrow} title={title} text={text} />
      <div className="relative mt-16">
        <div
          data-draw-x
          aria-hidden
          className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-cyan via-sky to-brand lg:block"
        />
        <ol data-stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-brand font-display text-lg font-extrabold text-white shadow-lg shadow-cyan/20">
                {pad(i + 1)}
              </span>
              <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-300">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
      {children}
    </DarkSection>
  );
}
