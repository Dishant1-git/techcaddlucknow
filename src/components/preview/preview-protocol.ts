/**
 * The website half of the CMS live-preview contract. The CMS half is
 * cms-techcadd/frontend/src/components/preview/previewProtocol.ts; the two
 * must agree (cms-techcadd/frontend: `npm run check:protocol`).
 *
 * The CMS frames /preview/<kind>; this frame says when it is listening, the
 * CMS posts the editor's unsaved form state, and the frame renders it with the
 * same components as the published page.
 */

export const PREVIEW_READY = "techcadd:preview-ready";
export const PREVIEW_DRAFT = "techcadd:preview-draft";
export const PREVIEW_SCROLL = "techcadd:preview-scroll";

/** Sent back by the frame: things about the rendered page worth surfacing. */
export const PREVIEW_NOTICE = "techcadd:preview-notice";

export type PreviewKind = "course" | "page";

/** The CMS admin's origin: the only window allowed to post drafts here, and to frame these pages. */
export const CMS_ADMIN_ORIGIN = (process.env.NEXT_PUBLIC_CMS_ADMIN_ORIGIN ?? "http://localhost:5173").replace(/\/$/, "");
