import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { NextSteps } from "@/components/resources/Kit";
import { ToolHero, ToolPanel, ToolSteps } from "@/components/resources/tools/ToolKit";
import { HrDesk, SecurityFeatures } from "@/components/resources/tools/VerifyCertificate";
import { VerifyForm } from "@/components/resources/tools/VerifyForm";
import { verifyHero, verifyNext, verifySteps } from "@/lib/resources/tools/verifyCertificate";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Online Certificate Verification | ${site.name} ${site.city}`,
  description: `Credential verification for ${site.name} ${site.city}. Employers, HR recruiters, background verification agencies (BGV) and universities can check training certificates and internship letters by certificate or roll number.`,
};

export default function VerifyCertificatePage() {
  return (
    <PageShell>
      <ToolHero
        crumb="Verify certificate"
        eyebrow={verifyHero.eyebrow}
        title={
          <>
            Online certificate verification &amp; <span className="text-shine">credential authenticity.</span>
          </>
        }
        text={verifyHero.text}
        badges={verifyHero.badges}
      />
      <ToolPanel label="Certificate lookup">
        <VerifyForm />
      </ToolPanel>
      <div className="h-20 lg:h-28" />
      <ToolSteps
        eyebrow="Verification procedure"
        title={
          <>
            How credential <span className="text-gradient">validation works</span>
          </>
        }
        text="A standard process designed for speed, accuracy and consent-based verification for hiring teams."
        steps={verifySteps}
      />
      <SecurityFeatures />
      <HrDesk />
      <NextSteps items={verifyNext} />
    </PageShell>
  );
}
