"use client";

import { NavLink } from "../../NavLink";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Briefcase,
  Check,
  Clock,
  Code,
  Megaphone,
  Printer,
  RotateCcw,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  categories,
  courseByCategory,
  matchingCoursesHref,
  questions,
  winner,
  type CategoryKey,
} from "@/lib/resources/tools/careerTrack";
import { resourceRoutes } from "@/lib/resources/routes";

const icons: Record<string, typeof Code> = {
  sparkles: Sparkles,
  code: Code,
  shield: Shield,
  megaphone: Megaphone,
  cube: Box,
  terminal: Terminal,
};

const letters = ["A", "B", "C", "D"];

// Printing (or "Save as PDF") shows only the roadmap: every sibling along the
// roadmap's ancestor chain is hidden, and the ancestors lose their spacing.
const printCss = `@media print {
  *:has(#career-roadmap) > *:not(:has(#career-roadmap)):not(#career-roadmap) { display: none !important; }
  *:has(#career-roadmap) { margin: 0 !important; padding: 0 !important; border: 0 !important; box-shadow: none !important; background: none !important; transform: none !important; }
  #career-roadmap { box-shadow: none !important; border: 0 !important; }
}`;

export function CareerTrackQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CategoryKey[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const done = answers.length === questions.length;
  const q = questions[step];

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    timer.current = setTimeout(() => {
      setAnswers((a) => [...a.slice(0, step), q.options[i].category]);
      setStep((s) => Math.min(s + 1, questions.length - 1));
      setPicked(null);
    }, 240);
  }

  function back() {
    if (step === 0) return;
    setAnswers((a) => a.slice(0, step - 1));
    setStep(step - 1);
  }

  function retake() {
    setAnswers([]);
    setStep(0);
    setPicked(null);
    top.current?.scrollIntoView({ block: "start" });
  }

  return (
    <div ref={top} className="scroll-mt-28">
      {/* Stepper */}
      <ol className="grid grid-cols-4 gap-2 print:hidden" aria-label="Quiz progress">
        {questions.map((x, i) => {
          const complete = i < answers.length;
          const current = !done && i === step;
          return (
            <li key={x.label} className="min-w-0">
              <div className={`h-1.5 rounded-full ${complete ? "bg-brand" : current ? "bg-brand/40" : "bg-slate-200"}`} />
              <p
                className={`mt-2 flex items-center gap-1 truncate text-[11px] font-bold uppercase tracking-[0.12em] ${
                  complete || current ? "text-navy" : "text-slate-400"
                }`}
                aria-current={current ? "step" : undefined}
              >
                {complete && <Check className="size-3.5 shrink-0 text-emerald-500" />}
                <span className="truncate">
                  {i + 1}. {x.label}
                </span>
              </p>
            </li>
          );
        })}
      </ol>

      {!done ? (
        <div className="mt-8" aria-live="polite">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Question {step + 1} of {questions.length}
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{q.question}</h2>
          <p className="mt-2 text-slate-600">{q.sub}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {q.options.map((o, i) => {
              const on = picked === i;
              return (
                <button
                  key={o.title}
                  type="button"
                  onClick={() => choose(i)}
                  className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition ${
                    on
                      ? "border-brand bg-brand/5 ring-2 ring-brand/20"
                      : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-hero-950/5"
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl font-display font-extrabold transition ${
                      on ? "bg-brand text-white" : "bg-brand/8 text-brand group-hover:bg-brand group-hover:text-white"
                    }`}
                  >
                    {letters[i]}
                  </span>
                  <span>
                    <span className="block font-display font-bold text-navy">{o.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">{o.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-brand"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
          )}
        </div>
      ) : (
        <Result category={winner(answers)} onRetake={retake} />
      )}
    </div>
  );
}

function Result({ category, onRetake }: { category: CategoryKey; onRetake: () => void }) {
  const cat = categories.find((c) => c.key === category) ?? categories[0];
  const course = courseByCategory[category];
  const Icon = icons[cat.icon] ?? Sparkles;
  const steps = [
    {
      title: "Free counselling call",
      body: `Confirm ${course.title} is the right fit and lock a session that matches your schedule.`,
    },
    {
      title: `Start ${course.title}`,
      body: course.duration
        ? `${course.duration} of live, project-based classes with a working trainer.`
        : "Live, project-based classes with a working trainer.",
    },
    {
      title: "Portfolio piece + placement support",
      body: "Finish with a project you can show in interviews and introductions to our hiring partners.",
    },
  ];

  return (
    <div className="mt-8">
      <style>{printCss}</style>
      <div id="career-roadmap" className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Your best-fit track</p>
        <h2 className="mt-3 flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-4xl">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
            <Icon className="size-6" />
          </span>
          {cat.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">{cat.blurb}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-brand/15 bg-brand/[0.03] p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Recommended course</p>
            <h3 className="mt-2 font-display text-xl font-bold text-navy">
              <NavLink href={course.href} className="hover:text-brand">
                {course.title}
              </NavLink>
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{course.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-[13px] font-semibold text-slate-700">
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">
                <Clock className="size-3.5 text-brand" /> {course.duration ?? "Flexible sessions"}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">
                <Briefcase className="size-3.5 text-brand" /> {course.roles.slice(0, 2).join(" · ")}
              </li>
            </ul>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Job titles to apply for</p>
            <ul className="mt-3 space-y-1.5">
              {course.roles.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-slate-700">
                  <Check className="size-4 shrink-0 text-emerald-500" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Your 90-day roadmap</p>
            <ol className="mt-4 space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy font-display font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display font-bold text-navy">{s.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <NavLink
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-bold text-white transition hover:bg-brand"
          >
            Talk to a counsellor
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
          <NavLink
            href={matchingCoursesHref(category)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-navy transition hover:border-brand hover:text-brand"
          >
            See matching courses
          </NavLink>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-navy transition hover:border-brand hover:text-brand"
          >
            <Printer className="size-4" /> Print / save as PDF
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-slate-600 transition hover:text-brand"
          >
            <RotateCcw className="size-4" /> Retake the quiz
          </button>
        </div>

        <ul className="mt-8 space-y-2 border-t border-slate-100 pt-6 text-sm text-slate-600 print:hidden">
          <li>
            Need this for university-mandated training?{" "}
            <NavLink href={resourceRoutes.trainingMatcher} className="font-semibold text-brand hover:underline">
              Match your semester to a live project track.
            </NavLink>
          </li>
          <li>
            Curious what {cat.title} roles actually pay?{" "}
            <NavLink href={resourceRoutes.salary} className="font-semibold text-brand hover:underline">
              Check the Salary Estimator.
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
