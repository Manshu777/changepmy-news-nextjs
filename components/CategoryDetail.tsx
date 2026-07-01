"use client";

import Link from "next/link";
import type { NewsArticle, NewsCategory } from "@/types/news";
import { CATEGORIES, categoryToSlug } from "@/lib/news";
import Header from "./Header";
import Footer from "./Footer";
import StoryListItem from "./StoryListItem";
import BackToTop from "./BackToTop";
import { cn } from "@/lib/utils";

interface CategoryDetailProps {
  category: NewsCategory;
  articles: NewsArticle[];
}

export default function CategoryDetail({
  category,
  articles,
}: CategoryDetailProps) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 lg:px-6">
        <h1 className="mb-4 text-2xl font-normal text-slate-900">{category}</h1>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/category/${categoryToSlug(cat)}`}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                cat === category
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="mb-4 text-sm text-slate-500">
            {articles.length} stories in {category}
          </p>
          <div className="grid gap-x-6 sm:grid-cols-2">
            {articles.map((article) => (
              <StoryListItem key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
