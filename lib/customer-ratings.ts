import type { Product, ProductSource } from "@/data/products";

export type CustomerRatingSource = {
  platform: string;
  rating: number;
  reviewCount: number;
  url: string;
  checkedAt: string;
};

export type CustomerRatingSummary = {
  sources: CustomerRatingSource[];
  combinedRating: number;
  totalReviewCount: number;
};

function isRatedSource(source: ProductSource): source is CustomerRatingSource {
  return (
    Number.isFinite(source.rating) &&
    source.rating > 0 &&
    source.rating <= 5 &&
    Number.isFinite(source.reviewCount) &&
    source.reviewCount > 0 &&
    source.url.trim() !== ""
  );
}

export function getCustomerRatingSummary(
  product: Product,
): CustomerRatingSummary | null {
  const sources = product.sources.filter(isRatedSource);

  if (sources.length === 0) {
    if (product.customerRating > 0 && product.totalReviewCount > 0) {
      return {
        sources: [],
        combinedRating: product.customerRating,
        totalReviewCount: product.totalReviewCount,
      };
    }
    return null;
  }

  const totalReviewCount = sources.reduce(
    (sum, source) => sum + source.reviewCount,
    0,
  );

  const weightedTotal = sources.reduce(
    (sum, source) => sum + source.rating * source.reviewCount,
    0,
  );

  return {
    sources,
    combinedRating: weightedTotal / totalReviewCount,
    totalReviewCount,
  };
}

export function getFiveStarDisplay(rating: number) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)}`;
}
