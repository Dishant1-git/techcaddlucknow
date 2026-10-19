import { getSite } from "@/lib/cms/site";
// Sections of the college partnerships page.
import { Award, BookOpenCheck, Briefcase, GraduationCap, Phone, Presentation, Send, Trophy } from "lucide-react";
import { partnerCta, partnershipFormats, partnershipSteps } from "@/lib/resources/partnerships";
import { site } from "@/lib/site";
import { BookDemoButton } from "../Enquiry";
import { NavLink } from "../NavLink";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading, cardRow } from "../ui";

const formatIcons = [Presentation, GraduationCap, Briefcase, Award, BookOpenCheck, Trophy];

/** The six partnership formats. */
export function PartnershipFormats() {
  const { row, card } = cardRow(partnershipFormats.length);
  return (
    <LightSection>
      <SectionHeading
        eyebrow="What we run"
        title={
          <>
            Six ways we work with <span className="text-gradient">institutions</span>
          </>
        }
        text={`Every format can run on your campus or at the ${site.name} ${site.city} centre, sized to a single department or a whole year group.`}
      />
      <ul data-stagger className={`mt-14 ${row}`}>
        {partnershipFormats.map((f, i) => {
          const Icon = formatIcons[i] ?? Presentation;
          return (
            <li
              key={f.title}
              data-spot
              className={`${card} rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1 hover:border-brand/30`}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.text}</p>
            </li>
          );
        })}
      </ul>
    </LightSection>
  );
}

/** Four steps from the first call to a running programme. */
export function PartnershipSteps() {
  return (
    <DarkSection>
      <SectionHeading
        dark
        eyebrow="How it works"
        title={
          <>
            From first call to a <span className="text-gradient">running programme</span>
          </>
        }
      />
      <ol data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {partnershipSteps.map((s) => (
          <li key={s.step} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <span className="font-display text-5xl font-extrabold text-outline">{s.step}</span>
            <h3 className="mt-4 font-display text-lg font-bold text-white">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{s.text}</p>
          </li>
        ))}
      </ol>
    </DarkSection>
  );
}

/** Proposal request for heads of department and training officers. */
export async function PartnerCta() {
  const site = await getSite(); // CMS Settings, over the built-in details
  return (
    <section className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div
        data-reveal
        className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl shadow-hero-950/10 sm:p-12"
      >
        <div className="glow-light absolute inset-0 -z-10" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <Eyebrow>{partnerCta.eyebrow}</Eyebrow>
            <Heading className="mt-5 lg:!text-4xl">
              Tell us what your students <span className="text-gradient">need next.</span>
            </Heading>
            <p className="mt-5 leading-relaxed text-slate-600">{partnerCta.text}</p>
          </div>
          <div className="flex flex-col gap-3">
            <NavLink
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 font-bold text-white transition hover:bg-brand"
            >
              <Phone className="size-4" /> Call {site.phone}
            </NavLink>
            <BookDemoButton className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 font-semibold text-navy transition hover:border-brand hover:text-brand">
              <Send className="size-4" /> Send an enquiry
            </BookDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
