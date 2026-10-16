// Shown instantly while a page streams in (it is prefetched with every link).
// It mirrors the page frame: the dark hero with the header over it, then a
// grid of cards, so nothing jumps when the real page swaps in.
const bar = "skeleton rounded-full";

export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading…</span>

      <div className="bg-hero-950 pb-20 lg:pb-28">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:mt-9 lg:px-8">
          <div className={`${bar} h-9 w-36`} />
          <div className="hidden gap-6 lg:flex">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={`${bar} h-3.5 w-20`} />
            ))}
          </div>
          <div className={`${bar} h-11 w-11 lg:w-36`} />
        </div>

        <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8 lg:pt-24">
          <div className={`${bar} h-7 w-44`} />
          <div className="mt-7 space-y-4">
            <div className="skeleton h-11 w-full max-w-3xl rounded-2xl lg:h-14" />
            <div className="skeleton h-11 w-4/5 max-w-2xl rounded-2xl lg:h-14" />
          </div>
          <div className="mt-8 max-w-2xl space-y-3">
            <div className={`${bar} h-4 w-full`} />
            <div className={`${bar} h-4 w-11/12`} />
            <div className={`${bar} h-4 w-2/3`} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <div className={`${bar} h-14 w-44`} />
            <div className={`${bar} h-14 w-40`} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <div className={`${bar} h-7 w-36`} />
          <div className="skeleton mt-6 h-10 w-full rounded-2xl" />
          <div className="skeleton mt-3 h-10 w-3/4 rounded-2xl" />
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="rounded-3xl border border-slate-100 p-7">
              <div className="skeleton size-12 rounded-2xl" />
              <div className={`${bar} mt-6 h-5 w-3/4`} />
              <div className={`${bar} mt-4 h-3.5 w-full`} />
              <div className={`${bar} mt-2.5 h-3.5 w-5/6`} />
              <div className={`${bar} mt-2.5 h-3.5 w-2/3`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
