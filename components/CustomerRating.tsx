import type { Product } from "@/data/products";
import { getCustomerRatingSummary } from "@/lib/customer-ratings";

export default function CustomerRating({ product }: { product: Product }) {
  const summary = getCustomerRatingSummary(product);

  const rating =
    summary?.combinedRating && summary.combinedRating > 0
      ? summary.combinedRating
      : product.customerRating;

  const reviewCount =
    summary?.totalReviewCount && summary.totalReviewCount > 0
      ? summary.totalReviewCount
      : product.totalReviewCount;

  if (!rating || rating <= 0) {
    return (
      <div>
        <p className="text-xl font-black">
          <span className="text-amber-400">★</span>{" "}
          <span className="text-white">Not rated yet</span>
        </p>

        <p className="mt-1 text-[11px] leading-4 text-slate-500">
          Overall score not yet available.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="flex items-baseline gap-2 text-4xl font-black">
        <span className="text-amber-400">★</span>
        <span className="text-white">
          {(rating * 2).toFixed(1)}
        </span>
        <span className="text-base font-bold text-slate-400">/ 10</span>
      </p>

      {reviewCount > 0 && (
        <p className="mt-1 text-[11px] leading-4 text-slate-500">
          {reviewCount.toLocaleString()} customer{" "}
          {reviewCount === 1 ? "review" : "reviews"}
          {summary
            ? summary.sources.length > 1
              ? ` from ${summary.sources.length} verified sources.`
              : " from a verified source."
            : "."}
        </p>
      )}
    </div>
  );
}
