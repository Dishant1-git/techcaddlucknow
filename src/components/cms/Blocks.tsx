// Rendering for content an editor arranges in the CMS: rich-text, image, video
// and button blocks (on pages and course pages), embedded videos, and the
// image/video an editor attaches to a section of a course page.
import { ArrowRight, Play } from "lucide-react";
import { NavLink } from "../NavLink";
import { PostCard } from "../resources/BlogPage";
import { cmsAsset } from "@/lib/cms/client";
import { getPosts } from "@/lib/cms/content";
import { cleanHtml } from "@/lib/cms/html";
import type { CmsPageSection, MediaView, SectionMediaView } from "@/lib/cms/types";

/** YouTube and Vimeo links as embeddable URLs; anything else is undefined. */
export function embedUrl(url: string | undefined) {
  if (!url) return undefined;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return undefined;
}

/** An embedded YouTube or Vimeo player, or a plain link for other video hosts. */
export function VideoEmbed({ url, title, className = "" }: { url: string; title?: string; className?: string }) {
  const src = embedUrl(url);
  if (!src) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-brand">
        <Play className="size-4" /> {title || "Watch the video"}
      </a>
    );
  }
  return (
    <iframe
      src={src}
      title={title || "Video"}
      loading="lazy"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      className={`aspect-video w-full rounded-3xl border-0 shadow-xl shadow-hero-950/10 ${className}`}
    />
  );
}

export function MediaImage({ media, className = "" }: { media: MediaView; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- uploaded to the CMS, served from there
    <img
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      loading="lazy"
      className={`h-auto w-full rounded-3xl object-cover shadow-xl shadow-hero-950/10 ${className}`}
    />
  );
}

/** The image and/or video an editor attached to one section of a course page. */
export function SectionMedia({ media, label, dark = false }: { media?: SectionMediaView; label: string; dark?: boolean }) {
  if (!media) return null;
  const items = [media.image, media.extraImage].filter((m): m is MediaView => !!m);
  const count = items.length + (media.videoUrl ? 1 : 0);
  return (
    <div data-section-media className={`${dark ? "bg-hero-950" : "bg-white"} px-5 pb-16 lg:px-8`}>
      <div className={`mx-auto grid max-w-6xl gap-5 ${count > 1 ? "md:grid-cols-2" : "max-w-4xl"}`}>
        {media.videoUrl && <VideoEmbed url={media.videoUrl} title={label} />}
        {items.map((m) => (
          <MediaImage key={m.src} media={m} />
        ))}
      </div>
    </div>
  );
}

function BlockLink({ s, className }: { s: CmsPageSection; className: string }) {
  if (!s.linkUrl) return null;
  const external = s.linkTarget === "new" || /^https?:/.test(s.linkUrl);
  return (
    <NavLink href={s.linkUrl} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className={className}>
      {s.linkLabel || "Learn more"}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </NavLink>
  );
}

const linkClass = "group mt-6 inline-flex items-center gap-2 font-bold text-brand";
const buttonClass =
  "group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-6 py-3 font-bold text-hero-950";

/** One CMS content block. */
export async function ContentBlock({ block: s }: { block: CmsPageSection }) {
  switch (s.type) {
    case "rich-text":
      return (
        <div>
          {s.title && <h2 className="mb-5 font-display text-2xl font-extrabold text-navy sm:text-3xl">{s.title}</h2>}
          <div className="cms-prose" dangerouslySetInnerHTML={{ __html: cleanHtml(s.body) }} />
          <BlockLink s={s} className={linkClass} />
        </div>
      );
    case "image": {
      const src = cmsAsset(s.media?.url);
      if (!src) return null;
      const image = (
        // eslint-disable-next-line @next/next/no-img-element -- uploaded to the CMS, served from there
        <img
          src={src}
          alt={s.media?.alt || s.body || s.title || ""}
          width={s.media?.width}
          height={s.media?.height}
          loading="lazy"
          className="h-auto w-full rounded-3xl object-cover shadow-xl shadow-hero-950/10"
        />
      );
      return (
        <figure>
          {s.title && <h2 className="mb-5 font-display text-2xl font-extrabold text-navy sm:text-3xl">{s.title}</h2>}
          {/* The image is a link when the editor set one and gave it no button text. */}
          {s.linkUrl && !s.linkLabel ? (
            <NavLink href={s.linkUrl} {...(s.linkTarget === "new" && { target: "_blank", rel: "noopener noreferrer" })}>
              {image}
            </NavLink>
          ) : (
            image
          )}
          {s.body && <figcaption className="mt-3 text-center text-sm text-slate-500">{s.body}</figcaption>}
          {s.linkLabel && (
            <div className="text-center">
              <BlockLink s={s} className={linkClass} />
            </div>
          )}
        </figure>
      );
    }
    case "video":
      return (
        <div>
          {s.title && <h2 className="mb-5 font-display text-2xl font-extrabold text-navy">{s.title}</h2>}
          {s.linkUrl && <VideoEmbed url={s.linkUrl} title={s.title} />}
          {s.body && <div className="cms-prose mt-4" dangerouslySetInnerHTML={{ __html: cleanHtml(s.body) }} />}
        </div>
      );
    case "cta":
      return (
        <div className="rounded-3xl bg-hero-950 p-8 text-white sm:p-10">
          {s.title && <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{s.title}</h2>}
          {s.body && <div className="cms-prose mt-4 [&_*]:!text-slate-300" dangerouslySetInnerHTML={{ __html: cleanHtml(s.body) }} />}
          <BlockLink s={s} className={buttonClass} />
        </div>
      );
    case "blogs": {
      const posts = (await getPosts()).slice(0, 3);
      return (
        <div>
          <h2 className="mb-6 font-display text-2xl font-extrabold text-navy">{s.title || "From the blog"}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    default:
      return null;
  }
}

/** Blocks placed between two generated sections of a course page. */
export function BlockBand({ blocks }: { blocks: CmsPageSection[] }) {
  if (!blocks.length) return null;
  return (
    <section data-cms-blocks className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {blocks.map((b, i) => (
          <ContentBlock key={i} block={b} />
        ))}
      </div>
    </section>
  );
}
