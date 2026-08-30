import Link from "next/link";
import ProductExplorer from "@/components/ProductExplorer";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";

export default function CategoryLanding({ categoryId }: { categoryId: string }) {
  const category = getCategory(categoryId);
  if (!category) return null;

  const categoryProducts = products.filter(
    (product) => product.categoryId === categoryId,
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            {category.label}
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-6xl">
            Compare {category.label.toLowerCase()} with less guesswork
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {category.description} Explore {categoryProducts.length} Atlas-reviewed products, then sort, compare, and open the full review before you buy.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-400">
            {categoryProducts.length} products reviewed in this category.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={category.bestHref} className="rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300">
              View top picks
            </Link>
            <Link href={category.compareHref} className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/10">
              Compare side by side
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <ProductExplorer products={categoryProducts} showBrandFilter />
      </section>
    </main>
  );
}
