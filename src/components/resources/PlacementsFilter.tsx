"use client";

import { useState } from "react";
import { Building2, MapPin } from "lucide-react";
import type { PlacementRecord } from "@/lib/resources/placements";
import { Chips } from "./Interactive";
import { initials } from "./Kit";

/** Grid of placement records with a region filter. */
export function PlacementsFilter({
  records,
  regions,
}: {
  records: PlacementRecord[];
  regions: { label: string; count: number }[];
}) {
  const [region, setRegion] = useState("all");
  const shown = region === "all" ? records : records.filter((r) => r.region === region);

  return (
    <div className="mt-10">
      <Chips
        label="Filter placements by region"
        value={region}
        onChange={setRegion}
        options={[
          { value: "all", label: "All regions", count: records.length },
          ...regions.map((r) => ({ value: r.label, label: r.label, count: r.count })),
        ]}
      />

      <ul aria-live="polite" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <li
            key={r.id}
            className="flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1 hover:border-brand/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-sky font-display text-sm font-bold text-white">
                  {initials(r.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display font-bold text-navy">{r.name}</span>
                  <span className="block truncate text-xs text-slate-500">{r.course}</span>
                </span>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 font-display text-sm font-extrabold text-emerald-700">
                {r.package}
              </span>
            </div>

            <div className="mt-4 flex-1 rounded-2xl bg-slate-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Placed with</p>
              <p className="mt-1 flex items-center gap-2 font-display font-bold text-navy">
                <Building2 className="size-4 shrink-0 text-brand" />
                {r.company}
              </p>
              <p className="mt-1 text-sm text-slate-600">{r.role}</p>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin className="size-3.5" />
              {r.region}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
