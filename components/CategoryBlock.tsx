"use client";

import Link from "next/link";
import Image from "next/image";
import type { NewsArticle, NewsCategory } from "@/types/news";
import { categoryToSlug } from "@/lib/news";
import { formatRelativeDate } from "@/lib/utils";
import StoryListItem from "./StoryListItem";

interface CategoryBlockProps {
  category: NewsCategory;
  articles: NewsArticle[];
}

export default function CategoryBlock({
  category,
  articles,
}: CategoryBlockProps) {
  if (articles.length === 0) return null;

  const featured = articles[0];
  const rest = articles.slice(1, 5);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/category/${categoryToSlug(category)}`}
          className="text-sm font-medium text-slate-900 hover:text-primary"
        >
          {category}
        </Link>
        <Link
          href={`/category/${categoryToSlug(category)}`}
          className="text-xs text-primary hover:underline"
        >
          Full coverage →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href={`/article/${featured.id}`}
          className="group flex gap-3 sm:col-span-2"
        >
          <div className="relative h-32 w-44 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="176px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-primary">
              {featured.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {featured.author} · {formatRelativeDate(featured.publishedAt)}
            </p>
          </div>
        </Link>

        {rest.map((article) => (
          <StoryListItem key={article.id} article={article} size="sm" />
        ))}
      </div>
    </section>
  );
}
