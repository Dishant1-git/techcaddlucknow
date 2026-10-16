import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { NextSteps, Note } from "@/components/resources/Kit";
import { SalaryTool } from "@/components/resources/tools/SalaryTool";
import { ToolHero, ToolPanel } from "@/components/resources/tools/ToolKit";
import { salaryHero, salaryNext } from "@/lib/resources/tools/salary";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `IT & Tech Salary Estimator — ${site.city}, Delhi NCR & Remote | ${site.name} ${site.city}`,
  description: `Free tech salary estimator. Compare indicative fresher and 2-year salary ranges for full stack, Python, AI / ML, data, cyber security, cloud and CAD roles in ${site.city}, Delhi NCR and remote work.`,
};

export default function SalaryEstimatorPage() {
  return (
    <PageShell>
      <ToolHero
        crumb="Salary estimator"
        eyebrow={salaryHero.eyebrow}
        title={
          <>
            Salary &amp; career <span className="text-shine">growth estimator.</span>
          </>
        }
        text={salaryHero.text}
        badges={salaryHero.badges}
      />
      <ToolPanel label="Salary estimator" wide>
        <SalaryTool />
      </ToolPanel>
      <div className="px-5 pt-6">
        <Note>
          These ranges are indicative estimates, not offers or guarantees. They are compiled from public job-market
          listings and will vary with the employer, your skills, your projects and how you perform in interviews.
        </Note>
      </div>
      <NextSteps items={salaryNext} />
    </PageShell>
  );
}
