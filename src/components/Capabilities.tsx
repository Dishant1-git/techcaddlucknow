"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import { capabilities } from "@/lib/site";
import { isLight, techLogos } from "@/lib/techLogos";
import { useEnquiry } from "./Enquiry";
import { Eyebrow, Heading, LightSection } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

// Pointy-top hexagon. Clipping also limits the hover area to the shape itself.
const hex = "[clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]";

/** Splits the tools into honeycomb rows whose lengths differ by one where possible. */
function honeycomb<T>(items: T[]): T[][] {
  const pattern = { 8: [3, 2, 3], 7: [2, 3, 2], 6: [2, 2, 2] }[items.length] ?? [3, 2];
  const rows: T[][] = [];
  for (let i = 0, r = 0; i < items.length; r++) {
    const size = pattern[r % pattern.length];
    rows.push(items.slice(i, i + size));
    i += size;
  }
  return rows;
}

function ToolHex({
  name,
  use,
  delay,
  onShow,
  onHide,
}: {
  name: string;
  use: string;
  delay: number;
  onShow: () => void;
  onHide: () => void;
}) {
  const logo = techLogos[name];
  // On hover the tile turns white and the logo takes its brand colour; pale
  // brand colours keep a dark tile so they stay visible.
  const pale = logo ? isLight(logo.hex) : false;
  const vars = {
    "--d": `${delay}s`,
    "--logo": logo ? `#${logo.hex}` : "#0b1a4d",
    "--tile": pale ? "#0b1a4d" : "#ffffff",
  } as CSSProperties;

  return (
    <li
      style={vars}
      className="rise group pointer-events-none relative aspect-[1/1.1547] w-[var(--hex)] shrink-0 hover:z-10 focus-within:z-10"
    >
      <div
        tabIndex={0}
        role="img"
        aria-label={`${name}: ${use}`}
        onPointerEnter={onShow}
        onPointerLeave={onHide}
        onFocus={onShow}
        onBlur={onHide}
        className={`${hex} pointer-events-auto absolute inset-0 cursor-default bg-gradient-to-br from-white/25 via-white/10 to-cyan/40 outline-none transition duration-300 group-hover:-translate-y-1.5 group-hover:from-cyan group-hover:via-sky group-hover:to-sun group-focus-within:-translate-y-1.5 group-focus-within:from-cyan group-focus-within:via-sky group-focus-within:to-sun`}
      >
        <span
          className={`${hex} absolute inset-[1.5px] grid place-items-center bg-hero-900 text-white/75 transition-colors duration-300 group-hover:bg-[var(--tile)] group-hover:text-[var(--logo)] group-focus-within:bg-[var(--tile)] group-focus-within:text-[var(--logo)]`}
        >
          {logo ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="size-[38%] fill-current transition-transform duration-300 group-hover:scale-110"
            >
              <path d={logo.path} />
            </svg>
          ) : (
            // No logo in the icon set: short names are spelled out, longer ones
            // are reduced to their initials.
            <span className="font-display text-[calc(var(--hex)*0.2)] font-extrabold tracking-tight">
              {name.length <= 4
                ? name
                : name
                    .split(/[\s/]+/)
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
            </span>
          )}
        </span>
      </div>

      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%-0.35rem)] left-1/2 z-20 w-max max-w-[11rem] -translate-x-1/2 translate-y-1.5 rounded-xl bg-white px-3.5 py-2 text-center opacity-0 shadow-xl shadow-hero-950/40 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <span className="block text-sm font-bold leading-tight text-navy">{name}</span>
        <span className="mt-0.5 block text-[11px] font-medium leading-tight text-slate-500">
          {use}
        </span>
        <span
          aria-hidden
          className="absolute left-1/2 top-full size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white"
        />
      </span>
    </li>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);
  // The tracks cycle on their own until the visitor picks one.
  const [auto, setAuto] = useState(true);
  const [shown, setShown] = useState<number | null>(null);
  const { open } = useEnquiry();
  const current = capabilities[active];
  const rows = honeycomb(current.tools.map((tool, index) => ({ tool, index })));
  const readout = shown === null ? null : current.tools[shown];

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
    setShown(null);
  };

  return (
    <LightSection id="capabilities">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Capabilities</Eyebrow>
          <Heading className="mt-5">
            Best-in-class technology,
            <br />
            <span className="text-gradient">taught the way it is built</span>
          </Heading>
        </div>
        <p data-reveal className="max-w-sm text-lg text-slate-600">
          Six tracks, each built around the tools the industry actually ships
          with.
        </p>
      </div>

      <div
        data-reveal
        className="group/stage relative isolate mt-14 overflow-hidden rounded-[2.5rem] bg-hero-950 text-white shadow-2xl shadow-hero-950/30"
      >
        <div className="bg-grid-dark absolute inset-0 -z-10" />
        <div className="orb absolute -left-40 -top-40 -z-10 size-[36rem] animate-aurora [--orb:rgba(28,83,209,0.5)]" />
        <div className="orb absolute -bottom-52 right-0 -z-10 size-[36rem] animate-aurora [--orb:rgba(0,212,255,0.18)] [animation-delay:-8s]" />

        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          {/* Track list */}
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
              Choose a track
            </p>
            <div className="mt-6">
              {capabilities.map((c, i) => {
                const on = active === i;
                return (
                  <button
                    key={c.title}
                    type="button"
                    aria-pressed={on}
                    onClick={() => pick(i)}
                    className="group/row relative block w-full py-4 text-left"
                  >
                    {/* Hairline that fills while this track is on screen */}
                    <span className="absolute inset-x-0 top-0 h-px bg-white/10">
                      {on && (
                        <span
                          key={auto ? "auto" : "manual"}
                          onAnimationEnd={() => {
                            setActive((active + 1) % capabilities.length);
                            setShown(null);
                          }}
                          className={`block h-full origin-left bg-gradient-to-r from-cyan to-sun ${
                            auto ? "cap-progress group-hover/stage:[animation-play-state:paused]" : ""
                          }`}
                        />
                      )}
                    </span>
                    <span className="flex items-baseline gap-4">
                      <span
                        className={`text-xs font-bold tabular-nums transition-colors ${
                          on ? "text-cyan" : "text-white/30"
                        }`}
                      >
                        {pad(i + 1)}
                      </span>
                      <span
                        className={`flex-1 font-display text-xl font-extrabold tracking-tight transition-colors duration-300 sm:text-2xl lg:text-[1.75rem] ${
                          on ? "text-white" : "text-white/35 group-hover/row:text-white/75"
                        }`}
                      >
                        {c.title}
                      </span>
                      <span
                        className={`hidden text-[11px] font-bold uppercase tracking-widest sm:block ${
                          on ? "text-slate-300" : "text-white/25"
                        }`}
                      >
                        {c.tools.length} tools
                      </span>
                    </span>
                    {on && (
                      <span className="rise mt-2 block max-w-md pl-8 text-[15px] leading-relaxed text-slate-300">
                        {c.text}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => open()}
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-sun py-2.5 pl-6 pr-2.5 text-sm font-bold text-hero-950 transition-[filter] hover:brightness-105"
            >
              Explore {current.title}
              <span className="grid size-8 place-items-center rounded-full bg-hero-950 text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </button>
          </div>

          {/* Honeycomb of the tools in the chosen track */}
          <div className="relative flex flex-col items-center justify-center border-t border-white/10 px-4 pb-8 pt-16 sm:px-10 lg:border-l lg:border-t-0 lg:py-14">
            <span
              aria-hidden
              className="text-outline pointer-events-none absolute right-6 top-4 font-display text-[7rem] font-extrabold leading-none opacity-40 sm:text-[10rem]"
            >
              {pad(active + 1)}
            </span>

            {/* Re-keyed so the tiles replay their entrance on every track change */}
            <ul
              key={active}
              aria-label={`${current.title} tools`}
              className="relative [--hex:4.75rem] sm:[--hex:6.75rem] xl:[--hex:7.5rem]"
            >
              {rows.map((row, r) => (
                <li key={r} className="contents">
                  <ul
                    style={{
                      marginTop: r ? "calc(var(--hex) * -0.2887 + 0.5rem)" : undefined,
                      // Equal rows are staggered by half a tile to keep the comb.
                      translate:
                        rows.every((x) => x.length === row.length) && r % 2
                          ? "calc(var(--hex) / 2 + 0.25rem)"
                          : undefined,
                    }}
                    className="flex justify-center gap-2"
                  >
                    {row.map(({ tool: [name, use], index }) => (
                      <ToolHex
                        key={name}
                        name={name}
                        use={use}
                        delay={0.05 + index * 0.06}
                        onShow={() => setShown(index)}
                        onHide={() => setShown((s) => (s === index ? null : s))}
                      />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <p
              aria-live="polite"
              className="mt-8 flex min-h-11 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm"
            >
              {readout ? (
                <>
                  <span className="size-1.5 rounded-full bg-cyan" />
                  <span className="font-bold">{readout[0]}</span>
                  <span className="text-slate-300">{readout[1]}</span>
                </>
              ) : (
                <>
                  <MousePointerClick className="size-4 text-cyan" />
                  <span className="text-slate-300">Hover or tap a logo for details</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </LightSection>
  );
}
