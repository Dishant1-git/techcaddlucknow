import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { programmes, site } from "@/lib/site";

// Same approach as the course pages: built ahead of time, real 404 otherwise.
export const ensureStatic = "navigation";
export const instant = false;

const find = (slug: string) => programmes.find((p) => p.slug === slug);

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/internship-training/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return {
    title: `${p.duration} ${p.title} in ${site.city} | ${site.name}`,
    description: `${p.text} ${p.bestFor}`,
  };
}

export default async function ProgrammePage({ params }: PageProps<"/internship-training/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();

  return (
    <>
      <TopBar />
      <Header />
      <main data-theme="internship">
        <InternshipHero programme={p} />
        <TrainingTracks duration={p.duration} />
        <TrainingPath />
        <TrainingReceive />
        <CompareDurations current={p.slug} />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
    </>
  );
}
