// The site header, with the CMS's courses and menu pages added to the bundled
// menus. The header itself is a Client Component (HeaderClient.tsx); this
// server wrapper loads what the CMS adds so every page gets it without asking.
import { getNavPages } from "@/lib/cms/content";
import { getMenuCourses } from "@/lib/cms/courses";
import { HeaderClient } from "./HeaderClient";

export { TopBar } from "./HeaderClient";

export async function Header() {
  const [courses, navPages] = await Promise.all([getMenuCourses(), getNavPages()]);
  const pages = navPages.filter((p) => p.placement === "header").map((p) => ({ label: p.label, href: `/${p.slug}` }));
  return <HeaderClient menus={{ courses, pages }} />;
}
