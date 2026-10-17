"use client";

// Instagram reels played in place, as on techcaddjalandhar.com/about/founder.
// Each embed is cropped to its video: Instagram's header strip is pulled up out
// of view and the likes/comment footer falls below the frame.
//
// The strip advances on its own, and holds still whenever someone might be
// watching: pointer over it, a reel tapped into, a recent touch, the strip off
// screen, or reduced motion requested.
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const INTERVAL = 4000;
const TOUCH_PAUSE = 10_000;

export function ReelStrip({ reels }: { reels: { url: string; embed: string }[] }) {
  const track = useRef<HTMLUListElement>(null);
  const hold = useRef({ hover: false, visible: false, touchedAt: 0 });

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    // Wrap around at either end so the strip loops.
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * (card.clientWidth + 20), behavior: "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new IntersectionObserver(([entry]) => {
      hold.current.visible = entry.isIntersecting;
    });
    seen.observe(el);

    const timer = window.setInterval(() => {
      const h = hold.current;
      // Tapping into a reel moves focus into its iframe.
      const watching = el.contains(document.activeElement);
      const touched = Date.now() - h.touchedAt < TOUCH_PAUSE;
      if (h.visible && !h.hover && !watching && !touched && !document.hidden) step(1);
    }, INTERVAL);

    return () => {
      seen.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const arrow =
    "grid size-12 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition duration-300 hover:border-cyan hover:bg-cyan hover:text-hero-950";

  return (
    <div>
      <ul
        ref={track}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hold.current.hover = true;
        }}
        onPointerLeave={() => {
          hold.current.hover = false;
        }}
        onTouchStart={() => {
          hold.current.touchedAt = Date.now();
        }}
        className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 lg:-mx-8 lg:scroll-px-8 lg:px-8"
      >
        {reels.map((r, i) => (
          <li key={r.url} className="shrink-0 snap-start">
            {/* Instagram's embed: a 54px header (+1px border), then the video in a 4:5
                box — 400px tall at 320px wide — then the likes and comment bar. The
                frame shows only the video box. */}
            <div className="border-glow relative h-[24.875rem] w-80 overflow-hidden rounded-3xl bg-hero-900">
              <iframe
                src={r.embed}
                title={`techcadd on Instagram — reel ${i + 1}`}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
                className="absolute inset-x-0 -top-[3.5rem] h-[40rem] w-full border-0"
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex gap-2">
        <button
          type="button"
          aria-label="Previous reels"
          onClick={() => {
            hold.current.touchedAt = Date.now();
            step(-1);
          }}
          className={arrow}
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next reels"
          onClick={() => {
            hold.current.touchedAt = Date.now();
            step(1);
          }}
          className={arrow}
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
