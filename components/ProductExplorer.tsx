"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

type SortMode =
  | "atlas-desc"
  | "rating-desc"
  | "reviews-desc"
  | "name-asc";

type ProductExplorerProps = {
  products: Product[];
  showCategoryFilter?: boolean;
  showBrandFilter?: boolean;
  emptyMessage?: string;
};

export default function ProductExplorer({
  products,
  showCategoryFilter = false,
  showBrandFilter = true,
  emptyMessage = "No products match those filters.",
}: ProductExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("atlas-desc");

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.category))).sort(),
    [products],
  );

  const brands = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.brand))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [products],
  );

  const normalizedBrands = useMemo(
    () => new Set(brands.map((item) => item.toLowerCase())),
    [brands],
  );

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const queryIsExactBrand = normalizedBrands.has(normalizedQuery);

    const filtered = products.filter((product) => {
      let matchesQuery = true;

      if (normalizedQuery.length > 0) {
        if (queryIsExactBrand) {
          matchesQuery = product.brand.toLowerCase() === normalizedQuery;
        } else {
          matchesQuery =
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.brand.toLowerCase().includes(normalizedQuery);
        }
      }

      const matchesCategory =
        !showCategoryFilter ||
        category === "all" ||
        product.category === category;

      const matchesBrand =
        !showBrandFilter || brand === "all" || product.brand === brand;

      return matchesQuery && matchesCategory && matchesBrand;
    });

    return [...filtered].sort((a, b) => {
      switch (sortMode) {
        case "rating-desc":
          return b.customerRating - a.customerRating;
        case "reviews-desc":
          return b.totalReviewCount - a.totalReviewCount;
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return b.editorialScore - a.editorialScore;
      }
    });
  }, [
    brand,
    category,
    normalizedBrands,
    products,
    query,
    showBrandFilter,
    showCategoryFilter,
    sortMode,
  ]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    (showCategoryFilter && category !== "all") ||
    (showBrandFilter && brand !== "all") ||
    sortMode !== "atlas-desc";

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setBrand("all");
    setSortMode("atlas-desc");
  }

  return (
    <div>
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Search products
            </span>

            <div className="relative mt-2">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product or brand..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </label>

          {showBrandFilter && (
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Brand
              </span>

              <select
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none focus:border-cyan-400/60"
              >
                <option value="all">All brands</option>
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Sort
            </span>

            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none focus:border-cyan-400/60"
            >
              <option value="atlas-desc">Highest Atlas score</option>
              <option value="rating-desc">Highest customer rating</option>
              <option value="reviews-desc">Most customer reviews</option>
              <option value="name-asc">Product name A–Z</option>
            </select>
          </label>
        </div>

        {showCategoryFilter && (
          <div className="mt-5 border-t border-white/10 pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Category
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  category === "all"
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                }`}
              >
                All
              </button>

              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    category === item
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <strong className="text-white">{visibleProducts.length}</strong> of{" "}
            <strong className="text-white">{products.length}</strong> products
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-left text-sm font-semibold text-cyan-400 transition hover:text-cyan-300 sm:text-right"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {visibleProducts.length > 0 ? (
        <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              rank={sortMode === "atlas-desc" ? index + 1 : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-2xl text-cyan-300">
            ?
          </div>

          <h2 className="mt-5 text-2xl font-bold">No matches found</h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
            {emptyMessage}
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
