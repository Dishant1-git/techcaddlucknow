"use client";
import { useSite } from "./SiteContext";

import { NavLink } from "./NavLink";
import { useState } from "react";
import { Mail, MessageCircle, Phone, Plus } from "lucide-react";
import { faqs as bundledFaqs } from "@/lib/site";
import { DarkSection, Eyebrow, Heading } from "./ui";

/** Homepage FAQ; the page passes the CMS's featured questions first (lib/cms/content.ts). */
export function Faq({ items: faqs = bundledFaqs }: { items?: { q: string; a: string }[] }) {
  const site = useSite(); // CMS Settings, over the built-in details
  const [open, setOpen] = useState<number | null>(0);

  return (
    <DarkSection id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow dark>FAQs</Eyebrow>
          <Heading dark className="mt-5">
            Questions we
            <br />
            <span className="text-gradient">get every week</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg text-slate-300">
            Still unsure? A ten-minute call with a counsellor usually settles it
            faster than any brochure.
          </p>
          <div data-reveal data-spot className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-6">
            <p className="font-display font-bold">Ask us directly</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <NavLink href={site.phoneHref} className="flex items-center gap-3 hover:text-white">
                  <Phone className="size-4 text-cyan" /> {site.phone}
                </NavLink>
              </li>
              <li>
                <NavLink
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white"
                >
                  <MessageCircle className="size-4 text-cyan" /> WhatsApp us
                </NavLink>
              </li>
              <li>
                <NavLink href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                  <Mail className="size-4 text-cyan" /> {site.email}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div data-stagger className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-cyan/40 bg-white/[0.08]" : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-[17px] font-bold"
                >
                  {f.q}
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full bg-white/10 transition ${
                      isOpen ? "rotate-45 bg-cyan text-hero-950" : ""
                    }`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="overflow-hidden px-6 text-[15px] leading-relaxed text-slate-300">
                    <span className="block pb-6">{f.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DarkSection>
  );
}
