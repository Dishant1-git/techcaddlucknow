import Image from "next/image";
import {
  ArrowRight,
  Check,
  Eye,
  Globe,
  GraduationCap,
  Hammer,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { futureFields, missionPoints, visionPoints } from "@/lib/about";
import { site } from "@/lib/site";
import { DarkSection, Eyebrow, Heading, LightSection } from "./ui";

const missionIcons = [GraduationCap, Hammer, Users, TrendingUp, Globe];

export function Mission() {
  return (
    <LightSection id="mission">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>Our Mission</Eyebrow>
          <Heading className="mt-5">
            Bridging Education <span className="text-gradient">with Industry</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            Our mission is to build a strong training ecosystem where learners can
            access advanced technology, practical exposure, and industry-relevant
            skills that prepare them for real-world opportunities.
          </p>
          <div
            data-reveal
            className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-hero-950/5"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/8 text-brand">
              <Target className="size-6" />
            </span>
            <p className="text-[15px] leading-relaxed text-slate-600">
              <span className="font-semibold text-navy">What we do daily:</span> five
              commitments that shape every batch at {site.name} {site.city}.
            </p>
          </div>
        </div>
        <div data-reveal="right" className="relative lg:pl-6">
          <div
            data-speed="0.25"
            className="absolute -right-3 -top-3 hidden h-full w-full rounded-[2rem] border border-brand/30 sm:block lg:left-9"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-hero-950/20">
            <Image
              src="/images/vision-mision-techcadd.png"
              alt={`${site.name} mission and vision`}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <ol data-stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {missionPoints.map((m, i) => {
          const Icon = missionIcons[i];
          return (
            <li
              key={m.title}
              className={`group rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl ${
                i < 3 ? "lg:col-span-2" : "lg:col-span-3"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-white transition group-hover:bg-brand">
                  <Icon className="size-5" />
                </span>
                <span className="font-display text-sm font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-navy">{m.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{m.text}</p>
            </li>
          );
        })}
      </ol>

      <p
        data-reveal
        className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-500"
      >
        This direction is consistent with {site.name}&apos;s publicly stated mission
        of developing a national and international network through franchise centres
        and providing qualitative advanced technology with practical exposure to
        improve employability.
      </p>
    </LightSection>
  );
}

export function Vision() {
  return (
    <DarkSection id="vision">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow dark>Our Vision</Eyebrow>
          <Heading dark className="mt-5">
            Building India&apos;s Future-Ready{" "}
            <span className="text-gradient">Technology Workforce</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
            {site.name} envisions contributing to an India where skilled engineers,
            technology professionals, and digitally capable young people are
            prepared to participate confidently in the evolving technology economy.
          </p>
          <ul data-stagger className="mt-8 space-y-3">
            {visionPoints.map((v) => (
              <li key={v} className="flex items-start gap-3 text-slate-200">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cyan text-hero-950">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {v}
              </li>
            ))}
          </ul>
        </div>

        {/* Callout */}
        <div
          data-reveal="scale"
          data-tilt
          className="border-glow relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-hero-900 p-9 shadow-[0_40px_100px_-30px] shadow-sky sm:p-12"
        >
          <div className="bg-grid-dark absolute inset-0 -z-10" />
          <div
            aria-hidden
            className="absolute -right-16 -top-16 -z-10 size-64 animate-spin-slow rounded-full border border-dashed border-white/20"
          />
          <span className="grid size-12 place-items-center rounded-2xl bg-white/15">
            <Eye className="size-6" />
          </span>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
            Our Vision
          </p>
          <p className="mt-3 font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
            Future-ready
            <br />
            <span className="text-shine">by 2030</span>
          </p>
          <p className="mt-8 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-slate-100">
            The organization&apos;s publicly stated vision is to help make India a
            hub of well-trained engineers and technical professionals and establish
            a globally trusted name in software and services.
          </p>
        </div>
      </div>
    </DarkSection>
  );
}

export function Future() {
  return (
    <LightSection id="future" className="text-center">
      <Eyebrow>Our Future</Eyebrow>
      <h2
        data-split
        className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2rem,5.2vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.025em] text-navy"
      >
        From learning technology to{" "}
        <span className="text-gradient">creating technology.</span>
      </h2>
      <p data-reveal className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-slate-600">
        {site.name} aims to keep evolving with emerging fields such as Artificial
        Intelligence, Cloud Computing, Cyber Security, Data Science, Automation and
        other future-facing technologies, helping learners stay relevant in a
        rapidly changing digital world.
      </p>
      <ul data-stagger className="mt-10 flex flex-wrap justify-center gap-3">
        {futureFields.map((f) => (
          <li
            key={f}
            className="rounded-full border border-brand/15 bg-brand/5 px-5 py-2.5 text-sm font-semibold text-brand"
          >
            {f}
          </li>
        ))}
      </ul>
      <div data-reveal className="mt-10">
        <a
          href="/#ai"
          className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
        >
          Explore AI courses <ArrowRight className="size-4" />
        </a>
      </div>
    </LightSection>
  );
}
