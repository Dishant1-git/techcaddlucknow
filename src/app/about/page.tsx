import type { Metadata } from "next";
import {
  Approach,
  Belief,
  CampusGallery,
  Difference,
  Ecosystem,
  Journey,
  LearningPath,
  LeadershipTeam,
  Recognition,
  SkillDomains,
  WhoWeAre,
  WhoWeTeach,
} from "@/components/AboutPage";
import { PageHero, PageShell } from "@/components/PageShell";
import { Stats } from "@/components/Stats";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.name} ${site.city} | Our People, Story & Approach`,
  description: `Learn about ${site.name} ${site.city} — who we are, who we teach, what makes our training different, our recognitions and a decade of building technology careers.`,
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About us"
        crumbs={[{ label: "About" }]}
        title={
          <>
            Learn about our people, our story and how we turn{" "}
            <span className="text-shine">skills into careers.</span>
          </>
        }
      />
      <Stats />
      <WhoWeAre />
      <Ecosystem />
      <WhoWeTeach />
      <LearningPath />
      <Difference />
      <SkillDomains />
      <Approach />
      <Recognition />
      <Journey />
      <LeadershipTeam />
      <CampusGallery />
      <Belief />
    </PageShell>
  );
}
