// All site copy and contact details live here so they can be edited in one place.
import { resourceRoutes } from "./resources/routes";

const address =
  "533/1, Kursi Road, Main, Kapoorthala Chauraha, opp. Central Bank Of India, Lucknow, Uttar Pradesh 226024";

// The Lucknow branch's number is used for calls and WhatsApp everywhere on the site.
export const site = {
  name: "techcadd",
  city: "Lucknow",
  region: "Uttar Pradesh",
  address,
  // Fits the thin contact bar above the header; the full address is in the footer.
  shortAddress: "Kursi Road, Kapoorthala Chauraha, Lucknow",
  mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`techcadd ${address}`)}`,
  hours: "Mon – Sun, 8 AM – 8 PM",
  phone: "+91 91961 80052",
  phoneHref: "tel:+919196180052",
  whatsappHref: "https://wa.me/919196180052",
  email: "info@techcadd.com",
  copyrightYear: 2026,
};

export const heroChips = ["Python", "TensorFlow", "React", "Docker"];

// TODO: confirm these figures for the Lucknow branch before going live.
export const stats = [
  { value: 12450, suffix: "+", label: "Students trained", icon: "users" },
  { value: 450, suffix: "+", label: "Hiring partners", icon: "briefcase" },
  { value: 98, suffix: "%", label: "Placement success", icon: "target" },
  { value: 15, suffix: "+", label: "Years of excellence", icon: "award" },
] as const;

export const aiTracks = [
  {
    audience: "For beginners",
    title: "AI Fundamentals",
    text: "Python, mathematics, machine learning and the vocabulary you need before anything else makes sense.",
  },
  {
    audience: "For developers",
    title: "AI Development",
    text: "Deep learning, LLM applications, RAG pipelines and agents — built, evaluated and deployed.",
  },
  {
    audience: "For professionals",
    title: "AI for Business",
    text: "Prompt engineering, AI tools and automation for managers, marketers and founders — no coding required.",
  },
];

export const aboutHighlights = [
  "Industry-designed curriculum",
  "Trainers who work in the field",
  "Live, client-style projects",
  "Online and classroom batches",
  "Certificate and internship letter",
  "Dedicated placement cell",
];

export const aboutPrinciples = [
  {
    title: "Practice over theory",
    text: "Every module ends with something that runs. You learn a concept, then you build with it the same day.",
  },
  {
    title: "Personal attention",
    text: "Small batches and 1:1 sessions, so a trainer notices the moment you are stuck — and helps you past it.",
  },
  {
    title: "Industry alignment",
    text: "Tracks are reviewed by working professionals, so the tools you train on are the tools teams use today.",
  },
  {
    title: "Accountable for outcomes",
    text: "We measure ourselves by placements, not enrolments. Support continues until the offer letter arrives.",
  },
];

export const campusBadges = [
  "Lucknow campus",
  "Live projects",
  "1:1 sessions",
  "Hiring drives",
  "Certified courses",
];

// Internship & training programmes; each has a page at
// /internship-training-in-lucknow/<slug>, and a page per domain below that.
export const programmes = [
  {
    // One track for both: 45 days is roughly six weeks.
    slug: "45-days",
    duration: "45 Days / 6 Weeks",
    bestFor: "Students on a summer or winter break, or whose university asks for six weeks of industrial training with documents.",
    title: "Short-Term Industrial Training",
    text: "A focused sprint on one technology with a documented project, a report and a training certificate.",
    points: ["One core technology", "Guided project & report", "College-ready documents"],
    popular: false,
  },
  {
    slug: "6-months",
    duration: "6 Months",
    bestFor: "Final-year students and graduates getting ready for their first job.",
    title: "Industrial Training with Internship",
    text: "Full technology stack plus a live client-style project and placement drives.",
    points: ["Complete stack coverage", "Live project experience", "Internship letter & placement"],
    popular: true,
  },
];

/** Root of the Internship & Training section. The route folder has the same name. */
export const internshipBase = "/internship-training-in-lucknow";

export const internshipHref = (slug?: string) =>
  slug ? `${internshipBase}/${slug}` : internshipBase;

export const steps = [
  {
    when: "Day 0",
    title: "Free counselling",
    text: "Tell us your background and goal. A counsellor maps the track and duration that fits.",
    color: "from-cyan to-sky",
  },
  {
    when: "Weeks 1–8",
    title: "Learn by building",
    text: "Concepts in the morning, code in the afternoon. Every module ends with something that runs.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    when: "Weeks 9–12",
    title: "Live project & internship",
    text: "Join a project team with real requirements, reviews and deadlines — and earn your internship letter.",
    color: "from-orange-500 to-amber-400",
  },
  {
    when: "Week 12+",
    title: "Interview & placement",
    text: "Resume rebuild, mock interviews and hiring drives until the offer letter arrives.",
    color: "from-emerald-500 to-teal-400",
  },
];

export const fields = [
  {
    title: "Artificial Intelligence & Data",
    text: "Generative AI, machine learning, analytics and the tooling that ships models to production.",
    icon: "sparkles",
  },
  {
    title: "Full-Stack Development",
    text: "MERN, MEAN and PHP stacks — build, test and deploy real applications end to end.",
    icon: "code",
  },
  {
    title: "Cyber Security & Cloud",
    text: "Ethical hacking, network defence, Linux and cloud infrastructure on AWS and Azure.",
    icon: "shield",
  },
  {
    title: "Digital Marketing",
    text: "SEO, Google Ads, social media and AI-powered marketing with live campaign budgets.",
    icon: "megaphone",
  },
  {
    title: "CAD/CAM & Design",
    text: "AutoCAD, SolidWorks, Revit and 3ds Max for mechanical, civil and interior design.",
    icon: "box",
  },
  {
    title: "Core Programming",
    text: "C, C++, Java, Python and data structures — the foundation every interview tests.",
    icon: "terminal",
  },
] as const;

export const courseTracks = [
  {
    tag: "AI & Data",
    ghost: "AI",
    badge: "Hot",
    title: "Artificial Intelligence & Data",
    text: "Generative AI, machine learning, analytics and the tooling that ships models to production.",
    courses: ["Artificial Intelligence", "Generative AI", "Data Science", "Data Analytics", "Power BI"],
    count: 14,
  },
  {
    tag: "Development",
    ghost: "DEV",
    badge: "Hot",
    title: "Full-Stack Development",
    text: "MERN, MEAN and PHP stacks — build, test and deploy real applications end to end.",
    courses: ["MERN Full Stack", "MEAN Stack", "PHP Full Stack", "Web Designing", "Flutter"],
    count: 14,
  },
  {
    tag: "Cyber & Cloud",
    ghost: "CYBER",
    badge: "Hot",
    title: "Cyber Security & Cloud",
    text: "Ethical hacking, network defence, Linux and cloud infrastructure on AWS and Azure.",
    courses: ["Cyber Security", "Ethical Hacking", "AWS", "Azure", "DevOps"],
    count: 14,
  },
  {
    tag: "Digital Marketing",
    ghost: "GROWTH",
    badge: "Hot",
    title: "Digital Marketing",
    text: "SEO, paid ads, social media and e-commerce — taught on live campaigns.",
    courses: ["Digital Marketing", "SEO", "Google Ads", "Social Media Marketing", "E-Commerce"],
    count: 10,
  },
  {
    tag: "CAD & Design",
    ghost: "CAD",
    badge: "Trending",
    title: "CAD/CAM & Design",
    text: "Industry drafting and modelling tools for mechanical, civil and interior design.",
    courses: ["AutoCAD", "SolidWorks", "Revit", "3ds Max & V-Ray", "Graphic Designing"],
    count: 5,
  },
  {
    tag: "Programming",
    ghost: "CODE",
    badge: "New",
    title: "Core Programming",
    text: "The languages and problem-solving skills every technical interview tests.",
    courses: ["Python", "Java", "C / C++", "Data Structures & Algorithms"],
    count: 4,
  },
];

export const totalCourses = courseTracks.reduce((n, t) => n + t.count, 0);

export const whyUs = [
  {
    stat: "15+ yrs",
    statLabel: "Average centre experience",
    title: "Trainers who still build",
    text: "Every instructor is a practising engineer or marketer. You learn current tooling and the judgement calls that come with it — not a syllabus written five years ago.",
  },
  {
    stat: "4+",
    statLabel: "Portfolio projects per track",
    title: "Live projects, not exercises",
    text: "From week three you work on project code with requirements, reviews and deadlines. That is what fills a portfolio and what interviewers ask about.",
  },
  {
    stat: "450+",
    statLabel: "Hiring partners",
    title: "Placement machinery that runs",
    text: `A dedicated cell handles resumes, mock interviews and a hiring-partner network across ${site.city} and beyond. Support continues until you are placed.`,
  },
  {
    stat: "98%",
    statLabel: "Course completion rate",
    title: "Sessions built around your life",
    text: "Morning, evening, weekend and online sessions, all recorded. Students, working professionals and career-changers train in the same programme on their own schedule.",
  },
];

export const included = [
  "1:1 sessions",
  "Live project experience",
  "Internship letter",
  "Course certificate",
  "Interview & resume prep",
  "Recorded sessions",
];

// TODO: these are the Mohali branch's figures, used as a stand-in. Replace with the
// Lucknow Google Business listing's real rating, review count and reviews link.
export const googleReviews = {
  rating: 4.9,
  count: 556,
  url: "https://www.google.com/maps",
};

// TODO: sample copy only — replace with real reviews from Lucknow students before going live.
// The cards carry a "Verified on Google" badge, so each one must be a genuine Google review.
export const testimonials = [
  {
    name: "Student Name",
    role: "Full Stack Developer",
    text: "The six-month MERN track was the first time I worked on real project code. That project is what I talked about in every interview.",
  },
  {
    name: "Student Name",
    role: "Data Analyst",
    text: "Every session had context from real projects. The Power BI and SQL modules were exactly what my interview rounds tested.",
  },
  {
    name: "Student Name",
    role: "AI Engineer",
    text: "The Generative AI course was current in a way online tutorials are not. Building and deploying a full RAG pipeline made my portfolio.",
  },
  {
    name: "Student Name",
    role: "Security Analyst",
    text: "The cyber security lab setup let me break things safely. I walked into my first SOC interview already knowing the tools.",
  },
  {
    name: "Student Name",
    role: "Design Engineer",
    text: "AutoCAD and SolidWorks were taught with real drawings from industry, not textbook exercises. It made the job feel familiar.",
  },
  {
    name: "Student Name",
    role: "Digital Marketer",
    text: "Running real ad budgets during the course changed everything. I could show actual campaign results in my interviews.",
  },
];

export const techCategories = [
  "All",
  "Programming",
  "Frameworks",
  "AI & ML",
  "CAD/CAM",
  "Databases",
  "DevOps",
  "Cloud",
] as const;

export const technologies: { name: string; cat: (typeof techCategories)[number] }[] = [
  { name: "Python", cat: "Programming" },
  { name: "Java", cat: "Programming" },
  { name: "C / C++", cat: "Programming" },
  { name: "JavaScript", cat: "Programming" },
  { name: "TypeScript", cat: "Programming" },
  { name: "PHP", cat: "Programming" },
  { name: "Kotlin", cat: "Programming" },
  { name: "Dart", cat: "Programming" },
  { name: "React", cat: "Frameworks" },
  { name: "Next.js", cat: "Frameworks" },
  { name: "Angular", cat: "Frameworks" },
  { name: "Vue", cat: "Frameworks" },
  { name: "Node.js", cat: "Frameworks" },
  { name: "Express", cat: "Frameworks" },
  { name: "Laravel", cat: "Frameworks" },
  { name: "Flutter", cat: "Frameworks" },
  { name: "Django", cat: "Frameworks" },
  { name: "TensorFlow", cat: "AI & ML" },
  { name: "PyTorch", cat: "AI & ML" },
  { name: "OpenAI", cat: "AI & ML" },
  { name: "Hugging Face", cat: "AI & ML" },
  { name: "scikit-learn", cat: "AI & ML" },
  { name: "Keras", cat: "AI & ML" },
  { name: "pandas", cat: "AI & ML" },
  { name: "LangChain", cat: "AI & ML" },
  { name: "AutoCAD", cat: "CAD/CAM" },
  { name: "SolidWorks", cat: "CAD/CAM" },
  { name: "Revit", cat: "CAD/CAM" },
  { name: "3ds Max", cat: "CAD/CAM" },
  { name: "CATIA", cat: "CAD/CAM" },
  { name: "MySQL", cat: "Databases" },
  { name: "PostgreSQL", cat: "Databases" },
  { name: "MongoDB", cat: "Databases" },
  { name: "Redis", cat: "Databases" },
  { name: "Firebase", cat: "Databases" },
  { name: "Docker", cat: "DevOps" },
  { name: "Kubernetes", cat: "DevOps" },
  { name: "Jenkins", cat: "DevOps" },
  { name: "Git & GitHub", cat: "DevOps" },
  { name: "Terraform", cat: "DevOps" },
  { name: "Linux", cat: "DevOps" },
  { name: "AWS", cat: "Cloud" },
  { name: "Azure", cat: "Cloud" },
  { name: "Google Cloud", cat: "Cloud" },
  { name: "Vercel", cat: "Cloud" },
];

export const capabilities = [
  {
    title: "AI & Machine Learning",
    text: "Models trained, tuned and shipped — not notebooks that only run once.",
    tools: [
      ["TensorFlow", "Model training"],
      ["PyTorch", "Deep learning"],
      ["OpenAI", "LLM APIs"],
      ["Hugging Face", "Open models"],
      ["scikit-learn", "Classical ML"],
      ["Keras", "Neural nets"],
      ["pandas", "Data wrangling"],
      ["Jupyter", "Experiments"],
    ],
  },
  {
    title: "Full-Stack Engineering",
    text: "Front end, back end and deployment — one application, built end to end.",
    tools: [
      ["React", "Interfaces"],
      ["Next.js", "Full-stack React"],
      ["Node.js", "Server runtime"],
      ["Express", "REST APIs"],
      ["MongoDB", "Document store"],
      ["MySQL", "Relational data"],
      ["Tailwind CSS", "Styling"],
      ["Git", "Version control"],
    ],
  },
  {
    title: "Data & Analytics",
    text: "From raw spreadsheets to dashboards a manager can make a decision from.",
    tools: [
      ["Python", "Analysis"],
      ["SQL", "Querying"],
      ["Power BI", "Dashboards"],
      ["Tableau", "Visualisation"],
      ["Excel", "Modelling"],
      ["NumPy", "Numerics"],
    ],
  },
  {
    title: "Cloud & DevOps",
    text: "Infrastructure as code, pipelines and containers that survive real traffic.",
    tools: [
      ["AWS", "Cloud platform"],
      ["Azure", "Cloud platform"],
      ["Docker", "Containers"],
      ["Kubernetes", "Orchestration"],
      ["Jenkins", "CI / CD"],
      ["Terraform", "Infrastructure"],
      ["Linux", "Administration"],
    ],
  },
  {
    title: "Cyber Security",
    text: "Attack it in the lab so you can defend it on the job.",
    tools: [
      ["Kali Linux", "Pen-testing OS"],
      ["Wireshark", "Packet analysis"],
      ["Metasploit", "Exploitation"],
      ["Burp Suite", "Web testing"],
      ["Nmap", "Scanning"],
      ["Splunk", "SOC monitoring"],
    ],
  },
  {
    title: "Digital Marketing",
    text: "Campaigns with real budgets, measured by the numbers a client cares about.",
    tools: [
      ["Google Ads", "Paid search"],
      ["Meta Ads", "Paid social"],
      ["Google Analytics", "Measurement"],
      ["Search Console", "SEO"],
      ["Canva", "Creatives"],
      ["WordPress", "Websites"],
    ],
  },
];

export const faqs = [
  {
    q: `Why choose ${site.name} ${site.city} for IT and industrial training?`,
    a: `${site.name} ${site.city} combines practising industry mentors, live capstone projects and an AI-integrated syllabus with a dedicated placement cell. You train on the tools companies actually use and leave with a portfolio, not just a certificate.`,
  },
  {
    q: "Do I need a technical background or coding degree to join?",
    a: "No. Most tracks start from the fundamentals, and a counsellor will suggest a starting point based on your background. Students from non-technical streams regularly complete our programmes.",
  },
  {
    q: "What does placement assistance include?",
    a: "Resume and LinkedIn rebuilds, mock technical and HR interviews, aptitude practice and introductions to hiring partners. Support continues after the course until you are placed.",
  },
  {
    q: "Are classes available online as well as offline?",
    a: `Yes. You can attend at the ${site.city} campus, join live online, or mix both. Every session is recorded so you can revise or catch up.`,
  },
  {
    q: "What are the batch timings?",
    a: "Morning, evening and weekend batches run through the week, so college students and working professionals can both find a slot. Ask a counsellor for the current schedule.",
  },
  {
    q: "Can I pay the fee in instalments?",
    a: "Yes, instalment plans are available on most programmes. Fees depend on the course and duration — book a free counselling call for an exact quote.",
  },
  {
    q: "What kind of projects will I work on?",
    a: "Real, client-style projects with requirements, code reviews and deadlines — for example full-stack web apps, ML models, security audits or live ad campaigns, depending on your track.",
  },
  {
    q: "Which courses can I join right after 12th?",
    a: "Any of our 3-, 6- and 9-month certificate and diploma tracks, including web development, Python, digital marketing, data analytics and AI fundamentals.",
  },
  {
    q: "What do I receive when I finish?",
    a: "A course certificate, a project report and, on the longer programmes, an internship letter — along with the portfolio you built during training.",
  },
  {
    q: "How is the curriculum kept current?",
    a: "Tracks are reviewed regularly by trainers who work in the field, so new tooling — such as generative and agentic AI — is added as the industry adopts it.",
  },
];

// Cards in the About mega menu. TODO: confirm "Since 2016", the ISO certification
// and the founder details, and add real photos (see AboutMega.tsx).
export const aboutMenu = [
  {
    link: `About ${site.name}`,
    title: `About ${site.name}`,
    tag: "Story",
    caption: "Since 2016",
    art: "Empowering learners",
    icon: "users",
    image: "/images/about-techcadd.png",
    href: "/about",
  },
  {
    link: "Mission and Vision",
    title: "Mission and Vision",
    tag: "Purpose",
    caption: "Our direction",
    art: "Mission · Vision",
    icon: "target",
    image: "/images/vision-mision-techcadd.png",
    href: "/about/mission-vision",
  },
  {
    link: "Accreditations & Awards",
    title: "Accreditations",
    tag: "Proof",
    caption: "ISO certified",
    art: "Recognised. Trusted.",
    icon: "award",
    image: "/images/Accreditations.png",
    href: "/about#recognition",
  },
  {
    link: "Founder",
    title: "Our Founder",
    tag: "Profile",
    caption: "Gourav Gupta",
    art: "Builder · Educator · Mentor",
    icon: "mic",
    image: "/images/founder.png",
    href: "/about/founder",
  },
] as const;

// Columns in the AI mega menu.
export const aiMenu = [
  {
    title: "AI Fundamentals",
    icon: "sparkles",
    links: [
      { label: "Generative AI", href: "/courses/generative-ai" },
      { label: "Artificial Intelligence (AI)", href: "/courses/artificial-intelligence" },
      { label: "Prompt Engineering", href: "/courses/prompt-engineering" },
      { label: "ChatGPT & AI Tools", badge: "Hot", href: "/courses/chatgpt-ai-tools" },
    ],
  },
  {
    title: "AI Development",
    icon: "rocket",
    links: [
      { label: "Agentic AI", badge: "New", href: "/courses/agentic-ai" },
      { label: "AI-Powered Marketing", badge: "Trending", href: "/courses/ai-powered-marketing" },
      { label: "RAG (Retrieval-Augmented Generation)", href: "/courses/rag-development" },
      { label: "AI-Powered Courses", href: "/courses/ai-powered-courses" },
      { label: `All AI courses in ${site.city}`, href: "/courses#ai-data" },
    ],
  },
] as const;

// Columns in the Courses mega menu.
export type MenuColumn = {
  title: string;
  text: string;
  courses: { label: string; badge?: "Hot" | "New" | "Trending"; href?: string }[];
};

export const coursesMenu: MenuColumn[] = [
  {
    title: "Programming",
    text: "Core languages and full-stack engineering",
    courses: [
      { label: "Python Programming" },
      { label: "Java Programming" },
      { label: "C, C++ & Data Structures" },
      { label: "Web Designing" },
      { label: "WordPress" },
      { label: "Shopify" },
      { label: "Kotlin" },
      { label: "Flutter" },
      { label: "Web Development" },
      { label: "Full Stack Development" },
      { label: "MERN Full Stack", badge: "Hot" },
      { label: "MEAN Stack" },
      { label: "PHP Full Stack" },
    ],
  },
  {
    title: "AI & Data",
    text: "Models, analytics and decision intelligence",
    courses: [
      { label: "Artificial Intelligence" },
      { label: "Generative AI", badge: "New" },
      { label: "Agentic AI", badge: "Hot" },
      { label: "ChatGPT & AI Tools", badge: "Trending" },
      { label: "AI for Managers", badge: "New" },
      { label: "Prompt Engineering" },
      { label: "Machine Learning" },
      { label: "Deep Learning" },
      { label: "AI & Robotics", badge: "New" },
      { label: "Data Science" },
      { label: "Data Analytics" },
      { label: "Power BI" },
      { label: "Tableau" },
    ],
  },
  {
    title: "Marketing & Design",
    text: "Growth, performance and drafting",
    courses: [
      { label: "Digital Marketing", badge: "Trending" },
      { label: "GEO (Generative Engine Optimization)", badge: "New" },
      { label: "AEO (Answer Engine Optimization)", badge: "New" },
      { label: "Dropshipping & E-Commerce", badge: "Hot" },
      { label: "Social Media Marketing" },
      { label: "Google Ads" },
      { label: "SEO" },
      { label: "Graphic Designing" },
      { label: "UI/UX Design" },
      { label: "AutoCAD" },
      { label: "SolidWorks" },
      { label: "Revit Architecture" },
      { label: "3ds Max & V-Ray" },
    ],
  },
  {
    title: "Cyber & Cloud",
    text: "Secure, resilient infrastructure",
    courses: [
      { label: "Cyber Security" },
      { label: "Ethical Hacking" },
      { label: "Penetration Testing", badge: "Hot" },
      { label: "SOC Analyst", badge: "New" },
      { label: "Cyber Forensics" },
      { label: "Cloud Computing" },
      { label: "AWS Cloud", badge: "Trending" },
      { label: "Microsoft Azure" },
      { label: "DevOps Engineering", badge: "Trending" },
      { label: "Docker & Kubernetes", badge: "New" },
      { label: "Linux Administration" },
    ],
  },
];

// Sections on the /courses page. The first four reuse the mega menu's lists; CAD
// courses get their own section there, as on techcaddjalandhar.com.
// TODO: confirm every course below is offered at the Lucknow branch.
const cadCourses = ["AutoCAD", "SolidWorks", "Revit Architecture", "3ds Max & V-Ray"];

const menuCourses = (title: string) =>
  coursesMenu
    .find((col) => col.title === title)!
    .courses.filter((c) => !cadCourses.includes(c.label));

export type CatalogueCategory = {
  id: string;
  title: string;
  text: string;
  courses: { label: string; badge?: "Hot" | "New" | "Trending" }[];
};

export const courseCatalogue: CatalogueCategory[] = [
  {
    id: "programming",
    title: "Programming",
    text: "Core languages and full-stack engineering",
    courses: menuCourses("Programming"),
  },
  {
    id: "ai-data",
    title: "AI & Data",
    text: "Models, analytics and decision intelligence",
    courses: menuCourses("AI & Data"),
  },
  {
    id: "marketing-design",
    title: "Marketing & Design",
    text: "Growth, performance and visual design",
    courses: menuCourses("Marketing & Design"),
  },
  {
    id: "cyber-cloud",
    title: "Cyber & Cloud",
    text: "Secure, resilient infrastructure",
    courses: menuCourses("Cyber & Cloud"),
  },
  {
    id: "full-stack-streams",
    title: "Full Stack Streams",
    text: "One language, front end to deployment",
    courses: [{ label: "Python + Django Full Stack" }],
  },
  {
    id: "civil-mechanical",
    title: "Civil / Mechanical",
    text: "Drafting and modelling for engineers and architects",
    courses: cadCourses.map((label) => ({ label })),
  },
  {
    id: "basic-skills",
    title: "Basic Skills",
    text: "Everyday computer and office skills",
    courses: [
      { label: "Basic Computer" },
      { label: "MS Office" },
      { label: "Tally" },
      { label: "Desktop Publishing (DTP)" },
      { label: "Typing" },
    ],
  },
  {
    id: "ai-development",
    title: "AI Development",
    text: "Applied AI for products and campaigns",
    courses: [
      { label: "AI-Powered Marketing", badge: "Trending" },
      { label: "RAG (Retrieval-Augmented Generation)" },
      { label: "AI-Powered Courses" },
    ],
  },
  {
    id: "more-courses",
    title: "More courses",
    text: "Short, focused modules on a single skill",
    courses: [
      { label: "SQL" },
      { label: "Pandas" },
      { label: "Python for Data Analytics" },
      { label: "Data Cleaning" },
      { label: "NLP" },
      { label: "Computer Vision" },
      { label: "LLM Development" },
      { label: "AI Agents" },
      { label: "Speech Recognition & AI Voice" },
      { label: "DSA Certificate" },
      { label: "OSINT" },
      { label: "Web Security" },
      { label: "Network Security & CCNA" },
      { label: "Meta Ads" },
      { label: "Instagram Marketing" },
      { label: "WhatsApp Marketing" },
      { label: "Content Marketing" },
      { label: "E-mail Marketing" },
      { label: "Marketing Automation" },
      { label: "Influencer Marketing" },
      { label: "Technical SEO" },
      { label: "Local SEO" },
      { label: "WooCommerce" },
      { label: "WordPress & Elementor Pro" },
    ],
  },
];

// URL slug of each course's detail page (/courses/<slug>). The page content
// itself lives in courseContent.json, keyed by the same slug.
export const courseSlugs: Record<string, string> = {
  "Python Programming": "python",
  "Java Programming": "java",
  "C, C++ & Data Structures": "c-cpp",
  "Web Designing": "web-designing",
  "WordPress": "wordpress",
  "Shopify": "shopify",
  "Kotlin": "kotlin",
  "Flutter": "flutter",
  "Web Development": "web-development",
  "Full Stack Development": "full-stack-development",
  "MERN Full Stack": "mern-stack",
  "MEAN Stack": "mean-stack",
  "PHP Full Stack": "php-full-stack",
  "Artificial Intelligence": "artificial-intelligence",
  "Generative AI": "generative-ai",
  "Agentic AI": "agentic-ai",
  "ChatGPT & AI Tools": "chatgpt-ai-tools",
  "AI for Managers": "ai-for-managers",
  "Prompt Engineering": "prompt-engineering",
  "Machine Learning": "machine-learning",
  "Deep Learning": "deep-learning",
  "AI & Robotics": "ai-robotics",
  "Data Science": "data-science",
  "Data Analytics": "data-analytics",
  "Power BI": "power-bi",
  "Tableau": "tableau",
  "Digital Marketing": "digital-marketing",
  "GEO (Generative Engine Optimization)": "geo",
  "AEO (Answer Engine Optimization)": "aeo",
  "Dropshipping & E-Commerce": "dropshipping-ecommerce",
  "Social Media Marketing": "social-media-marketing",
  "Google Ads": "google-ads",
  "SEO": "seo",
  "Graphic Designing": "graphic-designing",
  "UI/UX Design": "ui-ux-design",
  "Cyber Security": "cyber-security",
  "Ethical Hacking": "ethical-hacking",
  "Penetration Testing": "penetration-testing",
  "SOC Analyst": "soc-analyst",
  "Cyber Forensics": "cyber-forensics",
  "Cloud Computing": "cloud-computing",
  "AWS Cloud": "aws-cloud",
  "Microsoft Azure": "microsoft-azure",
  "DevOps Engineering": "devops-engineering",
  "Docker & Kubernetes": "docker-kubernetes",
  "Linux Administration": "linux-administration",
  "Python + Django Full Stack": "python-django-full-stack",
  "AutoCAD": "autocad",
  "SolidWorks": "solidworks",
  "Revit Architecture": "revit-architecture",
  "3ds Max & V-Ray": "3ds-max",
  "Basic Computer": "basic-computer",
  "MS Office": "ms-office",
  "Tally": "tally",
  "Desktop Publishing (DTP)": "dtp",
  "Typing": "typing",
  "AI-Powered Marketing": "ai-powered-marketing",
  "RAG (Retrieval-Augmented Generation)": "rag-development",
  "AI-Powered Courses": "ai-powered-courses",
  "SQL": "sql",
  "Pandas": "pandas",
  "Python for Data Analytics": "python-for-data-analytics",
  "Data Cleaning": "data-cleaning",
  "NLP": "nlp",
  "Computer Vision": "computer-vision",
  "LLM Development": "llm-development",
  "AI Agents": "ai-agents",
  "Speech Recognition & AI Voice": "speech-recognition-ai-voice",
  "DSA Certificate": "dsa",
  "OSINT": "osint",
  "Web Security": "web-security",
  "Network Security & CCNA": "network-security-ccna",
  "Meta Ads": "meta-ads",
  "Instagram Marketing": "instagram-marketing",
  "WhatsApp Marketing": "whatsapp-marketing",
  "Content Marketing": "content-marketing",
  "E-mail Marketing": "email-marketing",
  "Marketing Automation": "marketing-automation",
  "Influencer Marketing": "influencer-marketing",
  "Technical SEO": "technical-seo",
  "Local SEO": "local-seo",
  "WooCommerce": "woocommerce",
  "WordPress & Elementor Pro": "wordpress-elementor-pro",
};

export const courseHref = (label: string) =>
  courseSlugs[label] ? `/courses/${courseSlugs[label]}` : "/courses";

// Tiles in the Certification mega menu.
// Programmes in the Internship & Training menu. Those with a `slug` have a page
// at /internship-training-in-lucknow/<slug>, with content in trainingContent.json; the rest
// link to the training section on the home page until their syllabus is added.
export const certificatePrograms: {
  label: string;
  icon: string;
  badge?: "Hot" | "New" | "Trending";
  slug?: string;
}[] = [
  { label: "Cloud Computing", icon: "cloud", slug: "cloud-computing" },
  { label: "Flutter App Development", icon: "smartphone", slug: "flutter-app-development" },
  { label: "MERN Full Stack", icon: "code" },
  { label: "Artificial Intelligence", icon: "sparkles", badge: "Hot" },
  { label: "Generative AI", icon: "rocket", badge: "New" },
  { label: "Digital Marketing", icon: "megaphone", badge: "Trending" },
  { label: "Data Analytics", icon: "chart" },
  { label: "Data Science", icon: "layers" },
  { label: "Cyber Security", icon: "shield" },
  { label: "Python Programming", icon: "terminal" },
  { label: "Web Designing", icon: "monitor" },
  { label: "Ethical Hacking", icon: "target" },
  { label: "AutoCAD & SolidWorks", icon: "box" },
  { label: "Basic Computer & Office Skills", icon: "monitor" },
];

export const trainingHref = (p: { slug?: string }) =>
  internshipHref(p.slug);

// Sections on the /after-12th-courses page; each programme has a detail page at
// /after-12th-courses/<slug>, with its content in after12thContent.json.
// TODO: confirm every programme below is offered at the Lucknow branch.
export const after12thCatalogue: (Omit<CatalogueCategory, "courses"> & {
  courses: { label: string; slug: string }[];
})[] = [
  {
    id: "after-12th-3-month-program",
    title: "After 12th 3-Month Program",
    text: "One subject, one term, one live project",
    courses: [
      { label: "Cloud Computing Program", slug: "3-month-cloud-computing" },
      { label: "Flutter App Development Program", slug: "3-month-flutter" },
      { label: "MERN Stack Program", slug: "3-month-mern-stack" },
      { label: "Agentic AI Program", slug: "3-month-agentic-ai" },
      { label: "Digital Marketing Program (3 Months)", slug: "3-month-digital-marketing" },
      { label: "Digital Marketing Program (4 Months)", slug: "4-month-digital-marketing" },
      { label: "Data Analytics Program", slug: "4-month-data-analytics" },
      { label: "Data Science Program", slug: "4-month-data-science" },
      { label: "Cyber Security Program", slug: "3-month-cybersecurity" },
      { label: "Artificial Intelligence Program", slug: "4-month-artificial-intelligence" },
      { label: "Full Stack Development Program", slug: "3-month-full-stack-development" },
    ],
  },
  {
    id: "after-12th-6-month-program",
    title: "After 12th 6-Month Program",
    text: "Half a year, finishing with a portfolio",
    courses: [
      { label: "Cloud Computing Certificate Program", slug: "6-month-cloud-computing" },
      { label: "Flutter App Development Diploma Certificate Program", slug: "6-month-flutter" },
      { label: "MERN Stack Certificate Program", slug: "6-month-mern-stack" },
      { label: "Agentic AI Certificate Program", slug: "6-month-agentic-ai" },
      { label: "Digital Marketing Certificate Program", slug: "6-month-digital-marketing" },
      { label: "Data Analytics Certificate Program", slug: "6-month-data-analytics" },
      { label: "Data Science Certificate Program", slug: "6-month-data-science" },
      { label: "Cyber Security Certificate Program", slug: "6-month-cybersecurity" },
      { label: "Artificial Intelligence Certificate Program", slug: "6-month-artificial-intelligence" },
      { label: "Full Stack Development Certificate Program", slug: "6-month-full-stack-development" },
    ],
  },
  {
    id: "after-12th-9-month-program",
    title: "After 12th 9-Month Program",
    text: "The longest track, with placement preparation",
    courses: [
      { label: "Cloud Computing Diploma Program", slug: "9-month-cloud-computing" },
      { label: "Flutter App Development Diploma Program", slug: "9-month-flutter" },
      { label: "MERN Stack Diploma Program", slug: "9-month-mern-stack" },
      { label: "Agentic AI Diploma Program", slug: "9-month-agentic-ai" },
      { label: "Digital Marketing Diploma Program", slug: "9-month-digital-marketing" },
      { label: "Cyber Security Diploma Program", slug: "9-month-cybersecurity" },
      { label: "Artificial Intelligence Diploma Program", slug: "9-month-artificial-intelligence" },
      { label: "Full Stack Development Diploma Program", slug: "9-month-full-stack-development" },
    ],
  },
  {
    id: "1-year-certificates",
    title: "1 Year Certificates",
    text: "A full year from fundamentals to a specialisation",
    courses: [
      { label: "Generative AI (1 Year)", slug: "generative-ai" },
      { label: "Cloud Computing & DevOps (1 Year)", slug: "cloud-computing-devops" },
      { label: "AI & Data Science (1 Year)", slug: "ai-data-science" },
      { label: "Machine Learning & Deep Learning (1 Year)", slug: "machine-learning-deep-learning" },
      { label: "Cybersecurity & Ethical Hacking (1 Year)", slug: "cybersecurity-ethical-hacking" },
    ],
  },
  {
    id: "6-month-certificates",
    title: "6 Month Certificates",
    text: "A focused certificate in a single field",
    courses: [
      { label: "Digital Marketing & Communication (6 Months)", slug: "digital-marketing-communication" },
      { label: "Python Programming (6 Months)", slug: "python-programming" },
      { label: "Machine Learning & AI (6 Months)", slug: "ml-ai" },
      { label: "Cybersecurity (6 Months)", slug: "cybersecurity" },
    ],
  },
];

export const after12thHref = (slug: string) => `/after-12th-courses/${slug}`;

// Full-screen panels in the home page's training programmes section: the two
// training durations, then the 3, 6 and 9 month certificate programmes from
// the After 12th catalogue (each links to its section there).
export type ProgrammePanel = {
  duration: string;
  title: string;
  text: string;
  points: string[];
  popular?: boolean;
  /** Where "Programme details" goes; without it the button opens the enquiry popup. */
  href?: string;
  /** Internship & Training programme slug; its domain pages are linked from the panel. */
  slug?: string;
  /** Detail pages linked from the panel. */
  tracks?: { label: string; href: string }[];
};

const certificatePanel = (months: 3 | 6 | 9, points: string[]): ProgrammePanel => {
  const cat = after12thCatalogue.find((c) => c.id === `after-12th-${months}-month-program`);
  return {
    duration: `${months} Months`,
    title: `${months}-Month Certificate Programmes`,
    text: `${cat?.text ?? ""}. ${cat?.courses.length ?? 0} tracks to choose from — MERN, full stack, AI, cloud, cyber security, data and digital marketing.`,
    points,
    href: cat ? `/after-12th-courses#${cat.id}` : "/after-12th-courses",
    tracks: (cat?.courses ?? []).map((c) => ({
      label: c.label.replace(/ (Diploma )?(Certificate )?Program(me)?\b/, ""),
      href: after12thHref(c.slug),
    })),
  };
};

