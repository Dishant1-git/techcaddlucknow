"use client";

// Domain switcher for the interview Q&A page: one domain's questions at a time.
import { useState } from "react";
import { Accordion, Chips } from "./Interactive";

export function InterviewTabs({
  domains,
}: {
  domains: { label: string; meta: string; items: { tag: string; q: string; a: string }[] }[];
}) {
  const [value, setValue] = useState(domains[0]?.label ?? "");
  const domain = domains.find((d) => d.label === value) ?? domains[0];
  if (!domain) return null;

  return (
    <div className="mt-12">
      <Chips
        label="Choose an interview domain"
        options={domains.map((d) => ({ value: d.label, label: d.label, count: d.items.length }))}
        value={value}
        onChange={setValue}
      />
      <div className="mx-auto mt-10 max-w-3xl">
        <p aria-live="polite" className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          {domain.meta} · {domain.items.length} questions
        </p>
        <Accordion key={domain.label} items={domain.items} />
      </div>
    </div>
  );
}
