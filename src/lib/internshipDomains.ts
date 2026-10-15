// One page per internship domain and duration
// (/internship-training-in-lucknow/<duration>/<domain>), adapted for the Lucknow
// centre from the "6 Months AI & ML Internship" SEO content brief. The brief is
// an editorial draft: it asks for no promises about stipends, placements, fees,
// live client work or university acceptance, so none are made here. Its
// repeated paragraphs appear once; the other domains follow the same outline.
// The copy is written for six months; `domainPage` rewords it for each duration.
import { internshipHref, programmes, site } from "./site";

const city = site.city;

export type DomainItem = { title: string; text: string };

export type InternshipDomain = {
  slug: string;
  /** Short name, used in cards, breadcrumbs and mid-sentence. */
  label: string;
  /** Course pre-selected in the enquiry form. */
  course: string;
  meta: { title: string; description: string };
  /** H1, without the "6 Months" prefix or the city. */
  heading: string;
  hero: { text: string; points: string[] };
  overview: { title: string; text: string[] };
  audience: DomainItem[];
  why: { title: string; text: string; items: DomainItem[] };
  specialisations: { intro: string; items: DomainItem[] };
  /** What the six months cover, each with a checkpoint the student should pass. */
  topics: (DomainItem & { checkpoint: string })[];
  roadmap: DomainItem[];
  projects: { intro: string; items: DomainItem[] };
  careers: { roles: string[]; text: string };
  /** Questions to ask before enrolling. */
  checklist: string[];
  faqs: { q: string; a: string }[];
  /** Gallery photos shown on the page. */
  photos: string[];
};

// Students in every domain come from the same degrees; only the emphasis differs.
const audience = (focus: { btech: string; bca: string; bsc: string; final: string; first: string }): DomainItem[] => [
  { title: "B.Tech CSE, IT and AI/DS students", text: focus.btech },
  { title: "BCA and MCA students", text: focus.bca },
  { title: "B.Sc Computer Science and IT students", text: focus.bsc },
  { title: "Final-year and sixth-semester students", text: focus.final },
  { title: "First-time internship applicants", text: focus.first },
];

// Questions every domain page answers the same way.
const commonFaqs = (label: string) => [
  {
    q: `Is the ${label} internship a job or a paid internship?`,
    a: `It is a structured, project-based training programme run at the ${site.name} ${city} centre. Ask the centre in writing whether any part involves supervised organisational work or a stipend — do not assume either.`,
  },
  {
    q: "Will my college or university accept it?",
    a: `Only your department can confirm that. Students of AKTU-affiliated colleges, Lucknow University and other institutions should check the approved duration, report format and documents with their training and placement cell before paying any fee.`,
  },
  {
    q: "Does the programme guarantee a job?",
    a: "No. It helps you practise skills, complete a project and prepare a portfolio. Hiring depends on your skills, interview performance, market conditions and each employer's criteria.",
  },
  {
    q: "What is the fee, and what is included?",
    a: "Ask for the current written fee schedule. Confirm taxes, instalments, refund terms, lab access, software requirements and any separate assessment or certificate charges.",
  },
  {
    q: `How do I apply in ${city}?`,
    a: `Book a counselling call or visit the centre on Kursi Road, share your degree and semester, review the ${label} syllabus and confirm the batch before registering.`,
  },
];

