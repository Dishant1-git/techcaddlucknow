"use client";

// "Support & Assistance" on the contact page: one tab per desk, each with its
// contact details and quick actions. Desks are listed in src/lib/contact.ts.
import { Briefcase, Building2, Globe, Headphones, Mail, MessageCircle, Phone, Users, type LucideIcon } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { supportDesks } from "@/lib/contact";
import { site } from "@/lib/site";

const tabIcons: Record<(typeof supportDesks)[number]["icon"], LucideIcon> = {
  students: Users,
  partners: Building2,
  placement: Briefcase,
  franchise: Globe,
};

export function SupportDesks() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const desk = supportDesks[active];

  // Arrow keys move between tabs, as in any tab list.
  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + supportDesks.length) % supportDesks.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const whatsapp = `${site.whatsappHref}?text=${encodeURIComponent(`Hi ${site.name} ${site.city}, I have a query for the ${desk.tab}.`)}`;

  return (
    <section id="support" className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">We are here to help</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Support & Assistance
          </h2>
          <p className="mt-4 text-lg text-slate-600">Get personalised support for your educational journey.</p>
        </div>

        <div data-reveal className="mt-12 rounded-[2rem] border border-slate-100 bg-white p-3 shadow-2xl shadow-hero-950/5 sm:p-4">
          <div role="tablist" aria-label="Support desks" onKeyDown={onKeyDown} className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {supportDesks.map((d, i) => {
              const Icon = tabIcons[d.icon];
              const on = i === active;
              return (
                <button
                  key={d.tab}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`support-tab-${i}`}
                  aria-selected={on}
                  aria-controls="support-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-sm font-bold transition sm:text-base lg:justify-start lg:px-5 ${
                    on ? "bg-hero-950 text-white shadow-lg shadow-hero-950/25" : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                  }`}
                >
                  <Icon className="size-4 shrink-0 sm:size-5" />
                  {d.tab}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="support-panel"
            aria-labelledby={`support-tab-${active}`}
            className="mt-3 rounded-[1.5rem] bg-gradient-to-br from-sky/10 via-white to-white p-6 sm:p-9"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-hero-950 text-white">
                    <Headphones className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">{desk.tab}</p>
                    <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-navy">{desk.title}</h3>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-slate-600">{desk.text}</p>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2 lg:shrink-0">
                <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Phone</dt>
                  <dd className="mt-1.5 font-bold text-navy">
                    <a href={site.phoneHref} className="hover:text-brand">{site.phone}</a>
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Email</dt>
                  <dd className="mt-1.5 break-all font-bold text-navy">
                    <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200/70 pt-8">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-hero-950 px-6 py-3 font-bold text-white transition hover:bg-brand"
              >
                <Phone className="size-4" /> Call Now
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(desk.subject)}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-bold text-navy transition hover:border-brand hover:text-brand"
              >
                <Mail className="size-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
