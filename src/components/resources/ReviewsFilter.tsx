"use client";

import { useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import type { Review } from "@/lib/resources/reviews";
import { Clamp, GoogleG } from "../ui";
import { Chips } from "./Interactive";
import { initials } from "./Kit";

/** Masonry of Google reviews with a course filter. */
export function ReviewsFilter({
  reviews,
  courses,
}: {
  reviews: Review[];
  courses: { course: string; count: number }[];
}) {
  const [course, setCourse] = useState("all");
  const shown = course === "all" ? reviews : reviews.filter((r) => r.course === course);

  return (
    <div className="mt-12">
      <Chips
        label="Filter reviews by course"
        value={course}
        onChange={setCourse}
        options={[
          { value: "all", label: "All courses", count: reviews.length },
          ...courses.map((c) => ({ value: c.course, label: c.course, count: c.count })),
        ]}
      />

      <p aria-live="polite" className="mt-8 text-center text-sm text-slate-500">
        Showing {shown.length} {shown.length === 1 ? "review" : "reviews"}
        {course !== "all" && <> for {course}</>}
      </p>

      <ul className="mt-6 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shown.map((r) => (
          <li
            key={r.id}
            className="mb-5 break-inside-avoid rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">{r.course}</span>
              <span aria-label={`${r.rating} out of 5`} className="flex gap-0.5 text-sun">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`size-4 ${i < r.rating ? "fill-current" : "text-slate-200"}`} />
                ))}
              </span>
            </div>
            <blockquote className="mt-4 whitespace-pre-line leading-relaxed text-slate-700">
              <Clamp length={r.text.length}>
                <p>{r.text}</p>
              </Clamp>
            </blockquote>
            <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-sky font-display text-sm font-bold text-white">
                {initials(r.name.replace(/[^\p{L}\s]/gu, "")) || "G"}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display font-bold text-navy">{r.name}</span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <GoogleG className="size-3.5" /> Google review
                </span>
              </span>
              {r.link && (
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${r.name}'s review on Google`}
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand hover:underline"
                >
                  Google <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
