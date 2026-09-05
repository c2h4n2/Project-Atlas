"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import RetailerButtons from "@/components/RetailerButtons";
import EditorialScore from "@/components/EditorialScore";
import { getCategory } from "@/data/categories";
import { products, type Product } from "@/data/products";
import ProductVerdict from "@/components/ProductVerdict";

type Props = {
  product: Product;
  rank?: number;
};

const MAX_COMPARE_PRODUCTS = 3;

function getStorageKey(categoryId: string) {
  return `project-atlas-compare-products:${categoryId}`;
}

function getQualificationLabel(product: Product) {
  if (product.qualification === "top-pick") return "Top Pick";
  if (product.qualification === "strong-pick") return "Strong Pick";
  return "Qualified";
}

function readComparedProducts(categoryId: string) {
  try {
    const value = window.localStorage.getItem(getStorageKey(categoryId));
    const parsed: unknown = value ? JSON.parse(value) : [];

    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is string => typeof item === "string",
        )
      : [];
  } catch {
    return [];
  }
}

function saveComparedProducts(
  categoryId: string,
  slugs: string[],
) {
  window.localStorage.setItem(
    getStorageKey(categoryId),
    JSON.stringify(slugs),
  );

  window.dispatchEvent(
    new CustomEvent("atlas-compare-updated"),
  );
}

export default function ProductCard({
  product,
}: Props) {
  const categoryId = product.categoryId ?? "ai-glasses";
  const category = getCategory(categoryId);

  const rankingCategory =
    (category?.label ?? product.category).trim().toLowerCase();

  const categoryRank =
    [...products]
      .filter((candidate) => {
        const candidateCategory = candidate.categoryId
          ? getCategory(candidate.categoryId)?.label ?? candidate.category
          : candidate.category;

        return (
          candidateCategory.trim().toLowerCase() === rankingCategory
        );
      })
      .sort(
        (a, b) =>
          b.editorialScore - a.editorialScore ||
          a.name.localeCompare(b.name),
      )
      .findIndex(
        (candidate) => candidate.slug === product.slug,
      ) + 1;

  const medalRank =
    categoryRank >= 1 && categoryRank <= 3
      ? categoryRank
      : undefined;

  const [isCompared, setIsCompared] = useState(false);
  const [compareMessage, setCompareMessage] = useState("");





  useEffect(() => {
    const updateState = () => {
      setIsCompared(
        readComparedProducts(categoryId).includes(product.slug),
      );
    };

    updateState();

    window.addEventListener("storage", updateState);
    window.addEventListener(
      "atlas-compare-updated",
      updateState,
    );

    return () => {
      window.removeEventListener("storage", updateState);
      window.removeEventListener(
        "atlas-compare-updated",
        updateState,
      );
    };
  }, [categoryId, product.slug]);

  function handleCompareToggle() {
    const current = readComparedProducts(categoryId);

    if (current.includes(product.slug)) {
      const updated = current.filter(
        (slug) => slug !== product.slug,
      );

      saveComparedProducts(categoryId, updated);
      setIsCompared(false);
      setCompareMessage("Removed from comparison.");
      return;
    }

    if (current.length >= MAX_COMPARE_PRODUCTS) {
      setCompareMessage(
        `You can compare up to ${MAX_COMPARE_PRODUCTS} products.`,
      );
      return;
    }

    const updated = [...current, product.slug];

    saveComparedProducts(categoryId, updated);
    setIsCompared(true);
    setCompareMessage("Added to comparison.");
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="block"
        >
          <ProductImage
            src={product.image.src}
            slug={product.slug}
            alt={product.image.alt}
            aspectRatio="card"
            className="w-full"
          />
        </Link>

        {typeof medalRank === "number" && (
          <span
            className="absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/90 text-2xl shadow-lg"
            aria-label={
              medalRank === 1
                ? "Gold medal"
                : medalRank === 2
                  ? "Silver medal"
                  : "Bronze medal"
            }
          >
            {medalRank === 1 ? "🥇" : medalRank === 2 ? "🥈" : "🥉"}
          </span>
        )}

        <span className="absolute right-4 top-4 rounded-full bg-cyan-400 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-950">
          {getQualificationLabel(product)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-cyan-400">
            {product.brand}
          </span>

          <span className="text-xs text-slate-400">
            {product.totalReviewCount > 0
              ? `${product.totalReviewCount.toLocaleString()} reviews`
              : "Editorial review"}
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-bold leading-tight">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-cyan-300"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">
          {product.shortDescription}
        </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                C2H4N3 score
              </p>

              <div className="mt-2">
                <EditorialScore score={product.editorialScore} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-800 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Overall score
              </p>

              {product.customerRating > 0 ? (
                <>
                  <p className="mt-2 flex items-baseline gap-2 text-3xl font-black">
                    <span className="text-amber-400">★</span>
                    <span className="text-slate-200">{(product.customerRating * 2).toFixed(1)}</span>
                    <span className="text-base font-bold text-slate-400">/ 10</span>
                  </p>

                  {product.totalReviewCount > 0 && (
                    <p className="mt-2 text-[10px] leading-4 text-slate-400">
                      {product.totalReviewCount.toLocaleString()} customer reviews
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="mt-2 text-lg font-black text-white">Not rated yet</p>

                  <p className="mt-2 text-[10px] leading-4 text-slate-400">
                    Overall score not yet available
                  </p>
                </>
              )}
            </div>

            <div className="col-span-2 rounded-2xl border border-white/10 bg-slate-800 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                C2H4N3 verdict
              </p>

              <div className="mt-2">
                <ProductVerdict product={product} />
              </div>
            </div>
          </div>
          <div className="mt-auto pt-7">
          <div className="flex flex-col gap-3">
            <Link
              href={`/products/${product.slug}`}
              className="rounded-full bg-cyan-400 px-5 py-3.5 text-center text-sm font-bold text-slate-950 hover:bg-cyan-300"
            >
              Read full review
            </Link>

            <RetailerButtons
              links={product.affiliateLinks}
              compact
              maxLinks={2}
            />

            <button
              type="button"
              onClick={handleCompareToggle}
              className={`rounded-full border px-5 py-3.5 text-sm font-bold ${
                isCompared
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-white/20 bg-white/5"
              }`}
            >
              {isCompared
                ? "✓ Added to compare"
                : "Add to compare"}
            </button>

            {isCompared && category && (
              <Link
                href={category.compareHref}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-3.5 text-center text-sm font-bold text-cyan-300"
              >
                View comparison
              </Link>
            )}

          </div>

          <p
            aria-live="polite"
            className="mt-3 text-center text-xs text-cyan-300"
          >
            {compareMessage}
          </p>
        </div>
      </div>
    </article>
  );
}
