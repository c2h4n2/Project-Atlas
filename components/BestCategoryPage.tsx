import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";

export default function BestCategoryPage({ categoryId }: { categoryId: string }) {
  const category = getCategory(categoryId);
  if (!category) return null;

  const rankedProducts = products
    .filter((product) => product.categoryId === categoryId)
    .sort((a, b) => b.editorialScore - a.editorialScore);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Atlas rankings</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-6xl">Best {category.label}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Ranked by Atlas editorial score using category-specific performance, usability, features, limitations, and value criteria.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={category.href} className="rounded-full border border-white/20 px-6 py-3.5 font-bold">Browse all {category.label.toLowerCase()}</Link>
            <Link href={category.compareHref} className="rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-slate-950">Compare top products</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {rankedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} rank={index + 1} />
          ))}
        </div>
      </section>
    </main>
  );
}
