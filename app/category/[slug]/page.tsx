import { notFound } from "next/navigation";
import {
  getArticlesByCategory,
  slugToCategory,
  CATEGORIES,
  categoryToSlug,
} from "@/lib/news";
import CategoryDetail from "@/components/CategoryDetail";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: categoryToSlug(category),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slugToCategory(slug);
  if (!category) return { title: "Category" };

  return {
    title: category,
    description: `Latest ${category} news on NEWSLY`,
  };
}

export default async function CategorySlugPage({ params }: PageProps) {
  const { slug } = await params;
  const category = slugToCategory(slug);

  if (!category) notFound();

  const articles = await getArticlesByCategory(category);

  return <CategoryDetail category={category} articles={articles} />;
}
