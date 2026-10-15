import type { Metadata } from "next";
import {
  Branches,
  ContactFaq,
  ContactIntro,
  ContactSteps,
  EnquiryTopics,
  VisitCampus,
} from "@/components/ContactPage";
import { PageHero, PageShell } from "@/components/PageShell";
import { SupportDesks } from "@/components/SupportDesks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact ${site.name} ${site.city} | Call, WhatsApp or Visit the Campus`,
  description: `Get in touch with ${site.name} ${site.city} for course admissions, industrial training, internships and free career counselling. Call ${site.phone}, message us on WhatsApp or visit the campus.`,
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact us"
        crumbs={[{ label: "Contact" }]}
        title={
          <>
            Talk to a counsellor and find the{" "}
            <span className="text-shine">right course for you.</span>
          </>
        }
        text="Free career counselling, a free demo class and straight answers about courses, fees, batches and placements — by phone, WhatsApp or in person."
      />
      <ContactIntro />
      <EnquiryTopics />
      <SupportDesks />
      <ContactSteps />
      <VisitCampus />
      <Branches />
      <ContactFaq />
    </PageShell>
  );
}
