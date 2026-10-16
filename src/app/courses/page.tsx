import type { Metadata } from "next";
import { CourseCatalogue } from "@/components/CourseCatalogue";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Cta } from "@/components/Sections";
import { courseCatalogue, courseHref, site } from "@/lib/site";
import { courseLogos, pickLogos } from "@/lib/techLogos";

export const metadata: Metadata = {
  title: `Best IT, AI & Software Courses in ${site.city} | ${site.name}`,
  description: `Browse every course at ${site.name} ${site.city} — programming, AI and data, digital marketing, cyber security, cloud and CAD — with mentor-led labs, live projects and placement support.`,
};

const sections = courseCatalogue.map((cat) => ({
  ...cat,
  courses: cat.courses.map((c) => ({ ...c, href: courseHref(c.label) })),
}));

export default function CoursesPage() {
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
          logos={pickLogos(courseLogos, sections.flatMap((s) => s.courses.map((c: { label: string; logo?: string }) => c.logo ?? c.label)))}
        />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
