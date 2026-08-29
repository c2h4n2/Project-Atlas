import type { Metadata } from "next";
import Link from "next/link";
import ProductExplorer from "@/components/ProductExplorer";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

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
            Search the full Atlas catalog, jump into a category, filter by brand, and sort by editorial score, customer feedback, review volume, or name.
          </p>

          <div id="browse-categories" className="mt-8 scroll-mt-28">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Browse categories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link key={category.id} href={category.href} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300">
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
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
