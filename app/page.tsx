import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import HeroActions from "@/components/HeroActions";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const rankedProducts = [...products].sort(
  (a, b) => b.editorialScore - a.editorialScore,
);

const topProduct = rankedProducts[0];

const trustPoints = [
  {
    title: "Independent editorial scores",
    description:
      "C2H4N3 scores are shown separately from customer ratings and retailer data.",
  },
  {
    title: "Customer feedback considered",
    description:
      "We review rating averages, review volume, recurring praise, and common complaints.",
  },
  {
    title: "Side-by-side comparisons",
    description:
      "Products are evaluated using consistent categories so their strengths are easier to compare.",
  },
  {
    title: "Clear affiliate disclosure",
    description:
      "Project Atlas may earn a commission, but affiliate relationships do not determine rankings.",
  },
  {
    title: "No sponsored rankings",
    description:
      "Products do not receive a higher C2H4N3 score because of advertising or retailer relationships.",
  },
  {
    title: "Built for practical decisions",
    description:
      "Our reviews focus on real-world usefulness, limitations, comfort, features, and overall value.",
  },
];

const evaluationCriteria = [
  {
    title: "Design and comfort",
    description:
      "Build quality, comfort, controls, fit, and suitability for everyday use.",
  },
  {
    title: "Performance and features",
    description:
      "Category-specific performance, software, connectivity, and practical features.",
  },
  {
    title: "Customer experience",
    description:
      "Overall scores, review volume, recurring praise, and common complaints.",
  },
  {
    title: "Battery and value",
    description:
      "Battery life, charging, included features, practical limitations, and overall value.",
  },
];

