import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { HeroIntro } from "@/components/resources/Kit";
import { HeroActions, HeroBadges, NextSteps, StatBand } from "@/components/resources/Kit";
import {
  PlacementReadiness,
  PlacementServices,
  PlacementShowcase,
  PlacementStories,
} from "@/components/resources/PlacementsPage";
import { placementLinks, placementServices, placementStats } from "@/lib/resources/placements";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Placements — Placement Assistance & Hiring Partners | ${site.name} ${site.city}`,
  description: `How the ${site.name} placement cell works: profile rebuilds, mock interviews, aptitude and DSA drills and hiring drives with partner companies — plus placement records from across the ${site.name} network.`,
};

export default function PlacementsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Placements" title="Placements" crumbs={[{ label: "Placements" }]}>
        <HeroIntro
          eyebrow="Placement cell"
          title={
            <>
              Placement support that does not end at <span className="text-shine">the certificate.</span>
            </>
          }
          text="Our placement cell works with every student until they are placed — rebuilding profiles, running mock interviews and putting candidates in front of hiring partners."
        >
          <HeroBadges items={placementServices.items.map((i) => i.title)} />
          <HeroActions
            primary="Talk to the placement cell"
            secondary={{ label: "See placement records", href: `${resourceRoutes.placements}#placement-records` }}
          />
        </HeroIntro>
      </PageHero>
      <StatBand items={placementStats} />
      <PlacementServices />
      <PlacementReadiness />
      <PlacementShowcase />
      <PlacementStories />
      <NextSteps items={placementLinks} />
    </PageShell>
  );
}
