// The order of a course page's sections, as an editor arranges it in the CMS
// (cms-techcadd/frontend: SectionOrderEditor ORDERABLE_SECTIONS and
// courseSchema PAGE_SECTIONS — the ids below are that contract).

/** Sections the editor can drag into a new order. */
export const ORDERABLE = new Set([
  "overview",
  "who-can-do",
  "why-this-program",
  "what-you-will-learn",
  "outcomes",
  "projects",
  "why-techcadd",
  "reviews",
  "faqs",
  "related",
]);

/** The hero, call to action and enquiry form are structural and cannot be hidden. */
const UNHIDEABLE = new Set(["hero", "cta", "enquiry"]);

/**
 * The page's sections in render order.
 *
 * Only the orderable sections move: they fill the slots orderable sections
 * hold in the default order, in the editor's order (any the editor's list
 * leaves out keep their default relative order after it). Fixed sections such
 * as "modules" and "tools" stay where they are.
 */
export function orderSections(defaults: string[], sectionOrder: string[] = []): string[] {
  const chosen = sectionOrder.filter((k) => ORDERABLE.has(k) && defaults.includes(k));
  if (!chosen.length) return defaults;
  const rest = defaults.filter((k) => ORDERABLE.has(k) && !chosen.includes(k));
  const queue = [...chosen, ...rest];
  return defaults.map((k) => (ORDERABLE.has(k) ? queue.shift()! : k));
}

export const isHidden = (key: string, hidden: string[] = []) => !UNHIDEABLE.has(key) && hidden.includes(key);
