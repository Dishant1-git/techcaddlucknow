import { About } from "@/components/About";
import { CampusLife } from "@/components/CampusLife";
import { Capabilities } from "@/components/Capabilities";
import { Faq } from "@/components/Faq";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import { HomeCta } from "@/components/HomeCta";
import { Motion } from "@/components/Motion";
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

export default function Home() {
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
        <KeywordRows />
        <WordSequence />
        <WhyUs />
        <CampusLife />
        <Testimonials />
        <TechStack />
        <Capabilities />
        <Faq />
        <HomeCta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
