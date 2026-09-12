import AtlasTrackedLink from "@/components/AtlasTrackedLink";
import ProductExplorer from "@/components/ProductExplorer";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";

export default function CategoryLanding({
  categoryId,
}: {
  categoryId: string;
}) {
  const category = getCategory(categoryId);

  if (!category) {
    return null;
  }

  const normalizedCategoryLabel = category.label
    .trim()
    .toLowerCase();

  const categoryProducts = products.filter((product) => {
    if (product.categoryId) {
      return product.categoryId === categoryId;
    }

    return (
      product.category.trim().toLowerCase() ===
      normalizedCategoryLabel
    );
  });

  const rankedProducts = [...categoryProducts].sort(
    (a, b) =>
      b.editorialScore - a.editorialScore ||
      a.name.localeCompare(b.name),
  );

  const topThreeProducts = rankedProducts.slice(0, 3);

  const buyingFactors = Object.values(
    category.scoreLabels,
  ).slice(0, 4);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://project-c2h4n3.vercel.app";

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.label,
    description: category.description,
    url: `${siteUrl}${category.href}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryProducts.length,
      itemListElement: rankedProducts
        .slice(0, 10)
        .map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/products/${product.slug}`,
          name: product.name,
        })),
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            {category.label}
          </p>

          <h1 className="mt-4 max-w-5xl text-4xl font-bold sm:text-6xl">
            Compare {category.label.toLowerCase()} with less
            guesswork
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {category.description} Explore{" "}
            {categoryProducts.length} C2H4N3-reviewed products,
            compare the strongest options, and open the full
            review before you buy.
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-400">
            {categoryProducts.length} products reviewed in this
            category.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AtlasTrackedLink
              href={category.bestHref}
              eventName="ranking_click"
              eventParams={{
                category_id: category.id,
                category_name: category.label,
                source_surface: "category_page",
              }}
              className="rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              View top picks
            </AtlasTrackedLink>

            <AtlasTrackedLink
              href={category.compareHref}
              eventName="compare_click"
              eventParams={{
                action: "open_comparison",
                category_id: category.id,
                category_name: category.label,
                source_surface: "category_page",
              }}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Compare side by side
            </AtlasTrackedLink>
          </div>
        </div>
      </section>

      {topThreeProducts.length > 0 && (
        <section className="border-b border-white/10 bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Top 3 right now
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Leading {category.label.toLowerCase()}
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                  These are the three highest-rated products in
                  the category based on the current C2H4N3
                  editorial ranking.
                </p>
              </div>

              <AtlasTrackedLink
                href={category.bestHref}
                eventName="ranking_click"
                eventParams={{
                  category_id: category.id,
                  category_name: category.label,
                  source_surface: "category_top_three",
                }}
                className="rounded-full border border-white/20 px-5 py-3 text-center font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
              >
                View full ranking
              </AtlasTrackedLink>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {topThreeProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="rounded-3xl border border-white/10 bg-slate-900 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="text-3xl"
                      aria-label={
                        index === 0
                          ? "Gold medal"
                          : index === 1
                            ? "Silver medal"
                            : "Bronze medal"
                      }
                    >
                      {index === 0
                        ? "🥇"
                        : index === 1
                          ? "🥈"
                          : "🥉"}
                    </span>

                    <p className="text-2xl font-black text-cyan-300">
                      {product.editorialScore.toFixed(1)}
                      <span className="text-sm text-slate-500">
                        {" "}
                        / 10
                      </span>
                    </p>
                  </div>

                  <p className="mt-5 text-sm font-semibold text-cyan-400">
                    {product.brand}
                  </p>

                  <AtlasTrackedLink
                    href={`/products/${product.slug}`}
                    eventName="review_click"
                    eventParams={{
                      product_slug: product.slug,
                      product_name: product.name,
                      category_id: category.id,
                      category_rank: index + 1,
                      source_surface: "category_top_three",
                    }}
                    className="mt-2 block text-xl font-bold leading-tight transition hover:text-cyan-300"
                  >
                    {product.name}
                  </AtlasTrackedLink>

                  {product.bestFor[0] && (
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      <span className="font-semibold text-white">
                        Best for:
                      </span>{" "}
                      {product.bestFor[0]}
                    </p>
                  )}

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {category.cardFields
                      .slice(0, 2)
                      .map((field) => (
                        <div
                          key={field.label}
                          className="rounded-xl border border-white/10 bg-white/5 p-3"
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

                  <AtlasTrackedLink
                    href={`/products/${product.slug}`}
                    eventName="review_click"
                    eventParams={{
                      product_slug: product.slug,
                      product_name: product.name,
                      category_id: category.id,
                      category_rank: index + 1,
                      source_surface:
                        "category_top_three_button",
                    }}
                    className="mt-6 block rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-3 text-center text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/10"
                  >
                    Read full review
                  </AtlasTrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pt-14">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Buying guide
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            What matters when comparing{" "}
            {category.label.toLowerCase()}
          </h2>

          <p className="mt-5 max-w-3xl leading-7 text-slate-300">
            The overall score is useful for narrowing the field,
            but the best product for you depends on the features
            and trade-offs that matter most for your own use.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {buyingFactors.map((factor, index) => (
              <div
                key={factor}
                className="rounded-2xl border border-white/10 bg-slate-900 p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-black text-cyan-300">
                  {index + 1}
                </span>

                <h3 className="mt-4 font-bold text-white">
                  {factor}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Compare {factor.toLowerCase()} alongside price,
                  intended use, and the limitations described in
                  each review.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Full catalog
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Browse all {category.label.toLowerCase()}
          </h2>
        </div>

        <ProductExplorer
          products={categoryProducts}
          showBrandFilter
        />
      </section>
    </main>
  );
}
