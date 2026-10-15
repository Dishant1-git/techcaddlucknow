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
import { DomainPicker } from "@/components/InternshipDomain";
import {
  CompareDurations,
  InternshipHero,
  TrainingPath,
  TrainingReceive,
} from "@/components/Internship";
import { Motion } from "@/components/Motion";
import { PhotoStrip, photoSets } from "@/components/PhotoStrip";
import {
  SixMonthDifference,
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

// Two kinds of page share this route: the duration programmes (45 Days
// / 6 Weeks and 6 Months) from `programmes`, and the per-course training pages from
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
}: PageProps<"/internship-training-in-lucknow/[slug]">): Promise<Metadata> {
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

export default async function TrainingPage({ params }: PageProps<"/internship-training-in-lucknow/[slug]">) {
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
          <DomainPicker duration={p.slug} label={p.duration} title={sixMonths.domains.title} text={sixMonths.domains.intro} />
          <SixMonthRoadmap />
          <SixMonthDifference />
          <SixMonthProjects />
          <SixMonthProcess />
          <SixMonthPaperwork />
          <SixMonthOutcomes />
          <PhotoStrip
            eyebrow="Inside the lab"
            title={<>Six months of <span className="text-gradient">real work</span></>}
            text="Project rooms, mentor reviews and hands-on builds — real photos from techcadd labs."
            photos={photoSets.internship}
          />
          <SixMonthVisit />
          <SixMonthFaq />
          <CompareDurations current={p.slug} />
          <Cta />
        </main>
      ) : p ? (
        <main>
          <InternshipHero programme={p} />
          <DomainPicker duration={p.slug} label={p.duration} />
          <TrainingPath />
          <TrainingReceive />
          <PhotoStrip
            title={<>Where interns <span className="text-gradient">train</span></>}
            text="Live projects, mentor reviews and team work — real photos from techcadd labs."
            photos={photoSets.internship}
          />
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
          <PhotoStrip
            title={<>Where you will <span className="text-gradient">learn</span></>}
            text="Mentor-led labs, small groups and workshops — real photos from techcadd batches."
            photos={photoSets.labs}
          />
          <Cta />
        </main>
      )}
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
