import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { HeroIntro } from "@/components/resources/Kit";
import { HeroActions, HeroBadges, NextSteps, StatBand } from "@/components/resources/Kit";
import { CallbackStrip } from "@/components/resources/CallbackStrip";
import { EventSpeakers, EventsList } from "@/components/resources/SeminarsPage";
import { resourceRoutes } from "@/lib/resources/routes";
import { getEvents } from "@/lib/cms/content";
import { CategoriesBar } from "@/components/resources/ResourceCategories";
import { eventLinks } from "@/lib/resources/seminars";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Seminars, Workshops & IT Events | ${site.name} ${site.city}`,
  description: `Seminars, hands-on workshops and college sessions run by ${site.name} trainers across the ${site.name} network — AI, app development, robotics and career guidance, taught by industry practitioners.`,
};

export default async function SeminarsPage() {
  // CMS events first (upcoming soonest), then the bundled archive.
  const events = await getEvents();
  const count = (pred: (e: (typeof events)[number]) => boolean) => events.filter(pred).length;
  const eventStats = [
    { value: String(events.length), label: "Events listed" },
    { value: String(count((e) => e.type === "Seminar")), label: "Seminars" },
    { value: String(count((e) => e.type === "Workshop")), label: "Workshops" },
    { value: String(count((e) => e.status === "upcoming")), label: "Upcoming" },
  ];
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
      <CategoriesBar current="events" />
      <StatBand items={eventStats} />
      <EventsList events={events} />
      <EventSpeakers />
      <NextSteps items={eventLinks} />
      <CallbackStrip />
    </PageShell>
  );
}
