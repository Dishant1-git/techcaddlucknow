// Building blocks shared by the Resources pages (study material, interview
// Q&A, projects, events, reviews, placements, partnerships, blog, tools).
import { NavLink } from "../NavLink";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { site } from "@/lib/site";
import { BookDemoButton } from "../Enquiry";
import { Eyebrow, LightSection, SectionHeading } from "../ui";

export const pad = (n: number) => String(n).padStart(2, "0");

/** Copy from the content files keeps the phone number as a {{phone}} placeholder. */
export const fill = (s: string) => s.replaceAll("{{phone}}", site.phone);

/** Initials for an avatar bubble. */
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Hero call-to-action pair, for the `children` slot under a PageHero title. */
export function HeroActions({
  primary = "Book free counselling",
  secondary,
}: {
  primary?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="rise mt-9 flex flex-wrap gap-3 [--d:.4s]">
      <BookDemoButton className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-7 py-3.5 font-bold text-hero-950 shadow-[0_0_40px_-10px] shadow-cyan transition hover:brightness-110">
        {primary}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </BookDemoButton>
      {secondary && (
        <NavLink
          href={secondary.href}
          className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:border-white/40"
        >
          {secondary.label}
        </NavLink>
      )}
    </div>
  );
}

/** Row of short chips under a hero (e.g. "100% Live Deployments"). */
export function HeroBadges({ items }: { items: string[] }) {
  return (
    <ul className="rise mt-8 flex flex-wrap gap-2.5 [--d:.35s]">
      {items.map((b) => (
        <li
          key={b}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] font-semibold text-slate-200"
        >
          {b}
        </li>
      ))}
    </ul>
  );
}

/**
 * Figures card that straddles the bottom of the hero. Put it straight after
 * <PageHero>; the negative margin pulls it up over the banner.
 */
export function StatBand({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-5 lg:-mt-20 lg:px-8">
      <dl
        data-reveal="scale"
        className={`grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-100 shadow-2xl shadow-hero-950/15 ${
          items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "sm:grid-cols-3" : ""
        }`}
      >
        {items.map((s) => (
          <div key={s.label} className="bg-white px-5 py-6 text-center">
            <dd className="font-display text-3xl font-extrabold text-navy sm:text-4xl">{s.value}</dd>
            <dt className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Small "where this information comes from" note under a section heading. */
export function Note({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      data-reveal
      className={`mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-2xl px-4 py-3 text-left text-sm ${
        dark ? "bg-white/5 text-slate-300" : "bg-slate-50 text-slate-600"
      }`}
    >
      <Info className={`mt-0.5 size-4 shrink-0 ${dark ? "text-cyan" : "text-brand"}`} />
      <span>{children}</span>
    </p>
  );
}

export type NextLink = { title: string; text: string; cta?: string; href: string };

/** "Where to go next": three cards linking to other parts of the site. */
export function NextSteps({ items }: { items: NextLink[] }) {
  return (
    <LightSection>
      <SectionHeading eyebrow="Keep exploring" title={<>Where to go <span className="text-gradient">next</span></>} />
      <div data-stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map((l) => (
          <NavLink
            key={l.title}
            href={l.href}
            className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl"
          >
            <h3 className="font-display text-xl font-bold text-navy">{l.title}</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{l.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">
              {l.cta ?? "Learn more"}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </NavLink>
        ))}
      </div>
    </LightSection>
  );
}

export function HeroIntro({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mt-8 max-w-4xl">
      <div className="rise [--d:.1s]">
        <Eyebrow dark>{eyebrow}</Eyebrow>
      </div>
      <h1 className="rise mt-6 font-display text-[2rem] font-extrabold leading-[1.06] tracking-tight [--d:.2s] sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {text && (
        <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.3s] sm:text-lg">{text}</p>
      )}
      {children}
    </div>
  );
}
