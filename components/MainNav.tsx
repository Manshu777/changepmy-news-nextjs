"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category" },
  { label: "Articles", href: "/article" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-slate-100">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 lg:px-6">
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative shrink-0 px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
