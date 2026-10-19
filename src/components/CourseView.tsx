// The course page, as both the live route (/courses/[slug]) and the CMS's
// live preview (/preview/course) render it — one component, so the preview
// cannot drift from the published page.
import type { ReactNode } from "react";
import {
  CourseAudience,
  CourseFaq,
  CourseHero,
  CourseOutcomes,
  CourseOverview,
  CourseProjects,
  CourseSyllabus,
  CourseTools,
  RelatedCourses,
} from "@/components/CourseDetail";
import { CourseAudienceNote, CourseTakeaways, CourseWhyProgramme, CourseWhyUs } from "@/components/CourseGuide";
import { BlockBand, SectionMedia } from "@/components/cms/Blocks";
import { CourseComparison, CoursePlans, CourseReviewList, CourseWorkflow } from "@/components/cms/CourseSections";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { PhotoStrip, photoSets } from "@/components/PhotoStrip";
import { Header, TopBar } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Cta } from "@/components/Sections";
import { isHidden, orderSections } from "@/lib/cms/courseLayout";
import { faqJsonLd, jsonLd } from "@/lib/cms/seo";
import type { Course } from "@/lib/courses";
import type { CourseReviewView } from "@/lib/cms/types";

export function CourseView({ course, reviews }: { course: Course; reviews: CourseReviewView[] }) {
  const cms = course.cms;
  const media = cms?.media ?? {};

  // Every section, by the id the CMS uses for it (lib/cms/courseLayout.ts).
  const render: Record<string, ReactNode> = {
    overview: (
      <>
        <CourseOverview course={course} />
        <SectionMedia media={media.overview} label="Highlights" />
      </>
    ),
    "who-can-do": (
      <>
        <CourseAudience course={course} />
        <CourseAudienceNote course={course} />
      </>
    ),
    "why-this-program": (
      <>
        <CourseWhyProgramme course={course} />
        <CourseWorkflow course={course} />
        <CourseComparison course={course} />
        <SectionMedia media={media["why-this-program"]} label="Why this course" />
      </>
    ),
    modules: <CoursePlans course={course} />,
    "what-you-will-learn": (
      <>
        <CourseSyllabus course={course} />
        <SectionMedia media={media["what-you-will-learn"]} label="Syllabus" />
        <CourseTakeaways course={course} />
        <SectionMedia media={media.learning} label="What you will learn" />
      </>
    ),
    tools: <CourseTools course={course} />,
    projects: (
      <>
        <CourseProjects course={course} />
        <SectionMedia media={media.projects} label="Case study" />
      </>
    ),
    "why-techcadd": <CourseWhyUs course={course} />,
    outcomes: (
      <>
        <CourseOutcomes course={course} />
        <SectionMedia media={media.outcomes} label="Career outcomes" />
        <SectionMedia media={media.certificate} label="Certificate" />
      </>
    ),
    reviews: (
      <>
        <CourseReviewList course={course} reviews={reviews} />
        <SectionMedia media={media.reviews} label="Student reviews" />
      </>
    ),
    faqs: <CourseFaq course={course} />,
    related: <RelatedCourses course={course} />,
  };

  // The default order; courses with a content brief introduce their audience earlier.
  const order = orderSections(
    [
      "overview",
      ...(course.guide ? ["who-can-do"] : []),
      "why-this-program",
      "modules",
      "what-you-will-learn",
      "tools",
      ...(course.guide ? [] : ["who-can-do"]),
      "projects",
      "why-techcadd",
      "outcomes",
      "reviews",
      "faqs",
      "related",
    ],
    cms?.sectionOrder,
  );

  const blocks = (anchor: string, placement: "before" | "after") => (
    <BlockBand blocks={cms?.blocks.filter((b) => b.anchor === anchor && b.placement === placement) ?? []} />
  );
  const around = (key: string, content: ReactNode) => (
    <div key={key} data-course-section={key} className="contents">
      {blocks(key, "before")}
      {!isHidden(key, cms?.hiddenSections) && content}
      {blocks(key, "after")}
    </div>
  );

  const showFaqs = course.faqs.length > 0 && !isHidden("faqs", cms?.hiddenSections);
  const faqSchema = cms?.seo?.faqSchema ?? true;

  return (
    <>
      <TopBar />
      <Header />
      {/* The page palette: AI courses have their own (globals.css) */}
      <main data-theme={course.theme}>
        {around("hero", <CourseHero course={course} />)}
        {order.map((key) => around(key, render[key]))}
        <PhotoStrip
          title={<>Where you will <span className="text-gradient">learn</span></>}
          text="Mentor-led labs, small groups and workshops — real photos from techcadd batches."
          photos={course.theme === "ai" ? photoSets.ai : photoSets.labs}
        />
        {blocks("cta", "before")}
        {blocks("enquiry", "before")}
        <Cta course={course.label} enquiry={course.guide?.enquiry} />
        {blocks("cta", "after")}
        {blocks("enquiry", "after")}
      </main>
      {showFaqs && faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(course.faqs)) }} />
      )}
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
