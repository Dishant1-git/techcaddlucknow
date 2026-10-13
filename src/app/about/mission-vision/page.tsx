import type { Metadata } from "next";
import { Future, Mission, Vision } from "@/components/MissionVision";
import { PageHero, PageShell } from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Mission & Vision | ${site.name} ${site.city}`,
  description: `The mission and vision of ${site.name} ${site.city} — bridging education with industry and building India's future-ready technology workforce.`,
};

export default function MissionVisionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Mission & Vision"
        crumbs={[{ label: "About", href: "/about" }, { label: "Mission & Vision" }]}
        title={
          <>
            Where we are going, and what we are{" "}
            <span className="text-shine">building towards.</span>
          </>
        }
        className="[&>div:last-child]:pb-20 lg:[&>div:last-child]:pb-28"
      />
      <Mission />
      <Vision />
      <Future />
    </PageShell>
  );
}
