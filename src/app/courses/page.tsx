import type { Metadata } from "next";
import { CourseCatalogue } from "@/components/CourseCatalogue";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Cta } from "@/components/Sections";
import { getCourseCatalogue } from "@/lib/cms/courses";
import { site } from "@/lib/site";
import { courseLogos, pickLogos } from "@/lib/techLogos";

export const metadata: Metadata = {
  title: `Best IT, AI & Software Courses in ${site.city} | ${site.name}`,
  description: `Browse every course at ${site.name} ${site.city} — programming, AI and data, digital marketing, cyber security, cloud and CAD — with mentor-led labs, live projects and placement support.`,
};

export default async function CoursesPage() {
  // The bundled catalogue, plus courses published in the CMS.
  const sections = await getCourseCatalogue();
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <CourseCatalogue
          eyebrow="Courses"
          title="Best IT, AI & Software Courses"
          text="From AI and data to full-stack and cloud, each track is built like real industry work: mentor-led labs, live projects, interview-focused outcomes and placement support."
          sections={sections}
          logos={pickLogos(courseLogos, sections.flatMap((s) => s.courses.map((c) => c.logo ?? c.label)))}
        />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
