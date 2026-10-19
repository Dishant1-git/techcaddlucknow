// Helpers for the rich text the CMS editor (TipTap) produces.
import { cmsAsset } from "./client";

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " " };

export const decodeEntities = (s: string) =>
  s.replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (_, e: string) => ENTITIES[e]).replace(/&#(\d+);/g, (_, n: string) =>
    String.fromCodePoint(Number(n)),
  );

/** Plain text of an HTML fragment. */
export const stripTags = (html: string) =>
  decodeEntities(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

/** One string per paragraph or list item, for components that take plain paragraphs. */
export const toParagraphs = (html: string | undefined) =>
  (html ?? "")
    .split(/<\/(?:p|li|h[1-6]|blockquote)>/i)
    .map(stripTags)
    .filter(Boolean);

/**
 * Prepares editor HTML for dangerouslySetInnerHTML.
 *
 * The content comes from signed-in CMS editors, not visitors, so this is basic
 * hygiene rather than a full sanitiser: it drops scripts, embedded frames other
 * than YouTube, inline event handlers and javascript: URLs, opens external
 * links in a new tab, and points uploaded images at the CMS.
 */
export function cleanHtml(html: string | undefined): string {
  if (!html) return "";
  return html
    .replace(/<(script|style|object|embed|form)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|object|embed|form|input|button)[^>]*\/?>/gi, "")
    .replace(/<iframe(?![^>]*src="https:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/)[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"')
    .replace(/(<img[^>]*\ssrc=")(\/uploads\/[^"]+)"/gi, (_, pre: string, src: string) => `${pre}${cmsAsset(src)}"`)
    .replace(/<a\s+(?![^>]*target=)([^>]*href="https?:\/\/[^"]+"[^>]*)>/gi, '<a target="_blank" rel="noopener noreferrer" $1>');
}

/** Rough reading time for an article body. */
export const readTime = (html: string | undefined) =>
  `${Math.max(1, Math.round(stripTags(html ?? "").split(" ").length / 200))} min read`;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-10-19 14:24:22.008" or an ISO date → { short: "19 Oct 2026", long: "19 October 2026" }. */
export function formatDate(value: string | undefined) {
  const m = value?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return { short: "", long: "" };
  const month = MONTHS[Number(m[2]) - 1] ?? "";
  const day = String(Number(m[3]));
  return { short: `${day} ${month.slice(0, 3)} ${m[1]}`, long: `${day} ${month} ${m[1]}` };
}
