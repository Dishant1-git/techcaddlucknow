"use client";

// Capstone cards with a category filter, for the student projects page.
import { useState } from "react";
import { ArrowRight, CheckCircle2, Gauge } from "lucide-react";
import type { Capstone } from "@/lib/resources/projects";
import { NavLink } from "../NavLink";
import { Chips } from "./Interactive";

export function CapstoneGrid({
  items,
  filters,
  ctaHref,
}: {
  items: Capstone[];
  filters: string[];
  ctaHref: string;
}) {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? items : items.filter((p) => p.category === filter);
  const options = [
    { value: "all", label: "All projects", count: items.length },
    ...filters.map((f) => ({ value: f, label: f, count: items.filter((p) => p.category === f).length })),
  ].filter((o) => o.count > 0);

  return (
    <>
      <div className="mt-12">
        <Chips label="Filter projects by track" options={options} value={filter} onChange={setFilter} />
      </div>
      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {shown.map((p) => (
          <li
            key={p.number}
            data-spot
            className="flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{p.category}</p>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug text-navy sm:text-2xl">{p.title}</h3>
                <p className="mt-1.5 text-sm font-semibold text-slate-500">{p.meta}</p>
              </div>
              <span aria-hidden className="font-display text-4xl font-extrabold text-slate-100">
                {p.number}
              </span>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{p.text}</p>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Technical architecture</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full bg-brand/8 px-3 py-1 text-xs font-semibold text-brand">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-3 rounded-2xl bg-slate-50 p-4">
              <Gauge className="mt-0.5 size-5 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-bold text-navy">Key performance metric: </span>
                {p.metric}
              </p>
            </div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Verified project deliverables
            </p>
            <ul className="mt-2 grid flex-1 content-start gap-2 sm:grid-cols-2">
              {p.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan" />
                  {d}
                </li>
              ))}
            </ul>

            <NavLink
              href={ctaHref}
              className="group mt-7 inline-flex items-center gap-2 self-start text-sm font-bold text-brand"
            >
              Build this in your training
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
