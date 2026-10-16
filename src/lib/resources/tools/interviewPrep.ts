// AI Interview Prep. The Mohali page was only a landing page for an external
// app; here the tool is real (see /api/tools/interview-prep). The landing copy
// is kept but rewritten to describe what this tool actually does; the external
// app links, its rating/user-count claims and the two testimonials are dropped.
import { resourceRoutes } from "@/lib/resources/routes";
import type { NextLink } from "@/components/resources/Kit";
import type { Faq } from "./shared";

export const interviewTracks = [
  {
    title: "Full Stack & Web Engineering",
    text: "Component lifecycle, state management patterns, SSR vs CSR, caching strategies, and REST API optimization.",
    tags: ["React 19", "Next.js", "Node.js", "TypeScript", "Express", "REST/GraphQL"],
  },
  {
    title: "Python, AI & Data Science",
    text: "Vector databases, prompt engineering pipelines, agentic workflows, model evaluation, and ETL data engineering.",
    tags: ["Python", "FastAPI", "Pandas", "PyTorch", "RAG", "LangChain", "LLMs"],
  },
  {
    title: "Java & Enterprise Backend",
    text: "Multi-threading, garbage collection tuning, distributed transactions, Kafka streaming, and database normalization.",
    tags: ["Java 21", "Spring Boot", "Microservices", "Hibernate", "PostgreSQL"],
  },
  {
    title: "DevOps & Cloud Architecture",
    text: "Container orchestration, blue-green deployments, infrastructure as code, security hardening, and autoscaling.",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux"],
  },
  {
    title: "Data Structures & Algorithms",
    text: "Time and space complexity tradeoffs, algorithmic pattern matching, and optimal problem-solving breakdowns.",
    tags: ["Arrays & HashMaps", "Trees & Graphs", "Dynamic Programming", "Big-O"],
  },
  {
    title: "Behavioral & Leadership Rounds",
    text: "Structuring real workplace scenarios, explaining engineering conflicts, and articulating business value clearly.",
    tags: ["STAR Method", "Culture Fit", "Conflict Resolution", "Salary Pitch"],
  },
] as const;

export const trackTitles: readonly string[] = interviewTracks.map((t) => t.title);

export const experienceLevels = [
  "Fresher / final-year student",
  "Junior (1–2 years)",
  "Mid-level (3–5 years)",
  "Senior (5+ years)",
] as const;

export const QUESTION_MIN = 3;
export const QUESTION_MAX = 8;
export const ROLE_MAX = 160;

/** Example role / topic per track, shown as the input placeholder. */
export const rolePlaceholders: Record<string, string> = {
  "Full Stack & Web Engineering": "e.g. MERN developer — React hooks, auth, REST APIs",
  "Python, AI & Data Science": "e.g. ML engineer — RAG pipeline with LangChain",
  "Java & Enterprise Backend": "e.g. Spring Boot backend developer",
  "DevOps & Cloud Architecture": "e.g. DevOps engineer — Docker, Kubernetes on AWS",
  "Data Structures & Algorithms": "e.g. arrays, hashing and two-pointer problems",
  "Behavioral & Leadership Rounds": "e.g. HR round for a fresher software role",
};

export type InterviewQuestion = { question: string; answer: string; lookingFor: string };

/**
 * Parses the model's "Q1: … / Answer: … / Looking for: …" blocks. Returns an
 * empty list when the text does not follow the format, so the caller can show
 * the raw text instead.
 */
export function parseQuestions(text: string): InterviewQuestion[] {
  const blocks = text
    .replace(/\r\n/g, "\n")
    .split(/^\s*(?:\*\*)?Q(?:uestion)?\s*\d+\s*(?:\*\*)?\s*[:.)-]\s*/im)
    .slice(1);
  const out: InterviewQuestion[] = [];
  for (const block of blocks) {
    const m = block.match(
      /^([\s\S]*?)\n\s*(?:\*\*)?(?:Model\s+)?Answer(?:\*\*)?\s*:\s*([\s\S]*?)\n\s*(?:\*\*)?Looking\s+for(?:\*\*)?\s*:\s*([\s\S]*)$/i,
    );
    if (!m) continue;
    const [question, answer, lookingFor] = [m[1], m[2], m[3]].map((s) => s.replace(/\*\*/g, "").trim());
    if (question && answer) out.push({ question, answer, lookingFor });
  }
  return out;
}

export const interviewHero = {
  eyebrow: "Free AI tool · Questions for your role",
  text: "Generic question lists don't match the job you're applying for. Pick your track, role and level, and get interview questions with model answers and what the interviewer is really listening for.",
  badges: ["100% free", "Model answers included", "Six interview tracks", "No sign-up"],
};

