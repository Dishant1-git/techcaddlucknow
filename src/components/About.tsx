import { NavLink } from "./NavLink";
import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  Code,
  Eye,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { aboutHighlights, aboutPrinciples, campusBadges, site, stats } from "@/lib/site";
import { BookDemoButton } from "./Enquiry";
import { Eyebrow, Heading, LightSection } from "./ui";

const principleIcons = [Code, Users, Briefcase, Award];

export function About() {
  return (
    <LightSection id="about">
      {/* Intro */}
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>
            About {site.name} {site.city}
          </Eyebrow>
          <Heading className="mt-5">
            An institute built around
            <br />
            <span className="text-gradient">one outcome: your career</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            {site.name} {site.city} is a technology training institute where
            students, graduates and working professionals learn the skills
            employers are hiring for today — artificial intelligence, software
            development, data, cloud, cyber security and design.
          </p>
          <p data-reveal className="mt-4 leading-relaxed text-slate-600">
            Our programmes are designed with practising engineers and delivered
            through live projects, so every learner leaves with demonstrable
            work, a course certificate and structured placement
            support — not just classroom hours.
          </p>

          <ul data-stagger className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {aboutHighlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[15px] font-medium text-slate-700">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <NavLink
              href="/#why"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
            >
              Why {site.name} <ArrowRight className="size-4" />
            </NavLink>
            <BookDemoButton className="rounded-full border border-slate-200 bg-white px-7 py-3.5 font-semibold text-navy transition hover:border-brand hover:text-brand">
              Talk to a counsellor
            </BookDemoButton>
          </div>
        </div>

        {/* At-a-glance panel */}
        <div data-reveal="right" className="relative lg:pl-6">
          <div data-speed="0.25" className="absolute -right-3 -top-3 hidden h-full w-full rounded-[2rem] border border-brand/30 sm:block lg:left-9" />
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-hero-950 p-7 text-white shadow-2xl shadow-hero-950/30 sm:p-9">
            <div className="bg-grid-dark absolute inset-0 -z-10" />
            <div className="glow-dark absolute inset-0 -z-10" />

            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
                {site.name} at a glance
              </p>
              <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200">
                <span className="size-1.5 rounded-full bg-emerald-400" /> Admissions open
              </span>
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
              {stats.map((s) => (
                <div key={s.label} className="bg-hero-900/90 p-5 sm:p-6">
                  <dd className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {s.value.toLocaleString("en-IN")}
                    <span className="text-cyan">{s.suffix}</span>
                  </dd>
                  <dt className="mt-1 text-sm text-slate-300">{s.label}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan to-brand">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <p className="font-display font-bold">Placement support until you are hired</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  Resume building, mock interviews and hiring drives continue
                  after your course ends.
                </p>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {campusBadges.map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div data-stagger className="mt-20 grid gap-6 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-hero-950/5 sm:p-10">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan to-sky" />
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
              <Eye className="size-6" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                Where we are going
              </p>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy">
                Our Vision
              </h3>
            </div>
          </div>
          <p className="mt-6 text-[17px] leading-relaxed text-slate-600">
            To be the institute {site.city}&apos;s employers name first — where
            anyone, regardless of background, can walk in without a line of code
            to their name and walk out a professional a company is glad to have
            hired.
          </p>
        </article>

        <article className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-hero-900 p-8 text-white shadow-xl shadow-brand/25 sm:p-10">
          <div className="bg-grid-dark absolute inset-0 -z-10" />
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/15">
              <Target className="size-6" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
                What we do daily
              </p>
              <h3 className="font-display text-2xl font-extrabold tracking-tight">Our Mission</h3>
            </div>
          </div>
          <p className="mt-6 text-[17px] leading-relaxed text-slate-100">
            To teach what the industry genuinely runs on, in sessions small
            enough that a trainer notices when you are stuck, on projects with
            real requirements and deadlines — and to stay with every student
            until the offer letter arrives.
          </p>
        </article>
      </div>

      {/* Principles */}
      <div data-reveal className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-xl shadow-hero-950/5 sm:grid-cols-2 lg:grid-cols-4">
        {aboutPrinciples.map((p, i) => {
          const Icon = principleIcons[i];
          return (
            <div key={p.title} className="group bg-white p-7 transition hover:bg-sky/5">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-white transition group-hover:bg-brand">
                  <Icon className="size-5" />
                </span>
                <span className="font-display text-sm font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h4 className="mt-5 font-display text-lg font-bold text-navy">{p.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
            </div>
          );
        })}
      </div>
    </LightSection>
  );
}
