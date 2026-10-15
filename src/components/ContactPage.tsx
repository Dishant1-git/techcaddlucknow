import { NavLink } from "./NavLink";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Clock,
  Compass,
  GraduationCap,
  Handshake,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Plus,
  Route,
  School,
  ShieldCheck,
} from "lucide-react";
import { contactFaqs, contactSteps, enquiryTopics, mapQuery } from "@/lib/contact";
import { branches, site, stats } from "@/lib/site";
import { BookDemoButton } from "./Enquiry";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "./ui";

const topicIcons = {
  graduation: GraduationCap,
  school: School,
  briefcase: Briefcase,
  building: Building2,
  handshake: Handshake,
  badge: BadgeCheck,
};

const pad = (n: number) => String(n).padStart(2, "0");
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);
const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

const reasons = [
  {
    icon: Compass,
    title: "Advice matched to you",
    text: "We start from your background, your goal and the time you have, not from whichever course is filling up.",
  },
  {
    icon: ShieldCheck,
    title: "No pressure to enrol",
    text: "Counselling and the demo class are free. Take the advice home, compare, and decide when you are ready.",
  },
  {
    icon: Route,
    title: "A clear plan to leave with",
    text: "You walk away knowing the track, the duration, the projects you will build and what comes after.",
  },
];

/** Why a counselling conversation is the best first step, with the centre's numbers. */
export function ContactIntro() {
  return (
    <LightSection>
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow>Start with a conversation</Eyebrow>
          <Heading className="mt-5">
            Not sure which course?
            <br />
            <span className="text-gradient">We will help you choose.</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            Most people who get in touch are choosing between two or three paths. A
            short talk with a counsellor who knows every course usually settles it.
          </p>
          <ul data-stagger className="mt-10 space-y-6">
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/8 text-brand">
                  <r.icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">{r.title}</h3>
                  <p className="mt-1 leading-relaxed text-slate-600">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <BookDemoButton className="group mt-10 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand">
            Book free counselling
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </BookDemoButton>
        </div>

        <div data-reveal="scale" className="relative sm:pb-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-hero-950/15">
            <Image
              src="/images/gallery/data-session.webp"
              alt={`A ${site.name} trainer walking a small group through data on a wall screen`}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 shadow-2xl shadow-hero-950/30 sm:absolute sm:inset-x-8 sm:bottom-0 sm:mt-0 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-hero-950 px-4 py-4 text-center text-white">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-extrabold">
                  {s.value.toLocaleString("en-IN")}
                  <span className="text-cyan">{s.suffix}</span>
                </dd>
                <dd aria-hidden className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </LightSection>
  );
}

