import type { Metadata } from "next";
import ProductExplorer from "@/components/ProductExplorer";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Search, filter, and compare every product reviewed by Project Atlas.",
};

export default function AllProductsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Complete catalog
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            All Products
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Search all Project C2H4N3 reviews, filter by category or brand, and sort products by C2H4N3 score,
            customer feedback, review volume, or name.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <ProductExplorer
          products={products}
          showCategoryFilter
          showBrandFilter
        />
      </section>
    </main>
  );
}
