import type { Metadata } from "next";
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
import { PhotoStrip, photoSets } from "@/components/PhotoStrip";
import { Cta } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Internship & Industrial Training in ${site.city} | 45 Days & 6 Months — ${site.name}`,
  description: `Industrial training and internships at ${site.name} ${site.city}: 45-day (six-week) and 6-month programmes in 14 domains, with projects, a certificate and the documents colleges ask for.`,
};

export default function InternshipPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <InternshipHero />
        <CompareDurations />
        <TrainingTracks />
        <TrainingPath />
        <TrainingReceive />
        <PhotoStrip
          title={<>Where interns <span className="text-gradient">train</span></>}
          text="Live projects, mentor reviews and team work — real photos from techcadd labs."
          photos={photoSets.internship}
        />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
