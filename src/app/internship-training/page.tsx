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
import { Cta } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Internship & Industrial Training in ${site.city} | 45 Days to 9 Months — ${site.name}`,
  description: `Industrial training and internships at ${site.name} ${site.city}: 45-day, 6-week, 6-month and 9-month programmes with live projects, a certificate and an internship letter on the longer tracks.`,
};

export default function InternshipPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main data-theme="internship">
        <InternshipHero />
        <CompareDurations />
        <TrainingTracks />
        <TrainingPath />
        <TrainingReceive />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
