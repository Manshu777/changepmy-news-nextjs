import Image from "next/image";
import type { NewsArticle } from "@/types/news";
import { formatRelativeDate } from "@/lib/utils";

interface StoryListItemProps {
  article: NewsArticle;
  showImage?: boolean;
  size?: "sm" | "md";
}

export default function StoryListItem({
  article,
  showImage = true,
  size = "md",
}: StoryListItemProps) {
  return (
    <a href="#" className="group flex gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p
          className={`font-medium leading-snug text-slate-900 transition-colors group-hover:text-primary ${
            size === "md" ? "text-base" : "text-sm"
          }`}
        >
          {article.title}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {article.author} · {formatRelativeDate(article.publishedAt)}
        </p>
      </div>
      {showImage && (
        <div
          className={`relative shrink-0 overflow-hidden rounded-lg bg-slate-100 ${
            size === "md" ? "h-20 w-20" : "h-16 w-16"
          }`}
        >
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
    </a>
  );
}
