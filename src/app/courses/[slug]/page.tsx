import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import {
  CourseAudienceNote,
  CourseTakeaways,
  CourseWhyProgramme,
  CourseReviews,
  CourseWhyUs,
} from "@/components/CourseGuide";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { PhotoStrip, photoSets } from "@/components/PhotoStrip";
import { Header, TopBar } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Cta } from "@/components/Sections";
import { courseSlugList, getCourse } from "@/lib/courses";
import { site } from "@/lib/site";

// Every course page is built ahead of time, so an unknown slug waits for the
// full render and gets a real 404 instead of a streamed "not found".
export const ensureStatic = "navigation";
// The slug is read outside <Suspense> on purpose (that is what makes the 404
// possible), so the dev-only "instant navigation" check is switched off here.
export const instant = false;

export function generateStaticParams() {
  return courseSlugList.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return {
    title: `${course.title} in ${site.city} | ${site.name}`,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <>
      <TopBar />
      <Header />
      {/* The page palette: AI courses have their own (globals.css) */}
      <main data-theme={course.theme}>
        <CourseHero course={course} />
        <CourseOverview course={course} />
        {/* Courses with a content brief add its sections (CourseGuide.tsx). */}
        {course.guide && <CourseAudience course={course} />}
        <CourseAudienceNote course={course} />
        <CourseWhyProgramme course={course} />
        <CourseSyllabus course={course} />
        <CourseTools course={course} />
        <CourseTakeaways course={course} />
        {!course.guide && <CourseAudience course={course} />}
        <CourseProjects course={course} />
        <CourseWhyUs course={course} />
        <CourseOutcomes course={course} />
        <CourseReviews course={course} />
        <CourseFaq course={course} />
        <RelatedCourses course={course} />
        <PhotoStrip
          title={<>Where you will <span className="text-gradient">learn</span></>}
          text="Mentor-led labs, small groups and workshops — real photos from techcadd batches."
          photos={course.theme === "ai" ? photoSets.ai : photoSets.labs}
        />
        <Cta course={course.label} enquiry={course.guide?.enquiry} />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