const domainsList: InternshipDomain[] = [
  // ─── Artificial intelligence & machine learning (the brief itself) ───
  {
    slug: "artificial-intelligence",
    label: "Artificial Intelligence",
    course: "Artificial Intelligence",
    meta: {
      title: `6 Months AI & ML Internship in ${city} for Students | ${site.name}`,
      description: `Explore a 6 months AI and machine learning internship in ${city} for B.Tech, BCA, MCA and final-year students. View syllabus, projects, eligibility and admission guidance.`,
    },
    heading: "Artificial Intelligence & Machine Learning Internship",
    hero: {
      text: `Move from theory to practical AI work in ${city}: learn what you will build, which tools you will practise and how six months fits your university semester — before you decide.`,
      points: ["Python, statistics and data preparation", "Machine learning and deep learning", "NLP, computer vision and generative AI", "A capstone with report and viva preparation"],
    },
    overview: {
      title: "What is a six-month AI and ML internship?",
      text: [
        "A six-month AI and machine learning internship is a structured period of guided technical learning, practical assignments and project development. The exact experience depends on whether students work on supervised organisational tasks or attend a project-based training programme — ask which one you are joining.",
        `When students in ${city} search for a 6 months AI internship, the question behind the search is practical: what will happen during the six months, what will be expected of me, and what evidence of learning will remain at the end? This page answers that in language you can discuss with a parent, faculty coordinator or head of department.`,
      ],
    },
    audience: audience({
      btech: "Engineering students often need semester-aligned industrial training and a defensible final report. Each activity connects to a measurable project milestone — but confirm your university's format independently.",
      bca: "Computer applications students arrive with different levels of Python and database experience. A foundation path shows how software skills connect to model serving and AI applications.",
      bsc: "Students with statistics or computing backgrounds can turn theory into exploratory analysis, model comparison and clear technical writing. Project choice accounts for prior coursework.",
      final: "Time is tight around examinations, viva preparation and departmental submissions. Check the approved duration and reporting requirements before paying a fee.",
      first: "Beginners may not know how to evaluate an offer. Ask who your mentor is, what the actual work is, the attendance expectations, project scope and assessment process.",
    }),
    why: {
      title: "Why choose a six-month AI internship?",
      text: "Six months gives time to learn programming fundamentals, handle real datasets, evaluate models and present an end-to-end project. For final-semester students the value is a coherent learning record — not a certificate alone.",
      items: [
        { title: "Time for foundations", text: "Python, maths and data handling before large models, so later work makes sense." },
        { title: "Real datasets", text: "Messy, documented data instead of toy examples that always work." },
        { title: "End-to-end project", text: "From problem statement to evaluated, deployed demonstration." },
        { title: "A record you can defend", text: "Notebooks, repository, report and presentation your department and interviewers can check." },
      ],
    },
    specialisations: {
      intro: "Students can explore several AI specialisations. The choice should match your prerequisites, project feasibility and mentor availability.",
      items: [
        { title: "Machine learning", text: "Regression, classification, clustering and dimensionality reduction on tabular data." },
        { title: "Deep learning", text: "Neural networks, training loops, loss functions and regularisation." },
        { title: "Natural language processing", text: "Text classification, embeddings, semantic search and summarisation." },
        { title: "Computer vision", text: "Image classification and object detection with properly licensed data." },
        { title: "Generative AI", text: "Prompt design, retrieval-augmented generation and tool-using workflows with guardrails." },
        { title: "MLOps and responsible AI", text: "Versioning, APIs, monitoring, documentation, bias and privacy checks." },
      ],
    },
    topics: [
      { title: "Python and coding readiness", text: "Variables, loops, functions, files, exceptions, virtual environments and version control — before tackling large models.", checkpoint: "Write and version a small Python tool that reads, cleans and saves a file." },
      { title: "Mathematics and statistical thinking", text: "Probability, descriptive statistics, linear algebra intuition and sampling. Not memorising formulas, but knowing why a method fits and what it assumes.", checkpoint: "Explain the assumptions behind one model you use, in plain words." },
      { title: "Data collection and ethics", text: "Every dataset needs a documented source, usage rights and a privacy review. Synthetic or public data is disclosed clearly.", checkpoint: "Produce a datasheet listing the source, licence and limits of your data." },
      { title: "Data cleaning and exploratory analysis", text: "Missing values, duplicates, outliers, leakage and skewed categories can distort results. A reproducible notebook shows what changed and why.", checkpoint: "Hand in a notebook another student can rerun and get the same result." },
      { title: "Machine learning foundations", text: "Choose a baseline and compare models on suitable validation data instead of picking an algorithm by popularity.", checkpoint: "Beat a simple baseline and show the comparison on held-out data." },
      { title: "Model evaluation and reproducibility", text: "Accuracy can mislead on imbalanced classes. Precision, recall, F1, ROC-AUC, MAE or RMSE are chosen for the task, with settings and seeds recorded.", checkpoint: "Justify your metric and log every experiment's settings." },
      { title: "Deep learning basics", text: "Training loops, loss functions, overfitting, regularisation and computational trade-offs — starting with a small, explainable prototype.", checkpoint: "Train a small network and explain its learning curves." },
      { title: "NLP, computer vision and generative AI", text: "Language and image projects, plus prompt design and retrieval. Outputs are evaluated for factual errors, bias, privacy risk and robustness.", checkpoint: "Document at least three failure cases of your model and why they happen." },
      { title: "MLOps and deployment", text: "Version control, experiment tracking, APIs, monitoring and model documentation. A simple deployed demo beats an ambitious model nobody can reproduce.", checkpoint: "Serve your model behind an API with a short README and model card." },
      { title: "Portfolio and interview communication", text: "Explain the problem, method, results, limitations and your personal contribution through a readable repository and a short demo.", checkpoint: "Give a five-minute demo and answer questions on your choices." },
    ],
    roadmap: [
      { title: "Python, Git, maths and data exploration", text: "Coding foundations, version control, statistics refresher and your first exploratory notebook." },
      { title: "Data preparation, regression and classification", text: "Cleaning pipelines, supervised models and choosing the right evaluation metric." },
      { title: "Clustering, features and experiments", text: "Unsupervised learning, feature engineering and documented comparative experiments." },
      { title: "Neural networks, NLP and vision", text: "Deep learning basics with introductory language and image projects." },
      { title: "Generative AI, APIs and deployment", text: "Generative AI prototypes, model serving, testing and monitoring basics." },
      { title: "Capstone, report and viva", text: "Capstone completion, technical report, demonstration and viva preparation." },
    ],
    projects: {
      intro: "Strong projects start with a specific problem, explain where the data came from, set a baseline, document metrics and discuss limitations — and are feasible within six months.",
      items: [
        { title: "Predictive model on tabular data", text: "A cleaned public dataset, a baseline, two compared models and an honest evaluation." },
        { title: "Text classifier or semantic search", text: "Embeddings over a documented text collection, with failure cases reported." },
        { title: "Image classification", text: "A licensed image set, data augmentation and analysis of lighting or class-imbalance errors." },
        { title: "Retrieval-augmented assistant", text: "A guarded prototype that answers from your documents, with human review of its answers." },
      ],
    },
    careers: {
      roles: ["Data analyst", "Junior Python developer", "ML project trainee", "AI application developer", "Data operations associate"],
      text: "Students may explore these entry-level roles depending on skills and hiring criteria. Completing a programme does not guarantee placement.",
    },
    checklist: [
      "What will I actually learn in the six months — can I see the written syllabus?",
      "Is the programme suitable for a B.Tech CSE sixth-semester student?",
      "Can a BCA student join without advanced mathematics?",
      "How is an AI internship different from a Python course?",
      "Will the project be individual or done in a team?",
      "Does it involve live client work or guided simulations?",
      "Are NLP, computer vision and generative AI included?",
      "How will mentors review my code and results?",
      "Can I build a GitHub portfolio during the six months?",
      "Is there an entrance test or a Python prerequisite?",
    ],
    faqs: [
      { q: "Can a complete beginner join the AI & ML internship?", a: "Yes, with a foundation path in Python and maths first. It is not an advanced research track, and progress depends on regular practice." },
      { q: "Do I need strong mathematics?", a: "You need basic probability, statistics and linear algebra intuition, which are covered early. Advanced maths is not required to start." },
      { q: "Will I learn machine learning and deep learning together?", a: "Machine learning comes first, then neural networks, NLP and vision, so deep learning builds on solid foundations. The shorter tracks concentrate on the machine learning foundations." },
      { q: "What should go into my AI internship project report?", a: "The problem, data source and licence, baseline, methods, metrics, results, limitations and your personal contribution — in your university's required format." },
      ...commonFaqs("AI & ML"),
    ],
    photos: ["ai-course-presentation", "langchain-seminar", "robot-dog-student", "data-session"],
  },

  // ─── Data science & analytics ───
  {
    slug: "data-analytics",
    label: "Data Analytics",
    course: "Data Analytics",
    meta: {
      title: `6 Months Data Analytics Internship in ${city} | ${site.name}`,
      description: `A 6 months data analytics internship in ${city} for B.Tech, BCA, MCA and B.Sc students: Excel, SQL, Python, Power BI, dashboards and a documented capstone.`,
    },
    heading: "Data Analytics Internship",
    hero: {
      text: `Learn to answer real business questions with data in ${city}: spreadsheets, SQL, Python and dashboards, ending in an analysis you can present and defend.`,
      points: ["Excel and SQL for analysis", "Python with pandas for cleaning", "Power BI dashboards and storytelling", "A capstone analysis and report"],
    },
    overview: {
      title: "What is a six-month data analytics internship?",
      text: [
        "A six-month data analytics internship is guided, project-based practice in turning raw data into decisions: collecting, cleaning, querying, visualising and explaining it. Ask whether your programme is lab-based training or involves supervised organisational work — the labels are used differently.",
        `Students in ${city} usually want to know which tools they will use, what a finished analysis looks like, and whether the work fits their semester. The answers below are specific enough to discuss with your faculty coordinator.`,
      ],
    },
    audience: audience({
      btech: "Engineering students gain SQL, Python and statistics practice that fits industrial-training reports, with milestones you can document.",
      bca: "BCA and MCA students can build on database coursework, moving from queries to dashboards and analysis reports.",
      bsc: "Statistics and computing students can turn theory into exploratory analysis, clear charts and written findings.",
      final: "Plan the batch around exams and submission deadlines, and confirm the approved duration with your department first.",
      first: "Analytics is an accessible starting point. Ask about mentor support, weekly workload and how your work is assessed.",
    }),
    why: {
      title: "Why choose six months of data analytics?",
      text: "Six months is long enough to move from spreadsheets to SQL and Python, and to complete one analysis end to end — question, data, cleaning, findings and presentation.",
      items: [
        { title: "Business questions first", text: "Every exercise starts from a question someone actually needs answered." },
        { title: "Tools used at work", text: "Excel, SQL, Python and Power BI practised on realistic data." },
        { title: "Honest visualisation", text: "Charts that inform rather than mislead, with limitations stated." },
        { title: "A portfolio analysis", text: "A documented project you can walk an interviewer through." },
      ],
    },
    specialisations: {
      intro: "Within data, students can lean towards analysis, engineering or modelling, depending on their background and interests.",
      items: [
        { title: "Business analytics", text: "KPIs, Excel modelling and reporting for decisions." },
        { title: "SQL and databases", text: "Joins, aggregations, window functions and query performance." },
        { title: "Python for data", text: "pandas, NumPy and reproducible notebooks." },
        { title: "Dashboards and BI", text: "Power BI data models, DAX basics and interactive reports." },
        { title: "Statistics", text: "Sampling, hypothesis tests and confidence intervals in practice." },
        { title: "Intro to predictive analytics", text: "Simple forecasting and regression for business data." },
      ],
    },
    topics: [
      { title: "Spreadsheet analysis", text: "Cleaning, lookups, pivot tables and charts in Excel — the tool most teams still start with.", checkpoint: "Build a pivot-based summary that answers a stated question." },
      { title: "SQL foundations", text: "SELECT, joins, grouping and subqueries over a relational database.", checkpoint: "Write queries that reproduce a report's numbers exactly." },
      { title: "Data cleaning in Python", text: "Missing values, duplicates, inconsistent formats and outliers handled in a reproducible pandas notebook.", checkpoint: "Document every cleaning step and its effect on row counts." },
      { title: "Exploratory analysis", text: "Distributions, relationships and segments explored before drawing conclusions.", checkpoint: "List three findings with the evidence for each." },
      { title: "Statistics for decisions", text: "Averages vs medians, sampling, significance and the difference between correlation and causation.", checkpoint: "Explain whether a difference you found is meaningful." },
      { title: "Dashboards and storytelling", text: "Power BI reports with clear layout, filters and honest scales.", checkpoint: "Present a dashboard and answer questions from it live." },
      { title: "Data ethics and privacy", text: "Documented sources, usage rights and no sensitive personal data without authorisation.", checkpoint: "Record the source and licence of every dataset you use." },
      { title: "Portfolio and communication", text: "A written summary, a clean repository and a short presentation of method and findings.", checkpoint: "Give a five-minute walkthrough of your final project." },
    ],
    roadmap: [
      { title: "Excel and data thinking", text: "Spreadsheet analysis, pivot tables and framing business questions." },
      { title: "SQL and databases", text: "Relational models, queries, joins and aggregations." },
      { title: "Python and pandas", text: "Cleaning, transforming and exploring data in notebooks." },
      { title: "Statistics and visualisation", text: "Applied statistics and honest charts." },
      { title: "Power BI dashboards", text: "Data models, measures and interactive reports." },
      { title: "Capstone and presentation", text: "End-to-end analysis, report, dashboard and viva preparation." },
    ],
    projects: {
      intro: "Good analytics projects start with a clear question, use documented data and end with findings someone could act on.",
      items: [
        { title: "Sales performance dashboard", text: "A Power BI report with KPIs, trends and drill-downs." },
        { title: "Customer segmentation", text: "Grouping customers by behaviour and describing each segment." },
        { title: "SQL reporting suite", text: "A set of queries that produce a monthly business report." },
        { title: "Public data investigation", text: "An analysis of an open government or civic dataset with written findings." },
      ],
    },
    careers: {
      roles: ["Data analyst trainee", "MIS executive", "Business analyst trainee", "Reporting analyst", "Junior data associate"],
      text: "Entry-level options depend on your skills, portfolio and each employer's criteria. Completing the programme does not guarantee placement.",
    },
    checklist: [
      "Which tools are covered — Excel, SQL, Python, Power BI?",
      "Will I work on real or realistic datasets?",
      "Is the capstone individual or team-based?",
      "How are dashboards and reports reviewed?",
      "Can a non-programmer start here?",
      "Can the schedule fit my semester and exams?",
      "What documents will I receive at the end?",
    ],
    faqs: [
      { q: "Is data analytics good for beginners?", a: "Yes. It starts with spreadsheets and SQL before Python, which makes it one of the more accessible domains." },
      { q: "What is the difference between data science and data analytics here?", a: "Analytics focuses on answering business questions with queries, statistics and dashboards; data science adds predictive modelling. This track is analytics-first with an introduction to prediction; the Data Science domain goes further into modelling." },
      { q: "Do I need to know Python before joining?", a: "No. Python is introduced after Excel and SQL." },
      ...commonFaqs("data analytics"),
    ],
    photos: ["data-session", "lab-coding-class", "team-room", "students-coding"],
  },

  // ─── Full-stack web development ───
  {
    slug: "mern-full-stack",
    label: "MERN Full Stack",
    course: "MERN Full Stack",
    meta: {
      title: `6 Months MERN Full Stack Internship in ${city} | ${site.name}`,
      description: `A 6 months full stack web development internship in ${city} for B.Tech, BCA and MCA students: HTML, CSS, JavaScript, React, Node.js, databases, APIs, testing and deployment.`,
    },
    heading: "MERN Full Stack Web Development Internship",
    hero: {
      text: `Build and deploy a real web application in ${city}: front end, back end, database and deployment, developed feature by feature with reviews along the way.`,
      points: ["HTML, CSS and JavaScript", "React front ends", "Node.js APIs and databases", "Testing, Git and deployment"],
    },
    overview: {
      title: "What is a six-month full-stack internship?",
      text: [
        "A six-month full-stack internship is structured, project-based practice in building web applications: interfaces, server logic, data storage and deployment. Confirm whether the programme is lab-based training or supervised organisational work before you enrol.",
        `${city} students usually ask what they will actually ship. The answer here is one application, built incrementally, documented and deployed — plus the smaller exercises that lead up to it.`,
      ],
    },
    audience: audience({
      btech: "CSE and IT students can apply programming and DBMS coursework to a deployed project suitable for an industrial-training report.",
      bca: "BCA and MCA students get a direct path from web technologies coursework to a portfolio application.",
      bsc: "B.Sc students can turn programming fundamentals into a complete, demonstrable web project.",
      final: "A six-month build fits a final semester if the batch timing works around exams and submissions — confirm both first.",
      first: "Web development is a common first domain. Ask how code is reviewed and what happens if you fall behind.",
    }),
    why: {
      title: "Why six months of full-stack development?",
      text: "Web apps have many moving parts. Six months allows each layer — front end, API, database, deployment — to be learnt properly and then joined into one product.",
      items: [
        { title: "Build incrementally", text: "Features added one at a time, each reviewed and working." },
        { title: "Professional habits", text: "Git branches, pull requests, testing and README files." },
        { title: "Deployed, not local", text: "Your app runs on the internet, not only on your laptop." },
        { title: "Explainable code", text: "You can walk an interviewer through every layer." },
      ],
    },
    specialisations: {
      intro: "Students build across the stack, then can lean towards the layer that suits them.",
      items: [
        { title: "Front-end development", text: "Semantic HTML, responsive CSS, accessibility and React." },
        { title: "Back-end development", text: "Node.js, Express, REST APIs and authentication basics." },
        { title: "Databases", text: "SQL and MongoDB schema design and queries." },
        { title: "Python web", text: "Django or Flask as an alternative back end." },
        { title: "Testing and quality", text: "Unit and integration tests, linting and code review." },
        { title: "Deployment", text: "Hosting, environment variables, domains and basic CI." },
      ],
    },
    topics: [
      { title: "HTML, CSS and responsive design", text: "Semantic markup, layout with flexbox and grid, and accessibility from the start.", checkpoint: "Build a responsive page that works on a phone and passes basic accessibility checks." },
      { title: "JavaScript fundamentals", text: "Functions, arrays, objects, async code and the DOM.", checkpoint: "Build an interactive feature that fetches and displays data." },
      { title: "Git and collaboration", text: "Commits, branches, pull requests and resolving conflicts.", checkpoint: "Merge a reviewed pull request into a shared repository." },
      { title: "React front ends", text: "Components, state, routing and forms.", checkpoint: "Ship a multi-page React interface with validated forms." },
      { title: "APIs with Node.js", text: "REST endpoints, validation, error handling and authentication basics.", checkpoint: "Document and test an API that your front end uses." },
      { title: "Databases", text: "Schema design, relations, queries and avoiding common data mistakes.", checkpoint: "Explain why your schema fits your app's data." },
      { title: "Testing and security basics", text: "Tests for key logic, input validation and safe handling of passwords and secrets.", checkpoint: "Show passing tests and a short security checklist." },
      { title: "Deployment and documentation", text: "Hosting, environment configuration and a README someone else can follow.", checkpoint: "Deploy your app and have another student run it from your README." },
    ],
    roadmap: [
      { title: "Web foundations", text: "HTML, CSS, responsive layout, Git and developer tools." },
      { title: "JavaScript", text: "Core language, DOM, async code and small interactive projects." },
      { title: "React", text: "Components, state, routing and forms." },
      { title: "Back end and databases", text: "Node.js, Express, REST APIs, SQL and MongoDB." },
      { title: "Full-stack integration", text: "Authentication, testing, security basics and code reviews." },
      { title: "Capstone and deployment", text: "Complete, deploy and document your app; report and viva preparation." },
    ],
    projects: {
      intro: "Projects are built incrementally and documented, so each one shows how you work as well as what you built.",
      items: [
        { title: "Student portal", text: "Login, profiles and course listings with role-based access." },
        { title: "E-commerce storefront", text: "Product catalogue, cart and order flow with an admin panel." },
        { title: "Task and team tracker", text: "Boards, assignments and notifications backed by an API." },
        { title: "Booking system", text: "Slots, confirmations and email notifications." },
      ],
    },
    careers: {
      roles: ["Junior web developer", "Front-end developer trainee", "Back-end developer trainee", "Software trainee", "QA trainee"],
      text: "Entry-level options depend on your skills, portfolio and each employer's criteria. Completing the programme does not guarantee placement.",
    },
    checklist: [
      "Which stack is taught — MERN, Python or both?",
      "Will my app be deployed live?",
      "How often is my code reviewed?",
      "Is the capstone individual or team-based?",
      "Can I join without prior coding?",
      "What documents will I receive at the end?",
    ],
    faqs: [
      { q: "Do I need coding experience to start?", a: "No. The programme starts with HTML, CSS and JavaScript from the basics." },
      { q: "Which stack will I learn?", a: "Primarily JavaScript with React and Node.js, with SQL and MongoDB. A Python back end can be discussed with your counsellor." },
      { q: "Will my project be live on the internet?", a: "Yes, deployment is part of the final project, along with a README and a short demo." },
      ...commonFaqs("full-stack"),
    ],
    photos: ["design-lab-mentor-2", "aero-lab-coding", "lab-passion-wall", "laptop-workshop"],
  },

  // ─── Cyber security ───
  {
    slug: "cyber-security",
    label: "Cyber Security",
    course: "Cyber Security",
    meta: {
      title: `6 Months Cyber Security Internship in ${city} | ${site.name}`,
      description: `A 6 months cyber security internship in ${city} for B.Tech, BCA and MCA students: networking, Linux, security fundamentals, logging, authorised lab exercises and a documented capstone.`,
    },
    heading: "Cyber Security Internship",
    hero: {
      text: `Build security skills the responsible way in ${city}: networking, Linux, defensive monitoring and authorised lab exercises, documented as you go.`,
      points: ["Networking and Linux foundations", "Security concepts and hygiene", "Logging, monitoring and response", "Authorised labs and a written report"],
    },
    overview: {
      title: "What is a six-month cyber security internship?",
      text: [
        "A six-month cyber security internship is structured practice in protecting systems: understanding networks and operating systems, finding weaknesses in permitted lab environments, and detecting and responding to incidents. All exercises use authorised environments only.",
        `Students in ${city} often ask whether security is for beginners. It is — if the first months cover networking and Linux properly. Ask to see the lab rules and the syllabus before enrolling.`,
      ],
    },
    audience: audience({
      btech: "CSE and IT students can apply networking and OS coursework to hands-on labs and an incident or assessment report.",
      bca: "BCA and MCA students can extend networking and system administration basics into security practice.",
      bsc: "B.Sc students build from computing fundamentals to structured lab work and clear written findings.",
      final: "Confirm the approved duration and report format, and plan lab time around exams.",
      first: "Security needs patience with fundamentals. Ask about mentor support and how lab work is assessed.",
    }),
    why: {
      title: "Why six months of cyber security?",
      text: "Security depends on understanding how systems normally work. Six months allows networking and Linux to come first, followed by defensive and offensive concepts practised safely.",
      items: [
        { title: "Fundamentals first", text: "Networks and operating systems before tools." },
        { title: "Authorised labs only", text: "Every exercise happens in a permitted environment." },
        { title: "Defence and detection", text: "Logs, alerts and response, not just attacks." },
        { title: "Written evidence", text: "Reports and checklists that show your reasoning." },
      ],
    },
    specialisations: {
      intro: "Students cover the core of security, then can lean towards the area that suits them.",
      items: [
        { title: "Network security", text: "Protocols, firewalls, segmentation and traffic analysis." },
        { title: "System hardening", text: "Linux and Windows configuration, users and permissions." },
        { title: "Security operations", text: "Logging, SIEM concepts, alerts and incident response." },
        { title: "Web application security", text: "Common vulnerabilities and secure coding, tested in labs." },
        { title: "Vulnerability assessment", text: "Scanning and reporting in authorised environments." },
        { title: "Governance and awareness", text: "Policies, risk and security hygiene for organisations." },
      ],
    },
    topics: [
      { title: "Networking fundamentals", text: "TCP/IP, DNS, HTTP, ports and how traffic moves.", checkpoint: "Explain a captured network exchange step by step." },
      { title: "Linux for security", text: "Command line, users, permissions, services and logs.", checkpoint: "Harden a lab Linux machine and list what you changed." },
      { title: "Security concepts", text: "Confidentiality, integrity, availability, threats, vulnerabilities and risk.", checkpoint: "Write a short threat model for a simple application." },
      { title: "Ethics and the law", text: "Authorisation, scope and responsible disclosure come before any tool.", checkpoint: "Draft a scope and rules-of-engagement document for a lab exercise." },
      { title: "Web application security", text: "Common vulnerability classes and how secure coding prevents them, tested only in lab apps.", checkpoint: "Find and explain a vulnerability in a deliberately vulnerable lab app." },
      { title: "Logging and monitoring", text: "Collecting logs, spotting anomalies and writing simple detection rules.", checkpoint: "Detect a simulated attack in lab logs and describe it." },
      { title: "Incident response", text: "Triage, containment, recovery and lessons learned.", checkpoint: "Write an incident report for a simulated event." },
      { title: "Reporting and communication", text: "Clear findings with severity, evidence and recommendations.", checkpoint: "Present your assessment report to a non-technical reader." },
    ],
    roadmap: [
      { title: "Networking and Linux", text: "TCP/IP, routing, DNS, Linux command line and permissions." },
      { title: "Security foundations", text: "Core concepts, threats, ethics, scope and lab rules." },
      { title: "System and network hardening", text: "Configuration, firewalls and secure services." },
      { title: "Web and application security", text: "Vulnerability classes and secure coding in lab apps." },
      { title: "Monitoring and response", text: "Logs, detection, alerts and incident handling." },
      { title: "Capstone and report", text: "An authorised assessment or defensive project with a full report and viva preparation." },
    ],
    projects: {
      intro: "Security projects are judged by their reasoning and documentation, and every one stays within an authorised lab.",
      items: [
        { title: "Hardened server baseline", text: "A documented, checked configuration for a lab server." },
        { title: "Vulnerability assessment report", text: "Findings, severity and fixes for a deliberately vulnerable lab app." },
        { title: "Log monitoring setup", text: "Collected logs and detection rules for simulated attacks." },
        { title: "Security awareness kit", text: "Policies and a checklist for a small organisation." },
      ],
    },
    careers: {
      roles: ["Security operations trainee", "IT support", "Network support trainee", "Junior security analyst", "System administration trainee"],
      text: "Entry-level options depend on your skills, any certifications and each employer's criteria. Completing the programme does not guarantee placement.",
    },
    checklist: [
      "Are all labs run in authorised environments?",
      "How much networking and Linux is covered first?",
      "Does the programme cover defence and monitoring, not just attacks?",
      "What does the final report look like?",
      "Is any external certification exam included, and at what cost?",
      "What documents will I receive at the end?",
    ],
    faqs: [
      { q: "Can a beginner start cyber security?", a: "Yes, if networking and Linux come first, as they do here. Advanced topics assume those foundations." },
      { q: "Will I learn ethical hacking?", a: "You will practise assessment techniques only in permitted lab environments, alongside defence, monitoring and reporting." },
      { q: "Is a certification exam included?", a: "Ask the centre. Any external exam and its fee should be confirmed in writing; it is not assumed to be part of the programme." },
      ...commonFaqs("cyber security"),
    ],
    photos: ["trainer-lab", "lab-hands-on", "students-coding", "lecture-room"],
  },

  // ─── Cloud & DevOps ───
  {
    slug: "cloud-computing",
    label: "Cloud Computing",
    course: "Cloud Computing",
    meta: {
      title: `6 Months Cloud Computing & DevOps Internship in ${city} | ${site.name}`,
      description: `A 6 months cloud and DevOps internship in ${city} for B.Tech, BCA and MCA students: Linux, Git, networking, AWS, IAM, Docker, CI/CD, monitoring and cost awareness.`,
    },
    heading: "Cloud Computing & DevOps Internship",
    hero: {
      text: `Learn how modern software is built, shipped and run in ${city}: Linux, cloud services, containers and CI/CD, ending in a deployed and monitored project.`,
      points: ["Linux, Git and networking", "Cloud services and IAM", "Docker and CI/CD pipelines", "Monitoring and cost awareness"],
    },
    overview: {
      title: "What is a six-month cloud and DevOps internship?",
      text: [
        "A six-month cloud and DevOps internship is structured, project-based practice in deploying and operating software: servers, cloud services, containers, automation and monitoring. Confirm whether it is lab-based training or supervised organisational work.",
        `${city} students usually ask which cloud they will use and whether they need their own account. Ask the centre about lab access, any cloud costs and the free-tier limits before you start.`,
      ],
    },
    audience: audience({
      btech: "CSE and IT students can apply OS and networking coursework to a deployed, automated project for their training report.",
      bca: "BCA and MCA students can move from programming into how applications are hosted and operated.",
      bsc: "B.Sc students build systems skills step by step, from Linux to cloud deployment.",
      final: "Confirm the approved duration and plan lab time around exams and submissions.",
      first: "Ask about prerequisites — basic programming and comfort with the command line help a lot.",
    }),
    why: {
      title: "Why six months of cloud and DevOps?",
      text: "DevOps connects many tools. Six months allows Linux and networking to come first, then cloud, containers and automation — joined into one pipeline you understand end to end.",
      items: [
        { title: "Systems foundations", text: "Linux and networking before managed services." },
        { title: "Automation habits", text: "Infrastructure and deployments that are repeatable, not manual." },
        { title: "Security by default", text: "IAM, least privilege and secrets handled properly." },
        { title: "Cost awareness", text: "Understanding what cloud resources cost and cleaning them up." },
      ],
    },
    specialisations: {
      intro: "Students cover the core pipeline, then can lean towards cloud or DevOps tooling.",
      items: [
        { title: "Linux administration", text: "Shell, services, processes, packages and scripting." },
        { title: "Cloud fundamentals", text: "Compute, storage, networking and service models on AWS." },
        { title: "Identity and access", text: "IAM users, roles and least-privilege policies." },
        { title: "Containers", text: "Docker images, registries and an introduction to Kubernetes." },
        { title: "CI/CD", text: "Automated build, test and deploy pipelines." },
        { title: "Monitoring and IaC", text: "Logs, metrics, alerts and Terraform basics." },
      ],
    },
    topics: [
      { title: "Linux and shell scripting", text: "Files, permissions, services, processes and Bash automation.", checkpoint: "Automate a routine server task with a documented script." },
      { title: "Git and version control", text: "Branches, pull requests and repository hygiene.", checkpoint: "Run all your configuration from a versioned repository." },
      { title: "Networking for the cloud", text: "IP addressing, subnets, DNS, load balancing and firewalls.", checkpoint: "Draw and explain the network diagram of your deployment." },
      { title: "Cloud service models", text: "IaaS, PaaS and SaaS, and the core AWS services.", checkpoint: "Host an application on a cloud server and explain the choices." },
      { title: "IAM and security", text: "Users, roles, least privilege and handling secrets safely.", checkpoint: "Show an IAM policy that grants only what your app needs." },
      { title: "Containers with Docker", text: "Images, containers, volumes and multi-service setups.", checkpoint: "Containerise an app so it runs identically anywhere." },
      { title: "CI/CD pipelines", text: "Automated build, test and deploy on every change.", checkpoint: "Push a change and watch your pipeline deploy it." },
      { title: "Monitoring and cost", text: "Logs, metrics, alerts and tracking cloud spend.", checkpoint: "Set an alert and a budget, and clean up unused resources." },
    ],
    roadmap: [
      { title: "Linux, Git and networking", text: "Command line, scripting, version control and network basics." },
      { title: "Cloud fundamentals", text: "Core AWS services, service models and IAM." },
      { title: "Deploying applications", text: "Servers, storage, databases and load balancing." },
      { title: "Containers", text: "Docker and an introduction to Kubernetes." },
      { title: "CI/CD and infrastructure as code", text: "Pipelines, Terraform basics and environment management." },
      { title: "Capstone and report", text: "A deployed, automated and monitored project with report and viva preparation." },
    ],
    projects: {
      intro: "Projects show a working deployment and the reasoning behind it, documented with diagrams and a README.",
      items: [
        { title: "Automated web deployment", text: "An app deployed to the cloud through a CI/CD pipeline." },
        { title: "Containerised microservices", text: "Two or three services running together with Docker." },
        { title: "Infrastructure as code", text: "A small environment created and destroyed with Terraform." },
        { title: "Monitoring dashboard", text: "Logs, metrics and alerts for a running service." },
      ],
    },
    careers: {
      roles: ["Cloud support trainee", "DevOps trainee", "System administration trainee", "IT support", "Junior site reliability associate"],
      text: "Entry-level options depend on your skills, any certifications and each employer's criteria. Completing the programme does not guarantee placement.",
    },
    checklist: [
      "Which cloud platform is used, and who pays for the account?",
      "How much Linux and networking is covered first?",
      "Will my project be deployed and automated end to end?",
      "Is any cloud certification exam included, and at what cost?",
      "Can I join without prior coding?",
      "What documents will I receive at the end?",
    ],
    faqs: [
      { q: "Do I need a cloud account or credit card?", a: "Ask the centre how lab access works and whether any cloud costs fall on you. Always confirm free-tier limits before creating resources." },
      { q: "Is coding required for DevOps?", a: "Basic scripting is taught, but some programming background helps. Ask your counsellor if you are starting from zero." },
      { q: "Is a cloud certification included?", a: "Any external certification exam and its fee should be confirmed in writing; it is not assumed to be part of the programme." },
      ...commonFaqs("cloud & DevOps"),
    ],
    photos: ["aero-lab-mentors", "lab-wide", "lab-practice", "lab-classroom"],
  },
];

