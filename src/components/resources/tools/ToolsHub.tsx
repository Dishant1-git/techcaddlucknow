import { NavLink } from "../../NavLink";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Bot,
  Calculator,
  CheckCircle2,
  Compass,
  FolderGit2,
  GraduationCap,
  IndianRupee,
  MessageSquareText,
  Send,
} from "lucide-react";
import { hubResources, toolCards, type ToolCard } from "@/lib/resources/tools/hub";
import { SectionHeading } from "../../ui";

const toolIcons: Record<ToolCard["key"], typeof Bot> = {
  salary: IndianRupee,
  career: Compass,
  training: GraduationCap,
  interview: Bot,
  cgpa: Calculator,
  email: Send,
};

const resourceIcons = [BookOpen, MessageSquareText, FolderGit2, BadgeCheck];

/** The six tools, pulled up over the bottom of the hero. */
export function ToolGrid() {
  return (
    <section aria-label="Free tools" className="relative z-10 mx-auto -mt-16 max-w-7xl px-5 lg:-mt-20 lg:px-8">
      <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {toolCards.map((t) => {
          const Icon = toolIcons[t.key];
          return (
            <NavLink
              key={t.href}
              href={t.href}
              className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-2xl shadow-hero-950/10 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand transition duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <span className="rounded-full bg-sun/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-navy">
                  {t.badge}
                </span>
              </div>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{t.eyebrow}</p>
              <h2 className="mt-2 font-display text-xl font-bold text-navy">{t.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{t.text}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand">
                Launch tool
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

/** Learning hubs and the verification portal. */
export function LearningHubs() {
  return (
    <section className="overflow-clip bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Learning hubs & verification"
          title={
            <>
              Free study guides &amp; <span className="text-gradient">student portals</span>
            </>
          }
          text="Learning material, interview preparation, student portfolios and certificate verification."
        />
        <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hubResources.map((r, i) => {
            const Icon = resourceIcons[i % resourceIcons.length];
            return (
              <NavLink
                key={r.href}
                href={r.href}
                className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-brand/8 text-brand">
                  <Icon className="size-5" />
                </span>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{r.badge}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{r.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{r.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">
                  Explore resource
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
