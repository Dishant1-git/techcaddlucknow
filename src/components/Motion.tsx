"use client";

import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { setLenis } from "@/lib/scroll";

/**
 * Site-wide scroll and pointer animations, driven by data attributes so the
 * sections themselves can stay server components:
 *
 *   data-split          heading whose words rise out of a mask
 *   data-split-chars    same, per character
 *   data-scrub-text     words light up as the block scrolls through the viewport
 *   data-reveal         fade in ("left" | "right" | "scale", default up)
 *   data-stagger        children fade up one after another
 *   data-speed="0.3"    parallax drift
 *   data-scroll-x="1"   horizontal drift tied to scroll (1 or -1)
 *   data-draw-x         line that draws left-to-right
 *   data-stack          children are sticky cards that recede as the next arrives
 *   data-hscroll        pinned section whose [data-hscroll-track] scrolls sideways
 *   data-hero-dash      hero dashboard that un-tilts on scroll
 *   data-zoom-hero      sticky hero: headline splits, portal opens (data-hz-*)
 *   data-doors          sticky doors that swing open onto [data-door-room]
 *   data-panels         sticky stack of [data-panel]s that wipe over each other
 *   data-syllabus       sticky deck: [data-syllabus-card]s fly in from the right and stack
 *   data-deal           sticky grid: [data-deal-card]s are dealt from a pile on the left
 *   data-words          sticky sentence revealed one [data-word] at a time
 *   data-grow="0.4"     scales up to full size as it enters the viewport
 *   data-tilt           3D tilt towards the pointer
 *   data-magnetic       element pulled towards the pointer
 *   data-spot           cursor-following spotlight (styled in globals.css)
 */
export function Motion() {
  // usePathname can suspend while a dynamic route is prerendered.
  return (
    <Suspense fallback={null}>
      <MotionEffects />
    </Suspense>
  );
}