// ─── The other courses on the Internship & Training list ───
// Written to the same outline as the domains above; the parts that read the
// same for every domain (meta, overview close, checklist, common FAQs) are
// filled in by `define`.

type Spec = {
  slug: string;
  label: string;
  course: string;
  heading: string;
  summary: string;
  points: string[];
  intro: string;
  audience?: DomainItem[];
  why: { text: string; items: DomainItem[] };
  specialisations: DomainItem[];
  topics: InternshipDomain["topics"];
  roadmap: DomainItem[];
  projects: DomainItem[];
  roles: string[];
  faqs: { q: string; a: string }[];
  photos: string[];
};

const define = (s: Spec): InternshipDomain => ({
  slug: s.slug,
  label: s.label,
  course: s.course,
  meta: {
    title: `6 Months ${s.label} Internship in ${city} | ${site.name}`,
    description: `A 6 months ${s.label} internship in ${city} for students and graduates: ${s.points
      .slice(0, 3)
      .join(", ")
      .toLowerCase()} and a documented project.`,
  },
  heading: s.heading,
  hero: { text: s.summary, points: s.points },
  overview: {
    title: `What is a six-month ${s.label} internship?`,
    text: [
      s.intro,
      `Students in ${city} usually want to know what they will practise, what they will have built by the end and whether the schedule fits their semester. Ask to see the current ${s.label} syllabus, and confirm whether the programme is lab-based training or supervised organisational work.`,
    ],
  },
  audience:
    s.audience ??
    audience({
      btech: `Engineering students can apply their coursework to ${s.label} lab work and a project suited to an industrial-training report — confirm your university's format independently.`,
      bca: `BCA and MCA students can build on programming and computer applications coursework towards a demonstrable ${s.label} project.`,
      bsc: `B.Sc students can turn computing fundamentals into structured ${s.label} practice and a clearly documented project.`,
      final: "Time is tight around examinations and submissions. Check the approved duration and report format before paying a fee.",
      first: `Ask who your mentor is, what the weekly workload looks like and how your ${s.label} work will be assessed.`,
    }),
  why: { title: `Why choose six months of ${s.label}?`, ...s.why },
  specialisations: {
    intro: `Within ${s.label}, students can lean towards the area that suits their background and interests.`,
    items: s.specialisations,
  },
  topics: s.topics,
  roadmap: s.roadmap,
  projects: {
    intro: `Good ${s.label} projects start with a clear goal, are built step by step and are documented so a trainer or interviewer can review them.`,
    items: s.projects,
  },
  careers: {
    roles: s.roles,
    text: "Entry-level options depend on your skills, portfolio and each employer's criteria. Completing the programme does not guarantee placement.",
  },
  checklist: [
    `Can I see the written ${s.label} syllabus for my batch?`,
    "Which tools and software versions are used, and do I need my own laptop?",
    "Is the final project individual or team-based?",
    "How often is my work reviewed by a mentor?",
    "Can I join without prior experience?",
    "Can the schedule fit my semester and exams?",
    "What documents will I receive at the end?",
  ],
  faqs: [...s.faqs, ...commonFaqs(s.label)],
  photos: s.photos,
});

