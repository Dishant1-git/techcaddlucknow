import { NavLink } from "./NavLink";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Atom, Code, Container, Cpu, TrendingUp } from "lucide-react";
import { heroChips, site } from "@/lib/site";
import { BookDemoButton } from "./Enquiry";

const demand = [
  { label: "AI & Data", value: 128, change: "2.92%" },
  { label: "Full Stack", value: 96, change: "1.38%" },
  { label: "Cyber", value: 74, change: "2.56%" },
];

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-spot
      className={`border-glow rounded-2xl bg-white/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-clip bg-hero-950 text-white">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div className="orb absolute -left-40 top-20 -z-10 size-[38rem] animate-aurora [--orb:rgba(47,125,255,0.3)]" />
      <div className="orb absolute -right-48 top-64 -z-10 size-[42rem] animate-aurora [--orb:rgba(0,212,255,0.2)] [animation-delay:-8s]" />

      <div className="mx-auto max-w-7xl px-5 pb-40 pt-36 text-center lg:px-8 lg:pt-48">
        <p
          style={delay(0.05)}
          className="rise mx-auto inline-flex flex-wrap items-center justify-center gap-x-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300 backdrop-blur sm:text-xs"
        >
          <span className="relative grid size-2 place-items-center">
            <span className="absolute size-2 animate-pulse-ring rounded-full bg-sun" />
            <span className="size-2 rounded-full bg-sun" />
          </span>
          1:1 Live training · Live projects · Placement support
        </p>

        <h1 className="mx-auto mt-7 max-w-5xl font-display text-[2.6rem] font-extrabold uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.6rem]">
          <span style={delay(0.15)} className="rise inline-block">
            <span className="bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent">
              Engineer
            </span>{" "}
            <span className="hex mx-1 inline-grid size-[0.85em] translate-y-[0.08em] animate-float place-items-center bg-gradient-to-br from-cyan to-brand align-baseline">
              <Code className="size-[0.42em] text-hero-950" strokeWidth={3} />
            </span>{" "}
            your
          </span>{" "}
          <span style={delay(0.28)} className="rise inline-block">
            <span className="bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent">
              future in
            </span>{" "}
            <span className="text-shine">AI</span>{" "}
            <span className="bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent">
              and
            </span>
          </span>{" "}
          <span style={delay(0.4)} className="rise inline-block">
            software
          </span>
        </h1>

        <p
          style={delay(0.55)}
          className="rise mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          {site.city}&apos;s technology partner for AI, software and career-ready
          skills. Build real systems with live projects, expert mentors and
          placement support until you are hired.
        </p>

        <div
          style={delay(0.7)}
          className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <BookDemoButton
            data-magnetic
            className="group inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 font-bold text-hero-950 shadow-[0_0_40px_-8px] shadow-sun/60 transition-[filter] hover:brightness-105"
          >
            Book a free demo
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </BookDemoButton>
          <NavLink
            href="/#courses"
            className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-semibold text-white/85 backdrop-blur transition hover:border-cyan/60 hover:text-white"
          >
            Explore courses
          </NavLink>
        </div>

        <div style={delay(0.85)} className="rise mt-8 flex flex-wrap justify-center gap-2">
          {heroChips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Dashboard — starts tilted back and flattens as you scroll (Motion.tsx) */}
        <div style={delay(1)} className="rise mt-16">
          <div
            data-hero-dash
            className="relative grid items-center gap-6 text-left lg:grid-cols-[1fr_auto_1fr]"
          >
            <GlassCard>
              <div className="flex items-center justify-between">
                <p className="font-display font-bold">Course demand</p>
                <ArrowUpRight className="size-4 text-slate-400" />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Enrolments are up <span className="font-bold text-cyan">▲ 2.39%</span>
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {demand.map((d, i) => (
                  <div key={d.label}>
                    <p className="font-display text-2xl font-extrabold">{d.value}</p>
                    <p className="text-[11px] text-slate-400">{d.label}</p>
                    <div
                      className={`mt-3 h-8 rounded-md ${
                        i === 0
                          ? "bg-gradient-to-r from-cyan to-sky"
                          : i === 1
                            ? "bg-gradient-to-r from-sky to-brand"
                            : "bg-white/15"
                      }`}
                    />
                    <p className="mt-2 text-[11px] font-bold text-cyan">▲ {d.change}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="relative mx-auto hidden items-center gap-6 lg:flex">
              <span className="absolute left-0 right-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
              <div className="hex grid size-20 animate-float place-items-center bg-hero-800 text-cyan">
                <Atom className="size-7" />
              </div>
              <div className="relative grid place-items-center">
                <span className="absolute -inset-7 animate-spin-slow rounded-full border border-dashed border-cyan/30" />
                <span className="absolute -inset-14 animate-spin-slow rounded-full border border-dashed border-sky/15 [animation-direction:reverse]" />
                <div className="hex grid size-44 place-items-center bg-gradient-to-br from-cyan to-brand p-[3px]">
                  <div className="hex grid size-full place-items-center bg-hero-900 text-center">
                    <div>
                      <Cpu className="mx-auto size-6 text-cyan" />
                      <p className="mt-2 font-display text-xl font-extrabold">{site.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hex grid size-20 animate-float place-items-center bg-hero-800 text-cyan [animation-delay:-3s]">
                <Container className="size-7" />
              </div>
            </div>

            <GlassCard>
              <div className="flex items-center justify-between">
                <p className="font-display font-bold">Students placed</p>
                <TrendingUp className="size-4 text-slate-400" />
              </div>
              <p className="mt-1 font-display text-3xl font-extrabold">
                1,240 <span className="text-xs font-bold text-cyan">▲ 8.6%</span>
              </p>
              <svg viewBox="0 0 300 90" className="mt-3 w-full" aria-hidden>
                <defs>
                  <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#00d4ff" stopOpacity=".45" />
                    <stop offset="1" stopColor="#00d4ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 72 C40 68 60 62 100 58 S160 50 200 40 S270 22 300 10 V90 H0Z"
                  fill="url(#hero-area)"
                />
                <path
                  className="draw"
                  d="M0 72 C40 68 60 62 100 58 S160 50 200 40 S270 22 300 10"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="240" cy="28" r="5" fill="#fff" stroke="#00d4ff" strokeWidth="3" />
              </svg>
              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
