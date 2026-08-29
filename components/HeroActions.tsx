"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";


export default function HeroActions() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setCategoriesOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <div ref={categoriesRef} className="relative">
        <button
          type="button"
          aria-expanded={categoriesOpen}
          aria-controls="home-category-menu"
          onClick={() => setCategoriesOpen((current) => !current)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 text-center font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
        >
          Categories
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className={`h-4 w-4 transition ${
              categoriesOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 8 4 4 4-4" />
          </svg>
        </button>

        {categoriesOpen && (
          <div
            id="home-category-menu"
            className="absolute left-0 top-full z-30 mt-3 max-h-[70vh] w-[min(34rem,calc(100vw-3rem))] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/40"
          >
            <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Product categories
            </p>

            <div className="grid gap-1 sm:grid-cols-2">
              {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={() => setCategoriesOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {category.label}
              </Link>
              ))}
            </div>
            <Link
              href="/all-products#browse-categories"
              onClick={() => setCategoriesOpen(false)}
              className="mt-2 block rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-bold text-cyan-300 transition hover:bg-white/5"
            >
              View all categories
            </Link>
          </div>
        )}
      </div>

      <Link
        href="/all-products"
        className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
      >
        All Products
      </Link>

      <Link
        href="/top-picks"
        className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
      >
        Top Picks
      </Link>

      <Link
        href="/compare"
        className="rounded-full border border-white/20 px-6 py-3.5 text-center font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
      >
        Compare Products
      </Link>
    </div>
  );
}
