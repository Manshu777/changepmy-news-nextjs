"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const BOOKMARKS_KEY = "newsly-bookmarks";

interface BookmarksContextValue {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {
      setBookmarks([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks, hydrated]);

  const toggleBookmark = useCallback((id: number) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }, []);

  const isBookmarked = useCallback(
    (id: number) => bookmarks.includes(id),
    [bookmarks]
  );

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within BookmarksProvider");
  }
  return context;
}
