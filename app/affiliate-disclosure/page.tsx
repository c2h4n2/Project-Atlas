import Link from "next/link";

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            Project Atlas
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Back home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Transparency
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Affiliate Disclosure
        </h1>

        <p className="mt-4 text-sm text-slate-400">
          Last updated: July 2026
        </p>

        <div className="mt-10 space-y-8 leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-white">
              How Project Atlas earns money
            </h2>

            <p className="mt-3">
              Project Atlas may earn a commission when you purchase a product
              through certain links on this website. This does not increase the
              price you pay.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Editorial independence
            </h2>

            <p className="mt-3">
              Affiliate relationships do not determine which products qualify
              for inclusion, how products are ranked, or the editorial scores
              they receive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Product information
            </h2>

            <p className="mt-3">
              Prices, availability, ratings, review counts, specifications, and
              retailer information may change after publication. Visitors
              should confirm current details with the retailer before making a
              purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Sponsored content
            </h2>

            <p className="mt-3">
              Any sponsored content or paid partnership will be identified
              clearly. Sponsored relationships will not guarantee a positive
              review or recommendation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Questions
            </h2>

            <p className="mt-3">
              Questions about this disclosure can be submitted through the
              Project Atlas contact page once it becomes available.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}