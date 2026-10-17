import { DbConfigError } from "@/lib/db";
import { saveEnquiry } from "@/lib/enquiryDb";
import { enquiryCourses, isEnquirySource, isValidName, isValidPage, isValidPhone } from "@/lib/enquiry";

const BODY_MAX = 4_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60_000;

// Per-IP submission counts. In memory, so it limits each server instance
// separately; enough to stop a script flooding the table.
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 10_000) {
    for (const [key, v] of hits) if (v.reset <= now) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry || entry.reset <= now) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

const reply = (body: object, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const text = (body: Record<string, unknown>, key: string, max: number) => {
  const v = body[key];
  return typeof v === "string" ? v.normalize("NFC").trim().slice(0, max + 1) : "";
};

const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

export async function POST(request: Request) {
  // JSON-only, same-origin: a cross-site <form> cannot send application/json,
  // and browsers always send Origin on cross-site fetches.
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reply({ ok: false, error: "Unsupported content type" }, 415);
  }
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && (!host || hostOf(origin) !== host)) {
    return reply({ ok: false, error: "Forbidden" }, 403);
  }
  if (Number(request.headers.get("content-length") ?? 0) > BODY_MAX) {
    return reply({ ok: false, error: "Request too large" }, 413);
  }

  const raw = await request.text().catch(() => "");
  if (raw.length > BODY_MAX) return reply({ ok: false, error: "Request too large" }, 413);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return reply({ ok: false, error: "Invalid enquiry" }, 400);
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return reply({ ok: false, error: "Invalid enquiry" }, 400);
  }
  const body = parsed as Record<string, unknown>;

  // Hidden field real visitors never see: bots that fill it get a fake success.
  if (text(body, "website", 200)) return reply({ ok: true });

  // Set by the hosting proxy (Vercel, nginx). Without it visitors cannot be told
  // apart, so they are not rate limited rather than sharing one bucket.
  const ip = (request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "")
    .trim()
    .slice(0, 45);
  if (ip && rateLimited(ip)) {
    return reply({ ok: false, error: "Too many enquiries. Please call us instead." }, 429);
  }

  const source = text(body, "source", 32);
  const name = text(body, "name", 80).replace(/\s+/g, " ");
  const phone = text(body, "phone", 10);
  const course = text(body, "course", 150);
  const page = text(body, "page", 255);

  if (!isEnquirySource(source) || !isValidName(name) || !isValidPhone(phone) || !enquiryCourses.includes(course)) {
    return reply({ ok: false, error: "Invalid enquiry" }, 400);
  }

  try {
    await saveEnquiry({
      source,
      name,
      phone,
      course,
      page: isValidPage(page) ? page : null,
      ip: ip || null,
      userAgent: request.headers.get("user-agent")?.slice(0, 255) ?? null,
    });
  } catch (error) {
    // Log only the error code: the full error can echo the submitted values.
    if (error instanceof DbConfigError) {
      console.error("Enquiry: database not configured:", error.message);
    } else {
      console.error("Enquiry: insert failed:", (error as { code?: string })?.code ?? "unknown error");
    }
    return reply({ ok: false, error: "Could not save your enquiry" }, 503);
  }

  return reply({ ok: true });
}
