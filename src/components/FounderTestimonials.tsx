"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { founderTestimonials } from "@/lib/about";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

/** Swipeable row of testimonial cards with previous / next controls. */
export function FounderTestimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = founderTestimonials.length;

  // The card nearest the left edge of the track is the current one.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const left = el.scrollLeft + el.offsetLeft;
      const nearest = cards.reduce(
        (best, card, i) =>
          Math.abs(card.offsetLeft - left) < Math.abs(cards[best].offsetLeft - left) ? i : best,
        0,
      );
      // At the far end the last cards can no longer reach the left edge.
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setActive(atEnd ? cards.length - 1 : nearest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[(i + total) % total] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const t = founderTestimonials[active];

  return (
    <div>
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {founderTestimonials.map((item) => (
          <figure
            key={item.name}
            className="flex w-[min(26rem,85vw)] shrink-0 snap-start scroll-ml-5 flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 lg:scroll-ml-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            <Quote className="size-8 fill-brand/10 text-brand" />
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
              {item.text}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
              {item.image ? (
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-slate-200">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </span>
              ) : (
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky to-brand text-sm font-bold text-white">
                  {initials(item.name)}
                </span>
              )}
              <span>
                <span className="block font-bold text-navy">{item.name}</span>
                <span className="block text-xs text-slate-500">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <p aria-live="polite" className="text-sm text-slate-500">
          <span className="font-semibold text-navy">
            Testimonial {active + 1} of {total}
          </span>
          <span className="hidden sm:inline">
            : {t.name}, {t.role}
          </span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(active - 1)}
            className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-navy transition hover:border-brand hover:text-brand"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(active + 1)}
            className="grid size-11 place-items-center rounded-full bg-navy text-white transition hover:bg-brand"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