export default function Home() {
  const topAffiliateLink = topProduct?.affiliateLinks.find(
    (link) => link.url.trim() !== "",
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Research before you buy
            </p>

            <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Find better products without the hype.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
               Project C2H4N3 brings {products.length} reviewed products across {categories.length} tech categories into one place, with separate editorial scores, customer signals, comparisons, and practical buying advice.
            </p>

            <HeroActions />
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
              <Link href="/editorial-policy" className="transition hover:text-cyan-300">Independent scoring methodology</Link>
              <Link href="/affiliate-disclosure" className="transition hover:text-cyan-300">Clear affiliate disclosure</Link>
              <span>{products.length} reviewed products</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Product qualification
            </p>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Only well-reviewed products make the list.
            </h2>

            <div className="mt-7 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="font-bold text-white">Strong customer ratings</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Products must demonstrate consistently positive customer
                  feedback from reputable sources.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="font-bold text-white">Meaningful review volume</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  We look beyond products supported by only a small number of
                  ratings.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="font-bold text-white">Multiple research signals</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Ratings, recurring complaints, product specifications, and
                  professional testing are considered together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {topProduct && (
        <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Highest C2H4N3 score
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                One of the strongest products in the catalog
              </h2>
            </div>

            <Link
              href="/top-picks"
              className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View top picks →
            </Link>
          </div>

          <article className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-cyan-400/5">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative border-b border-white/10 bg-slate-900 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <ProductImage
                  src={topProduct.image.src}
                  slug={topProduct.slug}
                  alt={topProduct.image.alt}
                  priority
                  aspectRatio="square"
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="border-white/10 bg-slate-950"
                />

                <span className="absolute left-10 top-10 rounded-full bg-white px-3 py-1.5 text-sm font-black text-slate-950 shadow-lg">
                  #1
                </span>

                <span className="absolute right-10 top-10 rounded-full bg-cyan-400 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-slate-950 shadow-lg">
                  Best overall
                </span>
              </div>

              <div className="flex flex-col p-7 sm:p-10">
                <p className="text-sm font-semibold text-cyan-400">
                  {topProduct.brand}
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {topProduct.name}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                    {topProduct.verdictLabel}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold capitalize text-slate-300">
                    {topProduct.qualification.replace("-", " ")}
                  </span>
                </div>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                  {topProduct.editorVerdict}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      C2H4N3 score
                    </p>
                    <div className="mt-2 flex items-end gap-1">
                      <span className="text-4xl font-black">
                      <span className="mr-2 text-amber-400">★</span>
                      
                        {topProduct.editorialScore.toFixed(1)}
                      </span>
                      <span className="pb-1 text-xs text-slate-400">/10</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      Overall score
                    </p>
                    <p className="mt-2 text-3xl font-black">
                      {topProduct.totalReviewCount > 0
                        ? `⭐ ${topProduct.customerRating.toFixed(1)}`
                        : "New"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      Reviews
                    </p>
                    <p className="mt-2 text-3xl font-black">
                      {topProduct.totalReviewCount > 0
                        ? topProduct.totalReviewCount.toLocaleString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="font-bold">Why it scores so highly</p>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
                    {topProduct.pros.slice(0, 4).map((pro) => (
                      <li
                        key={pro}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                      >
                        <span className="shrink-0 font-bold text-cyan-400">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/products/${topProduct.slug}`}
                      className="rounded-full bg-cyan-400 px-6 py-3.5 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Read full review
                    </Link>

                    <Link
                      href="/compare"
                      className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
                    >
                      Compare products
                    </Link>

                    {topAffiliateLink && (
                      <a
                        href={topAffiliateLink.url}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
                      >
                        Check current price at {topAffiliateLink.retailer}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Browse by category
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Start with the kind of tech you need
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Each category uses its own scoring criteria, comparison fields, and buying context.
              </p>
            </div>
            <Link href="/all-products" className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300">
              Search the full catalog →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const count = products.filter((product) => product.categoryId === category.id).length;
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold group-hover:text-cyan-300">{category.label}</h3>
                    <span className="rounded-full border border-white/10 bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-300">
                      {count}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{category.description}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-cyan-400">Explore category →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Featured products
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Products that meet our standards
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Products are ranked by Atlas editorial score using a consistent
                review framework.
              </p>
            </div>

            <Link
              href="/all-products"
              className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Browse all products
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rankedProducts.slice(0, 12).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Why trust Project Atlas
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Clear research without sponsored rankings
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Our goal is to make product research easier to understand while
            keeping customer ratings, editorial judgment, and retailer
            relationships clearly separated.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-3xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-400">
                ✓
              </div>
              <h3 className="mt-5 text-lg font-bold">{point.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="method"
        className="border-y border-white/10 bg-slate-900/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Our method
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Useful research, clearly explained
              </h2>

              <p className="mt-5 leading-7 text-slate-400">
                We evaluate products using consistent criteria and display the
                Atlas editorial score separately from retailer customer
                ratings.
              </p>

              <Link
                href="/about"
                className="mt-7 inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
              >
                Learn about Project Atlas
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {evaluationCriteria.map((criterion) => (
                <article
                  key={criterion.title}
                  className="rounded-3xl border border-white/10 bg-slate-950 p-6"
                >
                  <h3 className="text-lg font-bold">{criterion.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {criterion.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Find your best match
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Ready to find your next product?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Browse all reviews, see our top picks, or compare products side by
          side.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/top-picks"
            className="rounded-full bg-cyan-400 px-7 py-4 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Top Picks
          </Link>

          <Link
            href="/all-products"
            className="rounded-full border border-white/20 bg-white/5 px-7 py-4 text-center font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
          >
            All Products
          </Link>

          <Link
            href="/compare"
            className="rounded-full border border-white/20 bg-white/5 px-7 py-4 text-center font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
          >
            Compare Products
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <p className="text-sm leading-6 text-slate-500">
          Affiliate disclosure: Project C2H4N3 may earn a commission from qualifying
          purchases made through eligible retailer links, at no additional cost to you.
          Project C2H4N3 does not display product prices. Current price and availability
          are provided by the retailer.
  </p>
      </section>
    </main>
  );
}
