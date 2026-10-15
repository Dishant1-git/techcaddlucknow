import type { Metadata } from "next";
import { notFound } from "next/navigation";
<<<<<<< Updated upstream
import { Faq } from "@/components/Faq";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import {
  CompareDurations,
  InternshipHero,
  TrainingPath,
  TrainingReceive,
  TrainingTracks,
} from "@/components/Internship";
import { Motion } from "@/components/Motion";
import { Cta } from "@/components/Sections";
import { programmes, site } from "@/lib/site";

// Same approach as the course pages: built ahead of time, real 404 otherwise.
export const ensureStatic = "navigation";
export const instant = false;

const find = (slug: string) => programmes.find((p) => p.slug === slug);

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
=======
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
import { getTraining, trainingSlugList } from "@/lib/courses";
import { site } from "@/lib/site";

// Every Internship & Training page is built ahead of time, so an unknown slug
// waits for the full render and gets a real 404 instead of a streamed "not found".
export const ensureStatic = "navigation";
// The slug is read outside <Suspense> on purpose (that is what makes the 404
// possible), so the dev-only "instant navigation" check is switched off here.
export const instant = false;

export function generateStaticParams() {
  return trainingSlugList.map((slug) => ({ slug }));
>>>>>>> Stashed changes
}

export async function generateMetadata({
  params,
}: PageProps<"/internship-training/[slug]">): Promise<Metadata> {
<<<<<<< Updated upstream
  const p = find((await params).slug);
  if (!p) return {};
  return {
    title: `${p.duration} ${p.title} in ${site.city} | ${site.name}`,
    description: `${p.text} ${p.bestFor}`,
  };
}

export default async function ProgrammePage({ params }: PageProps<"/internship-training/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();
=======
  const course = getTraining((await params).slug);
  if (!course) return {};
  return {
    title: `${course.title} in ${site.city} | ${site.name}`,
    description: course.summary,
  };
}

export default async function TrainingPage({ params }: PageProps<"/internship-training/[slug]">) {
  const course = getTraining((await params).slug);
  if (!course) notFound();
>>>>>>> Stashed changes

  return (
    <>
      <TopBar />
      <Header />
<<<<<<< Updated upstream
      <main data-theme="internship">
        <InternshipHero programme={p} />
        <TrainingTracks duration={p.duration} />
        <TrainingPath />
        <TrainingReceive />
        <CompareDurations current={p.slug} />
        <Faq />
=======
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
>>>>>>> Stashed changes
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
