// AI Cold Email & LinkedIn DM generator. The instant drafts are the source's
// client-side templates (cold-email.json), kept verbatim. Two things that were
// cosmetic on the source now change the draft:
//  - "Who are you messaging?" picks the opening hook of the email, using the
//    source's own hooks where they fit (tech lead, alum, founder);
//  - "Regenerate variation" switches the subject line for every goal (the
//    source only did this for the internship goal).
// "Improve with AI" (/api/tools/cold-email) polishes the current draft.
import { site } from "@/lib/site";
import { resourceRoutes } from "@/lib/resources/routes";
import type { NextLink } from "@/components/resources/Kit";
import type { Faq } from "./shared";

export const emailTracks = [
  {
    id: "mern",
    label: "Full Stack Developer (MERN / Next.js)",
    defaultSkills: "React 19, Next.js, Node.js, Express, MongoDB, TypeScript",
    defaultProject: "Production E-Commerce Platform with Stripe payments & SSR",
  },
  {
    id: "ai_python",
    label: "Python & AI / ML Engineer",
    defaultSkills: "Python, FastAPI, PyTorch, LangChain, RAG Pipelines, Vector DBs",
    defaultProject: "Multi-Agent AI Document Assistant with RAG & LangChain",
  },
  {
    id: "data_analyst",
    label: "Data Analyst / Data Scientist",
    defaultSkills: "Python, SQL, Power BI, Pandas, Scikit-Learn, Tableau",
    defaultProject: "Customer Churn Prediction Dashboard with 92% model accuracy",
  },
  {
    id: "devops_cloud",
    label: "Cloud & DevOps Engineer",
    defaultSkills: "Docker, Kubernetes, AWS, GitHub Actions, Terraform, Linux",
    defaultProject: "Automated Microservices CI/CD Pipeline on AWS ECS with zero downtime",
  },
  {
    id: "cyber",
    label: "Cyber Security Analyst",
    defaultSkills: "Network Security, Wireshark, Penetration Testing, OWASP Top 10, Linux",
    defaultProject: "Enterprise Web Vulnerability Assessment & Hardening Audit Report",
  },
] as const;

export type TrackId = (typeof emailTracks)[number]["id"];

export const goals = [
  { id: "internship", label: "6 Months Training / Internship" },
  { id: "fresher_job", label: "Fresher Developer Job (0-1 Yrs)" },
  { id: "referral", label: "Referral Request for Open Role" },
  { id: "feedback", label: "Project Review & Quick Coffee Chat" },
] as const;

export type GoalId = (typeof goals)[number]["id"];

export const recipients = [
  { id: "founder", label: "Startup Founder / CEO" },
  { id: "hr", label: "Corporate HR / Talent Recruiter" },
  { id: "tech_lead", label: "Engineering Manager / Tech Lead" },
  { id: "alumni", label: "Senior Engineer / Alum (Referral)" },
] as const;

export type RecipientId = (typeof recipients)[number]["id"];

export const trackLabels: readonly string[] = emailTracks.map((t) => t.label);
export const goalIds: readonly string[] = goals.map((g) => g.id);
export const recipientIds: readonly string[] = recipients.map((r) => r.id);

export type EmailInputs = {
  track: TrackId;
  goal: GoalId;
  recipientType: RecipientId;
  recipientName: string;
  company: string;
  yourName: string;
  degree: string;
  skills: string;
  project: string;
  github: string;
  /** 0 or 1: "Style 1 of 2" / "Style 2 of 2". */
  variation: number;
};

export const defaultInputs: EmailInputs = {
  track: "mern",
  goal: "internship",
  recipientType: "founder",
  recipientName: "Priya",
  company: "Acme Technologies",
  yourName: "Aman Sharma",
  degree: "B.Tech CSE, AKTU",
  skills: emailTracks[0].defaultSkills,
  project: emailTracks[0].defaultProject,
  github: "github.com/amansharma-dev",
  variation: 0,
};

export const LINKEDIN_LIMIT = 300;

export type Drafts = {
  subject: string;
  body: string;
  followUp: string;
  linkedinNote: string;
  linkedinDm: string;
};

const brand = `${site.name} ${site.city}`;

/** Opening hook by recipient. Founder, tech lead and alum reuse the source's hooks. */
function hook(r: RecipientId, company: string, trackShort: string) {
  switch (r) {
    case "tech_lead":
      return `I’ve been following ${company}’s engineering work, especially your focus on building performant web products.`;
    case "alumni":
      return `Hope you're having a great week! I came across your profile on LinkedIn and was really inspired by your journey at ${company}.`;
    case "hr":
      return `I'm writing to introduce myself for ${trackShort} opportunities at ${company} — I've kept this short and put my project proof up front.`;
    default:
      return `I'm reaching out because I love what ${company} is building and would love to contribute as a ${trackShort}.`;
  }
}

