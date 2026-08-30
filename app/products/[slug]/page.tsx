import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CustomerRating from "@/components/CustomerRating";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import ProductVerdict from "@/components/ProductVerdict";
import RetailerButtons from "@/components/RetailerButtons";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
  ).replace(/\/$/, "");
}

function absolute(path: string) {
  return path.startsWith("http")
    ? path
    : `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

function getScoreBarClass(score: number) {
  if (score >= 9) return "bg-emerald-400";
  if (score >= 8) return "bg-cyan-400";
  if (score >= 7) return "bg-amber-400";
  return "bg-orange-400";
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return {};

  const productUrl = absolute(`/products/${product.slug}`);
  const imageUrl = product.image.src ? absolute(product.image.src) : null;

  return {
    title: `${product.name} Review`,
    description: product.shortDescription,
    alternates: { canonical: productUrl },
    openGraph: {
      type: "article",
      title: `${product.name} Review`,
      description: product.shortDescription,
      url: productUrl,
      siteName: "Project C2H4N3",
      ...(imageUrl
        ? { images: [{ url: imageUrl, alt: product.image.alt }] }
        : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: `${product.name} Review`,
      description: product.shortDescription,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const categoryId = product.categoryId ?? "ai-glasses";
  const category = getCategory(categoryId);
  const reviewScores = Object.entries(product.reviewScores);
  const specifications = Object.entries(product.specs);

  const relatedProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (item.categoryId ?? "ai-glasses") === categoryId,
    )
    .sort((a, b) => b.editorialScore - a.editorialScore)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Link
          href={category?.href ?? "/all-products"}
          className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200"
        >
          ← Back to {category?.label ?? product.category}
        </Link>

        <section className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 bg-slate-800/50 p-5 sm:p-8 lg:border-b-0 lg:border-r">
              <ProductImage
                src={product.image.src}
                slug={product.slug}
                alt={product.image.alt}
                priority
                aspectRatio="square"
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="rounded-3xl border-white/10 bg-slate-950"
                imageClassName="p-8 sm:p-10"
              />
            </div>

            <div className="p-7 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                {product.category} review
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-3 text-lg font-semibold text-slate-400">
                {product.brand}
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                {product.shortDescription}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-cyan-300">
                    Atlas editorial score
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    {product.editorialScore.toFixed(1)}
                    <span className="text-base text-slate-400"> / 10</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Customer signal
                  </p>

                  <div className="mt-2">
                    <CustomerRating product={product} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Atlas verdict
                  </p>

                  <div className="mt-2">
                    <ProductVerdict product={product} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Type
                  </p>

                  <p className="mt-2 text-lg font-black">
                    {product.productType ?? product.category}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#editors-verdict"
                  className="rounded-full bg-cyan-400 px-6 py-3.5 text-center font-bold text-slate-950"
                >
                  Read our verdict
                </a>

                {category && (
                  <Link
                    href={category.compareHref}
                    className="rounded-full border border-white/20 px-6 py-3.5 text-center font-bold"
                  >
                    Compare products
                  </Link>
                )}
              </div>

              <div className="mt-6">
                <RetailerButtons links={product.affiliateLinks} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-white">Check retailer availability</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Retailer links may be affiliate links. Atlas editorial scores are independent of retailer availability and affiliate relationships.
              </p>
            </div>
            <div className="w-full lg:max-w-md">
              <RetailerButtons links={product.affiliateLinks} compact maxLinks={2} />
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Decision snapshot
              </p>
              <h2 className="mt-3 text-3xl font-bold">Who should buy it?</h2>
            </div>
            {category && (
              <Link
                href={category.compareHref}
                className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Compare against alternatives →
              </Link>
            )}
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Best fit
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {product.bestFor.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                Strongest reason to buy
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-200">
                {product.pros[0] ?? product.editorVerdict}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-rose-300">
                Biggest trade-off
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-200">
                {product.cons[0] ?? "No major drawback is listed in the current review."}
              </p>
            </div>
          </div>
        </section>

        <section
          id="editors-verdict"
          className="mt-12 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-7 sm:p-9"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Editor&apos;s verdict
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Our take on {product.name}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            {product.editorVerdict}
          </p>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
            <h2 className="text-3xl font-bold">
              C2H4N3 score details
            </h2>

            <div className="mt-7 space-y-5">
              {reviewScores.map(([key, score]) => (
                <div key={key}>
                  <div className="flex justify-between gap-4">
                    <p className="font-semibold">
                      {category?.scoreLabels[key] ?? key}
                    </p>

                    <p className="font-bold text-cyan-400">
                      {score.toFixed(1)}/10
                    </p>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${getScoreBarClass(
                        score,
                      )}`}
                      style={{
                        width: `${Math.min(score * 10, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
            <h2 className="text-3xl font-bold">Best for</h2>

            <ul className="mt-7 space-y-4">
              {product.bestFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300"
                >
                  <span className="text-cyan-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9">
          <h2 className="text-3xl font-bold">
            Quick specifications
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specifications.map(([key, value]) => (
              <div
                key={key}
                className="rounded-2xl border border-white/10 bg-slate-900 p-5"
              >
                <p className="text-sm font-semibold capitalize text-cyan-400">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>

                <p className="mt-2 leading-7 text-slate-300">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-7">
            <h2 className="text-2xl font-bold">Pros</h2>

            <ul className="mt-5 space-y-3 text-slate-300">
              {product.pros.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-rose-400/20 bg-rose-400/5 p-7">
            <h2 className="text-2xl font-bold">Cons</h2>

            <ul className="mt-5 space-y-3 text-slate-300">
              {product.cons.map((item) => (
                <li key={item}>– {item}</li>
              ))}
            </ul>
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  You may also like
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Related {category?.label ?? product.category}
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                  Compare this product with other highly rated options
                  from the same category.
                </p>
              </div>

              {category && (
                <Link
                  href={category.href}
                  className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  Browse full category →
                </Link>
              )}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-7">
          <h2 className="text-2xl font-bold">Product sources</h2>

          <div className="mt-6 space-y-4">
            {product.sources.map((source) => (
              <div
                key={`${source.platform}-${source.url}`}
                className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row"
              >
                <div>
                  <p className="font-semibold">
                    {source.platform}
                  </p>

                  <p className="text-sm text-slate-400">
                    Checked {source.checkedAt}
                  </p>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-cyan-400"
                >
                  View source
                </a>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}