import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { DirectoryList } from "@/components/resources/DirectoryList";
import { CallbackStrip, NextSteps, type NextLink } from "@/components/resources/Kit";
import { LightSection } from "@/components/ui";
import { directory, directoryGroups } from "@/lib/resources/directory";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";

// Layout and copy follow techcaddmohali.com/pages; the list is this site's own pages.
export const metadata: Metadata = {
  title: `All Pages | ${site.name} ${site.city}`,
  description: `Every page on the ${site.name} ${site.city} website — courses, internships, After 12th programmes, free tools, guides and articles.`,
};

const next: NextLink[] = [
  {
    title: "Free tools",
    text: "Salary ranges, a career-track quiz, CGPA converter and AI interview practice — free, no sign-up.",
    cta: "Open the tools",
    href: resourceRoutes.tools,
  },
  {
    title: "All courses",
    text: "Programming, web, AI and data, cloud, cyber security, design, marketing and CAD — with syllabus and projects.",
    cta: "Browse courses",
    href: "/courses",
  },
  {
    title: "Questions answered",
    text: "Fees, batches, certificates, internships and placements — searchable answers to what students ask most.",
    cta: "Read the FAQ",
    href: resourceRoutes.faq,
  },
];

export default function PagesDirectory() {
  return (
    <PageShell>
      <PageHero
        eyebrow="All pages"
        crumbs={[{ label: "Pages" }]}
        title={
          <>
            Everything else <span className="text-shine">worth reading.</span>
          </>
        }
        text={`Guides, courses, tools and articles from ${site.name} ${site.city} — ${directory.length} pages in one place.`}
      />
      <LightSection>
        <DirectoryList entries={directory} groups={directoryGroups} />
      </LightSection>
      <NextSteps items={next} />
      <CallbackStrip />
    </PageShell>
  );
}
