import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { HeroActions, HeroBadges, NextSteps, StatBand } from "@/components/resources/Kit";
import { HeroIntro } from "@/components/resources/Kit";
import { BuildCapstone, Capstones, ProjectPillars } from "@/components/resources/StudentProjects";
import { projectStats, projectsHero, projectsNext } from "@/lib/resources/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Student Projects & Capstone Portfolio | ${site.name} ${site.city}`,
  description: `Live production projects and capstone applications built by ${site.name} ${site.city} students in AI, MERN full stack, data science, cyber security and CAD — real code, live deployments and viva-ready documentation.`,
};

export default function StudentProjectsPage() {
  return (
    <PageShell>
      <PageHero eyebrow={projectsHero.eyebrow} title={null} crumbs={[{ label: "Student Projects" }]}>
        <HeroIntro
          eyebrow={projectsHero.eyebrow}
          title={
            <>
              Student projects &amp; <span className="text-shine">capstone portfolio.</span>
            </>
          }
          text={projectsHero.text}
        >
          <HeroBadges items={projectsHero.badges} />
          <HeroActions secondary={{ label: "See the capstones", href: "#capstones" }} />
        </HeroIntro>
      </PageHero>
      <StatBand items={projectStats} />
      <ProjectPillars />
      <Capstones />
      <BuildCapstone />
      <NextSteps items={projectsNext} />
    </PageShell>
  );
}
