"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import type { NewsArticle } from "@/types/news";
import { formatDate } from "@/lib/utils";

interface HeroSectionProps {
  article: NewsArticle;
}

export default function HeroSection({ article }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-[20px] shadow-xl shadow-slate-200/50"
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
        <span className="mb-3 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {article.category}
        </span>

        <h1 className="mb-3 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          {article.title}
        </h1>

        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
          {article.description}
        </p>

        <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-slate-300">
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

        <button className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:bg-primary hover:text-white hover:shadow-lg">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.section>
  );
}
