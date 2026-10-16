// Sections of the Placements page (/techcadd-lucknow-placements).
import { NavLink } from "../NavLink";
import { ArrowRight, Briefcase, Calculator, FileUser, MessagesSquare, Quote, ShieldCheck, Star } from "lucide-react";
import {
  placementReadiness,
  placementRecords,
  placementRegions,
  placementSectors,
  placementServices,
  placementShowcase,
  placementStories,
} from "@/lib/resources/placements";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "../ui";
import { initials, Note, pad } from "./Kit";
import { PlacementsFilter } from "./PlacementsFilter";

const serviceIcons = [FileUser, MessagesSquare, Calculator, Briefcase];

export function PlacementServices() {
  const s = placementServices;
  return (
    <LightSection>
      <SectionHeading
        eyebrow={s.eyebrow}
        title={
          <>
            Four things, done repeatedly, <span className="text-gradient">for every student</span>
          </>
        }
        text={s.text}
      />
      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((item, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          return (
            <article
              key={item.title}
              data-spot
              className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30"
            >
              <span className="absolute right-6 top-6 font-display text-sm font-bold text-slate-300">{pad(i + 1)}</span>
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{item.text}</p>
            </article>
          );
        })}
      </div>
    </LightSection>
  );
}

export function PlacementReadiness() {
  const r = placementReadiness;
  const s = placementSectors;
  return (
    <DarkSection>
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow dark>{r.eyebrow}</Eyebrow>
          <Heading dark className="mt-5">
            Where a typical batch stands at <span className="text-gradient">the finish line</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
            {r.text}
          </p>
          <ul data-stagger className="mt-10 space-y-5">
            {r.items.map((item) => (
              <li key={item.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-semibold text-white">{item.label}</span>
                  <span className="font-display text-2xl font-extrabold text-cyan">{item.value}%</span>
                </div>
                <div
                  role="meter"
                  aria-label={item.label}
                  aria-valuenow={item.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10"
                >
                  <div
                    data-draw-x
                    className="h-full rounded-full bg-gradient-to-r from-cyan to-sky"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Eyebrow dark>{s.eyebrow}</Eyebrow>
          <Heading dark className="mt-5">
            Sectors that hire <span className="text-gradient">techcadd students</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
            {s.text}
          </p>
          <ul data-stagger className="mt-10 flex flex-wrap gap-2.5">
            {s.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200"
              >
                {t}
              </li>
            ))}
          </ul>
          <div
            data-reveal
            className="mt-10 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-relaxed text-slate-300"
          >
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-cyan" />
            <p>{s.disclaimer}</p>
          </div>
        </div>
      </div>
    </DarkSection>
  );
}

export function PlacementShowcase() {
  const s = placementShowcase;
  return (
    <section id="placement-records" className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={s.eyebrow}
          title={
            <>
              Where our learners are <span className="text-gradient">building careers</span>
            </>
          }
          text={s.text}
        />
        <div
          data-reveal
          className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-sun/60 bg-sun/15 px-5 py-4 text-left text-sm leading-relaxed text-navy"
        >
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" />
          <p>
            <strong className="font-bold">Student names are samples, used for privacy.</strong> {s.disclaimer.replace(/^Sample student names are showcased for privacy\.\s*/, "")}{" "}
            These records come from the wider techcadd network and are not Lucknow-only figures.
          </p>
        </div>

        <dl data-stagger className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
          {s.stats.map((st) => (
            <div key={st.label} className="rounded-2xl border border-slate-100 bg-white px-4 py-5 text-center shadow-lg shadow-hero-950/5">
              <dd className="font-display text-2xl font-extrabold text-navy sm:text-3xl">{st.value}</dd>
              <dt className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{st.label}</dt>
            </div>
          ))}
        </dl>

        <PlacementsFilter records={placementRecords} regions={placementRegions} />

        <div
          data-reveal
          className="mt-14 flex flex-col items-start gap-6 rounded-3xl bg-hero-950 p-8 text-white md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <Eyebrow dark>{s.capstone.eyebrow}</Eyebrow>
            <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight">
              Want to see the capstone projects behind these offers?
            </h3>
            <p className="mt-2 text-slate-300">{s.capstone.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {s.capstone.links.map((l, i) => (
              <NavLink
                key={l.href}
                href={l.href}
                className={
                  i === 0
                    ? "group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-6 py-3 font-bold text-hero-950"
                    : "inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/40"
                }
              >
                {l.label}
                {i === 0 && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlacementStories() {
  const s = placementStories;
  return (
    <DarkSection>
      <SectionHeading dark eyebrow={s.eyebrow} title={<>What students say about <span className="text-gradient">the project work</span></>} text={s.text} />
      <Note dark>
        Stories carried over from another techcadd centre&apos;s site, so the cities named are that centre&apos;s.
        Lucknow stories will replace them.
      </Note>
      <ul data-stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {s.items.map((t) => (
          <li
            key={t.name + t.role}
            data-spot
            className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-7"
          >
            <div className="flex items-center justify-between">
              <Quote className="size-7 text-cyan/50" />
              {t.rating && (
                <span aria-label={`${t.rating} out of 5`} className="flex gap-0.5 text-sun">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`size-4 ${i < t.rating! ? "fill-current" : "text-white/20"}`} />
                  ))}
                </span>
              )}
            </div>
            <blockquote className="mt-4 flex-1 leading-relaxed text-slate-200">{t.text}</blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan to-sky font-display text-sm font-bold text-hero-950">
                {initials(t.name)}
              </span>
              <span>
                <span className="block font-display font-bold text-white">{t.name}</span>
                <span className="block text-sm text-slate-400">
                  {t.role} · {t.where}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </DarkSection>
  );
}
