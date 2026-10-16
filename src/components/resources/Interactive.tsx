"use client";

// Client-side pieces shared by the Resources pages.
import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

/** Row of filter chips; `value` is the selected option. */
export function Chips({
  options,
  value,
  onChange,
  dark = false,
  label,
}: {
  options: { value: string; label: string; count?: number }[];
  value: string;
  onChange: (value: string) => void;
  dark?: boolean;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              on
                ? dark
                  ? "border-cyan bg-cyan text-hero-950"
                  : "border-navy bg-navy text-white"
                : dark
                  ? "border-white/15 bg-white/5 text-slate-200 hover:border-white/40"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand/40 hover:text-brand"
            }`}
          >
            {o.label}
            {o.count != null && (
              <span className={`ml-1.5 text-xs ${on ? "opacity-80" : "opacity-60"}`}>{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Question-and-answer list; one item open at a time. Styled like the home page FAQ. */
export function Accordion({
  items,
  dark = false,
  firstOpen = true,
}: {
  items: { q: string; a: ReactNode; tag?: string }[];
  dark?: boolean;
  firstOpen?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(firstOpen ? 0 : null);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q + i}
            className={`rounded-2xl border transition-colors duration-300 ${
              dark
                ? isOpen
                  ? "border-cyan/40 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.04]"
                : isOpen
                  ? "border-brand/30 bg-white shadow-xl shadow-hero-950/5"
                  : "border-slate-100 bg-white"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-[17px] font-bold ${
                dark ? "text-white" : "text-navy"
              }`}
            >
              <span>
                {f.tag && (
                  <span
                    className={`mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] ${
                      dark ? "text-cyan" : "text-brand"
                    }`}
                  >
                    {f.tag}
                  </span>
                )}
                {f.q}
              </span>
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full transition ${
                  isOpen
                    ? "rotate-45 bg-cyan text-hero-950"
                    : dark
                      ? "bg-white/10"
                      : "bg-brand/8 text-brand"
                }`}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`overflow-hidden px-6 text-[15px] leading-relaxed ${
                  dark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <div className="pb-6">{f.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
