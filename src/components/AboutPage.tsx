import { NavLink } from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Code,
  Compass,
  Hammer,
  Handshake,
  Layers,
  MapPin,
  Monitor,
  Rocket,
  Sparkles,
  Sprout,
  Users,
  Wrench,
} from "lucide-react";
import {
  approach,
  differences,
  learners,
  learningSteps,
  milestones,
  recognitions,
  skillDomains,
  teamPhotos,
  whatWeTeach,
} from "@/lib/about";
import { site } from "@/lib/site";
import { BookDemoButton } from "./Enquiry";
import { Gallery } from "./Gallery";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "./ui";

const differenceIcons = {
  layers: Layers,
  code: Code,
  sparkles: Sparkles,
  rocket: Rocket,
  users: Users,
  compass: Compass,
  briefcase: Briefcase,
  monitor: Monitor,
  handshake: Handshake,
};

const stepIcons = [BookOpen, Wrench, Hammer, Sprout];
const recognitionIcons = [BadgeCheck, Handshake, Building2, Bot];

function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-slate-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}

export function WhoWeAre() {
  return (
    <LightSection>
      <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <Heading className="mt-5">
            Empowering Skills. Enabling Careers.{" "}
            <span className="text-gradient">Building the Future.</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            Founded in 2016 by Mr. Gourav Gupta, {site.name} is an IT training and
            skill-development organization focused on bridging the gap between
            academic learning and evolving industry requirements. The organization
            combines practical exposure, emerging technologies, project-based
            learning and career-oriented training to help learners develop relevant
            skills and greater confidence for the professional world.
          </p>
          <p data-reveal className="mt-4 leading-relaxed text-slate-600">
            From Artificial Intelligence, Data Science, Machine Learning, Cyber
            Security and Cloud Computing to Full Stack Development, MERN Stack,
            Python, Web Development, Mobile App Development, Digital Marketing,
            Graphic Designing, UI/UX, Animation, Video Editing, CAD/CAM and other
            technology-focused disciplines, {site.name} provides learners with
            opportunities to explore diverse career pathways in the digital economy.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/about/founder"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
            >
              Meet our founder <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/about/mission-vision"
              className="rounded-full border border-slate-200 bg-white px-7 py-3.5 font-semibold text-navy transition hover:border-brand hover:text-brand"
            >
              Mission &amp; Vision
            </Link>
          </div>
        </div>

        {/* What we teach */}
        <div data-reveal="right" className="relative lg:pl-6">
          <div
            data-speed="0.25"
            className="absolute -right-3 -top-3 hidden h-full w-full rounded-[2rem] border border-brand/30 sm:block lg:left-9"
          />
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-hero-950 p-7 text-white shadow-2xl shadow-hero-950/30 sm:p-9">
            <div className="bg-grid-dark absolute inset-0 -z-10" />
            <div className="glow-dark absolute inset-0 -z-10" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
              What we teach
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              From Artificial Intelligence to CAD/CAM and other technology-focused
              disciplines, we teach skills for the evolving digital economy.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {whatWeTeach.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan/60 hover:text-white"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-7 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-slate-200">
              <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" />
              Headquartered in Jalandhar, Punjab — now training in {site.city},{" "}
              {site.region}.
            </p>
          </div>
        </div>
      </div>

      {/* Team photo strip */}
      <div data-stagger className="mt-20 grid gap-5 sm:grid-cols-3">
        {teamPhotos.map((p) => (
          <figure key={p.src}>
            <Photo
              src={p.src}
              alt={p.alt}
              sizes="(min-width: 640px) 33vw, 100vw"
              className="aspect-[4/3]"
            />
            <figcaption className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </LightSection>
  );
}

export function Ecosystem() {
  return (
    <section className="overflow-clip bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-20 px-5 py-20 lg:px-8 lg:py-32">
        {/* More than training */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal="left" className="grid grid-cols-2 gap-4">
            <Photo
              src="/images/gallery/design-lab-mentor.webp"
              alt="A mentor guides students editing video at desktop computers"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="aspect-[3/4]"
            />
            <Photo
              src="/images/gallery/aero-lab-mentors.webp"
              alt="Two mentors help students in the aircraft-cabin styled computer lab"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="mt-10 aspect-[3/4]"
            />
          </div>
          <div>
            <Eyebrow>More than training</Eyebrow>
            <Heading className="mt-5">
              A skill-building <span className="text-gradient">ecosystem.</span>
            </Heading>
            <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
              At {site.name}, technology education is designed to go beyond textbooks
              and conventional classroom learning. The focus is on helping learners
              learn, implement and grow by combining conceptual understanding with
              practical application.
            </p>
            <p data-reveal className="mt-4 leading-relaxed text-slate-600">
              Students can work on assignments, projects, industrial training and
              internship-oriented learning experiences that help them understand how
              technology is applied in real-world environments — with practical
              workshops and training activities in areas such as mobile application
              development, cloud computing, AI/ML, DevOps and data-related skills.
            </p>
          </div>
        </div>

        {/* Why it matters */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Why it matters</Eyebrow>
            <Heading className="mt-5">
              Preparing learners for a{" "}
              <span className="text-gradient">changing digital world</span>
            </Heading>
            <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
              Technology is evolving rapidly. Artificial Intelligence, automation,
              cloud platforms, cybersecurity, data and software development are
              continuously changing the way businesses operate.
            </p>
            <p data-reveal className="mt-4 leading-relaxed text-slate-600">
              {site.name} aims to keep its learning ecosystem aligned with this
              changing environment by introducing learners to emerging technologies
              and industry-relevant tools, helping them develop the adaptability
              required to continue learning throughout their careers.
            </p>
            <p
              data-reveal
              className="mt-6 border-l-2 border-brand pl-5 font-display text-lg font-semibold leading-relaxed text-navy"
            >
              The objective is not simply to teach a technology, but to develop the
              ability to understand problems, build solutions, use technology
              effectively and keep upgrading one&apos;s skills.
            </p>
          </div>
          <div data-reveal="right">
            <Photo
              src="/images/gallery/lab-coding-class.webp"
              alt="Students coding at desktop computers in a bright lab"
              className="aspect-[4/3] shadow-2xl shadow-hero-950/15"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhoWeTeach() {
  return (
    <DarkSection>
      <SectionHeading
        dark
        eyebrow="Who we teach"
        title={
          <>
            Learning for every stage of the{" "}
            <span className="text-gradient">career journey</span>
          </>
        }
        text={`${site.name}'s training ecosystem is designed to serve a diverse learner base.`}
      />
      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {learners.map((l, i) => (
          <article
            key={l.title}
            data-spot
            className="border-glow relative rounded-3xl bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-1.5 hover:bg-white/[0.07]"
          >
            <p className="text-outline font-display text-5xl font-extrabold leading-none">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-6 font-display text-xl font-bold">{l.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{l.text}</p>
          </article>
        ))}
      </div>
    </DarkSection>
  );
}

export function LearningPath() {
  return (
    <LightSection>
      <SectionHeading
        eyebrow="From classroom to practical experience"
        title={
          <>
            Learn. Practice. Build. <span className="text-gradient">Grow.</span>
          </>
        }
      />
      <div className="relative mt-16">
        <div
          data-draw-x
          aria-hidden
          className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-cyan via-sky to-brand lg:block"
        />
        <ol data-stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {learningSteps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={s.title} className="relative">
                <span className="relative grid size-14 place-items-center rounded-2xl bg-navy text-white shadow-lg shadow-brand/20">
                  <Icon className="size-6" />
                </span>
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy">
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
      <p data-reveal className="mx-auto mt-14 max-w-3xl text-center text-[15px] text-slate-500">
        This practical orientation runs through everything {site.name} offers — live
        projects, industrial training programmes and internship opportunities.
      </p>
    </LightSection>
  );
}

export function Difference() {
  return (
    <section className="overflow-clip bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="The difference"
          title={
            <>
              What makes {site.name} <span className="text-gradient">different?</span>
            </>
          }
        />
        <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differences.map((d) => {
            const Icon = differenceIcons[d.icon];
            return (
              <article
                key={d.title}
                className="group rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand transition duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold text-navy">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{d.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SkillDomains() {
  return (
    <LightSection>
      <SectionHeading
        eyebrow="What you can learn"
        title={
          <>
            Building skills across <span className="text-gradient">technology domains</span>
          </>
        }
        text={`Whether a learner wants to code an application, analyse data, build an AI solution, secure a network, manage cloud infrastructure, design a digital experience, create visual content or grow a business online, ${site.name} provides multiple learning pathways.`}
      />
      <div
        data-reveal
        className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-xl shadow-hero-950/5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skillDomains.map((d, i) => (
          <div key={d.title} className="bg-white p-7">
            <span className="font-display text-sm font-bold text-slate-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold text-navy">{d.title}</h3>
            <ul className="mt-5 space-y-2.5">
              {d.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-slate-600">
                  <span className="size-1.5 shrink-0 rounded-full bg-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div data-reveal className="mt-10 text-center">
        <NavLink
          href="/courses"
          className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
        >
          Explore all courses <ArrowRight className="size-4" />
        </NavLink>
      </div>
    </LightSection>
  );
}

export function Approach() {
  return (
    <DarkSection>
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow dark>Our approach</Eyebrow>
          <Heading dark className="mt-5">
            Practical. Future-Focused.{" "}
            <span className="text-gradient">Career-Oriented.</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg text-slate-300">
            {site.name}&apos;s approach is built around three principles.
          </p>
          <ol data-stagger className="mt-8 space-y-4">
            {approach.map((a, i) => (
              <li
                key={a.title}
                className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan to-brand font-display font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{a.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-slate-300">{a.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal="right">
          <Photo
            src="/images/gallery/langchain-seminar.webp"
            alt={`A ${site.name} trainer presents 'Why use LangChain?' to a large hall`}
            className="aspect-[4/3]"
          />
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
              Industry engagement
            </p>
            <h3 className="mt-3 font-display text-xl font-bold">
              Connecting education with industry
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
              A major part of {site.name}&apos;s broader ecosystem is its engagement
              with educational institutions and industry-oriented initiatives —
              campus placement activities and technology workshops that give
              students industry interaction and practical exposure, and strengthen
              the bridge between what they learn and how technology is applied
              professionally.
            </p>
          </div>
        </div>
      </div>
    </DarkSection>
  );
}

export function Recognition() {
  return (
    <LightSection id="recognition">
      <SectionHeading
        eyebrow="Awards, Recognition & Accreditation"
        title={
          <>
            Recognition built through learning, innovation and{" "}
            <span className="text-gradient">industry engagement</span>
          </>
        }
        text={`${site.name}'s credibility is supported not only by its training programs but also by its participation in industry-academia initiatives, campus placements, workshops, technology events and institutional collaborations.`}
      />
      <div className="mt-14 grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div
          data-reveal="left"
          className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 shadow-xl shadow-hero-950/10"
        >
          <Image
            src="/images/Accreditations.png"
            alt={`${site.name} accreditations and awards`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div data-stagger className="grid gap-5 sm:grid-cols-2">
          {recognitions.map((r, i) => {
            const Icon = recognitionIcons[i];
            return (
              <article
                key={r.title}
                className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan to-sky" />
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.text}</p>
              </article>
            );
          })}
        </div>
      </div>
      <p data-reveal className="mt-8 text-center text-xs text-slate-500">
        The recognitions above are drawn from publicly available information,
        institutional announcements and {site.name}&apos;s own published profiles.
      </p>
    </LightSection>
  );
}

export function Journey() {
  return (
    <section className="overflow-clip bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Our journey"
          title={
            <>
              A decade of <span className="text-gradient">building careers</span>
            </>
          }
          text="What began in 2016 has evolved into a technology-focused training ecosystem with an expanding portfolio of courses and practical learning initiatives, and the focus keeps moving towards emerging areas such as Artificial Intelligence, automation, cloud technologies, cybersecurity, data and modern software development."
        />
        <ol data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, i) => {
            const last = i === milestones.length - 1;
            return (
              <li
                key={m.year}
                className={`relative overflow-hidden rounded-3xl p-7 ${
                  last
                    ? "bg-gradient-to-br from-brand to-hero-900 text-white shadow-xl shadow-brand/25"
                    : "border border-slate-100 bg-white shadow-xl shadow-hero-950/5"
                }`}
              >
                <p
                  className={`font-display text-4xl font-extrabold tracking-tight ${
                    last ? "text-white" : "text-navy"
                  }`}
                >
                  <span className={last ? "text-cyan" : "text-slate-300"}>20</span>
                  {String(m.year).slice(2)}
                </p>
                <h3 className={`mt-4 font-display font-bold ${last ? "" : "text-navy"}`}>
                  {m.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    last ? "text-slate-100" : "text-slate-600"
                  }`}
                >
                  {m.text}
                </p>
              </li>
            );
          })}
          <li className="flex flex-col justify-between rounded-3xl border border-dashed border-brand/40 p-7">
            <p className="font-display text-lg font-bold text-navy">
              The next chapter could be yours.
            </p>
            <BookDemoButton className="mt-6 inline-flex items-center gap-2 text-left font-semibold text-brand transition-colors hover:text-navy">
              Talk to a counsellor <ArrowRight className="size-4" />
            </BookDemoButton>
          </li>
        </ol>
      </div>
    </section>
  );
}

export function CampusGallery() {
  return (
    <LightSection id="gallery">
      <SectionHeading
        eyebrow="Gallery"
        title={
          <>
            Life at <span className="text-gradient">{site.name}</span>
          </>
        }
        text="Labs, workshops, robotics demos and the colleges we work with. Tap any photo to see it full size."
      />
      <div className="mt-12">
        <Gallery />
      </div>
    </LightSection>
  );
}

export function Belief() {
  return (
    <LightSection className="text-center">
      <Eyebrow>Our belief</Eyebrow>
      <h2
        data-split
        className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2rem,5.2vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.025em] text-navy"
      >
        Technology changes. Skills evolve.{" "}
        <span className="text-gradient">Learning never stops.</span>
      </h2>
      <p data-reveal className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
        We believe that meaningful technology education should not end when a course
        ends. It should give learners the knowledge to understand, the skills to
        build, the confidence to perform and the curiosity to keep growing.
      </p>

      <div
        data-reveal="scale"
        className="relative isolate mx-auto mt-16 max-w-5xl overflow-hidden rounded-[2rem] bg-hero-950 px-6 py-12 text-white shadow-2xl shadow-hero-950/30 sm:px-12 sm:py-16"
      >
        <div className="bg-grid-dark absolute inset-0 -z-10" />
        <div className="glow-dark absolute inset-0 -z-10" />
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
          {site.name} today
        </p>
        <p className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
          Learn. Implement. <span className="text-shine">Grow.</span>
        </p>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-slate-300">
          With a focus on practical technology education, emerging skills, industry
          engagement and career development, {site.name} continues its journey
          towards creating a stronger ecosystem of future-ready technology
          professionals.
        </p>
        <p className="mt-10 border-t border-white/10 pt-8 text-sm text-slate-300">
          <span className="font-semibold text-white">Your Skill &amp; Technology Partner</span>
          <span className="mx-3 opacity-40">·</span>
          Where Your Tech Journey Begins.
        </p>
      </div>
    </LightSection>
  );
}
