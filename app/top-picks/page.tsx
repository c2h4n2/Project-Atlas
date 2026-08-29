import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Top Picks",
  description:
    "See Project Atlas top-rated products across every active product category.",
};

const groups = categories.map((category) => ({
  id: category.id,
  label: category.label,
  heading: `Top ${category.label}`,
  href: category.bestHref,
}));

export default function TopPicksPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Atlas rankings
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Top Picks
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Start with our highest-rated products in each active category.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        {groups.map((group, groupIndex) => {
          const groupProducts = products
            .filter(
              (product) =>
                (product.categoryId ?? "ai-glasses") === group.id,
            )
            .sort((a, b) => b.editorialScore - a.editorialScore)
            .slice(0, 3);

          return (
            <section
              key={group.id}
              className={groupIndex > 0 ? "mt-16" : ""}
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    {group.label}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {group.heading}
                  </h2>
                </div>

                <Link
                  href={group.href}
                  className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  View full rankings →
                </Link>
              </div>

              <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {groupProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    rank={index + 1}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}
