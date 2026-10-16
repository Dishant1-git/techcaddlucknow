// Sections of the student projects portfolio page.
import { ArrowRight, Code2, GitPullRequest, Globe, ScrollText } from "lucide-react";
import {
  buildCta,
  capstoneFilters,
  capstoneIntro,
  capstoneList,
  pillars,
} from "@/lib/resources/projects";
import { BookDemoButton } from "../Enquiry";
import { NavLink } from "../NavLink";
import { DarkSection, Eyebrow, Heading, SectionHeading } from "../ui";
import { CapstoneGrid } from "./CapstoneGrid";

const pillarIcons = [Code2, GitPullRequest, ScrollText, Globe];

/** Four things every capstone has in common. */
export function ProjectPillars() {
  return (
    <section className="bg-white px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
      <ul data-stagger className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => {
          const Icon = pillarIcons[i] ?? Code2;
          return (
            <li key={p.title} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
                <Icon className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-lg font-bold text-navy">{p.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{p.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Capstones() {
  return (
    <section id="capstones" className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow={capstoneIntro.eyebrow}
        title={
          <>
            Inspect what techcadd <span className="text-gradient">students build</span>
          </>
        }
        text={capstoneIntro.text}
      />
      <CapstoneGrid items={capstoneList} filters={capstoneFilters} ctaHref={buildCta.href} />
      </div>
    </section>
  );
}

/** "Build your capstone" call-out leading to industrial training. */
export function BuildCapstone() {
  return (
    <DarkSection>
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow dark>{buildCta.eyebrow}</Eyebrow>
        <Heading dark className="mt-5">
          Ready to engineer a <span className="text-gradient">resume-defining project?</span>
        </Heading>
        <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
          {buildCta.text}
        </p>
        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <NavLink
            href={buildCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-7 py-3.5 font-bold text-hero-950 shadow-[0_0_40px_-10px] shadow-cyan transition hover:brightness-110"
          >
            Industrial training in Lucknow
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
          <BookDemoButton className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:border-white/40">
            Book free counselling
          </BookDemoButton>
        </div>
      </div>
    </DarkSection>
  );
}
