// Copy for the About, Mission & Vision and Founder pages. The section structure
// and wording follow techcaddjalandhar.com so the branches tell the same story.

import { branches, site, stats } from "./site";

/* ------------------------------------------------------------------ About */

export const whatWeTeach = [
  "Artificial Intelligence",
  "Data Science",
  "Machine Learning",
  "Cyber Security",
  "Cloud Computing",
  "Full Stack Development",
  "MERN Stack",
  "Python",
  "Web Development",
  "Mobile App Development",
  "Digital Marketing",
  "Graphic Designing",
  "UI/UX",
  "Animation",
  "Video Editing",
  "CAD/CAM",
];

export const teamPhotos = [
  {
    src: "/images/gallery/team-stage-group.webp",
    alt: `The ${site.name} team seated and standing on a stage beneath a large ${site.name} logo`,
    caption: `Team ${site.name}`,
  },
  {
    src: "/images/gallery/robotics-soldering.webp",
    alt: "A student solders a small robotics kit while a classmate hands her parts",
    caption: "Robotics lab",
  },
  {
    src: "/images/gallery/robot-dog-student.webp",
    alt: `A student crouches to greet a ${site.name}-branded robot dog outdoors`,
    caption: "Meet the robot dog",
  },
];

export const learners = [
  { title: "School & College Students", text: "Looking to develop technology skills early." },
  { title: "Graduates & Job Seekers", text: "Preparing for technology careers." },
  {
    title: "Engineering & IT Students",
    text: "Seeking practical exposure and industrial training.",
  },
  { title: "Working Professionals", text: "Looking to upgrade or diversify their skills." },
  { title: "Career Switchers", text: "Exploring opportunities in the technology sector." },
  {
    title: "Entrepreneurs & Freelancers",
    text: "Seeking digital and technology capabilities.",
  },
];

export const learningSteps = [
  { title: "Learn", text: "Understand the concepts and fundamentals." },
  {
    title: "Practice",
    text: "Apply knowledge through hands-on exercises and guided learning.",
  },
  { title: "Build", text: "Work on projects and practical applications." },
  { title: "Grow", text: "Develop professional confidence and career-oriented skills." },
];

export const differences = [
  {
    title: "Industry-Oriented Curriculum",
    text: "Training is designed around practical skills and technologies relevant to today's digital workplace.",
    icon: "layers",
  },
  {
    title: "Hands-On Learning",
    text: "Students get opportunities to apply concepts rather than relying solely on theoretical instruction.",
    icon: "code",
  },
  {
    title: "Emerging Technology Programs",
    text: "Learners can explore domains including AI, Machine Learning, Data Science, Cyber Security, Cloud Computing and other modern technologies.",
    icon: "sparkles",
  },
  {
    title: "Projects & Industrial Exposure",
    text: "Project-based learning and industrial training help students connect classroom concepts with practical applications.",
    icon: "rocket",
  },
  {
    title: "Experienced Trainers & Mentors",
    text: "Guidance from trainers and mentors helps learners understand technical concepts and their real-world applications.",
    icon: "users",
  },
  {
    title: "Career Guidance",
    text: "Students can receive guidance related to course selection, skill development, resumes, interviews and career pathways.",
    icon: "compass",
  },
  {
    title: "Placement Assistance",
    text: `${site.name} provides placement assistance and career support to eligible learners; actual employment decisions remain with recruiting organizations.`,
    icon: "briefcase",
  },
  {
    title: "Modern Learning Infrastructure",
    text: "Technology-focused learning environments are designed to support practical training and hands-on work.",
    icon: "monitor",
  },
  {
    title: "Industry & Academic Engagement",
    text: `${site.name} has participated in workshops, training initiatives and placement activities with educational institutions, strengthening the connection between academic learning and industry-oriented skills.`,
    icon: "handshake",
  },
] as const;

export const skillDomains = [
  {
    title: "Technology",
    items: ["AI", "Data Science", "Machine Learning", "Cyber Security", "Cloud Computing", "DevOps"],
  },
  {
    title: "Development",
    items: ["Full Stack", "MERN", "Python", "Web Development", "Mobile App Development"],
  },
  {
    title: "Digital & Creative",
    items: ["Digital Marketing", "Graphic Designing", "UI/UX", "Animation", "Video Editing"],
  },
  {
    title: "Professional & Technical Skills",
    items: ["CAD/CAM", "Advanced Excel", "Accounting", "Other career-focused programs"],
  },
];

