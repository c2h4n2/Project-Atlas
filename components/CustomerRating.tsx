import type { Product } from "@/data/products";
import {
  getCustomerRatingSummary,
  getFiveStarDisplay,
} from "@/lib/customer-ratings";

export default function CustomerRating({ product }: { product: Product }) {
  const summary = getCustomerRatingSummary(product);

  if (!summary) {
    return (
      <div>
        <p className="text-xl font-black">
          <span className="text-amber-400">★</span>{" "}
          <span className="text-white">Not Rated</span>
        </p>

        <p className="mt-1 text-[11px] leading-4 text-slate-500">
          No exact-match customer review source added yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="flex flex-wrap items-center gap-2 text-lg font-black">
        <span
          className="tracking-[0.05em] text-amber-400"
          aria-label={`${summary.combinedRating.toFixed(1)} out of 5 stars`}
        >
          {getFiveStarDisplay(summary.combinedRating)}
        </span>

        <span className="text-white">
          {summary.combinedRating.toFixed(1)} / 5
        </span>
      </p>

      <p className="mt-1 text-[11px] leading-4 text-slate-500">
        {summary.totalReviewCount.toLocaleString()} customer{" "}
        {summary.totalReviewCount === 1 ? "review" : "reviews"} from{" "}
        {summary.sources.length > 1
          ? `${summary.sources.length} verified sources`
          : "a verified source"}
        .
      </p>
    </div>
  );
}
