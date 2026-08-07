"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/products";

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
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function saveComparedProducts(categoryId: string, slugs: string[]) {
  window.localStorage.setItem(getStorageKey(categoryId), JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent("atlas-compare-updated"));
}

export default function ProductCard({ product, rank }: Props) {
  const categoryId = product.categoryId ?? "ai-glasses";
  const category = getCategory(categoryId);
  const [isCompared, setIsCompared] = useState(false);
  const [compareMessage, setCompareMessage] = useState("");

  const affiliateLink = product.affiliateLinks.find(
    (link) => link.url.trim() !== "",
  );

  useEffect(() => {
    const updateState = () => {
      setIsCompared(readComparedProducts(categoryId).includes(product.slug));
    };

    updateState();
    window.addEventListener("storage", updateState);
    window.addEventListener("atlas-compare-updated", updateState);

    return () => {
      window.removeEventListener("storage", updateState);
      window.removeEventListener("atlas-compare-updated", updateState);
    };
  }, [categoryId, product.slug]);

  function handleCompareToggle() {
    const current = readComparedProducts(categoryId);

    if (current.includes(product.slug)) {
      const updated = current.filter((slug) => slug !== product.slug);
      saveComparedProducts(categoryId, updated);
      setIsCompared(false);
      setCompareMessage("Removed from comparison.");
      return;
    }

    if (current.length >= MAX_COMPARE_PRODUCTS) {
      setCompareMessage(`You can compare up to ${MAX_COMPARE_PRODUCTS} products.`);
      return;
    }

    const updated = [...current, product.slug];
    saveComparedProducts(categoryId, updated);
    setIsCompared(true);
    setCompareMessage("Added to comparison.");
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <ProductImage
            src={product.image.src}
            alt={product.image.alt}
            aspectRatio="card"
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            className="rounded-none border-0 border-b border-white/10"
          />
        </Link>

        {typeof rank === "number" && (
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-sm font-black text-slate-950">
            #{rank}
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
          <Link href={`/products/${product.slug}`} className="hover:text-cyan-300">
            {product.name}
          </Link>
        </h3>

        <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">
          {product.shortDescription}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {(category?.cardFields ?? []).map((field) => (
            <div
              key={field.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-3.5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {field.label}
              </p>
              <p className="mt-1.5 line-clamp-2 text-sm font-bold text-white">
                {field.getValue(product)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Atlas score
            </p>
            <p className="mt-2 text-4xl font-black">
              {product.editorialScore.toFixed(1)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-800 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Customers
            </p>
            <p className="mt-2 text-2xl font-black">
              {product.totalReviewCount > 0
                ? `⭐ ${product.customerRating.toFixed(1)}`
                : "New"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold">Best for</p>
          <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-300">
            {product.bestFor.slice(0, 2).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-7">
          <div className="flex flex-col gap-3">
            <Link
              href={`/products/${product.slug}`}
              className="rounded-full bg-cyan-400 px-5 py-3.5 text-center text-sm font-bold text-slate-950 hover:bg-cyan-300"
            >
              Read full review
            </Link>

            <button
              type="button"
              onClick={handleCompareToggle}
              className={`rounded-full border px-5 py-3.5 text-sm font-bold ${
                isCompared
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-white/20 bg-white/5"
              }`}
            >
              {isCompared ? "✓ Added to compare" : "Add to compare"}
            </button>

            {isCompared && category && (
              <Link
                href={category.compareHref}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-3.5 text-center text-sm font-bold text-cyan-300"
              >
                View comparison
              </Link>
            )}

            {affiliateLink && (
              <a
                href={affiliateLink.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-3.5 text-center text-sm font-bold"
              >
                Check current price at {affiliateLink.retailer}
              </a>
            )}
          </div>

          <p aria-live="polite" className="mt-3 text-center text-xs text-cyan-300">
            {compareMessage}
          </p>
        </div>
      </div>
    </article>
  );
}
