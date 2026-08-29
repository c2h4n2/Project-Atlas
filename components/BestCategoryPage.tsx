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

  const topPick = rankedProducts[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Atlas rankings
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Best {category.label}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {rankedProducts.length} reviewed products ranked by Atlas editorial score using
            category-specific performance, usability, features, limitations, and value criteria.
          </p>

          {topPick && (
            <div className="mt-8 rounded-3xl border border-cyan-400/25 bg-cyan-400/5 p-6 sm:p-7">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    Best overall
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{topPick.name}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    {topPick.editorVerdict}
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Atlas score
                  </p>
                  <p className="mt-1 text-4xl font-black">{topPick.editorialScore.toFixed(1)}<span className="text-sm text-slate-400">/10</span></p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/products/${topPick.slug}`} className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">
                  Why it ranks #1
                </Link>
                <Link href={category.compareHref} className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:border-cyan-400/50 hover:bg-white/10">
                  Compare the shortlist
                </Link>
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={category.href} className="rounded-full border border-white/20 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/5">
              Browse all {category.label.toLowerCase()}
            </Link>
            <Link href="/editorial-policy" className="rounded-full border border-white/20 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/5">
              How Atlas ranks products
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <div className="mb-8 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-400">
          <strong className="text-white">How to use this list:</strong> start with fit and use case,
          then compare the top few products on the specs that matter to you. A higher Atlas score is
          not a promise that one product is best for every buyer.
        </div>
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {rankedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} rank={index + 1} />
          ))}
        </div>
      </section>
    </main>
  );
}
