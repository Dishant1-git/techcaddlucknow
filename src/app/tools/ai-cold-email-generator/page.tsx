import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { NextSteps } from "@/components/resources/Kit";
import { EmailAnatomy } from "@/components/resources/tools/ColdEmail";
import { ColdEmailTool } from "@/components/resources/tools/ColdEmailTool";
import { ToolFaqs, ToolHero, ToolPanel } from "@/components/resources/tools/ToolKit";
import { coldEmailFaqs, coldEmailHero, coldEmailNext } from "@/lib/resources/tools/coldEmail";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `AI Cold Email & LinkedIn DM Generator for Tech Jobs & Internships | ${site.name} ${site.city}`,
  description: `Free cold email and LinkedIn message generator for developers, engineering students and tech freshers. Create cold emails, follow-ups and 300-character LinkedIn connection notes for internships and off-campus placements, then polish them with AI.`,
};

export default function ColdEmailPage() {
  return (
    <PageShell>
      <ToolHero
        crumb="Cold email generator"
        eyebrow={coldEmailHero.eyebrow}
        title={
          <>
            AI cold email &amp; <span className="text-shine">LinkedIn DM generator.</span>
          </>
        }
        text={coldEmailHero.text}
        badges={coldEmailHero.badges}
      />
      <ToolPanel label="Cold email and LinkedIn message generator" wide>
        <ColdEmailTool />
      </ToolPanel>
      <EmailAnatomy />
      <ToolFaqs
        title={
          <>
            Mastering cold outreach for <span className="text-gradient">tech placements</span>
          </>
        }
        text={`Insights from ${site.name} ${site.city}'s placement team on how students land off-campus interviews.`}
        items={coldEmailFaqs}
      />
      <NextSteps items={coldEmailNext} />
    </PageShell>
  );
}
