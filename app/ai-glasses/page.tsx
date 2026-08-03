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
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_38%)]"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="text-5xl font-black uppercase leading-none tracking-tight text-cyan-400 sm:text-6xl lg:text-7xl xl:text-8xl">
                Tech Reviews
              </p>

              <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Find the right products
                <span className="block">for you</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Explore products reviewed and ranked by Project Atlas. We
                evaluate performance, features, value, customer feedback, and
                real-world usability so you can choose with confidence.
              </p>
              
<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
  <Link
    href="/ai-glasses"
    className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
  >
    Category
  </Link>

  <Link
    href="/best-ai-glasses"
    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.03] px-6 py-4 font-bold transition hover:border-cyan-400/50 hover:bg-white/[0.07]"
  >
    View top picks
  </Link>

  <Link
    href="/compare?category=ai-glasses"
    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.03] px-6 py-4 font-bold transition hover:border-cyan-400/50 hover:bg-white/[0.07]"
  >
    Compare products
  </Link>
</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <article className="relative min-h-64 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/80 p-6 shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  Reviewed
                </p>

                <p className="mt-5 text-5xl font-black">
                  {aiGlasses.length}
                </p>

                <p className="mt-4 max-w-32 text-base leading-7 text-slate-300">
                  Qualifying products
                </p>

                <svg
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                  className="absolute bottom-5 right-5 h-16 w-16 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 31c3-8 8-12 15-12 6 0 10 3 12 8 2-5 6-8 12-8 7 0 12 4 15 12" />
                  <path d="M8 31h17c4 0 7 3 7 7v2c0 7-5 12-12 12S8 47 8 40v-9Z" />
                  <path d="M56 31H39c-4 0-7 3-7 7v2c0 7 5 12 12 12s12-5 12-12v-9Z" />
                  <path d="M25 34h14" />
                </svg>
              </article>

              <article className="relative min-h-64 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/80 p-6 shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  Top score
                </p>

                <p className="mt-5 text-5xl font-black">
                  {featuredProduct
                    ? featuredProduct.editorialScore.toFixed(1)
                    : "—"}
                </p>

                <p className="mt-4 max-w-36 text-base leading-7 text-slate-300">
                  Highest current Atlas score
                </p>

                <svg
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 h-16 w-16 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="32" cy="27" r="17" />
                  <path d="m32 17 3 7 8 .7-6 5 2 8-7-4-7 4 2-8-6-5 8-.7 3-7Z" />
                  <path d="m21 41-4 16 9-5 6 7 3-15" />
                  <path d="m43 41 4 16-9-5" />
                </svg>
              </article>
            </div>
          </div>
        </div>
      </section>

      {featuredProduct && (
        <section className="mx-auto max-w-7xl px-6 pt-12 sm:pt-16">
          <article className="overflow-hidden rounded-2xl border border-white/15 bg-slate-900/70 shadow-2xl shadow-black/30">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-end sm:px-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Featured review
                </p>

                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Our highest-rated product
                </h2>
              </div>

              <Link
                href="/best-ai-glasses"
                className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
              >
                See complete rankings
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                <ProductImage
                  src={featuredProduct.image.src}
                  alt={featuredProduct.image.alt}
                  priority
                  aspectRatio="square"
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="rounded-xl border-white/15 bg-black"
                  imageClassName="p-5 sm:p-8"
                />

                <span className="absolute left-8 top-8 rounded-md bg-white px-3 py-2 text-sm font-black text-slate-950 shadow-lg">
                  #1
                </span>

                <span className="absolute right-8 top-8 rounded-md bg-cyan-400 px-3 py-2 text-[11px] font-black uppercase tracking-wide text-slate-950 shadow-lg">
                  Best overall
                </span>
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-400">
                  {featuredProduct.brand}
                </p>

                <h3 className="mt-2 text-3xl font-bold leading-tight tracking-tight">
                  {featuredProduct.name}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-cyan-400 px-3 py-1.5 text-xs font-black uppercase text-slate-950">
                    {featuredProduct.verdictLabel}
                  </span>

                  <span className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase text-slate-200">
                    {featuredProduct.qualification.replace("-", " ")}
                  </span>
                </div>

                <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">
                  {featuredProduct.editorVerdict}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                      Atlas score
                    </p>

                    <div className="mt-2 flex items-end gap-1.5">
                      <span className="text-3xl font-black">
                        {featuredProduct.editorialScore.toFixed(1)}
                      </span>

                      <span className="pb-1 text-xs text-slate-500">
                        /10
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                      Customers
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      <span aria-hidden="true" className="mr-1 text-amber-300">
                        ★
                      </span>
                      {featuredProduct.customerRating.toFixed(1)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                      Reviews
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      {featuredProduct.totalReviewCount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/products/${featuredProduct.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Read full review
                      <span aria-hidden="true">→</span>
                    </Link>

                    <Link
                      href="/compare"
                      className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/[0.03] px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/[0.07]"
                    >
                      Compare products
                    </Link>

                    {featuredAffiliateLink && (
                      <a
                        href={featuredAffiliateLink.url}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/[0.03] px-6 py-3.5 font-bold transition hover:border-cyan-400/50 hover:bg-white/[0.07]"
                      >
                        Check current price
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-5 py-4 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
            >
              ◇
            </span>

            <span>
              Showing{" "}
              <strong className="text-white">{aiGlasses.length}</strong>{" "}
              qualifying products
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
            >
              ↕
            </span>

            <span>Ranked by Atlas score</span>
          </div>

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
            >
              ◇
            </span>

            <span>No prices displayed</span>
          </div>

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
            >
              ✓
            </span>

            <span>Affiliate links disclosed</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14 sm:pb-16">
        {remainingProducts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {remainingProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                rank={index + 2}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h2 className="text-2xl font-bold">
              More qualifying products are coming soon
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              New products will appear here after they are added to the Atlas
              product database and complete our review process.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                Atlas methodology
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                How we evaluate products
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                Our rankings combine editorial assessment with customer-rating
                data and product research. Every product is judged using the
                same core criteria.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/about"
                  className="rounded-lg border border-white/20 px-5 py-3 text-center text-sm font-semibold transition hover:border-cyan-400/50 hover:bg-white/[0.05]"
                >
                  About Project Atlas
                </Link>

                <Link
                  href="/best-ai-glasses"
                  className="rounded-lg border border-white/20 px-5 py-3 text-center text-sm font-semibold transition hover:border-cyan-400/50 hover:bg-white/[0.05]"
                >
                  Buying guide
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: "◉",
                  title: "Design and comfort",
                  description:
                    "Frame quality, weight, fit, controls, lens options, and suitability for everyday wear.",
                },
                {
                  icon: "▣",
                  title: "Camera and audio",
                  description:
                    "Photo and video quality, microphones, speakers, calls, music, and voice capture.",
                },
                {
                  icon: "✦",
                  title: "AI and software",
                  description:
                    "Assistant usefulness, app experience, smart features, reliability, and privacy controls.",
                },
                {
                  icon: "▤",
                  title: "Battery and value",
                  description:
                    "Real-world battery life, charging, included features, limitations, and overall value.",
                },
              ].map((criterion) => (
                <article
                  key={criterion.title}
                  className="flex gap-4 rounded-xl border border-white/10 bg-slate-950/80 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-xl text-cyan-400"
                  >
                    {criterion.icon}
                  </span>

                  <div>
                    <h3 className="font-bold">{criterion.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {criterion.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <p className="text-center text-xs leading-6 text-slate-500 sm:text-sm">
          Affiliate disclosure: Project Atlas may earn a commission from
          qualifying purchases made through eligible retailer links, at no
          additional cost to you. Project Atlas does not display product
          prices. Current price and availability are provided by the retailer.
        </p>
      </section>
    </main>
  );
}