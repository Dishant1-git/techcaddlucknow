import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { aboutMenu, aboutTagline } from "@/lib/site";
import { BookDemoButton } from "./Enquiry";

const counsellorLink =
  "group/cta inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-navy";

/**
 * Full-width About dropdown. It is positioned against the header bar, and its
 * top padding overlaps the bar slightly so the pointer can travel from the
 * "About" link down into the panel without the menu closing.
 */
export function AboutMega() {
  return (
    <div className="invisible absolute inset-x-0 top-[calc(100%-1.25rem)] z-[10000] translate-y-2 pt-8 opacity-0 transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 text-navy shadow-2xl shadow-hero-950/25">
        <div className="grid grid-cols-[16rem_1fr] gap-8 p-8">
          <div className="flex flex-col border-r border-slate-200 pr-8">
            {aboutMenu.map((m) => (
              <a
                key={m.link}
                href={m.href}
                className="group/link flex items-center justify-between py-3.5 font-display text-lg font-semibold transition-colors hover:text-brand"
              >
                {m.link}
                <ArrowRight className="size-4 -translate-x-2 opacity-0 transition duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
              </a>
            ))}
            <BookDemoButton className={`${counsellorLink} mt-auto pt-6 text-left`}>
              Talk to a counsellor
              <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
            </BookDemoButton>
          </div>

          <div className="grid grid-cols-4 gap-5">
            {aboutMenu.map((m) => {
              return (
                <a key={m.title} href={m.href} className="group/card block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 transition duration-500 group-hover/card:-translate-y-1.5 group-hover/card:shadow-xl group-hover/card:shadow-brand/20">
                    <Image
                      src={m.image}
                      alt={m.title}
                      fill
                      sizes="(min-width: 1280px) 16rem, 25vw"
                      className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                  </div>
                  <p className="mt-4 font-display text-lg font-bold tracking-tight transition-colors group-hover/card:text-brand">
                    {m.title}
                  </p>
                  <p className="mt-2 flex items-center gap-3">
                    <span className="rounded-md bg-brand/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand">
                      {m.tag}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                      {m.caption}
                    </span>
                  </p>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-slate-200 bg-white px-8 py-4">
          <p className="text-[15px] text-slate-600">{aboutTagline}</p>
          <BookDemoButton className={`${counsellorLink} shrink-0`}>
            Talk to a counsellor
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
          </BookDemoButton>
        </div>
      </div>
    </div>
  );
}
