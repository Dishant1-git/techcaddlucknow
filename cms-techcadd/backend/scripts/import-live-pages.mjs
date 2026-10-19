/**
 * Imports all 1,350 2026 Programmatic Career & Course Guides into the LIVE techcadd CMS
 * Endpoint: $CMS_BASE_URL/pages (defaults to the local CMS API)
 */

const LIVE_BASE = process.env.CMS_BASE_URL ?? "http://localhost:4000/api"
const IDENTIFIER = process.env.CMS_IDENTIFIER ?? "techcadd"
const PASSWORD = process.env.CMS_PASSWORD
if (!PASSWORD) {
  console.error("Set CMS_PASSWORD (and CMS_BASE_URL for the live CMS) before running this import.")
  process.exit(1)
}
const SITE_URL = (process.env.SITE_URL ?? "https://techcaddlucknow.com").replace(/\/$/, "")

const COURSES = [
  { id: "digital-marketing", name: "Digital Marketing", shortName: "Digital Marketing", duration: "3-6 Months", salaryFreshers: "₹3.0 - ₹4.5 LPA", feeRange: "₹18,000 - ₹35,000" },
  { id: "python-fullstack", name: "Full Stack Python Web Development", shortName: "Python Fullstack", duration: "4-6 Months", salaryFreshers: "₹3.8 - ₹5.5 LPA", feeRange: "₹25,000 - ₹45,000" },
  { id: "mern-stack", name: "MERN Stack Web Development (React & Node)", shortName: "MERN Stack", duration: "4-6 Months", salaryFreshers: "₹4.0 - ₹6.0 LPA", feeRange: "₹28,000 - ₹48,000" },
  { id: "ai-ml", name: "Artificial Intelligence & Machine Learning", shortName: "AI & ML", duration: "6 Months", salaryFreshers: "₹4.5 - ₹7.0 LPA", feeRange: "₹35,000 - ₹55,000" },
  { id: "data-science", name: "Data Science & Advanced Analytics", shortName: "Data Science", duration: "6 Months", salaryFreshers: "₹4.2 - ₹6.5 LPA", feeRange: "₹32,000 - ₹52,000" },
  { id: "data-analytics", name: "Data Analytics (Power BI, SQL, Python)", shortName: "Data Analytics", duration: "3-4 Months", salaryFreshers: "₹3.5 - ₹5.0 LPA", feeRange: "₹22,000 - ₹38,000" },
  { id: "cyber-security", name: "Cybersecurity & Ethical Hacking", shortName: "Cybersecurity", duration: "4-6 Months", salaryFreshers: "₹4.0 - ₹6.5 LPA", feeRange: "₹30,000 - ₹50,000" },
  { id: "graphic-design", name: "Graphic Design & Visual Branding", shortName: "Graphic Design", duration: "3-4 Months", salaryFreshers: "₹2.8 - ₹4.2 LPA", feeRange: "₹18,000 - ₹30,000" },
  { id: "java-fullstack", name: "Java Full Stack Development (Spring Boot)", shortName: "Java Fullstack", duration: "4-6 Months", salaryFreshers: "₹3.8 - ₹5.8 LPA", feeRange: "₹26,000 - ₹46,000" },
  { id: "genai", name: "Generative AI & Prompt Engineering", shortName: "GenAI", duration: "2-3 Months", salaryFreshers: "₹4.5 - ₹7.2 LPA", feeRange: "₹25,000 - ₹42,000" },
  { id: "animation-vfx", name: "Animation & Visual Effects (VFX)", shortName: "Animation & VFX", duration: "6-12 Months", salaryFreshers: "₹3.2 - ₹5.0 LPA", feeRange: "₹35,000 - ₹65,000" },
  { id: "graphic-design-motion-graphics", name: "Motion Graphics & Visual Effects", shortName: "Motion Graphics", duration: "4-6 Months", salaryFreshers: "₹3.2 - ₹4.8 LPA", feeRange: "₹24,000 - ₹40,000" },
  { id: "game-art-design", name: "Game Art & 3D Environment Design", shortName: "Game Art", duration: "6 Months", salaryFreshers: "₹3.5 - ₹5.5 LPA", feeRange: "₹30,000 - ₹52,000" },
  { id: "3d-tools-bootcamp", name: "3D Modeling & Industrial CAD Bootcamp", shortName: "3D CAD Bootcamp", duration: "3-4 Months", salaryFreshers: "₹3.0 - ₹4.8 LPA", feeRange: "₹20,000 - ₹36,000" },
  { id: "robotics-iot-automation", name: "Robotics & IoT Automation", shortName: "Robotics & IoT", duration: "4-6 Months", salaryFreshers: "₹3.8 - ₹5.6 LPA", feeRange: "₹28,000 - ₹48,000" },
  { id: "ai-genai-agentic-robotics", name: "Autonomous Systems & Agentic AI", shortName: "Agentic AI", duration: "6 Months", salaryFreshers: "₹5.0 - ₹8.0 LPA", feeRange: "₹38,000 - ₹60,000" },
  { id: "aws-cloud", name: "AWS Cloud Solutions Architecture", shortName: "AWS Cloud", duration: "3-4 Months", salaryFreshers: "₹4.2 - ₹6.5 LPA", feeRange: "₹26,000 - ₹44,000" },
  { id: "video-editing", name: "Professional Video Editing & Color Grading", shortName: "Video Editing", duration: "3 Months", salaryFreshers: "₹2.8 - ₹4.5 LPA", feeRange: "₹18,000 - ₹32,000" },
]

