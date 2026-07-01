"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { NewsTab } from "@/types/news";
import { cn } from "@/lib/utils";

const CATEGORIES: NewsTab[] = [
  "Latest",
  "India",
  "World",
  "Technology",
  "AI",
  "Business",
  "Startup",
  "Sports",
  "Entertainment",
  "Science",
  "Health",
];

interface CategoryTabsProps {
  activeCategory: NewsTab;
  onCategoryChange: (category: NewsTab) => void;
}

export default function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-[73px] z-40 border-b border-slate-200/60 bg-background/80 backdrop-blur-lg">
      <div
        ref={scrollRef}
        className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 scrollbar-hide lg:px-6"
      >
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category
                ? "text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/25"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
