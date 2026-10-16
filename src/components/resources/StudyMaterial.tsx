// Sections of the free study material page.
import { ArrowUpRight, BadgeCheck, BookMarked, GraduationCap, Infinity as InfinityIcon, Wrench } from "lucide-react";
import {
  studyCategories,
  studyLibrary,
  studyResources,
  studyTransition,
  studyValues,
} from "@/lib/resources/study-material";
import { NavLink } from "../NavLink";
import { DarkSection, LightSection, SectionHeading, cardRow } from "../ui";
import { StudyLibrary } from "./StudyLibrary";

const valueIcons = [GraduationCap, Wrench, BookMarked, InfinityIcon];

/** Four reasons the material can be trusted, straight under the hero. */
export function StudyValues() {
  return (
    <section className="bg-slate-50 px-5 py-16 lg:px-8 lg:py-20">
      <ul data-stagger className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {studyValues.map((v, i) => {
          const Icon = valueIcons[i] ?? BadgeCheck;
          return (
            <li key={v.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
                <Icon className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-lg font-bold text-navy">{v.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{v.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function StudyLibrarySection() {
  return (
    <LightSection id="library">
      <SectionHeading
        eyebrow={studyLibrary.eyebrow}
        title={
          <>
            Download, bookmark &amp; <span className="text-gradient">study anytime</span>
          </>
        }
        text={studyLibrary.text}
      />
      <StudyLibrary categories={studyCategories} resources={studyResources} />
    </LightSection>
  );
}

/** "Hands-On Transition": courses and free tools that turn notes into practice. */
export function StudyTransition() {
  const { row, card } = cardRow(studyTransition.items.length);
  return (
    <DarkSection>
      <SectionHeading
        dark
        eyebrow={studyTransition.eyebrow}
        title={
          <>
            Turn theory into <span className="text-gradient">production-ready engineering</span>
          </>
        }
        text={studyTransition.text}
      />
      <ul data-stagger className={`mt-14 ${row}`}>
        {studyTransition.items.map((t) => (
          <li key={t.title} className={card}>
            <NavLink
              href={t.href}
              data-spot
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-1 hover:border-cyan/40 hover:bg-white/[0.08]"
            >
              <h3 className="font-display text-xl font-bold text-white">{t.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-300">{t.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan">
                {t.cta}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </DarkSection>
  );
}
