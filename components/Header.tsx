"use client";

import Link from "next/link";
import { useRef } from "react";
import { Bell, Bookmark } from "lucide-react";
import SearchBar from "./SearchBar";
import MainNav from "./MainNav";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({
  searchQuery = "",
  onSearchChange,
}: HeaderProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const showSearch = onSearchChange !== undefined;

  useKeyboardShortcut("/", () => {
    searchRef.current?.focus();
  });

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            N
          </div>
          <span className="text-lg font-medium text-slate-700">NEWSLY</span>
        </Link>

        {showSearch && (
          <div className="mx-auto hidden max-w-xl flex-1 md:block">
            <SearchBar
              ref={searchRef}
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search for topics, locations & sources"
            />
          </div>
        )}

        <div className="ml-auto flex items-center gap-1">
          <button
            className="rounded-full p-2.5 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            className="hidden rounded-full p-2.5 text-slate-600 transition-colors hover:bg-slate-100 sm:block"
            aria-label="Bookmarks"
          >
            <Bookmark className="h-5 w-5" />
          </button>
          <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white sm:flex">
            J
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="border-t border-slate-100 px-4 py-2 md:hidden">
          <SearchBar
            ref={searchRef}
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search for topics, locations & sources"
          />
        </div>
      )}

      <MainNav />
    </header>
  );
}