const moreDomains: InternshipDomain[] = [
  define({
    slug: "flutter-app-development",
    label: "Flutter App Development",
    course: "Flutter",
    heading: "Flutter App Development Internship",
    summary: `Build cross-platform mobile apps in ${city}: Dart, Flutter widgets, state management, APIs and Firebase, ending in an app you can install and demo.`,
    points: ["Dart and Flutter widgets", "State management and navigation", "APIs, Firebase and local storage", "A finished app with demo and report"],
    intro:
      "A six-month Flutter internship is guided, project-based practice in building Android and iOS apps from one codebase: designing screens, managing state, talking to APIs and preparing an app for release.",
    why: {
      text: "Mobile apps combine design, logic and data. Six months allows Dart and widgets to come first, then state, networking and storage — joined into one app you can put on a phone.",
      items: [
        { title: "One codebase, two platforms", text: "The same Flutter code runs on Android and iOS." },
        { title: "Screens you can touch", text: "Every week ends with something running on a device or emulator." },
        { title: "Real data", text: "Apps that talk to APIs and Firebase, not just static screens." },
        { title: "Release-ready habits", text: "Testing, app icons, builds and store-listing basics." },
      ],
    },
    specialisations: [
      { title: "UI and layouts", text: "Widgets, themes, responsive layouts and animations." },
      { title: "State management", text: "setState, Provider and Riverpod or Bloc basics." },
      { title: "Networking", text: "REST APIs, JSON parsing and error handling." },
      { title: "Firebase", text: "Authentication, Firestore and push notifications." },
      { title: "Local storage", text: "Shared preferences and SQLite for offline data." },
      { title: "Testing and release", text: "Widget tests, builds and Play Store preparation." },
    ],
    topics: [
      { title: "Dart fundamentals", text: "Variables, functions, classes, null safety and async code.", checkpoint: "Write a Dart program that fetches and prints data asynchronously." },
      { title: "Flutter widgets and layout", text: "Stateless and stateful widgets, rows, columns, lists and themes.", checkpoint: "Rebuild a given screen design pixel-close in Flutter." },
      { title: "Navigation and forms", text: "Routes, passing data between screens and validated forms.", checkpoint: "Build a multi-screen flow with a validated form." },
      { title: "State management", text: "Lifting state, Provider and when to choose a bigger pattern.", checkpoint: "Explain how data flows through your app's state." },
      { title: "APIs and JSON", text: "HTTP requests, models, loading and error states.", checkpoint: "Show a list from a live API with loading and error handling." },
      { title: "Firebase", text: "Sign-in, Firestore reads and writes, and security rules basics.", checkpoint: "Add login and per-user data to your app." },
      { title: "Local storage and offline use", text: "Saving settings and data on the device.", checkpoint: "Keep your app usable without a connection." },
      { title: "Testing, builds and documentation", text: "Widget tests, release builds, icons and a README.", checkpoint: "Install a release build on a phone and demo it." },
    ],
    roadmap: [
      { title: "Dart and Flutter basics", text: "Language fundamentals, tooling, widgets and layouts." },
      { title: "Screens, navigation and forms", text: "Multi-screen apps, input handling and themes." },
      { title: "State and architecture", text: "State management patterns and project structure." },
      { title: "APIs and Firebase", text: "Networking, authentication and cloud data." },
      { title: "Storage, testing and polish", text: "Offline data, tests, animations and accessibility." },
      { title: "Capstone app and report", text: "Complete, build and demo your app; report and viva preparation." },
    ],
    projects: [
      { title: "Expense tracker", text: "Categories, charts and offline storage." },
      { title: "News or weather app", text: "Live API data with search and favourites." },
      { title: "Chat app", text: "Firebase authentication and real-time messages." },
      { title: "Campus utility app", text: "Timetables, notices and reminders for students." },
    ],
    roles: ["Flutter developer trainee", "Mobile app developer trainee", "Junior app developer", "QA trainee"],
    faqs: [
      { q: "Do I need a Mac or an iPhone?", a: "No. You can build and test Android apps on Windows. Building for iOS needs a Mac, which the counsellor can discuss with you." },
      { q: "Do I need to know programming first?", a: "Basic programming helps. Dart is taught from the fundamentals, but expect regular practice in the first weeks." },
    ],
    photos: ["design-lab-mentor-2", "students-coding", "lab-passion-wall", "laptop-workshop"],
  }),

  define({
    slug: "generative-ai",
    label: "Generative AI",
    course: "Generative AI",
    heading: "Generative AI Internship",
    summary: `Build useful, guarded generative AI applications in ${city}: prompting, LLM APIs, retrieval over your own documents and simple agents — evaluated, not just demoed.`,
    points: ["Prompt design and LLM APIs", "Retrieval-augmented generation", "Tool-using agents with guardrails", "An evaluated capstone and report"],
    intro:
      "A six-month generative AI internship is guided, project-based practice in building applications on large language models: writing and testing prompts, calling model APIs, grounding answers in documents and checking outputs for errors, bias and privacy risks.",
    why: {
      text: "Generative AI is easy to demo and hard to make reliable. Six months gives time for Python foundations, then prompting, retrieval and agents — with evaluation and human review built in.",
      items: [
        { title: "Foundations first", text: "Python and APIs before frameworks." },
        { title: "Grounded answers", text: "Retrieval over your documents instead of unchecked guesses." },
        { title: "Evaluation habits", text: "Test sets and review for factual errors and bias." },
        { title: "Responsible use", text: "Privacy, guardrails and honest limits in every project." },
      ],
    },
    specialisations: [
      { title: "Prompt engineering", text: "Structured prompts, examples and output formats." },
      { title: "LLM APIs", text: "Calling hosted models, streaming and cost control." },
      { title: "Retrieval (RAG)", text: "Embeddings, vector search and citations." },
      { title: "Agents and tools", text: "Tool calling and multi-step workflows with limits." },
      { title: "Evaluation", text: "Test sets, rubrics and regression checks." },
      { title: "Safety and privacy", text: "Guardrails, data handling and human review." },
    ],
    topics: [
      { title: "Python for AI applications", text: "Functions, files, virtual environments, HTTP and JSON.", checkpoint: "Call a web API from Python and save the result." },
      { title: "How language models work", text: "Tokens, context windows, sampling and why models make mistakes.", checkpoint: "Explain one failure of a model in plain words." },
      { title: "Prompt design", text: "Instructions, examples, structured output and iteration.", checkpoint: "Improve a prompt and show before-and-after results on a test set." },
      { title: "Working with LLM APIs", text: "Requests, streaming, errors, rate limits and cost.", checkpoint: "Build a small app that handles API errors gracefully." },
      { title: "Embeddings and retrieval", text: "Chunking documents, vector search and citing sources.", checkpoint: "Answer questions from your documents with citations." },
      { title: "Agents and tool use", text: "Letting a model call tools, with step limits and checks.", checkpoint: "Show an agent completing a task and where it is stopped." },
      { title: "Evaluation and safety", text: "Test sets, rubrics, bias, privacy and human review.", checkpoint: "Report accuracy and failure cases for your assistant." },
      { title: "Deployment and documentation", text: "A simple web interface, logging and a README.", checkpoint: "Demo your app and explain its limits." },
    ],
    roadmap: [
      { title: "Python and APIs", text: "Coding foundations, HTTP, JSON and version control." },
      { title: "LLM fundamentals and prompting", text: "How models behave and how to prompt them." },
      { title: "Building with LLM APIs", text: "Small applications, structured output and cost control." },
      { title: "Retrieval-augmented generation", text: "Embeddings, vector search and grounded answers." },
      { title: "Agents, evaluation and safety", text: "Tool use, test sets, guardrails and review." },
      { title: "Capstone and report", text: "An evaluated generative AI app, report and viva preparation." },
    ],
    projects: [
      { title: "Document Q&A assistant", text: "Answers from a document set, with citations and an accuracy report." },
      { title: "Content drafting tool", text: "Structured drafts with human review before use." },
      { title: "Support triage bot", text: "Classifies and routes messages with a fallback to a person." },
      { title: "Study helper", text: "Summaries and quizzes from course notes, checked for errors." },
    ],
    roles: ["AI application developer trainee", "Prompt engineering trainee", "Junior Python developer", "AI operations associate"],
    faqs: [
      { q: "How is this different from the Artificial Intelligence domain?", a: "Artificial Intelligence starts from machine learning on data. Generative AI focuses on building applications with large language models: prompting, retrieval, agents and evaluation." },
      { q: "Will I need paid API keys?", a: "Ask the centre how model access works in the lab and whether any costs fall on you. Free tiers and open models can cover much of the practice." },
    ],
    photos: ["langchain-seminar", "ai-course-presentation", "robot-dog-student", "aero-lab-coding"],
  }),

  define({
    slug: "digital-marketing",
    label: "Digital Marketing",
    course: "Digital Marketing",
    heading: "Digital Marketing Internship",
    summary: `Learn to plan, run and measure online campaigns in ${city}: SEO, social media, Google Ads, content and analytics, ending in a campaign report you can show.`,
    points: ["SEO and content marketing", "Social media and paid ads", "Google Analytics and reporting", "A campaign plan and results report"],
    intro:
      "A six-month digital marketing internship is guided, practical training in growing a brand online: researching audiences, improving search visibility, creating content, running ad campaigns in practice accounts and reporting what worked.",
    audience: audience({
      btech: "Engineering students interested in growth, product or business roles can add measurable marketing skills and a campaign report.",
      bca: "BCA, MCA, BBA and B.Com students can combine digital tools with marketing fundamentals in a documented campaign project.",
      bsc: "Graduates from any stream can learn the tools and analytics behind online marketing step by step.",
      final: "Time is tight around examinations and submissions. Check the approved duration and report format before paying a fee.",
      first: "No coding is needed. Ask how campaigns are practised and how your work will be reviewed.",
    }),
    why: {
      text: "Marketing skills show through results. Six months allows each channel to be learnt properly, then combined into one campaign that is planned, run, measured and explained.",
      items: [
        { title: "Every channel", text: "Search, social, email, content and paid ads." },
        { title: "Measured work", text: "Analytics and reporting from the first month." },
        { title: "Practical accounts", text: "Hands-on practice in real tools, within safe budgets." },
        { title: "A portfolio report", text: "A campaign you can walk an interviewer through." },
      ],
    },
    specialisations: [
      { title: "Search engine optimisation", text: "Keyword research, on-page, technical and local SEO." },
      { title: "Social media marketing", text: "Content calendars, reels and community management." },
      { title: "Paid advertising", text: "Google Ads and Meta Ads structure, targeting and budgets." },
      { title: "Content and email", text: "Copywriting, blogs, newsletters and automation." },
      { title: "Analytics", text: "Google Analytics, Search Console and dashboards." },
      { title: "Local and e-commerce", text: "Google Business Profile and marketplace listings." },
    ],
    topics: [
      { title: "Marketing fundamentals", text: "Audiences, funnels, positioning and goals.", checkpoint: "Write a one-page marketing plan for a local business." },
      { title: "Websites and landing pages", text: "WordPress basics and pages that convert.", checkpoint: "Build a landing page with a clear call to action." },
      { title: "SEO", text: "Keywords, on-page optimisation, technical checks and local SEO.", checkpoint: "Audit a site and list prioritised fixes." },
      { title: "Social media", text: "Platform strategy, content calendars and engagement.", checkpoint: "Plan and schedule a month of posts." },
      { title: "Google Ads", text: "Campaign structure, keywords, ads and budgets.", checkpoint: "Set up a search campaign and explain its targeting." },
      { title: "Meta Ads", text: "Audiences, creatives and objectives.", checkpoint: "Design an ad set with two creative variations." },
      { title: "Email and content", text: "Copywriting, newsletters and simple automation.", checkpoint: "Write and send a test newsletter sequence." },
      { title: "Analytics and reporting", text: "Google Analytics, conversions and honest reporting.", checkpoint: "Present a report that explains what worked and what did not." },
    ],
    roadmap: [
      { title: "Fundamentals and websites", text: "Marketing basics, WordPress and landing pages." },
      { title: "SEO", text: "Keyword research, on-page, technical and local SEO." },
      { title: "Social media and content", text: "Strategy, calendars, design tools and copywriting." },
      { title: "Paid ads", text: "Google Ads and Meta Ads in practice." },
      { title: "Email, analytics and reporting", text: "Automation, tracking and dashboards." },
      { title: "Capstone campaign and report", text: "Plan, run and report a full campaign; viva preparation." },
    ],
    projects: [
      { title: "Local business SEO", text: "An audit, fixes and a Google Business Profile plan." },
      { title: "Social media campaign", text: "A month-long content plan with results." },
      { title: "Search ads plan", text: "Campaign structure, keywords and budget for a product." },
      { title: "Analytics dashboard", text: "A report tracking traffic and conversions." },
    ],
    roles: ["Digital marketing executive", "SEO trainee", "Social media executive", "PPC trainee", "Content marketing associate"],
    faqs: [
      { q: "Do I need technical or coding skills?", a: "No. The programme starts from marketing fundamentals and the tools are taught step by step." },
      { q: "Will I run real ads?", a: "Ask the centre how ad practice works. Spending real money should only happen with a clear, agreed budget." },
    ],
    photos: ["lab-welcome-wall", "team-room", "laptop-workshop", "lab-students-desks"],
  }),

  define({
    slug: "data-science",
    label: "Data Science",
    course: "Data Science",
    heading: "Data Science Internship",
    summary: `Go from raw data to tested predictions in ${city}: Python, statistics, machine learning and clear communication of results, ending in a documented capstone.`,
    points: ["Python, pandas and statistics", "Machine learning models", "Evaluation and visualisation", "A capstone with report and viva preparation"],
    intro:
      "A six-month data science internship is guided, project-based practice in the full data workflow: collecting and cleaning data, exploring it, building and evaluating predictive models and explaining the results to people who will act on them.",
    why: {
      text: "Data science needs programming, statistics and judgement together. Six months allows each to be built up, then combined into one end-to-end project you can defend.",
      items: [
        { title: "Statistics that matter", text: "Enough maths to choose and question a method." },
        { title: "Messy, real data", text: "Cleaning and documentation before modelling." },
        { title: "Honest evaluation", text: "Baselines, validation and the right metric." },
        { title: "Clear communication", text: "Charts and reports for non-technical readers." },
      ],
    },
    specialisations: [
      { title: "Exploratory analysis", text: "Distributions, relationships and segments." },
      { title: "Machine learning", text: "Regression, classification and clustering." },
      { title: "Feature engineering", text: "Turning raw data into useful inputs." },
      { title: "Time series", text: "Trends, seasonality and simple forecasts." },
      { title: "Visualisation", text: "Matplotlib, Seaborn and dashboards." },
      { title: "Model deployment basics", text: "Saving models and serving predictions." },
    ],
    topics: [
      { title: "Python for data", text: "NumPy, pandas, notebooks and version control.", checkpoint: "Load, clean and summarise a dataset in a notebook." },
      { title: "Statistics", text: "Descriptive statistics, probability, sampling and hypothesis tests.", checkpoint: "Test whether a difference in your data is meaningful." },
      { title: "Data cleaning and ethics", text: "Missing values, outliers, leakage, sources and licences.", checkpoint: "Document every cleaning step and the data's source." },
      { title: "Exploratory analysis and visualisation", text: "Charts that reveal patterns without misleading.", checkpoint: "Present three findings with supporting charts." },
      { title: "Supervised learning", text: "Regression and classification against a baseline.", checkpoint: "Beat a baseline on held-out data." },
      { title: "Model evaluation", text: "Cross-validation and choosing metrics for the problem.", checkpoint: "Justify your metric and log your experiments." },
      { title: "Unsupervised learning and features", text: "Clustering, dimensionality reduction and feature engineering.", checkpoint: "Describe the segments your clustering found." },
      { title: "Communication and deployment", text: "Reports, dashboards and a simple prediction API.", checkpoint: "Give a five-minute walkthrough of your final project." },
    ],
    roadmap: [
      { title: "Python and data handling", text: "Notebooks, pandas, Git and data sources." },
      { title: "Statistics and exploration", text: "Applied statistics, EDA and visualisation." },
      { title: "Supervised learning", text: "Regression, classification and evaluation." },
      { title: "Unsupervised learning and features", text: "Clustering, feature engineering and experiments." },
      { title: "Communication and deployment", text: "Dashboards, reports and serving a model." },
      { title: "Capstone and report", text: "End-to-end project, technical report and viva preparation." },
    ],
    projects: [
      { title: "Price prediction", text: "A regression model on public housing or vehicle data." },
      { title: "Churn classification", text: "Predicting which customers may leave, with honest metrics." },
      { title: "Customer segmentation", text: "Clusters described in business terms." },
      { title: "Demand forecasting", text: "A simple time-series forecast with error analysis." },
    ],
    roles: ["Data science trainee", "Data analyst", "Junior ML engineer trainee", "Business intelligence trainee"],
    faqs: [
      { q: "How is Data Science different from Data Analytics?", a: "Data Analytics focuses on queries, statistics and dashboards. Data Science adds programming-heavy modelling and evaluation of predictions." },
      { q: "How much maths do I need?", a: "School-level maths is enough to start; the statistics you need is taught early in the programme." },
    ],
    photos: ["data-session", "lab-coding-class", "aero-lab-mentors", "lab-wide"],
  }),

  define({
    slug: "python-programming",
    label: "Python Programming",
    course: "Python Programming",
    heading: "Python Programming Internship",
    summary: `Learn to write clean, working Python in ${city}: fundamentals, object-oriented code, files, libraries, automation and a web or data project you can explain.`,
    points: ["Python fundamentals and OOP", "Files, libraries and automation", "APIs, databases and a web framework", "A documented project and report"],
    intro:
      "A six-month Python internship is guided, project-based practice in programming: from variables and loops to object-oriented design, working with files and databases, automating tasks and building a small application.",
    why: {
      text: "Python is the starting point for automation, web development, data and AI. Six months allows the language to be learnt properly, then applied to a real project.",
      items: [
        { title: "Strong fundamentals", text: "Logic and problem solving before frameworks." },
        { title: "Readable code", text: "Functions, classes, tests and style that others can follow." },
        { title: "Useful automation", text: "Scripts that save real time on real tasks." },
        { title: "A path onward", text: "A base for web, data science or AI." },
      ],
    },
    specialisations: [
      { title: "Core Python", text: "Data types, control flow, functions and modules." },
      { title: "Object-oriented programming", text: "Classes, inheritance and design." },
      { title: "Automation", text: "Files, Excel, emails and scheduled scripts." },
      { title: "Web development", text: "Flask or Django basics." },
      { title: "Databases", text: "SQL with SQLite and MySQL." },
      { title: "Data handling", text: "An introduction to pandas and charts." },
    ],
    topics: [
      { title: "Python fundamentals", text: "Variables, types, conditions, loops and functions.", checkpoint: "Solve a set of logic problems with tested functions." },
      { title: "Data structures", text: "Lists, tuples, dictionaries, sets and comprehensions.", checkpoint: "Choose and justify the right structure for a task." },
      { title: "Files and errors", text: "Reading, writing, exceptions and logging.", checkpoint: "Write a script that processes files safely." },
      { title: "Object-oriented programming", text: "Classes, objects, inheritance and modules.", checkpoint: "Model a small system with classes." },
      { title: "Git and testing", text: "Version control and unit tests with pytest.", checkpoint: "Keep your project in Git with passing tests." },
      { title: "Libraries and automation", text: "pip, virtual environments and automating everyday tasks.", checkpoint: "Automate a repetitive task and measure the time saved." },
      { title: "APIs and databases", text: "HTTP requests, JSON and SQL.", checkpoint: "Store data from an API in a database." },
      { title: "Web framework basics", text: "Routes, templates and forms with Flask or Django.", checkpoint: "Demo a small web app and explain its code." },
    ],
    roadmap: [
      { title: "Python fundamentals", text: "Syntax, logic, functions and problem solving." },
      { title: "Data structures and files", text: "Collections, file handling and errors." },
      { title: "OOP, Git and testing", text: "Classes, modules, version control and tests." },
      { title: "Automation and libraries", text: "Useful scripts and the Python ecosystem." },
      { title: "APIs, databases and web", text: "SQL, HTTP and a web framework." },
      { title: "Capstone and report", text: "A complete Python project, report and viva preparation." },
    ],
    projects: [
      { title: "Library or inventory system", text: "Classes, a database and a simple interface." },
      { title: "Office automation scripts", text: "Reports from Excel files, emailed automatically." },
      { title: "Web app with Flask", text: "A small site with forms and stored data." },
      { title: "API data collector", text: "Collects, stores and summarises public API data." },
    ],
    roles: ["Junior Python developer", "Software trainee", "Automation trainee", "QA trainee"],
    faqs: [
      { q: "Is Python good for complete beginners?", a: "Yes. It is one of the most readable languages, and the programme starts from the basics." },
      { q: "What can I learn after Python?", a: "Web development, data analytics, data science or AI. The counsellor can suggest a path based on your project." },
    ],
    photos: ["students-coding", "lab-coding-class", "lab-hands-on", "lab-practice"],
  }),

  define({
    slug: "web-designing",
    label: "Web Designing",
    course: "Web Designing",
    heading: "Web Designing Internship",
    summary: `Design and build responsive websites in ${city}: design principles, Figma, HTML, CSS, JavaScript basics and WordPress, ending in a live portfolio site.`,
    points: ["Design principles and Figma", "HTML, CSS and responsive layouts", "JavaScript basics and WordPress", "A live portfolio site and report"],
    intro:
      "A six-month web designing internship is guided, project-based practice in creating websites people can use: planning layouts, designing in Figma, turning designs into responsive pages and publishing them.",
    why: {
      text: "Good web design is both visual and technical. Six months allows design principles and tools to come first, then front-end code, then complete sites you can publish and show.",
      items: [
        { title: "Design thinking", text: "Layout, colour, type and usability." },
        { title: "Design to code", text: "Figma designs turned into real pages." },
        { title: "Works on phones", text: "Responsive and accessible from the start." },
        { title: "A live portfolio", text: "Published sites you can share with employers." },
      ],
    },
    specialisations: [
      { title: "UI design", text: "Layouts, colour, typography and components." },
      { title: "Figma", text: "Frames, auto layout, prototypes and handoff." },
      { title: "Responsive front end", text: "HTML, CSS, flexbox and grid." },
      { title: "Interactivity", text: "JavaScript basics and simple animations." },
      { title: "WordPress", text: "Themes, page builders and plugins." },
      { title: "Accessibility and SEO basics", text: "Readable, findable and inclusive pages." },
    ],
    topics: [
      { title: "Design principles", text: "Hierarchy, spacing, colour, typography and usability.", checkpoint: "Critique a website and propose improvements." },
      { title: "Figma", text: "Wireframes, components and clickable prototypes.", checkpoint: "Design a three-page site prototype in Figma." },
      { title: "HTML", text: "Semantic structure, forms and media.", checkpoint: "Mark up a page that is valid and well structured." },
      { title: "CSS and responsive layout", text: "Flexbox, grid, media queries and modern CSS.", checkpoint: "Build your Figma design as a responsive page." },
      { title: "JavaScript basics", text: "Menus, sliders and form validation.", checkpoint: "Add working interactions to your page." },
      { title: "WordPress", text: "Installing, theming and building pages.", checkpoint: "Build a business site in WordPress." },
      { title: "Accessibility and performance", text: "Contrast, alt text, keyboard use and fast images.", checkpoint: "Pass basic accessibility and speed checks." },
      { title: "Publishing and portfolio", text: "Hosting, domains and presenting your work.", checkpoint: "Publish your portfolio and present it." },
    ],
    roadmap: [
      { title: "Design principles and Figma", text: "Visual design, wireframes and prototypes." },
      { title: "HTML and CSS", text: "Structure, styling and layout." },
      { title: "Responsive design", text: "Mobile-first pages, grid and flexbox." },
      { title: "JavaScript and interactivity", text: "Basic scripting and UI behaviour." },
      { title: "WordPress and publishing", text: "CMS sites, hosting and domains." },
      { title: "Capstone portfolio and report", text: "A complete site, portfolio, report and viva preparation." },
    ],
    projects: [
      { title: "Business website", text: "A responsive multi-page site for a local business." },
      { title: "Landing page", text: "A designed and built page for a product or event." },
      { title: "WordPress site", text: "A themed site the owner can update." },
      { title: "Personal portfolio", text: "Your work, published and presentable." },
    ],
    roles: ["Web designer trainee", "UI designer trainee", "Front-end developer trainee", "WordPress developer trainee"],
    faqs: [
      { q: "Do I need to be good at drawing?", a: "No. Web design relies on layout, spacing and tools like Figma, which are taught from the basics." },
      { q: "How is this different from MERN Full Stack?", a: "Web Designing focuses on design and front-end pages. MERN Full Stack adds back-end servers, databases and full applications." },
    ],
    photos: ["design-lab-mentor", "design-lab-mentor-2", "lab-passion-wall", "team-room"],
  }),

  define({
    slug: "ethical-hacking",
    label: "Ethical Hacking",
    course: "Ethical Hacking",
    heading: "Ethical Hacking Internship",
    summary: `Learn how attackers think — and how to report and fix what they find — in ${city}, using only authorised lab environments and a clear code of ethics.`,
    points: ["Networking, Linux and ethics", "Reconnaissance and scanning", "Web and system vulnerabilities", "An authorised assessment report"],
    intro:
      "A six-month ethical hacking internship is guided practice in security assessment: understanding systems, finding weaknesses in permitted lab environments, and writing reports that help owners fix them. Every exercise is authorised and scoped.",
    why: {
      text: "Ethical hacking depends on deep fundamentals and strict ethics. Six months allows networking, Linux and the law to come first, then assessment techniques practised safely and reported clearly.",
      items: [
        { title: "Ethics and scope first", text: "Authorisation and rules of engagement before any tool." },
        { title: "Authorised labs only", text: "Every exercise in a permitted environment." },
        { title: "Methodology", text: "A repeatable assessment process, not random tools." },
        { title: "Reports that help", text: "Findings, severity and fixes owners can act on." },
      ],
    },
    specialisations: [
      { title: "Network assessment", text: "Discovery, scanning and service analysis in labs." },
      { title: "Web application testing", text: "Common vulnerability classes in practice apps." },
      { title: "System security", text: "Linux and Windows weaknesses and hardening." },
      { title: "Wireless basics", text: "How wireless security works and fails." },
      { title: "Social engineering awareness", text: "Recognising and preventing manipulation." },
      { title: "Reporting", text: "Writing clear, prioritised findings." },
    ],
    topics: [
      { title: "Networking fundamentals", text: "TCP/IP, DNS, HTTP and how services communicate.", checkpoint: "Explain a captured network exchange step by step." },
      { title: "Linux for security", text: "Command line, permissions, services and scripting.", checkpoint: "Navigate and script tasks on a lab Linux machine." },
      { title: "Ethics, law and scope", text: "Authorisation, rules of engagement and responsible disclosure.", checkpoint: "Write a scope document for a lab assessment." },
      { title: "Reconnaissance", text: "Gathering information about lab targets responsibly.", checkpoint: "Produce a reconnaissance summary for a lab target." },
      { title: "Scanning and enumeration", text: "Discovering hosts, ports and services in the lab.", checkpoint: "Map a lab network and explain what you found." },
      { title: "Web vulnerabilities", text: "Common vulnerability classes tested in deliberately vulnerable apps.", checkpoint: "Find, explain and suggest a fix for a lab vulnerability." },
      { title: "System weaknesses and hardening", text: "Misconfigurations, weak credentials and how to fix them.", checkpoint: "Harden a lab machine and verify the fix." },
      { title: "Reporting", text: "Severity, evidence and remediation for each finding.", checkpoint: "Present an assessment report to a non-technical reader." },
    ],
    roadmap: [
      { title: "Networking and Linux", text: "Core networking, Linux and scripting." },
      { title: "Ethics and methodology", text: "Law, scope, rules of engagement and process." },
      { title: "Reconnaissance and scanning", text: "Information gathering and enumeration in labs." },
      { title: "Web application testing", text: "Vulnerability classes in practice applications." },
      { title: "Systems and hardening", text: "Weaknesses, fixes and verification." },
      { title: "Capstone assessment and report", text: "A scoped lab assessment, full report and viva preparation." },
    ],
    projects: [
      { title: "Lab network assessment", text: "Discovery, findings and fixes for a lab network." },
      { title: "Web app assessment report", text: "Findings for a deliberately vulnerable application." },
      { title: "Hardening checklist", text: "A verified baseline for a lab server." },
      { title: "Awareness session", text: "A short training on phishing and safe practice." },
    ],
    roles: ["Junior security analyst", "Security operations trainee", "Vulnerability assessment trainee", "IT support"],
    faqs: [
      { q: "Is ethical hacking legal?", a: "Only with explicit permission and a defined scope. All practice here happens in authorised lab environments." },
      { q: "How is this different from Cyber Security?", a: "Cyber Security covers defence, monitoring and response broadly. Ethical Hacking focuses on assessing systems the way an attacker would — within strict authorisation." },
      { q: "Is a certification exam included?", a: "Ask the centre. Any external exam and its fee should be confirmed in writing; it is not assumed to be part of the programme." },
    ],
    photos: ["trainer-lab", "students-coding", "lab-hands-on", "lecture-room"],
  }),

  define({
    slug: "autocad-solidworks",
    label: "AutoCAD & SolidWorks",
    course: "AutoCAD",
    heading: "AutoCAD & SolidWorks Internship",
    summary: `Learn industry-standard CAD in ${city}: 2D drafting in AutoCAD and 3D part and assembly modelling in SolidWorks, ending in a complete drawing set.`,
    points: ["2D drafting in AutoCAD", "3D modelling in SolidWorks", "Assemblies and engineering drawings", "A complete drawing set and report"],
    intro:
      "A six-month AutoCAD and SolidWorks internship is guided, practical training in computer-aided design: producing accurate 2D drawings, modelling parts and assemblies in 3D and preparing drawings that follow drafting standards.",
    audience: [
      { title: "B.Tech / B.E. Mechanical and Civil students", text: "Apply engineering drawing coursework to industry software and a drawing set suited to an industrial-training report." },
      { title: "Diploma (Polytechnic) students", text: "Build practical drafting and modelling skills used in workshops, design offices and manufacturing." },
      { title: "Architecture and interior design students", text: "Use AutoCAD for plans, elevations and layouts alongside your design coursework." },
      { title: "Final-year students", text: "Check the approved duration and report format with your department before paying a fee." },
      { title: "Beginners", text: "No prior CAD experience is needed; ask how practice time and reviews are arranged." },
    ],
    why: {
      text: "CAD skill comes from many hours of accurate practice. Six months allows 2D drafting to become fluent before 3D modelling, assemblies and full drawing sets.",
      items: [
        { title: "Drafting standards", text: "Dimensions, layers and line types done properly." },
        { title: "2D and 3D", text: "AutoCAD drafting and SolidWorks modelling." },
        { title: "Real components", text: "Parts and assemblies based on real designs." },
        { title: "A drawing portfolio", text: "Sheets you can show in interviews." },
      ],
    },
    specialisations: [
      { title: "2D drafting", text: "Lines, layers, blocks and dimensions in AutoCAD." },
      { title: "Civil and architectural drawings", text: "Plans, elevations and sections." },
      { title: "Mechanical drawings", text: "Orthographic views, tolerances and title blocks." },
      { title: "3D part modelling", text: "Sketches, features and parametric design in SolidWorks." },
      { title: "Assemblies", text: "Mates, motion and exploded views." },
      { title: "Sheet metal and surfacing", text: "An introduction to advanced SolidWorks tools." },
    ],
    topics: [
      { title: "Engineering drawing basics", text: "Projections, views, scales and drafting standards.", checkpoint: "Draw the views of a simple component by hand and in CAD." },
      { title: "AutoCAD interface and drawing tools", text: "Lines, circles, editing commands and precision input.", checkpoint: "Reproduce a given 2D drawing accurately." },
      { title: "Layers, blocks and dimensions", text: "Organising drawings and dimensioning to standard.", checkpoint: "Produce a fully dimensioned, layered drawing." },
      { title: "Plotting and layouts", text: "Title blocks, viewports and printing to scale.", checkpoint: "Plot a drawing sheet to scale." },
      { title: "SolidWorks sketching and features", text: "Sketch relations, extrudes, cuts, fillets and patterns.", checkpoint: "Model a part from a 2D drawing." },
      { title: "Parametric design", text: "Design intent, equations and configurations.", checkpoint: "Change one dimension and show the model update correctly." },
      { title: "Assemblies", text: "Mates, interference checks and exploded views.", checkpoint: "Assemble a multi-part product and explode it." },
      { title: "Detail drawings", text: "Drawings from 3D models with dimensions and a bill of materials.", checkpoint: "Produce a complete drawing set for your assembly." },
    ],
    roadmap: [
      { title: "Drawing fundamentals and AutoCAD", text: "Standards, projections and core drawing tools." },
      { title: "Advanced AutoCAD", text: "Layers, blocks, dimensions, layouts and plotting." },
      { title: "SolidWorks part modelling", text: "Sketches, features and design intent." },
      { title: "Assemblies", text: "Mates, motion and exploded views." },
      { title: "Drawings and advanced tools", text: "Detail drawings, BOMs and an introduction to sheet metal." },
      { title: "Capstone and report", text: "A complete product or building drawing set, report and viva preparation." },
    ],
    projects: [
      { title: "Residential floor plan", text: "Plans, elevations and sections in AutoCAD." },
      { title: "Machine component set", text: "Detailed drawings of a mechanical part." },
      { title: "Product assembly", text: "A modelled assembly with an exploded view and BOM." },
      { title: "Sheet metal enclosure", text: "A simple bent-metal part and its flat pattern." },
    ],
    roles: ["CAD draughtsman trainee", "Design engineer trainee", "AutoCAD operator", "Mechanical design trainee"],
    faqs: [
      { q: "Is this suitable for civil or only mechanical students?", a: "Both. AutoCAD is used in civil and architectural work; SolidWorks is mainly used for mechanical and product design. Your project can follow your branch." },
      { q: "Do I need my own software licence?", a: "Ask the centre about lab access and licences. Student and educational versions may be available." },
    ],
    photos: ["lab-wide", "lab-classroom", "aero-lab-mentors", "lab-students-desks"],
  }),

  define({
    slug: "basic-computer-office",
    label: "Basic Computer & Office Skills",
    course: "Basic Computer",
    heading: "Basic Computer & Office Skills Training",
    summary: `Build everyday computer confidence in ${city}: Windows, typing, internet and email, Word, Excel and PowerPoint — the skills every office job expects.`,
    points: ["Windows, files and typing", "Internet, email and online safety", "Word, Excel and PowerPoint", "A practical skills assessment"],
    intro:
      "A six-month basic computer and office skills programme is guided, hands-on training for people starting with computers or wanting to use them confidently at work: managing files, communicating online and producing documents, spreadsheets and presentations.",
    audience: [
      { title: "Students after 10th or 12th", text: "Build the computer skills colleges and first jobs expect." },
      { title: "College students in any stream", text: "Become confident with documents, spreadsheets and presentations for coursework." },
      { title: "Job seekers", text: "Prepare for office, data entry and front-desk roles." },
      { title: "Working professionals and homemakers", text: "Learn at a comfortable pace with practical, everyday tasks." },
      { title: "Complete beginners", text: "No prior experience is needed; ask how practice time and support are arranged." },
    ],
    why: {
      text: "Office skills improve with steady, guided practice. Six months allows real fluency — from typing and files to confident use of Excel and PowerPoint.",
      items: [
        { title: "Start from zero", text: "No prior computer knowledge assumed." },
        { title: "Everyday tasks", text: "Practice on documents and sheets you will really use." },
        { title: "Typing speed", text: "Regular practice to build speed and accuracy." },
        { title: "Safe online habits", text: "Passwords, scams and privacy." },
      ],
    },
    specialisations: [
      { title: "Computer fundamentals", text: "Hardware, Windows and file management." },
      { title: "Typing", text: "Touch typing for speed and accuracy." },
      { title: "Microsoft Word", text: "Letters, reports, tables and formatting." },
      { title: "Microsoft Excel", text: "Formulas, tables, charts and basic data handling." },
      { title: "Microsoft PowerPoint", text: "Clear, simple presentations." },
      { title: "Internet and email", text: "Search, email, online forms and safety." },
    ],
    topics: [
      { title: "Computer fundamentals", text: "Parts of a computer, Windows, files and folders.", checkpoint: "Organise a set of files into a clear folder structure." },
      { title: "Typing", text: "Touch-typing practice for speed and accuracy.", checkpoint: "Reach an agreed typing speed with good accuracy." },
      { title: "Internet and email", text: "Browsing, search, email etiquette and attachments.", checkpoint: "Write and send a professional email with an attachment." },
      { title: "Online safety", text: "Passwords, phishing, scams and privacy settings.", checkpoint: "Spot the warning signs in sample scam messages." },
      { title: "Microsoft Word", text: "Formatting, tables, letters and reports.", checkpoint: "Produce a formatted letter and a short report." },
      { title: "Microsoft Excel", text: "Formulas, functions, sorting, filters and charts.", checkpoint: "Build a budget sheet with formulas and a chart." },
      { title: "Microsoft PowerPoint", text: "Slides, layouts, images and simple animations.", checkpoint: "Present a short slideshow you made." },
      { title: "Cloud and collaboration", text: "Google Drive, sharing and online forms.", checkpoint: "Share a document and collect responses with a form." },
    ],
    roadmap: [
      { title: "Computer basics and typing", text: "Windows, files, folders and typing practice." },
      { title: "Internet, email and safety", text: "Browsing, email and safe online habits." },
      { title: "Microsoft Word", text: "Documents, letters and reports." },
      { title: "Microsoft Excel", text: "Formulas, tables and charts." },
      { title: "PowerPoint and online tools", text: "Presentations, cloud storage and forms." },
      { title: "Practical assessment", text: "Real office tasks completed and reviewed." },
    ],
    projects: [
      { title: "Personal budget sheet", text: "Income, expenses and a chart in Excel." },
      { title: "Formal letter and resume", text: "Well-formatted documents in Word." },
      { title: "Presentation", text: "A short slideshow on a topic of your choice." },
      { title: "Shared survey", text: "An online form with collected responses." },
    ],
    roles: ["Office assistant", "Data entry operator", "Front-desk executive", "Computer operator"],
    faqs: [
      { q: "I have never used a computer. Can I join?", a: "Yes. The programme starts from the very basics and moves at a steady pace with plenty of practice." },
      { q: "Will I get a certificate?", a: "A training certificate is issued on completion. Confirm the attendance and assessment conditions with the centre before joining." },
    ],
    photos: ["lab-welcome-wall", "lab-students-desks", "lecture-room", "lab-practice"],
  }),
];

