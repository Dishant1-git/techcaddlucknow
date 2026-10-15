// Sections for courses that have a content brief (src/lib/courseGuides.json).
// Each renders nothing for courses without one.
import {
  Briefcase,
  Check,
  CircleCheck,
  Compass,
  FolderGit2,
  Info,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Course, GuideItem } from "@/lib/courses";
import { site } from "@/lib/site";
import { findLogo, isLight } from "@/lib/techLogos";
import { BookDemoButton } from "./Enquiry";
import { OutcomeTabs, type OutcomeTab } from "./OutcomeTabs";
import { cardRow, Clamp, copyLength, DarkSection, Eyebrow, Heading, LightSection } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

// After 12th programme briefs run long, so their cards wrap neatly and cut
// their copy to a few lines.
const isCompact = (course: Course) => course.theme === "after12th";

// After 12th labels already say what they are: "Cloud Computing Program".
const courseName = (label: string) => (/\bProgram\b/.test(label) ? label : `${label} course`);

function Points({ points, dark = false }: { points?: string[]; dark?: boolean }) {
  if (!points?.length) return null;
  return (
    <ul className="mt-4 space-y-2">
      {points.map((p) => (
        <li key={p} className={`flex gap-2.5 text-sm ${dark ? "text-slate-200" : "text-slate-700"}`}>
          <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-cyan" : "text-brand"}`} />
          {p}
        </li>
      ))}
    </ul>
  );
}

/** "Before you enrol" / "Basic requirements" panel under the audience cards. */
export function CourseAudienceNote({ course }: { course: Course }) {
  const note = course.guide?.audience.note;
  if (!note) return null;
  return (
    <section className="bg-white px-5 pb-20 lg:px-8 lg:pb-28">
      <div
        data-reveal
        className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[2rem] border border-brand/15 bg-brand/[0.04] p-7 sm:flex-row sm:p-9"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white">
          <ListChecks className="size-6" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-navy">{note.title}</h3>
          {note.text && <p className="mt-2 leading-relaxed text-slate-600">{note.text}</p>}
          <Points points={note.points} />
          {note.after && <p className="mt-3 leading-relaxed text-slate-600">{note.after}</p>}
        </div>
      </div>
    </section>
  );
}

