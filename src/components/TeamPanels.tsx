"use client";

// Leadership team as expanding panels. On desktop the people stand side by side
// as tall strips and the one you point at (or tab to, or tap) widens to show
// who they are; on phones the same panels stack and open downwards.
import Image from "next/image";
import { useState } from "react";

type Member = { name: string; role: string; area: string; photo: string; w: number; h: number };

const pad = (n: number) => String(n).padStart(2, "0");

// Backdrops behind the cut-out portraits, cycled through the team.
const tones = [
  "from-brand via-hero-800 to-hero-950",
  "from-sky via-hero-800 to-hero-950",
  "from-cyan/80 via-hero-800 to-hero-950",
];

export function TeamPanels({ members }: { members: Member[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul
      aria-label="Leadership team"
      className="flex flex-col gap-2 lg:h-[36rem] lg:flex-row lg:gap-2.5"
    >
      {members.map((m, i) => {
        const open = i === active;
        return (
          <li
            key={m.name}
            onMouseEnter={() => setActive(i)}
            className={`group relative isolate overflow-hidden rounded-[1.75rem] bg-gradient-to-b ${tones[i % tones.length]} transition-[flex-grow,height] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:h-auto lg:min-w-0 lg:basis-0 ${
              open ? "h-[27rem] lg:grow-[6]" : "h-[4.75rem] lg:grow"
            }`}
          >
            {/* The whole panel is the toggle; the copy inside stays readable to screen readers. */}
            <button
              type="button"
              aria-expanded={open}
              aria-label={`${m.name}, ${m.role}`}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="absolute inset-0 z-20 cursor-pointer rounded-[1.75rem] outline-none focus-visible:ring-4 focus-visible:ring-cyan/60"
            />

            <div className="bg-grid-dark absolute inset-0 -z-10 opacity-50" />

            {/* Portrait: full colour when open, muted when folded */}
            <Image
              src={m.photo}
              alt=""
              width={m.w}
              height={m.h}
              sizes="(min-width: 1024px) 34rem, 100vw"
              className={`absolute inset-0 -z-10 h-full w-full object-cover object-[50%_12%] transition duration-700 ease-out ${
                open
                  ? "scale-100 opacity-100 grayscale-0"
                  : "scale-110 opacity-0 grayscale lg:opacity-70 lg:group-hover:opacity-90"
              }`}
            />
            <div
              className={`absolute inset-0 -z-10 bg-gradient-to-t from-hero-950 via-hero-950/40 to-transparent transition-opacity duration-700 ${
                open ? "opacity-100" : "opacity-60"
              }`}
            />

            <span
              aria-hidden
              className={`absolute left-5 top-[1.6rem] font-display text-sm font-bold tracking-widest transition-colors duration-500 lg:top-5 ${
                open ? "text-cyan" : "text-white/60"
              }`}
            >
              {pad(i + 1)}
            </span>

            {/* Folded, desktop: the name runs up the strip */}
            <p
              aria-hidden
              className={`absolute bottom-6 left-1/2 hidden origin-center -translate-x-1/2 whitespace-nowrap font-display text-lg font-bold text-white transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 lg:block ${
                open ? "opacity-0" : "opacity-100 delay-200"
              }`}
            >
              {m.name}
            </p>

            {/* Folded, phones: a name row */}
            <div
              aria-hidden
              className={`absolute inset-y-0 left-14 right-5 flex items-center justify-between gap-3 transition-opacity duration-300 lg:hidden ${
                open ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="truncate font-display text-lg font-bold text-white">{m.name}</span>
              <span className="shrink-0 truncate text-xs font-semibold text-slate-300">{m.area}</span>
            </div>

            {/* Open: who they are */}
            <div
              className={`absolute inset-x-0 bottom-0 p-6 transition duration-500 sm:p-7 ${
                open ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0"
              }`}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <span className="size-1.5 rounded-full bg-cyan" />
                {m.area}
              </span>
              <h3 className="mt-3 whitespace-nowrap font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {m.name}
              </h3>
              <p className="mt-1 whitespace-nowrap text-sm font-medium text-slate-300">{m.role}</p>
              <span className="mt-4 block h-0.5 w-12 rounded-full bg-gradient-to-r from-cyan to-sky" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
