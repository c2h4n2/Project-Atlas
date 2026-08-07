import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Headphones & Earbuds",
  description:
    "Independent reviews and comparisons of wireless headphones and earbuds.",
};

export default function HeadphonesEarbudsPage() {
  const categoryProducts = products
    .filter((product) => product.categoryId === "headphones-earbuds")
    .sort((a, b) => b.editorialScore - a.editorialScore);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Headphones & Earbuds
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-6xl">
            Find the right wireless audio
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Explore 25 wireless headphones and earbuds reviewed for sound
            quality, comfort, noise cancellation, battery life, calls, and
            value.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
