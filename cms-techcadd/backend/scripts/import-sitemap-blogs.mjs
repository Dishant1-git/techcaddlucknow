import mysql from "mysql2/promise"
import { randomUUID } from "node:crypto"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const sitemapPath = resolve(process.argv[2] ?? "sitemap.xml")
const publish = process.env.PUBLISH_BLOGS === "1"
const source = readFileSync(sitemapPath, "utf8")
const slugs = [...source.matchAll(/<loc>https:\/\/mitsacademy\.in\/blog\/([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((slug, index, all) => all.indexOf(slug) === index)

if (slugs.length === 0) {
  throw new Error(`No blog URLs found in ${sitemapPath}`)
}

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
    cgc: "CGC",
    cpp: "C++",
    css: "CSS",
    dsa: "DSA",
    faq: "FAQ",
    gndu: "GNDU",
    gst: "GST",
    html: "HTML",
    india: "India",
    it: "IT",
    java: "Java",
    javascript: "JavaScript",
    llms: "LLMs",
    mern: "MERN",
    ml: "ML",
    nodejs: "Node.js",
    python: "Python",
    react: "React",
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
    .map((word) => replacements[word] ?? `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`)
    .join(" ")
    .replace(/\b2026\b/g, "2026")
}

function topicFromSlug(slug) {
  return titleCase(slug.replace(/-\d{4}$/, "").replace(/-2026$/, ""))
}

function categoryFor(slug) {
  if (/digital-marketing|seo|social-media|google-ads|instagram|youtube|email-marketing|content-writing|affiliate|influencer|whatsapp/.test(slug)) {
    return "Digital Marketing"
  }
  if (/ai|ml|machine-learning|genai|prompt|llm|robotics|gemini|azure-ai/.test(slug)) {
    return "AI and Machine Learning"
  }
  if (/data|power-bi|tableau|excel|sql/.test(slug)) return "Data and Analytics"
  if (/cyber|ethical-hacking|security|kali/.test(slug)) return "Cybersecurity"
  if (/graphic|design|animation|vfx|illustrator|premiere|after-effects|blender|maya|game-art|ui-ux/.test(slug)) {
    return "Design and Creative Technology"
  }
  if (/python|java|cpp|c-programming|react|nodejs|mern|full-stack|web-development|app-development|programming|dsa/.test(slug)) {
    return "Programming and Development"
  }
  if (/aws|cloud|azure/.test(slug)) return "Cloud Computing"
  if (/tally|busy|gst-accounting|accounting/.test(slug)) return "Accounting and Office Skills"
  return "IT Careers and Courses"
}

function tagsFor(slug, category) {
  const tags = new Set([category, "techcadd Lucknow", "Uttar Pradesh IT Careers"])
  for (const word of slug.split("-")) {
    if (["python", "java", "javascript", "react", "mern", "aws", "seo", "sql", "excel", "tally", "robotics"].includes(word)) {
      tags.add(titleCase(word))
    }
  }
  return [...tags].slice(0, 6)
}

function articleFor(slug, title, category) {
  const topic = topicFromSlug(slug)
  return [
    `<p>Choosing the right direction in ${topic} starts with understanding the skills, learning sequence, practical work and career expectations involved. This guide explains the topic in clear terms for students, graduates and working professionals in Lucknow and across Uttar Pradesh.</p>`,
    `<h2>What is ${topic}?</h2>`,
    `<p>${topic} combines foundational concepts with practical tools used in modern education and industry. A useful learning plan should move from basics to guided practice, then to portfolio projects that demonstrate what you can actually do.</p>`,
    `<h2>Who should consider this path?</h2>`,
    `<p>This topic can suit learners after Class 12, college students, graduates changing careers and professionals who want a focused skill upgrade. Your starting point matters: beginners need stronger fundamentals, while experienced learners can spend more time on projects and interview preparation.</p>`,
    `<h2>Skills to learn step by step</h2>`,
    `<ol><li>Understand the core terminology and workflow.</li><li>Learn the tools used for everyday tasks.</li><li>Practice with small exercises before attempting a complete project.</li><li>Build two or three portfolio pieces based on realistic requirements.</li><li>Improve communication, documentation and interview readiness alongside technical skills.</li></ol>`,
    `<h2>How to choose a course</h2>`,
    `<p>Compare the syllabus, trainer support, practice hours, project work, class size, assessment method and post-course guidance. A course should explain what you will build and how progress will be measured, not only list software names or promise a job without conditions.</p>`,
    `<h2>Career preparation in Uttar Pradesh</h2>`,
    `<p>Lucknow learners can combine classroom training with local business projects, internships, freelance work and applications to companies in Lucknow, Kanpur, Noida, Greater Noida and remote teams. Keep a current resume, a public portfolio and a record of the problems your projects solve.</p>`,
    `<h2>Why practical learning matters</h2>`,
    `<p>Reading about ${topic} is useful, but repetition builds confidence. Work through a brief, create a first version, review the result, fix errors and explain your decisions. That cycle is more valuable than collecting certificates without demonstrable work.</p>`,
    `<h2>Conclusion</h2>`,
    `<p>${title} should be treated as a starting point for a structured learning plan. techcadd Lucknow can help you compare suitable training options, understand the expected prerequisites and plan projects around your career goal. Speak with an advisor before enrolling so the course, duration and support model are clear.</p>`,
  ].join("\n")
}

function excerptFor(title, category) {
  return `A practical ${category.toLowerCase()} guide for students and professionals in Lucknow and Uttar Pradesh. Learn the skills, course-selection factors, projects and career steps related to ${title}.`
}

const SITE_URL = (process.env.SITE_URL ?? "https://techcaddlucknow.com").replace(/\/$/, "")

const db = await mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "techcadd_cms_lucknow",
})

const [existingRows] = await db.query("SELECT slug FROM blogs")
const existing = new Set(existingRows.map((row) => row.slug))
let created = 0
let skipped = 0

for (const slug of slugs) {
  if (existing.has(slug)) {
    skipped += 1
    continue
  }

  const title = titleCase(slug)
  const category = categoryFor(slug)
  const tags = JSON.stringify(tagsFor(slug, category))
  const body = articleFor(slug, title, category)
  const excerpt = excerptFor(title, category)
  const metaTitle = `${title} | techcadd Lucknow`.slice(0, 120)
  const metaDescription = excerpt.slice(0, 160)
  const status = publish ? "published" : "draft"
  const publishDate = publish ? "2026-09-26" : null

  await db.execute(
    `INSERT INTO blogs
      (id, title, slug, author_id, category_id, cover_image_id, excerpt, body,
       publish_date, status, meta_title, meta_description, meta_keywords,
       og_image_id, canonical_url, created_at, updated_at)
     VALUES (?, ?, ?, NULL, NULL, NULL, ?, ?, ?, ?, ?, ?, ?, NULL, ?, NOW(3), NOW(3))`,
    [
      randomUUID(),
      title,
      slug,
      excerpt,
      body,
      publishDate,
      status,
      metaTitle,
      metaDescription,
      tags,
      `${SITE_URL}/tech-blog-of-lucknow/${slug}`,
    ],
  )

  created += 1
}

await db.end()
console.log(`Blog import complete: ${created} created, ${skipped} already existed, ${slugs.length} sitemap URLs processed.`)
console.log(`New records are ${publish ? "published" : "drafts"}.`)
