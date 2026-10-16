import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { NextSteps } from "@/components/resources/Kit";
import { CareerTrackQuiz } from "@/components/resources/tools/CareerTrackQuiz";
import { ToolHero, ToolPanel } from "@/components/resources/tools/ToolKit";
import { careerHero, careerNext } from "@/lib/resources/tools/careerTrack";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Find My Career Track — Free IT & CAD Career Quiz | ${site.name} ${site.city}`,
  description:
    "Four quick questions to find your best-fit IT or CAD track: full stack, AI & data, cyber security & cloud, digital marketing, CAD or core programming. Get a matched course and a free 90-day roadmap.",
};

export default function CareerTrackPage() {
  return (
    <PageShell>
      <ToolHero
        crumb="Career track"
        eyebrow={careerHero.eyebrow}
        title={
          <>
            Find my IT / CAD <span className="text-shine">career track.</span>
          </>
        }
        text={careerHero.text}
        badges={careerHero.badges}
      />
      <ToolPanel label="Career track quiz">
        <CareerTrackQuiz />
      </ToolPanel>
      <NextSteps items={careerNext} />
    </PageShell>
  );
}
