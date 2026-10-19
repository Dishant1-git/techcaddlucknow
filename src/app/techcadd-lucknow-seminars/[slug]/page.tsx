import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Ticket, Users, Video } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { PageHero, PageShell } from "@/components/PageShell";
import { CallbackStrip } from "@/components/resources/CallbackStrip";
import { CategoriesBar } from "@/components/resources/ResourceCategories";
import { BookDemoButton } from "@/components/Enquiry";
import { cmsAsset } from "@/lib/cms/client";
import { eventHref, getEvent, getEvents } from "@/lib/cms/content";
import { seoMetadata } from "@/lib/cms/seo";
import { cleanHtml, formatDate } from "@/lib/cms/html";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";

// Each event page is built ahead of time, so an unknown slug waits for the
// full render and gets a real 404 instead of a streamed "not found".
export const ensureStatic = "navigation";
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

// Events published in the CMS. Cache Components needs at least one param to
// validate the route, so an empty CMS yields a placeholder that 404s.
export async function generateStaticParams() {
  const slugs = (await getEvents()).flatMap((e) => (e.href ? [{ slug: e.id }] : []));
  return slugs.length ? slugs : [{ slug: "__placeholder__" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent((await params).slug);
  if (!event) return {};
  return seoMetadata({
    seo: event.seo,
    title: `${event.title} | ${site.name} ${site.city}`,
    description: event.summary,
    path: eventHref(event.slug),
    image: cmsAsset(event.coverImage?.url),
  });
}

const modeLabel = { "in-person": "In person", online: "Online", hybrid: "In person & online" } as const;

export default async function EventPage({ params }: Props) {
  const event = await getEvent((await params).slug);
  if (!event) notFound();

  const start = formatDate(event.startsOn).long;
  const end = event.endsOn && event.endsOn !== event.startsOn ? formatDate(event.endsOn).long : "";
  const time = [event.startTime, event.endTime].filter(Boolean).join(" – ");
  const venue = [event.venueName, event.venueAddress, event.city].filter(Boolean).join(", ");
  const cover = cmsAsset(event.coverImage?.url);
  const type = event.eventType.replace("-", " ");

  const facts = [
    { icon: CalendarDays, label: "Date", value: end ? `${start} – ${end}` : start },
    time && { icon: Clock, label: "Time", value: time },
    { icon: event.mode === "online" ? Video : MapPin, label: modeLabel[event.mode], value: venue || (event.mode === "online" ? "Online" : site.city), href: event.mapUrl },
    event.fee && { icon: Ticket, label: "Fee", value: event.fee },
    event.seats ? { icon: Users, label: "Seats", value: String(event.seats) } : null,
  ].filter((f) => !!f);

  return (
    <PageShell>
      <PageHero
        eyebrow={type}
        title={event.title}
        text={event.summary}
        crumbs={[{ label: "Seminars & Events", href: resourceRoutes.events }, { label: event.title }]}
      />
      <CategoriesBar current="events" />

      <section className="bg-white px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="min-w-0">
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element -- uploaded to the CMS, served from there
              <img src={cover} alt={event.coverImage?.alt ?? ""} className="mb-10 aspect-[16/9] w-full rounded-3xl object-cover shadow-2xl shadow-hero-950/10" />
            )}
            <div className="cms-prose" dangerouslySetInnerHTML={{ __html: cleanHtml(event.body) }} />
            {event.tags.length > 0 && (
              <ul aria-label="Tags" className="mt-8 flex flex-wrap gap-2">
                {event.tags.map((t) => (
                  <li key={t} className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-600">
                    #{t}
                  </li>
                ))}
              </ul>
            )}

            {event.highlights.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display text-2xl font-extrabold text-navy">What you will take away</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {event.highlights.map((h) => (
                    <li key={h.text} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-700">
                      {h.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.agenda.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display text-2xl font-extrabold text-navy">Agenda</h2>
                <ol className="mt-5 space-y-3">
                  {event.agenda.map((a, i) => (
                    <li key={i} className="flex gap-4 rounded-2xl border border-slate-100 p-4">
                      <span className="w-28 shrink-0 font-display text-sm font-bold text-brand">{a.timeLabel || `Part ${i + 1}`}</span>
                      <span>
                        <span className="block font-semibold text-navy">{a.title}</span>
                        {a.detail && <span className="mt-1 block text-sm text-slate-600">{a.detail}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {event.speakers.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display text-2xl font-extrabold text-navy">Speakers</h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {event.speakers.map((s) => {
                    const photo = cmsAsset(s.photo?.url);
                    return (
                      <li key={s.name} className="flex gap-4 rounded-2xl border border-slate-100 p-4">
                        {photo ? (
                          // eslint-disable-next-line @next/next/no-img-element -- uploaded to the CMS
                          <img src={photo} alt="" className="size-14 shrink-0 rounded-full object-cover" />
                        ) : (
                          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand/10 font-display font-bold text-brand">
                            {s.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                          </span>
                        )}
                        <span>
                          <span className="block font-display font-bold text-navy">{s.name}</span>
                          {(s.role || s.org) && (
                            <span className="block text-sm text-slate-500">{[s.role, s.org].filter(Boolean).join(", ")}</span>
                          )}
                          {s.bio && <span className="mt-2 block text-sm leading-relaxed text-slate-600">{s.bio}</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {event.images.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display text-2xl font-extrabold text-navy">From the day</h2>
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {event.images.map((img, i) => (
                    <li key={i}>
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element -- uploaded to the CMS */}
                        <img src={cmsAsset(img.media.url)} alt={img.media.alt || img.caption || ""} className="aspect-square w-full rounded-2xl object-cover" />
                        {img.caption && <figcaption className="mt-2 text-xs text-slate-500">{img.caption}</figcaption>}
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <NavLink href={resourceRoutes.events} className="mt-12 inline-flex items-center gap-2 font-bold text-brand hover:text-navy">
              ← All events
            </NavLink>
          </article>

          <aside>
            <div className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 lg:sticky lg:top-32">
              {event.hostName && (
                <p className="text-sm text-slate-600">
                  With <span className="font-semibold text-navy">{event.hostName}</span>
                </p>
              )}
              <dl className="space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <f.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{f.label}</dt>
                      <dd className="font-semibold text-navy">
                        {"href" in f && f.href ? (
                          <a href={f.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                            {f.value}
                          </a>
                        ) : (
                          f.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
              {event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 font-bold text-white transition hover:bg-brand-600"
                >
                  Register <ArrowUpRight className="size-4" />
                </a>
              ) : (
                <BookDemoButton className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-3 font-bold text-white transition hover:bg-brand-600">
                  Reserve a seat
                </BookDemoButton>
              )}
            </div>
          </aside>
        </div>
      </section>
      <CallbackStrip />
    </PageShell>
  );
}
