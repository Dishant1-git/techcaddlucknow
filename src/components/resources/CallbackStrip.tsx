// The "talk to a counsellor" strip closing most Resources pages, with the
// contact details from CMS Settings. Kept out of Kit.tsx because client
// components import Kit's helpers, and this one reads server-only settings.
import { getSite } from "@/lib/cms/site";
import { NavLink } from "../NavLink";
import { MessageCircle, Phone } from "lucide-react";
import { BookDemoButton } from "../Enquiry";
import { Eyebrow } from "../ui";

/** "Would you rather we called you?" strip with the centre's contact options. */
export async function CallbackStrip() {
  const site = await getSite(); // CMS Settings, over the built-in details
  return (
    <section className="bg-slate-50 px-5 py-16 lg:px-8">
      <div
        data-reveal
        className="mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-hero-950/5 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <Eyebrow>Prefer a call?</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy">
            Would you rather we called you?
          </h2>
          <p className="mt-2 max-w-xl text-slate-600">
            Leave a number and a counsellor calls back within one working day — or reach us now on{" "}
            <NavLink href={site.phoneHref} className="font-semibold text-brand hover:underline">
              {site.phone}
            </NavLink>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <BookDemoButton className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-bold text-white transition hover:bg-brand">
            <Phone className="size-4" /> Request a callback
          </BookDemoButton>
          <NavLink
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-navy transition hover:border-brand hover:text-brand"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </NavLink>
        </div>
      </div>
    </section>
  );
}

/**
 * The eyebrow, title and lead that <PageHero> renders by default, for heroes
 * that pass `children` (badges, actions) and so replace the default block.
 */
