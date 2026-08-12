import type { Product } from "@/data/products";
import { getCustomerRatingSummary } from "@/lib/customer-ratings";

export default function TrustMeter({ product }: { product: Product }) {
  const summary = getCustomerRatingSummary(product);

  if (!summary) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-slate-300">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-80">
          C2H4N3 Trust Meter
        </p>
        <p className="mt-1 text-sm font-black">○ Awaiting customer data</p>
      </div>
    );
  }

  const editorialFive = product.editorialScore / 2;
  const difference = summary.combinedRating - editorialFive;
  const absoluteDifference = Math.abs(difference);

  let label = "Moderate agreement";
  let symbol = "≈";
  let className = "border-white/10 bg-white/5 text-slate-300";

  if (absoluteDifference <= 0.25) {
    label = "Strong agreement";
    symbol = "✓";
    className =
      "border-emerald-400/20 bg-emerald-400/5 text-emerald-300";
  } else if (difference >= 0.5) {
    label = "Customers rate it higher";
    symbol = "↑";
    className = "border-cyan-400/20 bg-cyan-400/5 text-cyan-300";
  } else if (difference <= -0.5) {
    label = "Customers rate it lower";
    symbol = "↓";
    className =
      "border-amber-400/20 bg-amber-400/5 text-amber-300";
  }

  return (
    <div className={`rounded-2xl border p-3.5 ${className}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-80">
        C2H4N3 Trust Meter
      </p>
      <p className="mt-1 text-sm font-black">
        {symbol} {label}
      </p>
    </div>
  );
}
