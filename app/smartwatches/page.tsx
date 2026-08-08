import type { Metadata } from "next";
import Link from "next/link";
import ProductExplorer from "@/components/ProductExplorer";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Smartwatches",
  description:
    "Search and compare Project Atlas reviews of Apple Watch, Galaxy Watch, Pixel Watch, Garmin, and other smartwatches.",
};

export default function SmartwatchesPage() {
  const categoryProducts = products.filter(
    (product) => product.categoryId === "smartwatches",
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Smartwatches
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-6xl">
            Find the right smartwatch
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Search {categoryProducts.length} smartwatches across Apple, Samsung,
            Google, Garmin, OnePlus, Amazfit, Fitbit, and Withings.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/best-smartwatches"
              className="rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              View Top Picks
            </Link>

            <Link
              href="/compare?category=smartwatches"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Compare Products
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <ProductExplorer
          products={categoryProducts}
          showBrandFilter
          emptyMessage="No smartwatches match those filters."
        />
      </section>
    </main>
  );
}
