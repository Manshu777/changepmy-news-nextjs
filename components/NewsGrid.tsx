"use client";

import type { NewsArticle } from "@/types/news";
import NewsCard from "./NewsCard";
import SkeletonCard from "./SkeletonCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { paginateArticles } from "@/lib/filters";

interface NewsGridProps {
  articles: NewsArticle[];
}

export default function NewsGrid({ articles }: NewsGridProps) {
  const { page, isLoading, hasMore, sentinelRef } = useInfiniteScroll(
    articles.length,
    8
  );

  const displayedArticles = paginateArticles(articles, page, 8);

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[20px] bg-white py-16 text-center shadow-md">
        <p className="text-lg font-medium text-slate-600">
          No articles found
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Try adjusting your search or category filter
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Latest News
        </h2>
        <span className="text-sm text-slate-500">
          {articles.length} articles
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {displayedArticles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {isLoading &&
            Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
        </div>
      )}
    </section>
  );
}
