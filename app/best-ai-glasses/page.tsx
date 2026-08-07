import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const scoreLabels: Record<string, string> = {
  design: "Design",
  comfort: "Comfort",
  camera: "Camera",
  audio: "Audio",
  battery: "Battery",
  aiFeatures: "AI features",
  value: "Value",
};

export default function BestAIGlassesPage() {
  const rankedProducts = [...products]
    .filter((product) => product.category === "AI Glasses")
    .sort((a, b) => b.editorialScore - a.editorialScore);

  const topProduct = rankedProducts[0];

  const topAffiliateLink = topProduct?.affiliateLinks.find(
    (link) => link.url.trim() !== "",
  );

  const topReviewScores = topProduct
    ? (Object.entries(topProduct.reviewScores) as [
        keyof typeof topProduct.reviewScores,
        number,
      ][])
    : [];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Project Atlas buying guide
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {rankedProducts.length} products ranked
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
                Best AI Glasses
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Our current ranking of qualified AI glasses based on customer
                ratings, review volume, design, comfort, camera performance,
                audio, battery life, AI features, value, and editorial
                assessment.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/compare"
                  className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Compare top picks
                </Link>

                <Link
                  href="/ai-glasses"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                >
                  Browse all AI glasses
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Ranking approach
              </p>

              <p className="mt-4 leading-7 text-slate-300">
                Products are ordered by Atlas editorial score after meeting our
                minimum research and qualification standards.
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
                  <span className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold uppercase tracking-wide text-slate-950">
                    Best overall
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200">
                    {topProduct.verdictLabel}
                  </span>
                </div>

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  #1 ranked AI glasses
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
                    Atlas score {topProduct.editorialScore.toFixed(1)}/10
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
                    href="/compare"
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-center font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                  >
                    Compare with runner-up
                  </Link>

                  {topAffiliateLink && (
                    <a
                      href={topAffiliateLink.url}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-center font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                    >
                      Check current price at {topAffiliateLink.retailer}
                    </a>
                  )}
                </div>

                {topAffiliateLink && (
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    Price and availability are provided by the retailer and may
                    change.
                  </p>
                )}
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
                  <p className="text-sm text-slate-400">Atlas verdict</p>

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
                {topReviewScores.map(([key, score]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold">{scoreLabels[key]}</p>

                      <p className="font-bold text-cyan-400">
                        {score.toFixed(1)}/10
                      </p>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{
                          width: `${Math.min(Math.max(score * 10, 0), 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
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
                All qualifying AI glasses
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                Each product is ranked by its current Atlas editorial score.
                Individual reviews include detailed scores, specifications,
                strengths, drawbacks, and rating sources.
              </p>
            </div>

            <Link
              href="/compare"
              className="inline-flex rounded-full border border-white/20 px-5 py-3 text-center font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Open comparison
            </Link>
          </div>

          {rankedProducts.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rankedProducts.map((product, index) => (
                <article key={product.id} className="relative pt-5">
                  <div className="absolute left-5 top-0 z-10 flex items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-950 shadow-lg">
                      #{index + 1}
                    </span>

                    {index === 0 && (
                      <span className="rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950 shadow-lg">
                        Best overall
                      </span>
                    )}
                  </div>

                  <ProductCard product={product} />
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <h3 className="text-xl font-bold">
                No qualifying products available
              </h3>

              <p className="mt-3 text-slate-400">
                Qualified AI-glasses reviews will appear here when products are
                added to the Atlas database.
              </p>
            </div>
          )}
        </section>

        <section className="mt-20 rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Our methodology
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                How we rank AI glasses
              </h2>

              <p className="mt-5 leading-7 text-slate-300">
                Products must first meet our minimum research, customer-rating,
                and review-volume requirements before they are considered for
                ranking.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="font-bold text-cyan-400">Customer evidence</p>

                <p className="mt-3 leading-7 text-slate-400">
                  We consider customer ratings, review volume, recurring praise,
                  and commonly reported complaints.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="font-bold text-cyan-400">Product experience</p>

                <p className="mt-3 leading-7 text-slate-400">
                  Design, comfort, camera quality, audio, battery life, AI
                  features, usability, and value contribute to the score.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="font-bold text-cyan-400">Editorial judgment</p>

                <p className="mt-3 leading-7 text-slate-400">
                  We assess how well each product serves its intended buyer and
                  how it compares with competing options.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="font-bold text-cyan-400">Ongoing updates</p>

                <p className="mt-3 leading-7 text-slate-400">
                  Rankings may change when ratings, availability, product
                  performance, specifications, or our research changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-6 text-sm leading-6 text-slate-500">
          Affiliate disclosure: Project Atlas may earn a commission from
          qualifying purchases made through eligible retailer links, at no
          additional cost to you.
        </p>
      </section>
    </main>
  );
}