// 6 Weeks & 6 Months Training Matcher, from training-matcher.json. Only the
// semester changes the matched track (year = ceil(semester / 2), max 4); the
// university and branch only change the wording. The source's Punjab
// university list, its "colleges that train with us" list and its hard-coded
// "seats left" numbers are not used.
import { internshipBase } from "@/lib/site";
import { resourceRoutes } from "@/lib/resources/routes";
import type { NextLink } from "@/components/resources/Kit";

export const matcherHero = {
  eyebrow: "Free tool · Instant match",
  text: "Set your university, branch and semester — see the industrial training track and duration that fit your year, the live project tracks on offer and the documents you leave with.",
  badges: ["Training certificate", "Synopsis & report support", "100% practical live work"],
};

/** Offered as a select only; the match does not depend on it. */
export const universities = [
  "AKTU – Dr. A.P.J. Abdul Kalam Technical University",
  "University of Lucknow",
  "Integral University",
  "Amity University Lucknow",
  "BBAU – Babasaheb Bhimrao Ambedkar University",
  "SRMU – Shri Ramswaroop Memorial University",
  "Khwaja Moinuddin Chishti Language University",
  "Other",
];

export const branches = [
  { label: "CSE / IT / Computer Applications", icon: "code" },
  { label: "BCA / BCA-AI / B.Sc IT", icon: "terminal" },
  { label: "MCA / M.Sc IT / M.Tech CS", icon: "layers" },
  { label: "Mechanical & Automobile Engg.", icon: "cube" },
  { label: "Civil & Architectural Engg.", icon: "building" },
  { label: "ECE / EE / Electronics", icon: "bolt" },
  { label: "AI & Data Science / ML", icon: "sparkles" },
  { label: "MBA / BBA / Commerce", icon: "briefcase" },
] as const;

export const semesters = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export const DEFAULT_SEMESTER = 5;

export type YearTrack = { semesters: string; tag: string; title: string; blurb: string; href: string };

export const yearTracks: Record<1 | 2 | 3 | 4, YearTrack> = {
  1: {
    semesters: "1-2",
    tag: "First year track",
    title: "2-Week Foundation Workshop",
    blurb:
      "An early, low-pressure introduction to programming and tools. Most universities do not mandate training this early — this is optional groundwork.",
    href: internshipBase,
  },
  2: {
    semesters: "3-4",
    tag: "Second year track",
    title: "6 Weeks / 45 Days Summer Training",
    blurb:
      "Built for second-year summer industrial training: a guided project, the documents your department asks for and a training certificate.",
    href: `${internshipBase}/45-days`,
  },
  3: {
    semesters: "5-6",
    tag: "Pre-final year track",
    title: "6 Weeks / 2 Months Minor Project Training",
    blurb:
      "Builds a production-grade live project to strengthen your resume before campus recruitment, and to count toward pre-final-year training where your university requires it.",
    href: `${internshipBase}/45-days`,
  },
  4: {
    semesters: "7-8",
    tag: "Final year track",
    title: "6 Months Industrial Training with Internship",
    blurb: "A full technology stack, a client-style live project and an internship letter — built for placement season.",
    href: `${internshipBase}/6-months`,
  },
};

export const yearFor = (semester: number) => Math.min(4, Math.max(1, Math.ceil(semester / 2))) as 1 | 2 | 3 | 4;

export type ProjectTrack = {
  tag: string;
  title: string;
  weeks: string;
  blurb: string;
  stack: string[];
  includes: string[];
  /** Course preselected in the enquiry popup. */
  course: string;
};

