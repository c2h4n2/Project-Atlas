import type { Metadata } from "next";
import { getCategory } from "@/data/categories";

export function getBestCategoryMetadata(
  categoryId: string,
): Metadata {
  const category = getCategory(categoryId);

  if (!category) {
    return {};
  }

  const title = `Best ${category.label} 2026: Top Picks Compared`;
  const description = `Compare the best ${category.label.toLowerCase()} for 2026, ranked by C2H4N3 editorial score with detailed reviews, strengths, trade-offs, and buying guidance.`;

  return {
    title,
    description,
    alternates: {
      canonical: category.bestHref,
    },
    openGraph: {
      type: "website",
      url: category.bestHref,
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
