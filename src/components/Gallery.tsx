"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, ExternalLink, X } from "lucide-react";
import { gallery as bundledGallery, galleryTags as bundledTags, type Photo } from "@/lib/gallery";

/** Full-screen viewer with previous / next, arrow keys and Escape. */
function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const p = photos[index];
  const step = useCallback(
    (d: number) => onChange((index + d + photos.length) % photos.length),
    [index, onChange, photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    // Keep the page behind still while the viewer is open.
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = before;
    };
  }, [onClose, step]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.caption}
      data-lenis-prevent
      onClick={onClose}
      className="fixed inset-0 z-[20000] flex flex-col bg-hero-950/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 text-white">
        <p className="text-sm tabular-nums text-slate-300">
          {index + 1} / {photos.length}
        </p>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 sm:px-20">
        <Image
          key={p.src}
          src={p.src}
          alt={p.alt}
          fill
          sizes="100vw"
          unoptimized={p.remote}
          className="rise object-contain [--d:0s]"
          onClick={(e) => e.stopPropagation()}
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      <p className="px-5 py-5 text-center text-white">
        <span className="font-display text-lg font-bold">{p.caption}</span>
        <span className="ml-3 rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-cyan">
          {p.tag}
        </span>
      </p>
    </div>
  );
}

/**
 * Masonry grid of every photo, filterable by tag, opening into a lightbox. The
 * gallery page passes CMS albums as well (lib/cms/content.ts); without props it
 * shows the bundled photos.
 */
export function Gallery({
  photos: gallery = bundledGallery,
  tags: galleryTags = bundledTags,
}: { photos?: Photo[]; tags?: readonly string[] } = {}) {
  const [tag, setTag] = useState<string>("All");
  const [limit, setLimit] = useState(15);
  const [open, setOpen] = useState<number | null>(null);
  const photos = tag === "All" ? gallery : gallery.filter((p) => p.tag === tag);
  const shown = photos.slice(0, limit);
  const close = useCallback(() => setOpen(null), []);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter photos"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {galleryTags.map((t) => {
          const count = t === "All" ? gallery.length : gallery.filter((p) => p.tag === t).length;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={tag === t}
              onClick={() => {
                setTag(t);
                setLimit(15);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                tag === t
                  ? "border-navy bg-navy text-white shadow-lg shadow-navy/25"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand/30 hover:text-brand"
              }`}
            >
              {t}
              <span className={`text-xs ${tag === t ? "text-cyan" : "text-slate-400"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Even tiles, cropped to 4:3 so tall shots do not dominate; the lightbox shows each
          photo whole. Keyed by tag so the tiles replay their entrance on a filter change. */}
      <ul key={tag} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map((p, i) => {
          // A photo an editor linked opens its link; the rest open the lightbox.
          const Tile = p.link ? "a" : "button";
          const action = p.link
            ? { href: p.link, ...(/^https?:/.test(p.link) && { target: "_blank", rel: "noopener noreferrer" }) }
            : { type: "button" as const, onClick: () => setOpen(i) };
          return (
          <li key={`${i}-${p.src}`}>
            <Tile
              {...action}
              style={{ "--d": `${(i % 8) * 0.05}s` } as React.CSSProperties}
              className="rise group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 text-left"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                unoptimized={p.remote}
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-hero-950/85 via-hero-950/10 to-transparent p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan">
                  {p.tag}
                </span>
                <span className="mt-1 font-display text-sm font-bold leading-snug sm:text-base">
                  {p.caption}
                </span>
              </span>
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {p.link ? <ExternalLink className="size-4" /> : <Expand className="size-4" />}
              </span>
            </Tile>
          </li>
          );
        })}
      </ul>

      {photos.length > shown.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setLimit(limit + 15)}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-bold text-white shadow-lg shadow-navy/25 transition-colors hover:bg-brand"
          >
            Show more photos
            <span className="text-cyan">{photos.length - shown.length} left</span>
          </button>
        </div>
      )}

      {open !== null && (
        <Lightbox photos={photos} index={open} onChange={setOpen} onClose={close} />
      )}
    </div>
  );
}
