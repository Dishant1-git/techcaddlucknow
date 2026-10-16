// Tech blog (/tech-blog-of-lucknow and /tech-blog-of-lucknow/[slug]), reshaped from blog.json.
import data from "./data/blog.json";
import { courseHref } from "../site";
import { blogPostHref, mapHref } from "./routes";

type RawBlock =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; rows: string[][] };

type RawPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  date: string;
  dateLong: string;
  author: string;
  readTime: string;
  tags: string[];
  body: RawBlock[];
};

export type ListItem = { text: string; href?: string };

export type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: ListItem[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type Post = Omit<RawPost, "body" | "category"> & {
  category: string;
  href: string;
  cover: string;
  body: Block[];
  toc: { id: string; text: string }[];
};

// Leftovers from the Mohali → Lucknow pass, and the brand name written as on the rest of the site.
const fix = (s: string) =>
  s
    .replace(/\bTech[Cc][Aa][Dd][Dd]\b/g, "techcadd")
    .replace(/techcadd, Lucknow/g, "techcadd Lucknow")
    .replace("Lucknow and the wider Lucknow region", "Lucknow and the wider Uttar Pradesh region")
    .replace(/\bMohal\b/g, "Lucknow")
    .replace(/’/g, "'");

const anchor = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// The source leaves category empty on these posts; file each under the
// matching topic from the original blog's category list.
const categoryFor = (slug: string) =>
  /placed/.test(slug)
    ? "Placements"
    : /autocad|solidworks|revit/.test(slug)
      ? "CAD & Design"
      : /sql|data-science|statistics/.test(slug)
        ? "AI & Data"
        : /digital-marketing/.test(slug)
          ? "Digital Marketing"
          : /roadmap|career/.test(slug)
            ? "Career Advice"
            : "Web Development";

// Cover photos from the gallery, picked per topic so each card has a fitting shot.
const coverPool: Record<string, string[]> = {
  Placements: ["universal-placement-drive", "students-coding"],
  "CAD & Design": ["design-lab-mentor", "design-lab-mentor-2"],
  "AI & Data": ["data-session", "ai-course-presentation", "lab-coding-class"],
  "Digital Marketing": ["laptop-workshop", "lab-practice", "lab-hands-on", "lab-students-desks"],
  "Career Advice": ["lecture-room", "trainer-lab"],
  "Web Development": ["aero-lab-coding", "students-coding"],
};

// Bodies list the centre's programmes as plain text ("6-week industrial training
// in Lucknow – for B.Tech…"); link the ones that have a page here.
function linkFor(item: string): string | undefined {
  const course = item.match(/^(.+?) course in Lucknow\s*[–-]/);
  if (course) return courseHref(course[1]);
  if (/^6-week industrial training/i.test(item)) return mapHref("/6-weeks");
  if (/^6-month industrial training/i.test(item)) return mapHref("/6-months");
  if (/^Internship programme/i.test(item)) return mapHref("/internship");
  return undefined;
}

function shapeBody(raw: RawBlock[]): Block[] {
  const out: Block[] = [];
  const ids = new Set<string>();
  for (let i = 0; i < raw.length; i++) {
    const b = raw[i];
    // "Related Articles" names posts that are not on this site; the page shows
    // its own related posts instead.
    if (b.type === "h2" && /^related articles$/i.test(b.text.trim())) {
      if (raw[i + 1]?.type === "ul") i++;
      continue;
    }
    if (b.type === "ul" || b.type === "ol") {
      out.push({ type: b.type, items: b.items.map((t) => ({ text: fix(t), href: linkFor(fix(t)) })) });
    } else if (b.type === "table") {
      const [head, ...rows] = b.rows.map((r) => r.map(fix));
      out.push({ type: "table", head, rows });
    } else if (b.type === "h2") {
      let id = anchor(b.text);
      while (ids.has(id)) id += "-2";
      ids.add(id);
      out.push({ type: "h2", text: fix(b.text), id });
    } else if (b.type === "h3" || b.type === "p" || b.type === "quote") {
      out.push({ type: b.type, text: fix(b.text) });
    }
  }
  return out;
}

const seen: Record<string, number> = {};

export const posts: Post[] = (data.posts as RawPost[]).map((p) => {
  const category = p.category ?? categoryFor(p.slug);
  const pool = coverPool[category];
  const n = (seen[category] = (seen[category] ?? -1) + 1);
  const body = shapeBody(p.body);
  return {
    ...p,
    title: fix(p.title),
    excerpt: fix(p.excerpt),
    author: fix(p.author),
    tags: p.tags.map(fix),
    category,
    href: blogPostHref(p.slug),
    cover: pool[n % pool.length],
    body,
    toc: body.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : [])),
  };
});

export const blogHero = data.hero;

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Other posts, same topic first, then the newest. */
export const relatedPosts = (post: Post, limit = 3) =>
  posts
    .filter((p) => p.slug !== post.slug)
    .map((p, i) => ({ p, score: (p.category === post.category ? 10 : 0) + p.tags.filter((t) => post.tags.includes(t)).length * 2 - i / 100 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
