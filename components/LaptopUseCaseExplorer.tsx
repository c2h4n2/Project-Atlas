"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

type LaptopUseCase =
  | "All"
  | "Study"
  | "Business"
  | "Engineering"
  | "Gaming"
  | "Coding";

type Props = {
  products: Product[];
};

const useCases: LaptopUseCase[] = [
  "All",
  "Study",
  "Business",
  "Engineering",
  "Gaming",
  "Coding",
];

const laptopUseCaseMap: Record<string, LaptopUseCase[]> = {
  "apple-macbook-air-13-m5": ["Study", "Business", "Coding"],
  "apple-macbook-air-15-m5": ["Study", "Business", "Coding"],
  "apple-macbook-pro-14-m5": ["Business", "Engineering", "Coding"],
  "apple-macbook-pro-14-m5-pro": ["Business", "Engineering", "Coding"],
  "apple-macbook-pro-16-m5-max": ["Business", "Engineering", "Coding"],
  "dell-xps-13-2026": ["Study", "Business", "Coding"],
  "dell-xps-14-2026": ["Business", "Engineering", "Coding"],
  "dell-xps-16-2026": ["Business", "Engineering", "Coding"],
  "dell-pro-max-14-premium": ["Business", "Engineering", "Coding"],
  "dell-pro-max-16-premium": ["Business", "Engineering", "Coding"],
  "lenovo-thinkpad-x1-carbon-gen-14": ["Business", "Coding"],
  "lenovo-thinkpad-x1-carbon-gen-13": ["Business", "Coding"],
  "asus-rog-zephyrus-g14-2026": ["Engineering", "Gaming", "Coding"],
  "asus-rog-zephyrus-g16-2026": ["Engineering", "Gaming", "Coding"],
  "apple-macbook-air-13-m5-24gb": ["Study", "Business", "Coding"],
};

const useCaseDescriptions: Record<Exclude<LaptopUseCase, "All">, string> = {
  Study:
    "Portable, reliable laptops for classes, research, writing, video calls, and everyday student workloads.",
  Business:
    "Professional laptops focused on portability, battery life, build quality, security, and office productivity.",
  Engineering:
    "Higher-performance systems suited to CAD, simulation, technical software, data work, and demanding multitasking.",
  Gaming:
    "Performance-focused laptops with stronger graphics, cooling, and high-refresh displays for modern PC games.",
  Coding:
    "Developer-friendly laptops for programming, terminals, IDEs, containers, local builds, and software development.",
};

export default function LaptopUseCaseExplorer({ products }: Props) {
  const [selectedUseCase, setSelectedUseCase] =
    useState<LaptopUseCase>("All");

  const filteredProducts = useMemo(() => {
    if (selectedUseCase === "All") {
      return products;
    }

    return products.filter((product) =>
      laptopUseCaseMap[product.slug]?.includes(selectedUseCase),
    );
  }, [products, selectedUseCase]);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {useCases.map((useCase) => {
          const isSelected = selectedUseCase === useCase;

          return (
            <button
              key={useCase}
              type="button"
              onClick={() => setSelectedUseCase(useCase)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                isSelected
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/40 hover:bg-white/10"
              }`}
            >
              <span className="text-sm font-black">{useCase}</span>
            </button>
          );
        })}
      </div>

      {selectedUseCase !== "All" && (
        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <p className="text-sm font-bold text-cyan-300">
            Best laptops for {selectedUseCase.toLowerCase()}
          </p>
          <p className="mt-2 leading-7 text-slate-300">
            {useCaseDescriptions[selectedUseCase]}
          </p>
        </div>
      )}

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
          {selectedUseCase === "All"
            ? "All laptop reviews"
            : `${selectedUseCase} laptops`}
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "laptop" : "laptops"}
        </h2>
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts
          .slice()
          .sort((a, b) => b.editorialScore - a.editorialScore)
          .map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              rank={index + 1}
            />
          ))}
      </div>
    </div>
  );
}
