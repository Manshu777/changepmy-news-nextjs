import type { NewsArticle, NewsCategory, NewsTab } from "@/types/news";

export function filterByCategory(
  articles: NewsArticle[],
  category: NewsTab
): NewsArticle[] {
  if (category === "Latest") return articles;
  return articles.filter((article) => article.category === category);
}

export function filterBySearch(
  articles: NewsArticle[],
  query: string
): NewsArticle[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return articles;

  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(normalized) ||
      article.description.toLowerCase().includes(normalized) ||
      article.author.toLowerCase().includes(normalized) ||
      article.category.toLowerCase().includes(normalized)
  );
}

export function getBreakingNews(articles: NewsArticle[]): NewsArticle[] {
  return articles.filter((article) => article.breaking);
}

export function getFeaturedArticle(
  articles: NewsArticle[]
): NewsArticle | undefined {
  return articles.find((article) => article.featured);
}

export function getTrendingArticles(articles: NewsArticle[]): NewsArticle[] {
  return articles.filter((article) => article.trending);
}

export function getPopularArticles(articles: NewsArticle[]): NewsArticle[] {
  return articles.filter((article) => article.popular);
}

export function getEditorPicks(articles: NewsArticle[]): NewsArticle[] {
  return articles.filter((article) => article.editorPick);
}

export function getTopStories(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByCategoryFromList(
  articles: NewsArticle[],
  category: NewsCategory
): NewsArticle[] {
  return articles
    .filter((article) => article.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getTrendingTags(articles: NewsArticle[]): string[] {
  const tagCounts = articles.reduce<Record<string, number>>((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag);
}

export function paginateArticles(
  articles: NewsArticle[],
  page: number,
  perPage: number
): NewsArticle[] {
  return articles.slice(0, page * perPage);
}
