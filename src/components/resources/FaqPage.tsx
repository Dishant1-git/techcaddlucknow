// Sections of the frequently asked questions page.
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { faqCategories, faqItems } from "@/lib/resources/faq";
import { site } from "@/lib/site";
import { NavLink } from "../NavLink";
import { LightSection, SectionHeading } from "../ui";
import { FaqExplorer } from "./FaqExplorer";

export function FaqLibrary() {
  // Only the fields the list needs are handed to the client component.
  const items = faqItems.map(({ q, a, category }) => ({ q, a, category }));
  return (
    <LightSection id="questions">
      <SectionHeading
        eyebrow={`${items.length} answered questions`}
        title={
          <>
            Search every question, <span className="text-gradient">by course or topic</span>
          </>
        }
        text={`Admissions, sessions, fees, placement and certification at ${site.name} ${site.city} — type a word or pick a category to narrow the list.`}
      />
      <div className="mt-12">
        <FaqExplorer items={items} categories={faqCategories.map((c) => c.label)} />
      </div>
    </LightSection>
  );
}

/** "Still not sure?" block with the ways to reach a counsellor. */
export function FaqCounsellor() {
  return (
    <section className="relative isolate overflow-clip bg-hero-950 px-5 py-20 text-white lg:px-8 lg:py-28">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">Still not sure?</p>
          <h2 data-split className="mt-4 font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-tight sm:text-4xl">
            Ask a counsellor — it is usually <span className="text-gradient">faster than reading on.</span>
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            Compare tracks, timings and fees on a quick call with a counsellor — usually faster than
            reading the rest of this list.
          </p>
          <NavLink
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-7 py-3.5 font-bold text-hero-950 shadow-[0_0_40px_-10px] shadow-cyan transition hover:brightness-110"
          >
            Talk to a counsellor
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </div>
        <ul data-reveal="right" data-spot className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-8">
          <li>
            <NavLink href={site.phoneHref} className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
                <Phone className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Call</span>
                <span className="font-semibold">{site.phone}</span>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
                <MessageCircle className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">WhatsApp</span>
                <span className="font-semibold">Message a counsellor</span>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
                <Mail className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Email</span>
                <span className="break-all font-semibold">{site.email}</span>
              </span>
            </NavLink>
          </li>
          <li className="px-2 pt-2 text-sm text-slate-400">{site.hours}</li>
        </ul>
      </div>
    </section>
  );
}
