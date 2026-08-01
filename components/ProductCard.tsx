"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  rank?: number;
};

const COMPARE_STORAGE_KEY = "project-atlas-compare-products";
const MAX_COMPARE_PRODUCTS = 3;

function getQualificationLabel(product: Product) {
  switch (product.qualification) {
    case "top-pick":
      return "Top Pick";

    case "strong-pick":
      return "Strong Pick";

    default:
      return "Qualified";
  }
}

function getVerdictStyles(product: Product) {
  switch (product.verdictLabel) {
    case "Outstanding":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";

    case "Excellent":
      return "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";

    case "Very Good":
      return "border-blue-400/30 bg-blue-400/10 text-blue-300";

    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

function readComparedProducts() {
  try {
    const storedValue = window.localStorage.getItem(COMPARE_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (value): value is string => typeof value === "string",
    );
  } catch {
    return [];
  }
}

function saveComparedProducts(productSlugs: string[]) {
  window.localStorage.setItem(
    COMPARE_STORAGE_KEY,
    JSON.stringify(productSlugs),
  );

  window.dispatchEvent(
    new CustomEvent("atlas-compare-updated", {
      detail: {
        productSlugs,
      },
    }),
  );
}

export default function ProductCard({ product, rank }: Props) {
  const [isCompared, setIsCompared] = useState(false);
  const [compareMessage, setCompareMessage] = useState("");

  const affiliateLink = product.affiliateLinks.find(
    (link) => link.url.trim() !== "",
  );

  const qualificationLabel = getQualificationLabel(product);
  const verdictStyles = getVerdictStyles(product);
  const reviewHref = `/products/${product.slug}`;

  useEffect(() => {
    const updateComparedState = () => {
      const comparedProducts = readComparedProducts();

      setIsCompared(comparedProducts.includes(product.slug));
    };

    updateComparedState();

    window.addEventListener("storage", updateComparedState);
    window.addEventListener("atlas-compare-updated", updateComparedState);

    return () => {
      window.removeEventListener("storage", updateComparedState);
      window.removeEventListener("atlas-compare-updated", updateComparedState);
    };
  }, [product.slug]);

  function handleCompareToggle() {
    const comparedProducts = readComparedProducts();
    const productIsAlreadyCompared = comparedProducts.includes(product.slug);

    if (productIsAlreadyCompared) {
      const updatedProducts = comparedProducts.filter(
        (slug) => slug !== product.slug,
      );

      saveComparedProducts(updatedProducts);
      setIsCompared(false);
      setCompareMessage("Removed from comparison.");
      return;
    }

    if (comparedProducts.length >= MAX_COMPARE_PRODUCTS) {
      setCompareMessage(
        `You can compare up to ${MAX_COMPARE_PRODUCTS} products at a time.`,
      );
      return;
    }

    const updatedProducts = [...comparedProducts, product.slug];

    saveComparedProducts(updatedProducts);
    setIsCompared(true);
    setCompareMessage("Added to comparison.");
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-950/20 focus-within:border-cyan-400/50 focus-within:shadow-2xl focus-within:shadow-cyan-950/20">
      <div className="relative">
        <Link
          href={reviewHref}
          aria-label={`Read the full ${product.name} review`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
        >
          <ProductImage
            src={product.image.src}
            alt={product.image.alt}
            aspectRatio="card"
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            className="rounded-none border-0 border-b border-white/10"
          />
        </Link>

        {typeof rank === "number" && (
          <div className="pointer-events-none absolute left-4 top-4 z-10">
            <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-white px-3 py-1.5 text-sm font-black text-slate-950 shadow-lg">
              #{rank}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute right-4 top-4 z-10">
          <span className="rounded-full bg-cyan-400 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-950 shadow-lg">
            {qualificationLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-cyan-400">
            {product.brand}
          </span>

          <span className="text-xs text-slate-400">
            {product.totalReviewCount.toLocaleString()} reviews
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight">
          <Link
            href={reviewHref}
            className="rounded-sm transition hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-3">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${verdictStyles}`}
          >
            {product.verdictLabel}
          </span>
        </div>

        <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">
          {product.shortDescription}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Fit
            </p>

            <p className="mt-1.5 text-sm font-bold text-white">
              {product.fit}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Frame size
            </p>

            <p className="mt-1.5 text-sm font-bold text-white">
              {product.frameSize}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Atlas Score
            </p>

            <div className="mt-2 flex items-end gap-1.5">
              <span className="text-4xl font-black leading-none text-white">
                {product.editorialScore.toFixed(1)}
              </span>

              <span className="pb-0.5 text-xs font-semibold text-slate-400">
                /10
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-800 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Customers
            </p>

            <div className="mt-2 flex items-center gap-1.5">
              <span aria-hidden="true" className="text-lg">
                ⭐
              </span>

              <span className="text-2xl font-black">
                {product.customerRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold text-white">Best for</p>

          <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-300">
            {product.bestFor.slice(0, 2).map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-bold text-cyan-400"
                >
                  ✓
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold text-white">Highlights</p>

          <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-300">
            {product.pros.slice(0, 2).map((pro) => (
              <li key={pro} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-bold text-cyan-400"
                >
                  ✓
                </span>

                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-7">
          <div className="flex flex-col gap-3">
            <Link
              href={reviewHref}
              className="block rounded-full bg-cyan-400 px-5 py-3.5 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Read full review
            </Link>

            <button
              type="button"
              onClick={handleCompareToggle}
              aria-pressed={isCompared}
              className={`block w-full rounded-full border px-5 py-3.5 text-center text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                isCompared
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
                  : "border-white/20 bg-white/5 text-white hover:border-cyan-400/50 hover:bg-white/10"
              }`}
            >
              {isCompared ? "✓ Added to compare" : "Add to compare"}
            </button>

            {isCompared && (
              <Link
                href="/compare"
                className="block rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-3.5 text-center text-sm font-bold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                View comparison
              </Link>
            )}

            {affiliateLink && (
              <a
                href={affiliateLink.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="block rounded-full border border-white/20 bg-white/5 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Check current price at {affiliateLink.retailer}
              </a>
            )}
          </div>

          <p
            aria-live="polite"
            className={`mt-3 text-center text-xs leading-5 ${
              compareMessage ? "text-cyan-300" : "text-transparent"
            }`}
          >
            {compareMessage || "Comparison status"}
          </p>

          {affiliateLink && (
            <p className="mt-1 text-center text-xs leading-5 text-slate-500">
              Price and availability are provided by the retailer and may
              change.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}