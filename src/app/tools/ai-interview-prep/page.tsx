import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { NextSteps } from "@/components/resources/Kit";
import { Bottlenecks, InterviewAdvantage, InterviewTracks } from "@/components/resources/tools/InterviewPrep";
import { InterviewPrepTool } from "@/components/resources/tools/InterviewPrepTool";
import { ToolFaqs, ToolHero, ToolPanel, ToolSteps } from "@/components/resources/tools/ToolKit";
import { interviewFaqs, interviewHero, interviewNext, prepSteps } from "@/lib/resources/tools/interviewPrep";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `AI Interview Prep — Free Interview Questions with Model Answers | ${site.name} ${site.city}`,
  description: `Free AI interview practice from ${site.name} ${site.city}: pick a track, role and experience level and get technical or behavioural interview questions, each with a model answer and what the interviewer is looking for.`,
};

export default function InterviewPrepPage() {
  return (
    <PageShell>
      <ToolHero
        crumb="AI interview prep"
        eyebrow={interviewHero.eyebrow}
        title={
          <>
            Stop failing tech interviews. <span className="text-shine">Master them with AI.</span>
          </>
        }
        text={interviewHero.text}
        badges={interviewHero.badges}
      />
      <ToolPanel id="interview-tool" label="AI interview question generator" wide>
        <InterviewPrepTool />
      </ToolPanel>
      <Bottlenecks />
      <ToolSteps
        eyebrow="Step-by-step"
        title={
          <>
            How to practise and <span className="text-gradient">crack your interview</span>
          </>
        }
        text="A simple, repeatable routine: specific questions, honest practice, then compare."
        steps={prepSteps}
      />
      <InterviewTracks />
      <InterviewAdvantage />
      <ToolFaqs
        eyebrow="Got questions?"
        title={
          <>
            Frequently asked questions about <span className="text-gradient">AI interview prep</span>
          </>
        }
        items={interviewFaqs}
      />
      <NextSteps items={interviewNext} />
    </PageShell>
  );
}
