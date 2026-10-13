import type { Metadata } from "next";
import {
  Appreciation,
  Connect,
  FounderIntro,
  Leadership,
  MeetFounder,
  Reels,
  Roles,
  StageReel,
  Story,
} from "@/components/Founder";
import { PageHero, PageShell } from "@/components/PageShell";
import { founder } from "@/lib/about";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${founder.name} — Founder of ${site.name} | Entrepreneur, Mentor & Career Coach`,
  description: `Meet ${founder.name}, founder of ${site.name}: from driving an auto through engineering to building a technology training institute. His story, philosophy and the people he has inspired.`,
};

export default function FounderPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Founder"
        title=""
        crumbs={[{ label: "About", href: "/about" }, { label: "Founder" }]}
        className="[&>div:last-child]:pb-20 lg:[&>div:last-child]:pb-28"
      >
        <FounderIntro />
      </PageHero>
      <MeetFounder />
      <StageReel />
      <Roles />
      <Story />
      <Leadership />
      <Appreciation />
      <Reels />
      <Connect />
    </PageShell>
  );
}
