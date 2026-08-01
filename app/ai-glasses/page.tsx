import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import { products } from "@/data/products";

export default function AIGlassesPage() {
  const aiGlasses = products
    .filter((product) => product.category === "AI Glasses")
    .sort((a, b) => b.editorialScore - a.editorialScore);

  const featuredProduct = aiGlasses[0];
  const remainingProducts = aiGlasses.slice(1);

  const featuredAffiliateLink = featuredProduct?.affiliateLinks.find(
    (link) => link.url.trim() !== "",
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                AI glasses reviews
              </p>

              <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
                Find the right AI glasses for everyday use
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Explore AI glasses reviewed and ranked by Project Atlas. We
                compare design, comfort, cameras, audio, battery life, AI
                features, value, customer ratings, and real-world usability.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/best-ai-glasses"
                  className="rounded-full bg-cyan-400 px-6 py-3.5 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  View our top picks
                </Link>

                <Link
                  href="/compare"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                >
                  Compare AI glasses
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Reviewed
                </p>

                <p className="mt-3 text-4xl font-black">{aiGlasses.length}</p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Qualifying AI-glasses products
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Top score
                </p>

                <p className="mt-3 text-4xl font-black">
                  {featuredProduct
                    ? featuredProduct.editorialScore.toFixed(1)
                    : "—"}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Highest current Atlas score
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredProduct && (
        <section className="mx-auto max-w-6xl px-6 pt-14 sm:pt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Featured review
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Our highest-rated AI glasses
              </h2>
            </div>

            <Link
              href="/best-ai-glasses"
              className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              See complete rankings →
            </Link>
          </div>

          <article className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-slate-900 shadow-2xl shadow-cyan-950/10">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative border-b border-white/10 bg-slate-800/50 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <ProductImage
                  src={featuredProduct.image.src}
                  alt={featuredProduct.image.alt}
                  priority
                  aspectRatio="square"
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="rounded-3xl border-white/10 bg-slate-950"
                  imageClassName="p-8 sm:p-10"
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
                  {featuredProduct.brand}
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {featuredProduct.name}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                    {featuredProduct.verdictLabel}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold capitalize text-slate-300">
                    {featuredProduct.qualification.replace("-", " ")}
                  </span>
                </div>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                  {featuredProduct.editorVerdict}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      Atlas score
                    </p>

                    <div className="mt-2 flex items-end gap-1">
                      <span className="text-4xl font-black">
                        {featuredProduct.editorialScore.toFixed(1)}
                      </span>

                      <span className="pb-1 text-xs text-slate-400">/10</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Customers
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      ⭐ {featuredProduct.customerRating.toFixed(1)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Reviews
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      {featuredProduct.totalReviewCount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-sm font-bold">Best for</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {featuredProduct.bestFor.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/products/${featuredProduct.slug}`}
                      className="rounded-full bg-cyan-400 px-6 py-3.5 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Read full review
                    </Link>

                    <Link
                      href="/compare"
                      className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                    >
                      Compare products
                    </Link>

                    {featuredAffiliateLink && (
                      <a
                        href={featuredAffiliateLink.url}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-center font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                      >
                        Check current price at{" "}
                        {featuredAffiliateLink.retailer}
                      </a>
                    )}
                  </div>

                  {featuredAffiliateLink && (
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      Price and availability are provided by the retailer and
                      may change.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="flex flex-col justify-between gap-5 border-y border-white/10 py-6 sm:flex-row sm:items-center">
          <p className="text-slate-300">
            Showing{" "}
            <span className="font-bold text-white">{aiGlasses.length}</span>{" "}
            qualifying product{aiGlasses.length === 1 ? "" : "s"}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            <span>Ranked by Atlas score</span>
            <span>No prices displayed</span>
            <span>Affiliate links disclosed</span>
          </div>
        </div>

        {aiGlasses.length > 0 ? (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 2}
                />
              ))}
            </div>

            {remainingProducts.length === 0 && (
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-lg font-semibold">
                  More qualifying products are coming soon.
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  New products will appear here automatically after they are
                  added to the Atlas product database.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold">
              No qualifying AI glasses yet
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              Products will appear here automatically after they are added to
              the Atlas product database and meet our review requirements.
            </p>
          </div>
        )}
      </section>

      <section className="border-y border-white/10 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Atlas methodology
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                How we evaluate AI glasses
              </h2>

              <p className="mt-5 leading-7 text-slate-400">
                Our rankings combine editorial assessment with customer-rating
                data and product research. Each product is judged using the
                same core criteria.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Design and comfort",
                  description:
                    "Frame quality, weight, fit, controls, lens options, and suitability for everyday wear.",
                },
                {
                  title: "Camera and audio",
                  description:
                    "Photo and video quality, microphones, speakers, calls, music, and voice capture.",
                },
                {
                  title: "AI and software",
                  description:
                    "Assistant usefulness, app experience, smart features, reliability, and privacy controls.",
                },
                {
                  title: "Battery and value",
                  description:
                    "Real-world battery life, charging, included features, limitations, and overall value.",
                },
              ].map((criterion) => (
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

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/about"
              className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Learn about Project Atlas
            </Link>

            <Link
              href="/best-ai-glasses"
              className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Read our buying guide
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm leading-6 text-slate-500">
          Affiliate disclosure: Project Atlas may earn a commission from
          qualifying purchases made through eligible retailer links, at no
          additional cost to you. Project Atlas does not display product
          prices. Current price and availability are provided by the retailer.
        </p>
      </section>
    </main>
  );
}