// In the order of the Internship & Training course list.
const order = [
  "cloud-computing",
  "flutter-app-development",
  "mern-full-stack",
  "artificial-intelligence",
  "generative-ai",
  "digital-marketing",
  "data-analytics",
  "data-science",
  "cyber-security",
  "python-programming",
  "web-designing",
  "ethical-hacking",
  "autocad-solidworks",
  "basic-computer-office",
];

const allDomains = [...domainsList, ...moreDomains].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));

export const internshipDomains = allDomains;

export const domainHref = (duration: string, slug: string) => `${internshipHref(duration)}/${slug}`;

/** A stage of the roadmap, e.g. "Month 3" or "Days 16–30". */
export type Stage = DomainItem & { label: string };

type Plan = {
  /** Replace "six-month" and "six months" in the copy. */
  adj: string;
  noun: string;
  /** How many syllabus topics the track covers; all of them when unset. */
  topics?: number;
  why?: (label: string) => string;
  /** Replaces the last hero point (the capstone) on the shorter track. */
  finale?: string;
  projectNote?: string;
  stages: (roadmap: DomainItem[], label: string) => Stage[];
};

const plans: Record<string, Plan> = {
  "45-days": {
    adj: "45-day (six-week)",
    noun: "45 days (six weeks)",
    topics: 5,
    why: (label) =>
      `45 days — about six weeks — is a focused sprint on the foundations of ${label}: enough to practise the core tools and finish one documented project. It suits a summer or winter break, or a university that asks for six weeks of industrial training with a report.`,
    finale: "Project report and training certificate",
    projectNote: "On the 45-day track you complete one smaller, guided version of a project like these.",
    stages: (r) => [
      { label: "Days 1–15", ...r[0] },
      { label: "Days 16–30", ...r[1] },
      {
        label: "Days 31–45",
        title: "Project, report and certificate",
        text: "A documented project in your university's report format, a practice viva and a review with your trainer.",
      },
    ],
  },
  "6-months": {
    adj: "six-month",
    noun: "six months",
    stages: (r) => r.map((m, i) => ({ label: `Month ${i + 1}`, ...m })),
  },
};

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** A domain as taught on one duration's track. */
export type DomainPage = InternshipDomain & {
  programme: (typeof programmes)[number];
  stages: Stage[];
  projectNote?: string;
};