export const approach = [
  {
    title: "Relevance",
    text: "Learn technologies and skills that connect with evolving industry requirements.",
  },
  {
    title: "Application",
    text: "Turn concepts into practical skills through projects, exercises and hands-on learning.",
  },
  {
    title: "Growth",
    text: "Develop the mindset and adaptability required to keep learning in a rapidly changing technology landscape.",
  },
];

// TODO: confirm each recognition applies to the Lucknow centre before going live.
export const recognitions = [
  {
    title: "ISO 9001 Certified",
    text: `${site.name}'s public LinkedIn profile describes the organization as an ISO 9001-certified and government-registered IT institute.`,
  },
  {
    title: "Industry-Academia Engagement",
    text: `${site.name} has participated in institutional initiatives and placement activities, including a joint campus placement drive hosted by I.K. Gujral Punjab Technical University in November 2025.`,
  },
  {
    title: "Academic Collaboration",
    text: `Publicly available information also records ${site.name}'s collaboration with educational institutions for skill development, workshops and experiential learning initiatives.`,
  },
  {
    title: "Technology & Innovation Initiatives",
    text: `${site.name} has participated in AI and robotics-focused initiatives, including demonstrations involving its AI robotic dog Chi-Chi at educational and technology events.`,
  },
];

export const milestones = [
  {
    year: 2016,
    title: `${site.name} is founded`,
    text: `Mr. Gourav Gupta starts ${site.name} in Jalandhar, to close the gap between academic learning and industry needs.`,
  },
  {
    year: 2017,
    title: "Industrial training at scale",
    text: "Six-week, 45-day and six-month tracks become full programmes.",
  },
  {
    year: 2018,
    title: "A placement cell",
    text: "Hiring support becomes its own team rather than a trainer's side task.",
  },
  {
    year: 2019,
    title: "Colleges come on board",
    text: "Formal training partnerships begin with universities across Punjab.",
  },
  {
    year: 2020,
    title: "Teaching through lockdown",
    text: "Live online batches launch in weeks, and no cohort loses a term.",
  },
  {
    year: 2021,
    title: "Data on the syllabus",
    text: "Analytics and data science join the catalogue as full tracks.",
  },
  {
    year: 2022,
    title: "Cloud and DevOps",
    text: "AWS, Docker and CI pipelines are added to the developer paths.",
  },
  {
    year: 2023,
    title: "After-12th pathways",
    text: "Career tracks built for school leavers, not just graduates.",
  },
  {
    year: 2024,
    title: "AI on the syllabus",
    text: "Generative and agentic AI arrive, taught on real projects.",
  },
  {
    year: 2025,
    title: "Ten thousand alumni",
    text: "The trained-student count passes five figures across all tracks.",
  },
  {
    year: 2026,
    title: "Today and beyond",
    text: "New labs, new tracks, and the same rule: you learn it by building it.",
  },
];

/* ------------------------------------------------------- Mission & Vision */

export const missionPoints = [
  {
    title: "Make Technology Accessible",
    text: "Provide learners with relevant and accessible technology education.",
  },
  {
    title: "Prioritize Practical Learning",
    text: "Go beyond theory through projects, hands-on training, and real-world exposure.",
  },
  {
    title: "Build Industry-Ready Talent",
    text: "Develop skills that align with evolving industry requirements and employment opportunities.",
  },
  {
    title: "Encourage Continuous Upskilling",
    text: "Help learners adapt to emerging technologies and continuously upgrade their capabilities.",
  },
  {
    title: "Expand the Learning Ecosystem",
    text: "Build a wider network through centres and collaborations so advanced technology education reaches more learners.",
  },
];

export const visionPoints = [
  "Creating future-ready technology professionals",
  "Promoting practical and industry-oriented education",
  "Encouraging innovation and continuous learning",
  "Supporting India's digital transformation",
  "Building a trusted name in software, services, and technology education",
];

export const futureFields = [
  "Artificial Intelligence",
  "Cloud Computing",
  "Cyber Security",
  "Data Science",
  "Automation",
];

/* ---------------------------------------------------------------- Founder */

export const founder = {
  name: "Gourav Gupta",
  role: `Founder, ${site.name}`,
  tags: ["Founder", "Educator", "Mentor"],
  instagram: "https://www.instagram.com/gouravgupta0/",
  linkedin: "https://www.linkedin.com/in/gouravguptatechcadd/",
  portrait: "/images/gallery/founder-mic.webp",
  about: "/images/gallery/founder-google.webp",
};

