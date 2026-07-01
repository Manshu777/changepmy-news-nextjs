import { getNews } from "@/lib/news";
import ArticlesList from "@/components/ArticlesList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse all news articles on NEWSLY",
};

export default async function ArticlePage() {
  const articles = await getNews();

  const sorted = [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return <ArticlesList articles={sorted} />;
}
