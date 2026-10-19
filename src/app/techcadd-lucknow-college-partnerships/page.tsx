import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/PageShell";
import { HeroActions, NextSteps, StatBand } from "@/components/resources/Kit";
import { CallbackStrip } from "@/components/resources/CallbackStrip";
import { HeroIntro } from "@/components/resources/Kit";
import { CategoriesBar } from "@/components/resources/ResourceCategories";
import { PartnerCta, PartnershipFormats, PartnershipSteps } from "@/components/resources/Partnerships";
import { partnershipStats, partnershipsHero, partnershipsNext } from "@/lib/resources/partnerships";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `College Partnerships — Campus Workshops, Industrial Training & Placements | ${site.name} ${site.city}`,
  description: `Partner with ${site.name} ${site.city} for campus workshops, university-mandated industrial training, faculty development programmes and joint placement drives across ${site.region}.`,
};

export default function PartnershipsPage() {
  return (
    <PageShell>
      <PageHero eyebrow={partnershipsHero.eyebrow} title={null} crumbs={[{ label: "College Partnerships" }]}>
        <HeroIntro
          eyebrow={partnershipsHero.eyebrow}
          title={
            <>
              Training programmes designed for universities,{" "}
              <span className="text-shine">run on your schedule.</span>
            </>
          }
          text={partnershipsHero.text}
        >
          <HeroActions primary="Request a proposal" />
        </HeroIntro>
      </PageHero>
      <CategoriesBar current="partnerships" />
      <StatBand items={partnershipStats} />
      {/* TODO: replace with Lucknow branch partner institutions — the content
          file's college list belongs to the Mohali branch, so it is left out. */}
      <PartnershipFormats />
      <PartnershipSteps />
      <PartnerCta />
      <NextSteps items={partnershipsNext} />
      <CallbackStrip />
    </PageShell>
  );
}
