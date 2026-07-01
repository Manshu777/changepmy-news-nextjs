import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { NewsArticle } from "@/types/news";
import { categoryToSlug } from "@/lib/news";
import { formatDate } from "@/lib/utils";
import Header from "./Header";
import Footer from "./Footer";
import StoryListItem from "./StoryListItem";
import BackToTop from "./BackToTop";

interface ArticleDetailProps {
  article: NewsArticle;
  related: NewsArticle[];
}

export default function ArticleDetail({
  article,
  related,
}: ArticleDetailProps) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-6 lg:px-6">
        <Link
          href="/article"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <article>
          <Link
            href={`/category/${categoryToSlug(article.category)}`}
            className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
          >
            {article.category}
          </Link>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readingTime} read
            </span>
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div className="prose prose-slate mt-8 max-w-none">
            <p className="text-lg leading-relaxed text-slate-700">
              {article.description}
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum. Sed ut perspiciatis unde omnis iste natus error
              sit voluptatem accusantium doloremque laudantium.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
              fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Related stories
            </h2>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              {related.map((item) => (
                <StoryListItem key={item.id} article={item} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
