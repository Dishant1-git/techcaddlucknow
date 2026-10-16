import { anatomy } from "@/lib/resources/tools/coldEmail";
import { pad } from "../Kit";
import { LightSection, SectionHeading } from "../../ui";

/** "The 4-part structure of a high-conversion developer cold email". */
export function EmailAnatomy() {
  return (
    <LightSection>
      <SectionHeading
        eyebrow={anatomy.eyebrow}
        title={
          <>
            The 4-part structure of a <span className="text-gradient">high-reply developer cold email</span>
          </>
        }
        text={anatomy.text}
      />
      <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {anatomy.items.map((a, i) => (
          <article key={a.title} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-hero-950/5">
            <span className="font-display text-4xl font-extrabold text-brand/15">{pad(i + 1)}</span>
            <h3 className="mt-3 font-display text-lg font-bold text-navy">{a.title.replace(/^\d+\.\s*/, "")}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{a.text}</p>
          </article>
        ))}
      </div>
    </LightSection>
  );
}
