import type { Product, ProductSource } from "@/data/products";
import { customerRatingsBySlug } from "@/data/customer-ratings";

function isRatedSource(source: ProductSource) {
  return (
    Number.isFinite(source.rating) &&
    source.rating > 0 &&
    source.rating <= 5 &&
    Number.isFinite(source.reviewCount) &&
    source.reviewCount > 0 &&
    source.url.trim() !== ""
  );
}

function getSourceKey(source: ProductSource) {
  return `${source.platform.trim().toLowerCase()}|${source.url.trim()}`;
}

export function applyCustomerRatingsInPlace(products: Product[]) {
  for (const product of products) {
    const originalCustomerRating = product.customerRating;
    const originalReviewCount = product.totalReviewCount;

    const synced = customerRatingsBySlug[product.slug] ?? [];

    if (synced.length > 0) {
      const existingByKey = new Map(
        product.sources.map((source) => [getSourceKey(source), source]),
      );

      for (const source of synced) {
        existingByKey.set(getSourceKey(source), source);
      }

      product.sources = Array.from(existingByKey.values());
    }

    const ratedSources = product.sources.filter(isRatedSource);

    if (ratedSources.length > 0) {
      const totalReviewCount = ratedSources.reduce(
        (sum, source) => sum + source.reviewCount,
        0,
      );

      const weightedRatingTotal = ratedSources.reduce(
        (sum, source) => sum + source.rating * source.reviewCount,
        0,
      );

      product.customerRating = weightedRatingTotal / totalReviewCount;
      product.totalReviewCount = totalReviewCount;
      continue;
    }

    // Preserve existing catalog rating data when no exact-match synced
    // source has been added yet. Do not erase valid historical ratings.
    if (originalCustomerRating > 0) {
      product.customerRating = originalCustomerRating;
      product.totalReviewCount = originalReviewCount;
      continue;
    }

    product.customerRating = 0;
    product.totalReviewCount = 0;
  }
}
