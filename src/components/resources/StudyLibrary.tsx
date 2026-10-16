"use client";

// Filterable cheat-sheet library for the study material page. Each card opens
// its cheat sheet in a modal <dialog>, which keeps focus inside and returns it
// to the card's button when closed.
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, CheckCircle2, Code2, X } from "lucide-react";
import type { StudyResource } from "@/lib/resources/study-material";
import { NavLink } from "../NavLink";
import { Chips } from "./Interactive";

export function StudyLibrary({
  categories,
  resources,
}: {
  categories: { slug: string; heading: string; text: string }[];
  resources: StudyResource[];
}) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<StudyResource | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el || !active) return;
    if (!el.open) el.showModal();
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = before;
    };
  }, [active]);

  const close = () => dialog.current?.close();

  const options = [
    { value: "all", label: "All resources", count: resources.length },
    ...categories.map((c) => ({
      value: c.slug,
      label: c.heading,
      count: resources.filter((r) => r.category === c.slug).length,
    })),
  ];
  const shown = categories.filter((c) => filter === "all" || c.slug === filter);

  return (
    <>
      <div className="mt-12">
        <Chips label="Filter study material by discipline" options={options} value={filter} onChange={setFilter} />
      </div>

      <div className="mt-14 space-y-16">
        {shown.map((c) => (
          <div key={c.slug} id={c.slug} className="scroll-mt-32">
            <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy">{c.heading}</h3>
              <p className="max-w-md text-sm text-slate-500 sm:text-right">{c.text}</p>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {resources
                .filter((r) => r.category === c.slug)
                .map((r) => (
                  <li
                    key={r.id}
                    data-spot
                    className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1 hover:border-brand/30"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                        {r.type}
                      </span>
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500">
                        {r.tag}
                      </span>
                    </div>
                    <h4 className="mt-4 font-display text-lg font-bold leading-snug text-navy">{r.title}</h4>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{r.text}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {r.highlights.map((h) => (
                        <li key={h} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setActive(r)}
                        className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand"
                      >
                        <BookOpen className="size-4" /> Cheat sheet
                      </button>
                      <NavLink
                        href={r.href}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
                      >
                        Full course <ArrowUpRight className="size-4" />
                        <span className="sr-only">: {r.courseName}</span>
                      </NavLink>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <dialog
        ref={dialog}
        data-lenis-prevent
        aria-labelledby="cheat-sheet-title"
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-3xl bg-white p-0 text-left shadow-2xl backdrop:bg-hero-950/70 backdrop:backdrop-blur-sm sm:max-h-[calc(100dvh-2.5rem)]"
      >
        {active && (
          <div className="p-6 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  {active.type} · {active.tag}
                </p>
                <h2 id="cheat-sheet-title" className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight text-navy">
                  {active.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close cheat sheet"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 text-navy transition hover:bg-brand hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="mt-5 leading-relaxed text-slate-600">{active.cheatSheet.summary}</p>

            <figure className="mt-6 overflow-hidden rounded-2xl bg-hero-950">
              <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-[13px] font-semibold text-slate-200">
                <Code2 className="size-4 text-cyan" /> {active.cheatSheet.codeTitle}
              </figcaption>
              <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-slate-200">
                <code>{active.cheatSheet.code}</code>
              </pre>
            </figure>

            <h3 className="mt-7 font-display text-lg font-bold text-navy">Key takeaways</h3>
            <ul className="mt-3 space-y-3">
              {active.cheatSheet.keyTakeaways.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
              <NavLink
                href={active.href}
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-brand"
              >
                Explore the {active.courseName} <ArrowUpRight className="size-4" />
              </NavLink>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
              >
                Back to the library
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
