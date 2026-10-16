// Every page on the site, grouped, for the All Pages Directory (/pages).
// Server Components only: it pulls in the course content files.
import {
  courseSlugList,
  getCourse,
  getProgramme,
  getTraining,
  programmeSlugList,
  trainingSlugList,
} from "../courses";
import { internshipHref, programmes, site } from "../site";
import { posts } from "./blog";
import { blogPostHref, resourceRoutes as r } from "./routes";

export type DirectoryEntry = { title: string; text: string; href: string; group: string };

const shorten = (s: string, max = 170) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, t.lastIndexOf(" ", max))}…`;
};

const city = site.city;

const resources: Omit<DirectoryEntry, "group">[] = [
  { title: "Free Tools Hub", href: r.tools, text: "Salary estimator, career-track quiz, training matcher, AI interview prep, CGPA converter and cold-email writer — free, no sign-up." },
  { title: "AI Interview Prep", href: r.interviewPrep, text: "Interview questions for your track, role and level, each with a model answer and what the interviewer is listening for." },
  { title: "CGPA to Percentage Calculator", href: r.cgpa, text: "Convert a CGPA or your semester SGPAs to a percentage with the common formulas, plus a placement-eligibility check." },
  { title: "AI Cold Email Generator", href: r.coldEmail, text: "Cold emails, follow-ups and LinkedIn notes for internships, fresher roles and referrals, with a one-click AI polish." },
  { title: "Find My Career Track", href: r.careerTrack, text: "Four questions, then a matching course and a 90-day roadmap." },
  { title: "Training Matcher", href: r.trainingMatcher, text: "Match your semester to the right industrial training track, live project and college documents." },
  { title: "Salary Estimator", href: r.salary, text: `Indicative fresher and two-year salary ranges by role, for ${city}, Delhi NCR and remote work.` },
  { title: "Free Study Materials", href: r.studyMaterial, text: "Cheat sheets and viva notes for web, Python, AI, cloud, cyber security and CAD — free, no paywall." },
  { title: "Tech Interview Q&A", href: r.interviewQa, text: "Technical and HR interview questions with answers for freshers and junior developers." },
  { title: "Student Projects", href: r.projects, text: "Capstone projects built by students: scope, architecture, tech stack and outcomes." },
  { title: "Verify Certificate", href: r.verifyCertificate, text: `For HR teams and universities: look up a ${site.name} certificate by its number.` },
  { title: "Tech Blog", href: r.blog, text: "Course guides, hiring trends and career advice from our trainers and placement team." },
  { title: "Events & Seminars", href: r.events, text: "Workshops and seminars taught by the people who run our courses." },
  { title: "Campus Gallery", href: r.gallery, text: "Photographs from our classrooms, labs, workshops and ceremonies." },
  { title: "Student Reviews", href: r.reviews, text: "Google reviews from students on trainers, live projects and placement support." },
  { title: "FAQ", href: r.faq, text: "Answers on courses, fees, batches, certificates, internships and placements." },
  { title: "College Partnerships", href: r.partnerships, text: "Workshops, industrial training, faculty development and placement drives for institutions." },
  { title: "Placements", href: r.placements, text: "How the placement cell works with every student until they are placed." },
];

const general: Omit<DirectoryEntry, "group">[] = [
  { title: `About ${site.name}`, href: "/about", text: "Who we are, who we teach, how our training works and a decade of building technology careers." },
  { title: "Our Founder", href: "/about/founder", text: `The story and vision behind ${site.name}.` },
  { title: "Mission & Vision", href: "/about/mission-vision", text: "What we set out to do for learners, and how we measure it." },
  { title: "All Courses", href: "/courses", text: "The full catalogue: programming, web, AI and data, cloud, cyber security, design, marketing and CAD." },
  { title: "After 12th Courses", href: "/after-12th-courses", text: "Career programmes and certificate courses for students straight out of school." },
  { title: "Internship & Training", href: internshipHref(), text: "45-day / 6-week and 6-month industrial training with live projects and college documents." },
  { title: "Contact", href: "/contact", text: `Call, WhatsApp or visit the ${city} campus for counselling, admissions and demo classes.` },
];

const fromCourses = <T>(
  slugs: string[],
  get: (slug: string) => T | undefined,
  map: (item: T, slug: string) => Omit<DirectoryEntry, "group">,
) => slugs.flatMap((slug) => {
  const item = get(slug);
  return item ? [map(item, slug)] : [];
});

export const directory: DirectoryEntry[] = [
  ...general.map((e) => ({ ...e, group: "About & admissions" })),
  ...resources.map((e) => ({ ...e, group: "Resources & tools" })),
  ...fromCourses(courseSlugList, getCourse, (c, slug) => ({
    title: `${c.title} in ${city}`,
    text: shorten(c.summary),
    href: `/courses/${slug}`,
  })).map((e) => ({ ...e, group: "Courses" })),
  ...programmes.map((p) => ({
    title: `${p.duration} ${p.title} in ${city}`,
    text: p.text,
    href: internshipHref(p.slug),
    group: "Internship & training",
  })),
  ...fromCourses(trainingSlugList, getTraining, (c, slug) => ({
    title: `${c.title} in ${city}`,
    text: shorten(c.summary),
    href: internshipHref(slug),
  })).map((e) => ({ ...e, group: "Internship & training" })),
  ...fromCourses(programmeSlugList, getProgramme, (c, slug) => ({
    title: c.title,
    text: shorten(c.summary),
    href: `/after-12th-courses/${slug}`,
  })).map((e) => ({ ...e, group: "After 12th" })),
  ...posts.map((p) => ({
    title: p.title,
    text: shorten(p.excerpt),
    href: blogPostHref(p.slug),
    group: "Blog",
  })),
];

export const directoryGroups = [...new Set(directory.map((e) => e.group))];
