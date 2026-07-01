export type NewsCategory =
  | "India"
  | "World"
  | "Technology"
  | "AI"
  | "Business"
  | "Startup"
  | "Sports"
  | "Entertainment"
  | "Science"
  | "Health";

export type NewsTab = "Latest" | NewsCategory;

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  category: NewsCategory;
  author: string;
  publishedAt: string;
  featured: boolean;
  trending: boolean;
  popular: boolean;
  editorPick: boolean;
  breaking?: boolean;
  readingTime: string;
}

export interface PayloadNewsDoc {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  publishedAt: string;
}

export interface PayloadNewsResponse {
  docs: PayloadNewsDoc[];
}
