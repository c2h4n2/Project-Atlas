import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Best Smartwatches",
  description:
    "Project Atlas rankings for the best current smartwatches across Apple, Samsung, Google, Garmin, and more.",
};

export default function BestSmartwatchesPage() {
  const rankedProducts = products
    .filter((product) => product.categoryId === "smartwatches")
    .sort((a, b) => b.editorialScore - a.editorialScore);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Atlas rankings
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-6xl">
            Best Smartwatches
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Our smartwatch rankings consider design, comfort, display quality,
            health and fitness tracking, battery life, smart features, and
            overall value.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {rankedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              rank={index + 1}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
