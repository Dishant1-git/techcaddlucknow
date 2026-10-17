// Sections of the tech blog: the listing (/tech-blog-of-lucknow) and each article.
import { NavLink } from "../NavLink";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, Lightbulb, MessageCircle, PenLine, Phone, Tag } from "lucide-react";
import { galleryPhoto } from "@/lib/gallery";
import type { Block, ListItem, Post } from "@/lib/resources/blog";
import { resourceRoutes } from "@/lib/resources/routes";
import { site } from "@/lib/site";
import { BookDemoButton } from "../Enquiry";
import { Eyebrow, LightSection, SectionHeading } from "../ui";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "16 October 2026" → "2026-10-16", for <time dateTime>. */
function isoDate(dateLong: string) {
  const m = dateLong.match(/^(\d{1,2}) (\w+) (\d{4})$/);
  const month = m ? months.indexOf(m[2]) + 1 : 0;
  return m && month ? `${m[3]}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}` : undefined;
}

function Cover({ post, sizes, className = "" }: { post: Post; sizes: string; className?: string }) {
  const p = galleryPhoto(post.cover);
  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}

function Meta({ post, dark = false }: { post: Post; dark?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${dark ? "text-slate-300" : "text-slate-500"}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="size-4" />
        <time dateTime={isoDate(post.dateLong)}>{post.date}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-4" />
        {post.readTime}
      </span>
    </p>
  );
}

const chip = "rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand";

/* ----------------------------------------------------------------- listing */

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <LightSection>
      <SectionHeading
        eyebrow="Latest article"
        title={
          <>
            Fresh from the <span className="text-gradient">classroom</span>
          </>
        }
      />
      <NavLink
        href={post.href}
        data-reveal
        className="group mt-14 grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-hero-950/5 transition duration-500 hover:border-brand/30 hover:shadow-2xl lg:grid-cols-2"
      >
        <Cover post={post} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]" />
        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className={chip}>{post.category}</span>
            <span className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-bold text-navy">Featured</span>
          </div>
          <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight text-navy sm:text-3xl">
            {post.title}
          </h3>
          <p className="mt-4 flex-1 leading-relaxed text-slate-600">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <Meta post={post} />
            <span className="inline-flex items-center gap-2 text-sm font-bold text-brand">
              Read article
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </NavLink>
    </LightSection>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <NavLink
      href={post.href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-hero-950/5 transition duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl"
    >
      <div className="relative">
        <Cover post={post} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10]" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand shadow">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Meta post={post} />
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-slate-600">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
          Read article
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </NavLink>
  );
}

