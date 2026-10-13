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
import { Footer, WhatsAppButton } from "@/components/Footer";
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
      <main>
        <CourseHero course={course} />
        <CourseOverview course={course} />
        <CourseSyllabus course={course} />
        <CourseTools course={course} />
        <CourseAudience course={course} />
        <CourseProjects course={course} />
        <CourseOutcomes course={course} />
        <CourseFaq course={course} />
        <RelatedCourses course={course} />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
