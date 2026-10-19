// Applies the redirects editors manage in CMS SEO → Redirects, with the 301 or
// 302 each one is set to. Fetch caching does not apply in Proxy, so the list
// is kept in memory and refreshed at most once a minute; with the CMS
// unreachable the last known list keeps working.
import { NextResponse, type NextRequest } from "next/server";

type Redirect = { from: string; to: string; type: number };

const CMS_URL = (process.env.CMS_URL ?? "http://localhost:4000").replace(/\/+$/, "");
const TTL_MS = 60_000;

let cache: { at: number; map: Map<string, Redirect> } | null = null;
let inflight: Promise<void> | null = null;

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path).toLowerCase();

async function refresh() {
  try {
    const res = await fetch(`${CMS_URL}/api/public/redirects`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(String(res.status));
    const { items } = (await res.json()) as { items: Redirect[] };
    cache = { at: Date.now(), map: new Map(items.map((r) => [normalise(r.from), r])) };
  } catch {
    // Keep serving the previous list; try again after the next TTL.
    cache = { at: Date.now(), map: cache?.map ?? new Map() };
  }
}

async function redirects() {
  if (process.env.CMS_DISABLED === "true") return new Map<string, Redirect>();
  if (!cache || Date.now() - cache.at > TTL_MS) {
    inflight ??= refresh().finally(() => (inflight = null));
    // The first request waits; later ones use the previous list while it refreshes.
    if (!cache) await inflight;
  }
  return cache?.map ?? new Map<string, Redirect>();
}

export async function proxy(request: NextRequest) {
  const hit = (await redirects()).get(normalise(request.nextUrl.pathname));
  if (!hit || normalise(hit.to) === normalise(request.nextUrl.pathname)) return NextResponse.next();
  const target = new URL(hit.to, request.url);
  // Keep the visitor's query string unless the target sets its own.
  if (!target.search) target.search = request.nextUrl.search;
  return NextResponse.redirect(target, hit.type === 302 ? 302 : 301);
}

export const config = {
  // Pages only: not Next's own files, the API, or anything with a file extension.
  matcher: ["/((?!_next/|api/|.*\\.[\\w]+$).*)"],
};