/** Routes each kind of enquiry to the right place. */
export function EnquiryTopics() {
  return (
    <section className="overflow-clip bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="How can we help?"
          title={
            <>
              Tell us what you are <span className="text-gradient">looking for</span>
            </>
          }
          text="Students, parents, colleges and companies all get in touch for different reasons. Here is where each conversation usually starts."
        />
        <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enquiryTopics.map((t) => {
            const Icon = topicIcons[t.icon];
            const external = t.action.href.startsWith("http");
            return (
              <article
                key={t.title}
                className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand transition duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold text-navy">{t.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{t.text}</p>
                <NavLink
                  href={t.action.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand"
                >
                  {t.action.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </NavLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** What happens between sending an enquiry and starting a batch. */
export function ContactSteps() {
  return (
    <DarkSection>
      <SectionHeading
        dark
        eyebrow="After you reach out"
        title={
          <>
            From first call to <span className="text-gradient">first class</span>
          </>
        }
        text="No pressure and no paperwork up front. Here is exactly what happens once you get in touch."
      />
      <div className="relative mt-16">
        <div
          data-draw-x
          aria-hidden
          className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-cyan via-sky to-brand lg:block"
        />
        <ol data-stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {contactSteps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-brand font-display text-lg font-extrabold text-white shadow-lg shadow-cyan/20">
                {pad(i + 1)}
              </span>
              <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-300">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </DarkSection>
  );
}

/** Address, opening hours and a map of the Lucknow centre. */
export function VisitCampus() {
  return (
    <LightSection id="visit" className="scroll-mt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>Visit the campus</Eyebrow>
          <Heading className="mt-5">
            Come and see
            <br />
            <span className="text-gradient">where you will learn</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            Walk through the labs, meet the trainers and sit in on a class. Most
            students decide after one visit.
          </p>
          <dl data-stagger className="mt-10 space-y-5">
            {[
              { icon: MapPin, term: "Address", detail: site.address },
              { icon: Clock, term: "Opening hours", detail: site.hours },
              { icon: Phone, term: "Before you come", detail: `Call ${site.phone} and we will keep a counsellor free for you.` },
            ].map((d) => (
              <div key={d.term} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-navy text-white">
                  <d.icon className="size-5" />
                </span>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{d.term}</dt>
                  <dd className="mt-1 font-semibold text-navy">{d.detail}</dd>
                </div>
              </div>
            ))}
          </dl>
          <NavLink
            href={mapsSearch}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand"
          >
            <Navigation className="size-4" /> Get directions
          </NavLink>
        </div>

        <div
          data-reveal="scale"
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-2xl shadow-hero-950/10"
        >
          <iframe
            title={`Map to ${site.name} ${site.city}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 lg:aspect-[5/4]"
          />
        </div>
      </div>
    </LightSection>
  );
}

/** The other centres, for visitors closer to one of them. */
export function Branches() {
  return (
    <section id="branches" className="scroll-mt-24 overflow-clip bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Our branches"
          title={
            <>
              One method, <span className="text-gradient">{branches.length} centres</span>
            </>
          }
          text={`Closer to another city? Every ${site.name} centre follows the same curriculum, project work and certification.`}
        />
        <ul data-stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((b, i) => {
            const here = i === 0;
            const link = isExternal(b.href);
            const body = (
              <>
                <span className="flex items-center justify-between">
                  <MapPin className={`size-5 ${here ? "text-cyan" : "text-brand"}`} />
                  {here ? (
                    <span className="rounded-full bg-cyan px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-hero-950">
                      You are here
                    </span>
                  ) : (
                    link && <ArrowUpRight className="size-4 text-slate-300 transition group-hover:text-brand" />
                  )}
                </span>
                <span className={`mt-5 block font-display text-xl font-bold ${here ? "text-white" : "text-navy"}`}>
                  {b.label}
                </span>
                <span className={`mt-1 block text-sm ${here ? "text-slate-300" : "text-slate-500"}`}>
                  {b.note ?? `${site.name} ${b.label}`}
                </span>
              </>
            );
            const card = `group block h-full rounded-3xl border p-6 transition duration-500 ${
              here
                ? "border-transparent bg-hero-950 shadow-2xl shadow-hero-950/20"
                : "border-slate-100 bg-white shadow-xl shadow-hero-950/5"
            } ${link ? "hover:-translate-y-1 hover:border-brand/30 hover:shadow-2xl" : ""}`;
            return (
              <li key={b.label}>
                {link ? (
                  <NavLink href={b.href} target="_blank" rel="noopener noreferrer" className={card}>
                    {body}
                  </NavLink>
                ) : (
                  <div className={card}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Questions people ask before they call. */
export function ContactFaq() {
  return (
    <LightSection>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Before you call</Eyebrow>
          <Heading className="mt-5">
            Quick answers to
            <br />
            <span className="text-gradient">common questions</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg text-slate-600">
            Anything else, just ask. There is no such thing as a silly question when
            you are choosing a career.
          </p>
          <NavLink
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-6 py-3.5 font-bold text-white transition hover:brightness-105"
          >
            <MessageCircle className="size-5 fill-current" /> Ask on WhatsApp
          </NavLink>
        </div>

        <div data-stagger className="space-y-3">
          {contactFaqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-2xl border border-slate-200 bg-white transition-colors open:border-brand/30"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 font-display text-[17px] font-bold text-navy [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{f.q}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </LightSection>
  );
}
