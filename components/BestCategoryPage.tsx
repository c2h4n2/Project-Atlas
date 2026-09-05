import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";

function scoreLabel(key: string) {
  const labels: Record<string, string> = {
    aiFeatures: "AI features",
    batteryLife: "Battery life",
    buildQuality: "Build quality",
    imageQuality: "Image quality",
    soundQuality: "Sound quality",
    noiseCancellation: "Noise cancellation",
    gamingPerformance: "Gaming performance",
    productivity: "Productivity",
  };

  if (labels[key]) return labels[key];

  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

export default function BestCategoryPage({
  categoryId,
}: {
  categoryId: string;
}) {
  const category = getCategory(categoryId);

  if (!category) {
    return null;
  }

  const rankedProducts = [...products]
    .filter((product) => product.categoryId === categoryId)
    .sort(
      (a, b) =>
        b.editorialScore - a.editorialScore ||
        a.name.localeCompare(b.name),
    );

  const topProduct = rankedProducts[0];

  const topAffiliateLink = topProduct?.affiliateLinks.find(
    (link) => link.url.trim() !== "",
  );

  const topReviewScores = topProduct
    ? Object.entries(topProduct.reviewScores)
    : [];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              C2H4N3 buying guide
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {rankedProducts.length} products ranked
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
                Best {category.label}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Our current ranking of qualified {category.label.toLowerCase()} based
                on product performance, usability, features, limitations, value,
                customer evidence, and C2H4N3 editorial assessment.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={category.compareHref}
                  className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Compare top picks
                </Link>

                <Link
                  href={category.href}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                >
                  Browse all {category.label.toLowerCase()}
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Ranking approach
              </p>

              <p className="mt-4 leading-7 text-slate-300">
                Products are ordered by C2H4N3 editorial score after meeting
                our research and qualification standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {topProduct && (
          <section className="overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-cyan-400/5">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/90 text-2xl shadow-lg"
                    aria-label="Gold medal"
                  >
                    🥇
                  </span>

                  <span className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold uppercase tracking-wide text-slate-950">
                    Best overall
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200">
                    {topProduct.verdictLabel}
                  </span>
                </div>

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  #1 ranked {category.label.toLowerCase()}
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  {topProduct.name}
                </h2>

                <p className="mt-3 text-lg text-slate-400">
                  {topProduct.brand}
                </p>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  {topProduct.editorVerdict}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm">
                    ⭐ {topProduct.customerRating.toFixed(1)}
                  </span>

                  <span className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm">
                    {topProduct.totalReviewCount.toLocaleString()} reviews
                  </span>

                  <span className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-cyan-300">
                    C2H4N3 score {topProduct.editorialScore.toFixed(1)}/10
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/products/${topProduct.slug}`}
                    className="rounded-full bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Read full review
                  </Link>

                  <Link
                    href={category.compareHref}
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-center font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
                  >
                    Compare with runner-up
                  </Link>

                  {topAffiliateLink && (
                    <a
                      href={topAffiliateLink.url}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-center font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
                    >
                      Check current price at {topAffiliateLink.retailer}
                    </a>
                  )}
                </div>
              </div>

              <aside className="border-t border-white/10 bg-slate-900/80 p-8 sm:p-10 lg:border-l lg:border-t-0">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Why it ranks first
                </p>

                <ul className="mt-6 space-y-4">
                  {topProduct.pros.slice(0, 4).map((pro) => (
                    <li
                      key={pro}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300"
                    >
                      <span className="font-bold text-cyan-400">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950 p-5">
                  <p className="text-sm font-semibold text-cyan-300">
                    C2H4N3 Verdict
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-5xl font-bold">
                      {topProduct.editorialScore.toFixed(1)}
                    </span>
                    <span className="pb-1 text-lg text-slate-400">/10</span>
                  </div>

                  <p className="mt-3 text-xl font-bold">
                    {topProduct.verdictLabel}
                  </p>
                </div>
              </aside>
            </div>
          </section>
        )}

        {topProduct && (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Score breakdown
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Why our winner scored highest
              </h2>

              <div className="mt-7 space-y-5">
                {topReviewScores.map(([key, rawScore]) => {
                  const score = Number(rawScore);

                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold">
                          {scoreLabel(key)}
                        </p>

                        <p className="font-bold text-cyan-400">
                          {score.toFixed(1)}/10
                        </p>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-cyan-400"
                          style={{
                            width: `${Math.min(
                              Math.max(score * 10, 0),
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Recommended for
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Who should choose our winner
              </h2>

              <ul className="mt-7 space-y-4">
                {topProduct.bestFor.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300"
                  >
                    <span className="font-bold text-cyan-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        <section className="mt-20">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Complete ranking
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                All qualifying {category.label.toLowerCase()}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                Each product is ranked by its current C2H4N3 editorial score.
                Individual reviews include detailed scores, specifications,
                strengths, drawbacks, and rating sources.
              </p>
            </div>

            <Link
              href={category.compareHref}
              className="inline-flex rounded-full border border-white/20 px-5 py-3 text-center font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Open comparison
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rankedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                rank={index + 1}
              />
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Our methodology
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                How we rank {category.label.toLowerCase()}
              </h2>

              <p className="mt-5 leading-7 text-slate-300">
                Products must meet our research and qualification standards
                before they are considered for ranking.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="font-bold text-cyan-400">
                  Customer evidence
                </p>
                <p className="mt-3 leading-7 text-slate-400">
                  We consider customer ratings, review volume, recurring praise,
                  and commonly reported complaints.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="font-bold text-cyan-400">
                  Product experience
                </p>
                <p className="mt-3 leading-7 text-slate-400">
                  Performance, usability, features, design, limitations, and
                  value contribute to the assessment.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="font-bold text-cyan-400">
                  Editorial judgment
                </p>
                <p className="mt-3 leading-7 text-slate-400">
                  We assess how well each product serves its intended buyer and
                  how it compares with competing options.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="font-bold text-cyan-400">
                  Ongoing updates
                </p>
                <p className="mt-3 leading-7 text-slate-400">
                  Rankings may change when ratings, availability,
                  specifications, performance, or our research changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-6 text-sm leading-6 text-slate-500">
          Affiliate disclosure: Project C2H4N3 may earn a commission from
          qualifying purchases made through eligible retailer links, at no
          additional cost to you.
        </p>
      </section>
    </main>
  );
}
