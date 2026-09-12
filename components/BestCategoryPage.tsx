import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import RetailerButtons from "@/components/RetailerButtons";
import AtlasAnalyticsEvent from "@/components/AtlasAnalyticsEvent";
import AtlasTrackedLink from "@/components/AtlasTrackedLink";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { seoComparisons } from "@/data/seo-comparisons";

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

  const topReviewScores = topProduct
    ? Object.entries(topProduct.reviewScores)
    : [];

  const topThreeProducts = rankedProducts.slice(0, 3);

  const categoryComparisons = seoComparisons
    .map((comparison) => {
      const first = products.find(
        (product) => product.slug === comparison.productSlugs[0],
      );

      const second = products.find(
        (product) => product.slug === comparison.productSlugs[1],
      );

      if (!first || !second) return null;

      const firstCategoryId = first.categoryId ?? "ai-glasses";
      const secondCategoryId = second.categoryId ?? "ai-glasses";

      if (
        firstCategoryId !== categoryId ||
        secondCategoryId !== categoryId
      ) {
        return null;
      }

      return {
        comparison,
        first,
        second,
      };
    })
    .filter(
      (
        item,
      ): item is {
        comparison: (typeof seoComparisons)[number];
        first: (typeof products)[number];
        second: (typeof products)[number];
      } => item !== null,
    )
    .slice(0, 4);

  const buyingFactors = Object.values(category.scoreLabels).slice(0, 4);


  const rankingFaqs = topProduct
    ? [
        {
          question: `What is the best ${category.label.toLowerCase()} overall?`,
          answer: `${topProduct.name} is currently ranked #1 by C2H4N3 with an editorial score of ${topProduct.editorialScore.toFixed(1)}/10. It leads this category based on the current scoring criteria, but the best choice still depends on your own priorities.`,
        },
        {
          question: `What should I look for when buying ${category.label.toLowerCase()}?`,
          answer: `Focus on ${buyingFactors.map((factor) => factor.toLowerCase()).join(", ")} and how those areas match your intended use, budget, and tolerance for trade-offs.`,
        },
        {
          question: `How does C2H4N3 rank ${category.label.toLowerCase()}?`,
          answer: `C2H4N3 compares qualifying products using category-specific review scores, product specifications, strengths, drawbacks, usability, value, customer evidence, and editorial judgment.`,
        },
        {
          question: `Is the #1 ranked ${category.label.toLowerCase().replace(/s$/, "")} best for everyone?`,
          answer: `No. The #1 product has the highest current C2H4N3 score in this category, but another product may be a better fit if your priorities, budget, preferred features, or use case are different.`,
        },
      ]
    : [];

  const rankingFaqJsonLd =
    rankingFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: rankingFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://project-c2h4n3.vercel.app";

  const rankingJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.label}`,
    description: category.description,
    numberOfItems: rankedProducts.length,
    itemListElement: rankedProducts.slice(0, 10).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/products/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(rankingJsonLd).replace(/</g, "\\u003c"),
        }}
      />


      {rankingFaqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rankingFaqJsonLd).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      )}
      <AtlasAnalyticsEvent
        eventName="ranking_view"
        params={{
          category_id: category.id,
          category_name: category.label,
          product_count: rankedProducts.length,
          top_product_slug: topProduct?.slug ?? "",
          top_product_name: topProduct?.name ?? "",
        }}
      />
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
                    ⭐ {(topProduct.customerRating * 2).toFixed(1)}/10
                  </span>

                  <span className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm">
                    {topProduct.totalReviewCount.toLocaleString()} reviews
                  </span>

                  <span className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-cyan-300">
                    C2H4N3 score {topProduct.editorialScore.toFixed(1)}/10
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <AtlasTrackedLink
                    href={`/products/${topProduct.slug}`}
                    eventName="review_click"
                    eventParams={{
                      product_slug: topProduct.slug,
                      product_name: topProduct.name,
                      category_id: category.id,
                      category_rank: 1,
                      source_surface: "ranking_winner",
                    }}
                    className="rounded-full bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Read full review
                  </AtlasTrackedLink>

                  <AtlasTrackedLink
                    href={category.compareHref}
                    eventName="compare_click"
                    eventParams={{
                      action: "open_comparison",
                      product_slug: topProduct.slug,
                      product_name: topProduct.name,
                      category_id: category.id,
                      category_rank: 1,
                      source_surface: "ranking_winner",
                    }}
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-center font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
                  >
                    Compare with runner-up
                  </AtlasTrackedLink>


                </div>

                <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-950/50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                    Check retailer availability
                  </p>

                  <div className="mt-4">
                    <RetailerButtons
                      links={topProduct.affiliateLinks}
                      productSlug={topProduct.slug}
                      productName={topProduct.name}
                      sourceSurface="ranking_winner"
                    />
                  </div>

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

        <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Buyer&apos;s guide
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            How to choose the best {category.label.toLowerCase()}
          </h2>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            {category.description} Start with the way you plan to use the
            product, then compare the areas that matter most to you instead of
            choosing on overall score alone.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
                What to compare
              </p>

              <div className="mt-5 space-y-4">
                {buyingFactors.map((factor, index) => (
                  <div
                    key={factor}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-black text-cyan-300">
                        {index + 1}
                      </span>

                      <p className="font-bold text-white">
                        {factor}
                      </p>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Compare {factor.toLowerCase()} alongside your actual use
                      case, budget, and the trade-offs listed in each full
                      C2H4N3 review.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
                Top 3 at a glance
              </p>

              <div className="mt-5 space-y-4">
                {topThreeProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div className="flex gap-4">
                        <span
                          className="text-2xl"
                          aria-label={
                            index === 0
                              ? "Gold medal"
                              : index === 1
                                ? "Silver medal"
                                : "Bronze medal"
                          }
                        >
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                        </span>

                        <div>
                          <AtlasTrackedLink
                            href={`/products/${product.slug}`}
                            eventName="review_click"
                            eventParams={{
                              product_slug: product.slug,
                              product_name: product.name,
                              category_id: category.id,
                              category_rank: index + 1,
                              source_surface: "ranking_buyer_guide",
                            }}
                            className="text-lg font-bold text-white transition hover:text-cyan-300"
                          >
                            {product.name}
                          </AtlasTrackedLink>

                          <p className="mt-1 text-sm text-slate-400">
                            {product.brand}
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 text-xl font-black text-cyan-300">
                        {product.editorialScore.toFixed(1)}
                        <span className="text-sm text-slate-500"> / 10</span>
                      </p>
                    </div>

                    {product.bestFor[0] && (
                      <p className="mt-4 text-sm leading-6 text-slate-300">
                        <span className="font-semibold text-slate-200">
                          Best for:
                        </span>{" "}
                        {product.bestFor[0]}
                      </p>
                    )}

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {category.cardFields.slice(0, 2).map((field) => (
                        <div
                          key={field.label}
                          className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                            {field.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-200">
                            {field.getValue(product)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {categoryComparisons.length > 0 && (
          <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-9">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Popular head-to-head comparisons
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Compare top {category.label.toLowerCase()}
                </h2>

                <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                  See how leading products compare on scores, specifications,
                  strengths, and trade-offs before choosing your winner.
                </p>
              </div>

              <AtlasTrackedLink
                href={category.compareHref}
                eventName="compare_click"
                eventParams={{
                  action: "open_comparison_tool",
                  category_id: category.id,
                  category_name: category.label,
                  source_surface: "ranking_comparisons",
                }}
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-cyan-400/50 hover:bg-white/5"
              >
                Build your own comparison
              </AtlasTrackedLink>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {categoryComparisons.map(
                ({ comparison, first, second }) => (
                  <AtlasTrackedLink
                    key={comparison.slug}
                    href={`/compare/${comparison.slug}`}
                    eventName="compare_click"
                    eventParams={{
                      action: "open_seo_comparison",
                      comparison_slug: comparison.slug,
                      product_1_slug: first.slug,
                      product_2_slug: second.slug,
                      category_id: category.id,
                      source_surface: "ranking_comparisons",
                    }}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-cyan-400/40 hover:bg-slate-800"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
                      Head-to-head
                    </p>

                    <h3 className="mt-3 text-lg font-bold leading-snug">
                      {first.name}
                      <span className="text-slate-500"> vs </span>
                      {second.name}
                    </h3>

                    <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-400">
                        C2H4N3 scores
                      </span>

                      <span className="font-bold text-cyan-300">
                        {first.editorialScore.toFixed(1)}
                        <span className="text-slate-500"> vs </span>
                        {second.editorialScore.toFixed(1)}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-semibold text-cyan-300">
                      View comparison →
                    </p>
                  </AtlasTrackedLink>
                ),
              )}
            </div>
          </section>
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

        {rankingFaqs.length > 0 && (
          <section className="mt-20 rounded-[2rem] border border-white/10 bg-slate-900 p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Frequently asked questions
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Best {category.label}: FAQ
            </h2>

            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              {rankingFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-bold text-white">
                    {faq.question}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

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
