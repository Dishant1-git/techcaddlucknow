// Seminars & events page (/techcadd-lucknow-seminars), reshaped from seminars.json.
//
// TODO: replace with Lucknow centre events. Every event below was run by the
// Mohali / Punjab side of the techcadd network, so the page presents them as
// events "across the techcadd network", never as Lucknow events. Venue and
// institution names are kept exactly as in the source.
import data from "./data/seminars.json";
import { mapHref } from "./routes";

type RawEvent = {
  title: string;
  text: string;
  summary?: string;
  date: string;
  venue: string;
  status: string;
  type: string;
  name?: string;
  hasImage?: boolean;
};

type RawLink = { title: string; text: string; meta?: string; link?: string };

export type EventType = "Workshop" | "Seminar";
export type EventStatus = "upcoming" | "past";

export type SeminarEvent = {
  id: string;
  title: string;
  text: string;
  date: string;
  venue: string;
  /** Who led the session, when the source names them. */
  speaker?: string;
  type: EventType;
  status: EventStatus;
};

const decode = (s: string) =>
  s.replaceAll("&#x27;", "'").replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("’", "'");

// Venue names in the source are typed by hand ("CGC University, mohali",
// "GPC , mohali"); tidy spacing and capitalise the town without renaming it.
const tidyVenue = (v: string) =>
  v
    .replace(/\s+,/g, ",")
    .replace(/,\s*([a-z])/g, (_, c: string) => `, ${c.toUpperCase()}`)
    .trim();

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const rawEvents = data.sections[0].items as RawEvent[];

export const events: SeminarEvent[] = rawEvents.map((e, i) => ({
  id: `${slug(e.title).slice(0, 48)}-${i}`,
  title: decode(e.title),
  // The longer copy; cards clamp it with "Read more".
  text: decode(e.text),
  date: e.date,
  venue: tidyVenue(decode(e.venue)),
  speaker: e.name ? decode(e.name) : undefined,
  type: e.type === "Workshop" ? "Workshop" : "Seminar",
  status: e.status.toLowerCase() === "upcoming" ? "upcoming" : "past",
}));

const count = (pred: (e: SeminarEvent) => boolean) => events.filter(pred).length;

export const eventStats = [
  { value: String(events.length), label: "Events listed" },
  { value: String(count((e) => e.type === "Seminar")), label: "Seminars" },
  { value: String(count((e) => e.type === "Workshop")), label: "Workshops" },
  { value: String(new Set(events.map((e) => e.venue.split(",")[0].trim())).size), label: "Host venues" },
];

/** People named as leading sessions, with how many they led. */
export const speakers = (() => {
  const tally = new Map<string, number>();
  for (const e of events) {
    for (const name of e.speaker?.split(/,\s*/) ?? []) tally.set(name, (tally.get(name) ?? 0) + 1);
  }
  return [...tally.entries()]
    .map(([name, sessions]) => {
      const m = name.match(/^(.*?)\s*\((.*)\)$/);
      return { name: m ? m[1] : name, role: m ? m[2] : undefined, sessions };
    })
    .sort((a, b) => b.sessions - a.sessions);
})();

export const eventLinks = (data.sections[1].items as RawLink[]).map((l) => ({
  title: decode(l.title),
  text: decode(l.text),
  cta: l.meta,
  href: mapHref(l.link),
}));
