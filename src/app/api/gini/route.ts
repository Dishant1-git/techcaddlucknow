// Gini's chat endpoint (components/Gini.tsx). Same-origin JSON only, size-capped
// and rate-limited per visitor, since every message is a model call.
import { askGini, GiniError } from "@/lib/gini";

const BODY_MAX = 32_000;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60_000;

// Per-IP message counts, in memory per server instance.
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 10_000) for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
  const entry = hits.get(ip);
  if (!entry || entry.reset <= now) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  return ++entry.count > RATE_LIMIT;
}

const reply = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reply({ ok: false, error: "Unsupported content type" }, 415);
  }
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && hostOf(origin) !== host) return reply({ ok: false, error: "Forbidden" }, 403);

  const raw = await request.text().catch(() => "");
  if (raw.length > BODY_MAX) return reply({ ok: false, error: "Message too long" }, 413);

  const ip = (request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "").trim();
  if (ip && rateLimited(ip)) return reply({ ok: false, error: "That's a lot of questions! Please call us for more help." }, 429);

  try {
    const { messages } = JSON.parse(raw) as { messages?: unknown };
    return reply({ ok: true, text: await askGini(messages) });
  } catch (error) {
    if (error instanceof SyntaxError) return reply({ ok: false, error: "Invalid request" }, 400);
    const e = error instanceof GiniError ? error : new GiniError("Something went wrong.");
    return reply({ ok: false, error: e.message }, e.status);
  }
}
