import { NavLink } from "./NavLink";
import { useId, type ReactNode } from "react";
import { site } from "@/lib/site";

/**
 * The site logo. `src` is a logo uploaded in CMS Settings; it is drawn the same
 * way as the built-in one, as a mask, so it keeps taking the surrounding text
 * colour (white over the dark hero, navy on the white header bar and footer).
 */
export function Logo({ className = "", src, alt = site.name }: { className?: string; src?: string; alt?: string }) {
  return (
    <NavLink href="/#top" className={`inline-flex leading-none ${className}`}>
      <span
        role="img"
        aria-label={alt}
        style={src ? { mask: `url("${src}") left center / contain no-repeat`, WebkitMask: `url("${src}") left center / contain no-repeat` } : undefined}
        className={`block h-9 bg-current min-[360px]:h-11 ${src ? "aspect-[952/262]" : "aspect-[952/262] [mask:url(/images/tce.webp)_center/contain_no-repeat]"}`}
      />
    </NavLink>
  );
}

/** Links to the profiles an editor listed in CMS Settings. */
export function SocialLinks({ links, className = "" }: { links: { network: string; label: string; href: string }[]; className?: string }) {
  if (!links.length) return null;
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map((l) => (
        <li key={l.network}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${l.label}`}
            data-social={l.network}
            className="inline-flex items-center rounded-full border border-current/20 px-3 py-1 text-xs font-semibold opacity-90 transition hover:opacity-100"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${
        dark
          ? "border-white/15 bg-white/5 text-slate-200"
          : "border-brand/15 bg-brand/5 text-brand"
      }`}
    >
      <span className="relative grid size-1.5 place-items-center">
        <span className="absolute size-1.5 animate-pulse-ring rounded-full bg-cyan" />
        <span className="size-1.5 rounded-full bg-cyan" />
      </span>
      {children}
    </span>
  );
}

/** Section heading whose words rise in on scroll (see Motion.tsx). */
export function Heading({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      data-split
      className={`font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl ${
        dark ? "text-white" : "text-navy"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Heading dark={dark} className="mt-5">
        {title}
      </Heading>
      {text && (
        <p
          data-reveal
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

/** Dark navy section with the blueprint grid and drifting colour orbs. */
export function DarkSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    // overflow-clip rather than hidden so sticky children keep working
    <section
      id={id}
      className={`relative isolate overflow-clip bg-hero-950 text-white ${className}`}
    >
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-dark absolute inset-0 -z-10" />
      <div
        data-speed="0.6"
        className="orb absolute -right-40 top-1/3 -z-10 size-[34rem] [--orb:rgba(0,212,255,0.14)]"
      />
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">{children}</div>
    </section>
  );
}

export function LightSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative isolate overflow-clip bg-white ${className}`}>
      <div className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div className="glow-light absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">{children}</div>
    </section>
  );
}

/**
 * Card copy cut to about four lines, fading out, with a "Read more" toggle
 * (CSS only, so the full text stays in the page). `length` is the copy's
 * character count; short copy is shown whole.
 */
export function Clamp({
  children,
  length,
  dark = false,
}: {
  children: ReactNode;
  length: number;
  dark?: boolean;
}) {
  const id = useId();
  if (length < 220) return <>{children}</>;
  const toggle = `mt-2 cursor-pointer text-sm font-semibold peer-focus-visible:underline ${dark ? "text-cyan" : "text-brand"}`;
  return (
    <div data-clamp>
      <input id={id} type="checkbox" className="peer sr-only" />
      <div className="max-h-[6.25rem] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_60%,transparent)] peer-checked:max-h-none peer-checked:[mask-image:none]">
        {children}
      </div>
      <label htmlFor={id} className={`${toggle} inline-block peer-checked:hidden`}>
        Read more
      </label>
      <label htmlFor={id} className={`${toggle} hidden peer-checked:inline-block`}>
        Show less
      </label>
    </div>
  );
}

/** Characters of copy in a card, for <Clamp>. */
export const copyLength = (item: { text?: string; points?: string[]; after?: string }) =>
  (item.text?.length ?? 0) + (item.points?.join("").length ?? 0) + (item.after?.length ?? 0);

/**
 * Classes for a wrapping row of cards: three or four to a row on desktop,
 * whichever fills the last row better, with the last row centred.
 */
export function cardRow(count: number) {
  const fill = (cols: number) => (count % cols || cols) / cols;
  const four = fill(4) > fill(3);
  return {
    row: "flex flex-wrap justify-center gap-5",
    card: `w-full sm:w-[calc((100%-1.25rem)/2)] ${
      four ? "lg:w-[calc((100%-3.75rem)/4)]" : "lg:w-[calc((100%-2.5rem)/3)]"
    }`,
  };
}
