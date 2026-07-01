"use client";

import Link from "next/link";
import Image from "next/image";
import type { NewsArticle, NewsCategory } from "@/types/news";
import { categoryToSlug } from "@/lib/news";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

interface CategoryIndexProps {
  categories: { name: NewsCategory; count: number; image: string }[];
}

export default function CategoryIndex({ categories }: CategoryIndexProps) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 lg:px-6">
        <h1 className="mb-1 text-2xl font-normal text-slate-900">Categories</h1>
        <p className="mb-6 text-sm text-slate-500">
          Browse news by topic
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ name, count, image }) => (
            <Link
              key={name}
              href={`/category/${categoryToSlug(name)}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-36 overflow-hidden bg-slate-100">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h2 className="text-lg font-semibold text-white">{name}</h2>
                  <p className="text-xs text-white/80">{count} articles</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
