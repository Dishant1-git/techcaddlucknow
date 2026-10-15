import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewsFor, WhyTechcadd } from "@/components/CourseGuide";
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
import {
  T45Faq,
  T45Hero,
  T45Outcomes,
  T45Overview,
  T45Practical,
  T45Process,
  T45Projects,
  T45Syllabus,
  T45Why,
} from "@/components/Training45";
import { relatedGuide } from "@/lib/courses";
import { domainPage, domainParams } from "@/lib/internshipDomains";
import { training45 } from "@/lib/training45";
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
  const d = domainPage(slug, domain);
  const plan = slug === "45-days" ? training45(domain) : undefined;
  if (d && plan) {
    return {
      title: `45 Days ${plan.name} Training in ${site.city} | ${site.name}`,
      description: `Explore 45 days of ${plan.name} training in ${site.city} for college students: ${plan.tools}. View the day-by-day syllabus, projects and eligibility.`,
    };
  }
  return d?.meta ?? {};
}

export default async function InternshipDomainPage({ params }: PageProps<"/internship-training-in-lucknow/[slug]/[domain]">) {
  const { slug, domain } = await params;
  const d = domainPage(slug, domain);
  if (!d) notFound();

  // The 45-day track has its own day-by-day training page (training45.ts).
  const plan = slug === "45-days" ? training45(domain) : undefined;
  if (plan) {
    return (
      <>
        <TopBar />
        <Header />
        <main>
          <T45Hero domain={d} plan={plan} />
          <T45Overview domain={d} plan={plan} />
          <T45Why domain={d} plan={plan} />
          <T45Syllabus domain={d} plan={plan} />
          <T45Projects domain={d} plan={plan} />
          <T45Process />
          <T45Practical domain={d} plan={plan} />
          <T45Outcomes domain={d} plan={plan} />
          <WhyTechcadd label={d.label} us={relatedGuide(d.label)?.guide.whyUs} />
          <ReviewsFor name={d.label} />
          <PhotoStrip
            eyebrow="Inside the lab"
            title={<>Where you will <span className="text-gradient">train</span></>}
            text="Mentor reviews, project rooms and hands-on practice — real photos from techcadd labs."
            photos={d.photos}
          />
          <SixMonthVisit title={`45-day ${plan.name} training in ${site.city}`} />
          <T45Faq domain={d} plan={plan} />
          <OtherDomains domain={d} />
          <Cta course={d.course} />
        </main>
        <Footer />
        <WhatsAppButton />
        <Motion />
      </>
    );
  }

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
        <WhyTechcadd label={d.label} us={relatedGuide(d.label)?.guide.whyUs} />
        <ReviewsFor name={d.label} />
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