export function domainPage(duration: string, slug: string): DomainPage | undefined {
  const programme = programmes.find((p) => p.slug === duration);
  const base = allDomains.find((d) => d.slug === slug);
  const plan = plans[duration];
  if (!programme || !base || !plan) return undefined;

  // The copy says "6 months" / "six-month" throughout; reword it for this track.
  const reword = (s: string) =>
    s
      .replaceAll("6 Months", programme.duration)
      .replaceAll("6 months", programme.duration.toLowerCase())
      .replaceAll("Six-month", capitalise(plan.adj))
      .replaceAll("six-month", plan.adj)
      .replaceAll("Six months", capitalise(plan.noun))
      .replaceAll("six months", plan.noun);
  const d: InternshipDomain = JSON.parse(reword(JSON.stringify(base)));

  return {
    ...d,
    hero: { ...d.hero, points: plan.finale ? [...d.hero.points.slice(0, -1), plan.finale] : d.hero.points },
    why: plan.why ? { ...d.why, text: plan.why(d.label) } : d.why,
    topics: plan.topics ? d.topics.slice(0, plan.topics) : d.topics,
    programme,
    stages: plan.stages(base.roadmap, d.label),
    projectNote: plan.projectNote,
  };
}

export const domainParams = programmes.flatMap((p) => allDomains.map((d) => ({ slug: p.slug, domain: d.slug })));
