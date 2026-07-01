"use client";

import { TrendingUp } from "lucide-react";
import type { NewsArticle } from "@/types/news";
import NewsCard from "./NewsCard";

interface TrendingSectionProps {
  articles: NewsArticle[];
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100">
          <TrendingUp className="h-4 w-4 text-orange-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Trending Now
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {articles.map((article, index) => (
          <NewsCard
            key={article.id}
            article={article}
            index={index}
            variant="horizontal"
          />
        ))}
      </div>
    </section>
  );
}
