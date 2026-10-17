"use client";

// "The journey behind techcadd" on the founder page. On desktop a photo stays
// pinned on the left and cross-fades to each chapter as its text scrolls past
// on the right, while a line down the text fills to show how far you have read.
// On phones each chapter carries its own photo.
import { NavLink } from "./NavLink";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Quote } from "lucide-react";
import type { Chapter } from "@/lib/about";

const pad = (n: number) => String(n).padStart(2, "0");
const year = (c: Chapter, i: number) => (i === 0 ? "Start" : c.marker);

export function FounderJourney({ chapters, name }: { chapters: Chapter[]; name: string }) {
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const items = [...el.querySelectorAll<HTMLElement>("[data-chapter]")];
    let frame = 0;

    // The chapter crossing the middle of the screen is the current one, and the
    // line fills to that same point.
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      const box = el.getBoundingClientRect();
      setFill(Math.min(1, Math.max(0, (mid - box.top) / box.height)));
      let current = 0;
      items.forEach((item, i) => {
        if (item.getBoundingClientRect().top <= mid) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
      {/* Pinned photo (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-28 h-[calc(100svh-9rem)] max-h-[44rem] min-h-[30rem]">
          <div className="border-glow relative h-full overflow-hidden rounded-[2rem] bg-hero-900">
            {chapters.map((c, i) => (
              <Image
                key={c.id}
                src={c.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 1px"
                className={`object-cover object-[50%_25%] transition duration-1000 ease-out ${
                  i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-hero-950 via-hero-950/30 to-hero-950/10" />

            <p className="absolute left-7 top-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
              <span className="text-cyan">{chapters[active].label}</span>
              <span className="mx-2 opacity-50">·</span>
              {name}
            </p>
            <p className="absolute right-7 top-5 font-display text-sm font-bold tracking-widest text-white/70">
              {pad(active + 1)} <span className="opacity-50">/ {pad(chapters.length)}</span>
            </p>

            <div className="absolute inset-x-0 bottom-0 p-7">
              {/* Keyed so the year replays its entrance on every change */}
              <p
                key={active}
                className="animate-[journey-year_0.7s_cubic-bezier(.22,1,.36,1)] font-display text-[clamp(4rem,8vw,7.5rem)] font-extrabold leading-[0.9] tracking-tight text-white"
              >
                {year(chapters[active], active)}
              </p>
              <nav aria-label="Chapters" className="mt-6">
                <ol className="flex flex-wrap gap-2">
                  {chapters.map((c, i) => (
                    <li key={c.id}>
                      <NavLink
                        href={`#chapter-${c.id}`}
                        aria-current={i === active ? "step" : undefined}
                        className={`inline-block rounded-full border px-3.5 py-1.5 text-xs font-bold transition duration-300 ${
                          i === active
                            ? "border-cyan bg-cyan text-hero-950"
                            : "border-white/20 bg-white/5 text-white/80 backdrop-blur hover:border-white/50"
                        }`}
                      >
                        {year(c, i)}
                      </NavLink>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters, with the progress line down their left edge */}
      <ol ref={list} className="relative space-y-20 pl-10 sm:pl-14 lg:space-y-32 lg:py-[12vh]">
        <span aria-hidden className="absolute bottom-0 left-[0.6875rem] top-0 w-px bg-white/10 sm:left-[1.1875rem]" />
        <span
          aria-hidden
          style={{ transform: `scaleY(${fill})` }}
          className="absolute left-[0.6875rem] top-0 h-full w-px origin-top bg-gradient-to-b from-cyan via-sky to-brand sm:left-[1.1875rem]"
        />

        {chapters.map((c, i) => {
          const on = i <= active;
          return (
            <li key={c.id} id={`chapter-${c.id}`} data-chapter className="relative scroll-mt-28">
              <span
                aria-hidden
                className={`absolute -left-10 top-1 grid size-6 place-items-center rounded-full border-2 transition duration-500 sm:-left-14 sm:size-10 ${
                  on
                    ? "border-cyan bg-hero-950 shadow-[0_0_24px_-2px] shadow-cyan"
                    : "border-white/15 bg-hero-950"
                }`}
              >
                <span
                  className={`size-2 rounded-full transition duration-500 sm:size-2.5 ${on ? "bg-cyan" : "bg-white/25"}`}
                />
              </span>

              <div className={`transition duration-700 ${i === active ? "opacity-100" : "lg:opacity-45"}`}>
                <div className="relative mb-7 aspect-[16/10] overflow-hidden rounded-3xl bg-hero-900 lg:hidden">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 80vw, 100vw"
                    className="object-cover object-[50%_25%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hero-950/90 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-5 font-display text-5xl font-extrabold leading-none text-white">
                    {year(c, i)}
                  </p>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
                  {c.label}
                  <span className="mx-2 text-white/30">·</span>
                  <span className="text-slate-400">{year(c, i)}</span>
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[2.1rem]">
                  {c.title}
                </h3>
                <div className="mt-5 space-y-4 leading-relaxed text-slate-300">
                  {c.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {c.list && (
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {c.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-[15px] font-medium text-slate-200"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan text-hero-950">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {c.principles && (
                  <ol className="mt-7 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                    {c.principles.map((p, n) => (
                      <li key={p.title} className="flex gap-5 p-5">
                        <span className="text-outline font-display text-3xl font-extrabold leading-none">
                          {pad(n + 1)}
                        </span>
                        <div>
                          <p className="font-display font-bold text-white">{p.title}</p>
                          <p className="mt-1 text-[15px] leading-relaxed text-slate-400">{p.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {c.quote && (
                  <blockquote className="border-glow relative mt-7 rounded-2xl bg-gradient-to-br from-brand/30 to-transparent p-7">
                    <Quote className="size-7 fill-cyan/15 text-cyan" />
                    <p className="mt-3 font-display text-xl font-bold leading-snug text-white">“{c.quote}”</p>
                  </blockquote>
                )}

                {c.after && (
                  <div className="mt-7 space-y-4 leading-relaxed text-slate-300">
                    {c.after.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
