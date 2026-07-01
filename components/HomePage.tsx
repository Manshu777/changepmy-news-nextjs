"use client";

import { useMemo, useState } from "react";
import type { NewsArticle, NewsTab } from "@/types/news";
import {
  filterByCategory,
  filterBySearch,
  getBreakingNews,
  getEditorPicks,
  getFeaturedArticle,
  getPopularArticles,
  getTopStories,
  getTrendingArticles,
  getTrendingTags,
} from "@/lib/filters";
import { useDebounce } from "@/hooks/useDebounce";
import Header from "./Header";
import CategoryTabs from "./CategoryTabs";
import BreakingNews from "./BreakingNews";
import HeroSection from "./HeroSection";
import TrendingSection from "./TrendingSection";
import NewsGrid from "./NewsGrid";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import MobileBottomNav from "./MobileBottomNav";

interface HomePageProps {
  articles: NewsArticle[];
}

export default function HomePage({ articles }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState<NewsTab>("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredArticles = useMemo(() => {
    let result = filterByCategory(articles, activeCategory);
    result = filterBySearch(result, debouncedSearch);
    return result.filter((a) => !a.featured);
  }, [articles, activeCategory, debouncedSearch]);

  const featured = useMemo(() => getFeaturedArticle(articles), [articles]);
  const breaking = useMemo(() => getBreakingNews(articles), [articles]);
  const trending = useMemo(() => getTrendingArticles(articles), [articles]);
  const topStories = useMemo(() => getTopStories(articles), [articles]);
  const popular = useMemo(() => getPopularArticles(articles), [articles]);
  const editorPicks = useMemo(() => getEditorPicks(articles), [articles]);
  const trendingTags = useMemo(() => getTrendingTags(articles), [articles]);

  return (
    <>
      <ScrollProgress />
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <BreakingNews articles={breaking} />
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 lg:px-6 lg:pb-12">
        {featured && !debouncedSearch && activeCategory === "Latest" && (
          <div className="mb-10">
            <HeroSection article={featured} />
          </div>
        )}

        {!debouncedSearch && activeCategory === "Latest" && (
          <TrendingSection articles={trending} />
        )}

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="min-w-0 flex-1">
            <NewsGrid articles={filteredArticles} />
          </div>

          <div className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-36">
              <Sidebar
                topStories={topStories}
                popular={popular}
                editorPicks={editorPicks}
                trendingTags={trendingTags}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
      <MobileBottomNav />
    </>
  );
}
