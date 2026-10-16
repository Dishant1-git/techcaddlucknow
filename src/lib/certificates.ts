// Server-only certificate registry behind /api/verify-certificate.
// Never import this file from a client component: the whole list would be
// shipped to the browser. Only the API route reads it, and it returns a single
// matching record.
//
// TODO: add the real issued certificates before relying on the lookup. Either
//  - append records below, e.g.
//      { id: "TCL-2026-0001", name: "Full Name", course: "MERN Full Stack",
//        duration: "6 Months", issued: "2026-06-30", grade: "A" },
//    (ids are matched case-insensitively, ignoring spaces), or
//  - replace findCertificate() with a database or Google Sheet lookup and keep
//    the same return shape. Never add sample or made-up people here.

export type CertificateRecord = {
  /** Certificate / roll number exactly as printed, e.g. "TCL-2026-0001". */
  id: string;
  name: string;
  course: string;
  duration: string;
  /** Issue date, ISO format (YYYY-MM-DD). */
  issued: string;
  grade?: string;
};

export const certificates: CertificateRecord[] = [];

/** Upper-case, trimmed, inner whitespace removed. */
export const normaliseCertificateId = (raw: string) => raw.trim().toUpperCase().replace(/\s+/g, "");

export async function findCertificate(id: string): Promise<CertificateRecord | undefined> {
  const key = normaliseCertificateId(id);
  return certificates.find((c) => normaliseCertificateId(c.id) === key);
}
