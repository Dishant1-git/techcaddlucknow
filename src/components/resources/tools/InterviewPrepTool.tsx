"use client";

import { useId, useState, type FormEvent } from "react";
import { Eye, EyeOff, RefreshCw, Sparkles, Target } from "lucide-react";
import {
  experienceLevels,
  parseQuestions,
  QUESTION_MAX,
  QUESTION_MIN,
  ROLE_MAX,
  rolePlaceholders,
  trackTitles,
  type InterviewQuestion,
} from "@/lib/resources/tools/interviewPrep";
import { callAiTool, CopyButton, Dots, ErrorNote } from "./ToolClient";
import { choiceClass, inputClass, labelClass, primaryButton, secondaryButton } from "./styles";

type Result = { questions: InterviewQuestion[]; raw: string; meta: string };

const counts = Array.from({ length: QUESTION_MAX - QUESTION_MIN + 1 }, (_, i) => QUESTION_MIN + i);

export function InterviewPrepTool() {
  const id = useId();
  const [track, setTrack] = useState(trackTitles[0]);
  const [role, setRole] = useState("");
  const [level, setLevel] = useState<string>(experienceLevels[0]);
  const [count, setCount] = useState(5);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [shown, setShown] = useState<Set<number>>(new Set());

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (pending) return;
    if (!role.trim()) {
      setError("Please describe the role or topic you're preparing for.");
      return;
    }
    setPending(true);
    setError("");
    const res = await callAiTool("/api/tools/interview-prep", { track, role, level, count });
    setPending(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setResult({ questions: parseQuestions(res.text), raw: res.text, meta: `${track} · ${role.trim()} · ${level}` });
    setShown(new Set());
  }

  const toggle = (i: number) =>
    setShown((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const allText = result
    ? result.questions.length
      ? result.questions
          .map((q, i) => `Q${i + 1}: ${q.question}\nAnswer: ${q.answer}\nLooking for: ${q.lookingFor}`)
          .join("\n\n")
      : result.raw
    : "";

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={submit} noValidate className="space-y-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">AI interview practice</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy">
            Generate your interview questions
          </h2>
        </div>
        <div>
          <label htmlFor={`${id}-track`} className={labelClass}>
            Interview track
          </label>
          <select id={`${id}-track`} value={track} onChange={(e) => setTrack(e.target.value)} className={inputClass}>
            {trackTitles.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-role`} className={labelClass}>
            Role or topic
          </label>
          <input
            id={`${id}-role`}
            required
            maxLength={ROLE_MAX}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder={rolePlaceholders[track]}
            className={inputClass}
          />
          <p className="mt-1.5 text-[12px] text-slate-500">Name the job, stack or project you expect to be asked about.</p>
        </div>
        <div>
          <label htmlFor={`${id}-level`} className={labelClass}>
            Experience level
          </label>
          <select id={`${id}-level`} value={level} onChange={(e) => setLevel(e.target.value)} className={inputClass}>
            {experienceLevels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <p id={`${id}-count`} className={labelClass}>
            Number of questions
          </p>
          <div role="group" aria-labelledby={`${id}-count`} className="grid grid-cols-6 gap-2">
            {counts.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={count === n}
                onClick={() => setCount(n)}
                className={`px-0 text-center ${choiceClass(count === n)}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        {error && <ErrorNote>{error}</ErrorNote>}
        <button type="submit" disabled={pending} className={`${primaryButton} w-full sm:w-auto`}>
          {pending ? (
            <>
              Writing your questions <Dots />
            </>
          ) : (
            <>
              <Sparkles className="size-4" /> {result ? "Generate a new set" : "Generate questions"}
            </>
          )}
        </button>
      </form>

      <div aria-live="polite" aria-busy={pending} className="min-w-0">
        {!result && !pending && (
          <div className="flex h-full min-h-[18rem] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand/8 text-brand">
              <Target className="size-7" />
            </span>
            <p className="mt-5 font-display text-lg font-bold text-navy">Your questions appear here</p>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              Each comes with a model answer — hidden until you&apos;ve tried answering out loud — and what the
              interviewer is looking for.
            </p>
          </div>
        )}
        {pending && !result && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        )}
        {result && (
          <div className={pending ? "opacity-50 transition-opacity" : "transition-opacity"}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-slate-500">{result.meta}</p>
              <div className="flex flex-wrap gap-2">
                {result.questions.length > 0 && (
                  <button
                    type="button"
                    className={secondaryButton}
                    onClick={() =>
                      setShown(
                        shown.size === result.questions.length
                          ? new Set()
                          : new Set(result.questions.map((_, i) => i)),
                      )
                    }
                  >
                    {shown.size === result.questions.length ? "Hide all answers" : "Show all answers"}
                  </button>
                )}
                <CopyButton text={allText} label="Copy all" copiedLabel="Copied all!" />
              </div>
            </div>
            {result.questions.length ? (
              <ol className="mt-5 space-y-3">
                {result.questions.map((q, i) => {
                  const open = shown.has(i);
                  return (
                    <li key={i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-hero-950/5">
                      <p className="flex gap-3 font-display font-bold leading-snug text-navy">
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand/8 text-[13px] text-brand">
                          {i + 1}
                        </span>
                        <span>{q.question}</span>
                      </p>
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => toggle(i)}
                        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand"
                      >
                        {open ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        {open ? "Hide model answer" : "Show model answer"}
                      </button>
                      {open && (
                        <div className="mt-3 space-y-3 text-[15px] leading-relaxed">
                          <p className="whitespace-pre-line rounded-xl bg-slate-50 p-4 text-slate-700">{q.answer}</p>
                          {q.lookingFor && (
                            <p className="flex gap-2 text-sm text-slate-600">
                              <Target className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                              <span>
                                <strong className="text-navy">Looking for:</strong> {q.lookingFor}
                              </span>
                            </p>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div className="mt-5 whitespace-pre-line rounded-2xl border border-slate-100 bg-slate-50 p-5 text-[15px] leading-relaxed text-slate-700">
                {result.raw}
              </div>
            )}
            <p className="mt-5 flex items-center gap-2 text-[12px] text-slate-500">
              <RefreshCw className="size-3.5" />
              AI-written answers can be wrong — check facts against official docs and use your own projects as examples.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
