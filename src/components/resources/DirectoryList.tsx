"use client";

// Searchable, grouped list of every page on the site (/pages).
import { NavLink } from "../NavLink";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { DirectoryEntry } from "@/lib/resources/directory";
import { Chips } from "./Interactive";

const ALL = "All pages";

export function DirectoryList({ entries, groups }: { entries: DirectoryEntry[]; groups: string[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState(ALL);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? entries.filter((e) => e.title.toLowerCase().includes(q) || e.text.toLowerCase().includes(q))
      : entries;
  }, [entries, query]);

  const options = [ALL, ...groups].map((g) => ({
    value: g,
    label: g,
    count: g === ALL ? matches.length : matches.filter((e) => e.group === g).length,
  }));
  const shown = group === ALL ? matches : matches.filter((e) => e.group === group);
  const sections = groups
    .map((g) => ({ group: g, items: shown.filter((e) => e.group === g) }))
    .filter((s) => s.items.length);

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <label htmlFor="pages-search" className="sr-only">
          Search the pages
        </label>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            id="pages-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a course, tool or topic…"
            autoComplete="off"
            className="w-full rounded-full border border-slate-200 bg-white py-4 pl-13 pr-12 text-base text-navy shadow-xl shadow-hero-950/5 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 sm:text-[15px] [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-brand hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Chips label="Filter pages by section" options={options} value={group} onChange={setGroup} />
      </div>

      {sections.length === 0 && (
        <p className="mt-14 text-center text-slate-500">No pages match “{query}”. Try a shorter word.</p>
      )}

      <div className="mt-14 space-y-14">
        {sections.map((s) => (
          <section key={s.group} aria-labelledby={`dir-${s.group}`}>
            <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
              <h2 id={`dir-${s.group}`} className="font-display text-2xl font-extrabold tracking-tight text-navy">
                {s.group}
              </h2>
              <span className="text-sm font-semibold text-slate-400">
                {s.items.length} {s.items.length === 1 ? "page" : "pages"}
              </span>
            </div>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {s.items.map((e) => (
                <li key={e.href}>
                  <NavLink
                    href={e.href}
                    className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5 transition duration-300 hover:-translate-y-1 hover:border-brand/30"
                  >
                    <span className="font-display text-lg font-bold text-navy">{e.title}</span>
                    <span className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{e.text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                      Read
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
