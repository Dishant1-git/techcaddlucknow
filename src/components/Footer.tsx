import { NavLink } from "./NavLink";
import { MessageCircle } from "lucide-react";
import { courseTracks, programmes, site } from "@/lib/site";
import { Logo } from "./ui";

const columns = [
  {
    title: "Courses",
    links: courseTracks.map((t) => ({ label: t.title, href: "/courses" })),
  },
  {
    title: "Industrial Training",
    links: programmes.map((p) => ({ label: `${p.duration} Training`, href: "/#programmes" })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Our Founder", href: "/about/founder" },
      { label: `Why ${site.name}`, href: "/#why" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "AI courses", href: "/#ai" },
      { label: "Technologies", href: "/#tech" },
      { label: "Student reviews", href: "/#reviews" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-slate-200 bg-slate-50 text-slate-700">
      {/* The logo as a faint watermark behind the bottom of the footer. It is
          positioned absolutely, so it adds no height. The logo file also carries
          the tagline in its bottom fifth; that strip is clipped off and the mark
          shifted down so the word itself sits on the footer edge. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto aspect-[952/262] w-full max-w-[110rem] translate-y-[20%] select-none [clip-path:inset(0_0_20%_0)] bg-navy/[0.06] [mask:url(/images/tce.webp)_center_bottom/contain_no-repeat]"
      />
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-14 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="text-navy" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              An IT training centre in {site.city} — AI, software and
              career-ready skills, taught by people who still build.
            </p>
            <NavLink
              href={`mailto:${site.email}`}
              className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-brand"
            >
              {site.email}
            </NavLink>
            <NavLink href={site.phoneHref} className="mt-4 block text-sm hover:text-brand">
              {site.phone}
            </NavLink>
            <NavLink
              href={site.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block max-w-xs text-sm leading-relaxed hover:text-brand"
            >
              {site.address}
            </NavLink>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display font-bold text-navy">{col.title}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <NavLink href={l.href} className="hover:text-brand">
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-slate-200 pt-6 text-sm">
          © {site.copyrightYear} {site.name} Computer Education. Built in{" "}
          <span className="font-semibold text-brand">{site.city}</span>.
        </p>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <NavLink
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 ring-8 ring-emerald-500/15 transition hover:scale-105"
    >
      <MessageCircle className="size-6 fill-current" />
    </NavLink>
  );
}
