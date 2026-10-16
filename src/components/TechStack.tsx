"use client";

import { useState, type CSSProperties } from "react";
import { Cpu } from "lucide-react";
import { site, techCategories, technologies } from "@/lib/site";
import { isLight, type Logo } from "@/lib/logo";
import { DarkSection, SectionHeading } from "./ui";

type Category = (typeof techCategories)[number];

// Three concentric orbits. Radius is a percentage of the stage, duration is
// seconds per revolution; alternate rings turn in opposite directions.
const rings = [
  { count: 9, radius: 19, duration: 70 },
  { count: 15, radius: 33.5, duration: 110 },
  { count: Infinity, radius: 48, duration: 150 },
];

const orbits = (() => {
  let start = 0;
  return rings.map((ring) => {
    const items = technologies.slice(start, start + ring.count);
    start += items.length;
    return { ...ring, items };
  });
})();

function Badge({ name, logo }: { name: string; logo?: Logo }) {
  if (!logo) {
    return (
      <span className="grid size-full place-items-center rounded-full bg-gradient-to-br from-cyan to-brand font-display text-[0.7em] font-extrabold text-white">
        {name.slice(0, 2)}
      </span>
    );
  }
  const dark = isLight(logo.hex);
  return (
    <span
      className={`grid size-full place-items-center rounded-full ${dark ? "bg-hero-800" : "bg-white"}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-[52%]" fill={`#${logo.hex}`}>
        <path d={logo.path} />
      </svg>
    </span>
  );
}

/** `logos`: the technologies' logos, picked on the server (pickLogos). */
export function TechStack({ logos }: { logos: Record<string, Logo> }) {
  const [active, setActive] = useState<Category>("All");
  const count = (c: Category) =>
    c === "All" ? technologies.length : technologies.filter((t) => t.cat === c).length;

  return (
    <DarkSection id="tech">
      <SectionHeading
        dark
        eyebrow="Technology stack"
        title={
          <>
            <span className="text-gradient">100+ technologies</span> taught across our tracks
          </>
        }
        text="The same languages, frameworks and platforms your future team uses every day. Hover a logo to see what it is."
      />

      <div data-reveal className="mt-10 flex flex-wrap justify-center gap-2">
        {techCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
              active === c
                ? "bg-gradient-to-r from-cyan to-sky text-hero-950"
                : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
            }`}
          >
            {c}
            <span
              className={`rounded-full px-1.5 text-[11px] font-bold ${
                active === c ? "bg-hero-950/15" : "bg-white/10 text-slate-400"
              }`}
            >
              {count(c)}
            </span>
          </button>
        ))}
      </div>

      {/* Orbit stage */}
      <div
        data-reveal="scale"
        className="orbit relative mx-auto mt-14 aspect-square w-full max-w-[46rem] text-[2.25rem] sm:text-[3rem] lg:text-[3.6rem]"
      >
        <div className="orb absolute inset-[8%] [--orb:rgba(28,83,209,0.4)]" />

        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan/20" />
          <span className="hex grid size-full place-items-center bg-gradient-to-br from-cyan to-brand p-[2px]">
            <span className="hex grid size-full place-items-center bg-hero-900 text-center">
              <span>
                <Cpu className="mx-auto size-[0.5em] text-cyan" />
                <span className="mt-1 block font-display text-[0.3em] font-extrabold text-white">
                  {site.name}
                </span>
              </span>
            </span>
          </span>
        </div>

        {orbits.map((ring, r) => (
          <div key={r} className="absolute inset-0">
            {/* Track line */}
            <span
              style={{ inset: `${50 - ring.radius}%` }}
              className="absolute rounded-full border border-dashed border-white/10"
            />
            <div
              style={{ "--dur": `${ring.duration}s` } as CSSProperties}
              className={`orbit-spin absolute inset-0 ${r % 2 ? "orbit-rev" : ""}`}
            >
              {ring.items.map((t, i) => {
                const angle = (i / ring.items.length) * Math.PI * 2 - Math.PI / 2;
                const dimmed = active !== "All" && t.cat !== active;
                return (
                  <div
                    key={t.name}
                    style={{
                      left: `${(50 + ring.radius * Math.cos(angle)).toFixed(3)}%`,
                      top: `${(50 + ring.radius * Math.sin(angle)).toFixed(3)}%`,
                    }}
                    className="absolute z-10 size-[1em] -translate-x-1/2 -translate-y-1/2 hover:z-30 focus-within:z-30"
                  >
                    {/* Counter-rotates so the logo and tooltip stay upright */}
                    <div
                      style={{ "--dur": `${ring.duration}s` } as CSSProperties}
                      className={`orbit-spin size-full ${r % 2 ? "" : "orbit-rev"}`}
                    >
                      <button
                        type="button"
                        aria-label={`${t.name} — ${t.cat}`}
                        className={`group relative block size-full rounded-full shadow-lg shadow-black/40 outline-none ring-2 transition duration-500 hover:scale-125 focus-visible:scale-125 ${
                          dimmed
                            ? "scale-75 opacity-20 ring-transparent grayscale"
                            : active === "All"
                              ? "ring-white/10 hover:ring-cyan"
                              : "ring-cyan"
                        }`}
                      >
                        <Badge name={t.name} logo={logos[t.name]} />
                        <span
                          role="tooltip"
                          className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-xl border border-white/15 bg-hero-900/95 px-3.5 py-2 text-left opacity-0 shadow-xl shadow-black/50 backdrop-blur transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                        >
                          <span className="block font-display text-sm font-bold text-white">
                            {t.name}
                          </span>
                          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-cyan">
                            {t.cat}
                          </span>
                          <span className="absolute left-1/2 top-full size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/15 bg-hero-900" />
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </DarkSection>
  );
}
