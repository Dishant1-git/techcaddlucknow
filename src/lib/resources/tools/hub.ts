// /tools hub: the six tools and the learning-hub cards. Copy is adapted from
// tools-hub.json; claims about Punjab universities, seat counts and partner
// numbers that do not apply to the Lucknow tools have been left out.
import { resourceRoutes } from "@/lib/resources/routes";
import type { NextLink } from "@/components/resources/Kit";

export const hubHero = {
  eyebrow: "100% free · No registration required",
  text: "Make confident career choices with our free tools: salary ranges, a career-track quiz, a training matcher for your semester, AI interview practice, a CGPA converter and an outreach writer.",
  badges: ["100% free", "Instant results", "AI interview practice", "No sign-up or spam"],
};

export type ToolCard = {
  key: "salary" | "career" | "training" | "interview" | "cgpa" | "email";
  badge: string;
  eyebrow: string;
  title: string;
  href: string;
  text: string;
  bullets: string[];
};

export const toolCards: ToolCard[] = [
  {
    key: "salary",
    badge: "Popular",
    eyebrow: "Interactive calculator",
    title: "Salary & Career Growth Estimator",
    href: resourceRoutes.salary,
    text: "Compare indicative fresher and 2-year salary ranges for full stack, Python, AI / ML, data, cyber security, cloud and CAD roles in Lucknow, Delhi NCR and remote work.",
    bullets: ["Fresher vs. 2-year ranges", "Where each role gets hired", "Lucknow vs. NCR vs. remote"],
  },
  {
    key: "career",
    badge: "Recommended",
    eyebrow: "Diagnostic quiz",
    title: "Find My Career Track Quiz",
    href: resourceRoutes.careerTrack,
    text: "Answer 4 quick questions to find the track that fits your interests and background, with a recommended course and a free 90-day roadmap.",
    bullets: ["4-question quiz", "90-day action plan", "Print or save as PDF"],
  },
  {
    key: "training",
    badge: "For students",
    eyebrow: "Industrial training",
    title: "6 Weeks & 6 Months Training Matcher",
    href: resourceRoutes.trainingMatcher,
    text: "Pick your university, branch and semester to see which industrial training track fits your year, the live project tracks on offer and the documents you leave with.",
    bullets: ["Semester-to-track match", "Six live project tracks", "Synopsis, diary & report support"],
  },
  {
    key: "interview",
    badge: "AI powered",
    eyebrow: "AI interview practice",
    title: "AI Interview Prep",
    href: resourceRoutes.interviewPrep,
    text: "Choose a track, role and experience level and get interview questions written by AI, each with a model answer and what the interviewer is listening for.",
    bullets: ["Questions for your role & level", "Model answers to study", "Six tracks, DSA & behavioural included"],
  },
  {
    key: "cgpa",
    badge: "Student essential",
    eyebrow: "Grade conversion",
    title: "CGPA to Percentage Calculator",
    href: resourceRoutes.cgpa,
    text: "Convert a 10-point CGPA, or the average of your semester SGPAs, to a percentage with the common conversion formulas — plus a placement-eligibility check.",
    bullets: ["× 9.5, × 10 and (CGPA − 0.75) × 10", "Semester-wise SGPA average", "Placement eligibility check"],
  },
  {
    key: "email",
    badge: "AI powered",
    eyebrow: "Job outreach",
    title: "AI Cold Email & LinkedIn DM Generator",
    href: resourceRoutes.coldEmail,
    text: "Generate cold emails, follow-ups and 300-character LinkedIn connection notes for tech internships, fresher roles and referral requests — then polish the draft with AI.",
    bullets: ["Cold email with subject & follow-up", "300-character LinkedIn note", "One-click AI polish"],
  },
];

export const hubResources = [
  {
    badge: "Free download",
    title: "Free Study Materials & Cheat Sheets",
    href: resourceRoutes.studyMaterial,
    text: "Quick references for React, Next.js, Python, RAG architectures, Docker, Linux and CAD shortcuts.",
  },
  {
    badge: "Interview prep",
    title: "Tech Interview Q&A Hub",
    href: resourceRoutes.interviewQa,
    text: "Frequently asked technical and HR interview questions for freshers and junior developers across MERN, Python, data science, cyber security and cloud.",
  },
  {
    badge: "Live projects",
    title: "Student Capstone Portfolio",
    href: resourceRoutes.projects,
    text: "Capstone applications built by techcadd students, with their architecture, demo links and code.",
  },
  {
    badge: "For recruiters",
    title: "Certificate Verification",
    href: resourceRoutes.verifyCertificate,
    text: "For HR teams, background-verification agencies and universities: look up a techcadd certificate by its certificate number.",
  },
];

export const hubNext: NextLink[] = [
  {
    title: "Find my career track",
    text: "Four questions, then a matching course and a 90-day roadmap — development, AI, cyber, marketing, CAD or core programming.",
    cta: "Take the quiz",
    href: resourceRoutes.careerTrack,
  },
  {
    title: "AI Interview Prep",
    text: "Practise technical and behavioural interview questions for your role, with model answers and what interviewers look for.",
    cta: "Prepare with AI",
    href: resourceRoutes.interviewPrep,
  },
  {
    title: "CGPA to Percentage Calculator",
    text: "Convert your CGPA with the common formulas and check it against typical placement cut-offs.",
    cta: "Calculate my percentage",
    href: resourceRoutes.cgpa,
  },
];
