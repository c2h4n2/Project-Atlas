import type { Product } from "@/data/products";

function getVerdict(product: Product) {
  if (
    product.qualification === "top-pick" ||
    product.editorialScore >= 9.2
  ) {
    return {
      label: "Top Choice",
      detail: "One of our strongest picks in this category.",
    };
  }

  if (
    product.qualification === "strong-pick" ||
    product.editorialScore >= 8.7
  ) {
    return {
      label: "Recommended",
      detail: "Excellent performance for most buyers.",
    };
  }

  if (product.editorialScore >= 8.2) {
    return {
      label: "Good Pick",
      detail: "A solid option with very good overall value.",
    };
  }

  return {
    label: "Consider",
    detail: "Compare with stronger alternatives before buying.",
  };
}

export default function ProductVerdict({
  product,
}: {
  product: Product;
}) {
  const verdict = getVerdict(product);

  return (
    <div className="flex h-full flex-col justify-between">
      <h3 className="text-base font-extrabold leading-tight tracking-tight text-white break-words">
        {verdict.label}
      </h3>

      <p className="mt-2 text-[11px] leading-5 text-slate-400">
        {verdict.detail}
      </p>
    </div>
  );
}