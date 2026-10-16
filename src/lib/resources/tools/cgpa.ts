// CGPA to percentage calculator. Logic from cgpa.json (multipliers, SGPA
// average, cap at 100, division bands, eligibility rules). The source offered
// Punjab universities' formulas; those do not apply in Lucknow, so the presets
// here are the generic formulas only — students are told to check their own
// university's rule.
import { mapHref, resourceRoutes } from "@/lib/resources/routes";
import type { NextLink } from "@/components/resources/Kit";
import type { Faq } from "./shared";

export type Formula = {
  id: "standard" | "ten" | "offset" | "custom";
  name: string;
  shortName: string;
  formula: string;
  multiplier: number;
  offset?: number;
  note: string;
};

export const formulas: Formula[] = [
  {
    id: "standard",
    name: "Standard × 9.5 (CBSE / most universities)",
    shortName: "× 9.5",
    formula: "Percentage = CGPA × 9.5",
    multiplier: 9.5,
    note: "CBSE's published equivalence, also adopted by many universities.",
  },
  {
    id: "ten",
    name: "× 10 (straight 10-point scale)",
    shortName: "× 10",
    formula: "Percentage = CGPA × 10",
    multiplier: 10,
    note: "A straight 10-point conversion, used by some universities on transcripts.",
  },
  {
    id: "offset",
    name: "(CGPA − 0.75) × 10",
    shortName: "(CGPA − 0.75) × 10",
    formula: "Percentage = (CGPA − 0.75) × 10",
    multiplier: 10,
    offset: 0.75,
    note: "Used by some universities' ordinances; gives a lower figure than × 9.5 at most grades.",
  },
  {
    id: "custom",
    name: "Custom multiplier",
    shortName: "Custom",
    formula: "Percentage = CGPA × your multiplier",
    multiplier: 9.5,
    note: "Enter the factor your university's ordinance or marksheet specifies.",
  },
];

export const DEFAULT_CGPA = 8.2;
export const semesterCounts = [2, 4, 6, 8] as const;
export const defaultSgpas = ["7.8", "8.0", "8.2", "8.4", "8.5", "8.6", "8.8", "8.9"];

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Mean of the SGPAs that parse as 0 < x ≤ 10, rounded to 2 places; 0 if none. */
export function averageSgpa(values: string[]): number {
  const valid = values.map(Number).filter((x) => Number.isFinite(x) && x > 0 && x <= 10);
  if (!valid.length) return 0;
  return round2(valid.reduce((a, b) => a + b, 0) / valid.length);
}

/** Custom multipliers outside 1–20 (or not numbers) fall back to 9.5. */
export const safeMultiplier = (m: number) => (Number.isFinite(m) && m >= 1 && m <= 20 ? m : 9.5);

export function toPercentage(cgpa: number, f: Formula, customMultiplier: number): number {
  const pct =
    f.id === "custom"
      ? cgpa * safeMultiplier(customMultiplier)
      : f.offset !== undefined
        ? Math.max(0, (cgpa - f.offset) * f.multiplier)
        : cgpa * f.multiplier;
  return Math.min(100, round2(pct));
}

export type Division = { label: string; tone: "emerald" | "blue" | "amber" | "slate" | "rose" };

export function division(pct: number): Division {
  if (pct >= 75) return { label: "First Division with Distinction", tone: "emerald" };
  if (pct >= 60) return { label: "First Division", tone: "blue" };
  if (pct >= 50) return { label: "Second Division", tone: "amber" };
  if (pct >= 40) return { label: "Third Division / Pass", tone: "slate" };
  return { label: "Needs Improvement", tone: "rose" };
}

export const eligibility = {
  heading: "Campus placement & corporate eligibility",
  text: "How your result compares with typical placement screening criteria in campus and off-campus hiring drives.",
  rows: [
    {
      companyType: "Large product companies",
      minCgpa: "7.0+ CGPA (typical)",
      note: "Heavy weightage on DSA, system design & live projects",
      eligible: (cgpa: number) => cgpa >= 7,
    },
    {
      companyType: "Mass IT recruiters (service companies)",
      minCgpa: "60% or 6.5 CGPA with no active backlogs",
      note: "Aptitude + core CS fundamentals screening",
      eligible: (cgpa: number, pct: number) => pct >= 60 || cgpa >= 6.5,
    },
    {
      companyType: "Startups & product firms",
      minCgpa: "Skill-first (portfolio & hands-on coding)",
      note: "Often hire on live projects, a portfolio and a coding round",
      eligible: () => true,
    },
  ],
  callout: {
    title: "Low CGPA or below 60%? Don't panic!",
    text: "Many software firms, startups especially, weigh hands-on project proof and GitHub code as heavily as academic marks. Six months of industrial training with a live project can close the gap.",
    cta: "Explore 6 Months Training",
    href: mapHref("/industrial-training-6-months-in-lucknow"),
  },
};