/** Builds every draft from the inputs. Pure; re-run on every keystroke. */
export function buildDrafts(i: EmailInputs): Drafts {
  const track = emailTracks.find((t) => t.id === i.track) ?? emailTracks[0];
  const trackShort = track.label.split("(")[0].trim();
  const S = i.yourName.trim();
  const P = i.degree.trim();
  const z = i.skills.trim();
  const E = i.project.trim();
  const L = i.github.trim();
  const u = i.recipientName.trim() || "Hiring Team";
  const c = i.company.trim() || "your engineering team";
  const m = i.recipientName.trim() || "there";
  const x = i.company.trim() || "your team";
  const h = i.company.trim() || "your company";
  const firstTwo = z.split(",").slice(0, 2).join(",");
  const alt = i.variation % 2 === 1;
  const open = hook(i.recipientType, c, trackShort);

  let subject: string;
  let body: string;
  let followUp: string;

  if (i.goal === "internship") {
    subject = alt
      ? `Quick question regarding ${c}'s engineering internship — ${S}`
      : `Application: 6 Months Industrial Trainee (${trackShort}) — ${S}`;
    body = `Hi ${u},\n\n${open}\n\nI am a final-year student (${P}) trained at ${brand}, specializing in ${z}. Rather than just coursework, I’ve built practical production projects, including a ${E} (${L}).\n\nI’m looking for a 6-month industrial internship starting this semester. Could I contribute to your team by shipping bug fixes, writing modular components, and assisting your senior engineers?\n\nI’ve attached my resume and live GitHub repository. Would you be open to a 10-minute introductory call next Tuesday?\n\nBest regards,\n${S}\n${L}\n+91 98XXX XXXXX`;
    followUp = `Hi ${u},\n\nI know you're busy scaling ${c}, so I wanted to gently follow up on my note from earlier this week regarding an engineering internship.\n\nSince then, I’ve open-sourced a new update for my ${E} addressing API latency and edge-case handling (${L}).\n\nI’d love 10 minutes to share how I can assist your team right away. If the timing isn't right, no worries at all!\n\nBest,\n${S}`;
  } else if (i.goal === "referral") {
    subject = alt
      ? `Could you refer me for the ${trackShort} role at ${c}? — ${S}`
      : `Referral request for ${trackShort} role at ${c} — ${S}`;
    body = `Hi ${u},\n\n${open}\n\nI am applying for the Junior ${trackShort} opening (Job ID: #1042). I have hands-on experience in ${z} and recently completed an end-to-end ${E}.\n\nGiven your expertise with the team, would you be open to reviewing my code repository (${L}) and considering me for an internal referral?\n\nI've made sure to keep my resume concise and tailored. Thank you for your time and guidance!\n\nWarm regards,\n${S}\nLinkedIn: in/${S.toLowerCase().replace(/\s+/g, "")}`;
    followUp = `Hi ${u},\n\nFollowing up briefly in case this got buried in your inbox. If you have 3 minutes to review my resume or GitHub (${L}), I'd be incredibly grateful.\n\nRegardless, keep up the amazing work at ${c}!\n\nBest,\n${S}`;
  } else {
    subject = alt
      ? `${trackShort} with live projects — 10 minutes to show you? (${S})`
      : `Junior ${trackShort} candidate — ${S} (Projects & Code inside)`;
    body = `Hi ${u},\n\n${open}\n\nOver the past 6 months at ${brand}, I've spent 600+ hours coding with ${z}. My flagship project is a ${E}, featuring responsive design, clean architecture, and live deployment at ${L}.\n\nI’m ready to hit the ground running without needing months of hand-holding. Are you available for a brief 10-minute chat this week to discuss how I can add value to your roadmap?\n\nCheers,\n${S}\nGitHub: ${L}`;
    followUp = `Hi ${u},\n\nQuick follow-up on my note below. I understand you receive dozens of emails daily, so I’ll keep it brief: I'm ready to take a technical test or build a small take-home assignment to prove my abilities.\n\nLet me know if you have 5 minutes this Thursday!\n\nBest,\n${S}`;
  }

  const linkedinNote =
    i.goal === "internship"
      ? `Hi ${m}, love ${x}'s tech work! I'm a ${P} grad trained in ${firstTwo}. Built a live ${E.split(" ")[0]} project (${L}). Seeking 6M internship—would love to connect!`
      : i.goal === "referral"
        ? `Hi ${m}, inspired by your work at ${x}! I'm applying for the ${trackShort} role with strong skills in ${firstTwo}. Would love to connect and seek your guidance/referral.`
        : `Hi ${m}, admire ${x}'s engineering! I'm a ${trackShort} skilled in ${firstTwo}. Built live production projects at ${L}. Would love to connect!`;

  const linkedinDm = `Hi ${m},\n\nThanks for connecting! I've been following ${h}'s tech updates and really admire your engineering culture.\n\nI'm a ${trackShort} specializing in ${z}. Recently, I engineered a ${E}, resolving key performance and architectural challenges (Live code: ${L}).\n\nI'm actively exploring ${i.goal === "internship" ? "a 6-month industrial internship" : "entry-level developer opportunities"} and would love to know if your team is open to motivated freshers who can write clean, production-ready code.\n\nWould you be open to a 5-minute call or reviewing my resume?\n\nBest,\n${S}`;

  return { subject, body, followUp, linkedinNote, linkedinDm };
}

