"use client";

import { AlertCircle } from "lucide-react";
import type { NewsArticle } from "@/types/news";

interface BreakingNewsProps {
  articles: NewsArticle[];
}

export default function BreakingNews({ articles }: BreakingNewsProps) {
  if (articles.length === 0) return null;

  const headlines = articles.map((a) => a.title);
  const tickerContent = [...headlines, ...headlines];

  return (
    <div className="border-b border-red-100 bg-red-50">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-hidden px-4 py-2.5 lg:px-6">
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          <AlertCircle className="h-3 w-3" />
          Breaking
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="animate-ticker flex whitespace-nowrap">
            {tickerContent.map((headline, i) => (
              <span
                key={i}
                className="mx-8 text-sm font-medium text-red-800"
              >
                {headline}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
