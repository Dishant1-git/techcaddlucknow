import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { HeroActions, NextSteps } from "@/components/resources/Kit";
import { ToolHero } from "@/components/resources/tools/ToolKit";
import { LearningHubs, ToolGrid } from "@/components/resources/tools/ToolsHub";
import { hubHero, hubNext } from "@/lib/resources/tools/hub";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Free IT & Career Tools — Salary Estimator, Career Quiz & Training Matcher | ${site.name} ${site.city}`,
  description: `Free career tools by ${site.name} ${site.city}: tech salary ranges, a 4-question career-track quiz, an industrial training matcher, AI interview practice, a CGPA to percentage calculator and a cold email generator.`,
};

export default function ToolsPage() {
  return (
    <PageShell>
      <ToolHero
        eyebrow={hubHero.eyebrow}
        title={
          <>
            Interactive IT career tools &amp; <span className="text-shine">calculators.</span>
          </>
        }
        text={hubHero.text}
        badges={hubHero.badges}
      >
        <HeroActions secondary={{ label: "Take the career quiz", href: resourceRoutes.careerTrack }} />
      </ToolHero>
      <ToolGrid />
      <div className="h-20 lg:h-28" />
      <LearningHubs />
      <NextSteps items={hubNext} />
    </PageShell>
  );
}
