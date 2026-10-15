import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryPhoto } from "@/lib/gallery";
import { Eyebrow, Heading } from "./ui";

// Photo sets for pages that otherwise have none; names are gallery files.
export const photoSets = {
  labs: ["lab-welcome-batch", "aero-lab-mentors", "design-lab-mentor-2", "team-room"],
  internship: ["data-session", "aero-lab-coding", "robotics-soldering", "students-coding"],
  ai: ["ai-course-presentation", "langchain-seminar", "robot-dog-student", "lab-passion-wall"],
  after12th: ["lab-welcome-wall", "lecture-room", "robotics-soldering", "universal-certificate"],
} as const;

/**
 * A compact row of real lab and event photos with a link to the full gallery.
 * Kept short on purpose so it never dominates the page it sits on.
 */
export function PhotoStrip({
  eyebrow = "Inside techcadd",
  title,
  text,
  photos,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  photos: readonly string[];
}) {
  return (
    <section className="overflow-clip bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading className="mt-5">{title}</Heading>
          </div>
          {text && (
            <p data-reveal className="max-w-sm text-slate-600">
              {text}
            </p>
          )}
        </div>

        <div data-stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((name) => {
            const p = galleryPhoto(name);
            return (
              <figure
                key={name}
                className="group relative h-40 overflow-hidden rounded-2xl bg-slate-200 sm:h-52 sm:rounded-3xl"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero-950/80 to-transparent p-3 pt-10 font-display text-xs font-bold text-white sm:p-4 sm:text-sm">
                  {p.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <Link
          href="/about#gallery"
          className="group mt-8 inline-flex items-center gap-2 font-bold text-brand hover:text-navy"
        >
          See the full gallery
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
