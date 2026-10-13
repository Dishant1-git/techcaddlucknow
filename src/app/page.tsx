import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Faq } from "@/components/Faq";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Header, TopBar } from "@/components/Header";
import { Motion } from "@/components/Motion";
import {
  Doors,
  Finale,
  HeroZoom,
  KeywordRows,
  ProgrammePanels,
  WordSequence,
} from "@/components/Scrolly";
import {
  AiSection,
  CourseTracks,
  Cta,
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
        <Testimonials />
        <TechStack />
        <Capabilities />
        <Faq />
        <Finale />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
