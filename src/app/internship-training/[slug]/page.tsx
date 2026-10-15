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
import {
  SixMonthDifference,
  SixMonthDomains,
  SixMonthFaq,
  SixMonthHero,
  SixMonthOutcomes,
  SixMonthOverview,
  SixMonthPaperwork,
  SixMonthProcess,
  SixMonthProjects,
  SixMonthRoadmap,
  SixMonthVisit,
  SixMonthWhoAndWhy,
} from "@/components/SixMonthInternship";
import { Cta } from "@/components/Sections";
import { getTraining, trainingSlugList } from "@/lib/courses";
import { sixMonths } from "@/lib/internship6m";
import { programmes, site } from "@/lib/site";

// Two kinds of page share this route: the duration programmes (45 Days,
// 6 Weeks, ...) from `programmes`, and the per-course training pages from
// trainingContent.json. Their slugs don't overlap.
// Every page is built ahead of time, so an unknown slug waits for the full
// render and gets a real 404 instead of a streamed "not found".
export const ensureStatic = "navigation";
// The slug is read outside <Suspense> on purpose (that is what makes the 404
// possible), so the dev-only "instant navigation" check is switched off here.
export const instant = false;

const findProgramme = (slug: string) => programmes.find((p) => p.slug === slug);

export function generateStaticParams() {
  return [...programmes.map((p) => p.slug), ...trainingSlugList].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/internship-training/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = findProgramme(slug);
  if (p?.slug === "6-months") return sixMonths.meta;
  if (p) {
    return {
      title: `${p.duration} ${p.title} in ${site.city} | ${site.name}`,
      description: `${p.text} ${p.bestFor}`,
    };
  }
  const course = getTraining(slug);
  if (!course) return {};
  return {
    title: `${course.title} in ${site.city} | ${site.name}`,
    description: course.summary,
  };
}

export default async function TrainingPage({ params }: PageProps<"/internship-training/[slug]">) {
  const { slug } = await params;
  const p = findProgramme(slug);
  const course = p ? undefined : getTraining(slug);
  if (!p && !course) notFound();

  return (
    <>
      <TopBar />
      <Header />
      {p?.slug === "6-months" ? (
        // The six-month programme has its own long-form page (internship6m.ts).
        <main>
          <SixMonthHero />
          <SixMonthOverview />
          <SixMonthWhoAndWhy />
          <SixMonthDomains />
          <SixMonthRoadmap />
          <SixMonthDifference />
          <SixMonthProjects />
          <SixMonthProcess />
          <SixMonthPaperwork />
          <SixMonthOutcomes />
          <SixMonthVisit />
          <SixMonthFaq />
          <CompareDurations current={p.slug} />
          <Cta />
        </main>
      ) : p ? (
        <main>
          <InternshipHero programme={p} />
          <TrainingTracks duration={p.duration} />
          <TrainingPath />
          <TrainingReceive />
          <CompareDurations current={p.slug} />
          <Faq />
          <Cta />
        </main>
      ) : (
        <main>
          <CourseHero course={course!} certificate />
          <CourseOverview course={course!} />
          <CourseSyllabus course={course!} />
          <Toolchain course={course!} />
          <CourseAudience course={course!} />
          <CourseProjects course={course!} />
          <CourseOutcomes course={course!} />
          <CourseFaq course={course!} />
          <RelatedCourses course={course!} />
          <Cta />
        </main>
      )}
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
