import type { Product } from "@/data/products";
import {
  getCustomerRatingSummary,
  getFiveStarDisplay,
} from "@/lib/customer-ratings";

export default function CustomerRatingBreakdown({
  product,
}: {
  product: Product;
}) {
  const summary = getCustomerRatingSummary(product);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
        Customer ratings
      </p>

      <h2 className="mt-2 text-2xl font-black sm:text-3xl">
        Online buyers vs. C2H4N3
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
        C2H4N3 includes customer ratings only from exact-match product or model
        pages that we have verified as matching the product shown here.
      </p>

      {!summary ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-bold text-white">
            No exact-match customer rating added yet.
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            The customer score remains separate until a matching retailer or
            manufacturer review source is verified.
          </p>
        </div>
      ) : (
        <>
          {summary.sources.length > 0 && (
            <div className="mt-7 overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-white/5 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                <span>Verified source</span>
                <span>Rating</span>
                <span>Reviews</span>
              </div>

              {summary.sources.map((source) => (
                <a
                  key={`${source.platform}-${source.url}`}
                  href={source.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="grid grid-cols-[1fr_auto_auto] gap-4 border-t border-white/10 px-5 py-4 text-sm transition hover:bg-white/5"
                >
                  <span>
                    <span className="font-bold text-white">
                      {source.platform}
                    </span>

                    <span className="mt-1 block text-xs text-slate-500">
                      Exact model match · Checked {source.checkedAt}
                    </span>
                  </span>

                  <span className="whitespace-nowrap font-bold text-white">
                    <span className="mr-1 text-amber-400">
                      {getFiveStarDisplay(source.rating)}
                    </span>
                    {source.rating.toFixed(1)} / 5
                  </span>

                  <span className="whitespace-nowrap text-right text-slate-300">
                    {source.reviewCount.toLocaleString()}
                  </span>
                </a>
              ))}
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-300">
                Combined customer rating
              </p>

              <p className="mt-3 text-2xl font-black">
                <span className="mr-2 text-amber-400">
                  {getFiveStarDisplay(summary.combinedRating)}
                </span>
                {summary.combinedRating.toFixed(1)} / 5
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {summary.totalReviewCount.toLocaleString()} customer{" "}
                {summary.totalReviewCount === 1 ? "review" : "reviews"} from{" "}
                {summary.sources.length > 1
                  ? `${summary.sources.length} verified sources`
                  : "a verified source"}
                .
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                C2H4N3 editorial score
              </p>

              <p className="mt-3 text-2xl font-black">
                <span className="mr-2 text-amber-400">★</span>
                {product.editorialScore.toFixed(1)} / 10
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Equivalent to {(product.editorialScore / 2).toFixed(1)} / 5
                for comparison with customer sentiment.
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
