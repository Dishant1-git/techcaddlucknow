import { ArrowRight, Rocket, Sparkles } from "lucide-react";
import { aiMenu, site } from "@/lib/site";

const icons = { sparkles: Sparkles, rocket: Rocket };

const badgeColors: Record<string, string> = {
  Hot: "bg-sun text-hero-950",
  New: "bg-cyan text-hero-950",
  Trending: "bg-sky/80 text-white",
};

/**
 * Full-width AI dropdown. Positioned against the header bar like AboutMega: the
 * top padding overlaps the bar so the pointer can reach the panel from the pill.
 */
export function AiMega() {
  return (
    <div className="invisible absolute inset-x-0 top-[calc(100%-1.25rem)] z-[10000] translate-y-2 pt-8 opacity-0 transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-hero-950 via-hero-900 to-hero-800 p-8 text-white shadow-2xl shadow-hero-950/50">
        <div className="bg-grid-dark absolute inset-0 -z-10" />
        <div className="glow-dark absolute inset-0 -z-10" />

        <div className="grid grid-cols-[1.25fr_0.6fr_0.55fr] gap-8">
          <div>
            <p className="font-display text-3xl font-extrabold tracking-tight">Learn AI Skills.</p>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-slate-300">
              Build projects with machine learning, data science, automation and
              generative AI.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-8">
              {aiMenu.map((col) => {
                const Icon = icons[col.icon];
                return (
                  <div key={col.title}>
                    <p className="flex items-center gap-3 font-display text-lg font-bold">
                      <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-sky to-brand shadow-lg shadow-brand/40">
                        <Icon className="size-4" />
                      </span>
                      {col.title}
                    </p>
                    <ul className="mt-4 space-y-1">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a
                            href="/#ai"
                            className="group/link flex flex-wrap items-center gap-x-2.5 gap-y-1 py-1.5 text-[15px] text-slate-200 transition-colors hover:text-cyan"
                          >
                            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                              {l.label}
                            </span>
                            {"badge" in l && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${badgeColors[l.badge]}`}
                              >
                                {l.badge}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured course */}
          <a
            href="/#ai"
            className="group/card flex flex-col overflow-hidden rounded-3xl bg-white text-navy transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan/20"
          >
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-hero-800 via-brand to-cyan">
              <div className="bg-grid-dark absolute inset-0" />
              <Sparkles className="absolute bottom-4 right-4 size-10 text-white/70 transition-transform duration-500 group-hover/card:rotate-12 group-hover/card:scale-125" />
            </div>
            <div className="flex-1 p-6">
              <span className="inline-block rounded-md bg-sun px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-hero-950">
                Featured AI course
              </span>
              <p className="mt-4 font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover/card:text-brand">
                Artificial Intelligence Training in {site.city}
              </p>
            </div>
          </a>

          {/* Promo */}
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-brand via-sky to-cyan p-7">
            <p className="font-display text-lg font-bold leading-snug tracking-tight">
              Start with AI fundamentals, then move into real projects and
              career-ready tools.
            </p>
            <a
              href="/#ai"
              className="group/cta mt-8 inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3 font-bold text-brand shadow-lg transition-colors hover:bg-hero-950 hover:text-white"
            >
              Explore AI
              <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
