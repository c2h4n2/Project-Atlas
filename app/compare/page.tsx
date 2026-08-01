"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { products, type Product } from "@/data/products";

const COMPARE_STORAGE_KEY = "project-atlas-compare-products";
const MAX_COMPARE_PRODUCTS = 3;

const scoreLabels = {
  design: "Design",
  comfort: "Comfort",
  camera: "Camera",
  audio: "Audio",
  battery: "Battery",
  aiFeatures: "AI features",
  value: "Value",
};

type ProductSpecificationRow =
  | {
      source: "product";
      key: "fit" | "frameSize";
      label: string;
    }
  | {
      source: "specs";
      key: keyof Product["specs"];
      label: string;
    };

const specificationRows: ProductSpecificationRow[] = [
  {
    source: "product",
    key: "fit",
    label: "Fit",
  },
  {
    source: "product",
    key: "frameSize",
    label: "Frame size",
  },
  {
    source: "specs",
    key: "weight",
    label: "Weight",
  },
  {
    source: "specs",
    key: "battery",
    label: "Battery",
  },
  {
    source: "specs",
    key: "camera",
    label: "Camera",
  },
  {
    source: "specs",
    key: "microphones",
    label: "Microphones",
  },
  {
    source: "specs",
    key: "speakers",
    label: "Speakers",
  },
  {
    source: "specs",
    key: "frameStyles",
    label: "Frame styles",
  },
  {
    source: "specs",
    key: "prescriptionLenses",
    label: "Prescription lenses",
  },
  {
    source: "specs",
    key: "voiceAssistant",
    label: "Voice assistant",
  },
  {
    source: "specs",
    key: "videoResolution",
    label: "Video resolution",
  },
];

function getQualificationLabel(product: Product) {
  switch (product.qualification) {
    case "top-pick":
      return "Top Pick";

    case "strong-pick":
      return "Strong Pick";

    default:
      return "Qualified";
  }
}

function getScoreBarClass(score: number) {
  if (score >= 9) {
    return "bg-emerald-400";
  }

  if (score >= 8) {
    return "bg-cyan-400";
  }

  if (score >= 7) {
    return "bg-amber-400";
  }

  return "bg-orange-400";
}

function getAffiliateLink(product: Product) {
  return product.affiliateLinks.find((link) => link.url.trim() !== "");
}

function getSpecificationValue(
  product: Product,
  specification: ProductSpecificationRow,
) {
  if (specification.source === "product") {
    return product[specification.key];
  }

  return product.specs[specification.key];
}

function getDefaultComparisonSlugs() {
  return [...products]
    .filter((product) => product.category === "AI Glasses")
    .sort((a, b) => b.editorialScore - a.editorialScore)
    .slice(0, MAX_COMPARE_PRODUCTS)
    .map((product) => product.slug);
}

function readStoredComparison() {
  try {
    const storedValue = window.localStorage.getItem(COMPARE_STORAGE_KEY);

    if (storedValue === null) {
      return {
        hasSavedSelection: false,
        slugs: getDefaultComparisonSlugs(),
      };
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return {
        hasSavedSelection: false,
        slugs: getDefaultComparisonSlugs(),
      };
    }

    const validSlugs = parsedValue
      .filter((value): value is string => typeof value === "string")
      .filter((slug, index, values) => values.indexOf(slug) === index)
      .filter((slug) => products.some((product) => product.slug === slug))
      .slice(0, MAX_COMPARE_PRODUCTS);

    return {
      hasSavedSelection: true,
      slugs: validSlugs,
    };
  } catch {
    return {
      hasSavedSelection: false,
      slugs: getDefaultComparisonSlugs(),
    };
  }
}

function saveStoredComparison(slugs: string[]) {
  window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(slugs));

  window.dispatchEvent(
    new CustomEvent("atlas-compare-updated", {
      detail: {
        productSlugs: slugs,
      },
    }),
  );
}

