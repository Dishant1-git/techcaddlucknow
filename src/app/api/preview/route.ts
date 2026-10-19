// Takes a draft from the preview frame (components/preview/PreviewBridge.tsx)
// and hands back a short-lived token the frame renders it by.
import { saveDraft } from "@/lib/preview/store";

const MAX_BYTES = 512 * 1024;
const KINDS = new Set(["course", "page"]);

const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

export async function POST(request: Request) {
  // Only the preview frame on this site posts here.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || hostOf(origin) !== host) return Response.json({ error: "Forbidden" }, { status: 403 });

  const raw = await request.text();
  if (raw.length > MAX_BYTES) return Response.json({ error: "Draft too large" }, { status: 413 });
  let body: { kind?: string; draft?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid draft" }, { status: 400 });
  }
  if (!body.kind || !KINDS.has(body.kind) || typeof body.draft !== "object" || !body.draft) {
    return Response.json({ error: "Invalid draft" }, { status: 400 });
  }
  return Response.json({ token: saveDraft(body.kind, body.draft) }, { headers: { "Cache-Control": "no-store" } });
}
