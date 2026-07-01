"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(
  totalItems: number,
  itemsPerPage: number = 8
) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasMore = page * itemsPerPage < totalItems;

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setIsLoading(false);
          }, 600);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, totalItems]);

  return { page, isLoading, hasMore, sentinelRef };
}