export const projectTracks: ProjectTrack[] = [
  {
    tag: "Most popular",
    title: "MERN Stack Live Project",
    weeks: "6 Weeks",
    blurb:
      "Full-stack application development from scratch with authentication, REST APIs, database architecture, and cloud deployment.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Vercel / Render"],
    includes: ["1 Production-Grade Web App", "Complete GitHub Repository", "University-Format Project Report & Synopsis"],
    course: "MERN Full Stack",
  },
  {
    tag: "High demand",
    title: "Python, AI & Machine Learning Track",
    weeks: "6 Weeks",
    blurb: "Core Python algorithms, data analysis, and real-world predictive ML models with REST API building.",
    stack: ["Python 3", "Pandas", "NumPy", "Scikit-Learn", "FastAPI", "Streamlit"],
    includes: ["1 Live Predictive AI Project", "Model Evaluation Documentation", "Training Certificate"],
    course: "Machine Learning",
  },
  {
    tag: "Core corporate",
    title: "Java Full Stack Enterprise Development",
    weeks: "6 Weeks",
    blurb:
      "Enterprise backend architecture using Spring Boot, Hibernate, microservices concepts, and SQL database optimization.",
    stack: ["Core Java", "Spring Boot", "Hibernate", "MySQL", "REST APIs", "Postman"],
    includes: ["1 Enterprise CRUD Application", "Database Schema Docs", "Viva & Interview Prep Kit"],
    course: "Java Programming",
  },
  {
    tag: "Trending",
    title: "Cloud Computing & DevOps",
    weeks: "6 Weeks",
    blurb:
      "Deploy and manage applications on AWS and Azure with Docker containers, CI/CD pipelines, and infrastructure automation.",
    stack: ["AWS EC2/S3", "Azure", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
    includes: ["1 Deployed Cloud Application", "CI/CD Pipeline Documentation", "Training Certificate"],
    course: "DevOps Engineering",
  },
  {
    tag: "High demand",
    title: "Cybersecurity & Ethical Hacking",
    weeks: "6 Weeks",
    blurb: "Penetration testing, vulnerability assessment, network security, and web application security on a live lab.",
    stack: ["Kali Linux", "Wireshark", "Nmap", "Burp Suite", "Metasploit", "OWASP ZAP"],
    includes: ["Security Audit Report", "Vulnerability Assessment Documentation", "Project Report"],
    course: "Ethical Hacking",
  },
  {
    tag: "Web development",
    title: "PHP / Laravel Full Stack",
    weeks: "6 Weeks",
    blurb: "Server-side web development with PHP and Laravel, database design, REST APIs, and WordPress customisation.",
    stack: ["PHP 8", "Laravel", "MySQL", "REST APIs", "WordPress", "Composer", "cPanel"],
    includes: ["1 Dynamic Web Application", "Database Design Document", "Training Certificate"],
    course: "PHP Full Stack",
  },
];

export const compliance = {
  heading: "University compliance & project deliverables",
  text: "Every training track is structured around what universities usually ask for in an industrial training evaluation. Bring your department's format and we follow it.",
  items: [
    {
      title: "College synopsis & approval letter",
      body: "Formal project synopsis drafted within the first two weeks for department guide sign-off and HOD approval.",
    },
    {
      title: "Daily training diary & logbook",
      body: "Standardised documentation of daily learning modules, lab milestones, and weekly progress summaries.",
    },
    {
      title: "Final university project report",
      body: "Hard-copy and soft-copy report formatted to your university's guidelines, with architecture diagrams, code, and references.",
    },
    {
      title: "Live deployment & viva prep",
      body: "Live web application deployment or a certified CAD portfolio review, with mock viva sessions for external examiners.",
    },
  ],
};

export const counsellorCard = {
  heading: "Need custom session timing or a college letter?",
  text: "Our academic counsellors guide you through training synopsis submission, session timings and the letters your department asks for.",
};

export const matcherNext: NextLink[] = [
  {
    title: "Industrial training",
    text: "45 days / 6 weeks and 6 months, aligned to university requirements and closed with a training certificate or internship letter.",
    cta: "See the tracks",
    href: internshipBase,
  },
  {
    title: "Find my career track",
    text: "Four questions, then a matching course and a 90-day roadmap — development, AI, cyber, marketing, CAD or core programming.",
    cta: "Take the quiz",
    href: resourceRoutes.careerTrack,
  },
  {
    title: "College partnerships",
    text: "Workshops, mandated industrial training, faculty development and joint placement drives, run on your department's timetable.",
    cta: "Partner with us",
    href: resourceRoutes.partnerships,
  },
];
