// A CMS page rendered in its template: "default" (a reading column under the
// Resources categories), "landing" (a bold hero with calls to action),
// "contact" (the content beside the centre's contact details and map) and
// "full-width". Shared by /[slug] and the CMS's live preview (/preview/page).
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { PageHero, PageShell } from "@/components/PageShell";
import { BookDemoButton } from "@/components/Enquiry";
import { ContentBlock } from "@/components/cms/Blocks";
import { CallbackStrip } from "@/components/resources/CallbackStrip";
import { CategoriesBar } from "@/components/resources/ResourceCategories";
import { cleanHtml, stripTags } from "@/lib/cms/html";
import { getSite } from "@/lib/cms/site";
import type { CmsPage } from "@/lib/cms/types";
import { resourceRoutes } from "@/lib/resources/routes";

/** The page's own body ("Body" in the CMS), then its blocks. */
function Content({ page }: { page: CmsPage }) {
  const body = cleanHtml(page.content);
  const sections = page.sections.filter((s) => s.visible !== false);
  return (
    <div className="space-y-14">
      {stripTags(body) && <div data-page-body className="cms-prose" dangerouslySetInnerHTML={{ __html: body }} />}
      {sections.map((s, i) => (
        <ContentBlock key={i} block={s} />
      ))}
    </div>
  );
}

async function ContactPanel() {
  const site = await getSite();
  const rows = [
    { icon: Phone, label: "Call", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Visit", value: site.address, href: site.mapsHref },
    { icon: Clock, label: "Hours", value: site.hours },
  ];
  return (
    <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
      <div className="rounded-3xl bg-hero-950 p-7 text-white">
        <p className="font-display text-xl font-bold">Get in touch</p>
        <ul className="mt-5 space-y-4">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex gap-3">
              <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-cyan" />
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{label}</span>
                {href ? (
                  <a href={href} className="font-semibold hover:text-cyan" {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
                    {value}
                  </a>
                ) : (
                  <span className="font-semibold">{value}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <BookDemoButton className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan to-sky px-5 py-3 text-sm font-bold text-hero-950">
          Request a callback
        </BookDemoButton>
      </div>
      <iframe
        title={`Map to ${site.name} ${site.city}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.name} ${site.address}`)}&z=15&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block aspect-[4/3] w-full rounded-3xl border-0"
      />
    </aside>
  );
}

/** A CMS page in its template; also what the CMS's live preview renders. */
export async function PageView({ page }: { page: CmsPage }) {
  const site = await getSite();
  const template = page.template || "default";
  const crumbs = [{ label: "Pages", href: resourceRoutes.pages }, { label: page.title }];

  if (template === "landing") {
    return (
      <PageShell>
        <section data-template="landing" className="relative isolate overflow-clip bg-hero-950 text-white">
          <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
          <div className="glow-dark absolute inset-0 -z-10" />
          <div className="mx-auto max-w-5xl px-5 pb-24 pt-36 text-center lg:pb-32 lg:pt-48">
            <p className="rise text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
              {site.name} {site.city}
            </p>
            <h1 className="rise mt-5 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight [--d:.1s] sm:text-6xl">
              {page.title}
            </h1>
            {page.seo?.metaDescription && (
              <p className="rise mx-auto mt-6 max-w-2xl text-lg text-slate-300 [--d:.2s]">{page.seo.metaDescription}</p>
            )}
            <div className="rise mt-9 flex flex-wrap justify-center gap-3 [--d:.3s]">
              <BookDemoButton className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-navy">
                Book a free demo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </BookDemoButton>
              <NavLink href={site.phoneHref} className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold hover:border-white/50">
                Call {site.phone}
              </NavLink>
            </div>
          </div>
        </section>
        <section className="bg-white px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <Content page={page} />
          </div>
        </section>
        <CallbackStrip />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero eyebrow={`${site.name} ${site.city}`} title={page.title} text={page.seo?.metaDescription} crumbs={crumbs} />
      {template === "default" && <CategoriesBar current="pages" />}
      <section data-template={template} className="bg-white px-5 py-16 lg:px-8 lg:py-24">
        {template === "contact" ? (
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <Content page={page} />
            <ContactPanel />
          </div>
        ) : (
          <div className={`mx-auto ${template === "full-width" ? "max-w-7xl" : "max-w-4xl"}`}>
            <Content page={page} />
          </div>
        )}
      </section>
      {template !== "contact" && <CallbackStrip />}
    </PageShell>
  );
}
