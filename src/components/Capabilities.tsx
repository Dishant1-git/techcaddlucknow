"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { capabilities } from "@/lib/site";
import { useEnquiry } from "./Enquiry";
import { Eyebrow, Heading, LightSection } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

export function Capabilities() {
  const [active, setActive] = useState(0);
  const { open } = useEnquiry();
  const current = capabilities[active];

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

      <div data-reveal className="mt-14 grid gap-8 lg:grid-cols-[19rem_1fr]">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {capabilities.map((c, i) => (
            <button
              key={c.title}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative flex shrink-0 items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 text-left font-display font-bold transition-colors duration-300 ${
                active === i
                  ? "bg-navy text-white shadow-xl shadow-navy/30"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-cyan to-sky transition-transform duration-500 ${
                  active === i ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <span className={`text-xs ${active === i ? "text-cyan" : "opacity-60"}`}>
                {pad(i + 1)}
              </span>
              <span className="flex-1 whitespace-nowrap">{c.title}</span>
              <ArrowRight
                className={`hidden size-4 transition duration-300 lg:block ${
                  active === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="relative isolate overflow-hidden rounded-[2rem] bg-hero-950 p-7 text-white shadow-2xl shadow-hero-950/30 sm:p-10">
          <div className="bg-grid-dark absolute inset-0 -z-10" />
          <div className="glow-dark absolute inset-0 -z-10" />
          <span className="pointer-events-none absolute -right-4 -top-10 -z-10 font-display text-[13rem] font-extrabold leading-none text-white/[0.04]">
            {pad(active + 1)}
          </span>

          {/* Re-keyed so the content replays its entrance on every tab change */}
          <div key={active}>
            <div className="rise flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-widest text-cyan">
                  {pad(active + 1)} / {pad(capabilities.length)}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-4xl">
                  {current.title}
                </h3>
                <p className="mt-3 text-slate-300">{current.text}</p>
              </div>
              <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest">
                {current.tools.length} tools
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {current.tools.map(([name, use], i) => (
                <div
                  key={name}
                  style={{ "--d": `${0.08 + i * 0.05}s` } as CSSProperties}
                  className="rise group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 transition-colors hover:border-cyan/50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan to-brand font-display font-extrabold text-white transition-transform duration-300 group-hover:scale-110">
                    {name[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{name}</span>
                    <span className="block truncate text-xs text-slate-400">{use}</span>
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={open}
              style={{ "--d": "0.5s" } as CSSProperties}
              className="rise group mt-8 inline-flex items-center gap-3 rounded-full bg-sun py-2.5 pl-6 pr-2.5 text-sm font-bold text-hero-950 transition-[filter] hover:brightness-105"
            >
              Explore {current.title}
              <span className="grid size-8 place-items-center rounded-full bg-hero-950 text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </LightSection>
  );
}
