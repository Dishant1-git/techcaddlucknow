// The "Categories" list that links the Resources pages to one another: a card
// in the blog's sidebar, and a strip under the hero of every other section.
import Image from "next/image";
import { NavLink } from "../NavLink";
import { galleryPhoto } from "@/lib/gallery";
import type { Post } from "@/lib/resources/blog";
import { resourceRoutes } from "@/lib/resources/routes";

export const resourceCategories = [
  { key: "blog", label: "Blogs", href: resourceRoutes.blog },
  { key: "events", label: "Events", href: resourceRoutes.events },
  { key: "pages", label: "Pages", href: resourceRoutes.pages },
  { key: "gallery", label: "Gallery", href: resourceRoutes.gallery },
  { key: "faq", label: "FAQ", href: resourceRoutes.faq },
  { key: "reviews", label: "Reviews", href: resourceRoutes.reviews },
  { key: "partnerships", label: "College Partnerships", href: resourceRoutes.partnerships },
] as const;

export type ResourceKey = (typeof resourceCategories)[number]["key"];

/** Sidebar card, as on the blog. */
export function CategoriesCard({ current }: { current?: ResourceKey }) {
  return (
    <nav aria-label="Categories" className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Categories</p>
      <ul className="mt-4 space-y-0.5">
        {resourceCategories.map((c) => (
          <li key={c.key}>
            <NavLink
              href={c.href}
              aria-current={c.key === current ? "page" : undefined}
              className={`block rounded-xl px-3 py-2 text-[15px] transition-colors ${
                c.key === current ? "bg-brand/10 font-semibold text-brand" : "text-slate-700 hover:bg-slate-50 hover:text-brand"
              }`}
            >
              {c.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Sidebar card listing a few articles with their cover. */
export function FeaturedCard({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Featured</p>
      <ul className="mt-4 space-y-4">
        {posts.map((p) => {
          const photo = galleryPhoto(p.cover);
          return (
            <li key={p.slug}>
              <NavLink href={p.href} className="group flex gap-3">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={p.coverUrl ?? photo.src}
                    alt={p.coverUrl ? (p.coverAlt ?? "") : photo.alt}
                    fill
                    sizes="4rem"
                    unoptimized={!!p.coverUrl}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 font-display text-sm font-bold leading-snug text-navy group-hover:text-brand">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">{p.date}</span>
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Horizontal strip under a Resources page's hero. */
export function CategoriesBar({ current }: { current: ResourceKey }) {
  return (
    <nav aria-label="Resource categories" className="border-b border-slate-100 bg-white px-5 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto py-4 [scrollbar-width:none]">
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Categories</span>
        <ul className="flex gap-2">
          {resourceCategories.map((c) => (
            <li key={c.key} className="shrink-0">
              <NavLink
                href={c.href}
                aria-current={c.key === current ? "page" : undefined}
                className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  c.key === current ? "bg-brand text-white" : "bg-slate-100 text-slate-700 hover:bg-brand/10 hover:text-brand"
                }`}
              >
                {c.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
