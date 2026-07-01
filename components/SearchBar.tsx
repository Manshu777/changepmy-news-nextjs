"use client";

import { forwardRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
  {
    value,
    onChange,
    className,
    placeholder = "Search news, topics, authors...",
  },
  ref
) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-2.5 pl-11 pr-10 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Search news"
      />
      {value ? (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:block">
          /
        </kbd>
      )}
    </div>
  );
});

export default SearchBar;
