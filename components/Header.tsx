"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Category = {
  id: string;
  label: string;
  href: string;
  bestHref: string;
  compareHref: string;
};

const categories: Category[] = [
  {
    id: "ai-glasses",
    label: "AI Glasses",
    href: "/ai-glasses",
    bestHref: "/best-ai-glasses",
    compareHref: "/compare?category=ai-glasses",
  },
];

function getCategoryFromPath(pathname: string): Category | null {
  if (
    pathname.startsWith("/ai-glasses") ||
    pathname.startsWith("/best-ai-glasses") ||
    pathname.startsWith("/products/")
  ) {
    return categories.find((category) => category.id === "ai-glasses") ?? null;
  }

  if (
    pathname.startsWith("/compare") &&
    typeof window !== "undefined"
  ) {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryId = searchParams.get("category");

    return categories.find((category) => category.id === categoryId) ?? null;
  }

  return null;
}

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [manuallySelectedCategory, setManuallySelectedCategory] =
    useState<Category | null>(null);

  const categoryMenuRef = useRef<HTMLDivElement>(null);

  const routeCategory = getCategoryFromPath(pathname);

  const selectedCategory =
    pathname === "/"
      ? null
      : routeCategory ?? manuallySelectedCategory;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(target)
      ) {
        setCategoryMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function isActive(href: string) {
    const pathOnly = href.split("?")[0];

    if (pathOnly === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(pathOnly);
  }

  function chooseCategory(category: Category) {
    setManuallySelectedCategory(category);
    setCategoryMenuOpen(false);
    setMenuOpen(false);
  }

  function clearCategory() {
    setManuallySelectedCategory(null);
    setCategoryMenuOpen(false);
    setMenuOpen(false);
  }

  function closeMenus() {
    setCategoryMenuOpen(false);
    setMenuOpen(false);
  }

  const bestProductsEnabled = selectedCategory !== null;
  const compareEnabled = selectedCategory !== null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          onClick={clearCategory}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400 font-black text-slate-950 shadow-lg shadow-cyan-950/20 transition group-hover:bg-cyan-300">
            A
          </span>

          <div>
            <p className="text-base font-black uppercase leading-none tracking-[0.08em] sm:text-lg">
              Project Atlas
            </p>

            <p className="mt-1 hidden text-[11px] text-slate-500 sm:block">
              Independent product research
            </p>
          </div>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          <Link
            href="/"
            onClick={clearCategory}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              pathname === "/"
                ? "bg-white/10 text-cyan-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Home
          </Link>

          <div ref={categoryMenuRef} className="relative">
            <button
              type="button"
              aria-expanded={categoryMenuOpen}
              aria-controls="desktop-category-menu"
              onClick={() =>
                setCategoryMenuOpen((current) => !current)
              }
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                selectedCategory
                  ? "text-white hover:bg-white/5"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>Categories</span>

              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={`h-4 w-4 transition ${
                  categoryMenuOpen ? "rotate-180" : ""
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

            {categoryMenuOpen && (
              <div
                id="desktop-category-menu"
                className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/40"
              >
                <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Product categories
                </p>

                {categories.map((category) => {
                  const active =
                    selectedCategory?.id === category.id;

                  return (
                    <Link
                      key={category.id}
                      href={category.href}
                      onClick={() => chooseCategory(category)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? "bg-cyan-400/10 text-cyan-300"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{category.label}</span>

                      {active && (
                        <span
                          aria-hidden="true"
                          className="text-cyan-400"
                        >
                          ✓
                        </span>
                      )}
                    </Link>
                  );
                })}

                <div className="mt-2 border-t border-white/10 px-3 py-3">
                  <p className="text-xs leading-5 text-slate-500">
                    More technology categories will be added after launch.
                  </p>
                </div>
              </div>
            )}
          </div>

          {bestProductsEnabled ? (
            <Link
              href={selectedCategory.bestHref}
              onClick={closeMenus}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                isActive(selectedCategory.bestHref)
                  ? "bg-white/10 text-cyan-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Best Products
            </Link>
          ) : (
            <span
              aria-disabled="true"
              title="Select a category first"
              className="cursor-not-allowed rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600"
            >
              Best Products
            </span>
          )}

          {compareEnabled ? (
            <Link
              href={selectedCategory.compareHref}
              onClick={closeMenus}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                isActive("/compare")
                  ? "bg-white/10 text-cyan-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Compare
            </Link>
          ) : (
            <span
              aria-disabled="true"
              title="Select a category first"
              className="cursor-not-allowed rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600"
            >
              Compare
            </span>
          )}

          <Link
            href="/about"
            onClick={closeMenus}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              isActive("/about")
                ? "bg-white/10 text-cyan-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={closeMenus}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              isActive("/contact")
                ? "bg-white/10 text-cyan-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {selectedCategory ? (
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-bold text-cyan-300">
              {selectedCategory.label}
            </span>
          ) : (
            <span className="text-xs font-medium text-slate-600">
              Select a category
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setMenuOpen((current) => !current);
            setCategoryMenuOpen(false);
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white transition hover:border-cyan-400/40 hover:bg-white/10 lg:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-slate-950 px-6 py-5 lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-7xl flex-col gap-2"
          >
            <Link
              href="/"
              onClick={clearCategory}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                pathname === "/"
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Home
            </Link>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-2">
              <button
                type="button"
                aria-expanded={categoryMenuOpen}
                aria-controls="mobile-category-menu"
                onClick={() =>
                  setCategoryMenuOpen((current) => !current)
                }
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/5"
              >
                <span>
                  {selectedCategory
                    ? `Category: ${selectedCategory.label}`
                    : "Select a category"}
                </span>

                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className={`h-4 w-4 transition ${
                    categoryMenuOpen ? "rotate-180" : ""
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

              {categoryMenuOpen && (
                <div
                  id="mobile-category-menu"
                  className="mt-1 space-y-1 border-t border-white/10 pt-2"
                >
                  {categories.map((category) => {
                    const active =
                      selectedCategory?.id === category.id;

                    return (
                      <Link
                        key={category.id}
                        href={category.href}
                        onClick={() => chooseCategory(category)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          active
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{category.label}</span>

                        {active && (
                          <span aria-hidden="true">✓</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {bestProductsEnabled ? (
              <Link
                href={selectedCategory.bestHref}
                onClick={closeMenus}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(selectedCategory.bestHref)
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Best Products
              </Link>
            ) : (
              <div className="rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-slate-600">
                  Best Products
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Select a category first
                </p>
              </div>
            )}

            {compareEnabled ? (
              <Link
                href={selectedCategory.compareHref}
                onClick={closeMenus}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive("/compare")
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Compare
              </Link>
            ) : (
              <div className="rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-slate-600">
                  Compare
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Select a category first
                </p>
              </div>
            )}

            <div className="my-2 border-t border-white/10" />

            <Link
              href="/about"
              onClick={closeMenus}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/about")
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/contact")
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}