"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { OrbitTool } from "./ToolOrbit";

// Initials for a tool without a logo, with brand prefixes dropped
// ("Microsoft Office" → O, "Remote Desktop" → RD).
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => !["Microsoft", "Basic", "&", "and"].includes(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// Very light brand colours would vanish on white, so they tint in the site blue.
const toneOf = (t: OrbitTool) => (t.logo && !t.darkTile ? `#${t.logo.hex}` : "var(--color-brand)");

function ToolLogo({ tool, className }: { tool: OrbitTool; className: string }) {
  if (!tool.logo) {
    return <span className="font-display text-[0.8em] font-extrabold text-brand">{initials(tool.name)}</span>;
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill={`#${tool.logo.hex}`}>
      <path d={tool.logo.path} />
    </svg>
  );
}

// How long each tool stays in the spotlight before the next one.
const CYCLE_MS = 2000;

// Each loop needs at least this many pills so short rows still fill wide screens.
const MIN_PER_LOOP = 12;

/**
 * The After 12th toolchain: rows of tool logos drifting sideways in
 * alternating directions, with a spotlight bar underneath saying what the
 * featured tool is used for. The spotlight moves on every couple of seconds,
 * holding while the pointer is over the section; hovering a tool features it,
 * and tapping or focusing one stops the cycle there.
 */
export function ToolMarquee({ tools, heading }: { tools: OrbitTool[]; heading: ReactNode }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || hovering || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % tools.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [auto, hovering, tools.length]);

  const pick = (i: number) => {
    setActive(i);
    setAuto(false);
  };
  const current = tools[active];
  const groups = new Set(tools.map((t) => t.group)).size;

  // Deal the tools round-robin into rows.
  const rowCount = tools.length > 10 ? 3 : 2;
  const rows = Array.from({ length: rowCount }, (_, r) =>
    tools.map((t, i) => ({ t, i })).filter(({ i }) => i % rowCount === r),
  ).filter((row) => row.length > 0);

  return (
    <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div className="mx-auto max-w-2xl text-center">
        {heading}
        <p className="mt-5 text-lg text-slate-600">
          {tools.length} tools across {groups} {groups === 1 ? "area" : "areas"}, all installed in the lab and
          used in your projects. Hover or tap one to see what it&apos;s for.
        </p>
      </div>

      <div className="mt-12 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] motion-reduce:[mask-image:none]">
        {rows.map((row, r) => {
          const loop = Array.from({ length: Math.ceil(MIN_PER_LOOP / row.length) }, () => row).flat();
          return (
            <div key={r} className="group/row overflow-x-clip py-2">
              <div
                style={{ animationDuration: `${loop.length * 3.5}s`, animationDirection: r % 2 ? "reverse" : "normal" }}
                className="flex w-max gap-4 animate-marquee group-hover/row:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
              >
                {/* Two identical halves: the track slides by one half, then repeats. */}
                {[0, 1].map((half) =>
                  loop.map(({ t, i }, k) => {
                    const copy = half > 0 || k >= row.length;
                    const on = i === active;
                    return (
                      <button
                        key={`${half}-${k}`}
                        type="button"
                        aria-hidden={copy || undefined}
                        tabIndex={copy ? -1 : undefined}
                        aria-pressed={copy ? undefined : on}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => pick(i)}
                        onClick={() => pick(i)}
                        style={{ "--tool": toneOf(t) } as CSSProperties}
                        className={`flex shrink-0 items-center gap-3 rounded-full border py-2 pl-2 pr-5 text-left transition duration-300 hover:-translate-y-1 hover:border-(--tool)/50 hover:shadow-lg hover:shadow-(color:--tool)/15 ${
                          copy ? "motion-reduce:hidden" : ""
                        } ${on ? "border-(--tool)/60 bg-white shadow-lg shadow-(color:--tool)/20" : "border-slate-200 bg-white/80"}`}
                      >
                        <span
                          className={`grid size-11 place-items-center rounded-full text-lg ${t.darkTile ? "bg-hero-800" : "bg-(--tool)/10"}`}
                        >
                          <ToolLogo tool={t} className="size-6" />
                        </span>
                        <span className="whitespace-nowrap font-display font-bold text-navy">{t.name}</span>
                      </button>
                    );
                  }),
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spotlight */}
      <div
        aria-live="polite"
        style={{ "--tool": toneOf(current) } as CSSProperties}
        className="relative mx-auto mt-10 flex max-w-3xl items-center gap-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-hero-950/5 sm:p-6"
      >
        <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-(--tool)" />
        <span
          key={current.name}
          className={`grid size-14 shrink-0 place-items-center rounded-2xl text-2xl motion-safe:animate-[rise_0.5s_cubic-bezier(0.2,0.8,0.2,1)_both] ${current.darkTile ? "bg-hero-800" : "bg-(--tool)/10"}`}
        >
          <ToolLogo tool={current} className="size-8" />
        </span>
        <div key={`${current.name}-text`} className="min-w-0 motion-safe:animate-[rise_0.5s_cubic-bezier(0.2,0.8,0.2,1)_both]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{current.group}</p>
          <p className="mt-1 font-display text-xl font-bold text-navy">{current.name}</p>
          <p className="mt-1 text-slate-600">{current.text}</p>
        </div>
      </div>
    </div>
  );
}