const fmt = (n: number) => `${n.toFixed(2)}%`;

/** Common formulas with a worked example (replaces the source's university table). */
export const formulaTable = {
  eyebrow: "Conversion formulas",
  heading: "Common CGPA conversion formulas",
  text: "Universities differ. The rule that applies to you is the one on your grade card or in your university's examination ordinance.",
  columns: ["Formula", "Example (8.0 CGPA)", "Where you'll see it"],
  rows: [
    ["Percentage = CGPA × 9.5", "8.0 × 9.5 = 76.00%", "CBSE's equivalence; adopted by many universities"],
    ["Percentage = CGPA × 10", "8.0 × 10 = 80.00%", "Straight 10-point scale on some transcripts"],
    ["Percentage = (CGPA − 0.75) × 10", "(8.0 − 0.75) × 10 = 72.50%", "Specified in some universities' ordinances"],
  ],
};

/** Ready-reference chart, computed with the calculator's own formulas and division bands. */
export const lookupTable = {
  eyebrow: "Quick lookup table",
  heading: "CGPA to percentage ready reference",
  text: "Side by side across × 9.5, × 10 and (CGPA − 0.75) × 10. The division column uses this calculator's bands on the × 9.5 figure; your university's bands may differ.",
  columns: ["CGPA (10 scale)", "× 9.5", "× 10", "(CGPA − 0.75) × 10", "Division (× 9.5)"],
  rows: [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5].map((c) => {
    const std = Math.min(100, round2(c * 9.5));
    return [c.toFixed(1), fmt(std), fmt(Math.min(100, c * 10)), fmt(Math.max(0, (c - 0.75) * 10)), division(std).label];
  }),
};

export const cgpaFaqs: Faq[] = [
  {
    q: "Why is 9.5 used as the multiplier for CGPA to percentage?",
    a: "CBSE arrived at 9.5 by comparing grades with marks: students at the top of the scale average about 95% rather than 100%, so CGPA × 9.5 gives a close equivalent percentage. Many universities adopted the same factor — but not all of them, so check the rule for yours.",
  },
  {
    q: "Which formula does my university use?",
    a: "It depends on the university, and sometimes on the programme and batch. The conversion rule is usually printed on the back of the grade card or marksheet, or set out in the university's examination ordinance (AKTU and other universities publish theirs on their websites). Pick the matching preset here or enter a custom multiplier, and quote that rule if an employer asks.",
  },
  {
    q: "How do I calculate overall CGPA from semester SGPAs?",
    a: "Add your Semester Grade Point Averages (SGPAs) across all completed semesters and divide by the number of semesters — or, if course credits vary between semesters, weight each SGPA by that semester's credits. The calculator's semester mode takes the simple average.",
  },
  {
    q: "What if my percentage is below 60%? Can I still get an IT job?",
    a: "Yes. Some mass recruiters keep a 60% cut-off, but many startups and product firms prioritise GitHub repositories, practical problem-solving and live project experience. Six months of industrial training with a portfolio-grade project helps bridge an academic gap.",
  },
  {
    q: "What is the (CGPA − 0.75) × 10 formula?",
    a: "Some universities subtract 0.75 before multiplying by 10, so an 8.0 CGPA becomes 72.5%. It gives a lower figure than × 9.5 or × 10 at most grades. Use it only if your university's ordinance or marksheet specifies it.",
  },
];

export const cgpaNext: NextLink[] = [
  {
    title: "Training matcher",
    text: "Pick your university, branch and semester to find the industrial training track that fits your year.",
    cta: "Match my semester",
    href: resourceRoutes.trainingMatcher,
  },
  {
    title: "AI Cold Email & LinkedIn DM Generator",
    text: "Generate personalised cold emails, follow-ups and 300-character LinkedIn connection notes for tech jobs.",
    cta: "Generate outreach message",
    href: resourceRoutes.coldEmail,
  },
  {
    title: "Placements & career support",
    text: "Resume building, mock interviews, aptitude and DSA practice, and hiring drives with our partner companies.",
    cta: "See how placement works",
    href: resourceRoutes.placements,
  },
];