// "Core Pillars & Leadership" on the About page, after techcaddmohali.com/about/founder.
// The team runs the whole techcadd network, so it is the same for every branch.
// Photos are transparent cut-outs in public/images/team.
export const leadershipTeam = {
  intro: `Working alongside Founder Mr. Gourav Gupta, these are the co-founders, technical directors and branch heads who form the backbone of ${site.name}. From institutional governance and industry-grade curriculum architecture to expanding campuses from Punjab to ${site.city}, this core leadership team drives the vision, standards and continuous development of ${site.name}.`,
  members: [
    { name: "Shilpa Gupta", role: `Co-founder, ${site.name}`, area: "Operations & Governance", photo: "shilpa-mam", w: 609 },
    { name: "Asmita Sehgal", role: "Sr. Manager", area: "Academic Operations", photo: "asmita-mam", w: 663 },
    { name: "Sandeep", role: "Co-founder, IAM", area: "Cloud Systems & IAM", photo: "sandeep-sir", w: 557 },
    { name: "Amit Sharma", role: "IT Technical Head", area: "Information Technology", photo: "amit-sir", w: 601 },
    { name: "Harrachneet Kaur", role: "Sr. Relationship Manager", area: "Institutional Partnerships", photo: "richi-mam", w: 456 },
    { name: "Alam", role: `${site.name} Amritsar Franchise Owner`, area: `${site.name} Amritsar`, photo: "alam-sir", w: 571 },
    { name: "Tanisha", role: "Finance & Accounts Head", area: "Finance & Operations", photo: "tanisha-mam", w: 615 },
    { name: "Daljeet", role: `${site.name} Ludhiana Franchise Owner`, area: `${site.name} Ludhiana`, photo: "daljeet-sir", w: 454 },
    { name: "Anita", role: "Branch Head Jalandhar, IAM", area: `${site.name} Jalandhar`, photo: "anita-mam", w: 484 },
    { name: "Shiv", role: "Sr. AI Engineer", area: "Artificial Intelligence", photo: "shiv-sir", w: 598 },
    { name: "Aman", role: "Data Scientist", area: "Data Science & Analytics", photo: "aman-sir", w: 600 },
  ].map((m) => ({ ...m, photo: `/images/team/${m.photo}.png`, h: 1000 })),
};

// TODO: confirm these figures; the student count and centre count are taken
// from the stats and branch list in site.ts so the pages agree with each other.
export const founderStats = [
  { value: "2016", label: `${site.name} founded in Jalandhar` },
  {
    value: `${stats[0].value.toLocaleString("en-IN")}${stats[0].suffix}`,
    label: "Students trained",
  },
  { value: String(branches.length), label: "Centres across North India" },
  { value: "100%", label: "Placement assistance" },
];

export const stagePhotos = [
  {
    src: "/images/gallery/founder-talk-robot-dog.webp",
    alt: "Gourav Gupta speaking on stage with the robot dog beside him",
  },
  {
    src: "/images/gallery/founder-auditorium.webp",
    alt: "Gourav Gupta addressing a packed auditorium of students",
  },
  {
    src: "/images/gallery/founder-robot-dog-stage.webp",
    alt: "Gourav Gupta presenting while the robot dog stands on its hind legs",
  },
  {
    src: "/images/gallery/founder-bouquet.webp",
    alt: "Gourav Gupta welcomed with a bouquet in front of a seated audience",
  },
  {
    src: "/images/gallery/guest-of-honour.webp",
    alt: "Gourav Gupta receiving a guest of honour plaque on stage",
  },
  {
    src: "/images/gallery/founder-stage-talk.webp",
    alt: "Gourav Gupta speaking at a college event beside a techcadd banner",
  },
];

export const founderRoles = [
  {
    label: "Start small, think big",
    title: "Self-made entrepreneur",
    text: `Built ${site.name} from the ground up — putting up flex banners, doing offline branding and reaching students himself.`,
  },
  {
    label: "Career direction",
    title: "Career coach",
    text: "Guides students on education, technical fields and career pathways, and on the move from education to work.",
  },
  {
    label: "Goal setting & growth",
    title: "Mentor",
    text: "Helps young professionals build clarity, confidence and a growth mindset, and overcome self-doubt.",
  },
  {
    label: "Lessons from his journey",
    title: "Public speaker & motivator",
    text: "College talks, career guidance seminars and motivational sessions built on his own story of struggle and success.",
  },
];

export type Chapter = {
  id: string;
  marker: string;
  label: string;
  title: string;
  image: string;
  paragraphs: string[];
  list?: string[];
  principles?: { title: string; text: string }[];
  after?: string[];
  quote?: string;
};

