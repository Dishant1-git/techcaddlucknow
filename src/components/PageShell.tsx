import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Footer, WhatsAppButton } from "./Footer";
import { Header, TopBar } from "./Header";
import { Motion } from "./Motion";
import { Cta } from "./Sections";
import { Eyebrow } from "./ui";

/** Chrome shared by every inner page: header, closing call to action and footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <TopBar />
      <Header />
      <main id="top">
        {children}
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}

/**
 * Dark banner at the top of an inner page. It sits under the transparent
 * header, so the top padding clears the contact bar and the navigation.
 */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  children,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  crumbs: { label: string; href?: string }[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative isolate overflow-clip bg-hero-950 text-white ${className}`}>
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div className="orb absolute -left-40 top-10 -z-10 size-[34rem] animate-aurora [--orb:rgba(28,83,209,0.5)]" />
      <div
        data-speed="0.6"
        className="orb absolute -right-40 top-1/3 -z-10 size-[34rem] [--orb:rgba(0,212,255,0.16)]"
      />

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-32 lg:px-8 lg:pb-36 lg:pt-48">
        <nav aria-label="Breadcrumb" className="rise">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-300">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight aria-hidden className="size-3.5 opacity-60" />
                {c.href ? (
                  <a href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </a>
                ) : (
                  <span aria-current="page" className="font-semibold text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {children ?? (
          <div className="mt-8 max-w-4xl">
            <div className="rise [--d:.1s]">
              <Eyebrow dark>{eyebrow}</Eyebrow>
            </div>
            <h1 className="rise mt-6 font-display text-[2rem] font-extrabold leading-[1.06] tracking-tight [--d:.2s] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {text && (
              <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.3s] sm:text-lg">
                {text}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
