import ProductExplorer from "@/components/ProductExplorer";
import { products } from "@/data/products";

export default function MonitorsPage() {
  const categoryProducts = products.filter(
    (product) => product.categoryId === "monitors",
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          DISPLAYS
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
          Monitors
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Search and compare Project C2H4N3 monitor reviews across productivity, creative, ultrawide, OLED, and high-refresh gaming displays.
        </p>
        <div className="mt-10">
          <ProductExplorer products={categoryProducts} />
        </div>
      </section>
    </main>
  );
}
