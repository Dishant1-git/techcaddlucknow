// Reads from the techcadd Lucknow CMS (cms-techcadd/backend), server-side only.
//
// Every read is cached under the "cms" tag, so the CMS's revalidate call
// (POST /api/revalidate) makes a publish show on the next page load. When the
// CMS is down or not configured, reads return null and every section falls
// back to the content bundled with the site — the CMS can never take a page
// down.
import "server-only";
import { cacheLife, cacheTag } from "next/cache";

/** The CMS API root, e.g. http://localhost:4000 (no trailing /api). */
const CMS_URL = (process.env.CMS_URL ?? "http://localhost:4000").replace(/\/+$/, "");

/**
 * Where browsers load CMS uploads from. Differs from CMS_URL when the site
 * talks to the CMS over a private address but visitors need its public one.
 */
const CMS_PUBLIC_URL = (process.env.CMS_PUBLIC_URL ?? CMS_URL).replace(/\/+$/, "");

export const CMS_TAG = "cms";

/** GET /api/public<path>, or null when the CMS cannot answer. */
export async function cmsGet<T>(path: string): Promise<T | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CMS_TAG);
  if (process.env.CMS_DISABLED === "true") return null;
  try {
    const res = await fetch(`${CMS_URL}/api/public${path}`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** POST /api/public<path>. Not cached; returns the HTTP status, or 0 when unreachable. */
export async function cmsPost(path: string, body: unknown): Promise<number> {
  if (process.env.CMS_DISABLED === "true") return 0;
  try {
    const res = await fetch(`${CMS_URL}/api/public${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    return res.status;
  } catch {
    return 0;
  }
}

/** Uploads are stored as "/uploads/<file>" on the CMS; make them loadable here. */
export function cmsAsset(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (/^(https?:|data:)/i.test(url)) return url;
  return `${CMS_PUBLIC_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
