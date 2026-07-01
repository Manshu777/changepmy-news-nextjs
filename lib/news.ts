import newsData from "@/data/news.json";
import type { NewsArticle, NewsCategory } from "@/types/news";

export async function getNews(): Promise<NewsArticle[]> {
  return newsData as NewsArticle[];
}

export async function getArticleById(
  id: number
): Promise<NewsArticle | undefined> {
  const news = await getNews();
  return news.find((article) => article.id === id);
}

export async function getArticlesByCategory(
  category: NewsCategory
): Promise<NewsArticle[]> {
  const news = await getNews();
  return news
    .filter((article) => article.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export const CATEGORIES: NewsCategory[] = [
  "India",
  "World",
  "Technology",
  "AI",
  "Business",
  "Startup",
  "Sports",
  "Entertainment",
  "Science",
  "Health",
];

export function categoryToSlug(category: NewsCategory): string {
  return category.toLowerCase();
}

export function slugToCategory(slug: string): NewsCategory | undefined {
  return CATEGORIES.find((c) => categoryToSlug(c) === slug.toLowerCase());
}
