// Copy for the Contact page. Phone, email, address and hours come from `site`,
// so they only need changing in one place.

import { site } from "./site";

// TODO: replace with the real campus location once the Lucknow address is final.
export const mapQuery = `${site.name} ${site.address}`;

export const enquiryTopics = [
  {
    icon: "graduation",
    title: "Course admissions",
    text: "Not sure which track fits your background? A counsellor maps the course, duration and batch that suit you.",
    action: { label: "Browse courses", href: "/courses" },
  },
  {
    icon: "school",
    title: "After 12th programmes",
    text: "Three, six and nine month career programmes for students straight out of school, from any stream.",
    action: { label: "See after 12th courses", href: "/after-12th-courses" },
  },
  {
    icon: "briefcase",
    title: "Industrial training & internship",
    text: "45-day, 6-week and 6-month training for college students, with the documents your university asks for.",
    action: { label: "View training programmes", href: "/internship-training" },
  },
  {
    icon: "building",
    title: "Hire our students",
    text: "Companies looking for trained freshers can join our hiring drives or ask for shortlisted profiles.",
    action: { label: "Email the placement cell", href: `mailto:${site.email}?subject=Hiring%20partnership` },
  },
  {
    icon: "handshake",
    title: "College partnerships",
    text: "Workshops, seminars, faculty development and campus training programmes for colleges and schools.",
    action: { label: "Propose a partnership", href: `mailto:${site.email}?subject=College%20partnership` },
  },
  {
    icon: "badge",
    title: "Existing students",
    text: "Batch changes, certificates, internship letters or project help — message us and we will sort it out.",
    action: { label: "WhatsApp us", href: site.whatsappHref },
  },
] as const;

export const contactSteps = [
  {
    title: "We call you back",
    text: "A counsellor rings you back on the number you leave, usually within minutes during working hours.",
  },
  {
    title: "Free counselling",
    text: "A short conversation about your background and goal, and the course and duration that fit it.",
  },
  {
    title: "Attend a demo class",
    text: "Sit in on a free class, meet the trainer and see the lab before you decide anything.",
  },
  {
    title: "Join a batch",
    text: "Pick a classroom, weekend or online batch that fits your schedule and start building.",
  },
];

export const contactFaqs = [
  {
    q: "Is the counselling session really free?",
    a: "Yes. Counselling is free and there is no registration fee. You only pay once you have chosen a course and a batch.",
  },
  {
    q: "Can I attend a demo class before enrolling?",
    a: "Yes. Book a free demo class from the form on this page, or call us, and we will fit you into an upcoming session.",
  },
  {
    q: "When can I visit the campus?",
    a: `We are open ${site.hours}. Walk-ins are welcome, but calling ahead means a counsellor will be free to show you around.`,
  },
  {
    q: "Do you offer online batches?",
    a: "Yes. Most courses run as both classroom and online batches, with the same trainers, projects and certificate.",
  },
  {
    q: "I need mandatory training for my college. Who do I talk to?",
    a: "Mention it in the form or on the phone. Our 6-week and 6-month programmes come with the project report and documents universities ask for.",
  },
  {
    q: "How quickly will someone get back to me?",
    a: "Enquiries sent during working hours are usually answered within minutes. Anything sent after hours is picked up first thing the next morning.",
  },
];
