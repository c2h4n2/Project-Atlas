"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  categories,
  getCategory,
  getCategoryForPath,
} from "@/data/categories";

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">
            A
          </span>

          <div>
            <p className="text-base font-black uppercase tracking-[0.08em] sm:text-lg">
              Project Atlas
            </p>

            <p className="mt-1 hidden text-[11px] text-slate-500 sm:block">
              Independent product research
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}

function HeaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  const selectedCategory =
    getCategoryForPath(pathname) ??
    (pathname.startsWith("/compare")
      ? getCategory(searchParams.get("category") ?? "")
      : null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setCategoryMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function closeMenus() {
    setMenuOpen(false);
    setCategoryMenuOpen(false);
  }

  function isActive(href: string) {
    return pathname.startsWith(href.split("?")[0]);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          onClick={closeMenus}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">
            A
          </span>

          <div>
            <p className="text-base font-black uppercase tracking-[0.08em] sm:text-lg">
              Project Atlas
            </p>

            <p className="mt-1 hidden text-[11px] text-slate-500 sm:block">
              Independent product research
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5"
          >
            Home
          </Link>

          <div ref={categoryMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setCategoryMenuOpen((open) => !open)}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5"
            >
              Categories <span aria-hidden="true">⌄</span>
            </button>

            {categoryMenuOpen && (
              <div className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.href}
                    onClick={closeMenus}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${
                      selectedCategory?.id === category.id
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {category.label}
                    {selectedCategory?.id === category.id && <span>✓</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {selectedCategory ? (
            <>
              <Link
                href={selectedCategory.bestHref}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                  isActive(selectedCategory.bestHref)
                    ? "bg-white/10 text-cyan-300"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                Best Products
              </Link>

              <Link
                href={selectedCategory.compareHref}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                  isActive("/compare")
                    ? "bg-white/10 text-cyan-300"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                Compare
              </Link>
            </>
          ) : (
            <>
              <span className="px-4 py-2.5 text-sm font-semibold text-slate-600">
                Best Products
              </span>

              <span className="px-4 py-2.5 text-sm font-semibold text-slate-600">
                Compare
              </span>
            </>
          )}

          <Link
            href="/about"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 lg:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-slate-950 px-6 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link
              href="/"
              onClick={closeMenus}
              className="rounded-xl px-4 py-3 text-sm font-semibold"
            >
              Home
            </Link>

            <p className="px-4 pt-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Categories
            </p>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                onClick={closeMenus}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5"
              >
                {category.label}
              </Link>
            ))}

            {selectedCategory && (
              <>
                <Link
                  href={selectedCategory.bestHref}
                  onClick={closeMenus}
                  className="rounded-xl px-4 py-3 text-sm font-semibold"
                >
                  Best Products
                </Link>

                <Link
                  href={selectedCategory.compareHref}
                  onClick={closeMenus}
                  className="rounded-xl px-4 py-3 text-sm font-semibold"
                >
                  Compare
                </Link>
              </>
            )}

            <Link
              href="/about"
              onClick={closeMenus}
              className="rounded-xl px-4 py-3 text-sm font-semibold"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className="rounded-xl px-4 py-3 text-sm font-semibold"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <HeaderContent />
    </Suspense>
  );
}
