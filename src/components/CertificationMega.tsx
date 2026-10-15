import { NavLink } from "./NavLink";
import {
  ArrowRight,
  Box,
  ChartColumn,
  Cloud,
  Code,
  Layers,
  Megaphone,
  Monitor,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { certificatePrograms, internshipHref } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  cloud: Cloud,
  code: Code,
  sparkles: Sparkles,
  rocket: Rocket,
  megaphone: Megaphone,
  chart: ChartColumn,
  layers: Layers,
  shield: Shield,
  terminal: Terminal,
  monitor: Monitor,
  target: Target,
  box: Box,
};

const badgeColors = {
  Hot: "bg-sun text-hero-950",
  New: "bg-brand/10 text-brand",
  Trending: "bg-cyan/25 text-navy",
};

/** Full-width Certification dropdown, positioned like the other mega menus. */
export function CertificationMega() {
  return (
    <div className="invisible absolute inset-x-0 top-[calc(100%-1.25rem)] z-[10000] translate-y-2 pt-8 opacity-0 transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 text-navy shadow-2xl shadow-hero-950/25">
        <div className="grid grid-cols-4 gap-4 p-6">
          {certificatePrograms.map((c) => {
            const Icon = icons[c.icon];
            return (
              <NavLink
                key={c.label}
                href={internshipHref()}
                title={c.label}
                className="group/tile flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/8 text-brand transition duration-300 group-hover/tile:bg-brand group-hover/tile:text-white">
                  <Icon className="size-5" />
                </span>
                <span className="truncate font-medium">{c.label}</span>
                {c.badge && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${badgeColors[c.badge]}`}
                  >
                    {c.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-slate-200 bg-white px-8 py-4">
          <p className="text-[15px] text-slate-600">
            Every programme ends with a certificate, a project report and an
            internship letter.
          </p>
          <NavLink
            href="/courses"
            className="group/cta inline-flex shrink-0 items-center gap-2 font-semibold text-brand transition-colors hover:text-navy"
          >
            See all certificate courses
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