export default function ComparePage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [hasSavedSelection, setHasSavedSelection] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const loadComparison = () => {
      const storedComparison = readStoredComparison();

      setSelectedSlugs(storedComparison.slugs);
      setHasSavedSelection(storedComparison.hasSavedSelection);
      setIsLoaded(true);
    };

    loadComparison();

    window.addEventListener("storage", loadComparison);
    window.addEventListener("atlas-compare-updated", loadComparison);

    return () => {
      window.removeEventListener("storage", loadComparison);
      window.removeEventListener("atlas-compare-updated", loadComparison);
    };
  }, []);

  const comparisonProducts = useMemo(
    () =>
      selectedSlugs
        .map((slug) => products.find((product) => product.slug === slug))
        .filter((product): product is Product => Boolean(product)),
    [selectedSlugs],
  );

  const bestOverallProduct = useMemo(
    () =>
      [...comparisonProducts].sort(
        (a, b) => b.editorialScore - a.editorialScore,
      )[0],
    [comparisonProducts],
  );

  const reviewScoreRows = Object.keys(
    scoreLabels,
  ) as (keyof Product["reviewScores"])[];

  function removeProduct(productSlug: string) {
    const updatedSlugs = selectedSlugs.filter(
      (slug) => slug !== productSlug,
    );

    saveStoredComparison(updatedSlugs);
    setSelectedSlugs(updatedSlugs);
    setHasSavedSelection(true);
    setStatusMessage("Product removed from comparison.");
  }

  function clearComparison() {
    saveStoredComparison([]);
    setSelectedSlugs([]);
    setHasSavedSelection(true);
    setStatusMessage("Comparison cleared.");
  }

  function restoreTopProducts() {
    const defaultSlugs = getDefaultComparisonSlugs();

    saveStoredComparison(defaultSlugs);
    setSelectedSlugs(defaultSlugs);
    setHasSavedSelection(true);
    setStatusMessage("Top products added to comparison.");
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <div
              aria-hidden="true"
              className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400"
            />

            <p className="mt-5 font-semibold text-slate-300">
              Loading your comparison…
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <Link
            href="/ai-glasses"
            className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            ← Back to AI glasses
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Product comparison
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                Compare AI glasses
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Compare your selected AI glasses across fit, frame size,
                editorial scores, customer ratings, specifications, strengths,
                drawbacks, and recommended use cases.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
                Current comparison
              </p>

              <p className="mt-3 text-3xl font-black">
                {comparisonProducts.length}
                <span className="ml-1 text-base font-semibold text-slate-500">
                  / {MAX_COMPARE_PRODUCTS}
                </span>
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {hasSavedSelection
                  ? "Products selected from Atlas review cards."
                  : "Showing the highest-ranked products by default."}
              </p>

              {comparisonProducts.length > 0 && (
                <button
                  type="button"
                  onClick={clearComparison}
                  className="mt-5 text-sm font-semibold text-rose-300 transition hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                >
                  Clear comparison
                </button>
              )}
            </div>
          </div>

          <p
            aria-live="polite"
            className={`mt-5 text-sm ${
              statusMessage ? "text-cyan-300" : "text-transparent"
            }`}
          >
            {statusMessage || "Comparison status"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        {comparisonProducts.length > 0 ? (
          <>
            <section>
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Quick comparison
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    Selected products side by side
                  </h2>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/ai-glasses"
                    className="inline-flex justify-center rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
                  >
                    Add another product
                  </Link>

                  <Link
                    href="/best-ai-glasses"
                    className="inline-flex justify-center rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
                  >
                    View complete rankings
                  </Link>
                </div>
              </div>

              <div
                className={`mt-8 grid gap-6 ${
                  comparisonProducts.length === 1
                    ? "mx-auto max-w-md"
                    : comparisonProducts.length === 2
                      ? "lg:grid-cols-2"
                      : "lg:grid-cols-3"
                }`}
              >
                {comparisonProducts.map((product) => {
                  const affiliateLink = getAffiliateLink(product);
                  const isBestOverall =
                    product.id === bestOverallProduct?.id;

                  return (
                    <article
                      key={product.id}
                      className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
                    >
                      <div className="relative">
                        <Link
                          href={`/products/${product.slug}`}
                          aria-label={`Read the full ${product.name} review`}
                          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
                        >
                          <ProductImage
                            src={product.image.src}
                            alt={product.image.alt}
                            aspectRatio="card"
                            sizes="(max-width: 1023px) 100vw, 33vw"
                            className="rounded-none border-0 border-b border-white/10"
                          />
                        </Link>

                        {isBestOverall && (
                          <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-cyan-400 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-slate-950 shadow-lg">
                            Highest Atlas score
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeProduct(product.slug)}
                          aria-label={`Remove ${product.name} from comparison`}
                          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/90 text-lg font-bold text-white shadow-lg transition hover:border-rose-400/60 hover:bg-rose-400/20 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                        >
                          ×
                        </button>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-sm font-semibold text-cyan-400">
                          {product.brand}
                        </p>

                        <h3 className="mt-3 text-2xl font-bold leading-tight">
                          <Link
                            href={`/products/${product.slug}`}
                            className="transition hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                          >
                            {product.name}
                          </Link>
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                            {product.verdictLabel}
                          </span>

                          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                            {getQualificationLabel(product)}
                          </span>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-slate-300">
                          {product.shortDescription}
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              Fit
                            </p>

                            <p className="mt-1.5 text-sm font-bold text-white">
                              {product.fit}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              Frame size
                            </p>

                            <p className="mt-1.5 text-sm font-bold text-white">
                              {product.frameSize}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300">
                              Atlas score
                            </p>

                            <div className="mt-2 flex items-end gap-1">
                              <span className="text-3xl font-black">
                                {product.editorialScore.toFixed(1)}
                              </span>

                              <span className="pb-1 text-xs text-slate-400">
                                /10
                              </span>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-slate-800 p-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                              Customers
                            </p>

                            <p className="mt-2 text-2xl font-black">
                              ⭐ {product.customerRating.toFixed(1)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <p className="text-sm font-bold">Best for</p>

                          <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-300">
                            {product.bestFor.slice(0, 3).map((item) => (
                              <li key={item} className="flex gap-2">
                                <span
                                  aria-hidden="true"
                                  className="shrink-0 font-bold text-cyan-400"
                                >
                                  ✓
                                </span>

                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-auto pt-7">
                          <div className="flex flex-col gap-3">
                            <Link
                              href={`/products/${product.slug}`}
                              className="rounded-full bg-cyan-400 px-5 py-3.5 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                              View full review
                            </Link>

                            {affiliateLink && (
                              <a
                                href={affiliateLink.url}
                                target="_blank"
                                rel="nofollow sponsored noopener noreferrer"
                                className="rounded-full border border-white/20 bg-white/5 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                              >
                                Check current price at{" "}
                                {affiliateLink.retailer}
                              </a>
                            )}
                          </div>

                          {affiliateLink && (
                            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                              Project Atlas may earn a commission. Price and
                              availability are provided by the retailer and may
                              change.
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="mt-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Score comparison
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Category-by-category ratings
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                Scores reflect our editorial assessment of each product across
                the areas that matter most for everyday AI-glasses use.
              </p>

              <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900">
                      <th className="w-52 border-b border-r border-white/10 p-5 text-left">
                        Category
                      </th>

                      {comparisonProducts.map((product) => (
                        <th
                          key={product.id}
                          className="border-b border-r border-white/10 p-5 text-left last:border-r-0"
                        >
                          <p className="text-sm font-semibold text-cyan-400">
                            {product.brand}
                          </p>

                          <p className="mt-2 text-lg font-bold">
                            {product.name}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {reviewScoreRows.map((scoreKey) => (
                      <tr key={scoreKey} className="bg-slate-950">
                        <td className="border-b border-r border-white/10 p-5 font-semibold">
                          {scoreLabels[scoreKey]}
                        </td>

                        {comparisonProducts.map((product) => {
                          const score = product.reviewScores[scoreKey];

                          return (
                            <td
                              key={product.id}
                              className="border-b border-r border-white/10 p-5 last:border-r-0"
                            >
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-xl font-black">
                                  {score.toFixed(1)}
                                </span>

                                <span className="text-sm text-slate-500">
                                  /10
                                </span>
                              </div>

                              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                                <div
                                  className={`h-full rounded-full ${getScoreBarClass(
                                    score,
                                  )}`}
                                  style={{
                                    width: `${Math.min(
                                      Math.max(score * 10, 0),
                                      100,
                                    )}%`,
                                  }}
                                />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    <tr className="bg-cyan-400/5">
                      <td className="border-r border-white/10 p-5 font-bold text-cyan-300">
                        Atlas score
                      </td>

                      {comparisonProducts.map((product) => (
                        <td
                          key={product.id}
                          className="border-r border-white/10 p-5 last:border-r-0"
                        >
                          <span className="text-3xl font-black">
                            {product.editorialScore.toFixed(1)}
                          </span>

                          <span className="ml-1 text-sm text-slate-400">
                            /10
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Specifications
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Fit and technical details compared
              </h2>

              <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900">
                      <th className="w-52 border-b border-r border-white/10 p-5 text-left">
                        Specification
                      </th>

                      {comparisonProducts.map((product) => (
                        <th
                          key={product.id}
                          className="border-b border-r border-white/10 p-5 text-left last:border-r-0"
                        >
                          <p className="text-sm font-semibold text-cyan-400">
                            {product.brand}
                          </p>

                          <p className="mt-2 text-lg font-bold">
                            {product.name}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {specificationRows.map((specification) => (
                      <tr
                        key={`${specification.source}-${specification.key}`}
                      >
                        <td className="border-b border-r border-white/10 bg-slate-900/50 p-5 font-semibold">
                          {specification.label}
                        </td>

                        {comparisonProducts.map((product) => (
                          <td
                            key={product.id}
                            className="border-b border-r border-white/10 p-5 align-top leading-7 text-slate-300 last:border-r-0"
                          >
                            {getSpecificationValue(product, specification)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Strengths and drawbacks
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Where each product stands out
              </h2>

              <div
                className={`mt-8 grid gap-6 ${
                  comparisonProducts.length === 1
                    ? "mx-auto max-w-xl"
                    : comparisonProducts.length === 2
                      ? "lg:grid-cols-2"
                      : "lg:grid-cols-3"
                }`}
              >
                {comparisonProducts.map((product) => (
                  <article
                    key={product.id}
                    className="rounded-3xl border border-white/10 bg-slate-900 p-6"
                  >
                    <p className="text-sm font-semibold text-cyan-400">
                      {product.brand}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">{product.name}</h3>

                    <div className="mt-6">
                      <p className="font-bold text-emerald-300">Pros</p>

                      <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                        {product.pros.map((pro) => (
                          <li key={pro} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="shrink-0 font-bold text-emerald-400"
                            >
                              ✓
                            </span>

                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7 border-t border-white/10 pt-6">
                      <p className="font-bold text-rose-300">Cons</p>

                      <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                        {product.cons.map((con) => (
                          <li key={con} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="shrink-0 font-bold text-rose-400"
                            >
                              –
                            </span>

                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {bestOverallProduct && (
              <section className="mt-16 overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-cyan-400/5">
                <div className="grid gap-0 lg:grid-cols-[0.7fr_1.3fr]">
                  <div className="border-b border-white/10 bg-slate-900 p-6 lg:border-b-0 lg:border-r">
                    <ProductImage
                      src={bestOverallProduct.image.src}
                      alt={bestOverallProduct.image.alt}
                      aspectRatio="square"
                      sizes="(max-width: 1023px) 100vw, 35vw"
                      className="border-0 bg-slate-950"
                    />
                  </div>

                  <div className="p-7 sm:p-10">
                    <span className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
                      Highest selected score
                    </span>

                    <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                      Our recommendation
                    </p>

                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                      {bestOverallProduct.name}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-300">
                      {bestOverallProduct.editorVerdict}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <span className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-semibold">
                        Atlas score{" "}
                        {bestOverallProduct.editorialScore.toFixed(1)}/10
                      </span>

                      <span className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-semibold">
                        ⭐ {bestOverallProduct.customerRating.toFixed(1)}
                      </span>

                      <span className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-semibold">
                        {bestOverallProduct.totalReviewCount.toLocaleString()}{" "}
                        reviews
                      </span>

                      <span className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-semibold">
                        Fit: {bestOverallProduct.fit}
                      </span>

                      <span className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-semibold">
                        {bestOverallProduct.frameSize} frame
                      </span>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Link
                        href={`/products/${bestOverallProduct.slug}`}
                        className="rounded-full bg-cyan-400 px-6 py-3.5 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
                      >
                        Read full review
                      </Link>

                      {getAffiliateLink(bestOverallProduct) && (
                        <a
                          href={getAffiliateLink(bestOverallProduct)?.url}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                        >
                          Check current price at{" "}
                          {getAffiliateLink(bestOverallProduct)?.retailer}
                        </a>
                      )}
                    </div>

                    {getAffiliateLink(bestOverallProduct) && (
                      <p className="mt-4 text-sm leading-6 text-slate-500">
                        Project Atlas may earn a commission. Price and
                        availability are provided by the retailer and may
                        change.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-2xl text-cyan-300">
              +
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Your comparison is empty
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              Add up to three products from any Atlas product card, or restore
              the highest-ranked AI glasses as a starting point.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/ai-glasses"
                className="rounded-full bg-cyan-400 px-6 py-3.5 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Browse AI glasses
              </Link>

              <button
                type="button"
                onClick={restoreTopProducts}
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
              >
                Compare top products
              </button>
            </div>
          </div>
        )}

        <p className="mt-8 text-sm leading-6 text-slate-500">
          Affiliate disclosure: Project Atlas may earn a commission from
          qualifying purchases made through eligible retailer links, at no
          additional cost to you. Project Atlas does not display product
          prices. Current price and availability are provided by the retailer.
        </p>
      </section>
    </main>
  );
}