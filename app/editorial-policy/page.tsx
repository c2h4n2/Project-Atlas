import Link from "next/link";

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            Project C2H4N3
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
          Our standards
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Editorial Policy
        </h1>

        <p className="mt-4 text-sm text-slate-400">
          Last updated: July 2026
        </p>

        <div className="mt-10 space-y-8 leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-white">
              Our purpose
            </h2>

            <p className="mt-3">
              Project C2H4N3 publishes product research, comparisons, rankings,
              and buying guidance intended to help readers make informed
              purchase decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Product qualification
            </h2>

            <p className="mt-3">
              Products generally must maintain a strong customer rating,
              meaningful review volume, current availability, and no major
              pattern of unresolved recurring complaints before they qualify
              for inclusion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Sources we consider
            </h2>

            <p className="mt-3">
              Our research may include retailer customer ratings, review
              counts, manufacturer specifications, professional testing,
              product documentation, availability, pricing, and recurring
              customer feedback.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Customer ratings and C2H4N3 scores
            </h2>

            <p className="mt-3">
              Retailer customer ratings are displayed separately from the
              Project C2H4N3 editorial score. Customer ratings reflect the
              source platform, while the C2H4N3 score reflects our broader
              editorial assessment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Rankings
            </h2>

            <p className="mt-3">
              Rankings may consider reliability, features, value, usability,
              customer feedback, review volume, and the strength of available
              evidence. Rankings can change when products, prices, ratings, or
              availability change.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Editorial independence
            </h2>

            <p className="mt-3">
              Affiliate relationships, advertising, sponsorships, and retailer
              partnerships do not determine whether a product qualifies or
              guarantee a positive score, ranking, or recommendation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Corrections and updates
            </h2>

            <p className="mt-3">
              We may update articles when product information changes or when
              errors are identified. Material corrections should be made as
              clearly and promptly as practical.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}