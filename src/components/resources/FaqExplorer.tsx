"use client";

// Searchable, filterable FAQ list. Only a page of answers is rendered at a
// time ("Show more" adds the next page), so the DOM stays small.
import { useDeferredValue, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { FaqItem } from "@/lib/resources/faq";
import { Accordion, Chips } from "./Interactive";

const STEP = 20;
const ALL = "all";

export function FaqExplorer({ items, categories }: { items: FaqItem[]; categories: string[] }) {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(STEP);
  const deferred = useDeferredValue(query);

  // Search runs over every category so the chip counts show where matches are.
  const matches = useMemo(() => {
    const terms = deferred.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return items.filter((f) => {
      const hay = `${f.q} ${f.a}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [items, deferred]);

  const results = category === ALL ? matches : matches.filter((f) => f.category === category);
  const visible = results.slice(0, limit);

  const options = [
    { value: ALL, label: "All questions", count: matches.length },
    ...categories.map((c) => ({
      value: c,
      label: c,
      count: matches.filter((f) => f.category === c).length,
    })),
  ];

  const reset = () => setLimit(STEP);

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <label htmlFor="faq-search" className="sr-only">
          Search the questions
        </label>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            placeholder="Search fees, placements, timings, a course…"
            autoComplete="off"
            className="w-full rounded-full border border-slate-200 bg-white py-4 pl-13 pr-12 text-[15px] text-navy shadow-xl shadow-hero-950/5 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                reset();
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-brand hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Chips
          label="Filter questions by category"
          options={options}
          value={category}
          onChange={(v) => {
            setCategory(v);
            reset();
          }}
        />
      </div>

      <p aria-live="polite" className="mt-10 text-center text-sm text-slate-500">
        {results.length
          ? `Showing ${visible.length} of ${results.length} ${results.length === 1 ? "question" : "questions"}`
          : "No questions match your search."}
      </p>

      <div className="mx-auto mt-5 max-w-3xl">
        {visible.length > 0 && (
          <Accordion
            key={`${category}|${deferred}`}
            items={visible.map((f) => ({ q: f.q, a: f.a, tag: category === ALL ? f.category : undefined }))}
          />
        )}
        {results.length > visible.length && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setLimit((n) => n + STEP)}
              className="rounded-full border border-slate-200 bg-white px-7 py-3 font-semibold text-navy transition hover:border-brand hover:text-brand"
            >
              Show {Math.min(STEP, results.length - visible.length)} more
            </button>
          </div>
        )}
        {results.length === 0 && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(ALL);
                reset();
              }}
              className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-brand"
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
