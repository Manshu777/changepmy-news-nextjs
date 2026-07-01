"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bookmark, Clock } from "lucide-react";
import type { NewsArticle } from "@/types/news";
import { formatRelativeDate } from "@/lib/utils";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
  variant?: "grid" | "horizontal";
}

export default function NewsCard({
  article,
  index = 0,
  variant = "grid",
}: NewsCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  if (variant === "horizontal") {
    return (
      <motion.article
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-[20px] bg-white shadow-md shadow-slate-200/50 transition-shadow hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="288px"
          />
          <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {article.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 group-hover:text-primary">
            {article.title}
          </h3>
          <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
            <span>{article.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime}
            </span>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-md shadow-slate-200/50 transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {article.category}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(article.id);
          }}
          className={cn(
            "absolute right-3 top-3 rounded-full p-2 backdrop-blur-sm transition-all",
            bookmarked
              ? "bg-primary text-white"
              : "bg-white/80 text-slate-600 hover:bg-white"
          )}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
          {article.description}
        </p>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span className="font-medium">{article.author}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
              <Clock className="h-3 w-3" />
              {article.readingTime}
            </span>
            <span>{formatRelativeDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
