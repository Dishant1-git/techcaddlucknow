"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Clock, Mail, MapPin, Menu, Phone, Sparkles, X } from "lucide-react";
import { nav, site } from "@/lib/site";
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
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5" /> {site.address}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-3.5" /> {site.hours}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
            <Phone className="size-3.5" /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
            <Mail className="size-3.5" /> {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      <a
        href="#programmes"
        aria-label="Explore internship and training programmes"
        className="internship-side-badge fixed left-2 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2 rounded-2xl px-2.5 py-4 text-white shadow-xl sm:left-4"
      >
        <Sparkles aria-hidden="true" className="size-4" />
        <span className="internship-side-badge-label">INTERNSHIP</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-extrabold tracking-[0.16em]">
          JOIN
        </span>
      </a>
      <div className="mx-auto max-w-7xl px-2 lg:px-4">
        <div
          className={`relative flex items-center justify-between gap-2 px-3 py-2.5 transition-all duration-300 lg:px-4 ${
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
                  <a
                    href={item.href}
                    className="ai-nav-glow relative mx-1 inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-1.5 text-[15px] font-semibold text-white"
                  >
                    {item.label}
                    <Sparkles className="size-3.5" />
                    <span aria-hidden="true" className="ai-nav-star ai-nav-star-one">✦</span>
                    <span aria-hidden="true" className="ai-nav-star ai-nav-star-two">✧</span>
                    <span aria-hidden="true" className="ai-nav-star ai-nav-star-three">·</span>
                  </a>
                  <AiMega />
                </div>
              ) : (
                <div key={item.label} className={`group ${item.mega ? "" : "relative"}`}>
                  <a
                    href={item.href}
                    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-medium 2xl:text-sm opacity-90 transition hover:opacity-100 ${
                      item.label === "Internship & Training"
                        ? "training-nav-glow relative px-3.5 py-2.5 text-[15px] font-bold"
                        : ""
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
                    {item.label}
                    {item.children && (
                      <ChevronDown className="size-3.5 transition group-hover:rotate-180" />
                    )}
                  </a>
                  {item.mega === "about" && <AboutMega />}
                  {item.mega === "courses" && <CoursesMega />}
                  {item.mega === "after12th" && <After12thMega />}
                  {item.mega === "resources" && <ResourcesMega />}
                  {item.mega === "certification" && <CertificationMega />}
                  {item.children && !item.mega && (
                    <div className="invisible absolute left-0 top-full z-[10000] w-72 translate-y-2 pt-3 opacity-0 transition duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl shadow-hero-950/25">
                        {item.children.map((c) => (
                          <a
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
                          </a>
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
          <nav data-lenis-prevent className="mt-2 max-h-[70vh] overflow-y-auto rounded-3xl bg-white p-3 text-navy shadow-2xl xl:hidden">
            {nav.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`relative block rounded-xl px-4 py-3 font-semibold hover:bg-brand/5 ${
                    item.highlight ? "ai-mobile-nav" : ""
                  } ${
                    item.label === "Internship & Training" ? "training-nav-glow-mobile" : ""
                  }`}
                >
                  {item.label}
                  {item.highlight && (
                    <>
                      <span aria-hidden="true" className="ai-nav-star ai-nav-star-one">✦</span>
                      <span aria-hidden="true" className="ai-nav-star ai-nav-star-two">✧</span>
                    </>
                  )}
                  {item.label === "Internship & Training" && (
                    <>
                      <span aria-hidden="true" className="ai-nav-star ai-nav-star-one training-nav-star">✦</span>
                      <span aria-hidden="true" className="ai-nav-star ai-nav-star-two training-nav-star">✧</span>
                    </>
                  )}
                </a>
                {item.children && (
                  <div className="mb-1 ml-4 border-l border-slate-200 pl-2">
                    {item.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:text-brand"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={site.phoneHref}
              className="mt-2 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold"
            >
              <Phone className="size-4 text-brand" /> {site.phone}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
