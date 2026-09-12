import type { Metadata } from "next";
import { getCategory } from "@/data/categories";

export function getCategoryMetadata(
  categoryId: string,
): Metadata {
  const category = getCategory(categoryId);

  if (!category) {
    return {};
  }

  const title = `${category.label}: Reviews, Rankings & Comparisons`;
  const description = `${category.description} Browse C2H4N3 reviews, compare top-rated ${category.label.toLowerCase()}, and find the best option for your needs.`;

  return {
    title,
    description,
    alternates: {
      canonical: category.href,
    },
    openGraph: {
      type: "website",
      url: category.href,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
