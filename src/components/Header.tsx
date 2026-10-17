"use client";

import { NavLink } from "./NavLink";
import { useEffect, useState } from "react";
import { ChevronDown, Clock, Mail, MapPin, Menu, Phone, Sparkles, X } from "lucide-react";
import { internshipHref, nav, site } from "@/lib/site";
import { AboutMega } from "./AboutMega";
import { AiMega } from "./AiMega";
import { CertificationMega } from "./CertificationMega";
import { After12thMega, CoursesMega, ResourcesMega } from "./CoursesMega";
import { BookDemoButton } from "./Enquiry";
import { Logo } from "./ui";

export function TopBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-40 hidden h-9 text-[13px] text-white/85 lg:block">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <NavLink
            href={site.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            title={site.address}
            className="flex items-center gap-2 hover:text-white"
          >
            <MapPin className="size-3.5" /> {site.shortAddress}
          </NavLink>
          <span className="flex items-center gap-2">
            <Clock className="size-3.5" /> {site.hours}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <NavLink href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
            <Phone className="size-3.5" /> {site.phone}
          </NavLink>
          <NavLink href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
            <Mail className="size-3.5" /> {site.email}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Section of the mobile menu that is expanded, by label.
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  // The internship badge docks under the header while the page scrolls down
  // and returns to the side of the screen when it scrolls back up.
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Ignore sub-pixel jitter so the badge does not flicker between states.
      if (Math.abs(y - lastY) < 6) return;
      setDocked(y > lastY && y > 120);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "top-3" : "top-0 lg:top-9"
      }`}
    >
      <NavLink
        href={internshipHref()}
        aria-label="Explore internship and training programmes"
        // Keyed on the state so the entrance animation replays at each position.
        key={docked ? "docked" : "side"}
        className={`internship-side-badge ${docked ? "is-docked" : ""} ${
          menuOpen ? "is-hidden" : ""
        }`}
      >
        <Sparkles aria-hidden="true" className="size-4" />
        <span className="internship-side-badge-label">INTERNSHIP</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-extrabold tracking-[0.16em]">
          JOIN
        </span>
      </NavLink>
      <div className="mx-auto max-w-7xl px-2 lg:px-4">
        <div
          className={`relative flex items-center justify-between gap-2 px-3 py-2.5 transition-all duration-300 lg:px-4 xl:gap-4 ${
            solid
              ? "rounded-[2rem] bg-white/90 text-navy shadow-xl shadow-hero-950/10 backdrop-blur-xl"
              : "text-white"
          }`}
        >
          <Logo className="shrink-0" />

          <nav className="hidden min-w-0 items-center gap-0 xl:flex">
            {nav.map((item) =>
              item.highlight ? (
                <div key={item.label} className="group">
                  <NavLink
                    href={item.href}
                    className="ai-nav-glow relative mx-1 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[15px] font-semibold text-white 2xl:px-4"
                  >
                    {item.label}
                    <Sparkles className="size-3.5" />
                    <span aria-hidden="true" className="ai-nav-star ai-nav-star-one">✦</span>
                    <span aria-hidden="true" className="ai-nav-star ai-nav-star-two">✧</span>
                    <span aria-hidden="true" className="ai-nav-star ai-nav-star-three">·</span>
                  </NavLink>
                  <AiMega />
                </div>
              ) : (
                <div key={item.label} className={`group ${item.mega ? "" : "relative"}`}>
                  <NavLink
                    href={item.href}
                    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full opacity-90 transition hover:opacity-100 ${
                      item.label === "Internship & Training"
                        ? "training-nav-glow relative px-3 py-2.5 text-[15px] font-bold 2xl:px-3.5"
                        : "px-1.5 py-2 text-[13px] font-medium 2xl:px-2 2xl:text-sm"
                    }`}
                  >
                    {item.label === "Internship & Training" && (
                      <>
                        <Sparkles aria-hidden="true" className="size-4" />
                        <span aria-hidden="true" className="ai-nav-star ai-nav-star-one training-nav-star">✦</span>
                        <span aria-hidden="true" className="ai-nav-star ai-nav-star-two training-nav-star">✧</span>
                        <span aria-hidden="true" className="ai-nav-star ai-nav-star-three training-nav-star">·</span>
                      </>
                    )}
                    {item.label === "Internship & Training" ? (
                      // Short label where the bar is tightest, so every item fits.
                      <>
                        <span className="2xl:hidden">Internship</span>
                        <span className="hidden 2xl:inline">{item.label}</span>
                      </>
                    ) : (
                      item.label
                    )}
                    {item.children && (
                      <ChevronDown className="size-3.5 transition group-hover:rotate-180" />
                    )}
                  </NavLink>
                  {item.mega === "about" && <AboutMega />}
                  {item.mega === "courses" && <CoursesMega />}
                  {item.mega === "after12th" && <After12thMega />}
                  {item.mega === "resources" && <ResourcesMega />}
                  {item.mega === "certification" && <CertificationMega />}
                  {item.children && !item.mega && (
                    <div className="invisible absolute left-0 top-full z-[10000] w-72 translate-y-2 pt-3 opacity-0 transition duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl shadow-hero-950/25">
                        {item.children.map((c) => (
                          <NavLink
                            key={c.label}
                            href={c.href}
                            {...(c.href.startsWith("http") && {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            })}
                            className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-navy transition-colors hover:bg-brand/5 hover:text-brand"
                          >
                            {c.label}
                            {c.note && (
                              <span className="mt-0.5 block text-xs font-normal text-slate-500">
                                {c.note}
                              </span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <BookDemoButton className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-600 sm:px-5 sm:py-3 sm:text-[15px]">
              Book Now
            </BookDemoButton>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full border border-current/20 xl:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            data-lenis-prevent
            className="mt-2 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-3xl bg-white p-3 text-navy shadow-2xl xl:hidden"
          >
            {nav.map((item) => {
              const rowClass = `relative flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left font-semibold hover:bg-brand/5 ${
                item.highlight ? "ai-mobile-nav" : ""
              } ${item.label === "Internship & Training" ? "training-nav-glow-mobile" : ""}`;
              const open = openGroup === item.label;

              if (!item.children) {
                return (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={rowClass}
                  >
                    {item.label}
                    {item.highlight && (
                      <>
                        <span aria-hidden="true" className="ai-nav-star ai-nav-star-one">✦</span>
                        <span aria-hidden="true" className="ai-nav-star ai-nav-star-two">✧</span>
                      </>
                    )}
                  </NavLink>
                );
              }

              return (
                <div key={item.label}>
                  {/* Sections open in place, one at a time, so the list stays short. */}
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenGroup(open ? null : item.label)}
                    className={rowClass}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="mb-2 ml-4 mt-1 border-l border-slate-200 pl-2">
                      {!item.children.some((c) => c.href === item.href) && (
                        <NavLink
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-brand"
                        >
                          All {item.label}
                        </NavLink>
                      )}
                      {item.children.map((c) => (
                        <NavLink
                          key={c.label}
                          href={c.href}
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:text-brand"
                        >
                          {c.label}
                          {c.note && (
                            <span className="block text-xs text-slate-400">{c.note}</span>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <NavLink
              href={site.phoneHref}
              className="mt-2 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold"
            >
              <Phone className="size-4 text-brand" /> {site.phone}
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
