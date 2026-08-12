import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function BestLaptopsPage() {
  const picks = products
    .filter((product) => product.categoryId === "laptops")
    .sort((a, b) => b.editorialScore - a.editorialScore);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          C2H4N3 RANKINGS
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
          Best Laptops
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Ranked by C2H4N3 editorial score using the same independent methodology across the category.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {picks.map((product, index) => (
            <ProductCard key={product.id} product={product} rank={index + 1} />
          ))}
        </div>
      </section>
    </main>
  );
}
