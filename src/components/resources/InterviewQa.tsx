// Sections of the tech interview questions page.
import { ArrowRight, ArrowUpRight, Bot, Briefcase, Code2, GitBranch, Rocket, Target } from "lucide-react";
import {
  interviewDomains,
  placementSupport,
  recruiterRules,
  simulator,
} from "@/lib/resources/interview";
import { NavLink } from "../NavLink";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "../ui";
import { InterviewTabs } from "./InterviewTabs";
import { pad } from "./Kit";

const ruleIcons = [GitBranch, Target, Code2, Rocket];
const isExternal = (href: string) => /^https?:/.test(href);

/** Four recruiter rules for clearing technical rounds. */
export function RecruiterRules() {
  return (
    <LightSection>
      <SectionHeading
        eyebrow={recruiterRules.eyebrow}
        title={
          <>
            Four rules to clear technical rounds in{" "}
            <span className="text-gradient">Lucknow IT drives</span>
          </>
        }
        text={recruiterRules.text}
      />
      <ol data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recruiterRules.items.map((r, i) => {
          const Icon = ruleIcons[i] ?? Target;
          return (
            <li
              key={r.title}
              data-spot
              className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5"
            >
              <span aria-hidden className="absolute right-6 top-5 font-display text-4xl font-extrabold text-slate-100">
                {pad(i + 1)}
              </span>
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-navy">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{r.text}</p>
            </li>
          );
        })}
      </ol>
    </LightSection>
  );
}

/** Domain tabs with the questions and model answers. */
export function InterviewBank() {
  return (
    <section id="questions" className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Question bank"
          title={
            <>
              Questions recruiters <span className="text-gradient">actually ask</span>
            </>
          }
          text="Pick a domain, open a question and compare the model answer with your own. Every answer is written the way a hiring panel expects to hear it."
        />
        <InterviewTabs domains={interviewDomains} />
      </div>
    </section>
  );
}

function CtaLink({ href, label, primary, dark }: { href: string; label: string; primary?: boolean; dark?: boolean }) {
  const external = isExternal(href);
  const cls = primary
    ? dark
      ? "bg-gradient-to-r from-cyan to-sky text-hero-950 shadow-[0_0_40px_-10px] shadow-cyan hover:brightness-110"
      : "bg-navy text-white hover:bg-brand"
    : dark
      ? "border border-white/15 bg-white/5 text-white hover:border-white/40"
      : "border border-slate-200 bg-white text-navy hover:border-brand hover:text-brand";
  return (
    <NavLink
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold transition ${cls}`}
    >
      {label}
      {external ? (
        <ArrowUpRight className="size-4" />
      ) : (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </NavLink>
  );
}

/** AI mock interview simulator call-out and the placement cell's 1:1 mock rounds. */
export function PracticePanels() {
  return (
    <DarkSection>
      <div className="grid gap-6 lg:grid-cols-2">
        <div data-reveal="left" className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
          <span className="grid size-12 place-items-center rounded-2xl bg-cyan/15 text-cyan">
            <Bot className="size-6" />
          </span>
          <div className="mt-6">
            <Eyebrow dark>{simulator.eyebrow}</Eyebrow>
          </div>
          <Heading dark className="mt-5 lg:!text-4xl">
            Ready to test your answers in a <span className="text-gradient">live AI simulation?</span>
          </Heading>
          <p className="mt-5 flex-1 leading-relaxed text-slate-300">{simulator.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {simulator.links.map((l, i) => (
              <CtaLink key={l.label} href={l.href} label={l.label} primary={i === 0} dark />
            ))}
          </div>
        </div>

        <div data-reveal="right" className="flex flex-col rounded-3xl bg-white p-8 text-navy shadow-2xl shadow-hero-950/30 sm:p-10">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
            <Briefcase className="size-6" />
          </span>
          <div className="mt-6">
            <Eyebrow>{placementSupport.eyebrow}</Eyebrow>
          </div>
          <Heading className="mt-5 lg:!text-4xl">
            Want 1:1 mock technical interviews &amp; <span className="text-gradient">resume overhauls?</span>
          </Heading>
          <p className="mt-5 flex-1 leading-relaxed text-slate-600">{placementSupport.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {placementSupport.links.map((l, i) => (
              <CtaLink key={l.label} href={l.href} label={l.label} primary={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </DarkSection>
  );
}
