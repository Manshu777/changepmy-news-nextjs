import { notFound } from "next/navigation";
import { getArticleById, getNews } from "@/lib/news";
import ArticleDetail from "@/components/ArticleDetail";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const articles = await getNews();
  return articles.map((article) => ({
    id: String(article.id),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(Number(id));

  if (!article) return { title: "Article" };

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticleSlugPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(Number(id));

  if (!article) notFound();

  const allNews = await getNews();
  const related = allNews
    .filter(
      (a) => a.category === article.category && a.id !== article.id
    )
    .slice(0, 4);

  return <ArticleDetail article={article} related={related} />;
}
