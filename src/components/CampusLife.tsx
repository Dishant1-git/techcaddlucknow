import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery, galleryPhoto } from "@/lib/gallery";
import { site } from "@/lib/site";
import { Eyebrow, Heading } from "./ui";

// Bento layout for the home page: one tall feature tile and six around it.
const tiles = [
  { name: "lab-welcome-batch", className: "col-span-2 row-span-2 lg:col-span-1 lg:row-span-3" },
  { name: "robot-dog-student", className: "lg:row-span-2" },
  { name: "founder-auditorium", className: "col-span-2 lg:col-span-2" },
  { name: "aero-lab-mentors", className: "lg:row-span-2" },
  { name: "robotics-soldering", className: "" },
  { name: "langchain-seminar", className: "col-span-2 lg:col-span-1" },
  { name: "cgc-partnership", className: "" },
];

export function CampusLife() {
  return (
    <section id="campus" className="overflow-clip bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Campus life</Eyebrow>
            <Heading className="mt-5">
              Inside the labs,
              <br />
              <span className="text-gradient">on the stages</span>
            </Heading>
          </div>
          <p data-reveal className="max-w-sm text-lg text-slate-600">
            Real batches, real workshops and the robot dog that follows us to
            every campus. No stock photos.
          </p>
        </div>

        <div
          data-stagger
          className="mt-14 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[11rem] lg:grid-cols-4"
        >
          {tiles.map((t) => {
            const p = galleryPhoto(t.name);
            return (
              <Link
                key={t.name}
                href="/about#gallery"
                className={`group relative overflow-hidden rounded-2xl bg-slate-200 sm:rounded-3xl ${t.className}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero-950/80 to-transparent p-3 pt-10 font-display text-sm font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
                  {p.caption}
                </span>
              </Link>
            );
          })}
        </div>

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-slate-600">
            {gallery.length} photos from {site.name} labs, workshops and college events.
          </p>
          <Link
            href="/about#gallery"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
          >
            Open the gallery
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
