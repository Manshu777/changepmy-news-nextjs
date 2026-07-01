"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NewsArticle } from "@/types/news";
import { formatRelativeDate } from "@/lib/utils";
import StoryListItem from "./StoryListItem";

interface TopStoriesSectionProps {
  articles: NewsArticle[];
}

export default function TopStoriesSection({ articles }: TopStoriesSectionProps) {
  const [expanded, setExpanded] = useState(false);

  if (articles.length === 0) return null;

  const featured = articles[0];
  const sideStories = articles.slice(1, 4);
  const gridStories = articles.slice(4, expanded ? articles.length : 16);
  const hasMore = articles.length > 16;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-medium text-slate-500">Top stories</h2>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Link
          href={`/article/${featured.id}`}
          className="group flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 sm:aspect-auto sm:h-44 sm:w-56 sm:shrink-0">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 224px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary sm:text-xl">
              {featured.title}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {featured.author} · {formatRelativeDate(featured.publishedAt)}
            </p>
          </div>
        </Link>

        <div className="divide-y divide-slate-100">
          {sideStories.map((article) => (
            <StoryListItem
              key={article.id}
              article={article}
              showImage={false}
              size="sm"
            />
          ))}
        </div>
      </div>

      {gridStories.length > 0 && (
        <div className="mt-4 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridStories.map((article, index) => (
            <div
              key={article.id}
              className={index >= 3 ? "border-t border-slate-100 sm:border-t-0" : ""}
            >
              <StoryListItem
                article={article}
                showImage={index % 3 !== 2}
                size="sm"
              />
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 w-full rounded-full border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          {expanded
            ? "Show less"
            : "See more headlines and perspectives →"}
        </button>
      )}
    </section>
  );
}
