"use client";

import { NavLink } from "../../NavLink";
import { useId, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Award,
  Calculator,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock,
  Copy,
  Layers,
} from "lucide-react";
import {
  averageSgpa,
  DEFAULT_CGPA,
  defaultSgpas,
  division,
  eligibility,
  formulas,
  safeMultiplier,
  semesterCounts,
  toPercentage,
  type Division,
} from "@/lib/resources/tools/cgpa";
import { useCopy } from "./ToolClient";
import { choiceClass, inputClass, labelClass } from "./styles";

const tones: Record<Division["tone"], { pill: string; icon: typeof Award }> = {
  emerald: { pill: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: Award },
  blue: { pill: "bg-blue-50 text-blue-700 border-blue-200", icon: CheckCircle2 },
  amber: { pill: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  slate: { pill: "bg-slate-100 text-slate-700 border-slate-200", icon: CircleHelp },
  rose: { pill: "bg-rose-50 text-rose-700 border-rose-200", icon: AlertCircle },
};

export function CgpaCalculator() {
  const id = useId();
  const [mode, setMode] = useState<"cgpa" | "semesters">("cgpa");
  const [formulaId, setFormulaId] = useState<(typeof formulas)[number]["id"]>("standard");
  const [customText, setCustomText] = useState("9.5");
  const [cgpaText, setCgpaText] = useState(String(DEFAULT_CGPA));
  const [semesters, setSemesters] = useState<number>(8);
  const [sgpas, setSgpas] = useState<string[]>(defaultSgpas);
  const { copied, copy } = useCopy();

  const formula = formulas.find((f) => f.id === formulaId) ?? formulas[0];
  const custom = safeMultiplier(Number(customText));
  const sliderCgpa = Math.min(10, Math.max(0, Number(cgpaText) || 0));
  const cgpa = mode === "semesters" ? averageSgpa(sgpas.slice(0, semesters)) : sliderCgpa;
  const pct = toPercentage(cgpa, formula, custom);
  const div = division(pct);
  const tone = tones[div.tone];
  const multiplier = formula.id === "custom" ? custom : formula.multiplier;
  const breakdown =
    formula.offset !== undefined
      ? `(${cgpa.toFixed(2)} − ${formula.offset}) × ${multiplier} = ${pct.toFixed(2)}%`
      : `${cgpa.toFixed(2)} × ${multiplier} = ${pct.toFixed(2)}%`;
  const summary = `CGPA: ${cgpa.toFixed(2)} | Percentage: ${pct.toFixed(2)}% (${formula.id === "custom" ? `× ${custom}` : formula.shortName}) | Division: ${div.label}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Inputs */}
      <div>
        <div role="group" aria-label="Calculation mode" className="grid gap-2 sm:grid-cols-2">
          {(
            [
              { value: "cgpa", label: "Overall CGPA to %", icon: Calculator },
              { value: "semesters", label: "Semester SGPAs to CGPA & %", icon: Layers },
            ] as const
          ).map((m) => (
            <button
              key={m.value}
              type="button"
              aria-pressed={mode === m.value}
              onClick={() => setMode(m.value)}
              className={`flex items-center gap-2.5 ${choiceClass(mode === m.value)}`}
            >
              <m.icon className="size-4 shrink-0 text-brand" />
              {m.label}
            </button>
          ))}
        </div>

        <div className="mt-7">
          <label htmlFor={`${id}-formula`} className={labelClass}>
            Conversion formula
          </label>
          <select
            id={`${id}-formula`}
            value={formulaId}
            onChange={(e) => setFormulaId(e.target.value as typeof formulaId)}
            className={inputClass}
          >
            {formulas.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-semibold text-navy">Formula:</span>{" "}
            {formula.id === "custom" ? `Percentage = CGPA × ${custom}` : formula.formula}
            <span className="mt-0.5 block text-[13px] text-slate-500">{formula.note}</span>
          </p>
        </div>

        {formula.id === "custom" && (
          <div className="mt-6">
            <label htmlFor={`${id}-mult`} className={labelClass}>
              Custom multiplier (1–20, e.g. 9.5, 10 or 8.9)
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                id={`${id}-mult`}
                type="number"
                inputMode="decimal"
                min={1}
                max={20}
                step={0.01}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className={`${inputClass} max-w-[10rem]`}
              />
              <span className="text-sm text-slate-600">Percentage = CGPA × {custom}</span>
            </div>
            {customText !== "" && safeMultiplier(Number(customText)) !== Number(customText) && (
              <p className="mt-2 text-[13px] text-amber-700">Out of range — using 9.5 until you enter a value from 1 to 20.</p>
            )}
          </div>
        )}

        {mode === "cgpa" ? (
          <div className="mt-7">
            <div className="flex items-end justify-between gap-4">
              <label htmlFor={`${id}-cgpa`} className={labelClass}>
                Your cumulative grade point average (CGPA)
              </label>
              <span className="mb-2 font-display text-2xl font-extrabold text-navy">{sliderCgpa.toFixed(2)}</span>
            </div>
            <input
              id={`${id}-cgpa`}
              type="range"
              min={0}
              max={10}
              step={0.05}
              value={sliderCgpa}
              onChange={(e) => setCgpaText(e.target.value)}
              className="w-full accent-brand"
            />
            <div className="mt-1 flex justify-between text-[11px] font-semibold text-slate-400">
              <span>0.0</span>
              <span>5.0</span>
              <span>7.5</span>
              <span>10.0</span>
            </div>
            <label htmlFor={`${id}-cgpa-n`} className="mt-4 block text-[13px] font-semibold text-slate-600">
              Or type it exactly
            </label>
            <input
              id={`${id}-cgpa-n`}
              type="number"
              inputMode="decimal"
              min={0}
              max={10}
              step={0.01}
              value={cgpaText}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || (Number(v) >= 0 && Number(v) <= 10)) setCgpaText(v);
              }}
              className={`${inputClass} mt-2 max-w-[10rem]`}
            />
          </div>
        ) : (
          <div className="mt-7">
            <p className={labelClass}>Number of completed semesters</p>
            <div role="group" aria-label="Number of completed semesters" className="grid grid-cols-4 gap-2">
              {semesterCounts.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={semesters === n}
                  onClick={() => setSemesters(n)}
                  className={`text-center ${choiceClass(semesters === n)}`}
                >
                  {n} Sem
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {sgpas.slice(0, semesters).map((v, i) => (
                <div key={i}>
                  <label htmlFor={`${id}-sem-${i}`} className="mb-1.5 block text-[12px] font-bold text-slate-600">
                    Sem {String(i + 1).padStart(2, "0")} SGPA
                  </label>
                  <input
                    id={`${id}-sem-${i}`}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={10}
                    step={0.01}
                    placeholder="e.g. 8.2"
                    value={v}
                    onChange={(e) => setSgpas((s) => s.map((x, j) => (j === i ? e.target.value : x)))}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Calculated cumulative CGPA: <strong className="text-navy">{cgpa.toFixed(2)}</strong> / 10.0
            </p>
          </div>
        )}

        <p className="mt-7 flex items-start gap-2 rounded-2xl bg-brand/5 px-4 py-3 text-[13px] leading-relaxed text-slate-600">
          <CircleHelp className="mt-0.5 size-4 shrink-0 text-brand" />
          <span>
            Check your university&apos;s official conversion rule before you quote a figure — it is usually on
            the back of your marksheet or grade card, or in the university ordinance (for example AKTU&apos;s
            published ordinances).
          </span>
        </p>
      </div>

      {/* Result */}
      <div className="space-y-5">
        <div className="relative isolate overflow-hidden rounded-3xl bg-hero-950 p-7 text-white">
          <div className="bg-grid-dark absolute inset-0 -z-10" />
          <div className="glow-dark absolute inset-0 -z-10" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">Calculated equivalent percentage</p>
          <p aria-live="polite" className="mt-3 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            {pct.toFixed(2)}%
          </p>
          <p className="mt-1 text-sm text-slate-300">from {cgpa.toFixed(2)} CGPA</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-bold ${tone.pill}`}>
              <tone.icon className="size-4" />
              {div.label}
            </span>
            <button
              type="button"
              onClick={() => copy("result", summary)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] font-semibold text-white transition hover:border-white/40"
            >
              {copied === "result" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span aria-live="polite">{copied === "result" ? "Copied to clipboard!" : "Copy result"}</span>
            </button>
          </div>
          <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-200">
            <span className="font-semibold text-white">Calculation breakdown:</span> {breakdown}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <h3 className="font-display text-lg font-bold text-navy">{eligibility.heading}</h3>
          <p className="mt-1 text-[13px] text-slate-600">{eligibility.text}</p>
          <ul className="mt-5 space-y-3">
            {eligibility.rows.map((r) => {
              const ok = r.eligible(cgpa, pct);
              return (
                <li key={r.companyType} className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-navy">{r.companyType}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        ok ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {ok ? "Eligible for drives ✓" : "Borderline / skills critical"}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-slate-500">
                    Requirement: {r.minCgpa} · {r.note}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 rounded-2xl border border-brand/15 bg-white p-4">
            <p className="font-semibold text-navy">{eligibility.callout.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{eligibility.callout.text}</p>
            <NavLink
              href={eligibility.callout.href}
              className="group mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand"
            >
              {eligibility.callout.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
