import newsData from "@/data/news.json";
import type { NewsArticle } from "@/types/news";

export async function getNews(): Promise<NewsArticle[]> {
  return newsData as NewsArticle[];
}