export const bottlenecks = {
  eyebrow: "Why traditional prep fails",
  text: "Most developers fail interviews not because they can't code, but because they can't explain their projects — or their resumes never get seen.",
  cards: [
    {
      tag: "ATS screen filter",
      title: "Resume getting rejected?",
      problem:
        "Many developer resumes are filtered out by applicant tracking systems (ATS) before a recruiter or engineering manager ever reads them.",
      solution:
        "Generate questions for the exact role you're targeting: the model answers show which skills and keywords that role is tested on, so you can make sure your resume shows them too.",
    },
    {
      tag: "Code grill defence",
      title: "Can't explain your projects?",
      problem:
        "Interviewers grill you on architectural tradeoffs, database indexes, API bottlenecks and edge cases in your projects. Reciting memorised answers immediately raises red flags.",
      solution:
        "Describe your stack or project in the role box. The AI writes the follow-up questions interviewers ask about tradeoffs, edge cases and design decisions — and what a strong answer covers.",
    },
    {
      tag: "Pressure simulation",
      title: "Blanking in technical rounds?",
      problem:
        "Freezing up or stumbling over live coding, system design or unexpected deep-dive questions under the scrutiny of senior interviewers.",
      solution:
        "Answer each question out loud before you reveal the model answer, then compare. A fresh set every time means you practise thinking, not memorising.",
    },
  ],
};

export const prepSteps = [
  {
    title: "Pick your track",
    text: "Full stack, Python & AI, Java, DevOps & cloud, DSA or behavioural — and your experience level.",
  },
  {
    title: "Describe the role or topic",
    text: "Name the job, the stack or the project you expect to be asked about. The more specific, the sharper the questions.",
  },
  {
    title: "Generate your questions",
    text: "Get 3 to 8 questions, each with a model answer and a note on what the interviewer is checking.",
  },
  {
    title: "Practise and compare",
    text: "Answer out loud first, then compare with the model answer. Regenerate for a new set whenever you like.",
  },
];

export const advantage = {
  eyebrow: "techcadd Lucknow advantage",
  paragraphs: [
    "At techcadd Lucknow, our 6 Months Industrial Training, diploma programmes and placement preparation combine in-person coaching with practice you can do on your own.",
    "You build real projects with trainers in our labs, refine your architecture, and rehearse explaining it — with tools like this one at home and with a mentor before the real interview.",
  ],
  bullets: [
    "Placement support from a dedicated placement cell",
    "Resume and LinkedIn reviews before you apply",
    "1:1 mentor mock interviews before actual company interviews",
  ],
};

export const interviewFaqs: Faq[] = [
  {
    q: "How does the AI generate questions for my role?",
    a: "You choose a track and level and describe the role or topic — for example \"React developer, hooks and state management\". The AI writes questions an interviewer for that role would plausibly ask, each with a model answer and a note on what the interviewer is checking. It doesn't read your code or resume, so name the stack and projects you want to be asked about.",
  },
  {
    q: "Is there any charge or sign-up?",
    a: "No. The tool is free and needs no account or card. Generate a fresh set of questions whenever you want to practise.",
  },
  {
    q: "Can I trust the model answers?",
    a: "Treat them as a strong starting point, not gospel. AI can occasionally be wrong or out of date, so check anything you're unsure of against official documentation — and put the answer in your own words, using your own projects as examples.",
  },
  {
    q: "How does this complement techcadd Lucknow's classroom training?",
    a: "At techcadd Lucknow, students work on live projects and get in-person mentorship. Practising with AI-generated questions at home sharpens impromptu communication and technical explanation between classroom reviews and mentor mock interviews.",
  },
  {
    q: "Which roles and domains are supported?",
    a: "Six tracks: full stack and web, Python / AI / data science, Java enterprise backend, DevOps and cloud, data structures and algorithms, and behavioural rounds — from fresher to senior level. Within a track you can name any role, such as frontend, backend, data analyst, ML engineer or SOC analyst.",
  },
];

export const interviewNext: NextLink[] = [
  {
    title: "AI Cold Email & LinkedIn DM Generator",
    text: "Generate personalised cold emails, follow-up messages and 300-character LinkedIn connection notes for tech jobs.",
    cta: "Generate outreach message",
    href: resourceRoutes.coldEmail,
  },
  {
    title: "Tech interview questions & answers",
    text: "Frequently asked technical and HR interview questions for MERN, Python, data science, AI and HR rounds.",
    cta: "Review interview questions",
    href: resourceRoutes.interviewQa,
  },
  {
    title: "Salary estimator",
    text: "Indicative fresher and two-year salary ranges by role across Lucknow, Delhi NCR and remote work.",
    cta: "Check the ranges",
    href: resourceRoutes.salary,
  },
];
