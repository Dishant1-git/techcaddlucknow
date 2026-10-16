// Salary & career growth estimator, from salary-estimator.json.
// range = base[role][level] × multiplier[location][level], each bound rounded
// to one decimal. The source's "Punjab / Tricity" location is "Lucknow" here,
// with the same multiplier of 1.
// TODO: confirm salary ranges for the Lucknow market — the base figures are the
// Mohali site's, compiled for Punjab / Tricity.
import { resourceRoutes } from "@/lib/resources/routes";
import type { NextLink } from "@/components/resources/Kit";
import { courseLabel, courseLink } from "./shared";

export const salaryHero = {
  eyebrow: "Free tool · No form required",
  text: "Pick a role to see indicative fresher and 2-year salary ranges in Lucknow, Delhi NCR and remote work — and the kinds of employers that hire for it.",
  badges: ["100% free — always", "Results shown instantly", "No spam, ever"],
};

export const locations = [
  { id: "lucknow", label: "Lucknow", fresher: 1, after2: 1 },
  { id: "ncr", label: "Delhi NCR", fresher: 1.25, after2: 1.25 },
  { id: "remote", label: "Remote / Freelance", fresher: 1.05, after2: 1.35 },
] as const;

export type LocationId = (typeof locations)[number]["id"];

export type Role = {
  title: string;
  article: "a" | "an";
  icon: string;
  blurb: string;
  hiredAt: string[];
  courseHref: string;
  /** Course preselected in the enquiry popup, when there is one. */
  course?: string;
  courseCta: string;
  fresher: [number, number];
  after2: [number, number];
};

const role = (
  title: string,
  article: "a" | "an",
  icon: string,
  blurb: string,
  hiredAt: string[],
  slugOrHref: string,
  courseCta: string,
  fresher: [number, number],
  after2: [number, number],
): Role => ({
  title,
  article,
  icon,
  blurb,
  hiredAt,
  courseHref: courseLink(slugOrHref),
  course: courseLabel(slugOrHref),
  courseCta,
  fresher,
  after2,
});

