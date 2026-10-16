import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { InterviewBank, PracticePanels, RecruiterRules } from "@/components/resources/InterviewQa";
import { HeroActions, HeroBadges, NextSteps } from "@/components/resources/Kit";
import { HeroIntro } from "@/components/resources/Kit";
import { interviewHero, interviewNext } from "@/lib/resources/interview";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Tech Interview Questions & Answers — ${site.city} IT Placement Guide | ${site.name} ${site.city}`,
  description: `Curated technical interview questions with expert answers for Full Stack, Python, Data Science, AI, Cyber Security, Cloud and HR rounds, from the ${site.name} ${site.city} placement cell.`,
};

export default function InterviewQaPage() {
  return (
    <PageShell>
      <PageHero eyebrow={interviewHero.eyebrow} title={null} crumbs={[{ label: "Interview Questions" }]}>
        <HeroIntro
          eyebrow={interviewHero.eyebrow}
          title={
            <>
              Top tech interview questions &amp; answers for{" "}
              <span className="text-shine">IT placements.</span>
            </>
          }
          text={interviewHero.text}
        >
          <HeroBadges items={interviewHero.badges} />
          <HeroActions
            secondary={{ label: "Practise with AI", href: resourceRoutes.interviewPrep }}
          />
        </HeroIntro>
      </PageHero>
      <RecruiterRules />
      <InterviewBank />
      <PracticePanels />
      <NextSteps items={interviewNext} />
    </PageShell>
  );
}
