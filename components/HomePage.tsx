"use client";

import { useMemo, useState } from "react";
import type { NewsArticle, NewsCategory } from "@/types/news";
import {
  filterBySearch,
  getArticlesByCategoryFromList,
  getEditorPicks,
  getPopularArticles,
  getTopStories,
} from "@/lib/filters";
import { CATEGORIES } from "@/lib/news";
import { useDebounce } from "@/hooks/useDebounce";
import Header from "./Header";
import BriefingHeader from "./BriefingHeader";
import TopStoriesSection from "./TopStoriesSection";
import CategoryBlock from "./CategoryBlock";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";

interface HomePageProps {
  articles: NewsArticle[];
}

export default function HomePage({ articles }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredArticles = useMemo(
    () => filterBySearch(articles, debouncedSearch),
    [articles, debouncedSearch]
  );

  const topStories = useMemo(
    () => getTopStories(filteredArticles),
    [filteredArticles]
  );

  const localNews = useMemo(
    () => filteredArticles.filter((a) => a.category === "India"),
    [filteredArticles]
  );

  const picksForYou = useMemo(
    () => getEditorPicks(filteredArticles),
    [filteredArticles]
  );

  const popular = useMemo(
    () => getPopularArticles(filteredArticles),
    [filteredArticles]
  );

  const categorySections = useMemo(() => {
    return CATEGORIES.map((category) => ({
      category,
      articles: getArticlesByCategoryFromList(filteredArticles, category),
    })).filter((s) => s.articles.length > 0);
  }, [filteredArticles]);

  return (
    <>
      <ScrollProgress />
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-6xl px-4 py-6 lg:px-6">
        {!debouncedSearch && <BriefingHeader />}

        {debouncedSearch && (
          <div className="mb-6">
            <h1 className="text-xl font-medium text-slate-900">
              Results for &ldquo;{debouncedSearch}&rdquo;
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {filteredArticles.length} articles found
            </p>
          </div>
        )}

        {filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-lg font-medium text-slate-600">No articles found</p>
            <p className="mt-1 text-sm text-slate-400">Try a different search term</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
              <TopStoriesSection articles={topStories} />
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Sidebar
                  localNews={localNews}
                  picksForYou={picksForYou}
                  popular={popular}
                />
              </div>
            </div>

            {!debouncedSearch && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {categorySections.map(({ category, articles: catArticles }) => (
                  <CategoryBlock
                    key={category}
                    category={category as NewsCategory}
                    articles={catArticles}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