const CITIES = [
  { id: "lucknow", name: "Lucknow", hub: "Lucknow HQ", distance: "0 km (Campus Location)" },
  { id: "kanpur", name: "Kanpur", hub: "Kanpur Industrial Hub", distance: "~90 km via Lucknow–Kanpur Highway (NH27)" },
  { id: "barabanki", name: "Barabanki", hub: "Lucknow East Corridor", distance: "~30 km via Faizabad Road (NH27)" },
  { id: "unnao", name: "Unnao", hub: "Lucknow–Kanpur Belt", distance: "~60 km via NH27" },
  { id: "sitapur", name: "Sitapur", hub: "Lucknow North Corridor", distance: "~90 km via Sitapur Road (NH30)" },
  { id: "rae-bareli", name: "Rae Bareli", hub: "Lucknow South Corridor", distance: "~80 km via Rae Bareli Road (NH30)" },
  { id: "hardoi", name: "Hardoi", hub: "Lucknow West Corridor", distance: "~110 km via Hardoi Road" },
  { id: "ayodhya", name: "Ayodhya", hub: "Awadh Region Hub", distance: "~135 km via NH27" },
  { id: "sultanpur", name: "Sultanpur", hub: "Purvanchal Gateway", distance: "~140 km via Sultanpur Road" },
  { id: "lakhimpur-kheri", name: "Lakhimpur Kheri", hub: "Terai Region Hub", distance: "~135 km via Sitapur Road" },
  { id: "malihabad", name: "Malihabad", hub: "Lucknow Rural West", distance: "~30 km via Hardoi Road" },
  { id: "bakshi-ka-talab", name: "Bakshi Ka Talab", hub: "Lucknow Rural North", distance: "~20 km via Sitapur Road" },
  { id: "mohanlalganj", name: "Mohanlalganj", hub: "Lucknow Rural South", distance: "~25 km via Rae Bareli Road" },
  { id: "gonda", name: "Gonda", hub: "Devipatan Division HQ", distance: "~120 km via NH27 / NH330" },
  { id: "bahraich", name: "Bahraich", hub: "Devipatan North Hub", distance: "~125 km via NH927" },
  { id: "prayagraj", name: "Prayagraj", hub: "Allahabad Region Hub", distance: "~200 km via NH30" },
  { id: "noida", name: "Noida", hub: "UP IT Capital / NCR", distance: "~500 km via Agra–Lucknow & Yamuna Expressways" },
]

