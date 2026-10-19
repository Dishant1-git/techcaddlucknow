"use client";
import { useSite } from "../../SiteContext";

import { NavLink } from "../../NavLink";
import { useId, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Box,
  Building2,
  Cloud,
  Code,
  Layers,
  Megaphone,
  Monitor,
  Phone,
  Search,
  Shield,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";
import { estimateFor, locations, roles, type LocationId } from "@/lib/resources/tools/salary";
import { resourceRoutes } from "@/lib/resources/routes";
import { BookDemoButton } from "../../Enquiry";
import { choiceClass } from "./styles";

const icons: Record<string, typeof Code> = {
  code: Code,
  search: Search,
  chart: BarChart3,
  cube: Box,
  terminal: Terminal,
  layers: Layers,
  megaphone: Megaphone,
  sparkles: Sparkles,
  cloud: Cloud,
  shield: Shield,
  monitor: Monitor,
  target: Target,
};

export function SalaryTool() {
  const site = useSite(); // CMS Settings, over the built-in details
  const id = useId();
  const [roleTitle, setRoleTitle] = useState(roles[0].title);
  const [location, setLocation] = useState<LocationId>("lucknow");
  const role = roles.find((r) => r.title === roleTitle) ?? roles[0];
  const est = estimateFor(role, location);
  const RoleIcon = icons[role.icon] ?? Code;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-7">
        <div>
          <p id={`${id}-role`} className="mb-3 block text-[13px] font-bold text-navy">
            1. Pick a role
          </p>
          <div role="group" aria-labelledby={`${id}-role`} className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
            {roles.map((r) => {
              const Icon = icons[r.icon] ?? Code;
              const on = r.title === roleTitle;
              return (
                <button
                  key={r.title}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setRoleTitle(r.title)}
                  className={`flex items-center gap-2.5 ${choiceClass(on)}`}
                >
                  <Icon className="size-4 shrink-0 text-brand" />
                  {r.title}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p id={`${id}-loc`} className="mb-3 block text-[13px] font-bold text-navy">
            2. Where do you want to work?
          </p>
          <div role="group" aria-labelledby={`${id}-loc`} className="grid gap-2 sm:grid-cols-3">
            {locations.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={location === l.id}
                onClick={() => setLocation(l.id)}
                className={`text-center ${choiceClass(location === l.id)}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="space-y-5">
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white">
              <RoleIcon className="size-6" />
            </span>
            <div>
              <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">{role.title}</h2>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{role.blurb}</p>
            </div>
          </div>

          <dl className="mt-7 space-y-5">
            {(
              [
                ["Fresher", est.fresher, "from-cyan to-sky"],
                ["After 2 years", est.after2, "from-brand to-sky"],
              ] as const
            ).map(([label, e, gradient]) => (
              <div key={label}>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</dt>
                  <dd className="font-display text-2xl font-extrabold text-navy">{e.label}</dd>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200" aria-hidden>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-[width] duration-500`}
                    style={{ width: `${e.width}%` }}
                  />
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[13px] leading-relaxed text-slate-500">
            Indicative ranges for entry-level {role.title} roles in {est.location}, compiled from public job-market
            listings. Actual offers vary by employer, skillset and interview performance.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-hero-950/5">
          <p className="flex items-center gap-2 font-display font-bold text-navy">
            <Building2 className="size-5 text-brand" /> Where {role.title} graduates get hired
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
            {role.hiredAt.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                {h}
              </li>
            ))}
          </ul>
          <NavLink href={role.courseHref} className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
            {role.courseCta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </div>

        <div className="relative isolate overflow-hidden rounded-3xl bg-hero-950 p-6 text-white">
          <div className="bg-grid-dark absolute inset-0 -z-10" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">Free consultation call</p>
          <p className="mt-2 font-display text-xl font-extrabold">
            Talk through {role.article} {role.title} career
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <NavLink
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:border-white/40"
            >
              <Phone className="size-4" /> Call now — {site.phone}
            </NavLink>
            <BookDemoButton
              course={role.course}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-5 py-2.5 text-sm font-bold text-hero-950 transition hover:brightness-110"
            >
              Request a free callback
            </BookDemoButton>
          </div>
          <p className="mt-4 text-[12px] text-slate-400">Always free. No fee for the call, no obligation to enrol.</p>
        </div>
        <p className="text-sm text-slate-600">
          Not sure which role fits you?{" "}
          <NavLink href={resourceRoutes.careerTrack} className="font-semibold text-brand hover:underline">
            Take the Career Track quiz.
          </NavLink>
        </p>
      </div>
    </div>
  );
}
