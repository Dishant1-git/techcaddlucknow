// Certificate verification page copy, from verify-certificate.json. The source
// showed "record found" for any input; here the lookup is real (see
// /api/verify-certificate and src/lib/certificates.ts). Claims the Lucknow
// branch can't stand behind (fixed 24–48 hour turnaround, biometric records,
// immigration-authority access, AICTE alignment) are left out.
import { site } from "@/lib/site";
import { resourceRoutes } from "@/lib/resources/routes";
import type { NextLink } from "@/components/resources/Kit";

export const CERT_PLACEHOLDER = "e.g. TCL-2026-0001";

export const verifyHero = {
  eyebrow: "Credential registry",
  text: `For corporate HR departments, background verification (BGV) agencies, government bodies and university registrars. Check the authenticity of training certificates and internship letters issued by ${site.name} ${site.city}.`,
  badges: ["For HR & BGV teams", "Instant registry lookup", "Written confirmation on request"],
};

export const bgvMailto = (id?: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(`BGV Verification Request${id ? ` - ${id}` : ""}`)}`;

export const verifySteps = [
  {
    title: "Locate the certificate number",
    text: `Find the unique alphanumeric certificate or roll number printed on the official ${site.name} certificate or internship letter (for example TCL-2026-XXXX).`,
  },
  {
    title: "Submit a verification request",
    text: "Enter the number in the form above, or email our verification desk with the candidate's authorisation and consent.",
  },
  {
    title: "Record validation",
    text: "The registry returns the candidate's name, course, training duration and issue date when the number matches a record.",
  },
  {
    title: "Official HR confirmation",
    text: "Agencies that need a signed confirmation on official letterhead can request one by email, with the candidate's consent attached.",
  },
];

// TODO: confirm the ISO 9001:2015 certification applies to certificates issued by the Lucknow branch.
export const securityFeatures = [
  {
    title: "Unique alphanumeric number",
    text: "Each credential carries its own registry number, mapped to the student's training record and project submission.",
  },
  {
    title: "ISO 9001:2015 accreditation mark",
    text: "Certified quality management standard covering standardised assessment, syllabus compliance and authorised issuance.",
  },
  {
    title: "Verifiable internship letter",
    text: "Documents the live project tenure, mentor sign-off, software stack proficiency and code contributions.",
  },
  {
    title: "Central registry",
    text: "Records are kept in one central registry, so recruitment teams and universities can check a credential online or by email.",
  },
];

export const verifyNext: NextLink[] = [
  {
    title: "Accreditations & awards",
    text: "Documented internship letters, university-compliant programmes and the recognitions behind them.",
    cta: "See the paperwork",
    href: "/about#recognition",
  },
  {
    title: "Placements & career support",
    text: "Resume building, mock interviews, aptitude and DSA practice, and hiring drives with our partner companies.",
    cta: "See how placement works",
    href: resourceRoutes.placements,
  },
  {
    title: "Visit or book a demo",
    text: "The Kursi Road campus, session timings, fees and EMI options — or a free demo class before you commit to anything.",
    cta: "Get directions",
    href: "/contact",
  },
];
