// The 45-day training pages (/internship-training-in-lucknow/45-days/<domain>),
// written for the Lucknow centre from the "45 Days AI & ML Training" SEO
// content brief. The brief's rules carry over to every domain: the programme is
// described as training, not an employment internship; each topic is taught
// through a small exercise on permitted data; and nothing is promised about
// placement, university acceptance, fees or certificates beyond what a student
// should confirm in writing. Its repeated paragraphs appear here once.
import { site } from "./site";

const city = site.city;

export type Phase = { title: string; text: string; days: string[] };

export type Training45 = {
  /** Short name in headings, e.g. "AI & Machine Learning". */
  name: string;
  /** H1, without "45 Days" or the city. */
  heading: string;
  /** What the 45 days practise, for the meta description. */
  tools: string;
  /** Two students with different starting points (the brief's example). */
  contrast: string;
  /** Recommended preparation before day 1. */
  prerequisite: string;
  /** Six phases; their days add up to 45. */
  phases: Phase[];
  projects: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

// ─── Shared copy ───

export const shared = {
  trust: "Programme details, batch dates, fees and documentation should be confirmed with the centre in writing before enrolment.",

  overview: (name: string) => ({
    title: `What is 45-day ${name} training?`,
    text: [
      `A short, project-led training programme for college students in ${city}. For a student comparing summer or winter training, the most useful page answers a practical question before asking for an application: what will I practise, what can I inspect before I pay, and what will I have to show at the end?`,
      "The best explanation starts with your current knowledge, describes exactly what you will practise and shows how progress is assessed. You should be able to tell an introductory exercise from a polished project, and know how much independent practice will be expected of you.",
    ],
  }),

  kinds: [
    { title: "Introductory practical training", text: "Structured classroom and lab practice against a syllabus — what this 45-day programme is." },
    { title: "University industrial training", text: "A requirement set by your college or university. Whether this programme counts is your department's decision; get it in writing." },
    { title: "Employment internship", text: "Supervised work on an organisation's real tasks. This programme is not described as one unless a real workplace arrangement is confirmed." },
  ],

  audience: [
    { title: "B.Tech CSE and IT students", text: "Use a summer or winter break to add practical skills and a documented project to your record." },
    { title: "BCA and MCA students", text: "Build on programming and computer applications coursework with guided, hands-on practice." },
    { title: "B.Sc IT and Computer Science students", text: "Turn theory into worked exercises and a small project you can explain." },
    { title: "Diploma students", text: "Check the prerequisites with a counsellor; a foundation pace can be discussed." },
    { title: "Students changing disciplines", text: "Motivated beginners are welcome; expect regular practice outside class." },
  ],

  why: (name: string) => ({
    title: `Why choose 45 days of ${name} training?`,
    text: "A focused holiday window is enough to learn the foundations properly and finish one documented mini project. It is not enough to promise mastery, employment or university credit — and an honest page should say so.",
    items: [
      { title: "Fits a summer or winter break", text: "About six weeks of structured practice between semesters." },
      { title: "Foundations, done properly", text: "Correct terminology and defensible decisions over fashionable buzzwords." },
      { title: "Visible evidence", text: "Notebooks, files and a mini project a trainer has reviewed." },
      { title: "A clear next step", text: "You leave knowing what to learn next — or whether the six-month track suits you." },
    ],
  }),

  // How every session runs, from the brief's day-by-day template.
  session: [
    { title: "Learning objective", text: "The trainer explains what decision or task the day's topic helps with, using a small, non-sensitive example." },
    { title: "Guided practical", text: "A minimal worked example on a toy or openly licensed dataset or file, compared against a simple baseline where it applies." },
    { title: "Independent task", text: "You change at least one assumption, record what happened and why, and note what would make you distrust the result." },
    { title: "Mentor checkpoint", text: "Review of readability, naming, reproducibility and ethics — one strength, one improvement and a follow-up practice question." },
    { title: "Portfolio note", text: "Keep only work you may share, with a README stating the problem, source, steps and limitations." },
  ],

  projectNote:
    "A strong submission starts with a narrowly defined question and permitted data, keeps a short data dictionary or brief, compares at least two approaches when time allows and ends with a review of limitations. Public, synthetic or properly anonymised information is preferred; never collect classmates' private data without consent.",

  process: [
    { title: "Enquiry", text: "Call, WhatsApp or fill in the form." },
    { title: "Counselling", text: "Share your degree, semester and goals." },
    { title: "Skill assessment", text: "A short diagnostic sets your starting point." },
    { title: "Syllabus selection", text: "Confirm the domain and the current session plan." },
    { title: "Orientation", text: "Batch timings, tools and expectations." },
    { title: "Attendance", text: "Daily sessions with recorded attendance." },
    { title: "Evaluation", text: "Checkpoints and a mini project review." },
    { title: "Feedback", text: "Strengths, gaps and a next learning plan." },
  ],

  documents: ["NOC from your college", "Joining letter", "Attendance record", "Report in your university's format", "Mentor verification"],
  documentsNote:
    "Ask which of these the centre currently issues and check them against your university's rules. No training centre can guarantee acceptance; get written approval from your department before paying.",

  batches: [
    { title: "Summer training", text: "Usually planned around the May–July college break." },
    { title: "Winter training", text: "Shorter vacations may need a more intensive daily schedule." },
    { title: "Weekday and weekend", text: "Intensity differs; confirm the session plan before joining." },
    { title: "Start dates", text: "Published only once confirmed — ask for the current batch calendar." },
  ],

  feesAsk: ["Programme fee", "Taxes", "Laptop requirement", "Assessment charges", "Study materials", "Refund terms", "Certificate criteria"],

  careers: {
    text: "Forty-five days builds foundations, not a job guarantee. Realistic next steps are:",
    steps: [
      { title: "Keep practising", text: "Extend your mini project and publish it in your portfolio." },
      { title: "Go deeper", text: "Move on to the six-month track in the same domain." },
      { title: "Apply for internships", text: "Use your documented project as evidence when applying." },
      { title: "Plan further study", text: "Choose electives or certifications with a clearer idea of the field." },
    ],
  },

  certificates: [
    { title: "Completion evidence", text: "A certificate records participation or completion — check its exact wording and who issues it." },
    { title: "Attendance conditions", text: "Ask what attendance is required for a certificate to be issued." },
    { title: "Assessments", text: "Checkpoints and the mini project review show what you can actually do." },
    { title: "Institutional acceptance", text: "Only your college or university can confirm whether it counts." },
  ],


  cta: (name: string) =>
    `Request the latest 45-day ${name} syllabus, batch dates, fees and eligibility. Tell the counselling team your course, semester and current experience, and whether you need university-approved training documentation. Please don't send sensitive personal documents through a public form.`,

  // FAQs every domain answers the same way.
  faqs: (name: string) => [
    {
      q: "Is this a summer training programme or an internship?",
      a: `It is ${name} training: structured classroom and lab practice with a mini project. It is not described as an employment internship unless a real workplace arrangement is confirmed in writing.`,
    },
    {
      q: "Will my college accept the certificate?",
      a: "Only your college or university can confirm that. Check the approved duration, report format and documents with your training and placement cell before paying any fee.",
    },
    {
      q: "Does techcadd provide an internship joining letter?",
      a: "Ask the centre which documents it currently issues and compare them with your university's requirements before enrolling.",
    },
    {
      q: "Are projects included?",
      a: "Yes — each batch ends with a guided mini project. Ask for a sample brief and the rubric used to review it.",
    },
    { q: "Do I need a laptop?", a: "Ask the centre about lab access and whether your own laptop is required or recommended for practice at home." },
    {
      q: "Is it suitable for first-year or diploma students?",
      a: "Often yes, with a foundation pace. A short counselling conversation and skill check help confirm the right starting point.",
    },
    {
      q: "What are the batch dates, fees and refund terms?",
      a: "Ask for the current written batch calendar, fee schedule and refund policy. Confirm taxes, materials and any assessment or certificate charges.",
    },
    { q: "Are there weekend batches?", a: "Weekday and weekend options may be available; their pace differs, so confirm the session plan before joining." },
    {
      q: "Does the programme guarantee placement?",
      a: "No. Forty-five days can build foundations and a small portfolio, but hiring depends on your skills, interviews and each employer's criteria.",
    },
    {
      q: "Can I get guidance for an academic report?",
      a: "Ask how report guidance works. Your report should describe your own work, in your university's format.",
    },
    {
      q: `Where is the ${city} centre?`,
      a: `${site.address}. Book a visit to discuss the syllabus before you decide.`,
    },
    { q: "How do I request the syllabus?", a: "Use the enquiry form, call or WhatsApp. Ask for the current 45-day session plan for your domain." },
  ],
};

// ─── Per domain ───

const plans: Record<string, Training45> = {
  "artificial-intelligence": {
    name: "AI & Machine Learning",
    heading: "Artificial Intelligence and Machine Learning Training",
    tools: "Python, data preparation, machine learning basics and a practical project",
    contrast:
      "Consider a B.Tech CSE student who knows basic programming but has never trained a machine learning model, and a BCA student who has used spreadsheets but is new to Python. Both need different starting points — which is why the programme begins with a skill check.",
    prerequisite: "No Python is required to start, but basic computer use and school-level maths help. Advanced mathematics is not needed.",
    phases: [
      {
        title: "Python foundations",
        text: "From your first notebook to NumPy and pandas.",
        days: ["AI use cases and learning goals", "Python setup and notebooks", "Python variables and data types", "Control flow and functions", "Lists, dictionaries and file handling", "NumPy arrays and vectorisation", "Pandas data frames and indexing"],
      },
      {
        title: "Data preparation and statistics",
        text: "Clean, describe and visualise data before modelling.",
        days: ["Data import and CSV quality checks", "Missing values and duplicates", "Descriptive statistics", "Matplotlib visual storytelling", "Exploratory data analysis", "Data cleaning project checkpoint"],
      },
      {
        title: "Supervised learning",
        text: "Regression and classification against honest baselines.",
        days: ["Machine learning workflow and leakage", "Train, validation and test splitting", "Linear regression and baseline models", "Regression metrics and residuals", "Feature engineering for tabular data", "Regularisation and generalisation", "Logistic regression for classification", "Confusion matrices, precision and recall"],
      },
      {
        title: "More models and evaluation",
        text: "Trees, ensembles, tuning and unsupervised learning.",
        days: ["Decision trees and interpretable rules", "Random forests and ensembles", "Gradient boosting concepts", "Cross-validation and tuning", "Class imbalance and ethical evaluation", "K-nearest neighbours and scaling", "Naive Bayes and text classification", "Clustering with k-means", "Principal component analysis concepts"],
      },
      {
        title: "NLP, neural networks and generative AI",
        text: "Introductions, with responsible use built in.",
        days: ["Natural language preprocessing", "Text features and sentiment baselines", "Neural network fundamentals", "Model training and overfitting", "Generative AI concepts and limitations", "Prompt evaluation and verification", "Responsible AI: fairness and privacy"],
      },
      {
        title: "Mini project and evaluation",
        text: "Scope, build, test and present your own project.",
        days: ["Mini project scoping and problem statement", "Dataset provenance and data dictionary", "Baseline model implementation", "Improving features and experiments", "Testing robustness and edge cases", "Explainability and model cards", "Project presentation and documentation", "Final evaluation and next learning plan"],
      },
    ],
    projects: [
      { title: "Student study planner", text: "Recommend study slots from synthetic timetable data." },
      { title: "Public movie review sentiment", text: "Classify openly licensed reviews and report errors." },
      { title: "Campus event attendance forecasting", text: "Predict turnout from past, anonymised event data." },
      { title: "Library borrowing trends", text: "Explore and model borrowing patterns." },
      { title: "Retail inventory demand", text: "A simple demand forecast against a baseline." },
      { title: "Local air-quality data exploration", text: "Analyse public air-quality data for the city." },
      { title: "Resume skill taxonomy", text: "Group skills from public job descriptions." },
      { title: "College club survey analysis", text: "Analyse a consented, anonymised survey." },
    ],
    faqs: [
      {
        q: "Is 45 days enough to learn AI and ML?",
        a: "It is enough for a structured introduction to Python, data preparation, machine learning and a small project — not for advanced professional competence. Review a sample learning task to see whether the pace suits you.",
      },
      { q: "Can BCA students join without advanced mathematics?", a: "Yes. The statistics needed is taught as you go; school-level maths and regular practice are what matter." },
      { q: "Is Python required before admission?", a: "No. The first week covers Python from setup onwards, though some practice beforehand helps." },
      {
        q: "What is the difference between AI and machine learning?",
        a: "AI is the broad goal of making systems act intelligently; machine learning is the main way to do it today — learning patterns from data. This training focuses on machine learning, with introductions to NLP and generative AI.",
      },
      { q: "Will I learn ChatGPT and generative AI?", a: "You get an introduction to how generative AI works, its limits and how to check its output — not a full generative AI course." },
      { q: "Will I learn deep learning in 45 days?", a: "Only its fundamentals: what a neural network is, how it trains and why it overfits. Deep learning is covered properly on the six-month track." },
    ],
  },

  "cloud-computing": {
    name: "Cloud Computing",
    heading: "Cloud Computing Training",
    tools: "Linux, networking, AWS fundamentals, Docker and a deployed project",
    contrast:
      "Consider a B.Tech IT student who has used Linux in a college lab but never deployed anything to the cloud, and a BCA student who has only used Windows. Their first week looks different — which is why the programme begins with a skill check.",
    prerequisite: "Basic computer skills are enough to start. Some programming or command-line experience helps.",
    phases: [
      {
        title: "Linux and networking",
        text: "The systems foundations every cloud task depends on.",
        days: ["Cloud careers and learning goals", "Linux setup and the command line", "Files, users and permissions", "Processes, services and logs", "Bash scripting basics", "Networking: IP, subnets and DNS", "HTTP, ports and firewalls"],
      },
      {
        title: "Cloud foundations",
        text: "Service models, identity and core AWS services, safely.",
        days: ["Cloud service models and regions", "Creating a cloud account safely", "IAM users, groups and roles", "Least-privilege policies", "Virtual machines (EC2) basics", "Security groups and key pairs", "Block and object storage (EBS, S3)", "Free tier and cost monitoring"],
      },
      {
        title: "Deploying applications",
        text: "Websites, servers, databases and domains.",
        days: ["Hosting a static website on S3", "A web server on a virtual machine", "Managed databases (RDS) basics", "Load balancing concepts", "Auto scaling concepts", "DNS and domains", "HTTPS and certificates", "Backups and snapshots"],
      },
      {
        title: "Containers and automation",
        text: "Docker, Git and a first CI/CD pipeline.",
        days: ["Git and version control", "Docker images and containers", "Writing a Dockerfile", "Multi-container apps with Compose", "Container registries", "CI/CD concepts", "A first build pipeline", "Deploying from a pipeline"],
      },
      {
        title: "Operations",
        text: "Infrastructure as code, monitoring, serverless and security.",
        days: ["Infrastructure as code concepts", "Terraform basics", "Monitoring and logs", "Alerts and budgets", "Serverless functions basics", "Security checklist and secrets", "Incident drill and clean-up"],
      },
      {
        title: "Mini project",
        text: "Design, deploy, monitor and document a small system.",
        days: ["Project scoping and architecture diagram", "Building the infrastructure", "Deploying the application", "Testing and monitoring", "Cost review and clean-up", "Documentation and README", "Final presentation and next learning plan"],
      },
    ],
    projects: [
      { title: "Portfolio site on S3", text: "A static site with a custom domain and HTTPS." },
      { title: "Two-tier web app", text: "A server and managed database, with a network diagram." },
      { title: "Containerised app pipeline", text: "Build and deploy a Docker image automatically." },
      { title: "Terraform environment", text: "Create and destroy a small environment from code." },
      { title: "Monitoring dashboard", text: "Logs, an alert and a budget for a running service." },
      { title: "Serverless contact form", text: "A small function behind a web form." },
    ],
    faqs: [
      { q: "Do I need a credit card or my own cloud account?", a: "Ask the centre how lab access works. Always confirm free-tier limits and clean up resources so nothing is charged unexpectedly." },
      { q: "Which cloud platform is used?", a: "Practice is mainly on AWS; the concepts — compute, storage, identity, networking — carry over to Azure and Google Cloud." },
      { q: "Is coding required?", a: "Not to start. Basic scripting is taught, and programming experience helps with the automation phase." },
      { q: "Is a cloud certification included?", a: "Any external certification exam and its fee must be confirmed in writing; it is not assumed to be part of the programme." },
    ],
  },

  "flutter-app-development": {
    name: "Flutter App Development",
    heading: "Flutter App Development Training",
    tools: "Dart, Flutter widgets, APIs, Firebase and a working mobile app",
    contrast:
      "Consider a B.Tech CSE student who has written Java or C++ but never built a mobile app, and a BCA student who has only built simple web pages. Both can learn Flutter, from different starting points.",
    prerequisite: "Basic programming in any language helps. A laptop that can run Android Studio or an emulator is useful for home practice.",
    phases: [
      {
        title: "Dart foundations",
        text: "The language Flutter apps are written in.",
        days: ["App development careers and goals", "Flutter and Dart setup", "Dart variables and types", "Control flow and functions", "Collections and null safety", "Classes and objects", "Async code and futures"],
      },
      {
        title: "Widgets and layout",
        text: "Build screens that look right on every phone.",
        days: ["The widget tree", "Stateless and stateful widgets", "Rows, columns and stacks", "Lists and grids", "Themes, colours and fonts", "Images and assets", "Responsive layouts", "Layout checkpoint: rebuild a design"],
      },
      {
        title: "Navigation and input",
        text: "Multi-screen apps, forms and state.",
        days: ["Navigation and routes", "Passing data between screens", "Forms and validation", "Buttons, dialogs and snackbars", "Local state with setState", "Provider basics", "State checkpoint"],
      },
      {
        title: "Data and APIs",
        text: "Live data, local storage and Firebase.",
        days: ["HTTP requests", "JSON parsing and models", "Loading and error states", "Shared preferences", "SQLite local database", "Firebase setup", "Firebase authentication", "Firestore reads and writes"],
      },
      {
        title: "Quality and polish",
        text: "Testing, accessibility and release builds.",
        days: ["Animation basics", "Accessibility basics", "Widget testing", "Debugging with DevTools", "App icons and splash screen", "Release builds", "Play Store listing basics"],
      },
      {
        title: "Mini project",
        text: "Plan, build and demo your own app.",
        days: ["Project scoping and wireframes", "Screens and navigation", "State and data layer", "API or Firebase integration", "Testing on devices", "Bug fixing and polish", "Documentation and README", "Demo and next learning plan"],
      },
    ],
    projects: [
      { title: "Expense tracker", text: "Categories, totals and offline storage." },
      { title: "Weather or news app", text: "Live API data with search and favourites." },
      { title: "Notes app with login", text: "Firebase authentication and per-user notes." },
      { title: "Campus utility app", text: "Timetable and notices for students." },
      { title: "Quiz app", text: "Questions, scoring and results screens." },
      { title: "Habit tracker", text: "Daily check-ins with local reminders." },
    ],
    faqs: [
      { q: "Do I need a Mac or an iPhone?", a: "No. Android apps can be built and tested on Windows. Building for iOS needs a Mac, which a counsellor can discuss with you." },
      { q: "Can I publish my app?", a: "Release builds and store-listing basics are covered; publishing requires your own developer account and its fee." },
      { q: "Is Flutter good for beginners?", a: "Yes, with basic programming practice. Dart is taught from the fundamentals in the first week." },
    ],
  },

  "mern-full-stack": {
    name: "MERN Full Stack",
    heading: "MERN Full Stack Development Training",
    tools: "HTML, CSS, JavaScript, React, Node.js, MongoDB and a deployed web app",
    contrast:
      "Consider a B.Tech CSE student who knows C or Java but has never built a website, and a BCA student who has written HTML pages but never used a database. Both reach a full-stack mini project, from different starting points.",
    prerequisite: "No web experience is required. Basic programming logic helps you keep pace in the JavaScript week.",
    phases: [
      {
        title: "Web foundations",
        text: "Structure and style pages that work on any screen.",
        days: ["Web development careers and goals", "How the web works", "HTML structure and semantics", "Forms and accessibility", "CSS selectors and the box model", "Flexbox and grid", "Responsive design"],
      },
      {
        title: "JavaScript",
        text: "The language of the whole MERN stack.",
        days: ["JavaScript variables and types", "Functions and scope", "Arrays and objects", "DOM manipulation", "Events", "Fetch and async/await", "ES modules", "JavaScript checkpoint"],
      },
      {
        title: "React",
        text: "Component-based front ends.",
        days: ["React setup with Vite", "Components and props", "State and events", "Lists and conditional rendering", "Forms in React", "useEffect and data fetching", "React Router", "React checkpoint"],
      },
      {
        title: "Node, Express and MongoDB",
        text: "APIs, databases and authentication.",
        days: ["Node.js basics", "Express routes", "REST API design", "MongoDB and Mongoose", "CRUD operations", "Validation and error handling", "Authentication with JWT", "Password hashing and security basics"],
      },
      {
        title: "Integration and deployment",
        text: "Connect the layers and put them online.",
        days: ["Connecting React to the API", "Git branches and pull requests", "Testing basics", "Environment variables", "Deploying the API", "Deploying the front end"],
      },
      {
        title: "Mini project",
        text: "A small full-stack app, built and demoed.",
        days: ["Project scoping and user stories", "Data model and API", "Front-end screens", "Authentication", "Integration and testing", "Bug fixing", "Documentation and README", "Demo and next learning plan"],
      },
    ],
    projects: [
      { title: "Task manager", text: "Login, tasks and filters backed by an API." },
      { title: "Student notice board", text: "Posts, categories and an admin role." },
      { title: "Mini store", text: "Product list, cart and order summary." },
      { title: "Event registration", text: "Sign-ups with validation and email confirmation." },
      { title: "Blog platform", text: "Write, edit and comment on posts." },
      { title: "Expense splitter", text: "Shared expenses between a group of friends." },
    ],
    faqs: [
      { q: "Do I need coding experience?", a: "No. The first two weeks cover HTML, CSS and JavaScript from the basics." },
      { q: "Will my project be online?", a: "Yes — deployment is covered, so your mini project can be shared as a live link." },
      { q: "Is 45 days enough for full stack?", a: "Enough to build and deploy a small app with guidance. Larger, production-style work is covered on the six-month track." },
    ],
  },

  "generative-ai": {
    name: "Generative AI",
    heading: "Generative AI Training",
    tools: "Python, prompt engineering, LLM APIs, retrieval and a guarded AI app",
    contrast:
      "Consider a B.Tech CSE student who has used ChatGPT but never called a model from code, and a BCA student who is new to Python altogether. Both can build a small AI app, from different starting points.",
    prerequisite: "No AI background is required. Basic Python is taught in the first week; prior programming practice helps.",
    phases: [
      {
        title: "Python for AI apps",
        text: "Enough Python to call APIs and handle data.",
        days: ["Generative AI use cases and goals", "Python setup and notebooks", "Variables, functions and files", "Lists, dictionaries and JSON", "HTTP requests and APIs", "Virtual environments and secrets", "Git basics"],
      },
      {
        title: "How LLMs work",
        text: "What models do well, badly and why.",
        days: ["Tokens and context windows", "How models generate text", "Why models make things up", "Choosing models and managing cost", "Responsible use and privacy", "Prompt basics", "Prompt checkpoint"],
      },
      {
        title: "Prompt engineering",
        text: "Prompts you can test and improve.",
        days: ["Clear instructions and roles", "Few-shot examples", "Structured output with JSON", "Prompt chaining", "Building a test set", "Comparing prompts on the test set", "Summarisation tasks", "Extraction tasks"],
      },
      {
        title: "Building with APIs",
        text: "From a script to a small app.",
        days: ["Calling an LLM API", "Streaming responses", "Error handling and retries", "Rate limits and cost control", "A simple chat interface", "Conversation memory", "Moderation and guardrails", "App checkpoint"],
      },
      {
        title: "Retrieval and agents",
        text: "Grounded answers and careful tool use.",
        days: ["Embeddings explained", "Chunking documents", "Vector search", "Retrieval-augmented generation", "Citing sources", "Tool calling basics", "Agent limits and human review"],
      },
      {
        title: "Mini project",
        text: "An evaluated app, not just a demo.",
        days: ["Project scoping and success criteria", "Document preparation", "Building the pipeline", "Evaluation set and scoring", "Failure analysis", "Safety and privacy review", "Documentation and README", "Demo and next learning plan"],
      },
    ],
    projects: [
      { title: "Course notes Q&A", text: "Answers from your own notes, with citations." },
      { title: "Study quiz generator", text: "Quizzes from a chapter, checked for errors." },
      { title: "Email drafting helper", text: "Drafts reviewed by a person before sending." },
      { title: "Feedback summariser", text: "Summarise anonymised survey comments." },
      { title: "Support message triage", text: "Classify messages with a fallback to a person." },
      { title: "Document extractor", text: "Pull structured fields from sample documents." },
    ],
    faqs: [
      { q: "Will I need paid API keys?", a: "Ask how model access works in the lab and whether any cost falls on you. Free tiers and open models cover much of the practice." },
      { q: "How is this different from the AI & ML training?", a: "AI & ML starts from learning patterns in data. Generative AI focuses on building applications with large language models: prompting, retrieval and evaluation." },
      { q: "Will I learn to use ChatGPT?", a: "You'll use chat assistants and their APIs, and — more importantly — learn to test and verify what they produce." },
    ],
  },

  "digital-marketing": {
    name: "Digital Marketing",
    heading: "Digital Marketing Training",
    tools: "SEO, social media, Google and Meta ads, analytics and a campaign project",
    contrast:
      "Consider a BBA student who knows marketing theory but has never run a campaign, and a B.Tech student who understands websites but not audiences. Both build a campaign plan, from different starting points.",
    prerequisite: "No coding or design experience is needed. Comfort with computers and the internet is enough to start.",
    phases: [
      {
        title: "Marketing foundations",
        text: "Audiences, funnels and goals before tools.",
        days: ["Digital marketing careers and goals", "Audiences and personas", "Funnels and customer journeys", "Goals and KPIs", "Competitor research", "Brand voice basics", "Marketing plan checkpoint"],
      },
      {
        title: "Websites and SEO",
        text: "Get found in search, ethically.",
        days: ["How search engines work", "Keyword research", "On-page SEO", "Technical SEO basics", "Content for SEO", "Ethical link building", "Local SEO and Google Business Profile", "WordPress basics", "Landing pages that convert"],
      },
      {
        title: "Social media and content",
        text: "Plan, create and measure content.",
        days: ["Platform strategy", "Content calendars", "Writing captions and copy", "Design basics with Canva", "Short video and reels", "Community management", "Instagram and Facebook insights", "LinkedIn for brands"],
      },
      {
        title: "Paid advertising",
        text: "Google and Meta ads, with budgets and policies.",
        days: ["How paid ads work", "Google Ads account structure", "Keywords and match types", "Writing search ads", "Meta Ads objectives", "Audiences and targeting", "Budgets and bidding", "Ad policies and compliance"],
      },
      {
        title: "Email and analytics",
        text: "Measure honestly and automate sensibly.",
        days: ["Email marketing basics", "Automation sequences", "Google Analytics setup", "Conversions and events", "Reading reports honestly", "Search Console basics"],
      },
      {
        title: "Mini project",
        text: "A campaign for a real or sample business.",
        days: ["Campaign brief", "Research and planning", "Content and creatives", "Campaign setup", "Tracking and reporting", "Results review", "Presentation and next learning plan"],
      },
    ],
    projects: [
      { title: "Local business SEO audit", text: "Findings and prioritised fixes." },
      { title: "Google Business Profile plan", text: "Optimised listing and review strategy." },
      { title: "Month of social content", text: "A calendar with designs and captions." },
      { title: "Search ads plan", text: "Structure, keywords and budget for a product." },
      { title: "Email welcome sequence", text: "Three emails with a clear goal." },
      { title: "Analytics report", text: "Traffic and conversions explained honestly." },
    ],
    faqs: [
      { q: "Will I run real ads?", a: "Ask how ad practice works. Spending real money should only happen with a clear, agreed budget." },
      { q: "Do I need to be good at design?", a: "No. Design basics with templates are covered; the focus is on planning, writing and measuring." },
      { q: "Is digital marketing suitable for non-IT students?", a: "Yes. It suits BBA, B.Com, BA and IT students alike." },
    ],
  },

  "data-analytics": {
    name: "Data Analytics",
    heading: "Data Analytics Training",
    tools: "Excel, SQL, Python, Power BI and a dashboard project",
    contrast:
      "Consider a B.Com student who is comfortable with Excel but has never written a query, and a B.Tech student who can code but has never built a dashboard. Both finish with an analysis, from different starting points.",
    prerequisite: "No programming is required. Basic spreadsheet use helps in the first week.",
    phases: [
      {
        title: "Excel foundations",
        text: "Clean, summarise and chart data in spreadsheets.",
        days: ["Data analytics careers and goals", "Spreadsheet basics and data types", "Formulas and cell references", "Lookups", "Sorting, filtering and validation", "Pivot tables", "Charts in Excel", "Excel checkpoint"],
      },
      {
        title: "SQL",
        text: "Query relational databases with confidence.",
        days: ["Relational databases", "SELECT and WHERE", "Sorting and aggregate functions", "GROUP BY and HAVING", "Joins", "Subqueries", "Window functions basics", "SQL checkpoint"],
      },
      {
        title: "Python for data",
        text: "Reproducible cleaning and analysis with pandas.",
        days: ["Python setup and notebooks", "Variables, lists and dictionaries", "Pandas data frames", "Data import and CSV quality checks", "Missing values and duplicates", "Grouping and merging", "Charts with Matplotlib", "Python checkpoint"],
      },
      {
        title: "Statistics",
        text: "Enough statistics to avoid misleading conclusions.",
        days: ["Descriptive statistics", "Distributions and outliers", "Sampling and bias", "Correlation versus causation", "Hypothesis testing basics", "Exploratory analysis"],
      },
      {
        title: "Power BI",
        text: "Interactive dashboards that tell a clear story.",
        days: ["Importing data into Power BI", "Data modelling", "DAX measures basics", "Visuals and layout", "Filters and slicers", "Dashboard storytelling", "Publishing and sharing"],
      },
      {
        title: "Mini project",
        text: "Answer a business question end to end.",
        days: ["Business question and scope", "Data sourcing and dictionary", "Cleaning and preparation", "Analysis", "Dashboard build", "Findings and limitations", "Report writing", "Presentation and next learning plan"],
      },
    ],
    projects: [
      { title: "Sales dashboard", text: "KPIs, trends and drill-downs in Power BI." },
      { title: "Library borrowing trends", text: "Seasonal patterns in sample data." },
      { title: "Retail demand summary", text: "SQL queries behind a monthly report." },
      { title: "Public data investigation", text: "An open government dataset, analysed." },
      { title: "Survey analysis", text: "A consented, anonymised college survey." },
      { title: "Air-quality explorer", text: "Public city air-quality data, visualised." },
    ],
    faqs: [
      { q: "Is data analytics good for beginners?", a: "Yes. It starts with Excel and SQL before Python, making it one of the more accessible domains." },
      { q: "What is the difference between data analytics and data science?", a: "Analytics answers business questions with queries, statistics and dashboards. Data science adds predictive modelling." },
      { q: "Do I need to know Python?", a: "No. Python is introduced in the third phase, after Excel and SQL." },
    ],
  },

  "data-science": {
    name: "Data Science",
    heading: "Data Science Training",
    tools: "Python, statistics, machine learning and a documented data project",
    contrast:
      "Consider a B.Sc student comfortable with statistics but new to Python, and a B.Tech CSE student who codes well but has never tested a hypothesis. Both reach a modelling project, from different starting points.",
    prerequisite: "No Python is required to start. School-level maths and willingness to practise are what matter.",
    phases: [
      {
        title: "Python foundations",
        text: "Notebooks, NumPy, pandas and Git.",
        days: ["Data science careers and goals", "Python setup and notebooks", "Variables, data types and functions", "Lists, dictionaries and files", "NumPy arrays", "Pandas data frames", "Git basics"],
      },
      {
        title: "Data handling",
        text: "Import, clean, reshape and explore.",
        days: ["Data import and quality checks", "Missing values and duplicates", "Types and transformations", "Merging and reshaping", "Descriptive statistics", "Visualisation with Matplotlib and Seaborn", "Exploratory data analysis"],
      },
      {
        title: "Statistics",
        text: "Probability and inference you can apply.",
        days: ["Probability basics", "Distributions", "Sampling and confidence intervals", "Hypothesis testing", "Correlation and regression intuition", "Statistics checkpoint"],
      },
      {
        title: "Machine learning",
        text: "Models, metrics and honest validation.",
        days: ["ML workflow and data leakage", "Train and test splitting", "Linear regression", "Regression metrics", "Logistic regression", "Classification metrics", "Decision trees and random forests", "Cross-validation", "Feature engineering", "Clustering and PCA"],
      },
      {
        title: "Communication",
        text: "Interpret, explain and share results.",
        days: ["Model interpretation", "Error analysis", "Data storytelling", "Dashboard basics", "Saving and loading models", "A simple prediction API", "Responsible data use"],
      },
      {
        title: "Mini project",
        text: "A documented project from question to model.",
        days: ["Problem statement and scope", "Dataset provenance", "Baseline model", "Improved models", "Evaluation and error analysis", "Documentation and README", "Presentation", "Final evaluation and next learning plan"],
      },
    ],
    projects: [
      { title: "Price prediction", text: "Regression on public housing or vehicle data." },
      { title: "Churn classification", text: "Who might leave, with honest metrics." },
      { title: "Customer segmentation", text: "Clusters described in business terms." },
      { title: "Demand forecasting", text: "A simple forecast against a baseline." },
      { title: "Campus event attendance", text: "Turnout prediction from anonymised data." },
      { title: "Air-quality analysis", text: "Public city data, explored and modelled." },
    ],
    faqs: [
      { q: "How is Data Science different from Data Analytics?", a: "Analytics focuses on queries and dashboards. Data science adds statistics and machine learning to make and test predictions." },
      { q: "How much maths do I need?", a: "School-level maths is enough to start; the statistics needed is taught in the third phase." },
      { q: "Is 45 days enough for data science?", a: "Enough for foundations and one modelling project. Deeper work is covered on the six-month track." },
    ],
  },

  "cyber-security": {
    name: "Cyber Security",
    heading: "Cyber Security Training",
    tools: "networking, Linux, security fundamentals, monitoring and authorised lab work",
    contrast:
      "Consider a B.Tech CSE student who has studied networks in theory but never captured a packet, and a BCA student new to Linux. Both work through the same labs, from different starting points.",
    prerequisite: "No security experience is required. Basic computer skills are enough; networking knowledge helps.",
    phases: [
      {
        title: "Foundations and ethics",
        text: "Concepts, the law and a safe lab.",
        days: ["Cyber security careers and goals", "Security concepts: the CIA triad", "Ethics, law and authorisation", "Lab setup with virtual machines", "The Linux command line", "Linux users and permissions", "Windows security basics"],
      },
      {
        title: "Networking",
        text: "How traffic moves, and how to watch it.",
        days: ["OSI and TCP/IP models", "IP addressing and subnets", "DNS, HTTP and HTTPS", "Ports and protocols", "Packet capture with Wireshark", "Firewalls", "VPNs and remote access", "Networking checkpoint"],
      },
      {
        title: "Threats and defences",
        text: "Common attacks and the controls that stop them.",
        days: ["Threats, vulnerabilities and risk", "Malware types", "Phishing and social engineering", "Passwords and multi-factor authentication", "Encryption basics", "System hardening", "Patch management", "Security policies"],
      },
      {
        title: "Assessment in the lab",
        text: "Authorised testing and clear findings.",
        days: ["Reconnaissance in an authorised lab", "Network scanning with Nmap", "Vulnerability scanning", "Web app basics and the OWASP Top 10", "Testing a vulnerable lab app", "Writing findings", "Remediation"],
      },
      {
        title: "Monitoring and response",
        text: "Detect, respond and recover.",
        days: ["Logs and log sources", "SIEM concepts", "Detecting suspicious activity", "The incident response lifecycle", "Simulated incident drill", "Backups and recovery", "Security awareness"],
      },
      {
        title: "Mini project",
        text: "A scoped lab assessment or hardening project.",
        days: ["Scope and rules of engagement", "Lab environment build", "Assessment or hardening work", "Monitoring setup", "Findings and evidence", "Report writing", "Presentation", "Final evaluation and next learning plan"],
      },
    ],
    projects: [
      { title: "Hardened server baseline", text: "A checked configuration for a lab server." },
      { title: "Lab app assessment", text: "Findings and fixes for a deliberately vulnerable app." },
      { title: "Packet capture analysis", text: "Explain normal and suspicious lab traffic." },
      { title: "Log detection rules", text: "Spot a simulated attack in lab logs." },
      { title: "Incident report", text: "A write-up of a simulated incident." },
      { title: "Awareness kit", text: "Phishing and password guidance for a small office." },
    ],
    faqs: [
      { q: "Is all practice legal?", a: "Yes — every exercise happens in an authorised lab environment, with scope agreed in advance." },
      { q: "Is a certification exam included?", a: "Any external exam and its fee must be confirmed in writing; it is not assumed to be part of the programme." },
      { q: "Can a beginner start cyber security?", a: "Yes, because networking and Linux come first. The later phases build on them." },
    ],
  },

  "python-programming": {
    name: "Python Programming",
    heading: "Python Programming Training",
    tools: "Python fundamentals, OOP, files, APIs, Flask and a working project",
    contrast:
      "Consider a first-year B.Tech student who has never programmed, and a BCA student who knows C but not Python. Both write a working Python project, from different starting points.",
    prerequisite: "None. The programme starts from installation and your first line of code.",
    phases: [
      {
        title: "Basics",
        text: "Your first programs, step by step.",
        days: ["Programming careers and goals", "Python setup and editors", "Variables and data types", "Operators and expressions", "Input and output", "Conditions", "Loops", "Basics checkpoint"],
      },
      {
        title: "Data structures and functions",
        text: "Organise data and reuse code.",
        days: ["Strings", "Lists", "Tuples and sets", "Dictionaries", "Functions", "Arguments and return values", "Scope and lambdas", "Comprehensions"],
      },
      {
        title: "Files and errors",
        text: "Work with real files and handle failures.",
        days: ["Reading and writing files", "CSV and JSON", "Exceptions", "Debugging", "Modules and packages", "Virtual environments and pip"],
      },
      {
        title: "Object-oriented programming",
        text: "Model problems with classes.",
        days: ["Classes and objects", "Methods and attributes", "Inheritance", "Encapsulation", "Special methods", "Designing with classes", "OOP checkpoint"],
      },
      {
        title: "Practical Python",
        text: "Git, tests, APIs, databases and the web.",
        days: ["Git and GitHub", "Unit testing with pytest", "Working with APIs", "SQLite databases", "Automation scripts", "Excel automation", "Flask basics", "Web forms with Flask"],
      },
      {
        title: "Mini project",
        text: "A complete program, tested and documented.",
        days: ["Project scoping", "Design and structure", "Core features", "Data storage", "Testing", "Bug fixing", "Documentation and README", "Demo and next learning plan"],
      },
    ],
    projects: [
      { title: "Library management", text: "Classes, a database and a menu interface." },
      { title: "Expense tracker", text: "Store, summarise and export expenses." },
      { title: "Excel report automation", text: "Turn raw sheets into a formatted report." },
      { title: "Weather data collector", text: "Fetch, store and summarise public API data." },
      { title: "Quiz web app", text: "A small Flask site with scoring." },
      { title: "File organiser", text: "Sort a folder of files by type and date." },
    ],
    faqs: [
      { q: "Is Python good for complete beginners?", a: "Yes. It is one of the most readable languages, and the programme starts from the basics." },
      { q: "What can I learn after Python?", a: "Web development, data analytics, data science or AI — the counsellor can suggest a path based on your project." },
    ],
  },

  "web-designing": {
    name: "Web Designing",
    heading: "Web Designing Training",
    tools: "design principles, Figma, HTML, CSS, JavaScript basics and WordPress",
    contrast:
      "Consider a BCA student who can write HTML but has never designed a layout, and a BA student with a good eye but no code. Both publish a website, from different starting points.",
    prerequisite: "None. Design and code are both taught from the basics.",
    phases: [
      {
        title: "Design foundations",
        text: "Layout, colour, type and usability.",
        days: ["Web design careers and goals", "How websites work", "Design principles: hierarchy and spacing", "Colour and typography", "UX basics and user needs", "Wireframing", "Design critique"],
      },
      {
        title: "Figma",
        text: "Design and prototype before you code.",
        days: ["The Figma interface", "Frames and auto layout", "Components and styles", "Designing a landing page", "Mobile designs", "Prototyping", "Developer handoff"],
      },
      {
        title: "HTML",
        text: "Well-structured, accessible pages.",
        days: ["HTML structure", "Text, links and images", "Lists and tables", "Forms", "Semantic HTML", "Accessibility basics", "HTML checkpoint"],
      },
      {
        title: "CSS",
        text: "Responsive layouts that match your design.",
        days: ["Selectors and the box model", "Typography and colour in CSS", "Flexbox", "CSS grid", "Responsive design and media queries", "Mobile-first layouts", "Transitions and animations", "CSS frameworks overview", "Building the Figma design"],
      },
      {
        title: "Interactivity and WordPress",
        text: "Scripts for UI, and sites owners can edit.",
        days: ["JavaScript basics", "The DOM and events", "Menus, tabs and sliders", "Form validation", "WordPress setup", "Themes and page builders", "Plugins and SEO basics"],
      },
      {
        title: "Mini project",
        text: "Design, build and publish a site.",
        days: ["Project brief and research", "Wireframes and design", "Build: structure", "Build: styling", "Responsive testing", "Accessibility and performance", "Publishing", "Presentation and next learning plan"],
      },
    ],
    projects: [
      { title: "Local business website", text: "A responsive multi-page site." },
      { title: "Event landing page", text: "Designed in Figma, built in HTML and CSS." },
      { title: "WordPress site", text: "A themed site the owner can update." },
      { title: "Personal portfolio", text: "Your work, published online." },
      { title: "Restaurant menu site", text: "Mobile-first menu and contact page." },
      { title: "Redesign case study", text: "Before-and-after of an existing page." },
    ],
    faqs: [
      { q: "Do I need to be good at drawing?", a: "No. Web design relies on layout, spacing and tools like Figma, taught from the basics." },
      { q: "How is this different from MERN Full Stack?", a: "Web Designing focuses on design and front-end pages. MERN Full Stack adds servers, databases and full applications." },
    ],
  },

  "ethical-hacking": {
    name: "Ethical Hacking",
    heading: "Ethical Hacking Training",
    tools: "networking, Linux, reconnaissance, web app testing and reporting in authorised labs",
    contrast:
      "Consider a B.Tech CSE student who knows networks in theory but has never run a scan, and a BCA student new to Linux. Both complete an authorised lab assessment, from different starting points.",
    prerequisite: "Basic computer skills are enough to start; networking and Linux are taught first.",
    phases: [
      {
        title: "Ethics and foundations",
        text: "Authorisation, scope and a safe lab before any tool.",
        days: ["Ethical hacking careers and goals", "Ethics, law and authorisation", "Scope and rules of engagement", "Lab setup with virtual machines", "The Linux command line", "Linux permissions and services", "Bash basics"],
      },
      {
        title: "Networking",
        text: "How systems talk, and how to observe them.",
        days: ["TCP/IP and ports", "DNS and HTTP", "Packet capture with Wireshark", "Network services", "Firewalls and filtering", "Proxies and VPNs", "Networking checkpoint"],
      },
      {
        title: "Reconnaissance and scanning",
        text: "A repeatable assessment method.",
        days: ["Assessment methodology", "Passive reconnaissance", "Active reconnaissance in the lab", "Port scanning with Nmap", "Service enumeration", "Vulnerability scanning", "Interpreting scan results", "Reconnaissance checkpoint"],
      },
      {
        title: "Web application testing",
        text: "Common flaws, tested only in practice apps.",
        days: ["How web apps work", "Burp Suite basics", "OWASP Top 10 overview", "Injection flaws in a lab app", "Cross-site scripting in a lab app", "Authentication weaknesses", "Access control flaws", "File upload risks", "Secure coding fixes"],
      },
      {
        title: "Systems",
        text: "Weaknesses and how to fix them.",
        days: ["Password security and hashing", "Misconfigurations", "Privilege escalation concepts", "Wireless security basics", "Social engineering awareness", "Hardening and verification"],
      },
      {
        title: "Mini project",
        text: "A scoped assessment with a full report.",
        days: ["Scoping an authorised lab assessment", "Reconnaissance", "Testing", "Evidence collection", "Severity rating", "Report writing", "Presentation", "Final evaluation and next learning plan"],
      },
    ],
    projects: [
      { title: "Lab network assessment", text: "Discovery, findings and fixes." },
      { title: "Vulnerable app report", text: "Findings for a deliberately vulnerable app." },
      { title: "Hardening checklist", text: "A verified baseline for a lab machine." },
      { title: "Password policy review", text: "Weak practices and better controls." },
      { title: "Phishing awareness session", text: "A short training for a small team." },
      { title: "Secure coding fixes", text: "Before-and-after code for lab flaws." },
    ],
    faqs: [
      { q: "Is ethical hacking legal?", a: "Only with explicit permission and a defined scope. All practice here happens in authorised lab environments." },
      { q: "How is this different from Cyber Security?", a: "Cyber Security covers defence, monitoring and response broadly. Ethical Hacking focuses on assessing systems the way an attacker would — within strict authorisation." },
      { q: "Is a certification exam included?", a: "Any external exam and its fee must be confirmed in writing; it is not assumed to be part of the programme." },
    ],
  },

  "autocad-solidworks": {
    name: "AutoCAD & SolidWorks",
    heading: "AutoCAD & SolidWorks Training",
    tools: "2D drafting in AutoCAD, 3D modelling in SolidWorks and a complete drawing set",
    contrast:
      "Consider a B.Tech Mechanical student who has done engineering drawing on paper but never used CAD, and a diploma Civil student who has used AutoCAD but not 3D modelling. Both finish a drawing set, from different starting points.",
    prerequisite: "No CAD experience is needed. Familiarity with engineering drawing helps.",
    phases: [
      {
        title: "Drawing fundamentals",
        text: "Standards and views before software.",
        days: ["CAD careers and learning goals", "Engineering drawing standards", "Projections and views", "Scales and dimensions", "The AutoCAD interface", "Precision input and coordinates"],
      },
      {
        title: "AutoCAD 2D",
        text: "Accurate, well-organised drawings.",
        days: ["Lines, circles and arcs", "Editing commands", "Layers and properties", "Hatching", "Text and annotation", "Dimensioning", "Blocks and attributes", "Layouts and viewports", "Plotting to scale"],
      },
      {
        title: "AutoCAD practice",
        text: "Mechanical and civil drawing exercises.",
        days: ["Mechanical part drawing", "Floor plan basics", "Elevations and sections", "Isometric drawing", "Templates and standards", "AutoCAD checkpoint"],
      },
      {
        title: "SolidWorks parts",
        text: "Parametric 3D modelling.",
        days: ["The SolidWorks interface", "Sketching and relations", "Extrude and cut", "Revolve and sweep", "Fillets, chamfers and patterns", "Reference geometry", "Design intent and equations", "Materials and properties", "Part checkpoint"],
      },
      {
        title: "Assemblies and drawings",
        text: "Put parts together and document them.",
        days: ["Assembly basics", "Mates", "Interference checks", "Exploded views", "Detail drawings from models", "Bill of materials", "Sheet metal introduction"],
      },
      {
        title: "Mini project",
        text: "A complete drawing set for a product or building.",
        days: ["Project selection and scope", "Reference drawings", "Part modelling", "Assembly", "Drawing set", "Checking and corrections", "Documentation", "Presentation and next learning plan"],
      },
    ],
    projects: [
      { title: "Residential floor plan", text: "Plans, elevations and sections." },
      { title: "Machine component", text: "Fully dimensioned part drawings." },
      { title: "Product assembly", text: "Modelled assembly with an exploded view and BOM." },
      { title: "Bracket design", text: "A parametric part with design intent." },
      { title: "Sheet metal enclosure", text: "A bent part and its flat pattern." },
      { title: "Isometric practice set", text: "Isometric views of common components." },
    ],
    faqs: [
      { q: "Is this for civil or mechanical students?", a: "Both. AutoCAD is used in civil and architectural work; SolidWorks mainly in mechanical and product design. Your project can follow your branch." },
      { q: "Do I need my own software licence?", a: "Ask the centre about lab access and licences. Student and educational versions may be available." },
    ],
  },

  "basic-computer-office": {
    name: "Basic Computer & Office Skills",
    heading: "Basic Computer & Office Skills Training",
    tools: "Windows, typing, internet and email, Word, Excel and PowerPoint",
    contrast:
      "Consider a student who has only used a phone, and a job seeker who uses a computer but struggles with Excel. Both build everyday office confidence, from different starting points.",
    prerequisite: "None. The programme starts with switching on the computer and using the mouse and keyboard.",
    phases: [
      {
        title: "Computer basics",
        text: "Confident everyday use, and typing practice.",
        days: ["Course goals and computer careers", "Parts of a computer", "Windows desktop and settings", "Files and folders", "Keyboard and mouse skills", "Typing practice: home row", "Typing practice: speed"],
      },
      {
        title: "Internet and safety",
        text: "Browse, email and stay safe online.",
        days: ["Browsers and search", "Email basics", "Attachments and etiquette", "Online forms and documents", "Passwords and accounts", "Spotting scams and phishing", "Privacy settings"],
      },
      {
        title: "Microsoft Word",
        text: "Letters, reports and a resume.",
        days: ["The Word interface", "Formatting text", "Paragraphs and lists", "Tables", "Images and shapes", "Letters and applications", "A resume in Word", "Printing and PDFs"],
      },
      {
        title: "Microsoft Excel",
        text: "Data, formulas and charts.",
        days: ["The Excel interface", "Entering and formatting data", "Formulas", "Functions: SUM, AVERAGE and IF", "Sorting and filtering", "Tables", "Charts", "Printing sheets", "Budget sheet practice"],
      },
      {
        title: "PowerPoint and cloud tools",
        text: "Present clearly and work online.",
        days: ["PowerPoint basics", "Layouts and design", "Images and animations", "Presenting", "Google Drive", "Google Docs and Sheets", "Google Forms"],
      },
      {
        title: "Practical assessment",
        text: "Real office tasks, reviewed.",
        days: ["Typing test", "Word task", "Excel task", "PowerPoint task", "Email and internet task", "Review and practice", "Final assessment and next learning plan"],
      },
    ],
    projects: [
      { title: "Personal budget sheet", text: "Income, expenses and a chart." },
      { title: "Resume and cover letter", text: "Well-formatted documents in Word." },
      { title: "Short presentation", text: "A slideshow on a topic you choose." },
      { title: "Online survey", text: "A Google Form with collected responses." },
      { title: "Attendance register", text: "An Excel sheet with totals and filters." },
      { title: "Formal email", text: "A professional email with an attachment." },
    ],
    faqs: [
      { q: "I have never used a computer. Can I join?", a: "Yes. The programme starts from the very basics and moves at a steady pace with plenty of practice." },
      { q: "Will typing speed be tested?", a: "Typing is practised throughout, with a typing test in the final assessment." },
    ],
  },
};

// Every domain's plan must cover exactly 45 days.
for (const [slug, p] of Object.entries(plans)) {
  const days = p.phases.reduce((n, ph) => n + ph.days.length, 0);
  if (days !== 45) throw new Error(`45-day plan for ${slug} has ${days} days`);
}

export const training45 = (slug: string): Training45 | undefined => plans[slug];
