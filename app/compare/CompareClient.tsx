"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import RetailerButtons from "@/components/RetailerButtons";
import { categories, getCategory } from "@/data/categories";
import { products, type Product } from "@/data/products";

const MAX_COMPARE_PRODUCTS = 3;

function storageKey(categoryId: string) {
  return `project-atlas-compare-products:${categoryId}`;
}

function getStoredComparison(
  categoryId: string,
): string[] {
  try {
    const stored = window.localStorage.getItem(storageKey(categoryId));

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((slug): slug is string => typeof slug === "string")
      .slice(0, MAX_COMPARE_PRODUCTS);
  } catch {
    return [];
  }
}

export default function CompareClient() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") ?? "ai-glasses";
  const category = getCategory(categoryId) ?? getCategory("ai-glasses")!;

  const categoryProducts = useMemo(
    () =>
      products.filter(
        (product) => (product.categoryId ?? "ai-glasses") === category.id,
      ),
    [category.id],
  );

  const defaultSlugs = useMemo(
    () =>
      [...categoryProducts]
        .sort((a, b) => b.editorialScore - a.editorialScore)
        .slice(0, MAX_COMPARE_PRODUCTS)
        .map((product) => product.slug),
    [categoryProducts],
  );

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setSelectedSlugs(getStoredComparison(category.id));
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [category.id]);

  const selectedProducts = selectedSlugs
    .map((slug) => categoryProducts.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  const categoryRankBySlug = useMemo(
    () =>
      new Map(
        [...categoryProducts]
          .sort(
            (a, b) =>
              b.editorialScore - a.editorialScore ||
              a.name.localeCompare(b.name),
          )
          .map((product, index) => [product.slug, index + 1]),
      ),
    [categoryProducts],
  );

  const editorialLeader =
    selectedProducts.length > 0
      ? [...selectedProducts].sort(
          (a, b) => b.editorialScore - a.editorialScore,
        )[0]
      : null;

  function save(slugs: string[]) {
    setSelectedSlugs(slugs);
    window.localStorage.setItem(storageKey(category.id), JSON.stringify(slugs));
    window.dispatchEvent(new CustomEvent("atlas-compare-updated"));
  }

  const scoreKeys = Array.from(
    new Set(
      selectedProducts.flatMap((product) =>
        Object.keys(product.reviewScores),
      ),
    ),
  );

  const specKeys = Array.from(
    new Set(
      selectedProducts.flatMap((product) => Object.keys(product.specs)),
    ),
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <Link
            href={category.href}
            className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold"
          >
            ← Back
          </Link>

          <h1 className="mt-10 text-4xl font-black uppercase tracking-[0.12em] text-cyan-400 sm:text-5xl">
            Product comparison
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Compare up to three products from the same category across
            editorial scores, specifications, strengths, and drawbacks.
          </p>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Switch category
            </p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {categories.map((item) => (
                <Link
                  key={item.id}
                  href={item.compareHref}
                  onClick={() => {
                    window.localStorage.removeItem(storageKey(item.id));
                  }}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    item.id === category.id
                      ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200"
                      : "border-white/15 text-slate-300 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        {selectedProducts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold">Your comparison is empty</h2>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={category.href}
                className="rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-slate-950"
              >
                Browse products
              </Link>

              <button
                type="button"
                onClick={() => save(defaultSlugs)}
                className="rounded-full border border-white/20 px-6 py-3.5 font-bold"
              >
                Compare top products
              </button>
            </div>
          </div>
        ) : (
          <>
            {editorialLeader && (
              <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                  Editorial score leader
                </p>
                <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="text-2xl font-bold">{editorialLeader.name}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                      Highest Atlas editorial score among the products currently selected. Use the tables below to check whether its strengths match your priorities.
                    </p>
                  </div>
                  <p className="shrink-0 text-3xl font-black">
                    {editorialLeader.editorialScore.toFixed(1)}
                    <span className="text-sm text-slate-400"> / 10</span>
                  </p>
                </div>
              </div>
            )}

            <div
              className={`grid gap-6 ${
                selectedProducts.length === 3
                  ? "lg:grid-cols-3"
                  : selectedProducts.length === 2
                    ? "lg:grid-cols-2"
                    : "mx-auto max-w-md"
              }`}
            >
              {selectedProducts.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
                >
                  <div className="relative">
                    <ProductImage
                      src={product.image.src}
                      slug={product.slug}
                      alt={product.image.alt}
                      aspectRatio="card"
                      className="rounded-none border-0 border-b border-white/10"
                    />

                    {(() => {
                      const rank = categoryRankBySlug.get(product.slug);

                      if (!rank || rank > 3) {
                        return null;
                      }

                      return (
                        <span
                          className="absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/90 text-2xl shadow-lg"
                          aria-label={
                            rank === 1
                              ? "Gold medal"
                              : rank === 2
                                ? "Silver medal"
                                : "Bronze medal"
                          }
                        >
                          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="p-6">
                    <p className="text-sm font-semibold text-cyan-400">
                      {product.brand}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                      {product.name}
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {product.shortDescription}
                    </p>

                    <div className="mt-5 flex justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span>Atlas score</span>
                      <strong>{product.editorialScore.toFixed(1)}/10</strong>
                    </div>

                    <div className="mt-5">
                      <RetailerButtons
                        links={product.affiliateLinks}
                        compact
                        maxLinks={1}
                      />
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="rounded-full bg-cyan-400 px-5 py-3 text-center font-bold text-slate-950"
                      >
                        Read full review
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          save(
                            selectedSlugs.filter(
                              (slug) => slug !== product.slug,
                            ),
                          )
                        }
                        className="rounded-full border border-white/20 px-5 py-3 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <section className="mt-16">
              <p className="mb-3 text-xs text-slate-500 sm:hidden">
                Swipe horizontally to see every compared product.
              </p>
              <div className="overflow-x-auto rounded-3xl border border-white/10">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="sticky left-0 z-10 bg-slate-900 p-5 text-left">Score</th>

                    {selectedProducts.map((product) => (
                      <th key={product.id} className="p-5 text-left">
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {scoreKeys.map((key) => (
                    <tr key={key} className="border-t border-white/10">
                      <td className="sticky left-0 bg-slate-950 p-5 font-semibold">
                        {category.scoreLabels[key] ?? key}
                      </td>

                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-5">
                          {product.reviewScores[key]?.toFixed(1) ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </section>

            <section className="mt-16">
              <p className="mb-3 text-xs text-slate-500 sm:hidden">
                Swipe horizontally to see every specification.
              </p>
              <div className="overflow-x-auto rounded-3xl border border-white/10">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="sticky left-0 z-10 bg-slate-900 p-5 text-left">Specification</th>

                    {selectedProducts.map((product) => (
                      <th key={product.id} className="p-5 text-left">
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {specKeys.map((key) => (
                    <tr key={key} className="border-t border-white/10">
                      <td className="sticky left-0 bg-slate-950 p-5 font-semibold capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </td>

                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-5 text-slate-300">
                          {product.specs[key] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
