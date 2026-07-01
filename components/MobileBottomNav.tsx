"use client";

import { Home, Bookmark, Search, User, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: Home, label: "Home", active: true },
  { icon: TrendingUp, label: "Trending", active: false },
  { icon: Search, label: "Search", active: false },
  { icon: Bookmark, label: "Saved", active: false },
  { icon: User, label: "Profile", active: false },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors",
              active
                ? "text-primary"
                : "text-slate-400 hover:text-slate-600"
            )}
            aria-label={label}
          >
            <Icon className={cn("h-5 w-5", active && "fill-primary/20")} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
