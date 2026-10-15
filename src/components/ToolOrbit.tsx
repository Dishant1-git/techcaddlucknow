"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

export type OrbitTool = {
  name: string;
  text: string;
  group: string;
  logo: { path: string; hex: string } | null;
  /** Light brand colours (JavaScript yellow, Linux...) sit on a dark tile. */
  darkTile: boolean;
};

// Three orbits round the hub. Radius is a percentage of the stage, duration is
// seconds per revolution; alternate rings turn in opposite directions.
const rings = [
  { radius: 20, duration: 60 },
  { radius: 34, duration: 90 },
  { radius: 48, duration: 120 },
];

// Shares the tools out in proportion to each ring's size (at least two on the
// inner ring), so the logos sit evenly spaced whatever the count. `index` is the
// tool's place in the list.
function splitRings(tools: OrbitTool[]) {
  const total = rings.reduce((n, r) => n + r.radius, 0);
  const inner = Math.min(tools.length, Math.max(2, Math.round((tools.length * rings[0].radius) / total)));
  const middle = Math.round((tools.length * rings[1].radius) / total);
  const counts = [inner, middle, tools.length];
  let start = 0;
  return rings
    .map((ring, r) => {
      const end = Math.min(tools.length, start + counts[r]);
      const items = tools.slice(start, end).map((tool, j) => ({ tool, index: start + j }));
      start = end;
      return { ...ring, items };
    })
    .filter((ring) => ring.items.length > 0);
}

// How long each tool stays featured before the next one is picked.
const CYCLE_MS = 3500;

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

function Logo({ tool, className }: { tool: OrbitTool; className: string }) {
  if (!tool.logo) {
    return (
      <span className="text-gradient font-display text-[0.36em] font-extrabold">{initials(tool.name)}</span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill={`#${tool.logo.hex}`}>
      <path d={tool.logo.path} />
    </svg>
  );
}

const tileTone = (tool: OrbitTool) =>
  tool.darkTile ? "border-white/15 bg-hero-800" : "border-white bg-white";

/**
 * The toolchain as an orbit: tool logos circle the course hub, and the panel
 * beside it describes the featured tool. It steps through the tools on its own
 * until the visitor picks one, from the orbit or from the grouped pills.
 */
export function ToolOrbit({
  hub,
  tools,
  heading,
}: {
  hub: string;
  tools: OrbitTool[];
  heading: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % tools.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [auto, tools.length]);

  const pick = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  const orbits = splitRings(tools);

  const current = tools[active];
  const groups = [...new Set(tools.map((t) => t.group))];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {/* Orbit stage; it pauses while the pointer is over it */}
      <div
        data-reveal="scale"
        className="relative order-2 mx-auto aspect-square w-full max-w-[32rem] text-[2.1rem] sm:text-[2.6rem] lg:order-none [&:hover_.orbit-spin]:[animation-play-state:paused]"
      >
        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 grid size-[28%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan/8">
          <span className="absolute inset-[6%] animate-pulse-ring rounded-full bg-cyan/15" />
          <span className="relative grid size-[72%] place-items-center rounded-full bg-gradient-to-br from-brand to-cyan shadow-xl shadow-cyan/30">
            <span className="px-1 text-center font-display text-[0.3em] font-extrabold uppercase tracking-wide text-white">
              {hub}
            </span>
          </span>
        </div>

        {orbits.map((ring, r) => (
          <div key={r} className="absolute inset-0">
            {/* Track line */}
            <span
              style={{ inset: `${50 - ring.radius}%` }}
              className={`absolute rounded-full border border-dashed ${r === 0 ? "border-cyan/30" : "border-white/15"}`}
            />
            <div
              style={{ "--dur": `${ring.duration}s` } as CSSProperties}
              className={`orbit-spin absolute inset-0 ${r % 2 ? "orbit-rev" : ""}`}
            >
              {ring.items.map(({ tool, index }, i) => {
                // Offset each ring so its first tool doesn't line up with the last ring's.
                const angle = (i / ring.items.length) * Math.PI * 2 - Math.PI / 2 + r * 0.7;
                const on = index === active;
                return (
                  <div
                    key={tool.name}
                    style={{
                      left: `${(50 + ring.radius * Math.cos(angle)).toFixed(3)}%`,
                      top: `${(50 + ring.radius * Math.sin(angle)).toFixed(3)}%`,
                    }}
                    className={`absolute size-[1em] -translate-x-1/2 -translate-y-1/2 ${on ? "z-20" : "z-10"}`}
                  >
                    {/* Counter-rotates so the logo stays upright */}
                    <div
                      style={{ "--dur": `${ring.duration}s` } as CSSProperties}
                      className={`orbit-spin size-full ${r % 2 ? "" : "orbit-rev"}`}
                    >
                      <button
                        type="button"
                        aria-label={tool.name}
                        aria-pressed={on}
                        onClick={() => pick(index)}
                        className={`grid size-full place-items-center rounded-full border outline-none transition duration-500 hover:scale-110 focus-visible:ring-2 focus-visible:ring-cyan ${tileTone(tool)} ${
                          on
                            ? "scale-[1.25] shadow-xl shadow-cyan/30 ring-2 ring-cyan ring-offset-2 ring-offset-hero-950"
                            : "shadow-lg shadow-black/40"
                        }`}
                      >
                        <Logo tool={tool} className="size-[50%]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Heading, featured tool and the full list */}
      <div>
        {heading}
        <div
          key={current.name}
          aria-live="polite"
          className="mt-8 min-h-[11rem] motion-safe:animate-[rise_0.6s_cubic-bezier(0.2,0.8,0.2,1)_both] sm:min-h-[10rem]"
        >
          <p className="text-sm font-semibold text-cyan">{current.group}</p>
          <div className="mt-3 flex items-center gap-4">
            <span
              className={`grid size-14 shrink-0 place-items-center rounded-full border text-[2.75rem] shadow-lg shadow-black/40 ${tileTone(current)}`}
            >
              <Logo tool={current} className="size-7" />
            </span>
            <h3 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {current.name}
            </h3>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{current.text}</p>
        </div>

        <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
          {groups.map((g) => (
            <div key={g}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{g}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {tools.map((t, i) =>
                  t.group === g ? (
                    <button
                      key={t.name}
                      type="button"
                      aria-pressed={i === active}
                      onClick={() => pick(i)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition duration-300 ${
                        i === active
                          ? "border-transparent bg-gradient-to-r from-cyan to-sky font-semibold text-hero-950 shadow-lg shadow-cyan/20"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan/50 hover:text-white"
                      }`}
                    >
                      {t.name}
                    </button>
                  ) : null,
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
