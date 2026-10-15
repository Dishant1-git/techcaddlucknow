import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import {
  DomainCareers,
  DomainFaq,
  DomainHero,
  DomainOverview,
  DomainProjects,
  DomainRoadmap,
  DomainTopics,
  DomainWhy,
  OtherDomains,
} from "@/components/InternshipDomain";
import { Motion } from "@/components/Motion";
import { PhotoStrip } from "@/components/PhotoStrip";
import { Cta } from "@/components/Sections";
import {
  SixMonthDifference,
  SixMonthPaperwork,
  SixMonthProcess,
  SixMonthVisit,
} from "@/components/SixMonthInternship";
import { domainPage, domainParams } from "@/lib/internshipDomains";
import { site } from "@/lib/site";

// A domain of one duration's programme:
// /internship-training-in-lucknow/<duration>/<domain>. As on the parent route,
// every page is built ahead of time so an unknown domain gets a real 404.
export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return domainParams;
}

export async function generateMetadata({
  params,
}: PageProps<"/internship-training-in-lucknow/[slug]/[domain]">): Promise<Metadata> {
  const { slug, domain } = await params;
  return domainPage(slug, domain)?.meta ?? {};
}

export default async function InternshipDomainPage({ params }: PageProps<"/internship-training-in-lucknow/[slug]/[domain]">) {
  const { slug, domain } = await params;
  const d = domainPage(slug, domain);
  if (!d) notFound();

  return (
    <>
      <TopBar />
      <Header />
      <main>
        <DomainHero domain={d} />
        <DomainOverview domain={d} />
        <DomainWhy domain={d} />
        <DomainTopics domain={d} />
        <DomainRoadmap domain={d} />
        <SixMonthDifference />
        <DomainProjects domain={d} />
        <SixMonthProcess title={`How to apply for the ${d.programme.duration} ${d.label} internship in ${site.city}`} />
        <SixMonthPaperwork />
        <DomainCareers domain={d} />
        <PhotoStrip
          eyebrow="Inside the lab"
          title={<>Where {d.label} interns <span className="text-gradient">train</span></>}
          text="Mentor reviews, project rooms and hands-on practice — real photos from techcadd labs."
          photos={d.photos}
        />
        <SixMonthVisit title={`${d.programme.duration} ${d.label} internship in ${site.city}`} />
        <DomainFaq domain={d} />
        <OtherDomains domain={d} />
        <Cta course={d.course} />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
