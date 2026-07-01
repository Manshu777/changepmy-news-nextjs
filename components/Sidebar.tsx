"use client";

import Image from "next/image";
import type { NewsArticle } from "@/types/news";
import { formatRelativeDate } from "@/lib/utils";
import WeatherWidget from "./WeatherWidget";

interface SidebarProps {
  localNews: NewsArticle[];
  picksForYou: NewsArticle[];
}

export default function Sidebar({ localNews, picksForYou }: SidebarProps) {
  return (
    <aside className="space-y-4">
      <WeatherWidget />

      {localNews.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-medium text-slate-500">Local news</h3>
          <a href="#" className="group flex gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug text-slate-900 transition-colors group-hover:text-primary">
                {localNews[0].title}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {localNews[0].author} · {formatRelativeDate(localNews[0].publishedAt)}
              </p>
            </div>
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={localNews[0].image}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          </a>
        </div>
      )}

      {picksForYou.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-sm font-medium text-slate-500">
            Picks for you
          </h3>
          <ul className="divide-y divide-slate-100">
            {picksForYou.slice(0, 4).map((article) => (
              <li key={article.id}>
                <a href="#" className="group flex gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-slate-900 transition-colors group-hover:text-primary">
                      {article.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {article.author} · {formatRelativeDate(article.publishedAt)}
                    </p>
                  </div>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
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
      )}
    </aside>
  );
}
