"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type OutcomeTab = { key: string; label: string; icon: ReactNode; count?: number };

/**
 * Tab bar over pre-rendered panels (the After 12th outcomes section). Every
 * panel stays in the page, the inactive ones hidden, so all the copy is in the
 * HTML; arrow keys move between tabs.
 */
export function OutcomeTabs({ tabs, panels }: { tabs: OutcomeTab[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const first = useRef(true);

  // A different panel changes the page height under every scroll trigger.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    document.dispatchEvent(new Event("layoutchange"));
  }, [active]);

  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  // A single group needs no tab bar.
  if (tabs.length === 1) return <>{panels[0]}</>;

  return (
    <div>
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="Outcomes"
          onKeyDown={onKey}
          className="mx-auto flex w-max gap-1.5 rounded-full border border-slate-200 bg-white p-1.5 shadow-lg shadow-hero-950/5"
        >
          {tabs.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.key}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${
                  selected ? "bg-navy text-white shadow-md" : "text-slate-600 hover:bg-slate-100 hover:text-navy"
                }`}
              >
                <span className={`[&>svg]:size-4 ${selected ? "text-cyan" : "text-brand"}`}>{t.icon}</span>
                {t.label}
                {t.count ? (
                  <span
                    className={`rounded-full px-1.5 text-[11px] font-bold ${
                      selected ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {t.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {panels.map((panel, i) => (
        <div
          key={tabs[i].key}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          className="mt-8"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
