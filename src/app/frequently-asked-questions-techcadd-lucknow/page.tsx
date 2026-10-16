import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { FaqCounsellor, FaqLibrary } from "@/components/resources/FaqPage";
import { CallbackStrip, HeroActions, NextSteps } from "@/components/resources/Kit";
import { HeroIntro } from "@/components/resources/Kit";
import { faqHero } from "@/lib/resources/faq";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | Admissions, Fees & Placements | ${site.name} ${site.city}`,
  description: `Answers to frequently asked questions about IT courses, fees, session timings, certification, placement support and internships at ${site.name} ${site.city}.`,
};

// The source's third card pointed at a page this site does not have, so it is
// replaced by another resource page with copy from the content files.
const next = [
  {
    title: "Visit or book a demo",
    text: "The Kursi Road campus, session timings, fees and EMI options — or a free demo class before you commit to anything.",
    cta: "Get directions",
    href: "/contact",
  },
  {
    title: "All courses",
    text: "Sixteen job-oriented tracks — AI, full stack, data, cyber security, cloud, digital marketing and CAD, each with live projects and placement support.",
    cta: "Browse the catalogue",
    href: "/courses",
  },
  {
    title: "Free study material & cheat sheets",
    text: "Curated coding cheat sheets, Python notes, AI guides, and university syllabus blueprints.",
    cta: "Download free resources",
    href: resourceRoutes.studyMaterial,
  },
];

export default function FaqPage() {
  return (
    <PageShell>
      <PageHero eyebrow={faqHero.eyebrow} title={null} crumbs={[{ label: "FAQs" }]}>
        <HeroIntro
          eyebrow={faqHero.eyebrow}
          title={
            <>
              Questions we are asked, and <span className="text-shine">straight answers.</span>
            </>
          }
          text={`Admissions, sessions, fees, placement and certification at ${site.name} ${site.city} — organised by course category so you get clear information instantly.`}
        >
          <HeroActions secondary={{ label: "Search the questions", href: "#questions" }} />
        </HeroIntro>
      </PageHero>
      <FaqLibrary />
      <FaqCounsellor />
      <CallbackStrip />
      <NextSteps items={next} />
    </PageShell>
  );
}