export function PostGrid({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="All articles"
          title={
            <>
              Course guides and <span className="text-gradient">career advice</span>
            </>
          }
          text="Roadmaps, skills checklists and placement advice — what to learn, what to build and how to show it to an employer."
        />
        <ul data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- article */

/** The article's eyebrow, title and meta row, for the PageHero `children` slot. */
export function ArticleHeader({ post }: { post: Post }) {
  return (
    <div className="mt-8 max-w-4xl">
      <div className="rise [--d:.1s]">
        <Eyebrow dark>{post.category}</Eyebrow>
      </div>
      <h1 className="rise mt-6 font-display text-[1.85rem] font-extrabold leading-[1.1] tracking-tight [--d:.2s] sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>
      <p className="rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 [--d:.3s] sm:text-lg">{post.excerpt}</p>
      <div className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 [--d:.35s]">
        <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-white">
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-cyan to-sky text-hero-950">
            <PenLine className="size-4" />
          </span>
          {post.author}
        </span>
        <Meta post={post} dark />
      </div>
    </div>
  );
}

/** Wide cover photo that overlaps the bottom of the hero. */
export function ArticleCover({ post }: { post: Post }) {
  return (
    <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-5 lg:-mt-20 lg:px-8">
      <div data-reveal="scale" className="overflow-hidden rounded-3xl shadow-2xl shadow-hero-950/20">
        <Cover post={post} sizes="(min-width: 1024px) 64rem, 100vw" className="aspect-[16/9] sm:aspect-[21/9]" />
      </div>
    </div>
  );
}

function ItemText({ item }: { item: ListItem }) {
  if (!item.href) return item.text;
  return (
    <NavLink
      href={item.href}
      className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
    >
      {item.text}
    </NavLink>
  );
}

function BodyBlock({ block: b }: { block: Block }) {
  switch (b.type) {
    case "h2":
      return (
        <h2 id={b.id} className="mt-14 scroll-mt-28 font-display text-2xl font-extrabold leading-tight tracking-tight text-navy first:mt-0 sm:text-[1.85rem]">
          {b.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-9 font-display text-xl font-bold leading-snug text-navy">{b.text}</h3>;
    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-cyan pl-5 font-display text-xl font-semibold leading-relaxed text-navy">
          {b.text}
        </blockquote>
      );
    case "p": {
      const quick = b.text.match(/^Quick answer:\s*([\s\S]*)$/);
      if (quick) {
        return (
          <aside className="my-8 flex gap-4 rounded-2xl border border-brand/15 bg-brand/[0.04] p-5 sm:p-6">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-brand" />
            <p className="text-[16px] leading-relaxed text-slate-700">
              <strong className="font-display font-bold text-navy">Quick answer: </strong>
              {quick[1]}
            </p>
          </aside>
        );
      }
      return <p className="mt-5 text-[17px] leading-[1.8] text-slate-700">{b.text}</p>;
    }
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {b.items.map((it) => (
            <li key={it.text} className="flex gap-3 text-[17px] leading-[1.7] text-slate-700">
              <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand" />
              <span>
                <ItemText item={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 space-y-3">
          {b.items.map((it, i) => (
            <li key={it.text} className="flex gap-3 text-[17px] leading-[1.7] text-slate-700">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 font-display text-xs font-bold text-brand">
                {i + 1}
              </span>
              <span>
                <ItemText item={it} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[30rem] border-collapse text-left text-[15px]">
            <thead className="bg-navy text-white">
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-display font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={r.join("|") + i} className="border-t border-slate-100 even:bg-slate-50">
                  {r.map((c, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 align-top font-semibold text-navy">
                        {c}
                      </th>
                    ) : (
                      <td key={j} className="px-4 py-3 align-top leading-relaxed text-slate-600">
                        {c}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function ArticleBody({ post }: { post: Post }) {
  return (
    <section className="bg-white px-5 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="mx-auto w-full max-w-3xl">
          {post.body.map((b, i) => (
            <BodyBlock key={i} block={b} />
          ))}

          {post.tags.length > 0 && (
            <div className="mt-14 border-t border-slate-100 pt-8">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                <Tag className="size-3.5" /> Tags
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-600">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <NavLink
            href={resourceRoutes.blog}
            className="group mt-10 inline-flex items-center gap-2 font-bold text-brand hover:text-navy"
          >
            <ArrowRight className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            All articles
          </NavLink>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-6">
            {post.toc.length > 1 && (
              <nav aria-label="On this page" className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">On this page</p>
                <ol className="mt-4 space-y-2.5 text-sm">
                  {post.toc.map((t) => (
                    <li key={t.id}>
                      <NavLink
                        href={`${post.href}#${t.id}`}
                        className="block leading-snug text-slate-600 transition-colors hover:text-brand"
                      >
                        {t.text}
                      </NavLink>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="rounded-3xl bg-hero-950 p-6 text-white">
              <p className="font-display text-lg font-bold">Not sure which course fits?</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                A counsellor at {site.name} {site.city} can walk you through the syllabus, batches and fees.
              </p>
              <BookDemoButton className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-sky px-5 py-3 text-sm font-bold text-hero-950">
                <Phone className="size-4" /> Book free counselling
              </BookDemoButton>
              <NavLink
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-white/40"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </NavLink>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Keep reading"
          title={
            <>
              Related <span className="text-gradient">articles</span>
            </>
          }
        />
        <ul data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <NavLink
            href={resourceRoutes.blog}
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
          >
            See all articles
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </div>
      </div>
    </section>
  );
}

/** Home page teaser: the newest articles and a link to the blog. */
export function HomeBlog({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section id="blog" className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="From the blog"
          title={
            <>
              Notes from the classroom <span className="text-gradient">and the codebase</span>
            </>
          }
          text="Course guides, hiring trends and career advice, written by the trainers and placement team who see what employers actually ask for."
        />
        <ul data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <NavLink
            href={resourceRoutes.blog}
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand"
          >
            Read all articles
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </div>
      </div>
    </section>
  );
}
