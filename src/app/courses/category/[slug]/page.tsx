// A course category from the CMS and its courses, at /courses/category/<slug>
// — the address the CMS shows editors for a category.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, PageShell } from "@/components/PageShell";
import { CourseCardItem } from "@/components/cms/HomeSections";
import { LightSection } from "@/components/ui";
import { categoryHref, getCategories, getCategoryPage } from "@/lib/cms/courses";
import { seoMetadata } from "@/lib/cms/seo";
import { site } from "@/lib/site";

// Built ahead of time, so an unknown category gets a real 404.
export const ensureStatic = "navigation";
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

// Cache Components needs at least one param, so an empty CMS yields a placeholder that 404s.
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.length ? categories.map((c) => ({ slug: c.slug })) : [{ slug: "__placeholder__" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getCategoryPage((await params).slug);
  if (!data) return {};
  return seoMetadata({
    title: `${data.category.name} Courses in ${site.city} | ${site.name}`,
    description: data.category.description,
    path: categoryHref(data.category.slug),
  });
}

export default async function CategoryPage({ params }: Props) {
  const data = await getCategoryPage((await params).slug);
  if (!data) notFound();
  const { category, courses } = data;

  return (
    <PageShell>
      <PageHero
        eyebrow="Course category"
        title={category.name}
        text={category.description}
        crumbs={[{ label: "Courses", href: "/courses" }, { label: category.name }]}
      />
      <LightSection>
        {courses.length ? (
          <ul className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <li key={c.href}>
                <CourseCardItem course={c} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-slate-600">Courses in this category will be listed here soon.</p>
        )}
      </LightSection>
    </PageShell>
  );
}
