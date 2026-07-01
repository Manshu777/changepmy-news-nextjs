import { getNews, CATEGORIES } from "@/lib/news";
import CategoryIndex from "@/components/CategoryIndex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse news by category on NEWSLY",
};

export default async function CategoryPage() {
  const articles = await getNews();

  const categories = CATEGORIES.map((name) => {
    const catArticles = articles.filter((a) => a.category === name);
    return {
      name,
      count: catArticles.length,
      image: catArticles[0]?.image ?? "/images/news1.jpg",
    };
  }).filter((c) => c.count > 0);

  return <CategoryIndex categories={categories} />;
}