function MotionEffects() {
  // Moving between pages swaps the DOM without a reload, so every animation is
  // torn down and set up again for the new page.
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
    const mm = gsap.matchMedia();
    // Only the first setup for a page may move the scroll position.
    let arrived = false;

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
        mobile: "(max-width: 1023.98px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const cleanups: (() => void)[] = [];

        // Smooth, weighted scrolling. Lenis drives the native scroll position, so
        // sticky and fixed elements keep working; it also handles in-page links.
        const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -104 } });
        lenis.on("scroll", ScrollTrigger.update);
        setLenis(lenis);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(tick);
          setLenis(null);
          lenis.destroy();
        });

        // The pinned section is created first so every trigger below it measures
        // its position with the pin spacing already in place.
        q("[data-hscroll]").forEach((wrap) => {
          const track = wrap.querySelector<HTMLElement>("[data-hscroll-track]");
          if (!desktop || !track) return;
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          const bar = wrap.querySelector("[data-hscroll-bar]");
          if (bar) {
            gsap.fromTo(
              bar,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: wrap,
                  start: "top top",
                  end: () => `+=${distance()}`,
                  scrub: 0.6,
                },
              },
            );
          }
          // Cards lift in as they travel into view.
          track.querySelectorAll<HTMLElement>("[data-hscroll-item]").forEach((item) => {
            gsap.from(item, {
              y: 70,
              rotation: 4,
              autoAlpha: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                containerAnimation: tween,
                start: "left 105%",
                end: "left 65%",
                scrub: true,
              },
            });
          });
        });

        // The sections below pin with CSS (a tall wrapper around a sticky screen),
        // so each timeline simply scrubs across its wrapper's scroll distance.
        const scrubbed = (wrap: HTMLElement) =>
          gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: wrap, start: "top top", end: "bottom bottom", scrub: 0.6 },
          });
        const each = (root: HTMLElement, selector: string) =>
          Array.from(root.querySelectorAll<HTMLElement>(selector));

        // Hero: the headline splits apart and a circular portal opens onto the promise.
        q("[data-zoom-hero]").forEach((wrap) => {
          const tl = scrubbed(wrap);
          tl.to(each(wrap, "[data-hz-left]"), { xPercent: -70, autoAlpha: 0, duration: 0.5 }, 0)
            .to(each(wrap, "[data-hz-right]"), { xPercent: 70, autoAlpha: 0, duration: 0.5 }, 0)
            .to(each(wrap, "[data-hz-fade]"), { y: -50, autoAlpha: 0, duration: 0.3 }, 0)
            .fromTo(
              each(wrap, "[data-hz-portal]"),
              { clipPath: "circle(0% at 50% 55%)" },
              { clipPath: "circle(75% at 50% 55%)", ease: "power2.in", duration: 0.6 },
              0.05,
            )
            .fromTo(
              each(wrap, "[data-hz-next] > *"),
              { y: 80, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: 0.06, ease: "power2.out", duration: 0.3 },
              0.5,
            )
            .to({}, { duration: 0.15 });
          each(wrap, "[data-hz-float]").forEach((el) => {
            tl.to(el, { y: -420 * Number(el.dataset.hzFloat), rotation: 40, duration: 0.6 }, 0);
          });
        });

        // Doors: two leaves swing into the room and the content behind steps forward.
        q("[data-doors]").forEach((wrap) => {
          const left = each(wrap, '[data-door="left"]');
          const right = each(wrap, '[data-door="right"]');
          gsap.set(left, { transformPerspective: 1800, transformOrigin: "0% 50%" });
          gsap.set(right, { transformPerspective: 1800, transformOrigin: "100% 50%" });
          const tl = scrubbed(wrap);
          tl.to(left, { rotationY: 86, ease: "power1.inOut", duration: 0.7 }, 0)
            .to(right, { rotationY: -86, ease: "power1.inOut", duration: 0.7 }, 0)
            .to([...left, ...right], { autoAlpha: 0, duration: 0.1 }, 0.62)
            .fromTo(
              each(wrap, "[data-door-room] > *"),
              { scale: 0.7, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, stagger: 0.05, ease: "power2.out", duration: 0.45 },
              0.25,
            )
            .to({}, { duration: 0.3 });
          each(wrap, "[data-door-float]").forEach((el) => {
            tl.fromTo(
              el,
              { y: 260 * Number(el.dataset.doorFloat) },
              { y: -260 * Number(el.dataset.doorFloat), duration: 1 },
              0,
            );
          });
        });

        // Panels: each full-screen panel wipes up over the one before it.
        q("[data-panels]").forEach((wrap) => {
          const panels = each(wrap, "[data-panel]");
          const tl = scrubbed(wrap);
          panels.forEach((panel, i) => {
            if (i === 0) return;
            const inner = panel.querySelector("[data-panel-inner]");
            const before = panels[i - 1].querySelector("[data-panel-inner]");
            tl.fromTo(
              panel,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
              i - 1,
            );
            if (inner) tl.fromTo(inner, { y: 160 }, { y: 0, duration: 1 }, i - 1);
            if (before) tl.to(before, { y: -120, scale: 0.92, duration: 1 }, i - 1);
          });
          tl.to({}, { duration: 0.5 });
          const bar = wrap.querySelector("[data-panels-bar]");
          if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: tl.duration() }, 0);
        });

        // Syllabus: each week's card flies in from the right and lands on the
        // stack, pushing the earlier weeks back.
        q("[data-syllabus]").forEach((wrap) => {
          const cards = each(wrap, "[data-syllabus-card]");
          if (!desktop) return;
          // Cards have a fixed height here, so long modules step their text down
          // until they fit (never below 11px; past that the card scrolls).
          const fit = () =>
            cards.forEach((card) => {
              const body = card.querySelector<HTMLElement>("[data-syllabus-body]");
              const list = card.querySelector<HTMLElement>("[data-syllabus-list]");
              if (!body || !list) return;
              list.style.fontSize = "";
              let size = parseFloat(getComputedStyle(list).fontSize);
              while (body.scrollHeight > body.clientHeight + 1 && size > 11) {
                size -= 0.5;
                list.style.fontSize = `${size}px`;
              }
              more(body);
            });
          // Flags a card that still overflows, until it has been scrolled to the end.
          const more = (body: HTMLElement) =>
            body.parentElement?.toggleAttribute(
              "data-more",
              body.scrollTop + body.clientHeight < body.scrollHeight - 4,
            );
          const onScroll = (e: Event) => {
            const body = (e.target as HTMLElement).closest<HTMLElement>("[data-syllabus-body]");
            if (body) more(body);
          };
          wrap.addEventListener("scroll", onScroll, true);
          fit();
          document.fonts.ready.then(fit);
          window.addEventListener("resize", fit);
          cleanups.push(() => {
            window.removeEventListener("resize", fit);
            wrap.removeEventListener("scroll", onScroll, true);
            cards.forEach((card) => card.removeAttribute("data-more"));
            each(wrap, "[data-syllabus-list]").forEach((list) => (list.style.fontSize = ""));
          });

          if (cards.length < 2) return;
          const n = cards.length;
          // Lenis already smooths the scroll, so the timeline follows it directly
          // instead of adding a second layer of scrub lag.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: wrap, start: "top top", end: "bottom bottom", scrub: true },
          });
          tl.to({}, { duration: 0.2 });
          cards.forEach((card, i) => {
            if (i === 0) return;
            const at = i - 0.8;
            tl.fromTo(
              card,
              { xPercent: 160, rotation: 6 },
              { xPercent: 0, rotation: 0, ease: "power3.out", duration: 0.7 },
              at,
            );
            // Only transforms and opacity here: animating `filter` flashes dark.
            cards.slice(0, i).forEach((under, j) => {
              const depth = Math.min(i - j, 4);
              tl.to(
                under,
                {
                  y: -24 * Math.min(depth, 3),
                  scale: 1 - 0.05 * Math.min(depth, 3),
                  autoAlpha: depth > 3 ? 0 : 1,
                  ease: "power3.out",
                  duration: 0.7,
                },
                at,
              );
            });
          });
          tl.to({}, { duration: 0.5 });
          const counter = wrap.querySelector("[data-syllabus-count]");
          if (counter) {
            cards.forEach((_, i) => {
              if (i > 0) tl.to(counter, { yPercent: (-100 * i) / n, ease: "power2.inOut", duration: 0.35 }, i - 0.7);
            });
          }
          const bar = wrap.querySelector("[data-syllabus-bar]");
          if (bar) tl.fromTo(bar, { scaleX: 1 / n }, { scaleX: 1, duration: tl.duration() }, 0);
        });

        // Deal: the cards start as a loose pile at the left of the grid and fly
        // diagonally into their own slots, first card first.
        q("[data-deal]").forEach((wrap) => {
          const grid = wrap.querySelector<HTMLElement>("[data-deal-grid]");
          const stage = wrap.querySelector<HTMLElement>("[data-deal-stage]");
          const cards = each(wrap, "[data-deal-card]");
          const space = wrap.querySelector<HTMLElement>("[data-deal-space]");
          if (!desktop || !grid || !stage || !space || cards.length < 2) return;
          const n = cards.length;
          // Card offsets are relative to the grid, and transforms don't change them.
          const col = (card: HTMLElement) => Math.round(card.offsetLeft / card.offsetWidth);

          // A grid taller than the window (long cards, or many of them) can't be
          // pinned with every card in view, so it isn't pinned: each card slides
          // in diagonally from the left as it scrolls up, column by column.
          if (grid.offsetHeight > window.innerHeight - 160) {
            stage.style.position = "static";
            space.style.display = "none";
            cleanups.push(() => {
              stage.style.position = "";
              space.style.display = "";
            });
            cards.forEach((card) => {
              const c = col(card);
              gsap.fromTo(
                card,
                { x: () => -card.offsetLeft - 60, y: 120, rotation: -6, autoAlpha: 0 },
                {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  autoAlpha: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: `top ${100 - c * 6}%`,
                    end: `top ${68 - c * 6}%`,
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });
            return;
          }

          // A stage taller than the window sticks with its bottom on the window's
          // bottom, so every card stays in view while it is dealt.
          let top = 0;
          const pin = () => {
            top = Math.min(0, window.innerHeight - stage.offsetHeight);
            stage.style.top = `${top}px`;
          };
          pin();
          ScrollTrigger.addEventListener("refreshInit", pin);
          cleanups.push(() => {
            ScrollTrigger.removeEventListener("refreshInit", pin);
            stage.style.top = "";
          });
          const pileX = (card: HTMLElement, i: number) => -card.offsetLeft + i * 8;
          const pileY = (card: HTMLElement, i: number) =>
            (grid.offsetHeight - card.offsetHeight) / 2 - card.offsetTop + i * 8;
          cards.forEach((card, i) => gsap.set(card, { zIndex: n - i }));
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wrap,
              start: () => `top ${top}px`,
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          tl.to({}, { duration: 0.3 });
          cards.forEach((card, i) => {
            const at = 0.3 + i * 0.7;
            // Leaving the pile, a card rises above the ones already dealt.
            tl.set(card, { zIndex: n + i }, at);
            tl.fromTo(
              card,
              {
                x: () => pileX(card, i),
                y: () => pileY(card, i),
                rotation: (i % 2 ? 1 : -1) * (2 + i),
              },
              { x: 0, y: 0, rotation: 0, ease: "power2.inOut", duration: 0.8 },
              at,
            );
          });
          tl.to({}, { duration: 0.4 });
        });

        // Word sequence: a sentence arrives one word at a time.
        q("[data-words]").forEach((wrap) => {
          const tl = scrubbed(wrap);
          tl.fromTo(
            each(wrap, "[data-word]"),
            { autoAlpha: 0, yPercent: 60, rotationX: -70, transformPerspective: 800 },
            { autoAlpha: 1, yPercent: 0, rotationX: 0, stagger: 0.5, ease: "back.out(1.6)", duration: 0.6 },
          )
            .fromTo(
              each(wrap, "[data-words-after]"),
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
            )
            .to({}, { duration: 0.6 });
        });

        q("[data-grow]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: Number(el.dataset.grow) || 0.4 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: 0.6 },
            },
          );
        });

        const reveal = (
          targets: HTMLElement | Element[],
          trigger: Element,
          vars: gsap.TweenVars,
        ) => {
          // CSS transitions on the same properties would fight the tween.
          gsap.set(targets, { transition: "none" });
          gsap.from(targets, {
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            ...vars,
            scrollTrigger: { trigger, start: "top 88%", once: true },
            onComplete: () =>
              gsap.set(targets, { clearProps: "transform,opacity,visibility,transition,filter" }),
          });
        };

        q("[data-split]").forEach((el) => {
          const split = SplitText.create(el, {
            type: "words",
            mask: "words",
            wordsClass: "split-word",
          });
          gsap.from(split.words, {
            yPercent: 115,
            rotation: 4,
            duration: 1,
            ease: "power4.out",
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        q("[data-split-chars]").forEach((el) => {
          const split = SplitText.create(el, { type: "chars", mask: "chars" });
          gsap.from(split.chars, {
            yPercent: 100,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: "top 98%", once: true },
          });
        });

        q("[data-scrub-text]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 55%", scrub: 0.4 },
            },
          );
        });

        q("[data-reveal]").forEach((el) => {
          const from: Record<string, gsap.TweenVars> = {
            left: { x: -70 },
            right: { x: 70 },
            scale: { scale: 0.88, y: 30 },
          };
          reveal(el, el, from[el.dataset.reveal ?? ""] ?? { y: 50 });
        });

        q("[data-stagger]").forEach((el) => {
          reveal(Array.from(el.children), el, { y: 70, filter: "blur(6px)", stagger: 0.1 });
        });

        q("[data-speed]").forEach((el) => {
          const speed = Number(el.dataset.speed) || 0.2;
          gsap.fromTo(
            el,
            { y: 120 * speed },
            {
              y: -120 * speed,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        q("[data-scroll-x]").forEach((el) => {
          const forward = Number(el.dataset.scrollX) > 0;
          gsap.fromTo(
            el,
            { xPercent: forward ? -28 : -4 },
            {
              xPercent: forward ? -4 : -28,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
            },
          );
        });

        q("[data-draw-x]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "0 50%" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 80%", end: "top 40%", scrub: 0.5 },
            },
          );
        });

        q("[data-stack]").forEach((stack) => {
          const cards = Array.from(stack.children) as HTMLElement[];
          cards.slice(0, -1).forEach((card, i) => {
            gsap.to(card, {
              scale: 0.9,
              filter: "brightness(0.55)",
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top 85%",
                end: "top 25%",
                scrub: true,
              },
            });
          });
        });

        q("[data-hero-dash]").forEach((el) => {
          gsap.fromTo(
            el,
            { rotationX: 26, scale: 0.9, transformPerspective: 1400, transformOrigin: "50% 0%" },
            {
              rotationX: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 100%", end: "top 35%", scrub: 0.6 },
            },
          );
        });

        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });

        // Opening a "Read more" card changes the page height under every trigger.
        const onClamp = (e: Event) => {
          if ((e.target as Element).closest("[data-clamp]")) ScrollTrigger.refresh();
        };
        document.addEventListener("change", onClamp);
        cleanups.push(() => document.removeEventListener("change", onClamp));

        // Pointer effects only make sense with a mouse.
        if (desktop && window.matchMedia("(hover: hover)").matches) {
          const onSpot = (e: PointerEvent) => {
            const el = (e.target as Element | null)?.closest<HTMLElement>("[data-spot]");
            if (!el) return;
            const r = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - r.left}px`);
            el.style.setProperty("--my", `${e.clientY - r.top}px`);
          };
          document.addEventListener("pointermove", onSpot, { passive: true });
          cleanups.push(() => document.removeEventListener("pointermove", onSpot));

          q("[data-tilt]").forEach((el) => {
            gsap.set(el, { transformPerspective: 900 });
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              ry(((e.clientX - r.left) / r.width - 0.5) * 12);
              rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
            };
            const leave = () => {
              rx(0);
              ry(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });

          q("[data-magnetic]").forEach((el) => {
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              gsap.to(el, {
                x: (e.clientX - r.left - r.width / 2) * 0.35,
                y: (e.clientY - r.top - r.height / 2) * 0.35,
                duration: 0.4,
                ease: "power3.out",
              });
            };
            const leave = () =>
              gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });
        }

        // Web fonts change heading heights, which shifts every trigger below them.
        document.fonts?.ready.then(() => {
          ScrollTrigger.refresh();
          // Arriving on "/#faq" from another page: the pinned sections above
          // have only now taken up their full height, so go to the target again.
          const id = decodeURIComponent(window.location.hash.slice(1));
          const target = document.getElementById(id);
          if (target && !arrived) {
            lenis.scrollTo(target, { immediate: true, force: true, offset: -104 });
          }
          arrived = true;
        });

        return () => cleanups.forEach((fn) => fn());
      },
    );

    return () => mm.revert();
  }, [pathname]);

  return (
    <div
      data-progress
      aria-hidden
      style={{ transform: "scaleX(0)" }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan via-sky to-sun"
    />
  );
}
