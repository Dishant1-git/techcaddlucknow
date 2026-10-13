export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const course = String(body?.course ?? "").trim();

  if (!name || !/^[6-9]\d{9}$/.test(phone)) {
    return Response.json({ ok: false, error: "Invalid enquiry" }, { status: 400 });
  }

  // TODO: forward the lead to your CRM, email or Google Sheet. For now it is only logged.
  console.log("New enquiry:", { name, phone, course });

  return Response.json({ ok: true });
}
