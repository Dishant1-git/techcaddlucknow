import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { NextSteps } from "@/components/resources/Kit";
import { CgpaTables } from "@/components/resources/tools/Cgpa";
import { CgpaCalculator } from "@/components/resources/tools/CgpaCalculator";
import { ToolFaqs, ToolHero, ToolPanel } from "@/components/resources/tools/ToolKit";
import { cgpaFaqs, cgpaNext } from "@/lib/resources/tools/cgpa";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `CGPA to Percentage Calculator — × 9.5, × 10 & Custom Formulas | ${site.name} ${site.city}`,
  description: `Free CGPA to percentage calculator for B.Tech, BCA, MCA and diploma students in ${site.city}. Convert a 10-point CGPA or semester SGPAs with × 9.5, × 10, (CGPA − 0.75) × 10 or your university's own multiplier, with a placement eligibility check.`,
};

export default function CgpaPage() {
  return (
    <PageShell>
      <ToolHero
        crumb="CGPA to % calculator"
        eyebrow="Free student tool · Instant conversion"
        title={
          <>
            CGPA to percentage <span className="text-shine">calculator &amp; eligibility.</span>
          </>
        }
        text="Convert your 10-point CGPA, or your semester SGPAs, to a percentage instantly with the common conversion formulas — or your university's own multiplier."
        badges={["100% free — instant", "× 9.5, × 10 & custom formulas", "Semester SGPA to CGPA", "Placement eligibility check"]}
      />
      <ToolPanel label="CGPA to percentage calculator">
        <CgpaCalculator />
      </ToolPanel>
      <CgpaTables />
      <ToolFaqs
        title={
          <>
            Everything you need to know about <span className="text-gradient">CGPA conversion</span>
          </>
        }
        text="Clear answers on conversion rules, quoting your percentage for placements, and what to do if you're below a cut-off."
        items={cgpaFaqs}
      />
      <NextSteps items={cgpaNext} />
    </PageShell>
  );
}
