// Homepage sections fed by the CMS: featured courses and course categories.
// Server Components only: the category icons are looked up by name from the
// full lucide set, which must not reach the browser bundle.
import type { CSSProperties } from "react";
import { ArrowUpRight, GraduationCap, icons } from "lucide-react";
import { NavLink } from "../NavLink";
import { Eyebrow, Heading, LightSection, SectionHeading } from "../ui";
import { MediaImage } from "./Blocks";
import { categoryHref, type CourseCard } from "@/lib/cms/courses";
import type { CmsCategory } from "@/lib/cms/types";

/** A course as a card: its image, title and short description. */
export function CourseCardItem({ course: c }: { course: CourseCard }) {
  return (
    <NavLink
      href={c.href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-hero-900 to-brand">
        {c.image ? (
          <MediaImage media={c.image} className="h-full rounded-none shadow-none transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <span className="grid h-full place-items-center text-white/80">
            <GraduationCap className="size-12" />
          </span>
        )}
        {c.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-sun px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-hero-950">
            {c.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {(c.category || c.duration) && (
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
            {[c.category, c.duration].filter(Boolean).join(" · ")}
          </p>
        )}
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy">{c.title}</h3>
        {c.text && <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-slate-600">{c.text}</p>}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
          View course
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </NavLink>
  );
}

/** Courses marked "featured" in the CMS. */
export function FeaturedCourses({ courses }: { courses: CourseCard[] }) {
  if (!courses.length) return null;
  return (
    <LightSection id="featured-courses">
      <SectionHeading
        eyebrow="Featured courses"
        title={
          <>
            Courses we&apos;re <span className="text-gradient">featuring now</span>
          </>
        }
      />
      <ul data-stagger className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <li key={c.href}>
            <CourseCardItem course={c} />
          </li>
        ))}
      </ul>
    </LightSection>
  );
}

/** The CMS's course categories as cards, each opening its category page. */
export function CategoryCards({ categories }: { categories: CmsCategory[] }) {
  const roots = categories.filter((c) => !c.parentId);
  if (!roots.length) return null;
  return (
    <section id="categories" className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Course categories</Eyebrow>
          <Heading className="mt-5">
            Find your <span className="text-gradient">track</span>
          </Heading>
        </div>
        <ul data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roots.map((c) => {
            const Icon = (c.icon && icons[c.icon as keyof typeof icons]) || GraduationCap;
            const accent = c.accentColor || "var(--color-brand)";
            return (
              <li key={c.id}>
                <NavLink
                  href={categoryHref(c.slug)}
                  style={{ "--accent": accent } as CSSProperties}
                  data-category={c.slug}
                  className="group flex h-full flex-col rounded-3xl border border-slate-100 border-t-4 border-t-[var(--accent)] bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy">{c.name}</h3>
                  {c.description && <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{c.description}</p>}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
                    Explore courses <ArrowUpRight className="size-4" />
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
