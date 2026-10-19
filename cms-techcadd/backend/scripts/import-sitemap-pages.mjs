import mysql from "mysql2/promise"
import { randomUUID } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

// Load .env if present in current or parent directory
const envFiles = [resolve(".env"), resolve("../.env")]
for (const envFile of envFiles) {
  if (existsSync(envFile)) {
    const lines = readFileSync(envFile, "utf8").split("\n")
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const idx = trimmed.indexOf("=")
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim()
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "")
        if (!process.env[key]) {
          process.env[key] = val
        }
      }
    }
  }
}

const sitemapPath = resolve(process.argv[2] ?? "sitemap.xml")
const publish = process.env.PUBLISH_PAGES === "1"
const dryRun = process.env.DRY_RUN === "1"

if (!existsSync(sitemapPath)) {
  console.error(`Sitemap file not found at: ${sitemapPath}`)
  console.error("Usage: npm run db:import-sitemap-pages -- <path-to-sitemap.xml>")
  process.exit(1)
}

const source = readFileSync(sitemapPath, "utf8")

// Extract all URL loc tags from sitemap XML
const allUrls = [...source.matchAll(/<loc>https?:\/\/[^/]+\/([^<?#\s]+)<\/loc>/g)].map(
  (match) => match[1].replace(/^\/+|\/+$/g, ""),
)

// Filter out blog posts, assets, feeds, and empty slugs
const pageSlugs = allUrls
  .filter((slug) => {
    if (!slug) return false
    if (slug.startsWith("blog/") || slug.startsWith("blogs/")) return false
    if (/\.(xml|xsl|png|jpg|jpeg|gif|svg|ico|css|js|json|pdf)$/i.test(slug)) return false
    if (slug.startsWith("api/") || slug.startsWith("_next/") || slug.startsWith("admin/")) return false
    return true
  })
  .filter((slug, index, all) => all.indexOf(slug) === index)

if (pageSlugs.length === 0) {
  throw new Error(`No non-blog page URLs found in ${sitemapPath}`)
}

console.log(`Discovered ${pageSlugs.length} page URLs in ${sitemapPath}`)

function titleCase(value) {
  const replacements = {
    ai: "AI",
    api: "API",
    aws: "AWS",
    bba: "BBA",
    bca: "BCA",
    bcom: "BCom",
    btech: "BTech",
    ca: "CA",
    cad: "CAD",
    cam: "CAM",
    cgc: "CGC",
    cnc: "CNC",
    cpp: "C++",
    css: "CSS",
    dsa: "DSA",
    emi: "EMI",
    faq: "FAQ",
    genai: "GenAI",
    gndu: "GNDU",
    gst: "GST",
    html: "HTML",
    india: "India",
    iot: "IoT",
    iso: "ISO",
    it: "IT",
    java: "Java",
    javascript: "JavaScript",
    llms: "LLMs",
    mern: "MERN",
    ml: "ML",
    nodejs: "Node.js",
    python: "Python",
    react: "React",
    roi: "ROI",
    ros: "ROS",
    seo: "SEO",
    sql: "SQL",
    tcs: "TCS",
    ui: "UI",
    ux: "UX",
    vfx: "VFX",
    vs: "vs",
    youtube: "YouTube",
  }

  return value
    .split("-")
    .map((word) => replacements[word.toLowerCase()] ?? `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`)
    .join(" ")
}

function parsePageSlug(slug) {
  const parts = slug.split("-")
  const hasYear = parts[parts.length - 1] === "2026" || /^\d{4}$/.test(parts[parts.length - 1])
  const cleanParts = hasYear ? parts.slice(0, -1) : parts

  const intents = ["salary", "jobs", "fees", "syllabus", "scope", "training", "course", "internship"]
  const cities = [
    "lucknow",
    "kanpur",
    "barabanki",
    "unnao",
    "sitapur",
    "rae-bareli",
    "hardoi",
    "ayodhya",
    "sultanpur",
    "lakhimpur-kheri",
    "malihabad",
    "bakshi-ka-talab",
    "mohanlalganj",
    "gonda",
    "bahraich",
    "prayagraj",
    "noida",
    "uttar-pradesh",
  ]

  let detectedIntent = null
  let detectedCity = null
  let courseParts = []

  // Check if any city matches at the end or penultimate
  for (const city of cities) {
    const citySlug = city.replace(/-/g, "-")
    const joined = cleanParts.join("-")
    if (joined.endsWith(`-${citySlug}`)) {
      detectedCity = city
      const beforeCity = joined.slice(0, -(citySlug.length + 1))
      const beforeParts = beforeCity.split("-")
      for (const intent of intents) {
        if (beforeParts[beforeParts.length - 1] === intent) {
          detectedIntent = intent
          courseParts = beforeParts.slice(0, -1)
          break
        }
      }
      if (!detectedIntent) {
        courseParts = beforeParts
      }
      break
    }
  }

  const course = courseParts.length > 0 ? titleCase(courseParts.join("-")) : titleCase(cleanParts.join("-"))
  const city = detectedCity ? titleCase(detectedCity) : "Uttar Pradesh"
  const intent = detectedIntent ?? "Guide"

  return {
    course,
    city,
    intent,
    year: hasYear ? "2026" : "2026",
    isProgrammatic: Boolean(detectedCity && detectedIntent),
  }
}

function generatePageContent(slug, title, parsed) {
  const { course, city, intent, year } = parsed

  if (intent === "salary") {
    return [
      `<p class="lead">Looking for transparent, verified <strong>${course} salary insights in ${city} for ${year}</strong>? techcadd Computer Education Lucknow provides an in-depth breakdown of fresher earnings, experienced packages, top recruiting sectors in Uttar Pradesh, and strategic skill upgrades that accelerate your income growth.</p>`,
      `<h2>${course} Salary Tiers in ${city} & Uttar Pradesh (${year})</h2>`,
      `<p>Salaries for ${course} professionals depend primarily on demonstrable project competence, technical problem-solving capabilities, and portfolio depth rather than pure academic credentials.</p>`,
      `<table class="data-table"><thead><tr><th>Experience Level</th><th>Annual CTC Range</th><th>Primary Job Roles</th><th>Key Technical Skills Demanded</th></tr></thead><tbody>`,
      `<tr><td><strong>Entry-Level / Fresher (0-1 yr)</strong></td><td>₹2.8 LPA – ₹4.8 LPA</td><td>Junior Specialist, Trainee, Associate</td><td>Core fundamentals, hands-on lab projects, Git, problem solving</td></tr>`,
      `<tr><td><strong>Mid-Level Professional (2-4 yrs)</strong></td><td>₹5.5 LPA – ₹9.5 LPA</td><td>Senior Specialist, Module Lead</td><td>Full workflow ownership, production debugging, client communication</td></tr>`,
      `<tr><td><strong>Lead / Senior Architect (5+ yrs)</strong></td><td>₹11.0 LPA – ₹18.0+ LPA</td><td>Lead Consultant, Tech Architect</td><td>System architecture, team mentorship, strategic optimization</td></tr>`,
      `</tbody></table>`,
      `<h2>Key Factors Influencing ${course} Salaries in ${city}</h2>`,
      `<ol>`,
      `<li><strong>Real Production Work:</strong> Candidates with hosted live projects and GitHub repositories command 35-50% higher starting packages than theoretical textbook learners.</li>`,
      `<li><strong>Cross-Functional Modern Tooling:</strong> Combining ${course} with modern AI-assisted workflows and automation dramatically increases your day-one productivity and compensation.</li>`,
      `<li><strong>Placement Network Access:</strong> techcadd Lucknow connects graduates directly to 200+ vetted hiring partners across Lucknow, Kanpur, Noida, Greater Noida, and NCR.</li>`,
      `</ol>`,
      `<h2>Why Learn ${course} at techcadd Lucknow?</h2>`,
      `<p>techcadd Computer Education is Uttar Pradesh's premier ISO 9001:2015 certified IT and professional training institute, situated at Kursi Road, Kapoorthala Chauraha, Lucknow. Learners benefit from:</p>`,
      `<ul>`,
      `<li><strong>High-Performance Dedicated Labs:</strong> Work on high-end workstations with dedicated 1-on-1 trainer guidance.</li>`,
      `<li><strong>100% Dedicated Placement Cell:</strong> Comprehensive resume drafting, Git portfolio reviews, and rigorous mock interview drill sessions.</li>`,
      `<li><strong>0% Interest EMI Plans:</strong> Flexible installment options with zero hidden costs, making top-tier education accessible to every ambitious student.</li>`,
      `</ul>`,
      `<h2>Next Steps for Ambitious Learners</h2>`,
      `<p>Schedule a free 1-on-1 career counselling and demo session with our senior faculty. Call our admissions desk at <strong>+91 91961 80052</strong> or visit our campus at 533/1, Kursi Road, Kapoorthala Chauraha, opp. Central Bank of India, Lucknow.</p>`,
    ].join("\n")
  }

  if (intent === "jobs") {
    return [
      `<p class="lead">Explore verified <strong>${course} job opportunities, hiring companies, and interview standards in ${city} for ${year}</strong>. Learn how techcadd Lucknow equips students and professionals with career-ready portfolios and direct recruitment drives across Uttar Pradesh and the Noida–NCR IT Corridor.</p>`,
      `<h2>Employment Landscape for ${course} in ${city} (${year})</h2>`,
      `<p>With expanding IT exports and digital transformation across Uttar Pradesh, businesses in ${city}, Kanpur, and the Noida/Greater Noida IT hubs actively recruit skilled ${course} practitioners with practical project experience.</p>`,
      `<h2>High-Demand Career Profiles</h2>`,
      `<ul>`,
      `<li><strong>${course} Associate / Executive:</strong> Hands-on operational role focusing on execution, quality assurance, and modular delivery.</li>`,
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

  if (intent === "fees") {
    return [
      `<p class="lead">Looking for transparent, value-driven <strong>${course} course fees and flexible payment options in ${city} for ${year}</strong>? techcadd Computer Education Lucknow offers ISO-certified industrial training with 0% interest EMI options and complete curriculum transparency.</p>`,
      `<h2>Fee Structure & Financial Flexibility</h2>`,
      `<p>At techcadd Lucknow, fee structures are designed to provide maximum return on investment (ROI). Course fees range depending on program duration (6-week fast-track, 3-month professional, or 6-month comprehensive industrial diploma).</p>`,
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

  if (intent === "syllabus") {
    return [
      `<p class="lead">Explore the comprehensive, industry-reviewed <strong>${course} syllabus and practical curriculum in ${city} for ${year}</strong>. Formulated in consultation with senior tech leaders, this course takes you from foundational concepts to advanced production architecture.</p>`,
      `<h2>Curriculum Roadmap & Module Breakdown</h2>`,
      `<p>The curriculum emphasizes 80% practical lab implementation and 20% theory, ensuring every student graduates with deployable skills.</p>`,
      `<h3>Module 1: Foundations & Environment Setup</h3>`,
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

  if (intent === "scope") {
    return [
      `<p class="lead">Discover the future <strong>career scope, market demand, and long-term opportunities for ${course} in ${city} and across Uttar Pradesh for ${year}</strong>. Understand how rapid technological adoption is creating high-growth career tracks for prepared specialists.</p>`,
      `<h2>Market Scope & Growth Projections</h2>`,
      `<p>The requirement for skilled ${course} practitioners continues to accelerate across Uttar Pradesh's educational, manufacturing, healthcare, and IT export sectors. Organizations are prioritizing candidates with demonstrated practical skills over purely theoretical qualifications.</p>`,
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

  // General Page fallback
  return [
    `<p class="lead">Welcome to the official <strong>${title}</strong> guide provided by techcadd Computer Education Lucknow. We deliver premier skill development, professional certifications, and career transformation across Uttar Pradesh.</p>`,
    `<h2>Overview & Industry Significance</h2>`,
    `<p>Mastering modern digital and technological skills is essential for building a resilient, high-paying career. This guide outlines the key competencies, learning milestones, and real-world applications associated with ${title}.</p>`,
    `<h2>Why Uttar Pradesh Students & Professionals Choose techcadd Lucknow</h2>`,
    `<ul>`,
    `<li><strong>ISO 9001:2015 Certified Excellence:</strong> Standardized curriculum, modern pedagogy, and globally recognized certificates.</li>`,
    `<li><strong>100% Practical Hands-on Learning:</strong> Real client case studies, live project repositories, and daily lab drills.</li>`,
    `<li><strong>Strategic Campus Location:</strong> Situated at Kursi Road, Kapoorthala Chauraha, Lucknow, within easy reach of bus and rail networks.</li>`,
    `<li><strong>Active Placement Support:</strong> Dedicated career desk providing interview referrals to 200+ partner companies in Uttar Pradesh and the Noida–NCR IT Corridor.</li>`,
    `</ul>`,
    `<h2>Get in Touch with our Academic Counsellors</h2>`,
    `<p>Ready to upgrade your skillset? Contact techcadd Computer Education at <strong>+91 91961 80052</strong> or visit us at 533/1, Kursi Road, Kapoorthala Chauraha, opp. Central Bank of India, Lucknow, Uttar Pradesh 144001.</p>`,
  ].join("\n")
}

function metaDescriptionFor(title, parsed) {
  const { course, city, intent, year } = parsed
  if (intent === "salary") {
    return `Explore verified ${course} salary benchmarks in ${city} for ${year}. Compare fresher to senior CTC, hiring sectors, and career growth at techcadd Lucknow.`
  }
  if (intent === "jobs") {
    return `Discover latest ${course} jobs and vacancies in ${city} for ${year}. Explore top recruiters, interview requirements, and placement support at techcadd Lucknow.`
  }
  if (intent === "fees") {
    return `Check transparent ${course} course fees in ${city} for ${year}. Learn about duration, 0% EMI options, syllabus, and ISO certification at techcadd Lucknow.`
  }
  if (intent === "syllabus") {
    return `Review the detailed 2026 ${course} syllabus in ${city}. Hands-on modules, live industrial projects, and professional certification at techcadd Lucknow.`
  }
  if (intent === "scope") {
    return `Understand the market scope and career potential of ${course} in ${city} for ${year}. High-demand career tracks and placement assistance by techcadd Lucknow.`
  }
  return `Comprehensive ${title} guide for students and working professionals in Lucknow and across Uttar Pradesh. Powered by techcadd Computer Education.`
}

const SITE_URL = (process.env.SITE_URL ?? "https://techcaddlucknow.com").replace(/\/$/, "")

const db = await mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "techcadd_cms_lucknow",
})

console.log(`Connected to database: ${process.env.DB_NAME ?? "techcadd_cms_lucknow"}`)

const [existingRows] = await db.query("SELECT slug FROM pages")
const existing = new Set(existingRows.map((row) => row.slug))
let created = 0
let skipped = 0

for (const slug of pageSlugs) {
  if (existing.has(slug)) {
    skipped += 1
    continue
  }

  const parsed = parsePageSlug(slug)
  const title = titleCase(slug)
  const content = generatePageContent(slug, title, parsed)
  const metaTitle = `${title} | techcadd Lucknow`.slice(0, 120)
  const metaDescription = metaDescriptionFor(title, parsed).slice(0, 250)
  const metaKeywords = JSON.stringify([
    parsed.course,
    parsed.city,
    "techcadd Lucknow",
    "Uttar Pradesh IT Careers",
    parsed.intent,
    "2026",
  ])
  const status = publish ? "published" : "draft"
  const publishDate = publish ? "2026-09-26" : null
  const navLabel = title.length > 50 ? `${parsed.course} ${parsed.intent}`.slice(0, 80) : title

  if (dryRun) {
    console.log(`[DRY RUN] Would create page: ${slug} (${title}) [${status}]`)
    created += 1
    continue
  }

  await db.execute(
    `INSERT INTO pages
      (id, title, slug, template, nav_placement, nav_label, nav_order, content,
       publish_date, status, is_system, meta_title, meta_description, meta_keywords,
       og_image_id, canonical_url, created_at, updated_at)
     VALUES (?, ?, ?, 'default', 'none', ?, 0, ?, ?, ?, 0, ?, ?, ?, NULL, ?, NOW(3), NOW(3))`,
    [
      randomUUID(),
      title,
      slug,
      navLabel,
      content,
      publishDate,
      status,
      metaTitle,
      metaDescription,
      metaKeywords,
      `${SITE_URL}/${slug}`,
    ],
  )

  created += 1
}

await db.end()
console.log(`Page import complete: ${created} created, ${skipped} already existed, ${pageSlugs.length} sitemap URLs evaluated.`)
console.log(`Records are saved as: ${publish ? "PUBLISHED" : "DRAFTS (review in CMS)"}.`)
