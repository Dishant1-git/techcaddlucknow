// Bolds the key terms in a paragraph — tools, domains, durations, degrees and
// the words students scan for — slightly, without colour or underline. Only a
// term's first mention in a paragraph is bolded, so the copy stays readable.
import { Fragment, type ReactNode } from "react";
import { internshipDomains } from "@/lib/internshipDomains";
import { site } from "@/lib/site";

const terms = [
  // Durations and the training itself
  "45 days", "45-day", "45 Days", "six weeks", "six-week", "six months", "Six months", "six-month", "Six-month",
  "mini project", "capstone", "portfolio", "syllabus", "certificate", "placement", "internship", "industrial training",
  "in writing", "authorised", "baseline", "README", "university", "skill check", "counselling",
  // Who it is for
  "B.Tech", "BCA", "MCA", "B.Sc", "BBA", "B.Com", "diploma",
  site.city,
  // Tools and technologies
  "Python", "SQL", "Excel", "Power BI", "DAX", "pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter",
  "HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "REST", "JWT", "Flask", "Django",
  "Git", "GitHub", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Linux", "Bash", "CI/CD", "IAM",
  "Flutter", "Dart", "Firebase", "Figma", "WordPress", "Canva",
  "AutoCAD", "SolidWorks", "Wireshark", "Nmap", "Burp Suite", "OWASP",
  "Google Ads", "Meta Ads", "Google Analytics", "SEO", "PowerPoint", "Google Forms",
  "machine learning", "deep learning", "neural network", "NLP", "generative AI", "large language models", "ChatGPT", "RAG",
  // Domain names
  ...internshipDomains.map((d) => d.label),
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

// Longest first, so "Google Ads" wins over "Google" and "six-month" over "six".
const pattern = new RegExp(
  `(?<![\\w-])(${[...new Set(terms)].sort((a, b) => b.length - a.length).map(escape).join("|")})(?![\\w-])`,
  "g",
);

export function Hl({ children }: { children?: string | null }): ReactNode {
  if (!children) return null;
  const seen = new Set<string>();
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of children.matchAll(pattern)) {
    const key = m[0].toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(children.slice(last, m.index), <strong key={m.index} className="font-semibold">{m[0]}</strong>);
    last = m.index + m[0].length;
  }
  out.push(children.slice(last));
  return <Fragment>{out}</Fragment>;
}