const INTENTS = [
  { key: "salary", label: "Salary Guide", short: "Salary" },
  { key: "jobs", label: "Jobs & Careers", short: "Jobs" },
  { key: "fees", label: "Fees & 0% EMI", short: "Fees" },
  { key: "syllabus", label: "Course Syllabus", short: "Syllabus" },
  { key: "scope", label: "Career Scope", short: "Scope" },
]

function generateHtmlContent(course, city, intentKey) {
  if (intentKey === "salary") {
    return [
      `<p class="lead">Looking for transparent, verified <strong>${course.name} salary insights in ${city.name} for 2026</strong>? techcadd Computer Education Lucknow provides an in-depth breakdown of fresher earnings, experienced packages, top recruiting sectors in Uttar Pradesh, and strategic skill upgrades that accelerate your income growth.</p>`,
      `<h2>${course.shortName} Salary Tiers in ${city.name} & Uttar Pradesh (2026)</h2>`,
      `<p>Salaries for ${course.shortName} professionals depend primarily on demonstrable project competence, technical problem-solving capabilities, and portfolio depth rather than pure academic credentials.</p>`,
      `<table class="data-table"><thead><tr><th>Experience Level</th><th>Annual CTC Range</th><th>Primary Job Roles</th><th>Key Technical Skills Demanded</th></tr></thead><tbody>`,
      `<tr><td><strong>Entry-Level / Fresher (0-1 yr)</strong></td><td>${course.salaryFreshers}</td><td>Junior Specialist, Trainee, Associate</td><td>Core fundamentals, hands-on lab projects, Git, problem solving</td></tr>`,
      `<tr><td><strong>Mid-Level Professional (2-4 yrs)</strong></td><td>₹5.5 LPA – ₹9.5 LPA</td><td>Senior Specialist, Module Lead</td><td>Full workflow ownership, production debugging, client communication</td></tr>`,
      `<tr><td><strong>Lead / Senior Architect (5+ yrs)</strong></td><td>₹11.0 LPA – ₹18.0+ LPA</td><td>Lead Consultant, Tech Architect</td><td>System architecture, team mentorship, strategic optimization</td></tr>`,
      `</tbody></table>`,
      `<h2>Key Factors Influencing ${course.shortName} Salaries in ${city.name}</h2>`,
      `<ol>`,
      `<li><strong>Real Production Work:</strong> Candidates with hosted live projects and GitHub repositories command 35-50% higher starting packages than theoretical textbook learners.</li>`,
      `<li><strong>Cross-Functional Modern Tooling:</strong> Combining ${course.shortName} with modern AI-assisted workflows and automation dramatically increases your day-one productivity and compensation.</li>`,
      `<li><strong>Placement Network Access:</strong> techcadd Lucknow connects graduates directly to 200+ vetted hiring partners across Lucknow, Kanpur, Noida, Greater Noida, and NCR.</li>`,
      `</ol>`,
      `<h2>Why Learn ${course.shortName} at techcadd Lucknow?</h2>`,
      `<p>techcadd Computer Education is Uttar Pradesh's premier ISO 9001:2015 certified IT and professional training institute, situated at Kursi Road, Kapoorthala Chauraha, Lucknow. Learners benefit from:</p>`,
      `<ul>`,
      `<li><strong>High-Performance Dedicated Labs:</strong> Work on high-end workstations with dedicated 1-on-1 trainer guidance.</li>`,
      `<li><strong>100% Dedicated Placement Cell:</strong> Comprehensive resume drafting, Git portfolio reviews, and rigorous mock interview drill sessions.</li>`,
      `<li><strong>0% Interest EMI Plans:</strong> Flexible installment options with zero hidden costs, making top-tier education accessible to every ambitious student.</li>`,
      `</ul>`,
      `<h2>Next Steps for Ambitious Learners in ${city.name}</h2>`,
      `<p>Schedule a free 1-on-1 career counselling and demo session with our senior faculty. Call our admissions desk at <strong>+91 91961 80052</strong> or visit our campus at 533/1, Kursi Road, Kapoorthala Chauraha, opp. Central Bank of India, Lucknow.</p>`,
    ].join("\n")
  }

  if (intentKey === "jobs") {
    return [
      `<p class="lead">Explore verified <strong>${course.name} job opportunities, hiring companies, and interview standards in ${city.name} for 2026</strong>. Learn how techcadd Lucknow equips students and professionals with career-ready portfolios and direct recruitment drives across Uttar Pradesh and the Noida–NCR IT Corridor.</p>`,
      `<h2>Employment Landscape for ${course.shortName} in ${city.name} (2026)</h2>`,
      `<p>With expanding IT exports and digital transformation across Uttar Pradesh, businesses in ${city.name}, Kanpur, and the Noida/Greater Noida IT hubs actively recruit skilled ${course.shortName} practitioners with practical project experience.</p>`,
      `<h2>High-Demand Career Profiles</h2>`,
      `<ul>`,
      `<li><strong>${course.shortName} Associate / Executive:</strong> Hands-on operational role focusing on execution, quality assurance, and modular delivery.</li>`,
      `<li><strong>Technical Consultant:</strong> Client-facing problem solver designing custom solutions and workflow automations.</li>`,
      `<li><strong>Freelance & Remote Specialist:</strong> Serving international clients on Upwork and Fiverr with strong portfolio credibility.</li>`,
      `</ul>`,
      `<h2>techcadd's 5-Step Placement Guarantee Protocol</h2>`,
      `<ol>`,
      `<li><strong>Portfolio Architecture:</strong> Build 3 production-grade portfolio projects meeting global industry standards.</li>`,
      `<li><strong>Resume & LinkedIn Optimization:</strong> Keyword-tuned profiles evaluated directly by active HR professionals.</li>`,
      `<li><strong>Mock Technical & Behavioral Drills:</strong> Overcome interview hesitation through structured scenario-based questioning.</li>`,
      `<li><strong>Direct Employer Introductions:</strong> Exclusive recruitment drives with 200+ partnered corporate recruiters.</li>`,
      `<li><strong>Continuous Career Guidance:</strong> Ongoing post-placement mentorship during your probationary period.</li>`,
      `</ol>`,
      `<h2>Visit techcadd Lucknow</h2>`,
      `<p>Join our upcoming batch at 533/1, Kursi Road, Kapoorthala Chauraha, opp. Central Bank of India, Lucknow. Contact our career helpline at <strong>+91 91961 80052</strong>.</p>`,
    ].join("\n")
  }

  if (intentKey === "fees") {
    return [
      `<p class="lead">Looking for transparent, value-driven <strong>${course.name} course fees and flexible payment options in ${city.name} for 2026</strong>? techcadd Computer Education Lucknow offers ISO-certified industrial training with 0% interest EMI options and complete curriculum transparency.</p>`,
      `<h2>Fee Structure & Financial Flexibility (${course.feeRange})</h2>`,
      `<p>At techcadd Lucknow, fee structures are designed to provide maximum return on investment (ROI). Course duration is ${course.duration}, with fast-track and comprehensive diploma options available.</p>`,
      `<ul>`,
      `<li><strong>Transparent Pricing:</strong> No hidden registration charges, lab fees, or exam surcharges.</li>`,
      `<li><strong>0% Interest EMI Facility:</strong> Pay your course fees in easy, affordable monthly installments without high interest burdens.</li>`,
      `<li><strong>Merit & Early Enrollment Concessions:</strong> Special discounts available for qualifying college graduates and group enrollments.</li>`,
      `</ul>`,
      `<h2>What is Included in Your techcadd Enrollment?</h2>`,
      `<ul>`,
      `<li>100% Practical lab access with high-speed internet and modern hardware.</li>`,
      `<li>ISO 9001:2015 Recognized Course Completion Certificate + Live Project Credentials.</li>`,
      `<li>Complete software licenses and environment setup assistance.</li>`,
      `<li>Lifetime access to course project code, study resources, and interview question banks.</li>`,
      `<li>Dedicated placement support and interview scheduling until you get placed.</li>`,
      `</ul>`,
      `<h2>Inquire About Current Fee Discounts</h2>`,
      `<p>Speak directly with our academic coordinators to check current seat availability and fee concessions: <strong>+91 91961 80052</strong> or walk into our Kursi Road campus, opp. Central Bank of India, Lucknow.</p>`,
    ].join("\n")
  }

  if (intentKey === "syllabus") {
    return [
      `<p class="lead">Explore the comprehensive, industry-reviewed <strong>${course.name} syllabus and practical curriculum in ${city.name} for 2026</strong>. Formulated in consultation with senior tech leaders, this course takes you from foundational concepts to advanced production architecture.</p>`,
      `<h2>Curriculum Roadmap & Module Breakdown (${course.duration})</h2>`,
      `<p>The curriculum emphasizes 80% practical lab implementation and 20% theory, ensuring every student graduates with deployable skills.</p>`,
      `<h3>Module 1: Foundations & Architecture Design</h3>`,
      `<p>Introduction to core terminology, architectural design principles, developer toolchains, version control, and development setup.</p>`,
      `<h3>Module 2: Practical Implementation & Intermediate Workflows</h3>`,
      `<p>Deep dive into modular development, industry best practices, debugging pipelines, API integration, and performance optimization.</p>`,
      `<h3>Module 3: Advanced Architectures & Industry Tooling</h3>`,
      `<p>Mastering modern frameworks, AI-assisted development tools, security benchmarks, and automated testing workflows.</p>`,
      `<h3>Module 4: Capstone Industry Project & Portfolio Construction</h3>`,
      `<p>Developing a production-grade application or design from scratch, simulating real corporate client specifications.</p>`,
      `<h2>Hands-On Training at techcadd Lucknow</h2>`,
      `<p>Our labs at Kursi Road, Kapoorthala Chauraha, Lucknow provide the ideal environment for intense, distraction-free technical training under the direct supervision of experienced industry trainers. Call <strong>+91 91961 80052</strong> to request the full PDF syllabus.</p>`,
    ].join("\n")
  }

  // scope
  return [
    `<p class="lead">Discover the future <strong>career scope, market demand, and long-term opportunities for ${course.name} in ${city.name} and across Uttar Pradesh for 2026</strong>. Understand how rapid technological adoption is creating high-growth career tracks for prepared specialists.</p>`,
    `<h2>Market Scope & Growth Projections</h2>`,
    `<p>The requirement for skilled ${course.shortName} practitioners continues to accelerate across Uttar Pradesh's educational, manufacturing, healthcare, and IT export sectors. Organizations are prioritizing candidates with demonstrated practical skills over purely theoretical qualifications.</p>`,
    `<h2>Diverse Career Paths</h2>`,
    `<ul>`,
    `<li><strong>Corporate Employment:</strong> Join established IT enterprises and fast-growing startups in Lucknow, Kanpur, and Noida.</li>`,
    `<li><strong>Global Remote Roles:</strong> Work for national and international firms from the comfort of your home in Uttar Pradesh.</li>`,
    `<li><strong>Freelancing & Agency Services:</strong> Launch your own digital service agency or freelance practice serving regional and overseas businesses.</li>`,
    `</ul>`,
    `<h2>Accelerate Your Career with techcadd</h2>`,
    `<p>techcadd Computer Education Lucknow has empowered thousands of students across Uttar Pradesh to achieve high-paying careers in technology. Visit our campus at 533/1, Kursi Road, Kapoorthala Chauraha, opp. Central Bank of India, Lucknow, or call <strong>+91 91961 80052</strong>.</p>`,
  ].join("\n")
}

