"use client";

import { BookmarksProvider } from "@/hooks/useBookmarks";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <BookmarksProvider>{children}</BookmarksProvider>;
}
