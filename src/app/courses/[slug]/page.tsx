import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseView } from "@/components/CourseView";
import { getCmsCourse, getCoursePage, getCourseReviews, getCourseSlugs } from "@/lib/cms/courses";
import { seoMetadata } from "@/lib/cms/seo";
import { site } from "@/lib/site";

// Every course page is built ahead of time, so an unknown slug waits for the
// full render and gets a real 404 instead of a streamed "not found".
export const ensureStatic = "navigation";
// The slug is read outside <Suspense> on purpose (that is what makes the 404
// possible), so the dev-only "instant navigation" check is switched off here.
export const instant = false;

// Bundled courses and the ones published in the CMS.
export async function generateStaticParams() {
  return (await getCourseSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const slug = (await params).slug;
  const course = await getCoursePage(slug);
  if (!course) return {};
  const cms = await getCmsCourse(slug);
  return seoMetadata({
    seo: cms?.seo,
    title: `${course.title} in ${site.city} | ${site.name}`,
    description: course.summary,
    path: `/courses/${slug}`,
    image: course.cms?.thumbnail?.src,
  });
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const slug = (await params).slug;
  const course = await getCoursePage(slug);
  if (!course) notFound();
  const reviews = await getCourseReviews(slug);
  return <CourseView course={course} reviews={reviews} />;
}