export const chapters: Chapter[] = [
  {
    id: "the-start",
    marker: "The start",
    label: "Where it began",
    title: "A Journey Built on Struggle and Self-Belief",
    image: "/images/founder/journey-start.jpg",
    paragraphs: [
      "Gourav Gupta’s journey was far from easy. Pursuing engineering education while facing financial hardships demanded extraordinary commitment and sacrifice. To support himself and continue his studies, he drove an auto while completing his engineering education.",
      "For him, education was not merely a qualification. It was a pathway to independence, growth and a better future.",
      "Balancing work, studies and personal responsibilities taught him lessons that no textbook could offer: discipline, patience, resilience and the courage to keep moving forward, even when the circumstances were difficult.",
      "His journey stands as a reminder that where you begin does not define where you can go.",
    ],
  },
  {
    id: "2016",
    marker: "2016",
    label: "Chapter 01",
    title: `Building ${site.name} from the Ground Up`,
    image: "/images/founder/journey-2016.jpg",
    paragraphs: [
      `The early days of ${site.name} were a testament to Gourav Gupta’s hands-on approach, entrepreneurial spirit and unwavering belief in his vision.`,
      `In the initial phase of building ${site.name}, he personally took responsibility for tasks that many would overlook. From putting up flex banners and carrying out offline branding to working on the ground to create awareness, he was involved in every aspect of building the organization.`,
      "There were no shortcuts — only hard work, persistence and a willingness to do whatever it took to turn a vision into reality.",
      "Every banner installed, every conversation with a prospective student and every small step toward building the brand became part of a larger journey.",
      "He did not simply build a business; he built it through experience, sacrifice and the belief that meaningful impact begins with taking the first step.",
      `Over time, this commitment helped shape ${site.name} into an organization focused on technical education, industry-relevant skills and opportunities for learners.`,
    ],
  },
  {
    id: "2018",
    marker: "2018",
    label: "Chapter 02",
    title: "More Than an Entrepreneur — A Career Coach and Mentor",
    image: "/images/gallery/founder-auditorium.webp",
    paragraphs: [
      "Gourav Gupta believes that education should do more than provide a certificate. It should build confidence, develop practical skills and empower individuals to create meaningful careers.",
      "As a career coach and mentor, he is passionate about helping students and young professionals:",
    ],
    list: [
      "Discover their strengths, interests and career potential.",
      "Make informed decisions about education and career pathways.",
      "Develop industry-relevant skills and a growth-oriented mindset.",
      "Overcome self-doubt and challenges with confidence.",
      "Understand the importance of practical learning and continuous development.",
      "Transform their ambitions into clear, achievable goals.",
    ],
    after: [
      "His own experiences allow him to connect with learners at a deeper level. He understands that every student has a different starting point, different challenges and a unique definition of success.",
      "His approach to mentorship is rooted in practical guidance, empathy, discipline and the belief that every individual deserves the opportunity to grow.",
    ],
  },
  {
    id: "2020",
    marker: "2020",
    label: "Chapter 03",
    title: "The Philosophy Behind His Success",
    image: "/images/gallery/founder-stage-talk.webp",
    paragraphs: [
      "Gourav Gupta’s story is not about overnight success. It is about showing up every day, embracing challenges and continuing to work toward a bigger vision.",
      "His personal and professional philosophy is built around a few core principles:",
    ],
    principles: [
      {
        title: "Education is a powerful tool for transformation.",
        text: "Knowledge, skills and continuous learning can open doors to new opportunities.",
      },
      {
        title: "Hard work creates possibilities.",
        text: "Success is often the result of consistent effort, even when progress seems slow.",
      },
      {
        title: "Your starting point does not determine your destination.",
        text: "Financial challenges, limited resources or difficult beginnings do not have to define your future.",
      },
      {
        title: "Practical experience matters.",
        text: "Real-world exposure, hands-on learning and the willingness to take responsibility are essential for professional growth.",
      },
      {
        title: "Success becomes meaningful when it inspires others.",
        text: "The true impact of a journey lies not only in what you achieve, but also in the lives you positively influence.",
      },
    ],
  },
  {
    id: "2023",
    marker: "2023",
    label: "Chapter 04",
    title: "His Vision as a Career Coach",
    image: "/images/gallery/mou-ai-unleashed.webp",
    paragraphs: [
      "Gourav Gupta envisions a future where students and young professionals have access to the right guidance, practical skills and opportunities to build successful careers.",
      "Through his work as a mentor and career coach, he aims to bridge the gap between academic education and industry expectations. His focus is on encouraging learners to think beyond conventional career paths, develop confidence in their abilities and prepare themselves for a changing professional world.",
      "He believes that every individual has untapped potential — and the right guidance, combined with consistent effort, can help turn that potential into achievement.",
    ],
  },
  {
    id: "2026",
    marker: "2026",
    label: "Chapter 05",
    title: "An Inspiration for Every Dreamer",
    image: "/images/gallery/founder-robot-dog-stage.webp",
    paragraphs: [
      `From driving an auto to complete his engineering education, to personally building the foundations of ${site.name} through offline branding and hands-on effort, Gourav Gupta’s journey is a story of perseverance, humility and determination.`,
      "His life demonstrates that success is not defined by where you start, but by the courage to keep going.",
      "For students, aspiring entrepreneurs and young professionals, his journey offers a powerful message:",
    ],
    quote:
      "Your circumstances may decide where you begin, but your hard work, learning and determination can shape where you go.",
    after: [
      "Gourav Gupta is not just building an organization. He is inspiring individuals to believe in themselves, pursue their ambitions and build a future they can be proud of.",
    ],
  },
];

