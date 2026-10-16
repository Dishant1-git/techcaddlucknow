import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { HeroIntro } from "@/components/resources/Kit";
import { CallbackStrip, HeroActions, HeroBadges, NextSteps, StatBand } from "@/components/resources/Kit";
import { EventSpeakers, EventsList } from "@/components/resources/SeminarsPage";
import { resourceRoutes } from "@/lib/resources/routes";
import { eventLinks, eventStats } from "@/lib/resources/seminars";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Seminars, Workshops & IT Events | ${site.name} ${site.city}`,
  description: `Seminars, hands-on workshops and college sessions run by ${site.name} trainers across the ${site.name} network — AI, app development, robotics and career guidance, taught by industry practitioners.`,
};

export default function SeminarsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Seminars & events" title="Seminars & events" crumbs={[{ label: "Seminars & Events" }]}>
        <HeroIntro
          eyebrow="Seminars & events"
          title={
            <>
              Seminars, workshops and the days we spend <span className="text-shine">teaching in public.</span>
            </>
          }
          text={`Hands-on sessions at colleges, universities and industry events across the ${site.name} network — most of them free, all of them taught by the people who run our courses.`}
        >
          <HeroBadges items={["AI & Generative AI", "App development", "Robotics", "Career guidance"]} />
          <HeroActions
            primary="Ask about a session"
            secondary={{ label: "Host one at your college", href: resourceRoutes.partnerships }}
          />
        </HeroIntro>
      </PageHero>
      <StatBand items={eventStats} />
      <EventsList />
      <EventSpeakers />
      <NextSteps items={eventLinks} />
      <CallbackStrip />
    </PageShell>
  );
}
