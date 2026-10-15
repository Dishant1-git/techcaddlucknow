import type { Metadata } from "next";
import { CourseCatalogue } from "@/components/CourseCatalogue";
import { Reviews, WhyTechcadd } from "@/components/CourseGuide";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Cta } from "@/components/Sections";
import { mixedReviews } from "@/lib/courses";
import { after12thCatalogue, after12thHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `After 12th IT & AI Career Courses in ${site.city} | ${site.name}`,
  description: `Start a tech career straight after 12th at ${site.name} ${site.city} — 3-, 6- and 9-month programmes and one-year certificates in AI, cloud, cyber security, software and digital marketing.`,
};

// Which course logo each programme borrows, matched on the start of its name.
const logos = [
  ["Cloud Computing", "Cloud Computing"],
  ["Flutter", "Flutter"],
  ["MERN", "MERN Full Stack"],
  ["Agentic AI", "Agentic AI"],
  ["Digital Marketing", "Digital Marketing"],
  ["Data Analytics", "Data Analytics"],
  ["Data Science", "Data Science"],
  ["AI & Data Science", "Data Science"],
  ["Cyber", "Cyber Security"],
  ["Artificial Intelligence", "Artificial Intelligence"],
  ["Full Stack", "Full Stack Development"],
  ["Generative AI", "Generative AI"],
  ["Machine Learning", "Machine Learning"],
  ["Python", "Python Programming"],
];

const sections = after12thCatalogue.map((cat) => ({
  ...cat,
  courses: cat.courses.map((c) => ({
    label: c.label,
    href: after12thHref(c.slug),
    logo: logos.find(([start]) => c.label.startsWith(start))?.[1],
  })),
}));

export default function After12thPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <CourseCatalogue
          eyebrow="After 12th"
          title="After 12th IT & AI Career Courses"
          text="Build your tech career early with structured 3-, 6- and 9-month tracks and one-year certificates in AI, cloud, cyber security, software and digital growth skills."
          sections={sections}
          noun="programmes"
        />
        <WhyTechcadd label="a career course after 12th" />
        <Reviews items={mixedReviews()} />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