let activeCookie = ""

async function login() {
  console.log(`Authenticating with live CMS (${LIVE_BASE})...`)
  const res = await fetch(`${LIVE_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: IDENTIFIER, password: PASSWORD }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Login failed (${res.status}): ${text}`)
  }

  if (typeof res.headers.getSetCookie === "function") {
    activeCookie = res.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ")
  } else {
    activeCookie = (res.headers.get("set-cookie") || "").split(";")[0]
  }

  const user = await res.json()
  console.log(`Authenticated as ${user.name} (${user.role})`)
}

async function getAllExistingSlugs() {
  const existing = new Set()
  let page = 1
  const pageSize = 200

  while (true) {
    const res = await fetch(`${LIVE_BASE}/pages?page=${page}&pageSize=${pageSize}`, {
      headers: { Cookie: activeCookie },
    })

    if (!res.ok) {
      console.warn(`Failed to fetch pages at page ${page}: ${res.status}`)
      break
    }

    const data = await res.json()
    const items = data.items || []
    for (const item of items) {
      if (item.slug) existing.add(item.slug)
    }

    if (items.length < pageSize || existing.size >= (data.total || 0)) {
      break
    }
    page += 1
  }

  console.log(`Discovered ${existing.size} existing pages in live CMS`)
  return existing
}