/** Splits the AI reply "Subject: …" + body. Null when there is no subject line. */
export function parseEmail(text: string): { subject: string; body: string } | null {
  const t = text.replace(/\r\n/g, "\n").trim();
  const m = t.match(/^\s*(?:\*\*)?Subject(?:\*\*)?\s*:\s*(.+)\n+([\s\S]+)$/i);
  if (!m) return null;
  const subject = m[1].replace(/\*\*/g, "").trim();
  const body = m[2].replace(/^\s*(?:\*\*)?Body(?:\*\*)?\s*:\s*/i, "").trim();
  return subject && body ? { subject, body } : null;
}

export const SUBJECT_MAX = 200;
export const BODY_MAX = 3000;

export const coldEmailHero = {
  eyebrow: "Free outreach tool · Built for developers & students",
  text: "Stop sending boring messages that get ignored. Generate personalised cold emails, follow-ups and 300-character LinkedIn notes that get you tech interviews — then polish the draft with AI.",
  badges: [
    "100% free — instant drafts",
    "Strict 300-char LinkedIn note check",
    "Day-4 follow-up templates included",
    "Optional AI polish",
  ],
};

export const tips = {
  heading: `${site.name} placement cell rules for better reply rates`,
  tips: [
    { label: "Best time:", text: "Send between 9:30 AM and 11:30 AM, Tuesday to Thursday." },
    { label: "Proof over claims:", text: "Always link a deployed URL or GitHub repo rather than a generic PDF attachment." },
    { label: "Keep it under 120 words:", text: "Busy founders and engineering managers read email on their phones in seconds." },
    { label: "Always follow up:", text: "Many replies only come after a polite follow-up sent 3–4 days later." },
  ],
  footer: {
    text: "Need interview practice before speaking to recruiters?",
    cta: "Practise with AI interview prep",
    href: resourceRoutes.interviewPrep,
  },
};

export const anatomy = {
  eyebrow: "Proven outreach anatomy",
  text: "Written to be read in seconds on a phone by busy engineering managers and founders.",
  items: [
    {
      title: "1. The relevance hook",
      text: "Never start with 'I hope this finds you well.' Start with genuine recognition of what their engineering team or company just shipped.",
    },
    {
      title: "2. Tangible code proof",
      text: "Claims mean nothing without proof. Mention your live deployed capstone and GitHub link right in the second paragraph.",
    },
    {
      title: "3. Clear immediate value",
      text: "Explain what tasks you can take off their plate immediately (shipping frontend components, resolving backlog bugs, writing automated unit tests).",
    },
    {
      title: "4. Zero-friction CTA",
      text: "Don't ask for a 30-minute interview. Ask for a casual 10-minute introductory call or invite them to glance at your repository.",
    },
  ],
};

export const coldEmailFaqs: Faq[] = [
  {
    q: "Why do cold emails work better than standard job portal applications?",
    a: "A single opening on a job board (Naukri, Indeed, LinkedIn Jobs) can draw hundreds of applicants, and resumes get lost in ATS filters. Cold emailing an engineering manager or founder directly puts your live project proof in their inbox with far less competition.",
  },
  {
    q: "What is the secret to high reply rates on LinkedIn connection notes?",
    a: "Keep it strictly under 300 characters, personalise the recipient's name, mention 1-2 core skills, and provide a direct link to your code or project proof. Do not pitch immediately in the connection note; establish mutual technical respect first.",
  },
  {
    q: "Why is the follow-up email so important?",
    a: "Recruiters and founders are busy, and many positive replies only arrive after a follow-up sent 3–4 days later. A polite, value-adding follow-up shows persistence and professionalism.",
  },
  {
    q: "Can I use these templates for 6 Months Industrial Training applications?",
    a: "Yes! The generator includes templates written specifically for final-year B.Tech, BCA, MCA and polytechnic students applying for 6 Months Industrial Training internships.",
  },
  {
    q: "What does \"Improve with AI\" change?",
    a: "It rewrites your current draft to be tighter and more specific to the person you're messaging, keeping your name, links, skills and project as you entered them. Your template version is kept, so you can switch back at any time. Always read the result before you send it.",
  },
  {
    q: `How does ${site.name} ${site.city} support students in reaching recruiters?`,
    a: `Alongside full-stack coding and live project work, ${site.name} ${site.city}'s placement cell connects students with hiring partners, arranges campus drives and reviews portfolio outreach material.`,
  },
];

export const coldEmailNext: NextLink[] = [
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
  {
    title: "Placements & career support",
    text: "Resume building, mock interviews, aptitude and DSA practice, and hiring drives with our partner companies.",
    cta: "See how placement works",
    href: resourceRoutes.placements,
  },
];