export const roles: Role[] = [
  role(
    "Full-Stack Developer",
    "a",
    "code",
    "Builds and ships complete web applications, front to back.",
    [
      "Product & SaaS startups in Lucknow",
      "IT services & staffing companies across Lucknow and NCR",
      "Remote-first teams and freelance marketplaces",
      "MNC captive development centres",
    ],
    "mern-full-stack",
    "Explore MERN Stack",
    [2.4, 4.5],
    [5, 9],
  ),
  role(
    "SEO Specialist",
    "an",
    "search",
    "Ranks websites organically and drives qualified traffic through content and technical SEO.",
    [
      "Digital marketing agencies across Lucknow and NCR",
      "E-commerce & D2C brands",
      "SaaS and IT companies' in-house marketing teams",
      "Freelance & consulting for local businesses",
    ],
    "digital-marketing",
    "Explore Digital Marketing",
    [2.2, 3.6],
    [4, 7],
  ),
  role(
    "Data Analyst",
    "a",
    "chart",
    "Turns raw business data into dashboards and decisions using SQL, Excel and BI tools.",
    [
      "IT & analytics teams in Lucknow",
      "BPO / KPO and shared-services centres",
      "E-commerce and fintech companies",
      "Remote analytics teams for global clients",
    ],
    "data-analytics",
    "Explore Data Analytics",
    [2.6, 4.2],
    [5, 8.5],
  ),
  role(
    "CAD Designer",
    "a",
    "cube",
    "Produces 2D drafts and 3D models for mechanical, civil and architectural projects.",
    [
      "Manufacturing & auto-ancillary units in Uttar Pradesh",
      "Architecture & interior design studios",
      "Civil & infrastructure consultancies",
      "Freelance drafting for design firms",
    ],
    "autocad",
    "Explore AutoCAD",
    [2, 3.5],
    [4, 6.5],
  ),
  role(
    "Python Developer",
    "a",
    "terminal",
    "Writes backend services, automation scripts and data pipelines in Python.",
    [
      "Product & SaaS startups",
      "IT services companies across Lucknow and NCR",
      "Fintech & automation teams",
      "Remote backend roles for global clients",
    ],
    "python-programming",
    "Explore Python",
    [2.5, 4.2],
    [5, 8.5],
  ),
  role(
    "Java Developer",
    "a",
    "layers",
    "Builds enterprise backend systems and APIs with Java and Spring Boot.",
    [
      "Enterprise IT & product companies",
      "Banking & fintech captive units",
      "IT services companies across Lucknow and NCR",
      "MNC captive development centres",
    ],
    "java-programming",
    "Explore Java",
    [2.6, 4.4],
    [5.5, 9],
  ),
  role(
    "Digital Marketing Executive",
    "a",
    "megaphone",
    "Runs paid, social and content campaigns end to end and reports on performance.",
    [
      "Digital marketing & ad agencies",
      "D2C and e-commerce brands",
      "IT companies' in-house growth teams",
      "Freelance & client-side consulting",
    ],
    "digital-marketing",
    "Explore Digital Marketing",
    [2.2, 3.6],
    [4.5, 7.5],
  ),
  role(
    "AI / ML Engineer",
    "an",
    "sparkles",
    "Trains, evaluates and deploys machine learning models into production systems.",
    [
      "AI-first product startups",
      "IT services companies' AI practices",
      "Fintech & healthtech companies",
      "Remote ML roles for global clients",
    ],
    "machine-learning",
    "Explore Machine Learning",
    [3.5, 6],
    [7, 13],
  ),
  role(
    "Cloud / DevOps Engineer",
    "a",
    "cloud",
    "Deploys, automates and scales infrastructure on AWS and Azure with CI/CD.",
    [
      "SaaS & product companies",
      "IT services & MNC captive units",
      "Fintech & e-commerce platforms",
      "Remote DevOps roles for global teams",
    ],
    "cloud-computing",
    "Explore Cloud & DevOps",
    [3, 5],
    [6.5, 11],
  ),
  role(
    "Cybersecurity Analyst",
    "a",
    "shield",
    "Monitors, investigates and responds to security threats across networks and systems.",
    [
      "SOC teams at IT services companies",
      "Banking & fintech security desks",
      "MNC captive security operations",
      "Freelance security audits & consulting",
    ],
    "cyber-security",
    "Explore Cyber Security",
    [2.8, 4.8],
    [5.5, 10],
  ),
  role(
    "Android Developer",
    "an",
    "monitor",
    "Builds and ships native and cross-platform Android applications.",
    [
      "Product & app startups",
      "IT services companies across Lucknow and NCR",
      "Consumer app & gaming studios",
      "Freelance app development",
    ],
    "/courses?category=development",
    "Explore Development Courses",
    [2.4, 4],
    [5, 8.5],
  ),
  role(
    "UI/UX & Web Designer",
    "a",
    "target",
    "Designs interfaces and user flows for web and mobile products.",
    [
      "Product & SaaS startups",
      "Design & branding studios",
      "IT services companies' design teams",
      "Freelance & client-side design work",
    ],
    "web-designing",
    "Explore Web Designing",
    [2.2, 3.8],
    [4.5, 8],
  ),
];

const r1 = (n: number) => Math.round(n * 10) / 10;
const num = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export type Estimate = { low: number; high: number; label: string; width: number };

function estimate([lo, hi]: [number, number], m: number): Estimate {
  const low = r1(lo * m);
  const high = r1(hi * m);
  return {
    low,
    high,
    label: `₹${num(low)}–${num(high)} LPA`,
    width: Math.min(100, Math.round(((low + high) / 2 / 15) * 100)),
  };
}

export function estimateFor(r: Role, location: LocationId) {
  const loc = locations.find((l) => l.id === location) ?? locations[0];
  return { fresher: estimate(r.fresher, loc.fresher), after2: estimate(r.after2, loc.after2), location: loc.label };
}

export const salaryNext: NextLink[] = [
  {
    title: "Placements & career support",
    text: "Resume building, mock interviews, aptitude and DSA practice, and hiring drives with our partner companies.",
    cta: "See how placement works",
    href: resourceRoutes.placements,
  },
  {
    title: "Find my career track",
    text: "Four questions, then a matching course and a 90-day roadmap — development, AI, cyber, marketing, CAD or core programming.",
    cta: "Take the quiz",
    href: resourceRoutes.careerTrack,
  },
  {
    title: "All courses",
    text: "Job-oriented tracks in AI, full stack, data, cyber security, cloud, digital marketing and CAD, each with live projects and placement support.",
    cta: "Browse the catalogue",
    href: "/courses",
  },
];
