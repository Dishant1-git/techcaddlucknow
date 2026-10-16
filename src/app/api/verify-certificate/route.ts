import { findCertificate, normaliseCertificateId } from "@/lib/certificates";

const MAX_LENGTH = 40;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const raw = String((body as Record<string, unknown> | null)?.id ?? "").slice(0, 200);
  const id = normaliseCertificateId(raw);

  if (!id) {
    return Response.json({ ok: false, error: "Enter the certificate or roll number." }, { status: 400 });
  }
  if (id.length > MAX_LENGTH || !/^[A-Z0-9][A-Z0-9/_-]*$/.test(id)) {
    return Response.json(
      { ok: false, error: "That doesn't look like a certificate number. Use letters, digits and hyphens only." },
      { status: 400 },
    );
  }

  const record = await findCertificate(id);
  if (!record) return Response.json({ ok: true, found: false, id });

  const { name, course, duration, issued, grade } = record;
  return Response.json({
    ok: true,
    found: true,
    id: record.id,
    record: { name, course, duration, issued, ...(grade ? { grade } : {}) },
  });
}
