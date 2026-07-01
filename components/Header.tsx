"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Bookmark, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut("/", () => {
    searchRef.current?.focus();
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-6">
        <button
          className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <a href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
            N
          </div>
          <span className="hidden text-xl font-bold tracking-tight text-slate-900 sm:block">
            NEWSLY
          </span>
        </a>

        <div className="hidden flex-1 md:block md:max-w-md lg:max-w-lg">
          <SearchBar
            ref={searchRef}
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            className="relative rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button
            className="hidden rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-100 sm:block"
            aria-label="Bookmarks"
          >
            <Bookmark className="h-5 w-5" />
          </button>

          <div className="hidden h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-primary to-blue-400 ring-2 ring-white sm:block">
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
              JD
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-2 md:hidden">
        <SearchBar
          ref={searchRef}
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900">NEWSLY</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {[
                "Latest",
                "India",
                "World",
                "Technology",
                "AI",
                "Business",
                "Sports",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-xl px-4 py-3 text-slate-700 transition-colors hover:bg-slate-100"
                >
                  {item}
                </a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
