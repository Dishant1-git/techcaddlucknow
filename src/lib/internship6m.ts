// Copy for the 6 Months Internship & Industrial Training page
// (/internship-training/6-months), adapted for the Lucknow centre from the
// "6 Months Internship & Industrial Training" content brief. The brief repeats
// a handful of paragraphs across its 20 sections; each appears here once.
import { site } from "./site";

const city = site.city;

export const sixMonths = {
  meta: {
    title: `6 Months Internship in ${city} | Industrial Training | ${site.name}`,
    description: `Explore 6 months internship and industrial training in ${city} for B.Tech, BCA, MCA and final-year students. Compare domains, projects, syllabus and eligibility at ${site.name}.`,
  },

  hero: {
    title: `6 Months Internship & Industrial Training in ${city} for College Students`,
    text: `Move from classroom concepts to practical technology skills through a structured six-month learning pathway in ${city}. Explore domains, understand project expectations and request the detailed syllabus before you decide.`,
    trust: "Programme details, batch timings, documentation and available domains should be confirmed with the centre before enrolment.",
    intro: `For college and university students in ${city}, the decision is rarely just about enrolling in another class. Students want to know what they will be able to build, which tools they will practise, how the schedule fits their semester, and whether their department will accept the documentation.`,
  },

  overview: {
    title: "What is a 6-month internship or industrial training programme?",
    intro:
      "A meaningful learning experience combines explanation, practice, feedback and revision. Instead of treating a technology name as a complete syllabus, it breaks it into concepts, lab exercises, progressively harder tasks and a project that can be demonstrated.",
    items: [
      {
        title: "How a six-month learning journey works",
        text: "Look beyond slogans such as “industry ready” or “job guaranteed.” Ask to see an indicative timetable, sample assignments, project rubrics, trainer interaction methods and examples of acceptable deliverables.",
      },
      {
        title: "What students should expect",
        text: "The strongest evidence of learning is small and specific: a working feature, a documented dataset, a clear README, a security checklist, a deployment diagram or a presentation explaining trade-offs.",
      },
      {
        title: "Why duration matters",
        text: "At the end of six months the important question is not simply whether you received a certificate. It is whether you can explain core concepts, demonstrate a project, describe problems you solved and name the next skill you need.",
      },
      {
        title: "The role of mentorship and feedback",
        text: "Ask what happens in a typical week, how questions are resolved, what happens if you fall behind, and how progress is assessed. Regular feedback is what turns practice into skill.",
      },
    ],
  },

  whoCanApply: {
    title: "6 months internship for B.Tech, BCA, MCA and other students",
    intro:
      "The right choice depends on your starting skills, college requirements, preferred domain and available time. A short counselling conversation helps identify prerequisites.",
    items: [
      {
        title: "B.Tech CSE and IT students",
        text: "Six months can complement programming, databases, networks, operating systems and software engineering courses. Final-year learners often need project documentation and may have university-prescribed formats.",
      },
      {
        title: "BCA and MCA students",
        text: "BCA students benefit from foundational programming, web technologies, databases and debugging practice. MCA students may seek deeper design choices, teamwork and stronger capstone work.",
      },
      {
        title: "B.Sc IT and computer science students",
        text: "Build on what your course covers with guided lab work and a project you can demonstrate and explain to teachers and interviewers.",
      },
      {
        title: "Diploma and eligible final-year students",
        text: "Students from non-computing degrees should check entry requirements. An introductory track can help, but advanced AI, cybersecurity or cloud tasks may need prior maths, coding or systems knowledge.",
      },
    ],
  },

  why: {
    title: "Why students choose six months of practical training",
    items: [
      { title: "Connect theory with practice", text: "Turn what you learn in lectures into lab exercises and working features you can show." },
      { title: "Develop project confidence", text: "Build progressively harder tasks into one project you can demonstrate, document and defend." },
      { title: "Explore careers before graduation", text: "Try a domain in depth while you still have time to change direction." },
      { title: "Build habits employers value", text: "Version control, documentation, testing and presenting your work become routine, not one-off tasks." },
    ],
  },

  domains: {
    title: "Choose a technology domain for your six-month journey",
    intro:
      "No single internship domain suits every student. A learner who enjoys mathematics and data exploration may prefer analytics; someone who likes building interfaces may prefer web development; a student interested in systems might explore cloud, Linux or networking.",
    items: [
      {
        title: "Artificial intelligence and machine learning",
        text: "Python fundamentals, data preparation, model evaluation, responsible use of AI, and a small reproducible project.",
        note: "Not an advanced research track for complete beginners.",
        href: "/courses/artificial-intelligence",
      },
      {
        title: "Data science and data analytics",
        text: "Spreadsheets, SQL, data cleaning, dashboards, storytelling and business questions.",
        note: "Includes understanding data limitations and avoiding misleading visualisations.",
        href: "/courses/data-analytics",
      },
      {
        title: "Python and full-stack web development",
        text: "HTML, CSS, JavaScript, APIs, databases, authentication basics, testing and deployment.",
        note: "Projects are built incrementally and documented.",
        href: "/courses/full-stack-development",
      },
      {
        title: "Cybersecurity",
        text: "Networking fundamentals, Linux, security hygiene, logging and authorised lab exercises.",
        note: "All exercises use permitted environments.",
        href: "/courses/cyber-security",
      },
      {
        title: "Cloud and DevOps",
        text: "Linux, Git, networking, cloud service models, IAM principles, deployment, containers, CI/CD concepts and cost awareness.",
        note: "",
        href: "/courses/devops-engineering",
      },
    ],
  },

  roadmap: {
    title: "Six-month syllabus and month-by-month roadmap",
    months: [
      { month: "Month 1", title: "Foundations and tools", text: "Onboarding, skill baseline, digital tools, programming or domain fundamentals, study plan and first practical exercises." },
      { month: "Month 2", title: "Core skills", text: "Core technical concepts, supervised lab tasks, code reviews or data reviews, weekly reflection and targeted feedback." },
      { month: "Month 3", title: "Guided exercises", text: "Intermediate workflows, collaborative exercises, version control, troubleshooting and a mini-project demonstration." },
      { month: "Month 4", title: "Project planning", text: "Problem definition, requirements, milestones, datasets or architecture, ethical constraints and a test plan." },
      { month: "Month 5", title: "Applied project and teamwork", text: "Implementation, iteration, peer feedback, bug fixing, documentation and presentation rehearsal." },
      { month: "Month 6", title: "Capstone and career preparation", text: "Capstone completion, evaluation, report writing, portfolio presentation, mock interviews and an individual next-step plan." },
    ],
  },

  difference: {
    title: "Course, industrial training or internship?",
    columns: [
      { title: "Course", text: "Usually focuses on a defined curriculum and assessments." },
      { title: "Industrial training", text: "Commonly used by colleges for structured skill development during a semester or break. It can be classroom or lab-based, and can include internship-like projects without being an employment internship." },
      { title: "Internship", text: "Often implies supervised practical work in a professional setting or organisation. Institutions and providers use these terms differently." },
    ],
    note: "Compare the actual learning environment, supervision, deliverables, documentation and academic recognition, not just the programme label. Ask your department which formats qualify, what evidence must be submitted and whether a minimum number of hours or attendance applies.",
  },

  projects: {
    title: "Build a portfolio with practical technology projects",
    evidence: ["A working feature", "A documented dataset", "A clear README", "A security checklist", "A deployment diagram", "A presentation explaining trade-offs"],
    items: [
      { title: "How projects are selected", text: "Projects grow from concepts and lab exercises into a task that can be demonstrated at the end." },
      { title: "Documentation, testing and version control", text: "Work is tracked in version control, tested and written up, so it can be reviewed and explained." },
      { title: "Team collaboration and demonstrations", text: "Collaborative exercises and demos practise how teams actually review and present work." },
      { title: "Presenting outcomes ethically", text: "Describe what you built and the problems you solved honestly, without overstating the result." },
    ],
  },

  process: {
    title: `How to apply for a six-month internship at ${site.name} ${city}`,
    steps: [
      { title: "Enquiry and counselling", text: "Share your degree, semester and goal. A counsellor talks through domains and prerequisites." },
      { title: "Eligibility and domain selection", text: "Choose a domain that fits your interests and starting skills, not only what is trending." },
      { title: "Learning, milestones and feedback", text: "Weekly practice, reviews and milestone checks keep your progress visible." },
      { title: "Final assessment and next steps", text: "Present your capstone, receive feedback and leave with a plan for the next skill to learn." },
    ],
  },

  documents: {
    title: "College internship letters, reports and university guidelines",
    items: [
      "College permission or NOC",
      "Joining confirmation",
      "Attendance logs",
      "Weekly diary",
      "Project report",
      "Completion letter",
    ],
    note: "Availability and wording of each document must be confirmed with the centre. No training centre can guarantee acceptance by every university, so get written guidance from your training and placement cell or department before paying fees.",
  },

  planning: {
    title: "Duration, batches, fees and eligibility",
    schedule: [
      { title: "Semester calendars and joining windows", text: "Match your start date to your college calendar and project submission deadlines." },
      { title: "Balancing exams and training", text: "Plan around examinations so practice time does not collapse during exam weeks." },
      { title: "Attendance and scheduling", text: "Confirm attendance rules, in-person requirements and trainer availability before joining a batch." },
    ],
    feesIntro: "Fees can vary by domain, duration, delivery format, lab resources, mentoring and project support. Ask for a written quote and confirm:",
    feesAsk: ["Taxes", "Instalments", "Refund terms", "Missed classes", "Access duration", "Equipment requirements", "Certificate conditions", "Any external exam fee"],
  },

  careers: {
    title: "Career scope after six-month industrial training",
    roles: [
      "Junior web developer",
      "Software trainee",
      "Data analyst trainee",
      "QA trainee",
      "Cloud support trainee",
      "IT support",
      "Security operations trainee",
    ],
    note: "No programme alone guarantees a job. Hiring depends on skills, projects, interview performance, location, market conditions and employer criteria.",
  },

  deliverables: {
    title: "Certificates, assessments and project deliverables",
    items: [
      { title: "Completion certificates", text: "Certificates may document participation or completion, but they do not by themselves prove employment experience or guarantee academic credit." },
      { title: "Project reports and repositories", text: "A written report and a repository of your code or analysis are what teachers and interviewers can actually check." },
      { title: "Skill assessments and presentations", text: "Assessments and a final presentation show whether you can explain and defend your work." },
      { title: "Verification and university acceptance", text: "Only your college or university can confirm academic acceptance. Verify the required documents before enrolling." },
    ],
  },

  visit: {
    title: `Six-month internship and industrial training in ${city}`,
    text: `Students want an accessible centre, manageable travel time and a programme that fits their college calendar. Visit the ${city} centre for a syllabus discussion or a sample lesson, so you can decide whether the format meets your needs.`,
  },

  faqs: [
    { q: "Is a six-month internship compulsory for B.Tech students?", a: "Requirements vary by university, degree and academic year. Check your department handbook and speak with your faculty coordinator." },
    { q: "Can BCA students join a six-month internship?", a: "Many training pathways are relevant to BCA students, subject to prerequisites and the current eligibility criteria." },
    { q: "Is six-month industrial training the same as an internship?", a: "Not always. Industrial training can be classroom or lab-based, while an internship often involves supervised workplace tasks. Confirm the actual programme format." },
    { q: "Can I do training in my final semester?", a: "Possibly, if your university permits it and the batch schedule fits examinations, attendance and submission deadlines." },
    { q: "Which internship domain is best for a beginner?", a: "Python, web development and foundational data analytics may be accessible starting points, but the right choice depends on your interests and prerequisites." },
    { q: "Does an internship guarantee a job?", a: "No. A programme can help you practise skills and prepare a portfolio, but job outcomes depend on many factors." },
    { q: "Will my college accept the certificate?", a: "Only your college or university can confirm academic acceptance. Verify the required documents before enrolling." },
    { q: "Are projects included?", a: "Ask for the current domain-specific syllabus and the exact project requirements for your batch." },
    { q: "Can I switch domains?", a: "Ask about the switching policy and whether it would affect duration, fees or prerequisites." },
    { q: "What is the fee for six months of training?", a: "Request the current written fee schedule, inclusions and refund policy from the centre." },
    { q: "Can I join without prior coding knowledge?", a: "An introductory pathway may be appropriate, although advanced specialisations can require coding or technical foundations." },
    { q: "Will I get a joining letter?", a: "Ask the centre what documents it currently issues and whether they meet your university’s format." },
    { q: "What is a capstone project?", a: "A capstone is a substantial final assignment that brings together skills from the programme and can be demonstrated and documented." },
    { q: "Is attendance mandatory?", a: "Attendance rules depend on the programme and academic requirements. Confirm the policy before joining." },
    { q: `How can I apply in ${city}?`, a: "Request a counselling discussion, share your degree and semester, review the syllabus and confirm the batch details before registration." },
  ],

  cta: `Planning your six-month industrial training in ${city}? Share your degree, semester and preferred technology to request the relevant syllabus and discuss eligibility with ${site.name}.`,
};
