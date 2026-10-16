"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Mic } from "lucide-react";
import type { EventStatus, EventType, SeminarEvent } from "@/lib/resources/seminars";
import { Clamp } from "../ui";
import { Chips } from "./Interactive";

type TypeFilter = "all" | EventType;
type StatusFilter = "all" | EventStatus;

/** Event list with type (workshop / seminar) and status (upcoming / past) filters. */
export function SeminarsFilter({ events }: { events: SeminarEvent[] }) {
  const [type, setType] = useState<TypeFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const byStatus = (e: SeminarEvent) => status === "all" || e.status === status;
  const byType = (e: SeminarEvent) => type === "all" || e.type === type;
  const shown = events.filter((e) => byType(e) && byStatus(e));

  const typeCount = (t: TypeFilter) => events.filter((e) => (t === "all" || e.type === t) && byStatus(e)).length;
  const statusCount = (s: StatusFilter) => events.filter((e) => (s === "all" || e.status === s) && byType(e)).length;

  return (
    <div className="mt-12">
      <div className="space-y-3">
        <Chips
          label="Event type"
          value={type}
          onChange={(v) => setType(v as TypeFilter)}
          options={[
            { value: "all", label: "All events", count: typeCount("all") },
            { value: "Seminar", label: "Seminars", count: typeCount("Seminar") },
            { value: "Workshop", label: "Workshops", count: typeCount("Workshop") },
          ]}
        />
        <Chips
          label="Event status"
          value={status}
          onChange={(v) => setStatus(v as StatusFilter)}
          options={[
            { value: "all", label: "Any date", count: statusCount("all") },
            { value: "upcoming", label: "Upcoming", count: statusCount("upcoming") },
            { value: "past", label: "Past", count: statusCount("past") },
          ]}
        />
      </div>

      <p aria-live="polite" className="mt-8 text-center text-sm text-slate-500">
        Showing {shown.length} of {events.length} events
      </p>

      {shown.length ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.id}>
              <EventCard event={e} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <CalendarDays className="mx-auto size-8 text-brand" />
          <p className="mt-4 font-display text-lg font-bold text-navy">
            {status === "upcoming" ? "No upcoming events are listed right now" : "No events match these filters"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {status === "upcoming"
              ? "New sessions are announced through colleges and our counsellors. Request a callback to hear about the next one."
              : "Try another type or date filter."}
          </p>
        </div>
      )}
    </div>
  );
}

function EventCard({ event: e }: { event: SeminarEvent }) {
  const workshop = e.type === "Workshop";
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1 hover:border-brand/30">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            workshop ? "bg-cyan/15 text-navy" : "bg-brand/10 text-brand"
          }`}
        >
          {e.type}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            e.status === "upcoming" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
          }`}
        >
          {e.status === "upcoming" ? "Upcoming" : "Past event"}
        </span>
      </div>

      <p className="mt-5 flex items-center gap-2 font-display text-sm font-bold text-brand">
        <CalendarDays className="size-4 shrink-0" />
        <time>{e.date}</time>
      </p>
      <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy">{e.title}</h3>

      <dl className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex gap-2">
          <dt className="sr-only">Venue</dt>
          <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-slate-400" />
          <dd>{e.venue}</dd>
        </div>
        {e.speaker && (
          <div className="flex gap-2">
            <dt className="sr-only">Led by</dt>
            <Mic aria-hidden className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <dd>{e.speaker}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 border-t border-slate-100 pt-4 text-[15px] leading-relaxed text-slate-600">
        <Clamp length={e.text.length}>
          <p>{e.text}</p>
        </Clamp>
      </div>
    </article>
  );
}