export const programmePanels: ProgrammePanel[] = [
  ...programmes.map((p) => ({ ...p, href: internshipHref(p.slug) })),
  certificatePanel(3, ["One subject, one term", "One live project", "Certificate on completion"]),
  certificatePanel(6, ["Half a year of training", "Finishes with a portfolio", "Certificate on completion"]),
  certificatePanel(9, ["The longest track", "Placement preparation", "Diploma-level depth"]),
];

// Columns in the After 12th mega menu: the three "After 12th" tracks above.
export const after12thMenu: MenuColumn[] = after12thCatalogue.slice(0, 3).map((cat) => ({
  title: cat.title,
  text: cat.text,
  courses: cat.courses.map((c) => ({ label: c.label, href: after12thHref(c.slug) })),
}));

// Columns in the Resources mega menu; every entry has its own page (see
// src/lib/resources/routes.ts).
export const resourcesMenu: MenuColumn[] = [
  {
    title: "Tools & Calculators",
    text: "Free instant diagnostics, estimators and interview prep.",
    courses: [
      { label: "Free Tools Hub", badge: "New", href: resourceRoutes.tools },
      { label: "AI Interview Prep", badge: "Hot", href: resourceRoutes.interviewPrep },
      { label: "CGPA to % Calculator", href: resourceRoutes.cgpa },
      { label: "AI Cold Email Generator", badge: "New", href: resourceRoutes.coldEmail },
      { label: "Find My Career Track", href: resourceRoutes.careerTrack },
      { label: "Training Matcher", href: resourceRoutes.trainingMatcher },
      { label: "Salary Estimator", href: resourceRoutes.salary },
      { label: "Free Study Materials", badge: "Hot", href: resourceRoutes.studyMaterial },
      { label: "Tech Interview Q&A", href: resourceRoutes.interviewQa },
    ],
  },
  {
    title: "Learning & Portals",
    text: "Free study notes, capstones, reviews and verification.",
    courses: [
      { label: "Student Projects", href: resourceRoutes.projects },
      { label: "Verify Certificate", href: resourceRoutes.verifyCertificate },
      { label: "Blogs", href: resourceRoutes.blog },
      { label: "Events & Seminars", href: resourceRoutes.events },
      { label: "Campus Gallery", href: resourceRoutes.gallery },
      { label: "Student Reviews", href: resourceRoutes.reviews },
      { label: "FAQ", href: resourceRoutes.faq },
      { label: "College Partnerships", href: resourceRoutes.partnerships },
      { label: "All Pages Directory", href: resourceRoutes.pages },
    ],
  },
];

