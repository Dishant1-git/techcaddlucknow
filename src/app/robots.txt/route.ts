// /robots.txt: the text an editor wrote in CMS SEO → Robots.txt, served as is.
// Without one, everything may be crawled. A Sitemap line is added when the
// editor's text has none, so crawlers always find /sitemap.xml.
import { absoluteUrl } from "@/lib/cms/seo";
import { getSite } from "@/lib/cms/site";

export async function GET() {
  const site = await getSite();
  let body = site.robotsTxt?.trim() || "User-agent: *\nAllow: /";
  if (!/^sitemap:/im.test(body)) body += `\n\nSitemap: ${absoluteUrl("/sitemap.xml")}`;
  return new Response(`${body}\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
