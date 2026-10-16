"use client";

import { NavLink } from "../../NavLink";
import { useId, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Box,
  Briefcase,
  Building2,
  CalendarCheck,
  Check,
  Code,
  FileDown,
  Layers,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import {
  branches,
  DEFAULT_SEMESTER,
  semesters,
  universities,
  yearFor,
  yearTracks,
} from "@/lib/resources/tools/trainingMatcher";
import { BookDemoButton } from "../../Enquiry";
import { choiceClass, inputClass, labelClass } from "./styles";

const icons: Record<string, typeof Code> = {
  code: Code,
  terminal: Terminal,
  layers: Layers,
  cube: Box,
  building: Building2,
  bolt: Zap,
  sparkles: Sparkles,
  briefcase: Briefcase,
};

export function TrainingMatcherTool() {
  const id = useId();
  const [university, setUniversity] = useState(universities[0]);
  const [branch, setBranch] = useState<string>(branches[0].label);
  const [semester, setSemester] = useState<number>(DEFAULT_SEMESTER);
  const track = yearTracks[yearFor(semester)];
  const uni = university === "Other" ? "your university" : university;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-7">
        <div>
          <label htmlFor={`${id}-uni`} className={labelClass}>
            1. Select your university
          </label>
          <select id={`${id}-uni`} value={university} onChange={(e) => setUniversity(e.target.value)} className={inputClass}>
            {universities.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <p id={`${id}-branch`} className={labelClass}>
            2. Select your branch / stream
          </p>
          <div role="group" aria-labelledby={`${id}-branch`} className="grid gap-2 sm:grid-cols-2">
            {branches.map((b) => {
              const Icon = icons[b.icon] ?? Code;
              const on = branch === b.label;
              return (
                <button
                  key={b.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setBranch(b.label)}
                  className={`flex items-center gap-2.5 ${choiceClass(on)}`}
                >
                  <Icon className="size-4 shrink-0 text-brand" />
                  <span className="flex-1">{b.label}</span>
                  {on && <Check className="size-4 shrink-0 text-brand" />}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p id={`${id}-sem`} className={labelClass}>
            3. Choose your current semester
          </p>
          <div role="group" aria-labelledby={`${id}-sem`} className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {semesters.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={semester === s}
                aria-label={`Semester ${s}`}
                onClick={() => setSemester(s)}
                className={`px-0 text-center ${choiceClass(semester === s)}`}
              >
                Sem {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="flex flex-col">
        <div className="relative isolate flex-1 overflow-hidden rounded-3xl bg-hero-950 p-7 text-white">
          <div className="bg-grid-dark absolute inset-0 -z-10" />
          <div className="glow-dark absolute inset-0 -z-10" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-cyan/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">
              {track.tag}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
              Semester {semester} match
            </span>
          </div>
          <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{track.title}</h2>
          <p className="mt-3 leading-relaxed text-slate-300">{track.blurb}</p>
          <p className="mt-5 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-200">
            <CalendarCheck className="mt-0.5 size-4 shrink-0 text-cyan" />
            <span>
              Check the exact duration and format your department at {uni} asks for — we structure the project and
              documents to match.
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BookDemoButton
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-5 py-3 text-sm font-bold text-hero-950 transition hover:brightness-110"
            >
              <FileDown className="size-4" /> Get syllabus &amp; timings
            </BookDemoButton>
            <NavLink
              href={track.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              About this programme <ArrowRight className="size-4" />
            </NavLink>
          </div>
        </div>
        <a
          href="#project-tracks"
          className="mt-4 inline-flex items-center gap-2 self-start text-sm font-bold text-brand"
        >
          <ArrowDown className="size-4" /> Live project tracks for {branch}
        </a>
      </div>
    </div>
  );
}
