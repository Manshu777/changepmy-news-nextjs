import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newsly.com"),
  title: {
    default: "NEWSLY — Premium News Portal",
    template: "%s | NEWSLY",
  },
  description:
    "Stay informed with curated stories from around the world. NEWSLY delivers premium journalism across technology, business, science, sports, and more.",
  keywords: [
    "news",
    "technology",
    "business",
    "world news",
    "india news",
    "AI",
    "startup",
    "sports",
    "science",
    "health",
  ],
  authors: [{ name: "NEWSLY Editorial" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newsly.com",
    siteName: "NEWSLY",
    title: "NEWSLY — Premium News Portal",
    description:
      "Stay informed with curated stories from around the world. Premium journalism across every category.",
    images: [
      {
        url: "/images/news1.jpg",
        width: 1200,
        height: 630,
        alt: "NEWSLY Premium News Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEWSLY — Premium News Portal",
    description:
      "Stay informed with curated stories from around the world. Premium journalism across every category.",
    images: ["/images/news1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