export const founderTestimonials: {
  name: string;
  role: string;
  image?: string;
  text: string;
}[] = [
  {
    name: "Asmita Sehgal",
    role: `Senior Manager, ${site.name}`,
    image: "/images/founder/asmita-mam.png",
    text: `Working with Gourav Sir has been a truly meaningful experience. His journey, from overcoming personal and professional struggles to building ${site.name}, is a constant source of inspiration. What I admire most is his ability to trust people, understand their challenges and encourage them to grow. His leadership goes beyond business — it is about empowering people and helping them believe in their own potential.`,
  },
  {
    name: "Harrachneet Kaur",
    role: `Relationship Manager, ${site.name}`,
    image: "/images/founder/richi-mam.png",
    text: "Gourav Sir’s dedication, positive attitude and vision have always inspired me. He leads by example and motivates everyone around him to give their best. His belief in people and his ability to guide them through challenges make him a truly inspiring leader. Working with him has been a valuable learning experience.",
  },
  {
    name: "Daljeet Singh",
    role: "Franchise Owner, Ludhiana",
    image: "/images/founder/daljeet-sir.png",
    text: "Gourav Gupta Sir’s entrepreneurial journey is a reflection of determination, hard work and strong vision. His guidance and commitment have been an inspiration throughout our association. He understands the challenges of building a business and encourages his partners to move forward with confidence. His journey motivates us to dream bigger and work harder.",
  },
  {
    name: "Alam",
    role: "Franchise Owner, Amritsar",
    image: "/images/founder/alam-sir.png",
    text: "What makes Gourav Sir stand out is his passion for education, his dedication to his vision and his willingness to support people around him. His journey teaches us that success comes through persistence and continuous effort. His guidance and entrepreneurial mindset have been a source of motivation and learning.",
  },
  {
    name: "Amit",
    role: "IT Technical Head",
    image: "/images/founder/amit-sir.png",
    text: "Gourav Sir is a visionary leader who understands the importance of technology, innovation and continuous learning. His commitment to building a strong organization and encouraging professional development is truly admirable. His journey reminds us that with the right mindset, discipline and dedication, challenges can become opportunities for growth.",
  },
  {
    name: "Shiv",
    role: "AI Engineer",
    image: "/images/founder/shiv-sir.png",
    text: "Gourav Sir’s vision for technology and skill-based education is inspiring. He encourages innovation, learning and the development of future-ready skills. His journey demonstrates the importance of perseverance and self-belief. Being associated with his vision motivates me to keep learning, improving and contributing meaningfully.",
  },
  {
    name: "Eakumpreet Singh",
    role: "Generative AI Engineer",
    text: "Gourav Sir’s journey is a powerful example of how determination and a clear vision can create meaningful success. His focus on emerging technologies, innovation and professional growth inspires young professionals like us. His leadership encourages us to explore new possibilities, strengthen our skills and build a better future.",
  },
];

// The head office's reels, in the order techcaddjalandhar.com/about/founder shows them.
// TODO: replace with the Lucknow account's reels when it has some.
export const instagramProfile = "https://www.instagram.com/techcadd__jalandhar";
export const reels = [
  "DRXM4TqE0cJ",
  "DRuqlw_k7rE",
  "DR7A8aDk_UI",
  "DSNg9j5k3AY",
  "DSxbHVbk0D8",
  "DVSgB2ME4e0",
  "DQMjtZ5k-0h",
].map((id) => ({
  url: `https://www.instagram.com/reel/${id}/`,
  embed: `https://www.instagram.com/reel/${id}/embed`,
}));
