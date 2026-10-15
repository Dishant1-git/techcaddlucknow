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
  RelatedCourses,
  Toolchain,
} from "@/components/CourseDetail";
import {
  CourseAudienceNote,
  CourseTakeaways,
  CourseWhyProgramme,
  CourseWhyUs,
} from "@/components/CourseGuide";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Cta } from "@/components/Sections";
import { programmeSlugList, getProgramme } from "@/lib/courses";
import { site } from "@/lib/site";

// Every programme page is built ahead of time, so an unknown slug waits for the
// full render and gets a real 404 instead of a streamed "not found".
export const ensureStatic = "navigation";
// The slug is read outside <Suspense> on purpose (that is what makes the 404
// possible), so the dev-only "instant navigation" check is switched off here.
export const instant = false;

export function generateStaticParams() {
  return programmeSlugList.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/after-12th-courses/[slug]">): Promise<Metadata> {
  const course = getProgramme((await params).slug);
  if (!course) return {};
  return {
    title: `${course.title} in ${site.city} | ${site.name}`,
    description: course.summary,
  };
}

export default async function ProgrammePage({ params }: PageProps<"/after-12th-courses/[slug]">) {
  const course = getProgramme((await params).slug);
  if (!course) notFound();

  return (
    <>
      <TopBar />
      <Header />
      <main data-theme={course.theme}>
        <CourseHero course={course} />
        <CourseOverview course={course} />
        {/* Programmes with a content brief add its sections (CourseGuide.tsx). */}
        {course.guide && <CourseAudience course={course} deal />}
        <CourseAudienceNote course={course} />
        <CourseWhyProgramme course={course} />
        <CourseSyllabus course={course} />
        <Toolchain course={course} />
        <CourseTakeaways course={course} />
        {!course.guide && <CourseAudience course={course} deal />}
        <CourseProjects course={course} />
        <CourseWhyUs course={course} />
        <CourseOutcomes course={course} />
        <CourseFaq course={course} />
        <RelatedCourses course={course} />
        <Cta course={course.label} />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