// TODO: replace with the real YouTube video link for the Resources menu card.
export const promoVideoUrl = "https://www.youtube.com/";

export const aboutTagline =
  "Fifteen years of training, four hundred and fifty hiring partners, one method.";

// TODO: add each branch's website link; branches without one fall back to the branches list on the contact page.
export const branches = [
  { label: site.city, note: "This centre", href: "/contact" },
  { label: "Mohali", note: "Sector 75", href: "https://techcaddmohali.com" },
  { label: "Jalandhar", note: "Head office & flagship campus", href: "/contact#branches" },
  { label: "Ludhiana", href: "/contact#branches" },
  { label: "Phagwara", href: "/contact#branches" },
  { label: "Maqsudan", href: "/contact#branches" },
  { label: "Hoshiarpur", href: "/contact#branches" },
  { label: "Amritsar", href: "/contact#branches" },
];

export type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
  mega?: "about" | "ai" | "courses" | "certification" | "after12th" | "resources";
  children?: { label: string; href: string; note?: string }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/#top" },
  {
    label: "About",
    href: "/about",
    mega: "about",
    children: aboutMenu.map((m) => ({ label: m.link, href: m.href })),
  },
  { label: "Founder", href: "/about/founder" },
  { label: "AI", href: "/#ai", highlight: true, mega: "ai" },
  {
    label: "Courses",
    href: "/courses",
    mega: "courses",
    children: courseTracks.map((t) => ({ label: t.title, href: "/courses" })),
  },
  {
    label: "Internship & Training",
    href: internshipHref(),
    mega: "certification",
    children: certificatePrograms.map((c) => ({ label: c.label, href: trainingHref(c) })),
  },
  {
    label: "After 12th",
    href: "/after-12th-courses",
    mega: "after12th",
    children: after12thCatalogue.map((c) => ({ label: c.title, href: `/after-12th-courses#${c.id}` })),
  },
  {
    label: "Resources",
    href: resourceRoutes.pages,
    mega: "resources",
    // The phone menu lists every entry, since it has no mega menu.
    children: resourcesMenu.flatMap((c) =>
      c.courses.map((r) => ({ label: r.label, href: r.href ?? resourceRoutes.pages })),
    ),
  },
  { label: "Branches", href: "/contact#branches", children: branches },
  { label: "Contact", href: "/contact" },
];
