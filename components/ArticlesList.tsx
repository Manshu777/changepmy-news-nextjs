"use client";

import Link from "next/link";
import Image from "next/image";
import type { NewsArticle } from "@/types/news";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

interface ArticlesListProps {
  articles: NewsArticle[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 lg:px-6">
        <h1 className="mb-1 text-2xl font-normal text-slate-900">All Articles</h1>
        <p className="mb-6 text-sm text-slate-500">
          {articles.length} stories from NEWSLY
        </p>

        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
            >
              <div className="relative hidden h-28 w-40 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:block">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="160px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {article.category}
                </span>
                <h2 className="mt-1 text-lg font-semibold leading-snug text-slate-900 group-hover:text-primary">
                  {article.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {article.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span>{article.author}</span>
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>{article.readingTime} read</span>
                  <span>{formatRelativeDate(article.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
