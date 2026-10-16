// Sections of the Seminars & Events page (/techcadd-lucknow-seminars).
import Image from "next/image";
import { Mic } from "lucide-react";
import { galleryPhoto } from "@/lib/gallery";
import { events, speakers } from "@/lib/resources/seminars";
import { DarkSection, Eyebrow, Heading, LightSection, SectionHeading } from "../ui";
import { initials, Note } from "./Kit";
import { SeminarsFilter } from "./SeminarsFilter";

export function EventsList() {
  return (
    <LightSection id="events" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Events"
        title={
          <>
            Sessions across the <span className="text-gradient">techcadd network</span>
          </>
        }
        text="Seminars and hands-on workshops our trainers and founder have run at colleges, universities and industry events — newest first."
      />
      <Note>
        These events were run by techcadd teams in Punjab, Chandigarh and nearby states, not at the Lucknow centre.
        Venue names are listed as the host institutions gave them. Lucknow sessions will be added here as they are
        scheduled.
      </Note>
      <SeminarsFilter events={events} />
    </LightSection>
  );
}

const sessionPhotos = ["founder-auditorium", "langchain-seminar", "auditorium-workshop"];

/** Who leads the sessions, counted from the events above, beside real seminar photos. */
export function EventSpeakers() {
  if (!speakers.length) return null;
  return (
    <DarkSection>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Eyebrow dark>Who teaches</Eyebrow>
          <Heading dark className="mt-5">
            Taught by the people who <span className="text-gradient">run our courses</span>
          </Heading>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-300">
            Sessions are led by techcadd&apos;s founder and the trainers who teach the same subjects in our labs —
            these are the names that appear most often in the events above.
          </p>
          <ul data-stagger className="mt-10 space-y-3">
            {speakers.map((s) => (
              <li
                key={s.name}
                data-spot
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan to-sky font-display text-sm font-bold text-hero-950">
                  {initials(s.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-bold text-white">{s.name}</span>
                  {s.role && <span className="block text-sm text-slate-400">{s.role}</span>}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan">
                  <Mic className="size-3.5" />
                  {s.sessions} {s.sessions === 1 ? "session" : "sessions"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-stagger className="grid grid-cols-2 gap-3 sm:gap-4">
          {sessionPhotos.map((name, i) => {
            const p = galleryPhoto(name);
            return (
              <figure
                key={name}
                className={`group relative overflow-hidden rounded-2xl bg-hero-900 sm:rounded-3xl ${
                  i === 0 ? "col-span-2 h-56 sm:h-72" : "h-40 sm:h-52"
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero-950/85 to-transparent p-3 pt-10 font-display text-xs font-bold text-white sm:p-4 sm:text-sm">
                  {p.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </DarkSection>
  );
}
