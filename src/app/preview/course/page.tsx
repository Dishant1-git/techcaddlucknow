// A course draft from the CMS editor, rendered exactly as /courses/[slug] would.
import { Suspense } from "react";
import { CourseView } from "@/components/CourseView";
import { courseFromDraft, getCourseReviews } from "@/lib/cms/courses";
import type { CmsCourse } from "@/lib/cms/types";
import { readDraft } from "@/lib/preview/store";

async function Draft({ searchParams }: { searchParams: PageProps<"/preview/course">["searchParams"] }) {
  const token = (await searchParams).d;
  const draft = readDraft<Partial<CmsCourse>>("course", typeof token === "string" ? token : undefined);
  if (!draft) return <Waiting />;
  const course = await courseFromDraft(draft);
  return <CourseView course={course} reviews={await getCourseReviews(course.slug)} />;
}

function Waiting() {
  return <p className="grid min-h-svh place-items-center bg-hero-950 text-slate-300">Waiting for the editor…</p>;
}

export default function CoursePreview({ searchParams }: PageProps<"/preview/course">) {
  return (
    <Suspense fallback={<Waiting />}>
      <Draft searchParams={searchParams} />
    </Suspense>
  );
}
