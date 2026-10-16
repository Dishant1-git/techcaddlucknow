import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { HeroActions, HeroBadges, NextSteps } from "@/components/resources/Kit";
import { HeroIntro } from "@/components/resources/Kit";
import { StudyLibrarySection, StudyTransition, StudyValues } from "@/components/resources/StudyMaterial";
import { studyCategories, studyHero, studyNext, toolsHref } from "@/lib/resources/study-material";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Free IT Study Material, Cheat Sheets & Roadmaps | ${site.name} ${site.city}`,
  description: `Free curated IT study material from ${site.name} ${site.city}: coding cheat sheets, Python notes, full stack roadmaps, AI guides, cyber security references and CAD practice sheets for viva and interview preparation.`,
};

export default function StudyMaterialPage() {
  return (
    <PageShell>
      <PageHero eyebrow={studyHero.eyebrow} title={null} crumbs={[{ label: "Study Material" }]}>
        <HeroIntro
          eyebrow={studyHero.eyebrow}
          title={
            <>
              Free IT study material, developer roadmaps &amp;{" "}
              <span className="text-shine">cheat sheets.</span>
            </>
          }
          text={studyHero.text}
        >
          <HeroBadges items={studyCategories.map((c) => c.heading)} />
          <HeroActions secondary={{ label: "Free tools hub", href: toolsHref }} />
        </HeroIntro>
      </PageHero>
      <StudyValues />
      <StudyLibrarySection />
      <StudyTransition />
      <NextSteps items={studyNext} />
    </PageShell>
  );
}