export function CourseWhyProgramme({ course }: { course: Course }) {
  const why = course.guide?.why;
  if (!why?.items.length) return null;
  const compact = isCompact(course);
  const row = cardRow(why.items.length);
  return (
    <DarkSection id="why-this-programme">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow dark>Why this programme</Eyebrow>
        <Heading dark className="mt-5">
          Why choose the <span className="text-gradient">{courseName(course.label)}</span>
        </Heading>
        {why.intro && (
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
            {why.intro}
          </p>
        )}
      </div>

      <div
        data-stagger
        className={compact ? `mt-14 ${row.row}` : "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}
      >
        {why.items.map((w, i) => {
          const copy = (
            <>
              {w.text && <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{w.text}</p>}
              <Points points={w.points} dark />
              {w.after && <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{w.after}</p>}
            </>
          );
          return (
            <article
              key={w.title}
              data-spot
              className={`border-glow relative rounded-3xl bg-white/[0.04] p-7 ${compact ? row.card : ""}`}
            >
              <span className="font-display text-sm font-bold text-cyan">{pad(i + 1)}</span>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">{w.title}</h3>
              {compact ? (
                <Clamp length={copyLength(w)} dark>
                  {copy}
                </Clamp>
              ) : (
                copy
              )}
            </article>
          );
        })}
      </div>

      {why.close && (
        <div
          data-reveal
          className="mx-auto mt-10 flex max-w-4xl flex-col items-start gap-5 rounded-3xl bg-gradient-to-br from-brand to-hero-800 p-7 sm:flex-row sm:items-center sm:p-9"
        >
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold">{why.close.title}</h3>
            {why.close.text && <p className="mt-2 leading-relaxed text-slate-100">{why.close.text}</p>}
          </div>
          <BookDemoButton
            course={course.label}
            className="shrink-0 rounded-full bg-sun px-7 py-3.5 text-sm font-bold text-hero-950 transition hover:brightness-105"
          >
            Book a free demo
          </BookDemoButton>
        </div>
      )}
    </DarkSection>
  );
}

/** What learners can do by the end, plus the brief's tool table when it has one. */
export function CourseTakeaways({ course }: { course: Course }) {
  const learn = course.guide?.learn;
  if (!learn || (!learn.outcomes.length && !learn.tools.length)) return null;
  if (isCompact(course)) return <TabbedTakeaways learn={learn} />;
  return (
    <LightSection id="takeaways">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Outcomes</Eyebrow>
        <Heading className="mt-5">
          What you will be able <span className="text-gradient">to do</span>
        </Heading>
      </div>

      {learn.outcomes.length > 0 && (
        <div
          data-stagger
          className={
            isCompact(course)
              ? "mt-14 gap-5 lg:columns-2 [&>*]:mb-5 [&>*]:break-inside-avoid"
              : "mt-14 grid gap-5 lg:grid-cols-2"
          }
        >
          {learn.outcomes.map((o) => (
            <article
              key={o.title}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 sm:p-8"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <CircleCheck className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{o.title}</h3>
              {o.text &&
                (isCompact(course) && !o.points?.length ? (
                  <Clamp length={o.text.length}>
                    <p className="mt-2 leading-relaxed text-slate-600">{o.text}</p>
                  </Clamp>
                ) : (
                  <p className="mt-2 leading-relaxed text-slate-600">{o.text}</p>
                ))}
              <Points points={o.points} />
              {o.after && <p className="mt-3 leading-relaxed text-slate-600">{o.after}</p>}
            </article>
          ))}
        </div>
      )}

      {learn.tools.length > 0 && (
        <div
          data-reveal
          className="mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-hero-950/5"
        >
          <p className="border-b border-slate-100 px-7 py-5 font-display text-lg font-bold text-navy">
            Tools and what you practise in them
          </p>
          <dl
            className={
              isCompact(course)
                ? "grid lg:grid-cols-2 [&>div]:border-b [&>div]:border-slate-100 lg:[&>div:nth-child(odd)]:border-r"
                : "divide-y divide-slate-100"
            }
          >
            {learn.tools.map((t) => (
              <div
                key={t.title}
                className={`grid gap-1 px-7 py-4 sm:gap-6 ${
                  isCompact(course) ? "sm:grid-cols-[12rem_1fr]" : "sm:grid-cols-[16rem_1fr]"
                }`}
              >
                <dt className="font-semibold text-navy">{t.title}</dt>
                <dd className="text-slate-600">{t.text}</dd>
              </div>
            ))}
          </dl>
          {learn.toolNote && (
            <p className="border-t border-slate-100 px-7 py-4 text-sm text-slate-500">{learn.toolNote}</p>
          )}
        </div>
      )}
    </LightSection>
  );
}

// The After 12th briefs title their outcome blocks freely ("Practical Projects
// and Hands-On Learning", "Project 3: …", "Further Learning and Official
// Resources"), so each block is sorted into a tab by what its title mentions.
const tabKinds = [
  { key: "outcomes", label: "Outcomes", icon: <Target />, test: /outcome|learning direction/i },
  { key: "skills", label: "Skills", icon: <Sparkles />, test: /skill/i },
  { key: "projects", label: "Projects", icon: <FolderGit2 />, test: /project/i },
  { key: "applications", label: "Applications", icon: <Briefcase />, test: /application/i },
  { key: "tools", label: "Tools", icon: <Wrench />, test: /tool|software/i },
  { key: "next", label: "Next steps", icon: <Compass />, test: /further|career|pathway|foundation/i },
];
// Titles are tested in this order, so "Practical Projects and Learning
// Outcomes" counts as projects and "Professional Skills and Learning
// Outcomes" as outcomes.
const matchOrder = ["projects", "outcomes", "skills", "applications", "tools", "next"];

const kindOf = (title: string) =>
  matchOrder.find((k) => tabKinds.find((t) => t.key === k)!.test.test(title));

// "Project 2 — Cloud Storage: Create an S3 bucket…" → title and description.
function splitPoint(point: string) {
  const p = point.replace(/^Project\s*\d+\s*[:—–-]\s*/i, "");
  const m = /^(.{3,70}?)(?::\s|\s[—–]\s)(.+)$/.exec(p);
  return m ? { title: m[1], text: m[2] } : { title: p, text: "" };
}

function PointList({ points }: { points: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {points.map((point) => {
        const { title, text } = splitPoint(point);
        return (
          <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span>
              {text ? (
                <>
                  <span className="font-semibold text-navy">{title}</span>: {text}
                </>
              ) : (
                point
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// Projects arrive either as one block listing them or one block each.
function ProjectCards({ items }: { items: GuideItem[] }) {
  const projects = items.flatMap((item) =>
    item.points?.length
      ? item.points.map(splitPoint)
      : /^project\s*\d/i.test(item.title)
        ? [{ ...splitPoint(item.title), text: [splitPoint(item.title).text, item.text].filter(Boolean).join(" ") }]
        : [],
  );
  const lead = items.find((item) => item.points?.length || !/^project\s*\d/i.test(item.title));
  return (
    <>
      {lead?.text && <p className="mb-6 max-w-3xl leading-relaxed text-slate-600">{lead.text}</p>}
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.title} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
            <span className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Project {pad(i + 1)}
            </span>
            <p className="mt-2 font-display font-bold leading-snug text-navy">{p.title}</p>
            {p.text && <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.text}</p>}
          </li>
        ))}
      </ol>
      {lead?.after && <p className="mt-6 text-sm leading-relaxed text-slate-500">{lead.after}</p>}
    </>
  );
}

function ItemBlock({ item, heading }: { item: GuideItem; heading: boolean }) {
  return (
    <div>
      {heading && <h4 className="mb-3 font-display text-lg font-bold text-navy">{item.title}</h4>}
      {item.text && <p className="mb-5 max-w-3xl leading-relaxed text-slate-600">{item.text}</p>}
      {item.points?.length ? <PointList points={item.points} /> : null}
      {item.after && <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-500">{item.after}</p>}
    </div>
  );
}

function ToolLogo({ name }: { name: string }) {
  const logo = findLogo(name);
  // Light brand colours (JavaScript yellow…) sit on a dark tile.
  const dark = !!logo && isLight(logo.hex);
  return (
    <span
      className={`grid size-11 shrink-0 place-items-center rounded-xl ${
        dark ? "bg-navy" : "border border-slate-100 bg-white"
      }`}
    >
      {logo ? (
        <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill={`#${logo.hex}`}>
          <path d={logo.path} />
        </svg>
      ) : (
        <Wrench className="size-5 text-brand" />
      )}
    </span>
  );
}

function ToolGrid({ tools, note }: { tools: { title: string; text?: string }[]; note: string | null }) {
  return (
    <>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <div key={t.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <ToolLogo name={t.title} />
            <div className="min-w-0">
              <dt className="font-semibold leading-snug text-navy">{t.title}</dt>
              {t.text && <dd className="mt-1 text-sm leading-relaxed text-slate-600">{t.text}</dd>}
            </div>
          </div>
        ))}
      </dl>
      {note && <p className="mt-5 text-sm text-slate-500">{note}</p>}
    </>
  );
}

// The Tools tab: the brief's tool table, plus tool lists written as bullets
// ("Flutter SDK: The primary framework…"), all as logo cards.
function ToolsPanel({ items, tools, note }: { items: GuideItem[]; tools: GuideItem[]; note: string | null }) {
  const listed = items.flatMap((item) => (item.points ?? []).map(splitPoint));
  const prose = items.filter((item) => !item.points?.length || item.text || item.after);
  return (
    <div className="space-y-6">
      {prose.map((item) => (
        <div key={item.title}>
          {item.text && <p className="max-w-3xl leading-relaxed text-slate-600">{item.text}</p>}
          {item.after && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">{item.after}</p>}
        </div>
      ))}
      <ToolGrid tools={[...tools, ...listed]} note={note} />
    </div>
  );
}

const countOf = (items: GuideItem[]) => items.reduce((n, i) => n + (i.points?.length ?? 0), 0);

/** After 12th outcomes: the brief's outcome blocks and tool table as tabs. */
function TabbedTakeaways({ learn }: { learn: NonNullable<Course["guide"]>["learn"] }) {
  const groups = new Map<string, GuideItem[]>();
  const notes: GuideItem[] = [];
  for (const item of learn.outcomes) {
    const kind = kindOf(item.title);
    if (kind) groups.set(kind, [...(groups.get(kind) ?? []), item]);
    else notes.push(item);
  }

  const tabs: OutcomeTab[] = [];
  const panels: ReactNode[] = [];
  for (const kind of tabKinds) {
    const items = groups.get(kind.key) ?? [];
    const tools = kind.key === "tools" ? learn.tools : [];
    if (!items.length && !tools.length) continue;
    const count =
      kind.key === "projects"
        ? items.reduce((n, i) => n + (i.points?.length || (/^project\s*\d/i.test(i.title) ? 1 : 0)), 0)
        : tools.length + countOf(items);
    tabs.push({ key: kind.key, label: kind.label, icon: kind.icon, count: count || undefined });
    panels.push(
      <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-hero-950/5 sm:p-10">
        <div className="mb-8 flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white [&>svg]:size-6">
            {kind.icon}
          </span>
          <h3 className="font-display text-2xl font-bold text-navy">
            {items.length === 1 && kind.key !== "tools" ? items[0].title : kind.label}
          </h3>
        </div>
        {kind.key === "projects" ? (
          <ProjectCards items={items} />
        ) : kind.key === "tools" ? (
          <ToolsPanel items={items} tools={tools} note={learn.toolNote} />
        ) : (
          <div className="space-y-10">
            {items.map((item) => (
              <ItemBlock key={item.title} item={item} heading={items.length > 1 || tools.length > 0} />
            ))}
          </div>
        )}
      </div>,
    );
  }

  return (
    <LightSection id="takeaways">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Outcomes</Eyebrow>
        <Heading className="mt-5">
          What you will be able <span className="text-gradient">to do</span>
        </Heading>
      </div>
      <div data-reveal className="mt-12">
        <OutcomeTabs tabs={tabs} panels={panels} />
      </div>
      {notes.map((note) => (
        <div
          key={note.title}
          data-reveal
          className="mx-auto mt-6 flex max-w-4xl gap-4 rounded-2xl border border-brand/15 bg-brand/[0.04] p-5 sm:p-6"
        >
          <Info className="mt-0.5 size-5 shrink-0 text-brand" />
          <div className="text-sm leading-relaxed text-slate-600">
            <p className="font-semibold text-navy">{note.title}</p>
            {note.text && <p className="mt-1">{note.text}</p>}
            {note.points?.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-4">
                {note.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
            {note.after && <p className="mt-2">{note.after}</p>}
          </div>
        </div>
      ))}
    </LightSection>
  );
}

function UsCard({ item, index }: { item: GuideItem; index: number }) {
  const checklist = !!item.points?.length;
  return (
    <article
      className={`rounded-3xl p-7 ${
        checklist
          ? "border border-brand/15 bg-brand/[0.04] sm:col-span-2"
          : "border border-slate-100 bg-white shadow-xl shadow-hero-950/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy font-display text-sm font-bold text-white">
          {checklist ? <ListChecks className="size-5" /> : pad(index + 1)}
        </span>
        <h3 className="font-display text-lg font-bold leading-snug text-navy">{item.title}</h3>
      </div>
      {item.text && <p className="mt-4 leading-relaxed text-slate-600">{item.text}</p>}
      {checklist && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {item.points!.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm text-slate-700">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              {p}
            </li>
          ))}
        </ul>
      )}
      {item.after && <p className="mt-4 leading-relaxed text-slate-600">{item.after}</p>}
    </article>
  );
}

/**
 * After 12th "Why techcadd": the heading and a booking card stay pinned on
 * the left while the reasons run down a numbered timeline on the right.
 */
function WhyUsTimeline({ course, us }: { course: Course; us: NonNullable<Course["guide"]>["whyUs"] }) {
  return (
    <section id="why-techcadd" className="relative isolate scroll-mt-24 overflow-clip bg-white">
      <div className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Why {site.name}</Eyebrow>
            <Heading className="mt-5">
              Learning {course.label} <span className="text-gradient">with {site.name}</span>
            </Heading>
            {us.intro && (
              <div data-reveal className="mt-6">
                <Clamp length={us.intro.length}>
                  <p className="text-lg leading-relaxed text-slate-600">{us.intro}</p>
                </Clamp>
              </div>
            )}

            <div
              data-reveal
              className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand to-hero-800 p-7 text-white shadow-xl shadow-brand/20"
            >
              <div className="orb absolute -right-16 -top-16 size-48 [--orb:color-mix(in_srgb,var(--color-cyan)_35%,transparent)]" />
              <span className="relative grid size-10 place-items-center rounded-xl bg-white/15 text-sun">
                <Lightbulb className="size-5" />
              </span>
              <h3 className="relative mt-4 font-display text-xl font-bold">
                {us.close?.title ?? "See it for yourself"}
              </h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-white/80">
                {us.close?.text ??
                  `Sit in on a free demo class at the ${site.city} campus, meet a trainer and ask about batches before you decide.`}
              </p>
              <div className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <BookDemoButton
                  course={course.label}
                  className="rounded-full bg-sun px-6 py-3 text-sm font-bold text-hero-950 transition hover:brightness-105"
                >
                  Book a free demo
                </BookDemoButton>
                <a href={site.phoneHref} className="text-sm font-semibold text-white/90 hover:text-white">
                  or call {site.phone}
                </a>
              </div>
            </div>
          </div>

          <ol data-stagger className="relative space-y-4 before:absolute before:bottom-6 before:left-5 before:top-6 sm:before:left-6 before:w-px before:bg-gradient-to-b before:from-brand/40 before:via-slate-200 before:to-transparent">
            {us.items.map((item, i) => (
              <li key={item.title} className="relative flex gap-3 sm:gap-5">
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-4 border-white bg-navy font-display text-xs sm:size-12 sm:text-sm font-bold text-white shadow-md">
                  {pad(i + 1)}
                </span>
                <div className="min-w-0 flex-1 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg sm:p-6 shadow-hero-950/5">
                  <h3 className="font-display text-lg font-bold leading-snug text-navy">{item.title}</h3>
                  {item.text && (
                    <Clamp length={item.text.length}>
                      <p className="mt-2 leading-relaxed text-slate-600">{item.text}</p>
                    </Clamp>
                  )}
                  {item.points?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-1.5 rounded-full bg-brand/[0.07] px-3 py-1.5 text-sm text-navy"
                        >
                          <Check className="size-3.5 text-brand" strokeWidth={3} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {item.after && <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.after}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function CourseWhyUs({ course }: { course: Course }) {
  const us = course.guide?.whyUs;
  if (!us?.items.length) return null;
  if (isCompact(course)) return <WhyUsTimeline course={course} us={us} />;
  return (
    <section id="why-techcadd" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Why {site.name}</Eyebrow>
            <Heading className="mt-5">
              Learning {course.label} <span className="text-gradient">with {site.name}</span>
            </Heading>
            {us.intro && (
              <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
                {us.intro}
              </p>
            )}
            {us.close && (
              <div data-reveal className="mt-8 rounded-3xl bg-hero-950 p-7 text-white">
                <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-sun">
                  <Lightbulb className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{us.close.title}</h3>
                {us.close.text && (
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{us.close.text}</p>
                )}
              </div>
            )}
          </div>

          <div data-stagger className="grid gap-5 sm:grid-cols-2">
            {us.items.map((item, i) => (
              <UsCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