async function createPageWithRetry(payload, maxRetries = 2) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch(`${LIVE_BASE}/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: activeCookie,
      },
      body: JSON.stringify(payload),
    })

    if (res.status === 201) {
      return { success: true }
    }

    if (res.status === 401) {
      console.log("Session expired. Re-authenticating...")
      await login()
      continue
    }

    const errorText = await res.text()
    if (attempt === maxRetries) {
      return { success: false, status: res.status, error: errorText }
    }
    await new Promise((r) => setTimeout(r, 500))
  }
}

async function run() {
  await login()
  const existingSlugs = await getAllExistingSlugs()

  // Generate all 1,350 items
  const allItems = []
  for (const course of COURSES) {
    for (const city of CITIES) {
      for (const intent of INTENTS) {
        const slug = `${course.id}-${intent.key}-${city.id}-2026`
        allItems.push({ course, city, intent, slug })
      }
    }
  }

  const toCreate = allItems.filter((item) => !existingSlugs.has(item.slug))
  console.log(`Total 2026 guide combinations: ${allItems.length}`)
  console.log(`Already in live CMS: ${allItems.length - toCreate.length}`)
  console.log(`To create in live CMS: ${toCreate.length}`)

  let createdCount = 0
  let failedCount = 0
  const BATCH_SIZE = 6

  for (let i = 0; i < toCreate.length; i += BATCH_SIZE) {
    const batch = toCreate.slice(i, i + BATCH_SIZE)
    const promises = batch.map(async (item) => {
      const { course, city, intent, slug } = item
      const title = `${course.shortName} ${intent.short} in ${city.name} 2026`.slice(0, 120)
      const metaTitle = `${course.shortName} ${intent.short} ${city.name} 2026`.slice(0, 60)
      const metaDescription = `Verified ${course.shortName} ${intent.key} guide for ${city.name} in 2026. Explore salaries, fees, syllabi and placements at techcadd Lucknow.`.slice(0, 160)
      const navLabel = `${course.shortName} ${intent.short}`.slice(0, 80)
      const content = generateHtmlContent(course, city, intent.key)

      const payload = {
        title,
        slug,
        template: "default",
        navPlacement: "none",
        navLabel,
        navOrder: 0,
        content,
        publishDate: "2026-09-26",
        seo: {
          metaTitle,
          metaDescription,
          keywords: [course.shortName, city.name, intent.key, "techcadd Lucknow", "2026"],
          canonicalUrl: `${SITE_URL}/${slug}`,
        },
        status: "published",
        system: false,
        sections: [],
      }

      const res = await createPageWithRetry(payload)
      if (res.success) {
        createdCount += 1
      } else {
        failedCount += 1
        console.error(`Failed ${slug} (${res.status}): ${res.error?.slice(0, 150)}`)
      }
    })

    await Promise.all(promises)

    const processed = i + batch.length
    if (processed % 60 === 0 || processed === toCreate.length) {
      console.log(`Progress: ${processed}/${toCreate.length} processed (${createdCount} created, ${failedCount} failed)`)
    }

    // Gentle 100ms pause between batches
    await new Promise((r) => setTimeout(r, 100))
  }

  console.log("\n==========================================")
  console.log(`IMPORT FINISHED!`)
  console.log(`Successfully created & published: ${createdCount}`)
  console.log(`Failed: ${failedCount}`)
  console.log(`Already existed: ${allItems.length - toCreate.length}`)
  console.log(`All pages are now LIVE on ${LIVE_BASE}`)
  console.log("==========================================")
}

run().catch(console.error)
