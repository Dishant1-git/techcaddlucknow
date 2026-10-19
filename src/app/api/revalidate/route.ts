// Called by the CMS after every save (cms-techcadd/backend/src/http/revalidate.ts)
// so a publish shows on the next page load instead of after the cache expires.
import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CMS_TAG } from "@/lib/cms/client";

const matches = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";
  if (!secret || !matches(given, secret)) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  // Expire immediately: an editor checking their change should see it at once.
  revalidateTag(CMS_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
