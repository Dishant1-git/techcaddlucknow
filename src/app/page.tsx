import { About } from "@/components/About";
import { CampusLife } from "@/components/CampusLife";
import { Capabilities } from "@/components/Capabilities";
import { Faq } from "@/components/Faq";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import { HomeCta } from "@/components/HomeCta";
import { Motion } from "@/components/Motion";
import { HomeBlog } from "@/components/resources/BlogPage";
import {
  Doors,
  HeroZoom,
  KeywordRows,
  ProgrammePanels,
  WordSequence,
} from "@/components/Scrolly";
import {
  AiSection,
  CourseTracks,
  Fields,
  Process,
  Testimonials,
  WhyUs,
} from "@/components/Sections";
import { Stats } from "@/components/Stats";
import { TechStack } from "@/components/TechStack";
import { CategoryCards, FeaturedCourses } from "@/components/cms/HomeSections";
import { getHomeFaqs, getPosts, getTestimonials } from "@/lib/cms/content";
import { getCategories, getFeaturedCourses } from "@/lib/cms/courses";
import { capabilities, technologies } from "@/lib/site";
import { pickLogos, techLogos } from "@/lib/techLogos";

export default async function Home() {
  const [posts, testimonials, faqs, featured, categories] = await Promise.all([
    getPosts(),
    getTestimonials(),
    getHomeFaqs(),
    getFeaturedCourses(),
    getCategories(),
  ]);
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <HeroZoom />
        <Doors />
        <Stats />
        <AiSection />
        <About />
        <ProgrammePanels />
        <Process />
        <Fields />
        <CourseTracks />
        {/* From the CMS: categories as cards, and courses marked "featured". */}
        <CategoryCards categories={categories} />
        <FeaturedCourses courses={featured} />
        <KeywordRows />
        <WordSequence />
        <WhyUs />
        <CampusLife />
        <Testimonials items={testimonials} />
        <TechStack logos={pickLogos(techLogos, technologies.map((t) => t.name))} />
        <Capabilities logos={pickLogos(techLogos, capabilities.flatMap((c) => c.tools.map(([name]) => name)))} />
        <HomeBlog posts={posts.slice(0, 3)} />
        <Faq items={faqs} />
        <HomeCta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
