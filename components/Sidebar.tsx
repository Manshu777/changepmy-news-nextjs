"use client";

import Image from "next/image";
import { Flame, Hash, Star, Trophy } from "lucide-react";
import type { NewsArticle } from "@/types/news";
import { formatRelativeDate } from "@/lib/utils";
import NewsletterCard from "./NewsletterCard";
import WeatherWidget from "./WeatherWidget";

interface SidebarProps {
  topStories: NewsArticle[];
  popular: NewsArticle[];
  editorPicks: NewsArticle[];
  trendingTags: string[];
}

function SidebarList({
  title,
  articles,
  icon,
}: {
  title: string;
  articles: NewsArticle[];
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-md shadow-slate-200/50">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          {title}
        </h3>
      </div>
      <ul className="space-y-4">
        {articles.slice(0, 5).map((article, index) => (
          <li key={article.id}>
            <a href="#" className="group flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium leading-snug text-slate-800 transition-colors group-hover:text-primary">
                  {article.title}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {formatRelativeDate(article.publishedAt)}
                </p>
              </div>
              <div className="relative hidden h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:block">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sidebar({
  topStories,
  popular,
  editorPicks,
  trendingTags,
}: SidebarProps) {
  return (
    <aside className="space-y-6">
      <SidebarList
        title="Top Stories"
        articles={topStories}
        icon={<Trophy className="h-4 w-4 text-amber-500" />}
      />

      <SidebarList
        title="Popular"
        articles={popular}
        icon={<Flame className="h-4 w-4 text-orange-500" />}
      />

      <SidebarList
        title="Editor's Picks"
        articles={editorPicks}
        icon={<Star className="h-4 w-4 text-primary" />}
      />

      <div className="rounded-[20px] bg-white p-5 shadow-md shadow-slate-200/50">
        <div className="mb-4 flex items-center gap-2">
          <Hash className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Trending Tags
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <span
              key={tag}
              className="cursor-pointer rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-primary hover:text-white"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <NewsletterCard />
      <WeatherWidget />
    </aside>
  );
}
