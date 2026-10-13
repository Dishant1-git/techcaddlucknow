"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Briefcase, Target, Users } from "lucide-react";
import { stats } from "@/lib/site";

const icons = { users: Users, briefcase: Briefcase, target: Target, award: Award };

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1600, 1);
        setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {n.toLocaleString("en-IN")}
      <span className="text-brand">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section data-reveal="scale" className="relative z-10 -mt-16 px-5 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-hero-950/10 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = icons[s.icon];
          return (
            <div
              key={s.label}
              className="group border-b border-r border-slate-100 p-6 transition-colors duration-300 last:border-r-0 hover:bg-sky/5 sm:p-8 lg:border-b-0"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand/8 text-brand transition duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                <Icon className="size-5" />
              </span>
              <p className="mt-5 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-[2.6rem]">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
