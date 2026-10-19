import { getSite } from "@/lib/cms/site";
import { NavLink } from "../../NavLink";
import { Award, Database, FileCheck2, Fingerprint, Mail, Phone } from "lucide-react";
import { bgvMailto, securityFeatures } from "@/lib/resources/tools/verifyCertificate";
import { site } from "@/lib/site";
import { Eyebrow, LightSection, SectionHeading } from "../../ui";

const featureIcons = [Fingerprint, Award, FileCheck2, Database];

export function SecurityFeatures() {
  return (
    <LightSection>
      <SectionHeading
        eyebrow="Anti-fraud & authenticity"
        title={
          <>
            Security features on every <span className="text-gradient">{site.name} credential</span>
          </>
        }
        text="We keep strict physical and digital controls on every training certificate and internship letter."
      />
      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {securityFeatures.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <article key={f.title} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.text}</p>
            </article>
          );
        })}
      </div>
    </LightSection>
  );
}

export async function HrDesk() {
  const site = await getSite(); // CMS Settings, over the built-in details
  return (
    <section className="bg-slate-50 px-5 py-16 lg:px-8 lg:py-20">
      <div
        data-reveal
        className="mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-hero-950/5 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <Eyebrow>Dedicated HR desk</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy">
            Need priority verification for urgent onboarding?
          </h2>
          <p className="mt-2 max-w-xl text-slate-600">
            Our verification desk processes corporate background checks during centre hours ({site.hours}).
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <NavLink
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-bold text-white transition hover:bg-brand"
          >
            <Phone className="size-4" /> Call {site.phone}
          </NavLink>
          <NavLink
            href={bgvMailto()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-navy transition hover:border-brand hover:text-brand"
          >
            <Mail className="size-4" /> Email {site.email}
          </NavLink>
        </div>
      </div>
    </section>
  );
}
