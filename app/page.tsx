import { getNews } from "@/lib/news";
import HomePage from "@/components/HomePage";

export default async function Page() {
  const articles = await getNews();

  return <HomePage articles={articles} />;
}
