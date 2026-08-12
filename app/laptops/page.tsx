import LaptopUseCaseExplorer from "@/components/LaptopUseCaseExplorer";
import { products } from "@/data/products";

export default function LaptopsPage() {
  const laptopProducts = products.filter(
    (product) => product.categoryId === "laptops",
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          COMPUTING
        </p>

        <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
          Laptops
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Find the right laptop for study, business, engineering, gaming, or
          coding. Project C2H4N3 compares performance, portability, displays,
          battery life, and practical value across current laptop models.
        </p>

        <div className="mt-10">
          <LaptopUseCaseExplorer products={laptopProducts} />
        </div>
      </section>
    </main>
  );
}
