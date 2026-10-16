import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { NextSteps } from "@/components/resources/Kit";
import { Compliance, ProjectTracks } from "@/components/resources/tools/TrainingMatcher";
import { TrainingMatcherTool } from "@/components/resources/tools/TrainingMatcherTool";
import { ToolHero, ToolPanel } from "@/components/resources/tools/ToolKit";
import { matcherHero, matcherNext } from "@/lib/resources/tools/trainingMatcher";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Industrial Training Matcher — 6 Weeks & 6 Months Training in ${site.city} | ${site.name}`,
  description: `Pick your university, branch and semester to match with the right 6 weeks / 45 days or 6 months industrial training track in ${site.city}, with live projects, synopsis and project report support.`,
};

export default function TrainingMatcherPage() {
  return (
    <PageShell>
      <ToolHero
        crumb="Training matcher"
        eyebrow={matcherHero.eyebrow}
        title={
          <>
            6 Weeks &amp; 6 Months <span className="text-shine">training matcher.</span>
          </>
        }
        text={matcherHero.text}
        badges={matcherHero.badges}
      />
      <ToolPanel label="Training matcher" wide>
        <TrainingMatcherTool />
      </ToolPanel>
      <ProjectTracks />
      <Compliance />
      <NextSteps items={matcherNext} />
    </PageShell>
  );
}
